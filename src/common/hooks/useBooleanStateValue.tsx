import { useCallback, useState } from 'react';

export default function useBooleanStateValue(): [boolean, () => void, () => void] {
    const [boolValue, setBoolValue] = useState(false);

    const setTrue = useCallback(() => setBoolValue(true), []);
    const setFalse = useCallback(() => setBoolValue(false), []);

    return [boolValue, setTrue, setFalse];
}
