import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    MuiBadge: {
        styleOverrides: {
            badge: {
                backgroundColor: theme.palette.toolbar.lightRed,
                color: theme.palette.texts.primary,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 0,
                height: 20,
                minWidth: 20,
                fontSize: 12,
                fontWeight: 700,
                transform: 'translate(0%, 0%)',
            },
        },
    },
});
