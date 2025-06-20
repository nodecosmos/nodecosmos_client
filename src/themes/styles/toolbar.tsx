import utils from './utils';
import { NodecosmosTheme } from '../themes.types';

export default (theme: NodecosmosTheme) => ({
    '.Toolbar': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        overflow: 'hidden',
        '.ButtonWrapper': {
            display: 'inline-flex',
            alignItems: 'center',
            height: '100%',
            '&:hover': { button: { borderColor: 'transparent' } },
            '&.active': { button: { borderColor: 'inherit' } },
            button: {
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                cursor: 'pointer',
                border: 'none',
                outline: 'none',
                borderColor: 'transparent',
                backgroundColor: 'transparent',
                color: theme.palette.toolbar.default,
                '&.active': { borderColor: 'inherit' },
                '.ButtonContent': {
                    marginLeft: 8,
                    marginRight: 12,
                    fontWeight: 500,
                },
            },
        },
    },

    '.NodeToolbar': {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        marginLeft: 8,
        '.Item': {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            outline: 0,
            border: 0,
            padding: 8,
            width: 32,
            height: '100%',
            margin: '0 4px',
            borderRadius: 4,
            '&:hover': { backgroundColor: theme.palette.toolbar.hover },
            '.svg-inline--fa, .MuiSvgIcon-root': { fontSize: 15 },
            '&.fs-18': { '.svg-inline--fa, .MuiSvgIcon-root': { fontSize: 18 } },
        },
        '.ToolbarChip': {
            height: '100%',
            border: '1px solid',
            color: theme.palette.toolbar.lightRed,
            width: 'fit-content',
            marginRight: 8,
            ...utils(theme),
        },
        '.Item.default': { color: theme.palette.toolbar.default },
        '.Item.lightRed': { color: theme.palette.toolbar.lightRed },
        '.Item.red': { color: theme.palette.toolbar.red },
        '.Item.green': { color: theme.palette.toolbar.green },
        '.Item.blue': { color: theme.palette.toolbar.blue },
        '.Item.pink': { color: theme.palette.toolbar.pink },
        '.Item.purple': { color: theme.palette.toolbar.purple },
        '.Item.lightPurple': { color: theme.palette.toolbar.lightPurple },
        '.Item.yellow': { color: theme.palette.toolbar.yellow },
        '.Item.orange': { color: theme.palette.toolbar.orange },
    },

    '.CountBadge': {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        marginLeft: 8,
        position: 'relative',
        svg: {
            fontSize: 23,
            color: theme.palette.button.main,
        },
        '.Count ': {
            fontWeight: 'bold',
            fontSize: 12,
            color: theme.palette.button.contrastText,
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    },
});
