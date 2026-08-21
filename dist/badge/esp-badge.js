var c=function(s,e,t,o){var n=arguments.length,i=n<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(s,e,t,o);else for(var l=s.length-1;l>=0;l--)(a=s[l])&&(i=(n<3?a(i):n>3?a(e,t,i):a(e,t))||i);return n>3&&i&&Object.defineProperty(e,t,i),i};import{css as h,html as m,nothing as f}from"lit";import{customElement as g,property as p}from"lit/decorators.js";import{classMap as u}from"lit/directives/class-map.js";import{ref as b}from"lit/directives/ref.js";import{EspalierElementBase as d}from"../shared/esp-element-base.js";import{intentSurfaceTokens as z}from"../shared/style-fragments.js";import{syncNormalizedAttribute as v}from"../shared/attribute-helpers.js";import{getIconHrefForHost as y}from"../shared/intent-values.js";import{SlottedIconController as w}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as S}from"../shared/svgs/render-sprite-icon.js";function _(s){return s==="medium"?"medium":"small"}let r=class extends d{constructor(){super(...arguments),this.intentEmitsTokens=!1,this.iconSlot=new w(this),this.sizeBacker="small",this.icon=""}get size(){return this.sizeBacker}set size(e){const t=this.sizeBacker;this.sizeBacker=_(e),this.requestUpdate("size",t),v(this,"size",this.sizeBacker)}render(){const e=y(this.icon,this),t=this.iconSlot.hasSlottedIcon(),o=t||e.length>0,n={badge:!0,[`intent-${this.intent}`]:!0,[`size-${this.size}`]:!0,"has-icon":o};return m`
      <span part="badge" class=${u(n)}>
        <span part="icon" class="icon" aria-hidden="true">
          <slot
            name="icon"
            ${b(this.iconSlot.slotRef)}
            @slotchange=${this.iconSlot.handleSlotChange}
          ></slot>
          ${!t&&e?S(e):f}
        </span>
        <span part="label" class="label"><slot></slot></span>
      </span>
    `}};r.styles=[...d.styles,z,h`
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
    `],c([p({type:String})],r.prototype,"icon",void 0),c([p({type:String,reflect:!0})],r.prototype,"size",null),r=c([g("esp-badge")],r);export{r as EspalierBadge};
