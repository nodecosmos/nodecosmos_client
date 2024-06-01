/* eslint-disable max-len */

import { NodecosmosTheme } from './themes.types';

const theme: NodecosmosTheme = {
    shadows: {
        0: 'none',
        1: '0px 1px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 1px 0px rgba(0,0,0,0.12)',
        2: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
        3: '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
        4: '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
        5: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
        6: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
        7: '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
        8: '-5px -5px 5px -3px rgba(0,0,0,0.1), 0px 5px 5px -3px rgba(0,0,0,0.1),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',

        left: {
            1: '-1px 0px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
            2: '-3px 0px 3px -1px #2e3137,0px 2px 2px 0px #2e3137,0px 1px 5px 0px #2e3137',
        },

        right: {
            1: '1px 0px 1px -1px rgba(0,0,0,0.2)',
            2: '2px 0px 1px -1px rgba(0,0,0,0.2)',
        },

        top: { 1: '0px -3px 3px -2px rgb(0 0 0 / 20%)' },

        header: '0px 3px 1px -2px rgb(0 0 0 / 25%), 0px 2px 3px 0px rgb(0 0 0 / 3%), 0px 1px 5px 0px rgb(0 0 0 / 10%)',
        buttons: {
            1: '3px 3px 0px rgb(0 0 0 / 14%)',
            2: '6px 8px 0px rgb(48 49 58 / 65%)',
            3: '6px 6px 0px rgb(0 0 0 / 8%)',
        },
    },

    palette: {
        primary: {
            main: '#9987ff',
            contrastText: 'rgba(0, 0, 0, 0.7)',
        },

        secondary: { main: '#cdd4ff' },

        error: {
            main: '#fd526f',
            contrastText: 'rgba(0, 0, 0, 0.7)',
        },

        success: {
            main: '#87e587',
            contrastText: 'rgba(0, 0, 0, 0.7)',
        },

        warning: {
            main: '#ffa726',
            contrastText: 'rgba(0, 0, 0, 0.7)',
        },

        info: {
            main: '#5591de',
            contrastText: 'rgba(0, 0, 0, 0.7)',
        },

        toggle: {
            main: '#3a3e45',
            contrastText: '#fff',
        },

        button: {
            main: '#434a55',
            contrastText: '#a5b4be',
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
            1: '#43464d',
            2: '#454b53', // 454b53 3c4149
            3: '#484d55',
            4: '#595c65',
            5: '#848ea8',
        },

        background: {
            1: '#28292e',
            2: '#363a41',
            3: '#383c43',
            4: '#3c4048',
            5: '#30343b',
            6: '#3c4149',
            7: '#3f464e',
            8: '#575d66',

            hover: '#316dca',

            labels: {
                orange: '#ffb387',
                red: '#fd526f',
                green: '#c1e68c',
                green1: '#69c54e',
                blue: '#85c7f3',
                purple: '#c187ff',
            },

            list: {
                defaultColor: '#898f9c',
                activeColor: '#d8e0e8',
            },

            paper: '#34373d',
            backdrop: 'rgba(99, 110, 123, 0.4)',
        },

        toolbar: {
            red: '#fd526f',
            green: '#c1e68c',
            blue: '#78b1eb',
            lightRed: '#ff6881',
            pink: '#a868aa',
            purple: '#9377e2',
            yellow: '#f5f58e',
            orange: '#de9a72',
            hover: 'rgba(63,78,89,0.53)',
            active: 'rgba(63,78,89,0.53)',
            default: '#758593',
            breadcrumbs: '#758593',
        },

        tree: {
            default: '#444a54',
            backgrounds: [
                {
                    fg: '#fd526f',
                    bg: '#3d363c',
                },
                {
                    fg: '#a38dff',
                    bg: '#383b45',
                },
                {
                    fg: '#5a9aeb',
                    bg: '#353c49',
                },
                {
                    fg: '#9bdf64',
                    bg: '#39413d',
                },
                {
                    fg: '#d4df33',
                    bg: '#3e423c',
                },
                {
                    fg: '#efbd51',
                    bg: '#423f3c',
                },
            ],
            defaultText: '#ffffff',
            selectedText: 'rgba(0, 0, 0, 0.9)',
            hashtag: '#898f9c',
            defaultBorder: 'transparent',
            dragInIndicator: '#bf7869',
            checkboxColor: '#63686c',
        },

        workflow: {
            default: '#4e535e',
            input: '#cdd4ff',
            background: '#2d3139',
            selectedInputColor: '#cdd4ff',
            defaultInputColor: '#52565e',
            selectedLoopInputColor: '#ffb387',
            defaultLoopInputColor: 'rgba(255,179,135,0.26)',
            selectedBg: 'rgba(58,62,71,0.28)',
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
            red: '#fd526f',
        },

        diff: {
            added: {
                bg: '#384643',
                fg: '#87e587',
            },
            removed: {
                bg: '#5c303f',
                fg: '#ff6682',
            },
            edited: {
                bg: '#484d46',
                fg: '#ccde5f',
            },
            conflict: {
                bg: '#934c46',
                fg: '#f4af7a',
            },
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
            success: '#cce8cd',
            info: '#b8e7fb',
            warning: '#ffe2b7',
            error: '#f4c7c7',
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

export default theme;
