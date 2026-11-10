var s=function(p,r,o,l){var a=arguments.length,e=a<3?r:l===null?l=Object.getOwnPropertyDescriptor(r,o):l,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(p,r,o,l);else for(var f=p.length-1;f>=0;f--)(n=p[f])&&(e=(a<3?n(e):a>3?n(r,o,e):n(r,o))||e);return a>3&&e&&Object.defineProperty(r,o,e),e};import{css as w,html as c}from"lit";import{customElement as y,property as i}from"lit/decorators.js";import{layoutGapStyles as h}from"../shared/layout-gap.js";import{EspalierElementBase as u}from"../shared/esp-element-base.js";const d=["start","center","end","between"];let t=class extends u{constructor(){super(...arguments),this.gap="normal",this.align="center",this.justify="start",this.nowrap=!1}render(){return c`
      <div class="esp-row" part="row">
        <slot></slot>
      </div>
    `}};t.styles=[...u.styles,h("--_esp-row-gap"),w`
      :host {
        display: block;
        --_esp-row-align: center;
        --_esp-row-justify: flex-start;
      }

      :host([align="start"]) {
        --_esp-row-align: flex-start;
      }
      :host([align="end"]) {
        --_esp-row-align: flex-end;
      }
      :host([align="stretch"]) {
        --_esp-row-align: stretch;
      }

      :host([justify="center"]) {
        --_esp-row-justify: center;
      }
      :host([justify="end"]) {
        --_esp-row-justify: flex-end;
      }
      :host([justify="between"]) {
        --_esp-row-justify: space-between;
      }

      .esp-row {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: var(--esp-row-gap, var(--_esp-row-gap));
        align-items: var(--_esp-row-align);
        justify-content: var(--_esp-row-justify);
      }

      :host([nowrap]) .esp-row {
        flex-wrap: nowrap;
      }
    `],s([i({reflect:!0,useDefault:!0})],t.prototype,"gap",void 0),s([i({reflect:!0,useDefault:!0})],t.prototype,"align",void 0),s([i({reflect:!0,useDefault:!0})],t.prototype,"justify",void 0),s([i({type:Boolean,reflect:!0})],t.prototype,"nowrap",void 0),t=s([y("esp-row")],t);export{t as EspalierRow,d as ROW_JUSTIFIES};
