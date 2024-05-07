import { PanePage } from './Pane';
import ToolbarContainer from '../../../../common/components/toolbar/ToolbarContainer';
import ToolbarItem from '../../../../common/components/toolbar/ToolbarItem';
import { OBJECT_TYPE_NAMES, ObjectType } from '../../../../types';
import { HEADER_HEIGHT } from '../../constants';
import { PaneContent, usePaneContext } from '../../hooks/pane/usePaneContext';
import TogglePaneButton from '../TogglePaneButton';
import {
    faCodeCommit, faDisplay, faPenToSquare, faRectangleCode,
} from '@fortawesome/pro-regular-svg-icons';
import { faAngleRight } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';
import React, { useCallback } from 'react';

export default function PaneToolbar() {
    const {
        objectTitle, originalObjectTitle, setContent, content, objectType, page,
    } = usePaneContext();

    const isTitleEdited = objectTitle && objectTitle !== originalObjectTitle;

    const handleTogglePane = useCallback((paneContent: PaneContent | undefined) => {
        if (paneContent !== undefined) {
            setContent(paneContent);
        }
    }, [setContent]);

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
                    title="Markdown (Read Only)"
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
            </ToolbarContainer>

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
            {
                (page === PanePage.Workflow && <TogglePaneButton />) || <div />
            }
        </Box>
    );
}
