export default (currentTheme) => ({
  MuiTypography: {
    styleOverrides: {
      body1: {
        fontSize: 20,
      },
      body2: {
        fontSize: 14,
      },
      h5: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  },
});
