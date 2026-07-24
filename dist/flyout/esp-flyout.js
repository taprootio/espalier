var h=function(d,e,t,i){var o=arguments.length,s=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(d,e,t,i);else for(var r=d.length-1;r>=0;r--)(a=d[r])&&(s=(o<3?a(s):o>3?a(e,t,s):a(e,t))||s);return o>3&&s&&Object.defineProperty(e,t,s),s};import{css as p,html as w,nothing as S}from"lit";import{customElement as F,property as l}from"lit/decorators.js";import{classMap as L}from"lit/directives/class-map.js";import{createRef as M,ref as O}from"lit/directives/ref.js";import{EspalierElementBase as A}from"../shared/esp-element-base.js";import{getEspBus as f}from"../shared/bus-events.js";import{FLYOUT_FULL_HEIGHT_REQUEST_EVENT as k,markFlyoutRequestServiced as _}from"../shared/flyout-events.js";import{OverlayController as G}from"../shared/overlay-controller.js";import{cancelSVG as B}from"../shared/svgs/cancel.js";import{traverseToClosest as y}from"../shared/utilities.js";const H="(max-width: 50em)",q="Flyout",R=p`
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
`,P=p`
  position: absolute;
  inset-block: 0;
  inset-inline-end: 0;
  block-size: auto;
  max-block-size: none;
  width: min(var(--esp-page-flyout-width, 20rem), 85vw);
  overflow-y: auto;
  
  border-start-end-radius: 0;
  border-end-end-radius: 0;
  box-shadow: var(--esp-flyout-shadow, -0.75rem 0 1.5rem -0.75rem var(--esp-color-shadow));
  translate: 0 0;
  transition: translate 0.25s ease;

  @starting-style {
    translate: 100% 0;
  }
`;let n=class extends A{constructor(){super(...arguments),this.open=!1,this.heading="",this.mode="auto",this.fullHeight=!1,this.matchSurface=!1,this.standalone=!1,this.scope="outermost",this.lastGeneratedAriaLabel=null,this.boundKeydown=e=>this.handleKeydown(e),this.boundShowRequest=e=>this.handleShowRequest(e),this.boundCloseRequest=()=>this.close(),this.boundOverlayMediaChange=()=>{this.syncOverlayModal(),this.syncAnchorTracking(),this.syncAnchorGeometry()},this.boundAnchorViewportChange=()=>this.scheduleAnchorGeometrySync(),this.boundFullHeightRequest=e=>{e.stopPropagation(),this.fullHeight=!0},this.anchorPositionRaf=0,this.trackingAnchorPosition=!1,this.busSubscribed=!1,this.panelRef=M(),this.overlay=new G({host:this,getFocusTrapContainer:()=>this.panelRef.value??null,getFocusFallback:()=>this.panelRef.value??null,promote:!1}),this.overlayActive=!1,this.baseRole="complementary"}get effectiveOverlay(){return this.mode==="overlay"||(this.overlayMediaQuery?.matches??!1)}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","complementary"),this.baseRole=this.getAttribute("role")??"complementary",!this.overlayMediaQuery&&typeof window<"u"&&"matchMedia"in window&&(this.overlayMediaQuery=window.matchMedia(H)),this.overlayMediaQuery?.addEventListener("change",this.boundOverlayMediaChange),this.syncBusSubscription(),document.addEventListener("keydown",this.boundKeydown),this.addEventListener(k,this.boundFullHeightRequest),this.syncOverlayModal(),this.syncAnchorTracking(),this.syncAnchorGeometry()}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeBus(),this.overlayMediaQuery?.removeEventListener("change",this.boundOverlayMediaChange),document.removeEventListener("keydown",this.boundKeydown),this.removeEventListener(k,this.boundFullHeightRequest),this.stopAnchorTracking(),this.overlayActive&&(this.overlayActive=!1,this.setAttribute("role",this.baseRole),this.removeAttribute("aria-modal"),this.updateGeneratedAriaLabel()),this.overlayReturnFocusTo=void 0}syncBusSubscription(){if(this.standalone||!this.isConnected){this.unsubscribeBus();return}this.busSubscribed||(f().subscribe("show-flyout",this.boundShowRequest),f().subscribe("close-flyout",this.boundCloseRequest),this.busSubscribed=!0)}unsubscribeBus(){this.busSubscribed&&(f().unsubscribe("show-flyout",this.boundShowRequest),f().unsubscribe("close-flyout",this.boundCloseRequest),this.busSubscribed=!1)}show(){this.open||(this.open=!0,this.dispatchEvent(new CustomEvent("flyout-opened",{detail:{},bubbles:!0,composed:!0})))}close(e="programmatic"){if(this.open){if(this.open=!1,this.overlayActive)this.overlayReturnFocusTo=this.returnFocusTo;else{const t=this.focusIsInside();this.overlay.close(),t&&this.returnFocusTo?.focus()}this.returnFocusTo=void 0,this.dispatchEvent(new CustomEvent("flyout-closed",{detail:{reason:e},bubbles:!0,composed:!0}))}}toggle(){this.open?this.close():this.show()}handleShowRequest(e){this.shouldHandleShowRequest(e)&&(_(e),e.heading!==void 0&&(this.heading=e.heading),e.content!==void 0&&this.replaceChildren(typeof e.content=="string"?document.createTextNode(e.content):e.content),this.anchor=e.anchor,this.fullHeight=e.fullHeight??!1,this.returnFocusTo=e.returnFocusTo,this.show())}shouldHandleShowRequest(e){const t=y(this,"esp-page"),i=e.anchor??e.returnFocusTo;if(!i){if(!t)return!0;const r=this.getPageChain(t);return this.scope==="outermost"&&r[r.length-1]===t}const o=this.getPageChain(i);if(o.length===0)return t===null;const s=o.find(r=>this.hasNearestScopeFlyout(r)),a=s??o[o.length-1];return t!==a?!1:s?this.scope==="nearest":this.scope==="outermost"}getPageChain(e){const t=[];let i=e;for(;i;){const o=y(i,"esp-page");if(!o||t.includes(o))break;t.push(o),i=this.composedParent(o)}return t}hasNearestScopeFlyout(e){return Array.from(e.querySelectorAll("esp-flyout")).some(t=>!t.standalone&&t.scope==="nearest"&&y(t,"esp-page")===e)}handleKeydown(e){if(this.open){if(this.overlayActive&&e.key==="Tab"){this.overlay.trapFocus(e);return}e.key!=="Escape"||e.defaultPrevented||(e.preventDefault(),this.close("escape"))}}focusIsInside(){const e=document.activeElement;return e&&this.contains(e)?!0:this.shadowRoot?.activeElement!=null}updated(e){super.updated(e),e.has("standalone")&&this.syncBusSubscription(),e.has("heading")&&this.updateGeneratedAriaLabel(),(e.has("anchor")||e.has("fullHeight")||e.has("open")||e.has("mode"))&&(this.syncAnchorTracking(),this.syncAnchorGeometry()),(e.has("open")||e.has("mode"))&&this.syncOverlayModal(),(e.has("open")||e.has("mode")||e.has("anchor"))&&this.dispatchEvent(new CustomEvent("flyout-state-changed",{detail:{},bubbles:!0,composed:!0}))}syncAnchorGeometry(){const e=y(this,"esp-page"),t=this.anchor?this.getPageChain(this.anchor):[],i=e?.shadowRoot?.querySelector(".esp-page-main"),o=this.panelRef.value;if(!this.open||this.effectiveOverlay||!this.anchor||!e||!t.includes(e)||!i||!o){this.clearAnchorGeometry();return}const s=this.anchor.getBoundingClientRect(),a=Math.max(0,s.top-i.getBoundingClientRect().top),r=this.getVisibleBlockBounds(),u=Math.max(0,r.bottom-r.top),c=Number.isFinite(s.height)?s.height:0;this.setGeometryProperty("--_esp-flyout-anchor-offset",`${a}px`),this.setGeometryProperty("--_esp-flyout-max-block-size",`${u}px`),this.setGeometryProperty("--_esp-flyout-anchor-block-size",`${c}px`);const v=o.getBoundingClientRect().height||u,b=Math.max(0,s.top+v-r.bottom),C=Math.max(0,v-c),g=this.fullHeight?b:Math.min(b,C);this.setGeometryProperty("--_esp-flyout-viewport-shift",`${g}px`);const z=s.top-g,m=8,E=s.top+c/2,T=Math.min(Math.max(m,v-m),Math.max(m,E-z));this.setGeometryProperty("--_esp-flyout-anchor-marker-offset",`${T}px`)}getVisibleBlockBounds(){const e=window.visualViewport;let t=e?.offsetTop??0,i=t+(e?.height??window.innerHeight);for(let o=this.composedParent(this);o;o=this.composedParent(o)){const s=getComputedStyle(o).overflowY;if(s!=="auto"&&s!=="scroll")continue;const a=o.getBoundingClientRect(),r=o instanceof HTMLElement?o.clientTop:0,u=o instanceof HTMLElement?o.clientHeight:a.height;if(u<=0)continue;const c=a.top+r;t=Math.max(t,c),i=Math.min(i,c+u)}return{top:t,bottom:Math.max(t,i)}}composedParent(e){if(e.parentElement)return e.parentElement;const t=e.getRootNode();return t instanceof ShadowRoot?t.host:null}setGeometryProperty(e,t){this.style.getPropertyValue(e)!==t&&this.style.setProperty(e,t)}clearAnchorGeometry(){this.style.removeProperty("--_esp-flyout-anchor-offset"),this.style.removeProperty("--_esp-flyout-viewport-shift"),this.style.removeProperty("--_esp-flyout-max-block-size"),this.style.removeProperty("--_esp-flyout-anchor-block-size"),this.style.removeProperty("--_esp-flyout-anchor-marker-offset")}scheduleAnchorGeometrySync(){!this.isConnected||this.anchorPositionRaf||(this.anchorPositionRaf=requestAnimationFrame(()=>{this.anchorPositionRaf=0,this.syncAnchorGeometry()}))}syncAnchorTracking(){if(!(this.isConnected&&this.open&&!!this.anchor&&!this.effectiveOverlay)){this.stopAnchorTracking();return}this.trackingAnchorPosition||(this.trackingAnchorPosition=!0,window.addEventListener("scroll",this.boundAnchorViewportChange,{capture:!0,passive:!0}),window.addEventListener("resize",this.boundAnchorViewportChange,{passive:!0}));const t=this.panelRef.value;t&&t!==this.observedAnchorPanel&&typeof ResizeObserver<"u"&&(this.anchorResizeObserver??=new ResizeObserver(this.boundAnchorViewportChange),this.anchorResizeObserver.disconnect(),this.anchorResizeObserver.observe(t),this.observedAnchorPanel=t)}stopAnchorTracking(){this.trackingAnchorPosition&&(window.removeEventListener("scroll",this.boundAnchorViewportChange,{capture:!0}),window.removeEventListener("resize",this.boundAnchorViewportChange),this.trackingAnchorPosition=!1),this.anchorPositionRaf&&(cancelAnimationFrame(this.anchorPositionRaf),this.anchorPositionRaf=0),this.anchorResizeObserver?.disconnect(),this.observedAnchorPanel=void 0}syncOverlayModal(){const e=this.isConnected&&this.open&&this.effectiveOverlay;if(e===this.overlayActive){!e&&!this.open&&this.overlay.close();return}e?(this.overlayActive=!0,this.setAttribute("role","dialog"),this.setAttribute("aria-modal","true"),this.updateGeneratedAriaLabel(),this.overlay.open(),this.updateComplete.then(()=>{this.overlayActive&&this.overlay.moveFocusInto()})):(this.overlayActive=!1,this.overlay.close(),this.overlayReturnFocusTo&&(this.overlayReturnFocusTo.focus(),this.overlayReturnFocusTo=void 0),this.setAttribute("role",this.baseRole),this.removeAttribute("aria-modal"),this.updateGeneratedAriaLabel())}updateGeneratedAriaLabel(){const e=this.getAttribute("aria-label");if(e!==null&&e!==this.lastGeneratedAriaLabel)return;const t=this.heading||(this.overlayActive?q:"");t?(this.setAttribute("aria-label",t),this.lastGeneratedAriaLabel=t):(this.removeAttribute("aria-label"),this.lastGeneratedAriaLabel=null)}render(){return w`
      <div class="vellum" aria-hidden="true" @click=${()=>this.close("vellum")}></div>
      <div
        class=${L({panel:!0,anchored:!!this.anchor,"full-height":this.fullHeight})}
        part="panel"
        ${O(this.panelRef)}
      >
        <header part="header">
          ${this.heading?w`<h2>${this.heading}</h2>`:S}
          
          <button class="close" aria-label="Close" @click=${()=>this.close("button")}>
            ${B}
          </button>
        </header>
        <div class="content" part="content">
          <slot @slotchange=${this.boundAnchorViewportChange}></slot>
        </div>
      </div>
    `}};n.styles=[...A.styles,p`
      :host {
        display: none;
      }

      :host([open]) {
        display: block;
        
        width: var(--esp-page-flyout-width, 20rem);
        margin-block-start: calc(
          var(--_esp-flyout-anchor-offset, 0px) - var(--_esp-flyout-viewport-shift, 0px)
        );
      }

      .vellum {
        display: none;
      }

      .panel {
        background: var(--esp-flyout-background, var(--esp-color-background));
        
        width: var(--esp-page-flyout-width, 20rem);
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

            &::before {
              display: none;
            }
          }

          &::before {
            content: "";
            position: absolute;
            z-index: 1;
            inset-block-start: var(--_esp-flyout-anchor-marker-offset, 50%);
            inset-inline-start: calc(-1 * var(--esp-size-small));
            inline-size: var(--esp-size-small);
            block-size: var(--esp-size-medium);
            translate: 0 -50%;
            clip-path: polygon(0 50%, 100% 0, 100% 100%);
            background: var(--esp-color-border);
            pointer-events: none;
          }
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
          overscroll-behavior-block: contain;
          padding: var(--esp-flyout-padding, var(--esp-size-padding));
        }
      }

      
      :host([open][mode="overlay"]) {
        ${R}
      }

      :host([open][mode="overlay"]) .vellum {
        ${x}
      }

      :host([open][mode="overlay"]) .panel {
        ${P}
      }

      :host([open][mode="overlay"]) .panel.anchored::before {
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
          ${P}
        }

        .panel.anchored::before {
          display: none;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .panel {
          transition: none;
        }
      }
    `],h([l({type:Boolean,reflect:!0})],n.prototype,"open",void 0),h([l({type:String})],n.prototype,"heading",void 0),h([l({reflect:!0})],n.prototype,"mode",void 0),h([l({attribute:!1})],n.prototype,"anchor",void 0),h([l({type:Boolean,reflect:!0,attribute:"full-height"})],n.prototype,"fullHeight",void 0),h([l({type:Boolean,reflect:!0,attribute:"match-surface"})],n.prototype,"matchSurface",void 0),h([l({type:Boolean,reflect:!0})],n.prototype,"standalone",void 0),h([l({type:String,reflect:!0})],n.prototype,"scope",void 0),n=h([F("esp-flyout")],n);export{n as EspalierFlyout};
