import useBooleanStateValue from './useBooleanStateValue';
import useAuthorizeNodeAction from '../../features/nodes/hooks/node/useAuthorizeNodeAction';
import { useCallback } from 'react';

export default function useBooleanStateAuthorized(defaultVal?: boolean): [boolean, () => void, () => void] {
    const [isTrue, setTrue, setFalse] = useBooleanStateValue(defaultVal);
    const authorizeNodeAction = useAuthorizeNodeAction();

    const handleSetTrue = useCallback(() => {
        if (authorizeNodeAction()) {
            setTrue();
        }
    }, [authorizeNodeAction, setTrue]);

    return [isTrue, handleSetTrue, setFalse];
}
