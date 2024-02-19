import { RemirrorExtensions } from '../../../hooks/remirror/useExtensions';
import { faRedo } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { useCommands, useHelpers } from '@remirror/react';
import React from 'react';

export default function Undo() {
    const { redoDepth } = useHelpers(true);
    const commands = useCommands<RemirrorExtensions>();

    return (
        <Tooltip title="Redo">
            <span>
                <ToggleButton
                    value="check"
                    onClick={commands.redo}
                    disabled={!(redoDepth() > 0)}
                >
                    <FontAwesomeIcon icon={faRedo} />
                </ToggleButton>
            </span>
        </Tooltip>
    );
}
