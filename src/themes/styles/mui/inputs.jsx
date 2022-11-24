export default (currentTheme) => ({
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        caretColor: currentTheme.green1,
        fontFamily: "'Roboto mono', sans-serif",
      },
      root: {
        borderRadius: 4,
        background: currentTheme.black1,
        '.MuiOutlinedInput-input': {
          padding: '28px 14px 14px',
          '&.MuiInputBase-inputMultiline': {
            padding: 0,
            marginTop: 12,
          },
        },
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: currentTheme.black3,
          borderWidth: 2,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: currentTheme.black1,
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: currentTheme.red1,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderWidth: 2,
          borderStyle: 'solid',
          background: 'none',
          borderColor: 'transparent',
        },
        '&.LargeInput': {
          fontSize: 25,
          background: currentTheme.black6,
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: currentTheme.gray3,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: currentTheme.red1,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 1,
            borderStyle: 'solid',
            background: 'none',
          },
          '& ::placeholder': {
            color: 'white',
          },
          '.MuiSvgIcon-root': {
            fontSize: 36,
          },
        },
      },
      notchedOutline: {
        borderWidth: 1,
        borderColor: currentTheme.gray1,
        top: 0,
        transition: 'border-color cubic-bezier(0.0, 0, 0.2, 1) 350ms, '
          + 'background-color 100ms cubic-bezier(0.0, 0, 0.2, 1)',
        '& legend': {
          display: 'none',
        },
      },
    },
  },

  //--------------------------------------------------------------------------------------------------------------------
  MuiInputLabel: {
    styleOverrides: {
      root: {
        lineHeight: 1,
      },
      animated: {
        transition: 'color 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms, transform 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
      },
      outlined: {
        fontFamily: "'Roboto', sans-serif",
        fontWeight: 700,
        color: currentTheme.beige1,
        // transform: 'translate(14px, 5px) scale(0.8)',
        '&.MuiInputLabel-shrink': {
          transform: 'translate(14px, 9px) scale(0.8)',
          color: currentTheme.green1,
        },
      },
    },
  },

  //--------------------------------------------------------------------------------------------------------------------
  MuiCheckbox: {
    styleOverrides: {
      root: {
        '&:hover': {
          backgroundColor: 'rgb(69 96 89 / 69%)',
        },
      },
    },
  },
});
