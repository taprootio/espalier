import{html as n,nothing as t}from"lit";function e({brandLogo:s,brandText:o,brandHref:l,brandAlt:c}){if(!s&&!o)return t;const r=n`
    ${s?n`<img class="brand-logo" src=${s} alt=${c||(o?"":"Site logo")} />`:t}
    ${o?n`<span class="brand-text">${o}</span>`:t}
  `;return l?n`<a class="configured-brand" href=${l}>${r}</a>`:n`<span class="configured-brand">${r}</span>`}export{e as renderConfiguredBrand};
