var o=function(l,t,a,r){var n=arguments.length,e=n<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,a):r,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(l,t,a,r);else for(var p=l.length-1;p>=0;p--)(i=l[p])&&(e=(n<3?i(e):n>3?i(t,a,e):i(t,a))||e);return n>3&&e&&Object.defineProperty(t,a,e),e};import{css as u,html as h}from"lit";import{customElement as f,property as c}from"lit/decorators.js";import{EspalierElementBase as g}from"../shared/esp-element-base.js";const m=["none","tiny","small","normal","medium","big","large","huge"],d=["start","center","end","stretch"];let s=class extends g{constructor(){super(...arguments),this.gap="normal",this.align="stretch"}render(){return h`
      <div class="esp-stack" part="stack">
        <slot></slot>
      </div>
    `}};s.styles=[...g.styles,u`
      :host {
        display: block;
        --_esp-stack-gap: var(--esp-size-normal);
        --_esp-stack-align: stretch;
      }

      :host([gap="none"]) {
        --_esp-stack-gap: 0px;
      }
      :host([gap="tiny"]) {
        --_esp-stack-gap: var(--esp-size-tiny);
      }
      :host([gap="small"]) {
        --_esp-stack-gap: var(--esp-size-small);
      }
      :host([gap="medium"]) {
        --_esp-stack-gap: var(--esp-size-medium);
      }
      :host([gap="big"]) {
        --_esp-stack-gap: var(--esp-size-big);
      }
      :host([gap="large"]) {
        --_esp-stack-gap: var(--esp-size-large);
      }
      :host([gap="huge"]) {
        --_esp-stack-gap: var(--esp-size-huge);
      }

      :host([align="start"]) {
        --_esp-stack-align: flex-start;
      }
      :host([align="center"]) {
        --_esp-stack-align: center;
      }
      :host([align="end"]) {
        --_esp-stack-align: flex-end;
      }

      .esp-stack {
        display: flex;
        flex-direction: column;
        gap: var(--esp-stack-gap, var(--_esp-stack-gap));
        align-items: var(--_esp-stack-align);
      }

      
      :host(:not([align])) ::slotted(esp-button),
      :host(:not([align])) ::slotted(esp-button-group) {
        align-self: flex-start;
      }
    `],o([c({reflect:!0,useDefault:!0})],s.prototype,"gap",void 0),o([c({reflect:!0,useDefault:!0})],s.prototype,"align",void 0),s=o([f("esp-stack")],s);export{s as EspalierStack,d as STACK_ALIGNS,m as STACK_GAPS};
