import { NodecosmosTheme } from '../themes.types';

export default (theme: NodecosmosTheme) => ({
    '.Cover': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        margin: '0px -32px',
        padding: '0px 32px',
        overflow: 'hidden',
        height: 423,
        borderBottom: `1px solid ${theme.palette.borders[1]}`,
        '.CoverImage': {
            padding: 24,
            position: 'relative',
            '.CoverImageMedia': {
                borderRadius: 8,
                maxWidth: '100%',
                width: 850,
                maxHeight: 375,
            },
        },
        '@media (max-width: 600px)': {
            height: 210,
            '.CoverImage': { padding: 0 },
        },
        '.AmbientImage': {
            position: 'absolute',
            width: '100%',
            height: 375,
            filter: 'blur(50px) opacity(0.4)',
            borderBottom: 1,
        },
        '.CoverImageUploadButton': {
            backgroundColor: theme.palette.background[1],
            color: theme.palette.button.contrastText,
            padding: '8px 16px',
            transition: 'opacity 150ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
            position: 'absolute',
            bottom: 32,
            right: 32,
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' },
        },
        '.DeleteCoverImageButton': {
            zIndex: 1,
            backgroundColor: theme.palette.background[1],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            borderRadius: '50%',
            top: 32,
            right: 32,
            width: 32,
            height: 32,
            padding: 0,
            svg: {
                color: theme.palette.button.contrastText,
                fontSize: 18,
            },
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.5)' },
        },
    },

    '.CoverImageButtonContainer': {
        marginTop: 24,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
});
