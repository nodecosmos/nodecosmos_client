import { createTheme } from '@mui/material/styles';
import app from './styles/app';
import mainContent from './styles/main-content';
import scrollbar from './styles/scrollbar';
import toolbar from './styles/toolbar';
import animations from './styles/animations';
import tree from './styles/tree';
import fonts from './styles/fonts';

/* mui */
import input from './styles/mui/inputs';
import list from './styles/mui/list';
import typography from './styles/mui/typography';
import buttons from './styles/mui/buttons';
import menu from './styles/mui/menu';
import tab from './styles/mui/tab';
import card from './styles/mui/card';

const getTheme = (currentTheme) => createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ...app(currentTheme),
        ...scrollbar(currentTheme),
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
    ...menu(currentTheme),
    ...tab(currentTheme),
    ...card(currentTheme),
  },
  //-----------------------------------------------------------------------------------------------------------------
  ...currentTheme,
});

export default getTheme;
