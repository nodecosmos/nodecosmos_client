export default (theme) => ({
    '::-webkit-scrollbar': {
        width: 10,
        height: 10,
        '@media (max-width: 1024px)': {
            width: 5,
            height: 5,
        },
    },
    '::-webkit-scrollbar-thumb': {
        minHeight: 42,
        backgroundColor: theme.palette.background[6],
    },
    '::-webkit-scrollbar-track': { backgroundColor: theme.palette.background[5] },
    '::-webkit-scrollbar-corner': { backgroundColor: theme.palette.background[2] },
    //  set firefox scrollbar
    '*': {
        scrollbarWidth: 'auto',
        scrollbarColor: `${theme.palette.background[8]} ${theme.palette.background[5]}`,
    },
});
