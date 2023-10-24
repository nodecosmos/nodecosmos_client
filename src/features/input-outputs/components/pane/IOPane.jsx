import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { HEADER_HEIGHT } from '../../../app/constants';
import { selectIOPaneContent } from '../../inputOutputs.selectors';
import { selectSelectedWorkflowObject } from '../../../workflows/workflows.selectors';
import { setIOPaneContent } from '../../inputOutputsSlice';
import { IO_PANE_CONTENTS } from '../../inputOutputs.constants';
import usePrevious from '../../../../common/hooks/usePrevious';
import IOPaneDescription from './content/IOPaneDescription';
import IOPaneMarkdownEditor from './content/IOPaneMarkdownEditor';
import IOPaneToolbar from './IOPaneToolbar';
import IOPaneWysiwygEditor from './content/IOPaneWysiwygEditor';

export default function IOPane() {
    const ioPaneContent = useSelector(selectIOPaneContent);
    const { id } = useSelector(selectSelectedWorkflowObject);
    const prevId = usePrevious(id);
    const dispatch = useDispatch();

    const contents = {
        markdown: <IOPaneMarkdownEditor />,
        editor: <IOPaneWysiwygEditor />,
        description: <IOPaneDescription />,
    };

    const content = contents[ioPaneContent];

    useEffect(() => {
        if (prevId !== id) {
            dispatch(setIOPaneContent(IO_PANE_CONTENTS.description));
        }
    }, [dispatch, id, prevId]);

    return (
        <Box
            width={1}
            height={1}
            backgroundColor="background.5"
            sx={{ overflow: 'hidden' }}
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
