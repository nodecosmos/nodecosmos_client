import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { HEADER_HEIGHT } from '../../../app/constants';
import { selectIOPaneContent } from '../../inputOutputs.selectors';
import { selectSelectedWorkflowObject } from '../../../workflows/workflows.selectors';
import { setIOPaneContent } from '../../inputOutputsSlice';
import usePrevious from '../../../../common/hooks/usePrevious';
import { WorkflowDiagramObject } from '../../../workflows/types';
import { NodecosmosDispatch } from '../../../../store';
import { IOPaneContent } from '../../types';
import IOPaneDescription from './content/IOPaneDescription';
import IOPaneMarkdownEditor from './content/IOPaneMarkdownEditor';
import IOPaneToolbar from './IOPaneToolbar';
import IOPaneDescriptionEditor from './content/IOPaneDescriptionEditor';

export default function IOPane() {
    const ioPaneContent = useSelector(selectIOPaneContent) as IOPaneContent;
    const { id } = useSelector(selectSelectedWorkflowObject) as WorkflowDiagramObject;
    const prevId = usePrevious(id);
    const dispatch: NodecosmosDispatch = useDispatch();

    const contents = {
        'markdown': <IOPaneMarkdownEditor />,
        'editor': <IOPaneDescriptionEditor />,
        'description': <IOPaneDescription />,
    };

    const content = contents[ioPaneContent];

    useEffect(() => {
        if (prevId !== id) {
            dispatch(setIOPaneContent(IOPaneContent.Description));
        }
    }, [dispatch, id, prevId]);

    return (
        <Box
            width={1}
            height={1}
            sx={{ overflow: 'hidden', backgroundColor: 'background.5' }}
            position="relative"
            zIndex={1}
        >
            <IOPaneToolbar />
            <Box height={`calc(100% - ${HEADER_HEIGHT})`} overflow="auto" pt={0.25}>
                {content}
            </Box>
        </Box>
    );
}
