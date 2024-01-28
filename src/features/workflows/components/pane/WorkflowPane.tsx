import TogglePaneButton from '../../../app/components/TogglePaneButton';
import { HEADER_HEIGHT } from '../../../app/constants';
import FlowPane from '../../../flows/components/pane/FlowPane';
import IOPane from '../../../input-outputs/components/pane/IOPane';
import NodePane from '../../../nodes/components/pane/NodePane';
import { Page } from '../../../nodes/components/pane/NodePaneToolbar';
import { selectSelectedWorkflowObject } from '../../workflow.selectors';
import { WorkflowDiagramObject } from '../../workflow.types';
import { Typography, Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function WorkflowPane() {
    const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowObject) as WorkflowDiagramObject;

    const { type } = selectedWorkflowDiagramObject || {};

    const content = {
        flow: <FlowPane />,
        flowStep: null,
        node: <NodePane page={Page.Workflow} />,
        io: <IOPane />,
    };

    if (!type) {
        return (
            <Box height={1}>
                <Box display="flex" alignItems="center" justifyContent="end" height={HEADER_HEIGHT}>
                    <TogglePaneButton />
                </Box>
                <Box m={3} height={1} display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                    <Typography variant="h6" color="text.secondary" textAlign="center">
                        Select a workflow object to view its properties
                    </Typography>
                    <Typography variant="h5" color="text.secondary" textAlign="center" mt={1}>
                        ¯\_(ツ)_/¯
                    </Typography>
                </Box>
            </Box>
        );
    }

    return content[type];
}
