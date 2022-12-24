export default (currentTheme) => ({
  MuiTypography: {
    styleOverrides: {
      whiteSpace: 'normal',
      h1: {
        letterSpacing: 'inherit',
      },
      h2: {
        letterSpacing: 'inherit',
      },
      h3: {
        letterSpacing: 'inherit',
      },
      h4: {
        letterSpacing: 'inherit',
      },
      h5: {
        letterSpacing: 'inherit',
      },
      h6: {
        letterSpacing: 'inherit',
      },
      // TODO: Remove this once we have a better solution for homepage collaboration section
      subtitle1: {
        letterSpacing: 'inherit',
        fontSize: 18,
        '@media (max-width: 600px)': {
          fontSize: 16,
        },
      },
      subtitle2: {
        letterSpacing: 'inherit',
      },
      body1: {
        letterSpacing: 'inherit',
      },
      body2: {
        letterSpacing: 'inherit',
      },
      button: {
        letterSpacing: 'inherit',
      },
      caption: {
        letterSpacing: 'inherit',
      },
      overline: {
        letterSpacing: 'inherit',
      },
    },
  },
});
