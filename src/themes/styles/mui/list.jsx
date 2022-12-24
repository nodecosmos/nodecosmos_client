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
          // transition: 'all 250ms cubic-bezier(0.0, 0, 0.3, 1) 0ms',
        },

        '.MuiTypography-root': {
          marginLeft: 16,
          // fontSize: 12,
          // fontFamily: 'monospace',
        },

        '.MuiListItemIcon-root': {
          minWidth: 0,
          padding: 10,
          borderRadius: 6,
          background: '#373b43',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%),'
            + '0px 1px 1px 0px rgb(0 0 0 / 14%), '
            + '0px 1px 3px 0px rgb(0 0 0 / 12%)',
        },

        '&:hover': {
          background: '#33373e',
          color: '#fff',

          '.MuiListItemIcon-root': {
            borderColor: 'transparent',
          },
        },

        '&.active': {
          background: '#33373e',
          color: '#fff',

          '.MuiListItemIcon-root': {
            borderColor: 'transparent',
            color: '#fff',
          },
        },
      },
    },
  },
});
