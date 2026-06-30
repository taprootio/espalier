var i=function(n,r,e,o){var l=arguments.length,s=l<3?r:o===null?o=Object.getOwnPropertyDescriptor(r,e):o,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,r,e,o);else for(var c=n.length-1;c>=0;c--)(p=n[c])&&(s=(l<3?p(s):l>3?p(r,e,s):p(r,e))||s);return l>3&&s&&Object.defineProperty(r,e,s),s};import{LitElement as f,css as d,html as h}from"lit";import{customElement as m,property as a}from"lit/decorators.js";import{classMap as g}from"lit/directives/class-map.js";import{createRef as v,ref as u}from"lit/directives/ref.js";import{VALIDITY_CHANGED_EVENT as w}from"../shared/validation.js";let t=class extends f{constructor(){super(...arguments),this.fieldSlot=v(),this.theField={focus:()=>{}},this._errorSource="manual",this.label="",this.autofocus=!1,this._error="",this._warning="",this.fieldName="",this._errorPool=[]}get error(){return this._error}set error(r){this._setError(r,"manual")}_setError(r,e){const o=this._error;this._error=r,this._errorSource=e,this.requestUpdate("error",o)}get warning(){return this._warning}set warning(r){const e=this._warning;this._warning=r,this.requestUpdate("warning",e)}get errorPool(){return this._errorPool}set errorPool(r){const e=this._errorPool;this._errorPool=r,this.requestUpdate("errorPool",e);const o=r.filter(l=>l.fieldName===this.fieldName);if(o.length===0){this._errorSource==="pool"&&this._setError("","pool");return}this._setError(o[0].errorMessage,"pool")}firstUpdated(){if(this.fieldSlot.value?.assignedElements().length!=1)throw new Error("esp-form-item requires exactly one slotted element.");this.theField=this.fieldSlot.value?.assignedElements()[0],this.fieldName&&this.theField.setAttribute("name",this.fieldName),this.autofocus&&this.focus(),this.addEventListener(w,e=>{const o=e.detail;this._errorSource==="pool"&&this._error.length>0||(o.valid?this._errorSource==="native"&&this._setError("","manual"):this._setError(o.message,"native"))});const r=this.theField;r.addEventListener("invalid",e=>{e.preventDefault(),!(this._errorSource==="pool"&&this._error.length>0)&&"validationMessage"in r&&this._setError(r.validationMessage,"native")})}updated(r){if(super.updated(r),!r.has("fieldName"))return;const e=this.theField;e instanceof Element&&(this.fieldName?e.setAttribute("name",this.fieldName):e.removeAttribute("name"))}focus(r){(this.fieldSlot.value?.assignedElements()[0]??this.theField).focus(r)}render(){const r={"form-item":!0,"has-error":this.error.length>0,"has-warning":this.warning.length>0&&this.error.length===0};return h`
      <div class=${g(r)}>
        <label
          @click=${e=>{this.focus(),e.stopPropagation()}}
        >
          ${this.label}
          <slot ${u(this.fieldSlot)}></slot>
        </label>
        <div class="error-message">
          <span>${this.error}</span>
        </div>
        <div class="warning-message">
          <span>${this.warning}</span>
        </div>
      </div>
    `}};t.styles=d`
    .form-item {
      font-family: var(--esp-form-item-font, var(--esp-font-body));
      font-size: var(--esp-form-item-font-size, var(--esp-size-font));
      display: grid;
      grid-auto-rows: min-content;

      > label {
        font-weight: bold;
        color: var(--esp-form-item-label-color, var(--esp-color-text));
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
  `,i([a({type:String})],t.prototype,"label",void 0),i([a({type:Boolean,reflect:!0})],t.prototype,"autofocus",void 0),i([a({type:String})],t.prototype,"error",null),i([a({type:String})],t.prototype,"warning",null),i([a({attribute:"field-name",type:String})],t.prototype,"fieldName",void 0),i([a({attribute:"error-pool",type:Array})],t.prototype,"errorPool",null),t=i([m("esp-form-item")],t);export{t as EspalierFormItem};
