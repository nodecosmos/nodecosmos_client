export default (currentTheme) => ({
  MuiMenuItem: {
    styleOverrides: {
      root: {
        padding: '8px 12px',
        borderRadius: 8,
        transition: 'all 250ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',

        '& .MuiAvatar-root': {
          color: 'white',
          marginRight: 18,
        },
      },
    },
  },
});
