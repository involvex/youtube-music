// Type definitions for web request handling
export interface WebRequestDetails {
  url: string;
  responseHeaders?: Record<string, string | string[]>;
  requestHeaders?: Record<string, string | string[]>;
}

export interface WebRequestCallback {
  (response: {
    cancel: boolean;
    responseHeaders?: Record<string, string | string[]>;
  }): void;
}

export interface WebRequestListener {
  (
    details: WebRequestDetails,
    callback: WebRequestCallback,
  ): void | Promise<void>;
}

export interface BetterWebRequest {
  onHeadersReceived: (listener: WebRequestListener) => void;
  setResolver: (
    event: string,
    resolver: (listeners: any[]) => Promise<any>,
  ) => void;
}

export interface BetterSession extends Electron.Session {
  webRequest: BetterWebRequest;
}
