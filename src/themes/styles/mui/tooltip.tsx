import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    MuiTooltip: {
        styleOverrides: {
            tooltip: {
                fontSize: 14,
                backgroundColor: theme.palette.background[7],
                color: theme.palette.text.contrast,
                '.TooltipTitle': {
                    padding: '8px',
                    margin: '-8px',
                    backgroundColor: theme.palette.background[1],
                },
            },
            tooltipPlacementTop: {
                marginBottom: '8px!important',
            },
        },
    },
});
