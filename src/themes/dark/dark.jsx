import { createTheme } from '@mui/material/styles';
import darkTheme from './theme';

const theme = createTheme({
  spacing: [0, 1, 8, 16, 32, 64, 128, 256, 512, 1024, 2048],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '::-webkit-scrollbar': {
          width: 9,
        },
        '::-webkit-scrollbar-thumb': {
          borderRadius: 8,
          backgroundColor: darkTheme.black3,
          width: 24,
        },
        '::-webkit-scrollbar-track': {
          marginTop: 16,
          marginBottom: 16,
          borderRadius: 8,
        },
        a: {
          color: darkTheme.beige1,
          textDecoration: 'none',
        },
        '.MaxHeightWithoutHeader': { height: 'calc(100% - 45px)' },
        '.flexColumnSpaceBetween': { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
        '.MainContent': {
          boxShadow: '0px -1px 2px 0px rgb(0 0 0 / 32%),'
            + '-3px 1px 2px 0px rgb(0 0 0 / 15%), '
            + '2px 1px 3px 0px rgb(0 0 0 / 35%),'
            + '0px 2px 2px 0px rgb(0 0 0 / 25%)',
          backgroundColor: darkTheme.black3,
        },
        '.BoxShadowTop': { boxShadow: '0px -1px 1px 0px #00000045' },
        '.BoxShadowBottom': { boxShadow: '0px 1px 1px 0px #00000045' },
        '.BoxShadowLeft': { boxShadow: '-1px 0px 0.9px 0px #00000045' },
        '.BoxShadowRight': { boxShadow: '1px 0px 1px 0px #00000045' },
        '.BorderTop': { borderTop: '1px solid #80808014' },
        '.BorderBottom': { borderBottom: '1px solid #80808014' },
        '.BorderLeft': { borderLeft: '1px solid #80808014' },
        '.BorderRight': { borderRight: '1px solid #80808014' },

        // Code Mirror
        '.codeMirrorBlock': {
          backgroundColor: darkTheme.black7,
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
        '.CodeMirror-linenumber': { color: `${darkTheme.gray1}!important`, marginLeft: -8 },
        '.cm-s-material .CodeMirror-gutters': { backgroundColor: 'transparent' },
        '.cm-s-material .cm-comment': { color: darkTheme.gray2 },
      },
    },
    //-----------------------------------------------------------------------------------------------------------------
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#80808014',
        },
      },
    },
    //-----------------------------------------------------------------------------------------------------------------
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          caretColor: darkTheme.yellow1,
        },
        root: {
          borderRadius: 4,
          background: darkTheme.black1,
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: darkTheme.black3,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: darkTheme.black3,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: darkTheme.red1,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 1,
            borderStyle: 'solid',
            background: 'none',
            borderColor: darkTheme.blue1,
          },
          '&.LargeInput': {
            fontSize: 25,
            background: darkTheme.black7,
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: '#464648',
            },
            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: darkTheme.red1,
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
          borderColor: darkTheme.gray1,
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
          color: darkTheme.beige1,
          transform: 'translate(13.5px, 6px) scale(0.8)',
          '&.MuiInputLabel-shrink': {
            color: darkTheme.beige1,
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
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
    //-----------------------------------------------------------------------------------------------------------------
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: darkTheme.gray1,
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
          color: darkTheme.beige1, // darkTheme.beige1
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
          color: darkTheme.gray1, // darkTheme.beige1
          '.MuiSvgIcon-root': {
            fontSize: '21px',
            transition: 'all 250ms cubic-bezier(0.0, 0, 0.3, 1) 0ms',
          },
          '.MuiListItemIcon-root': {
            color: '#c4c7cf', // darkTheme.beige1
            padding: 8,
            borderRadius: '50%',
            background: darkTheme.black2,
            border: '1px solid #3c4047',
            boxShadow: darkTheme.boxShadow1,
          },
          '&:hover': {
            background: darkTheme.black1,
            color: 'white',
            '.MuiListItemIcon-root': {
              borderColor: 'transparent',
              boxShadow: darkTheme.boxShadow1,
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
              boxShadow: darkTheme.boxShadow1,
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
            backgroundColor: darkTheme.black1,
          },

          '& .MuiAvatar-root': {
            backgroundColor: darkTheme.black4,
            boxShadow: darkTheme.boxShadow1,
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
            color: darkTheme.green1,
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
          backgroundColor: darkTheme.green1,
        },
      },
    },
    //-----------------------------------------------------------------------------------------------------------------
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: darkTheme.beige1,
          borderRadius: 4,
          '&.MicroButton': {
            border: '1px solid transparent',
            borderRadius: 4,
            '&:hover': {
              background: 'rgb(73 176 244 / 7%)',
              borderColor: darkTheme.blue1,
            },
            '&:focus': {
              borderColor: darkTheme.green1,
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
            backgroundColor: darkTheme.black7,
            boxShadow: darkTheme.boxShadow1,
          },
          '&.Modal': {
            height: '100%',
            padding: 0,
            boxShadow: '0px 0px 6px 1.5px #00000075',
            border: '1px solid #80808014',
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
      main: darkTheme.blue2,
      light: darkTheme.blue1,
    },
    secondary: {
      main: darkTheme.red1,
    },
    error: {
      main: darkTheme.red1,
    },
    success: {
      main: darkTheme.green1,
    },
    text: {
      primary: darkTheme.beige1,
      secondary: darkTheme.gray1,
    },
    background: {
      paper: darkTheme.black7,
      default: darkTheme.black1,
    },
  },
});

export default theme;
