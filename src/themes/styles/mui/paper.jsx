export default (currentTheme) => ({
  MuiPaper: {
    styleOverrides: {
      root: {
        padding: 8,
        '&.Card': {
          backgroundColor: currentTheme.black6,
          boxShadow: currentTheme.boxShadow1,
        },
        '&.Modal': {
          height: '100%',
          padding: 0,
          boxShadow: currentTheme.boxShadow2,
          border: currentTheme.border1,
        },
      },
      rounded: {
        borderRadius: 8,
      },
    },
  },
});
