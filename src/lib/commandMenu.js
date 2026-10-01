// The command menu listens for this event so any button can open it
// without threading state through the layout.
export const OPEN_COMMAND_MENU = 'open-command-menu';

export const openCommandMenu = () => window.dispatchEvent(new Event(OPEN_COMMAND_MENU));
