import { useEditorContext } from '../../../hooks/editor/useEditorContext';
import useBooleanStateValue from '../../../hooks/useBooleanStateValue';
import {
    faChevronDown, faH1, faH2, faH3, faH4, faH5,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    ToggleButton, Tooltip, MenuItem, Box, Menu,
} from '@mui/material';
import { setBlockType } from 'prosemirror-commands';
import { EditorView } from 'prosemirror-view';
import React, { useCallback } from 'react';

type Level = 1 | 2 | 3 | 4 | 5;

const ICON_MAP: Record<Level, any> = {
    1: faH1,
    2: faH2,
    3: faH3,
    4: faH4,
    5: faH5,
};

function isHeadingActive(editorView: EditorView | null, level: Level): boolean {
    if (!editorView) return false;

    const { state } = editorView;
    const { $from } = state.selection;
    const { heading } = state.schema.nodes;
    if (!heading) return false;
    return $from.parent.type === heading && $from.parent.attrs.level === level;
}

function toggleHeading(editorView: EditorView | null, level: Level) {
    if (!editorView) return;

    const { state, dispatch } = editorView;
    const { heading, paragraph } = state.schema.nodes;
    if (!heading || !paragraph) return false;

    if (isHeadingActive(editorView, level)) {
        // Already a heading at this level, switch back to paragraph
        setBlockType(paragraph)(state, dispatch);
    } else {
        // Not a heading at this level, set it to this heading level
        setBlockType(heading, { level })(state, dispatch);
    }
}

interface HeadingLevelProps {
    level: Level;
    isMenu?: boolean;
}

function HeadingLevel({ level, isMenu }: HeadingLevelProps) {
    const { editorView } = useEditorContext();

    const isActive = isHeadingActive(editorView, level);

    const onToggleHeading = useCallback(() => {
        toggleHeading(editorView, level);
        editorView?.focus();
    }, [editorView, level]);

    return (
        <Tooltip title={`Heading ${level}`}>
            <Box
                component={isMenu ? MenuItem : ToggleButton}
                onClick={onToggleHeading}
                selected={isActive}
                value={`h${level}`}
            >
                <FontAwesomeIcon icon={ICON_MAP[level]} />
            </Box>
        </Tooltip>
    );
}

const MENU_SX = { svg: { mr: 2 } };

export default function Heading() {
    const [toolbarOpen, openToolbar, closeToolbar] = useBooleanStateValue();
    const anchorRef = React.useRef(null);

    return (
        <>
            <HeadingLevel level={1} />
            <HeadingLevel level={2} />
            <ToggleButton
                ref={anchorRef}
                value="check"
                onClick={openToolbar}
            >
                <FontAwesomeIcon icon={faChevronDown} />
            </ToggleButton>
            <Menu
                open={toolbarOpen}
                onClose={closeToolbar}
                anchorEl={anchorRef.current}
                sx={MENU_SX}
            >
                <HeadingLevel isMenu level={3} />
                <HeadingLevel isMenu level={4} />
                <HeadingLevel isMenu level={5} />
            </Menu>
        </>
    );
}
