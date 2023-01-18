import React, { Suspense } from 'react';
import {
  ToggleButton, ToggleButtonGroup, Typography, useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CodeIcon from '@mui/icons-material/Code';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import GradientText from '../../../app/components/GradientText';

const MarkdownPreview = React.lazy(() => import('@uiw/react-markdown-preview'));
const CustomCodeMirror = React.lazy(() => import('../../../app/components/CustomCodeMirror'));

const INITIAL_DESCRIPTION_VALUE = `
### The following is a sample markdown description explaining its syntax:

---
- # Heading 1
- ## Heading 2
- ### Heading 3

---
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
        color: 'circularProgress',
      }}
    />
  </Box>
);

export default function LandingPageMarkdown() {
  const [description, setDescription] = React.useState(INITIAL_DESCRIPTION_VALUE);
  const [mode, setMode] = React.useState('markdown');

  const theme = useTheme();

  return (
    <Box mb={{
      xs: -5,
      sm: -6,
    }}
    >
      <GradientText text="Describe your Innovation" gradientVariant={2} />
      <Typography mt={3} variant="body1" color="text.secondary">
        Use
        {' '}
        <Box
          component="a"
          color="sectionSecondary"
          href="https://en.wikipedia.org/wiki/Markdown"
          sx={{ cursor: 'pointer' }}
          target="_blank"
          borderBottom="3px solid"
          borderBottomColor="sectionSecondary"
        >
          Markdown
        </Box>
        {' '}
        Text Editor
        to add a description to each node in the tree and each step in the workflow.
      </Typography>
      <Box
        mt={4}
        textAlign="center"
        mx={{
          // as defined in src/features/home/components/Section.jsx:28
          xs: -3,
          sm: -4,
        }}
        px={4}
        pb={2}
        zIndex={2}
        position="relative"
        borderBottom={1}
        borderColor={{
          xs: 'borders.box.xs',
          md: 'borders.box.md',
        }}
        boxShadow={{
          xs: 'boxBorder.bottom.xs',
          md: 'boxBorder.bottom.md',
        }}
      >
        <ToggleButtonGroup
          value={mode}
          exclusive
          onChange={(_event, newMode) => !!newMode && setMode(newMode)}
        >
          <ToggleButton
            sx={{
              color: 'text.primary',
              border: 'none',
              '&.Mui-selected': {
                backgroundColor: 'buttonToggle',
                '&:hover': {
                  backgroundColor: 'buttonToggle',
                },
              },
              '&:hover': {
                backgroundColor: 'buttonToggle',
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
              color: 'text.primary',
              border: 'none',
              '&.Mui-selected': {
                backgroundColor: 'buttonToggle',
                '&:hover': {
                  backgroundColor: 'buttonToggle',
                },
              },
              '&:hover': {
                backgroundColor: 'buttonToggle',
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
        mx={{
          xs: -3,
          sm: -4,
        }}
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
          />
        </Suspense>
        )}
        {mode === 'content' && (
        <Box sx={{
          '.wmde-markdown hr': {
            height: 0,
          },
          ".wmde-markdown[data-color-mode*='dark']": {
            '--color-border-muted': theme.palette.markdownContent.border,
            '--color-canvas-subtle': theme.palette.markdownContent.canvas,
            '--color-canvas-default': theme.palette.markdownContent.background,
            '--color-border-default': theme.palette.markdownContent.border,
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
