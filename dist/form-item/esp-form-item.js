var l=function(c,e,t,i){var n=arguments.length,r=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,h;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(c,e,t,i);else for(var d=c.length-1;d>=0;d--)(h=c[d])&&(r=(n<3?h(r):n>3?h(e,t,r):h(e,t))||r);return n>3&&r&&Object.defineProperty(e,t,r),r};import{LitElement as H,css as w,html as p,nothing as m}from"lit";import{customElement as k,property as o}from"lit/decorators.js";import{classMap as N}from"lit/directives/class-map.js";import{createRef as F,ref as _}from"lit/directives/ref.js";import{VALIDITY_CHANGED_EVENT as g}from"../shared/validation.js";import"../help/esp-help-button.js";import{resolveHelpTarget as T}from"../help/help-document.js";import{describedByTokens as v,setDescribedByTokens as b}from"../shared/aria-describedby.js";let y=0;const a=new WeakMap,E=new WeakMap;let s=class extends H{constructor(){super(...arguments),this.fieldSlot=F(),this.fieldReconcileQueued=!1,this.pendingNativeError=null,this.pendingNativeErrorTimer=null,this.handleValidityChanged=e=>{const t=this.fieldElement;if(!t||!e.composedPath().includes(t))return;const i=e.detail;E.set(t,{valid:i.valid}),!(this._errorSource==="pool"&&this._error.length>0)&&(i.valid?this._errorSource==="native"&&this._setError("","manual"):this._setError(i.message,"native"))},this.handleFieldInvalid=e=>{if(e.preventDefault(),this._errorSource==="pool"&&this._error.length>0)return;const t=e.currentTarget;t===this.fieldElement&&"validationMessage"in t&&this._setError(t.validationMessage,"native")},this._errorSource="manual",this.label="",this.autofocus=!1,this.hint="",this.hintPlacement="below",this.hintId=`esp-form-item-hint-${++y}`,this.managedHintEl=null,this.managedHintMutationInProgress=!1,this.managedHintRecoveryQueued=!1,this.appliedHintTokens=[],this.hintContentObserver=new MutationObserver(()=>{this.syncFieldDescribedBy()}),this._error="",this._warning="",this.fieldName="",this.helpUrl="",this.helpTitleSource="field",this._errorPool=[],this.handleFieldSlotChange=()=>{this.fieldReconcileQueued||(this.fieldReconcileQueued=!0,queueMicrotask(()=>{this.fieldReconcileQueued=!1,this.isConnected&&this.reconcileFieldSlot()}))},this.handleHintSlotChange=()=>{if(!this.managedHintMutationInProgress){if(this.hint&&this.consumerHintElements().length===0&&this.managedHintEl&&this.managedHintEl.parentElement!==this){this.managedHintRecoveryQueued||(this.managedHintRecoveryQueued=!0,queueMicrotask(()=>{this.managedHintRecoveryQueued=!1,this.syncManagedHint(),this.observeConsumerHintContent(),this.requestUpdate(),this.syncFieldDescribedBy()}));return}this.syncManagedHint(),this.observeConsumerHintContent(),this.requestUpdate(),this.syncFieldDescribedBy()}}}get hasHint(){return!!this.hint||this.consumerHintElements().length>0}consumerHintElements(){return[...this.children].filter(e=>e.slot==="hint"&&!e.hasAttribute("data-esp-managed-hint"))}get error(){return this._error}set error(e){this._setError(e,"manual")}_setError(e,t){t!=="native"&&this.clearPendingNativeError();const i=this._error;this._error=e,this._errorSource=t,this.requestUpdate("error",i)}get warning(){return this._warning}set warning(e){const t=this._warning;this._warning=e,this.requestUpdate("warning",t)}get errorPool(){return this._errorPool}set errorPool(e){const t=this._errorPool;this._errorPool=e,this.requestUpdate("errorPool",t);const i=e.filter(n=>n.fieldName===this.fieldName);if(i.length===0){this._errorSource==="pool"&&this._setError("","pool");return}this._setError(i[0].errorMessage,"pool")}firstUpdated(){this.reconcileFieldSlot(),this.autofocus&&this.focus()}updated(e){super.updated(e),(e.has("hint")||e.has("hintPlacement"))&&(this.syncManagedHint(),this.syncFieldDescribedBy()),e.has("label")&&this.syncFieldLabel(),e.has("fieldName")&&this.syncFieldName()}reconcileFieldSlot(){const e=this.fieldSlot.value?.assignedElements()??[];if(e.length!==1||!(e[0]instanceof HTMLElement))throw(!this.fieldElement||!e.includes(this.fieldElement))&&this.unbindField(),new Error("esp-form-item requires exactly one slotted element.");this.bindField(e[0])}bindField(e){if(this.syncManagedHint(),this.fieldElement!==e||a.get(e)?.owner!==this){const i=a.get(e)?.owner;i&&i!==this&&i.unbindField(e),this.unbindField(),this.fieldElement=e,a.set(e,{owner:this,originalName:e.getAttribute("name"),appliedName:null});const n=this.pendingNativeError;if(this.clearPendingNativeError(),n?.field===e){const r=e;r.validate?.();const h=typeof r.checkValidity=="function",d=r.checkValidity?.(),u=e.validity?.valid,f=E.get(e);(h?d===!1:u!==void 0?u===!1:f===void 0||f.valid===!1)&&this._errorSource!=="native"&&this._setError(n.message,"native")}e.addEventListener("invalid",this.handleFieldInvalid)}this.syncFieldName(),this.syncFieldDescribedBy(),this.syncFieldLabel(),this.syncHelpPlacementTarget();const t=e.localName;t.includes("-")&&!window.customElements.get(t)&&window.customElements.whenDefined(t).then(()=>{this.fieldElement!==e||a.get(e)?.owner!==this||this.fieldSlot.value?.assignedElements()[0]!==e||(this.syncFieldDescribedBy(),this.syncFieldLabel())})}unbindField(e=this.fieldElement){if(!e)return;e.removeEventListener("invalid",this.handleFieldInvalid);const t=a.get(e);if(t?.owner===this&&(this.removeFieldDescription(e),e.setFormItemLabel?.(null),this.restoreFieldName(e,t),a.delete(e)),this.fieldElement===e){if(this._errorSource==="native"){const i={field:e,message:this._error};this._setError("","manual"),this.pendingNativeError=i,this.pendingNativeErrorTimer=setTimeout(()=>{this.pendingNativeError===i&&this.clearPendingNativeError()})}this.fieldElement=void 0,this.appliedHintTokens=[],this.syncHelpPlacementTarget()}}clearPendingNativeError(){this.pendingNativeErrorTimer!==null&&(clearTimeout(this.pendingNativeErrorTimer),this.pendingNativeErrorTimer=null),this.pendingNativeError=null}restoreFieldName(e,t){if(t.appliedName!==null){if(e.getAttribute("name")!==t.appliedName){t.appliedName=null;return}t.originalName===null?e.removeAttribute("name"):e.setAttribute("name",t.originalName),t.appliedName=null}}syncFieldName(){const e=this.fieldElement;if(!e)return;const t=a.get(e);if(t?.owner===this){if(!this.fieldName){this.restoreFieldName(e,t);return}t.appliedName!==null&&e.getAttribute("name")!==t.appliedName&&(t.appliedName=null),t.appliedName===null&&(t.originalName=e.getAttribute("name")),e.setAttribute("name",this.fieldName),t.appliedName=this.fieldName}}syncHelpPlacementTarget(){const e=this.shadowRoot?.querySelector("esp-help-button");e&&(e.placementTarget=this.fieldElement)}connectedCallback(){super.connectedCallback(),this.addEventListener(g,this.handleValidityChanged),this.observeConsumerHintContent(),this.hasUpdated&&this.handleFieldSlotChange()}disconnectedCallback(){this.removeEventListener(g,this.handleValidityChanged),this.unbindField(),this.hintContentObserver.disconnect(),super.disconnectedCallback()}observeConsumerHintContent(){this.hintContentObserver.disconnect();for(const e of this.consumerHintElements())this.hintContentObserver.observe(e,{attributes:!0,attributeFilter:["id"],characterData:!0,childList:!0,subtree:!0})}syncManagedHint(){if(!(!!this.hint&&this.consumerHintElements().length===0)){this.managedHintMutationInProgress=!0;try{this.managedHintEl?.remove()}finally{this.managedHintMutationInProgress=!1}this.managedHintEl=null;return}if(!this.managedHintEl){const t=document.createElement("span");t.slot="hint",t.id=this.hintId,t.toggleAttribute("data-esp-managed-hint",!0),this.managedHintEl=t}if(this.managedHintEl.parentElement!==this){this.managedHintMutationInProgress=!0;try{this.appendChild(this.managedHintEl)}finally{this.managedHintMutationInProgress=!1}}this.managedHintEl.textContent=this.hint}hintDescriptionIds(){return this.managedHintEl?[this.managedHintEl.id]:this.consumerHintElements().map(e=>(e.id||(e.id=`esp-form-item-hint-${++y}`),e.id))}hintDescriptionText(){if(!this.hasHint)return null;if(this.managedHintEl)return this.managedHintEl.textContent??"";const e=this.consumerHintElements();return e.length===0?this.hint:e.map(t=>t.textContent?.trim()??"").filter(Boolean).join(" ")}syncFieldDescribedBy(){const e=this.fieldElement;if(!e)return;const t=this.hasHint?this.hintDescriptionIds():[],n=v(e).filter(r=>!this.appliedHintTokens.includes(r));this.appliedHintTokens=t.filter(r=>!n.includes(r)),b(e,[...n,...t],{deduplicate:!0}),e.setFormItemDescription?.(this.hintDescriptionText())}removeFieldDescription(e){const t=v(e).filter(i=>!this.appliedHintTokens.includes(i));b(e,t,{deduplicate:!0}),this.appliedHintTokens=[],e.setFormItemDescription?.(null)}syncFieldLabel(){this.fieldElement?.setFormItemLabel?.(this.label.trim()||null)}focus(e){const t=this.fieldSlot.value?.assignedElements()??[];(t.length===1&&t[0]instanceof HTMLElement?t[0]:this.fieldElement)?.focus(e)}renderHint(){return p`
      <div class="hint" aria-hidden=${this.hintPlacement==="above"?"true":m}>
        <slot name="hint" @slotchange=${this.handleHintSlotChange}></slot>
      </div>
    `}render(){const e=T(this,{helpUrl:this.helpUrl,fallbackAnchor:this.fieldName}),t=!!e?.anchor,i={"form-item":!0,"has-hint":this.hasHint,"has-help":t,"hint-above":this.hasHint&&this.hintPlacement==="above","has-error":this.error.length>0,"has-warning":this.warning.length>0&&this.error.length===0};return p`
      <div class=${N(i)}>
        <div class="field-shell">
          <label
            @click=${n=>{this.focus(),n.stopPropagation()}}
          >
            <span class="field-label">${this.label}</span>
            ${this.hintPlacement==="above"?this.renderHint():m}
            <slot ${_(this.fieldSlot)} @slotchange=${this.handleFieldSlotChange}></slot>
          </label>
          ${e?.anchor?p`
                <esp-help-button
                  class="field-help"
                  help-url=${e.href}
                  label=${this.label?`Help for ${this.label}`:"Help for this field"}
                  .helpTitle=${this.helpTitleSource==="document"?"":this.label.trim()}
                  .placementTarget=${this.fieldElement}
                ></esp-help-button>
              `:m}
        </div>
        ${this.hintPlacement!=="above"?this.renderHint():m}
        <div class="error-message">
          <span>${this.error}</span>
        </div>
        <div class="warning-message">
          <span>${this.warning}</span>
        </div>
      </div>
    `}};s.styles=w`
    .form-item {
      font-family: var(
        --esp-form-item-font,
        var(--_esp-font-body-effective, var(--esp-font-body, system-ui, sans-serif))
      );
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
        font-size: var(--esp-type-label-font-size, var(--esp-type-normal));
        font-weight: var(--esp-type-label-font-weight, var(--esp-font-weight-headings));
        letter-spacing: var(--esp-type-label-letter-spacing, 0.01em);
        color: var(--esp-form-item-label-color, var(--esp-type-label-color, var(--esp-color-text)));
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
  `,l([o({type:String})],s.prototype,"label",void 0),l([o({type:Boolean,reflect:!0})],s.prototype,"autofocus",void 0),l([o({type:String})],s.prototype,"hint",void 0),l([o({attribute:"hint-placement",type:String})],s.prototype,"hintPlacement",void 0),l([o({type:String})],s.prototype,"error",null),l([o({type:String})],s.prototype,"warning",null),l([o({attribute:"field-name",type:String})],s.prototype,"fieldName",void 0),l([o({attribute:"help-url",type:String})],s.prototype,"helpUrl",void 0),l([o({attribute:"help-title-source",type:String})],s.prototype,"helpTitleSource",void 0),l([o({attribute:"error-pool",type:Array})],s.prototype,"errorPool",null),s=l([k("esp-form-item")],s);export{s as EspalierFormItem};
