var o=function(d,e,i,s){var c=arguments.length,r=c<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,i):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(d,e,i,s);else for(var h=d.length-1;h>=0;h--)(n=d[h])&&(r=(c<3?n(r):c>3?n(e,i,r):n(e,i))||r);return c>3&&r&&Object.defineProperty(e,i,r),r};import{css as v,html as l,nothing as p}from"lit";import{customElement as b,property as a,state as m}from"lit/decorators.js";import{classMap as f}from"lit/directives/class-map.js";import{ref as g}from"lit/directives/ref.js";import{getIconHrefForHost as y}from"../shared/intent-values.js";import{EspalierElementBase as u}from"../shared/esp-element-base.js";import{ESP_EVENTS as w}from"../shared/events.js";import{pathsMatch as k}from"../shared/path-matching.js";import{SlottedIconController as z}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as x}from"../shared/svgs/render-sprite-icon.js";import{DEFAULT_NEW_TAB_LABEL as E,renderNewTabCue as S}from"../shared/new-tab-cue.js";import{srOnly as $}from"../shared/style-fragments.js";import{MENU_SOURCE_CHANGED as _}from"./menu-presentation.js";let t=class extends u{constructor(){super(...arguments),this.iconSlot=new z(this),this.label="",this.url="",this.target="",this.rel="",this.newTabLabel=E,this.icon="",this.headerEnd=!1,this.promotedForHeader=!1,this.mode="vertical",this.depth=0,this.touchDevice=!1,this.active=!1}get headerEndPromoted(){return this.promotedForHeader}setHeaderEndPromoted(e){this.promotedForHeader=e,this.toggleAttribute("data-esp-header-end-promoted",e)}connectedCallback(){this.setHeaderEndPromoted(!1),super.connectedCallback(),this.checkActive()}disconnectedCallback(){this.setHeaderEndPromoted(!1),super.disconnectedCallback()}updated(e){super.updated(e),["label","url","target","rel","newTabLabel","icon","headerEnd"].some(i=>e.has(i))&&this.dispatchEvent(new CustomEvent(_,{bubbles:!0,composed:!0})),e.has("url")&&this.checkActive()}checkActive(){if(!this.url){this.active=!1;return}this.active=k(this.url)}handleButtonClick(){this.dispatchEvent(new CustomEvent(w.CLICKED,{detail:{},bubbles:!0,composed:!0}))}render(){const e=y(this.icon,this),i=this.iconSlot.hasSlottedIcon(":scope > :not([slot]), :scope > [slot='']"),s=i||e.length>0,c={item:!0,"is-horizontal":this.mode==="horizontal"&&this.depth===0,"is-vertical":this.mode!=="horizontal"||this.depth>0,"is-drawer":this.mode==="drawer","is-nested":this.depth>0,"has-icon":s,"is-active":this.active},r=l`<span part="menu-text">${this.label}</span>`,n=l`<span class="icon-area" aria-hidden=${s?"true":p}>
      <slot ${g(this.iconSlot.slotRef)} @slotchange=${this.iconSlot.handleSlotChange}></slot>
      ${!i&&e?x(e):p}
    </span>`;return l`<div class=${f(c)} ?hidden=${this.headerEndPromoted}>
      ${this.active?l`<span class="current-page" aria-current="page">${r}${n}</span>`:this.url?l`<a href=${this.url} target=${this.target||p} rel=${this.rel||p}
              >${r}${n}${S(this.target,this.newTabLabel)}</a
            >`:l`<button type="button" @click=${this.handleButtonClick}>${r}${n}</button>`}
    </div>`}};t.styles=[...u.styles,$,v`
      :host {
        display: block;
      }

      :host([data-esp-header-end-promoted]) {
        display: none !important;
      }

      .item[hidden] {
        display: none;
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

      .is-drawer {
        text-align: inherit;
      }

      .is-drawer > a,
      .is-drawer > button,
      .is-drawer > .current-page {
        display: inline-flex;
        width: fit-content;
        max-width: 100%;
        box-sizing: border-box;
        vertical-align: top;
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
    `],o([a({type:String})],t.prototype,"label",void 0),o([a({type:String})],t.prototype,"url",void 0),o([a({type:String})],t.prototype,"target",void 0),o([a({type:String})],t.prototype,"rel",void 0),o([a({type:String,attribute:"new-tab-label"})],t.prototype,"newTabLabel",void 0),o([a({type:String})],t.prototype,"icon",void 0),o([a({type:Boolean,attribute:"header-end",reflect:!0})],t.prototype,"headerEnd",void 0),o([m()],t.prototype,"promotedForHeader",void 0),o([a({attribute:!1,type:String})],t.prototype,"mode",void 0),o([a({attribute:!1,type:Number})],t.prototype,"depth",void 0),o([a({attribute:!1,type:Boolean})],t.prototype,"touchDevice",void 0),o([m()],t.prototype,"active",void 0),t=o([b("esp-menu-item")],t);export{t as EspalierMenuItem};
