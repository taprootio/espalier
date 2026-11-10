import{css as g,html as r,nothing as l}from"lit";function f({scheme:o,brandLogo:n,brandColor:s,lightBrandLogo:a,darkBrandLogo:t,lightBrandColor:d,darkBrandColor:e}){return{brandLogo:(o==="dark"?t:a)||n,brandColor:(o==="dark"?e:d)||s}}const u=g`3 / 1`,$=g`
  .brand-logo {
    overflow-wrap: anywhere;
  }
`;function m({brandLogo:o,brandText:n,brandHref:s,brandAlt:a,reserveLogoSpace:t=!1}){if(!o&&!n)return l;const e=o?r`<img class="brand-logo" src=${o} alt=${a||(n?"":"Site logo")} />`:l,c=r`
    ${o&&t?r`<span class="brand-logo-reservation">${e}</span>`:e}
    ${n?r`<span class="brand-text">${n}</span>`:l}
  `;return s?r`<a class="configured-brand" href=${s}>${c}</a>`:r`<span class="configured-brand">${c}</span>`}export{u as CONFIGURED_BRAND_LOGO_ASPECT_RATIO,$ as configuredBrandLogoGeometry,m as renderConfiguredBrand,f as resolveConfiguredBrand};
