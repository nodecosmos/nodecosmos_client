/* eslint-disable max-len */

import { NodecosmosTheme } from './themes.types';

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
        primary: {
            main: '#5135c8',
            contrastText: '#fff',
        },

        secondary: { main: '#7987bd' },

        error: {
            main: '#f56565',
            contrastText: 'rgba(0, 0, 0, 0.7)',
        },

        success: {
            main: '#66aa55',
            contrastText: '#fff',
        },

        warning: {
            main: '#db8e00',
            contrastText: 'rgba(0, 0, 0, 0.7)',
        },

        info: {
            main: '#459ef8',
            contrastText: 'rgba(0, 0, 0, 0.7)',
        },

        toggle: {
            main: '#fafafa',
            contrastText: '#000',
        },

        button: {
            main: '#e7e8ef',
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
            1: '#dfdfdf',
            2: '#cecece',
            3: '#dfdbec',
            4: '#c8c8c8',
            5: '#9fadff',
        },

        background: {
            1: '#e6e2e9', // f8f9fa
            2: '#f3eff5', // f0f0ef ededed
            3: '#e9e7ee',
            4: '#e1dfe8',
            5: '#efe9f1',
            6: '#eae8ef',
            7: '#e2e2eb',
            8: '#d2d6de',

            hover: '#316dca',

            labels: {
                orange: '#f5a623',
                red: '#f56565',
                green: '#48bb78',
                green1: '#399a60',
                blue: '#4299e1',
                purple: '#805ad5',
            },

            list: {
                defaultColor: '#636378',
                activeColor: '#70709e',
            },

            paper: '#f1eef3',
            backdrop: 'rgba(0,0,0,0.76)',
        },

        toolbar: {
            red: '#ff7878',
            green: '#a0d418',
            blue: '#0095ff',
            lightRed: '#ff8686',
            pink: '#bb7eaf',
            purple: '#b775ff',
            yellow: '#ffd000',
            orange: '#dd9432',
            hover: '#e6e0e8',
            active: '#e6e0e8',
            default: '#9c9cb4',
            breadcrumbs: '#4a5568',
        },

        tree: {
            default: '#e0e0e9',
            defaultBorder: '#e0e0f0',
            backgrounds: [
                {
                    fg: '#fd526f',
                    bg: '#f9dddd',
                },
                {
                    fg: '#994ce1',
                    bg: '#e3ddf9',
                },
                {
                    fg: '#4692ce',
                    bg: '#dcecf3',
                },
                {
                    fg: '#3ab063',
                    bg: '#e4f9dd',
                },
                {
                    fg: '#bdb420',
                    bg: '#f3f3d3',
                },
                {
                    fg: '#d87f00',
                    bg: '#f9eddd',
                },
            ],
            hashtag: '#aaaac4',
            defaultText: '#21212c',
            selectedText: '#fefeff',
            checkboxColor: '#bbbbc7',
            dragInIndicator: '#ff5866',
        },

        workflow: {
            default: '#e0e0e9',
            input: '#cdd4ff',
            background: '#2d3139',
            selectedInputColor: '#80a4ff',
            defaultInputColor: '#e0e0f0',
            selectedLoopInputColor: '#ffb387',
            defaultLoopInputColor: 'rgba(255,179,135,0.26)',
            selectedBg: 'rgba(89,137,172,0.03)',
        },

        markdownContent: {
            canvas: '#f7f7f7',
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
                bg: '#badfbf',
                fg: '#0ab020',
            },
            removed: {
                bg: '#e8bdcd',
                fg: '#fd526f',
            },
            edited: {
                bg: '#ebebc9',
                fg: '#8d8830',
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

        text: {
            primary: '#3a383a',
            secondary: '#504e50',
            tertiary: '#7c8194',
            disabled: '#5c616b',
            contrast: '#5c616b',
            sectionPrimary: '#acdf83',
            sectionSecondary: '#cdd4eb',
            link: '#3ba0ff',
            success: '#00d20a',
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
    },
};

export default theme;
