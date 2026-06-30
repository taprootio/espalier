var s=function(a,e,i,l){var c=arguments.length,o=c<3?e:l===null?l=Object.getOwnPropertyDescriptor(e,i):l,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(a,e,i,l);else for(var h=a.length-1;h>=0;h--)(n=a[h])&&(o=(c<3?n(o):c>3?n(e,i,o):n(e,i))||o);return c>3&&o&&Object.defineProperty(e,i,o),o};import{css as f,html as d}from"lit";import{customElement as v,property as r}from"lit/decorators.js";import{classMap as p}from"lit/directives/class-map.js";import{EspalierElementBase as u}from"../shared/esp-element-base.js";import{FormFieldController as b}from"../shared/form-field-controller.js";import{disabledControl as g,focusRing as m,srOnly as w}from"../shared/style-fragments.js";let t=class extends u{constructor(){super(...arguments),this.internals=this.attachInternals(),this.formCtrl=new b({host:this,internals:this.internals,getFormValue:()=>this.checked?this.value||"on":null,getValidity:()=>this.required&&!this.checked?{flags:{valueMissing:!0},message:this.requiredMessage||"Please toggle this switch to continue."}:null,onReset:()=>{this.checked=!1},onRestore:e=>{this.checked=e==="on"||e===this.value},onDisabled:e=>{this.disabled=e}}),this.mode="switch",this.offLabel="",this.onLabel="",this.checked=!1,this.value="",this.name="",this.required=!1,this.requiredMessage="",this.disabled=!1}focus(e){this.focusShadowElementAfterUpdate(".switch-control",e)}validate(){this.formCtrl.validate()}checkValidity(){return this.formCtrl.checkValidity()}toggle(){this.disabled||(this.checked=!this.checked,this.formCtrl.syncValue(),this.emitValueChanged({checked:this.checked,value:this.value}))}handleKeyDown(e){(e.key===" "||e.key==="Enter")&&(e.preventDefault(),this.toggle())}handleLabelSlotChange(){this.requestUpdate()}getCurrentTextModeLabel(){return(this.checked?this.onLabel:this.offLabel).trim()}getTextModeAriaLabel(){const e=this.textContent?.replace(/\s+/g," ").trim()??"",i=this.getCurrentTextModeLabel();return e&&i?`${e}: ${i}`:e||i}formResetCallback(){this.formCtrl.handleFormReset()}formStateRestoreCallback(e){this.formCtrl.handleFormStateRestore(e)}formDisabledCallback(e){this.formCtrl.handleFormDisabled(e)}render(){return this.mode==="text"?d`
        <div
          class="switch-control text-control"
          role="switch"
          aria-checked=${String(this.checked)}
          aria-disabled=${String(this.disabled)}
          aria-label=${this.getTextModeAriaLabel()}
          tabindex=${this.disabled?-1:0}
          @click=${this.toggle}
          @keydown=${this.handleKeyDown}
        >
          <span class=${p({"text-option":!0,active:!this.checked})} aria-hidden="true"
            >${this.offLabel}</span
          >
          <span class=${p({"text-option":!0,active:this.checked})} aria-hidden="true"
            >${this.onLabel}</span
          >
          <span class="sr-only" aria-hidden="true">
            <slot @slotchange=${this.handleLabelSlotChange}></slot>
          </span>
        </div>
      `:d`
      <div
        class="switch-control"
        role="switch"
        aria-checked=${String(this.checked)}
        aria-disabled=${String(this.disabled)}
        tabindex=${this.disabled?-1:0}
        @click=${this.toggle}
        @keydown=${this.handleKeyDown}
      >
        <div class="track">
          <div class="thumb"></div>
        </div>
        <span class="label"><slot></slot></span>
      </div>
    `}};t.formAssociated=!0,t.styles=[...u.styles,w,m(".switch-control:focus-visible","--esp-switch-focus-shadow"),m(".text-control:focus-visible","--esp-switch-focus-shadow"),g(".switch-control"),f`
      :host {
        display: block;
      }

      .switch-control {
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
        > .label {
          line-height: 1.3;
        }
      }

      .track {
        position: relative;
        width: var(--esp-switch-width, calc(var(--esp-size-normal-to-medium) * 1.75));
        height: var(--esp-switch-height, var(--esp-size-normal-to-medium));
        background: var(--esp-switch-track-color, var(--esp-color-border));
        border-radius: calc(var(--esp-switch-height, var(--esp-size-normal-to-medium)) / 2);
        transition: background-color 0.2s ease;
      }

      :host([checked]) .track {
        background: var(--esp-switch-track-color-on, var(--esp-color-action-background));
      }

      .thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: var(
          --esp-switch-thumb-size,
          calc(var(--esp-switch-height, var(--esp-size-normal-to-medium)) - 4px)
        );
        height: var(
          --esp-switch-thumb-size,
          calc(var(--esp-switch-height, var(--esp-size-normal-to-medium)) - 4px)
        );
        background: var(--esp-switch-thumb-color, var(--esp-color-layer-1));
        border-radius: 50%;
        transition: transform 0.2s ease;
        box-shadow: 0 1px 3px oklch(0 0 0 / 0.2);
      }

      :host([checked]) .thumb {
        transform: translateX(
          calc(
            var(--esp-switch-width, calc(var(--esp-size-normal-to-medium) * 1.75)) - var(
                --esp-switch-thumb-size,
                calc(var(--esp-switch-height, var(--esp-size-normal-to-medium)) - 4px)
              ) -
              4px
          )
        );
      }

      

      .text-control {
        display: inline-grid;
        grid-template-columns: 1fr 1fr;
        position: relative;
        background: var(--esp-switch-track-color, var(--esp-color-border));
        border-radius: calc(var(--esp-size-border-radius) + 2px);
        padding: 2px;
        gap: 0;
        font-family: var(--esp-font-body);
        font-size: var(--esp-switch-text-font-size, var(--esp-size-font));
        user-select: none;
        cursor: pointer;
        outline: none;

        &::before {
          content: "";
          position: absolute;
          top: 2px;
          left: 2px;
          width: calc(50% - 2px);
          height: calc(100% - 4px);
          background: var(--esp-switch-text-highlight-color, var(--esp-color-action-background));
          border-radius: var(--esp-size-border-radius);
          transition: transform 0.2s ease;
        }
      }

      :host([checked]) .text-control::before {
        transform: translateX(100%);
      }

      .text-option {
        position: relative;
        z-index: 1;
        padding: var(--esp-switch-text-padding, var(--esp-size-tiny) var(--esp-size-small));
        text-align: center;
        line-height: 1.3;
        color: var(--esp-switch-text-inactive-color, var(--esp-color-layer-1));
        transition: color 0.2s ease;
        white-space: nowrap;
      }

      .text-option.active {
        color: var(--esp-switch-text-active-color, var(--esp-color-action-text));
      }
    `],s([r({type:String,reflect:!0})],t.prototype,"mode",void 0),s([r({attribute:"off-label"})],t.prototype,"offLabel",void 0),s([r({attribute:"on-label"})],t.prototype,"onLabel",void 0),s([r({type:Boolean,reflect:!0})],t.prototype,"checked",void 0),s([r({type:String})],t.prototype,"value",void 0),s([r({type:String,reflect:!0})],t.prototype,"name",void 0),s([r({type:Boolean,reflect:!0})],t.prototype,"required",void 0),s([r({attribute:"required-message"})],t.prototype,"requiredMessage",void 0),s([r({type:Boolean,reflect:!0})],t.prototype,"disabled",void 0),t=s([v("esp-switch")],t);export{t as EspalierSwitch};
