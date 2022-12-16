import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import CodeMirror from '@uiw/react-codemirror';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
// import { languages } from '@codemirror/language-data';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';

const myTheme = createTheme({
  theme: 'dark',
  settings: {
    background: 'transparent',
    foreground: '#9a9a9e',
    caret: '#ffffff',
    selection: 'rgba(255,255,255,0.06)',
    selectionMatch: 'rgba(255,255,255,0.06)',
    lineHighlight: '#8a91991a',
    gutterBackground: 'transparent',
    gutterForeground: '#636b73',
  },
  styles: [
    { tag: t.comment, color: '#787b8099' },
    { tag: t.name, color: '#566066' },
    { tag: t.variableName, color: '#59fff7' },
    { tag: t.propertyName, color: '#59fff7' },
    { tag: t.bool, color: '#FF2766' },
    { tag: t.null, color: '#FF2766' },
    { tag: t.keyword, color: '#FF2766' },
    { tag: t.tagName, color: '#FF2766' },
    { tag: [t.string], color: '#8cff70' },
    { tag: t.number, color: '#8cff70' },
    { tag: t.attributeName, color: '#ffe629' },
    { tag: t.className, color: '#daff29' },
    { tag: t.operator, color: '#fff' },
    { tag: t.bracket, color: '#fff' },
    { tag: t.heading, color: '#ae79c8' },
    { tag: t.contentSeparator, color: '#fff' },
    { tag: t.emphasis, color: '#fff' },
    { tag: t.strong, color: '#ff4581' },
    { tag: t.quote, color: '#57606e' },
    { tag: t.monospace, color: '#8e969f' },
    { tag: t.meta, color: '#5ab0fa' },
    { tag: t.link, color: '#7bddaf' },
  ],
});

export default function CustomCodeMirror(props) {
  const { value, onChange } = props;

  return (
    <Box sx={{
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
        fontFamily: "'Roboto Mono', sans-serif",
        ml: 1,
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
        theme={myTheme}
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
