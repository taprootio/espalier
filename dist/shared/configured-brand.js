import{html as r,nothing as t}from"lit";function u({scheme:o,brandLogo:n,brandColor:s,lightBrandLogo:e,darkBrandLogo:c,lightBrandColor:a,darkBrandColor:l}){return{brandLogo:(o==="dark"?c:e)||n,brandColor:(o==="dark"?l:a)||s}}function f({brandLogo:o,brandText:n,brandHref:s,brandAlt:e}){if(!o&&!n)return t;const a=r`
    ${o?r`<img class="brand-logo" src=${o} alt=${e||(n?"":"Site logo")} />`:t}
    ${n?r`<span class="brand-text">${n}</span>`:t}
  `;return s?r`<a class="configured-brand" href=${s}>${a}</a>`:r`<span class="configured-brand">${a}</span>`}export{f as renderConfiguredBrand,u as resolveConfiguredBrand};
