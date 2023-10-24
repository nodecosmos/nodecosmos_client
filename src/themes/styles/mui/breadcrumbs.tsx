import { NodecosmosTheme } from '../../type';

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
                    color: theme.palette.text.tertiary,
                    cursor: 'pointer',
                    '&:hover': {
                        color: theme.palette.text.link,
                    },
                },
                '.MuiBreadcrumbs-separator': {
                    color: theme.palette.toolbar.default,
                    fontSize: '0.75rem',
                    mx: 2,
                },
                'button, button:hover': {
                    backgroundColor: theme.palette.toolbar.active,
                },
                '.tools': {
                    color: theme.palette.toolbar.active,
                    background: 'transparent',
                    fontSize: '0.6rem',
                    ml: 1,
                },

            },
        },
    },
});
