import { HttpStatusCode } from 'axios';

export type UUID = string;
export type OptionalId<T> = Omit<T, 'id'> & { id?: UUID };

export type NodecosmosError = {
    status?: HttpStatusCode;
    message?: string;
};

export interface Position {
    x: number;
    y: number;
    xEnd: number;
    yEnd: number;
}

export interface Profile {
    id: UUID;
    profileType: string;
    name: string;
    username: string | null;
    profileImageURL: string | null;
}

export enum ProfileType {
    User = 'User',
    Organization = 'Organization',
}

export type Exact<T, Shape> = T & {
    [K in Exclude<keyof Shape, keyof T>]?: never;
};

export type Strict<MyType> = MyType & Exact<MyType, MyType>;
