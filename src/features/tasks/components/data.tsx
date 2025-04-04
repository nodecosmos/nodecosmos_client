const jake = {
    id: '1',
    name: 'Jake',
    url: 'http://adventuretime.wikia.com/wiki/Jake',
    avatarUrl: 'https://dnd.hellopangea.com/static/media/jake-min.e1358fa8.png',
};

const BMO = {
    id: '2',
    name: 'BMO',
    url: 'http://adventuretime.wikia.com/wiki/BMO',
    avatarUrl: 'https://dnd.hellopangea.com/static/media/jake-min.e1358fa8.png',
};

const finn = {
    id: '3',
    name: 'Finn',
    url: 'http://adventuretime.wikia.com/wiki/Finn',
    avatarUrl: 'https://dnd.hellopangea.com/static/media/jake-min.e1358fa8.png',
};

const princess = {
    id: '4',
    name: 'Princess bubblegum',
    url: 'http://adventuretime.wikia.com/wiki/Princess_Bubblegum',
    avatarUrl: 'https://dnd.hellopangea.com/static/media/jake-min.e1358fa8.png',
};

export const authors = [jake, BMO, finn, princess];

export const quotes = [
    {
        id: '1',
        content: 'Sometimes life is scary and dark',
        author: BMO,
    },
    {
        id: '2',
        content:
            'Sucking at something is the first step towards being sorta good at something.',
        author: jake,
    },
    {
        id: '3',
        content: 'You got to focus on what\'s real, man',
        author: jake,
    },
    {
        id: '4',
        content: 'Is that where creativity comes from? From sad biz?',
        author: finn,
    },
    {
        id: '5',
        content: 'Homies help homies. Always',
        author: finn,
    },
    {
        id: '6',
        content: 'Responsibility demands sacrifice',
        author: princess,
    },
    {
        id: '7',
        content: 'That\'s it! The answer was so simple, I was too smart to see it!',
        author: princess,
    },
    {
        id: '8',
        content:
            'People make mistakes. It\'s all a part of growing up and you never really stop growing',
        author: finn,
    },
    {
        id: '9',
        content: 'Don\'t you always call sweatpants \'give up on life pants,\' Jake?',
        author: finn,
    },
    {
        id: '10',
        content: 'I should not have drunk that much tea!',
        author: princess,
    },
    {
        id: '11',
        content: 'Please! I need the real you!',
        author: princess,
    },
    {
        id: '12',
        content: 'Haven\'t slept for a solid 83 hours, but, yeah, I\'m good.',
        author: princess,
    },
];

const getByAuthor = (author: { id: string; name: string; url: string; avatarUrl: string; }, items: any[]) =>
    items.filter((quote) => quote.author === author);

export const authorQuoteMap = authors.reduce(
    (previous, author) => ({
        ...previous,
        [author.name]: getByAuthor(author, quotes),
    }),
    {},
);
