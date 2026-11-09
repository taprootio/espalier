import{css as m,html as a,nothing as s}from"lit";import{unsafeHTML as c}from"lit/directives/unsafe-html.js";const h="esp-menu-source-changed",E="esp-menu-layout-changed",N="esp-menu-presentation-changed",S=m`
  .menu-fit-probes {
    display: block;
    position: absolute;
    inline-size: 0;
    block-size: 0;
    overflow: hidden;
    visibility: hidden;
    pointer-events: none;
  }
`,g=new Set(["color","line-height","letter-spacing","word-spacing","text-transform","direction"]);function f(e){return e==="font"||e.startsWith("font-")||g.has(e)||/^--esp-(?:menu-(?:item-|group-)|color-|font-|type-|size-)/.test(e)}function u(e){if(!e)return"";const t=e.ownerDocument.createElement("span").style;t.cssText=e.style.cssText;for(const r of Array.from(t))f(r)||t.removeProperty(r);return t.cssText}function b(e,t=o=>o.open,r={}){return e.flatMap(o=>{const n=o.localName==="esp-menu-item"?o:null,i=o.localName==="esp-menu-group"?o:null,l=n??i;if(!l||r.headerEndOnly&&(!n||!n.headerEnd||!n.url))return[];const p=l.querySelector(n?":scope > svg:not([slot]), :scope > img:not([slot]), :scope > svg[slot=''], :scope > img[slot='']":':scope > [slot="icon"]');return[{kind:n?"item":"group",label:l.label,url:l.url||"",target:l.target,rel:l.rel,newTabLabel:l.newTabLabel,icon:l.icon,iconHtml:p?.outerHTML||"",open:i?t(i):!1,children:i&&r.includeChildren!==!1?b(Array.from(i.children),t,r):[],originalItem:n,originalGroup:i}]})}function $(e,t){return e.kind==="item"?a`<esp-menu-item
      label=${e.label}
      style=${t.sourceStyle?u(e.originalItem)||s:s}
      .url=${e.url}
      .target=${e.target}
      .rel=${e.rel}
      .newTabLabel=${e.newTabLabel}
      .icon=${e.icon}
      .mode=${t.mode}
      @esp-clicked=${r=>{!e.url&&e.originalItem&&t.itemClick&&(r.stopPropagation(),t.itemClick(e.originalItem))}}
      >${c(e.iconHtml)}</esp-menu-item
    >`:a`<esp-menu-group
    label=${e.label}
    style=${t.sourceStyle?u(e.originalGroup)||s:s}
    .url=${e.url}
    .target=${e.target}
    .rel=${e.rel}
    .newTabLabel=${e.newTabLabel}
    .icon=${e.icon}
    .mode=${t.mode}
    .fullScreenPresentation=${t.fullScreen??!1}
    ?open=${e.open}
    @esp-menu-group-toggle=${r=>{e.originalGroup&&t.groupToggle?.(e.originalGroup,r.detail.open)}}
    >${e.iconHtml?c(e.iconHtml):s}
    ${e.children.map(r=>$(r,t))}
  </esp-menu-group>`}export{S as MENU_FIT_PROBE_STYLES,E as MENU_LAYOUT_CHANGED,N as MENU_PRESENTATION_CHANGED,h as MENU_SOURCE_CHANGED,b as collectMenuNodes,u as menuPresentationStyle,$ as renderMenuNode};
