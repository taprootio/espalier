var l=function(o,t,e,n){var a=arguments.length,i=a<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,e):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(o,t,e,n);else for(var c=o.length-1;c>=0;c--)(r=o[c])&&(i=(a<3?r(i):a>3?r(t,e,i):r(t,e))||i);return a>3&&i&&Object.defineProperty(t,e,i),i};import{css as m,html as g,nothing as f}from"lit";import{customElement as y,property as h,state as u}from"lit/decorators.js";import{classMap as v}from"lit/directives/class-map.js";import{EspalierElementBase as p}from"../shared/esp-element-base.js";import{getIconHrefForHost as z}from"../shared/intent-values.js";import{syncNormalizedAttribute as S}from"../shared/attribute-helpers.js";import{SlottedIconController as b}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as E}from"../shared/svgs/render-sprite-icon.js";import{createRef as w,ref as d}from"lit/directives/ref.js";function x(o){return o==="large"?"large":"medium"}let s=class extends p{constructor(){super(...arguments),this.iconSlot=new b(this),this.actionSlot=w(),this.sizeBacker="medium",this.hasSlottedAction=!1,this.icon="",this.handleActionSlotChange=()=>{this.hasSlottedAction=(this.actionSlot.value?.assignedElements({flatten:!0}).length??0)>0}}get size(){return this.sizeBacker}set size(t){const e=this.sizeBacker;this.sizeBacker=x(t),this.requestUpdate("size",e),S(this,"size",this.sizeBacker)}render(){const t=z(this.icon,this),e=this.iconSlot.hasSlottedIcon(),n=e||t.length>0,a=this.hasSlottedAction||this.querySelector('[slot="action"]')!==null,i={"empty-state":!0,[`size-${this.size}`]:!0,"has-icon":n,"has-action":a};return g`
      <section part="empty-state" class=${v(i)}>
        <span part="icon" class="icon" aria-hidden="true">
          <slot
            name="icon"
            ${d(this.iconSlot.slotRef)}
            @slotchange=${this.iconSlot.handleSlotChange}
          ></slot>
          ${!e&&t?E(t):f}
        </span>
        <div part="heading" class="heading"><slot name="heading"></slot></div>
        <div part="body" class="body"><slot></slot></div>
        <div part="action" class="action">
          <slot
            name="action"
            ${d(this.actionSlot)}
            @slotchange=${this.handleActionSlotChange}
          ></slot>
        </div>
      </section>
    `}};s.styles=[...p.styles,m`
      :host {
        display: block;
        color: var(--esp-color-text);
        font-family: var(--esp-font-body);
      }

      .empty-state {
        display: grid;
        justify-items: center;
        align-content: center;
        text-align: center;
        max-width: 56ch;
        margin-inline: auto;
        gap: var(--esp-size-tiny);
      }

      .size-medium {
        padding: var(--esp-size-normal);
      }

      .size-large {
        min-height: min(34rem, 60vh);
        padding: var(--esp-size-large);
        gap: var(--esp-size-small);
      }

      .icon {
        display: none;
        width: var(--esp-size-large);
        height: var(--esp-size-large);
        color: var(--esp-color-headings);
      }

      .has-icon .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }

      .generated-icon,
      .icon ::slotted(svg) {
        width: 100%;
        height: 100%;
      }

      .size-large .icon {
        width: var(--esp-size-huge);
        height: var(--esp-size-huge);
      }

      .heading {
        color: var(--esp-color-text);
        font-family: var(--esp-font-headings);
        font-size: var(--esp-type-medium);
        font-weight: var(--esp-font-weight-headings);
        line-height: 1.2;
      }

      .size-large .heading {
        font-size: var(--esp-type-big);
      }

      .body {
        color: var(--esp-color-headings);
        font-size: var(--esp-size-font);
        line-height: 1.5;
      }

      .action {
        display: none;
        justify-content: center;
        margin-top: var(--esp-size-tiny);
      }

      .has-action .action {
        display: flex;
      }
    `],l([u()],s.prototype,"hasSlottedAction",void 0),l([h({type:String})],s.prototype,"icon",void 0),l([h({type:String,reflect:!0})],s.prototype,"size",null),s=l([y("esp-empty-state")],s);export{s as EspalierEmptyState};
