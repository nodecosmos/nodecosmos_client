import ToolbarContainer from '../../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../../common/components/toolbar/ToolbarItem';
import { OBJECT_TYPE_NAMES, ObjectType } from '../../../../types';
import useBranchContext from '../../../branch/hooks/useBranchContext';
import { DRAWER_HEIGHT, HEADER_HEIGHT } from '../../constants';
import {
    PANE_Q, PaneContent, usePaneContext,
} from '../../hooks/pane/usePaneContext';
import {
    faCodeCommit, faDisplay, faPenToSquare, faRectangleCode, faComments,
} from '@fortawesome/pro-regular-svg-icons';
import { faAngleRight } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';
import React, { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

interface ClickableRefProps {
    clickableRef: React.RefObject<HTMLDivElement> | null;
}

export default function PaneMobileToolbar({ clickableRef }: ClickableRefProps) {
    const { isBranch } = useBranchContext();
    const {
        objectTitle, originalObjectTitle, setContent, content, objectType,
    } = usePaneContext();

    const isTitleEdited = objectTitle && objectTitle !== originalObjectTitle;
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
            height="7rem"
            borderBottom={1}
            borderColor="borders.2"
            boxShadow="2"
        >
            <Box
                ref={clickableRef}
                className="DrawerHeader"
                height={DRAWER_HEIGHT}
                borderBottom={1}
                borderColor="borders.1"
                display="flex"
                flexDirection="column"
                justifyContent="space-evenly"
                alignItems="center"
            >
                <Box display="flex" justifyContent="center" height={4}>
                    <Box
                        component="div"
                        width={45}
                        height={4}
                        borderRadius={1}
                        sx={{ backgroundColor: 'background.8' }} />
                </Box>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ svg: { color: 'background.list.defaultColor' } }}
                >
                    <Typography
                        variant="body2"
                        color="text.tertiary"
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
                        <FontAwesomeIcon icon={faAngleRight} />
                    </Box>
                    <Typography
                        align="center"
                        variant="body2"
                        fontWeight="bold"
                        color="text.link"
                        p={0.5}
                        px={2}
                        sx={{
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            backgroundColor: isTitleEdited ? 'none' : 'toolbar.active',
                            '.diff-removed': {
                                backgroundColor: 'diff.removed.bg',
                                color: 'diff.removed.fg',
                                fontWeight: 'bold',
                            },
                            '.diff-added': {
                                ml: 2,
                                backgroundColor: 'diff.added.bg',
                                color: 'diff.added.fg',
                                fontWeight: 'bold',
                            },
                        }}
                    >
                        {isTitleEdited && <span className="diff-removed">{originalObjectTitle}</span>}

                        <span className={isTitleEdited ? 'diff-added' : undefined}>{objectTitle}</span>
                    </Typography>
                </Box>
            </Box>
            <Box
                height={HEADER_HEIGHT}
                display="flex"
                alignItems="center"
                justifyContent="center"
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
            </Box>

        </Box>
    );
}
