import useToolbarItem from '../../../hooks/editor/useToolbarItem';
import { faBracketsCurly } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ToggleButton, Tooltip } from '@mui/material';
import React from 'react';

export function CodeBlock() {
    const [isActive, toggleNode] = useToolbarItem('codeBlock');

    return (
        <Tooltip title="Code block">
            <ToggleButton
                value="check"
                onClick={toggleNode}
                selected={isActive}
            >
                <FontAwesomeIcon icon={faBracketsCurly} />
            </ToggleButton>
        </Tooltip>
    );
}
