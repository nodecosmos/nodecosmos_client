import { NodecosmosTheme } from '../type';

export default (theme: NodecosmosTheme) => ({
    '.Toolbar': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        '.ToolbarContent': {
            marginLeft: 8,
            marginRight: 12,
            fontWeight: 500,
        },
        '.ButtonWrapper': {
            '&:hover': { button: { borderColor: 'transparent' } },
            '&.active': { button: { borderColor: 'inherit' } },
            button: {
                padding: 0,
                cursor: 'pointer',
                border: 'none',
                outline: 'none',
                borderColor: 'transparent',
                backgroundColor: 'transparent',
                color: theme.palette.toolbar.default,
                '&.active': { borderColor: 'inherit' },
            },
        },
    },
});
