import { extractColors } from "extract-colors";
import type { ColorResult } from "extract-colors";
import getPixels from "get-pixels";
import { promisify } from "util";

const getPixelsAsync = promisify(getPixels);

const MAX_COLORS = 5;
const MIN_COLORS = 3;

export async function extractImageColors(imageUrl: string | null | undefined) {
  if (!imageUrl) {
    return null;
  }

  try {
    const pixels = await getPixelsAsync(imageUrl);
    const data = [...pixels.data];
    const [width, height] = pixels.shape;

    const colors = await extractColors(
      { data, width, height },
      {
        pixels: 64000,
        distance: 0.22, // Increased slightly to better distinguish colors
        saturationDistance: 0.2,
        lightnessDistance: 0.2,
        hueDistance: 0.1,
      },
    );

    // Sort by area to get most dominant colors first
    const sortedColors = colors
      .sort((a, b) => b.area - a.area)
      .map((color) => ({
        hex: color.hex,
        lightness: color.lightness,
        saturation: color.saturation,
      }));

    // Always include the most dominant color
    const result = [sortedColors[0].hex];

    // Add black and white if they exist in the palette or are close
    const hasBlack = sortedColors.find((c) => c.lightness < 0.15);
    const hasWhite = sortedColors.find((c) => c.lightness > 0.85);

    if (hasBlack) result.push(hasBlack.hex);
    if (hasWhite) result.push(hasWhite.hex);

    // Fill remaining slots with vibrant colors (high saturation)
    const remainingSlots = MAX_COLORS - result.length;
    if (remainingSlots > 0) {
      const vibrantColors = sortedColors
        .filter((c) => c.saturation > 0.4 && !result.includes(c.hex))
        .slice(0, remainingSlots);

      result.push(...vibrantColors.map((c) => c.hex));
    }

    // Ensure we have at least MIN_COLORS
    while (result.length < MIN_COLORS && sortedColors.length > result.length) {
      const nextColor = sortedColors.find((c) => !result.includes(c.hex));
      if (nextColor) result.push(nextColor.hex);
    }

    return result;
  } catch (error) {
    console.error("Failed to extract colors:", error);
    return null;
  }
}
