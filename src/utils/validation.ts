import { Password } from '../features/users/users.types';

// eslint-disable-next-line max-len
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const validateEmailFormat = (email: string) => EMAIL_REGEX.test(email) ? undefined : 'email must be valid';
export const validateNotEmailFormat = (email: string) => EMAIL_REGEX.test(email) ? 'must not be an email' : undefined;
export const validateURL = (value: string) => {
    try {
        new URL(value);
        return undefined;
    } catch {
        return 'must be a valid URL starting with http:// or https://';
    }
};

export const validateURLSafe = (value: string) => /^[a-zA-Z0-9_-]+$/.test(value)
    ? undefined : 'can contain only letters, numbers, hyphens, and underscores';

export const passwordsMustMatch = (value: string, values: object) => {
    return (values as Password).password === value ? undefined : 'passwords must match';
};

export const isEmail = (value: string) => EMAIL_REGEX.test(value);
