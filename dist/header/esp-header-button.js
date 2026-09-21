var a=function(i,e,r,n){var s=arguments.length,o=s<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,r):n,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(i,e,r,n);else for(var d=i.length-1;d>=0;d--)(l=i[d])&&(o=(s<3?l(o):s>3?l(e,r,o):l(e,r))||o);return s>3&&o&&Object.defineProperty(e,r,o),o};import{LitElement as h,css as u,html as b,nothing as p}from"lit";import{customElement as v,eventOptions as m,property as c}from"lit/decorators.js";import{ref as f}from"lit/directives/ref.js";import{getIconHrefForHost as g}from"../shared/intent-values.js";import{SlottedIconController as S}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as x}from"../shared/svgs/render-sprite-icon.js";import{DocumentSpriteController as y}from"../shared/document-sprite.js";import{ESP_EVENTS as C}from"../shared/events.js";let t=class extends h{constructor(){super(),this.iconSlot=new S(this),this.ariaLabel=null,this.ariaControls=null,this.ariaExpanded=null,this.icon="",new y(this,{reactToSpriteChanges:!0})}handleClick(e){this.dispatchEvent(new CustomEvent(C.CLICKED,{detail:{},bubbles:!0,composed:!0}))}render(){const e=g(this.icon,this),r=this.iconSlot.hasSlottedIcon(":scope > *");return b`<button
      @click=${this.handleClick}
      aria-label=${this.ariaLabel??p}
      aria-controls=${this.ariaControls??p}
      aria-expanded=${this.ariaExpanded??p}
    >
      <slot ${f(this.iconSlot.slotRef)} @slotchange=${this.iconSlot.handleSlotChange}></slot>
      ${!r&&e?x(e):p}
    </button>`}};t.styles=u`
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
  `,a([c({attribute:"aria-label",type:String})],t.prototype,"ariaLabel",void 0),a([c({attribute:"aria-controls",type:String})],t.prototype,"ariaControls",void 0),a([c({attribute:"aria-expanded",type:String})],t.prototype,"ariaExpanded",void 0),a([c({type:String})],t.prototype,"icon",void 0),a([m({capture:!1,passive:!0})],t.prototype,"handleClick",null),t=a([v("esp-header-button")],t);export{t as EspalierHeaderButton};
