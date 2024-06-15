import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    MuiAlert: {
        styleOverrides: {
            icon: {
                alignItems: 'center',
            },

            '&.SimpleAlert': {
                marginTop: 16,
                padding: '4px 8px',
                height: '100%',
                borderRadius: 2,
                width: 'calc(100% - 1px)',
                backgroundColor: theme.palette.background[1],
                alignItems: 'center',

                '.MuiAlert-action': {
                    padding: 0,
                    marginRight: 0,
                },

                '&.warning': {
                    '.MuiAlert-icon, .MuiAlert-action': {
                        color: theme.palette.warning.main,
                    },
                },

                '&.error': {
                    '.MuiAlert-icon, .MuiAlert-action': {
                        color: theme.palette.error.main,
                    },
                },

                '&.info': {
                    '.MuiAlert-icon, .MuiAlert-action': {
                        color: theme.palette.info.main,
                    },
                },
            },
        },
    },
});
