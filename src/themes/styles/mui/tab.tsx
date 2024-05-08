export default () => ({
    MuiTab: {
        styleOverrides: {
            root: {
                fontWeight: 700,
                fontSize: '1rem',
                textTransform: 'none',
                backgroundColor: 'transparent',
                transition: 'all 450ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
            },

            labelIcon: { minHeight: 1 },
        },
    },
    MuiTabs: {
        styleOverrides: {
            indicator: {
                height: 7,
                width: 5,
                borderRadius: 4,
                '&.header': {
                    height: 11,
                    top: 48,
                },
            },
        },
    },
});
