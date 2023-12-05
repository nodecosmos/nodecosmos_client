import dark from './dark';
import dimmed from './dimmed';
import light from './light';
import animations from './styles/animations';
/* mui customizations */
import autocomplete from './styles/mui/autocomplete';
import backdrop from './styles/mui/backdrop';
import breadcrumbs from './styles/mui/breadcrumbs';
import buttons from './styles/mui/buttons';
import dataGrid from './styles/mui/dataGrid';
import dialog from './styles/mui/dialog';
import input from './styles/mui/inputs';
import list from './styles/mui/list';
import menu from './styles/mui/menu';
import popper from './styles/mui/popper';
import tab from './styles/mui/tab';
import tooltip from './styles/mui/tooltip';
import typography from './styles/mui/typography';
import scrollbar from './styles/scrollbar';
import toolbar from './styles/toolbar';
import tree from './styles/tree';
import { NodecosmosTheme } from './type';
import { createTheme } from '@mui/material/styles';

const getTheme = (theme: NodecosmosTheme) => createTheme({
    typography: typography(theme),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                a: { '&, &.MuiTypography-root': { textDecoration: 'none' } },
                ...scrollbar(theme),
                ...animations(),
                ...toolbar(theme),
                ...tree(theme),
            },
        },
        ...autocomplete(theme),
        ...backdrop(theme),
        ...breadcrumbs(theme),
        ...buttons(theme),
        ...dataGrid(theme),
        ...dialog(theme),
        ...input(theme),
        ...list(theme),
        ...menu(theme),
        ...popper(theme),
        ...tab(),
        ...tooltip(theme),
    },
    //-----------------------------------------------------------------------------------------------------------------
    ...theme,
});

export default getTheme;

export const themes = [dark, dimmed, light];
