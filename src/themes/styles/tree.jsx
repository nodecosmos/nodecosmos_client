export default (currentTheme) => ({
  '.Tree': {
    '.NodeName': { cursor: 'pointer' },
    '.MuiButton-root': {
      background: '#414650',
      borderRadius: 6,
      padding: '2px 6px',
      '&:hover': {
        background: '#414650',
      },
      '&.expanded': {
        color: 'rgb(0 0 0 / 70%)',
      },
    },
  },
});
