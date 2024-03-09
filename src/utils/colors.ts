export function withOpacity(color: string, opacity: number): string {
    // Check if color is a valid hex color
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
        throw new Error('Invalid color. Color should be a hex color.');
    }

    // Check if opacity is a valid number between 0 and 1
    if (isNaN(opacity) || (opacity < 0) || (opacity > 1)) {
        throw new Error('Invalid opacity. Opacity should be a number between 0 and 1.');
    }

    // Convert opacity to hex
    let hex = Math.round(opacity * 255).toString(16);

    // Ensure hex is always 2 digits
    if (hex.length < 2) {
        hex = '0' + hex;
    }

    return color + hex;
}
