import{css as m,html as c,nothing as a}from"lit";import{unsafeHTML as s}from"lit/directives/unsafe-html.js";function g(e){return e==="button"?"button":"link"}const E="esp-menu-source-changed",N="esp-menu-layout-changed",x="esp-menu-presentation-changed",S=m`
  .menu-fit-probes {
    display: block;
    position: absolute;
    inline-size: 0;
    block-size: 0;
    overflow: hidden;
    visibility: hidden;
    pointer-events: none;
  }
`,f=new Set(["color","line-height","letter-spacing","word-spacing","text-transform","direction"]);function b(e){return e==="--esp-button-padding"||e==="font"||e.startsWith("font-")||f.has(e)||/^--esp-(?:menu-(?:item-|group-)|color-|font-|type-|size-)/.test(e)}function u(e){if(!e)return"";const r=e.ownerDocument.createElement("span").style;r.cssText=e.style.cssText;for(const t of Array.from(r))b(t)||r.removeProperty(t);return r.cssText}function $(e,r=o=>o.open,t={}){return e.flatMap(o=>{const l=o.localName==="esp-menu-item"?o:null,i=o.localName==="esp-menu-group"?o:null,n=l??i;if(!n||t.headerEndOnly&&(!l||!l.headerEnd||!l.url))return[];const p=n.querySelector(l?":scope > svg:not([slot]), :scope > img:not([slot]), :scope > svg[slot=''], :scope > img[slot='']":':scope > [slot="icon"]');return[{kind:l?"item":"group",appearance:g(l?.appearance),label:n.label,url:n.url||"",target:n.target,rel:n.rel,newTabLabel:n.newTabLabel,icon:n.icon,iconHtml:p?.outerHTML||"",open:i?r(i):!1,children:i&&t.includeChildren!==!1?$(Array.from(i.children),r,t):[],originalItem:l,originalGroup:i}]})}function T(e,r){return e.kind==="item"?c`<esp-menu-item
      label=${e.label}
      style=${r.sourceStyle?u(e.originalItem)||a:a}
      .appearance=${e.appearance}
      .url=${e.url}
      .target=${e.target}
      .rel=${e.rel}
      .newTabLabel=${e.newTabLabel}
      .icon=${e.icon}
      .mode=${r.mode}
      @esp-clicked=${t=>{!e.url&&e.originalItem&&r.itemClick&&(t.stopPropagation(),r.itemClick(e.originalItem))}}
      >${s(e.iconHtml)}</esp-menu-item
    >`:c`<esp-menu-group
    label=${e.label}
    style=${r.sourceStyle?u(e.originalGroup)||a:a}
    .url=${e.url}
    .target=${e.target}
    .rel=${e.rel}
    .newTabLabel=${e.newTabLabel}
    .icon=${e.icon}
    .mode=${r.mode}
    .fullScreenPresentation=${r.fullScreen??!1}
    ?open=${e.open}
    @esp-menu-group-toggle=${t=>{t.target===t.currentTarget&&e.originalGroup&&r.groupToggle?.(e.originalGroup,t.detail.open)}}
    >${e.iconHtml?s(e.iconHtml):a}
    ${e.children.map(t=>T(t,r))}
  </esp-menu-group>`}export{S as MENU_FIT_PROBE_STYLES,N as MENU_LAYOUT_CHANGED,x as MENU_PRESENTATION_CHANGED,E as MENU_SOURCE_CHANGED,$ as collectMenuNodes,u as menuPresentationStyle,T as renderMenuNode,g as resolveMenuItemAppearance};
