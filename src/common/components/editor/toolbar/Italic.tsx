import { RemirrorExtensions } from '../../../hooks/remirror/useExtensions';
import { faItalic } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { useActive, useCommands } from '@remirror/react';
import React, { useCallback } from 'react';

export default function Italic() {
    const commands = useCommands<RemirrorExtensions>();
    const active = useActive<RemirrorExtensions>();

    const toggleItalic = useCallback(() => {
        commands.toggleItalic();
    }, [commands]);

    return (
        <Tooltip title="Italic">
            <ToggleButton
                value="check"
                onClick={toggleItalic}
                selected={active.italic()}
            >
                <FontAwesomeIcon icon={faItalic} />
            </ToggleButton>
        </Tooltip>
    );
}
