var l=function(u,e,t,s){var o=arguments.length,r=o<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,t):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(u,e,t,s);else for(var i=u.length-1;i>=0;i--)(n=u[i])&&(r=(o<3?n(r):o>3?n(e,t,r):n(e,t))||r);return o>3&&r&&Object.defineProperty(e,t,r),r};import{css as p,html as w,nothing as O}from"lit";import{customElement as S,property as h}from"lit/decorators.js";import{classMap as F}from"lit/directives/class-map.js";import{createRef as L,ref as G}from"lit/directives/ref.js";import{EspalierElementBase as A}from"../shared/esp-element-base.js";import{ESP_EVENTS as f}from"../shared/events.js";import{getEspBus as y}from"../shared/bus-events.js";import{FLYOUT_FULL_HEIGHT_REQUEST_EVENT as k,markFlyoutRequestServiced as M}from"../shared/flyout-events.js";import{OverlayController as H}from"../shared/overlay-controller.js";import{cancelSVG as q}from"../shared/svgs/cancel.js";import{traverseToClosest as v}from"../shared/utilities.js";import{RafThrottle as B}from"../shared/raf-throttle.js";const $="(max-width: 50em)",V="Flyout",R=p`
  position: fixed;
  inset: 0;
  margin-block-start: 0;
  width: auto;
  
  height: 100vh;
  height: 100dvh;
  z-index: var(--esp-flyout-z-index, 3000);
`,x=p`
  display: block;
  position: absolute;
  inset: 0;
  background-color: var(--esp-vellum-background, var(--esp-color-layer-3));
  opacity: var(--esp-vellum-opacity, 0.85);
`,E=p`
  position: absolute;
  inset-block: 0;
  inset-inline-end: 0;
  block-size: auto;
  max-block-size: none;
  width: min(var(--esp-page-flyout-width, var(--esp-page-flyout-max-width, 30rem)), 85vw);
  overflow-y: auto;
  
  border-start-end-radius: 0;
  border-end-end-radius: 0;
  box-shadow: var(--esp-flyout-shadow, -0.75rem 0 1.5rem -0.75rem var(--esp-color-shadow));
  translate: 0 0;
  transition: translate 0.25s ease;

  @starting-style {
    translate: 100% 0;
  }
`;let a=class extends A{constructor(){super(...arguments),this.open=!1,this.heading="",this.mode="auto",this.pageOverlayRequested=!1,this.fullHeight=!1,this.matchSurface=!1,this.standalone=!1,this.scope="outermost",this.lastGeneratedAriaLabel=null,this.boundKeydown=e=>this.handleKeydown(e),this.boundShowRequest=e=>this.handleShowRequest(e),this.boundCloseRequest=()=>this.close(),this.boundOverlayMediaChange=()=>{this.syncOverlayModal(),this.syncAnchorTracking(),this.syncAnchorGeometry(),this.dispatchEvent(new CustomEvent(f.FLYOUT_STATE_CHANGED,{detail:{},bubbles:!0,composed:!0}))},this.boundAnchorViewportChange=()=>this.scheduleAnchorGeometrySync(),this.boundFullHeightRequest=e=>{e.stopPropagation(),this.fullHeight=!0},this.anchorGeometryFrame=new B(()=>this.syncAnchorGeometry()),this.trackingAnchorPosition=!1,this.busSubscribed=!1,this.panelRef=L(),this.overlay=new H({host:this,getFocusTrapContainer:()=>this.panelRef.value??null,getFocusFallback:()=>this.panelRef.value??null,promote:!1}),this.overlayActive=!1,this.baseRole="complementary"}get effectiveOverlay(){return this.mode==="overlay"||this.pageOverlayRequested||(this.overlayMediaQuery?.matches??!1)}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","complementary"),this.baseRole=this.getAttribute("role")??"complementary",!this.overlayMediaQuery&&typeof window<"u"&&"matchMedia"in window&&(this.overlayMediaQuery=window.matchMedia($)),this.overlayMediaQuery?.addEventListener("change",this.boundOverlayMediaChange),this.syncBusSubscription(),document.addEventListener("keydown",this.boundKeydown),this.addEventListener(k,this.boundFullHeightRequest),this.syncOverlayModal(),this.syncAnchorTracking(),this.syncAnchorGeometry()}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeBus(),this.overlayMediaQuery?.removeEventListener("change",this.boundOverlayMediaChange),document.removeEventListener("keydown",this.boundKeydown),this.removeEventListener(k,this.boundFullHeightRequest),this.stopAnchorTracking(),this.overlayActive&&(this.overlayActive=!1,this.setAttribute("role",this.baseRole),this.removeAttribute("aria-modal"),this.updateGeneratedAriaLabel()),this.overlayReturnFocusTo=void 0}syncBusSubscription(){if(this.standalone||!this.isConnected){this.unsubscribeBus();return}this.busSubscribed||(y().subscribe("show-flyout",this.boundShowRequest),y().subscribe("close-flyout",this.boundCloseRequest),this.busSubscribed=!0)}unsubscribeBus(){this.busSubscribed&&(y().unsubscribe("show-flyout",this.boundShowRequest),y().unsubscribe("close-flyout",this.boundCloseRequest),this.busSubscribed=!1)}show(){this.open||(this.open=!0,this.dispatchEvent(new CustomEvent(f.FLYOUT_OPENED,{detail:{},bubbles:!0,composed:!0})))}close(e="programmatic"){if(this.open){if(this.open=!1,this.overlayActive)this.overlayReturnFocusTo=this.returnFocusTo;else{const t=this.focusIsInside();this.overlay.close(),t&&this.returnFocusTo?.focus()}this.returnFocusTo=void 0,this.dispatchEvent(new CustomEvent(f.FLYOUT_CLOSED,{detail:{reason:e},bubbles:!0,composed:!0}))}}toggle(){this.open?this.close():this.show()}handleShowRequest(e){this.shouldHandleShowRequest(e)&&(M(e),e.heading!==void 0&&(this.heading=e.heading),e.content!==void 0&&this.replaceChildren(typeof e.content=="string"?document.createTextNode(e.content):e.content),this.anchor=e.anchor,this.fullHeight=e.fullHeight??!1,this.returnFocusTo=e.returnFocusTo,this.show())}shouldHandleShowRequest(e){const t=v(this,"esp-page"),s=e.anchor??e.returnFocusTo;if(!s){if(!t)return!0;const i=this.getPageChain(t);return this.scope==="outermost"&&i[i.length-1]===t}const o=this.getPageChain(s);if(o.length===0)return t===null;const r=o.find(i=>this.hasNearestScopeFlyout(i)),n=r??o[o.length-1];return t!==n?!1:r?this.scope==="nearest":this.scope==="outermost"}getPageChain(e){const t=[];let s=e;for(;s;){const o=v(s,"esp-page");if(!o||t.includes(o))break;t.push(o),s=this.composedParent(o)}return t}hasNearestScopeFlyout(e){return Array.from(e.querySelectorAll("esp-flyout")).some(t=>!t.standalone&&t.scope==="nearest"&&v(t,"esp-page")===e)}handleKeydown(e){if(this.open){if(this.overlayActive&&e.key==="Tab"){this.overlay.trapFocus(e);return}e.key!=="Escape"||e.defaultPrevented||(e.preventDefault(),this.close("escape"))}}focusIsInside(){const e=document.activeElement;return e&&this.contains(e)?!0:this.shadowRoot?.activeElement!=null}updated(e){super.updated(e),e.has("standalone")&&this.syncBusSubscription(),e.has("heading")&&this.updateGeneratedAriaLabel(),(e.has("anchor")||e.has("fullHeight")||e.has("open")||e.has("mode")||e.has("pageOverlayRequested"))&&(this.syncAnchorTracking(),this.syncAnchorGeometry()),(e.has("open")||e.has("mode")||e.has("pageOverlayRequested"))&&this.syncOverlayModal(),(e.has("open")||e.has("mode")||e.has("anchor")||e.has("fullHeight")||e.has("pageOverlayRequested"))&&this.dispatchEvent(new CustomEvent(f.FLYOUT_STATE_CHANGED,{detail:{},bubbles:!0,composed:!0}))}syncAnchorGeometry(){const e=v(this,"esp-page"),t=this.anchor?this.getPageChain(this.anchor):[],s=e?.shadowRoot?.querySelector(".esp-page-main"),o=this.panelRef.value;if(!this.open||this.effectiveOverlay||!o){this.clearAnchorGeometry();return}const r=this.getVisibleBlockBounds(),n=Math.max(0,r.bottom-r.top);if(this.setGeometryProperty("--_esp-flyout-max-block-size",`${n}px`),this.fullHeight){this.clearAnchorPlacementGeometry();return}if(!this.anchor||!e||!t.includes(e)||!s){this.clearAnchorGeometry();return}const i=this.anchor.getBoundingClientRect(),d=Math.max(0,i.top-s.getBoundingClientRect().top),c=Number.isFinite(i.height)?i.height:0;this.setGeometryProperty("--_esp-flyout-anchor-offset",`${d}px`),this.setGeometryProperty("--_esp-flyout-anchor-block-size",`${c}px`);const m=o.getBoundingClientRect().height||n,T=Math.max(0,i.top+m-r.bottom),C=Math.max(0,m-c),g=Math.min(T,C);this.setGeometryProperty("--_esp-flyout-viewport-shift",`${g}px`);const z=i.top-g,b=8,_=i.top+c/2,P=Math.min(Math.max(b,m-b),Math.max(b,_-z));this.setGeometryProperty("--_esp-flyout-anchor-marker-offset",`${P}px`)}getVisibleBlockBounds(){const e=window.visualViewport;let t=e?.offsetTop??0,s=t+(e?.height??window.innerHeight);for(let o=this.composedParent(this);o;o=this.composedParent(o)){const r=getComputedStyle(o).overflowY;if(r!=="auto"&&r!=="scroll")continue;const n=o.getBoundingClientRect(),i=o instanceof HTMLElement?o.clientTop:0,d=o instanceof HTMLElement?o.clientHeight:n.height;if(d<=0)continue;const c=n.top+i;t=Math.max(t,c),s=Math.min(s,c+d)}return{top:t,bottom:Math.max(t,s)}}composedParent(e){if(e.parentElement)return e.parentElement;const t=e.getRootNode();return t instanceof ShadowRoot?t.host:null}setGeometryProperty(e,t){this.style.getPropertyValue(e)!==t&&this.style.setProperty(e,t)}clearAnchorGeometry(){this.clearAnchorPlacementGeometry(),this.style.removeProperty("--_esp-flyout-max-block-size")}clearAnchorPlacementGeometry(){this.style.removeProperty("--_esp-flyout-anchor-offset"),this.style.removeProperty("--_esp-flyout-viewport-shift"),this.style.removeProperty("--_esp-flyout-anchor-block-size"),this.style.removeProperty("--_esp-flyout-anchor-marker-offset")}scheduleAnchorGeometrySync(){this.isConnected&&this.anchorGeometryFrame.schedule()}syncAnchorTracking(){if(!(this.isConnected&&this.open&&(!!this.anchor||this.fullHeight)&&!this.effectiveOverlay)){this.stopAnchorTracking();return}this.trackingAnchorPosition||(this.trackingAnchorPosition=!0,window.addEventListener("scroll",this.boundAnchorViewportChange,{capture:!0,passive:!0}),window.addEventListener("resize",this.boundAnchorViewportChange,{passive:!0}));const t=this.panelRef.value;t&&t!==this.observedAnchorPanel&&typeof ResizeObserver<"u"&&(this.anchorResizeObserver??=new ResizeObserver(this.boundAnchorViewportChange),this.anchorResizeObserver.disconnect(),this.anchorResizeObserver.observe(t),this.observedAnchorPanel=t)}stopAnchorTracking(){this.trackingAnchorPosition&&(window.removeEventListener("scroll",this.boundAnchorViewportChange,{capture:!0}),window.removeEventListener("resize",this.boundAnchorViewportChange),this.trackingAnchorPosition=!1),this.anchorGeometryFrame.cancel(),this.anchorResizeObserver?.disconnect(),this.observedAnchorPanel=void 0}syncOverlayModal(){const e=this.isConnected&&this.open&&this.effectiveOverlay;if(e===this.overlayActive){!e&&!this.open&&this.overlay.close();return}e?(this.overlayActive=!0,this.setAttribute("role","dialog"),this.setAttribute("aria-modal","true"),this.updateGeneratedAriaLabel(),this.overlay.open(),this.updateComplete.then(()=>{this.overlayActive&&this.overlay.moveFocusInto()})):(this.overlayActive=!1,this.overlay.close(),this.overlayReturnFocusTo&&(this.overlayReturnFocusTo.focus(),this.overlayReturnFocusTo=void 0),this.setAttribute("role",this.baseRole),this.removeAttribute("aria-modal"),this.updateGeneratedAriaLabel())}updateGeneratedAriaLabel(){const e=this.getAttribute("aria-label");if(e!==null&&e!==this.lastGeneratedAriaLabel)return;const t=this.heading||(this.overlayActive?V:"");t?(this.setAttribute("aria-label",t),this.lastGeneratedAriaLabel=t):(this.removeAttribute("aria-label"),this.lastGeneratedAriaLabel=null)}render(){return w`
      <div class="vellum" aria-hidden="true" @click=${()=>this.close("vellum")}></div>
      <div
        class=${F({panel:!0,anchored:!!this.anchor,"full-height":this.fullHeight})}
        part="panel"
        ${G(this.panelRef)}
      >
        <span class="anchor-terminus" aria-hidden="true"></span>
        <header part="header">
          ${this.heading?w`<h2>${this.heading}</h2>`:O}
          
          <button class="close" aria-label="Close" @click=${()=>this.close("button")}>
            ${q}
          </button>
        </header>
        <div class="content" part="content">
          <slot @slotchange=${this.boundAnchorViewportChange}></slot>
        </div>
      </div>
    `}};a.styles=[...A.styles,p`
      :host {
        display: none;
      }

      :host([open]) {
        display: block;
        
        width: var(
          --_esp-flyout-used-width,
          var(--esp-page-flyout-width, var(--esp-page-flyout-min-width, 20rem))
        );
        margin-block-start: calc(
          var(--_esp-flyout-anchor-offset, 0px) - var(--_esp-flyout-viewport-shift, 0px)
        );
      }

      .vellum {
        display: none;
      }

      .panel {
        background: var(--esp-flyout-background, var(--esp-color-background));
        
        width: var(
          --_esp-flyout-used-width,
          var(--esp-page-flyout-width, var(--esp-page-flyout-min-width, 20rem))
        );
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: visible;
        
        border-inline-start: var(--esp-flyout-border, 1px dotted var(--esp-color-border));
        border-start-end-radius: var(--esp-flyout-radius, var(--esp-size-border-radius));
        border-end-end-radius: var(--esp-flyout-radius, var(--esp-size-border-radius));
        box-shadow: var(--esp-flyout-shadow, none);
        font-family: var(--esp-font-body);
        color: var(--esp-color-text);

        &.anchored {
          max-block-size: var(--_esp-flyout-max-block-size, 100dvh);

          &:not(.full-height) {
            min-block-size: min(
              var(--_esp-flyout-anchor-block-size, 0px),
              var(--_esp-flyout-max-block-size, 100dvh)
            );
          }

          &.full-height {
            block-size: var(--_esp-flyout-max-block-size, 100dvh);

            &::before,
            &::after,
            > .anchor-terminus {
              display: none;
            }
          }

          > .anchor-terminus {
            display: var(--_esp-flyout-preview-anchor-display, none);
            position: absolute;
            z-index: 2;
            inset-block-start: var(--_esp-flyout-anchor-marker-offset, 50%);
            inset-inline-start: -2px;
            inline-size: 4px;
            block-size: var(--esp-size-medium);
            translate: 0 -50%;
            background: var(--esp-color-border);
            pointer-events: none;
          }

          &::before {
            content: "";
            position: absolute;
            z-index: 1;
            inset-block-start: var(--_esp-flyout-anchor-marker-offset, 50%);
            inset-inline-start: calc(
              -1 * (var(--esp-size-small) + var(--_esp-flyout-preview-bridge-width, 0px))
            );
            inline-size: var(--esp-size-small);
            block-size: var(--esp-size-medium);
            translate: 0 -50%;
            clip-path: polygon(0 50%, 100% 0, 100% 100%);
            background: var(--esp-color-border);
            pointer-events: none;
          }

          
          &::after {
            content: "";
            position: absolute;
            z-index: 1;
            inset-block-start: var(--_esp-flyout-anchor-marker-offset, 50%);
            inset-inline-start: calc(-1 * var(--_esp-flyout-preview-bridge-width, 0px));
            inline-size: var(--_esp-flyout-preview-bridge-width, 0px);
            border-block-start: 2px dotted var(--esp-color-border);
            opacity: 0.4;
            translate: 0 -50%;
            pointer-events: none;
          }
        }

        > .anchor-terminus {
          display: none;
        }

        > header {
          display: flex;
          align-items: center;
          gap: var(--esp-size-tiny-to-small);
          padding: var(--esp-flyout-padding, var(--esp-size-padding));
          padding-block-end: 0;

          > h2 {
            flex: 1;
            margin: 0;
            font-size: var(--esp-type-large);
            line-height: 1.2;
          }

          > .close {
            margin-inline-start: auto;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border: none;
            background: transparent;
            color: var(--esp-color-text);
            cursor: pointer;
            padding: var(--esp-size-tiny);

            svg {
              width: 1.25em;
              height: 1.25em;
            }
          }
        }

        > .content {
          flex: 1;
          min-block-size: 0;
          overflow-y: auto;
          
          overscroll-behavior-block: auto;
          padding: var(--esp-flyout-padding, var(--esp-size-padding));
        }
      }

      
      :host([open][mode="overlay"]),
      :host([open][data-page-overlay]) {
        ${R}
      }

      :host([open][mode="overlay"]) .vellum,
      :host([open][data-page-overlay]) .vellum {
        ${x}
      }

      :host([open][mode="overlay"]) .panel,
      :host([open][data-page-overlay]) .panel {
        ${E}
      }

      :host([open][mode="overlay"]) .panel.anchored::before,
      :host([open][mode="overlay"]) .panel.anchored::after,
      :host([open][mode="overlay"]) .panel.anchored > .anchor-terminus,
      :host([open][data-page-overlay]) .panel.anchored::before,
      :host([open][data-page-overlay]) .panel.anchored::after,
      :host([open][data-page-overlay]) .panel.anchored > .anchor-terminus {
        display: none;
      }

      
      @media (max-width: 50em) {
        :host([open]) {
          ${R}
        }

        .vellum {
          ${x}
        }

        .panel {
          ${E}
        }

        .panel.anchored::before,
        .panel.anchored::after,
        .panel.anchored > .anchor-terminus {
          display: none;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .panel {
          transition: none;
        }
      }
    `],l([h({type:Boolean,reflect:!0})],a.prototype,"open",void 0),l([h({type:String})],a.prototype,"heading",void 0),l([h({reflect:!0})],a.prototype,"mode",void 0),l([h({type:Boolean,reflect:!0,attribute:"data-page-overlay"})],a.prototype,"pageOverlayRequested",void 0),l([h({attribute:!1})],a.prototype,"anchor",void 0),l([h({type:Boolean,reflect:!0,attribute:"full-height"})],a.prototype,"fullHeight",void 0),l([h({type:Boolean,reflect:!0,attribute:"match-surface"})],a.prototype,"matchSurface",void 0),l([h({type:Boolean,reflect:!0})],a.prototype,"standalone",void 0),l([h({type:String,reflect:!0})],a.prototype,"scope",void 0),a=l([S("esp-flyout")],a);export{a as EspalierFlyout};
