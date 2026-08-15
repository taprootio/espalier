var o=function(h,e,t,r){var s=arguments.length,i=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(h,e,t,r);else for(var c=h.length-1;c>=0;c--)(a=h[c])&&(i=(s<3?a(i):s>3?a(e,t,i):a(e,t))||i);return s>3&&i&&Object.defineProperty(e,t,i),i};import{LitElement as f,css as u,html as p,nothing as d}from"lit";import{customElement as g,property as l}from"lit/decorators.js";import{classMap as v}from"lit/directives/class-map.js";import{createRef as b,ref as y}from"lit/directives/ref.js";import{VALIDITY_CHANGED_EVENT as w}from"../shared/validation.js";import"../help/esp-help-button.js";import{resolveHelpTarget as E}from"../help/help-document.js";let m=0,n=class extends f{constructor(){super(...arguments),this.fieldSlot=b(),this.theField={focus:()=>{}},this._errorSource="manual",this.label="",this.autofocus=!1,this.hint="",this.hintPlacement="below",this.hintId=`esp-form-item-hint-${++m}`,this.managedHintEl=null,this.appliedHintTokens=[],this.hintContentObserver=new MutationObserver(()=>{this.syncFieldDescribedBy()}),this._error="",this._warning="",this.fieldName="",this.helpUrl="",this.helpTitleSource="field",this._errorPool=[],this.handleHintSlotChange=()=>{this.syncManagedHint(),this.observeConsumerHintContent(),this.requestUpdate(),this.syncFieldDescribedBy()}}get hasHint(){return!!this.hint||this.consumerHintElements().length>0}consumerHintElements(){return[...this.children].filter(e=>e.slot==="hint"&&!e.hasAttribute("data-esp-managed-hint"))}get error(){return this._error}set error(e){this._setError(e,"manual")}_setError(e,t){const r=this._error;this._error=e,this._errorSource=t,this.requestUpdate("error",r)}get warning(){return this._warning}set warning(e){const t=this._warning;this._warning=e,this.requestUpdate("warning",t)}get errorPool(){return this._errorPool}set errorPool(e){const t=this._errorPool;this._errorPool=e,this.requestUpdate("errorPool",t);const r=e.filter(s=>s.fieldName===this.fieldName);if(r.length===0){this._errorSource==="pool"&&this._setError("","pool");return}this._setError(r[0].errorMessage,"pool")}firstUpdated(){if(this.fieldSlot.value?.assignedElements().length!=1)throw new Error("esp-form-item requires exactly one slotted element.");const e=this.fieldSlot.value?.assignedElements()[0];this.fieldElement=e instanceof HTMLElement?e:void 0,this.theField=e,this.fieldName&&this.theField.setAttribute("name",this.fieldName),this.syncFieldDescribedBy(),this.syncFieldLabel();const t=e instanceof Element?e.localName:"";t.includes("-")&&!window.customElements.get(t)&&window.customElements.whenDefined(t).then(()=>{this.fieldSlot.value?.assignedElements()[0]===e&&(this.syncFieldDescribedBy(),this.syncFieldLabel())}),this.autofocus&&this.focus();const r=this.shadowRoot?.querySelector("esp-help-button");r&&(r.placementTarget=this.fieldElement),this.addEventListener(w,i=>{const a=i.detail;this._errorSource==="pool"&&this._error.length>0||(a.valid?this._errorSource==="native"&&this._setError("","manual"):this._setError(a.message,"native"))});const s=this.theField;s.addEventListener("invalid",i=>{i.preventDefault(),!(this._errorSource==="pool"&&this._error.length>0)&&"validationMessage"in s&&this._setError(s.validationMessage,"native")})}updated(e){if(super.updated(e),(e.has("hint")||e.has("hintPlacement"))&&(this.syncManagedHint(),this.syncFieldDescribedBy()),e.has("label")&&this.syncFieldLabel(),!e.has("fieldName"))return;const t=this.theField;t instanceof Element&&(this.fieldName?t.setAttribute("name",this.fieldName):t.removeAttribute("name"))}connectedCallback(){super.connectedCallback(),this.observeConsumerHintContent()}disconnectedCallback(){this.hintContentObserver.disconnect(),super.disconnectedCallback()}observeConsumerHintContent(){this.hintContentObserver.disconnect();for(const e of this.consumerHintElements())this.hintContentObserver.observe(e,{attributes:!0,attributeFilter:["id"],characterData:!0,childList:!0,subtree:!0})}syncManagedHint(){if(!(!!this.hint&&this.consumerHintElements().length===0)){this.managedHintEl?.remove(),this.managedHintEl=null;return}if(!this.managedHintEl){const t=document.createElement("span");t.slot="hint",t.id=this.hintId,t.toggleAttribute("data-esp-managed-hint",!0),this.managedHintEl=t,this.appendChild(t)}this.managedHintEl.textContent=this.hint}hintDescriptionIds(){return this.managedHintEl?[this.managedHintEl.id]:this.consumerHintElements().map(e=>(e.id||(e.id=`esp-form-item-hint-${++m}`),e.id))}hintDescriptionText(){if(!this.hasHint)return null;if(this.managedHintEl)return this.managedHintEl.textContent??"";const e=this.consumerHintElements();return e.length===0?this.hint:e.map(t=>t.textContent?.trim()??"").filter(Boolean).join(" ")}syncFieldDescribedBy(){const e=this.fieldSlot.value?.assignedElements()[0];if(!e)return;const t=this.hasHint?this.hintDescriptionIds():[],r=(e.getAttribute("aria-describedby")??"").split(/\s+/).filter(i=>i&&!this.appliedHintTokens.includes(i)&&!t.includes(i));this.appliedHintTokens=t;const s=[...r,...t];s.length>0?e.setAttribute("aria-describedby",s.join(" ")):e.removeAttribute("aria-describedby"),e.setFormItemDescription?.(this.hintDescriptionText())}syncFieldLabel(){this.fieldSlot.value?.assignedElements()[0]?.setFormItemLabel?.(this.label.trim()||null)}focus(e){(this.fieldSlot.value?.assignedElements()[0]??this.theField).focus(e)}renderHint(){return p`
      <div class="hint" aria-hidden=${this.hintPlacement==="above"?"true":d}>
        <slot name="hint" @slotchange=${this.handleHintSlotChange}></slot>
      </div>
    `}render(){const e=E(this,{helpUrl:this.helpUrl,fallbackAnchor:this.fieldName}),t=!!e?.anchor,r={"form-item":!0,"has-hint":this.hasHint,"has-help":t,"hint-above":this.hasHint&&this.hintPlacement==="above","has-error":this.error.length>0,"has-warning":this.warning.length>0&&this.error.length===0};return p`
      <div class=${v(r)}>
        <div class="field-shell">
          <label
            @click=${s=>{this.focus(),s.stopPropagation()}}
          >
            <span class="field-label">${this.label}</span>
            ${this.hintPlacement==="above"?this.renderHint():d}
            <slot ${y(this.fieldSlot)}></slot>
          </label>
          ${e?.anchor?p`
                <esp-help-button
                  class="field-help"
                  help-url=${e.href}
                  label=${this.label?`Help for ${this.label}`:"Help for this field"}
                  .helpTitle=${this.helpTitleSource==="document"?"":this.label.trim()}
                  .placementTarget=${this.fieldElement}
                ></esp-help-button>
              `:d}
        </div>
        ${this.hintPlacement!=="above"?this.renderHint():d}
        <div class="error-message">
          <span>${this.error}</span>
        </div>
        <div class="warning-message">
          <span>${this.warning}</span>
        </div>
      </div>
    `}};n.styles=u`
    .form-item {
      font-family: var(--esp-form-item-font, var(--esp-font-body));
      font-size: var(--esp-form-item-font-size, var(--esp-size-font));
      display: grid;
      grid-auto-rows: min-content;

      > .field-shell {
        align-items: center;
        column-gap: var(--esp-size-tiny);
        display: grid;
        grid-template-columns: max-content min-content minmax(0, 1fr);
      }

      > .field-shell > label {
        display: contents;
      }

      > .field-shell > label > .field-label {
        grid-column: 1;
        grid-row: 1;
        font-weight: bold;
        color: var(--esp-form-item-label-color, var(--esp-color-text));
      }

      > .field-shell > label > slot,
      > .field-shell > label > slot::slotted(*) {
        grid-column: 1 / -1;
        grid-row: 2;
      }

      .field-help {
        grid-column: 2;
        grid-row: 1;
      }

      &.hint-above > .field-shell > label > .hint {
        grid-column: 1 / -1;
        grid-row: 2;
      }

      &.hint-above > .field-shell > label > slot,
      &.hint-above > .field-shell > label > slot::slotted(*) {
        grid-row: 3;
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
  `,o([l({type:String})],n.prototype,"label",void 0),o([l({type:Boolean,reflect:!0})],n.prototype,"autofocus",void 0),o([l({type:String})],n.prototype,"hint",void 0),o([l({attribute:"hint-placement",type:String})],n.prototype,"hintPlacement",void 0),o([l({type:String})],n.prototype,"error",null),o([l({type:String})],n.prototype,"warning",null),o([l({attribute:"field-name",type:String})],n.prototype,"fieldName",void 0),o([l({attribute:"help-url",type:String})],n.prototype,"helpUrl",void 0),o([l({attribute:"help-title-source",type:String})],n.prototype,"helpTitleSource",void 0),o([l({attribute:"error-pool",type:Array})],n.prototype,"errorPool",null),n=o([g("esp-form-item")],n);export{n as EspalierFormItem};
