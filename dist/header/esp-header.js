var a=function(h,e,t,o){var r=arguments.length,i=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(h,e,t,o);else for(var d=h.length-1;d>=0;d--)(n=h[d])&&(i=(r<3?n(i):r>3?n(e,t,i):n(e,t))||i);return r>3&&i&&Object.defineProperty(e,t,i),i};import{css as k,html as x,nothing as T}from"lit";import{customElement as A,property as l,state as c}from"lit/decorators.js";import{classMap as O}from"lit/directives/class-map.js";import{styleMap as _}from"lit/directives/style-map.js";import"../burger/esp-burger.js";import{createRef as C,ref as D}from"lit/directives/ref.js";import{EspalierMenu as p}from"../menu/esp-menu.js";import{RafThrottle as E}from"../shared/raf-throttle.js";import{viewportSize as R}from"../shared/viewport.js";import{CONFIGURED_BRAND_LOGO_ASPECT_RATIO as z,configuredBrandLogoGeometry as H,renderConfiguredBrand as P,resolveConfiguredBrand as M}from"../shared/configured-brand.js";import{EspalierElementBase as L}from"../shared/esp-element-base.js";import{ESP_EVENTS as j}from"../shared/events.js";const V="(max-width: 36rem)";function u(h,e){const t=new Set(h);return{allowedValues:t,converter:{fromAttribute(r){return r??e},toAttribute(r){return t.has(r)?r:e}},defaultValue:e}}const N=["standard","centered-brand","centered-menu","extended","extended-centered","minimal"],q=["start","center","end"],U=["truncate","wrap","nowrap"],$=["auto","inline","drawer"],F=["hidden","visible"],g=u(N,"standard"),b=u(q,"start"),f=u(U,"truncate"),v=u($,"auto"),w=u(F,"hidden");let s=class extends L{constructor(){super(...arguments),this.menuOpen=!1,this.menuTooLarge=!1,this.mobileMenu=!1,this.scrolled=!1,this.hiddenByScroll=!1,this.scrollProgress=0,this.showBurger=!1,this.layout=g.defaultValue,this.brandText="",this.brandLogo="",this.lightBrandLogo="",this.darkBrandLogo="",this.brandHref="",this.brandAlt="",this.brandColor="",this.lightBrandColor="",this.darkBrandColor="",this.brandAlign=b.defaultValue,this.brandWrap=f.defaultValue,this.menuDisplay=v.defaultValue,this.themeToggle=w.defaultValue,this.scrollBehavior="none",this.scrollThreshold=16,this.dockOffset=0,this.drawerTarget="",this.previewCollapseRequested=!1,this.fullBleedContent=!1,this.menuContainer=C(),this.menuButton=C(),this.menu=void 0,this.externalDrawerTarget=null,this.lastScrollY=0,this.lastInlineMenuWidth=0,this.mobileMenuQuery=null,this.menuDrawerListenersAttached=!1,this.observingMenuContainer=!1,this.scrollListenersAttached=!1,this.scrollFrame=new E(()=>this.runScrollStateUpdate()),this.resizeObserver=new ResizeObserver(()=>this.syncMenuLayout()),this.menuChildObserver=null,this.updateScrollState=()=>this.scrollFrame.schedule(),this.handleMobileMenuQueryChange=e=>{this.mobileMenu=e.matches,this.syncMenuLayout(),this.syncExternalDrawerControl()},this.toggleTheme=()=>{const e=this.getThemeRoot();if(!e)return;e.scheme=e.scheme==="dark"?"light":"dark";const t=e.scheme==="dark"?"dark":"light";this.dispatchEvent(new CustomEvent(j.HEADER_THEME_TOGGLE,{detail:{scheme:t},bubbles:!0,composed:!0}))},this.handleMenuToggleClicked=()=>{if(this.menuOpen){this.closeNav();return}this.openNav()},this.onMenuDrawerOpened=()=>{this.menuOpen=!0,document.body.classList.add("menu-open"),this.burger&&(this.burger.menuOpen=!0)},this.onMenuDrawerClosed=()=>{this.menuOpen=!1,document.body.classList.remove("menu-open"),this.burger&&(this.burger.menuOpen=!1),this.demoteMenuToggle()},this.onMenuDrawerPresented=e=>{e.target!==this.menu||!this.menu?.isFullScreenDrawer||this.promoteMenuToggle()},this.menuTogglePromoted=!1,this.promotedToggleFrame=new E(()=>this.positionPromotedToggle()),this.handlePromotedViewportResize=()=>this.promotedToggleFrame.schedule(),this.lastDrawerBrandKey="",this.inertedHeaderChrome=[]}syncMenuLayout(){if(!this.menuContainer.value||!this.menu||!this.menu.getWidth)return;this.positionPromotedToggle();const e=this.menu.getWidth();e>0&&(this.lastInlineMenuWidth=e);const t=this.lastInlineMenuWidth||e,o=this.getExternalDrawerTarget(),r=this.menuDisplay!=="inline",i=this.showBurger||this.menuDisplay==="drawer"||this.layout==="minimal"||this.previewCollapseRequested,n=r&&this.menuDisplay==="auto",d=n?this.layout==="centered-menu"?this.centeredMenuCapacity():this.menuContainer.value.clientWidth:0;this.menuTooLarge=n&&t>d,this.menu.sliding=r&&!o&&this.hasDrawerableContent()&&(this.menuTooLarge||i||this.mobileMenu)}centeredMenuCapacity(){const e=this.menuContainer.value?.parentElement;if(!(e instanceof HTMLElement))return 0;const t=d=>d?d.getBoundingClientRect().width:0,o=getComputedStyle(e),r=e.clientWidth-(Number.parseFloat(o.paddingLeft)||0)-(Number.parseFloat(o.paddingRight)||0),i=e.querySelector(":scope > section.brand"),n=e.querySelector(":scope > section.buttons");return r-t(i)-t(n)+t(n?.querySelector("esp-header-button.menu-toggle"))}menuHasContent(){return!!(this.menu??this.querySelector(':scope > [slot="menu"]'))?.querySelector("esp-menu-item, esp-menu-group")}hasDrawerableContent(){return this.showBurger||!!this.getExternalDrawerTarget()||this.menuHasContent()}getExternalDrawerTarget(){if(!this.drawerTarget)return null;const e=document.getElementById(this.drawerTarget);return e===this.menu?null:e&&"openDrawer"in e&&typeof e.openDrawer=="function"&&"closeDrawer"in e&&typeof e.closeDrawer=="function"?e:null}getBurgerFocusTarget(){const t=this.shadowRoot?.querySelector("esp-header-button.menu-toggle")?.shadowRoot?.querySelector("button"),o=this.menuButton.value?.shadowRoot?.querySelector("button");return t??o??null}getScrollTokens(){const e=this.scrollBehavior.split(/\s+/).map(t=>t.trim().toLowerCase()).filter(Boolean);return new Set(e.filter(t=>t!=="none"))}getEffectiveScrollThreshold(){return Number.isFinite(this.scrollThreshold)?Math.max(0,this.scrollThreshold):0}clearScrollState(){this.scrolled=!1,this.hiddenByScroll=!1,this.scrollProgress=0}runScrollStateUpdate(){const e=this.getScrollTokens();if(!e.size){this.clearScrollState();return}const t=Math.max(0,window.scrollY||document.documentElement.scrollTop||0),o=this.getEffectiveScrollThreshold(),r=Number.isFinite(this.dockOffset)?Math.max(0,this.dockOffset):o,i=t>(e.has("dock")?r:o),n=t>this.lastScrollY,d=e.has("reveal")&&n&&t>o&&!this.menuOpen;if(this.scrolled=i,this.hiddenByScroll=d,e.has("progress")){const m=document.documentElement,y=Math.max(1,m.scrollHeight-window.innerHeight);this.scrollProgress=Math.min(1,t/y)}else this.scrollProgress=0;this.lastScrollY=t}cancelScrollUpdate(){this.scrollFrame.cancel()}syncScrollListeners(){const e=this.getScrollTokens().size>0;if(e&&!this.scrollListenersAttached?(window.addEventListener("scroll",this.updateScrollState,{passive:!0}),window.addEventListener("resize",this.updateScrollState,{passive:!0}),this.scrollListenersAttached=!0):!e&&this.scrollListenersAttached&&this.removeScrollListeners(),e){this.updateScrollState();return}this.cancelScrollUpdate(),this.clearScrollState()}removeScrollListeners(){this.scrollListenersAttached&&(window.removeEventListener("scroll",this.updateScrollState),window.removeEventListener("resize",this.updateScrollState),this.scrollListenersAttached=!1)}addMenuDrawerListeners(){!this.menu||this.menuDrawerListenersAttached||(this.menu.addEventListener("esp-menu-drawer-opened",this.onMenuDrawerOpened),this.menu.addEventListener("esp-menu-drawer-presented",this.onMenuDrawerPresented),this.menu.addEventListener("esp-menu-drawer-closed",this.onMenuDrawerClosed),this.menuDrawerListenersAttached=!0)}removeMenuDrawerListeners(){!this.menu||!this.menuDrawerListenersAttached||(this.menu.removeEventListener("esp-menu-drawer-opened",this.onMenuDrawerOpened),this.menu.removeEventListener("esp-menu-drawer-presented",this.onMenuDrawerPresented),this.menu.removeEventListener("esp-menu-drawer-closed",this.onMenuDrawerClosed),this.menuDrawerListenersAttached=!1)}observeMenuContainer(){if(!this.menuContainer.value||this.observingMenuContainer)return;this.resizeObserver.observe(this.menuContainer.value);const e=this.menuContainer.value.parentElement;if(e){this.resizeObserver.observe(e);for(const t of e.querySelectorAll(":scope > section.brand, :scope > section.buttons"))this.resizeObserver.observe(t)}this.observingMenuContainer=!0}disconnectResizeObserver(){this.observingMenuContainer&&(this.resizeObserver.disconnect(),this.observingMenuContainer=!1)}observeMenuChildren(){!this.menu||this.menuChildObserver||(this.menuChildObserver=new MutationObserver(()=>{this.syncMenuLayout(),this.requestUpdate()}),this.menuChildObserver.observe(this.menu,{childList:!0,subtree:!0}))}syncMobileMenuQuery(){if("matchMedia"in window){if(!this.mobileMenuQuery){this.mobileMenuQuery=window.matchMedia(V),this.mobileMenu=this.mobileMenuQuery.matches,this.mobileMenuQuery.addEventListener("change",this.handleMobileMenuQueryChange);return}this.mobileMenu=this.mobileMenuQuery.matches}}getThemeRoot(){return this.traverseToClosest("esp-root")}syncExternalDrawerTarget(){const e=this.getExternalDrawerTarget(),t=e===this.menu?null:e;t!==this.externalDrawerTarget&&(this.externalDrawerTarget?.removeEventListener("esp-menu-drawer-opened",this.onMenuDrawerOpened),this.externalDrawerTarget?.removeEventListener("esp-menu-drawer-closed",this.onMenuDrawerClosed),this.externalDrawerTarget instanceof p&&(this.externalDrawerTarget.hasExternalDrawerControl=!1),this.externalDrawerTarget=t,this.externalDrawerTarget?.addEventListener("esp-menu-drawer-opened",this.onMenuDrawerOpened),this.externalDrawerTarget?.addEventListener("esp-menu-drawer-closed",this.onMenuDrawerClosed)),this.syncExternalDrawerControl()}burgerVisibleForTarget(){if(this.menuDisplay==="inline")return!1;const e=this.showBurger||this.menuDisplay==="drawer"||this.layout==="minimal"||this.previewCollapseRequested;return this.menuTooLarge||this.mobileMenu||e}syncExternalDrawerControl(){this.externalDrawerTarget instanceof p&&(this.externalDrawerTarget.hasExternalDrawerControl=this.burgerVisibleForTarget())}openNav(){const e=this.getBurgerFocusTarget(),t=this.getExternalDrawerTarget();if(this.burger&&(this.burger.menuOpen=!0),t){this.menuOpen=!0,t.openDrawer(e),document.body.classList.add("menu-open");return}if(this.menu){this.menu.sliding=!0,this.menuOpen=!0,this.menu.isFullScreenDrawer&&this.canPromoteMenuToggle()&&(this.menu.liftedCloseControl=this.getMenuToggleElement()),this.menu.openDrawer(e),document.body.classList.add("menu-open");return}this.burger&&(this.burger.menuOpen=!1)}closeNav(){this.menuOpen=!1,this.burger&&(this.burger.menuOpen=!1),this.demoteMenuToggle();const e=this.getExternalDrawerTarget();if(e){e.closeDrawer(),document.body.classList.remove("menu-open");return}this.menu&&(this.menu.closeDrawer(),document.body.classList.remove("menu-open"))}getMenuToggleElement(){return this.shadowRoot?.querySelector("esp-header-button.menu-toggle")??null}canPromoteMenuToggle(){const e=this.getMenuToggleElement();return!!e&&typeof e?.showPopover=="function"}setHeaderChromeInert(e){if(!e){for(const n of this.inertedHeaderChrome)n.inert=!1;this.inertedHeaderChrome=[];return}const t=this.menuContainer.value?.parentElement,o=this.getMenuToggleElement();if(!t||!o)return;const r=[];for(const n of t.querySelectorAll(":scope > section.brand, :scope > section.topbar"))r.push(n);const i=t.querySelector(":scope > section.buttons");for(const n of i?.children??[])if(!(!(n instanceof HTMLElement)||n===o)){if(n instanceof HTMLSlotElement){for(const d of n.assignedElements())d instanceof HTMLElement&&r.push(d);continue}r.push(n)}for(const n of r)n.inert||(n.inert=!0,this.inertedHeaderChrome.push(n))}promoteMenuToggle(){const e=this.getMenuToggleElement();if(!e||this.menuTogglePromoted||typeof e.showPopover!="function")return;const t=e.getBoundingClientRect();e.setAttribute("popover","manual"),Object.assign(e.style,{position:"fixed",inset:"auto",margin:"0",padding:"0",border:"0",background:"transparent",overflow:"visible"}),this.setPromotedTogglePosition(e,t.left,t.top,t.width,t.height);try{e.showPopover()}catch{e.removeAttribute("popover"),e.removeAttribute("style"),this.menu&&(this.menu.liftedCloseControl=null);return}this.menuTogglePromoted=!0,window.addEventListener("resize",this.handlePromotedViewportResize),this.menu&&(this.menu.liftedCloseControl=e),this.setHeaderChromeInert(!0)}positionPromotedToggle(){if(!this.menuTogglePromoted)return;const e=this.getMenuToggleElement(),t=this.shadowRoot?.querySelector("section.buttons");if(!e||!t)return;const o=t.getBoundingClientRect(),r=e.getBoundingClientRect(),i=getComputedStyle(t).direction==="rtl";this.setPromotedTogglePosition(e,i?o.left:o.right-r.width,o.top+(o.height-r.height)/2,r.width,r.height)}setPromotedTogglePosition(e,t,o,r,i){const n=R();e.style.left=`${Math.max(0,Math.min(t,n.width-r))}px`,e.style.top=`${Math.max(0,Math.min(o,n.height-i))}px`}demoteMenuToggle(){if(window.removeEventListener("resize",this.handlePromotedViewportResize),this.promotedToggleFrame.cancel(),this.menu?.liftedCloseControl&&(this.menu.liftedCloseControl=null),!this.menuTogglePromoted)return;this.menuTogglePromoted=!1,this.setHeaderChromeInert(!1);const e=this.getMenuToggleElement();if(e){try{e.hidePopover()}catch{}e.removeAttribute("popover"),e.removeAttribute("style")}}syncDrawerBrand(){if(!this.menu)return;const e=M({scheme:this.scheme,brandLogo:this.brandLogo,brandColor:this.brandColor,lightBrandLogo:this.lightBrandLogo,darkBrandLogo:this.darkBrandLogo,lightBrandColor:this.lightBrandColor,darkBrandColor:this.darkBrandColor}),t=e.brandLogo||this.brandText?{brandLogo:e.brandLogo,brandText:this.brandText,brandHref:this.brandHref,brandAlt:this.brandAlt,brandColor:e.brandColor}:null,o=JSON.stringify(t);o!==this.lastDrawerBrandKey&&(this.lastDrawerBrandKey=o,this.menu.drawerBrand=t)}get burger(){return this.menuButton.value??void 0}willUpdate(e){super.willUpdate(e),e.has("layout")&&!g.allowedValues.has(this.layout)&&(this.layout=g.defaultValue),e.has("brandAlign")&&!b.allowedValues.has(this.brandAlign)&&(this.brandAlign=b.defaultValue),e.has("brandWrap")&&!f.allowedValues.has(this.brandWrap)&&(this.brandWrap=f.defaultValue),e.has("menuDisplay")&&!v.allowedValues.has(this.menuDisplay)&&(this.menuDisplay=v.defaultValue),e.has("themeToggle")&&!w.allowedValues.has(this.themeToggle)&&(this.themeToggle=w.defaultValue)}firstUpdated(e){if(super.firstUpdated(e),!this.menuContainer.value)return;const r=(this.menuContainer.value.firstElementChild?.assignedElements()??[])[0];r instanceof p?(this.menu=r,this.addMenuDrawerListeners(),this.observeMenuChildren(),this.syncDrawerBrand()):r&&console.warn("<esp-header>: the menu slot expects an <esp-menu> element, received",r),this.observeMenuContainer(),this.syncExternalDrawerTarget(),this.syncMobileMenuQuery(),this.syncScrollListeners(),this.syncMenuLayout()}updated(e){super.updated(e),this.syncDrawerBrand(),(e.has("showBurger")||e.has("drawerTarget")||e.has("menuDisplay")||e.has("layout")||e.has("previewCollapseRequested"))&&(this.syncExternalDrawerTarget(),this.syncMenuLayout()),(e.has("mobileMenu")||e.has("menuTooLarge"))&&this.syncExternalDrawerControl(),e.has("scrollBehavior")?this.syncScrollListeners():(e.has("scrollThreshold")||e.has("dockOffset"))&&this.updateScrollState()}connectedCallback(){super.connectedCallback(),this.syncScrollListeners(),this.syncMobileMenuQuery(),this.addMenuDrawerListeners(),this.syncExternalDrawerTarget(),this.observeMenuContainer(),this.observeMenuChildren()}disconnectedCallback(){this.removeMenuDrawerListeners(),this.externalDrawerTarget?.removeEventListener("esp-menu-drawer-opened",this.onMenuDrawerOpened),this.externalDrawerTarget?.removeEventListener("esp-menu-drawer-closed",this.onMenuDrawerClosed),this.externalDrawerTarget instanceof p&&(this.externalDrawerTarget.hasExternalDrawerControl=!1),this.externalDrawerTarget=null,this.mobileMenuQuery?.removeEventListener("change",this.handleMobileMenuQueryChange),this.mobileMenuQuery=null,this.removeScrollListeners(),this.cancelScrollUpdate(),this.disconnectResizeObserver(),this.menuChildObserver?.disconnect(),this.menuChildObserver=null,this.demoteMenuToggle(),super.disconnectedCallback()}render(){const{menuOpen:e,menuTooLarge:t,mobileMenu:o}=this,r=this.menuDisplay!=="inline",i=r&&(this.showBurger||this.menuDisplay==="drawer"||this.layout==="minimal"||this.previewCollapseRequested),n=this.getScrollTokens(),d=n.has("progress"),m=M({scheme:this.scheme,brandLogo:this.brandLogo,brandColor:this.brandColor,lightBrandLogo:this.lightBrandLogo,darkBrandLogo:this.darkBrandLogo,lightBrandColor:this.lightBrandColor,darkBrandColor:this.darkBrandColor}),y={"--_esp-header-brand-color":m.brandColor||null,"--_esp-header-scroll-progress":String(this.scrollProgress)},S={"menu-open":e,"too-wide":r&&this.hasDrawerableContent()&&(t||o||i),[`layout-${this.layout}`]:!0,"is-scrolled":this.scrolled,"hide-on-scroll":this.hiddenByScroll,"scroll-compact":n.has("compact"),"scroll-elevate":n.has("elevate"),"scroll-transparent":n.has("transparent")||n.has("transparent-to-solid"),"scroll-collapse-topbar":n.has("collapse-topbar")},B=this.scheme==="dark"?"light":"dark";return x`
      <header class=${O(S)} style=${_(y)}>
        <section class="topbar">
          <slot name="topbar"></slot>
        </section>

        <section class="brand">
          <slot name="brand"
            >${P({brandLogo:m.brandLogo,brandText:this.brandText,brandHref:this.brandHref,brandAlt:this.brandAlt})}</slot
          >
        </section>

        <section ${D(this.menuContainer)} class="menu-container">
          <slot name="menu"></slot>
        </section>

        <section class="buttons">
          <slot name="buttons"></slot>
          ${this.themeToggle==="visible"?x`<esp-header-button
                class="theme-toggle"
                icon=${this.scheme==="dark"?"sun":"moon"}
                aria-label=${`Switch to ${B} mode`}
                @esp-clicked=${this.toggleTheme}
              ></esp-header-button>`:T}
          
          <esp-header-button
            class="menu-toggle"
            aria-label=${e?"Close navigation":"Open navigation"}
            aria-controls=${this.drawerTarget||T}
            aria-expanded=${e?"true":"false"}
            @esp-clicked=${this.handleMenuToggleClicked}
          >
            <esp-burger ${D(this.menuButton)} presentation-only></esp-burger>
          </esp-header-button>
        </section>
        ${d?x`<div class="scroll-progress" aria-hidden="true"></div>`:T}
      </header>
    `}};s.styles=[...L.styles,H,k`
      :host {
        --_esp-header-current-height: var(--esp-header-height, calc(4.5 * var(--esp-size-small)));

        display: block;
        position: relative;
        z-index: var(--esp-header-z-index, 20);
      }

      header {
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
        grid-template-rows: min-content var(--_esp-header-current-height);
        align-items: stretch;
        overflow: visible;
        min-height: var(--_esp-header-current-height);
        background: var(--esp-header-background, var(--esp-color-layer-2));
        border: var(--esp-header-border, solid var(--esp-color-border));
        border-width: var(--esp-header-border-width, 0 0 1px 0);
        box-shadow: var(--esp-header-shadow, 0 0 2px var(--esp-color-shadow));
        color: var(--esp-header-color, var(--esp-color-text));
        transform: translateY(0);
        transition:
          min-height 0.24s ease,
          background-color 0.24s ease,
          border-color 0.24s ease,
          box-shadow 0.24s ease,
          color 0.24s ease,
          transform 0.24s ease;

        > section {
          min-height: var(--_esp-header-current-height);
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
            var(--esp-header-brand-logo-aspect-ratio, ${z});
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
            --esp-menu-top-offset: var(--_esp-header-current-height);
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
            border-top: var(--esp-header-extended-menu-border, 1px solid var(--esp-color-border));
          }

          section.menu-container ::slotted(esp-menu) {
            --esp-header-height: var(
              --esp-header-extended-menu-height,
              calc(3.5 * var(--esp-size-small))
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

        &.scroll-compact.is-scrolled {
          --_esp-header-current-height: var(
            --esp-header-compact-height,
            max(44px, calc(3.5 * var(--esp-size-small)))
          );
        }

        &.scroll-elevate.is-scrolled {
          box-shadow: var(--esp-header-scrolled-shadow, 0 2px 8px var(--esp-color-shadow));
        }

        &.scroll-transparent:not(.is-scrolled) {
          background: var(--esp-header-transparent-background, transparent);
          border-color: transparent;
          box-shadow: none;
          color: var(--esp-header-transparent-color, var(--esp-color-headings));
        }

        &.scroll-transparent:not(.is-scrolled) .configured-brand {
          color: var(--esp-header-transparent-color, var(--_esp-header-brand-resolved-color));
        }

        &.scroll-collapse-topbar.is-scrolled > section.topbar {
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

      
      :host([full-bleed-content]) header {
        padding-inline: 0;
      }

      :host([brand-align="center"]) header section.brand {
        justify-content: center;
        text-align: center;
      }

      :host([brand-align="end"]) header section.brand {
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
        header,
        header.layout-centered-brand,
        header.layout-centered-menu,
        header.layout-extended,
        header.layout-extended-centered,
        header.layout-minimal {
          grid-template-columns: minmax(0, 1fr) max-content;
          grid-template-rows: min-content var(--_esp-header-current-height);

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

        
        :host([brand-align="center"]) header.layout-centered-menu section.brand,
        :host([brand-align="end"]) header.layout-centered-menu section.brand {
          justify-self: stretch;
        }

        
        header.too-wide section.menu-container,
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
        header > section.topbar,
        header .configured-brand {
          transition: none;
        }
      }
    `],a([c()],s.prototype,"menuOpen",void 0),a([c()],s.prototype,"menuTooLarge",void 0),a([c()],s.prototype,"mobileMenu",void 0),a([c()],s.prototype,"scrolled",void 0),a([c()],s.prototype,"hiddenByScroll",void 0),a([c()],s.prototype,"scrollProgress",void 0),a([l({attribute:"show-burger",type:Boolean})],s.prototype,"showBurger",void 0),a([l({converter:g.converter,reflect:!0})],s.prototype,"layout",void 0),a([l({attribute:"brand-text",type:String})],s.prototype,"brandText",void 0),a([l({attribute:"brand-logo",type:String})],s.prototype,"brandLogo",void 0),a([l({attribute:"light-brand-logo",type:String})],s.prototype,"lightBrandLogo",void 0),a([l({attribute:"dark-brand-logo",type:String})],s.prototype,"darkBrandLogo",void 0),a([l({attribute:"brand-href",type:String})],s.prototype,"brandHref",void 0),a([l({attribute:"brand-alt",type:String})],s.prototype,"brandAlt",void 0),a([l({attribute:"brand-color",type:String})],s.prototype,"brandColor",void 0),a([l({attribute:"light-brand-color",type:String})],s.prototype,"lightBrandColor",void 0),a([l({attribute:"dark-brand-color",type:String})],s.prototype,"darkBrandColor",void 0),a([l({attribute:"brand-align",converter:b.converter,reflect:!0})],s.prototype,"brandAlign",void 0),a([l({attribute:"brand-wrap",converter:f.converter,reflect:!0})],s.prototype,"brandWrap",void 0),a([l({attribute:"menu-display",converter:v.converter,reflect:!0})],s.prototype,"menuDisplay",void 0),a([l({attribute:"theme-toggle",converter:w.converter,reflect:!0})],s.prototype,"themeToggle",void 0),a([l({attribute:"scroll-behavior",type:String})],s.prototype,"scrollBehavior",void 0),a([l({attribute:"scroll-threshold",type:Number})],s.prototype,"scrollThreshold",void 0),a([l({attribute:"dock-offset",type:Number})],s.prototype,"dockOffset",void 0),a([l({attribute:"drawer-target",type:String})],s.prototype,"drawerTarget",void 0),a([l({attribute:!1})],s.prototype,"previewCollapseRequested",void 0),a([l({attribute:"full-bleed-content",type:Boolean,reflect:!0})],s.prototype,"fullBleedContent",void 0),s=a([A("esp-header")],s);export{s as EspalierHeader};
