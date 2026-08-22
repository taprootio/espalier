var o=function(p,r,s,a){var i=arguments.length,e=i<3?r:a===null?a=Object.getOwnPropertyDescriptor(r,s):a,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(p,r,s,a);else for(var f=p.length-1;f>=0;f--)(l=p[f])&&(e=(i<3?l(e):i>3?l(r,s,e):l(r,s))||e);return i>3&&e&&Object.defineProperty(r,s,e),e};import{css as u,html as g}from"lit";import{customElement as c,property as n}from"lit/decorators.js";import{EspalierElementBase as w}from"../shared/esp-element-base.js";const h=["start","center","end","between"];let t=class extends w{constructor(){super(...arguments),this.gap="normal",this.align="center",this.justify="start",this.nowrap=!1}render(){return g`
      <div class="esp-row" part="row">
        <slot></slot>
      </div>
    `}};t.styles=[...w.styles,u`
      :host {
        display: block;
        --_esp-row-gap: var(--esp-size-normal);
        --_esp-row-align: center;
        --_esp-row-justify: flex-start;
      }

      :host([gap="none"]) {
        --_esp-row-gap: 0px;
      }
      :host([gap="tiny"]) {
        --_esp-row-gap: var(--esp-size-tiny);
      }
      :host([gap="small"]) {
        --_esp-row-gap: var(--esp-size-small);
      }
      :host([gap="medium"]) {
        --_esp-row-gap: var(--esp-size-medium);
      }
      :host([gap="big"]) {
        --_esp-row-gap: var(--esp-size-big);
      }
      :host([gap="large"]) {
        --_esp-row-gap: var(--esp-size-large);
      }
      :host([gap="huge"]) {
        --_esp-row-gap: var(--esp-size-huge);
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
    `],o([n({reflect:!0,useDefault:!0})],t.prototype,"gap",void 0),o([n({reflect:!0,useDefault:!0})],t.prototype,"align",void 0),o([n({reflect:!0,useDefault:!0})],t.prototype,"justify",void 0),o([n({type:Boolean,reflect:!0})],t.prototype,"nowrap",void 0),t=o([c("esp-row")],t);export{t as EspalierRow,h as ROW_JUSTIFIES};
