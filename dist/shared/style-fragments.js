import{css as n,unsafeCSS as t}from"lit";const a=n`
  :host([align]) {
    text-align: inherit;
  }
`,d=n`
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;function l(o){const i=o.includes(":host")||o.includes("[disabled]")?o:`:host([disabled]) ${o}`;return n`
    ${t(i)} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `}function p(o,i,e="0 0 3px",r=""){return n`
    ${t(o)} {
      box-shadow: ${t(r)} ${t(e)}
        var(${t(i)}, var(--esp-color-shadow));
    }
  `}export{a as alignAttributeTextInheritance,l as disabledControl,p as focusRing,d as srOnly};
