export default (currentTheme) => ({
  MuiTab: {
    styleOverrides: {
      root: {
        fontWeight: 'bold',
        textTransform: 'none',
        backgroundColor: 'transparent',
        transition: 'all 450ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        color: 'white',
        '&.Mui-selected': {
          color: currentTheme.green1,
        },
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      indicator: {
        height: 6,
        width: 5,
        borderRadius: 8,
        backgroundColor: currentTheme.green1,
      },
    },
  },

});
