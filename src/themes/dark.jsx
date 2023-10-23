/* eslint-disable max-len */
export default {
    shadows: {
        0: 'none',
        1: '0px 2px 1px -1px rgba(5,5,5,0.2),0px 1px 1px 0px rgba(5,5,5,0.14),0px 1px 3px 0px rgba(5,5,5,0.12)',
        2: '0px 3px 1px -2px rgba(5,5,5,0.2),0px 2px 2px 0px rgba(5,5,5,0.14),0px 1px 5px 0px rgba(5,5,5,0.12)',
        3: '0px 3px 3px -2px rgba(5,5,5,0.2),0px 3px 4px 0px rgba(5,5,5,0.14),0px 1px 8px 0px rgba(5,5,5,0.12)',
        4: '0px 2px 4px -1px rgba(5,5,5,0.2),0px 4px 5px 0px rgba(5,5,5,0.14),0px 1px 10px 0px rgba(5,5,5,0.12)',
        5: '0px 3px 5px -1px rgba(5,5,5,0.2),0px 5px 8px 0px rgba(5,5,5,0.14),0px 1px 14px 0px rgba(5,5,5,0.12)',
        6: '0px 3px 5px -1px rgba(5,5,5,0.2),0px 6px 10px 0px rgba(5,5,5,0.14),0px 1px 18px 0px rgba(5,5,5,0.12)',
        7: '0px 4px 5px -2px rgba(5,5,5,0.2),0px 7px 10px 1px rgba(5,5,5,0.14),0px 2px 16px 1px rgba(5,5,5,0.12)',
        8: '-5px -5px 5px -3px rgba(0,0,0,0.1), 0px 5px 5px -3px rgba(0,0,0,0.1),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',

        left: {
            1: '-1px 0px 1px -1px rgba(5,5,5,0.2),0px 1px 1px 0px rgba(5,5,5,0.14),0px 1px 3px 0px rgba(5,5,5,0.12)',
            2: '-2px 0px 1px -1px rgba(5,5,5,0.2),0px 2px 2px 0px rgba(5,5,5,0.14),0px 1px 5px 0px rgba(5,5,5,0.12)',
        },

        right: {
            1: '1px 0px 1px -1px rgba(5,5,5,0.2)',
            2: '2px 0px 1px -1px rgba(5,5,5,0.2)',
        },

        top: {
            1: '0px -3px 3px -2px rgb(0 0 0 / 20%)',
        },

        header: '0px 3px 1px -2px rgb(0 0 0 / 25%), 0px 2px 3px 0px rgb(0 0 0 / 3%), 0px 1px 5px 0px rgb(0 0 0 / 10%)',
        buttons: {
            1: '3px 3px 0px #202328',
            2: 0,
            3: 0,
        },
    },

    palette: {
        primary: {
            main: '#9edf5c',
            contrastText: 'rgba(0, 0, 0, 0.7)',
        },

        secondary: {
            main: '#afbcef',
        },

        error: {
            main: '#d94376',
            contrastText: 'rgba(0, 0, 0, 0.7)',
        },

        success: {
            main: '#9edf5c',
            contrastText: 'rgba(0, 0, 0, 0.7)',
        },

        toggle: {
            main: '#32373e',
            contrastText: '#fff',
        },

        button: {
            main: '#272b34',
            contrastText: '#fbfdff',
        },

        buttonContrast: {
            main: '#a5b4be',
            contrastText: '#3d4652',
        },

        borders: {
            1: '#2f343d',
            2: '#2f343d',
            3: '#464b59',
            4: '#464b59',
            5: '#636a80',
        },

        background: {
            1: '#333333',
            2: '#22252b',
            3: '#24282e',
            4: '#272b31',
            5: '#282c33',
            6: '#2c3038',
            7: '#30343d',
            8: '#4d4e55',

            labels: {
                red: '#d5526f',
                green: '#99cd54',
                blue: '#75b4e0',
                purple: '#a975e0',
            },

            list: {
                defaultColor: '#787d88',
                activeColor: '#c2cad6',
            },

            paper: '#24272e',
            backdrop: 'rgba(88, 99, 111, 0.4)',
        },

        toolbar: {
            red: '#d71b59',
            green: '#a3dc6d',
            blue: '#26ccdf',
            lightRed: '#e56175',
            pink: '#96588e',
            purple: '#b775ff',
            yellow: '#ded65f',
            hover: 'rgba(57,71,81,0.53)',
            active: 'rgba(57,71,81,0.53)',
            default: '#6a7983',
            breadcrumbs: '#6a7983',
        },

        tree: {
            default: '#30353e',
            backgrounds: [
                '#d12f68',
                '#ad96ff',
                '#96b0ff',
                '#85f1ff',
                '#8fffc3',
                '#cbff9a',
                '#fdff8d',
                '#ffb595',
            ],
            defaultText: '#ffffff',
            selectedText: 'rgba(0, 0, 0, 0.9)',
            hashtag: '#787d88',
            defaultBorder: '#303436',
            dragInIndicator: '#bf7869',
            checkboxColor: '#63686c',
        },

        workflow: {
            default: '#373d46',
            input: '#afbcef',
            background: '#272b33',
            selectedInputColor: '#cdd4ff',
            defaultInputColor: '#52565e',
        },

        markdownContent: {
            canvas: '#3a3e52',
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
            primary: '#edede8',
            secondary: '#c1c5d5',
            tertiary: '#747982',
            disabled: '#5c616b',
            contrast: '#fff',
            sectionPrimary: '#9acb75',
            sectionSecondary: '#afbcef',
            link: '#4892d7',
            gradients: {
                1: {
                    xs: 'linear-gradient(90deg, #a987df, #df78ba, #df4581)',
                    sm: 'linear-gradient(90deg, #a987df, #df78ba, #df4581)',
                },
                2: {
                    xs: 'linear-gradient(90deg, #df78ba, #a987df, #6cb2df)',
                    sm: 'linear-gradient(90deg, #df78ba, #a987df, #6cb2df)',
                },
                3: {
                    xs: 'linear-gradient(90deg, #9edf5c, #dfdc86, #df7777)',
                    sm: 'linear-gradient(90deg, #9edf5c, #dfdc86, #df7777)',
                },
            },
            collaboratePurple: '#a987df',
            mergeGreen: '#91df42',
            foreground: '#747a8e',
        },
    },
};
