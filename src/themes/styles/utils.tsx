import { COMPACT_NODE_HEIGHT, NODE_BUTTON_HEIGHT } from '../../features/nodes/nodes.constants';
import { NodecosmosTheme } from '../themes.types';

export default (theme: NodecosmosTheme) => ({
    '&.m-0': { margin: 0 },
    '&.mt-1': { marginTop: 8 },
    '&.mt-2': { marginTop: 16 },
    '&.mb-1': { marginBottom: 8 },
    '&.mb-2': { marginBottom: 16 },

    '&.ml-1': { marginLeft: 8 },
    '&.ml-2': { marginLeft: 16 },

    '&.mr-1': { marginRight: 8 },
    '&.mr-2': { marginRight: 16 },

    '&.mx-1': {
        marginLeft: 8,
        marginRight: 8,
    },

    '&.my-1': {
        marginTop: 8,
        marginBottom: 8,
    },

    '&.my-2': {
        marginTop: 16,
        marginBottom: 16,
    },

    '&.p-0': { padding: 0 },
    '&.p-1': { padding: 8 },
    '&.p-2': { padding: 16 },

    '&.h-100': { height: '100%' },
    [`&.h-${NODE_BUTTON_HEIGHT}`]: { height: NODE_BUTTON_HEIGHT },
    [`&.h-${COMPACT_NODE_HEIGHT}`]: { height: COMPACT_NODE_HEIGHT },

    '&.min-h-210': { minHeight: 210 },

    '&.width-fit-content': { width: 'fit-content' },

    '&.border-radius-1': { borderRadius: 4 },

    '&.fs-16': { fontSize: 16 },
    '&.fs-18': { fontSize: 18 },

    '&.min-vis-width-viewport-360': { '@media (max-width: 360px)': { display: 'none' } },
    '&.min-vis-width-viewport-400': { '@media (max-width: 400px)': { display: 'none' } },

    '&.background-1': { backgroundColor: theme.palette.background[1] },
    '&.background-2': { backgroundColor: theme.palette.background[2] },
    '&.background-5': { backgroundColor: theme.palette.background[5] },
    '&.background-8': { backgroundColor: theme.palette.background[8] },
    '&.background-workflow-default': { backgroundColor: theme.palette.workflow.default },
    '&.background-toolbar-hover': { backgroundColor: theme.palette.toolbar.hover },

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

    '&.overflow-auto': { overflow: 'auto' },
    '&.overflow-x-auto': { overflowX: 'auto' },
    '&.overflow-hidden': { overflow: 'hidden' },

    '&.position-relative': { position: 'relative' },

    '&.float-right': { float: 'right' },

    '&.cursor-pointer': { cursor: 'pointer' },
    '&.cursor-grab': { cursor: 'grab' },

    '&.nowrap': { whiteSpace: 'nowrap' },

    '&.center': { textAlign: 'center' },

});
