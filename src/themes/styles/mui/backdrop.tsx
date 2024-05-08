import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    MuiBackdrop: {
        styleOverrides: {
            root: {
                backgroundColor: theme.palette.background.backdrop,
            },
        },
    },
});
