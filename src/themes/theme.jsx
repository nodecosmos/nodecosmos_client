import { createTheme } from '@mui/material/styles';

export default (currentTheme) => createTheme({
  spacing: [0, 1, 8, 16, 32, 64, 128, 256, 512, 1024, 2048],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          color: currentTheme.beige1,
          textDecoration: 'none',
        },
        //--------------------------------------------------------------------------------------------------------------
        '::-webkit-scrollbar': {
          width: 9,
        },
        '::-webkit-scrollbar-thumb': {
          borderRadius: 8,
          backgroundColor: currentTheme.black3,
          width: 24,
        },
        '::-webkit-scrollbar-track': {
          marginTop: 16,
          marginBottom: 16,
          borderRadius: 8,
        },
        // -------------------------------------------------------------------------------------------------------------
        '.MaxHeightWithoutHeader': { height: 'calc(100% - 45px)' },
        '.flexColumnSpaceBetween': { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
        '.BoxShadowTop': { boxShadow: '0px -1px 1px 0px #00000045' },
        '.BoxShadowBottom': { boxShadow: '0px 1px 1px 0px #00000045' },
        '.BoxShadowLeft': { boxShadow: '-1px 0px 0.9px 0px #00000045' },
        '.BoxShadowRight': { boxShadow: '1px 0px 1px 0px #00000045' },
        '.BorderTop': { borderTop: currentTheme.border1 },
        '.BorderBottom': { borderBottom: currentTheme.border1 },
        '.BorderLeft': { borderLeft: currentTheme.border1 },
        '.BorderRight': { borderRight: currentTheme.border1 },
        '.Border': { border: currentTheme.border1 },
        //--------------------------------------------------------------------------------------------------------------
        '.MainContent': {
          boxShadow: currentTheme.boxShadow2,
          backgroundColor: currentTheme.black3,
        },
        //--------------------------------------------------------------------------------------------------------------
        '.Toolbar': {
          '.Item': {
            width: 26,
            height: 26,
            borderRadius: 8,
            marginLeft: 1,
            marginRight: 1,
            '&:hover': { background: 'rgb(56 195 197 / 14%)' },
          },
          '.Item:nth-of-type(1)': { color: currentTheme.red1 },
          '.Item:nth-of-type(2)': { color: currentTheme.green2 },
          '.Item:nth-of-type(3)': { color: currentTheme.blue1 },
          '.Item:nth-of-type(4)': { color: currentTheme.yellow1 },
          '.Item:nth-of-type(5)': { color: currentTheme.red1 },
          '.Item:nth-of-type(6)': { color: currentTheme.green2 },
          '.MuiSvgIcon-root': { fontSize: 15 },
        },
        '.Tree': {
          '.MicronName': { cursor: 'pointer' },
          '.DropShadow': { filter: currentTheme.filter1 },
          '.MicronActions': {
            background: currentTheme.black6,
            boxShadow: currentTheme.boxShadow1,
            border: currentTheme.border1,
            padding: 5,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 350ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
          },
          '.Path': {
            '&.animated': {
              strokeDasharray: 150,
              strokeDashoffset: 150,
              animation: 'dash 1s linear forwards', // forwards
            },
          },
        },
        '@keyframes dash': {
          to: {
            strokeDashoffset: 0,
          },
        },
        //--------------------------------------------------------------------------------------------------------------
        '.codeMirrorBlock': {
          backgroundColor: currentTheme.black6,
          border: '1px solid #464648',
        },
        '.CodeMirror.cm-s-material': {
          borderRadius: 8,
        },
        '.cm-s-material.CodeMirror': {
          backgroundColor: 'transparent',
          color: 'white',
          fontFamily: 'Menlo,Consolas,Liberation Mono,monospace',
          height: '100%',
          fontSize: 15,
        },
        '.CodeMirror-linenumber': { color: `${currentTheme.gray1}!important`, marginLeft: -8 },
        '.cm-s-material .CodeMirror-gutters': { backgroundColor: 'transparent' },
        '.cm-s-material .cm-comment': { color: currentTheme.gray2 },
      },
    },
    //-----------------------------------------------------------------------------------------------------------------
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
          transform: 'translate(13.5px, 6px) scale(0.8)',
          '&.MuiInputLabel-shrink': {
            color: currentTheme.beige1,
            fontWeight: 'bold',
          },
        },
      },
    },
    //-----------------------------------------------------------------------------------------------------------------
    MuiCheckbox: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgb(69 96 89 / 69%)',
          },
        },
      },
    },
    //-----------------------------------------------------------------------------------------------------------------
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
    //-----------------------------------------------------------------------------------------------------------------
    MuiMenuItem: {
      styleOverrides: {
        root: {
          padding: '8px 12px',
          borderRadius: 8,
          transition: 'all 250ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',

          '&:hover': {
            backgroundColor: currentTheme.black1,
          },

          '& .MuiAvatar-root': {
            backgroundColor: currentTheme.black4,
            boxShadow: currentTheme.boxShadow1,
            color: 'white',
            marginRight: 18,
          },
        },
      },
    },
    //-----------------------------------------------------------------------------------------------------------------
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          textTransform: 'none',
          backgroundColor: 'transparent',
          transition: 'all 450ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
          color: 'white',
          '&.Mui-selected': {
            color: currentTheme.green1,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 6,
          width: 5,
          borderRadius: 8,
          backgroundColor: currentTheme.green1,
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
    //-----------------------------------------------------------------------------------------------------------------
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 8,
          '&.Card': {
            backgroundColor: currentTheme.black6,
            boxShadow: currentTheme.boxShadow1,
          },
          '&.Modal': {
            height: '100%',
            padding: 0,
            boxShadow: '0px 0px 6px 1.5px #00000075',
            border: currentTheme.border1,
          },
        },
        rounded: {
          borderRadius: 8,
        },
      },
    },
    //-----------------------------------------------------------------------------------------------------------------
    MuiCardHeader: {
      styleOverrides: {
        root: {
          overflow: 'hidden',
        },
      },
    },
    //-----------------------------------------------------------------------------------------------------------------
    MuiTypography: {
      styleOverrides: {
        body1: {
          fontSize: 12,
        },
        h5: {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      },
    },
  },
  //-----------------------------------------------------------------------------------------------------------------
  palette: {
    primary: {
      main: currentTheme.blue2,
      light: currentTheme.blue1,
    },
    secondary: {
      main: currentTheme.red1,
    },
    error: {
      main: currentTheme.red1,
    },
    success: {
      main: currentTheme.green1,
    },
    text: {
      primary: currentTheme.beige1,
      secondary: currentTheme.gray1,
    },
    background: {
      paper: currentTheme.black6,
      default: currentTheme.black1,
    },
  },
});
