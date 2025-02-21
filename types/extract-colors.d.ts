declare module "extract-colors" {
  interface ExtractColorsOptions {
    pixels?: number;
    distance?: number;
    saturationDistance?: number;
    lightnessDistance?: number;
    hueDistance?: number;
    colorValidator?: (red: number, green: number, blue: number, alpha?: number) => boolean;
  }

  interface ColorResult {
    hex: string;
    red: number;
    green: number;
    blue: number;
    hue: number;
    intensity: number;
    lightness: number;
    saturation: number;
    area: number;
  }

  interface ImageDataAlt {
    data: number[] | Uint8Array;
    width: number;
    height: number;
  }

  export function extractColors(
    input: ImageDataAlt | HTMLImageElement | string,
    options?: ExtractColorsOptions,
  ): Promise<ColorResult[]>;
}
