var w=function(P,e,t,i){var a=arguments.length,r=a<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(P,e,t,i);else for(var o=P.length-1;o>=0;o--)(s=P[o])&&(r=(a<3?s(r):a>3?s(e,t,r):s(e,t))||r);return a>3&&r&&Object.defineProperty(e,t,r),r};import{css as B,html as q,nothing as T}from"lit";import{customElement as I,property as m,state as N}from"lit/decorators.js";import{classMap as G}from"lit/directives/class-map.js";import{createRef as y,ref as b}from"lit/directives/ref.js";import{EspalierElementBase as F}from"../shared/esp-element-base.js";import{BiDirectionalStickyController as W}from"./bi-directional-sticky-controller.js";import{getEspBus as D}from"../shared/bus-events.js";import"../toaster/esp-toaster.js";const z='esp-footer, footer, [role~="contentinfo"]',$="(max-width: 50em)",l=1,H=5,U=12,V=48;let v=class extends F{constructor(){super(),this.dialogZone=y(),this.flyoutSlot=y(),this.footerSlot=y(),this.previewSlot=y(),this.previewSpace=y(),this.previewMinWidthProbe=y(),this.previewMaxWidthProbe=y(),this.flyoutMinWidthProbe=y(),this.flyoutMaxWidthProbe=y(),this.mainMinWidthProbe=y(),this.previewObservedWidths=new WeakMap,this.previewSyncRaf=null,this.previewSyncGeneration=0,this.previewSyncTask=Promise.resolve(),this.previewOverlayRecoveryRequested=!1,this.previewHeader=null,this.previewMenu=null,this.previewCollapsedSidebarWidth=0,this.flyoutOverlayPromotionWidth=null,this.flyoutOverlayRecoveryReady=!1,this.flyoutOverlayRecoveryGeneration=0,this.footerWrapperIsLandmark=!0,this.schedulePreviewLayout=(e=!1)=>{if(!this.isConnected||!this.hasUpdated)return;this.previewOverlayRecoveryRequested||=e===!0,this.previewSyncGeneration+=1;const t=this.previewSyncGeneration;this.previewSyncRaf!==null&&cancelAnimationFrame(this.previewSyncRaf),this.previewSyncRaf=requestAnimationFrame(()=>{this.previewSyncRaf=null;const i=this.previewOverlayRecoveryRequested;this.previewOverlayRecoveryRequested=!1,this.previewSyncTask=this.previewSyncTask.then(()=>this.syncPreviewLayout(t,i)).catch(()=>{})})},this.onPreviewMediaChange=()=>this.schedulePreviewLayout(!0),this.onPreviewResize=e=>{e.some(i=>{const a=i.contentRect.width,r=this.previewObservedWidths.get(i.target);return this.previewObservedWidths.set(i.target,a),r===void 0||Math.abs(r-a)>.25})&&this.schedulePreviewLayout(!0)},this.kind="wide",this.align="start",this.contained=!1,this.headerPosition="normal",this.fixedMenus=!1,this.previewOpen=!1,this.previewLabel="Preview",this.previewCollapseSidebar=!1,this.previewVisible=!1,this.previewReclaiming=!1,new W(this,".esp-page-left > .sticky-wrapper"),new W(this,".esp-page-right > .sticky-wrapper"),new W(this,".esp-page-flyout > .sticky-wrapper"),new W(this,".esp-page-preview > .sticky-wrapper",{topOffset:()=>0}),this.addEventListener("flyout-state-changed",e=>this.syncFlyoutState(e))}connectedCallback(){const e=Array.from(this.children).filter(t=>t.getAttribute("slot")==="footer");this.footerWrapperIsLandmark=!e.some(t=>this.footerElementProvidesLandmark(t)),super.connectedCallback(),this.hasUpdated&&queueMicrotask(()=>this.setupPreviewLayoutObserver())}disconnectedCallback(){this.previewResizeObserver?.disconnect(),this.previewResizeObserver=void 0,this.previewMediaQuery?.removeEventListener("change",this.onPreviewMediaChange),this.previewMediaQuery=void 0,this.previewSyncRaf!==null&&(cancelAnimationFrame(this.previewSyncRaf),this.previewSyncRaf=null),this.previewSyncGeneration+=1,this.previewOverlayRecoveryRequested=!1,this.toggleAttribute("data-preview-measuring",!1),this.toggleAttribute("data-preview-validating",!1),this.toggleAttribute("descendant-flyout-overlay-open",!1),this.clearFlyoutOverlayRecovery(),this.setPreviewLayoutState(!1,!1),this.setWorkspaceWidths(0,0),this.setPreviewNavigationCollapse(!1),super.disconnectedCallback()}syncFlyoutState(e){if(e&&e.target?.closest?.("esp-page")!==this){this.syncDescendantFlyoutOverlayState();return}const t=s=>{const o=s;return(typeof o.mode=="string"?o.mode:s.getAttribute("mode"))==="overlay"||o.pageOverlayRequested===!0},i=s=>{const o=s.open;return typeof o=="boolean"?o:s.hasAttribute("open")},a=s=>s.anchor!=null,r=(this.flyoutSlot.value?.assignedElements()??[]).filter(s=>s.tagName==="ESP-FLYOUT");for(const s of r){const o=s,n=typeof o.mode=="string"?o.mode:s.getAttribute("mode");o.pageOverlayRequested&&(!i(s)||n!=="auto")&&(o.pageOverlayRequested=!1)}r.some(s=>s.pageOverlayRequested===!0)||this.clearFlyoutOverlayRecovery(),this.toggleAttribute("flyout-open",r.some(s=>i(s)&&!t(s))),this.toggleAttribute("flyout-overlay-open",r.some(s=>i(s)&&t(s))),this.toggleAttribute("flyout-anchored",r.some(s=>i(s)&&a(s))),this.schedulePreviewLayout()}syncDescendantFlyoutOverlayState(){const e=Array.from(this.querySelectorAll("esp-flyout")).some(t=>{if(t.closest("esp-page")===this)return!1;const i=t,a=typeof i.open=="boolean"?i.open:t.hasAttribute("open"),r=typeof i.mode=="string"?i.mode:t.getAttribute("mode");return a&&(r==="overlay"||i.pageOverlayRequested===!0||t.getAttribute("aria-modal")==="true")});this.toggleAttribute("descendant-flyout-overlay-open",e)}assignedFlyouts(){return(this.flyoutSlot.value?.assignedElements()??[]).filter(e=>e.tagName==="ESP-FLYOUT")}openAutoFlyouts(){return this.assignedFlyouts().filter(e=>{const t=typeof e.open=="boolean"?e.open:e.hasAttribute("open"),i=typeof e.mode=="string"?e.mode:e.getAttribute("mode");return t&&i!=="overlay"})}async setPageFlyoutOverlay(e){let t=!1;const i=new Set(this.openAutoFlyouts());for(const a of this.assignedFlyouts()){const r=e&&i.has(a);a.pageOverlayRequested!==r&&(a.pageOverlayRequested=r,t=!0)}return t&&await Promise.all(this.assignedFlyouts().map(a=>a.updateComplete??Promise.resolve())),e||this.clearFlyoutOverlayRecovery(),t}clearFlyoutOverlayRecovery(){this.flyoutOverlayPromotionWidth=null,this.flyoutOverlayRecoveryReady=!1,this.flyoutOverlayRecoveryGeneration+=1}armFlyoutOverlayRecovery(){const e=++this.flyoutOverlayRecoveryGeneration;this.flyoutOverlayRecoveryReady=!1,requestAnimationFrame(()=>{requestAnimationFrame(()=>{e!==this.flyoutOverlayRecoveryGeneration||!this.openAutoFlyouts().some(t=>t.pageOverlayRequested===!0)||(this.flyoutOverlayPromotionWidth=this.visiblePageInlineBounds().width,this.flyoutOverlayRecoveryReady=!0)})})}previewHasContent(){const e=this.previewSlot.value?.assignedNodes({flatten:!0});return e?e.some(t=>t.nodeType===Node.ELEMENT_NODE||(t.textContent?.trim().length??0)>0):Array.from(this.childNodes).some(t=>t instanceof Element&&t.getAttribute("slot")==="preview"&&!t.hasAttribute("hidden"))}getPreviewNavigationPair(){if(!this.previewCollapseSidebar)return null;const e=Array.from(this.children),t=e.find(s=>s.slot==="header"&&s.tagName==="ESP-HEADER"),i=e.find(s=>s.slot==="sidebar"&&s.tagName==="ESP-MENU");if(!t||!i||!i.id)return null;const a=typeof t.drawerTarget=="string"?t.drawerTarget:t.getAttribute("drawer-target")??"",r=typeof i.mode=="string"?i.mode:i.getAttribute("mode");return a!==i.id||r!=="vertical"||!("previewCollapseRequested"in t)||!("previewCollapseRequested"in i)?null:{header:t,menu:i}}async setPreviewNavigationCollapse(e){const t=e?this.getPreviewNavigationPair():null,i=t!==null&&this.previewHeader===t.header&&this.previewMenu===t.menu,a=this.previewHeader&&this.previewHeader!==t?.header?this.previewHeader:null,r=this.previewMenu&&this.previewMenu!==t?.menu?this.previewMenu:null;if(a&&(a.previewCollapseRequested=!1),r&&(r.previewCollapseRequested=!1),this.previewHeader=t?.header??null,this.previewMenu=t?.menu??null,this.toggleAttribute("data-preview-navigation-collapsed",!1),await a?.updateComplete,await r?.updateComplete,!t)return this.previewCollapsedSidebarWidth=0,!1;const s=i?this.previewCollapsedSidebarWidth:this.shadowRoot?.querySelector(".esp-page-left")?.getBoundingClientRect().width??0;return t.header.previewCollapseRequested=!0,t.menu.previewCollapseRequested=!0,await t.header.updateComplete,await t.menu.updateComplete,t.menu.hasExternalDrawerControl===!0?(this.previewCollapsedSidebarWidth=s,this.toggleAttribute("data-preview-navigation-collapsed",!0),!0):(t.header.previewCollapseRequested=!1,t.menu.previewCollapseRequested=!1,await t.header.updateComplete,await t.menu.updateComplete,this.previewHeader=null,this.previewMenu=null,this.previewCollapsedSidebarWidth=0,!1)}setPreviewLayoutState(e,t){this.previewVisible=e,this.previewReclaiming=e&&t}setWorkspaceWidths(e,t){this.style.setProperty("--_esp-page-preview-used-width",`${Math.max(0,e)}px`),this.style.setProperty("--_esp-page-flyout-used-width",`${Math.max(0,t)}px`)}visiblePageInlineBounds(){const e=this.getBoundingClientRect();let t=e.left,i=e.right;const a=window.visualViewport,r=a?.offsetLeft??0,s=a?.width??document.documentElement.clientWidth;s>0&&(t=Math.max(t,r),i=Math.min(i,r+s));const o=this.getRootNode();let n=this.parentElement??(o instanceof ShadowRoot?o.host:null);for(;n;){const g=getComputedStyle(n).overflowX;if(["auto","clip","hidden","scroll"].includes(g)){const h=n.getBoundingClientRect();t=Math.max(t,h.left),i=Math.min(i,h.right)}const d=n.getRootNode();n=n.parentElement??(d instanceof ShadowRoot?d.host:null)}return{left:t,right:i,width:Math.max(0,i-t)}}visibleSpaceWidth(){const e=this.previewSpace.value?.getBoundingClientRect();if(!e)return 0;const t=this.visiblePageInlineBounds(),i=Math.max(0,t.left-e.left),a=Math.max(0,e.right-t.right);return Math.max(0,e.width-i-a)}probeWidth(e){return e.value?.getBoundingClientRect().width??0}allocateWorkspaceWidths(e,t,i,a,r,s,o){const n=Math.max(0,e),g=Math.max(0,a),d=Math.max(g,r),h=Math.max(0,s),p=Math.max(h,o);let u=0,f=0;return t&&i?(u=Math.min(d,Math.max(g,n-h)),f=Math.min(p,Math.max(h,n-u))):t?u=Math.min(d,Math.max(g,n)):i&&(f=Math.min(p,Math.max(h,n))),{previewWidth:u,flyoutWidth:f}}previewFitsWithinPage(e,t,i,a,r,s){const o=this.shadowRoot?.querySelector(".esp-page-main"),n=this.shadowRoot?.querySelector(".esp-page-preview"),g=this.shadowRoot?.querySelector(".esp-page-flyout");if(!o||!n||!g)return!1;const d=this.visiblePageInlineBounds(),h=o.getBoundingClientRect(),p=n.getBoundingClientRect(),u=g.getBoundingClientRect(),f=Math.max(t,i),M=Math.max(r,s),O=p.width+l>=t&&p.width<=f+l,R=!a||u.width+l>=r&&u.width<=M+l,x=p.left+l>=d.left&&p.right<=d.right+l&&(!a||u.left+l>=d.left&&u.right<=d.right+l),c=getComputedStyle(this).direction==="rtl"?h.left+l>=p.right&&(!a||p.left+l>=u.right):h.right<=p.left+l&&(!a||p.right<=u.left+l);return h.width+l>=e&&O&&R&&x&&c}flyoutFitsWithinPage(e,t,i){const a=this.shadowRoot?.querySelector(".esp-page-main"),r=this.shadowRoot?.querySelector(".esp-page-flyout");if(!a||!r)return!1;const s=this.visiblePageInlineBounds(),o=a.getBoundingClientRect(),n=r.getBoundingClientRect(),g=Math.max(t,i),d=n.width+l>=t&&n.width<=g+l,h=n.left+l>=s.left&&n.right<=s.right+l,p=getComputedStyle(this).direction==="rtl"?o.left+l>=n.right:o.right<=n.left+l;return o.width+l>=e&&d&&h&&p}workspaceMinimumsCanFit(e,t,i,a,r){const s=this.visiblePageInlineBounds().width;if(s<=0||e<=0||t&&i<=0||a&&r<=0)return!1;const o=this.shadowRoot?.querySelector(".esp-page-left")?.getBoundingClientRect().width??0,n=this.shadowRoot?.querySelector(".esp-page-right")?.getBoundingClientRect().width??0,d=(t&&this.getPreviewNavigationPair()!==null?0:o)+n+e+(t?i:0)+(a?r:0);return s+l>=d}workspaceGeometrySample(){const e=this.visiblePageInlineBounds(),t=this.shadowRoot?.querySelector(".esp-page-main")?.getBoundingClientRect(),i=this.shadowRoot?.querySelector(".esp-page-preview")?.getBoundingClientRect(),a=this.shadowRoot?.querySelector(".esp-page-flyout")?.getBoundingClientRect();return[e.left,e.right,e.width,t?.left??0,t?.right??0,t?.width??0,i?.left??0,i?.right??0,i?.width??0,a?.left??0,a?.right??0,a?.width??0]}workspaceGeometryMatches(e,t){return e.length===t.length&&e.every((i,a)=>Math.abs(i-(t[a]??i))<=l)}workspaceCandidateIsMeasurable(e,t){const i=this.shadowRoot?.querySelector(".esp-page-preview")?.getBoundingClientRect().width??0,a=this.shadowRoot?.querySelector(".esp-page-flyout")?.getBoundingClientRect().width??0;return(!e||i>l)&&(!t||a>l)}async candidateFitsAfterLayoutSettles(e,t,i){if(await this.updateComplete,e!==this.previewSyncGeneration||!this.isConnected)return null;let a=null,r=0;for(let s=0;s<U;s+=1){if(await new Promise(n=>requestAnimationFrame(()=>n())),e!==this.previewSyncGeneration||!this.isConnected)return null;if(t())return!0;if(!i()){a=null,r=0;continue}const o=this.workspaceGeometrySample();if(r=a&&this.workspaceGeometryMatches(a,o)?r+1:1,r>=H)return!1;a=o}return null}async promoteFlyoutIfClipped(e,t,i,a){if(i<=0)return!1;const r=await this.candidateFitsAfterLayoutSettles(e,()=>this.flyoutFitsWithinPage(t,i,a),()=>this.workspaceCandidateIsMeasurable(!1,!0));return r===null?!0:r?!1:(await this.promoteFlyoutToOverlay(),!0)}async promoteFlyoutToOverlay(){this.setPreviewLayoutState(!1,!1),this.setWorkspaceWidths(0,0),this.flyoutOverlayPromotionWidth===null&&(this.flyoutOverlayPromotionWidth=this.visiblePageInlineBounds().width,this.armFlyoutOverlayRecovery()),await this.setPageFlyoutOverlay(!0)}async syncPreviewLayout(e,t=!0){if(e!==this.previewSyncGeneration||!this.isConnected)return;let i=!1;const a=this.previewVisible;this.toggleAttribute("data-preview-measuring",!0);try{const r=this.previewOpen&&this.previewHasContent(),s=this.previewMediaQuery?.matches??!1,o=this.hasAttribute("flyout-overlay-open"),n=this.hasAttribute("flyout-open"),g=this.hasAttribute("data-preview-navigation-collapsed")?this.previewCollapsedSidebarWidth:0,d=this.probeWidth(this.previewMinWidthProbe),h=this.probeWidth(this.previewMaxWidthProbe),p=this.probeWidth(this.flyoutMinWidthProbe),u=this.probeWidth(this.flyoutMaxWidthProbe),f=this.probeWidth(this.mainMinWidthProbe),M=this.openAutoFlyouts().some(k=>k.pageOverlayRequested===!0);if(this.setPreviewLayoutState(!1,!1),this.setWorkspaceWidths(0,0),M){const k=this.visiblePageInlineBounds().width,E=this.flyoutOverlayPromotionWidth===null||k>=this.flyoutOverlayPromotionWidth+V;!s&&t&&this.flyoutOverlayRecoveryReady&&E&&this.workspaceMinimumsCanFit(f,r,d,!0,p)?await this.setPageFlyoutOverlay(!1):s&&await this.setPageFlyoutOverlay(!1);return}if(this.toggleAttribute("data-preview-navigation-collapsed",!1),await this.updateComplete,e!==this.previewSyncGeneration)return;const O=this.visibleSpaceWidth(),R=Math.max(0,O-g),x=r&&!s&&!o,c=n&&!s;if(f>0&&(!x||d>0)&&(!c||p>0)&&(x||c)&&!this.workspaceMinimumsCanFit(f,x,d,c,p)){c&&await this.promoteFlyoutToOverlay();return}const C=(x?d:0)+(c?p:0);let S=this.allocateWorkspaceWidths(R,x,c,d,h,p,u);if(this.setWorkspaceWidths(S.previewWidth,S.flyoutWidth),!x||d<=0){c&&await this.promoteFlyoutIfClipped(e,f,p,u);return}if(R+l>=C){a||this.toggleAttribute("data-preview-validating",!0),this.setPreviewLayoutState(!0,!1);const k=await this.candidateFitsAfterLayoutSettles(e,()=>this.previewFitsWithinPage(f,d,h,c,p,u),()=>this.workspaceCandidateIsMeasurable(!0,c));if(k===null)return;if(k){this.toggleAttribute("data-preview-validating",!1);return}this.setPreviewLayoutState(!1,!1),this.setWorkspaceWidths(0,c?p:0),c&&await this.promoteFlyoutToOverlay();return}const _=(this.shadowRoot?.querySelector(".esp-page-main")?.getBoundingClientRect().width??0)+R+l>=f+C;if(i=_?!1:await this.setPreviewNavigationCollapse(this.previewCollapseSidebar),_&&await this.setPreviewNavigationCollapse(!1),e!==this.previewSyncGeneration||(a||this.toggleAttribute("data-preview-validating",!0),this.setPreviewLayoutState(!0,!0),await this.updateComplete,e!==this.previewSyncGeneration))return;const L=this.visibleSpaceWidth();S=this.allocateWorkspaceWidths(L,!0,c,d,h,p,u),this.setWorkspaceWidths(S.previewWidth,S.flyoutWidth);const A=await this.candidateFitsAfterLayoutSettles(e,()=>this.previewFitsWithinPage(f,d,h,c,p,u),()=>this.workspaceCandidateIsMeasurable(!0,c));if(A===null)return;A?this.toggleAttribute("data-preview-validating",!1):(this.setPreviewLayoutState(!1,!1),this.setWorkspaceWidths(0,c?p:0),i=!1,c&&await this.promoteFlyoutToOverlay())}finally{e===this.previewSyncGeneration&&!i&&await this.setPreviewNavigationCollapse(!1),e===this.previewSyncGeneration&&(this.toggleAttribute("data-preview-measuring",!1),this.toggleAttribute("data-preview-validating",!1))}}setupPreviewLayoutObserver(){if(this.isConnected){if(!this.previewMediaQuery&&typeof window.matchMedia=="function"&&(this.previewMediaQuery=window.matchMedia($),this.previewMediaQuery.addEventListener("change",this.onPreviewMediaChange)),!this.previewResizeObserver&&typeof ResizeObserver<"u"){this.previewResizeObserver=new ResizeObserver(this.onPreviewResize),this.previewResizeObserver.observe(this);for(const e of[this.previewMinWidthProbe,this.previewMaxWidthProbe,this.flyoutMinWidthProbe,this.flyoutMaxWidthProbe,this.mainMinWidthProbe])e.value&&this.previewResizeObserver.observe(e.value)}this.schedulePreviewLayout(!0)}}footerElementProvidesLandmark(e){return e.matches(z)||e.querySelector(z)!==null}syncFooterLandmark(){const t=(this.footerSlot.value?.assignedElements({flatten:!0})??[]).some(i=>this.footerElementProvidesLandmark(i));this.footerWrapperIsLandmark=!t}showPreview(){this.previewOpen=!0}closePreview(){this.previewOpen=!1}togglePreview(){this.previewOpen=!this.previewOpen}AddDialog(e){this.dialogZone.value?.appendChild(e)}firstUpdated(e){super.firstUpdated(e),this.syncFlyoutState(),this.setupPreviewLayoutObserver()}updated(e){super.updated(e),(e.has("fixedMenus")||e.has("headerPosition"))&&D().publish("fixed-menus-changed",{fixed:this.fixedMenus||this.headerPosition==="fixed"}),(e.has("previewOpen")||e.has("previewCollapseSidebar"))&&this.schedulePreviewLayout(!0)}render(){const e=this.fixedMenus||this.headerPosition==="fixed",t=!e&&this.headerPosition==="sticky";return q`
      <div part="wrapper" class="esp-page ${G({"fixed-menus":e,"fixed-header":e,"sticky-header":t})}">
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
              ${b(this.flyoutSlot)}
              @slotchange=${()=>this.syncFlyoutState()}
            ></slot>
          </div>
        </div>
        <div
          class="esp-page-preview-width-probe esp-page-preview-min-width-probe"
          aria-hidden="true"
          ${b(this.previewMinWidthProbe)}
        ></div>
        <div
          class="esp-page-preview-max-width-probe"
          aria-hidden="true"
          ${b(this.previewMaxWidthProbe)}
        ></div>
        <div
          class="esp-page-flyout-min-width-probe"
          aria-hidden="true"
          ${b(this.flyoutMinWidthProbe)}
        ></div>
        <div
          class="esp-page-flyout-max-width-probe"
          aria-hidden="true"
          ${b(this.flyoutMaxWidthProbe)}
        ></div>
        <div
          class="esp-page-preview-main-min-probe esp-page-main-min-width-probe"
          aria-hidden="true"
          ${b(this.mainMinWidthProbe)}
        ></div>
        <div class="esp-page-preview-space" ${b(this.previewSpace)}>
          <aside part="preview" class="esp-page-preview" aria-label=${this.previewLabel}>
            <div part="preview-content" class="sticky-wrapper">
              <slot
                name="preview"
                ${b(this.previewSlot)}
                @slotchange=${this.schedulePreviewLayout}
              ></slot>
            </div>
          </aside>
        </div>
        <div class="esp-page-footer" role=${this.footerWrapperIsLandmark?"contentinfo":T}>
          <slot name="footer" ${b(this.footerSlot)} @slotchange=${this.syncFooterLandmark}></slot>
        </div>
        <div id="dialog-drop-zone" ${b(this.dialogZone)}></div>
        <esp-toaster></esp-toaster>
      </div>
    `}};v.styles=[...F.styles,B`
      :host {
        --_esp-page-resolved-max-width: var(
          --esp-page-main-max-width,
          var(--esp-page-max-width, 1536px)
        );
        --_esp-page-main-min-width: var(
          --esp-page-main-min-width,
          var(--esp-page-preview-min-main-width, 30rem)
        );
        --_esp-page-preview-resolved-min-width: var(
          --esp-page-preview-width,
          var(--esp-page-preview-min-width, 22.5rem)
        );
        --_esp-page-preview-resolved-max-width: var(
          --esp-page-preview-width,
          var(--esp-page-preview-max-width, 48rem)
        );
        --_esp-page-flyout-resolved-min-width: var(
          --esp-page-flyout-width,
          var(--esp-page-flyout-min-width, 20rem)
        );
        --_esp-page-flyout-resolved-max-width: var(
          --esp-page-flyout-width,
          var(--esp-page-flyout-max-width, 30rem)
        );
        --_esp-page-preview-used-width: 0px;
        --_esp-page-flyout-used-width: 0px;
        
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
        --_esp-page-resolved-max-width: var(
          --esp-page-main-max-width,
          var(--esp-page-max-width, 768px)
        );
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
        --_esp-page-resolved-max-width: var(
          --esp-page-main-max-width,
          var(--esp-page-max-width, none)
        );
        --_esp-page-main-track: 1fr;
        --_esp-page-gutter-left: 0fr;
        --_esp-page-gutter-right: 0fr;
      }

      
      :host([flyout-open]) {
        --_esp-page-flyout-min: var(--_esp-page-flyout-resolved-min-width);
      }

      :host([preview-reclaiming]) {
        --_esp-page-preview-min: var(--_esp-page-preview-resolved-min-width);
      }

      :host([flyout-open]),
      :host([preview-reclaiming]) {
        --_esp-page-main-track: minmax(
          var(--_esp-page-main-min-width),
          var(--_esp-page-resolved-max-width)
        );
      }

      :host([kind="full"][flyout-open]),
      :host([kind="full"][preview-reclaiming]) {
        --_esp-page-main-track: minmax(var(--_esp-page-main-min-width), 1fr);
      }

      
      @media (max-width: 50em) {
        :host([flyout-open]) {
          --_esp-page-flyout-min: 0px;
        }

        :host([preview-reclaiming]) {
          --_esp-page-preview-min: 0px;
        }

        :host([flyout-open]),
        :host([preview-reclaiming]) {
          --_esp-page-main-track: minmax(0, var(--_esp-page-resolved-max-width));
        }

        :host([kind="full"][flyout-open]),
        :host([kind="full"][preview-reclaiming]) {
          --_esp-page-main-track: 1fr;
        }

        .esp-page > .esp-page-preview-space {
          display: none;
        }
      }

      
      :host([flyout-overlay-open]) .esp-page > div.esp-page-flyout {
        z-index: var(--esp-flyout-z-index, 3000);
      }

      
      :host([descendant-flyout-overlay-open]) .esp-page > div.esp-page-main {
        z-index: var(--esp-flyout-z-index, 3000);
        overflow: visible;
      }

      
      :host([flyout-anchored]) .esp-page > div.esp-page-flyout > .sticky-wrapper {
        position: static;
      }

      
      :host([flyout-anchored][preview-visible]) .esp-page > div.esp-page-flyout {
        z-index: calc(var(--esp-page-header-z-index, 20) + 2);
      }

      slot[name="flyout"]::slotted(esp-flyout) {
        --_esp-flyout-used-width: var(--_esp-page-flyout-used-width);
        --_esp-flyout-preview-bridge-width: var(--_esp-page-preview-used-width);
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

      
      :host([data-preview-validating]) .esp-page-preview {
        visibility: hidden;
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
          inline-size: var(--_esp-page-flyout-used-width);
          min-inline-size: 0;
          margin-inline-start: var(--_esp-page-preview-used-width);

          
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

          > .esp-page-preview {
            display: none;
            box-sizing: border-box;
            inline-size: var(--_esp-page-preview-used-width);
            position: relative;
            background: var(
              --esp-page-preview-background,
              var(
                --esp-page-main-background,
                var(--esp-page-background, var(--esp-color-background))
              )
            );
            border-inline-start: var(--esp-page-preview-border, 1px dotted var(--esp-color-border));
            box-shadow: var(--esp-page-preview-shadow, var(--_esp-page-surface-edge-shadow));
          }
        }

        
        > .esp-page-preview-min-width-probe,
        > .esp-page-preview-max-width-probe,
        > .esp-page-flyout-min-width-probe,
        > .esp-page-flyout-max-width-probe,
        > .esp-page-main-min-width-probe {
          position: absolute;
          block-size: 0;
          visibility: hidden;
          pointer-events: none;
          contain: strict;
        }

        > .esp-page-preview-min-width-probe {
          inline-size: var(--_esp-page-preview-resolved-min-width);
        }

        > .esp-page-preview-max-width-probe {
          inline-size: var(--_esp-page-preview-resolved-max-width);
        }

        > .esp-page-flyout-min-width-probe {
          inline-size: var(--_esp-page-flyout-resolved-min-width);
        }

        > .esp-page-flyout-max-width-probe {
          inline-size: var(--_esp-page-flyout-resolved-max-width);
        }

        > .esp-page-main-min-width-probe {
          inline-size: var(--_esp-page-main-min-width);
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

      
      :host([preview-visible]) .esp-page > .esp-page-surface {
        box-shadow: none;
      }

      
      .esp-page > div.esp-page-preview-space {
        grid-row: top-start / footer-end;
        z-index: calc(var(--esp-page-header-z-index, 20) + 1);
        pointer-events: none;

        > .esp-page-preview {
          position: absolute;
          inset-block: 0;
          inset-inline-start: 0;
          pointer-events: auto;

          > .sticky-wrapper {
            block-size: 100vh;
            block-size: 100dvh;
            overflow-y: auto;
            
            overscroll-behavior-y: auto;
          }
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .esp-page {
          transition: none;
        }
      }
    `],w([N()],v.prototype,"footerWrapperIsLandmark",void 0),w([m({reflect:!0})],v.prototype,"kind",void 0),w([m({reflect:!0})],v.prototype,"align",void 0),w([m({type:Boolean,reflect:!0})],v.prototype,"contained",void 0),w([m({attribute:"header-position",reflect:!0})],v.prototype,"headerPosition",void 0),w([m({attribute:"fixed-menus",type:Boolean,reflect:!0})],v.prototype,"fixedMenus",void 0),w([m({attribute:"preview-open",type:Boolean,reflect:!0})],v.prototype,"previewOpen",void 0),w([m({attribute:"preview-label",type:String,reflect:!0})],v.prototype,"previewLabel",void 0),w([m({attribute:"preview-collapse-sidebar",type:Boolean,reflect:!0})],v.prototype,"previewCollapseSidebar",void 0),w([m({attribute:"preview-visible",type:Boolean,reflect:!0})],v.prototype,"previewVisible",void 0),w([m({attribute:"preview-reclaiming",type:Boolean,reflect:!0})],v.prototype,"previewReclaiming",void 0),v=w([I("esp-page")],v);export{v as EspalierPage};
