import ToolbarContainer from '../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../common/components/toolbar/ToolbarItem';
import { selectIsPaneOpen } from '../app.selectors';
import { setIsPaneOpen } from '../appSlice';
import { HEADER_HEIGHT } from '../constants';
import { faSquareTerminal } from '@fortawesome/pro-duotone-svg-icons';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function TogglePaneButton() {
    const isPaneOpen = useSelector(selectIsPaneOpen);
    const dispatch = useDispatch();
    const toggleWfPane = useCallback(() => dispatch(setIsPaneOpen(!isPaneOpen)), [dispatch, isPaneOpen]);

    return (
        <ToolbarContainer round mr={0.5} showIndicator={false} size={`calc(${HEADER_HEIGHT} - 8px)`}>
            <ToolbarItem
                title={isPaneOpen ? 'Hide Workflow Pane' : 'Show Workflow Pane'}
                icon={faSquareTerminal}
                color="toolbar.lightRed"
                active={isPaneOpen}
                onClick={toggleWfPane}
                flipX={!isPaneOpen}
            />
        </ToolbarContainer>
    );
}
