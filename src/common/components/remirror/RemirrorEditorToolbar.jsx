import React from 'react';
import {
  MarkdownToolbar, useActive, useCommands, useHelpers, useRemirrorContext,
} from '@remirror/react';
import {
  Box, Stack, ToggleButton, Tooltip,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faBold,
  faItalic,
  faStrikethrough,
  faCode,
  faH1,
  faH2,
  faBlockQuote,
  faBracketsCurly,
  faUndo,
  faRedo,
} from '@fortawesome/pro-solid-svg-icons';
import {
  faCamera,
} from '@fortawesome/pro-light-svg-icons';

import RemirrorEditorToolbarHeadingMenu from './RemirrorEditorToolbarHeadingMenu';

export default function RemirrorEditorToolbar() {
  const commands = useCommands();
  const active = useActive();

  const { undoDepth, redoDepth } = useHelpers(true);

  return (
    <Box className="RemirrorToolbar">
      <Stack direction="row" spacing={1}>
        <Box>
          <Tooltip title="Bold">
            <ToggleButton
              value="check"
              onClick={() => commands.toggleBold()}
              selected={active.bold()}
            >
              <FontAwesomeIcon icon={faBold} />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Italic">
            <ToggleButton
              value="check"
              onClick={() => commands.toggleItalic()}
              selected={active.italic()}
            >
              <FontAwesomeIcon icon={faItalic} />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Strikethrough">
            <ToggleButton
              value="check"
              onClick={() => commands.toggleStrike()}
              selected={active.strike()}
            >
              <FontAwesomeIcon icon={faStrikethrough} />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Code">
            <ToggleButton
              value="check"
              onClick={() => commands.toggleCode()}
              selected={active.code()}
            >
              <FontAwesomeIcon icon={faCode} />
            </ToggleButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Heading 1">
            <ToggleButton
              value="check"
              onClick={() => commands.toggleHeading({
                level: 1,
              })}
              selected={active.heading({
                level: 1,
              })}
            >
              <FontAwesomeIcon icon={faH1} />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Heading 2">
            <ToggleButton
              value="check"
              onClick={() => commands.toggleHeading({
                level: 2,
              })}
              selected={active.heading({
                level: 2,
              })}
            >
              <FontAwesomeIcon icon={faH2} />
            </ToggleButton>
          </Tooltip>

          <RemirrorEditorToolbarHeadingMenu />
        </Box>
        <Box>
          <Tooltip title="Insert blockquote">
            <ToggleButton
              value="check"
              onClick={() => commands.toggleBlockquote()}
              selected={active.blockquote()}
            >
              <FontAwesomeIcon icon={faBlockQuote} />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Insert code block">
            <ToggleButton
              value="check"
              onClick={() => commands.toggleCodeBlock()}
              selected={active.codeBlock()}
            >
              <FontAwesomeIcon icon={faBracketsCurly} />
            </ToggleButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Undo">
            <ToggleButton
              value="check"
              onClick={() => commands.undo()}
              disabled={!undoDepth() > 0}
            >
              <FontAwesomeIcon icon={faUndo} />
            </ToggleButton>
          </Tooltip>
          <Tooltip title="Redo">
            <ToggleButton
              value="check"
              onClick={() => commands.redo()}
              disabled={!redoDepth() > 0}
            >
              <FontAwesomeIcon icon={faRedo} />
            </ToggleButton>
          </Tooltip>
        </Box>
        <Box>
          <Tooltip title="Insert image">
            <ToggleButton value="check" onClick={() => commands.toggleBold()}>
              <FontAwesomeIcon icon={faCamera} />
            </ToggleButton>
          </Tooltip>
        </Box>
      </Stack>

    </Box>
  );
}
