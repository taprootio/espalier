var s=function(f,e,t,r){var n=arguments.length,i=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(f,e,t,r);else for(var d=f.length-1;d>=0;d--)(a=f[d])&&(i=(n<3?a(i):n>3?a(e,t,i):a(e,t))||i);return n>3&&i&&Object.defineProperty(e,t,i),i};import{paintedSurface as j}from"../shared/surface-layer.js";import{css as $,html as b,nothing as m,unsafeCSS as Q}from"lit";import{customElement as Y,property as l,state as v}from"lit/decorators.js";import{classMap as W}from"lit/directives/class-map.js";import{styleMap as K}from"lit/directives/style-map.js";import"../burger/esp-burger.js";import{createRef as A,ref as R}from"lit/directives/ref.js";import{MENU_PRESENTATION_CHANGED as _,MENU_LAYOUT_CHANGED as H,MENU_FIT_PROBE_STYLES as Z,menuPresentationStyle as J,renderMenuNode as X}from"../menu/menu-presentation.js";import{EspalierMenu as T}from"../menu/esp-menu.js";import{RafThrottle as q}from"../shared/raf-throttle.js";import{viewportSize as ee}from"../shared/viewport.js";import{CONFIGURED_BRAND_LOGO_ASPECT_RATIO as U,configuredBrandLogoGeometry as te,renderConfiguredBrand as F,resolveConfiguredBrand as re}from"../shared/configured-brand.js";import{EspalierElementBase as I}from"../shared/esp-element-base.js";import{ESP_EVENTS as x}from"../shared/events.js";import{HEADER_GEOMETRY_PAINT_PROPERTIES as ne,HeaderGeometryController as oe}from"./header-geometry-controller.js";const ae="(max-width: 36rem)",V=$`
  background-color 0.24s ease,
  border-color 0.24s ease,
  box-shadow 0.24s ease,
  color 0.24s ease,
  transform 0.24s ease
`;function L(f,e){const t=new Set(f);return{allowedValues:t,converter:{fromAttribute(n){return n??e},toAttribute(n){return t.has(n)?n:e}},defaultValue:e}}const se=["standard","centered-brand","centered-menu","extended","extended-centered","minimal"],ie=["start","center","end"],de=["truncate","wrap","nowrap"],le=["auto","inline","drawer"],he=["hidden","visible"],ce=["compact","standard"],ue=new Set(Array.from({length:41},(f,e)=>(e+10)/10)),M=L(se,"standard"),D=L(ie,"start"),B=L(de,"truncate"),z=L(le,"auto"),O=L(he,"hidden"),P=L(ce,"compact");let o=class extends I{constructor(){super(...arguments),this.menuOpen=!1,this.navigationConstrained=!1,this.menuTooLarge=!1,this.mobileMenu=!1,this.scrolled=!1,this.hiddenByScroll=!1,this.scrollProgress=0,this.showBurger=!1,this.layout=M.defaultValue,this.brandText="",this.brandLogo="",this.lightBrandLogo="",this.darkBrandLogo="",this.compactBrandLogo="",this.lightCompactBrandLogo="",this.darkCompactBrandLogo="",this.heightMultiplier=1,this.compactSize=P.defaultValue,this.brandHref="",this.brandAlt="",this.brandColor="",this.lightBrandColor="",this.darkBrandColor="",this.brandAlign=D.defaultValue,this.brandWrap=B.defaultValue,this.menuDisplay=z.defaultValue,this.themeToggle=O.defaultValue,this.scrollBehavior="none",this.scrollThreshold=16,this.dockOffset=0,this.drawerTarget="",this.previewCollapseRequested=!1,this.fullBleedContent=!1,this.geometry=new oe(this,()=>({heightMultiplier:this.heightMultiplier,compactSize:this.compactSize,compactLogo:!!(this.compactBrandLogo||this.lightCompactBrandLogo||this.darkCompactBrandLogo)}),()=>this.syncBrandFitWidth()),this.readyCompactLogo="",this.naturalBrandWidth=0,this.syncCompactLogoReadiness=()=>{const e=this.shadowRoot?.querySelector(".compact-brand-fit .brand-logo"),t=this.compactLogoSource,r=t&&e?.getAttribute("src")===t&&e.complete&&e.naturalWidth>0?t:"";r!==this.readyCompactLogo&&(this.readyCompactLogo=r)},this.keyboardFocusHeld=!1,this.pointerFocusPending=!1,this.onGeometryKeyboard=()=>{this.pointerFocusPending=!1,this.keyboardFocusHeld=!0,this.updateScrollState()},this.onGeometryPointer=()=>{this.pointerFocusPending=!0,this.keyboardFocusHeld=!1,this.updateScrollState()},this.onGeometryPointerEnd=()=>{this.pointerFocusPending=!1},this.openHeaderPopovers=new Set,this.onHeaderPopoverOpened=e=>{e.target&&this.openHeaderPopovers.add(e.target),this.updateScrollState()},this.onHeaderPopoverClosed=e=>{e.target&&this.openHeaderPopovers.delete(e.target),this.updateScrollState()},this.onHeaderGroupToggle=e=>{e.detail.open?this.onHeaderPopoverOpened(e):this.onHeaderPopoverClosed(e)},this.onGeometryFocus=e=>{const t=e.composedPath();this.keyboardFocusHeld=!this.pointerFocusPending&&t.some(r=>r instanceof Element&&r.matches(":focus-visible")),this.updateScrollState()},this.onGeometryFocusOut=()=>{queueMicrotask(()=>{this.matches(":focus-within")||(this.keyboardFocusHeld=!1,this.pointerFocusPending=!1),this.updateScrollState()})},this.menuContainer=A(),this.menuButton=A(),this.menu=void 0,this.externalDrawerTarget=null,this.lastScrollY=0,this.lastInlineMenuWidth=0,this.mobileMenuQuery=null,this.menuDrawerListenersAttached=!1,this.observingMenuContainer=!1,this.scrollListenersAttached=!1,this.scrollFrame=new q(()=>this.runScrollStateUpdate()),this.resizeObserver=new ResizeObserver(()=>this.syncMenuLayout()),this.menuChildObserver=null,this.endProbe=A(),this.observedEndProbe=null,this.endProbeObserver=null,this.invalidMenuSlot=null,this.actionsWidth=0,this.syncPrimaryMenu=()=>{const r=(this.menuContainer.value?.querySelector('slot[name="menu"]')?.assignedElements()??[])[0],n=r instanceof T&&r.parentElement===this?r:void 0,i=r&&!n?r:null;i&&i!==this.invalidMenuSlot&&console.warn("<esp-header>: the menu slot expects an <esp-menu> element, received",i),this.invalidMenuSlot=i,this.geometry.setPrimaryMenu(n),n!==this.menu&&(this.demoteMenuToggle(),this.removeMenuDrawerListeners(),this.menu?.removeEventListener(_,this.onPrimaryPresentationChanged),this.menu?.removeEventListener(H,this.onPrimaryLayoutChanged),this.menu&&(this.menu.headerEndOwner=null,this.menu.sliding=!1),this.menuChildObserver?.disconnect(),this.menuChildObserver=null,this.menu=n,this.lastInlineMenuWidth=0,this.lastDrawerBrandKey="",this.addMenuDrawerListeners(),this.menu?.addEventListener(_,this.onPrimaryPresentationChanged),this.observeMenuChildren(),this.syncDrawerBrand(),this.requestUpdate()),this.menu?.addEventListener(_,this.onPrimaryPresentationChanged),this.menu?.addEventListener(H,this.onPrimaryLayoutChanged),this.menu&&(this.menu.headerEndOwner=this.menu.mode==="horizontal"?this:null),this.syncExternalDrawerTarget(),this.syncMenuLayout()},this.onPrimaryPresentationChanged=()=>{this.menu?.headerDrawerActive&&this.returnEndFocusToBurger(),this.requestUpdate()},this.onPrimaryLayoutChanged=()=>{if(!this.menu)return;this.geometry.invalidate();const e=this.menu.mode==="horizontal"&&this.menu.parentElement===this?this:null;this.menu.headerEndOwner!==e&&(this.menu.headerEndOwner=e),this.menu.headerDrawerActive&&this.returnEndFocusToBurger(),this.observeMenuChildren(),this.requestUpdate(),this.syncMenuLayout()},this.updateScrollState=()=>this.scrollFrame.schedule(),this.handleMobileMenuQueryChange=e=>{this.mobileMenu=e.matches,this.syncMenuLayout(),this.syncExternalDrawerControl()},this.toggleTheme=()=>{const e=this.getThemeRoot();if(!e)return;e.scheme=e.scheme==="dark"?"light":"dark";const t=e.scheme==="dark"?"dark":"light";this.dispatchEvent(new CustomEvent(x.HEADER_THEME_TOGGLE,{detail:{scheme:t},bubbles:!0,composed:!0}))},this.handleMenuToggleClicked=()=>{if(this.menuOpen){this.closeNav();return}this.openNav()},this.onMenuDrawerOpened=()=>{this.menuOpen=!0,document.body.classList.add("menu-open"),this.burger&&(this.burger.menuOpen=!0)},this.onMenuDrawerClosed=()=>{this.menuOpen=!1,document.body.classList.remove("menu-open"),this.burger&&(this.burger.menuOpen=!1),this.demoteMenuToggle(),this.updateScrollState()},this.onMenuDrawerPresented=e=>{e.target!==this.menu||!this.menu?.isFullScreenDrawer||this.promoteMenuToggle()},this.menuTogglePromoted=!1,this.promotedToggleFrame=new q(()=>this.positionPromotedToggle()),this.handlePromotedViewportResize=()=>this.promotedToggleFrame.schedule(),this.lastDrawerBrandKey="",this.inertedHeaderChrome=[],this.onGeometryContentChanged=()=>this.geometry.invalidate()}resolveBrand(){return re({scheme:this.scheme,brandLogo:this.brandLogo,brandColor:this.brandColor,lightBrandLogo:this.lightBrandLogo,darkBrandLogo:this.darkBrandLogo,lightBrandColor:this.lightBrandColor,darkBrandColor:this.darkBrandColor})}get compactLogoSource(){if(!this.resolveBrand().brandLogo)return"";const e=this.scheme==="dark"?this.darkCompactBrandLogo:this.lightCompactBrandLogo,t=this.scheme==="dark"?this.lightCompactBrandLogo:this.darkCompactBrandLogo;return e||this.compactBrandLogo||t}syncBrandFitWidth(){const e=this.menuContainer.value?.parentElement;if(!e)return;const t=e.querySelector(".brand-fit-probe");this.naturalBrandWidth=t?.getBoundingClientRect().width??0;const r=e.querySelector('slot[name="brand"]')?.assignedElements().length,n=[...t?.querySelectorAll(".brand-logo")??[]].map(d=>d.getBoundingClientRect().width),i=getComputedStyle(e),a=[i.paddingTop,i.paddingBottom,i.borderTopWidth,i.borderBottomWidth].reduce((d,h)=>d+(parseFloat(h)||0),0);for(const[d,h]of[["--_esp-header-stable-brand-width",this.geometry.active&&!r?this.naturalBrandWidth:null],["--_esp-header-logo-reservation-width",Math.max(0,...n)],["--_esp-header-bar-block-insets",a]])if(h===null)e.style.removeProperty(d);else{const c=`${h}px`;e.style.getPropertyValue(d)!==c&&e.style.setProperty(d,c)}}get headerOverlayHeld(){for(const e of this.openHeaderPopovers)e instanceof Element&&!e.isConnected&&this.openHeaderPopovers.delete(e);return this.menuOpen||this.openHeaderPopovers.size>0}get usesIntrinsicNavigation(){return!!this.menu?.headerNavigationOwned}syncEndProbeObserver(){const e=this.endProbe.value??null;e!==this.observedEndProbe&&(this.endProbeObserver?.disconnect(),this.observedEndProbe=e,e&&(this.endProbeObserver??=new ResizeObserver(()=>this.syncMenuLayout()),this.endProbeObserver.observe(e,{box:"border-box"})),this.syncMenuLayout())}returnEndFocusToBurger(){const e=this.shadowRoot?.querySelector(".header-end"),t=this.shadowRoot?.activeElement;t&&e?.contains(t)&&this.updateComplete.then(()=>this.getBurgerFocusTarget()?.focus({preventScroll:!0}))}readHeaderEndFit(){const e=this.menuContainer.value?.parentElement;if(!e||!this.menu)return null;const t=getComputedStyle(e),r=e.clientWidth-(parseFloat(t.paddingLeft)||0)-(parseFloat(t.paddingRight)||0),n=parseFloat(t.columnGap)||0,i=e.querySelector(":scope > .brand"),d=i?.querySelector("slot")?.assignedElements().length?Math.max(i?.scrollWidth??0,i?.getBoundingClientRect().width??0):this.naturalBrandWidth,h=e.querySelector(":scope > .buttons"),c=Array.from(h?.children??[]).flatMap(g=>g.matches(".header-end, .header-end-measurement, .menu-toggle")?[]:g instanceof HTMLSlotElement?g.assignedElements():[g]).filter(g=>getComputedStyle(g).display!=="none");let u=c.reduce((g,N)=>{const G=getComputedStyle(N);return g+N.getBoundingClientRect().width+(parseFloat(G.marginLeft)||0)+(parseFloat(G.marginRight)||0)},0);const E=this.endProbe.value?.getBoundingClientRect().width??0,p=h&&parseFloat(getComputedStyle(h).columnGap)||0;u+=p*Math.max(0,c.length-1+(E>0?1:0));const y=this.menu.getHeaderNavigationWidths().main,w=E+u,S=this.layout==="extended"?y>r||d+w+n>r:this.layout==="extended-centered"?y>r||d+2*w+2*n>r:this.layout==="centered-brand"?d+2*Math.max(y,w)+2*n>r:d+y+w+2*n>r,C=this.getExternalDrawerTarget()?h?.querySelector(".menu-toggle"):null,k=u+(C&&getComputedStyle(C).display!=="none"?C.getBoundingClientRect().width+(c.length||E?p:0):0);return{width:r,brandWidth:d,main:y,endWidth:E,actions:u,actionFloor:k,gap:n,tooWide:S}}syncMenuLayout(){if(this.syncBrandFitWidth(),!this.menuContainer.value||!this.menu||!this.menu.getWidth)return;this.positionPromotedToggle();const e=this.menu.getWidth();e>0&&(this.lastInlineMenuWidth=e);const t=this.lastInlineMenuWidth||e,r=this.getExternalDrawerTarget(),n=this.menuDisplay!=="inline",i=this.showBurger||this.menuDisplay==="drawer"||this.layout==="minimal"||this.previewCollapseRequested,a=n&&this.menuDisplay==="auto",d=a?this.layout==="centered-menu"?this.centeredMenuCapacity():this.menuContainer.value.clientWidth:0,h=this.usesIntrinsicNavigation?this.readHeaderEndFit():null;h&&this.actionsWidth!==h.actionFloor&&(this.actionsWidth=h.actionFloor,this.requestUpdate()),this.menuTooLarge=a&&(h?h.tooWide:t>d);const c=n&&!r&&this.hasDrawerableContent()&&(this.menuTooLarge||i||this.mobileMenu);c&&this.returnEndFocusToBurger(),this.menu.sliding=c,this.navigationConstrained=h?.tooWide??!1}centeredMenuCapacity(){const e=this.menuContainer.value?.parentElement;if(!(e instanceof HTMLElement))return 0;const t=d=>d?d.getBoundingClientRect().width:0,r=getComputedStyle(e),n=e.clientWidth-(Number.parseFloat(r.paddingLeft)||0)-(Number.parseFloat(r.paddingRight)||0),i=e.querySelector(":scope > section.brand"),a=e.querySelector(":scope > section.buttons");return n-t(i)-t(a)+t(a?.querySelector("esp-header-button.menu-toggle"))}menuHasContent(){return!!(this.menu??this.querySelector(':scope > [slot="menu"]'))?.querySelector("esp-menu-item, esp-menu-group")}hasDrawerableContent(){return this.showBurger||!!this.getExternalDrawerTarget()||this.menuHasContent()}getExternalDrawerTarget(){if(!this.drawerTarget)return null;const e=document.getElementById(this.drawerTarget);return e===this.menu?null:e&&"openDrawer"in e&&typeof e.openDrawer=="function"&&"closeDrawer"in e&&typeof e.closeDrawer=="function"?e:null}getBurgerFocusTarget(){const t=this.shadowRoot?.querySelector("esp-header-button.menu-toggle")?.shadowRoot?.querySelector("button"),r=this.menuButton.value?.shadowRoot?.querySelector("button");return t??r??null}getScrollTokens(){const e=this.scrollBehavior.split(/\s+/).map(t=>t.trim().toLowerCase()).filter(Boolean);return new Set(e.filter(t=>t!=="none"))}getEffectiveScrollThreshold(){return Number.isFinite(this.scrollThreshold)?Math.max(0,this.scrollThreshold):0}clearScrollState(){this.geometry.requestScroll(0,!1,!1,this.getEffectiveScrollThreshold(),!1),this.scrolled=!1,this.hiddenByScroll=!1,this.scrollProgress=0}runScrollStateUpdate(){const e=this.getScrollTokens();if(!e.size){this.clearScrollState();return}const t=Math.max(0,window.scrollY||document.documentElement.scrollTop||0),r=this.getEffectiveScrollThreshold(),n=Number.isFinite(this.dockOffset)?Math.max(0,this.dockOffset):r,i=t>(e.has("dock")?n:r),a=t>this.lastScrollY,d=e.has("reveal")&&a&&t>r&&!this.menuOpen;if(this.geometry.requestScroll(t,e.has("compact"),e.has("collapse-topbar")&&i,r,this.headerOverlayHeld||this.keyboardFocusHeld),this.scrolled=i,this.hiddenByScroll=d,e.has("progress")){const h=document.documentElement,c=Math.max(1,h.scrollHeight-window.innerHeight);this.scrollProgress=Math.min(1,t/c)}else this.scrollProgress=0;this.lastScrollY=t}cancelScrollUpdate(){this.scrollFrame.cancel()}syncScrollListeners(){const e=this.getScrollTokens().size>0;if(e&&!this.scrollListenersAttached?(window.addEventListener("scroll",this.updateScrollState,{passive:!0}),window.addEventListener("resize",this.updateScrollState,{passive:!0}),this.scrollListenersAttached=!0):!e&&this.scrollListenersAttached&&this.removeScrollListeners(),e){this.updateScrollState();return}this.cancelScrollUpdate(),this.clearScrollState()}removeScrollListeners(){this.scrollListenersAttached&&(window.removeEventListener("scroll",this.updateScrollState),window.removeEventListener("resize",this.updateScrollState),this.scrollListenersAttached=!1)}addMenuDrawerListeners(){!this.menu||this.menuDrawerListenersAttached||(this.menu.addEventListener("esp-menu-drawer-opened",this.onMenuDrawerOpened),this.menu.addEventListener("esp-menu-drawer-presented",this.onMenuDrawerPresented),this.menu.addEventListener("esp-menu-drawer-closed",this.onMenuDrawerClosed),this.menuDrawerListenersAttached=!0)}removeMenuDrawerListeners(){!this.menu||!this.menuDrawerListenersAttached||(this.menu.removeEventListener("esp-menu-drawer-opened",this.onMenuDrawerOpened),this.menu.removeEventListener("esp-menu-drawer-presented",this.onMenuDrawerPresented),this.menu.removeEventListener("esp-menu-drawer-closed",this.onMenuDrawerClosed),this.menuDrawerListenersAttached=!1)}observeMenuContainer(){if(!this.menuContainer.value||this.observingMenuContainer)return;this.resizeObserver.observe(this.menuContainer.value);const e=this.menuContainer.value.parentElement;if(e){this.resizeObserver.observe(e);for(const t of e.querySelectorAll(":scope > section.brand, :scope > section.buttons, :scope > .brand-fit-probe"))this.resizeObserver.observe(t)}this.observingMenuContainer=!0}disconnectResizeObserver(){this.observingMenuContainer&&(this.resizeObserver.disconnect(),this.observingMenuContainer=!1)}observeMenuChildren(){if(this.usesIntrinsicNavigation){this.menuChildObserver?.disconnect(),this.menuChildObserver=null;return}!this.menu||this.menuChildObserver||(this.menuChildObserver=new MutationObserver(()=>{this.syncMenuLayout(),this.requestUpdate()}),this.menuChildObserver.observe(this.menu,{childList:!0,subtree:!0}))}syncMobileMenuQuery(){if("matchMedia"in window){if(!this.mobileMenuQuery){this.mobileMenuQuery=window.matchMedia(ae),this.mobileMenu=this.mobileMenuQuery.matches,this.mobileMenuQuery.addEventListener("change",this.handleMobileMenuQueryChange);return}this.mobileMenu=this.mobileMenuQuery.matches}}getThemeRoot(){return this.traverseToClosest("esp-root")}syncExternalDrawerTarget(){const e=this.getExternalDrawerTarget(),t=e===this.menu?null:e;t!==this.externalDrawerTarget&&(this.externalDrawerTarget?.removeEventListener("esp-menu-drawer-opened",this.onMenuDrawerOpened),this.externalDrawerTarget?.removeEventListener("esp-menu-drawer-closed",this.onMenuDrawerClosed),this.externalDrawerTarget instanceof T&&(this.externalDrawerTarget.hasExternalDrawerControl=!1),this.externalDrawerTarget=t,this.externalDrawerTarget?.addEventListener("esp-menu-drawer-opened",this.onMenuDrawerOpened),this.externalDrawerTarget?.addEventListener("esp-menu-drawer-closed",this.onMenuDrawerClosed)),this.syncExternalDrawerControl()}burgerVisibleForTarget(){if(this.menuDisplay==="inline")return!1;const e=this.showBurger||this.menuDisplay==="drawer"||this.layout==="minimal"||this.previewCollapseRequested;return this.menuTooLarge||this.mobileMenu||e}syncExternalDrawerControl(){this.externalDrawerTarget instanceof T&&(this.externalDrawerTarget.hasExternalDrawerControl=this.burgerVisibleForTarget())}openNav(){const e=this.getBurgerFocusTarget(),t=this.getExternalDrawerTarget();if(this.burger&&(this.burger.menuOpen=!0),t){this.menuOpen=!0,t.openDrawer(e),document.body.classList.add("menu-open");return}if(this.menu){this.menu.sliding=!0,this.menuOpen=!0,this.menu.isFullScreenDrawer&&this.canPromoteMenuToggle()&&(this.menu.liftedCloseControl=this.getMenuToggleElement()),this.menu.openDrawer(e),document.body.classList.add("menu-open");return}this.burger&&(this.burger.menuOpen=!1)}closeNav(){this.menuOpen=!1,this.burger&&(this.burger.menuOpen=!1),this.demoteMenuToggle();const e=this.getExternalDrawerTarget();if(e){e.closeDrawer(),document.body.classList.remove("menu-open");return}this.menu&&(this.menu.closeDrawer(),document.body.classList.remove("menu-open"))}getMenuToggleElement(){return this.shadowRoot?.querySelector("esp-header-button.menu-toggle")??null}canPromoteMenuToggle(){const e=this.getMenuToggleElement();return!!e&&typeof e?.showPopover=="function"}setHeaderChromeInert(e){if(!e){for(const a of this.inertedHeaderChrome)a.inert=!1;this.inertedHeaderChrome=[];return}const t=this.menuContainer.value?.parentElement,r=this.getMenuToggleElement();if(!t||!r)return;const n=[];for(const a of t.querySelectorAll(":scope > section.brand, :scope > section.topbar"))n.push(a);const i=t.querySelector(":scope > section.buttons");for(const a of i?.children??[])if(!(!(a instanceof HTMLElement)||a===r)){if(a instanceof HTMLSlotElement){for(const d of a.assignedElements())d instanceof HTMLElement&&n.push(d);continue}n.push(a)}for(const a of n)a.inert||(a.inert=!0,this.inertedHeaderChrome.push(a))}promoteMenuToggle(){const e=this.getMenuToggleElement();if(!e||this.menuTogglePromoted||typeof e.showPopover!="function")return;const t=e.getBoundingClientRect();e.setAttribute("popover","manual"),Object.assign(e.style,{position:"fixed",inset:"auto",margin:"0",padding:"0",border:"0",background:"transparent",overflow:"visible"}),this.setPromotedTogglePosition(e,t.width);try{e.showPopover()}catch{e.removeAttribute("popover"),e.removeAttribute("style"),this.menu&&(this.menu.liftedCloseControl=null);return}this.menuTogglePromoted=!0,window.addEventListener("resize",this.handlePromotedViewportResize),this.menu&&(this.menu.liftedCloseControl=e),this.setHeaderChromeInert(!0)}positionPromotedToggle(){if(!this.menuTogglePromoted)return;const e=this.getMenuToggleElement();if(!e)return;const t=e.getBoundingClientRect();this.setPromotedTogglePosition(e,t.width)}setPromotedTogglePosition(e,t){const r=ee(),n=getComputedStyle(e).direction==="rtl";e.style.left=`${n?0:Math.max(0,r.width-t)}px`,e.style.top="0px"}demoteMenuToggle(){if(window.removeEventListener("resize",this.handlePromotedViewportResize),this.promotedToggleFrame.cancel(),this.menu?.liftedCloseControl&&(this.menu.liftedCloseControl=null),!this.menuTogglePromoted)return;this.menuTogglePromoted=!1,this.setHeaderChromeInert(!1);const e=this.getMenuToggleElement();if(e){try{e.hidePopover()}catch{}e.removeAttribute("popover"),e.removeAttribute("style")}}syncDrawerBrand(){if(!this.menu)return;const e=this.resolveBrand(),t=e.brandLogo||this.brandText?{brandLogo:e.brandLogo,brandText:this.brandText,brandHref:this.brandHref,brandAlt:this.brandAlt,brandColor:e.brandColor}:null,r=JSON.stringify(t);r!==this.lastDrawerBrandKey&&(this.lastDrawerBrandKey=r,this.menu.drawerBrand=t)}get burger(){return this.menuButton.value??void 0}willUpdate(e){super.willUpdate(e),ue.has(this.heightMultiplier)||(this.heightMultiplier=1),P.allowedValues.has(this.compactSize)||(this.compactSize=P.defaultValue),["heightMultiplier","compactSize","compactBrandLogo","lightCompactBrandLogo","darkCompactBrandLogo"].some(t=>e.has(t))&&this.geometry.configure(),["scheme","brandLogo","lightBrandLogo","darkBrandLogo","compactBrandLogo","lightCompactBrandLogo","darkCompactBrandLogo"].some(t=>e.has(t))&&(this.readyCompactLogo=""),e.has("layout")&&!M.allowedValues.has(this.layout)&&(this.layout=M.defaultValue),e.has("brandAlign")&&!D.allowedValues.has(this.brandAlign)&&(this.brandAlign=D.defaultValue),e.has("brandWrap")&&!B.allowedValues.has(this.brandWrap)&&(this.brandWrap=B.defaultValue),e.has("menuDisplay")&&!z.allowedValues.has(this.menuDisplay)&&(this.menuDisplay=z.defaultValue),e.has("themeToggle")&&!O.allowedValues.has(this.themeToggle)&&(this.themeToggle=O.defaultValue)}firstUpdated(e){super.firstUpdated(e),this.shadowRoot?.addEventListener("load",this.syncCompactLogoReadiness,!0),this.shadowRoot?.addEventListener("error",this.syncCompactLogoReadiness,!0),this.menuContainer.value&&(this.syncPrimaryMenu(),this.observeMenuContainer(),this.syncExternalDrawerTarget(),this.syncMobileMenuQuery(),this.syncScrollListeners(),this.syncMenuLayout())}updated(e){super.updated(e),this.syncCompactLogoReadiness(),this.syncDrawerBrand(),this.syncEndProbeObserver(),(e.has("scheme")||e.has("layout")||e.has("brandLogo")||e.has("brandText")||e.has("lightBrandLogo")||e.has("darkBrandLogo"))&&this.geometry.invalidate(),(!e.size||[...e.keys()].some(t=>t!=="scrollProgress"&&t!=="hiddenByScroll"))&&this.geometry.measure(),this.observeMenuChildren(),(e.has("showBurger")||e.has("drawerTarget")||e.has("menuDisplay")||e.has("layout")||e.has("previewCollapseRequested"))&&(this.syncExternalDrawerTarget(),this.syncMenuLayout()),(e.has("mobileMenu")||e.has("menuTooLarge"))&&this.syncExternalDrawerControl(),e.has("scrollBehavior")?this.syncScrollListeners():(e.has("scrollThreshold")||e.has("dockOffset"))&&this.updateScrollState()}connectedCallback(){super.connectedCallback(),this.geometry.connect(),this.shadowRoot?.addEventListener("load",this.syncCompactLogoReadiness,!0),this.shadowRoot?.addEventListener("error",this.syncCompactLogoReadiness,!0),this.addEventListener(x.POPOVER_OPENED,this.onHeaderPopoverOpened),this.addEventListener(x.POPOVER_CLOSED,this.onHeaderPopoverClosed),this.addEventListener(x.MENU_GROUP_TOGGLE,this.onHeaderGroupToggle),this.addEventListener("keydown",this.onGeometryKeyboard),this.addEventListener("pointerdown",this.onGeometryPointer),this.addEventListener("pointerup",this.onGeometryPointerEnd),this.addEventListener("pointercancel",this.onGeometryPointerEnd),this.addEventListener("focusin",this.onGeometryFocus),this.addEventListener("focusout",this.onGeometryFocusOut),this.addEventListener("slotchange",this.onGeometryContentChanged),this.syncScrollListeners(),this.syncMobileMenuQuery(),this.addMenuDrawerListeners(),this.syncExternalDrawerTarget(),this.observeMenuContainer(),this.hasUpdated&&this.syncPrimaryMenu(),this.observeMenuChildren()}disconnectedCallback(){this.geometry.disconnect(),this.shadowRoot?.removeEventListener("load",this.syncCompactLogoReadiness,!0),this.shadowRoot?.removeEventListener("error",this.syncCompactLogoReadiness,!0),this.readyCompactLogo="",this.removeEventListener(x.POPOVER_OPENED,this.onHeaderPopoverOpened),this.removeEventListener(x.POPOVER_CLOSED,this.onHeaderPopoverClosed),this.removeEventListener(x.MENU_GROUP_TOGGLE,this.onHeaderGroupToggle),this.openHeaderPopovers.clear(),this.keyboardFocusHeld=!1,this.pointerFocusPending=!1,this.removeEventListener("keydown",this.onGeometryKeyboard),this.removeEventListener("pointerdown",this.onGeometryPointer),this.removeEventListener("pointerup",this.onGeometryPointerEnd),this.removeEventListener("pointercancel",this.onGeometryPointerEnd),this.removeEventListener("focusin",this.onGeometryFocus),this.removeEventListener("focusout",this.onGeometryFocusOut),this.removeEventListener("slotchange",this.onGeometryContentChanged),this.menu?.removeEventListener(_,this.onPrimaryPresentationChanged),this.menu?.removeEventListener(H,this.onPrimaryLayoutChanged),this.menu&&(this.menu.headerEndOwner=null),this.removeMenuDrawerListeners(),this.externalDrawerTarget?.removeEventListener("esp-menu-drawer-opened",this.onMenuDrawerOpened),this.externalDrawerTarget?.removeEventListener("esp-menu-drawer-closed",this.onMenuDrawerClosed),this.externalDrawerTarget instanceof T&&(this.externalDrawerTarget.hasExternalDrawerControl=!1),this.externalDrawerTarget=null,this.mobileMenuQuery?.removeEventListener("change",this.handleMobileMenuQueryChange),this.mobileMenuQuery=null,this.removeScrollListeners(),this.cancelScrollUpdate(),this.disconnectResizeObserver(),this.endProbeObserver?.disconnect(),this.observedEndProbe=null,this.menuChildObserver?.disconnect(),this.menuChildObserver=null,this.demoteMenuToggle(),super.disconnectedCallback()}renderHeaderEnd(e,t,r){return b`<nav
      class=${W({"header-end":!t,"header-end-probe":t})}
      ${t?R(this.endProbe):m}
      aria-label=${t?m:`${this.menu?.ariaLabel??"Navigation"} links`}
      aria-hidden=${t?"true":m}
      ?hidden=${r}
      ?inert=${t||r}
      style=${J(this.menu)}
    >
      ${e.map(n=>X(n,{mode:"horizontal",sourceStyle:!0}))}
    </nav>`}render(){const{menuOpen:e,menuTooLarge:t,mobileMenu:r}=this,n=this.menuDisplay!=="inline",i=n&&(this.showBurger||this.menuDisplay==="drawer"||this.layout==="minimal"||this.previewCollapseRequested),a=this.getScrollTokens(),d=a.has("progress"),h=this.resolveBrand(),c={"--_esp-header-brand-color":h.brandColor||null,"--_esp-header-scroll-progress":String(this.scrollProgress),"--_esp-header-actions-width":`${this.actionsWidth}px`,"--_esp-header-height-multiplier":String(this.geometry.multiplier),"--_esp-header-own-menu-offset":this.geometry.active?`${this.geometry.record.visibleBlockSize}px`:null},u=this.compactLogoSource,E=this.geometry.compact&&u&&this.readyCompactLogo===u,p=this.menu?.headerEndNodes??[],y=!p.length||!!this.menu?.headerDrawerActive,w=!!this.menu?.headerDrawerActive,S=this.menuDisplay==="inline"||this.usesIntrinsicNavigation&&!w&&!!this.getExternalDrawerTarget(),C={"primary-drawer":w,"has-header-end":p.length>0,"explicit-inline":S,"navigation-constrained":this.navigationConstrained,"menu-open":e,"too-wide":n&&this.hasDrawerableContent()&&(t||r||i),[`layout-${this.layout==="minimal"&&S?"standard":this.layout}`]:!0,"is-scrolled":this.scrolled,"geometry-topbar-collapsed":this.geometry.topbarCollapsed,"geometry-active":this.geometry.active,"scaled-header":this.heightMultiplier>1,"geometry-compact":this.geometry.compact,"geometry-standard":this.geometry.standard,"geometry-initial":this.geometry.pending,"hide-on-scroll":this.hiddenByScroll,"scroll-compact":a.has("compact"),"scroll-elevate":a.has("elevate"),"scroll-transparent":a.has("transparent")||a.has("transparent-to-solid"),"scroll-collapse-topbar":a.has("collapse-topbar")};this.toggleAttribute("data-esp-compact",this.geometry.compact);const k=this.scheme==="dark"?"light":"dark";return b`
      <header class=${W(C)} style=${K(c)}>
        <section class="topbar">
          <slot name="topbar" @slotchange=${this.onGeometryContentChanged}></slot>
        </section>

        <section class="brand">
          <slot name="brand"
            >${F({brandLogo:E?u:h.brandLogo,brandText:this.brandText,brandHref:this.brandHref,brandAlt:this.brandAlt,reserveLogoSpace:this.geometry.active})}</slot
          >
        </section>

        <section ${R(this.menuContainer)} class="menu-container">
          <slot name="menu" @slotchange=${this.syncPrimaryMenu}></slot>
        </section>

        <section class="buttons">
          ${this.renderHeaderEnd(p,!1,y)}
          ${this.usesIntrinsicNavigation&&p.length?b`<div class="header-end-measurement menu-fit-probes" aria-hidden="true" inert>
                ${this.renderHeaderEnd(p,!0,!1)}
              </div>`:m}
          <slot name="buttons"></slot>
          ${this.themeToggle==="visible"?b`<esp-header-button
                class="theme-toggle"
                icon=${this.scheme==="dark"?"sun":"moon"}
                aria-label=${`Switch to ${k} mode`}
                @esp-clicked=${this.toggleTheme}
              ></esp-header-button>`:m}
          
          <esp-header-button
            class="menu-toggle"
            aria-label=${e?"Close navigation":"Open navigation"}
            aria-controls=${this.drawerTarget||m}
            aria-expanded=${e?"true":"false"}
            @esp-clicked=${this.handleMenuToggleClicked}
          >
            <esp-burger ${R(this.menuButton)} presentation-only></esp-burger>
          </esp-header-button>
        </section>
        ${this.geometry.active?b`
          <div class="header-expanded-size-probe" aria-hidden="true" inert></div>
          <div class="header-extra-rows-size-probe" aria-hidden="true" inert></div>
          <div class="header-bar-border-probe" aria-hidden="true" inert></div>
          <div class="header-extended-border-probe" aria-hidden="true" inert></div>
        `:m}
        <div class="brand-fit-probe" aria-hidden="true" inert>
          ${this.usesIntrinsicNavigation||this.geometry.active?b`
            <div class="expanded-brand-fit">${F({brandLogo:h.brandLogo,brandText:this.brandText,brandHref:this.brandHref,brandAlt:this.brandAlt})}</div>
            ${u?b`<div class="compact-brand-fit">${F({brandLogo:u,brandText:this.brandText,brandHref:this.brandHref,brandAlt:this.brandAlt})}</div>`:m}
          `:m}
        </div>
        ${d?b`<div class="scroll-progress" aria-hidden="true"></div>`:m}
      </header>
    `}};o.styles=[...I.styles,Z,j(2,"header"),te,$`
      :host {
        --_esp-header-base-height: var(--esp-header-height, calc(4.5 * var(--esp-size-small)));
        --_esp-header-current-height: var(--_esp-header-base-height);

        display: block;
        position: relative;
        z-index: var(--esp-header-z-index, 20);
      }

      header {
        --_esp-menu-button-margin: var(--esp-size-tiny);
        --_esp-menu-button-default-padding: var(--esp-size-tiny) var(--esp-size-small);
        --_esp-header-border-value: var(--esp-header-border, solid var(--esp-color-border));
        --_esp-header-border-width-value: var(--esp-header-border-width, 0 0 1px 0);
        --_esp-header-extended-border-value: var(--esp-header-extended-menu-border, 1px solid var(--esp-color-border));
        --_esp-header-brand-resolved-color: var(
          --_esp-header-brand-color,
          var(--esp-header-brand-color, var(--esp-color-headings))
        );

        
        --_esp-header-content-surplus: max(
          0px,
          calc(100% - var(--esp-header-content-max-width, 100%))
        );
        padding-inline: calc(var(--_esp-header-content-surplus) * var(--esp-header-content-lead, 0))
          calc(var(--_esp-header-content-surplus) * (1 - var(--esp-header-content-lead, 0)));

        display: grid;
        grid-template-columns: minmax(0, max-content) minmax(0, 1fr) max-content;
        grid-template-rows: min-content var(--_esp-header-bar-height, var(--_esp-header-current-height));
        align-items: stretch;
        overflow: visible;
        min-height: var(--_esp-header-bar-height, var(--_esp-header-current-height));
        background: var(--esp-header-background, var(--_esp-surface-background));
        border: var(--_esp-header-border-value);
        border-width: var(--_esp-header-border-width-value);
        box-shadow: var(--esp-header-shadow, 0 0 2px var(--esp-color-shadow));
        color: var(--esp-header-color, var(--esp-color-text));
        transform: translateY(0);
        transition: min-height 0.24s ease, ${V};

        > section {
          min-height: var(--_esp-header-bar-height, var(--_esp-header-current-height));
        }

        > section.topbar {
          grid-column: 1 / -1;
          grid-row: 1;
          min-height: 0;
          max-height: var(--esp-header-topbar-height, 8rem);
          overflow: hidden;
          transition:
            max-height 0.24s ease,
            opacity 0.24s ease,
            padding-block 0.24s ease;
        }

        > section.brand,
        > section.menu-container,
        > section.buttons {
          grid-row: 2;
        }

        .brand-fit-probe {
          display: grid;
          position: absolute;
          visibility: hidden;
          pointer-events: none;
          width: max-content;
          padding-inline: var(--esp-header-brand-padding-inline, var(--esp-size-small));
        }

        .expanded-brand-fit, .compact-brand-fit { grid-area: 1 / 1; }

        section.brand {
          display: grid;
          min-width: 0;
          align-content: center;
          align-items: center;
          place-content: var(--esp-header-brand-placement, center start);
          padding-inline: var(--esp-header-brand-padding-inline, var(--esp-size-small));

          slot[name="brand"] {
            display: flex;
            align-items: center;
            justify-content: inherit;
            min-width: 0;
            height: 100%;
            min-height: 100%;
          }

          ::slotted(img) {
            align-self: center;
            min-width: min-content;
          }

          ::slotted(a),
          ::slotted(span),
          ::slotted(div) {
            display: inline-flex;
            align-items: center;
            color: inherit;
          }
        }

        .configured-brand {
          display: inline-flex;
          align-items: center;
          gap: var(--esp-header-brand-gap, var(--esp-size-tiny-to-small));
          min-width: 0;
          max-width: var(--esp-header-brand-max-width, min(36ch, 45vw));
          color: var(--_esp-header-brand-resolved-color);
          font-family: var(
            --esp-header-brand-font-family,
            var(
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
            )
          );
          font-size: var(--esp-header-brand-font-size, var(--esp-type-medium));
          font-weight: var(
            --esp-header-brand-font-weight,
            var(--esp-font-weight-brand, var(--esp-font-weight-headings))
          );
          line-height: 1.1;
          text-decoration: none;
          transition: transform 0.24s ease;

          &:hover {
            color: var(--esp-header-brand-hover-color, var(--esp-color-headings-hover));
            background: var(--esp-header-brand-hover-background, transparent);
            text-decoration: var(--esp-header-brand-hover-decoration, none);
            transform: var(--esp-header-brand-hover-transform, none);
          }
        }

        .brand-logo {
          
          aspect-ratio: auto
            var(--esp-header-brand-logo-aspect-ratio, ${U});
          width: auto;
          height: var(
            --esp-header-brand-logo-size,
            calc(0.72 * var(--esp-header-height, calc(4.5 * var(--esp-size-small))))
          );
          max-width: var(--esp-header-brand-logo-max-width, 12rem);
          object-fit: contain;
          flex: 0 0 auto;
        }

        .brand-text {
          min-width: 0;
          overflow-wrap: anywhere;
          align-self: end;
        }

        section.buttons {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          min-width: max-content;
          color: inherit;
        }

        .header-end,
        .header-end-probe {
          display: flex;
          align-items: var(--_esp-menu-horizontal-align, stretch);
          --esp-header-height: var(--_esp-header-current-height);
        }

        .header-end {
          flex: 0 1 auto;
          min-width: 0;
          overflow-x: auto;
          scrollbar-width: thin;
        }

        .header-end[hidden] {
          display: none;
        }

        .header-end-probe {
          position: absolute;
          inline-size: max-content;
          max-inline-size: none;
          flex-wrap: nowrap;
          visibility: hidden;
          pointer-events: none;
        }

        .header-end > esp-menu-item,
        .header-end-probe > esp-menu-item {
          flex: none;
        }

        section.buttons > :not(.header-end),
        section.buttons ::slotted(*) {
          flex: none;
        }

        &.has-header-end {
          grid-template-columns:
            minmax(0, max-content) minmax(0, 1fr)
            minmax(var(--_esp-header-actions-width, 0px), max-content);

          section.buttons {
            min-width: 0;
            max-width: 100%;
          }
        }

        &.has-header-end.layout-centered-brand,
        &.has-header-end.layout-extended-centered {
          grid-template-columns: minmax(0, 1fr) minmax(0, max-content) minmax(0, 1fr);
        }

        &.has-header-end.layout-centered-menu {
          grid-template-columns:
            minmax(max-content, 1fr) minmax(0, max-content)
            minmax(max-content, 1fr);
        }

        &.has-header-end.layout-extended,
        &.has-header-end.layout-minimal {
          grid-template-columns: minmax(0, 1fr) minmax(
              var(--_esp-header-actions-width, 0px),
              max-content
            );
        }

        &.has-header-end.explicit-inline.navigation-constrained {
          grid-template-columns:
            minmax(0, 1fr) minmax(0, 1fr)
            minmax(var(--_esp-header-actions-width, 0px), 1fr);

          section.buttons {
            justify-self: stretch;
          }
        }

        &.has-header-end.explicit-inline.navigation-constrained.layout-extended {
          grid-template-columns: minmax(0, 1fr) minmax(var(--_esp-header-actions-width, 0px), 1fr);
        }

        esp-header-button.menu-toggle {
          display: none;
        }

        &.too-wide {
          esp-header-button.menu-toggle {
            display: initial;
          }
        }

        section.menu-container {
          min-width: 0;
          
          overflow: visible;

          ::slotted(esp-menu) {
            --esp-header-height: var(--_esp-header-current-height);
            --esp-menu-top-offset: var(--_esp-page-header-menu-offset, var(--_esp-header-own-menu-offset, var(--_esp-header-current-height)));
          }
        }

        &.layout-centered-brand {
          grid-template-columns: minmax(0, 1fr) minmax(0, max-content) minmax(0, 1fr);

          section.menu-container {
            grid-column: 1;
            grid-row: 2;
          }

          section.brand {
            grid-column: 2;
            justify-content: center;
            text-align: center;
          }

          section.buttons {
            grid-column: 3;
          }
        }

        &.layout-standard {
          section.brand {
            justify-content: var(--esp-header-brand-inline-placement, start);
          }
        }

        
        &.layout-centered-menu {
          grid-template-columns:
            minmax(max-content, 1fr) minmax(0, max-content)
            minmax(max-content, 1fr);

          section.brand {
            grid-column: 1;
            
            justify-self: start;
            justify-content: var(--esp-header-brand-inline-placement, start);
          }

          section.menu-container {
            grid-column: 2;
          }

          section.menu-container ::slotted(esp-menu) {
            --esp-menu-horizontal-justify-content: center;
          }

          section.buttons {
            grid-column: 3;
            justify-self: end;
          }
        }

        &.layout-extended,
        &.layout-extended-centered {
          grid-template-columns: minmax(0, 1fr) max-content;
          grid-template-rows:
            min-content var(--_esp-header-current-height)
            var(--esp-header-extended-menu-height, calc(3.5 * var(--esp-size-small)));

          section.brand {
            grid-column: 1;
            grid-row: 2;
          }

          section.buttons {
            grid-column: 2;
            grid-row: 2;
          }

          section.menu-container {
            grid-column: 1 / -1;
            grid-row: 3;
            min-height: var(--esp-header-extended-menu-height, calc(3.5 * var(--esp-size-small)));
            border-top: var(--_esp-header-extended-border-value);
          }

          section.menu-container ::slotted(esp-menu) {
            --esp-header-height: var(
              --esp-header-extended-menu-height,
              calc(3.5 * var(--esp-size-small))
            );
            --_esp-menu-button-row-height: var(
              --esp-header-height,
              var(--esp-header-extended-menu-height, calc(3.5 * var(--esp-size-small)))
            );
            --_esp-menu-button-row-min-height: var(
              --esp-header-height,
              var(--esp-header-extended-menu-height, calc(3.5 * var(--esp-size-small)))
            );
          }
        }

        &.layout-extended-centered {
          grid-template-columns: minmax(0, 1fr) minmax(0, max-content) minmax(0, 1fr);

          section.brand {
            grid-column: 2;
            justify-content: center;
            text-align: center;
          }

          section.buttons {
            grid-column: 3;
            justify-self: end;
          }

          section.menu-container ::slotted(esp-menu) {
            --esp-menu-horizontal-justify-content: center;
          }
        }

        &.layout-minimal {
          grid-template-columns: minmax(0, 1fr) max-content;

          section.brand {
            grid-column: 1;
          }

          section.menu-container {
            
            display: block;
            position: absolute;
            width: 0;
            height: 0;
            min-height: 0;
            overflow: visible;
          }

          section.buttons {
            grid-column: 2;
          }
        }

        &.scroll-compact.is-scrolled:not(.geometry-active) {
          --_esp-header-current-height: var(
            --esp-header-compact-height,
            max(44px, calc(3.5 * var(--esp-size-small)))
          );
        }

        &.scroll-elevate.is-scrolled {
          box-shadow: var(--esp-header-scrolled-shadow, 0 2px 8px var(--esp-color-shadow));
        }

        &.scroll-transparent:not(.is-scrolled) {
          --_esp-surface-layer: inherit;
          background: var(--esp-header-transparent-background, transparent);
          border-color: transparent;
          box-shadow: none;
          color: var(--esp-header-transparent-color, var(--esp-color-headings));
        }

        &.scroll-transparent:not(.is-scrolled) .configured-brand {
          color: var(--esp-header-transparent-color, var(--_esp-header-brand-resolved-color));
        }

        &.scroll-collapse-topbar.is-scrolled:not(.geometry-active) > section.topbar,
        &.scroll-collapse-topbar.geometry-topbar-collapsed > section.topbar {
          max-height: 0;
          opacity: 0;
          padding-block: 0;
        }

        &.hide-on-scroll {
          transform: translateY(-100%);
        }

        .scroll-progress {
          position: absolute;
          left: 0;
          right: 0;
          bottom: calc(-1 * var(--esp-header-progress-height, 3px));
          height: var(--esp-header-progress-height, 3px);
          background: var(--esp-header-progress-track-background, transparent);
          overflow: hidden;
          pointer-events: none;

          &::before {
            content: "";
            display: block;
            width: 100%;
            height: 100%;
            transform-origin: left center;
            transform: scaleX(var(--_esp-header-scroll-progress, 0));
            background: var(--esp-header-progress-background, var(--esp-color-link));
          }
        }
      }

      
      header.scaled-header:not(.geometry-compact),
      :host([data-esp-geometry-measuring]) header.scaled-header {
        --_esp-menu-horizontal-align: center;
        --_esp-menu-button-row-height: auto;
        --_esp-menu-button-row-min-height: var(--_esp-header-current-height);
      }

      header.scaled-header:not(.geometry-compact) {
        --_esp-menu-active-indicator-shadow: none;

        section.buttons > esp-header-button:not([popover]),
        section.buttons ::slotted(*) {
          --_esp-header-button-background: transparent;
          --_esp-header-button-background-hover: transparent;
          --_esp-header-button-border-left: none;
          --_esp-header-button-box-shadow: none;
        }
      }

      header.geometry-active {
        --_esp-header-expanded-bar-height: calc(var(--_esp-header-base-height) * var(--_esp-header-height-multiplier));
        --_esp-header-bar-height: var(--_esp-header-expanded-bar-height);
        --_esp-header-base-logo-size: var(--esp-header-brand-logo-size, calc(0.72 * var(--_esp-header-base-height)));
        --_esp-header-expanded-logo-size: calc(var(--_esp-header-base-logo-size) * var(--_esp-header-height-multiplier));
        --_esp-header-compact-bar-height: var(--esp-header-compact-height, max(44px, calc(3.5 * var(--esp-size-small))));
        --_esp-header-compact-logo-size: min(var(--_esp-header-expanded-logo-size), max(0px, calc(var(--_esp-header-compact-bar-height) - var(--_esp-header-bar-block-insets, 0px))));
        --_esp-header-resolved-logo-size: var(--_esp-header-expanded-logo-size);
        grid-template-rows: min-content minmax(var(--_esp-header-bar-height), max-content);
        transition: grid-template-rows 0.24s ease, min-height 0.24s ease, ${V};

        > section:not(.topbar) { min-height: 0; }
        section.menu-container { align-self: center; }

        &.layout-extended,
        &.layout-extended-centered {
          grid-template-rows: min-content minmax(var(--_esp-header-bar-height), max-content) minmax(var(--esp-header-extended-menu-height, calc(3.5 * var(--esp-size-small))), max-content);
        }

        .brand-logo { height: var(--_esp-header-resolved-logo-size); transition: height 0.24s ease; }
        .brand-fit-probe .brand-logo { height: var(--_esp-header-expanded-logo-size); transition: none; }

        &.geometry-standard {
          --_esp-header-compact-bar-height: var(--_esp-header-base-height);
          --_esp-header-compact-logo-size: var(--_esp-header-base-logo-size);
        }

        &.geometry-compact {
          --_esp-header-current-height: var(--_esp-header-compact-bar-height);
          --_esp-header-bar-height: var(--_esp-header-current-height);
          --_esp-header-resolved-logo-size: var(--_esp-header-compact-logo-size);
        }

        section.brand { box-sizing: border-box; inline-size: min(var(--_esp-header-stable-brand-width, 100%), 100%); }
        .brand-logo-reservation {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 0 0 auto;
          inline-size: var(--_esp-header-logo-reservation-width, auto);
          block-size: var(--_esp-header-resolved-logo-size);
          max-inline-size: min(var(--esp-header-brand-logo-max-width, 12rem), 100%);
        }
        .brand-logo-reservation .brand-logo { max-inline-size: 100%; }
        .compact-brand-fit .brand-logo {
          height: var(--_esp-header-compact-logo-size);
          aspect-ratio: auto var(--esp-header-compact-brand-logo-aspect-ratio, var(--esp-header-brand-logo-aspect-ratio, ${U}));
        }

        .header-expanded-size-probe,
        .header-extra-rows-size-probe,
        .header-bar-border-probe,
        .header-extended-border-probe {
          position: absolute;
          visibility: hidden;
          pointer-events: none;
        }

        .header-expanded-size-probe {
          inline-size: var(--_esp-header-expanded-logo-size);
          block-size: var(--_esp-header-expanded-bar-height);
        }

        .header-extra-rows-size-probe {
          inline-size: var(--esp-header-extended-menu-height, calc(3.5 * var(--esp-size-small)));
          block-size: var(--esp-header-topbar-height, 8rem);
        }

        .header-bar-border-probe,
        .header-extended-border-probe {
          box-sizing: content-box;
          inline-size: 0;
          block-size: 0;
        }

        .header-bar-border-probe {
          border: var(--_esp-header-border-value);
          border-width: var(--_esp-header-border-width-value);
        }

        .header-extended-border-probe {
          border: none;
          border-top: var(--_esp-header-extended-border-value);
        }
      }

      header.geometry-initial,
      header.geometry-initial > section,
      header.geometry-initial .brand-logo { transition: none; }

      :host([data-esp-geometry-transaction]) header,
      :host([data-esp-geometry-transaction]) header > section,
      :host([data-esp-geometry-transaction]) header .brand-logo {
        transition-property: ${Q(ne.join(", "))} !important;
      }

      :host([data-esp-geometry-measuring]) header.geometry-active {
        --_esp-header-current-height: var(--esp-header-height, calc(4.5 * var(--esp-size-small)));
        --_esp-header-bar-height: var(--_esp-header-expanded-bar-height);
        --_esp-header-resolved-logo-size: var(--_esp-header-expanded-logo-size);
      }

      :host([data-esp-geometry-measuring]) header.geometry-active > section.topbar {
        max-height: var(--esp-header-topbar-height, 8rem);
        padding-block: 0;
      }

      
      :host([full-bleed-content]) header {
        padding-inline: 0;
      }

      
      :host([brand-align="center"]) header section.brand,
      :host([brand-align="center"]) header:not(.explicit-inline) section.brand {
        justify-content: center;
        text-align: center;
      }

      :host([brand-align="end"]) header section.brand,
      :host([brand-align="end"]) header:not(.explicit-inline) section.brand {
        justify-content: end;
        text-align: end;
      }

      
      :host([brand-align="center"]) header.layout-centered-menu section.brand {
        justify-self: center;
      }

      :host([brand-align="end"]) header.layout-centered-menu section.brand {
        justify-self: end;
      }

      :host([brand-wrap="truncate"]) .brand-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      :host([brand-wrap="nowrap"]) .brand-text {
        white-space: nowrap;
      }

      :host([brand-wrap="wrap"]) .configured-brand {
        align-items: flex-start;
        white-space: normal;
      }

      @media (max-width: 36rem) {
        header.has-header-end:not(.explicit-inline),
        header:not(.explicit-inline),
        header.layout-centered-brand:not(.explicit-inline),
        header.layout-centered-menu:not(.explicit-inline),
        header.layout-extended:not(.explicit-inline),
        header.layout-extended-centered:not(.explicit-inline),
        header.layout-minimal:not(.explicit-inline) {
          grid-template-columns: minmax(0, 1fr) max-content;
          grid-template-rows: min-content var(--_esp-header-bar-height, var(--_esp-header-current-height));

          section.brand {
            grid-column: 1;
            grid-row: 2;
            
            justify-self: stretch;
            justify-content: start;
            text-align: start;
          }

          section.buttons {
            grid-column: 2;
            grid-row: 2;
          }

          .configured-brand {
            max-width: var(--esp-header-brand-max-width, min(28ch, 58vw));
          }
        }

        header.geometry-active:not(.explicit-inline) {
          grid-template-rows: min-content minmax(var(--_esp-header-bar-height), max-content);
        }

        
        :host([brand-align="center"])
          header.layout-centered-menu:not(.explicit-inline)
          section.brand,
        :host([brand-align="end"]) header.layout-centered-menu:not(.explicit-inline) section.brand {
          justify-self: stretch;
        }

        
        header.primary-drawer section.menu-container,
        header.layout-minimal section.menu-container {
          display: block;
          position: absolute;
          width: 0;
          height: 0;
          min-height: 0;
          overflow: visible;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        header,
        header.geometry-active,
        header.geometry-active .brand-logo,
        header > section.topbar,
        header .configured-brand {
          transition: none;
        }
      }
    `],s([v()],o.prototype,"menuOpen",void 0),s([v()],o.prototype,"navigationConstrained",void 0),s([v()],o.prototype,"menuTooLarge",void 0),s([v()],o.prototype,"mobileMenu",void 0),s([v()],o.prototype,"scrolled",void 0),s([v()],o.prototype,"hiddenByScroll",void 0),s([v()],o.prototype,"scrollProgress",void 0),s([l({attribute:"show-burger",type:Boolean})],o.prototype,"showBurger",void 0),s([l({converter:M.converter,reflect:!0})],o.prototype,"layout",void 0),s([l({attribute:"brand-text",type:String})],o.prototype,"brandText",void 0),s([l({attribute:"brand-logo",type:String})],o.prototype,"brandLogo",void 0),s([l({attribute:"light-brand-logo",type:String})],o.prototype,"lightBrandLogo",void 0),s([l({attribute:"dark-brand-logo",type:String})],o.prototype,"darkBrandLogo",void 0),s([l({attribute:"compact-brand-logo",type:String})],o.prototype,"compactBrandLogo",void 0),s([l({attribute:"light-compact-brand-logo",type:String})],o.prototype,"lightCompactBrandLogo",void 0),s([l({attribute:"dark-compact-brand-logo",type:String})],o.prototype,"darkCompactBrandLogo",void 0),s([l({attribute:"height-multiplier",type:Number,reflect:!0})],o.prototype,"heightMultiplier",void 0),s([l({attribute:"compact-size",converter:P.converter,reflect:!0})],o.prototype,"compactSize",void 0),s([l({attribute:"brand-href",type:String})],o.prototype,"brandHref",void 0),s([l({attribute:"brand-alt",type:String})],o.prototype,"brandAlt",void 0),s([l({attribute:"brand-color",type:String})],o.prototype,"brandColor",void 0),s([l({attribute:"light-brand-color",type:String})],o.prototype,"lightBrandColor",void 0),s([l({attribute:"dark-brand-color",type:String})],o.prototype,"darkBrandColor",void 0),s([l({attribute:"brand-align",converter:D.converter,reflect:!0})],o.prototype,"brandAlign",void 0),s([l({attribute:"brand-wrap",converter:B.converter,reflect:!0})],o.prototype,"brandWrap",void 0),s([l({attribute:"menu-display",converter:z.converter,reflect:!0})],o.prototype,"menuDisplay",void 0),s([l({attribute:"theme-toggle",converter:O.converter,reflect:!0})],o.prototype,"themeToggle",void 0),s([l({attribute:"scroll-behavior",type:String})],o.prototype,"scrollBehavior",void 0),s([l({attribute:"scroll-threshold",type:Number})],o.prototype,"scrollThreshold",void 0),s([l({attribute:"dock-offset",type:Number})],o.prototype,"dockOffset",void 0),s([l({attribute:"drawer-target",type:String})],o.prototype,"drawerTarget",void 0),s([l({attribute:!1})],o.prototype,"previewCollapseRequested",void 0),s([l({attribute:"full-bleed-content",type:Boolean,reflect:!0})],o.prototype,"fullBleedContent",void 0),s([v()],o.prototype,"readyCompactLogo",void 0),o=s([Y("esp-header")],o);export{o as EspalierHeader};
