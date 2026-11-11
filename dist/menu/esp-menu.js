var l=function(y,e,t,r){var n=arguments.length,s=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(y,e,t,r);else for(var o=y.length-1;o>=0;o--)(i=y[o])&&(s=(n<3?i(s):n>3?i(e,t,s):i(e,t))||s);return n>3&&s&&Object.defineProperty(e,t,s),s},C;import{css as L,html as E,nothing as m}from"lit";import{customElement as _,eventOptions as H,property as h,state as S}from"lit/decorators.js";import{classMap as g}from"lit/directives/class-map.js";import{createRef as u,ref as p}from"lit/directives/ref.js";import{styleMap as z}from"lit/directives/style-map.js";import{EspalierElementBase as D}from"../shared/esp-element-base.js";import{ESP_EVENTS as x}from"../shared/events.js";import{getEspBus as I}from"../shared/bus-events.js";import{normalizePath as $,pathStartsWithSegment as N,pathsMatch as k}from"../shared/path-matching.js";import{renderConfiguredBrand as G}from"../shared/configured-brand.js";import{FOCUSABLE_SELECTOR as R,OverlayController as T}from"../shared/overlay-controller.js";import{SwipeRevealController as q}from"./swipe-reveal-controller.js";import"./esp-menu-item.js";import"./esp-menu-group.js";import"../burger/esp-burger.js";import{EspalierMenuItem as b}from"./esp-menu-item.js";import{EspalierMenuGroup as v}from"./esp-menu-group.js";import{COMPACT_VIEWPORT_MEDIA_QUERY as U}from"../shared/responsive.js";import{RafThrottle as A}from"../shared/raf-throttle.js";import{viewportSize as B}from"../shared/viewport.js";import{solveDrawerNestedFit as K}from"./drawer-nested-fit.js";import{collectMenuNodes as P,renderMenuNode as W,MENU_SOURCE_CHANGED as M,MENU_PRESENTATION_CHANGED as j,MENU_LAYOUT_CHANGED as Q,MENU_FIT_PROBE_STYLES as V}from"./menu-presentation.js";const X=new Set(["panel","full-screen"]),Y=new Set(["fade","slide-down","slide-up","slide-left","slide-right"]);let a=C=class extends D{ownsDrawerLock(){return this.isFullScreenDrawer}fullScreenInertAnchor(){return C.inertAnchorFor(this)}static inertAnchorFor(e){let t=e,r=e;for(;;){const n=r.parentElement;if(n){if(n.localName==="esp-page"||n.localName==="esp-root")return r;n===document.body&&(t=r),r=n;continue}const s=r.getRootNode();if(s instanceof ShadowRoot&&s.host instanceof HTMLElement){r=s.host;continue}return t}}constructor(){super(),this.itemsSlot=u(),this.railRef=u(),this.scrimRef=u(),this.drawerRef=u(),this.bus=I(),this.closeTransitionTimer=null,this.drawerGroupOpenOverrides=new Map,this.overlay=new T({host:this,getFocusTrapContainer:()=>this.drawerRef.value??null,getFocusScope:()=>this.fullScreenFocusScope(),getInertAnchor:()=>this.fullScreenInertAnchor(),promote:!1,scrollLock:{preserveScrollPosition:!0}}),this.fullScreenSession=!1,this.openedFullScreen=!1,this.drawerKeydownAttached=!1,this.nestedFitProbe=u(),this.nestedFitCapProbe=u(),this.nestedFitFloorProbe=u(),this.nestedFitPadProbe=u(),this.nestedFitTextProbe=u(),this.nestedFit=null,this.nestedFitMeasured=!1,this.nestedFitIdleHandle=null,this.nestedFitFallback=null,this.nestedFitResize=new A(()=>this.measureNestedFit()),this.nestedFitObserver=null,this.onNestedFitResize=()=>{this.headerNavigationOwned&&this.headerLayout.schedule(),this.drawerPresentation==="full-screen"&&this.nestedFitResize.schedule()},this.onNestedFitFontsLoaded=()=>{this.scheduleNestedFit(!0),this.headerNavigationOwned&&this.headerLayout.schedule()},this.onOverlayOpened=e=>{if(e===this.overlay||!this.drawerOpen)return;const t=this.drawerTrigger;this.drawerTrigger=null,t&&e.redirectFocusRestore(t),this.swipeController.closeForHandoff(),this.onDrawerTransitionEnd()},this._sliding=!1,this._mobileCollapsed=!1,this.verticalDrawerQuery=null,this.onVerticalDrawerChange=e=>this.setMobileCollapsed(e.matches),this.mode="horizontal",this.overflow="auto",this.side="left",this.drawerPresentation="panel",this.fullScreenTransition="fade",this.drawerBrand=null,this.liftedCloseControl=null,this.ariaLabel=null,this.autoExpand=!1,this.drawerOpen=!1,this.drawerShown=!1,this.drawerTransitioning=!1,this.drawerTrigger=null,this.headerEndOwner=null,this.promotedItems=new Set,this.observedHeaderRail=null,this.headerLayout=new A(()=>{this.headerNavigationOwned&&this.notifyHeaderLayout()}),this.headerFitObserver=new ResizeObserver(()=>this.headerLayout.schedule()),this.sourceObserver=null,this.onSourceChanged=e=>{const t=e.composedPath()[0];!(t instanceof Element)||!this.contains(t)||t.closest("esp-menu")!==this||(this.headerNavigationOwned||this.drawerOpen||this.drawerTransitioning)&&this.refreshHeaderSources()},this.hasExternalDrawerControl=!1,this.previewCollapseRequested=!1,this.getWidth=()=>{const e=this.railRef.value;return e?Math.max(e.scrollWidth,e.clientWidth):-1},this.onDrawerKeydown=e=>{!this.drawerOpen||!this.openedFullScreen||e.key==="Tab"&&this.overlay.trapFocus(e)},this.onDrawerTransitionEnd=e=>{e&&e.target!==this.drawerRef.value||(this.closeTransitionTimer&&(clearTimeout(this.closeTransitionTimer),this.closeTransitionTimer=null),this.drawerTransitioning=!1,this.drawerOpen||(this.hideDrawerPopover(),this.drawerGroupOpenOverrides.clear()))},this.handleDrawerCloseClick=()=>{this.closeDrawer()},this.swipeController=new q(this,this.side),this.swipeController.enabled=!1}get isFullScreenDrawer(){return X.has(this.drawerPresentation)?this.drawerPresentation==="full-screen":!1}get resolvedFullScreenTransition(){return Y.has(this.fullScreenTransition)?this.fullScreenTransition:"fade"}get sliding(){return this._sliding}set sliding(e){const t=this._sliding;this._sliding=e,this.syncSwipeEnabled(),this.propagateToItems(),this.requestUpdate("sliding",t)}get drawerSide(){return this.overflow==="right-drawer"?"right":this.overflow==="left-drawer"?"left":this.side}get drawerActive(){return this.mode==="drawer"||this._sliding||this.overflow==="left-drawer"||this.overflow==="right-drawer"||this.mode==="vertical"&&(this._mobileCollapsed||this.previewCollapseRequested)&&this.hasExternalDrawerControl}get headerDrawerActive(){return this.drawerActive||this.drawerOpen||this.drawerTransitioning}get headerNavigationOwned(){return this.mode==="horizontal"&&this.headerEndOwner===this.parentElement&&this.slot==="menu"&&this.isConnected}get headerEndNodes(){return this.headerNavigationOwned?P(this.getAssignedChildren(),void 0,{headerEndOnly:!0}):[]}getHeaderNavigationWidths(){return{main:this.railRef.value?.getBoundingClientRect().width??0}}syncHeaderEndSources(){const e=new Set(this.headerEndNodes.flatMap(t=>t.originalItem?[t.originalItem]:[]));for(const t of this.promotedItems)e.has(t)||t.setHeaderEndPromoted(!1);for(const t of this.getAssignedChildren())t instanceof b&&t.setHeaderEndPromoted(e.has(t));this.promotedItems=e}bindHeaderObservation(){const e=this.headerNavigationOwned?this.railRef.value??null:null;e!==this.observedHeaderRail&&(this.headerFitObserver.disconnect(),this.observedHeaderRail=e,e&&this.headerFitObserver.observe(e,{box:"border-box"})),e&&!this.sourceObserver?(this.sourceObserver=new MutationObserver(t=>{t.some(r=>this.isHeaderSourceMutation(r))&&this.refreshHeaderSources()}),this.sourceObserver.observe(this,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["header-end","url","appearance","style","class"]})):e||(this.sourceObserver?.disconnect(),this.sourceObserver=null)}isHeaderSourceMutation(e){const t=e.target;return t instanceof Element?t===this?!0:t.closest("esp-menu")!==this?!1:e.type==="attributes"?t.parentElement===this&&(t instanceof b||t instanceof v):t instanceof b||t instanceof v:!1}notifyHeaderPresentation(){this.dispatchEvent(new CustomEvent(j))}notifyHeaderLayout(){this.dispatchEvent(new CustomEvent(Q))}refreshHeaderSources(){this.syncHeaderEndSources(),this.requestUpdate(),this.headerNavigationOwned&&this.headerLayout.schedule()}get railMode(){return this.mode==="horizontal"?"horizontal":"vertical"}connectedCallback(){super.connectedCallback(),this.addEventListener(M,this.onSourceChanged),this.updateComplete.then(()=>{this.isConnected&&(this.propagateToItems(),this.bindHeaderObservation())}),this.getAttribute("slot")==="right"&&(this.side="right"),!this.verticalDrawerQuery&&typeof window<"u"&&"matchMedia"in window&&(this.verticalDrawerQuery=window.matchMedia(U),this._mobileCollapsed=this.verticalDrawerQuery.matches,this.verticalDrawerQuery.addEventListener("change",this.onVerticalDrawerChange)),this.syncSwipeEnabled(),T.addOpenListener(this.onOverlayOpened),window.addEventListener("resize",this.onNestedFitResize),typeof document<"u"&&document.fonts&&(document.fonts.addEventListener("loadingdone",this.onNestedFitFontsLoaded),document.fonts.ready.then(()=>{this.isConnected&&this.onNestedFitFontsLoaded()})),!this.nestedFitObserver&&typeof MutationObserver<"u"&&(this.nestedFitObserver=new MutationObserver(()=>this.scheduleNestedFit(!0)),this.nestedFitObserver.observe(this,{subtree:!0,childList:!0,attributes:!0,attributeFilter:["label"]}))}disconnectedCallback(){this.removeEventListener(M,this.onSourceChanged),this.sourceObserver?.disconnect(),this.sourceObserver=null,this.headerFitObserver.disconnect(),this.headerEndOwner=null,this.observedHeaderRail=null,this.headerLayout.cancel();for(const e of this.promotedItems)e.setHeaderEndPromoted(!1);this.promotedItems.clear(),T.removeOpenListener(this.onOverlayOpened),window.removeEventListener("resize",this.onNestedFitResize),document.fonts?.removeEventListener("loadingdone",this.onNestedFitFontsLoaded),this.nestedFitObserver?.disconnect(),this.nestedFitObserver=null,this.nestedFitResize.cancel(),this.cancelNestedFitIdle(),this.nestedFitMeasured=!1,this.verticalDrawerQuery?.removeEventListener("change",this.onVerticalDrawerChange),this.verticalDrawerQuery=null,this.detachDrawerKeydown(),this.fullScreenSession=!1,super.disconnectedCallback()}setMobileCollapsed(e){e!==this._mobileCollapsed&&(this._mobileCollapsed=e,this.mode==="vertical"&&this.applyMobileCollapse())}applyMobileCollapse(){this.swipeController.direction=this.drawerSide,this.syncSwipeEnabled(),this.propagateToItems(),this.requestUpdate(),!this.drawerActive&&this.drawerOpen&&this.swipeController.close(!0)}firstUpdated(e){super.firstUpdated(e),this.propagateToItems(),this.scheduleNestedFit()}willUpdate(e){super.willUpdate(e),this.syncHeaderEndSources()}updated(e){super.updated(e),this.bindHeaderObservation(),["mode","overflow","headerEndOwner"].some(t=>e.has(t))&&this.notifyHeaderLayout(),["drawerOpen","drawerTransitioning","sliding","ariaLabel"].some(t=>e.has(t))&&this.notifyHeaderPresentation(),(e.has("mode")||e.has("overflow")||e.has("headerEndOwner")||e.has("side")||e.has("hasExternalDrawerControl")||e.has("previewCollapseRequested")||e.has("drawerOpen")||e.has("drawerTransitioning"))&&(this.swipeController.direction=this.drawerSide,this.syncSwipeEnabled(),this.propagateToItems(),!this.drawerActive&&this.drawerOpen&&this.swipeController.close(!0)),e.has("drawerPresentation")&&(this.nestedFitMeasured=!1,this.scheduleNestedFit()),this.drawerOpen&&this.openedFullScreen!==this.isFullScreenDrawer&&this.swipeController.close(!0),this.autoExpand&&(e.has("autoExpand")||e.has("mode")&&this.mode!=="horizontal")?this.expandToCurrentPage():this.mode==="horizontal"&&e.has("mode")&&this.closeHorizontalTopLevelGroups()}openDrawer(e){this.drawerActive&&(e?this.drawerTrigger=e:this.drawerOpen||(this.drawerTrigger=null),this.swipeController.open())}closeDrawer(){this.swipeController.close(!0)}toggleDrawer(e){this.drawerOpen?this.closeDrawer():this.openDrawer(e)}get isDrawerOpen(){return this.drawerOpen}syncSwipeEnabled(){this.swipeController.direction=this.drawerSide,this.swipeController.enabled=this.drawerActive}getAssignedChildren(){return this.itemsSlot.value?.assignedElements()??[]}propagateToItems(){const e=this.railMode;for(const t of this.getAssignedChildren())t instanceof b?(t.mode=e,t.depth=0,t.touchDevice=this.swipeController.isTouch):t instanceof v&&(t.mode=e,t.depth=0,t.touchDevice=this.swipeController.isTouch,t.scrollPanelEnabled=e==="horizontal"&&(this.headerNavigationOwned||this.overflow==="scroll")&&!this.headerDrawerActive)}handleSlotChange(){this.propagateToItems(),this.refreshHeaderSources(),this.scheduleNestedFit(!0)}scheduleNestedFit(e=!1){if(this.drawerPresentation!=="full-screen"){this.cancelNestedFitIdle(),this.nestedFit!==null&&(this.nestedFit=null);return}if(e&&(this.nestedFitMeasured=!1),e&&this.drawerShown){this.cancelNestedFitIdle(),this.nestedFitResize.schedule();return}if(this.nestedFitIdleHandle!==null||this.nestedFitFallback!==null)return;const t=()=>{this.nestedFitIdleHandle=null,this.nestedFitFallback=null,this.isConnected&&this.measureNestedFit()};typeof requestIdleCallback=="function"?this.nestedFitIdleHandle=requestIdleCallback(t,{timeout:2e3}):this.nestedFitFallback={stage:"frame",handle:requestAnimationFrame(()=>{this.nestedFitFallback={stage:"timeout",handle:window.setTimeout(t,0)}})}}cancelNestedFitIdle(){this.nestedFitIdleHandle!==null&&(cancelIdleCallback(this.nestedFitIdleHandle),this.nestedFitIdleHandle=null),this.nestedFitFallback!==null&&(this.nestedFitFallback.stage==="frame"?cancelAnimationFrame(this.nestedFitFallback.handle):window.clearTimeout(this.nestedFitFallback.handle),this.nestedFitFallback=null)}ensureNestedFitMeasured(){this.nestedFitMeasured||(this.cancelNestedFitIdle(),this.measureNestedFit())}collectNestedLabels(){const e=[];let t=!1;const r=(n,s)=>{for(const i of n){const o=s>0;i instanceof b?o&&e.push(i.label):i instanceof v&&(o&&(e.push(i.label),i.url&&(t=!0)),r(Array.from(i.children),s+1))}};return r(this.getAssignedChildren(),0),{labels:e,linkedGroup:t}}readNestedFitMetrics(e){const t=this.nestedFitCapProbe.value,r=this.nestedFitFloorProbe.value,n=this.nestedFitPadProbe.value,s=this.nestedFitTextProbe.value;if(!t||!r||!n||!s)return null;const i=parseFloat(getComputedStyle(t).fontSize),o=parseFloat(getComputedStyle(r).fontSize),d=getComputedStyle(n),c=parseFloat(d.paddingInlineStart),F=parseFloat(d.paddingInlineEnd);if(![i,o,c,F].every(w=>Number.isFinite(w)))return null;s.replaceChildren(...e.map(w=>{const O=document.createElement("span");return O.textContent=w,O}));const f=Array.from(s.children,w=>w.getBoundingClientRect().width);return s.replaceChildren(),{capPx:i,floorPx:o,paddingPx:c,smallPx:F,widths:f}}measureNestedFit(){if(!this.isConnected||this.drawerPresentation!=="full-screen")return;const{labels:e,linkedGroup:t}=this.collectNestedLabels();if(this.nestedFitMeasured=!0,e.length===0){this.nestedFit!==null&&(this.nestedFit=null);return}const r=this.readNestedFitMetrics(e);if(!r)return;const n=this.drawerRef.value,s=n&&this.drawerShown?n.getBoundingClientRect().width:0,i=s>0?s:B().width,o=t?2*(2*r.smallPx+4.5):0,d=i-2*r.paddingPx-o,c=K({capPx:r.capPx,floorPx:r.floorPx,availablePx:d,widestAtCapPx:Math.max(0,...r.widths)});this.nestedFit&&this.nestedFit.fontSizePx===c.fontSizePx&&this.nestedFit.wrap===c.wrap||(this.nestedFit=c)}onSwipeRevealChanged(e){e!==this.drawerOpen&&(this.drawerOpen=e,e?(this.openedFullScreen=this.isFullScreenDrawer,this.openedFullScreen&&this.ensureNestedFitMeasured(),this.drawerGroupOpenOverrides.clear(),this.bus.publish("close-popovers",{}),this.updateComplete.then(()=>this.showDrawerPopover())):(this.detachDrawerKeydown(),this.fullScreenSession&&(this.fullScreenSession=!1,this.overlay.close()),this.drawerShown=!1,this.drawerTransitioning=!0,this.updateComplete.then(()=>this.startCloseTransition()),requestAnimationFrame(()=>this.restoreDrawerTriggerFocus())),this.dispatchEvent(new CustomEvent(e?x.MENU_DRAWER_OPENED:x.MENU_DRAWER_CLOSED,{bubbles:!0,composed:!0})))}showDrawerPopover(){const e=this.scrimRef.value,t=this.drawerRef.value;if(!(!e||!t||!this.isConnected)){this.swipeController.drawerElement=t;try{this.openedFullScreen||e.showPopover(),t.showPopover()}catch{}this.dispatchEvent(new CustomEvent(x.MENU_DRAWER_PRESENTED,{bubbles:!0,composed:!0})),t.getBoundingClientRect(),requestAnimationFrame(()=>{!this.drawerOpen||!this.isConnected||(this.drawerTransitioning=!0,this.drawerShown=!0,this.openedFullScreen&&(this.fullScreenSession=!0,this.overlay.open(),this.attachDrawerKeydown(),this.updateComplete.then(()=>{this.drawerOpen&&this.overlay.moveFocusInto()})))})}}attachDrawerKeydown(){this.drawerKeydownAttached||(document.addEventListener("keydown",this.onDrawerKeydown),this.drawerKeydownAttached=!0)}detachDrawerKeydown(){this.drawerKeydownAttached&&(document.removeEventListener("keydown",this.onDrawerKeydown),this.drawerKeydownAttached=!1)}fullScreenFocusScope(){const e=this.drawerRef.value;if(!e)return[];const t=i=>i instanceof HTMLElement&&i.getClientRects().length>0,r=[],n=i=>{if(i.matches(R)&&t(i)&&r.push(i),i.shadowRoot)for(const o of i.shadowRoot.querySelectorAll(R))t(o)&&r.push(o)};for(const i of e.querySelectorAll("*"))if(n(i),i instanceof HTMLSlotElement)for(const o of i.assignedElements({flatten:!0})){n(o);for(const d of o.querySelectorAll("*"))n(d)}const s=this.liftedCloseControl;if(s?.isConnected){const i=s.shadowRoot?.querySelector("button")??s;t(i)&&r.push(i)}return r}static drawerTransitionMs(e){const t=getComputedStyle(e),r=o=>o.split(",").map(d=>d.trim()).filter(Boolean).map(d=>{const c=Number.parseFloat(d);return Number.isFinite(c)?d.endsWith("ms")?c:c*1e3:0}),n=r(t.transitionDuration),s=r(t.transitionDelay);let i=0;return n.forEach((o,d)=>{i=Math.max(i,o+(s[d%Math.max(s.length,1)]??0))}),i}startCloseTransition(){const e=this.drawerRef.value;if(!e){this.hideDrawerPopover();return}this.closeTransitionTimer&&clearTimeout(this.closeTransitionTimer);const t=C.drawerTransitionMs(e);if(t===0){this.onDrawerTransitionEnd();return}this.closeTransitionTimer=setTimeout(()=>{this.closeTransitionTimer=null,!this.drawerOpen&&this.drawerTransitioning&&this.onDrawerTransitionEnd()},t+50)}hideDrawerPopover(){const e=this.scrimRef.value,t=this.drawerRef.value;this.swipeController.drawerElement=null,t&&(t.style.cssText="");try{t?.hidePopover()}catch{}try{e?.hidePopover()}catch{}}restoreDrawerTriggerFocus(){const e=this.drawerTrigger;this.drawerTrigger=null,e?.isConnected&&e.focus({preventScroll:!0})}getAutoExpandedGroups(e=!0){const t=new Set;let r=null;for(const s of this.querySelectorAll("esp-menu-item")){const i=s.url||s.getAttribute("url");if(i&&k(i)){r=s;break}}if(!r)for(const s of this.querySelectorAll("esp-menu-group")){const i=s.url||s.getAttribute("url");if(i&&k(i)){r=s;break}}if(!r&&e){for(const s of this.querySelectorAll("esp-menu-group"))s.parentElement===this&&t.add(s);return t}if(!r)return t;r instanceof v&&t.add(r);let n=r.parentElement;for(;n&&n!==this;)n instanceof v&&t.add(n),n=n.parentElement;return t}isHorizontalTopLevelGroup(e){return e.mode==="horizontal"&&e.depth===0}groupUrlPrefixMatches(e){return N(location.pathname,e.urlPrefix)}groupPathMatches(e){if(this.groupUrlPrefixMatches(e))return!0;const t=e.url||e.getAttribute("url");return t?N(location.pathname,$(t)):!1}expandToCurrentPage(){const e=this.getAutoExpandedGroups(),t=this.querySelectorAll("esp-menu-group");for(const r of t)r.open=e.has(r)&&!this.isHorizontalTopLevelGroup(r)}closeHorizontalTopLevelGroups(){for(const e of this.querySelectorAll("esp-menu-group"))this.isHorizontalTopLevelGroup(e)&&(e.open=!1)}getDrawerAutoExpandedGroups(){return this.getAutoExpandedGroups(!1)}collectDrawerNodes(e){const t=this.getDrawerAutoExpandedGroups();return P(e,r=>this.drawerGroupOpenOverrides.get(r)??(r.open||t.has(r)||this.groupPathMatches(r)))}renderDrawerNode(e){return W(e,{mode:"drawer",sourceStyle:!0,fullScreen:this.openedFullScreen,itemClick:t=>this.handleDrawerItemClick(t),groupToggle:(t,r)=>{this.drawerGroupOpenOverrides.set(t,r),this.isHorizontalTopLevelGroup(t)||(t.open=r)}})}handleDrawerLinkClick(e){const t=e.composedPath().find(r=>r instanceof HTMLAnchorElement);!(t instanceof HTMLAnchorElement)||t.target.toLowerCase()!=="_blank"||setTimeout(()=>{e.defaultPrevented||this.closeDrawer()},0)}handleDrawerItemClick(e){e.dispatchEvent(new CustomEvent(x.CLICKED,{detail:{},bubbles:!0,composed:!0})),this.swipeController.close(!0)}render(){const e=this.drawerOpen||this.drawerTransitioning,t=this.headerDrawerActive,r={rail:!0,horizontal:this.railMode==="horizontal",vertical:this.railMode==="vertical",wrap:this.overflow==="wrap",scroll:this.overflow==="scroll","drawer-forced":this.drawerActive},n=e?this.openedFullScreen:this.isFullScreenDrawer,s={drawer:!0,"drawer-left":this.drawerSide==="left","drawer-right":this.drawerSide==="right","full-screen":n,[`transition-${this.resolvedFullScreenTransition}`]:n,transitioning:this.drawerTransitioning,open:this.drawerShown,"nested-wrap":n&&this.nestedFit?.wrap===!0},i={"--_esp-menu-drawer-nested-font-size":n&&this.nestedFit?`${this.nestedFit.fontSizePx}px`:null},o=e?this.collectDrawerNodes(this.getAssignedChildren()):[],d=this.ariaLabel??"Navigation",c={"--_esp-menu-drawer-brand-color":this.drawerBrand?.brandColor||null},F=n&&e?E`<div class=${g({"drawer-chrome":!0,"has-lifted-close":!!this.liftedCloseControl})}>
            <div class="drawer-brand" style=${z(c)}>
              <slot name="drawer-brand"
                >${this.drawerBrand?G(this.drawerBrand):m}</slot
              >
            </div>
            ${this.liftedCloseControl?m:E`
                  <button
                    type="button"
                    class="drawer-close"
                    aria-label="Close menu"
                    @click=${this.handleDrawerCloseClick}
                  >
                    <esp-burger presentation-only menu-open></esp-burger>
                  </button>`}
          </div>`:m,f=this.headerNavigationOwned;return E`
      <div
        class=${g({"source-rail-viewport":!0,"header-owned":f,"menu-fit-probes":f&&t})}
        ?inert=${f&&t}
        aria-hidden=${f&&t?"true":m}
      >
        <nav
          ${p(this.railRef)}
          class=${g({...r,"header-owned":f})}
          aria-label=${d}
          ?hidden=${!f&&t}
        >
          <slot ${p(this.itemsSlot)} @slotchange=${this.handleSlotChange}></slot>
        </nav>
      </div>
      <div
        ${p(this.scrimRef)}
        class=${g({scrim:!0,"full-screen":n,open:this.drawerShown,transitioning:this.drawerTransitioning})}
        popover="manual"
      ></div>
      <nav
        ${p(this.drawerRef)}
        class=${g(s)}
        style=${z(i)}
        aria-label=${d}
        popover="manual"
        ?data-no-swipe=${n}
        @click=${this.handleDrawerLinkClick}
        @transitionend=${this.onDrawerTransitionEnd}
      >
        ${F} ${e?o.map(w=>this.renderDrawerNode(w)):m}
      </nav>
      ${this.drawerPresentation==="full-screen"?E`<div class="nested-fit-probe" aria-hidden="true" ${p(this.nestedFitProbe)}>
            <span class="nested-fit-cap" ${p(this.nestedFitCapProbe)}>&#8203;</span>
            <span class="nested-fit-floor" ${p(this.nestedFitFloorProbe)}>&#8203;</span>
            <span class="nested-fit-pad" ${p(this.nestedFitPadProbe)}>&#8203;</span>
            <div class="nested-fit-text" ${p(this.nestedFitTextProbe)}></div>
          </div>`:m}
    `}};a.styles=[...D.styles,V,L`
      :host {
        display: block;
        min-width: 0;
      }

      .source-rail-viewport:not(.menu-fit-probes) {
        display: contents;
      }

      .source-rail-viewport.header-owned:not(.menu-fit-probes) {
        display: flex;
        justify-content: safe var(--esp-menu-horizontal-justify-content, flex-start);
        min-inline-size: 0;
        max-inline-size: 100%;
        block-size: 100%;
        overflow-x: auto;
        scrollbar-width: thin;
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
        align-items: var(--_esp-menu-horizontal-align, stretch);
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

      .rail.horizontal.scroll ::slotted(*) {
        flex: none;
      }

      .rail.horizontal.header-owned {
        flex: 0 0 auto;
        inline-size: max-content;
        max-inline-size: none;
        flex-wrap: nowrap;
        overflow: visible;
        block-size: 100%;
      }

      .rail.horizontal.header-owned ::slotted(*) {
        flex: none;
      }

      .rail.vertical {
        --_esp-surface-layer: 1;
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
        --_esp-surface-layer: 1;
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

      .drawer-chrome.has-lifted-close {
        padding-block-start: var(--_esp-header-base-height, var(--esp-header-height, calc(4.5 * var(--esp-size-small))));
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

      .drawer.full-screen esp-menu-item {
        text-align: center;
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
    `],l([S()],a.prototype,"nestedFit",void 0),l([h({type:String,reflect:!0})],a.prototype,"mode",void 0),l([h({type:String,reflect:!0})],a.prototype,"overflow",void 0),l([h({type:String,reflect:!0})],a.prototype,"side",void 0),l([h({attribute:"drawer-presentation",type:String,reflect:!0})],a.prototype,"drawerPresentation",void 0),l([h({attribute:"full-screen-transition",type:String,reflect:!0})],a.prototype,"fullScreenTransition",void 0),l([h({attribute:!1})],a.prototype,"drawerBrand",void 0),l([h({attribute:!1})],a.prototype,"liftedCloseControl",void 0),l([h({attribute:"aria-label",type:String})],a.prototype,"ariaLabel",void 0),l([h({type:Boolean,attribute:"auto-expand"})],a.prototype,"autoExpand",void 0),l([h({type:Boolean})],a.prototype,"sliding",null),l([S()],a.prototype,"drawerOpen",void 0),l([S()],a.prototype,"drawerShown",void 0),l([S()],a.prototype,"drawerTransitioning",void 0),l([h({attribute:!1})],a.prototype,"headerEndOwner",void 0),l([h({attribute:!1})],a.prototype,"hasExternalDrawerControl",void 0),l([h({attribute:!1})],a.prototype,"previewCollapseRequested",void 0),l([H({capture:!0})],a.prototype,"handleDrawerLinkClick",null),a=C=l([_("esp-menu")],a);export{a as EspalierMenu};
