import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    MuiDialog: {
        styleOverrides: {
            paper: {
                borderRadius: 10,
                boxShadow: theme.shadows[1],
                border: `1px solid ${theme.palette.borders[3]}`,
                '.DialogHeader': {
                    padding: 16,
                    paddingBottom: 0,
                    h5: {
                        lineHeight: 1,
                        marginTop: 16,
                        marginBottom: 8,
                    },
                    svg: {
                        color: theme.palette.text.tertiary,
                        marginRight: 12,
                    },
                    '@media (max-width: 600px)': {
                        padding: 8,
                    },
                },
                '.CloseModalButton': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 24,
                    right: 16,
                    padding: 0,
                    svg: {
                        color: theme.palette.text.tertiary,
                        fontSize: 18,
                    },

                    '@media (max-width: 600px)': {
                        top: 16,
                        right: 0,
                    },
                },

                '.SubmitButtonBig': {
                    marginTop: 16,
                    width: '100%',
                    height: 50,
                },

            },
        },
    },

    MuiDialogContent: {
        styleOverrides: {
            root: {
                padding: '16px 24px',
                '@media (max-width: 600px)': {
                    padding: '8px 12px',
                },
            },
        },
    },
});
