// import { languages } from '@codemirror/language-data';
import React from 'react';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { tags as t } from '@lezer/highlight';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { createTheme } from '@uiw/codemirror-themes';
import CodeMirror from '@uiw/react-codemirror';
import PropTypes from 'prop-types';

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
  } = theme.palette.markdownEditor;

  const codeMirrorTheme = createTheme({
    theme: 'dark',
    settings: {
      background: 'transparent',
      foreground: '#a4a7ab',
      caret: '#ffffff',
      selection: 'rgba(255,255,255,0.06)',
      selectionMatch: 'rgba(255,255,255,0.06)',
      lineHighlight: '#8a91991a',
      gutterBackground: 'transparent',
      gutterForeground: '#636b73',
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
      '.cm-content': {
        whiteSpace_fallback: 'pre-wrap',
        whiteSpace: 'break-spaces',
        wordBreak: 'break-word',
        overflowWrap: 'anywhere',
        flexShrink: 1,
        fontFamily: 'monospace',
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
        borderRight: '1px solid #202027',
        boxShadow: {
          xs: '3px 0px 1px -1px rgb(106 107 116 / 5%), 1px 0px 1px 0px rgb(82 81 95 / 20%)',
          sm: '3px 0px 1px -1px rgb(106 107 116 / 5%), 1px 0px 1px 0px rgb(82 81 95 / 30%)',
        },
      },
    }}
    >
      <CodeMirror
        value={value}
        onChange={onChange}
        theme={codeMirrorTheme}
        extensions={[markdown({ markdownLanguage })]}
      />
    </Box>
  );
}

CustomCodeMirror.defaultProps = {
  value: null,
  onChange: null,
};

CustomCodeMirror.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};
