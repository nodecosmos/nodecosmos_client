import { RemirrorExtensions } from '../../../hooks/editor/useExtensions';
import { faSquareQuote } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { useActive, useCommands } from '@remirror/react';
import React from 'react';

export default function BlockQuote() {
    const commands = useCommands<RemirrorExtensions>();
    const active = useActive<RemirrorExtensions>();

    return (
        <Tooltip title="Insert blockquote">
            <ToggleButton
                value="check"
                onClick={commands.toggleBlockquote}
                selected={active.blockquote()}
            >
                <FontAwesomeIcon icon={faSquareQuote} />
            </ToggleButton>
        </Tooltip>
    );
}
