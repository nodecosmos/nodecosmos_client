import { createTheme } from '@mui/material/styles';
import app from './styles/app';
import header from './styles/header';
import mainContent from './styles/main-content';
import scrollbar from './styles/scrollbar';
import utilities from './styles/utilities';
import toolbar from './styles/toolbar';
import animations from './styles/animations';
import tree from './styles/tree';
import fonts from './styles/fonts';

/* mui */
import input from './styles/mui/inputs';
import list from './styles/mui/list';
import typography from './styles/mui/typography';
import buttons from './styles/mui/buttons';
import paper from './styles/mui/paper';
import menu from './styles/mui/menu';
import tab from './styles/mui/tab';
import card from './styles/mui/card';

const getTheme = (currentTheme) => createTheme({
  spacing: [0, 1, 8, 16, 32, 64, 128, 256, 512, 1024, 2048],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...app(currentTheme),
        ...header(currentTheme),
        ...scrollbar(currentTheme),
        ...utilities(currentTheme),
        ...toolbar(currentTheme),
        ...animations(currentTheme),
        ...tree(currentTheme),
        ...fonts(currentTheme),
        ...mainContent(currentTheme),
      },
    },
    ...input(currentTheme),
    ...list(currentTheme),
    ...typography(currentTheme),
    ...buttons(currentTheme),
    ...paper(currentTheme),
    ...menu(currentTheme),
    ...tab(currentTheme),
    ...card(currentTheme),
  },
  //-----------------------------------------------------------------------------------------------------------------
  palette: {
    primary: {
      main: currentTheme.blue2,
      light: currentTheme.blue1,
    },
    secondary: {
      main: currentTheme.red1,
    },
    error: {
      main: currentTheme.red1,
    },
    success: {
      main: currentTheme.green4,
    },
    green: {
      main: currentTheme.green2,
    },
    text: {
      primary: currentTheme.beige1,
      secondary: currentTheme.gray1,
    },
    background: {
      paper: currentTheme.black6,
    },
  },
});

export default getTheme;
