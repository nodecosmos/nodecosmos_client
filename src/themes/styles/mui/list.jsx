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
        color: currentTheme.beige1, // currentTheme.beige1
        transition: 'all 350ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
      },
    },
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        padding: 7,
        borderRadius: 8,
        transition: 'all 250ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
        color: currentTheme.gray1, // currentTheme.beige1

        '.MuiSvgIcon-root': {
          fontSize: '21px',
          transition: 'all 250ms cubic-bezier(0.0, 0, 0.3, 1) 0ms',
        },

        '.MuiTypography-root': {
          marginLeft: 16,
        },

        '.MuiListItemIcon-root': {
          minWidth: 0,
          color: '#c4c7cf', // currentTheme.beige1
          padding: 8,
          borderRadius: '50%',
          background: currentTheme.black2,
          boxShadow: currentTheme.boxShadow1,
          width: 39,
          height: 39,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },

        '&:hover': {
          background: currentTheme.black1,
          color: 'white',

          '.MuiListItemIcon-root': {
            borderColor: 'transparent',
            boxShadow: currentTheme.boxShadow1,
          },
        },

        '&.active': {
          background: '#2c2f35',
          color: 'white',
          borderRadius: 8,

          '.MuiListItemIcon-root': {
            borderRadius: 8,
            borderColor: 'transparent',
            color: 'white',
            boxShadow: currentTheme.boxShadow1,
          },
        },
      },
    },
  },
});
