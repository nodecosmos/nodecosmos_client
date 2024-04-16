import TogglePaneButton from '../../../features/app/components/TogglePaneButton';
import { HEADER_HEIGHT } from '../../../features/app/constants';
import { ObjectType } from '../../../types';
import { PaneContent, usePaneContext } from '../../hooks/pane/usePaneContext';
import ToolbarContainer from '../toolbar/ToolbarContainer';
import ToolbarItem from '../toolbar/ToolbarItem';
import { faHashtag } from '@fortawesome/pro-light-svg-icons';
import {
    faDisplay, faPenToSquare, faRectangleCode, faCodeCommit,
} from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Typography } from '@mui/material';
import React, { useCallback } from 'react';

export default function PaneToolbar() {
    const {
        objectTitle, originalObjectTitle, setContent, content, objectType,
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
                        color="toolbar.blue"
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
                {originalObjectTitle && <FontAwesomeIcon icon={faHashtag} />}
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
                    {isTitleEdited && <span className="diff-removed">{originalObjectTitle}</span>}

                    <span className={isTitleEdited ? 'diff-added' : undefined}>{objectTitle}</span>
                </Typography>
            </Box>
            <TogglePaneButton />
        </Box>
    );
}
