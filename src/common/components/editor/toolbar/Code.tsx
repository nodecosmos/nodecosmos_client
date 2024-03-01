import { RemirrorExtensions } from '../../../hooks/editor/useExtensions';
import { faCode } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { useActive, useCommands } from '@remirror/react';
import React, { useCallback } from 'react';

export default function Code() {
    const commands = useCommands<RemirrorExtensions>();
    const active = useActive<RemirrorExtensions>();

    const toggleCode = useCallback(() => {
        commands.toggleCode();
    }, [commands]);

    return (
        <Tooltip title="Code">
            <ToggleButton
                value="check"
                onClick={toggleCode}
                selected={active.code()}
            >
                <FontAwesomeIcon icon={faCode} />
            </ToggleButton>
        </Tooltip>
    );
}
