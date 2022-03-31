export default (currentTheme) => ({
  '.MaxHeightWithoutHeader': { height: 'calc(100% - 45px)' },
  '.flexColumnSpaceBetween': { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  //--------------------------------------------------------------------------------------------------------------------
  '.BoxShadow1': { boxShadow: currentTheme.boxShadow1 },
  '.BoxShadow2': { boxShadow: currentTheme.boxShadow2 },
  //--------------------------------------------------------------------------------------------------------------------
  '.BoxShadowTop': { boxShadow: '0px -1px 1px 0px #00000045' },
  '.BoxShadowBottom': { boxShadow: '0px 1px 1px 0px #00000045' },
  '.BoxShadowLeft': { boxShadow: '-1px 0px 0.9px 0px #00000045' },
  '.BoxShadowRight': { boxShadow: '1px 0px 1px 0px #00000045' },
  //--------------------------------------------------------------------------------------------------------------------
  '.BorderTop': { borderTop: currentTheme.border1 },
  '.BorderBottom': { borderBottom: currentTheme.border1 },
  '.BorderLeft': { borderLeft: currentTheme.border1 },
  '.BorderRight': { borderRight: currentTheme.border1 },
  //--------------------------------------------------------------------------------------------------------------------
  '.MicroBG1': { background: currentTheme.black1 },
  '.MicroBG2': { background: currentTheme.black2 },
  '.MicroBG3': { background: currentTheme.black3 },
  '.MicroBG4': { background: currentTheme.black4 },
  '.MicroBG5': { background: currentTheme.black5 },
  '.MicroBG6': { background: currentTheme.black6 },
  '.MicroBG7': { background: currentTheme.black7 },

  '.MicroActionBG1': { background: currentTheme.red1 },
  '.MicroActionBG2': { background: currentTheme.green1 },
  '.MicroActionBG3': { background: currentTheme.yellow1 },
  '.MicroActionBG4': { background: currentTheme.blue1 },
});
