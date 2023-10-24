import { createTheme } from '@mui/material/styles';
import scrollbar from './styles/scrollbar';
import animations from './styles/animations';
/* mui customizations */
import input from './styles/mui/inputs';
import buttons from './styles/mui/buttons';
import tab from './styles/mui/tab';
import dataGrid from './styles/mui/dataGrid';
import breadcrumbs from './styles/mui/breadcrumbs';
import autocomplete from './styles/mui/autocomplete';
import menu from './styles/mui/menu';
import list from './styles/mui/list';
import popper from './styles/mui/popper';
import dialog from './styles/mui/dialog';
import backdrop from './styles/mui/backdrop';
import tooltip from './styles/mui/tooltip';
import typography from './styles/mui/typography';

import { NodecosmosTheme } from './type';

const getTheme = (theme: NodecosmosTheme) => createTheme({
    typography: typography(theme),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                a: {
                    '&, &.MuiTypography-root': {
                        textDecoration: 'none',
                    },
                },
                ...scrollbar(theme),
                ...animations(),
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
