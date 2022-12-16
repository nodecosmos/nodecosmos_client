export default (currentTheme) => ({
  MuiTab: {
    styleOverrides: {
      root: {
        fontWeight: 700,
        fontSize: 18,
        textTransform: 'none',
        backgroundColor: 'transparent',
        transition: 'all 450ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        color: '#fff',
        '&.Mui-selected': {
          color: currentTheme.green1,
        },
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      indicator: {
        height: 7,
        width: 5,
        borderRadius: 8,
        backgroundColor: currentTheme.green1,
        '&.header': {
          height: 11,
          top: 48,
        },
      },
    },
  },
});
