import{css as l,html as n,nothing as a}from"lit";function p({scheme:o,brandLogo:r,brandColor:e,lightBrandLogo:t,darkBrandLogo:c,lightBrandColor:s,darkBrandColor:d}){return{brandLogo:(o==="dark"?c:t)||r,brandColor:(o==="dark"?d:s)||e}}const u=l`3 / 1`,m=l`
  .brand-logo {
    overflow-wrap: anywhere;
  }
`;function B({brandLogo:o,brandText:r,brandHref:e,brandAlt:t}){if(!o&&!r)return a;const s=n`
    ${o?n`<img class="brand-logo" src=${o} alt=${t||(r?"":"Site logo")} />`:a}
    ${r?n`<span class="brand-text">${r}</span>`:a}
  `;return e?n`<a class="configured-brand" href=${e}>${s}</a>`:n`<span class="configured-brand">${s}</span>`}export{u as CONFIGURED_BRAND_LOGO_ASPECT_RATIO,m as configuredBrandLogoGeometry,B as renderConfiguredBrand,p as resolveConfiguredBrand};
