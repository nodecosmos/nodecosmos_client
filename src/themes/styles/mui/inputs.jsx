export default (currentTheme) => ({
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        caretColor: currentTheme.yellow1,
      },
      root: {
        borderRadius: 4,
        background: currentTheme.black1,
        '.MuiOutlinedInput-notchedOutline': {
          borderColor: currentTheme.black3,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: currentTheme.black3,
        },
        '&.Mui-error .MuiOutlinedInput-notchedOutline': {
          borderColor: currentTheme.red1,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderWidth: 1,
          borderStyle: 'solid',
          background: 'none',
          borderColor: currentTheme.blue1,
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
        color: currentTheme.beige1,
        transform: 'translate(14px, 5px) scale(0.8)',
        '&.MuiInputLabel-shrink': {
          color: currentTheme.beige1,
          fontWeight: 'bold',
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
