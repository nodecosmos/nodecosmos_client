export default (currentTheme) => ({
  MuiList: {
    styleOverrides: {
      root: {
        padding: '8px 0 8px',
      },
    },
  },
  MuiListItem: {
    styleOverrides: {
      root: {
        padding: '4px 12px',
      },
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: {
        transition: 'all 350ms cubic-bezier(0.0, 0, 0.2, 1) 2ms',
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        padding: 8,
        borderRadius: 8,
        transition: 'all 150ms cubic-bezier(0.0, 0, 0.3, 1) 0ms',

        '.MuiSvgIcon-root': {
          fontSize: 20,
        },

        '.MuiTypography-root': {
          marginLeft: 16,
        },

        '.MuiListItemIcon-root': {
          minWidth: 0,
          padding: 10,
          borderRadius: 6,
          background: currentTheme.palette.background.list.iconBackground,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%),'
            + '0px 1px 1px 0px rgb(0 0 0 / 14%), '
            + '0px 1px 3px 0px rgb(0 0 0 / 12%)',
          color: currentTheme.palette.background.list.iconForeground,
        },

        '&:hover': {
          background: currentTheme.palette.background.list.active,

          '.MuiListItemIcon-root': {
          },
        },

        '&.active': {
          background: currentTheme.palette.background.list.active,

          '.MuiListItemIcon-root': {
          },
        },
      },
    },
  },
});
