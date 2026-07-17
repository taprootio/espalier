function o(t){return t?.assignedNodes({flatten:!0}).some(e=>e.nodeType===Node.ELEMENT_NODE||e.nodeType===Node.TEXT_NODE&&!!e.textContent?.trim())??!1}export{o as slotHasContent};
