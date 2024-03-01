import { RemirrorExtensions } from '../../hooks/editor/useExtensions';
import { useCommands, useEditorFocus } from '@remirror/react';
import React, { ReactNode, useCallback } from 'react';

interface RemirrorClickableProps {
    children: ReactNode;
}

export default function RemirrorEditorFocusContainer({ children }: RemirrorClickableProps) {
    const [isFocused] = useEditorFocus();
    const commands = useCommands<RemirrorExtensions>();

    const handleClick = useCallback(() => {
        if (!isFocused) {
            commands.focus();
        }
    }, [commands, isFocused]);

    return (
        <div className="RemirrorTextEditor" onClick={handleClick}>
            {children}
        </div>
    );
}
