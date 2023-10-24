import { NodecosmosTheme } from '../../type';

export default (theme: NodecosmosTheme) => ({
    MuiTooltip: {
        styleOverrides: {
            tooltip: {
                backgroundColor: theme.palette.background[7],
                color: theme.palette.text.contrast,
            },
        },
    },
});
