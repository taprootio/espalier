var o=function(d,e,r,s){var p=arguments.length,n=p<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,r):s,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(d,e,r,s);else for(var c=d.length-1;c>=0;c--)(i=d[c])&&(n=(p<3?i(n):p>3?i(e,r,n):i(e,r))||n);return p>3&&n&&Object.defineProperty(e,r,n),n};import{css as f,html as l,nothing as h}from"lit";import{customElement as g,property as a,state as u}from"lit/decorators.js";import{classMap as y}from"lit/directives/class-map.js";import{ref as m}from"lit/directives/ref.js";import{getIconHrefForHost as w}from"../shared/intent-values.js";import{EspalierElementBase as v}from"../shared/esp-element-base.js";import{ESP_EVENTS as k}from"../shared/events.js";import{pathsMatch as z}from"../shared/path-matching.js";import{SlottedIconController as x}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as $}from"../shared/svgs/render-sprite-icon.js";import{DEFAULT_NEW_TAB_LABEL as E,renderNewTabCue as S}from"../shared/new-tab-cue.js";import{srOnly as C}from"../shared/style-fragments.js";import{MENU_SOURCE_CHANGED as _,resolveMenuItemAppearance as b}from"./menu-presentation.js";import"../button/esp-button.js";let t=class extends v{constructor(){super(...arguments),this.iconSlot=new x(this),this.label="",this.url="",this.appearance="link",this.target="",this.rel="",this.newTabLabel=E,this.icon="",this.headerEnd=!1,this.promotedForHeader=!1,this.mode="vertical",this.depth=0,this.touchDevice=!1,this.active=!1}get headerEndPromoted(){return this.promotedForHeader}setHeaderEndPromoted(e){this.promotedForHeader=e,this.toggleAttribute("data-esp-header-end-promoted",e)}connectedCallback(){this.setHeaderEndPromoted(!1),super.connectedCallback(),this.checkActive()}disconnectedCallback(){this.setHeaderEndPromoted(!1),super.disconnectedCallback()}willUpdate(e){super.willUpdate(e),e.has("appearance")&&(this.appearance=b(this.appearance))}updated(e){super.updated(e),["label","url","target","rel","newTabLabel","icon","headerEnd","appearance"].some(r=>e.has(r))&&this.dispatchEvent(new CustomEvent(_,{bubbles:!0,composed:!0})),e.has("url")&&this.checkActive()}checkActive(){if(!this.url){this.active=!1;return}this.active=z(this.url)}handleButtonClick(){this.dispatchEvent(new CustomEvent(k.CLICKED,{detail:{},bubbles:!0,composed:!0}))}render(){const e=w(this.icon,this),r=this.iconSlot.hasSlottedIcon(":scope > :not([slot]), :scope > [slot='']"),s=r||e.length>0,p=b(this.appearance)==="button",n={item:!0,"button-appearance":p,"is-horizontal":this.mode==="horizontal"&&this.depth===0,"is-vertical":this.mode!=="horizontal"||this.depth>0,"is-drawer":this.mode==="drawer","is-nested":this.depth>0,"has-icon":s,"is-active":this.active},i=l`<span part="menu-text">${this.label}</span>`,c=l`<span class="icon-area" aria-hidden=${s?"true":h}>
      <slot ${m(this.iconSlot.slotRef)} @slotchange=${this.iconSlot.handleSlotChange}></slot>
      ${!r&&e?$(e):h}
    </span>`;return l`<div class=${y(n)} ?hidden=${this.headerEndPromoted}>
      ${p?l`<esp-button
            collapsed
            exportparts="label: menu-text"
            .label=${this.label}
            .href=${this.url}
            .target=${this.target}
            .rel=${this.rel}
            .newTabLabel=${this.newTabLabel}
            .current=${this.active}
            .icon=${this.icon}
          ><slot ${m(this.iconSlot.slotRef)} @slotchange=${this.iconSlot.handleSlotChange}></slot></esp-button>`:this.active?l`<span class="current-page" aria-current="page">${i}${c}</span>`:this.url?l`<a href=${this.url} target=${this.target||h} rel=${this.rel||h}
              >${i}${c}${S(this.target,this.newTabLabel)}</a
            >`:l`<button type="button" @click=${this.handleButtonClick}>${i}${c}</button>`}
    </div>`}};t.styles=[...v.styles,C,f`
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

      .button-appearance {
        color: inherit;
        background: transparent;
      }

      .button-appearance > esp-button {
        display: inline-block;
        inline-size: fit-content;
        max-inline-size: 100%;
        vertical-align: middle;
        font: inherit;
      }

      .button-appearance > esp-button::part(wrapper) {
        inline-size: fit-content;
        max-inline-size: 100%;
      }

      .button-appearance > esp-button::part(wrapper),
      .button-appearance > esp-button::part(control),
      .button-appearance > esp-button::part(label) {
        font: inherit;
        letter-spacing: inherit;
        word-spacing: inherit;
        text-transform: inherit;
      }

      .button-appearance.is-horizontal {
        display: flex;
        align-items: center;
        height: var(--esp-header-height, calc(4.5 * var(--esp-size-small)));
        font-weight: var(--esp-menu-item-font-weight, var(--esp-font-weight-menu, 700));
      }

      .button-appearance.is-nested {
        font-weight: 400;
      }

      .button-appearance.is-active {
        font-weight: var(--esp-menu-item-active-font-weight, var(--esp-font-weight-headings));
      }

      .button-appearance ::slotted(svg),
      .button-appearance ::slotted(img) {
        height: var(--esp-menu-item-icon-size, calc(1 * var(--esp-size-font)));
        width: var(--esp-menu-item-icon-size, calc(1 * var(--esp-size-font)));
        object-fit: contain;
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

      .is-vertical:not(.button-appearance) {
        --_esp-surface-layer: 1;
        border-right: 1px solid var(--esp-menu-item-border-color, var(--esp-color-border));
        border-bottom: 1px solid var(--esp-menu-item-border-color, var(--esp-color-border));
        background-color: var(--esp-menu-item-background, var(--esp-color-layer-1));
      }

      .is-vertical:not(.button-appearance):hover,
      .is-vertical:not(.button-appearance):focus-within {
        --_esp-surface-layer: 2;
        color: var(--esp-menu-item-hover-color, var(--esp-color-headings-hover));
        background-color: var(--esp-menu-item-hover-background, var(--esp-color-layer-2));
      }

      .is-nested:not(.button-appearance) {
        --_esp-surface-layer: 1;
        border-bottom: none;
        background-color: var(--esp-menu-item-background, var(--esp-color-layer-1));
      }

      .is-nested [part="menu-text"] {
        padding-block: var(--esp-size-tiny);
        padding-left: calc(var(--esp-size-padding) + var(--esp-size-small));
        font-weight: 400;
      }

      .is-active:not(.button-appearance) {
        --_esp-surface-layer: 2;
        color: var(--esp-menu-item-active-color, var(--esp-color-link));
        background-color: var(--esp-menu-item-active-background, var(--esp-color-layer-2));
      }

      .is-active a,
      .is-active button,
      .is-active .current-page {
        font-weight: var(--esp-menu-item-active-font-weight, var(--esp-font-weight-headings));
      }

      .is-horizontal.is-active:not(.button-appearance) {
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
    `],o([a({type:String})],t.prototype,"label",void 0),o([a({type:String})],t.prototype,"url",void 0),o([a({type:String,reflect:!0})],t.prototype,"appearance",void 0),o([a({type:String})],t.prototype,"target",void 0),o([a({type:String})],t.prototype,"rel",void 0),o([a({type:String,attribute:"new-tab-label"})],t.prototype,"newTabLabel",void 0),o([a({type:String})],t.prototype,"icon",void 0),o([a({type:Boolean,attribute:"header-end",reflect:!0})],t.prototype,"headerEnd",void 0),o([u()],t.prototype,"promotedForHeader",void 0),o([a({attribute:!1,type:String})],t.prototype,"mode",void 0),o([a({attribute:!1,type:Number})],t.prototype,"depth",void 0),o([a({attribute:!1,type:Boolean})],t.prototype,"touchDevice",void 0),o([u()],t.prototype,"active",void 0),t=o([g("esp-menu-item")],t);export{t as EspalierMenuItem};
