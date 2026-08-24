var n=function(t,e,o,a){var l=arguments.length,i=l<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,o):a,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(t,e,o,a);else for(var h=t.length-1;h>=0;h--)(p=t[h])&&(i=(l<3?p(i):l>3?p(e,o,i):p(e,o))||i);return l>3&&i&&Object.defineProperty(e,o,i),i};import{css as v,html as s,nothing as f}from"lit";import{customElement as g,property as c,state as d}from"lit/decorators.js";import{classMap as b}from"lit/directives/class-map.js";import{createRef as y,ref as u}from"lit/directives/ref.js";import"../popover/esp-popover.js";import{EspalierElementBase as m}from"../shared/esp-element-base.js";import{intentSurfaceTokens as k}from"../shared/style-fragments.js";import{getIconHrefForHost as w}from"../shared/intent-values.js";import{SlottedIconController as x}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as $}from"../shared/svgs/render-sprite-icon.js";function P(t){return t==="bottom"||t==="left"||t==="right"?t:"top"}function B(t){return t==="outline"||t==="none"?t:"pill"}let S=0,r=class extends m{constructor(){super(...arguments),this.intentEmitsTokens=!1,this.popoverRef=y(),this.iconSlot=new x(this),this.placementBacker="top",this.chromeBacker="pill",this.descriptionId=`esp-status-indicator-${++S}`,this.open=!1,this.popoverPinned=!1,this.icon="",this.label="",this.handlePopoverOpened=()=>{this.open=!0},this.handlePopoverClosed=()=>{this.open=!1,this.popoverPinned=!1},this.handleClick=()=>{this.pinPopoverOpen()},this.handleKeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault(),this.pinPopoverOpen();return}e.key==="Escape"&&(e.preventDefault(),this.popoverRef.value?.closePopover())}}get placement(){return this.placementBacker}set placement(e){const o=this.placementBacker;this.placementBacker=P(e),this.requestUpdate("placement",o),this.syncPlacementAttribute()}get chrome(){return this.chromeBacker}set chrome(e){const o=this.chromeBacker;this.chromeBacker=B(e),this.requestUpdate("chrome",o),this.syncChromeAttribute()}get attach(){switch(this.placement){case"bottom":return"below";case"left":return"left";case"right":return"right";case"top":default:return"above"}}get accessibleLabel(){return this.label||`${this.intent} status`}syncPlacementAttribute(){const e=this.getAttribute("placement");e!==null&&e!==this.placementBacker&&this.setAttribute("placement",this.placementBacker)}syncChromeAttribute(){const e=this.getAttribute("chrome");e!==null&&e!==this.chromeBacker&&this.setAttribute("chrome",this.chromeBacker)}pinPopoverOpen(){this.popoverPinned=!0,this.popoverRef.value?.openPopover()}renderDefaultIcon(){switch(this.intent){case"success":return s`
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path d="M5 12l5 5l10 -10"></path>
          </svg>
        `;case"warning":return s`
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path d="M12 9v4"></path>
            <path d="M12 17h.01"></path>
            <path
              d="M10.3 4.3l-8.1 14a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7 -3l-8.1 -14a2 2 0 0 0 -3.4 0z"
            ></path>
          </svg>
        `;case"danger":return s`
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path d="M18 6l-12 12"></path>
            <path d="M6 6l12 12"></path>
          </svg>
        `;case"info":return s`
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path d="M12 8h.01"></path>
            <path d="M11 12h1v4h1"></path>
            <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18z"></path>
          </svg>
        `;case"neutral":default:return s`
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
            <path d="M12 12m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
            <path d="M12 3a9 9 0 1 0 0 18a9 9 0 0 0 0 -18z"></path>
          </svg>
        `}}renderIcon(){const e=w(this.icon,this),o=this.iconSlot.hasSlottedIcon();return s`<span class="indicator-icon" aria-hidden="true">
      <slot
        name="icon"
        ${u(this.iconSlot.slotRef)}
        @slotchange=${this.iconSlot.handleSlotChange}
      ></slot>
      ${o?f:e?$(e,{class:null}):this.renderDefaultIcon()}
    </span>`}render(){const e={indicator:!0,[`intent-${this.intent}`]:!0,[`chrome-${this.chrome}`]:!0};return s`
      <esp-popover
        ${u(this.popoverRef)}
        trigger=${this.popoverPinned?"none":"focus-hover"}
        attach=${this.attach}
        align="center"
        offset="4px"
        show-delay="0"
        hide-delay="100"
        @esp-popover-opened=${this.handlePopoverOpened}
        @esp-popover-closed=${this.handlePopoverClosed}
      >
        <button
          slot="target"
          type="button"
          class=${b(e)}
          aria-label=${this.accessibleLabel}
          aria-expanded=${String(this.open)}
          aria-describedby=${this.descriptionId}
          @click=${this.handleClick}
          @keydown=${this.handleKeydown}
        >
          ${this.renderIcon()}
        </button>
        <div slot="popover" id=${this.descriptionId} role="tooltip" class="status-popover">
          <slot></slot>
        </div>
      </esp-popover>
    `}};r.styles=[...m.styles,k,v`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      .indicator {
        display: inline-grid;
        place-items: center;
        width: var(--esp-status-indicator-width, var(--esp-size-normal-to-medium));
        height: var(
          --esp-status-indicator-height,
          var(--esp-status-indicator-width, var(--esp-size-normal-to-medium))
        );
        border: 1px solid var(--_esp-status-indicator-border-color);
        border-radius: var(--esp-status-indicator-border-radius, 999px);
        --_esp-status-indicator-background: var(--_esp-intent-background);
        --_esp-status-indicator-border-color: var(--_esp-intent-border-color);
        --_esp-status-indicator-color: var(--_esp-intent-color);
        background: var(--_esp-status-indicator-background);
        color: var(--_esp-status-indicator-color);
        cursor: help;
        padding: 0;
      }

      .chrome-outline {
        background: transparent;
      }

      .chrome-none {
        border: 0;
        background: transparent;
      }

      .indicator:focus-visible {
        outline: 2px solid var(--esp-color-link);
        outline-offset: 2px;
      }

      .indicator-icon {
        display: grid;
        place-items: center;
        width: 70%;
        height: 70%;
      }

      .chrome-none .indicator-icon {
        width: 100%;
        height: 100%;
      }

      .indicator svg {
        width: 70%;
        height: 70%;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .indicator-icon svg,
      .indicator-icon ::slotted(svg) {
        width: 100%;
        height: 100%;
      }

      
      .indicator-icon svg[fill="none"],
      .indicator-icon ::slotted(svg[fill="none"]) {
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }

      .status-popover {
        max-width: var(--esp-status-indicator-popover-max-width, 32ch);
        border: 1px solid var(--esp-color-border);
        border-radius: var(--esp-size-border-radius);
        background: var(--esp-color-layer-1);
        color: var(--esp-color-text);
        box-shadow: 2px 2px 4px var(--esp-color-shadow);
        padding: var(--esp-size-tiny) var(--esp-size-small);
        font-size: var(--esp-type-small);
        line-height: 1.4;
      }
    `],n([d()],r.prototype,"open",void 0),n([d()],r.prototype,"popoverPinned",void 0),n([c({type:String})],r.prototype,"icon",void 0),n([c({type:String})],r.prototype,"label",void 0),n([c({type:String,reflect:!0})],r.prototype,"placement",null),n([c({type:String,reflect:!0})],r.prototype,"chrome",null),r=n([g("esp-status-indicator")],r);export{r as EspalierStatusIndicator};
