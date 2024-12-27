import useToolbarItem from '../../../hooks/editor/useToolbarItem';
import useBooleanStateValue from '../../../hooks/useBooleanStateValue';
import {
    faChevronDown, faH1, faH2, faH3, faH4, faH5, 
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box, Menu, MenuItem, ToggleButton, Tooltip, 
} from '@mui/material';
import React from 'react';

type Level = 1 | 2 | 3 | 4 | 5;

const ICON_MAP: Record<Level, any> = {
    1: faH1,
    2: faH2,
    3: faH3,
    4: faH4,
    5: faH5,
};

interface HeadingLevelProps {
    level: Level;
    isMenu?: boolean;
}

function HeadingLevel({ level, isMenu }: HeadingLevelProps) {
    const [isActive, toggleNode] = useToolbarItem('heading', { level });

    return (
        <Tooltip title={`Heading ${level}`}>
            <Box
                component={isMenu ? MenuItem : ToggleButton}
                onClick={toggleNode}
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
