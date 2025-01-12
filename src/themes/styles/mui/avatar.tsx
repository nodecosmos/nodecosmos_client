import { NodecosmosTheme } from '../../themes.types';

export default (theme: NodecosmosTheme) => ({
    MuiAvatar: {
        styleOverrides: {
            root: {
                '&.NcAvatar': {
                    color: theme.palette.texts.primary,
                    backgroundColor: theme.palette.backgrounds[8],
                    cursor: 'pointer',
                    fontWeight: 700,

                    '&.has-image': { backgroundColor: 'transparent' },

                    '&.size-25': {
                        width: 25,
                        height: 25,
                    },
                    '&.size-30': {
                        width: 30,
                        height: 30,
                    },
                    '&.size-35': {
                        width: 35,
                        height: 35,
                    },
                    '&.size-40': {
                        width: 40,
                        height: 40,
                    },
                    '&.size-45': {
                        width: 45,
                        height: 45,
                    },
                    '&.size-50': {
                        width: 50,
                        height: 50,
                    },
                    '&.size-200': {
                        width: 200,
                        height: 200,
                    },

                    '&.fontSize-14': { fontSize: 14 },
                    '&.fontSize-15': { fontSize: 15 },
                    '&.fontSize-18': { fontSize: 18 },
                    '&.fontSize-69': { fontSize: 69 },
                },
            },
        },
    },
});
