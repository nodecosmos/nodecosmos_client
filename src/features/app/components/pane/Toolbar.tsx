import { PanePage } from './Pane';
import ToolbarContainer from '../../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../../common/components/toolbar/ToolbarItem';
import { OBJECT_TYPE_NAMES, ObjectType } from '../../../../types';
import { selectBranch } from '../../../branch/branches.selectors';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { HEADER_HEIGHT } from '../../constants';
import {
    PANE_Q, PaneContent, usePaneContext,
} from '../../hooks/pane/usePaneContext';
import TogglePaneButton from '../TogglePaneButton';
import {
    faCodeCommit, faDisplay, faPenToSquare, faRectangleCode, faComments,
} from '@fortawesome/pro-regular-svg-icons';
import { faAngleRight } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

export default function PaneToolbar() {
    const { isBranch } = useBranchContext();
    const {
        objectTitle, originalObjectTitle, setContent, content, objectId, objectType, page, branchId,
    } = usePaneContext();
    const branch = useSelector(selectBranch(branchId));
    const isTitleEdited = useMemo(() => {
        if (!branch) {
            return false;
        }

        const {
            editedTitleNodes, editedTitleFlows, editedTitleIos,
        } = branch;

        return (
            editedTitleNodes.has(objectId)
            || editedTitleFlows.has(objectId)
            || editedTitleIos.has(objectId)) && originalObjectTitle && objectTitle !== originalObjectTitle;
    }, [branch, objectId, objectTitle, originalObjectTitle]);

    const [searchParams, setSearchParams] = useSearchParams();

    const handleTogglePane = useCallback((paneContent: PaneContent | undefined) => {
        if (paneContent !== undefined) {
            setContent(paneContent);

            const newParams = new URLSearchParams(searchParams);
            newParams.set(PANE_Q, paneContent);
            setSearchParams(newParams);
        }
    }, [searchParams, setContent, setSearchParams]);

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
                {objectType == ObjectType.Node && (
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
                    {OBJECT_TYPE_NAMES[objectType]}
                </Typography>
                <Box
                    mx={1}
                    fontSize={14}
                    display="flex"
                    alignItems="center"
                    justifyContent="center">
                    <FontAwesomeIcon icon={faAngleRight} className="default-list-color" />
                </Box>
                <Typography className="ObjectTitle" variant="body2">
                    {isTitleEdited && <span className="diff-removed">{originalObjectTitle}</span>}

                    <span className={isTitleEdited ? 'diff-added' : undefined}>{objectTitle}</span>
                </Typography>
            </Box>
            {
                (page === PanePage.Workflow && <TogglePaneButton />) || <div />
            }
        </Box>
    );
}
