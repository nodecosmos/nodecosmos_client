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
        color: currentTheme.beige1, // currentTheme.beige1
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        padding: 8,
        borderRadius: 14,
        transition: 'all 150ms cubic-bezier(0.0, 0, 0.3, 1) 0ms',
        color: currentTheme.gray1, // currentTheme.beige1

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
          color: '#c4c7cf', // currentTheme.beige1
          padding: 11,
          borderRadius: 10,
          background: currentTheme.black5,
          boxShadow: currentTheme.boxShadow1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },

        '&:hover': {
          background: currentTheme.black8,
          color: '#fff',

          '.MuiListItemIcon-root': {
            borderColor: 'transparent',
          },
        },

        '&.active': {
          background: currentTheme.black8,
          color: '#fff',
          borderRadius: 8,

          '.MuiListItemIcon-root': {
            borderRadius: 10,
            borderColor: 'transparent',
            color: '#fff',
          },
        },
      },
    },
  },
});
