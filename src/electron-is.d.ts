// Type declarations for electron-is package with freebsd support
// This extends the existing types to include the freebsd() method

declare module 'electron-is' {
  const is: {
    // Original methods
    (): string;
    dev: () => boolean;
    production: () => boolean;
    renderer: () => boolean;
    webWorker: () => boolean;
    main: () => boolean;

    // Platform detection
    macOS: () => boolean;
    windows: () => boolean;
    linux: () => boolean;
    freebsd: () => boolean; // Added freebsd support

    // Architecture detection
    x86: () => boolean;
    x64: () => boolean;
    arm: () => boolean;

    // Other checks
    mas: () => boolean;
    windowsStore: () => boolean;
    windowsStoreDesktop: () => boolean;
    linuxSnap: () => boolean;
  };

  export = is;
}
