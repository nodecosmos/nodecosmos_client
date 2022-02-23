export default (currentTheme) => ({
  '.codeMirrorBlock': {
    backgroundColor: currentTheme.black6,
    border: '1px solid #464648',
  },
  '.CodeMirror.cm-s-material': {
    borderRadius: 8,
  },
  '.cm-s-material.CodeMirror': {
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'Menlo,Consolas,Liberation Mono,monospace',
    height: '100%',
    fontSize: 15,
  },
  '.CodeMirror-linenumber': { color: `${currentTheme.gray1}!important`, marginLeft: -8 },
  '.cm-s-material .CodeMirror-gutters': { backgroundColor: 'transparent' },
  '.cm-s-material .cm-comment': { color: currentTheme.gray2 },
});
