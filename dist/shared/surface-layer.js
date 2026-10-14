import{css as t,unsafeCSS as a}from"lit";function l(r,o){return a((o===void 0?"":`${r} { --_esp-surface-layer: ${o}; }
`)+[1,2,3,4].map(e=>`${r===":host"?`:host([surface-layer="${e}"])`:`${r}[surface-layer="${e}"]`} { --_esp-surface-layer: ${e}; }`).join(`
`))}function $(r,o=r){const e=["","var(--esp-color-layer-1)","var(--esp-color-layer-2)","var(--esp-color-layer-3)","var(--esp-color-layer-4)"],c=s=>s===o?e[s]:`${e[s].slice(0,-1)}, ${e[o]})`;let n=c(r);for(let s=r+1;s<=4;s++){const u=s-r;n=`color-mix(in oklch, ${n}, ${c(s)} calc(clamp(0, var(--_esp-surface-layer, 1) - ${u}, 1) * 100%))`}return a(n)}function f(r,o=":host"){return t`
    ${a(o)} {
      --_esp-surface-layer: ${r};
      --_esp-surface-background: ${$(1,r)};
    }
    ${o===":host"?t``:a([1,2,3,4].map(e=>`:host([surface-layer="${e}"]) ${o} { --_esp-surface-layer: ${e}; }`).join(`
`))}
  `}export{f as paintedSurface,l as surfaceLayerAttributes,$ as surfaceLayerColor};
