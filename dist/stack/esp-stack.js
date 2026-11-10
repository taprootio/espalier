var p=function(l,t,a,r){var n=arguments.length,e=n<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,a):r,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(l,t,a,r);else for(var o=l.length-1;o>=0;o--)(i=l[o])&&(e=(n<3?i(e):n>3?i(t,a,e):i(t,a))||e);return n>3&&e&&Object.defineProperty(t,a,e),e};import{css as f,html as g}from"lit";import{customElement as h,property as c}from"lit/decorators.js";import{layoutGapStyles as d,LAYOUT_GAPS as m}from"../shared/layout-gap.js";import{EspalierElementBase as u}from"../shared/esp-element-base.js";const v=m,y=["start","center","end","stretch"];let s=class extends u{constructor(){super(...arguments),this.gap="normal",this.align="stretch"}render(){return g`
      <div class="esp-stack" part="stack">
        <slot></slot>
      </div>
    `}};s.styles=[...u.styles,d("--_esp-stack-gap"),f`
      :host {
        display: block;
        --_esp-stack-align: stretch;
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
    `],p([c({reflect:!0,useDefault:!0})],s.prototype,"gap",void 0),p([c({reflect:!0,useDefault:!0})],s.prototype,"align",void 0),s=p([h("esp-stack")],s);export{s as EspalierStack,y as STACK_ALIGNS,v as STACK_GAPS};
