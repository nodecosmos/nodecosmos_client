import { RemirrorExtensions } from '../../../hooks/editor/useExtensions';
import { faBracketsCurly } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { useActive, useCommands } from '@remirror/react';
import React, { useCallback } from 'react';

export function CodeBlock() {
    const commands = useCommands<RemirrorExtensions>();
    const active = useActive<RemirrorExtensions>();

    const toggleCodeBlock = useCallback(() => {
        commands.toggleCodeBlock();
    }, [commands]);

    return (
        <Tooltip title="Code block">
            <ToggleButton
                value="check"
                onClick={toggleCodeBlock}
                selected={active.codeBlock()}
            >
                <FontAwesomeIcon icon={faBracketsCurly} />
            </ToggleButton>
        </Tooltip>
    );
}
