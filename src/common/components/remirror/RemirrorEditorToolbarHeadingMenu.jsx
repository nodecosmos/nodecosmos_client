import React, { useCallback } from 'react';
import Menu from '@mui/material/Menu';
import { MenuItem, ToggleButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faH3,
  faH4,
  faH5,
} from '@fortawesome/pro-solid-svg-icons';
import { useActive, useCommands } from '@remirror/react';

export default function RemirrorEditorToolbarHeadingMenu() {
  const [open, setOpen] = React.useState(false);
  const commands = useCommands();
  const active = useActive();

  const anchorRef = React.useRef(null);
  const toggleHeading = useCallback((level) => commands.toggleHeading({
    level,
  }, { level: 3 }), [commands]);

  return (
    <>
      <ToggleButton
        ref={anchorRef}
        value="check"
        onClick={() => setOpen(true)}
      >
        <FontAwesomeIcon icon={faChevronDown} />
      </ToggleButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          svg: {
            mr: 2,
          },
        }}
      >
        <MenuItem
          onClick={() => toggleHeading(3)}
          selected={active.heading({ level: 3 })}
        >
          <FontAwesomeIcon icon={faH3} />
          Heading 3
        </MenuItem>
        <MenuItem
          onClick={() => toggleHeading(4)}
          selected={active.heading({ level: 4 })}

        >
          <FontAwesomeIcon icon={faH4} />
          Heading 4
        </MenuItem>
        <MenuItem
          onClick={() => toggleHeading(5)}
          selected={active.heading({ level: 5 })}
        >
          <FontAwesomeIcon icon={faH5} />
          Heading 5
        </MenuItem>
      </Menu>
    </>
  );
}
