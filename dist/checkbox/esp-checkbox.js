var o=function(l,e,s,c){var n=arguments.length,i=n<3?e:c===null?c=Object.getOwnPropertyDescriptor(e,s):c,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(l,e,s,c);else for(var h=l.length-1;h>=0;h--)(a=l[h])&&(i=(n<3?a(i):n>3?a(e,s,i):a(e,s))||i);return n>3&&i&&Object.defineProperty(e,s,i),i};import{css as p,html as m}from"lit";import{customElement as f,property as r}from"lit/decorators.js";import{EspalierElementBase as d}from"../shared/esp-element-base.js";import{checkboxChecked as u}from"../shared/svgs/checkbox-checked.js";import{checkboxUnchecked as b}from"../shared/svgs/checkbox-unchecked.js";import{checkboxIndeterminate as k}from"../shared/svgs/checkbox-indeterminate.js";import{FormFieldController as v}from"../shared/form-field-controller.js";import{FormFieldDescriptionController as g}from"../shared/form-field-description-controller.js";import{disabledControl as y,focusRing as x}from"../shared/style-fragments.js";let t=class extends d{constructor(){super(...arguments),this.internals=this.attachInternals(),this.formCtrl=new v({host:this,internals:this.internals,getFormValue:()=>this.checked?this.value||"on":null,getValidity:()=>this.required&&!this.checked?{flags:{valueMissing:!0},message:this.requiredMessage||"Please check this box to continue."}:null,onReset:()=>{this.checked=!1,this.indeterminate=!1},onRestore:e=>{this.checked=e==="on"||e===this.value},onDisabled:e=>{this.disabled=e}}),this.formItemDescription=new g({host:this,getTarget:()=>this.shadowRoot?.querySelector(".checkbox-control")}),this.checked=!1,this.value="",this.name="",this.required=!1,this.requiredMessage="",this.disabled=!1,this.indeterminate=!1}focus(e){this.focusShadowElementAfterUpdate(".checkbox-control",e)}setFormItemDescription(e){this.formItemDescription.setDescription(e)}validate(){this.formCtrl.validate()}checkValidity(){return this.formCtrl.checkValidity()}toggle(){this.disabled||(this.indeterminate=!1,this.checked=!this.checked,this.formCtrl.syncValue(),this.emitValueChanged({checked:this.checked,value:this.value}))}handleKeyDown(e){e.key===" "&&(e.preventDefault(),this.toggle())}getSvg(){return this.indeterminate?k:this.checked?u:b}formResetCallback(){this.formCtrl.handleFormReset()}formStateRestoreCallback(e){this.formCtrl.handleFormStateRestore(e)}formDisabledCallback(e){this.formCtrl.handleFormDisabled(e)}render(){return m`
      <div
        class="checkbox-control"
        role="checkbox"
        aria-checked=${this.indeterminate?"mixed":String(this.checked)}
        aria-disabled=${String(this.disabled)}
        tabindex=${this.disabled?-1:0}
        @click=${this.toggle}
        @keydown=${this.handleKeyDown}
      >
        <span class="icon">${this.getSvg()}</span>
        <span class="label"><slot></slot></span>
      </div>
    `}};t.formAssociated=!0,t.styles=[...d.styles,x(".checkbox-control:focus-visible","--esp-checkbox-focus-shadow"),y(".checkbox-control"),p`
      :host {
        display: block;
      }

      .checkbox-control {
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
          color: var(--esp-checkbox-icon-color, var(--esp-color-text));

          > svg {
            height: var(--esp-checkbox-size, var(--esp-size-normal-to-medium));
            width: var(--esp-checkbox-size, var(--esp-size-normal-to-medium));
          }
        }

        > .label {
          line-height: 1.3;
        }
      }
    `],o([r({type:Boolean,reflect:!0})],t.prototype,"checked",void 0),o([r({type:String})],t.prototype,"value",void 0),o([r({type:String,reflect:!0})],t.prototype,"name",void 0),o([r({type:Boolean,reflect:!0})],t.prototype,"required",void 0),o([r({attribute:"required-message"})],t.prototype,"requiredMessage",void 0),o([r({type:Boolean,reflect:!0})],t.prototype,"disabled",void 0),o([r({type:Boolean,reflect:!0})],t.prototype,"indeterminate",void 0),t=o([f("esp-checkbox")],t);export{t as EspalierCheckbox};
