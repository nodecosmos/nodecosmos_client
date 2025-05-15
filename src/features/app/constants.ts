export const HEADER_HEIGHT = '3rem';
export const EDITOR_TOOLBAR_HEIGHT = '3.25rem';
export const SIDEBAR_WIDTH = '230px';
export const DRAWER_HEIGHT = '4rem';
export const MOBILE_TOOLBAR_HEIGHT = '7rem'; // Header + Drawer

export const TRANSFORMABLE_ID = 'transformable';
export const TRANSFORMABLE_HEIGHT_MARGIN = 50;
export const TRANSFORMABLE_WIDTH_MARGIN = 50;
export const TRANSFORMABLE_MIN_WIDTH = 800;

export const SYNC_UP_INTERVAL = 1000 * 60 * 10; // 10 minutes

export const NODECOSMOS_NODE_ID = 'f70f9de4-b938-4abc-9695-3b1cb7769f38';

export const DISPLAY_MD_SX = {
    xs: 'none',
    md: 'block',
};

export const DISPLAY_MD_FLEX_SX = {
    xs: 'none',
    md: 'flex',
};

export const DISPLAY_XS_SX = {
    xs: 'block',
    md: 'none',
};

export const MD_FLEX_SX = {
    xs: 'block',
    md: 'flex',
};

export const SIDEBAR_MD_SX = {
    xs: 'auto',
    md: SIDEBAR_WIDTH,
};

export const MOBILE_WO_HEADER_HEIGHT_SX = {
    xs: `calc(100% - ${HEADER_HEIGHT})`,
    md: 1,
};

export const MD_WO_SIDEBAR_WIDTH_SX = {
    xs: 1,
    md: `calc(100% - ${SIDEBAR_WIDTH})`,
};

export const MOBILE_NO_HEIGHT_SX = {
    xs: 0,
    md: 1,
};

export const MT_XS_SX = {
    xs: 1,
    md: 0,
};

export const ML_MD_SX = {
    xs: 0,
    md: 1,
};

export const WIDTH_FIT_CONTENT_MD_SX = {
    xs: 1,
    md: 'fit-content',
};

export const DRAWER_WIDTH = {
    xs: '100%',
    sm: 450,
};

export const MARGIN_X_MD_SX = {
    xs: 0,
    md: 4,
};

export const P_XS_2_MD_4_SX = {
    xs: 2,
    md: 4,
};

export const AUTOCOMPLETE_OFF = { autoComplete: 'off' };
export const RECAPTCHA_ENABLED = import.meta.env.VITE_RECAPTCHA_ENABLED === 'true';
export const STRIPE_ENABLED = import.meta.env.VITE_STRIPE_ENABLED === 'true';
