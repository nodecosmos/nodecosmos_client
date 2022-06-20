export default (currentTheme) => ({
  '.Tree': {
    '.NodeName': { cursor: 'pointer' },
    '.DropShadow': { filter: currentTheme.filter1 },
    '.MuiButton-root': {
      background: '#43464e',
      borderRadius: 8,
      padding: '2px 6px',
      boxShadow: '1px 1px rgb(0 0 0 / 70%)',
      '&:hover': {
        background: '#43464e',
      },
      '&.expanded': {
        color: 'rgb(0 0 0 / 70%)',
      },
    },
  },
});
