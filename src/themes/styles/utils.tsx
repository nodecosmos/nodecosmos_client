import { NodecosmosTheme } from '../themes.types';

export default (theme: NodecosmosTheme) => ({
    '.mt-1': { marginTop: 8 },
    '.mt-2': { marginTop: 16 },
    '.mx-1': {
        marginLeft: 8,
        marginRight: 8,
    },
    'h-100': { height: '100%' },
    '.default-list-color': { color: theme.palette.background.list.defaultColor },
    '.background-5': { backgroundColor: theme.palette.background[5] },
});
