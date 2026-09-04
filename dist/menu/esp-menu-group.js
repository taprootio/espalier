var i=function(l,e,o,a){var p=arguments.length,s=p<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,o):a,d;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(l,e,o,a);else for(var h=l.length-1;h>=0;h--)(d=l[h])&&(s=(p<3?d(s):p>3?d(e,o,s):d(e,o))||s);return p>3&&s&&Object.defineProperty(e,o,s),s},c;import{css as b,html as n,nothing as g}from"lit";import{customElement as y,property as r,state as x}from"lit/decorators.js";import{classMap as k}from"lit/directives/class-map.js";import{createRef as f,ref as u}from"lit/directives/ref.js";import{EspalierElementBase as m}from"../shared/esp-element-base.js";import{ESP_EVENTS as w}from"../shared/events.js";import{getIconHrefForHost as z}from"../shared/intent-values.js";import{pathStartsWithSegment as v,pathsMatch as S}from"../shared/path-matching.js";import{SlottedIconController as $}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as C}from"../shared/svgs/render-sprite-icon.js";import{EspalierMenuItem as E}from"./esp-menu-item.js";let t=c=class extends m{constructor(){super(...arguments),this.itemsSlot=f(),this.toggleButton=f(),this.iconSlot=new $(this),this.openedByUrlPrefix=!1,this.dismissedUrlPrefix=!1,this.label="",this.url="",this.icon="",this.open=!1,this.mode="vertical",this.depth=0,this.touchDevice=!1,this.fullScreenPresentation=!1,this.active=!1,this.urlPrefix="",this.globalListenersActive=!1,this.handleDocumentClick=e=>{this.open&&(e.composedPath().includes(this)||this.setOpen(!1))},this.handleDocumentKeydown=e=>{!this.open||e.key!=="Escape"||(e.preventDefault(),this.setOpen(!1),this.toggleButton.value?.focus())}}connectedCallback(){super.connectedCallback(),this.checkActive()}disconnectedCallback(){super.disconnectedCallback(),this.removeGlobalDismissListeners()}firstUpdated(e){super.firstUpdated(e),this.propagateToChildren()}updated(e){super.updated(e),(e.has("mode")||e.has("depth")||e.has("touchDevice"))&&this.propagateToChildren(),(e.has("mode")||e.has("depth")||e.has("urlPrefix"))&&this.syncUrlPrefixExpansion(),e.has("url")&&this.checkActive(),e.has("open")&&!this.open&&(this.openedByUrlPrefix=!1),(e.has("open")||e.has("mode"))&&(this.open&&this.isHorizontalTopLevel?this.addGlobalDismissListeners():this.removeGlobalDismissListeners())}checkActive(){if(!this.url){this.active=!1;return}this.active=S(this.url)}get isHorizontalTopLevel(){return this.mode==="horizontal"&&this.depth===0}get childMode(){return this.mode==="horizontal"?"vertical":this.mode}syncUrlPrefixExpansion(){const e=v(location.pathname,this.urlPrefix);if(e||(this.dismissedUrlPrefix=!1),e&&!this.dismissedUrlPrefix&&!this.isHorizontalTopLevel){this.open||(this.open=!0,this.openedByUrlPrefix=!0);return}this.openedByUrlPrefix&&(this.open=!1,this.openedByUrlPrefix=!1)}getChildren(){return this.itemsSlot.value?Array.from(this.itemsSlot.value.assignedElements()):[]}propagateToChildren(){for(const e of this.getChildren())e instanceof E?(e.mode=this.childMode,e.depth=this.depth+1,e.touchDevice=this.touchDevice):e instanceof c&&(e.mode=this.childMode,e.depth=this.depth+1,e.touchDevice=this.touchDevice)}handleSlotChange(){this.propagateToChildren()}setOpen(e){this.open!==e&&(this.openedByUrlPrefix=!1,this.dismissedUrlPrefix=!e&&v(location.pathname,this.urlPrefix),this.open=e,this.dispatchEvent(new CustomEvent(w.MENU_GROUP_TOGGLE,{detail:{open:this.open},bubbles:!0,composed:!0})))}handleHeaderClick(){this.toggleOpen()}handleLinkClick(e){e.stopPropagation()}handleToggleClick(e){e.stopPropagation(),this.toggleOpen()}toggleOpen(){this.setOpen(!this.open)}handleToggleKeydown(e){e.key==="Escape"&&(e.preventDefault(),this.setOpen(!1),this.toggleButton.value?.focus())}addGlobalDismissListeners(){this.globalListenersActive||(document.addEventListener("click",this.handleDocumentClick,!0),document.addEventListener("keydown",this.handleDocumentKeydown),this.globalListenersActive=!0)}removeGlobalDismissListeners(){this.globalListenersActive&&(document.removeEventListener("click",this.handleDocumentClick,!0),document.removeEventListener("keydown",this.handleDocumentKeydown),this.globalListenersActive=!1)}renderIcon(){const e=z(this.icon,this),o=this.iconSlot.hasSlottedIcon();return n`
      <slot
        name="icon"
        ${u(this.iconSlot.slotRef)}
        @slotchange=${this.iconSlot.handleSlotChange}
      ></slot>
      ${!o&&e?C(e):g}
    `}renderToggle(e){return n`<button
      ${u(this.toggleButton)}
      class="group-toggle"
      type="button"
      aria-expanded=${this.open?"true":"false"}
      @click=${this.handleToggleClick}
      @keydown=${this.handleToggleKeydown}
    >
      ${e}<span class="indicator" aria-hidden="true"></span>
    </button>`}render(){const e={group:!0,"is-horizontal":this.isHorizontalTopLevel,"is-vertical":!this.isHorizontalTopLevel,"is-nested":this.depth>0,"is-drawer":this.mode==="drawer","is-open":this.open,"is-active":this.active,"has-icon":this.icon.length>0||this.iconSlot.hasSlottedIcon()},o=n`<span class="group-label-text" part="menu-text">${this.label}</span>`,a=this.url?this.active?n`
            <span class="current-page" aria-current="page">${o}</span>
            ${this.renderToggle(n`<span class="sr-only">Toggle ${this.label}</span>`)}
          `:n`
            <a class="group-link" href=${this.url} @click=${this.handleLinkClick}>${o}</a>
            ${this.renderToggle(n`<span class="sr-only">Toggle ${this.label}</span>`)}
          `:this.renderToggle(o);return n`
      <div class=${k(e)}>
        <div class="group-header" @click=${this.handleHeaderClick}>
          <span class="group-label">${a}</span>
          <span class="group-icon" aria-hidden="true">${this.renderIcon()}</span>
        </div>
        <div
          class="group-items"
          ?hidden=${this.isHorizontalTopLevel&&!this.open}
          ?inert=${!this.open}
          aria-hidden=${this.open?g:"true"}
        >
          <div class="group-items-inner">
            <slot ${u(this.itemsSlot)} @slotchange=${this.handleSlotChange}></slot>
          </div>
        </div>
      </div>
    `}};t.styles=[...m.styles,b`
      :host {
        display: block;
        position: relative;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }

      .group-header {
        position: relative;
        display: grid;
        grid-template-columns: minmax(0, 1fr) min-content;
        align-items: stretch;
        color: var(--esp-menu-group-color, var(--esp-color-headings));
        background-color: var(--esp-menu-group-background, var(--esp-color-layer-1));
        border-right: 1px solid var(--esp-menu-group-border-color, var(--esp-color-border));
        border-bottom: 1px solid var(--esp-menu-group-border-color, var(--esp-color-border));
        transition: background-color 0.2s ease;
        white-space: nowrap;
      }

      .group-header:hover,
      .group-header:focus-within {
        background-color: var(--esp-menu-group-hover-background, var(--esp-color-layer-2));
      }

      .is-horizontal > .group-header {
        height: var(--esp-header-height, calc(4.5 * var(--esp-size-small)));
        border-right: none;
        border-bottom: none;
        background: transparent;
      }

      .group-label {
        display: flex;
        width: 100%;
        min-width: 0;
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
        font-weight: 600;
        text-align: left;
        text-decoration: none;
        cursor: pointer;
      }

      .group-link,
      .current-page {
        flex: 0 1 auto;
        padding-inline: var(--esp-size-padding) 0;
        color: inherit;
        background: none;
      }

      .current-page {
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

      
      :host([full-screen-presentation]) .group-label {
        position: relative;
      }

      :host([full-screen-presentation]) .group-link,
      :host([full-screen-presentation]) .current-page {
        flex: 1 1 auto;
        width: 100%;
        justify-content: center;
        padding: var(--esp-menu-item-padding, var(--esp-size-small) var(--esp-size-padding));
      }

      :host([full-screen-presentation]) .group-link + .group-toggle,
      :host([full-screen-presentation]) .current-page + .group-toggle {
        position: absolute;
        inset-block: 0;
        inset-inline-end: 0;
        flex: none;
        width: auto;
        padding-inline: var(--esp-size-small);
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
        width: 0;
        height: 0;
        border-top: 3.5px solid transparent;
        border-bottom: 3.5px solid transparent;
        border-left: 4.5px solid var(--esp-menu-group-indicator-color, var(--esp-color-headings));
        transition: transform 0.2s ease;
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

      .is-horizontal > .group-items {
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
    `],i([r({type:String})],t.prototype,"label",void 0),i([r({type:String})],t.prototype,"url",void 0),i([r({type:String})],t.prototype,"icon",void 0),i([r({type:Boolean,reflect:!0})],t.prototype,"open",void 0),i([r({attribute:!1,type:String})],t.prototype,"mode",void 0),i([r({attribute:!1,type:Number})],t.prototype,"depth",void 0),i([r({attribute:!1,type:Boolean})],t.prototype,"touchDevice",void 0),i([r({attribute:"full-screen-presentation",type:Boolean,reflect:!0})],t.prototype,"fullScreenPresentation",void 0),i([x()],t.prototype,"active",void 0),i([r({type:String,attribute:"url-prefix"})],t.prototype,"urlPrefix",void 0),t=c=i([y("esp-menu-group")],t);export{t as EspalierMenuGroup};
