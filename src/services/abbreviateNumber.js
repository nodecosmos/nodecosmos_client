export default function abbreviateNumber(num) {
    if (!num) return null;

    if (num >= 1e9) {
        return `${(num / 1e9).toFixed(1)}B`;
    } if (num >= 1e6) {
        return `${(num / 1e6).toFixed(1)}M`;
    } if (num >= 1e3) {
        return `${(num / 1e3).toFixed(1)}K`;
    }
    return num.toString();
}
