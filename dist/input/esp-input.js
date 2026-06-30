var r=function(p,e,t,i){var a=arguments.length,l=a<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(p,e,t,i);else for(var u=p.length-1;u>=0;u--)(o=p[u])&&(l=(a<3?o(l):a>3?o(e,t,l):o(e,t))||l);return a>3&&l&&Object.defineProperty(e,t,l),l};import{css as _,html as c,nothing as b}from"lit";import{customElement as T,property as n,state as y}from"lit/decorators.js";import{ifDefined as h}from"lit/directives/if-defined.js";import{createRef as D,ref as f}from"lit/directives/ref.js";import{EspalierElementBase as g}from"../shared/esp-element-base.js";import{FormFieldController as x}from"../shared/form-field-controller.js";import{getIconHrefForHost as v}from"../shared/intent-values.js";import{SlottedIconController as M}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as I}from"../shared/svgs/render-sprite-icon.js";import{detectDatePattern as P,parseDateInput as C,formatDateForLocale as d}from"./date-locale.js";import{getPhoneLocalities as S,parsePhoneInput as $,formatPhoneForLocale as L}from"./tel-locale.js";let s=class extends g{constructor(){super(...arguments),this.internals=this.attachInternals(),this.theInput=D(),this.iconSlot=new M(this),this.formCtrl=new x({host:this,internals:this.internals,getFormValue:()=>this.value||null,getValidity:()=>this._getValidity(),getValidationAnchor:()=>this.theInput.value??this,onReset:()=>{this.value="",this._dateDisplayText="",this._dateManaged=!1,this._telDisplayText="",this._telManaged=!1,this._hasVisibleError=!1},onRestore:e=>{this.value=e,this.inputType==="date"&&e&&this._restoreDateDisplay(e),this.inputType==="tel"&&e&&this._restoreTelDisplay(e)},onDisabled:e=>{this.disabled=e}}),this._hasVisibleError=!1,this._datePattern=null,this._dateDisplayText="",this._dateManaged=!1,this._phoneLocalitiesCache=null,this._telDisplayText="",this._telManaged=!1,this.fieldName="",this.icon="",this.iconLabel="",this.inputType="text",this.forceLowercase=!1,this.value="",this.name="",this.required=!1,this.requiredMessage="",this.validationMessage="",this.disabled=!1,this.readonly=!1,this._trackVisibleError=e=>{const t=e.detail;this._hasVisibleError=!t.valid}}_getDatePattern(){return this._datePattern||(this._datePattern=P()),this._datePattern}_getPhoneLocalities(){if(!this._phoneLocalitiesCache){const e=this.telLocalities?this.telLocalities.trim().split(/\s+/):void 0;this._phoneLocalitiesCache=S(e)}return this._phoneLocalitiesCache}get _nativeInputType(){return this.inputType==="date"?"text":this.inputType}get _effectiveInputmode(){if(this.inputmode)return this.inputmode;switch(this.inputType){case"email":return"email";case"url":return"url";case"tel":return"tel";case"number":return"decimal";case"date":return"numeric";default:return}}get _displayValue(){return this.inputType==="date"?this._dateDisplayText:this.inputType==="tel"?this._telDisplayText:this.value}get _effectivePlaceholder(){if(this.placeholder!==void 0)return this.placeholder;if(this.inputType==="date")return this._getDatePattern().placeholder;if(this.inputType==="tel"){const e=this._getPhoneLocalities();return e.length>0?e[0].placeholder:void 0}}handleInput(e){const t=e.target;if(this.readonly){t.value=this._displayValue;return}let i=t.value;if(this.inputType==="date"){const a=i.replace(/[^\d/\-.\s]/g,"");if(a!==i){const l=i.length-a.length,o=Math.max(0,(t.selectionStart??a.length)-l);t.value=a,t.setSelectionRange(o,o),i=a}this._dateDisplayText=i,this._dateManaged=!0,i||(this.value="",this._syncInput());return}if(this.inputType==="tel"){const a=i.replace(/[^\d+\-.()\s]/g,"");if(a!==i){const l=i.length-a.length,o=Math.max(0,(t.selectionStart??a.length)-l);t.value=a,t.setSelectionRange(o,o),i=a}this._telDisplayText=i,this._telManaged=!0,i||(this.value="",this._syncInput());return}this.forceLowercase&&(i=i.toLowerCase()),this.value=t.value=i,this._syncInput()}_syncInput(){this._hasVisibleError?this.formCtrl.syncValue():this.formCtrl.syncValueSilently(),this.emitValueChanged(this.value)}_handleBlur(){this.inputType==="date"&&this._finalizeDateValue(),this.inputType==="tel"&&this._finalizeTelValue(),this.formCtrl.syncValue()}_finalizeDateValue(){const e=this._dateDisplayText;if(!e.trim()){this.value="",this._dateDisplayText="",this._dateManaged=!1,this.emitValueChanged(this.value);return}const t=this._getDatePattern(),i=C(e,t);i?(this._dateDisplayText=d(i,t),this.value=i.toString()):this.value=e,this._dateManaged=!0,this.requestUpdate(),this.emitValueChanged(this.value)}_finalizeTelValue(){const e=this._telDisplayText;if(!e.trim()){this.value="",this._telDisplayText="",this._telManaged=!1,this.emitValueChanged(this.value);return}const t=this._getPhoneLocalities(),i=$(e,t);i?(this._telDisplayText=i.displayText,this.value=i.e164):this.value=e,this._telManaged=!0,this.requestUpdate(),this.emitValueChanged(this.value)}_getValidity(){if(this.inputType==="date")return this._getDateValidity();if(this.inputType==="tel")return this._getTelValidity();const e=this.theInput.value;if(e&&!e.validity.valid){const t=e.validity,i={valueMissing:t.valueMissing,typeMismatch:t.typeMismatch,patternMismatch:t.patternMismatch,tooLong:t.tooLong,tooShort:t.tooShort,rangeUnderflow:t.rangeUnderflow,rangeOverflow:t.rangeOverflow,stepMismatch:t.stepMismatch,badInput:t.badInput};return{flags:i,message:this._getFriendlyMessage(i)}}return this.required&&!this.value?{flags:{valueMissing:!0},message:this.requiredMessage||"Please fill out this field."}:null}_getFriendlyMessage(e){if(e.valueMissing)return this.requiredMessage||"Please fill out this field.";if(e.typeMismatch){if(this.validationMessage)return this.validationMessage;switch(this.inputType){case"email":return"Please enter a valid email address.";case"url":return"Please enter a valid URL.";case"number":return"Please enter a valid number.";case"tel":return"Please enter a valid phone number.";default:return"Please enter a valid value."}}return e.patternMismatch?this.validationMessage||"Please match the requested format.":e.tooShort?`Must be at least ${this.minlength} characters.`:e.tooLong?`Must be no more than ${this.maxlength} characters.`:e.rangeUnderflow?`Value must be ${this.min} or greater.`:e.rangeOverflow?`Value must be ${this.max} or less.`:(e.stepMismatch||e.badInput,"Please enter a valid value.")}_getDateValidity(){if(this.required&&!this.value)return{flags:{valueMissing:!0},message:this.requiredMessage||"Please fill out this field."};if(!this.value)return null;let e;try{e=Temporal.PlainDate.from(this.value)}catch{return{flags:{typeMismatch:!0},message:this.validationMessage||"Please enter a valid date."}}if(this.min)try{const t=Temporal.PlainDate.from(this.min);if(Temporal.PlainDate.compare(e,t)<0){const i=this._getDatePattern(),a=d(t,i);return{flags:{rangeUnderflow:!0},message:`Date must be ${a} or later.`}}}catch{}if(this.max)try{const t=Temporal.PlainDate.from(this.max);if(Temporal.PlainDate.compare(e,t)>0){const i=this._getDatePattern(),a=d(t,i);return{flags:{rangeOverflow:!0},message:`Date must be ${a} or earlier.`}}}catch{}return null}_getTelValidity(){return this.required&&!this.value?{flags:{valueMissing:!0},message:this.requiredMessage||"Please fill out this field."}:this.value?/^\+\d+$/.test(this.value)?null:{flags:{typeMismatch:!0},message:this.validationMessage||"Please enter a valid phone number."}:null}focus(e){this.focusResolvedElementAfterUpdate(()=>this.theInput.value,e)}validate(){this.formCtrl.validate()}checkValidity(){return this.formCtrl.checkValidity()}formResetCallback(){this.formCtrl.handleFormReset()}formStateRestoreCallback(e){this.formCtrl.handleFormStateRestore(e)}formDisabledCallback(e){this.formCtrl.handleFormDisabled(e)}connectedCallback(){super.connectedCallback(),this.addEventListener("validity-changed",this._trackVisibleError),this.inputType==="date"&&this.value&&this._restoreDateDisplay(this.value),this.inputType==="tel"&&this.value&&this._restoreTelDisplay(this.value)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("validity-changed",this._trackVisibleError)}updated(e){super.updated(e),e.has("value")&&this.inputType==="date"&&!this._dateManaged&&this._restoreDateDisplay(this.value),e.has("value")&&this.inputType==="tel"&&!this._telManaged&&this._restoreTelDisplay(this.value),e.has("telLocalities")&&(this._phoneLocalitiesCache=null),this._dateManaged=!1,this._telManaged=!1}_restoreDateDisplay(e){if(!e){this._dateDisplayText="";return}try{const t=Temporal.PlainDate.from(e),i=this._getDatePattern();this._dateDisplayText=d(t,i)}catch{this._dateDisplayText=e}}_restoreTelDisplay(e){if(!e){this._telDisplayText="";return}const t=this._getPhoneLocalities();this._telDisplayText=L(e,t)}_handleIconClick(){this.disabled||!(this.hasIconSlotContent||v(this.icon,this).length>0)||this.dispatchEvent(new CustomEvent("icon-clicked",{bubbles:!0,composed:!0}))}get hasIconSlotContent(){return this.iconSlot.hasSlottedIcon(":scope > :not([slot]), :scope > [slot='']")}_getIconButtonLabel(){const e=this.iconLabel.trim();if(e)return e;const t=this.icon.trim();return t?`${this._humanizeIconName(t)} action`:"Input icon action"}_humanizeIconName(e){const t=e.replace(/[-_]+/gu," ").trim();return t?t.charAt(0).toUpperCase()+t.slice(1):"Icon"}render(){const e=this.inputType==="date",t=this.inputType==="number",i=this.inputType==="tel",a=e||t||i,l=v(this.icon,this),o=this.hasIconSlotContent,u=o||l.length>0,m=this._getIconButtonLabel();return c`
      <div class="esp-field">
        <input
          id=${this.fieldName}
          ${f(this.theInput)}
          .value=${this._displayValue}
          @input=${this.handleInput}
          @blur=${this._handleBlur}
          type=${this._nativeInputType}
          placeholder=${h(this._effectivePlaceholder)}
          inputmode=${h(this._effectiveInputmode)}
          pattern=${h(a?void 0:this.pattern)}
          minlength=${h(a?void 0:this.minlength)}
          maxlength=${h(a?void 0:this.maxlength)}
          min=${h(e||i?void 0:this.min)}
          max=${h(e||i?void 0:this.max)}
          step=${h(e||i?void 0:this.step)}
          ?required=${this.required}
          ?disabled=${this.disabled}
          ?readonly=${this.readonly}
        />
        ${u?c`
              <button
                class="icon-action"
                type="button"
                aria-label=${m}
                title=${m}
                ?disabled=${this.disabled}
                @click=${this._handleIconClick}
              >
                <slot
                  ${f(this.iconSlot.slotRef)}
                  @slotchange=${this.iconSlot.handleSlotChange}
                ></slot>
                ${!o&&l?I(l):b}
              </button>
            `:c`
              <span class="icon-slot-probe" hidden>
                <slot
                  ${f(this.iconSlot.slotRef)}
                  @slotchange=${this.iconSlot.handleSlotChange}
                ></slot>
              </span>
            `}
      </div>
    `}};s.formAssociated=!0,s.styles=[...g.styles,_`
      .esp-field {
        margin: 1px;
        display: grid;
        grid-template-columns: auto min-content;

        &:focus-within {
          border-width: 2px;
          margin: 0;
        }

        > input {
          grid-column: 1;
        }

        > .icon-action {
          appearance: none;
          cursor: pointer;
          grid-column: 2;
          display: grid;
          place-content: center;
          line-height: 1;
          padding: 0;
          width: auto;

          &:focus-visible {
            border-radius: max(0px, calc(var(--esp-size-border-radius) - 0.1rem));
            box-shadow:
              inset 0 0 0 2px var(--esp-field-focus-shadow, var(--esp-color-shadow)),
              0 0 3px var(--esp-field-focus-shadow, var(--esp-color-shadow));
          }

          &:disabled {
            cursor: not-allowed;
          }

          .generated-icon,
          ::slotted(svg),
          > svg {
            height: calc(1.2 * var(--esp-size-font));
            width: calc(1.2 * var(--esp-size-font));
            margin: 0 var(--esp-size-tiny);
          }
        }
      }
    `],r([y()],s.prototype,"_dateDisplayText",void 0),r([y()],s.prototype,"_telDisplayText",void 0),r([n({attribute:"field-name",type:String})],s.prototype,"fieldName",void 0),r([n({type:String})],s.prototype,"icon",void 0),r([n({attribute:"icon-label",type:String})],s.prototype,"iconLabel",void 0),r([n({attribute:"input-type",type:String})],s.prototype,"inputType",void 0),r([n({type:String})],s.prototype,"placeholder",void 0),r([n({attribute:"force-lowercase",type:Boolean})],s.prototype,"forceLowercase",void 0),r([n({type:String})],s.prototype,"value",void 0),r([n({type:String,reflect:!0})],s.prototype,"name",void 0),r([n({type:Boolean,reflect:!0})],s.prototype,"required",void 0),r([n({attribute:"required-message"})],s.prototype,"requiredMessage",void 0),r([n({attribute:"validation-message"})],s.prototype,"validationMessage",void 0),r([n({type:Boolean,reflect:!0})],s.prototype,"disabled",void 0),r([n({type:Boolean,reflect:!0})],s.prototype,"readonly",void 0),r([n({type:String})],s.prototype,"pattern",void 0),r([n({type:Number})],s.prototype,"minlength",void 0),r([n({type:Number})],s.prototype,"maxlength",void 0),r([n({type:String})],s.prototype,"min",void 0),r([n({type:String})],s.prototype,"max",void 0),r([n({type:Number})],s.prototype,"step",void 0),r([n({type:String})],s.prototype,"inputmode",void 0),r([n({attribute:"tel-localities",type:String})],s.prototype,"telLocalities",void 0),s=r([T("esp-input")],s);export{s as EspalierInput};
