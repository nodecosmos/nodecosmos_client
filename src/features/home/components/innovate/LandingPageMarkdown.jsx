import React, { Suspense } from 'react';
import {
  ToggleButton, ToggleButtonGroup, Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CodeIcon from '@mui/icons-material/Code';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';

const MarkdownPreview = React.lazy(() => import('@uiw/react-markdown-preview'));
const CustomCodeMirror = React.lazy(() => import('../../../app/components/CustomCodeMirror'));

const INITIAL_DESCRIPTION_VALUE = `
### The following is a sample markdown description explaining its syntax:

Heading
=======

Sub-heading
=======

### Paragraphs

Paragraphs are separated by a blank line.

Two spaces at the end of a line  
produce a line break.

---
Text attributes _italic_, **bold**, \`monospace\`.  

---
### Lists:
  1. fruits
      * apple
      * banana
  2. vegetables
      - carrot
      - broccoli

---
### [Link](http://example.com)

---
### Quotes
> Markdown uses email-style characters for quoting.
> 
> Multiple paragraphs need to be prepended individually.

---
### HTML

  Most inline <i title="Hypertext Markup Language">HTML</i> tags are supported.

---
### Table
| Tables   |      Are      |  Cool |
|----------|:-------------:|------:|
| col 1 is |  left-aligned | $1600 |
| col 2 is |    centered   |   $12 |
| col 3 is | right-aligned |    $1 |

---
### Blocks

    Blocks are padded with 2 tabs
`;

const loading = (
  <Box display="flex" alignItems="center" justifyContent="center" mb={8}>
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
    <Box mb={-6}>
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
          fontWeight="bold"
          color="#cdd4ff"
          href="https://en.wikipedia.org/wiki/Markdown"
          sx={{ cursor: 'pointer' }}
          target="_blank"
          borderBottom="3px solid #cdd4ff"
        >
          Markdown
        </Box>
        {' '}
        Text Editor
        to add description to each node in the tree.
      </Typography>
      <Box
        mt={4}
        textAlign="center"
        mx={-4}
        px={4}
        pb={2}
        zIndex={2}
        position="relative"
        sx={{
          borderBottom: '1px solid #202027',
          boxShadow: {
            xs: '0px 3px 1px -2px rgb(106 107 116 / 5%), 0px 1px 2px 0px rgb(82 81 95 / 15%)',
            md: '0px 3px 1px -2px rgb(106 107 116 / 5%), 0px 1px 2px 0px rgb(82 81 95 / 30%)',
          },
        }}
      >
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_event, newMode) => !!newMode && setMode(newMode)}
        >
          <ToggleButton
            sx={{
              color: '#fff',
              border: 'none',
              '&.Mui-selected': {
                background: '#3a3e45',
                '&:hover': {
                  background: '#3a3e45',
                },
              },
              '&:hover': {
                background: '#3a3e45',
              },
            }}
            value="markdown"
            aria-label="left aligned"
            disableRipple
          >
            <CodeIcon fontSize="small" />
            <Box ml={2} fontSize={12}>Markdown</Box>
          </ToggleButton>
          <ToggleButton
            sx={{
              color: '#fff',
              border: 'none',
              '&.Mui-selected': {
                background: '#3a3e45',
                '&:hover': {
                  background: '#3a3e45',
                },
              },
              '&:hover': {
                background: '#3a3e45',
              },
            }}
            value="content"
            aria-label="centered"
            disableRipple
          >
            <VisibilityRoundedIcon fontSize="small" />
            <Box ml={2} fontSize={12}>Content</Box>
          </ToggleButton>
        </ToggleButtonGroup>

      </Box>
      <Box
        mx={-4}
        mt={0}
        mb={1}
        pb={1}
      >
        {mode === 'markdown' && (
        <Suspense fallback={loading}>
          <CustomCodeMirror
            value={description}
            onChange={(value) => {
              setDescription(value);
            }}
            lineWrapping
          />
        </Suspense>
        )}
        {mode === 'content' && (
        <Box sx={{
          '.wmde-markdown hr': {
            height: 0,
          },
          ".wmde-markdown[data-color-mode*='dark']": {
            '--color-border-muted': '#464b59',
            '--color-canvas-subtle': '#464b59',
            '--color-canvas-default': 'transparent',
            '--color-border-default': '#464b59',
          },
        }}
        >
          <Suspense fallback={loading}>
            <Box m={4}>
              <MarkdownPreview
                warpperElement={{ 'data-color-mode': 'dark' }}
                source={description}
              />
            </Box>
          </Suspense>
        </Box>
        )}
      </Box>
    </Box>
  );
}
