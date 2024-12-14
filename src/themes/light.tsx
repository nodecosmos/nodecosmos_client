/* eslint-disable max-len */

import { NodecosmosTheme } from './themes.types';
import { PaletteColor } from '@mui/material';

const theme: NodecosmosTheme = {
    shadows: {
        0: 'none',
        1: 0,
        2: '3px 3px 1px -2px rgb(227, 223, 238,0.5), 2px 2px 2px 0px rgba(227, 223, 238,0.05), 1px 1px 5px 0px rgba(227, 223, 238,0.06)',
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: '-5px -3px 5px -3px rgba(5,5,5,0.2), 10px -3px 5px -3px rgba(5,5,5,0.2), 0px 5px 5px -3px rgba(5,5,5,0.2), 0px 8px 10px 1px rgba(5,5,5,0.14),0px 3px 14px 2px rgba(5,5,5,0.12)',

        left: {
            1: 0,
            2: '0 3px 6px 0 rgba(200, 196, 211, 0.25), 0 3px 9px 3px rgba(200, 196, 211, 0.125), 0 6px 18px 6px rgba(200, 196, 211, 0.0775)',
        },

        right: {
            1: '1px 0px 1px -1px rgba(0,0,0,0.2)',
            2: '2px 0px 1px -1px rgba(0,0,0,0.2)',
        },

        top: { 1: '0px -3px 3px -2px rgb(0 0 0 / 10%)' },

        header: '0px 3px 1px -2px rgb(0 0 0 / 15%), 0px 2px 3px 0px rgb(0 0 0 / 2%), 0px 1px 5px 0px rgb(0 0 0 / 5%)',
        buttons: {
            1: 0,
            2: 0,
            3: 0,
        },
    },

    palette: {
        mode: 'dark',
        primary: {
            main: '#5135c8',
            contrastText: '#fff',
            light: '#5135c8',
            dark: '#5135c8',
        },

        secondary: {
            main: '#6174ff',
            contrastText: '#fff',
            light: '#6174ff',
            dark: '#6174ff',
        },

        error: {
            main: '#f56565',
            contrastText: 'rgba(0, 0, 0, 0.7)',
            light: '#f56565',
            dark: '#f56565',
        },

        success: {
            main: '#66aa55',
            contrastText: '#fff',
            light: '#66aa55',
            dark: '#66aa55',
        },

        warning: {
            main: '#db8e00',
            contrastText: 'rgba(0, 0, 0, 0.7)',
            light: '#db8e00',
            dark: '#db8e00',
        },

        info: {
            main: '#459ef8',
            contrastText: 'rgba(0, 0, 0, 0.7)',
            light: '#459ef8',
            dark: '#459ef8',
        },

        toggle: {
            main: '#fafafa',
            contrastText: '#000',
        },

        button: {
            main: '#e6e8f1',
            contrastText: '#5d6265',
        },

        buttonContrast: {
            main: '#3d4652',
            contrastText: '#fff',
        },

        merge: {
            main: '#8e5cc2',
            contrastText: 'rgba(0, 0, 0, 0.7)',
        },

        borders: {
            1: '#f0f0f0',
            2: '#cfd7e7',
            3: '#e8e8df',
            4: '#e6e6cb',
            5: '#e1e1e1',
        },

        backgrounds: {
            1: '#ffffff', // f8f9fa
            2: '#fffffe', // f0f0ef ededed
            3: '#eef0fa',
            4: '#f1f3f6',
            5: '#f6f8fc',
            6: '#f7f7fa',
            7: '#eeeef3',
            8: '#d2d6de',

            hover: '#d9dde3',

            labels: {
                orange: '#f5a623',
                red: '#f56565',
                green: '#48bb78',
                green1: '#399a60',
                blue: '#4299e1',
                purple: '#805ad5',
            },

            list: {
                defaultColor: '#5d5d61',
                activeColor: '#46464c',
            },
            backdrop: 'rgba(0,0,0,0.76)',
        },

        toolbar: {
            red: '#ff7878',
            green: '#a0d418',
            blue: '#0095ff',
            lightRed: '#ff8686',
            pink: '#bb7eaf',
            purple: '#b775ff',
            lightPurple: '#6174ff',
            yellow: '#ddbe32',
            orange: '#dd9432',
            hover: 'rgba(230,224,232,0.82)',
            active: '#f3eff5',
            default: '#686a6b',
            breadcrumbs: '#4a5568',
        },

        tree: {
            default: '#f4f4f7',
            defaultBorder: '#e0e0f0',
            backgrounds: [
                {
                    fg: '#fc5658',
                    bg: '#ffeff5',
                    ol: '#e8c8c8',
                },
                {
                    fg: '#9479ff',
                    bg: '#f9f6ff',
                    ol: '#c3b4e2',
                },
                {
                    fg: '#398cff',
                    bg: '#f3fbff',
                    ol: '#b4d2e2',
                },
                {
                    fg: '#60a12e',
                    bg: '#f3fff5',
                    ol: '#b4e2b6',
                },
                {
                    fg: '#c5a41f',
                    bg: '#fffbec',
                    ol: '#e2d6b4',
                },
                {
                    fg: '#f2a469',
                    bg: '#fff2ef',
                    ol: '#e2b4b4',
                },
            ],
            hashtag: '#aaaac4',
            defaultText: '#64647c',
            selectedText: '#fefeff',
            checkboxColor: '#bbbbc7',
            dragInIndicator: '#ff5866',
        },

        workflow: {
            default: '#e1e1e8',
            input: '#cdd4ff',
            background: '#2d3139',
            selectedInputColor: '#8e93b0',
            defaultInputColor: '#b6c2e1',
            selectedLoopInputColor: '#ffb387',
            defaultLoopInputColor: 'rgba(235,159,119,0.33)',
            selectedBg: 'rgba(154,189,212,0.03)',
            selectedFsBorder: '#c9cfe7',
        },

        markdownContent: {
            canvas: '#e3e4ee',
            canvasBorder: '#335faa',
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
            gutterActiveForeground: '#000',
            gutterBackground: 'transparent',
            gutterForeground: '#636b73',
        },

        diff: {
            added: {
                bg: '#c7e7cb',
                fg: '#0ab020',
            },
            removed: {
                bg: '#fff6f9',
                fg: '#de5673',
            },
            edited: {
                bg: '#ebebc9',
                fg: '#b6ab0f',
            },
            conflict: {
                bg: '#ebd9c9',
                fg: '#f4af7a',
            },
        },

        logo: {
            blue: '#23b9ff',
            red: '#fd526f',
        },

        texts: {
            primary: '#5a5a64',
            secondary: '#47474c',
            tertiary: '#8d8d8a',
            disabled: '#5c616b',
            contrast: '#5c616b',
            sectionPrimary: '#acdf83',
            sectionSecondary: '#cdd4eb',
            link: '#3ba0ff',
            success: '#268c2b',
            info: '#008dca',
            warning: '#db7f00',
            error: '#e74576',
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
        // to satisfy the Palette type
        common: {
            'black': 'hsl(200, 10%, 4%)',
            'white': '#fff',
        },
        contrastThreshold: 0,
        tonalOffset: 0,
        grey: {
            '50': 'hsl(215, 15%, 97%)',
            '100': 'hsl(215, 15%, 92%)',
            '200': 'hsl(215, 15%, 89%)',
            '300': 'hsl(215, 15%, 82%)',
            '400': 'hsl(215, 15%, 75%)',
            '500': 'hsl(215, 15%, 65%)',
            '600': 'hsl(215, 15%, 50%)',
            '700': 'hsl(215, 15%, 40%)',
            '800': 'hsl(215, 15%, 22%)',
            '900': 'hsl(215, 15%, 12%)',
            'A100': '#f5f5f5',
            'A200': '#eeeeee',
            'A400': '#bdbdbd',
            'A700': '#616161',
        },
        text: {
            primary: '#5a5a64',
            secondary: '#47474c',
            disabled: '#5c616b',
        },
        divider: '#3a3f46',
        action: {
            'active': 'rgba(0, 0, 0, 0.54)',
            'hover': 'rgba(0, 0, 0, 0.04)',
            'hoverOpacity': 0.04,
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
            default: '#fff',
            paper: '#fff',
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
