import { NodecosmosTheme } from '../themes.types';

export default (theme: NodecosmosTheme) => ({
    '.Card': {
        '&.MuiPaper-root': {
            borderRadius: 16,
            border: '1px solid',
            borderColor: theme.palette.borders[3],
        },
        '.CoverHeader': {
            position: 'relative',
            width: '100%',
            // height: 350,
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        '.AmbientImage': {
            position: 'absolute',
            width: '100%',
            height: 350,
            filter: 'blur(50px) opacity(0.3)',
        },
        '.CoverImage': {
            position: 'relative',
            width: '100%',
            height: 280,
            borderRadius: 0,
        },
        '.CardContent': {
            paddingLeft: 24,
            paddingRight: 24,
            paddingBottom: 0,

        },
        '.CoverImageUrl': { paddingTop: 24 },
        '.Link': {
            '&:hover h2': {
                color: theme.palette.text.link,
                textDecoration: 'underline',
            },
        },

    },
});
