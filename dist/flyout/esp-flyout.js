var h=function(c,e,t,i){var o=arguments.length,s=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(c,e,t,i);else for(var a=c.length-1;a>=0;a--)(n=c[a])&&(s=(o<3?n(s):o>3?n(e,t,s):n(e,t))||s);return o>3&&s&&Object.defineProperty(e,t,s),s};import{css as p,html as y,nothing as R}from"lit";import{customElement as k,property as l}from"lit/decorators.js";import{createRef as x,ref as C}from"lit/directives/ref.js";import{EspalierElementBase as v}from"../shared/esp-element-base.js";import{getEspBus as f}from"../shared/bus-events.js";import{OverlayController as T}from"../shared/overlay-controller.js";import{cancelSVG as E}from"../shared/svgs/cancel.js";import{traverseToClosest as b}from"../shared/utilities.js";const P="(max-width: 50em)",O="Flyout",m=p`
  position: fixed;
  inset: 0;
  margin-block-start: 0;
  width: auto;
  
  height: 100vh;
  height: 100dvh;
  z-index: var(--esp-flyout-z-index, 3000);
`,w=p`
  display: block;
  position: absolute;
  inset: 0;
  background-color: var(--esp-vellum-background, var(--esp-color-layer-3));
  opacity: var(--esp-vellum-opacity, 0.85);
`,g=p`
  position: absolute;
  inset-block: 0;
  inset-inline-end: 0;
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
`;let r=class extends v{constructor(){super(...arguments),this.open=!1,this.heading="",this.mode="auto",this.matchSurface=!1,this.standalone=!1,this.lastGeneratedAriaLabel=null,this.boundKeydown=e=>this.handleKeydown(e),this.boundShowRequest=e=>this.handleShowRequest(e),this.boundCloseRequest=()=>this.close(),this.boundOverlayMediaChange=()=>{this.syncOverlayModal(),this.syncAnchorTracking(),this.syncAnchorGeometry()},this.boundAnchorViewportChange=()=>this.scheduleAnchorGeometrySync(),this.anchorPositionRaf=0,this.trackingAnchorPosition=!1,this.busSubscribed=!1,this.panelRef=x(),this.overlay=new T({host:this,getFocusTrapContainer:()=>this.panelRef.value??null,getFocusFallback:()=>this.panelRef.value??null,promote:!1}),this.overlayActive=!1,this.baseRole="complementary"}get effectiveOverlay(){return this.mode==="overlay"||(this.overlayMediaQuery?.matches??!1)}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","complementary"),this.baseRole=this.getAttribute("role")??"complementary",!this.overlayMediaQuery&&typeof window<"u"&&"matchMedia"in window&&(this.overlayMediaQuery=window.matchMedia(P)),this.overlayMediaQuery?.addEventListener("change",this.boundOverlayMediaChange),this.syncBusSubscription(),document.addEventListener("keydown",this.boundKeydown),this.syncOverlayModal(),this.syncAnchorTracking(),this.syncAnchorGeometry()}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeBus(),this.overlayMediaQuery?.removeEventListener("change",this.boundOverlayMediaChange),document.removeEventListener("keydown",this.boundKeydown),this.stopAnchorTracking(),this.overlayActive&&(this.overlayActive=!1,this.setAttribute("role",this.baseRole),this.removeAttribute("aria-modal"),this.updateGeneratedAriaLabel()),this.overlayReturnFocusTo=void 0}syncBusSubscription(){if(this.standalone||!this.isConnected){this.unsubscribeBus();return}this.busSubscribed||(f().subscribe("show-flyout",this.boundShowRequest),f().subscribe("close-flyout",this.boundCloseRequest),this.busSubscribed=!0)}unsubscribeBus(){this.busSubscribed&&(f().unsubscribe("show-flyout",this.boundShowRequest),f().unsubscribe("close-flyout",this.boundCloseRequest),this.busSubscribed=!1)}show(){this.open||(this.open=!0,this.dispatchEvent(new CustomEvent("flyout-opened",{detail:{},bubbles:!0,composed:!0})))}close(e="programmatic"){if(this.open){if(this.open=!1,this.overlayActive)this.overlayReturnFocusTo=this.returnFocusTo;else{const t=this.focusIsInside();this.overlay.close(),t&&this.returnFocusTo?.focus()}this.returnFocusTo=void 0,this.dispatchEvent(new CustomEvent("flyout-closed",{detail:{reason:e},bubbles:!0,composed:!0}))}}toggle(){this.open?this.close():this.show()}handleShowRequest(e){e.heading!==void 0&&(this.heading=e.heading),e.content!==void 0&&this.replaceChildren(typeof e.content=="string"?document.createTextNode(e.content):e.content),this.anchor=e.anchor,this.returnFocusTo=e.returnFocusTo,this.show()}handleKeydown(e){if(this.open){if(this.overlayActive&&e.key==="Tab"){this.overlay.trapFocus(e);return}e.key!=="Escape"||e.defaultPrevented||(e.preventDefault(),this.close("escape"))}}focusIsInside(){const e=document.activeElement;return e&&this.contains(e)?!0:this.shadowRoot?.activeElement!=null}updated(e){super.updated(e),e.has("standalone")&&this.syncBusSubscription(),e.has("heading")&&this.updateGeneratedAriaLabel(),(e.has("anchor")||e.has("open")||e.has("mode"))&&(this.syncAnchorTracking(),this.syncAnchorGeometry()),(e.has("open")||e.has("mode"))&&this.syncOverlayModal(),(e.has("open")||e.has("mode")||e.has("anchor"))&&this.dispatchEvent(new CustomEvent("flyout-state-changed",{detail:{},bubbles:!0,composed:!0}))}syncAnchorGeometry(){const e=b(this,"esp-page"),t=this.anchor?b(this.anchor,"esp-page"):null,i=e?.shadowRoot?.querySelector(".esp-page-main"),o=this.panelRef.value;if(!this.open||this.effectiveOverlay||!this.anchor||!e||t!==e||!i||!o){this.clearAnchorGeometry();return}const s=this.anchor.getBoundingClientRect(),n=Math.max(0,s.top-i.getBoundingClientRect().top),a=this.getVisibleBlockBounds(),d=Math.max(0,a.bottom-a.top);this.setGeometryProperty("--_esp-flyout-anchor-offset",`${n}px`),this.setGeometryProperty("--_esp-flyout-max-block-size",`${d}px`);const u=o.getBoundingClientRect().height,A=Math.max(0,s.top+u-a.bottom);this.setGeometryProperty("--_esp-flyout-viewport-shift",`${A}px`)}getVisibleBlockBounds(){const e=window.visualViewport;let t=e?.offsetTop??0,i=t+(e?.height??window.innerHeight);for(let o=this.composedParent(this);o;o=this.composedParent(o)){const s=getComputedStyle(o).overflowY;if(s!=="auto"&&s!=="scroll")continue;const n=o.getBoundingClientRect(),a=o instanceof HTMLElement?o.clientTop:0,d=o instanceof HTMLElement?o.clientHeight:n.height;if(d<=0)continue;const u=n.top+a;t=Math.max(t,u),i=Math.min(i,u+d)}return{top:t,bottom:Math.max(t,i)}}composedParent(e){if(e.parentElement)return e.parentElement;const t=e.getRootNode();return t instanceof ShadowRoot?t.host:null}setGeometryProperty(e,t){this.style.getPropertyValue(e)!==t&&this.style.setProperty(e,t)}clearAnchorGeometry(){this.style.removeProperty("--_esp-flyout-anchor-offset"),this.style.removeProperty("--_esp-flyout-viewport-shift"),this.style.removeProperty("--_esp-flyout-max-block-size")}scheduleAnchorGeometrySync(){!this.isConnected||this.anchorPositionRaf||(this.anchorPositionRaf=requestAnimationFrame(()=>{this.anchorPositionRaf=0,this.syncAnchorGeometry()}))}syncAnchorTracking(){if(!(this.isConnected&&this.open&&!!this.anchor&&!this.effectiveOverlay)){this.stopAnchorTracking();return}this.trackingAnchorPosition||(this.trackingAnchorPosition=!0,window.addEventListener("scroll",this.boundAnchorViewportChange,{capture:!0,passive:!0}),window.addEventListener("resize",this.boundAnchorViewportChange,{passive:!0}));const t=this.panelRef.value;t&&t!==this.observedAnchorPanel&&typeof ResizeObserver<"u"&&(this.anchorResizeObserver??=new ResizeObserver(this.boundAnchorViewportChange),this.anchorResizeObserver.disconnect(),this.anchorResizeObserver.observe(t),this.observedAnchorPanel=t)}stopAnchorTracking(){this.trackingAnchorPosition&&(window.removeEventListener("scroll",this.boundAnchorViewportChange,{capture:!0}),window.removeEventListener("resize",this.boundAnchorViewportChange),this.trackingAnchorPosition=!1),this.anchorPositionRaf&&(cancelAnimationFrame(this.anchorPositionRaf),this.anchorPositionRaf=0),this.anchorResizeObserver?.disconnect(),this.observedAnchorPanel=void 0}syncOverlayModal(){const e=this.isConnected&&this.open&&this.effectiveOverlay;if(e===this.overlayActive){!e&&!this.open&&this.overlay.close();return}e?(this.overlayActive=!0,this.setAttribute("role","dialog"),this.setAttribute("aria-modal","true"),this.updateGeneratedAriaLabel(),this.overlay.open(),this.updateComplete.then(()=>{this.overlayActive&&this.overlay.moveFocusInto()})):(this.overlayActive=!1,this.overlay.close(),this.overlayReturnFocusTo&&(this.overlayReturnFocusTo.focus(),this.overlayReturnFocusTo=void 0),this.setAttribute("role",this.baseRole),this.removeAttribute("aria-modal"),this.updateGeneratedAriaLabel())}updateGeneratedAriaLabel(){const e=this.getAttribute("aria-label");if(e!==null&&e!==this.lastGeneratedAriaLabel)return;const t=this.heading||(this.overlayActive?O:"");t?(this.setAttribute("aria-label",t),this.lastGeneratedAriaLabel=t):(this.removeAttribute("aria-label"),this.lastGeneratedAriaLabel=null)}render(){return y`
      <div class="vellum" aria-hidden="true" @click=${()=>this.close("vellum")}></div>
      <div class="panel" part="panel" ${C(this.panelRef)}>
        <header part="header">
          ${this.heading?y`<h2>${this.heading}</h2>`:R}
          
          <button class="close" aria-label="Close" @click=${()=>this.close("button")}>
            ${E}
          </button>
        </header>
        <div class="content" part="content">
          <slot @slotchange=${this.boundAnchorViewportChange}></slot>
        </div>
      </div>
    `}};r.styles=[...v.styles,p`
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
        max-block-size: var(--_esp-flyout-max-block-size, none);
        overflow: hidden;
        
        border-inline-start: var(--esp-flyout-border, 1px dotted var(--esp-color-border));
        border-start-end-radius: var(--esp-flyout-radius, var(--esp-size-border-radius));
        border-end-end-radius: var(--esp-flyout-radius, var(--esp-size-border-radius));
        box-shadow: var(--esp-flyout-shadow, none);
        font-family: var(--esp-font-body);
        color: var(--esp-color-text);

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
          min-block-size: 0;
          overflow-y: auto;
          overscroll-behavior-block: contain;
          padding: var(--esp-flyout-padding, var(--esp-size-padding));
        }
      }

      
      :host([open][mode="overlay"]) {
        ${m}
      }

      :host([open][mode="overlay"]) .vellum {
        ${w}
      }

      :host([open][mode="overlay"]) .panel {
        ${g}
      }

      
      @media (max-width: 50em) {
        :host([open]) {
          ${m}
        }

        .vellum {
          ${w}
        }

        .panel {
          ${g}
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .panel {
          transition: none;
        }
      }
    `],h([l({type:Boolean,reflect:!0})],r.prototype,"open",void 0),h([l({type:String})],r.prototype,"heading",void 0),h([l({reflect:!0})],r.prototype,"mode",void 0),h([l({attribute:!1})],r.prototype,"anchor",void 0),h([l({type:Boolean,reflect:!0,attribute:"match-surface"})],r.prototype,"matchSurface",void 0),h([l({type:Boolean,reflect:!0})],r.prototype,"standalone",void 0),r=h([k("esp-flyout")],r);export{r as EspalierFlyout};
