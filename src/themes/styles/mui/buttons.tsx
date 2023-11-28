import { NodecosmosTheme } from '../../type';

export default (theme: NodecosmosTheme) => ({
    MuiButton: {
        styleOverrides: {
            root: {
                textTransform: 'none',
                borderRadius: 4,
                '&.MicroButton': {
                    padding: '3px 8px',
                    border: '1.5px solid transparent',
                    borderRadius: 6,
                    '&:hover, &.hovered': {
                        background: 'rgb(73 176 244 / 7%)',
                        borderColor: theme.palette.logo.blue,
                    },
                    '&:focus, &.focused': {
                        borderColor: theme.palette.primary.main,
                        background: 'rgb(73 176 244 / 7%)',
                    },
                },
            },
        },
    },
    MuiButtonBase: { styleOverrides: { root: { overflow: 'hidden' } } },
});
