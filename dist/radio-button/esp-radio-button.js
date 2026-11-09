var d=function(s,e,o,r){var l=arguments.length,t=l<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,o,r);else for(var n=s.length-1;n>=0;n--)(a=s[n])&&(t=(l<3?a(t):l>3?a(e,o,t):a(e,o))||t);return l>3&&t&&Object.defineProperty(e,o,t),t};import{css as h,html as u}from"lit";import{customElement as f,property as c}from"lit/decorators.js";import{EspalierElementBase as p}from"../shared/esp-element-base.js";import{FormFieldDescriptionController as m}from"../shared/form-field-description-controller.js";import{radioSelected as b}from"../shared/svgs/radio-selected.js";import{radioUnselected as v}from"../shared/svgs/radio-unselected.js";import{disabledControl as y,focusRing as D}from"../shared/style-fragments.js";let i=class extends p{constructor(){super(...arguments),this.disabledGroup=null,this.formItemDescription=new m({host:this,getTarget:()=>this.shadowRoot?.querySelector(".radio-control")}),this.checked=!1,this.value="",this.disabled=!1}get effectiveDisabled(){return this.disabled||!!(this.disabledGroup?.isConnected&&this.parentElement===this.disabledGroup&&this.disabledGroup.disabled)}setDisabledGroup(e){this.parentElement!==e||!e.isConnected||(this.disabledGroup=e,this.requestUpdate())}clearDisabledGroup(e){this.disabledGroup===e&&(this.disabledGroup=null,this.requestUpdate())}disconnectedCallback(){super.disconnectedCallback(),this.disabledGroup&&this.clearDisabledGroup(this.disabledGroup)}focus(e){this.focusResolvedElementAfterUpdate(()=>this.effectiveDisabled?null:this.shadowRoot?.querySelector(".radio-control"),e)}setFormItemDescription(e){this.formItemDescription.setDescription(e)}setFormItemInvalid(e){this.formItemDescription.setInvalid(e)}select(){this.effectiveDisabled||this.checked||(this.checked=!0,this.emitValueChanged({checked:this.checked,value:this.value}))}handleKeyDown(e){e.key===" "&&(e.preventDefault(),this.select())}render(){return u`
      <div
        class="radio-control"
        role="radio"
        aria-checked=${String(this.checked)}
        aria-disabled=${String(this.effectiveDisabled)}
        tabindex=${this.effectiveDisabled?-1:0}
        @click=${this.select}
        @keydown=${this.handleKeyDown}
      >
        <span class="icon">${this.checked?b:v}</span>
        <span class="label"><slot></slot></span>
      </div>
    `}};i.styles=[...p.styles,D(".radio-control:focus-visible","--esp-radio-button-focus-shadow"),y(':host .radio-control[aria-disabled="true"]'),h`
      :host {
        display: block;
      }

      .radio-control {
        display: inline-grid;
        grid-template-columns: min-content auto;
        align-items: center;
        gap: var(--esp-size-tiny);
        cursor: pointer;
        font-family: var(
          --_esp-font-body-effective,
          var(--esp-font-body, var(--_esp-font-body-fallback))
        );
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
    `],d([c({type:Boolean,reflect:!0})],i.prototype,"checked",void 0),d([c({type:String})],i.prototype,"value",void 0),d([c({type:Boolean,reflect:!0})],i.prototype,"disabled",void 0),i=d([f("esp-radio-button")],i);export{i as EspalierRadioButton};
