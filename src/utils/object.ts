/**
 *
 * @description Updates the properties of the target object with the properties of the source object.
 */
export function updatePropertiesOf<
    T extends Partial<U>,
    U extends Record<string, unknown>
>(target: T, source: U): void {
    (Object.keys(source) as Array<keyof U>).forEach(key => {
        if (key in target) {
            target[key as keyof T] = source[key] as unknown as T[keyof T];
        }
    });
}

export function deepArrayToSet<T>(obj: T): T {
    if (Array.isArray(obj)) {
        return new Set(obj) as unknown as T;
    }

    if (typeof obj === 'object') {
        for (const key in obj) {
            obj[key] = deepArrayToSet(obj[key]);
        }
    }

    return obj;
}
