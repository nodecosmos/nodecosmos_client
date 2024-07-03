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
    typography: typography(theme),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
                '.Resizer': {
                    width: 8,
                    height: '100%',
                    position: 'relative',
                    marginLeft: -8,
                    '&:hover': { cursor: 'col-resize' },
                },
                '.Pane': {
                    backgroundColor: theme.palette.background[5],
                    height: '100%',
                },
                '.MobilePane': {
                    transition: 'height 300ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
                    backgroundColor: theme.palette.background[1],
                },
                '.rc-anchor-normal-footer': { backgroundColor: theme.palette.background[2] },
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
        ...tab(),
        ...tooltip(theme),
        ...typographyStyle(theme),
    },
    //-----------------------------------------------------------------------------------------------------------------
    ...theme,
});

export default getTheme;

export const themes = [dark, dimmed, light];
