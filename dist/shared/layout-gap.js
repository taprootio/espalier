import{css as r,unsafeCSS as a}from"lit";const i=["none","tiny","small","normal","medium","big","large","huge"],n={none:"0px",tiny:"var(--esp-size-tiny)",small:"var(--esp-size-small)",normal:"var(--esp-size-normal)",medium:"var(--esp-size-medium)",big:"var(--esp-size-big)",large:"var(--esp-size-large)",huge:"var(--esp-size-huge)"};function p(e){return r`
    :host { ${a(e)}: var(--esp-size-normal); }
    ${a(i.map(s=>`:host([gap="${s}"]) { ${e}: ${n[s]}; }`).join(`
`))}
  `}export{i as LAYOUT_GAPS,p as layoutGapStyles};
