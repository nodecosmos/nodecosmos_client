import dark from './dark';
import dimmed from './dimmed';
import light from './light';
import animations from './styles/animations';
import card from './styles/card';
import cover from './styles/cover';
import description from './styles/description';
import like from './styles/like';
import alert from './styles/mui/alert';
import autocomplete from './styles/mui/autocomplete';
import avatar from './styles/mui/avatar';
import backdrop from './styles/mui/backdrop';
import badge from './styles/mui/badge';
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
import transformable from './styles/transformable';
import tree from './styles/tree';
import { NodecosmosTheme } from './themes.types';
import { createTheme } from '@mui/material/styles';

const getTheme = (theme: NodecosmosTheme) => createTheme({
    typography: typography(theme),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                a: { '&, &.MuiTypography-root': { textDecoration: 'none' } },
                ...animations(),
                ...card(theme),
                ...cover(theme),
                ...description(theme),
                ...like(theme),
                ...scrollbar(theme),
                ...toolbar(theme),
                ...tree(theme),
                ...transformable(),
                '.Notification': {
                    borderRadius: 8,
                    border: '1px solid',
                    borderColor: theme.palette.borders[4],
                    marginTop: 16,
                    padding: 16,
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: theme.palette.background[4] },
                },
                '.NcLink': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap', // otherwise safari will break two or more words into multiple lines
                    '&:hover': {
                        backgroundColor: theme.palette.toolbar.hover,
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        color: theme.palette.text.link,
                    },
                    backgroundColor: theme.palette.toolbar.active,
                },
            },
        },
        ...alert(theme),
        ...autocomplete(theme),
        ...avatar(theme),
        ...backdrop(theme),
        ...badge(theme),
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
