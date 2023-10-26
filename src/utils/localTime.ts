export default function toLocalTime(utcTime: string) {
    return new Date(utcTime).toLocaleString();
}
