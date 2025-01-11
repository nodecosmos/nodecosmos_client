import useEditorItem from '../../../hooks/editor/useEditorItem';
import { faList } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import React from 'react';

export default function BulletList() {
    const [isActive, toggleNode] = useEditorItem('bulletList');

    return (
        <Tooltip title="Insert bullet list">
            <ToggleButton
                value="check"
                onClick={toggleNode}
                selected={isActive}
            >
                <FontAwesomeIcon icon={faList} />
            </ToggleButton>
        </Tooltip>
    );
}
