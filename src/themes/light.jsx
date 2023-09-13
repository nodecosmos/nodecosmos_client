export default {
  shadows: {
    0: 'none',
    1: 0,
    // 2: '0 0px 3px #dee0e3',
    2: '0px 3px 1px -2px rgba(5,5,5,0.1),0px 2px 2px 0px rgba(5,5,5,0.07),0px 1px 5px 0px rgba(5,5,5,0.06)',
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: '-5px -3px 5px -3px rgba(5,5,5,0.2), 10px -3px 5px -3px rgba(5,5,5,0.2),'
      + '0px 5px 5px -3px rgba(5,5,5,0.2),0px 8px 10px 1px rgba(5,5,5,0.14),0px 3px 14px 2px rgba(5,5,5,0.12)',

    left: {
      1: 0,
      2: '-1px 3px 1px -2px rgba(5,5,5,0.1),0px 2px 2px 0px rgba(5,5,5,0.07),0px 1px 5px 0px rgba(5,5,5,0.06)',
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
      1: '3px 3px 1px -2px rgba(5,5,5,0.2),2px 2px 2px 0px rgba(5,5,5,0.14),1px 1px 5px 0px rgba(5,5,5,0.12)',
    },
  },

  palette: {
    primary: {
      main: '#9eb67e',
      contrastText: 'rgba(0, 0, 0, 0.7)',
    },

    secondary: {
      main: '#b293fe',
    },

    error: {
      main: '#f56565',
      contrastText: 'rgba(0, 0, 0, 0.7)',
    },

    success: {
      main: '#66aa55',
      contrastText: '#fff',
    },

    toggle: {
      main: '#fafafa',
      contrastText: '#000',
    },

    button: {
      main: '#e0e0e0',
      contrastText: '#5d6265',
    },

    buttonContrast: {
      main: '#3d4652',
      contrastText: '#fff',
    },

    borders: {
      1: '#d1d5df',
      2: '#d1d5df',
      3: '#dfe3ec',
      4: '#c7cfd5',
      5: '#41a6ff',
    },

    background: {
      1: '#ffffff', // f8f9fa
      2: '#f0f0ef', // f0f0ef ededed
      3: '#f7f7f3',
      4: '#f8f9fa',
      5: '#f9f8f8',
      6: '#e6e6e6',
      7: '#ededed',
      8: '#dcdcdc',

      labels: {
        red: '#f56565',
        green: '#48bb78',
        blue: '#4299e1',
        purple: '#805ad5',
      },

      list: {
        default: '#b9babd', // #595b63
        activeColor: '#0a68ff',
      },

      paper: '#ededed',
      backdrop: 'rgba(0,0,0,0.76)',
    },

    toolbar: {
      red: '#ff7878',
      green: '#1ac143',
      blue: '#0095ff',
      lightRed: '#ff8686',
      pink: '#d53f8c',
      purple: '#b775ff',
      yellow: '#ffd000',
      hover: '#ededed',
      active: '#ededed',
      default: '#92a1a8',
      breadcrumbs: '#4a5568',
    },

    tree: {
      default: '#e4e2e2',
      defaultBorder: 'transparent',
      backgrounds: [
        '#ff5866',
        '#bb8aff',
        '#4193ff', // 77e2ff
        '#00b7e3', // 009fff
        '#00b773',
        '#57ad00',
        '#d5ad00',
        '#f08d7f',
      ],
      hashtag: '#777a7d',
      defaultText: '#6c6c6c',
      selectedText: '#fff',
    },

    workflow: {
      default: '#e0e0e0',
      input: '#cdd4ff',
      background: '#2d3139',
      selectedInputColor: '#6f87ff',
      defaultInputColor: '#d2d2d2',
      stepBorderColor: '#cdd4ff',
    },

    markdownContent: {
      canvas: '#f7f7f7',
      border: '#c5cdda',
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
      background: 'transparent',
      foreground: '#4b4b4b',
      selection: 'rgba(0,0,0,0.06)',
      selectionMatch: 'rgba(0,0,0,0.06)',
      lineHighlight: '#e5e7eb',
      gutterBackground: 'transparent',
      gutterForeground: '#636b73',
    },

    logo: {
      blue: '#58b1ff',
      red: '#ff5866',
    },

    text: {
      primary: '#434c53',
      secondary: '#3d4652',
      tertiary: '#6e768b',
      disabled: '#5c616b',
      contrast: '#5e5f5f',
      sectionPrimary: '#acdf83',
      sectionSecondary: '#cdd4eb',
      link: '#3ba0ff',
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
