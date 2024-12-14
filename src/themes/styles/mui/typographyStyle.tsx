import { NodecosmosTheme } from '../../themes.types';
import utils from '../utils';

export default (theme: NodecosmosTheme) => ({
    MuiTypography: {
        styleOverrides: {
            root: {
                '&.ObjectTitle': {
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    color: theme.palette.texts.link,
                    fontWeight: 'bold',
                    padding: '4px 16px',
                    backgroundColor: theme.palette.toolbar.active,
                    '.diff-removed': {
                        backgroundColor: theme.palette.diff.removed.bg,
                        color: theme.palette.diff.removed.fg,
                    },
                    '.diff-added': {
                        ml: 2,
                        backgroundColor: theme.palette.diff.added.bg,
                        color: theme.palette.diff.added.fg,
                    },
                },

                ...utils(theme),
            },
        },
    },
});
