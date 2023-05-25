import { createTheme } from '@mui/material/styles';
import scrollbar from './styles/scrollbar';
import animations from './styles/animations';

/* mui */
import input from './styles/mui/inputs';
import buttons from './styles/mui/buttons';
import tab from './styles/mui/tab';

const getTheme = (currentTheme) => createTheme({
  typography: {
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      color: currentTheme.palette.text.contrast,
    },
    body2: {
      fontSize: '0.75rem',
    },
    subtitle1: {
      fontSize: '0.75rem',
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 500,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          '&, &.MuiTypography-root': {
            textDecoration: 'none',
          },
        },
        ...scrollbar(currentTheme),
        ...animations(currentTheme),
      },
    },
    ...input(currentTheme),
    ...buttons(currentTheme),
    ...tab(currentTheme),
  },
  //-----------------------------------------------------------------------------------------------------------------
  ...currentTheme,
});

export default getTheme;
