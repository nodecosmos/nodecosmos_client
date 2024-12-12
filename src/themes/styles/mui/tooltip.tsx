import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    MuiTooltip: {
        styleOverrides: {
            tooltip: {
                fontSize: 14,
                backgroundColor: theme.palette.backgrounds[1],
                color: theme.palette.texts.contrast,
                '.TooltipTitle': {
                    padding: '8px',
                    margin: '-8px',
                    backgroundColor: theme.palette.backgrounds[1],
                },
            },
            tooltipPlacementTop: { marginBottom: '8px!important' },
        },
    },
});
