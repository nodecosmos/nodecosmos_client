// noinspection JSUnusedGlobalSymbols

type Shadow = string | 0;

interface Shadows {
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

interface PaletteColors {
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
    gradients: {
        1: Gradient;
        2: Gradient;
        3: Gradient;
    };
    collaboratePurple: string;
    mergeGreen: string;
    foreground: string;
}

interface Palette {
    primary: PaletteColors;
    secondary: PaletteColors;
    error: PaletteColors;
    success: PaletteColors;
    toggle: PaletteColors;
    button: PaletteColors;
    buttonContrast: PaletteColors;
    merge: PaletteColors;
    info: PaletteColors;
    borders: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
    };
    background: {
        1: string;
        2: string;
        3: string;
        4: string;
        5: string;
        6: string;
        7: string;
        8: string;
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
        paper: string;
        backdrop: string;
    };
    toolbar: {
        red: string;
        green: string;
        blue: string;
        lightRed: string;
        pink: string;
        purple: string;
        yellow: string;
        orange: string;
        hover: string;
        active: string;
        default: string;
        breadcrumbs: string;
    };
    tree: {
        default: string;
        backgrounds: string[];
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
    };
    markdownContent: {
        canvas: string;
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
    };
    text: Text;
}

export interface NodecosmosTheme {
    shadows: Shadows;
    palette: Palette;
}

export interface NodecosmosThemeOptions {
    shadows?: Shadows;
    palette?: Palette;
}

declare module '@mui/material/Button' {
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
