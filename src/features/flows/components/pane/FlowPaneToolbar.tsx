import React from 'react';
import {
    faPenToSquare, faTrash, faRectangleCode, faCodeCommit, faDisplay,
} from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    IconButton, Tooltip, Typography, Box,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import ToolbarContainer from '../../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../../common/components/toolbar/ToolbarItem';
import { HEADER_HEIGHT } from '../../../app/constants';
import { FLOW_PANE_CONTENTS } from '../../flows.constants';
import ToggleWorkflowPaneButton from '../../../workflows/components/pane/ToggleWorkflowPaneButton';
import { selectSelectedWorkflowObject } from '../../../workflows/workflows.selectors';
import {
    selectFlowAttribute, selectFlowPaneContent, selectFlowPrimaryKey,
} from '../../flows.selectors';
import { deleteFlow } from '../../flows.thunks';
import { setFlowPaneContent } from '../../flowsSlice';
import { WorkflowDiagramObject } from '../../../workflows/types';
import { NodecosmosDispatch } from '../../../../store';
import { FlowPaneContent } from '../../types';

export default function FlowPaneToolbar() {
    const selectedWorkflowDiagramObject = useSelector(selectSelectedWorkflowObject) as WorkflowDiagramObject;
    const { id } = selectedWorkflowDiagramObject;
    const dispatch: NodecosmosDispatch = useDispatch();
    const ioPaneContent = useSelector(selectFlowPaneContent) as FlowPaneContent;

    const title = useSelector(selectFlowAttribute(id, 'title'));
    const primaryKey = useSelector(selectFlowPrimaryKey(id));

    const handleDeleteFlow = () => {
        dispatch(deleteFlow(primaryKey));
    };

    const hasShadow = ioPaneContent === FlowPaneContent.Description;

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            height={HEADER_HEIGHT}
            borderBottom={1}
            borderColor="borders.2"
            boxShadow={hasShadow ? '2' : 0}
        >
            <ToolbarContainer>
                <ToolbarItem
                    title="Edit Description Markdown"
                    icon={faRectangleCode}
                    color="toolbar.lightRed"
                    active={ioPaneContent === FLOW_PANE_CONTENTS.markdown}
                    onClick={() => dispatch(setFlowPaneContent(FLOW_PANE_CONTENTS.markdown))}
                />
                <ToolbarItem
                    title="Edit Description Markdown"
                    icon={faPenToSquare}
                    color="toolbar.green"
                    active={ioPaneContent === FLOW_PANE_CONTENTS.editor}
                    onClick={() => dispatch(setFlowPaneContent(FLOW_PANE_CONTENTS.editor))}
                />
                <ToolbarItem
                    title="View Description"
                    icon={faDisplay}
                    color="toolbar.blue"
                    active={ioPaneContent === FLOW_PANE_CONTENTS.description}
                    onClick={() => dispatch(setFlowPaneContent(FLOW_PANE_CONTENTS.description))}
                />
            </ToolbarContainer>

            <Box
                display="flex"
                alignItems="center"
                sx={{ svg: { color: 'background.list.defaultColor', mr: 0.5, ml: 1 } }}>
                {title && <FontAwesomeIcon icon={faCodeCommit} />}
                <Typography
                    align="center"
                    variant="body1"
                    color="text.secondary"
                    ml={1}
                    sx={{
                        maxWidth: 200,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {title}
                </Typography>

                <Box
                    display="flex"
                    sx={{
                        ml: 1,
                        '.Item': {
                            width: 31,
                            height: 1,
                            mx: 0.25,
                            borderRadius: 1,
                            '&:hover': { backgroundColor: 'toolbar.hover' },
                        },
                        '.svg-inline--fa, .MuiSvgIcon-root': { fontSize: 16 },
                    }}
                >
                    <Tooltip title="Delete Flow" placement="top">
                        <IconButton
                            className="Item"
                            aria-label="Delete Flow"
                            sx={{ svg: { color: 'toolbar.lightRed' } }}
                            onClick={handleDeleteFlow}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <Box>
                <ToggleWorkflowPaneButton />
            </Box>

        </Box>
    );
}
