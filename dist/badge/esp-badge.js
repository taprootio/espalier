var c=function(s,e,t,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(a=s[l])&&(i=(r<3?a(i):r>3?a(e,t,i):a(e,t))||i);return r>3&&i&&Object.defineProperty(e,t,i),i};import{css as d,html as h,nothing as m}from"lit";import{customElement as f,property as p}from"lit/decorators.js";import{classMap as g}from"lit/directives/class-map.js";import{ref as u}from"lit/directives/ref.js";import{EspalierElementBase as b}from"../shared/esp-element-base.js";import{EspalierIntentElementBase as v,intentSurfaceTokens as z}from"../shared/esp-intent-element-base.js";import{syncNormalizedAttribute as y}from"../shared/attribute-helpers.js";import{getIconHrefForHost as w}from"../shared/intent-values.js";import{SlottedIconController as S}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as _}from"../shared/svgs/render-sprite-icon.js";function x(s){return s==="medium"?"medium":"small"}let n=class extends v{constructor(){super(...arguments),this.iconSlot=new S(this),this.sizeBacker="small",this.icon=""}get size(){return this.sizeBacker}set size(e){const t=this.sizeBacker;this.sizeBacker=x(e),this.requestUpdate("size",t),y(this,"size",this.sizeBacker)}render(){const e=w(this.icon,this),t=this.iconSlot.hasSlottedIcon(),o=t||e.length>0,r={badge:!0,[`variant-${this.variant}`]:!0,[`size-${this.size}`]:!0,"has-icon":o};return h`
      <span part="badge" class=${g(r)}>
        <span part="icon" class="icon" aria-hidden="true">
          <slot
            name="icon"
            ${u(this.iconSlot.slotRef)}
            @slotchange=${this.iconSlot.handleSlotChange}
          ></slot>
          ${!t&&e?_(e):m}
        </span>
        <span part="label" class="label"><slot></slot></span>
      </span>
    `}};n.styles=[...b.styles,z,d`
      :host {
        display: inline-flex;
        max-width: 100%;
        vertical-align: middle;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        max-width: 100%;
        min-width: 0;
        --_esp-badge-background: var(--_esp-intent-background);
        --_esp-badge-border-color: var(--_esp-intent-border-color);
        --_esp-badge-color: var(--_esp-intent-color);
        border: 1px solid var(--_esp-badge-border-color);
        border-radius: var(--esp-badge-border-radius, 999px);
        background: var(--_esp-badge-background);
        color: var(--_esp-badge-color);
        font-family: var(--esp-font-body);
        font-weight: var(--esp-font-weight-headings);
        line-height: 1.2;
        white-space: nowrap;
      }

      .size-small {
        gap: calc(var(--esp-size-tiny) / 2);
        padding: calc(var(--esp-size-tiny) / 2) var(--esp-size-tiny);
        font-size: var(--esp-type-small);
      }

      .size-medium {
        gap: var(--esp-size-tiny);
        padding: var(--esp-size-tiny) var(--esp-size-small);
        font-size: var(--esp-size-font);
      }

      .icon {
        display: none;
        align-items: center;
        justify-content: center;
        flex: none;
        width: 1em;
        height: 1em;
      }

      .has-icon .icon {
        display: inline-flex;
      }

      .generated-icon,
      .icon ::slotted(svg) {
        width: 100%;
        height: 100%;
      }

      .label {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `],c([p({type:String})],n.prototype,"icon",void 0),c([p({type:String,reflect:!0})],n.prototype,"size",null),n=c([f("esp-badge")],n);export{n as EspalierBadge};
