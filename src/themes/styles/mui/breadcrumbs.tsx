import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    MuiBreadcrumbs: {
        styleOverrides: {
            root: {
                width: 'max-content',
                '.BreadcrumbItem': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 4,
                    borderRadius: 4,
                    marginLeft: 8,
                    color: theme.palette.texts.tertiary,
                },
                '.BreadcrumbItem:first-of-type': { marginLeft: 0 },
                '.MuiLink-root': {
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    fontSize: 12,
                },
                '.MuiBreadcrumbs-separator': {
                    color: theme.palette.toolbar.default,
                    fontSize: 8,
                    mx: 0.5,
                },
                '.MuiButtonBase-root': { backgroundColor: 'transparent' },
                'button, button:hover': { backgroundColor: theme.palette.toolbar.active },
                '.ScrollButton': {
                    display: 'inline-flex',
                    marginLeft: 4,
                    padding: 4,
                    background: 'transparent',
                    svg: { fontSize: '8px' },
                    '&:hover': {
                        background: theme.palette.toolbar.active,
                        color: 'inherit',
                    },
                },

            },
        },
    },
});
