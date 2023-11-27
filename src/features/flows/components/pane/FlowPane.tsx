import FlowPaneDescription from './content/FlowPaneDescription';
import FlowPaneDescriptionEditor from './content/FlowPaneDescriptionEditor';
import FlowPaneMarkdownEditor from './content/FlowPaneMarkdownEditor';
import FlowPaneToolbar from './FlowPaneToolbar';
import usePrevious from '../../../../common/hooks/usePrevious';
import { HEADER_HEIGHT } from '../../../app/constants';
import { selectSelectedWorkflowObject } from '../../../workflows/workflow.selectors';
import { WorkflowDiagramObject } from '../../../workflows/workflow.types';
import { FLOW_PANE_CONTENTS } from '../../flows.constants';
import { selectFlowPaneContent } from '../../flows.selectors';
import { setFlowPaneContent } from '../../flowsSlice';
import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function FlowPane() {
    const ioPaneContent = useSelector(selectFlowPaneContent);
    const { id } = useSelector(selectSelectedWorkflowObject) as WorkflowDiagramObject;
    const prevId = usePrevious(id);
    const dispatch = useDispatch();

    const contents = {
        markdown: <FlowPaneMarkdownEditor />,
        description: <FlowPaneDescription />,
        editor: <FlowPaneDescriptionEditor />,
    };

    const content = contents[ioPaneContent];

    useEffect(() => {
        if (prevId !== id) {
            dispatch(setFlowPaneContent(FLOW_PANE_CONTENTS.description));
        }
    }, [dispatch, id, prevId]);

    return (
        <Box
            width={1}
            height={1}
            sx={{
                backgroundColor: 'background.5',
                overflow: 'hidden',
                'h1, h2, h3, h4, h5, h6': {
                    marginBlockStart: 0,
                    marginBlockEnd: 2,
                },
            }}
            position="relative"
            zIndex={1}
        >
            <FlowPaneToolbar />
            <Box height={`calc(100% - ${HEADER_HEIGHT})`} overflow="auto" pt={0.25}>
                {content}
            </Box>
        </Box>
    );
}
