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
