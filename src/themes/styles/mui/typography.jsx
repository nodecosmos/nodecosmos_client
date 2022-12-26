export default (currentTheme) => ({
  MuiTypography: {
    styleOverrides: {
      whiteSpace: 'normal',
      h1: {
        letterSpacing: 'inherit',
        lineHeight: 'inherit',
      },
      h2: {
        letterSpacing: 'inherit',
        lineHeight: 'inherit',
      },
      h3: {
        letterSpacing: 'inherit',
        lineHeight: 'inherit',
      },
      h4: {
        letterSpacing: 'inherit',
        lineHeight: 'inherit',
      },
      h5: {
        letterSpacing: 'inherit',
        lineHeight: 'inherit',
      },
      h6: {
        letterSpacing: 'inherit',
        lineHeight: 'inherit',
      },
      // TODO: Remove this once we have a better solution for homepage collaboration section
      subtitle1: {
        letterSpacing: 'inherit',
        lineHeight: 'inherit',
        fontSize: 18,
        '@media (max-width: 600px)': {
          fontSize: 16,
        },
      },
      subtitle2: {
        letterSpacing: 'inherit',
        lineHeight: 'inherit',
      },
      body1: {
        letterSpacing: 'inherit',
        lineHeight: 'inherit',
      },
      body2: {
        letterSpacing: 'inherit',
        lineHeight: 'inherit',
      },
      button: {
        letterSpacing: 'inherit',
        lineHeight: 'inherit',
      },
      caption: {
        letterSpacing: 'inherit',
        lineHeight: 'inherit',
      },
      overline: {
        letterSpacing: 'inherit',
        lineHeight: 'inherit',
      },
    },
  },
});
