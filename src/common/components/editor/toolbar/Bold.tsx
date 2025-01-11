import useEditorItem from '../../../hooks/editor/useEditorItem';
import { faBold } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import React from 'react';

export default function Bold() {
    const [isActive, toggleNode] = useEditorItem('bold');

    return (
        <Tooltip title="Bold">
            <ToggleButton
                value="check"
                onClick={toggleNode}
                selected={isActive}
            >
                <FontAwesomeIcon icon={faBold} />
            </ToggleButton>
        </Tooltip>
    );
}
