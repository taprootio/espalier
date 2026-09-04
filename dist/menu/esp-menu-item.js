var n=function(p,e,r,a){var s=arguments.length,t=s<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,r):a,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(p,e,r,a);else for(var d=p.length-1;d>=0;d--)(i=p[d])&&(t=(s<3?i(t):s>3?i(e,r,t):i(e,r))||t);return s>3&&t&&Object.defineProperty(e,r,t),t};import{css as u,html as c,nothing as h}from"lit";import{customElement as v,property as l,state as f}from"lit/decorators.js";import{classMap as b}from"lit/directives/class-map.js";import{ref as g}from"lit/directives/ref.js";import{getIconHrefForHost as y}from"../shared/intent-values.js";import{EspalierElementBase as m}from"../shared/esp-element-base.js";import{ESP_EVENTS as k}from"../shared/events.js";import{pathsMatch as w}from"../shared/path-matching.js";import{SlottedIconController as z}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as x}from"../shared/svgs/render-sprite-icon.js";let o=class extends m{constructor(){super(...arguments),this.iconSlot=new z(this),this.label="",this.url="",this.icon="",this.mode="vertical",this.depth=0,this.touchDevice=!1,this.active=!1}connectedCallback(){super.connectedCallback(),this.checkActive()}updated(e){super.updated(e),e.has("url")&&this.checkActive()}checkActive(){if(!this.url){this.active=!1;return}this.active=w(this.url)}handleButtonClick(){this.dispatchEvent(new CustomEvent(k.CLICKED,{detail:{},bubbles:!0,composed:!0}))}render(){const e=y(this.icon,this),r=this.iconSlot.hasSlottedIcon(":scope > *"),a=r||e.length>0,s={item:!0,"is-horizontal":this.mode==="horizontal"&&this.depth===0,"is-vertical":this.mode!=="horizontal"||this.depth>0,"is-drawer":this.mode==="drawer","is-nested":this.depth>0,"has-icon":a,"is-active":this.active},t=c`<span part="menu-text">${this.label}</span>`,i=c`<span class="icon-area" aria-hidden=${a?"true":h}>
      <slot ${g(this.iconSlot.slotRef)} @slotchange=${this.iconSlot.handleSlotChange}></slot>
      ${!r&&e?x(e):h}
    </span>`;return c`<div class=${b(s)}>
      ${this.active?c`<span class="current-page" aria-current="page">${t}${i}</span>`:this.url?c`<a href=${this.url}>${t}${i}</a>`:c`<button type="button" @click=${this.handleButtonClick}>${t}${i}</button>`}
    </div>`}};o.styles=[...m.styles,u`
      :host {
        display: block;
      }

      .item {
        color: var(--esp-menu-item-color, var(--esp-color-text));
        background-color: var(--esp-menu-item-background, transparent);
        
        font-family: var(
          --esp-menu-item-font-family,
          var(
            --_esp-font-menu-effective,
            var(
              --esp-font-menu,
              var(--_esp-font-body-effective, var(--esp-font-body, var(--_esp-font-body-fallback)))
            )
          )
        );
        font-size: var(--esp-menu-item-font-size, inherit);
        white-space: nowrap;
      }

      a,
      button,
      .current-page {
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        width: 100%;
        gap: var(--esp-size-tiny);
        border: none;
        padding: 0;
        color: inherit;
        background: none;
        font: inherit;
        text-align: left;
        text-decoration: none;
      }

      a,
      button {
        cursor: pointer;
      }

      .current-page {
        cursor: default;
      }

      
      a,
      button,
      .current-page,
      .item {
        transition:
          color var(--esp-menu-item-transition-duration, 0.2s) ease,
          background-color var(--esp-menu-item-transition-duration, 0.2s) ease,
          box-shadow var(--esp-menu-item-transition-duration, 0.2s) ease;
      }

      a:hover {
        background: var(--esp-menu-item-hover-background, var(--esp-color-link-hover-bg));
        color: var(--esp-menu-item-hover-color, var(--esp-color-link-hover));
        
        text-decoration: var(--esp-menu-item-hover-decoration, none);
      }

      a:focus-visible,
      button:focus-visible {
        outline: 2px solid var(--esp-color-link);
        outline-offset: -2px;
      }

      [part="menu-text"] {
        display: flex;
        align-items: center;
        min-width: 0;
        padding: var(--esp-menu-item-padding, var(--esp-size-small) var(--esp-size-padding));
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .is-horizontal > a,
      .is-horizontal > button,
      .is-horizontal > .current-page {
        justify-content: center;
        height: var(--esp-header-height, calc(4.5 * var(--esp-size-small)));
        font-weight: var(--esp-menu-item-font-weight, var(--esp-font-weight-menu, 700));
      }

      .is-horizontal > a:hover,
      .is-horizontal > button:hover {
        background: var(--esp-menu-item-hover-background, transparent);
        box-shadow: inset 0 -2px 0
          var(
            --esp-menu-item-hover-indicator-color,
            var(--esp-menu-item-hover-color, var(--esp-color-headings-hover))
          );
      }

      .is-horizontal [part="menu-text"] {
        padding-inline: var(--esp-menu-item-padding, var(--esp-size-padding));
      }

      .is-vertical {
        border-right: 1px solid var(--esp-menu-item-border-color, var(--esp-color-border));
        border-bottom: 1px solid var(--esp-menu-item-border-color, var(--esp-color-border));
        background-color: var(--esp-menu-item-background, var(--esp-color-layer-1));
      }

      .is-vertical:hover,
      .is-vertical:focus-within {
        color: var(--esp-menu-item-hover-color, var(--esp-color-headings-hover));
        background-color: var(--esp-menu-item-hover-background, var(--esp-color-layer-2));
      }

      .is-nested {
        border-bottom: none;
        background-color: var(--esp-menu-item-background, var(--esp-color-layer-1));
      }

      .is-nested [part="menu-text"] {
        padding-block: var(--esp-size-tiny);
        padding-left: calc(var(--esp-size-padding) + var(--esp-size-small));
        font-weight: 400;
      }

      .is-active {
        color: var(--esp-menu-item-active-color, var(--esp-color-link));
        background-color: var(--esp-menu-item-active-background, var(--esp-color-layer-2));
      }

      .is-active a,
      .is-active button,
      .is-active .current-page {
        font-weight: var(--esp-menu-item-active-font-weight, var(--esp-font-weight-headings));
      }

      .is-horizontal.is-active {
        background-color: var(--esp-menu-item-active-background, transparent);
        box-shadow: inset 0 -2px 0
          var(
            --esp-menu-item-active-indicator-color,
            var(--esp-menu-item-active-color, var(--esp-color-link))
          );
      }

      @media (prefers-reduced-motion: reduce) {
        a,
        button,
        .current-page,
        .item {
          transition: none;
        }
      }

      .icon-area {
        display: none;
      }

      .has-icon .icon-area {
        display: grid;
        place-content: center;
        flex: 0 0 auto;
        min-width: var(--esp-menu-item-icon-min-width, calc(1 * var(--esp-size-font)));
        padding: var(--esp-menu-item-icon-padding, var(--esp-size-padding));
        background-color: var(--esp-menu-item-icon-background, var(--esp-color-layer-2));
        border-left: 1px dotted var(--esp-menu-item-border-color, var(--esp-color-border));
      }

      .is-horizontal.has-icon .icon-area {
        background: transparent;
        border-left: none;
        padding-inline: 0 var(--esp-size-small);
      }

      .icon-area .generated-icon,
      .icon-area ::slotted(svg),
      .icon-area ::slotted(img) {
        height: var(--esp-menu-item-icon-size, calc(1 * var(--esp-size-font)));
        width: var(--esp-menu-item-icon-size, calc(1 * var(--esp-size-font)));
        object-fit: contain;
      }
    `],n([l({type:String})],o.prototype,"label",void 0),n([l({type:String})],o.prototype,"url",void 0),n([l({type:String})],o.prototype,"icon",void 0),n([l({attribute:!1,type:String})],o.prototype,"mode",void 0),n([l({attribute:!1,type:Number})],o.prototype,"depth",void 0),n([l({attribute:!1,type:Boolean})],o.prototype,"touchDevice",void 0),n([f()],o.prototype,"active",void 0),o=n([v("esp-menu-item")],o);export{o as EspalierMenuItem};
