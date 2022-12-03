import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import CodeMirror from '@uiw/react-codemirror';
import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';
import { languages } from '@codemirror/language-data';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';

const myTheme = createTheme({
  theme: 'dark',
  settings: {
    background: '#353940',
    foreground: '#e2f0ff',
    caret: '#ffffff',
    selection: '#036dd626',
    selectionMatch: '#036dd626',
    lineHighlight: '#8a91991a',
    gutterBackground: '#353940',
    gutterForeground: '#8a919966',
  },
  styles: [
    { tag: t.comment, color: '#787b8099' },
    { tag: t.name, color: '#566066' },
    { tag: t.variableName, color: '#59fff7', fontWeight: 'bold' },
    { tag: t.propertyName, color: '#59fff7', fontWeight: 'bold' },
    { tag: t.bool, color: '#FF2766', fontWeight: 'bold' },
    { tag: t.null, color: '#FF2766', fontWeight: 'bold' },
    { tag: t.keyword, color: '#FF2766', fontWeight: 'bold' },
    { tag: t.tagName, color: '#FF2766', fontWeight: 'bold' },
    { tag: [t.string], color: '#8cff70', fontWeight: 'bold' },
    { tag: t.number, color: '#8cff70', fontWeight: 'bold' },
    { tag: t.attributeName, color: '#ffe629', fontWeight: 'bold' },
    { tag: t.className, color: '#daff29', fontWeight: 'bold' },
    { tag: t.operator, color: '#fff', fontWeight: 'bold' },
    { tag: t.bracket, color: '#fff' },
    { tag: t.heading, color: '#ff626f', fontWeight: 'bold' },
    { tag: t.contentSeparator, color: '#fff', fontWeight: 'bold' },
    { tag: t.emphasis, color: '#fff', fontWeight: 'bold' },
    { tag: t.strong, color: '#ff4581', fontWeight: 'bold' },
    { tag: t.quote, color: '#8796aa', fontWeight: 'bold' },
    { tag: t.monospace, color: '#8e969f' },
    { tag: t.meta, color: '#8cff70', fontWeight: 'bold' },
    { tag: t.link, color: '#7bddaf', fontWeight: 'bold' },
  ],
});

export default function CustomCodeMirror(props) {
  const { value, onChange } = props;

  return (
    <Box sx={{
      fontSize: {
        xs: 11,
        sm: 14,
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
      },
      '.cm-focused': {
        outline: 'none!important',
      },
    }}
    >
      <CodeMirror
        value={value}
        onChange={onChange}
        theme={myTheme}
        extensions={[markdown({ markdownLanguage, codeLanguages: languages })]}
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
