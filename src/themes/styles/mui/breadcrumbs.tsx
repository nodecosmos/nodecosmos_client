import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    MuiBreadcrumbs: {
        styleOverrides: {
            root: {
                width: 'max-content',
                '.BreadcrumbItem': {
                    display: 'flex',
                    alignItems: 'center',
                },
                '.MuiLink-root': {
                    cursor: 'pointer',
                    '&:hover': { color: theme.palette.text.link },
                },
                '.MuiBreadcrumbs-separator': {
                    color: theme.palette.toolbar.default,
                    fontSize: 10,
                    mx: 0.5,
                },
                '.MuiButtonBase-root': {
                    backgroundColor: 'transparent',
                },
                'button, button:hover': { backgroundColor: theme.palette.toolbar.active },
                '.tools': {
                    background: 'transparent',
                    fontSize: '0.6rem',
                    ml: 1,
                },

            },
        },
    },
});
