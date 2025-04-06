import { PanePage } from './Pane';
import ToolbarContainer from '../../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../../common/components/toolbar/ToolbarItem';
import { OBJECT_TYPE_NAMES, ObjectType } from '../../../../types';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { HEADER_HEIGHT } from '../../constants';
import { PaneContent, usePaneContext } from '../../hooks/pane/usePaneContext';
import useTogglePane from '../../hooks/pane/useTogglePane';
import TogglePaneButton from '../TogglePaneButton';
import { faRectangleCode, faComments } from '@fortawesome/pro-regular-svg-icons';
import {
    faHashtag, faCodeCommit, faCodePullRequest, faDisplay, faPenToSquare,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';
import React, { useMemo } from 'react';

const OBJECT_SYMBOL_ICONS = {
    [ObjectType.Node]: faHashtag,
    [ObjectType.Workflow]: faCodeCommit,
    [ObjectType.Flow]: faCodePullRequest,
    [ObjectType.FlowStep]: faCodePullRequest,
    [ObjectType.Io]: faCodePullRequest,
};

export default function PaneToolbar() {
    const { isBranch } = useBranchContext();
    const {
        content, objectType, page,
    } = usePaneContext();
    const handleTogglePane = useTogglePane();
    const markdownTitle = useMemo(() => {
        if (isBranch) {
            return 'Markdown (Read Only) You can use this page to add text comments to the branch.';
        }

        return 'Markdown (Read Only)';
    }, [isBranch]);

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
                    title={markdownTitle}
                    icon={faRectangleCode}
                    color="toolbar.lightRed"
                    active={content === PaneContent.Markdown}
                    onClick={handleTogglePane}
                    onClickValue={PaneContent.Markdown}
                />
                <ToolbarItem
                    title="Edit Description"
                    icon={faPenToSquare}
                    color="toolbar.green"
                    active={content === PaneContent.Editor}
                    onClick={handleTogglePane}
                    onClickValue={PaneContent.Editor}
                />
                <ToolbarItem
                    title="Description"
                    icon={faDisplay}
                    color="toolbar.blue"
                    active={content === PaneContent.Description}
                    onClick={handleTogglePane}
                    onClickValue={PaneContent.Description}
                />
                {objectType === ObjectType.Node && (
                    <ToolbarItem
                        title="Workflow"
                        icon={faCodeCommit}
                        color="toolbar.purple"
                        active={content === PaneContent.Workflow}
                        onClick={handleTogglePane}
                        onClickValue={PaneContent.Workflow}
                    />
                )}
                {
                    isBranch && (
                        <ToolbarItem
                            title="Comments"
                            icon={faComments}
                            color="toolbar.pink"
                            active={content === PaneContent.Comments}
                            onClick={handleTogglePane}
                            onClickValue={PaneContent.Comments}
                        />
                    )
                }
            </ToolbarContainer>

            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography
                    variant="body2"
                    color="texts.tertiary"
                    fontWeight="bold"
                    borderRadius={1}
                >
                    <FontAwesomeIcon
                        icon={OBJECT_SYMBOL_ICONS[objectType]}
                        className="default-list-color mr-1" />
                    {OBJECT_TYPE_NAMES[objectType]}
                </Typography>
            </Box>
            {
                (page === PanePage.Workflow && <TogglePaneButton />) || <div />
            }
        </Box>
    );
}
