export default (currentTheme) => ({
  MuiIconButton: {
    styleOverrides: {
      root: {
        color: currentTheme.gray1,
        '&.squared': {
          borderRadius: 8,
        },
      },
    },
  },
  //-----------------------------------------------------------------------------------------------------------------
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        color: currentTheme.beige1,
        borderRadius: 4,
        '&.MicroButton': {
          padding: '3px 8px',
          border: '1px solid transparent',
          borderRadius: 4,
          '&:hover': {
            background: 'rgb(73 176 244 / 7%)',
            borderColor: currentTheme.blue1,
          },
          '&:focus': {
            borderColor: currentTheme.green1,
            background: 'rgb(73 176 244 / 7%)',
          },
        },
      },
    },
  },
  MuiButtonBase: {
    styleOverrides: {
      root: {
        overflow: 'hidden',
      },
    },
  },
});
