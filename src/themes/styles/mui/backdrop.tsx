import { NodecosmosTheme } from '../../type';

export default (theme: NodecosmosTheme) => ({
    MuiBackdrop: {
        styleOverrides: {
            root: {
                backgroundColor: theme.palette.background.backdrop,
            },
        },
    },
});
