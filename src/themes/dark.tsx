/* eslint-disable max-len */
import { NodecosmosTheme } from './themes.types';

const theme: NodecosmosTheme = {
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

        top: { 1: '0px -3px 3px -2px rgb(0 0 0 / 20%)' },

        header: '0px 3px 1px -2px rgb(0 0 0 / 25%), 0px 2px 3px 0px rgb(0 0 0 / 3%), 0px 1px 5px 0px rgb(0 0 0 / 10%)',
        buttons: {
            1: '3px 3px 0px transparent',
            2: 0,
            3: 0,
        },
    },

    palette: {
        primary: {
            main: '#9edf5c',
            contrastText: 'rgba(0, 0, 0, 0.7)',
        },

        secondary: { main: '#afbcef' },

        error: {
            main: '#d94376',
            contrastText: 'rgba(0, 0, 0, 0.7)',
        },

        success: {
            main: '#9edf5c',
            contrastText: 'rgba(0, 0, 0, 0.7)',
        },

        warning: {
            main: '#f5a623',
            contrastText: 'rgba(0, 0, 0, 0.7)',
        },

        info: {
            main: '#459ef8',
            contrastText: 'rgba(0, 0, 0, 0.7)',
        },

        toggle: {
            main: '#32373e',
            contrastText: '#fff',
        },

        button: {
            main: '#353744',
            contrastText: '#c5cdd4',
        },

        buttonContrast: {
            main: '#a5b4be',
            contrastText: '#3d4652',
        },

        merge: {
            main: '#c187ff',
            contrastText: 'rgba(0, 0, 0, 0.7)',
        },

        borders: {
            1: '#2a2d35',
            2: '#24272e',
            3: '#282c34',
            4: '#464b59',
            5: '#636a80',
        },

        background: {
            1: '#14161a',
            2: '#1c1e22',
            3: '#202128',
            4: '#272831',
            5: '#191b20',
            6: '#202128',
            7: '#222430',
            8: '#4d4e55',

            hover: '#316dca',

            labels: {
                orange: '#f5a623',
                red: '#d5526f',
                green: '#99cd54',
                green1: '#69c54e',
                blue: '#75b4e0',
                purple: '#a975e0',
            },

            list: {
                defaultColor: '#787d88',
                activeColor: '#c2cad6',
            },

            paper: '#191b20',
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
            orange: '#edb96d',
            hover: 'rgba(57,71,81,0.53)',
            active: 'rgba(57,71,81,0.53)',
            default: '#4e5a62',
            breadcrumbs: '#6a7983',
        },

        tree: {
            default: '#2d3138',
            backgrounds: [
                {
                    fg: '#e7465d',
                    bg: '#2d2227',
                },
                {
                    fg: '#7e68d7',
                    bg: '#262732',
                },
                {
                    fg: '#65a9ff',
                    bg: '#222932',
                },
                {
                    fg: '#9bdf64',
                    bg: '#262d26',
                },
                {
                    fg: '#d4df33',
                    bg: '#292c20',
                },
                {
                    fg: '#efbd51',
                    bg: '#2b281f',
                },
            ],
            defaultText: '#ebe7e7',
            selectedText: 'rgba(0, 0, 0, 0.9)',
            hashtag: '#787d88',
            defaultBorder: '#3d4145',
            dragInIndicator: '#bf7869',
            checkboxColor: '#63686c',
        },

        workflow: {
            default: '#292d34',
            input: '#afbcef',
            background: '#272b33',
            selectedInputColor: '#cdd4ff',
            defaultInputColor: '#766562',
            selectedLoopInputColor: '#ffb387',
            defaultLoopInputColor: 'rgba(255,179,135,0.26)',
            selectedBg: 'rgba(89,137,172,0.03)',
            selectedFsBorder: '#735544',
        },

        markdownContent: {
            canvas: '#18202d',
            canvasBorder: '#335faa',
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

        diff: {
            added: {
                bg: '#1a2a1d',
                fg: '#9bf47a',
            },
            removed: {
                bg: '#2a1a1f',
                fg: '#fd526f',
            },
            edited: {
                bg: '#383e27',
                fg: '#eef47a',
            },
            conflict: {
                bg: '#3f322d',
                fg: '#fd9152',
            },
        },

        logo: {
            blue: '#2adfff',
            red: '#e91e63',
        },

        text: {
            primary: '#ebe7e7',
            secondary: '#e4e1e7',
            tertiary: '#747982',
            disabled: '#5c616b',
            contrast: '#fff',
            sectionPrimary: '#9acb75',
            sectionSecondary: '#afbcef',
            link: '#4892d7',
            success: '#cce8cd',
            info: '#b8e7fb',
            warning: '#ffe2b7',
            error: '#f4c7c7',
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

export default theme;
