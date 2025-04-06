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
import paper from './styles/mui/paper';
import tab from './styles/mui/tab';
import tooltip from './styles/mui/tooltip';
import typographyStyle from './styles/mui/typographyStyle';
import typography from './styles/mui/typographyTheme';
import scrollbar from './styles/scrollbar';
import toolbar from './styles/toolbar';
import transformable from './styles/transformable';
import tree from './styles/tree';
import upload from './styles/upload';
import utils from './styles/utils';
import { NodecosmosTheme } from './themes.types';
import { createTheme } from '@mui/material/styles';

const getTheme = (theme: NodecosmosTheme) => createTheme({
    cssVariables: true,
    breakpoints: {
        keys: ['xs', 'sm', 'md', 'lg', 'xl'],
        values: {
            xs: 0,
            sm: 600,
            md: 1080,
            lg: 1200,
            xl: 1536,
        },
    },
    typography: typography(theme),

    // @ts-ignore
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                ...animations(),
                ...card(theme),
                ...cover(theme),
                ...description(theme),
                ...like(theme),
                ...scrollbar(theme),
                ...toolbar(theme),
                ...tree(theme),
                ...transformable(),
                ...utils(theme),
                ...upload(theme),
                a: { '&, &.MuiTypography-root': { textDecoration: 'none' } },
                '.Notification': {
                    borderRadius: 8,
                    marginTop: 0,
                    padding: 16,
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: theme.palette.backgrounds[4] },
                },
                '.NcLink': {
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap', // otherwise safari will break two or more words into multiple lines
                    '&:hover': {
                        backgroundColor: theme.palette.toolbar.hover,
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        color: theme.palette.texts.link,
                    },
                    backgroundColor: theme.palette.toolbar.active,
                },
                '.Resizer': {
                    width: 4,
                    height: '100%',
                    position: 'relative',
                    marginLeft: -4,
                    '&:hover': { cursor: 'col-resize' },
                },
                '.Pane': {
                    backgroundColor: theme.palette.backgrounds[5],
                    height: '100%',
                },
                '.MobilePane': {
                    transition: 'height 300ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
                    backgroundColor: theme.palette.backgrounds[1],
                },
                '.rc-anchor-normal-footer': { backgroundColor: theme.palette.backgrounds[2] },
                '&.ObjectTitle': {
                    '.diff-removed': {
                        backgroundColor: theme.palette.diff.removed.bg,
                        color: theme.palette.diff.removed.fg,
                    },
                    '.diff-added': {
                        ml: 2,
                        backgroundColor: theme.palette.diff.added.bg,
                        color: theme.palette.diff.added.fg,
                    },
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
        ...paper(),
        ...tab(),
        ...tooltip(theme),
        ...typographyStyle(theme),
    },
    //-----------------------------------------------------------------------------------------------------------------
    // @ts-ignore
    shadows: theme.shadows,
    palette: theme.palette,
});

export default getTheme;

export const themes = [dark, dimmed, light];
