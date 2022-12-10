export default (currentTheme) => ({
  MuiTypography: {
    styleOverrides: {
      whiteSpace: 'normal',
      body1: {
        letterSpacing: '0.02em!important',
        fontSize: 18,
        '@media (max-width: 600px)': {
          fontSize: 14,
        },
      },
      body2: {
        fontSize: 14,
        lineHeight: 1.5,
      },
    },
  },
});
