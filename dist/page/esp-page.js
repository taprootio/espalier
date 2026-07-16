var d=function(h,e,s,o){var n=arguments.length,a=n<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,s):o,t;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(h,e,s,o);else for(var r=h.length-1;r>=0;r--)(t=h[r])&&(a=(n<3?t(a):n>3?t(e,s,a):t(e,s))||a);return n>3&&a&&Object.defineProperty(e,s,a),a};import{css as f,html as m}from"lit";import{customElement as v,property as l}from"lit/decorators.js";import{classMap as y}from"lit/directives/class-map.js";import{createRef as c,ref as u}from"lit/directives/ref.js";import{EspalierElementBase as g}from"../shared/esp-element-base.js";import{BiDirectionalStickyController as p}from"./bi-directional-sticky-controller.js";import{getEspBus as w}from"../shared/bus-events.js";import"../toaster/esp-toaster.js";let i=class extends g{constructor(){super(),this.dialogZone=c(),this.flyoutSlot=c(),this.kind="wide",this.align="start",this.contained=!1,this.headerPosition="normal",this.fixedMenus=!1,new p(this,".esp-page-left > .sticky-wrapper"),new p(this,".esp-page-right > .sticky-wrapper"),new p(this,".esp-page-flyout > .sticky-wrapper"),this.addEventListener("flyout-state-changed",e=>this.syncFlyoutState(e))}syncFlyoutState(e){if(e&&e.target?.closest?.("esp-page")!==this)return;const s=t=>{const r=t.mode;return(typeof r=="string"?r:t.getAttribute("mode"))==="overlay"},o=t=>{const r=t.open;return typeof r=="boolean"?r:t.hasAttribute("open")},n=t=>t.anchor!=null,a=(this.flyoutSlot.value?.assignedElements()??[]).filter(t=>t.tagName==="ESP-FLYOUT");this.toggleAttribute("flyout-open",a.some(t=>o(t)&&!s(t))),this.toggleAttribute("flyout-overlay-open",a.some(t=>o(t)&&s(t))),this.toggleAttribute("flyout-anchored",a.some(t=>o(t)&&n(t)))}AddDialog(e){this.dialogZone.value?.appendChild(e)}firstUpdated(e){super.firstUpdated(e),this.syncFlyoutState()}updated(e){super.updated(e),(e.has("fixedMenus")||e.has("headerPosition"))&&w().publish("fixed-menus-changed",{fixed:this.fixedMenus||this.headerPosition==="fixed"})}render(){const e=this.fixedMenus||this.headerPosition==="fixed",s=!e&&this.headerPosition==="sticky";return m`
      <div part="wrapper" class="esp-page ${y({"fixed-menus":e,"fixed-header":e,"sticky-header":s})}">
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
              ${u(this.flyoutSlot)}
              @slotchange=${()=>this.syncFlyoutState()}
            ></slot>
          </div>
        </div>
        <footer>
          <slot name="footer"></slot>
        </footer>
        <div id="dialog-drop-zone" ${u(this.dialogZone)}></div>
        <esp-toaster></esp-toaster>
      </div>
    `}};i.styles=[...g.styles,f`
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

      
      :host([contained]) .esp-page > div.esp-page-top,
      :host([contained]) .esp-page > footer {
        grid-column: surface;
      }

      
      :host([contained]) slot[name="header"]::slotted(esp-header) {
        --esp-header-content-max-width: 100%;
        --esp-header-shadow: none;
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

        > footer {
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
    `],d([l({reflect:!0})],i.prototype,"kind",void 0),d([l({reflect:!0})],i.prototype,"align",void 0),d([l({type:Boolean,reflect:!0})],i.prototype,"contained",void 0),d([l({attribute:"header-position",reflect:!0})],i.prototype,"headerPosition",void 0),d([l({attribute:"fixed-menus",type:Boolean,reflect:!0})],i.prototype,"fixedMenus",void 0),i=d([v("esp-page")],i);export{i as EspalierPage};
