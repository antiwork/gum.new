declare module "get-pixels" {
  interface PixelsResult {
    data: Uint8Array;
    shape: [number, number, number];
  }

  function getPixels(url: string, callback: (err: Error | null, pixels: PixelsResult) => void): void;
  export = getPixels;
}
