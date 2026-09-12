var l=function(g,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(g,e,t,i);else for(var o=g.length-1;o>=0;o--)(n=g[o])&&(s=(r<3?n(s):r>3?n(e,t,s):n(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s},y;import{css as N,html as f,nothing as w}from"lit";import{customElement as M,property as h,state as F}from"lit/decorators.js";import{classMap as x}from"lit/directives/class-map.js";import{unsafeHTML as z}from"lit/directives/unsafe-html.js";import{createRef as c,ref as u}from"lit/directives/ref.js";import{styleMap as k}from"lit/directives/style-map.js";import{EspalierElementBase as P}from"../shared/esp-element-base.js";import{ESP_EVENTS as S}from"../shared/events.js";import{getEspBus as I}from"../shared/bus-events.js";import{normalizePath as $,pathStartsWithSegment as O,pathsMatch as R}from"../shared/path-matching.js";import{renderConfiguredBrand as L}from"../shared/configured-brand.js";import{FOCUSABLE_SELECTOR as A,OverlayController as T}from"../shared/overlay-controller.js";import{SwipeRevealController as _}from"./swipe-reveal-controller.js";import"./esp-menu-item.js";import"./esp-menu-group.js";import"../burger/esp-burger.js";import{EspalierMenuItem as E}from"./esp-menu-item.js";import{EspalierMenuGroup as v}from"./esp-menu-group.js";import{COMPACT_VIEWPORT_MEDIA_QUERY as G}from"../shared/responsive.js";import{RafThrottle as H}from"../shared/raf-throttle.js";import{viewportSize as q}from"../shared/viewport.js";import{solveDrawerNestedFit as B}from"./drawer-nested-fit.js";const K=new Set(["panel","full-screen"]),U=new Set(["fade","slide-down","slide-up","slide-left","slide-right"]);let a=y=class extends P{ownsDrawerLock(){return this.isFullScreenDrawer}fullScreenInertAnchor(){return y.inertAnchorFor(this)}static inertAnchorFor(e){let t=e,i=e;for(;;){const r=i.parentElement;if(r){if(r.localName==="esp-page"||r.localName==="esp-root")return i;r===document.body&&(t=i),i=r;continue}const s=i.getRootNode();if(s instanceof ShadowRoot&&s.host instanceof HTMLElement){i=s.host;continue}return t}}constructor(){super(),this.itemsSlot=c(),this.railRef=c(),this.scrimRef=c(),this.drawerRef=c(),this.bus=I(),this.closeTransitionTimer=null,this.drawerGroupOpenOverrides=new Map,this.overlay=new T({host:this,getFocusTrapContainer:()=>this.drawerRef.value??null,getFocusScope:()=>this.fullScreenFocusScope(),getInertAnchor:()=>this.fullScreenInertAnchor(),promote:!1,scrollLock:{preserveScrollPosition:!0}}),this.fullScreenSession=!1,this.openedFullScreen=!1,this.drawerKeydownAttached=!1,this.nestedFitProbe=c(),this.nestedFitCapProbe=c(),this.nestedFitFloorProbe=c(),this.nestedFitPadProbe=c(),this.nestedFitTextProbe=c(),this.nestedFit=null,this.nestedFitMeasured=!1,this.nestedFitIdleHandle=null,this.nestedFitFallback=null,this.nestedFitResize=new H(()=>this.measureNestedFit()),this.nestedFitObserver=null,this.onNestedFitResize=()=>{this.drawerPresentation==="full-screen"&&this.nestedFitResize.schedule()},this.onNestedFitFontsLoaded=()=>this.scheduleNestedFit(!0),this.onOverlayOpened=e=>{if(e===this.overlay||!this.drawerOpen)return;const t=this.drawerTrigger;this.drawerTrigger=null,t&&e.redirectFocusRestore(t),this.swipeController.closeForHandoff(),this.onDrawerTransitionEnd()},this._sliding=!1,this._mobileCollapsed=!1,this.verticalDrawerQuery=null,this.onVerticalDrawerChange=e=>this.setMobileCollapsed(e.matches),this.mode="horizontal",this.overflow="auto",this.side="left",this.drawerPresentation="panel",this.fullScreenTransition="fade",this.drawerBrand=null,this.liftedCloseControl=null,this.ariaLabel=null,this.autoExpand=!1,this.drawerOpen=!1,this.drawerShown=!1,this.drawerTransitioning=!1,this.drawerTrigger=null,this.hasExternalDrawerControl=!1,this.previewCollapseRequested=!1,this.getWidth=()=>{const e=this.railRef.value;return e?Math.max(e.scrollWidth,e.clientWidth):-1},this.onDrawerKeydown=e=>{!this.drawerOpen||!this.openedFullScreen||e.key==="Tab"&&this.overlay.trapFocus(e)},this.onDrawerTransitionEnd=e=>{e&&e.target!==this.drawerRef.value||(this.closeTransitionTimer&&(clearTimeout(this.closeTransitionTimer),this.closeTransitionTimer=null),this.drawerTransitioning=!1,this.drawerOpen||(this.hideDrawerPopover(),this.drawerGroupOpenOverrides.clear()))},this.handleDrawerCloseClick=()=>{this.closeDrawer()},this.swipeController=new _(this,this.side),this.swipeController.enabled=!1}get isFullScreenDrawer(){return K.has(this.drawerPresentation)?this.drawerPresentation==="full-screen":!1}get resolvedFullScreenTransition(){return U.has(this.fullScreenTransition)?this.fullScreenTransition:"fade"}get sliding(){return this._sliding}set sliding(e){const t=this._sliding;this._sliding=e,this.syncSwipeEnabled(),this.propagateToItems(),this.requestUpdate("sliding",t)}get collapsed(){return this.drawerActive}set collapsed(e){e?this.mode="drawer":this.mode==="drawer"&&(this.mode="vertical")}get drawerSide(){return this.overflow==="right-drawer"?"right":this.overflow==="left-drawer"?"left":this.side}get drawerActive(){return this.mode==="drawer"||this._sliding||this.overflow==="left-drawer"||this.overflow==="right-drawer"||this.mode==="vertical"&&(this._mobileCollapsed||this.previewCollapseRequested)&&this.hasExternalDrawerControl}get railMode(){return this.mode==="horizontal"?"horizontal":"vertical"}connectedCallback(){super.connectedCallback(),this.getAttribute("slot")==="right"&&(this.side="right"),!this.verticalDrawerQuery&&typeof window<"u"&&"matchMedia"in window&&(this.verticalDrawerQuery=window.matchMedia(G),this._mobileCollapsed=this.verticalDrawerQuery.matches,this.verticalDrawerQuery.addEventListener("change",this.onVerticalDrawerChange)),this.syncSwipeEnabled(),T.addOpenListener(this.onOverlayOpened),window.addEventListener("resize",this.onNestedFitResize),typeof document<"u"&&document.fonts&&(document.fonts.addEventListener("loadingdone",this.onNestedFitFontsLoaded),document.fonts.ready.then(()=>{this.isConnected&&this.scheduleNestedFit(!0)})),!this.nestedFitObserver&&typeof MutationObserver<"u"&&(this.nestedFitObserver=new MutationObserver(()=>this.scheduleNestedFit(!0)),this.nestedFitObserver.observe(this,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["label"]}))}disconnectedCallback(){T.removeOpenListener(this.onOverlayOpened),window.removeEventListener("resize",this.onNestedFitResize),document.fonts?.removeEventListener("loadingdone",this.onNestedFitFontsLoaded),this.nestedFitObserver?.disconnect(),this.nestedFitObserver=null,this.nestedFitResize.cancel(),this.cancelNestedFitIdle(),this.nestedFitMeasured=!1,this.verticalDrawerQuery?.removeEventListener("change",this.onVerticalDrawerChange),this.verticalDrawerQuery=null,this.detachDrawerKeydown(),this.fullScreenSession=!1,super.disconnectedCallback()}setMobileCollapsed(e){e!==this._mobileCollapsed&&(this._mobileCollapsed=e,this.mode==="vertical"&&this.applyMobileCollapse())}applyMobileCollapse(){this.swipeController.direction=this.drawerSide,this.syncSwipeEnabled(),this.propagateToItems(),this.requestUpdate(),!this.drawerActive&&this.drawerOpen&&this.swipeController.close(!0)}firstUpdated(e){super.firstUpdated(e),this.propagateToItems(),this.scheduleNestedFit()}updated(e){super.updated(e),(e.has("mode")||e.has("overflow")||e.has("side")||e.has("hasExternalDrawerControl")||e.has("previewCollapseRequested"))&&(this.swipeController.direction=this.drawerSide,this.syncSwipeEnabled(),this.propagateToItems(),!this.drawerActive&&this.drawerOpen&&this.swipeController.close(!0)),e.has("drawerPresentation")&&(this.nestedFitMeasured=!1,this.scheduleNestedFit()),this.drawerOpen&&this.openedFullScreen!==this.isFullScreenDrawer&&this.swipeController.close(!0),this.autoExpand&&(e.has("autoExpand")||e.has("mode")&&this.mode!=="horizontal")?this.expandToCurrentPage():this.mode==="horizontal"&&e.has("mode")&&this.closeHorizontalTopLevelGroups()}openDrawer(e){this.drawerActive&&(e?this.drawerTrigger=e:this.drawerOpen||(this.drawerTrigger=null),this.swipeController.open())}closeDrawer(){this.swipeController.close(!0)}toggleDrawer(e){this.drawerOpen?this.closeDrawer():this.openDrawer(e)}toggleOpened(){this.toggleDrawer()}get isDrawerOpen(){return this.drawerOpen}syncSwipeEnabled(){this.swipeController.direction=this.drawerSide,this.swipeController.enabled=this.drawerActive}getAssignedChildren(){return this.itemsSlot.value?.assignedElements()??[]}propagateToItems(){const e=this.railMode;for(const t of this.getAssignedChildren())t instanceof E?(t.mode=e,t.depth=0,t.touchDevice=this.swipeController.isTouch):t instanceof v&&(t.mode=e,t.depth=0,t.touchDevice=this.swipeController.isTouch)}handleSlotChange(){this.propagateToItems(),this.scheduleNestedFit(!0)}scheduleNestedFit(e=!1){if(this.drawerPresentation!=="full-screen"){this.cancelNestedFitIdle(),this.nestedFit!==null&&(this.nestedFit=null);return}if(e&&(this.nestedFitMeasured=!1),e&&this.drawerShown){this.cancelNestedFitIdle(),this.nestedFitResize.schedule();return}if(this.nestedFitIdleHandle!==null||this.nestedFitFallback!==null)return;const t=()=>{this.nestedFitIdleHandle=null,this.nestedFitFallback=null,this.isConnected&&this.measureNestedFit()};typeof requestIdleCallback=="function"?this.nestedFitIdleHandle=requestIdleCallback(t,{timeout:2e3}):this.nestedFitFallback={stage:"frame",handle:requestAnimationFrame(()=>{this.nestedFitFallback={stage:"timeout",handle:window.setTimeout(t,0)}})}}cancelNestedFitIdle(){this.nestedFitIdleHandle!==null&&(cancelIdleCallback(this.nestedFitIdleHandle),this.nestedFitIdleHandle=null),this.nestedFitFallback!==null&&(this.nestedFitFallback.stage==="frame"?cancelAnimationFrame(this.nestedFitFallback.handle):window.clearTimeout(this.nestedFitFallback.handle),this.nestedFitFallback=null)}ensureNestedFitMeasured(){this.nestedFitMeasured||(this.cancelNestedFitIdle(),this.measureNestedFit())}collectNestedLabels(){const e=[];let t=!1;const i=(r,s)=>{for(const n of r){const o=s>0;n instanceof E?o&&e.push(n.label):n instanceof v&&(o&&(e.push(n.label),n.url&&(t=!0)),i(Array.from(n.children),s+1))}};return i(this.getAssignedChildren(),0),{labels:e,linkedGroup:t}}readNestedFitMetrics(e){const t=this.nestedFitCapProbe.value,i=this.nestedFitFloorProbe.value,r=this.nestedFitPadProbe.value,s=this.nestedFitTextProbe.value;if(!t||!i||!r||!s)return null;const n=parseFloat(getComputedStyle(t).fontSize),o=parseFloat(getComputedStyle(i).fontSize),d=getComputedStyle(r),p=parseFloat(d.paddingInlineStart),b=parseFloat(d.paddingInlineEnd);if(![n,o,p,b].every(m=>Number.isFinite(m)))return null;s.replaceChildren(...e.map(m=>{const D=document.createElement("span");return D.textContent=m,D}));const C=Array.from(s.children,m=>m.getBoundingClientRect().width);return s.replaceChildren(),{capPx:n,floorPx:o,paddingPx:p,smallPx:b,widths:C}}measureNestedFit(){if(!this.isConnected||this.drawerPresentation!=="full-screen")return;const{labels:e,linkedGroup:t}=this.collectNestedLabels();if(this.nestedFitMeasured=!0,e.length===0){this.nestedFit!==null&&(this.nestedFit=null);return}const i=this.readNestedFitMetrics(e);if(!i)return;const r=this.drawerRef.value,s=r&&this.drawerShown?r.getBoundingClientRect().width:0,n=s>0?s:q().width,o=t?2*(2*i.smallPx+4.5):0,d=n-2*i.paddingPx-o,p=B({capPx:i.capPx,floorPx:i.floorPx,availablePx:d,widestAtCapPx:Math.max(0,...i.widths)});this.nestedFit&&this.nestedFit.fontSizePx===p.fontSizePx&&this.nestedFit.wrap===p.wrap||(this.nestedFit=p)}onSwipeRevealChanged(e){e!==this.drawerOpen&&(this.drawerOpen=e,e?(this.openedFullScreen=this.isFullScreenDrawer,this.openedFullScreen&&this.ensureNestedFitMeasured(),this.drawerGroupOpenOverrides.clear(),this.bus.publish("close-popovers",{}),this.updateComplete.then(()=>this.showDrawerPopover())):(this.detachDrawerKeydown(),this.fullScreenSession&&(this.fullScreenSession=!1,this.overlay.close()),this.drawerShown=!1,this.drawerTransitioning=!0,this.updateComplete.then(()=>this.startCloseTransition()),requestAnimationFrame(()=>this.restoreDrawerTriggerFocus())),this.dispatchEvent(new CustomEvent(e?S.MENU_DRAWER_OPENED:S.MENU_DRAWER_CLOSED,{bubbles:!0,composed:!0})))}showDrawerPopover(){const e=this.scrimRef.value,t=this.drawerRef.value;if(!(!e||!t||!this.isConnected)){this.swipeController.drawerElement=t;try{this.openedFullScreen||e.showPopover(),t.showPopover()}catch{}this.dispatchEvent(new CustomEvent(S.MENU_DRAWER_PRESENTED,{bubbles:!0,composed:!0})),t.getBoundingClientRect(),requestAnimationFrame(()=>{!this.drawerOpen||!this.isConnected||(this.drawerTransitioning=!0,this.drawerShown=!0,this.openedFullScreen&&(this.fullScreenSession=!0,this.overlay.open(),this.attachDrawerKeydown(),this.updateComplete.then(()=>{this.drawerOpen&&this.overlay.moveFocusInto()})))})}}attachDrawerKeydown(){this.drawerKeydownAttached||(document.addEventListener("keydown",this.onDrawerKeydown),this.drawerKeydownAttached=!0)}detachDrawerKeydown(){this.drawerKeydownAttached&&(document.removeEventListener("keydown",this.onDrawerKeydown),this.drawerKeydownAttached=!1)}fullScreenFocusScope(){const e=this.drawerRef.value;if(!e)return[];const t=n=>n instanceof HTMLElement&&n.getClientRects().length>0,i=[],r=n=>{if(n.matches(A)&&t(n)&&i.push(n),n.shadowRoot)for(const o of n.shadowRoot.querySelectorAll(A))t(o)&&i.push(o)};for(const n of e.querySelectorAll("*"))if(r(n),n instanceof HTMLSlotElement)for(const o of n.assignedElements({flatten:!0})){r(o);for(const d of o.querySelectorAll("*"))r(d)}const s=this.liftedCloseControl;if(s?.isConnected){const n=s.shadowRoot?.querySelector("button")??s;t(n)&&i.push(n)}return i}static drawerTransitionMs(e){const t=getComputedStyle(e),i=o=>o.split(",").map(d=>d.trim()).filter(Boolean).map(d=>{const p=Number.parseFloat(d);return Number.isFinite(p)?d.endsWith("ms")?p:p*1e3:0}),r=i(t.transitionDuration),s=i(t.transitionDelay);let n=0;return r.forEach((o,d)=>{n=Math.max(n,o+(s[d%Math.max(s.length,1)]??0))}),n}startCloseTransition(){const e=this.drawerRef.value;if(!e){this.hideDrawerPopover();return}this.closeTransitionTimer&&clearTimeout(this.closeTransitionTimer);const t=y.drawerTransitionMs(e);if(t===0){this.onDrawerTransitionEnd();return}this.closeTransitionTimer=setTimeout(()=>{this.closeTransitionTimer=null,!this.drawerOpen&&this.drawerTransitioning&&this.onDrawerTransitionEnd()},t+50)}hideDrawerPopover(){const e=this.scrimRef.value,t=this.drawerRef.value;this.swipeController.drawerElement=null,t&&(t.style.cssText="");try{t?.hidePopover()}catch{}try{e?.hidePopover()}catch{}}restoreDrawerTriggerFocus(){const e=this.drawerTrigger;this.drawerTrigger=null,e?.isConnected&&e.focus({preventScroll:!0})}getAutoExpandedGroups(e=!0){const t=new Set;let i=null;for(const s of this.querySelectorAll("esp-menu-item")){const n=s.url||s.getAttribute("url");if(n&&R(n)){i=s;break}}if(!i)for(const s of this.querySelectorAll("esp-menu-group")){const n=s.url||s.getAttribute("url");if(n&&R(n)){i=s;break}}if(!i&&e){for(const s of this.querySelectorAll("esp-menu-group"))s.parentElement===this&&t.add(s);return t}if(!i)return t;i instanceof v&&t.add(i);let r=i.parentElement;for(;r&&r!==this;)r instanceof v&&t.add(r),r=r.parentElement;return t}isHorizontalTopLevelGroup(e){return e.mode==="horizontal"&&e.depth===0}groupUrlPrefixMatches(e){return O(location.pathname,e.urlPrefix)}groupPathMatches(e){if(this.groupUrlPrefixMatches(e))return!0;const t=e.url||e.getAttribute("url");return t?O(location.pathname,$(t)):!1}expandToCurrentPage(){const e=this.getAutoExpandedGroups(),t=this.querySelectorAll("esp-menu-group");for(const i of t)i.open=e.has(i)&&!this.isHorizontalTopLevelGroup(i)}closeHorizontalTopLevelGroups(){for(const e of this.querySelectorAll("esp-menu-group"))this.isHorizontalTopLevelGroup(e)&&(e.open=!1)}getDrawerAutoExpandedGroups(){return this.getAutoExpandedGroups(!1)}collectDrawerNodes(e,t=this.getDrawerAutoExpandedGroups()){const i=[];for(const r of e)if(r instanceof E){const s=r.querySelector(":scope > svg, :scope > img");i.push({kind:"item",label:r.label,url:r.url,open:!1,icon:r.icon,iconHtml:s?.outerHTML||"",children:[],originalItem:r,originalGroup:null})}else if(r instanceof v){const s=r.querySelector(':scope > [slot="icon"]'),n=t.has(r)||this.groupPathMatches(r),o=this.drawerGroupOpenOverrides.get(r)??(r.open||n);i.push({kind:"group",label:r.label,url:r.url||"",open:o,icon:r.icon,iconHtml:s?.outerHTML||"",children:this.collectDrawerNodes(Array.from(r.children),t),originalItem:null,originalGroup:r})}return i}renderDrawerNode(e){return e.kind==="item"?f`<esp-menu-item
        label=${e.label}
        .url=${e.url}
        .icon=${e.icon}
        .mode=${"drawer"}
        @esp-clicked=${()=>!e.url&&e.originalItem?this.handleDrawerItemClick(e.originalItem):void 0}
        >${z(e.iconHtml)}</esp-menu-item
      >`:f`<esp-menu-group
      label=${e.label}
      .url=${e.url}
      .icon=${e.icon}
      .mode=${"drawer"}
      .fullScreenPresentation=${this.openedFullScreen}
      ?open=${e.open}
      @esp-menu-group-toggle=${t=>{e.originalGroup&&(this.drawerGroupOpenOverrides.set(e.originalGroup,t.detail.open),this.isHorizontalTopLevelGroup(e.originalGroup)||(e.originalGroup.open=t.detail.open))}}
    >
      ${e.iconHtml?z(e.iconHtml):w}
      ${e.children.map(t=>this.renderDrawerNode(t))}
    </esp-menu-group>`}handleDrawerItemClick(e){e.dispatchEvent(new CustomEvent(S.CLICKED,{detail:{},bubbles:!0,composed:!0})),this.swipeController.close(!0)}render(){const e=this.drawerOpen||this.drawerTransitioning,t=this.drawerActive,i={rail:!0,horizontal:this.railMode==="horizontal",vertical:this.railMode==="vertical",wrap:this.overflow==="wrap",scroll:this.overflow==="scroll","drawer-forced":this.drawerActive},r=e?this.openedFullScreen:this.isFullScreenDrawer,s={drawer:!0,"drawer-left":this.drawerSide==="left","drawer-right":this.drawerSide==="right","full-screen":r,[`transition-${this.resolvedFullScreenTransition}`]:r,transitioning:this.drawerTransitioning,open:this.drawerShown,"nested-wrap":r&&this.nestedFit?.wrap===!0},n={"--_esp-menu-drawer-nested-font-size":r&&this.nestedFit?`${this.nestedFit.fontSizePx}px`:null},o=e?this.collectDrawerNodes(this.getAssignedChildren()):[],d=this.ariaLabel??"Navigation",p={"--_esp-menu-drawer-brand-color":this.drawerBrand?.brandColor||null},b=r&&e?f`<div class="drawer-chrome">
            <div class="drawer-brand" style=${k(p)}>
              <slot name="drawer-brand"
                >${this.drawerBrand?L(this.drawerBrand):w}</slot
              >
            </div>
            ${this.liftedCloseControl?w:f`
                  <button
                    type="button"
                    class="drawer-close"
                    aria-label="Close menu"
                    @click=${this.handleDrawerCloseClick}
                  >
                    <esp-burger presentation-only menu-open></esp-burger>
                  </button>`}
          </div>`:w;return f`
      <nav
        ${u(this.railRef)}
        class=${x(i)}
        aria-label=${d}
        ?hidden=${t}
      >
        <slot ${u(this.itemsSlot)} @slotchange=${this.handleSlotChange}></slot>
      </nav>
      <div
        ${u(this.scrimRef)}
        class=${x({scrim:!0,"full-screen":r,open:this.drawerShown,transitioning:this.drawerTransitioning})}
        popover="manual"
      ></div>
      <nav
        ${u(this.drawerRef)}
        class=${x(s)}
        style=${k(n)}
        aria-label=${d}
        popover="manual"
        ?data-no-swipe=${r}
        @transitionend=${this.onDrawerTransitionEnd}
      >
        ${b} ${e?o.map(C=>this.renderDrawerNode(C)):w}
      </nav>
      ${this.drawerPresentation==="full-screen"?f`<div class="nested-fit-probe" aria-hidden="true" ${u(this.nestedFitProbe)}>
            <span class="nested-fit-cap" ${u(this.nestedFitCapProbe)}>&#8203;</span>
            <span class="nested-fit-floor" ${u(this.nestedFitFloorProbe)}>&#8203;</span>
            <span class="nested-fit-pad" ${u(this.nestedFitPadProbe)}>&#8203;</span>
            <div class="nested-fit-text" ${u(this.nestedFitTextProbe)}></div>
          </div>`:w}
    `}};a.styles=[...P.styles,N`
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

      
      .drawer.full-screen esp-menu-group esp-menu-item,
      .drawer.full-screen esp-menu-group esp-menu-group {
        --esp-menu-item-font-size: var(
          --_esp-menu-drawer-nested-font-size,
          var(
            --esp-menu-drawer-nested-item-max-font-size,
            calc(0.9 * var(--esp-menu-drawer-item-font-size, var(--esp-type-large)))
          )
        );
      }

      
      .drawer.full-screen.nested-wrap esp-menu-group esp-menu-item::part(menu-text),
      .drawer.full-screen.nested-wrap esp-menu-group esp-menu-group::part(menu-text) {
        white-space: normal;
        overflow-wrap: anywhere;
        text-overflow: clip;
      }

      
      .nested-fit-probe {
        position: absolute;
        inset-inline-start: 0;
        top: 0;
        width: 0;
        height: 0;
        overflow: hidden;
        visibility: hidden;
        pointer-events: none;
        contain: strict;
        white-space: nowrap;
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
        
        font-weight: var(--esp-menu-item-active-font-weight, var(--esp-font-weight-headings, 700));
      }

      .nested-fit-cap,
      .nested-fit-text {
        font-size: var(
          --esp-menu-drawer-nested-item-max-font-size,
          calc(0.9 * var(--esp-menu-drawer-item-font-size, var(--esp-type-large)))
        );
      }

      .nested-fit-floor {
        font-size: var(--esp-menu-drawer-nested-item-min-font-size, max(14px, 0.875rem));
      }

      .nested-fit-pad {
        padding-inline: var(--esp-size-normal) var(--esp-size-small);
      }

      .nested-fit-text > span {
        display: block;
        width: max-content;
      }

      @media (prefers-reduced-motion: reduce) {
        .scrim.transitioning,
        .drawer.transitioning,
        .drawer.full-screen.transitioning {
          transition: none;
        }
      }
    `],l([F()],a.prototype,"nestedFit",void 0),l([h({type:String,reflect:!0})],a.prototype,"mode",void 0),l([h({type:String,reflect:!0})],a.prototype,"overflow",void 0),l([h({type:String,reflect:!0})],a.prototype,"side",void 0),l([h({attribute:"drawer-presentation",type:String,reflect:!0})],a.prototype,"drawerPresentation",void 0),l([h({attribute:"full-screen-transition",type:String,reflect:!0})],a.prototype,"fullScreenTransition",void 0),l([h({attribute:!1})],a.prototype,"drawerBrand",void 0),l([h({attribute:!1})],a.prototype,"liftedCloseControl",void 0),l([h({attribute:"aria-label",type:String})],a.prototype,"ariaLabel",void 0),l([h({type:Boolean,attribute:"auto-expand"})],a.prototype,"autoExpand",void 0),l([h({type:Boolean})],a.prototype,"sliding",null),l([h({type:Boolean})],a.prototype,"collapsed",null),l([F()],a.prototype,"drawerOpen",void 0),l([F()],a.prototype,"drawerShown",void 0),l([F()],a.prototype,"drawerTransitioning",void 0),l([h({attribute:!1})],a.prototype,"hasExternalDrawerControl",void 0),l([h({attribute:!1})],a.prototype,"previewCollapseRequested",void 0),a=y=l([M("esp-menu")],a);export{a as EspalierMenu};
