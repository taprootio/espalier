var i=function(h,e,a,s){var d=arguments.length,o=d<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,a):s,t;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(h,e,a,s);else for(var n=h.length-1;n>=0;n--)(t=h[n])&&(o=(d<3?t(o):d>3?t(e,a,o):t(e,a))||o);return d>3&&o&&Object.defineProperty(e,a,o),o};import{css as m,html as v,nothing as y}from"lit";import{customElement as w,property as l,state as b}from"lit/decorators.js";import{classMap as k}from"lit/directives/class-map.js";import{createRef as p,ref as c}from"lit/directives/ref.js";import{EspalierElementBase as g}from"../shared/esp-element-base.js";import{BiDirectionalStickyController as u}from"./bi-directional-sticky-controller.js";import{getEspBus as x}from"../shared/bus-events.js";import"../toaster/esp-toaster.js";const f='esp-footer, footer, [role~="contentinfo"]';let r=class extends g{constructor(){super(),this.dialogZone=p(),this.flyoutSlot=p(),this.footerSlot=p(),this.footerWrapperIsLandmark=!0,this.kind="wide",this.align="start",this.contained=!1,this.headerPosition="normal",this.fixedMenus=!1,new u(this,".esp-page-left > .sticky-wrapper"),new u(this,".esp-page-right > .sticky-wrapper"),new u(this,".esp-page-flyout > .sticky-wrapper"),this.addEventListener("flyout-state-changed",e=>this.syncFlyoutState(e))}connectedCallback(){const e=Array.from(this.children).filter(a=>a.getAttribute("slot")==="footer");this.footerWrapperIsLandmark=!e.some(a=>this.footerElementProvidesLandmark(a)),super.connectedCallback()}syncFlyoutState(e){if(e&&e.target?.closest?.("esp-page")!==this)return;const a=t=>{const n=t.mode;return(typeof n=="string"?n:t.getAttribute("mode"))==="overlay"},s=t=>{const n=t.open;return typeof n=="boolean"?n:t.hasAttribute("open")},d=t=>t.anchor!=null,o=(this.flyoutSlot.value?.assignedElements()??[]).filter(t=>t.tagName==="ESP-FLYOUT");this.toggleAttribute("flyout-open",o.some(t=>s(t)&&!a(t))),this.toggleAttribute("flyout-overlay-open",o.some(t=>s(t)&&a(t))),this.toggleAttribute("flyout-anchored",o.some(t=>s(t)&&d(t)))}footerElementProvidesLandmark(e){return e.matches(f)||e.querySelector(f)!==null}syncFooterLandmark(){const a=(this.footerSlot.value?.assignedElements({flatten:!0})??[]).some(s=>this.footerElementProvidesLandmark(s));this.footerWrapperIsLandmark=!a}AddDialog(e){this.dialogZone.value?.appendChild(e)}firstUpdated(e){super.firstUpdated(e),this.syncFlyoutState()}updated(e){super.updated(e),(e.has("fixedMenus")||e.has("headerPosition"))&&x().publish("fixed-menus-changed",{fixed:this.fixedMenus||this.headerPosition==="fixed"})}render(){const e=this.fixedMenus||this.headerPosition==="fixed",a=!e&&this.headerPosition==="sticky";return v`
      <div part="wrapper" class="esp-page ${k({"fixed-menus":e,"fixed-header":e,"sticky-header":a})}">
        <div part="canvas" class="esp-page-canvas esp-page-canvas--left" aria-hidden="true"></div>
        <div part="canvas" class="esp-page-canvas esp-page-canvas--right" aria-hidden="true"></div>
        <div part="surface" class="esp-page-surface" aria-hidden="true"></div>
        <div class="esp-page-top">
          <slot name="header"></slot>
        </div>
        <aside class="esp-page-left">
          <div class="sticky-wrapper">
            <slot name="sidebar"></slot>
          </div>
        </aside>
        <div class="esp-page-main">
          <slot></slot>
        </div>
        <aside class="esp-page-right">
          <div class="sticky-wrapper">
            <slot name="right"></slot>
          </div>
        </aside>
        <div class="esp-page-flyout">
          <div class="sticky-wrapper">
            <slot
              name="flyout"
              ${c(this.flyoutSlot)}
              @slotchange=${()=>this.syncFlyoutState()}
            ></slot>
          </div>
        </div>
        <div class="esp-page-footer" role=${this.footerWrapperIsLandmark?"contentinfo":y}>
          <slot name="footer" ${c(this.footerSlot)} @slotchange=${this.syncFooterLandmark}></slot>
        </div>
        <div id="dialog-drop-zone" ${c(this.dialogZone)}></div>
        <esp-toaster></esp-toaster>
      </div>
    `}};r.styles=[...g.styles,m`
      :host {
        --_esp-page-resolved-max-width: var(--esp-page-max-width, 1536px);
        
        --_esp-page-main-track: minmax(0, var(--_esp-page-resolved-max-width));
        
        --_esp-page-gutter-left: 0fr;
        --_esp-page-gutter-right: 1fr;
        
        --_esp-page-flyout-min: 0px;
        
        --_esp-page-surface-edge-shadow: 0.75rem 0 1.5rem -0.75rem var(--esp-color-shadow);
        
        --_esp-page-surface-shadow: var(
          --esp-page-surface-shadow,
          -0.75rem 0 1.5rem -0.75rem var(--esp-color-shadow),
          var(--_esp-page-surface-edge-shadow)
        );
        --_esp-page-surface-border: var(--esp-page-surface-border, none);
        --_esp-page-fixed-header-offset: var(
          --esp-page-fixed-header-offset,
          var(--esp-header-height, calc(4.5 * var(--esp-size-small)))
        );

        display: block;
      }

      :host([kind="narrow"]) {
        --_esp-page-resolved-max-width: var(--esp-page-max-width, 768px);
      }

      :host([align="center"]) {
        --_esp-page-gutter-left: 1fr;
        --_esp-page-gutter-right: 1fr;
      }

      :host([align="end"]) {
        --_esp-page-gutter-left: 1fr;
        --_esp-page-gutter-right: 0fr;
      }

      
      :host([kind="full"]) {
        --_esp-page-resolved-max-width: var(--esp-page-max-width, none);
        --_esp-page-main-track: 1fr;
        --_esp-page-gutter-left: 0fr;
        --_esp-page-gutter-right: 0fr;
      }

      
      :host([flyout-open]) {
        --_esp-page-flyout-min: var(--esp-page-flyout-width, 20rem);
      }

      
      @media (max-width: 50em) {
        :host([flyout-open]) {
          --_esp-page-flyout-min: 0px;
        }
      }

      
      :host([flyout-overlay-open]) .esp-page > div.esp-page-flyout {
        z-index: var(--esp-flyout-z-index, 3000);
      }

      
      :host([flyout-anchored]) .esp-page > div.esp-page-flyout > .sticky-wrapper {
        position: static;
      }

      
      slot[name="flyout"]::slotted(esp-flyout[match-surface]) {
        --esp-flyout-shadow: var(--_esp-page-surface-edge-shadow);
      }

      
      slot[name="header"]::slotted(esp-header) {
        --esp-header-content-max-width: var(--_esp-page-resolved-max-width);
        --esp-header-content-lead: 0;
      }

      :host([align="center"]) slot[name="header"]::slotted(esp-header) {
        --esp-header-content-lead: 0.5;
      }

      :host([align="end"]) slot[name="header"]::slotted(esp-header) {
        --esp-header-content-lead: 1;
      }

      
      :host([kind="full"]) slot[name="header"]::slotted(esp-header) {
        --esp-header-content-max-width: 100%;
      }

      
      slot[name="footer"]::slotted(esp-footer) {
        --esp-footer-content-max-width: var(--_esp-page-resolved-max-width);
        --esp-footer-content-lead: 0;
      }

      :host([align="center"]) slot[name="footer"]::slotted(esp-footer) {
        --esp-footer-content-lead: 0.5;
      }

      :host([align="end"]) slot[name="footer"]::slotted(esp-footer) {
        --esp-footer-content-lead: 1;
      }

      :host([kind="full"]) slot[name="footer"]::slotted(esp-footer) {
        --esp-footer-content-max-width: 100%;
      }

      
      :host([contained]) .esp-page > div.esp-page-top,
      :host([contained]) .esp-page > div.esp-page-footer {
        grid-column: surface;
      }

      
      :host([contained]) slot[name="header"]::slotted(esp-header) {
        --esp-header-content-max-width: 100%;
        --esp-header-shadow: none;
      }

      :host([contained]) slot[name="footer"]::slotted(esp-footer) {
        --esp-footer-content-max-width: 100%;
      }

      :host([kind="narrow"]) .esp-page > div.esp-page-main {
        
        > ::slotted(*) {
          max-inline-size: 66ch;
        }
      }

      #dialog-drop-zone {
        z-index: 4000;
        position: absolute;
      }

      .esp-page {
        
        min-height: 100vh;
        min-height: 100dvh;
        display: grid;
        grid-template-columns:
          [full-start canvas-left-start] var(--_esp-page-gutter-left)
          [canvas-left-end surface-start left-start] min-content
          [left-end main-start] var(--_esp-page-main-track)
          [main-end right-start] min-content
          [right-end surface-end canvas-right-start flyout-start] minmax(
            var(--_esp-page-flyout-min),
            var(--_esp-page-gutter-right)
          )
          [flyout-end canvas-right-end full-end];
        
        transition: grid-template-columns 0.25s ease;
        grid-template-rows:
          [top-start] min-content
          [top-end content-start] 1fr
          [content-end footer-start] min-content
          [footer-end];
        overflow-x: clip;
        background: var(--esp-page-background, var(--esp-color-background));
        line-height: 1.5;
        font-family: var(--esp-font-body);
        font-size: var(--esp-type-normal);
        color: var(--esp-color-text);
        position: relative;

        &:before {
          content: " ";
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          opacity: var(--esp-page-background-image-opacity, 1);
          background-image: var(--esp-page-background-image, none);
          z-index: 1;
        }

        > div.esp-page-top {
          z-index: var(--esp-page-header-z-index, 20);
          grid-column: full;
          grid-row: top;
          position: relative;
          
          contain: inline-size;
        }

        
        aside.esp-page-left,
        aside.esp-page-right {
          z-index: 5;
          grid-row: content;
          position: relative;
          
        }

        > aside.esp-page-left {
          grid-column: left;
        }

        > div.esp-page-main {
          z-index: 5;
          grid-column: main;
          grid-row: content;
          position: relative;
          overflow: hidden;
          
          background: var(--esp-page-main-background, transparent);
          
          contain: inline-size;
        }

        > aside.esp-page-right {
          grid-column: right;
        }

        
        > div.esp-page-flyout {
          
          grid-column: flyout;
          justify-self: start;
          grid-row: content;
          z-index: 5;
          position: relative;

          
          @media (max-width: 50em) {
            z-index: var(--esp-flyout-z-index, 3000);
          }
        }

        
        > .esp-page-canvas {
          
          grid-row: top-start / footer-end;
          z-index: 1;
          position: relative;
          pointer-events: none;
          background-color: var(--esp-page-canvas-background, transparent);

          
          &::before {
            content: "";
            position: absolute;
            inset: 0;
            background-image: var(--esp-page-canvas-background-image, none);
            opacity: var(--esp-page-canvas-background-image-opacity, 1);
          }
        }

        > .esp-page-canvas--left {
          grid-column: canvas-left;
        }

        > .esp-page-canvas--right {
          
          grid-column: canvas-right;
        }

        
        > .esp-page-surface {
          grid-column: surface;
          
          grid-row: top-start / footer-end;
          z-index: 2;
          pointer-events: none;
          box-shadow: var(--_esp-page-surface-shadow);
          border-inline: var(--_esp-page-surface-border);
        }

        
        .sticky-wrapper {
          will-change: top;
          display: block;
          width: 100%;
          position: sticky;
          top: 0;
        }

        > div.esp-page-footer {
          grid-column: full;
          grid-row: footer;
          z-index: 10;
          background: var(--esp-page-background, var(--esp-color-background));
          
          contain: inline-size;
        }

        &.sticky-header {
          slot[name="header"]::slotted(esp-header),
          slot[name="sidebar"]::slotted(esp-menu),
          slot[name="right"]::slotted(esp-menu) {
            --esp-menu-top-offset: var(--_esp-page-fixed-header-offset);
          }

          > div.esp-page-top {
            position: sticky;
            top: var(--esp-page-sticky-header-top, 0);
          }
        }

        &.fixed-header {
          slot[name="header"]::slotted(esp-header),
          slot[name="sidebar"]::slotted(esp-menu),
          slot[name="right"]::slotted(esp-menu) {
            --esp-menu-top-offset: var(--_esp-page-fixed-header-offset);
          }

          > div.esp-page-top {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
          }

          > div.esp-page-main,
          > aside.esp-page-left,
          > aside.esp-page-right,
          > div.esp-page-flyout,
          > .esp-page-surface,
          > .esp-page-canvas {
            margin-top: var(--_esp-page-fixed-header-offset);
          }
        }

        
        input,
        button,
        textarea,
        select {
          font-family: inherit;
          font-size: inherit;
        }

        
        textarea:not([rows]) {
          min-height: 10em;
        }

        
        :target {
          scroll-margin-block: 5ex;
        }
      }

      .esp-page:has(esp-dialog[is-open="true"]) {
        overflow: hidden;
      }

      @media (prefers-reduced-motion: reduce) {
        .esp-page {
          transition: none;
        }
      }
    `],i([b()],r.prototype,"footerWrapperIsLandmark",void 0),i([l({reflect:!0})],r.prototype,"kind",void 0),i([l({reflect:!0})],r.prototype,"align",void 0),i([l({type:Boolean,reflect:!0})],r.prototype,"contained",void 0),i([l({attribute:"header-position",reflect:!0})],r.prototype,"headerPosition",void 0),i([l({attribute:"fixed-menus",type:Boolean,reflect:!0})],r.prototype,"fixedMenus",void 0),r=i([w("esp-page")],r);export{r as EspalierPage};
