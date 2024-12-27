import useToolbarItem from '../../../hooks/editor/useToolbarItem';
import { faList } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import React from 'react';

export default function BulletList() {
    const [isActive, toggleNode] = useToolbarItem('bulletList');

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
