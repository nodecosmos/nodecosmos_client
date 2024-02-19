import { RemirrorExtensions } from '../../../hooks/remirror/useExtensions';
import { faBold } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { useActive, useCommands } from '@remirror/react';
import React, { useCallback } from 'react';

export default function Bold() {
    const commands = useCommands<RemirrorExtensions>();
    const active = useActive<RemirrorExtensions>();

    const toggleBold = useCallback(() => {
        commands.toggleBold();
    }, [commands]);

    return (
        <Tooltip title="Bold">
            <ToggleButton
                value="check"
                onClick={toggleBold}
                selected={active.bold()}
            >
                <FontAwesomeIcon icon={faBold} />
            </ToggleButton>
        </Tooltip>
    );
}
