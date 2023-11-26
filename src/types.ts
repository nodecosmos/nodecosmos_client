export type UUID = string;
export type OptionalId<T> = Omit<T, 'id'> & { id?: UUID };

export interface Position {
    x: number;
    y: number;
    xEnd: number;
    yEnd: number;
}

export interface Owner {
    id: UUID;
    ownerType: string;
    name: string;
    username: string | null;
    profileImageURL: string | null;
}

export enum OwnerType {
    User = 'user',
    Organization = 'organization',
}

export type Exact<T, Shape> = T & {
    [K in Exclude<keyof Shape, keyof T>]?: never;
};

export type Strict<MyType> = MyType & Exact<MyType, MyType>;
