import FlowPane from '../../../flows/components/pane/FlowPane';
import IOPane from '../../../input-outputs/components/pane/IOPane';
import NodePane from '../../../nodes/components/pane/NodePane';
import { WorkflowDiagramObject } from '../../types';
import { selectSelectedWorkflowObject } from '../../workflows.selectors';
import { Typography, Box } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export default function WorkflowPane() {
    const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowObject) as WorkflowDiagramObject;

    const { type } = selectedWorkflowDiagramObject || {};

    const content = {
        flow: <FlowPane />,
        flowStep: null,
        node: <NodePane page="workflow" />,
        io: <IOPane />,
    };

    if (!type) {
        return (
            <Box m={3} height={1} display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                <Typography variant="h6" color="text.secondary" textAlign="center">
          Select a workflow object to view its properties
                </Typography>
                <Typography variant="h5" color="text.secondary" textAlign="center" mt={1}>
          ¯\_(ツ)_/¯
                </Typography>
            </Box>
        );
    }

    return content[type];
}
