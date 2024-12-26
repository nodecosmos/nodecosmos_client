import useToolbarItem from '../../../hooks/editor/useToolbarItem';
import { faCode } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import React from 'react';

export default function Code() {
    const [isActive, toggleNode] = useToolbarItem('code');

    return (
        <Tooltip title="Code">
            <ToggleButton
                value="check"
                onClick={toggleNode}
                selected={isActive}
            >
                <FontAwesomeIcon icon={faCode} />
            </ToggleButton>
        </Tooltip>
    );
}
