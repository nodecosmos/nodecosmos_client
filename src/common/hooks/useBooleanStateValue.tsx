import { useCallback, useState } from 'react';

export default function useBooleanStateValue(defaultVal?: boolean): [boolean, () => void, () => void] {
    const [boolValue, setBoolValue] = useState(defaultVal || false);

    const setTrue = useCallback(() => setBoolValue(true), []);
    const setFalse = useCallback(() => setBoolValue(false), []);

    return [boolValue, setTrue, setFalse];
}
