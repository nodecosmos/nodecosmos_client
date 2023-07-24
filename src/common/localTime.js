export default function toLocalTime(utcTime) {
  return new Date(utcTime).toLocaleString();
}
