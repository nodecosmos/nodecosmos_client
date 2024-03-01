import { RemirrorExtensions } from '../../../hooks/editor/useExtensions';
import { faStrikethrough } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { useActive, useCommands } from '@remirror/react';
import React, { useCallback } from 'react';

export default function Strikethrough() {
    const commands = useCommands<RemirrorExtensions>();
    const active = useActive<RemirrorExtensions>();

    const toggleStrikethrough = useCallback(() => {
        commands.toggleStrike();
    }, [commands]);

    return (
        <Tooltip title="Strikethrough">
            <ToggleButton
                value="check"
                onClick={toggleStrikethrough}
                selected={active.strike()}
            >
                <FontAwesomeIcon icon={faStrikethrough} />
            </ToggleButton>
        </Tooltip>
    );
}
