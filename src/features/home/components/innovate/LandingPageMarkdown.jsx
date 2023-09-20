import React, { Suspense } from 'react';
import {
  ToggleButton, ToggleButtonGroup, Typography,
  Box,
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import CodeIcon from '@mui/icons-material/Code';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import GradientText from '../../../../common/components/GradientText';

const CustomCodeMirror = React.lazy(() => import('../../../../common/components/codemirror/CodeMirrorEditor'));
const MarkdownPreview = React.lazy(() => import('../../../../common/components/MarkdownPreview'));

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
        color: 'background.3',
      }}
    />
  </Box>
);

export default function LandingPageMarkdown() {
  const [description, setDescription] = React.useState(INITIAL_DESCRIPTION_VALUE);
  const [mode, setMode] = React.useState('markdown');

  return (
    <Box mb={{
      xs: -5,
      sm: -6,
    }}
    >
      <GradientText text="Describe your Innovation" gradientVariant={2} variant="h5" variantMapping={{ h5: 'h3' }} />
      <Typography mt={3} variant="body1" color="text.secondary">
        Use
        {' '}
        <Box
          component="a"
          color="secondary.main"
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
        borderBottom={1}
        borderColor="borders.4"
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
                backgroundColor: 'toggle',
                '&:hover': {
                  backgroundColor: 'toggle',
                },
              },
              '&:hover': {
                backgroundColor: 'toggle',
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
                backgroundColor: 'toggle',
                '&:hover': {
                  backgroundColor: 'toggle',
                },
              },
              '&:hover': {
                backgroundColor: 'toggle',
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
          <Box m={{ xs: 3, sm: 4 }}>
            <Suspense fallback={loading}>
              <MarkdownPreview value={description} />
            </Suspense>
          </Box>
        )}
      </Box>
    </Box>
  );
}
