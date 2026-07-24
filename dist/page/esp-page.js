var p=function(u,t,e,a){var r=arguments.length,s=r<3?t:a===null?a=Object.getOwnPropertyDescriptor(t,e):a,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(u,t,e,a);else for(var o=u.length-1;o>=0;o--)(i=u[o])&&(s=(r<3?i(s):r>3?i(t,e,s):i(t,e))||s);return r>3&&s&&Object.defineProperty(t,e,s),s};import{css as k,html as x,nothing as S}from"lit";import{customElement as P,property as l,state as C}from"lit/decorators.js";import{classMap as z}from"lit/directives/class-map.js";import{createRef as d,ref as h}from"lit/directives/ref.js";import{EspalierElementBase as f}from"../shared/esp-element-base.js";import{BiDirectionalStickyController as g}from"./bi-directional-sticky-controller.js";import{getEspBus as R}from"../shared/bus-events.js";import"../toaster/esp-toaster.js";const w='esp-footer, footer, [role~="contentinfo"]',_="(max-width: 50em)",c=1;let n=class extends f{constructor(){super(),this.dialogZone=d(),this.flyoutSlot=d(),this.footerSlot=d(),this.previewSlot=d(),this.previewSpace=d(),this.previewWidthProbe=d(),this.previewMainMinProbe=d(),this.previewObservedWidths=new WeakMap,this.previewSyncRaf=null,this.previewSyncGeneration=0,this.previewSyncTask=Promise.resolve(),this.previewHeader=null,this.previewMenu=null,this.previewCollapsedSidebarWidth=0,this.footerWrapperIsLandmark=!0,this.schedulePreviewLayout=()=>{if(!this.isConnected||!this.hasUpdated)return;this.previewSyncGeneration+=1;const t=this.previewSyncGeneration;this.previewSyncRaf!==null&&cancelAnimationFrame(this.previewSyncRaf),this.previewSyncRaf=requestAnimationFrame(()=>{this.previewSyncRaf=null,this.previewSyncTask=this.previewSyncTask.then(()=>this.syncPreviewLayout(t)).catch(()=>{})})},this.onPreviewMediaChange=()=>this.schedulePreviewLayout(),this.onPreviewResize=t=>{t.some(a=>{const r=a.contentRect.width,s=this.previewObservedWidths.get(a.target);return this.previewObservedWidths.set(a.target,r),s===void 0||Math.abs(s-r)>.25})&&this.schedulePreviewLayout()},this.kind="wide",this.align="start",this.contained=!1,this.headerPosition="normal",this.fixedMenus=!1,this.previewOpen=!1,this.previewLabel="Preview",this.previewCollapseSidebar=!1,this.previewVisible=!1,this.previewReclaiming=!1,new g(this,".esp-page-left > .sticky-wrapper"),new g(this,".esp-page-right > .sticky-wrapper"),new g(this,".esp-page-flyout > .sticky-wrapper"),new g(this,".esp-page-preview > .sticky-wrapper"),this.addEventListener("flyout-state-changed",t=>this.syncFlyoutState(t))}connectedCallback(){const t=Array.from(this.children).filter(e=>e.getAttribute("slot")==="footer");this.footerWrapperIsLandmark=!t.some(e=>this.footerElementProvidesLandmark(e)),super.connectedCallback(),this.hasUpdated&&queueMicrotask(()=>this.setupPreviewLayoutObserver())}disconnectedCallback(){this.previewResizeObserver?.disconnect(),this.previewResizeObserver=void 0,this.previewMediaQuery?.removeEventListener("change",this.onPreviewMediaChange),this.previewMediaQuery=void 0,this.previewSyncRaf!==null&&(cancelAnimationFrame(this.previewSyncRaf),this.previewSyncRaf=null),this.previewSyncGeneration+=1,this.toggleAttribute("data-preview-measuring",!1),this.setPreviewLayoutState(!1,!1),this.setPreviewNavigationCollapse(!1),super.disconnectedCallback()}syncFlyoutState(t){if(t&&t.target?.closest?.("esp-page")!==this)return;const e=i=>{const o=i.mode;return(typeof o=="string"?o:i.getAttribute("mode"))==="overlay"},a=i=>{const o=i.open;return typeof o=="boolean"?o:i.hasAttribute("open")},r=i=>i.anchor!=null,s=(this.flyoutSlot.value?.assignedElements()??[]).filter(i=>i.tagName==="ESP-FLYOUT");this.toggleAttribute("flyout-open",s.some(i=>a(i)&&!e(i))),this.toggleAttribute("flyout-overlay-open",s.some(i=>a(i)&&e(i))),this.toggleAttribute("flyout-anchored",s.some(i=>a(i)&&r(i))),this.schedulePreviewLayout()}previewHasContent(){const t=this.previewSlot.value?.assignedNodes({flatten:!0});return t?t.some(e=>e.nodeType===Node.ELEMENT_NODE||(e.textContent?.trim().length??0)>0):Array.from(this.childNodes).some(e=>e instanceof Element&&e.getAttribute("slot")==="preview"&&!e.hasAttribute("hidden"))}getPreviewNavigationPair(){if(!this.previewCollapseSidebar)return null;const t=Array.from(this.children),e=t.find(i=>i.slot==="header"&&i.tagName==="ESP-HEADER"),a=t.find(i=>i.slot==="sidebar"&&i.tagName==="ESP-MENU");if(!e||!a||!a.id)return null;const r=typeof e.drawerTarget=="string"?e.drawerTarget:e.getAttribute("drawer-target")??"",s=typeof a.mode=="string"?a.mode:a.getAttribute("mode");return r!==a.id||s!=="vertical"||!("previewCollapseRequested"in e)||!("previewCollapseRequested"in a)?null:{header:e,menu:a}}async setPreviewNavigationCollapse(t){const e=t?this.getPreviewNavigationPair():null,a=e!==null&&this.previewHeader===e.header&&this.previewMenu===e.menu,r=this.previewHeader&&this.previewHeader!==e?.header?this.previewHeader:null,s=this.previewMenu&&this.previewMenu!==e?.menu?this.previewMenu:null;if(r&&(r.previewCollapseRequested=!1),s&&(s.previewCollapseRequested=!1),this.previewHeader=e?.header??null,this.previewMenu=e?.menu??null,this.toggleAttribute("data-preview-navigation-collapsed",!1),await r?.updateComplete,await s?.updateComplete,!e)return this.previewCollapsedSidebarWidth=0,!1;const i=a?this.previewCollapsedSidebarWidth:this.shadowRoot?.querySelector(".esp-page-left")?.getBoundingClientRect().width??0;return e.header.previewCollapseRequested=!0,e.menu.previewCollapseRequested=!0,await e.header.updateComplete,await e.menu.updateComplete,e.menu.hasExternalDrawerControl===!0?(this.previewCollapsedSidebarWidth=i,this.toggleAttribute("data-preview-navigation-collapsed",!0),!0):(e.header.previewCollapseRequested=!1,e.menu.previewCollapseRequested=!1,await e.header.updateComplete,await e.menu.updateComplete,this.previewHeader=null,this.previewMenu=null,this.previewCollapsedSidebarWidth=0,!1)}previewTokenIsConfigured(){return getComputedStyle(this).getPropertyValue("--esp-page-preview-min-main-width").trim().length>0}setPreviewLayoutState(t,e){this.previewVisible=t,this.previewReclaiming=t&&e}previewFitsWithinPage(t,e){const a=this.shadowRoot?.querySelector(".esp-page-main"),r=this.shadowRoot?.querySelector(".esp-page-preview");if(!a||!r)return!1;const s=this.getBoundingClientRect(),i=a.getBoundingClientRect(),o=r.getBoundingClientRect();return i.width+c>=t&&o.width+c>=e&&o.left+c>=s.left&&o.right<=s.right+c}async syncPreviewLayout(t){if(t!==this.previewSyncGeneration||!this.isConnected)return;let e=!1;this.toggleAttribute("data-preview-measuring",!0);try{const a=this.previewOpen&&this.previewHasContent(),r=this.previewMediaQuery?.matches??!1,s=this.hasAttribute("flyout-overlay-open"),i=this.hasAttribute("data-preview-navigation-collapsed")?this.previewCollapsedSidebarWidth:0;if(this.setPreviewLayoutState(!1,!1),this.toggleAttribute("data-preview-navigation-collapsed",!1),await this.updateComplete,t!==this.previewSyncGeneration||!a||r||s)return;const o=this.previewWidthProbe.value?.getBoundingClientRect().width??0,m=this.previewSpace.value?.getBoundingClientRect().width??0,y=Math.max(0,m-i);if(o<=0)return;if(y+c>=o){this.setPreviewLayoutState(!0,!1);return}if(!this.previewTokenIsConfigured())return;const v=this.previewMainMinProbe.value?.getBoundingClientRect().width??0;if(v<=0||(e=await this.setPreviewNavigationCollapse(this.previewCollapseSidebar),t!==this.previewSyncGeneration)||(this.setPreviewLayoutState(!0,!0),await new Promise(b=>requestAnimationFrame(()=>b())),t!==this.previewSyncGeneration))return;this.previewFitsWithinPage(v,o)||(this.setPreviewLayoutState(!1,!1),e=!1)}finally{t===this.previewSyncGeneration&&!e&&await this.setPreviewNavigationCollapse(!1),t===this.previewSyncGeneration&&this.toggleAttribute("data-preview-measuring",!1)}}setupPreviewLayoutObserver(){this.isConnected&&(!this.previewMediaQuery&&typeof window.matchMedia=="function"&&(this.previewMediaQuery=window.matchMedia(_),this.previewMediaQuery.addEventListener("change",this.onPreviewMediaChange)),!this.previewResizeObserver&&typeof ResizeObserver<"u"&&(this.previewResizeObserver=new ResizeObserver(this.onPreviewResize),this.previewResizeObserver.observe(this),this.previewWidthProbe.value&&this.previewResizeObserver.observe(this.previewWidthProbe.value),this.previewMainMinProbe.value&&this.previewResizeObserver.observe(this.previewMainMinProbe.value)),this.schedulePreviewLayout())}footerElementProvidesLandmark(t){return t.matches(w)||t.querySelector(w)!==null}syncFooterLandmark(){const e=(this.footerSlot.value?.assignedElements({flatten:!0})??[]).some(a=>this.footerElementProvidesLandmark(a));this.footerWrapperIsLandmark=!e}showPreview(){this.previewOpen=!0}closePreview(){this.previewOpen=!1}togglePreview(){this.previewOpen=!this.previewOpen}AddDialog(t){this.dialogZone.value?.appendChild(t)}firstUpdated(t){super.firstUpdated(t),this.syncFlyoutState(),this.setupPreviewLayoutObserver()}updated(t){super.updated(t),(t.has("fixedMenus")||t.has("headerPosition"))&&R().publish("fixed-menus-changed",{fixed:this.fixedMenus||this.headerPosition==="fixed"}),(t.has("previewOpen")||t.has("previewCollapseSidebar"))&&this.schedulePreviewLayout()}render(){const t=this.fixedMenus||this.headerPosition==="fixed",e=!t&&this.headerPosition==="sticky";return x`
      <div part="wrapper" class="esp-page ${z({"fixed-menus":t,"fixed-header":t,"sticky-header":e})}">
        <div part="canvas" class="esp-page-canvas esp-page-canvas--left" aria-hidden="true"></div>
        <div part="canvas" class="esp-page-canvas esp-page-canvas--right" aria-hidden="true"></div>
        <div part="surface" class="esp-page-surface" aria-hidden="true"></div>
        <div class="esp-page-top">
          <slot name="header" @slotchange=${this.schedulePreviewLayout}></slot>
        </div>
        <aside class="esp-page-left">
          <div class="sticky-wrapper">
            <slot name="sidebar" @slotchange=${this.schedulePreviewLayout}></slot>
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
              ${h(this.flyoutSlot)}
              @slotchange=${()=>this.syncFlyoutState()}
            ></slot>
          </div>
        </div>
        <div
          class="esp-page-preview-width-probe"
          aria-hidden="true"
          ${h(this.previewWidthProbe)}
        ></div>
        <div
          class="esp-page-preview-main-min-probe"
          aria-hidden="true"
          ${h(this.previewMainMinProbe)}
        ></div>
        <div class="esp-page-preview-space" ${h(this.previewSpace)}>
          <aside part="preview" class="esp-page-preview" aria-label=${this.previewLabel}>
            <div part="preview-content" class="sticky-wrapper">
              <slot
                name="preview"
                ${h(this.previewSlot)}
                @slotchange=${this.schedulePreviewLayout}
              ></slot>
            </div>
          </aside>
        </div>
        <div class="esp-page-footer" role=${this.footerWrapperIsLandmark?"contentinfo":S}>
          <slot name="footer" ${h(this.footerSlot)} @slotchange=${this.syncFooterLandmark}></slot>
        </div>
        <div id="dialog-drop-zone" ${h(this.dialogZone)}></div>
        <esp-toaster></esp-toaster>
      </div>
    `}};n.styles=[...f.styles,k`
      :host {
        --_esp-page-resolved-max-width: var(--esp-page-max-width, 1536px);
        
        --_esp-page-main-track: minmax(0, var(--_esp-page-resolved-max-width));
        
        --_esp-page-gutter-left: 0fr;
        --_esp-page-gutter-right: 1fr;
        
        --_esp-page-flyout-min: 0px;
        
        --_esp-page-preview-min: 0px;
        
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

      :host([preview-reclaiming]) {
        --_esp-page-preview-min: var(--esp-page-preview-width, 20rem);
        --_esp-page-main-track: minmax(
          var(--esp-page-preview-min-main-width, 0px),
          var(--_esp-page-resolved-max-width)
        );
      }

      :host([kind="full"][preview-reclaiming]) {
        --_esp-page-main-track: minmax(var(--esp-page-preview-min-main-width, 0px), 1fr);
      }

      
      @media (max-width: 50em) {
        :host([flyout-open]) {
          --_esp-page-flyout-min: 0px;
        }

        :host([preview-reclaiming]) {
          --_esp-page-preview-min: 0px;
        }

        .esp-page > .esp-page-preview-space {
          display: none;
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

      :host([preview-visible]) .esp-page > div.esp-page-preview-space > .esp-page-preview {
        display: block;
      }

      
      :host([data-preview-navigation-collapsed]) .esp-page > aside.esp-page-left {
        inline-size: 0;
        min-inline-size: 0;
      }

      :host([data-preview-measuring]) .esp-page {
        transition: none;
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
            calc(var(--_esp-page-flyout-min) + var(--_esp-page-preview-min)),
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

        
        > div.esp-page-preview-space {
          grid-column: flyout;
          grid-row: content;
          z-index: 4;
          position: relative;
          min-inline-size: 0;
          margin-inline-start: var(--_esp-page-flyout-min);

          > .esp-page-preview {
            display: none;
            inline-size: var(--esp-page-preview-width, 20rem);
            max-inline-size: 100%;
            position: relative;
          }
        }

        
        > .esp-page-preview-width-probe,
        > .esp-page-preview-main-min-probe {
          position: absolute;
          block-size: 0;
          visibility: hidden;
          pointer-events: none;
          contain: strict;
        }

        > .esp-page-preview-width-probe {
          inline-size: var(--esp-page-preview-width, 20rem);
        }

        > .esp-page-preview-main-min-probe {
          inline-size: var(--esp-page-preview-min-main-width, 0px);
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
          > div.esp-page-preview-space,
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
    `],p([C()],n.prototype,"footerWrapperIsLandmark",void 0),p([l({reflect:!0})],n.prototype,"kind",void 0),p([l({reflect:!0})],n.prototype,"align",void 0),p([l({type:Boolean,reflect:!0})],n.prototype,"contained",void 0),p([l({attribute:"header-position",reflect:!0})],n.prototype,"headerPosition",void 0),p([l({attribute:"fixed-menus",type:Boolean,reflect:!0})],n.prototype,"fixedMenus",void 0),p([l({attribute:"preview-open",type:Boolean,reflect:!0})],n.prototype,"previewOpen",void 0),p([l({attribute:"preview-label",type:String,reflect:!0})],n.prototype,"previewLabel",void 0),p([l({attribute:"preview-collapse-sidebar",type:Boolean,reflect:!0})],n.prototype,"previewCollapseSidebar",void 0),p([l({attribute:"preview-visible",type:Boolean,reflect:!0})],n.prototype,"previewVisible",void 0),p([l({attribute:"preview-reclaiming",type:Boolean,reflect:!0})],n.prototype,"previewReclaiming",void 0),n=p([P("esp-page")],n);export{n as EspalierPage};
