import { RemirrorExtensions } from '../../hooks/remirror/useExtensions';
import useBooleanStateValue from '../../hooks/useBooleanStateValue';
import {
    faChevronDown,
    faH3,
    faH4,
    faH5,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MenuItem, ToggleButton } from '@mui/material';
import Menu from '@mui/material/Menu';
import { useActive, useCommands } from '@remirror/react';
import React, { useCallback } from 'react';

export default function RemirrorEditorToolbarHeadingMenu() {
    const [toolbarOpen, openToolbar, closeToolbar] = useBooleanStateValue();
    const commands = useCommands<RemirrorExtensions>();
    const active = useActive<RemirrorExtensions>();

    const anchorRef = React.useRef(null);

    const toggleHeading3 = useCallback(() => {
        commands.toggleHeading({ level: 3 });
    }, [commands]);

    const toggleHeading4 = useCallback(() => {
        commands.toggleHeading({ level: 4 });
    }, [commands]);

    const toggleHeading5 = useCallback(() => {
        commands.toggleHeading({ level: 5 });
    }, [commands]);

    return (
        <>
            <ToggleButton
                ref={anchorRef}
                value="check"
                onClick={openToolbar}>
                <FontAwesomeIcon icon={faChevronDown} />
            </ToggleButton>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
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
                <MenuItem
                    onClick={toggleHeading3}
                    selected={active.heading({ level: 3 })}>
                    <FontAwesomeIcon icon={faH3} />
                    Heading 3
                </MenuItem>
                <MenuItem
                    onClick={toggleHeading4}
                    selected={active.heading({ level: 4 })}>
                    <FontAwesomeIcon icon={faH4} />
                    Heading 4
                </MenuItem>
                <MenuItem
                    onClick={toggleHeading5}
                    selected={active.heading({ level: 5 })}>
                    <FontAwesomeIcon icon={faH5} />
                    Heading 5
                </MenuItem>
            </Menu>
        </>
    );
}
