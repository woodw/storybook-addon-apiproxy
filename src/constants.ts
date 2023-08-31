export const ADDON_ID = "storybook/my-addon";
export const TOOL_ID = `${ADDON_ID}/tool`;
export const PANEL_ID = `${ADDON_ID}/panel`;
export const TAB_ID = `${ADDON_ID}/tab`;
export const PARAM_KEY = `fish`;

export const EVENTS = {
  RESULT: `${ADDON_ID}/result`,
  REQUEST: `${ADDON_ID}/request`,
  CLEAR: `${ADDON_ID}/clear`,
  SEND: `${ADDON_ID}/send`,
  UPDATE: `${ADDON_ID}/update`,

  //Tell the panel to send new parameter values
  RESET: `${ADDON_ID}/reset`, 
};
