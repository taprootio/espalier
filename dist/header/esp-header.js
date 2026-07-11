var n=function(p,e,t,a){var s=arguments.length,i=s<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,t):a,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(p,e,t,a);else for(var h=p.length-1;h>=0;h--)(l=p[h])&&(i=(s<3?l(i):s>3?l(e,t,i):l(e,t))||i);return s>3&&i&&Object.defineProperty(e,t,i),i};import{css as y,html as d,nothing as c}from"lit";import{customElement as x,property as o,state as u}from"lit/decorators.js";import{classMap as M}from"lit/directives/class-map.js";import{styleMap as S}from"lit/directives/style-map.js";import"../burger/esp-burger.js";import{createRef as b,ref as f}from"lit/directives/ref.js";import{EspalierMenu as T}from"./esp-menu.js";import{EspalierElementBase as v}from"../shared/esp-element-base.js";const D="(max-width: 36rem)";let r=class extends v{constructor(){super(...arguments),this.menuOpen=!1,this.menuTooLarge=!1,this.mobileMenu=!1,this.scrolled=!1,this.hiddenByScroll=!1,this.scrollProgress=0,this.showBurger=!1,this.layout="standard",this.brandText="",this.brandLogo="",this.brandHref="",this.brandAlt="",this.brandColor="",this.brandAlign="start",this.brandWrap="truncate",this.menuDisplay="auto",this.themeToggle="hidden",this.scrollBehavior="none",this.scrollThreshold=16,this.dockOffset=0,this.drawerTarget="",this.fullBleedContent=!1,this.menuContainer=b(),this.menuButton=b(),this.menu=void 0,this.externalDrawerTarget=null,this.lastScrollY=0,this.lastInlineMenuWidth=0,this.mobileMenuQuery=null,this.menuDrawerListenersAttached=!1,this.observingMenuContainer=!1,this.scrollListenersAttached=!1,this.scrollRafId=null,this.resizeObserver=new ResizeObserver(()=>this.syncMenuLayout()),this.updateScrollState=()=>{this.scrollRafId===null&&(this.scrollRafId=requestAnimationFrame(()=>{this.scrollRafId=null,this.runScrollStateUpdate()}))},this.handleMobileMenuQueryChange=e=>{this.mobileMenu=e.matches,this.syncMenuLayout()},this.toggleTheme=()=>{const e=this.getThemeRoot();e&&(e.scheme=e.scheme==="dark"?"light":"dark")},this.handleMenuToggleClicked=()=>{if(this.menuOpen){this.closeNav();return}this.openNav()},this.onMenuDrawerOpened=()=>{this.menuOpen=!0,document.body.classList.add("menu-open"),this.burger&&(this.burger.menuOpen=!0)},this.onMenuDrawerClosed=()=>{this.menuOpen=!1,document.body.classList.remove("menu-open"),this.burger&&(this.burger.menuOpen=!1)}}syncMenuLayout(){if(!this.menuContainer.value||!this.menu||!this.menu.getWidth)return;const e=this.menuContainer.value.clientWidth,t=this.menu.getWidth();t>0&&(this.lastInlineMenuWidth=t);const a=this.lastInlineMenuWidth||t,s=this.getExternalDrawerTarget(),i=this.menuDisplay!=="inline",l=this.showBurger||this.menuDisplay==="drawer"||this.layout==="minimal";this.menuTooLarge=i&&this.menuDisplay==="auto"&&a>e,this.menu.sliding=i&&!s&&(this.menuTooLarge||l||this.mobileMenu)}getExternalDrawerTarget(){if(!this.drawerTarget)return null;const e=document.getElementById(this.drawerTarget);return e===this.menu?null:e&&"openDrawer"in e&&typeof e.openDrawer=="function"&&"closeDrawer"in e&&typeof e.closeDrawer=="function"?e:null}getBurgerFocusTarget(){const t=this.shadowRoot?.querySelector("esp-header-button.menu-toggle")?.shadowRoot?.querySelector("button"),a=this.menuButton.value?.shadowRoot?.querySelector("button");return t??a??null}getScrollTokens(){const e=this.scrollBehavior.split(/\s+/).map(t=>t.trim().toLowerCase()).filter(Boolean);return new Set(e.filter(t=>t!=="none"))}getEffectiveScrollThreshold(){return Number.isFinite(this.scrollThreshold)?Math.max(0,this.scrollThreshold):0}clearScrollState(){this.scrolled=!1,this.hiddenByScroll=!1,this.scrollProgress=0}runScrollStateUpdate(){const e=this.getScrollTokens();if(!e.size){this.clearScrollState();return}const t=Math.max(0,window.scrollY||document.documentElement.scrollTop||0),a=this.getEffectiveScrollThreshold(),s=Number.isFinite(this.dockOffset)?Math.max(0,this.dockOffset):a,i=t>(e.has("dock")?s:a),l=t>this.lastScrollY,h=e.has("reveal")&&l&&t>a&&!this.menuOpen;if(this.scrolled=i,this.hiddenByScroll=h,e.has("progress")){const m=document.documentElement,g=Math.max(1,m.scrollHeight-window.innerHeight);this.scrollProgress=Math.min(1,t/g)}else this.scrollProgress=0;this.lastScrollY=t}cancelScrollUpdate(){this.scrollRafId!==null&&(cancelAnimationFrame(this.scrollRafId),this.scrollRafId=null)}syncScrollListeners(){const e=this.getScrollTokens().size>0;if(e&&!this.scrollListenersAttached?(window.addEventListener("scroll",this.updateScrollState,{passive:!0}),window.addEventListener("resize",this.updateScrollState,{passive:!0}),this.scrollListenersAttached=!0):!e&&this.scrollListenersAttached&&this.removeScrollListeners(),e){this.updateScrollState();return}this.cancelScrollUpdate(),this.clearScrollState()}removeScrollListeners(){this.scrollListenersAttached&&(window.removeEventListener("scroll",this.updateScrollState),window.removeEventListener("resize",this.updateScrollState),this.scrollListenersAttached=!1)}addMenuDrawerListeners(){!this.menu||this.menuDrawerListenersAttached||(this.menu.addEventListener("drawer-opened",this.onMenuDrawerOpened),this.menu.addEventListener("drawer-closed",this.onMenuDrawerClosed),this.menuDrawerListenersAttached=!0)}removeMenuDrawerListeners(){!this.menu||!this.menuDrawerListenersAttached||(this.menu.removeEventListener("drawer-opened",this.onMenuDrawerOpened),this.menu.removeEventListener("drawer-closed",this.onMenuDrawerClosed),this.menuDrawerListenersAttached=!1)}observeMenuContainer(){!this.menuContainer.value||this.observingMenuContainer||(this.resizeObserver.observe(this.menuContainer.value),this.observingMenuContainer=!0)}disconnectResizeObserver(){this.observingMenuContainer&&(this.resizeObserver.disconnect(),this.observingMenuContainer=!1)}syncMobileMenuQuery(){if("matchMedia"in window){if(!this.mobileMenuQuery){this.mobileMenuQuery=window.matchMedia(D),this.mobileMenu=this.mobileMenuQuery.matches,this.mobileMenuQuery.addEventListener("change",this.handleMobileMenuQueryChange);return}this.mobileMenu=this.mobileMenuQuery.matches}}getThemeRoot(){return this.traverseToClosest("esp-root")}syncExternalDrawerTarget(){const e=this.getExternalDrawerTarget(),t=e===this.menu?null:e;t!==this.externalDrawerTarget&&(this.externalDrawerTarget?.removeEventListener("drawer-opened",this.onMenuDrawerOpened),this.externalDrawerTarget?.removeEventListener("drawer-closed",this.onMenuDrawerClosed),this.externalDrawerTarget=t,this.externalDrawerTarget?.addEventListener("drawer-opened",this.onMenuDrawerOpened),this.externalDrawerTarget?.addEventListener("drawer-closed",this.onMenuDrawerClosed))}openNav(){const e=this.getBurgerFocusTarget(),t=this.getExternalDrawerTarget();if(this.burger&&(this.burger.menuOpen=!0),t){this.menuOpen=!0,t.openDrawer(e),document.body.classList.add("menu-open");return}if(this.menu){this.menu.sliding=!0,this.menuOpen=!0,this.menu.openDrawer(e),document.body.classList.add("menu-open");return}this.burger&&(this.burger.menuOpen=!1)}closeNav(){this.menuOpen=!1,this.burger&&(this.burger.menuOpen=!1);const e=this.getExternalDrawerTarget();if(e){e.closeDrawer(),document.body.classList.remove("menu-open");return}this.menu&&(this.menu.closeDrawer(),document.body.classList.remove("menu-open"))}get burger(){return this.menuButton.value??void 0}firstUpdated(e){if(super.firstUpdated(e),!this.menuContainer.value)return;const s=(this.menuContainer.value.firstElementChild?.assignedElements()??[])[0];s instanceof T?(this.menu=s,this.addMenuDrawerListeners()):s&&console.warn("<esp-header>: the menu slot expects an <esp-menu> element, received",s),this.observeMenuContainer(),this.syncExternalDrawerTarget(),this.syncMobileMenuQuery(),this.syncScrollListeners(),this.syncMenuLayout()}updated(e){super.updated(e),(e.has("showBurger")||e.has("drawerTarget")||e.has("menuDisplay")||e.has("layout"))&&(this.syncExternalDrawerTarget(),this.syncMenuLayout()),e.has("scrollBehavior")?this.syncScrollListeners():(e.has("scrollThreshold")||e.has("dockOffset"))&&this.updateScrollState()}connectedCallback(){super.connectedCallback(),this.syncScrollListeners(),this.syncMobileMenuQuery(),this.addMenuDrawerListeners(),this.syncExternalDrawerTarget(),this.observeMenuContainer()}disconnectedCallback(){this.removeMenuDrawerListeners(),this.externalDrawerTarget?.removeEventListener("drawer-opened",this.onMenuDrawerOpened),this.externalDrawerTarget?.removeEventListener("drawer-closed",this.onMenuDrawerClosed),this.externalDrawerTarget=null,this.mobileMenuQuery?.removeEventListener("change",this.handleMobileMenuQueryChange),this.mobileMenuQuery=null,this.removeScrollListeners(),this.cancelScrollUpdate(),this.disconnectResizeObserver(),super.disconnectedCallback()}renderConfiguredBrand(){if(!this.brandLogo&&!this.brandText)return c;const e=this.brandAlt||(this.brandText?"":"Site logo"),t=d`
      ${this.brandLogo?d`<img class="brand-logo" src=${this.brandLogo} alt=${e} />`:c}
      ${this.brandText?d`<span class="brand-text">${this.brandText}</span>`:c}
    `;return this.brandHref?d`<a class="configured-brand" href=${this.brandHref}>${t}</a>`:d`<span class="configured-brand">${t}</span>`}render(){const{menuOpen:e,menuTooLarge:t,mobileMenu:a}=this,s=this.menuDisplay!=="inline",i=s&&(this.showBurger||this.menuDisplay==="drawer"||this.layout==="minimal"),l=this.getScrollTokens(),h=l.has("progress"),m={"--_esp-header-brand-color":this.brandColor||null,"--_esp-header-scroll-progress":String(this.scrollProgress)},g={"menu-open":e,"too-wide":s&&(t||a||i),[`layout-${this.layout}`]:!0,"is-scrolled":this.scrolled,"hide-on-scroll":this.hiddenByScroll,"scroll-compact":l.has("compact"),"scroll-elevate":l.has("elevate"),"scroll-transparent":l.has("transparent")||l.has("transparent-to-solid"),"scroll-collapse-topbar":l.has("collapse-topbar")},w=this.scheme==="dark"?"light":"dark";return d`
      <header class=${M(g)} style=${S(m)}>
        <section class="topbar">
          <slot name="topbar"></slot>
        </section>

        <section class="brand">
          <slot name="brand">${this.renderConfiguredBrand()}</slot>
        </section>

        <section ${f(this.menuContainer)} class="menu-container">
          <slot name="menu"></slot>
        </section>

        <section class="buttons">
          <slot name="buttons"></slot>
          ${this.themeToggle==="visible"?d`<esp-header-button
                class="theme-toggle"
                icon=${this.scheme==="dark"?"sun":"moon"}
                aria-label=${`Switch to ${w} mode`}
                @clicked=${this.toggleTheme}
              ></esp-header-button>`:c}
          <esp-header-button
            class="menu-toggle"
            role="button"
            aria-label=${e?"Close navigation":"Open navigation"}
            aria-controls=${this.drawerTarget||c}
            aria-expanded=${e?"true":"false"}
            @clicked=${this.handleMenuToggleClicked}
          >
            <esp-burger ${f(this.menuButton)} presentation-only></esp-burger>
          </esp-header-button>
        </section>
        ${h?d`<div class="scroll-progress" aria-hidden="true"></div>`:c}
      </header>
    `}};r.styles=[...v.styles,y`
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
          color: var(--_esp-header-brand-resolved-color);

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
            var(--esp-font-brand, var(--esp-font-headings))
          );
          font-size: var(--esp-header-brand-font-size, var(--esp-type-medium));
          font-weight: var(
            --esp-header-brand-font-weight,
            var(--esp-font-weight-brand, var(--esp-font-weight-headings))
          );
          line-height: 1.1;
          text-decoration: none;

          &:hover {
            color: var(--esp-header-brand-hover-color, var(--esp-color-headings-hover));
            background: var(--esp-header-brand-hover-background, transparent);
            text-decoration: var(--esp-header-brand-hover-decoration, none);
          }
        }

        .brand-logo {
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

        &.scroll-transparent:not(.is-scrolled) section.brand {
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
        header.layout-extended,
        header.layout-extended-centered,
        header.layout-minimal {
          grid-template-columns: minmax(0, 1fr) max-content;
          grid-template-rows: min-content var(--_esp-header-current-height);

          section.brand {
            grid-column: 1;
            grid-row: 2;
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
        header > section.topbar {
          transition: none;
        }
      }
    `],n([u()],r.prototype,"menuOpen",void 0),n([u()],r.prototype,"menuTooLarge",void 0),n([u()],r.prototype,"mobileMenu",void 0),n([u()],r.prototype,"scrolled",void 0),n([u()],r.prototype,"hiddenByScroll",void 0),n([u()],r.prototype,"scrollProgress",void 0),n([o({attribute:"show-burger",type:Boolean})],r.prototype,"showBurger",void 0),n([o({type:String,reflect:!0})],r.prototype,"layout",void 0),n([o({attribute:"brand-text",type:String})],r.prototype,"brandText",void 0),n([o({attribute:"brand-logo",type:String})],r.prototype,"brandLogo",void 0),n([o({attribute:"brand-href",type:String})],r.prototype,"brandHref",void 0),n([o({attribute:"brand-alt",type:String})],r.prototype,"brandAlt",void 0),n([o({attribute:"brand-color",type:String})],r.prototype,"brandColor",void 0),n([o({attribute:"brand-align",type:String,reflect:!0})],r.prototype,"brandAlign",void 0),n([o({attribute:"brand-wrap",type:String,reflect:!0})],r.prototype,"brandWrap",void 0),n([o({attribute:"menu-display",type:String,reflect:!0})],r.prototype,"menuDisplay",void 0),n([o({attribute:"theme-toggle",type:String,reflect:!0})],r.prototype,"themeToggle",void 0),n([o({attribute:"scroll-behavior",type:String})],r.prototype,"scrollBehavior",void 0),n([o({attribute:"scroll-threshold",type:Number})],r.prototype,"scrollThreshold",void 0),n([o({attribute:"dock-offset",type:Number})],r.prototype,"dockOffset",void 0),n([o({attribute:"drawer-target",type:String})],r.prototype,"drawerTarget",void 0),n([o({attribute:"full-bleed-content",type:Boolean,reflect:!0})],r.prototype,"fullBleedContent",void 0),r=n([x("esp-header")],r);export{r as EspalierHeader};
