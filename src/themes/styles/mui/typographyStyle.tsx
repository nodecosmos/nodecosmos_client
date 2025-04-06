import { NodecosmosTheme } from '../../themes.types';
import utils from '../utils';

export default (theme: NodecosmosTheme) => ({ MuiTypography: { styleOverrides: { root: { ...utils(theme) } } } });
