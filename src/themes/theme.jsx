import { createTheme } from '@mui/material/styles';
import scrollbar from './styles/scrollbar';
import animations from './styles/animations';

/* mui */
import input from './styles/mui/inputs';
import list from './styles/mui/list';
import buttons from './styles/mui/buttons';
import menu from './styles/mui/menu';
import tab from './styles/mui/tab';

const getTheme = (currentTheme) => createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: 'none',
        },
        ...scrollbar(currentTheme),
        ...animations(currentTheme),
      },
    },
    ...input(currentTheme),
    ...list(currentTheme),
    ...buttons(currentTheme),
    ...menu(currentTheme),
    ...tab(currentTheme),
  },
  //-----------------------------------------------------------------------------------------------------------------
  ...currentTheme,
});

export default getTheme;
