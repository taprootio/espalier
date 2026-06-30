var s=function(r,i,t,n){var a=arguments.length,e=a<3?i:n===null?n=Object.getOwnPropertyDescriptor(i,t):n,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(r,i,t,n);else for(var p=r.length-1;p>=0;p--)(c=r[p])&&(e=(a<3?c(e):a>3?c(i,t,e):c(i,t))||e);return a>3&&e&&Object.defineProperty(i,t,e),e};import{css as h,html as m,nothing as u}from"lit";import{customElement as f,property as l}from"lit/decorators.js";import{classMap as g}from"lit/directives/class-map.js";import{ref as v}from"lit/directives/ref.js";import{EspalierElementBase as d}from"../shared/esp-element-base.js";import{getIconHrefForHost as b}from"../shared/intent-values.js";import{SlottedIconController as y}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as P}from"../shared/svgs/render-sprite-icon.js";let o=class extends d{constructor(){super(...arguments),this.iconSlot=new y(this),this.iconPositionExplicit=!1,this.inheritingIconPosition=!1,this._iconPosition="left",this.icon="",this.value="",this.disabled=!1,this.handleClick=i=>{if(this.disabled){i.preventDefault();return}this.activate()}}get iconPosition(){return this._iconPosition}set iconPosition(i){const t=this._iconPosition;this._iconPosition=i,this.inheritingIconPosition||(this.iconPositionExplicit=!0),this.requestUpdate("iconPosition",t)}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this.handleClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this.handleClick)}updated(){this.setAttribute("role","menuitem"),this.setAttribute("aria-disabled",String(this.disabled))}activate(){this.disabled||this.dispatchEvent(new CustomEvent("esp-action-menu-item-activate",{detail:{item:this},bubbles:!0,composed:!0}))}inheritIconPosition(i){this.iconPositionExplicit||(this.inheritingIconPosition=!0,this.iconPosition=i,this.inheritingIconPosition=!1)}render(){const i=b(this.icon,this),t=this.iconSlot.hasSlottedIcon(),n={item:!0,"has-icon":t||i.length>0,"icon-right":this.iconPosition==="right"};return m`
      <span part="item" class=${g(n)}>
        <span part="icon" class="icon">
          <slot
            name="icon"
            ${v(this.iconSlot.slotRef)}
            @slotchange=${this.iconSlot.handleSlotChange}
          ></slot>
          ${!t&&i?P(i):u}
        </span>
        <span part="label" class="label"><slot></slot></span>
      </span>
    `}};o.styles=[...d.styles,h`
      :host {
        display: block;
        color: var(--esp-color-text);
        cursor: pointer;
        outline: none;
      }

      :host([disabled]) {
        cursor: not-allowed;
        opacity: 0.55;
      }

      .item {
        display: grid;
        grid-template-columns: 1fr;
        align-items: center;
        min-width: max-content;
        font-family: var(--esp-font-body);
        font-size: var(--esp-size-font);
        font-weight: bold;
        line-height: 1.3;
        padding: var(--esp-action-menu-item-padding, var(--esp-size-tiny) var(--esp-size-small));
      }

      .item.has-icon {
        grid-template-columns: min-content 1fr;
        gap: var(--esp-action-menu-item-gap, var(--esp-size-tiny));
      }

      .item.has-icon.icon-right {
        grid-template-columns: 1fr min-content;
        gap: 0;
        padding: 0;
      }

      .icon {
        display: none;
        align-items: center;
        justify-content: center;
        color: var(--esp-color-headings);
      }

      .has-icon .icon {
        display: inline-flex;
      }

      .icon-right .icon {
        grid-column: 2;
        grid-row: 1;
        align-self: stretch;
        background: var(--esp-action-menu-item-icon-background, var(--esp-color-layer-2));
        border-left: 1px dotted
          var(--esp-action-menu-item-icon-border-color, var(--esp-color-border));
        padding: var(--esp-action-menu-item-padding, var(--esp-size-tiny) var(--esp-size-small));
      }

      .icon-right .label {
        grid-column: 1;
        grid-row: 1;
        padding: var(--esp-action-menu-item-padding, var(--esp-size-tiny) var(--esp-size-small));
      }

      .generated-icon,
      ::slotted(svg) {
        width: calc(1 * var(--esp-size-font));
        height: calc(1 * var(--esp-size-font));
      }

      :host(:not([disabled]):hover) .item,
      :host(:not([disabled]):focus-visible) .item {
        background: var(--esp-action-menu-item-hover-background, var(--esp-color-layer-2));
      }

      :host(:not([disabled]):hover) .icon-right .icon,
      :host(:not([disabled]):focus-visible) .icon-right .icon {
        background: var(--esp-action-menu-item-icon-hover-background, var(--esp-color-layer-3));
      }

      :host(:not([disabled]):focus-visible) .item {
        box-shadow: var(--esp-action-menu-item-focus-shadow, 0 0 0 2px var(--esp-color-link));
      }
    `],s([l({type:String})],o.prototype,"icon",void 0),s([l({type:String})],o.prototype,"value",void 0),s([l({type:Boolean,reflect:!0})],o.prototype,"disabled",void 0),s([l({attribute:"icon-position",type:String,reflect:!0})],o.prototype,"iconPosition",null),o=s([f("esp-action-menu-item")],o);export{o as EspalierActionMenuItem};
