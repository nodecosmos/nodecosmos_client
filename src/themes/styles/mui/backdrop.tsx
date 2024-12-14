import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    MuiBackdrop: {
        styleOverrides: {
            root: {
                backgroundColor: theme.palette.backgrounds.backdrop,
                color: 'inherit',
            },
        },
    },
});
