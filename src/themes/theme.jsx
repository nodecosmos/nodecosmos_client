import { createTheme } from '@mui/material/styles';
import scrollbar from './styles/scrollbar';
import animations from './styles/animations';

/* mui */
import input from './styles/mui/inputs';
import buttons from './styles/mui/buttons';
import tab from './styles/mui/tab';

const getTheme = (currentTheme) => createTheme({
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
