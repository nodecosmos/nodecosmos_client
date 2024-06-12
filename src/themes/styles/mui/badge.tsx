import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    MuiBadge: {
        styleOverrides: {
            badge: {
                backgroundColor: theme.palette.toolbar.lightRed,
                color: theme.palette.text.primary,
                minWidth: 12,
                fontSize: 12,
                transform: 'translate(0%, 0%)',
            },
        },
    },
});
