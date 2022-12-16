export default (currentTheme) => ({
  MuiTypography: {
    styleOverrides: {
      whiteSpace: 'normal',
      h1: {
        letterSpacing: 'inherit',
      },
      h2: {
        letterSpacing: 'inherit',
        lineHeight: 1.5,
      },
      body1: {
        letterSpacing: '0.00999em',
      },
      body2: {
        fontSize: 14,
      },
    },
  },
});
