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
            red: string;
            green: string;
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
    };
    markdownContent: {
        canvas: string;
        background: string;
    };
    markdownEditor: {
        [key: string]: string;
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
