/* eslint-disable max-len */
import { NodecosmosTheme } from './themes.types';
import { PaletteColor } from '@mui/material';

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
            1: '3px 3px 0px rgb(0 0 0 / 14%)',
            2: 0,
            3: 0,
        },
    },

    palette: {
        mode: 'dark',
        primary: {
            main: '#b2ff99',
            contrastText: 'rgba(0, 0, 0, 0.8)',
            light: '#b2ff99',
            dark: '#b2ff99',
        },
        secondary: {
            main: '#c0cfff',
            contrastText: 'rgba(0, 0, 0, 0.8)',
            light: '#c0cfff',
            dark: '#c0cfff',
        },
        error: {
            main: '#e05480',
            contrastText: 'rgba(0, 0, 0, 0.8)',
            light: '#e05480',
            dark: '#e05480',
        },
        success: {
            main: '#a3f56d',
            contrastText: 'rgba(0, 0, 0, 0.8)',
            light: '#a3f56d',
            dark: '#a3f56d',
        },
        warning: {
            main: '#f6b634',
            contrastText: 'rgba(0, 0, 0, 0.8)',
            light: '#f6b634',
            dark: '#f6b634',
        },
        info: {
            main: '#56aef9',
            contrastText: 'rgba(0, 0, 0, 0.8)',
            light: '#56aef9',
            dark: '#56aef9',
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
            1: '#383a42',
            2: '#3a3c44',
            3: '#40424b',
            4: '#4c4f59',
            5: '#575a65',
        },
        backgrounds: {
            1: '#26282c',
            2: '#2c2e32',
            3: '#36393f',
            4: '#383c41',
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
            backdrop: 'rgba(98, 109, 121, 0.4)',
        },
        toolbar: {
            red: '#e82c6a',
            green: '#b4ed7e',
            blue: '#36ddf0',
            lightRed: '#f67286',
            pink: '#a6699f',
            purple: '#c885ff',
            lightPurple: '#c0cfff',
            yellow: '#eee76f',
            orange: '#feca7d',
            hover: 'rgba(67,81,91,0.53)',
            active: 'rgba(67,75,91,0.53)',
            default: '#5e6a72',
            breadcrumbs: '#7a8993',
        },
        tree: {
            default: '#393f44',
            backgrounds: [
                {
                    fg: '#ff6262',
                    bg: '#3b2e35',
                    ol: '#5b373f',
                },
                {
                    fg: '#b7abe8',
                    bg: '#2e2f3b',
                    ol: '#4a4b61',
                },
                {
                    fg: '#80b6ff',
                    bg: '#2c323d',
                    ol: '#394857',
                },
                {
                    fg: '#80d390',
                    bg: '#2d3533',
                    ol: '#4a5953',
                },
                {
                    fg: '#d8cc6a',
                    bg: '#393935',
                    ol: '#64644d',
                },
                {
                    fg: '#f2aa69',
                    bg: '#3f3c39',
                    ol: '#66584b',
                },
            ],
            defaultText: '#ebe7e7',
            selectedText: 'rgba(0, 0, 0, 0.9)',
            hashtag: '#787d88',
            defaultBorder: '#373C44',
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
            canvas: '#2a2d31',
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
                fg: '#ff626f',
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
            red: '#ff626f',
        },
        texts: {
            primary: '#f5f5f2',
            secondary: '#d9dce4',
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
        // to satisfy the Palette type
        common: {
            'black': '#000',
            'white': '#fff',
        },
        contrastThreshold: 0,
        tonalOffset: 0,
        grey: {
            '50': '#fafafa',
            '100': '#f5f5f5',
            '200': '#eeeeee',
            '300': '#e0e0e0',
            '400': '#bdbdbd',
            '500': '#9e9e9e',
            '600': '#757575',
            '700': '#616161',
            '800': '#424242',
            '900': '#212121',
            'A100': '#f5f5f5',
            'A200': '#eeeeee',
            'A400': '#bdbdbd',
            'A700': '#616161',
        },
        text: {
            primary: '#f5f5f2',
            secondary: '#d9dce4',
            disabled: '#565968',
        },
        divider: '#3a3f46',
        action: {
            active: '#f5f5f2',
            hover: 'rgba(0, 0, 0, 0.04)',
            hoverOpacity: 0.04,
            'selected': 'rgba(0, 0, 0, 0.08)',
            'selectedOpacity': 0.08,
            'disabled': 'rgba(0, 0, 0, 0.26)',
            'disabledBackground': 'rgba(0, 0, 0, 0.12)',
            'disabledOpacity': 0.38,
            'focus': 'rgba(0, 0, 0, 0.12)',
            'focusOpacity': 0.12,
            'activatedOpacity': 0.12,
        },
        background: {
            default: '#2c2e32',
            paper: '#2d3035',
        },
        getContrastText (): string {
            throw new Error('Function not implemented.');
        },
        augmentColor (): PaletteColor {
            throw new Error('Function not implemented.');
        },
    },
};

export default theme;
