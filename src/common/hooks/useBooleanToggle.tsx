import { useCallback, useState } from 'react';

export default function useBooleanToggle(): [boolean, () => void] {
    const [boolValue, setBoolValue] = useState(false);

    const toggleValue = useCallback(() => setBoolValue(!boolValue), [boolValue]);

    return [boolValue, toggleValue];
}
