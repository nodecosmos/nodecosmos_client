import { Palette, PaletteColor } from '@mui/material';

export const TREE_COLORS_LEN = 6;

type Shadow = string | 0;

interface TreeColor {
    bg: string;
    fg: string;
    ol: string; // outline
}

interface CustomPaletteColor {
    main: string;
    contrastText?: string;
}

interface Gradient {
    xs: string;
    sm: string;
}

interface Text {
    primary: string;
    secondary: string;
    tertiary: string;
    disabled: string;
    contrast: string;
    sectionPrimary: string;
    sectionSecondary: string;
    link: string;
    success: string;
    error: string;
    warning: string;
    info: string;
    gradients: {
        1: Gradient;
        2: Gradient;
        3: Gradient;
    };
    collaboratePurple: string;
    mergeGreen: string;
    foreground: string;
}

interface NcShadows {
    0: Shadow;
    1: Shadow;
    2: Shadow;
    3: Shadow;
    4: Shadow;
    5: Shadow;
    6: Shadow;
    7: Shadow;
    8: Shadow;
    left: {
        1: Shadow;
        2: Shadow;
    };
    right: {
        1: Shadow;
        2: Shadow;
    };
    top: {
        1: Shadow;
    };
    header: Shadow;
    buttons: {
        1: Shadow;
        2: Shadow;
        3: Shadow;
    };
}

declare module '@mui/material/styles' {
    interface Palette {
        mode: 'light' | 'dark';
        primary: PaletteColor;
        secondary: PaletteColor;
        error: PaletteColor;
        success: PaletteColor;
        warning: PaletteColor;
        info: PaletteColor;
        toggle: CustomPaletteColor;
        button: CustomPaletteColor;
        buttonContrast: CustomPaletteColor;
        merge: CustomPaletteColor;
        borders: {
            1: string;
            2: string;
            3: string;
            4: string;
            5: string;
        };
        backgrounds: {
            1: string;
            2: string;
            3: string;
            4: string;
            5: string;
            6: string;
            7: string;
            8: string;
            hover: string;
            labels: {
                orange: string;
                red: string;
                green: string;
                green1: string;
                blue: string;
                purple: string;
            };
            list: {
                defaultColor: string;
                activeColor: string;
            };
            backdrop: string;
        };
        toolbar: {
            red: string;
            green: string;
            blue: string;
            lightRed: string;
            pink: string;
            purple: string;
            lightPurple: string;
            yellow: string;
            orange: string;
            hover: string;
            active: string;
            default: string;
            breadcrumbs: string;
        };
        tree: {
            default: string;
            backgrounds: TreeColor[];
            defaultText: string;
            selectedText: string;
            hashtag: string;
            defaultBorder: string;
            dragInIndicator: string;
            checkboxColor: string;
        };
        workflow: {
            default: string;
            input: string;
            background: string;
            selectedInputColor: string;
            defaultInputColor: string;
            selectedLoopInputColor: string;
            defaultLoopInputColor: string;
            selectedBg: string;
            selectedFsBorder: string;
        };
        markdownContent: {
            canvas: string;
            canvasBorder: string;
            background: string;
        };
        markdownEditor: {
            tagName: string;
            string: string;
            number: string;
            attributeName: string;
            className: string;
            operator: string;
            bracket: string;
            caret: string;
            heading: string;
            emphasis: string;
            quote: string;
            meta: string;
            link: string;
            background: string;
            foreground: string;
            selection: string;
            selectionMatch: string;
            lineHighlight: string;
            gutterBackground: string;
            gutterForeground: string;
            gutterActiveForeground: string;
        };

        diff: {
            added: {
                bg: string;
                fg: string;
            },
            removed: {
                bg: string;
                fg: string;
            },
            edited: {
                bg: string;
                fg: string;
            },
            conflict: {
                bg: string;
                fg: string;
            },
        };

        logo: {
            blue: string;
            red: string;
            default: string;
        };
        texts: Text;
    }
}

export interface NodecosmosTheme {
    shadows: NcShadows;
    palette: Palette;
}

export interface NodecosmosThemeOptions {
    shadows?: NcShadows;
    palette?: Palette;
}

declare module '@mui/material/Button' {
    interface HTMLAttributes {
        backgroundColor: true;
    }
    interface ButtonPropsColorOverrides {
        toggle: true;
        buttonContrast: true;
        button: true;
        merge: true;
    }
}

declare module '@mui/material/IconButton' {
    interface IconButtonPropsColorOverrides {
        toggle: true;
        buttonContrast: true;
        button: true;
    }
}

declare module '@mui/material/Box' {
    interface SystemPropsOverrides {
        opacity: true;
    }
}

declare module '@mui/material/Chip' {
    interface ChipPropsColorOverrides {
        toggle: true;
        buttonContrast: true;
        button: true;
    }
}
