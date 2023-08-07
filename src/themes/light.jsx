export default {
  shadows: {
    0: 'none',
    1: '0px 1px 3px rgba(0, 0, 0, 0.12)',
    2: '0px 1px 6px rgba(0, 0, 0, 0.10)',
    3: '0px 10px 20px rgba(0, 0, 0, 0.12)',
    4: '0px 15px 25px rgba(0, 0, 0, 0.12)',
    5: '0px 20px 40px rgba(0, 0, 0, 0.14)',
    6: '0px 25px 50px rgba(0, 0, 0, 0.14)',
    7: '0px 30px 60px rgba(0, 0, 0, 0.14)',
    8: '0px 35px 70px rgba(0, 0, 0, 0.14)',

    left: {
      1: '-1px 0px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
      2: '-2px 0px 1px -1px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
    },

    right: {
      1: '1px 0px 1px -1px rgba(0,0,0,0.2)',
      2: '2px 0px 1px -1px rgba(0,0,0,0.2)',
    },

    top: {
      1: '0px -3px 3px -2px rgb(0 0 0 / 10%)',
    },

    header: '0px 3px 1px -2px rgb(0 0 0 / 15%), 0px 2px 3px 0px rgb(0 0 0 / 2%), 0px 1px 5px 0px rgb(0 0 0 / 5%)',
    buttons: {
      1: '1px 1px 0px #d0d0d0',
    },
  },

  palette: {
    primary: {
      main: '#37a000',
      contrastText: 'rgba(0, 0, 0, 0.7)',
    },

    secondary: {
      main: '#5468e7',
    },

    error: {
      main: '#f56565',
      contrastText: 'rgba(0, 0, 0, 0.7)',
    },

    success: {
      main: '#37a000',
      contrastText: 'rgba(0, 0, 0, 0.7)',
    },

    toggle: {
      main: '#fafafa',
      contrastText: '#000',
    },

    button: {
      main: '#f6f8fa',
      contrastText: '#7e7d75',
    },

    borders: {
      1: '#e8e8e8',
      2: '#e8e8e8',
      3: '#e8e8e8',
      4: '#e8e8e8',
      5: '#e8e8e8',
    },

    background: {
      1: '#e5e7eb', // f8f9fa
      2: '#f5f7f9',
      3: '#ffffff',
      4: '#ffffff',
      5: '#ffffff',
      6: '#ffffff',
      7: '#ffffff',
      8: '#ffffff',

      labels: {
        red: '#f56565',
        green: '#48bb78',
        blue: '#4299e1',
        purple: '#805ad5',
      },

      list: {
        default: '#202124', // #595b63
        activeColor: '#202124',
      },

      paper: '#f8f9fa',
      backdrop: 'rgba(173, 216, 230, 0.4)',
    },

    toolbar: {
      red: '#f56565',
      green: '#48bb78',
      blue: '#4299e1',
      lightRed: '#feb2b2',
      pink: '#d53f8c',
      yellow: '#faf089',
      hover: 'rgba(66,153,225,0.53)',
      active: 'rgba(66,153,225,0.53)',
      default: '#4a5568',
      breadcrumbs: '#4a5568',
    },

    tree: {
      default: '#e1e6eb',
      backgrounds: [
        '#f56565',
        '#b882ff',
        '#57bfff',
        '#50bdcb',
        '#39d974',
        '#57d53e',
        '#c2a900',
        '#ff8b30',
      ],
      hashtag: 'rgb(149,151,153)',
      defaultText: 'rgb(67,69,71)',
      selectedText: 'rgb(0 0 0 / 65%)',
    },

    workflow: {
      default: '#edf2f7',
      input: '#ebf8ff',
      background: '#f7fafc',
      inputColors: [
        '#ebf8ff',
      ],
    },

    markdownContent: {
      canvas: '#f7fafc',
      background: 'transparent',
    },

    markdownEditor: {
      tagName: '#ff387a',
      string: '#4b4b4b',
      number: '#000',
      attributeName: '#ffea83',
      className: '#daff29',
      operator: '#000',
      bracket: '#000',
      caret: '#000',
      heading: '#008fff',
      emphasis: '#ffea83',
      quote: '#57606e',
      meta: '#ee56a3',
      link: '#83c1ea',
      background: '#f8f9fa',
      foreground: '#4b4b4b',
      selection: 'rgba(0,0,0,0.06)',
      selectionMatch: 'rgba(0,0,0,0.06)',
      lineHighlight: '#e5e7eb',
      gutterBackground: 'transparent',
      gutterForeground: '#636b73',
    },

    logo: {
      blue: '#5ebee3',
      red: '#e91e63',
    },

    text: {
      primary: '#626e79',
      secondary: '#7e7d75',
      tertiary: '#757571',
      contrast: '#5e5f5f',
      sectionPrimary: '#acdf83',
      sectionSecondary: '#cdd4eb',
      gradients: {
        1: {
          xs: 'linear-gradient(90deg, #b87cf9 0%, #ff4f90 55%)',
          sm: 'linear-gradient(90deg, #b87cf9 0%, #ff4f90 75%)',
        },
        2: {
          xs: 'linear-gradient(90deg, #51e0f9 0%, #7e8bff 55%)',
          sm: 'linear-gradient(90deg, #51e0f9 0%, #7e8bff 75%)',
        },
        3: {
          xs: 'linear-gradient(90deg, #b3ff68 0%, #ffe386 55%)',
          sm: 'linear-gradient(90deg, #b3ff68 0%, #ffe386 75%)',
        },
      },
      collaboratePurple: '#c187ff',
      mergeGreen: '#a3ff48',
      foreground: 'rgba(0, 0, 0, 0.7)',
    },
  },
};
