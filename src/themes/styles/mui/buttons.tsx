import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    MuiButton: {
        styleOverrides: {
            root: {
                height: 32,
                textTransform: 'none',
                borderRadius: 4,
                '&.LogoButton': {
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
                    p: {
                        marginLeft: 8,
                    },
                },

                '.Text': {
                    height: '100%',
                },

                '.MuiButton-startIcon>*:nth-of-type(1)': {
                    fontSize: 16,
                },
                '.MuiButton-endIcon>*:nth-of-type(1)': {
                    fontSize: 16,
                },
            },
        },
    },
    MuiButtonBase: {
        styleOverrides: {
            root: {
                overflow: 'hidden',
                '&.CloseModalButton': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 16,
                    right: 24,
                    p: 0,
                    svg: {
                        color: theme.palette.button.contrastText,
                        fontSize: 18,
                    },
                },

            },
        },
    },
});
