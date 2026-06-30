import{css as i,unsafeCSS as n}from"lit";const e=i`
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
`;function a(o){const r=o.includes(":host")||o.includes("[disabled]")?o:`:host([disabled]) ${o}`;return i`
    ${n(r)} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `}function p(o,r,s="0 0 3px",d=""){return i`
    ${n(o)} {
      box-shadow: ${n(d)} ${n(s)}
        var(${n(r)}, var(--esp-color-shadow));
    }
  `}export{a as disabledControl,p as focusRing,e as srOnly};
