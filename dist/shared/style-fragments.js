import{css as o,unsafeCSS as e}from"lit";const a=o`
  :host([align]) {
    text-align: inherit;
  }
`,l=o`
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
`;function i(r){const n=r.includes(":host")||r.includes("[disabled]")?r:`:host([disabled]) ${r}`;return o`
    ${e(n)} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `}function p(r,n,t="0 0 3px",s=""){return o`
    ${e(r)} {
      box-shadow: ${e(s)} ${e(t)}
        var(${e(n)}, var(--esp-color-shadow));
    }
  `}const d=o`
  .intent-neutral {
    --_esp-intent-background: var(--esp-color-layer-2);
    --_esp-intent-border-color: var(--esp-color-border);
    --_esp-intent-color: var(--esp-color-text);
  }

  .intent-success {
    --_esp-intent-background: oklch(from var(--esp-color-success) var(--esp-l-raised-2) c h);
    --_esp-intent-border-color: oklch(from var(--esp-color-success) var(--esp-l-border) c h);
    --_esp-intent-color: oklch(from var(--esp-color-success) var(--esp-l-text) c h);
  }

  .intent-warning {
    --_esp-intent-background: oklch(from var(--esp-color-warning) var(--esp-l-raised-2) c h);
    --_esp-intent-border-color: oklch(from var(--esp-color-warning) var(--esp-l-border) c h);
    --_esp-intent-color: oklch(from var(--esp-color-warning) var(--esp-l-text) c h);
  }

  .intent-danger {
    --_esp-intent-background: oklch(from var(--esp-color-danger) var(--esp-l-raised-2) c h);
    --_esp-intent-border-color: oklch(from var(--esp-color-danger) var(--esp-l-border) c h);
    --_esp-intent-color: var(--esp-color-danger-text);
  }

  .intent-info {
    --_esp-intent-background: oklch(from var(--esp-color-info) var(--esp-l-raised-2) c h);
    --_esp-intent-border-color: oklch(from var(--esp-color-info) var(--esp-l-border) c h);
    --_esp-intent-color: oklch(from var(--esp-color-info) var(--esp-l-text) c h);
  }
`;export{a as alignAttributeTextInheritance,i as disabledControl,p as focusRing,d as intentSurfaceTokens,l as srOnly};
