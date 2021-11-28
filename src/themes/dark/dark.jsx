import { createTheme } from '@mui/material/styles';
import {
  blue,
  blue1,
  dirtyPurple1,
  red,
  beige,
  beige1,
  black,
  black1,
  black2,
  black3,
  black4,
  black5,
  black6,
  black7,
  black8,
  black9,
  gray,
  green,
  yellow,
  purple,
  dirtyPurple,
  // fluorescent,
  // purple,
} from './colors';

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
          backgroundColor: black7,
          width: 24,
        },
        '::-webkit-scrollbar-track': {
          marginTop: 16,
          marginBottom: 16,
          borderRadius: 8,
          backgroundColor: black9,
        },
        a: {
          color: beige,
          textDecoration: 'none',
        },
        '.Header': {
          // backgroundColor: black8,
        },
        '.HeaderHeight': {
          height: 54,
        },
        '.MaxHeightWithoutHeader': {
          height: 'calc(100% - 54px)',
        },
        '.Sidebar': {
          // NE DIRAAAAAAAJ
          zIndex: 1,
          // backgroundColor: black2,
        },
        '.MainContent': {
          // backgroundColor: black2,
        },
        '.flexColumnSpaceBetween': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
        '.BorderedBox': {
          // border: '1px solid #262626fc',
          boxShadow: '2px -2px 3px 0px rgb(0 0 0 / 32%),'
            + '-3px 1px 2px 0px rgb(0 0 0 / 15%), '
            + '2px 1px 3px 0px rgb(0 0 0 / 35%),'
            + '0px 2px 2px 0px rgb(0 0 0 / 25%)',
        },
        '.BoxShadowBottom': {
          boxShadow: '0px 2px 2px 0px #00000045',
        },
        '.BorderBottom': {
          borderBottom: '1px solid #80808014',
        },
        '.BoxShadowRight': {
          boxShadow: '1px 0px 1px 0px #00000045',
        },
        '.BorderRight': {
          borderRight: '1px solid #80808014',
        },
        '.BoxShadowLeft': {
          boxShadow: '-1px 0px 0.9px 0px #00000045',
        },
        '.BoxBackground': {
          backgroundColor: black2,
        },
        '.CodeMirror.cm-s-material': {
          borderRadius: 8,
        },
        '.cm-s-material.CodeMirror': {
          backgroundColor: 'transparent',
          color: 'white',
          fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
          height: '100%',
          fontSize: 20,
        },
        '.cm-s-material .CodeMirror-gutters': {
          backgroundColor: 'transparent',
        },
        '.CodeMirror-linenumber': {
          color: `${gray}!important`,
          marginTop: 6,
          fontSize: 15,
        },
        // '.CodeMirror-linenumbers': {
        //   boxShadow: '1px 0px 0px 0px #757980',
        // },
        '.cm-s-material .cm-comment': {
          color: '#596072',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          caretColor: yellow,
        },
        root: {
          borderRadius: 4,
          background: black2,
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: black3,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: red,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 1,
            borderStyle: 'solid',
            background: 'none',
            borderColor: blue1,
          },
          '&.MicroPlain': {
            borderColor: 'transparent',
            background: 'transparent',
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'transparent',
            },
            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: red,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: 1,
              borderStyle: 'solid',
              background: 'none',
              borderColor: 'transparent',
            },
            '& ::placeholder': {
              color: 'white',
            },
            '&.Large': {
              fontSize: 25,
              '.MuiSvgIcon-root': {
                fontSize: 36,
              },
            },
          },
        },
        notchedOutline: {
          borderWidth: 1,
          borderColor: black3,
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
          color: beige,
          transform: 'translate(13.5px, 6px) scale(0.8)',
          '&.MuiInputLabel-shrink': {
            color: beige,
            fontWeight: 'bold',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: dirtyPurple1,
          // backgroundColor: black5,
          // borderRadius: 8,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: dirtyPurple1,
          // backgroundColor: black5,
          // borderRadius: 8,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: '8px 0 4px',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          padding: '2px 12px',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          padding: 8,
          borderRadius: 4,
          transition: 'all 350ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
          color: gray, // beige
          '.MuiListItemIcon-root': {
            color: gray, // beige
            transition: 'all 350ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
          },
          '&:hover': {
            backgroundColor: black4,
            color: beige,
            '.MuiListItemIcon-root': {
              color: beige,
            },
          },
          '&.active': {
            background: black1,
            color: beige,
            '.MuiListItemIcon-root': {
              color: beige,
            },
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          textTransform: 'none',
          backgroundColor: 'transparent',
          transition: 'all 450ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
          color: 'white',
          '&.Mui-selected': {
            color: green,
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
          backgroundColor: green,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          color: beige,
          borderRadius: 4,
          '&.MicroButton': {
            border: '1px solid transparent',
            borderRadius: 4,
            '&:hover': {
              background: 'rgb(73 176 244 / 7%)',
              borderColor: blue,
            },
            '&:focus': {
              borderColor: green,
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
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: 8,
          '&.Card': {
            backgroundColor: black8,
            boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%),'
              + ' 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
          },
        },
        rounded: {
          borderRadius: 8,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          overflow: 'hidden',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
        },
        body1: {
          fontSize: 14,
        },
        h5: {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      },
    },
  },
  palette: {
    green,
    blue,
    blue1,
    gray,
    primary: {
      main: blue1,
      light: blue,
    },
    secondary: {
      main: red,
    },
    error: {
      main: red,
    },
    text: {
      primary: beige,
      secondary: beige1,
    },
    background: {
      paper: black1,
      default: black,
    },
  },
});

export default theme;
