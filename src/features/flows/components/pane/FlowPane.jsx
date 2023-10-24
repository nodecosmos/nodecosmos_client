import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { HEADER_HEIGHT } from '../../../app/constants';
import { selectFlowPaneContent } from '../../flows.selectors';
import { selectSelectedWorkflowObject } from '../../../workflows/workflows.selectors';
import { FLOW_PANE_CONTENTS } from '../../flows.constants';
import { setFlowPaneContent } from '../../flowsSlice';
import usePrevious from '../../../../common/hooks/usePrevious';
import FlowPaneDescription from './content/FlowPaneDescription';
import FlowPaneMarkdownEditor from './content/FlowPaneMarkdownEditor';
import FlowPaneToolbar from './FlowPaneToolbar';
import FlowPaneWysiwygEditor from './content/FlowPaneWysiwygEditor';

export default function FlowPane() {
    const ioPaneContent = useSelector(selectFlowPaneContent);
    const { id } = useSelector(selectSelectedWorkflowObject);
    const prevId = usePrevious(id);
    const dispatch = useDispatch();

    const contents = {
        markdown: <FlowPaneMarkdownEditor />,
        description: <FlowPaneDescription />,
        editor: <FlowPaneWysiwygEditor />,
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
            backgroundColor="background.5"
            sx={{
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
