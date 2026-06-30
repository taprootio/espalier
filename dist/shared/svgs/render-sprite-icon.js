import{html as t}from"lit";import{classMap as a}from"lit/directives/class-map.js";import{ifDefined as n}from"lit/directives/if-defined.js";import{DEFAULT_ICON_VIEW_BOX as f}from"../intent-values.js";function m(d,e={}){const i=e["aria-hidden"]===void 0?!0:e["aria-hidden"],r=e.class===void 0?"generated-icon":e.class,s=typeof r=="string"||r===null?n(r??void 0):a(r);return t`<svg
    class=${s}
    slot=${n(e.slot)}
    aria-hidden=${n(i===null?void 0:String(i))}
    viewBox=${e.viewBox??f}
  >
    <use href=${d}></use>
  </svg>`}export{m as renderSpriteIcon};
