var o=function(n,e,s,r){var d=arguments.length,a=d<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,s):r,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(n,e,s,r);else for(var l=n.length-1;l>=0;l--)(p=n[l])&&(a=(d<3?p(a):d>3?p(e,s,a):p(e,s))||a);return d>3&&a&&Object.defineProperty(e,s,a),a};import{css as g,html as f}from"lit";import{customElement as u,property as i}from"lit/decorators.js";import{classMap as m}from"lit/directives/class-map.js";import{createRef as v,ref as w}from"lit/directives/ref.js";import{EspalierElementBase as h}from"../shared/esp-element-base.js";import{BiDirectionalStickyController as c}from"./bi-directional-sticky-controller.js";import{getEspBus as b}from"../shared/bus-events.js";import"../toaster/esp-toaster.js";let t=class extends h{constructor(){super(),this.dialogZone=v(),this.kind="wide",this.align="start",this.contained=!1,this.headerPosition="normal",this.fixedMenus=!1,new c(this,".esp-page-left > .sticky-wrapper"),new c(this,".esp-page-right > .sticky-wrapper")}AddDialog(e){this.dialogZone.value?.appendChild(e)}updated(e){super.updated(e),(e.has("fixedMenus")||e.has("headerPosition"))&&b().publish("fixed-menus-changed",{fixed:this.fixedMenus||this.headerPosition==="fixed"})}render(){const e=this.fixedMenus||this.headerPosition==="fixed",s=!e&&this.headerPosition==="sticky";return f`
      <div part="wrapper" class="esp-page ${m({"fixed-menus":e,"fixed-header":e,"sticky-header":s})}">
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
        <footer>
          <slot name="footer"></slot>
        </footer>
        <div id="dialog-drop-zone" ${w(this.dialogZone)}></div>
        <esp-toaster></esp-toaster>
      </div>
    `}};t.styles=[...h.styles,g`
      :host {
        --_esp-page-resolved-max-width: var(--esp-page-max-width, 1536px);
        
        --_esp-page-main-track: minmax(0, var(--_esp-page-resolved-max-width));
        
        --_esp-page-gutter-left: 0;
        --_esp-page-gutter-right: 1fr;
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
        --_esp-page-gutter-right: 0;
      }

      
      :host([kind="full"]) {
        --_esp-page-resolved-max-width: var(--esp-page-max-width, none);
        --_esp-page-main-track: 1fr;
        --_esp-page-gutter-left: 0;
        --_esp-page-gutter-right: 0;
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
          [right-end surface-end canvas-right-start] var(--_esp-page-gutter-right)
          [canvas-right-end full-end];
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
          
          contain: inline-size;
        }

        > aside.esp-page-right {
          grid-column: right;
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
          box-shadow: var(
            --esp-page-surface-shadow,
            -0.75rem 0 1.5rem -0.75rem var(--esp-color-shadow),
            0.75rem 0 1.5rem -0.75rem var(--esp-color-shadow)
          );
          border-inline: var(--esp-page-surface-border, none);
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
    `],o([i({reflect:!0})],t.prototype,"kind",void 0),o([i({reflect:!0})],t.prototype,"align",void 0),o([i({type:Boolean,reflect:!0})],t.prototype,"contained",void 0),o([i({attribute:"header-position",reflect:!0})],t.prototype,"headerPosition",void 0),o([i({attribute:"fixed-menus",type:Boolean,reflect:!0})],t.prototype,"fixedMenus",void 0),t=o([u("esp-page")],t);export{t as EspalierPage};
