var r=function(p,t,a,s){var c=arguments.length,o=c<3?t:s===null?s=Object.getOwnPropertyDescriptor(t,a):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(p,t,a,s);else for(var h=p.length-1;h>=0;h--)(n=p[h])&&(o=(c<3?n(o):c>3?n(t,a,o):n(t,a))||o);return c>3&&o&&Object.defineProperty(t,a,o),o};import{css as m,html as l,nothing as d}from"lit";import{customElement as v,property as i,state as f}from"lit/decorators.js";import{classMap as b}from"lit/directives/class-map.js";import{ref as g}from"lit/directives/ref.js";import{getIconHrefForHost as y}from"../shared/intent-values.js";import{EspalierElementBase as u}from"../shared/esp-element-base.js";import{ESP_EVENTS as k}from"../shared/events.js";import{pathsMatch as w}from"../shared/path-matching.js";import{SlottedIconController as z}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as x}from"../shared/svgs/render-sprite-icon.js";import{DEFAULT_NEW_TAB_LABEL as S,renderNewTabCue as $}from"../shared/new-tab-cue.js";import{srOnly as _}from"../shared/style-fragments.js";let e=class extends u{constructor(){super(...arguments),this.iconSlot=new z(this),this.label="",this.url="",this.target="",this.rel="",this.newTabLabel=S,this.icon="",this.mode="vertical",this.depth=0,this.touchDevice=!1,this.active=!1}connectedCallback(){super.connectedCallback(),this.checkActive()}updated(t){super.updated(t),t.has("url")&&this.checkActive()}checkActive(){if(!this.url){this.active=!1;return}this.active=w(this.url)}handleButtonClick(){this.dispatchEvent(new CustomEvent(k.CLICKED,{detail:{},bubbles:!0,composed:!0}))}render(){const t=y(this.icon,this),a=this.iconSlot.hasSlottedIcon(":scope > :not([slot]), :scope > [slot='']"),s=a||t.length>0,c={item:!0,"is-horizontal":this.mode==="horizontal"&&this.depth===0,"is-vertical":this.mode!=="horizontal"||this.depth>0,"is-drawer":this.mode==="drawer","is-nested":this.depth>0,"has-icon":s,"is-active":this.active},o=l`<span part="menu-text">${this.label}</span>`,n=l`<span class="icon-area" aria-hidden=${s?"true":d}>
      <slot ${g(this.iconSlot.slotRef)} @slotchange=${this.iconSlot.handleSlotChange}></slot>
      ${!a&&t?x(t):d}
    </span>`;return l`<div class=${b(c)}>
      ${this.active?l`<span class="current-page" aria-current="page">${o}${n}</span>`:this.url?l`<a href=${this.url} target=${this.target||d} rel=${this.rel||d}
              >${o}${n}${$(this.target,this.newTabLabel)}</a
            >`:l`<button type="button" @click=${this.handleButtonClick}>${o}${n}</button>`}
    </div>`}};e.styles=[...u.styles,_,m`
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
        --_esp-surface-layer: 1;
        border-right: 1px solid var(--esp-menu-item-border-color, var(--esp-color-border));
        border-bottom: 1px solid var(--esp-menu-item-border-color, var(--esp-color-border));
        background-color: var(--esp-menu-item-background, var(--esp-color-layer-1));
      }

      .is-vertical:hover,
      .is-vertical:focus-within {
        --_esp-surface-layer: 2;
        color: var(--esp-menu-item-hover-color, var(--esp-color-headings-hover));
        background-color: var(--esp-menu-item-hover-background, var(--esp-color-layer-2));
      }

      .is-nested {
        --_esp-surface-layer: 1;
        border-bottom: none;
        background-color: var(--esp-menu-item-background, var(--esp-color-layer-1));
      }

      .is-nested [part="menu-text"] {
        padding-block: var(--esp-size-tiny);
        padding-left: calc(var(--esp-size-padding) + var(--esp-size-small));
        font-weight: 400;
      }

      .is-active {
        --_esp-surface-layer: 2;
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
    `],r([i({type:String})],e.prototype,"label",void 0),r([i({type:String})],e.prototype,"url",void 0),r([i({type:String})],e.prototype,"target",void 0),r([i({type:String})],e.prototype,"rel",void 0),r([i({type:String,attribute:"new-tab-label"})],e.prototype,"newTabLabel",void 0),r([i({type:String})],e.prototype,"icon",void 0),r([i({attribute:!1,type:String})],e.prototype,"mode",void 0),r([i({attribute:!1,type:Number})],e.prototype,"depth",void 0),r([i({attribute:!1,type:Boolean})],e.prototype,"touchDevice",void 0),r([f()],e.prototype,"active",void 0),e=r([v("esp-menu-item")],e);export{e as EspalierMenuItem};
