var l=function(t,r,o,n){var a=arguments.length,e=a<3?r:n===null?n=Object.getOwnPropertyDescriptor(r,o):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(t,r,o,n);else for(var c=t.length-1;c>=0;c--)(s=t[c])&&(e=(a<3?s(e):a>3?s(r,o,e):s(r,o))||e);return a>3&&e&&Object.defineProperty(r,o,e),e};import{css as i}from"lit";import{property as p}from"lit/decorators.js";import{EspalierElementBase as v}from"./esp-element-base.js";import{normalizeIntentVariant as h}from"./intent-values.js";class d extends v{constructor(){super(...arguments),this.intentVariantBacker="neutral"}get variant(){return this.intentVariantBacker}set variant(r){const o=this.intentVariantBacker;this.intentVariantBacker=h(r),this.requestUpdate("variant",o),this.applyVariantTokens()}getVariantColorSource(){return""}}l([p({type:String})],d.prototype,"variant",null);const k=i`
  .variant-neutral {
    --_esp-intent-background: var(--esp-color-layer-2);
    --_esp-intent-border-color: var(--esp-color-border);
    --_esp-intent-color: var(--esp-color-text);
  }

  .variant-success {
    --_esp-intent-background: oklch(from var(--esp-color-success) var(--esp-l-raised-2) c h);
    --_esp-intent-border-color: oklch(from var(--esp-color-success) var(--esp-l-border) c h);
    --_esp-intent-color: oklch(from var(--esp-color-success) var(--esp-l-text) c h);
  }

  .variant-warning {
    --_esp-intent-background: oklch(from var(--esp-color-warning) var(--esp-l-raised-2) c h);
    --_esp-intent-border-color: oklch(from var(--esp-color-warning) var(--esp-l-border) c h);
    --_esp-intent-color: oklch(from var(--esp-color-warning) var(--esp-l-text) c h);
  }

  .variant-danger {
    --_esp-intent-background: oklch(from var(--esp-color-danger) var(--esp-l-raised-2) c h);
    --_esp-intent-border-color: oklch(from var(--esp-color-danger) var(--esp-l-border) c h);
    --_esp-intent-color: var(--esp-color-danger-text);
  }

  .variant-info {
    --_esp-intent-background: var(--esp-color-link-hover-bg);
    --_esp-intent-border-color: oklch(from var(--esp-color-link) var(--esp-l-border) c h);
    --_esp-intent-color: var(--esp-color-link);
  }
`;export{d as EspalierIntentElementBase,k as intentSurfaceTokens};
