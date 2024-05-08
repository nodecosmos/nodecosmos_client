import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    MuiDialog: {
        styleOverrides: {
            paper: {
                borderRadius: 10,
                boxShadow: theme.shadows[1],
                border: `1px solid ${theme.palette.borders[3]}`,
            },
        },
    },
});
