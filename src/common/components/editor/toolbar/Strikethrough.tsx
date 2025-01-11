import useEditorItem from '../../../hooks/editor/useEditorItem';
import { faStrikethrough } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import React from 'react';

export default function Strikethrough() {
    const [isActive, toggleNode] = useEditorItem('strike');

    return (
        <Tooltip title="Strikethrough">
            <ToggleButton
                value="check"
                onClick={toggleNode}
                selected={isActive}
            >
                <FontAwesomeIcon icon={faStrikethrough} />
            </ToggleButton>
        </Tooltip>
    );
}
