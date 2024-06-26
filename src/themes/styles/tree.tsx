import { NodecosmosTheme } from '../themes.types';

export default (theme: NodecosmosTheme) => ({
    '.Tree': {
        width: '100%',
        height: '100%',
        transform: 'translateZ(0)',
        overflow: 'hidden',
        '.NodeButtonContainer': {
            display: 'flex',
            alignItems: 'start',
            height: '100%',
            '.NodeButton': {
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: theme.shadows.buttons[1],
                borderRadius: 5,
                padding: '0px 14px',
                ':focus': { outline: 'none' },
                ':not(.outlined)': {
                    '.fa-hashtag': { color: theme.palette.tree.hashtag },
                    '.fa-arrow': { color: theme.palette.tree.hashtag },
                },
                '.fa-arrow': { margin: '0 8px' },
                '&.selected .fa-hashtag': { color: 'inherit' },
                '.NodeButtonText': {
                    cursor: 'pointer',
                    marginLeft: 8,
                    padding: 0,
                    backgroundColor: 'transparent',
                    fontWeight: 500,
                    letterSpacing: '0.02857em',
                    minWidth: 40,
                    outline: 'none!important',
                    whiteSpace: 'nowrap', // otherwise safari will break two or more words into multiple lines
                    overflow: 'hidden',
                    '&.hovered': { cursor: 'text' },
                    '&.Input': {
                        cursor: 'text!important',
                        fontFamily: 'monospace',
                    },
                    span: {
                        borderRadius: 4,
                        padding: '4px 8px',
                        display: 'inline-block',
                    },
                    '.diff-removed': {
                        color: theme.palette.diff.removed.fg,
                        backgroundColor: theme.palette.diff.removed.bg,
                    },
                    '.diff-added': {
                        color: theme.palette.diff.added.fg,
                        backgroundColor: theme.palette.diff.added.bg,
                    },
                },
                '&.selected': {
                    '.diff-removed, .diff-added': {
                        color: 'inherit',
                        backgroundColor: 'inherit',
                        fontWeight: 500,
                    },
                },
                '.MuiCheckbox-root': {
                    padding: 0,
                    svg: { fontSize: '1.4rem' },
                },
            },
        },

        '.NodeAncestorCircle': {
            cursor: 'pointer',
            transition: 'r 0.2s, fill 0.2s, stroke 0.2s',
        },
    },

    '.TreeNestedColorHover-0': {
        '&:hover': {
            backgroundColor: theme.palette.tree.backgrounds[0].bg,
            color: theme.palette.tree.backgrounds[0].fg,
        },
    },
    '.TreeNestedColorHover-1': {
        '&:hover': {
            backgroundColor: theme.palette.tree.backgrounds[1].bg,
            color: theme.palette.tree.backgrounds[1].fg,
        },
    },
    '.TreeNestedColorHover-2': {
        '&:hover': {
            backgroundColor: theme.palette.tree.backgrounds[2].bg,
            color: theme.palette.tree.backgrounds[2].fg,
        },
    },
    '.TreeNestedColorHover-3': {
        '&:hover': {
            backgroundColor: theme.palette.tree.backgrounds[3].bg,
            color: theme.palette.tree.backgrounds[3].fg,
        },
    },
    '.TreeNestedColorHover-4': {
        '&:hover': {
            backgroundColor: theme.palette.tree.backgrounds[4].bg,
            color: theme.palette.tree.backgrounds[4].fg,
        },
    },
    '.TreeNestedColorHover-5': {
        '&:hover': {
            backgroundColor: theme.palette.tree.backgrounds[5].bg,
            color: theme.palette.tree.backgrounds[5].fg,
        },
    },
});
