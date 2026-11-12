import{css as i,unsafeCSS as o}from"lit";function h(a="blockquote",s){const n=a.trim();if(!n)throw new RangeError("A blockquote selector must not be empty.");const t=s?.figureSelector?.trim();if(t==="")throw new RangeError("A figure selector must not be empty.");const e=o(n),l=o('url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20viewBox%3D%270%200%2032%2032%27%3E%3Cpath%20d%3D%27M3%2025V15C3%208%207%204%2014%203v5c-4%201-6%203-6%206h6v11H3zm15%200V15c0-7%204-11%2011-12v5c-4%201-6%203-6%206h6v11H18z%27%2F%3E%3C%2Fsvg%3E")'),r=o(t??""),p=t===void 0?i``:i`
    :where(${r}) {
      margin-inline: 0;
      min-inline-size: 0;
      max-inline-size: 100%;
    }

    :where(${r}) > :where(blockquote):where(${e}) {
      margin-block: 0;
    }

    :where(${r}) > :where(figcaption) {
      margin-inline-start: var(--esp-size-small);
      overflow-wrap: anywhere;
      font-size: var(--esp-type-caption-font-size, var(--esp-type-small, 0.875rem));
      font-weight: var(--esp-type-caption-font-weight, var(--esp-font-weight-body, 400));
      letter-spacing: var(--esp-type-caption-letter-spacing, normal);
      color: var(--esp-type-caption-color, var(--esp-color-type-caption, var(--esp-color-text)));
    }

    :where(${r}) > :where(figcaption) :where(cite) {
      font: inherit;
      letter-spacing: inherit;
      color: inherit;
    }
  `;return i`
    :where(${e}) {
      position: relative;
      background: var(--esp-color-layer-1, var(--esp-color-background));
      border-inline-start: 0.3em solid var(--esp-color-border);
      padding-block: var(--esp-size-small);
      padding-inline-end: var(--esp-size-small);
      padding-inline-start: calc(var(--esp-size-small) + 1.6em + var(--esp-size-tiny));
      margin-inline: 0;
      box-sizing: border-box;
      min-inline-size: 0;
      max-inline-size: 100%;
      overflow-wrap: anywhere;
      font-size: var(--esp-type-lead-font-size, var(--esp-type-medium, 1.25rem));
      font-weight: var(--esp-type-lead-font-weight, var(--esp-font-weight-body, 400));
      letter-spacing: var(--esp-type-lead-letter-spacing, normal);
      color: var(--esp-type-lead-color, var(--esp-color-type-lead, var(--esp-color-text)));
    }

    :where(${e})::before {
      content: "";
      position: absolute;
      inset-block-start: var(--esp-size-small);
      inset-inline-start: var(--esp-size-small);
      width: 1.6em;
      height: 1.6em;
      background: var(--esp-color-border);
      mask-image: ${l};
      mask-size: contain;
      mask-position: center;
      mask-repeat: no-repeat;
    }

    :where(${e}):where(:dir(rtl))::before {
      transform: scaleX(-1);
    }

    @media (forced-colors: active) {
      :where(${e})::before { display: none; }
    }

    :where(${e}) :where(p) {
      font-size: inherit;
      font-weight: inherit;
      letter-spacing: inherit;
      color: inherit;
    }

    
    esp-root blockquote:where(${e}) p {
      color: inherit;
    }

    :where(${e}) > :where(:first-child) {
      margin-block-start: 0;
    }

    :where(${e}) > :where(:last-child) {
      margin-block-end: 0;
    }

    ${p}
  `}export{h as blockquoteStyles};
