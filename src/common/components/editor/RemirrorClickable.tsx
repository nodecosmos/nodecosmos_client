
import { RemirrorExtensions } from '../../hooks/remirror/useExtensions';
import { useCommands } from '@remirror/react';
import React, { ReactNode, useCallback } from 'react';

interface RemirrorClickableProps {
    children: ReactNode;
}

export default function RemirrorClickable({ children }: RemirrorClickableProps) {
    const commands = useCommands<RemirrorExtensions>();

    const handleClick = useCallback(() => {
        commands.focus();
    }, [commands]);

    return (
        <div className="RemirrorTextEditor" onClick={handleClick}>
            {children}
        </div>
    );
}
