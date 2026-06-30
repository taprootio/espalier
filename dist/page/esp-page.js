var n=function(s,e,i,o){var r=arguments.length,t=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,i):o,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(s,e,i,o);else for(var d=s.length-1;d>=0;d--)(p=s[d])&&(t=(r<3?p(t):r>3?p(e,i,t):p(e,i))||t);return r>3&&t&&Object.defineProperty(e,i,t),t};import{css as c,html as f}from"lit";import{customElement as m,property as l}from"lit/decorators.js";import{classMap as u}from"lit/directives/class-map.js";import{createRef as v,ref as x}from"lit/directives/ref.js";import{EspalierElementBase as g}from"../shared/esp-element-base.js";import{BiDirectionalStickyController as h}from"./bi-directional-sticky-controller.js";import{getEspBus as y}from"../shared/bus-events.js";import"../toaster/esp-toaster.js";let a=class extends g{constructor(){super(),this.dialogZone=v(),this.kind="wide",this.headerPosition="normal",this.fixedMenus=!1,new h(this,".esp-page-left > .sticky-wrapper"),new h(this,".esp-page-right > .sticky-wrapper")}AddDialog(e){this.dialogZone.value?.appendChild(e)}updated(e){super.updated(e),(e.has("fixedMenus")||e.has("headerPosition"))&&y().publish("fixed-menus-changed",{fixed:this.fixedMenus||this.headerPosition==="fixed"})}render(){const e=this.fixedMenus||this.headerPosition==="fixed",i=!e&&this.headerPosition==="sticky";return f`
      <div part="wrapper" class="esp-page ${u({"fixed-menus":e,"fixed-header":e,"sticky-header":i})}">
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
        <div id="dialog-drop-zone" ${x(this.dialogZone)}></div>
        <esp-toaster></esp-toaster>
      </div>
    `}};a.styles=[...g.styles,c`
      :host {
        --_esp-page-resolved-max-width: var(--esp-page-max-width, 1536px);
        --_esp-page-fixed-header-offset: var(
          --esp-page-fixed-header-offset,
          var(--esp-header-height, calc(4.5 * var(--esp-size-small)))
        );

        display: block;
      }

      :host([kind="narrow"]) {
        --_esp-page-resolved-max-width: var(--esp-page-max-width, 768px);
      }

      :host([kind="full"]) {
        --_esp-page-resolved-max-width: var(--esp-page-max-width, none);
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
        display: grid;
        grid-template-columns:
          [full-start left-start] min-content
          [left-end main-start] 1fr
          [main-end right-start] min-content
          [right-end full-end];
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
          max-width: var(--_esp-page-resolved-max-width);
          contain: inline-size;
        }

        > aside.esp-page-right {
          grid-column: right;
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
          > aside.esp-page-right {
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
    `],n([l({reflect:!0})],a.prototype,"kind",void 0),n([l({attribute:"header-position",reflect:!0})],a.prototype,"headerPosition",void 0),n([l({attribute:"fixed-menus",type:Boolean,reflect:!0})],a.prototype,"fixedMenus",void 0),a=n([m("esp-page")],a);export{a as EspalierPage};
