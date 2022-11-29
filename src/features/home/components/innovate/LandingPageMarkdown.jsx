import {
  ToggleButton, ToggleButtonGroup, Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import React, { Suspense } from 'react';
import CodeIcon from '@mui/icons-material/Code';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import CustomCodeMirror from '../../../app/components/CustomCodeMirror';

const MarkdownPreview = React.lazy(() => import('@uiw/react-markdown-preview'));

const INITIAL_DESCRIPTION_VALUE = `### Markdown
- use **markdown** syntax to explain what is your innovation
- use **node tree** to explain what your innovation contains
- use **workflow** to explain how it works or other processes
- use **drawing** to draw 2D image of your innovation, annotate components & map them to node tree
---

### Syntax:

* Heading
  =======
* Sub-heading
  -----------
* ### Paragraphs
  Paragraphs are separated
  by a blank line.

  Two spaces at the end of a line  
  produce a line break.

* Text attributes _italic_, **bold**, \`monospace\`.

* ### Separator

  ---
* ### Lists:
  1. fruits
      * apple
      * banana
  2. vegetables
      - carrot
      - broccoli

* ### [Link](http://example.com)

* ### Quotes
  > Markdown uses email-style
  characters for blockquoting.
  >
  > Multiple paragraphs need to be prepended individually.
  
* ### HTML
  Most inline <i title="Hypertext Markup Language">HTML</i> tags are supported.

* ### Table:
    
  | Tables   |      Are      |  Cool |
  |----------|:-------------:|------:|
  | col 1 is |  left-aligned | $1600 |
  | col 2 is |    centered   |   $12 |
  | col 3 is | right-aligned |    $1 |
`;

const loading = (
  <Box display="flex" alignItems="center" justifyContent="center">
    <CircularProgress
      size={100}
      sx={{
        mt: {
          xs: 6,
          sm: 7,
        },
        color: '#55575b',
      }}
    />
  </Box>
);

export default function LandingPageMarkdown() {
  const [description, setDescription] = React.useState(INITIAL_DESCRIPTION_VALUE);
  const [mode, setMode] = React.useState('markdown');

  return (
    <Box>
      <Typography
        variant="h5"
        fontFamily="'Montserrat', sans-serif"
        fontWeight="bold"
        sx={{
          background: {
            xs: 'linear-gradient(35deg, #06e1ff 0%, #ce6cff 50%)',
            sm: 'linear-gradient(35deg, #06e1ff 0%, #ce6cff 25%)',
          },
          WebkitBackgroundClip: 'text!important',
          backgroundClip: 'text!important',
          WebkitTextFillColor: 'transparent!important',
          WebkitBoxDecorationBreak: 'clone',
          color: '#06e1ff',
          lineHeight: 1,
        }}
      >
        Describe your innovation
      </Typography>
      <Typography mt={3} variant="body1" color="#fdfff9">
        Use
        {' '}
        <Box
          component="a"
          color="#fdfff9"
          fontWeight="bold"
          href="https://en.wikipedia.org/wiki/Markdown"
          sx={{ cursor: 'pointer' }}
          target="_blank"
        >
          markdown
        </Box>
        {' '}
        to add description to each node in the tree.
      </Typography>
      <Box mt={4}>
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_event, newMode) => !!newMode && setMode(newMode)}
        >
          <ToggleButton
            sx={{
              color: '#bac0cb',
              '&.Mui-selected': {
                background: '#b7cfda26',
                '&:hover': {
                  background: '#b7cfda26',
                },
              },
              '&:hover': {
                background: '#b7cfda26',
              },
            }}
            value="markdown"
            aria-label="left aligned"
            disableRipple
          >
            <CodeIcon />
            <Box ml={2}>Markdown</Box>
          </ToggleButton>
          <ToggleButton
            sx={{
              color: '#bac0cb',
              '&.Mui-selected': {
                background: '#b7cfda26',
                '&:hover': {
                  background: '#b7cfda26',
                },
              },
              '&:hover': {
                background: '#b7cfda26',
              },
            }}
            value="content"
            aria-label="centered"
            disableRipple
          >
            <VisibilityRoundedIcon />
            <Box ml={2}>Content</Box>
          </ToggleButton>
        </ToggleButtonGroup>

      </Box>
      <Box mt={4} minHeight={971}>
        {mode === 'markdown' && (
          <CustomCodeMirror
            value={description}
            onChange={(value) => {
              setDescription(value);
            }}
            lineWrapping
          />
        )}
        {mode === 'content' && (
        <Box sx={{
          ".wmde-markdown[data-color-mode*='dark']": {
            '--color-border-muted': '#464b59',
            '--color-canvas-subtle': '#464b59',
            '--color-canvas-default': 'transparent',
          },
        }}
        >
          <Suspense fallback={loading}>
            <MarkdownPreview
              warpperElement={{ 'data-color-mode': 'dark' }}
              source={description}
            />
          </Suspense>
        </Box>
        )}
      </Box>
    </Box>
  );
}
