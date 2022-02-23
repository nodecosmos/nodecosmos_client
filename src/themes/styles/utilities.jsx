export default (currentTheme) => ({
  '.MaxHeightWithoutHeader': { height: 'calc(100% - 45px)' },
  '.flexColumnSpaceBetween': { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  '.BoxShadowTop': { boxShadow: '0px -1px 1px 0px #00000045' },
  '.BoxShadowBottom': { boxShadow: '0px 1px 1px 0px #00000045' },
  '.BoxShadowLeft': { boxShadow: '-1px 0px 0.9px 0px #00000045' },
  '.BoxShadowRight': { boxShadow: '1px 0px 1px 0px #00000045' },
  '.BorderTop': { borderTop: currentTheme.border1 },
  '.BorderBottom': { borderBottom: currentTheme.border1 },
  '.BorderLeft': { borderLeft: currentTheme.border1 },
  '.BorderRight': { borderRight: currentTheme.border1 },
});
