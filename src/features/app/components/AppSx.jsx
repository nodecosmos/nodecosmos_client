// generic styles that have access to theme
export default {
  'h1, h2, h3, h4, h5, h6': {
    color: 'text.primary',
  },
  '&, .MuiPaper-root': {
    color: 'text.secondary',
  },
  hr: {
    border: 0,
    borderBottom: 1,
    borderColor: 'borders.2',
  },
  blockquote: {
    ml: 2,
    backgroundColor: 'markdownContent.canvas',
    borderRadius: 1.5,
    borderLeft: 6,
    p: 1,
    pl: 2,
    borderColor: 'markdownContent.border',
  },
  table: {
    tr: {
      borderRadius: 2,
      'td, th': {
        mt: 1,
        borderBottom: 1,
        borderRight: 1,
        borderColor: 'borders.2',
        p: '12px 16px',
      },
      'td:last-of-type': { borderRight: 0 },
      'th:last-of-type': { borderRight: 0 },
      '&:last-of-type td': { borderBottom: 0 },
      '&:hover': {
        backgroundColor: 'background.hover',
      },
    },
  },
  pre: {
    p: 2,
    borderRadius: 2,
    backgroundColor: 'markdownContent.canvas',
  },
};
