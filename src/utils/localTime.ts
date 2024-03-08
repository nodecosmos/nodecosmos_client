export default function toLocalTime(utcTime: string) {
    return new Date(utcTime).toLocaleString();
}

export function timeSince(utcTime: string) {
    const date = new Date(utcTime);

    const seconds = Math.floor((Number(new Date()) - Number(date)) / 1000);

    let interval = seconds / 31536000;

    if (interval > 1) {
        return floorAndPluralize(interval, 'year');
    }

    interval = seconds / 2592000;
    if (interval > 1) {
        return floorAndPluralize(interval, 'month');
    }

    interval = seconds / 86400;
    if (interval > 1) {
        return floorAndPluralize(interval, 'day');
    }

    interval = seconds / 3600;
    if (interval > 1) {
        return floorAndPluralize(interval, 'hour');
    }

    interval = seconds / 60;
    if (interval > 1) {
        return floorAndPluralize(interval, 'minute');
    }

    return 'Just now';
}

function floorAndPluralize(value: number, unit: string) {
    const floor = Math.floor(value);

    return `${floor} ${unit}${floor > 1 ? 's' : ''} ago`;
}
