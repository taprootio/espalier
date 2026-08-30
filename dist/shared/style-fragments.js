import{css as n,unsafeCSS as e}from"lit";const i=n`
  :host([align]) {
    text-align: inherit;
  }
`,a=n`
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
`;function l(r){const o=r.includes(":host")||r.includes("[disabled]")?r:`:host([disabled]) ${r}`;return n`
    ${e(o)} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `}function p(r,o,t="0 0 3px",s=""){return n`
    ${e(r)} {
      box-shadow: ${e(s)} ${e(t)}
        var(${e(o)}, var(--esp-color-shadow));
    }
  `}function d(r,o="var(--esp-size-normal-to-medium)"){return[n`
      ${e(r)} {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border: 0;
        background: transparent;
        color: var(--esp-color-text);
        cursor: pointer;
        padding: var(--esp-size-tiny);

        svg {
          inline-size: ${e(o)};
          block-size: ${e(o)};
        }
      }
    `]}const h=n`
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
`;export{i as alignAttributeTextInheritance,l as disabledControl,p as focusRing,h as intentSurfaceTokens,d as quietCloseButton,a as srOnly};
