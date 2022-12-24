export default (currentTheme) => ({
  MuiTab: {
    styleOverrides: {
      root: {
        fontWeight: 700,
        fontSize: 18,
        textTransform: 'none',
        backgroundColor: 'transparent',
        transition: 'all 450ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        color: currentTheme.palette.text.primary,
      },
    },
  },
  MuiTabs: {
    styleOverrides: {
      indicator: {
        height: 7,
        width: 5,
        borderRadius: 8,
        '&.header': {
          height: 11,
          top: 48,
        },
      },
    },
  },
});
