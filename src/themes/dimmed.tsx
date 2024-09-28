/* eslint-disable max-len */
import { NodecosmosTheme } from './themes.types';

const theme: NodecosmosTheme = {
    shadows: {
        0: 'none',
        1: '0px 2px 1px -1px rgba(5,5,5,0.15),0px 1px 1px 0px rgba(5,5,5,0.10),0px 1px 3px 0px rgba(5,5,5,0.08)',
        2: '0px 3px 1px -2px rgba(5,5,5,0.15),0px 2px 2px 0px rgba(5,5,5,0.10),0px 1px 5px 0px rgba(5,5,5,0.08)',
        3: '0px 3px 3px -2px rgba(5,5,5,0.15),0px 3px 4px 0px rgba(5,5,5,0.10),0px 1px 8px 0px rgba(5,5,5,0.08)',
        4: '0px 2px 4px -1px rgba(5,5,5,0.15),0px 4px 5px 0px rgba(5,5,5,0.10),0px 1px 10px 0px rgba(5,5,5,0.08)',
        5: '0px 3px 5px -1px rgba(5,5,5,0.15),0px 5px 8px 0px rgba(5,5,5,0.10),0px 1px 14px 0px rgba(5,5,5,0.08)',
        6: '0px 3px 5px -1px rgba(5,5,5,0.15),0px 6px 10px 0px rgba(5,5,5,0.10),0px 1px 18px 0px rgba(5,5,5,0.08)',
        7: '0px 4px 5px -2px rgba(5,5,5,0.15),0px 7px 10px 1px rgba(5,5,5,0.10),0px 2px 16px 1px rgba(5,5,5,0.08)',
        8: '-5px -5px 5px -3px rgba(0,0,0,0.08), 0px 5px 5px -3px rgba(0,0,0,0.08),0px 8px 10px 1px rgba(0,0,0,0.10),0px 3px 14px 2px rgba(0,0,0,0.08)',

        left: {
            1: '-1px 0px 1px -1px rgba(5,5,5,0.15),0px 1px 1px 0px rgba(5,5,5,0.10),0px 1px 3px 0px rgba(5,5,5,0.08)',
            2: '-2px 0px 1px -1px rgba(5,5,5,0.15),0px 2px 2px 0px rgba(5,5,5,0.10),0px 1px 5px 0px rgba(5,5,5,0.08)',
        },

        right: {
            1: '1px 0px 1px -1px rgba(5,5,5,0.15)',
            2: '2px 0px 1px -1px rgba(5,5,5,0.15)',
        },

        top: { 1: '0px -3px 3px -2px rgb(0 0 0 / 15%)' },

        header: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 3px 0px rgb(0 0 0 / 2%), 0px 1px 5px 0px rgb(0 0 0 / 8%)',
        buttons: {
            1: '3px 3px 0px transparent',
            2: 0,
            3: 0,
        },
    },

    palette: {
        primary: {
            main: '#b2ff99', // sRGB hex color
            contrastText: 'rgba(0, 0, 0, 0.8)',
        },
        secondary: { main: '#c0cfff' },
        error: {
            main: '#e05480',
            contrastText: 'rgba(0, 0, 0, 0.8)',
        },
        success: {
            main: '#a3f56d',
            contrastText: 'rgba(0, 0, 0, 0.8)',
        },
        warning: {
            main: '#f6b634',
            contrastText: 'rgba(0, 0, 0, 0.8)',
        },
        info: {
            main: '#56aef9',
            contrastText: 'rgba(0, 0, 0, 0.8)',
        },
        toggle: {
            main: '#3a3f46',
            contrastText: '#fff',
        },
        button: {
            main: '#363a45',
            contrastText: '#d6dfe6',
        },
        buttonContrast: {
            main: '#b6c5cf',
            contrastText: '#4e5763',
        },
        merge: {
            main: '#d298ff',
            contrastText: 'rgba(0, 0, 0, 0.8)',
        },
        borders: {
            1: '#34363d',
            2: '#3a3c44',
            3: '#40424b',
            4: '#4c4f59',
            5: '#575a65',
        },
        background: {
            1: '#222223',
            2: '#2a2c31',
            3: '#343536',
            4: '#383941',
            5: '#2d3035',
            6: '#303339',
            7: '#2f313b',
            8: '#5e5f66',
            hover: '#417dcb',
            labels: {
                orange: '#f6b634',
                red: '#e66380',
                green: '#aadf65',
                green1: '#79d55e',
                blue: '#85c4f1',
                purple: '#b985f1',
            },
            list: {
                defaultColor: '#888d98',
                activeColor: '#d3dce8',
            },
            paper: '#2d3035',
            backdrop: 'rgba(98, 109, 121, 0.4)',
        },
        toolbar: {
            red: '#e82c6a',
            green: '#b4ed7e',
            blue: '#36ddf0',
            lightRed: '#f67286',
            pink: '#a6699f',
            purple: '#c885ff',
            yellow: '#eee76f',
            orange: '#feca7d',
            hover: 'rgba(67,81,91,0.53)',
            active: 'rgba(67,75,91,0.53)',
            default: '#5e6a72',
            breadcrumbs: '#7a8993',
        },
        tree: {
            default: '#383c42',
            backgrounds: [
                {
                    fg: '#ff5971',
                    bg: '#3b2e35',
                },
                {
                    fg: '#c6b9ff',
                    bg: '#333444',
                },
                {
                    fg: '#80b6ff',
                    bg: '#2a313d',
                },
                {
                    fg: '#abef76',
                    bg: '#303c3a',
                },
                {
                    fg: '#bfc83e',
                    bg: '#3e4130',
                },
                {
                    fg: '#f2c769',
                    bg: '#3f3c39',
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
            default: '#3a3e45',
            input: '#cdd4ff',
            background: '#373b43',
            selectedInputColor: '#dce3ff',
            defaultInputColor: '#606773',
            selectedLoopInputColor: '#ffb387',
            defaultLoopInputColor: 'rgba(255,179,135,0.26)',
            selectedBg: 'rgba(99,147,182,0.03)',
            selectedFsBorder: '#61676b',
        },
        markdownContent: {
            canvas: '#333743',
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
                bg: '#394942',
                fg: '#87e587',
            },
            removed: {
                bg: '#492739',
                fg: '#ff6682',
            },
            edited: {
                bg: '#3b423b',
                fg: '#aac557',
            },
            conflict: {
                bg: '#934c46',
                fg: '#f4af7a',
            },
        },
        logo: {
            blue: '#3adfff',
            red: '#fd526f',
        },
        text: {
            primary: '#f5f5f2',
            secondary: '#bfc3cb',
            tertiary: '#838a9a',
            disabled: '#565968',
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
