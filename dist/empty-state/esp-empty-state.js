var l=function(s,e,t,n){var a=arguments.length,i=a<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,t):n,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(s,e,t,n);else for(var c=s.length-1;c>=0;c--)(r=s[c])&&(i=(a<3?r(i):a>3?r(e,t,i):r(e,t))||i);return a>3&&i&&Object.defineProperty(e,t,i),i};import{css as f,html as m,nothing as g}from"lit";import{customElement as v,property as h,state as y}from"lit/decorators.js";import{classMap as u}from"lit/directives/class-map.js";import{EspalierElementBase as p}from"../shared/esp-element-base.js";import{getIconHrefForHost as z}from"../shared/intent-values.js";import{syncNormalizedAttribute as S}from"../shared/attribute-helpers.js";import{SlottedIconController as b}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as E}from"../shared/svgs/render-sprite-icon.js";import{createRef as _,ref as d}from"lit/directives/ref.js";function w(s){return s==="large"?"large":"medium"}let o=class extends p{constructor(){super(...arguments),this.iconSlot=new b(this),this.actionSlot=_(),this.sizeBacker="medium",this.hasSlottedAction=!1,this.icon="",this.handleActionSlotChange=()=>{this.hasSlottedAction=(this.actionSlot.value?.assignedElements({flatten:!0}).length??0)>0}}get size(){return this.sizeBacker}set size(e){const t=this.sizeBacker;this.sizeBacker=w(e),this.requestUpdate("size",t),S(this,"size",this.sizeBacker)}render(){const e=z(this.icon,this),t=this.iconSlot.hasSlottedIcon(),n=t||e.length>0,a=this.hasSlottedAction||this.querySelector('[slot="action"]')!==null,i={"empty-state":!0,[`size-${this.size}`]:!0,"has-icon":n,"has-action":a};return m`
      <section part="empty-state" class=${u(i)}>
        <span part="icon" class="icon" aria-hidden="true">
          <slot
            name="icon"
            ${d(this.iconSlot.slotRef)}
            @slotchange=${this.iconSlot.handleSlotChange}
          ></slot>
          ${!t&&e?E(e):g}
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
    `}};o.styles=[...p.styles,f`
      :host {
        display: block;
        color: var(--esp-color-text);
        font-family: var(
          --_esp-font-body-effective,
          var(--esp-font-body, var(--_esp-font-body-fallback))
        );
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
        font-family: var(
          --_esp-font-headings-effective,
          var(
            --esp-font-headings,
            var(--_esp-font-body-effective, var(--esp-font-body, var(--_esp-font-body-fallback)))
          )
        );
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
    `],l([y()],o.prototype,"hasSlottedAction",void 0),l([h({type:String})],o.prototype,"icon",void 0),l([h({type:String,reflect:!0})],o.prototype,"size",null),o=l([v("esp-empty-state")],o);export{o as EspalierEmptyState};
