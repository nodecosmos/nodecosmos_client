import useEditorItem from '../../../hooks/editor/useEditorItem';
import { faItalic } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import React from 'react';

export default function Italic() {
    const [isActive, toggleNode] = useEditorItem('italic');

    return (
        <Tooltip title="Italic">
            <ToggleButton
                value="check"
                onClick={toggleNode}
                selected={isActive}
            >
                <FontAwesomeIcon icon={faItalic} />
            </ToggleButton>
        </Tooltip>
    );
}
