import { HEADER_HEIGHT } from '../../features/app/constants';
import { COMPACT_NODE_HEIGHT, NODE_HEIGHT } from '../../features/nodes/nodes.constants';
import { NodecosmosTheme } from '../themes.types';

export default (theme: NodecosmosTheme) => ({
    '&.m-0': { margin: 0 },
    '&.m-1': { margin: 8 },
    '&.m-2': { margin: 16 },

    '&.mt-1': { marginTop: 8 },
    '&.mt-2': { marginTop: 16 },
    '&.mt-3': { marginTop: 24 },
    '&.mt-4': { marginTop: 32 },

    '&.mb-1': { marginBottom: 8 },
    '&.mb-2': { marginBottom: 16 },

    '&.ml-1': { marginLeft: 8 },
    '&.ml-2': { marginLeft: 16 },

    '&.mr-0': { marginRight: 0 },
    '&.mr-1': { marginRight: 8 },
    '&.mr-2': { marginRight: 16 },

    '&.mx-05': {
        marginLeft: 4,
        marginRight: 4,
    },

    '&.mx-1': {
        marginLeft: 8,
        marginRight: 8,
    },

    '&.mx-2': {
        marginLeft: 16,
        marginRight: 16,
    },

    '&.my-1': {
        marginTop: 8,
        marginBottom: 8,
    },

    '&.my-2': {
        marginTop: 16,
        marginBottom: 16,
    },

    '&.my-3': {
        marginTop: 24,
        marginBottom: 24,
    },

    '&.my-4': {
        marginTop: 32,
        marginBottom: 32,
    },

    '&.p-0': { padding: 0 },
    '&.p-05': { padding: 4 },
    '&.p-1': { padding: 8 },
    '&.p-2': { padding: 16 },
    '&.p-3': { padding: 24 },
    '&.p-4': { padding: 32 },
    '&.pl-1': { paddingLeft: 8 },
    '&.pl-2': { paddingLeft: 16 },
    '&.pl-3': { paddingLeft: 24 },
    '&.pl-4': { paddingLeft: 32 },
    '&.pr-0': { paddingRight: 0 },
    '&.pr-1': { paddingRight: 8 },
    '&.pr-2': { paddingRight: 16 },
    '&.pr-3': { paddingRight: 24 },
    '&.pr-4': { paddingRight: 32 },
    '&.p-1-2': { padding: '8px 16px' },
    '&.px-1': {
        paddingLeft: 8,
        paddingRight: 8,
    },
    '&.px-2': {
        paddingLeft: 16,
        paddingRight: 16,
    },
    '&.px-3': {
        paddingLeft: 24,
        paddingRight: 24,
    },
    '&.px-4': {
        paddingLeft: 32,
        paddingRight: 32,
    },

    '&.h-32': { height: 32 },
    '&.h-35': { height: 35 },
    '&.h-100': { height: '100%' },
    '&.h-header': { height: HEADER_HEIGHT },
    '&.h-without-header': { height: `calc(100% - ${HEADER_HEIGHT})` },
    [`&.h-${NODE_HEIGHT}`]: { height: NODE_HEIGHT },
    [`&.h-${COMPACT_NODE_HEIGHT}`]: { height: COMPACT_NODE_HEIGHT },

    '&.max-h-20': { maxHeight: 20 },
    '&.min-h-100': { minHeight: 100 },
    '&.min-h-210': { minHeight: 210 },

    '&.w-35': { width: 35 },
    '&.w-100': { width: '100%' },
    '&.w-320': { width: 320 },
    '&.w-600': { width: 600 },
    '&.w-850': { width: 850 },
    '&.max-w-85': { maxWidth: 100 },
    '&.max-w-200': { maxWidth: 200 },
    '&.max-w-850': { maxWidth: 850 },
    '&.max-w-900': { maxWidth: 900 },
    '&.min-w-50': { minWidth: 50 },
    '&.min-w-300': { minWidth: 300 },
    '&.w-fit-content': { width: 'fit-content' },

    '&.border-1': { border: `1px solid ${theme.palette.borders[1]}` },
    '&.border-top-1': { borderTop: `1px solid ${theme.palette.borders[1]}` },
    '&.border-bottom-1': { borderBottom: `1px solid ${theme.palette.borders[1]}` },
    '&.border-right-1': { borderRight: `1px solid ${theme.palette.borders[1]}` },
    '&.border-radius-1': { borderRadius: 4 },
    '&.border-radius-2': { borderRadius: 8 },

    '&.fs-16': {
        fontSize: 16,
        svg: { fontSize: 16 },
    },
    '&.fs-18': { fontSize: 18 },
    '&.fs-25': { fontSize: 25 },
    '&.fs-70': { fontSize: 75 },

    '&.bold': { fontWeight: 'bold' },

    '&.min-vis-width-viewport-360': { '@media (max-width: 360px)': { display: 'none' } },
    '&.min-vis-width-viewport-400': { '@media (max-width: 400px)': { display: 'none' } },
    '&.min-vis-width-viewport-600': { '@media (max-width: 600px)': { display: 'none' } },

    '&.background-0': { backgroundColor: 'transparent' },
    '&.background-1': { backgroundColor: theme.palette.backgrounds[1] },
    '&.background-2': { backgroundColor: theme.palette.backgrounds[2] },
    '&.background-3': { backgroundColor: theme.palette.backgrounds[3] },
    '&.background-4': { backgroundColor: theme.palette.backgrounds[4] },
    '&.background-5': { backgroundColor: theme.palette.backgrounds[5] },
    '&.background-6': { backgroundColor: theme.palette.backgrounds[6] },
    '&.background-7': { backgroundColor: theme.palette.backgrounds[7] },
    '&.background-8': { backgroundColor: theme.palette.backgrounds[8] },
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
    '&.default-list-color': { color: theme.palette.backgrounds.list.defaultColor },

    '&.text-primary': { color: theme.palette.texts.primary },
    '&.text-secondary': { color: theme.palette.texts.secondary },
    '&.text-tertiary': { color: theme.palette.texts.tertiary },
    '&.text-link': { color: theme.palette.texts.link },
    '&.hashtag': { color: theme.palette.tree.hashtag },
    '&.tree-defaultText': { color: theme.palette.tree.defaultText },

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
    '&.left': { textAlign: 'left' },

    '&.display-mobile-none': { '@media (max-width: 768px)': { display: 'none' } },
    '&.display-flex': { display: 'flex' },
    '&.display-inline-flex': { display: 'inline-flex' },
    '&.justify-start': { justifyContent: 'start' },
    '&.justify-center': { justifyContent: 'center' },
    '&.justify-end': { justifyContent: 'end' },
    '&.justify-space-between': { justifyContent: 'space-between' },
    '&.align-center': { alignItems: 'center' },
    '&.flex-column': { flexDirection: 'column' },
    '&.flex-row': { flexDirection: 'row' },
    '&.flex-1': { flex: 1 },

    '&.text-center': { textAlign: 'center' },
    '&.text-ellipsis': {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    '&.user-select-none': { userSelect: 'none' },

    '&.bg-transition-1': { transition: 'background-color 0.2s ease, opacity 0.1s ease' },

    '&.tree-nested-color-0': {
        backgroundColor: theme.palette.tree.backgrounds[0].bg,
        color: theme.palette.tree.backgrounds[0].fg,
    },

    '&.tree-nested-color-1': {
        backgroundColor: theme.palette.tree.backgrounds[1].bg,
        color: theme.palette.tree.backgrounds[1].fg,
    },

    '&.tree-nested-color-2': {
        backgroundColor: theme.palette.tree.backgrounds[2].bg,
        color: theme.palette.tree.backgrounds[2].fg,
    },

    '&.tree-nested-color-3': {
        backgroundColor: theme.palette.tree.backgrounds[3].bg,
        color: theme.palette.tree.backgrounds[3].fg,
    },

    '&.tree-nested-color-4': {
        backgroundColor: theme.palette.tree.backgrounds[4].bg,
        color: theme.palette.tree.backgrounds[4].fg,
    },

    '&.tree-nested-color-5': {
        backgroundColor: theme.palette.tree.backgrounds[5].bg,
        color: theme.palette.tree.backgrounds[5].fg,
    },

    '&.tree-nested-color-hover-0': {
        '&:hover': {
            backgroundColor: theme.palette.tree.backgrounds[0].bg,
            color: theme.palette.tree.backgrounds[0].fg,
        },
    },
    '&.tree-nested-color-hover-1': {
        '&:hover': {
            backgroundColor: theme.palette.tree.backgrounds[1].bg,
            color: theme.palette.tree.backgrounds[1].fg,
        },
    },
    '&.tree-nested-color-hover-2': {
        '&:hover': {
            backgroundColor: theme.palette.tree.backgrounds[2].bg,
            color: theme.palette.tree.backgrounds[2].fg,
        },
    },
    '&.tree-nested-color-hover-3': {
        '&:hover': {
            backgroundColor: theme.palette.tree.backgrounds[3].bg,
            color: theme.palette.tree.backgrounds[3].fg,
        },
    },
    '&.tree-nested-color-hover-4': {
        '&:hover': {
            backgroundColor: theme.palette.tree.backgrounds[4].bg,
            color: theme.palette.tree.backgrounds[4].fg,
        },
    },
    '&.tree-nested-color-hover-5': {
        '&:hover': {
            backgroundColor: theme.palette.tree.backgrounds[5].bg,
            color: theme.palette.tree.backgrounds[5].fg,
        },
    },

});
