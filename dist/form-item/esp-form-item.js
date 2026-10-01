var l=function(m,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(m,e,t,i);else for(var d=m.length-1;d>=0;d--)(a=m[d])&&(s=(r<3?a(s):r>3?a(e,t,s):a(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};import{LitElement as H,css as F,html as u,nothing as c}from"lit";import{customElement as k,property as o}from"lit/decorators.js";import{classMap as C}from"lit/directives/class-map.js";import{createRef as N,ref as _}from"lit/directives/ref.js";import{VALIDITY_CHANGED_EVENT as v}from"../shared/validation.js";import"../help/esp-help-button.js";import{resolveHelpTarget as M}from"../help/help-document.js";import{describedByTokens as b,setDescribedByTokens as y}from"../shared/aria-describedby.js";import{srOnly as I}from"../shared/style-fragments.js";import{ESP_EVENTS as p}from"../shared/events.js";let E=0,T=0;const h=new WeakMap,w=new WeakMap;let n=class extends H{constructor(){super(...arguments),this.fieldSlot=N(),this.fieldReconcileQueued=!1,this.pendingNativeError=null,this.pendingNativeErrorTimer=null,this.handleValidityChanged=e=>{const t=this.fieldElement;if(!t||!e.composedPath().includes(t))return;const i=e.detail;w.set(t,{valid:i.valid}),!(this._errorSource==="pool"&&this._error.length>0)&&(i.valid?this._errorSource==="native"&&this._setError("","manual"):this._setError(i.message,"native"))},this.handleFieldValueChanged=e=>{const t=this.fieldElement;if(!t||e.target!==t)return;const i=this.errorAssignmentsAtChange!==this.errorAssignments;if(this.errorAssignmentsAtChange=-1,i)return;t.constructor.clearsFormItemErrorOnChange&&this._error&&this._errorSource!=="native"&&(this._setError("","manual"),t.validate?.())},this.errorAssignments=0,this.errorAssignmentsAtChange=-1,this.captureFieldValueChanged=e=>{e.target===this.fieldElement&&(this.errorAssignmentsAtChange=this.errorAssignments)},this.handleFieldInvalid=e=>{if(e.preventDefault(),this._errorSource==="pool"&&this._error.length>0)return;const t=e.currentTarget;t===this.fieldElement&&"validationMessage"in t&&this._setError(t.validationMessage,"native")},this._errorSource="manual",this.label="",this.autofocus=!1,this.hint="",this.hintPlacement="below",this.hintId=`esp-form-item-hint-${++E}`,this.managedHintEl=null,this.managedHintMutationInProgress=!1,this.managedHintRecoveryQueued=!1,this.appliedHintTokens=[],this.messageId=`esp-form-item-message-${++T}`,this.managedMessageEl=null,this.invalidField=null,this.announcement="",this.silentRestoreMessage=null,this.hintContentObserver=new MutationObserver(()=>{this.syncFieldDescribedBy()}),this._error="",this._warning="",this.fieldName="",this.helpUrl="",this.helpTitleSource="field",this._errorPool=[],this.handleFieldSlotChange=()=>{this.fieldReconcileQueued||(this.fieldReconcileQueued=!0,queueMicrotask(()=>{this.fieldReconcileQueued=!1,this.isConnected&&this.reconcileFieldSlot()}))},this.handleHintSlotChange=()=>{if(!this.managedHintMutationInProgress){if(this.hint&&this.consumerHintElements().length===0&&this.managedHintEl&&this.managedHintEl.parentElement!==this){this.managedHintRecoveryQueued||(this.managedHintRecoveryQueued=!0,queueMicrotask(()=>{this.managedHintRecoveryQueued=!1,this.syncManagedHint(),this.observeConsumerHintContent(),this.requestUpdate(),this.syncFieldDescribedBy()}));return}this.syncManagedHint(),this.observeConsumerHintContent(),this.requestUpdate(),this.syncFieldDescribedBy()}}}get hasHint(){return!!this.hint||this.consumerHintElements().length>0}consumerHintElements(){return[...this.children].filter(e=>e.slot==="hint"&&!e.hasAttribute("data-esp-managed-hint"))}get error(){return this._error}set error(e){e&&this.errorAssignments++,this._setError(e??"","manual")}_setError(e,t){t!=="native"&&this.clearPendingNativeError();const i=this._error;this._error=e,this._errorSource=t,this.requestUpdate("error",i)}get warning(){return this._warning}set warning(e){const t=this._warning;this._warning=e??"",this.requestUpdate("warning",t)}get errorPool(){return this._errorPool}set errorPool(e){const t=this._errorPool;this._errorPool=e,this.requestUpdate("errorPool",t);const i=e.filter(r=>r.fieldName===this.fieldName);if(i.length===0){this._errorSource==="pool"&&this._setError("","pool");return}this.errorAssignments++,this._setError(i[0].errorMessage,"pool")}firstUpdated(){this.reconcileFieldSlot(),this.autofocus&&this.focus()}willUpdate(e){if(super.willUpdate(e),this.label??="",e.has("error")){const t=e.get("error")??"",i=this.silentRestoreMessage!==null&&this.error===this.silentRestoreMessage;if(this.silentRestoreMessage=null,!this.error)this.announcement="";else if(this.error!==t&&!i){const r=this.label.trim();this.announcement=r?`${r}: ${this.error}`:this.error}}}updated(e){super.updated(e),(e.has("error")||e.has("warning"))&&(this.syncFieldDescribedBy(),this.syncFieldInvalid()),(e.has("hint")||e.has("hintPlacement"))&&(this.syncManagedHint(),this.syncFieldDescribedBy()),e.has("label")&&this.syncFieldLabel(),e.has("fieldName")&&this.syncFieldName()}reconcileFieldSlot(){const e=this.fieldSlot.value?.assignedElements()??[];if(e.length!==1||!(e[0]instanceof HTMLElement))throw(!this.fieldElement||!e.includes(this.fieldElement))&&this.unbindField(),new Error("esp-form-item requires exactly one slotted element.");this.bindField(e[0])}bindField(e){if(this.syncManagedHint(),this.fieldElement!==e||h.get(e)?.owner!==this){const i=h.get(e)?.owner;i&&i!==this&&i.unbindField(e),this.unbindField(),this.fieldElement=e,h.set(e,{owner:this,originalName:e.getAttribute("name"),appliedName:null});const r=this.pendingNativeError;if(this.clearPendingNativeError(),r?.field===e){const s=e;this.silentRestoreMessage=r.message,s.validate?.();const a=typeof s.checkValidity=="function",d=s.checkValidity?.(),g=e.validity?.valid,f=w.get(e);(a?d===!1:g!==void 0?g===!1:f===void 0||f.valid===!1)&&this._errorSource!=="native"&&this._setError(r.message,"native"),this._error!==r.message&&(this.silentRestoreMessage=null)}e.addEventListener("invalid",this.handleFieldInvalid)}this.syncFieldName(),this.syncFieldDescribedBy(),this.syncFieldLabel(),this.syncFieldInvalid(),this.syncHelpPlacementTarget();const t=e.localName;t.includes("-")&&!window.customElements.get(t)&&window.customElements.whenDefined(t).then(()=>{this.fieldElement!==e||h.get(e)?.owner!==this||this.fieldSlot.value?.assignedElements()[0]!==e||(this.syncFieldDescribedBy(),this.syncFieldLabel(),this.syncFieldInvalid())})}unbindField(e=this.fieldElement){if(!e)return;e.removeEventListener("invalid",this.handleFieldInvalid);const t=h.get(e);if(t?.owner===this&&(this.removeFieldDescription(e),this.removeFieldInvalid(e),e.setFormItemLabel?.(null),this.restoreFieldName(e,t),h.delete(e)),this.fieldElement===e){if(this._errorSource==="native"){const i={field:e,message:this._error};this._setError("","manual"),this.pendingNativeError=i,this.pendingNativeErrorTimer=setTimeout(()=>{this.pendingNativeError===i&&this.clearPendingNativeError()})}this.fieldElement=void 0,this.appliedHintTokens=[],this.syncHelpPlacementTarget()}}clearPendingNativeError(){this.pendingNativeErrorTimer!==null&&(clearTimeout(this.pendingNativeErrorTimer),this.pendingNativeErrorTimer=null),this.pendingNativeError=null}restoreFieldName(e,t){if(t.appliedName!==null){if(e.getAttribute("name")!==t.appliedName){t.appliedName=null;return}t.originalName===null?e.removeAttribute("name"):e.setAttribute("name",t.originalName),t.appliedName=null}}syncFieldName(){const e=this.fieldElement;if(!e)return;const t=h.get(e);if(t?.owner===this){if(!this.fieldName){this.restoreFieldName(e,t);return}t.appliedName!==null&&e.getAttribute("name")!==t.appliedName&&(t.appliedName=null),t.appliedName===null&&(t.originalName=e.getAttribute("name")),e.setAttribute("name",this.fieldName),t.appliedName=this.fieldName}}syncHelpPlacementTarget(){const e=this.shadowRoot?.querySelector("esp-help-button");e&&(e.placementTarget=this.fieldElement)}connectedCallback(){super.connectedCallback(),this.addEventListener(v,this.handleValidityChanged),this.addEventListener(p.VALUE_CHANGED,this.captureFieldValueChanged,!0),this.addEventListener(p.VALUE_CHANGED,this.handleFieldValueChanged),this.observeConsumerHintContent(),this.hasUpdated&&this.handleFieldSlotChange()}disconnectedCallback(){this.removeEventListener(v,this.handleValidityChanged),this.removeEventListener(p.VALUE_CHANGED,this.captureFieldValueChanged,!0),this.removeEventListener(p.VALUE_CHANGED,this.handleFieldValueChanged),this.unbindField(),this.hintContentObserver.disconnect(),super.disconnectedCallback()}observeConsumerHintContent(){this.hintContentObserver.disconnect();for(const e of this.consumerHintElements())this.hintContentObserver.observe(e,{attributes:!0,attributeFilter:["id"],characterData:!0,childList:!0,subtree:!0})}syncManagedHint(){if(!(!!this.hint&&this.consumerHintElements().length===0)){this.managedHintMutationInProgress=!0;try{this.managedHintEl?.remove()}finally{this.managedHintMutationInProgress=!1}this.managedHintEl=null;return}if(!this.managedHintEl){const t=document.createElement("span");t.slot="hint",t.id=this.hintId,t.toggleAttribute("data-esp-managed-hint",!0),this.managedHintEl=t}if(this.managedHintEl.parentElement!==this){this.managedHintMutationInProgress=!0;try{this.appendChild(this.managedHintEl)}finally{this.managedHintMutationInProgress=!1}}this.managedHintEl.textContent=this.hint}hintDescriptionIds(){return this.managedHintEl?[this.managedHintEl.id]:this.consumerHintElements().map(e=>(e.id||(e.id=`esp-form-item-hint-${++E}`),e.id))}hintDescriptionText(){if(!this.hasHint)return null;if(this.managedHintEl)return this.managedHintEl.textContent??"";const e=this.consumerHintElements();return e.length===0?this.hint:e.map(t=>t.textContent?.trim()??"").filter(Boolean).join(" ")}syncFieldDescribedBy(){const e=this.fieldElement;if(!e)return;const i=[...this.hasHint?this.hintDescriptionIds():[],...this.syncManagedMessage()],s=b(e).filter(a=>!this.appliedHintTokens.includes(a));this.appliedHintTokens=i.filter(a=>!s.includes(a)),y(e,[...s,...i],{deduplicate:!0}),e.setFormItemDescription?.(this.fieldDescriptionText())}get message(){return this.error||this.warning}fieldDescriptionText(){const e=[this.hintDescriptionText(),this.message].filter(t=>!!t);return e.length>0?e.join(" "):null}syncManagedMessage(){if(!this.message)return this.managedMessageEl?.remove(),this.managedMessageEl=null,[];if(!this.managedMessageEl){const e=document.createElement("span");e.id=this.messageId,e.slot="esp-form-item-message",e.hidden=!0,e.toggleAttribute("data-esp-managed-message",!0),this.managedMessageEl=e}return this.managedMessageEl.parentElement!==this&&this.appendChild(this.managedMessageEl),this.managedMessageEl.textContent=this.message,[this.messageId]}syncFieldInvalid(){const e=this.fieldElement;if(!e||h.get(e)?.owner!==this)return;const t=this.error.length>0,i=e;if(typeof i.setFormItemInvalid=="function"){this.invalidField===e&&(e.getAttribute("aria-invalid")==="true"&&e.removeAttribute("aria-invalid"),this.invalidField=null),i.setFormItemInvalid(t);return}t?this.invalidField!==e&&!e.hasAttribute("aria-invalid")&&(e.setAttribute("aria-invalid","true"),this.invalidField=e):this.removeFieldInvalid(e)}removeFieldInvalid(e){e.setFormItemInvalid?.(!1),this.invalidField===e&&(e.getAttribute("aria-invalid")==="true"&&e.removeAttribute("aria-invalid"),this.invalidField=null)}removeFieldDescription(e){const t=b(e).filter(i=>!this.appliedHintTokens.includes(i));y(e,t,{deduplicate:!0}),this.appliedHintTokens=[],e.setFormItemDescription?.(null)}syncFieldLabel(){this.fieldElement?.setFormItemLabel?.(this.label.trim()||null)}focus(e){const t=this.fieldSlot.value?.assignedElements()??[];(t.length===1&&t[0]instanceof HTMLElement?t[0]:this.fieldElement)?.focus(e)}renderHint(){return u`
      <div class="hint" aria-hidden=${this.hintPlacement==="above"?"true":c}>
        <slot name="hint" @slotchange=${this.handleHintSlotChange}></slot>
      </div>
    `}render(){const e=M(this,{helpUrl:this.helpUrl,fallbackAnchor:this.fieldName}),t=!!e?.anchor,i={"form-item":!0,"has-hint":this.hasHint,"has-help":t,"hint-above":this.hasHint&&this.hintPlacement==="above","has-error":this.error.length>0,"has-warning":this.warning.length>0&&this.error.length===0};return u`
      <div class=${C(i)}>
        <div class="field-shell">
          <label
            @click=${r=>{this.focus(),r.stopPropagation()}}
          >
            <span class="field-label">${this.label}</span>
            ${this.hintPlacement==="above"?this.renderHint():c}
            <slot ${_(this.fieldSlot)} @slotchange=${this.handleFieldSlotChange}></slot>
          </label>
          ${e?.anchor?u`
                <esp-help-button
                  class="field-help"
                  help-url=${e.href}
                  label=${this.label?`Help for ${this.label}`:"Help for this field"}
                  .helpTitle=${this.helpTitleSource==="document"?"":this.label.trim()}
                  .placementTarget=${this.fieldElement}
                ></esp-help-button>
              `:c}
        </div>
        ${this.hintPlacement!=="above"?this.renderHint():c}
        <div class="error-message">
          <span>${this.error}</span>
        </div>
        <div class="warning-message">
          <span>${this.warning}</span>
        </div>
      </div>
      <div class="sr-only" role="status">${this.announcement}</div>
      
      <slot class="sr-only" name="esp-form-item-message"></slot>
    `}};n.styles=F`
    ${I}

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
  `,l([o({type:String})],n.prototype,"label",void 0),l([o({type:Boolean,reflect:!0})],n.prototype,"autofocus",void 0),l([o({type:String})],n.prototype,"hint",void 0),l([o({attribute:"hint-placement",type:String})],n.prototype,"hintPlacement",void 0),l([o({type:String})],n.prototype,"error",null),l([o({type:String})],n.prototype,"warning",null),l([o({attribute:"field-name",type:String})],n.prototype,"fieldName",void 0),l([o({attribute:"help-url",type:String})],n.prototype,"helpUrl",void 0),l([o({attribute:"help-title-source",type:String})],n.prototype,"helpTitleSource",void 0),l([o({attribute:"error-pool",type:Array})],n.prototype,"errorPool",null),n=l([k("esp-form-item")],n);export{n as EspalierFormItem};
