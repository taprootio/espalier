var l=function(r,e,i,s){var n=arguments.length,t=n<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,i):s,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(r,e,i,s);else for(var c=r.length-1;c>=0;c--)(a=r[c])&&(t=(n<3?a(t):n>3?a(e,i,t):a(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};import{css as h,html as u}from"lit";import{customElement as m,property as d}from"lit/decorators.js";import{EspalierElementBase as p}from"../shared/esp-element-base.js";import{FormFieldDescriptionController as f}from"../shared/form-field-description-controller.js";import{radioSelected as v}from"../shared/svgs/radio-selected.js";import{radioUnselected as b}from"../shared/svgs/radio-unselected.js";import{disabledControl as y,focusRing as g}from"../shared/style-fragments.js";let o=class extends p{constructor(){super(...arguments),this.formItemDescription=new f({host:this,getTarget:()=>this.shadowRoot?.querySelector(".radio-control")}),this.checked=!1,this.value="",this.disabled=!1}focus(e){this.focusShadowElementAfterUpdate(".radio-control",e)}setFormItemDescription(e){this.formItemDescription.setDescription(e)}select(){this.disabled||this.checked||(this.checked=!0,this.emitValueChanged({checked:this.checked,value:this.value}))}handleKeyDown(e){e.key===" "&&(e.preventDefault(),this.select())}render(){return u`
      <div
        class="radio-control"
        role="radio"
        aria-checked=${String(this.checked)}
        aria-disabled=${String(this.disabled)}
        tabindex=${this.disabled?-1:0}
        @click=${this.select}
        @keydown=${this.handleKeyDown}
      >
        <span class="icon">${this.checked?v:b}</span>
        <span class="label"><slot></slot></span>
      </div>
    `}};o.styles=[...p.styles,g(".radio-control:focus-visible","--esp-radio-button-focus-shadow"),y(".radio-control"),h`
      :host {
        display: block;
      }

      .radio-control {
        display: inline-grid;
        grid-template-columns: min-content auto;
        align-items: center;
        gap: var(--esp-size-tiny);
        cursor: pointer;
        font-family: var(--esp-font-body);
        font-size: var(--esp-size-font);
        color: var(--esp-color-text);
        outline: none;
        user-select: none;
        border-radius: var(--esp-size-border-radius);
        padding: calc(var(--esp-size-tiny) / 2);
        > .icon {
          display: grid;
          place-content: center;
          color: var(--esp-radio-button-icon-color, var(--esp-color-text));

          > svg {
            height: var(--esp-radio-button-size, var(--esp-size-normal-to-medium));
            width: var(--esp-radio-button-size, var(--esp-size-normal-to-medium));
          }
        }

        > .label {
          line-height: 1.3;
        }
      }
    `],l([d({type:Boolean,reflect:!0})],o.prototype,"checked",void 0),l([d({type:String})],o.prototype,"value",void 0),l([d({type:Boolean,reflect:!0})],o.prototype,"disabled",void 0),o=l([m("esp-radio-button")],o);export{o as EspalierRadioButton};
