import { NodecosmosTheme } from '../../themes.types';
import utils from '../utils';

export default (theme: NodecosmosTheme) => ({
    MuiAlert: {
        styleOverrides: {
            root: {
                padding: '4px 8px',
                width: '100%',
                backgroundColor: theme.palette.background[5],
                alignItems: 'center',
                ...utils(theme),

                '.MuiAlert-action': {
                    padding: 0,
                    marginRight: 0,
                },

                '&.success': { '.MuiAlert-icon, .MuiAlert-action': { color: theme.palette.success.main } },

                '&.warning': { '.MuiAlert-icon, .MuiAlert-action': { color: theme.palette.warning.main } },

                '&.error': { '.MuiAlert-icon, .MuiAlert-action': { color: theme.palette.error.main } },

                '&.info': { '.MuiAlert-icon, .MuiAlert-action': { color: theme.palette.info.main } },
            },
            icon: { alignItems: 'center' },
        },
    },
});
