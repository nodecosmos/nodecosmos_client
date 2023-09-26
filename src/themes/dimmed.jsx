export default {
  shadows: {
    0: 'none',
    1: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
    2: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
    3: '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
    4: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    5: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
    6: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
    7: '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
    8: '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',

    left: {
      1: '-1px 0px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
      2: '-3px 0px 3px -1px rgba(0,0,0,0.03),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
    },

    right: {
      1: '1px 0px 1px -1px rgba(0,0,0,0.2)',
      2: '2px 0px 1px -1px rgba(0,0,0,0.2)',
    },

    top: {
      1: '0px -3px 3px -2px rgb(0 0 0 / 20%)',
    },

    header: '0px 3px 1px -2px rgb(0 0 0 / 25%), 0px 2px 3px 0px rgb(0 0 0 / 3%), 0px 1px 5px 0px rgb(0 0 0 / 10%)',
    buttons: {
      1: '4px 4px 0px rgb(0 0 0 / 14%)',
      2: '6px 8px 0px rgb(48 49 58 / 65%)',
      3: '6px 6px 0px rgb(0 0 0 / 8%)',
    },
  },

  palette: {
    primary: {
      main: '#b3ff68',
      contrastText: 'rgba(0, 0, 0, 0.7)',
    },

    secondary: {
      main: '#cdd4ff',
    },

    error: {
      main: '#ed4b82',
      contrastText: 'rgba(0, 0, 0, 0.7)',
    },

    success: {
      main: '#b3ff68',
      contrastText: 'rgba(0, 0, 0, 0.7)',
    },

    toggle: {
      main: '#3a3e45',
      contrastText: '#fff',
    },

    button: {
      main: '#3d4652',
      contrastText: '#a5b4be',
    },

    buttonContrast: {
      main: '#a5b4be',
      contrastText: '#3d4652',
    },

    borders: {
      1: '#43464d',
      2: '#454b53', // 454b53 3c4149
      3: '#484d55',
      4: '#545760',
      5: '#6a707e',
    },

    background: {
      1: '#37393f',
      2: '#363a41',
      3: '#383c43',
      4: '#383c43',
      5: '#3a3f47',
      6: '#3c4149',
      7: '#3f464e',
      8: '#575d66',

      labels: {
        red: '#e15e7d',
        green: '#abe15e',
        blue: '#85c7f3',
        purple: '#c187ff',
      },

      list: {
        defaultColor: '#898f9c',
        activeColor: '#d8e0e8',
      },

      paper: '#383c43',
      backdrop: 'rgba(99, 110, 123, 0.4)',
    },

    toolbar: {
      red: '#e91e63',
      green: '#b6fd7b',
      blue: '#2adfff',
      lightRed: '#ff6881',
      pink: '#a9749e',
      purple: '#b775ff',
      yellow: '#f0f26f',
      hover: 'rgba(63,78,89,0.53)',
      active: 'rgba(63,78,89,0.53)',
      default: '#758593',
      breadcrumbs: '#758593',
    },

    tree: {
      default: '#444a54',
      backgrounds: [
        '#f13575',
        '#a38dff', // 539bf5
        '#77bbff',
        '#77e2ff',
        '#72fcad',
        '#b3ff68',
        '#e7e96d',
        '#f5a07b',
      ],
      defaultText: '#ffffff',
      selectedText: 'rgba(0, 0, 0, 0.9)',
      hashtag: '#898f9c',
      defaultBorder: 'transparent',
      dragInIndicator: '#bf7869',
      checkboxColor: '#63686c',
    },

    workflow: {
      default: '#43464d',
      input: '#cdd4ff',
      background: '#2d3139',
      selectedInputColor: '#cdd4ff',
      defaultInputColor: '#52565e',
    },

    markdownContent: {
      canvas: '#444756',
      background: 'transparent',
    },

    markdownEditor: {
      tagName: '#ff387a',
      string: '#d1ff5d',
      number: '#b3ff68',
      attributeName: '#ffea83',
      className: '#daff29',
      operator: '#fff',
      bracket: '#fff',
      caret: '#fff',
      heading: '#80c7ff',
      emphasis: '#ffea83',
      quote: '#748094',
      meta: '#ff87c4',
      link: '#83c1ea',
      background: 'transparent',
      foreground: '#c7cbdb',
      selection: 'rgba(255,255,255,0.06)',
      selectionMatch: 'rgba(255,255,255,0.06)',
      lineHighlight: '#8a91991a',
      gutterBackground: 'transparent',
      gutterForeground: '#636b73',
      gutterActiveForeground: '#bec8d8',
    },

    logo: {
      blue: '#2adfff',
      red: '#e91e63',
    },

    text: {
      primary: '#f5f5f2',
      secondary: '#babece',
      tertiary: '#838a9a',
      disabled: '#5c616b',
      contrast: '#fff',
      sectionPrimary: '#acdf83',
      sectionSecondary: '#cdd4eb',
      link: '#539bf5',
      gradients: {
        1: {
          xs: 'linear-gradient(90deg, #bb99ff, #ff87c4, #ff4b8d)',
          sm: 'linear-gradient(90deg, #bb99ff, #ff87c4, #ff4b8d)',
        },
        2: {
          xs: 'linear-gradient(90deg, #ff87c4, #bb99ff, #80c7ff)',
          sm: 'linear-gradient(90deg, #ff87c4, #bb99ff, #80c7ff)',
        },
        3: {
          xs: 'linear-gradient(90deg, #b3ff68, #ffe386, #ff8888)',
          sm: 'linear-gradient(90deg, #b3ff68, #ffe386, #ff8888)',
        },
      },
      collaboratePurple: '#bb99ff',
      mergeGreen: '#a3ff48',
      foreground: '#838f9e',
    },
  },
};
