import { NODE_BUTTON_HEIGHT } from '../../features/nodes/nodes.constants';
import { NodecosmosTheme } from '../type';

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
                height: NODE_BUTTON_HEIGHT,
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer',
                boxShadow: theme.shadows.buttons[1],
                borderRadius: 5,
                padding: '0px 14px',
                border: 'none',
                ':focus': { outline: 'none' },
                ':not(.outlined) .fa-hashtag ': {
                    fontSize: 14,
                    color: theme.palette.tree.hashtag,
                },
                '&.selected .fa-hashtag': {
                    color: 'inherit',
                    fontWeight: 700,
                },
                '.NodeButtonText': {
                    cursor: 'pointer',
                    marginLeft: 8,
                    padding: 0,
                    backgroundColor: 'transparent',
                    fontSize: 14,
                    fontWeight: 500,
                    letterSpacing: '0.02857em',
                    minWidth: 40,
                    outline: 'none!important',
                    whiteSpace: 'nowrap', // otherwise safari will break two or more words into multiple lines
                    '&.hovered': { cursor: 'text' },
                    '&.Input': {
                        cursor: 'text!important',
                        fontFamily: 'monospace',
                    },
                },
                '&.selected': { '.NodeButtonText': { fontWeight: 500 } },
                '.MuiCheckbox-root': {
                    padding: 0,
                    svg: { fontSize: '1.4rem' },
                },
            },

            '.NodeToolbar': {
                display: 'flex',
                '.svg-inline--fa, .MuiSvgIcon-root': { fontSize: 15 },
                '.Item': {
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                    backgroundColor: 'transparent',
                    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                    outline: 0,
                    border: 0,
                    padding: 8,
                    width: 32,
                    height: '100%',
                    margin: '0 4px',
                    borderRadius: 4,
                    '&:hover': { backgroundColor: theme.palette.toolbar.hover },
                },

                // set first item color
                '.Item:first-of-type': { color: theme.palette.toolbar.red },
                '.Item:last-of-type': { color: theme.palette.toolbar.purple },
                '.Item:nth-of-type(2)': { color: theme.palette.toolbar.green },
                '.Item:nth-of-type(4)': { color: theme.palette.toolbar.yellow },
                '.Item:nth-of-type(3)': { color: theme.palette.toolbar.blue },
            },
        },
    },
});
