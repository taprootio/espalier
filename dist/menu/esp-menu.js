var l=function(w,e,r,i){var t=arguments.length,o=t<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,r):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(w,e,r,i);else for(var a=w.length-1;a>=0;a--)(s=w[a])&&(o=(t<3?s(o):t>3?s(e,r,o):s(e,r))||o);return t>3&&o&&Object.defineProperty(e,r,o),o},f;import{css as k,html as c,nothing as u}from"lit";import{customElement as M,property as d,state as y}from"lit/decorators.js";import{classMap as S}from"lit/directives/class-map.js";import{unsafeHTML as T}from"lit/directives/unsafe-html.js";import{createRef as m,ref as g}from"lit/directives/ref.js";import{styleMap as z}from"lit/directives/style-map.js";import{EspalierElementBase as E}from"../shared/esp-element-base.js";import{ESP_EVENTS as v}from"../shared/events.js";import{getEspBus as _}from"../shared/bus-events.js";import{normalizePath as $,pathStartsWithSegment as D,pathsMatch as x}from"../shared/path-matching.js";import{renderConfiguredBrand as F}from"../shared/configured-brand.js";import{FOCUSABLE_SELECTOR as A,OverlayController as C}from"../shared/overlay-controller.js";import{SwipeRevealController as L}from"./swipe-reveal-controller.js";import"./esp-menu-item.js";import"./esp-menu-group.js";import"../burger/esp-burger.js";import{EspalierMenuItem as O}from"./esp-menu-item.js";import{EspalierMenuGroup as b}from"./esp-menu-group.js";import{COMPACT_VIEWPORT_MEDIA_QUERY as I}from"../shared/responsive.js";const G=new Set(["panel","full-screen"]),N=new Set(["fade","slide-down","slide-up","slide-left","slide-right"]);let n=f=class extends E{ownsDrawerLock(){return this.isFullScreenDrawer}fullScreenInertAnchor(){return f.inertAnchorFor(this)}static inertAnchorFor(e){let r=e,i=e;for(;;){const t=i.parentElement;if(t){if(t.localName==="esp-page"||t.localName==="esp-root")return i;t===document.body&&(r=i),i=t;continue}const o=i.getRootNode();if(o instanceof ShadowRoot&&o.host instanceof HTMLElement){i=o.host;continue}return r}}constructor(){super(),this.itemsSlot=m(),this.railRef=m(),this.scrimRef=m(),this.drawerRef=m(),this.bus=_(),this.closeTransitionTimer=null,this.drawerGroupOpenOverrides=new Map,this.overlay=new C({host:this,getFocusTrapContainer:()=>this.drawerRef.value??null,getFocusScope:()=>this.fullScreenFocusScope(),getInertAnchor:()=>this.fullScreenInertAnchor(),promote:!1,scrollLock:{preserveScrollPosition:!0}}),this.fullScreenSession=!1,this.openedFullScreen=!1,this.drawerKeydownAttached=!1,this.onOverlayOpened=e=>{if(e===this.overlay||!this.drawerOpen)return;const r=this.drawerTrigger;this.drawerTrigger=null,r&&e.redirectFocusRestore(r),this.swipeController.closeForHandoff(),this.onDrawerTransitionEnd()},this._sliding=!1,this._mobileCollapsed=!1,this.verticalDrawerQuery=null,this.onVerticalDrawerChange=e=>this.setMobileCollapsed(e.matches),this.mode="horizontal",this.overflow="auto",this.side="left",this.drawerPresentation="panel",this.fullScreenTransition="fade",this.drawerBrand=null,this.liftedCloseControl=null,this.ariaLabel=null,this.autoExpand=!1,this.drawerOpen=!1,this.drawerShown=!1,this.drawerTransitioning=!1,this.drawerTrigger=null,this.hasExternalDrawerControl=!1,this.previewCollapseRequested=!1,this.getWidth=()=>{const e=this.railRef.value;return e?Math.max(e.scrollWidth,e.clientWidth):-1},this.onDrawerKeydown=e=>{!this.drawerOpen||!this.openedFullScreen||e.key==="Tab"&&this.overlay.trapFocus(e)},this.onDrawerTransitionEnd=e=>{e&&e.target!==this.drawerRef.value||(this.closeTransitionTimer&&(clearTimeout(this.closeTransitionTimer),this.closeTransitionTimer=null),this.drawerTransitioning=!1,this.drawerOpen||(this.hideDrawerPopover(),this.drawerGroupOpenOverrides.clear()))},this.handleDrawerCloseClick=()=>{this.closeDrawer()},this.swipeController=new L(this,this.side),this.swipeController.enabled=!1}get isFullScreenDrawer(){return G.has(this.drawerPresentation)?this.drawerPresentation==="full-screen":!1}get resolvedFullScreenTransition(){return N.has(this.fullScreenTransition)?this.fullScreenTransition:"fade"}get sliding(){return this._sliding}set sliding(e){const r=this._sliding;this._sliding=e,this.syncSwipeEnabled(),this.propagateToItems(),this.requestUpdate("sliding",r)}get collapsed(){return this.drawerActive}set collapsed(e){e?this.mode="drawer":this.mode==="drawer"&&(this.mode="vertical")}get drawerSide(){return this.overflow==="right-drawer"?"right":this.overflow==="left-drawer"?"left":this.side}get drawerActive(){return this.mode==="drawer"||this._sliding||this.overflow==="left-drawer"||this.overflow==="right-drawer"||this.mode==="vertical"&&(this._mobileCollapsed||this.previewCollapseRequested)&&this.hasExternalDrawerControl}get railMode(){return this.mode==="horizontal"?"horizontal":"vertical"}connectedCallback(){super.connectedCallback(),this.getAttribute("slot")==="right"&&(this.side="right"),!this.verticalDrawerQuery&&typeof window<"u"&&"matchMedia"in window&&(this.verticalDrawerQuery=window.matchMedia(I),this._mobileCollapsed=this.verticalDrawerQuery.matches,this.verticalDrawerQuery.addEventListener("change",this.onVerticalDrawerChange)),this.syncSwipeEnabled(),C.addOpenListener(this.onOverlayOpened)}disconnectedCallback(){C.removeOpenListener(this.onOverlayOpened),this.verticalDrawerQuery?.removeEventListener("change",this.onVerticalDrawerChange),this.verticalDrawerQuery=null,this.detachDrawerKeydown(),this.fullScreenSession=!1,super.disconnectedCallback()}setMobileCollapsed(e){e!==this._mobileCollapsed&&(this._mobileCollapsed=e,this.mode==="vertical"&&this.applyMobileCollapse())}applyMobileCollapse(){this.swipeController.direction=this.drawerSide,this.syncSwipeEnabled(),this.propagateToItems(),this.requestUpdate(),!this.drawerActive&&this.drawerOpen&&this.swipeController.close(!0)}firstUpdated(e){super.firstUpdated(e),this.propagateToItems()}updated(e){super.updated(e),(e.has("mode")||e.has("overflow")||e.has("side")||e.has("hasExternalDrawerControl")||e.has("previewCollapseRequested"))&&(this.swipeController.direction=this.drawerSide,this.syncSwipeEnabled(),this.propagateToItems(),!this.drawerActive&&this.drawerOpen&&this.swipeController.close(!0)),this.drawerOpen&&this.openedFullScreen!==this.isFullScreenDrawer&&this.swipeController.close(!0),this.autoExpand&&(e.has("autoExpand")||e.has("mode")&&this.mode!=="horizontal")?this.expandToCurrentPage():this.mode==="horizontal"&&e.has("mode")&&this.closeHorizontalTopLevelGroups()}openDrawer(e){this.drawerActive&&(e?this.drawerTrigger=e:this.drawerOpen||(this.drawerTrigger=null),this.swipeController.open())}closeDrawer(){this.swipeController.close(!0)}toggleDrawer(e){this.drawerOpen?this.closeDrawer():this.openDrawer(e)}toggleOpened(){this.toggleDrawer()}get isDrawerOpen(){return this.drawerOpen}syncSwipeEnabled(){this.swipeController.direction=this.drawerSide,this.swipeController.enabled=this.drawerActive}getAssignedChildren(){return this.itemsSlot.value?.assignedElements()??[]}propagateToItems(){const e=this.railMode;for(const r of this.getAssignedChildren())r instanceof O?(r.mode=e,r.depth=0,r.touchDevice=this.swipeController.isTouch):r instanceof b&&(r.mode=e,r.depth=0,r.touchDevice=this.swipeController.isTouch)}handleSlotChange(){this.propagateToItems()}onSwipeRevealChanged(e){e!==this.drawerOpen&&(this.drawerOpen=e,e?(this.openedFullScreen=this.isFullScreenDrawer,this.drawerGroupOpenOverrides.clear(),this.bus.publish("close-popovers",{}),this.updateComplete.then(()=>this.showDrawerPopover())):(this.detachDrawerKeydown(),this.fullScreenSession&&(this.fullScreenSession=!1,this.overlay.close()),this.drawerShown=!1,this.drawerTransitioning=!0,this.updateComplete.then(()=>this.startCloseTransition()),requestAnimationFrame(()=>this.restoreDrawerTriggerFocus())),this.dispatchEvent(new CustomEvent(e?v.MENU_DRAWER_OPENED:v.MENU_DRAWER_CLOSED,{bubbles:!0,composed:!0})))}showDrawerPopover(){const e=this.scrimRef.value,r=this.drawerRef.value;if(!(!e||!r||!this.isConnected)){this.swipeController.drawerElement=r;try{this.openedFullScreen||e.showPopover(),r.showPopover()}catch{}this.dispatchEvent(new CustomEvent(v.MENU_DRAWER_PRESENTED,{bubbles:!0,composed:!0})),r.getBoundingClientRect(),requestAnimationFrame(()=>{!this.drawerOpen||!this.isConnected||(this.drawerTransitioning=!0,this.drawerShown=!0,this.openedFullScreen&&(this.fullScreenSession=!0,this.overlay.open(),this.attachDrawerKeydown(),this.updateComplete.then(()=>{this.drawerOpen&&this.overlay.moveFocusInto()})))})}}attachDrawerKeydown(){this.drawerKeydownAttached||(document.addEventListener("keydown",this.onDrawerKeydown),this.drawerKeydownAttached=!0)}detachDrawerKeydown(){this.drawerKeydownAttached&&(document.removeEventListener("keydown",this.onDrawerKeydown),this.drawerKeydownAttached=!1)}fullScreenFocusScope(){const e=this.drawerRef.value;if(!e)return[];const r=s=>s instanceof HTMLElement&&s.getClientRects().length>0,i=[],t=s=>{if(s.matches(A)&&r(s)&&i.push(s),s.shadowRoot)for(const a of s.shadowRoot.querySelectorAll(A))r(a)&&i.push(a)};for(const s of e.querySelectorAll("*"))if(t(s),s instanceof HTMLSlotElement)for(const a of s.assignedElements({flatten:!0})){t(a);for(const p of a.querySelectorAll("*"))t(p)}const o=this.liftedCloseControl;if(o?.isConnected){const s=o.shadowRoot?.querySelector("button")??o;r(s)&&i.push(s)}return i}static drawerTransitionMs(e){const r=getComputedStyle(e),i=a=>a.split(",").map(p=>p.trim()).filter(Boolean).map(p=>{const h=Number.parseFloat(p);return Number.isFinite(h)?p.endsWith("ms")?h:h*1e3:0}),t=i(r.transitionDuration),o=i(r.transitionDelay);let s=0;return t.forEach((a,p)=>{s=Math.max(s,a+(o[p%Math.max(o.length,1)]??0))}),s}startCloseTransition(){const e=this.drawerRef.value;if(!e){this.hideDrawerPopover();return}this.closeTransitionTimer&&clearTimeout(this.closeTransitionTimer);const r=f.drawerTransitionMs(e);if(r===0){this.onDrawerTransitionEnd();return}this.closeTransitionTimer=setTimeout(()=>{this.closeTransitionTimer=null,!this.drawerOpen&&this.drawerTransitioning&&this.onDrawerTransitionEnd()},r+50)}hideDrawerPopover(){const e=this.scrimRef.value,r=this.drawerRef.value;this.swipeController.drawerElement=null,r&&(r.style.cssText="");try{r?.hidePopover()}catch{}try{e?.hidePopover()}catch{}}restoreDrawerTriggerFocus(){const e=this.drawerTrigger;this.drawerTrigger=null,e?.isConnected&&e.focus({preventScroll:!0})}getAutoExpandedGroups(e=!0){const r=new Set;let i=null;for(const o of this.querySelectorAll("esp-menu-item")){const s=o.url||o.getAttribute("url");if(s&&x(s)){i=o;break}}if(!i)for(const o of this.querySelectorAll("esp-menu-group")){const s=o.url||o.getAttribute("url");if(s&&x(s)){i=o;break}}if(!i&&e){for(const o of this.querySelectorAll("esp-menu-group"))o.parentElement===this&&r.add(o);return r}if(!i)return r;i instanceof b&&r.add(i);let t=i.parentElement;for(;t&&t!==this;)t instanceof b&&r.add(t),t=t.parentElement;return r}isHorizontalTopLevelGroup(e){return e.mode==="horizontal"&&e.depth===0}groupUrlPrefixMatches(e){return D(location.pathname,e.urlPrefix)}groupPathMatches(e){if(this.groupUrlPrefixMatches(e))return!0;const r=e.url||e.getAttribute("url");return r?D(location.pathname,$(r)):!1}expandToCurrentPage(){const e=this.getAutoExpandedGroups(),r=this.querySelectorAll("esp-menu-group");for(const i of r)i.open=e.has(i)&&!this.isHorizontalTopLevelGroup(i)}closeHorizontalTopLevelGroups(){for(const e of this.querySelectorAll("esp-menu-group"))this.isHorizontalTopLevelGroup(e)&&(e.open=!1)}getDrawerAutoExpandedGroups(){return this.getAutoExpandedGroups(!1)}collectDrawerNodes(e,r=this.getDrawerAutoExpandedGroups()){const i=[];for(const t of e)if(t instanceof O){const o=t.querySelector(":scope > svg, :scope > img");i.push({kind:"item",label:t.label,url:t.url,open:!1,icon:t.icon,iconHtml:o?.outerHTML||"",children:[],originalItem:t,originalGroup:null})}else if(t instanceof b){const o=t.querySelector(':scope > [slot="icon"]'),s=r.has(t)||this.groupPathMatches(t),a=this.drawerGroupOpenOverrides.get(t)??(t.open||s);i.push({kind:"group",label:t.label,url:t.url||"",open:a,icon:t.icon,iconHtml:o?.outerHTML||"",children:this.collectDrawerNodes(Array.from(t.children),r),originalItem:null,originalGroup:t})}return i}renderDrawerNode(e){return e.kind==="item"?c`<esp-menu-item
        label=${e.label}
        .url=${e.url}
        .icon=${e.icon}
        .mode=${"drawer"}
        @esp-clicked=${()=>!e.url&&e.originalItem?this.handleDrawerItemClick(e.originalItem):void 0}
        >${T(e.iconHtml)}</esp-menu-item
      >`:c`<esp-menu-group
      label=${e.label}
      .url=${e.url}
      .icon=${e.icon}
      .mode=${"drawer"}
      .fullScreenPresentation=${this.openedFullScreen}
      ?open=${e.open}
      @esp-menu-group-toggle=${r=>{e.originalGroup&&(this.drawerGroupOpenOverrides.set(e.originalGroup,r.detail.open),this.isHorizontalTopLevelGroup(e.originalGroup)||(e.originalGroup.open=r.detail.open))}}
    >
      ${e.iconHtml?T(e.iconHtml):u}
      ${e.children.map(r=>this.renderDrawerNode(r))}
    </esp-menu-group>`}handleDrawerItemClick(e){e.dispatchEvent(new CustomEvent(v.CLICKED,{detail:{},bubbles:!0,composed:!0})),this.swipeController.close(!0)}render(){const e=this.drawerOpen||this.drawerTransitioning,r=this.drawerActive,i={rail:!0,horizontal:this.railMode==="horizontal",vertical:this.railMode==="vertical",wrap:this.overflow==="wrap",scroll:this.overflow==="scroll","drawer-forced":this.drawerActive},t=e?this.openedFullScreen:this.isFullScreenDrawer,o={drawer:!0,"drawer-left":this.drawerSide==="left","drawer-right":this.drawerSide==="right","full-screen":t,[`transition-${this.resolvedFullScreenTransition}`]:t,transitioning:this.drawerTransitioning,open:this.drawerShown},s=e?this.collectDrawerNodes(this.getAssignedChildren()):[],a=this.ariaLabel??"Navigation",p={"--_esp-menu-drawer-brand-color":this.drawerBrand?.brandColor||null},h=t&&e?c`<div class="drawer-chrome">
            <div class="drawer-brand" style=${z(p)}>
              <slot name="drawer-brand"
                >${this.drawerBrand?F(this.drawerBrand):u}</slot
              >
            </div>
            ${this.liftedCloseControl?u:c`
                  <button
                    type="button"
                    class="drawer-close"
                    aria-label="Close menu"
                    @click=${this.handleDrawerCloseClick}
                  >
                    <esp-burger presentation-only menu-open></esp-burger>
                  </button>`}
          </div>`:u;return c`
      <nav
        ${g(this.railRef)}
        class=${S(i)}
        aria-label=${a}
        ?hidden=${r}
      >
        <slot ${g(this.itemsSlot)} @slotchange=${this.handleSlotChange}></slot>
      </nav>
      <div
        ${g(this.scrimRef)}
        class=${S({scrim:!0,"full-screen":t,open:this.drawerShown,transitioning:this.drawerTransitioning})}
        popover="manual"
      ></div>
      <nav
        ${g(this.drawerRef)}
        class=${S(o)}
        aria-label=${a}
        popover="manual"
        ?data-no-swipe=${t}
        @transitionend=${this.onDrawerTransitionEnd}
      >
        ${h} ${e?s.map(R=>this.renderDrawerNode(R)):u}
      </nav>
    `}};n.styles=[...E.styles,k`
      :host {
        display: block;
        min-width: 0;
      }

      .rail {
        min-width: 0;
      }

      .rail[hidden] {
        display: none !important;
      }

      .rail.horizontal {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: var(--esp-menu-horizontal-justify-content, flex-start);
        height: 100%;
        width: 100%;
        min-width: 0;
        overflow: visible;
      }

      .rail.horizontal.wrap {
        flex-wrap: wrap;
        height: auto;
      }

      .rail.horizontal.scroll {
        overflow-x: auto;
        overflow-y: visible;
        scrollbar-width: thin;
      }

      .rail.vertical {
        position: relative;
        display: flex;
        flex-direction: column;
        width: min-content;
        
        overflow-y: visible;
        background-color: var(--esp-menu-background, var(--esp-color-layer-1));
        border-bottom: 1px solid var(--esp-menu-border-color, var(--esp-color-border));
        box-shadow: 2px 0 6px -2px var(--esp-color-shadow);
      }

      .scrim,
      .drawer {
        margin: 0;
        padding: 0;
        border: none;
        background: none;
        inset: unset;
      }

      .scrim:not(:popover-open),
      .drawer:not(:popover-open) {
        display: none;
      }

      .scrim {
        position: fixed;
        top: var(--esp-menu-top-offset, 0px);
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--esp-menu-scrim-color, oklch(from var(--esp-color-shadow) l c h / 0.3));
        opacity: 0;
        user-select: none;
        -webkit-user-select: none;
        touch-action: none;
      }

      .scrim.transitioning {
        transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .scrim.open {
        opacity: 1;
      }

      .drawer {
        position: fixed;
        top: var(--esp-menu-top-offset, 0px);
        width: var(--esp-menu-drawer-width, min(22rem, 86vw));
        max-width: 100vw;
        height: calc(100% - var(--esp-menu-top-offset, 0px));
        display: flex;
        flex-direction: column;
        background-color: var(--esp-menu-background, var(--esp-color-layer-1));
        overflow: hidden scroll;
        scrollbar-width: none;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
        touch-action: pan-y;
        box-shadow: var(--esp-menu-drawer-shadow, 2px 0 8px var(--esp-color-shadow));
        will-change: transform;
      }

      .drawer > * {
        flex-shrink: 0;
      }

      .drawer.transitioning {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .drawer-left {
        left: 0;
        transform: translateX(-100%);
      }

      .drawer-right {
        right: 0;
        transform: translateX(100%);
      }

      .drawer.open {
        transform: translateX(0);
      }

      
      .scrim.full-screen {
        display: none;
      }

      .drawer.full-screen {
        top: 0;
        left: 0;
        right: 0;
        width: 100vw;
        max-width: none;
        height: 100%;
        padding-block: var(--esp-size-normal-to-medium);
        box-shadow: none;
        opacity: 0;
        transform: none;
      }

      .drawer.full-screen.transitioning {
        transition:
          opacity var(--esp-menu-drawer-transition-duration, 0.3s) ease,
          transform var(--esp-menu-drawer-transition-duration, 0.3s) cubic-bezier(0.4, 0, 0.2, 1);
      }

      .drawer.full-screen.transition-slide-down {
        opacity: 1;
        transform: translateY(-100%);
      }

      .drawer.full-screen.transition-slide-up {
        opacity: 1;
        transform: translateY(100%);
      }

      .drawer.full-screen.transition-slide-left {
        opacity: 1;
        transform: translateX(100%);
      }

      .drawer.full-screen.transition-slide-right {
        opacity: 1;
        transform: translateX(-100%);
      }

      .drawer.full-screen.open {
        opacity: 1;
        transform: none;
      }

      .drawer-chrome {
        position: relative;
        display: grid;
        padding-inline: var(--esp-size-normal);
      }

      .drawer-brand {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: var(--esp-menu-drawer-brand-logo-size, calc(3 * var(--esp-size-medium)));
        padding-block: var(--esp-size-normal);
        color: var(
          --_esp-menu-drawer-brand-color,
          var(--esp-menu-drawer-brand-color, var(--esp-color-headings))
        );
      }

      .drawer-brand .configured-brand {
        display: inline-flex;
        align-items: center;
        gap: var(--esp-size-tiny-to-small);
        max-width: 80vw;
        color: inherit;
        font-family: var(
          --_esp-font-brand-effective,
          var(
            --esp-font-brand,
            var(
              --_esp-font-headings-effective,
              var(
                --esp-font-headings,
                var(
                  --_esp-font-body-effective,
                  var(--esp-font-body, var(--_esp-font-body-fallback))
                )
              )
            )
          )
        );
        font-size: var(--esp-type-medium);
        font-weight: var(--esp-font-weight-brand, var(--esp-font-weight-headings));
        text-decoration: none;
      }

      .drawer-brand .brand-logo {
        width: auto;
        height: var(--esp-menu-drawer-brand-logo-size, calc(3 * var(--esp-size-medium)));
        max-width: 60vw;
        object-fit: contain;
      }

      .drawer-close {
        position: absolute;
        top: 0;
        inset-inline-end: 0;
        display: grid;
        place-content: center;
        width: max(44px, calc(3.5 * var(--esp-size-small)));
        height: max(44px, calc(3.5 * var(--esp-size-small)));
        border: none;
        padding: 0;
        background: none;
        color: inherit;
        cursor: pointer;
      }

      .drawer-close:focus-visible {
        outline: 2px solid var(--esp-color-link);
        outline-offset: -2px;
      }

      
      .drawer.full-screen esp-menu-item,
      .drawer.full-screen esp-menu-group {
        --esp-menu-item-border-color: transparent;
        --esp-menu-item-background: transparent;
        --esp-menu-item-hover-background: transparent;
        --esp-menu-item-active-background: transparent;
        --esp-menu-item-font-size: var(--esp-menu-drawer-item-font-size, var(--esp-type-large));
        --esp-menu-item-padding: var(--esp-size-small) var(--esp-size-normal);
        --esp-menu-group-border-color: transparent;
        --esp-menu-group-background: transparent;
        --esp-menu-group-hover-background: transparent;
      }

      .drawer.full-screen esp-menu-item::part(menu-text),
      .drawer.full-screen esp-menu-group::part(menu-text) {
        display: flex;
        flex: 1 1 auto;
        justify-content: center;
        text-align: center;
      }

      @media (prefers-reduced-motion: reduce) {
        .scrim.transitioning,
        .drawer.transitioning,
        .drawer.full-screen.transitioning {
          transition: none;
        }
      }
    `],l([d({type:String,reflect:!0})],n.prototype,"mode",void 0),l([d({type:String,reflect:!0})],n.prototype,"overflow",void 0),l([d({type:String,reflect:!0})],n.prototype,"side",void 0),l([d({attribute:"drawer-presentation",type:String,reflect:!0})],n.prototype,"drawerPresentation",void 0),l([d({attribute:"full-screen-transition",type:String,reflect:!0})],n.prototype,"fullScreenTransition",void 0),l([d({attribute:!1})],n.prototype,"drawerBrand",void 0),l([d({attribute:!1})],n.prototype,"liftedCloseControl",void 0),l([d({attribute:"aria-label",type:String})],n.prototype,"ariaLabel",void 0),l([d({type:Boolean,attribute:"auto-expand"})],n.prototype,"autoExpand",void 0),l([d({type:Boolean})],n.prototype,"sliding",null),l([d({type:Boolean})],n.prototype,"collapsed",null),l([y()],n.prototype,"drawerOpen",void 0),l([y()],n.prototype,"drawerShown",void 0),l([y()],n.prototype,"drawerTransitioning",void 0),l([d({attribute:!1})],n.prototype,"hasExternalDrawerControl",void 0),l([d({attribute:!1})],n.prototype,"previewCollapseRequested",void 0),n=f=l([M("esp-menu")],n);export{n as EspalierMenu};
