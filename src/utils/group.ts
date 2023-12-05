import { UUID } from '../types';
import { lruMemoize } from 'reselect';

export const groupById = lruMemoize(<T extends { id: UUID }>(items: T[]): Record<string, T> => {
    const result: Record<string, T> = {};

    items.forEach((item) => {
        result[item.id] = item;
    });

    return result;
});

export const flattenValues = lruMemoize(<T>(items: Record<string, T>): T[] => {
    const result: T[] = [];

    Object.values(items).forEach((item) => {
        result.push(item);
    });

    return result;
});
