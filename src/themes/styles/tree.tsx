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
                    marginLeft: 12,
                    marginRight: 4,
                    padding: 0,
                    backgroundColor: 'transparent',
                    fontWeight: 700,
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
                '.fa-square, .fa-square-check': { fontSize: 20 },
            },
        },

        '.NodeAncestorCircle': {
            cursor: 'pointer',
            transition: 'r 0.2s, fill 0.2s, stroke 0.2s',
        },
    },

});
