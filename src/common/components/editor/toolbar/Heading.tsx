import { RemirrorExtensions } from '../../../hooks/remirror/useExtensions';
import useBooleanStateValue from '../../../hooks/useBooleanStateValue';
import {
    faChevronDown,
    faH1, faH2, faH3, faH4, faH5,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box,
    MenuItem, ToggleButton, Tooltip,
} from '@mui/material';
import Menu from '@mui/material/Menu';
import { useActive, useCommands } from '@remirror/react';
import React, { useCallback } from 'react';

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
                onClick={openToolbar}>
                <FontAwesomeIcon icon={faChevronDown} />
            </ToggleButton>
            <Menu
                open={toolbarOpen}
                onClose={closeToolbar}
                anchorEl={anchorRef.current}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{ svg: { mr: 2 } }}>
                <HeadingLevel isMenu level={3} />
                <HeadingLevel isMenu level={4} />
                <HeadingLevel isMenu level={5} />
            </Menu>
        </>
    );
}

const ICON_MAP = {
    1: faH1,
    2: faH2,
    3: faH3,
    4: faH4,
    5: faH5,
};

type Level = 1 | 2 | 3 | 4 | 5;

interface HeadingLevelProps {
    level: Level;
    isMenu?: boolean;
}
function HeadingLevel({ level, isMenu }: HeadingLevelProps) {
    const commands = useCommands<RemirrorExtensions>();
    const active = useActive<RemirrorExtensions>();

    const toggleHeading = useCallback(() => {
        commands.toggleHeading({ level });
    }, [commands, level]);

    return (
        <Tooltip title={`Heading ${level}`}>
            <Box
                component={isMenu ? MenuItem : ToggleButton}
                onClick={toggleHeading}
                selected={active.heading({ level })}
                value={`h${level}`}
            >
                <FontAwesomeIcon icon={ICON_MAP[level]} />
            </Box>
        </Tooltip>
    );
}
