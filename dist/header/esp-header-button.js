var n=function(a,e,o,s){var l=arguments.length,t=l<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,o):s,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(a,e,o,s);else for(var c=a.length-1;c>=0;c--)(i=a[c])&&(t=(l<3?i(t):l>3?i(e,o,t):i(e,o))||t);return l>3&&t&&Object.defineProperty(e,o,t),t};import{LitElement as d,css as u,html as b,nothing as p}from"lit";import{customElement as v,eventOptions as m,property as h}from"lit/decorators.js";import{ref as f}from"lit/directives/ref.js";import{getIconHrefForHost as g}from"../shared/intent-values.js";import{SlottedIconController as y}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as S}from"../shared/svgs/render-sprite-icon.js";let r=class extends d{constructor(){super(...arguments),this.iconSlot=new y(this),this.ariaLabel=null,this.icon=""}handleClick(e){this.dispatchEvent(new CustomEvent("clicked",{detail:{},bubbles:!0,composed:!0}))}render(){const e=g(this.icon,this),o=this.iconSlot.hasSlottedIcon(":scope > *");return b`<button @click=${this.handleClick} aria-label=${this.ariaLabel??p}>
      <slot ${f(this.iconSlot.slotRef)} @slotchange=${this.iconSlot.handleSlotChange}></slot>
      ${!o&&e?S(e):p}
    </button>`}};r.styles=u`
    :host {
      position: relative;
      display: block;
      height: var(--esp-header-height, calc(4.5 * var(--esp-size-small)));
      overflow: hidden;
    }

    button {
      display: grid;
      background: var(--esp-header-button-background, var(--esp-color-layer-3));
      box-shadow: var(--esp-header-button-box-shadow, 0px 0px 3px 0px var(--esp-color-shadow));
      width: calc(0.85 * var(--esp-header-height, calc(4.5 * var(--esp-size-small))));
      height: var(--esp-header-height, calc(4.5 * var(--esp-size-small)));
      overflow: hidden;
      place-content: center;
      border: none;
      border-left: var(--esp-header-button-border-left, 1px dotted var(--esp-color-border));
      cursor: pointer;
      transition:
        background-color 0.5s ease,
        color 0.5s ease;
      color: var(--esp-header-button-color, var(--esp-color-text));

      .generated-icon,
      ::slotted(svg) {
        width: var(--esp-size-medium);
        height: var(--esp-size-medium);
      }

      &:hover {
        background: var(--esp-header-button-background-hover, var(--esp-color-layer-4));
      }
    }
  `,n([h({attribute:"aria-label",type:String})],r.prototype,"ariaLabel",void 0),n([h({type:String})],r.prototype,"icon",void 0),n([m({capture:!1,passive:!0})],r.prototype,"handleClick",null),r=n([v("esp-header-button")],r);export{r as EspalierHeaderButton};
