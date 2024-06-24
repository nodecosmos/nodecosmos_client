import { NodecosmosTheme } from '../themes.types';

export default (theme: NodecosmosTheme) => ({
    '&.mt-1': { marginTop: 8 },
    '&.mt-2': { marginTop: 16 },

    '&.mx-1': {
        marginLeft: 8,
        marginRight: 8,
    },

    '&.ml-1': { marginLeft: 8 },

    '&.mr-1': { marginRight: 8 },
    '&.mr-2': { marginRight: 16 },

    '&.h-100': { height: '100%' },

    '&.min-h-210': { minHeight: 210 },

    '&.fs-18': { fontSize: 18 },

    '&.background-2': { backgroundColor: theme.palette.background[2] },
    '&.background-5': { backgroundColor: theme.palette.background[5] },

    '&.toolbar-red': { color: theme.palette.toolbar.red },
    '&.toolbar-green': { color: theme.palette.toolbar.green },
    '&.toolbar-blue': { color: theme.palette.toolbar.blue },
    '&.toolbar-lightRed': { color: theme.palette.toolbar.lightRed },
    '&.toolbar-pink': { color: theme.palette.toolbar.pink },
    '&.toolbar-purple': { color: theme.palette.toolbar.purple },
    '&.toolbar-yellow': { color: theme.palette.toolbar.yellow },
    '&.toolbar-orange': { color: theme.palette.toolbar.orange },
    '&.toolbar-hover': { color: theme.palette.toolbar.hover },
    '&.toolbar-active': { color: theme.palette.toolbar.active },
    '&.toolbar-default': { color: theme.palette.toolbar.default },
    '&.toolbar-breadcrumbs': { color: theme.palette.toolbar.breadcrumbs },
    '&.default-list-color': { color: theme.palette.background.list.defaultColor },

    '&.ellipsis': { textOverflow: 'ellipsis' },

    '&.overflow-hidden': { overflow: 'hidden' },

    '&.position-relative': { position: 'relative' },

    '&.float-right': { float: 'right' },

    '&.cursor-pointer': { cursor: 'pointer' },
});
