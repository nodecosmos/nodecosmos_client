export default (currentTheme) => ({
  '.Tree': {
    '.NodeName': { cursor: 'pointer' },
    '.DropShadow': { filter: currentTheme.filter1 },
    '.NodeActions': {
      background: currentTheme.black6,
      boxShadow: currentTheme.boxShadow1,
      border: currentTheme.border1,
      padding: 5,
      borderRadius: 8,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 350ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
    },
    '.MuiButton-root': {
      background: '#43464e',
      borderRadius: 12,
      padding: '2px 6px',
      '&:hover': {
        background: '#43464e',
      },
      '&.expanded': {
        color: 'rgb(0 0 0 / 70%)',
      },
    },
  },
});
