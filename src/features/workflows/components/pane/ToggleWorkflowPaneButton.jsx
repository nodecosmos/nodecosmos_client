import React, { useCallback } from 'react';
import { faRectangleTerminal } from '@fortawesome/pro-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import ToolbarItem from '../../../../common/components/toolbar/ToolbarItem';
import { selectIsWfPaneOpen } from '../../workflows.selectors';
import { setIsWfPaneOpen } from '../../workflowsSlice';
import ToolbarContainer from '../../../../common/components/toolbar/ToolbarContainer';
import { HEADER_HEIGHT } from '../../../app/constants';

export default function ToggleWorkflowPaneButton() {
    const isWfPaneOpen = useSelector(selectIsWfPaneOpen);
    const dispatch = useDispatch();
    const toggleWfPane = useCallback(() => dispatch(setIsWfPaneOpen(!isWfPaneOpen)), [dispatch, isWfPaneOpen]);

    return (
        <ToolbarContainer round mr={0.5} showIndicator={false} size={`calc(${HEADER_HEIGHT} - 8px)`}>
            <ToolbarItem
                title={isWfPaneOpen ? 'Hide Workflow Pane' : 'Show Workflow Pane'}
                icon={faRectangleTerminal}
                color="toolbar.pink"
                active={isWfPaneOpen}
                onClick={toggleWfPane}
                flipX={!isWfPaneOpen}
            />
        </ToolbarContainer>
    );
}
