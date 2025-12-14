/**
 * Network resilience utilities for robust download handling
 * Implements retry mechanisms, exponential backoff, and error categorization
 */

export interface NetworkRetryConfig {
  maxRetries: number;
  baseDelay: number;
  maxDelay: number;
  backoffMultiplier: number;
  jitter: boolean;
  timeout: number;
}

export interface NetworkOperationResult<T> {
  success: boolean;
  data?: T;
  error?: Error;
  attempt: number;
  duration: number;
}

export type NetworkOperation<T> = () => Promise<T>;

// Network error types for better error handling
export enum NetworkErrorType {
  TIMEOUT = 'timeout',
  CONNECTION_FAILED = 'connection_failed',
  SERVER_ERROR = 'server_error',
  RATE_LIMITED = 'rate_limited',
  PERMANENT_FAILURE = 'permanent_failure',
  UNKNOWN = 'unknown',
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public readonly type: NetworkErrorType,
    public readonly isRetryable: boolean,
    public readonly originalError?: Error,
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class NetworkResilienceManager {
  private static defaultConfig: NetworkRetryConfig = {
    maxRetries: 5,
    baseDelay: 1000, // 1 second
    maxDelay: 30000, // 30 seconds
    backoffMultiplier: 2,
    jitter: true,
    timeout: 30000, // 30 seconds
  };

  /**
   * Execute a network operation with retry logic and exponential backoff
   */
  static async executeWithRetry<T>(
    operation: NetworkOperation<T>,
    config: Partial<NetworkRetryConfig> = {},
    context: string = 'network operation',
  ): Promise<NetworkOperationResult<T>> {
    const finalConfig = { ...this.defaultConfig, ...config };
    const startTime = Date.now();
    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= finalConfig.maxRetries + 1; attempt++) {
      try {
        const result = await this.executeWithTimeout(
          operation,
          finalConfig.timeout,
          `${context} (attempt ${attempt}/${finalConfig.maxRetries + 1})`,
        );

        return {
          success: true,
          data: result,
          attempt,
          duration: Date.now() - startTime,
        };
      } catch (error) {
        lastError = error as Error;
        const networkError = this.categorizeError(error as Error);

        console.warn(
          `${context} failed (attempt ${attempt}/${finalConfig.maxRetries + 1}): ${networkError.message} [${networkError.type}]`,
        );

        // Don't retry on permanent failures
        if (!networkError.isRetryable || attempt > finalConfig.maxRetries) {
          break;
        }

        // Calculate delay with exponential backoff
        const delay = this.calculateDelay(attempt - 1, finalConfig);

        if (attempt <= finalConfig.maxRetries) {
          console.log(`${context} retrying in ${delay}ms...`);
          await this.sleep(delay);
        }
      }
    }

    return {
      success: false,
      error: lastError,
      attempt: finalConfig.maxRetries + 1,
      duration: Date.now() - startTime,
    };
  }

  /**
   * Execute operation with timeout
   */
  private static async executeWithTimeout<T>(
    operation: NetworkOperation<T>,
    timeout: number,
    context: string,
  ): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(
          new NetworkError(
            `Operation timed out after ${timeout}ms: ${context}`,
            NetworkErrorType.TIMEOUT,
            true,
          ),
        );
      }, timeout);

      operation()
        .then((result) => {
          clearTimeout(timeoutId);
          resolve(result);
        })
        .catch((error) => {
          clearTimeout(timeoutId);
          reject(error);
        });
    });
  }

  /**
   * Categorize network errors for better retry logic
   */
  private static categorizeError(error: Error): NetworkError {
    const message = error.message.toLowerCase();

    // Timeout errors
    if (message.includes('timeout') || message.includes('timed out')) {
      return new NetworkError(
        `Timeout: ${error.message}`,
        NetworkErrorType.TIMEOUT,
        true,
        error,
      );
    }

    // Connection failed errors (including net::ERR_FAILED)
    if (
      message.includes('net::err_failed') ||
      message.includes('connection failed') ||
      message.includes('econnrefused') ||
      message.includes('econnreset') ||
      message.includes('network error')
    ) {
      return new NetworkError(
        `Connection failed: ${error.message}`,
        NetworkErrorType.CONNECTION_FAILED,
        true,
        error,
      );
    }

    // Server errors (5xx)
    if (
      message.includes('500') ||
      message.includes('502') ||
      message.includes('503') ||
      message.includes('504') ||
      message.includes('server error')
    ) {
      return new NetworkError(
        `Server error: ${error.message}`,
        NetworkErrorType.SERVER_ERROR,
        true,
        error,
      );
    }

    // Rate limiting (429)
    if (
      message.includes('429') ||
      message.includes('too many requests') ||
      message.includes('rate limit')
    ) {
      return new NetworkError(
        `Rate limited: ${error.message}`,
        NetworkErrorType.RATE_LIMITED,
        true,
        error,
      );
    }

    // Authentication/authorization errors (permanent)
    if (
      message.includes('401') ||
      message.includes('403') ||
      message.includes('unauthorized') ||
      message.includes('forbidden')
    ) {
      return new NetworkError(
        `Auth error: ${error.message}`,
        NetworkErrorType.PERMANENT_FAILURE,
        false,
        error,
      );
    }

    // Content not found (permanent)
    if (
      message.includes('404') ||
      message.includes('not found') ||
      message.includes('video not available')
    ) {
      return new NetworkError(
        `Not found: ${error.message}`,
        NetworkErrorType.PERMANENT_FAILURE,
        false,
        error,
      );
    }

    // Login required (might be retryable with different approach)
    if (message.includes('login required') || message.includes('sign in')) {
      return new NetworkError(
        `Login required: ${error.message}`,
        NetworkErrorType.PERMANENT_FAILURE,
        false,
        error,
      );
    }

    // Unplayable content (permanent)
    if (message.includes('unplayable')) {
      return new NetworkError(
        `Unplayable: ${error.message}`,
        NetworkErrorType.PERMANENT_FAILURE,
        false,
        error,
      );
    }

    // Unknown error
    return new NetworkError(
      `Unknown error: ${error.message}`,
      NetworkErrorType.UNKNOWN,
      true,
      error,
    );
  }

  /**
   * Calculate delay with exponential backoff and optional jitter
   */
  private static calculateDelay(
    attempt: number,
    config: NetworkRetryConfig,
  ): number {
    const exponentialDelay =
      config.baseDelay * Math.pow(config.backoffMultiplier, attempt);
    const cappedDelay = Math.min(exponentialDelay, config.maxDelay);

    if (!config.jitter) {
      return cappedDelay;
    }

    // Add jitter (±25% of the delay)
    const jitterRange = cappedDelay * 0.25;
    const randomJitter = (Math.random() - 0.5) * 2 * jitterRange;

    return Math.max(0, Math.floor(cappedDelay + randomJitter));
  }

  /**
   * Sleep for a given number of milliseconds
   */
  private static sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Execute multiple operations concurrently with individual retry logic
   */
  static async executeBatchWithRetry<T>(
    operations: NetworkOperation<T>[],
    config: Partial<NetworkRetryConfig> = {},
    context: string = 'batch operation',
  ): Promise<NetworkOperationResult<T>[]> {
    const promises = operations.map((operation, index) =>
      this.executeWithRetry(
        operation,
        config,
        `${context} [${index + 1}/${operations.length}]`,
      ),
    );

    return Promise.all(promises);
  }

  /**
   * Check if the system appears to be online
   */
  static async isOnline(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch('https://www.google.com/favicon.ico', {
        method: 'HEAD',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response.ok;
    } catch {
      return false;
    }
  }
}
