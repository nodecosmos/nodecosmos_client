import { NodecosmosTheme } from '../../themes.types';
import utils from '../utils';

export default (theme: NodecosmosTheme) => ({
    MuiIconButton: {
        styleOverrides: {
            root: {
                padding: 8,
                borderRadius: 8,
                '&:hover': { backgroundColor: theme.palette.backgrounds[6] },
            },
        },
    },
    MuiButton: {
        styleOverrides: {
            root: {
                height: 32,
                textTransform: 'none',
                borderRadius: 4,
                whiteSpace: 'nowrap',
                '&.LogoButton': {
                    padding: '3px 8px',
                    border: '1.5px solid transparent',
                    borderRadius: 6,
                    '&:hover, &.hovered': {
                        background: 'rgb(73 176 244 / 7%)',
                        borderColor: theme.palette.toolbar.default,
                    },
                },

                '.Text': { height: '100%' },

                '.MuiButton-startIcon>*:nth-of-type(1)': { fontSize: 16 },
                '.MuiButton-endIcon>*:nth-of-type(1)': { fontSize: 16 },

                '&.SidebarMobileButton': {
                    backgroundColor: theme.palette.backgrounds[7],
                    color: theme.palette.toolbar.default,
                    padding: 0,
                },
            },
        },
    },
    MuiButtonBase: {
        styleOverrides: {
            root: {
                '&.Mui-disabled': {
                    color: theme.palette.texts.secondary,
                    WebkitTextFillColor: theme.palette.texts.secondary,
                    span: { color: theme.palette.texts.disabled },
                },
                '&.SidebarMobileButton': {
                    color: theme.palette.toolbar.default,
                    padding: 0,
                    marginLeft: 8,
                    fontsize: 24,
                },

                ...utils(theme),
            },
        },
    },
});
