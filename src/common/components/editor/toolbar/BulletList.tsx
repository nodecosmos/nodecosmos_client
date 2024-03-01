import { RemirrorExtensions } from '../../../hooks/editor/useExtensions';
import { faList } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { useActive, useCommands } from '@remirror/react';
import React from 'react';

export default function BulletList() {
    const commands = useCommands<RemirrorExtensions>();
    const active = useActive<RemirrorExtensions>();

    return (
        <Tooltip title="Insert bullet list">
            <ToggleButton
                value="check"
                onClick={commands.toggleBulletList}
                selected={active.bulletList()}
            >
                <FontAwesomeIcon icon={faList} />
            </ToggleButton>
        </Tooltip>
    );
}
