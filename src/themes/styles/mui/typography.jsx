export default (currentTheme) => ({
  MuiTypography: {
    styleOverrides: {
      body1: {
        fontSize: 20,
      },
      h5: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  },
});
