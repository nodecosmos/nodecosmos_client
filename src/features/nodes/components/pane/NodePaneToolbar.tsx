import ToolbarContainer from '../../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../../common/components/toolbar/ToolbarItem';
import { NodecosmosDispatch } from '../../../../store';
import TogglePaneButton from '../../../app/components/TogglePaneButton';
import { HEADER_HEIGHT } from '../../../app/constants';
import useBranchParams from '../../../branch/hooks/useBranchParams';
import { setNodePaneContent } from '../../actions';
import {
    selectNodeAttribute, selectNodePaneContent, selectSelectedNode,
} from '../../nodes.selectors';
import { NodePaneContent } from '../../nodes.types';
import { faHashtag } from '@fortawesome/pro-light-svg-icons';
import {
    faRectangleCode,
    faCodeCommit,
    faDisplay,
    faPenToSquare,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography, Box } from '@mui/material';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export enum Page {
    Nodes = 'nodes',
    Workflow = 'workflow',
}

interface NodePaneToolbarProps {
    page?: Page;
}

export default function NodePaneToolbar(props: NodePaneToolbarProps) {
    const { page = Page.Nodes } = props;
    const dispatch: NodecosmosDispatch = useDispatch();
    const { id, title } = useSelector(selectSelectedNode);
    const nodePaneContent = useSelector(selectNodePaneContent);
    const { currentRootNodeId } = useBranchParams();
    const oldTitle = useSelector(selectNodeAttribute(currentRootNodeId, id, 'title'));

    const isTitleEdited = oldTitle && title !== oldTitle;

    const handleTogglePane = useCallback((paneContent: NodePaneContent | undefined) => {
        if (paneContent) {
            dispatch(setNodePaneContent(paneContent));
        }
    }, [dispatch]);

    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            height={HEADER_HEIGHT}
            borderBottom={1}
            borderColor="borders.2"
        >
            <ToolbarContainer>
                <ToolbarItem
                    title="Description Markdown (Read Only)"
                    icon={faRectangleCode}
                    color="toolbar.lightRed"
                    active={nodePaneContent === NodePaneContent.Markdown}
                    onClick={handleTogglePane}
                    onClickValue={NodePaneContent.Markdown}
                />
                <ToolbarItem
                    title="Edit Description"
                    icon={faPenToSquare}
                    color="toolbar.green"
                    active={nodePaneContent === NodePaneContent.Editor}
                    onClick={handleTogglePane}
                    onClickValue={NodePaneContent.Editor}
                />
                <ToolbarItem
                    title="View Description"
                    icon={faDisplay}
                    color="toolbar.blue"
                    active={nodePaneContent === NodePaneContent.Description}
                    onClick={handleTogglePane}
                    onClickValue={NodePaneContent.Description}
                />
                <ToolbarItem
                    title="Workflow"
                    icon={faCodeCommit}
                    color="toolbar.yellow"
                    active={nodePaneContent === NodePaneContent.Workflow}
                    onClick={handleTogglePane}
                    onClickValue={NodePaneContent.Workflow}
                />
            </ToolbarContainer>

            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ svg: { color: 'background.list.defaultColor' } }}
            >
                {title && <FontAwesomeIcon icon={faHashtag} />}
                <Typography
                    align="center"
                    variant="body1"
                    color="text.secondary"
                    ml={1}
                    sx={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        span: { p: 1 },
                        '.diff-removed': {
                            backgroundColor: 'diff.removedBg',
                            color: 'diff.removedFg',
                            fontWeight: 'bold',
                        },
                        '.diff-added': {
                            backgroundColor: 'diff.addedBg',
                            color: 'diff.addedFg',
                            fontWeight: 'bold',
                        },
                    }}
                >
                    {isTitleEdited && <span className="diff-removed">{oldTitle}</span>}

                    <span className={isTitleEdited ? 'diff-added' : undefined}>{title}</span>
                </Typography>
            </Box>
            {
                (page === Page.Workflow && <TogglePaneButton />) || <div />
            }
        </Box>
    );
}
