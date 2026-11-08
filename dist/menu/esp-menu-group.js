var i=function(l,e,o,a){var p=arguments.length,s=p<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,o):a,d;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(l,e,o,a);else for(var c=l.length-1;c>=0;c--)(d=l[c])&&(s=(p<3?d(s):p>3?d(e,o,s):d(e,o))||s);return p>3&&s&&Object.defineProperty(e,o,s),s},u;import{css as b,html as n,nothing as h}from"lit";import{customElement as y,property as r,state as w}from"lit/decorators.js";import{classMap as k}from"lit/directives/class-map.js";import{createRef as m,ref as g}from"lit/directives/ref.js";import{EspalierElementBase as f}from"../shared/esp-element-base.js";import{ESP_EVENTS as x}from"../shared/events.js";import{getIconHrefForHost as z}from"../shared/intent-values.js";import{pathStartsWithSegment as v,pathsMatch as L}from"../shared/path-matching.js";import{SlottedIconController as S}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as $}from"../shared/svgs/render-sprite-icon.js";import{DEFAULT_NEW_TAB_LABEL as E,renderNewTabCue as T}from"../shared/new-tab-cue.js";import{srOnly as C}from"../shared/style-fragments.js";import{EspalierMenuItem as D}from"./esp-menu-item.js";let t=u=class extends f{constructor(){super(...arguments),this.itemsSlot=m(),this.toggleButton=m(),this.iconSlot=new S(this),this.openedByUrlPrefix=!1,this.dismissedUrlPrefix=!1,this.label="",this.url="",this.target="",this.rel="",this.newTabLabel=E,this.icon="",this.open=!1,this.mode="vertical",this.depth=0,this.touchDevice=!1,this.fullScreenPresentation=!1,this.active=!1,this.urlPrefix="",this.globalListenersActive=!1,this.handleDocumentClick=e=>{this.open&&(e.composedPath().includes(this)||this.setOpen(!1))},this.handleDocumentKeydown=e=>{!this.open||e.key!=="Escape"||(e.preventDefault(),this.setOpen(!1),this.toggleButton.value?.focus())}}connectedCallback(){super.connectedCallback(),this.checkActive()}disconnectedCallback(){super.disconnectedCallback(),this.removeGlobalDismissListeners()}firstUpdated(e){super.firstUpdated(e),this.propagateToChildren()}updated(e){super.updated(e),(e.has("mode")||e.has("depth")||e.has("touchDevice"))&&this.propagateToChildren(),(e.has("mode")||e.has("depth")||e.has("urlPrefix"))&&this.syncUrlPrefixExpansion(),e.has("url")&&this.checkActive(),e.has("open")&&!this.open&&(this.openedByUrlPrefix=!1),(e.has("open")||e.has("mode"))&&(this.open&&this.isHorizontalTopLevel?this.addGlobalDismissListeners():this.removeGlobalDismissListeners())}checkActive(){if(!this.url){this.active=!1;return}this.active=L(this.url)}get isHorizontalTopLevel(){return this.mode==="horizontal"&&this.depth===0}get childMode(){return this.mode==="horizontal"?"vertical":this.mode}syncUrlPrefixExpansion(){const e=v(location.pathname,this.urlPrefix);if(e||(this.dismissedUrlPrefix=!1),e&&!this.dismissedUrlPrefix&&!this.isHorizontalTopLevel){this.open||(this.open=!0,this.openedByUrlPrefix=!0);return}this.openedByUrlPrefix&&(this.open=!1,this.openedByUrlPrefix=!1)}getChildren(){return this.itemsSlot.value?Array.from(this.itemsSlot.value.assignedElements()):[]}propagateToChildren(){for(const e of this.getChildren())e instanceof D?(e.mode=this.childMode,e.depth=this.depth+1,e.touchDevice=this.touchDevice):e instanceof u&&(e.mode=this.childMode,e.depth=this.depth+1,e.touchDevice=this.touchDevice)}handleSlotChange(){this.propagateToChildren()}setOpen(e){this.open!==e&&(this.openedByUrlPrefix=!1,this.dismissedUrlPrefix=!e&&v(location.pathname,this.urlPrefix),this.open=e,this.dispatchEvent(new CustomEvent(x.MENU_GROUP_TOGGLE,{detail:{open:this.open},bubbles:!0,composed:!0})))}handleHeaderClick(e){this.mode==="drawer"&&!e.composedPath().some(o=>o instanceof HTMLElement&&o.classList.contains("group-icon"))||this.toggleOpen()}handleLinkClick(e){e.stopPropagation()}handleToggleClick(e){e.stopPropagation(),this.toggleOpen()}toggleOpen(){this.setOpen(!this.open)}handleGroupKeydown(e){e.key==="Escape"&&this.open&&(e.preventDefault(),e.stopPropagation(),this.setOpen(!1),this.toggleButton.value?.focus())}addGlobalDismissListeners(){this.globalListenersActive||(document.addEventListener("click",this.handleDocumentClick,!0),document.addEventListener("keydown",this.handleDocumentKeydown),this.globalListenersActive=!0)}removeGlobalDismissListeners(){this.globalListenersActive&&(document.removeEventListener("click",this.handleDocumentClick,!0),document.removeEventListener("keydown",this.handleDocumentKeydown),this.globalListenersActive=!1)}renderIcon(){const e=z(this.icon,this),o=this.iconSlot.hasSlottedIcon();return n`
      <slot
        name="icon"
        ${g(this.iconSlot.slotRef)}
        @slotchange=${this.iconSlot.handleSlotChange}
      ></slot>
      ${!o&&e?$(e):h}
    `}renderToggle(e){return n`<button
      ${g(this.toggleButton)}
      class="group-toggle"
      type="button"
      aria-expanded=${this.open?"true":"false"}
      aria-controls="group-items"
      @click=${this.handleToggleClick}
    >
      ${e}<span class="indicator" aria-hidden="true"></span>
    </button>`}render(){const e={group:!0,"is-horizontal":this.isHorizontalTopLevel,"is-vertical":!this.isHorizontalTopLevel,"is-nested":this.depth>0,"is-drawer":this.mode==="drawer","is-open":this.open,"is-active":this.active,"has-icon":this.icon.length>0||this.iconSlot.hasSlottedIcon()},o=n`<span class="group-label-text" part="menu-text">${this.label}</span>`,a=this.url?this.active?n`
            <span class="current-page" aria-current="page">${o}</span>
            ${this.renderToggle(n`<span class="sr-only">Toggle ${this.label}</span>`)}
          `:n`
            <a
              class="group-link"
              href=${this.url}
              target=${this.target||h}
              rel=${this.rel||h}
              @click=${this.handleLinkClick}
              >${o}${T(this.target,this.newTabLabel)}</a
            >
            ${this.renderToggle(n`<span class="sr-only">Toggle ${this.label}</span>`)}
          `:this.renderToggle(o);return n`
      <div class=${k(e)} @keydown=${this.handleGroupKeydown}>
        <div class="group-header" @click=${this.handleHeaderClick}>
          <span class="group-label">${a}</span>
          <span class="group-icon" aria-hidden="true">${this.renderIcon()}</span>
        </div>
        <div
          id="group-items"
          class="group-items"
          ?hidden=${this.isHorizontalTopLevel&&!this.open}
          ?inert=${!this.open}
          aria-hidden=${this.open?h:"true"}
        >
          <div class="group-items-inner">
            <slot ${g(this.itemsSlot)} @slotchange=${this.handleSlotChange}></slot>
          </div>
        </div>
      </div>
    `}};t.styles=[...f.styles,C,b`
      :host {
        display: block;
        position: relative;
      }

      .group-header {
        --_esp-surface-layer: 1;
        position: relative;
        display: grid;
        grid-template-columns: minmax(0, 1fr) min-content;
        align-items: stretch;
        color: var(--esp-menu-group-color, var(--esp-menu-item-color, var(--esp-color-text)));
        background-color: var(--esp-menu-group-background, var(--esp-color-layer-1));
        border-right: 1px solid var(--esp-menu-group-border-color, var(--esp-color-border));
        border-bottom: 1px solid var(--esp-menu-group-border-color, var(--esp-color-border));
        transition: background-color 0.2s ease;
        white-space: nowrap;
      }

      .group-header:hover,
      .group-header:focus-within {
        --_esp-surface-layer: 2;
        background-color: var(--esp-menu-group-hover-background, var(--esp-color-layer-2));
      }

      .is-horizontal > .group-header {
        --_esp-surface-layer: inherit;
        height: var(--esp-header-height, calc(4.5 * var(--esp-size-small)));
        border-right: none;
        border-bottom: none;
        background: transparent;
      }

      .group-label {
        display: flex;
        width: 100%;
        min-width: 0;
        
        min-height: 0;
      }

      .group-link,
      .current-page,
      .group-toggle {
        display: flex;
        align-items: center;
        gap: var(--esp-size-tiny);
        min-width: 0;
        border: none;
        padding: var(--esp-menu-item-padding, var(--esp-size-small) var(--esp-size-padding));
        color: inherit;
        background: none;
        font: inherit;
        
        font-size: var(--esp-menu-item-font-size, inherit);
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
        text-align: left;
        text-decoration: none;
        cursor: pointer;
      }

      .is-horizontal .group-link,
      .is-horizontal .current-page,
      .is-horizontal .group-toggle {
        font-weight: var(--esp-menu-item-font-weight, var(--esp-font-weight-menu, 700));
      }

      .group-link,
      .current-page {
        flex: 0 1 auto;
        padding-inline: var(--esp-size-padding) 0;
        color: inherit;
        background: none;
      }

      .is-active .current-page {
        color: var(--esp-menu-item-active-color, var(--esp-color-link));
        font-weight: var(--esp-menu-item-active-font-weight, var(--esp-font-weight-headings));
      }

      .group-label > .group-toggle:only-child {
        flex: 1 1 auto;
        width: 100%;
        justify-content: flex-start;
      }

      .group-link + .group-toggle,
      .current-page + .group-toggle {
        flex: 1 1 auto;
        padding-left: var(--esp-size-tiny);
        justify-content: flex-start;
      }

      .group-link:hover {
        background: none;
        text-decoration: underline;
      }

      .is-drawer .group-label > .group-toggle:only-child,
      .is-drawer .group-link + .group-toggle,
      .is-drawer .current-page + .group-toggle {
        flex: 0 0 auto;
        width: auto;
      }

      .is-drawer .group-label > .group-toggle:only-child {
        flex-shrink: 1;
        max-width: 100%;
      }

      .is-drawer .group-items-inner {
        min-width: 0;
      }

      
      :host([full-screen-presentation]) .group-label {
        justify-content: center;
      }

      :host([full-screen-presentation]) .group-link,
      :host([full-screen-presentation]) .current-page {
        padding-inline-start: var(--esp-size-normal);
      }

      .group-toggle:focus-visible,
      .group-link:focus-visible {
        outline: 2px solid var(--esp-color-link);
        outline-offset: -2px;
      }

      .group-label-text {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .group-icon {
        display: none;
        place-content: center;
        min-width: var(--esp-menu-group-icon-min-width, calc(1 * var(--esp-size-font)));
        padding: var(--esp-menu-group-icon-padding, var(--esp-size-padding));
        background-color: var(--esp-menu-group-icon-background, var(--esp-color-layer-2));
        border-left: 1px dotted var(--esp-menu-group-border-color, var(--esp-color-border));
        cursor: pointer;
      }

      .has-icon .group-icon {
        display: grid;
      }

      .is-horizontal .group-icon {
        background: transparent;
        border-left: none;
        padding-inline: 0 var(--esp-size-small);
      }

      .group-icon .generated-icon,
      .group-icon ::slotted(svg),
      .group-icon ::slotted(img) {
        width: var(--esp-menu-group-icon-size, calc(1 * var(--esp-size-font)));
        height: var(--esp-menu-group-icon-size, calc(1 * var(--esp-size-font)));
        object-fit: contain;
      }

      .indicator {
        display: inline-block;
        flex: 0 0 auto;
        width: 0.3em;
        height: 0.45em;
        background: var(--esp-menu-group-indicator-color, currentColor);
        clip-path: polygon(0 0, 100% 50%, 0 100%);
        transition: transform 0.2s ease;
      }

      @media (forced-colors: active) {
        .indicator {
          background: ButtonText;
        }
      }

      .is-open .indicator {
        transform: rotate(90deg);
      }

      .group-items {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows 0.2s ease;
      }

      .is-open > .group-items {
        grid-template-rows: 1fr;
        border-bottom: 1px solid var(--esp-menu-group-border-color, var(--esp-color-border));
      }

      .group-items-inner {
        overflow: hidden;
        min-width: max-content;
      }

      
      :host([full-screen-presentation]) .group-items-inner {
        min-width: 0;
      }

      .is-horizontal > .group-items {
        --_esp-surface-layer: 1;
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 300;
        min-width: min(24rem, calc(100vw - 2 * var(--esp-size-padding)));
        max-width: calc(100vw - 2 * var(--esp-size-padding));
        max-height: min(70vh, 36rem);
        overflow: auto;
        display: block;
        background: var(--esp-menu-group-panel-background, var(--esp-color-layer-1));
        border: 1px solid var(--esp-menu-group-border-color, var(--esp-color-border));
        box-shadow: var(--esp-menu-group-panel-shadow, 0 4px 12px var(--esp-color-shadow));
      }

      .is-horizontal > .group-items[hidden] {
        display: none;
      }

      .is-horizontal > .group-items > .group-items-inner {
        min-width: 0;
        overflow: visible;
      }

      @media (prefers-reduced-motion: reduce) {
        .group-items,
        .indicator {
          transition: none;
        }
      }
    `],i([r({type:String})],t.prototype,"label",void 0),i([r({type:String})],t.prototype,"url",void 0),i([r({type:String})],t.prototype,"target",void 0),i([r({type:String})],t.prototype,"rel",void 0),i([r({type:String,attribute:"new-tab-label"})],t.prototype,"newTabLabel",void 0),i([r({type:String})],t.prototype,"icon",void 0),i([r({type:Boolean,reflect:!0})],t.prototype,"open",void 0),i([r({attribute:!1,type:String})],t.prototype,"mode",void 0),i([r({attribute:!1,type:Number})],t.prototype,"depth",void 0),i([r({attribute:!1,type:Boolean})],t.prototype,"touchDevice",void 0),i([r({attribute:"full-screen-presentation",type:Boolean,reflect:!0})],t.prototype,"fullScreenPresentation",void 0),i([w()],t.prototype,"active",void 0),i([r({type:String,attribute:"url-prefix"})],t.prototype,"urlPrefix",void 0),t=u=i([y("esp-menu-group")],t);export{t as EspalierMenuGroup};
