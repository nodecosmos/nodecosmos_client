import { RemirrorExtensions } from '../../../hooks/remirror/useExtensions';
import { faUndo } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import { useCommands, useHelpers } from '@remirror/react';
import React from 'react';

export default function Undo() {
    const { undoDepth } = useHelpers(true);
    const commands = useCommands<RemirrorExtensions>();

    return (
        <Tooltip title="Undo">
            <span>
                <ToggleButton
                    value="check"
                    onClick={commands.undo}
                    disabled={!(undoDepth() > 0)}
                >
                    <FontAwesomeIcon icon={faUndo} />
                </ToggleButton>
            </span>
        </Tooltip>
    );
}
