import{css as g,html as n,nothing as c}from"lit";import{resolveConfiguredBrandColor as i}from"./configured-brand-color.js";function m({scheme:o,brandLogo:r,brandColor:e,lightBrandLogo:a,darkBrandLogo:t,lightBrandColor:d,darkBrandColor:s}){return{brandLogo:(o==="dark"?t:a)||r,brandColor:i(o==="dark"?s:d,e)}}const B=g`3 / 1`,C=g`
  .brand-logo {
    overflow-wrap: anywhere;
  }
`;function $({brandLogo:o,brandText:r,brandHref:e,brandAlt:a,reserveLogoSpace:t=!1}){if(!o&&!r)return c;const s=o?n`<img class="brand-logo" src=${o} alt=${a||(r?"":"Site logo")} />`:c,l=n`
    ${o&&t?n`<span class="brand-logo-reservation">${s}</span>`:s}
    ${r?n`<span class="brand-text">${r}</span>`:c}
  `;return e?n`<a class="configured-brand" href=${e}>${l}</a>`:n`<span class="configured-brand">${l}</span>`}export{B as CONFIGURED_BRAND_LOGO_ASPECT_RATIO,C as configuredBrandLogoGeometry,$ as renderConfiguredBrand,m as resolveConfiguredBrand};
