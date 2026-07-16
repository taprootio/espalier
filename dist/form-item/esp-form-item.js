var n=function(l,e,t,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,h;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(l,e,t,r);else for(var d=l.length-1;d>=0;d--)(h=l[d])&&(i=(o<3?h(i):o>3?h(e,t,i):h(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};import{LitElement as f,css as u,html as m,nothing as c}from"lit";import{customElement as g,property as a}from"lit/decorators.js";import{classMap as v}from"lit/directives/class-map.js";import{createRef as b,ref as y}from"lit/directives/ref.js";import{VALIDITY_CHANGED_EVENT as w}from"../shared/validation.js";let p=0,s=class extends f{constructor(){super(...arguments),this.fieldSlot=b(),this.theField={focus:()=>{}},this._errorSource="manual",this.label="",this.autofocus=!1,this.hint="",this.hintPlacement="below",this.hintId=`esp-form-item-hint-${++p}`,this.managedHintEl=null,this.appliedHintTokens=[],this.hintContentObserver=new MutationObserver(()=>{this.syncFieldDescribedBy()}),this._error="",this._warning="",this.fieldName="",this._errorPool=[],this.handleHintSlotChange=()=>{this.syncManagedHint(),this.observeConsumerHintContent(),this.requestUpdate(),this.syncFieldDescribedBy()}}get hasHint(){return!!this.hint||this.consumerHintElements().length>0}consumerHintElements(){return[...this.children].filter(e=>e.slot==="hint"&&!e.hasAttribute("data-esp-managed-hint"))}get error(){return this._error}set error(e){this._setError(e,"manual")}_setError(e,t){const r=this._error;this._error=e,this._errorSource=t,this.requestUpdate("error",r)}get warning(){return this._warning}set warning(e){const t=this._warning;this._warning=e,this.requestUpdate("warning",t)}get errorPool(){return this._errorPool}set errorPool(e){const t=this._errorPool;this._errorPool=e,this.requestUpdate("errorPool",t);const r=e.filter(o=>o.fieldName===this.fieldName);if(r.length===0){this._errorSource==="pool"&&this._setError("","pool");return}this._setError(r[0].errorMessage,"pool")}firstUpdated(){if(this.fieldSlot.value?.assignedElements().length!=1)throw new Error("esp-form-item requires exactly one slotted element.");this.theField=this.fieldSlot.value?.assignedElements()[0],this.fieldName&&this.theField.setAttribute("name",this.fieldName),this.syncFieldDescribedBy(),this.autofocus&&this.focus(),this.addEventListener(w,t=>{const r=t.detail;this._errorSource==="pool"&&this._error.length>0||(r.valid?this._errorSource==="native"&&this._setError("","manual"):this._setError(r.message,"native"))});const e=this.theField;e.addEventListener("invalid",t=>{t.preventDefault(),!(this._errorSource==="pool"&&this._error.length>0)&&"validationMessage"in e&&this._setError(e.validationMessage,"native")})}updated(e){if(super.updated(e),(e.has("hint")||e.has("hintPlacement"))&&(this.syncManagedHint(),this.syncFieldDescribedBy()),!e.has("fieldName"))return;const t=this.theField;t instanceof Element&&(this.fieldName?t.setAttribute("name",this.fieldName):t.removeAttribute("name"))}connectedCallback(){super.connectedCallback(),this.observeConsumerHintContent()}disconnectedCallback(){this.hintContentObserver.disconnect(),super.disconnectedCallback()}observeConsumerHintContent(){this.hintContentObserver.disconnect();for(const e of this.consumerHintElements())this.hintContentObserver.observe(e,{attributes:!0,attributeFilter:["id"],characterData:!0,childList:!0,subtree:!0})}syncManagedHint(){if(!(!!this.hint&&this.consumerHintElements().length===0)){this.managedHintEl?.remove(),this.managedHintEl=null;return}if(!this.managedHintEl){const t=document.createElement("span");t.slot="hint",t.id=this.hintId,t.toggleAttribute("data-esp-managed-hint",!0),this.managedHintEl=t,this.appendChild(t)}this.managedHintEl.textContent=this.hint}hintDescriptionIds(){return this.managedHintEl?[this.managedHintEl.id]:this.consumerHintElements().map(e=>(e.id||(e.id=`esp-form-item-hint-${++p}`),e.id))}hintDescriptionText(){if(!this.hasHint)return null;if(this.managedHintEl)return this.managedHintEl.textContent??"";const e=this.consumerHintElements();return e.length===0?this.hint:e.map(t=>t.textContent?.trim()??"").filter(Boolean).join(" ")}syncFieldDescribedBy(){const e=this.fieldSlot.value?.assignedElements()[0];if(!e)return;const t=this.hasHint?this.hintDescriptionIds():[],r=(e.getAttribute("aria-describedby")??"").split(/\s+/).filter(i=>i&&!this.appliedHintTokens.includes(i)&&!t.includes(i));this.appliedHintTokens=t;const o=[...r,...t];o.length>0?e.setAttribute("aria-describedby",o.join(" ")):e.removeAttribute("aria-describedby"),e.setFormItemDescription?.(this.hintDescriptionText())}focus(e){(this.fieldSlot.value?.assignedElements()[0]??this.theField).focus(e)}renderHint(){return m`
      <div class="hint" aria-hidden=${this.hintPlacement==="above"?"true":c}>
        <slot name="hint" @slotchange=${this.handleHintSlotChange}></slot>
      </div>
    `}render(){const e={"form-item":!0,"has-hint":this.hasHint,"has-error":this.error.length>0,"has-warning":this.warning.length>0&&this.error.length===0};return m`
      <div class=${v(e)}>
        <label
          @click=${t=>{this.focus(),t.stopPropagation()}}
        >
          ${this.label} ${this.hintPlacement==="above"?this.renderHint():c}
          <slot ${y(this.fieldSlot)}></slot>
        </label>
        ${this.hintPlacement!=="above"?this.renderHint():c}
        <div class="error-message">
          <span>${this.error}</span>
        </div>
        <div class="warning-message">
          <span>${this.warning}</span>
        </div>
      </div>
    `}};s.styles=u`
    .form-item {
      font-family: var(--esp-form-item-font, var(--esp-font-body));
      font-size: var(--esp-form-item-font-size, var(--esp-size-font));
      display: grid;
      grid-auto-rows: min-content;

      > label {
        font-weight: bold;
        color: var(--esp-form-item-label-color, var(--esp-color-text));
      }

      .hint {
        display: none;
        font-size: var(--esp-form-item-hint-font-size, var(--esp-type-tiny));
        font-weight: normal;
        color: var(--esp-form-item-hint-color, oklch(from var(--esp-color-text) l c h / 0.7));
      }

      > .hint {
        margin: var(--esp-size-tiny) 0;
      }

      &.has-hint .hint {
        display: block;
      }

      > .error-message {
        font-size: var(--esp-type-tiny);
        color: var(
          --esp-form-item-error-color,
          oklch(from var(--esp-color-danger) var(--esp-l-ink) c h)
        );
        margin: var(--esp-size-tiny) 0;
        display: none;

        span {
          display: inline-block;
          padding: 0 0.45em;
          line-height: 2em;
          background-color: var(
            --esp-form-item-error-background,
            oklch(from var(--esp-color-danger) var(--esp-l-surface) c h)
          );
          color: var(
            --esp-form-item-error-color,
            oklch(from var(--esp-color-danger) var(--esp-l-ink) c h)
          );
        }
      }

      > .warning-message {
        font-size: var(--esp-type-tiny);
        color: var(
          --esp-form-item-warning-color,
          oklch(from var(--esp-color-warning) var(--esp-l-ink) c h)
        );
        margin: var(--esp-size-tiny) 0;
        display: none;

        span {
          display: inline-block;
          padding: 0 0.45em;
          line-height: 2em;
          background-color: var(
            --esp-form-item-warning-background,
            oklch(from var(--esp-color-warning) var(--esp-l-surface) c h)
          );
          color: var(
            --esp-form-item-warning-color,
            oklch(from var(--esp-color-warning) var(--esp-l-ink) c h)
          );
        }
      }

      &.has-error {
        ::slotted(*) {
          --esp-field-background: var(
            --esp-form-item-error-field-background,
            oklch(from var(--esp-color-danger) var(--esp-l-raised-2) c h)
          );
          --esp-field-border-color: var(
            --esp-form-item-error-field-border-color,
            oklch(from var(--esp-color-danger) var(--esp-l-border) c h)
          );
          --esp-field-text-color: var(
            --esp-form-item-error-field-text-color,
            var(
              --esp-form-item-error-color,
              oklch(from var(--esp-color-danger) var(--esp-l-ink) c h)
            )
          );
          --esp-field-focus-shadow: var(
            --esp-form-item-error-field-focus-shadow,
            var(--esp-color-shadow)
          );
        }

        > .error-message {
          display: block;
        }
      }

      &.has-warning {
        ::slotted(*) {
          --esp-field-background: var(
            --esp-form-item-warning-field-background,
            oklch(from var(--esp-color-warning) var(--esp-l-raised-2) c h)
          );
          --esp-field-border-color: var(
            --esp-form-item-warning-field-border-color,
            oklch(from var(--esp-color-warning) var(--esp-l-border) c h)
          );
          --esp-field-text-color: var(
            --esp-form-item-warning-field-text-color,
            var(--esp-color-text)
          );
          --esp-field-focus-shadow: var(
            --esp-form-item-warning-field-focus-shadow,
            var(--esp-color-shadow)
          );
        }

        > .warning-message {
          display: block;
        }
      }
    }
  `,n([a({type:String})],s.prototype,"label",void 0),n([a({type:Boolean,reflect:!0})],s.prototype,"autofocus",void 0),n([a({type:String})],s.prototype,"hint",void 0),n([a({attribute:"hint-placement",type:String})],s.prototype,"hintPlacement",void 0),n([a({type:String})],s.prototype,"error",null),n([a({type:String})],s.prototype,"warning",null),n([a({attribute:"field-name",type:String})],s.prototype,"fieldName",void 0),n([a({attribute:"error-pool",type:Array})],s.prototype,"errorPool",null),s=n([g("esp-form-item")],s);export{s as EspalierFormItem};
