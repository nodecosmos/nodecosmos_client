import React from 'react';
import { faTerminal } from '@fortawesome/pro-solid-svg-icons';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ToolbarContainer from '../../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../../common/components/toolbar/ToolbarItem';
import { selectIsWfPaneOpen } from '../../workflows.selectors';
import { setIsWfPaneOpen } from '../../workflowsSlice';

export default function ToggleWorkflowPaneButton() {
    const isWfPaneOpen = useSelector(selectIsWfPaneOpen);
    const dispatch = useDispatch();

    return (
        <ToolbarContainer round mr={0.5}>
            <ToolbarItem
                title={isWfPaneOpen ? 'Hide Workflow Pane' : 'Show Workflow Pane'}
                icon={faTerminal}
                color="toolbar.pink"
                active={false}
                onClick={() => dispatch(setIsWfPaneOpen(!isWfPaneOpen))}
                flipX={!isWfPaneOpen}
            />
            {/* hack to get toolbar button styles right */}
            <Button sx={{ display: 'none' }} />
        </ToolbarContainer>
    );
}
