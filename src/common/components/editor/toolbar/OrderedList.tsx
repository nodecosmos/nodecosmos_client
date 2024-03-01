import { RemirrorExtensions } from '../../../hooks/editor/useExtensions';
import { faListOl } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { useActive, useCommands } from '@remirror/react';
import React from 'react';

export default function OrderedList() {
    const commands = useCommands<RemirrorExtensions>();
    const active = useActive<RemirrorExtensions>();

    return (
        <Tooltip title="Insert numbered list">
            <ToggleButton
                value="check"
                onClick={commands.toggleOrderedList}
                selected={active.orderedList()}
            >
                <FontAwesomeIcon icon={faListOl} />
            </ToggleButton>
        </Tooltip>
    );
}
