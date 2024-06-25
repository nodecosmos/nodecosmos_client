import React, { useEffect } from 'react';

export default function useOutsideClick(ref: React.RefObject<HTMLDivElement>, onBlur?: () => void) {
    useEffect(() => {
        if (!onBlur) {
            return;
        }

        function handleClickOutside(event: MouseEvent) {
            if (!onBlur) {
                return;
            }

            if (ref.current && !ref.current.contains(event.target as Node)) {
                onBlur();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref, onBlur]);
}
