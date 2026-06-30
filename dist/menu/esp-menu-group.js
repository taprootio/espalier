var i=function(a,e,o,l){var p=arguments.length,r=p<3?e:l===null?l=Object.getOwnPropertyDescriptor(e,o):l,d;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(a,e,o,l);else for(var h=a.length-1;h>=0;h--)(d=a[h])&&(r=(p<3?d(r):p>3?d(e,o,r):d(e,o))||r);return p>3&&r&&Object.defineProperty(e,o,r),r},c;import{css as b,html as s,nothing as g}from"lit";import{customElement as y,property as n,state as x}from"lit/decorators.js";import{classMap as k}from"lit/directives/class-map.js";import{createRef as m,ref as u}from"lit/directives/ref.js";import{EspalierElementBase as f}from"../shared/esp-element-base.js";import{getIconHrefForHost as w}from"../shared/intent-values.js";import{pathStartsWithSegment as v,pathsMatch as z}from"../shared/path-matching.js";import{SlottedIconController as $}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as C}from"../shared/svgs/render-sprite-icon.js";import{EspalierMenuItem as S}from"./esp-menu-item.js";let t=c=class extends f{constructor(){super(...arguments),this.itemsSlot=m(),this.toggleButton=m(),this.iconSlot=new $(this),this.openedByUrlPrefix=!1,this.dismissedUrlPrefix=!1,this.label="",this.url="",this.icon="",this.open=!1,this.mode="vertical",this.depth=0,this.touchDevice=!1,this.active=!1,this.urlPrefix="",this.globalListenersActive=!1,this.handleDocumentClick=e=>{this.open&&(e.composedPath().includes(this)||this.setOpen(!1))},this.handleDocumentKeydown=e=>{!this.open||e.key!=="Escape"||(e.preventDefault(),this.setOpen(!1),this.toggleButton.value?.focus())}}connectedCallback(){super.connectedCallback(),this.checkActive()}disconnectedCallback(){super.disconnectedCallback(),this.removeGlobalDismissListeners()}firstUpdated(e){super.firstUpdated(e),this.propagateToChildren()}updated(e){super.updated(e),(e.has("mode")||e.has("depth")||e.has("touchDevice"))&&this.propagateToChildren(),(e.has("mode")||e.has("depth")||e.has("urlPrefix"))&&this.syncUrlPrefixExpansion(),e.has("url")&&this.checkActive(),e.has("open")&&!this.open&&(this.openedByUrlPrefix=!1),(e.has("open")||e.has("mode"))&&(this.open&&this.isHorizontalTopLevel?this.addGlobalDismissListeners():this.removeGlobalDismissListeners())}checkActive(){if(!this.url){this.active=!1;return}this.active=z(this.url)}get isHorizontalTopLevel(){return this.mode==="horizontal"&&this.depth===0}get childMode(){return this.mode==="horizontal"?"vertical":this.mode}syncUrlPrefixExpansion(){const e=v(location.pathname,this.urlPrefix);if(e||(this.dismissedUrlPrefix=!1),e&&!this.dismissedUrlPrefix&&!this.isHorizontalTopLevel){this.open||(this.open=!0,this.openedByUrlPrefix=!0);return}this.openedByUrlPrefix&&(this.open=!1,this.openedByUrlPrefix=!1)}getChildren(){return this.itemsSlot.value?Array.from(this.itemsSlot.value.assignedElements()):[]}propagateToChildren(){for(const e of this.getChildren())e instanceof S?(e.mode=this.childMode,e.depth=this.depth+1,e.touchDevice=this.touchDevice):e instanceof c&&(e.mode=this.childMode,e.depth=this.depth+1,e.touchDevice=this.touchDevice)}handleSlotChange(){this.propagateToChildren()}setOpen(e){this.open!==e&&(this.openedByUrlPrefix=!1,this.dismissedUrlPrefix=!e&&v(location.pathname,this.urlPrefix),this.open=e,this.dispatchEvent(new CustomEvent("esp-group-toggle",{detail:{open:this.open},bubbles:!0,composed:!0})))}handleHeaderClick(){this.toggleOpen()}handleLinkClick(e){e.stopPropagation()}handleToggleClick(e){e.stopPropagation(),this.toggleOpen()}toggleOpen(){this.setOpen(!this.open)}handleToggleKeydown(e){e.key==="Escape"&&(e.preventDefault(),this.setOpen(!1),this.toggleButton.value?.focus())}addGlobalDismissListeners(){this.globalListenersActive||(document.addEventListener("click",this.handleDocumentClick,!0),document.addEventListener("keydown",this.handleDocumentKeydown),this.globalListenersActive=!0)}removeGlobalDismissListeners(){this.globalListenersActive&&(document.removeEventListener("click",this.handleDocumentClick,!0),document.removeEventListener("keydown",this.handleDocumentKeydown),this.globalListenersActive=!1)}renderIcon(){const e=w(this.icon,this),o=this.iconSlot.hasSlottedIcon();return s`
      <slot
        name="icon"
        ${u(this.iconSlot.slotRef)}
        @slotchange=${this.iconSlot.handleSlotChange}
      ></slot>
      ${!o&&e?C(e):g}
    `}renderToggle(e){return s`<button
      ${u(this.toggleButton)}
      class="group-toggle"
      type="button"
      aria-expanded=${this.open?"true":"false"}
      @click=${this.handleToggleClick}
      @keydown=${this.handleToggleKeydown}
    >
      ${e}<span class="indicator" aria-hidden="true"></span>
    </button>`}render(){const e={group:!0,"is-horizontal":this.isHorizontalTopLevel,"is-vertical":!this.isHorizontalTopLevel,"is-nested":this.depth>0,"is-drawer":this.mode==="drawer","is-open":this.open,"is-active":this.active,"has-icon":this.icon.length>0||this.iconSlot.hasSlottedIcon()},o=s`<span class="group-label-text">${this.label}</span>`,l=this.url?this.active?s`
            <span class="current-page" aria-current="page">${o}</span>
            ${this.renderToggle(s`<span class="sr-only">Toggle ${this.label}</span>`)}
          `:s`
            <a class="group-link" href=${this.url} @click=${this.handleLinkClick}>${o}</a>
            ${this.renderToggle(s`<span class="sr-only">Toggle ${this.label}</span>`)}
          `:this.renderToggle(o);return s`
      <div class=${k(e)}>
        <div class="group-header" @click=${this.handleHeaderClick}>
          <span class="group-label">${l}</span>
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
    `}};t.styles=[...f.styles,b`
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
        padding: var(--esp-size-small) var(--esp-size-padding);
        color: inherit;
        background: none;
        font: inherit;
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
    `],i([n({type:String})],t.prototype,"label",void 0),i([n({type:String})],t.prototype,"url",void 0),i([n({type:String})],t.prototype,"icon",void 0),i([n({type:Boolean,reflect:!0})],t.prototype,"open",void 0),i([n({attribute:!1,type:String})],t.prototype,"mode",void 0),i([n({attribute:!1,type:Number})],t.prototype,"depth",void 0),i([n({attribute:!1,type:Boolean})],t.prototype,"touchDevice",void 0),i([x()],t.prototype,"active",void 0),i([n({type:String,attribute:"url-prefix"})],t.prototype,"urlPrefix",void 0),t=c=i([y("esp-menu-group")],t);export{t as EspalierMenuGroup};
