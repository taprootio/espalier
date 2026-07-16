var r=function(n,e,i,l){var h=arguments.length,a=h<3?e:l===null?l=Object.getOwnPropertyDescriptor(e,i):l,d;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(n,e,i,l);else for(var u=n.length-1;u>=0;u--)(d=n[u])&&(a=(h<3?d(a):h>3?d(e,i,a):d(e,i))||a);return h>3&&a&&Object.defineProperty(e,i,a),a};import{css as p,html as m}from"lit";import{customElement as f,property as s}from"lit/decorators.js";import{ifDefined as o}from"lit/directives/if-defined.js";import{createRef as v,ref as g}from"lit/directives/ref.js";import{EspalierElementBase as c}from"../shared/esp-element-base.js";import{FormFieldController as y}from"../shared/form-field-controller.js";import{FormFieldDescriptionController as b}from"../shared/form-field-description-controller.js";let t=class extends c{constructor(){super(...arguments),this.internals=this.attachInternals(),this.theTextarea=v(),this.formCtrl=new y({host:this,internals:this.internals,getFormValue:()=>this.value||null,getValidity:()=>this._getValidity(),getValidationAnchor:()=>this.theTextarea.value??this,onReset:()=>{this.value="",this._hasVisibleError=!1},onRestore:e=>{this.value=e},onDisabled:e=>{this.disabled=e}}),this.formItemDescription=new b({host:this,getTarget:()=>this.theTextarea.value}),this._hasVisibleError=!1,this.fieldName="",this.value="",this.name="",this.required=!1,this.requiredMessage="",this.validationMessage="",this.disabled=!1,this._trackVisibleError=e=>{const i=e.detail;this._hasVisibleError=!i.valid}}handleInput(e){const i=e.target;this.value=i.value,this._syncInput()}_syncInput(){this._hasVisibleError?this.formCtrl.syncValue():this.formCtrl.syncValueSilently(),this.emitValueChanged(this.value)}_handleBlur(){this.formCtrl.syncValue()}_getValidity(){const e=this.theTextarea.value;if(e&&!e.validity.valid){const i=e.validity,l={valueMissing:i.valueMissing,tooLong:i.tooLong,tooShort:i.tooShort};return{flags:l,message:this._getFriendlyMessage(l)}}return this.required&&!this.value?{flags:{valueMissing:!0},message:this.requiredMessage||"Please fill out this field."}:null}_getFriendlyMessage(e){return e.valueMissing?this.requiredMessage||"Please fill out this field.":e.tooShort?this.validationMessage||`Must be at least ${this.minlength} characters.`:e.tooLong?this.validationMessage||`Must be no more than ${this.maxlength} characters.`:"Please enter a valid value."}focus(e){this.focusResolvedElementAfterUpdate(()=>this.theTextarea.value,e)}setFormItemDescription(e){this.formItemDescription.setDescription(e)}validate(){this.formCtrl.validate()}checkValidity(){return this.formCtrl.checkValidity()}formResetCallback(){this.formCtrl.handleFormReset()}formStateRestoreCallback(e){this.formCtrl.handleFormStateRestore(e)}formDisabledCallback(e){this.formCtrl.handleFormDisabled(e)}connectedCallback(){super.connectedCallback(),this.addEventListener("validity-changed",this._trackVisibleError)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("validity-changed",this._trackVisibleError)}render(){return m`
      <div class="esp-field">
        <textarea
          id=${this.fieldName}
          ${g(this.theTextarea)}
          .value=${this.value}
          @input=${this.handleInput}
          @blur=${this._handleBlur}
          placeholder=${o(this.placeholder)}
          rows=${o(this.rows)}
          cols=${o(this.cols)}
          minlength=${o(this.minlength)}
          maxlength=${o(this.maxlength)}
          ?required=${this.required}
          ?disabled=${this.disabled}
        ></textarea>
      </div>
    `}};t.formAssociated=!0,t.styles=[...c.styles,p`
      .esp-field {
        margin: 1px;

        &:focus-within {
          border-width: 2px;
          margin: 0;
        }

        > textarea {
          resize: vertical;
          min-height: calc(3 * var(--esp-size-font) * 1.5);
        }
      }
    `],r([s({attribute:"field-name",type:String})],t.prototype,"fieldName",void 0),r([s({type:String})],t.prototype,"value",void 0),r([s({type:String,reflect:!0})],t.prototype,"name",void 0),r([s({type:Boolean,reflect:!0})],t.prototype,"required",void 0),r([s({attribute:"required-message"})],t.prototype,"requiredMessage",void 0),r([s({attribute:"validation-message"})],t.prototype,"validationMessage",void 0),r([s({type:Boolean,reflect:!0})],t.prototype,"disabled",void 0),r([s({type:String})],t.prototype,"placeholder",void 0),r([s({type:Number})],t.prototype,"rows",void 0),r([s({type:Number})],t.prototype,"cols",void 0),r([s({type:Number})],t.prototype,"minlength",void 0),r([s({type:Number})],t.prototype,"maxlength",void 0),t=r([f("esp-textarea")],t);export{t as EspalierTextarea};
