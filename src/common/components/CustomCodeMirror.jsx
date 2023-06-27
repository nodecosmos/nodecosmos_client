// import { languages } from '@codemirror/language-data';
import React from 'react';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { tags as t } from '@lezer/highlight';
import { useTheme, Box } from '@mui/material';
import { createTheme } from '@uiw/codemirror-themes';
import CodeMirror from '@uiw/react-codemirror';
import PropTypes from 'prop-types';
import { HEADER_HEIGHT } from '../../features/app/constants';

export default function CustomCodeMirror(props) {
  const {
    value,
    onChange,
  } = props;

  const theme = useTheme();

  const {
    tagName,
    string,
    number,
    attributeName,
    className,
    operator,
    bracket,
    heading,
    emphasis,
    quote,
    meta,
    link,
    background,
    foreground,
    caret,
    selection,
    selectionMatch,
    lineHighlight,
    gutterBackground,
    gutterForeground,
  } = theme.palette.markdownEditor;

  const codeMirrorTheme = createTheme({
    theme: 'dark',
    settings: {
      background: 'transparent',
      foreground,
      caret,
      selection,
      selectionMatch,
      lineHighlight,
      gutterBackground,
      gutterForeground,
    },
    styles: [
      {
        tag: t.tagName,
        color: tagName,
      },
      {
        tag: [t.string],
        color: string,
      },
      {
        tag: t.number,
        color: number,
      },
      {
        tag: t.attributeName,
        color: attributeName,
      },
      {
        tag: t.className,
        color: className,
      },
      {
        tag: t.operator,
        color: operator,
      },
      {
        tag: t.bracket,
        color: bracket,
      },
      {
        tag: t.heading,
        color: heading,
      },
      {
        tag: t.emphasis,
        color: emphasis,
      },
      {
        tag: t.quote,
        color: quote,
      },
      {
        tag: t.meta,
        color: meta,
      },
      {
        tag: t.link,
        color: link,
      },
    ],
  });

  return (
    <Box sx={{
      height: 1,
      background,
      borderRadius: 5,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      fontSize: {
        xs: 11,
        sm: 16,
      },
      '@media (max-width: 325px)': {
        fontSize: 9,
      },
      '.cm-theme': { height: 1 },
      '.cm-content': {
        whiteSpace_fallback: 'pre-wrap',
        whiteSpace: 'break-spaces',
        wordBreak: 'break-word',
        overflowWrap: 'anywhere',
        flexShrink: 1,
        fontFamily: 'monospace',
        height: 1,
        ml: 1,
      },
      '.cm-line': {
        width: 'calc(100% - 8px)',
      },
      '.cm-focused': {
        outline: 'none!important',
      },
      '.cm-lineNumbers': {
        pl: {
          xs: 1.3,
          sm: 1,
        },
        pb: 2,
      },
      '.cm-gutterElement': {
        textAlign: 'left!important',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&.cm-activeLineGutter': {
          backgroundColor: 'none',
          background: 'transparent',
        },
        fontSize: {
          xs: 11,
          sm: 12,
        },
      },
      '.cm-gutters': {
        minHeight: 1,
        borderRight: 1,
        minWidth: {
          sm: 1,
          md: HEADER_HEIGHT,
        },
        justifyContent: 'center',
        borderColor: 'borders.4',
      },
    }}
    >
      <CodeMirror
        value={value}
        onChange={onChange}
        theme={codeMirrorTheme}
        extensions={[markdown({ markdownLanguage })]}
        height="100%"
      />
    </Box>
  );
}

CustomCodeMirror.defaultProps = {
  value: '',
  onChange: null,
};

CustomCodeMirror.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
