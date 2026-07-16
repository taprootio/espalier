import{getEspBus as o}from"./bus-events.js";function l(t={}){o().publish("show-flyout",t)}function s(){o().publish("close-flyout",{})}export{s as closeFlyout,l as showFlyout};
