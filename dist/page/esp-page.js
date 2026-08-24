var M=function(q,e,t,i){var a=arguments.length,s=a<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(q,e,t,i);else for(var r=q.length-1;r>=0;r--)(o=q[r])&&(s=(a<3?o(s):a>3?o(e,t,s):o(e,t))||s);return a>3&&s&&Object.defineProperty(e,t,s),s};import{css as re,html as oe,nothing as ee}from"lit";import{customElement as ne,property as _,state as H}from"lit/decorators.js";import{classMap as le}from"lit/directives/class-map.js";import{createRef as R,ref as z}from"lit/directives/ref.js";import{EspalierElementBase as te}from"../shared/esp-element-base.js";import{ESP_EVENTS as he}from"../shared/events.js";import{BiDirectionalStickyController as N}from"./bi-directional-sticky-controller.js";import{getEspBus as pe}from"../shared/bus-events.js";import{RafThrottle as ie}from"../shared/raf-throttle.js";import{InlineBounds as de,PaneProbes as U,probeWidth as ce,WidthRange as G}from"./workspace-width.js";import{slotHasContent as ue}from"../shared/slot-content.js";import"../toaster/esp-toaster.js";const ae='esp-footer, footer, [role~="contentinfo"]',ge="(max-width: 50em)",l=1,me=5,ve=12,we=48,fe=48,ye=16,be=64,ke=250,We=250,xe=40;let x=class extends te{constructor(){super(),this.dialogZone=R(),this.flyoutSlot=R(),this.footerSlot=R(),this.previewSlot=R(),this.previewSpace=R(),this.previewMinWidthProbe=R(),this.previewDefaultWidthProbe=R(),this.previewMaxWidthProbe=R(),this.previewProbes=new U(this.previewMinWidthProbe,this.previewDefaultWidthProbe,this.previewMaxWidthProbe),this.flyoutMinWidthProbe=R(),this.flyoutDefaultWidthProbe=R(),this.flyoutMaxWidthProbe=R(),this.flyoutProbes=new U(this.flyoutMinWidthProbe,this.flyoutDefaultWidthProbe,this.flyoutMaxWidthProbe),this.mainMinWidthProbe=R(),this.mainConfiguredMaxWidthProbe=R(),this.mainMaxWidthProbe=R(),this.mainProbes=new U(this.mainMinWidthProbe,this.mainMaxWidthProbe,this.mainMaxWidthProbe),this.resizeStepProbe=R(),this.resizeLargeStepProbe=R(),this.previewObservedWidths=new WeakMap,this.previewSyncFrame=new ie(()=>this.runScheduledPreviewLayout()),this.previewSyncGeneration=0,this.previewSyncTask=Promise.resolve(),this.previewOverlayRecoveryRequested=!1,this.previewHeader=null,this.previewMenu=null,this.previewCollapsedSidebarWidth=0,this.previewNavigationCollapseTask=null,this.flyoutOverlayPromotionWidth=null,this.flyoutOverlayRecoveryReady=!1,this.flyoutOverlayRecoveryGeneration=0,this.preferredPreviewWidth=null,this.preferredFlyoutWidth=null,this.flyoutFullHeightActive=!1,this.resizeSession=null,this.workspaceKeyboardSettlementTimer=null,this.workspaceRecenteringFrame=new ie(()=>this.applyWorkspaceRecentering()),this.pendingRecenterLeading=0,this.workspaceRecenteringTimer=null,this.footerWrapperIsLandmark=!0,this.allocatedPreviewWidth=0,this.allocatedFlyoutWidth=0,this.onWorkspaceResizePointerDown=(e,t)=>{if(t.button!==0||!this.separatorIsAvailable(e))return;const i=t.currentTarget,a=this.shadowRoot?.querySelector(".esp-page-main")?.getBoundingClientRect().width??0,s=this.renderedWorkspaceWidths();this.endWorkspaceResize(),this.finishWorkspaceKeyboardResize(!1),this.suspendPreviewLayoutForWorkspaceResize();const o=i.getBoundingClientRect(),r=this.holdWorkspacePosition();this.toggleAttribute("data-workspace-resizing",!0);const{leading:n,trailing:d}=this.workspaceLogicalGutterWidths(),m=d>l?n+d:0,p=d>l?Math.max(1,m/d):1;this.resizeSession={separator:e,pointerId:t.pointerId,target:i,startClientX:t.clientX,startPreviewWidth:s.previewWidth,startFlyoutWidth:s.flyoutWidth,startMainWidth:a,startNavigationAllowance:this.previewNavigationResizeAllowance(),startOuterGrowthCapacity:m,trailingExpansionScale:p,trailingGroupPushDelta:0,startHandleClientX:o.left+o.width/2,startLeadingGutterWidth:r,heldLeadingGutterWidth:r,direction:this.workspaceResizeDirection()};try{i.setPointerCapture?.(t.pointerId)}catch{}t.preventDefault()},this.onWorkspaceResizePointerMove=e=>{const t=this.resizeSession;if(!t||t.pointerId!==e.pointerId)return;e.preventDefault();const i=e.clientX-t.startClientX,a=i*t.direction,s=t.separator==="main-preview"||t.separator==="preview-flyout"&&!this.previewVisible;t.trailingGroupPushDelta=s&&a>0?Math.min(a,t.startOuterGrowthCapacity/t.trailingExpansionScale,this.mainResizeGrowthCapacity(t.startMainWidth)):0,this.applyWorkspaceResize(t.separator,i,"pointer",t.startPreviewWidth,t.startFlyoutWidth,t.startMainWidth,t.startNavigationAllowance,t.startOuterGrowthCapacity,t.trailingExpansionScale,t.direction),this.align!=="start"&&!this.seedWorkspaceResizeLeadingGutter(t)&&this.trackWorkspaceResizePointer(t)},this.onWorkspaceResizePointerEnd=e=>{!this.resizeSession||this.resizeSession.pointerId!==e.pointerId||(e.preventDefault(),this.endWorkspaceResize())},this.onWorkspaceResizeBlur=e=>{this.hasAttribute("data-workspace-keyboard-adjusting")&&(e.relatedTarget instanceof Element&&e.relatedTarget.classList.contains("esp-page-workspace-resize-handle")||this.finishWorkspaceKeyboardResize())},this.onWorkspaceResizeKeyDown=(e,t)=>{if(t.key!=="ArrowLeft"&&t.key!=="ArrowRight"||!this.separatorIsAvailable(e))return;t.preventDefault(),this.hasAttribute("data-workspace-keyboard-adjusting")||this.suspendPreviewLayoutForWorkspaceResize();const i=(t.key==="ArrowLeft"?-1:1)*this.resizeStep(t.shiftKey),a=this.shadowRoot?.querySelector(".esp-page-main")?.getBoundingClientRect().width??0,s=this.renderedWorkspaceWidths();this.applyWorkspaceResize(e,i,"keyboard",s.previewWidth,s.flyoutWidth,a,this.previewNavigationResizeAllowance(),(()=>{const o=this.workspaceLogicalGutterWidths();return o.leading+o.trailing})(),1,this.workspaceResizeDirection())},this.schedulePreviewLayout=(e=!1)=>{!this.isConnected||!this.hasUpdated||(this.previewOverlayRecoveryRequested||=e===!0,!(this.resizeSession||this.hasAttribute("data-workspace-keyboard-adjusting")||this.hasAttribute("data-workspace-position-held"))&&(this.previewSyncGeneration+=1,this.previewSyncFrame.restart()))},this.onPreviewMediaChange=()=>this.schedulePreviewLayout(!0),this.onPreviewResize=e=>{let t=!1;for(const i of e){const a=i.contentRect.width;if(i.target instanceof HTMLElement&&i.target.classList.contains("esp-page-left")){a>l&&!this.hasAttribute("data-preview-navigation-collapsed")&&(this.previewCollapsedSidebarWidth=a);continue}const s=this.previewObservedWidths.get(i.target);this.previewObservedWidths.set(i.target,a),t||=s===void 0||Math.abs(s-a)>.25}t&&this.schedulePreviewLayout(!0)},this.kind="wide",this.align="start",this.contained=!1,this.headerPosition="normal",this.fixedMenus=!1,this.previewOpen=!1,this.previewLabel="Preview",this.previewCollapseSidebar=!1,this.workspaceResizable=!1,this.previewVisible=!1,this.previewReclaiming=!1,this.warnedSiteRails=!1,new N(this,".esp-page-left > .sticky-wrapper"),new N(this,".esp-page-right > .sticky-wrapper"),new N(this,".esp-page-flyout > .sticky-wrapper",{topOffset:()=>this.flyoutFullHeightActive?0:void 0}),new N(this,".esp-page-preview > .sticky-wrapper",{topOffset:()=>0}),this.addEventListener("esp-flyout-state-changed",e=>this.syncFlyoutState(e))}connectedCallback(){const e=Array.from(this.children).filter(t=>t.getAttribute("slot")==="footer");this.footerWrapperIsLandmark=!e.some(t=>this.footerElementProvidesLandmark(t)),super.connectedCallback(),this.syncMainMaximumConfiguration(),this.hasUpdated&&queueMicrotask(()=>this.setupPreviewLayoutObserver())}disconnectedCallback(){this.finishWorkspaceKeyboardResize(!1),this.endWorkspaceResize(),this.clearWorkspaceRecenteringState(),this.previewResizeObserver?.disconnect(),this.previewResizeObserver=void 0,this.previewMediaQuery?.removeEventListener("change",this.onPreviewMediaChange),this.previewMediaQuery=void 0,this.previewSyncFrame.cancel(),this.previewSyncGeneration+=1,this.previewOverlayRecoveryRequested=!1,this.toggleAttribute("data-preview-measuring",!1),this.toggleAttribute("data-preview-validating",!1),this.toggleAttribute("data-workspace-keyboard-adjusting",!1),this.toggleAttribute("descendant-flyout-overlay-open",!1),this.clearFlyoutOverlayRecovery(),this.setPreviewLayoutState(!1,!1),this.setWorkspaceWidths(0,0),this.preferredPreviewWidth=null,this.preferredFlyoutWidth=null,this.previewNavigationCollapseTask=null,this.setPreviewNavigationCollapse(!1),super.disconnectedCallback()}syncFlyoutState(e){if(e&&e.target?.closest?.("esp-page")!==this){this.syncDescendantFlyoutOverlayState();return}const t=r=>{const n=r;return(typeof n.mode=="string"?n.mode:r.getAttribute("mode"))==="overlay"||n.pageOverlayRequested===!0},i=r=>{const n=r.open;return typeof n=="boolean"?n:r.hasAttribute("open")},a=r=>r.anchor!=null,s=r=>{const n=r.fullHeight;return typeof n=="boolean"?n:r.hasAttribute("full-height")},o=(this.flyoutSlot.value?.assignedElements()??[]).filter(r=>r.tagName==="ESP-FLYOUT");for(const r of o){const n=r,d=typeof n.mode=="string"?n.mode:r.getAttribute("mode");n.pageOverlayRequested&&(!i(r)||d!=="auto")&&(n.pageOverlayRequested=!1)}o.some(r=>r.pageOverlayRequested===!0)||this.clearFlyoutOverlayRecovery(),this.toggleAttribute("flyout-open",o.some(r=>i(r)&&!t(r))),this.toggleAttribute("flyout-overlay-open",o.some(r=>i(r)&&t(r))),this.toggleAttribute("flyout-anchored",o.some(r=>i(r)&&a(r))),this.flyoutFullHeightActive=o.some(r=>i(r)&&!t(r)&&s(r)),this.toggleAttribute("flyout-full-height",this.flyoutFullHeightActive),this.resizeSession&&(this.hasAttribute("flyout-overlay-open")||this.resizeSession.separator==="preview-flyout"&&!this.hasAttribute("flyout-open"))&&this.endWorkspaceResize(),this.requestUpdate(),this.schedulePreviewLayout()}syncDescendantFlyoutOverlayState(){const e=Array.from(this.querySelectorAll("esp-flyout")).some(t=>{if(t.closest("esp-page")===this)return!1;const i=t,a=typeof i.open=="boolean"?i.open:t.hasAttribute("open"),s=typeof i.mode=="string"?i.mode:t.getAttribute("mode");return a&&(s==="overlay"||i.pageOverlayRequested===!0||t.getAttribute("aria-modal")==="true")});this.toggleAttribute("descendant-flyout-overlay-open",e)}assignedFlyouts(){return(this.flyoutSlot.value?.assignedElements()??[]).filter(e=>e.tagName==="ESP-FLYOUT")}openAutoFlyouts(){return this.assignedFlyouts().filter(e=>{const t=typeof e.open=="boolean"?e.open:e.hasAttribute("open"),i=typeof e.mode=="string"?e.mode:e.getAttribute("mode");return t&&i!=="overlay"})}async setPageFlyoutOverlay(e){let t=!1;const i=new Set(this.openAutoFlyouts());for(const a of this.assignedFlyouts()){const s=e&&i.has(a);a.pageOverlayRequested!==s&&(a.pageOverlayRequested=s,t=!0)}return t&&await Promise.all(this.assignedFlyouts().map(a=>a.updateComplete??Promise.resolve())),e||this.clearFlyoutOverlayRecovery(),t}clearFlyoutOverlayRecovery(){this.flyoutOverlayPromotionWidth=null,this.flyoutOverlayRecoveryReady=!1,this.flyoutOverlayRecoveryGeneration+=1}armFlyoutOverlayRecovery(){const e=++this.flyoutOverlayRecoveryGeneration;this.flyoutOverlayRecoveryReady=!1,requestAnimationFrame(()=>{requestAnimationFrame(()=>{e!==this.flyoutOverlayRecoveryGeneration||!this.openAutoFlyouts().some(t=>t.pageOverlayRequested===!0)||(this.flyoutOverlayPromotionWidth=this.visiblePageInlineBounds().width,this.flyoutOverlayRecoveryReady=!0)})})}previewHasContent(){const e=this.previewSlot.value;return e?ue(e):Array.from(this.childNodes).some(t=>t instanceof Element&&t.getAttribute("slot")==="preview"&&!t.hasAttribute("hidden"))}getPreviewNavigationPair(){if(!this.previewCollapseSidebar)return null;const e=Array.from(this.children),t=e.find(o=>o.slot==="header"&&o.tagName==="ESP-HEADER"),i=e.find(o=>o.slot==="sidebar"&&o.tagName==="ESP-MENU");if(!t||!i||!i.id)return null;const a=typeof t.drawerTarget=="string"?t.drawerTarget:t.getAttribute("drawer-target")??"",s=typeof i.mode=="string"?i.mode:i.getAttribute("mode");return a!==i.id||s!=="vertical"||!("previewCollapseRequested"in t)||!("previewCollapseRequested"in i)?null:{header:t,menu:i}}async setPreviewNavigationCollapse(e){const t=e?this.getPreviewNavigationPair():null,i=t!==null&&this.previewHeader===t.header&&this.previewMenu===t.menu,a=this.previewHeader&&this.previewHeader!==t?.header?this.previewHeader:null,s=this.previewMenu&&this.previewMenu!==t?.menu?this.previewMenu:null;if(a&&(a.previewCollapseRequested=!1),s&&(s.previewCollapseRequested=!1),this.previewHeader=t?.header??null,this.previewMenu=t?.menu??null,this.toggleAttribute("data-preview-navigation-collapsed",!1),await a?.updateComplete,await s?.updateComplete,!t)return!1;const o=i?this.previewCollapsedSidebarWidth:this.shadowRoot?.querySelector(".esp-page-left")?.getBoundingClientRect().width??0;return t.header.previewCollapseRequested=!0,t.menu.previewCollapseRequested=!0,await t.header.updateComplete,await t.menu.updateComplete,t.menu.hasExternalDrawerControl===!0?(this.previewCollapsedSidebarWidth=o,this.toggleAttribute("data-preview-navigation-collapsed",!0),!0):(t.header.previewCollapseRequested=!1,t.menu.previewCollapseRequested=!1,await t.header.updateComplete,await t.menu.updateComplete,this.previewHeader=null,this.previewMenu=null,!1)}requestPreviewNavigationCollapse(){if(this.hasAttribute("data-preview-navigation-collapsed")||this.previewNavigationCollapseTask)return;const e=this.setPreviewNavigationCollapse(!0);this.previewNavigationCollapseTask=e,e.then(()=>{this.previewNavigationCollapseTask===e&&(this.previewNavigationCollapseTask=null)},()=>{this.previewNavigationCollapseTask===e&&(this.previewNavigationCollapseTask=null)})}scheduleWorkspaceSettlement(e=null){const t=()=>{this.schedulePreviewLayout(),e&&requestAnimationFrame(()=>{this.previewSyncTask.then(()=>{const s=this.shadowRoot?.activeElement,o=this.ownerDocument.activeElement;!this.isConnected||!e.isConnected||s&&s!==e||o!==this&&o!==this.ownerDocument.body||getComputedStyle(e).display!=="none"&&e.focus({preventScroll:!0})})})},i=this.previewNavigationCollapseTask;if(!i){t();return}i.then(()=>t(),()=>t())}clearWorkspaceKeyboardSettlementTimer(){this.workspaceKeyboardSettlementTimer!==null&&(clearTimeout(this.workspaceKeyboardSettlementTimer),this.workspaceKeyboardSettlementTimer=null)}finishWorkspaceKeyboardResize(e=!0){this.clearWorkspaceKeyboardSettlementTimer();const t=this.hasAttribute("data-workspace-keyboard-adjusting");this.toggleAttribute("data-workspace-keyboard-adjusting",!1),t&&e&&!this.resizeSession&&this.scheduleWorkspaceSettlement()}deferWorkspaceKeyboardSettlement(){this.clearWorkspaceKeyboardSettlementTimer(),this.workspaceKeyboardSettlementTimer=setTimeout(()=>{if(this.workspaceKeyboardSettlementTimer=null,!this.hasAttribute("data-workspace-keyboard-adjusting"))return;const e=this.shadowRoot?.activeElement,t=e instanceof HTMLElement&&e.classList.contains("esp-page-workspace-resize-handle")?e:null;this.toggleAttribute("data-workspace-keyboard-adjusting",!1),this.resizeSession||this.scheduleWorkspaceSettlement(t)},ke)}suspendPreviewLayoutForWorkspaceResize(){this.previewSyncFrame.cancel(),this.previewSyncGeneration+=1,this.toggleAttribute("data-preview-measuring",!1),this.toggleAttribute("data-preview-validating",!1)}setPreviewLayoutState(e,t){this.previewVisible=e,this.previewReclaiming=e&&t,e||this.endWorkspaceResize()}setWorkspaceWidths(e,t,i=!1){const a=Math.max(0,e),s=Math.max(0,t);this.style.setProperty("--_esp-page-preview-used-width",`${a}px`),this.style.setProperty("--_esp-page-flyout-used-width",`${s}px`),this.toggleAttribute("data-workspace-targeted",i),this.allocatedPreviewWidth=a,this.allocatedFlyoutWidth=s}clampWidth(e,t,i){return G.of(t,i).clamp(e)}visiblePageInlineBounds(){const e=this.getBoundingClientRect();let t=e.left,i=e.right;const a=window.visualViewport,s=a?.offsetLeft??0,o=a?.width??document.documentElement.clientWidth;o>0&&(t=Math.max(t,s),i=Math.min(i,s+o));const r=this.getRootNode();let n=this.parentElement??(r instanceof ShadowRoot?r.host:null);for(;n;){const d=getComputedStyle(n).overflowX;if(["auto","clip","hidden","scroll"].includes(d)){const p=n.getBoundingClientRect();t=Math.max(t,p.left),i=Math.min(i,p.right)}const m=n.getRootNode();n=n.parentElement??(m instanceof ShadowRoot?m.host:null)}return new de(t,i)}probeWidth(e){return ce(e)}optionalWidth(e,t){return getComputedStyle(this).getPropertyValue(e).trim()===""?null:this.probeWidth(t)}syncMainMaximumConfiguration(){const e=getComputedStyle(this).getPropertyValue("--esp-page-main-max-width").trim()!=="";this.toggleAttribute("data-main-max-configured",e)}workspaceWidthCapacity(e,t,i=0){const a=this.shadowRoot?.querySelector(".esp-page-left")?.getBoundingClientRect().width??0,s=this.shadowRoot?.querySelector(".esp-page-right")?.getBoundingClientRect().width??0,o=Math.max(0,this.visiblePageInlineBounds().width-a-s-Math.max(0,i));return this.workspaceWidthCapacityForAvailable(o,e,t)}workspaceWidthCapacityForAvailable(e,t,i){const a=Math.max(0,e),s=i>0?Math.min(a,i):a;return{natural:Math.max(0,a-s),maximum:Math.max(0,a-Math.max(0,t))}}workspaceTargetWidth(e,t,i){return Math.min(e.maximum,Math.max(t,i,e.natural))}allocateWorkspaceWidths(e,t,i,a,s,o,r,n=null,d=null){const m=Math.max(0,e),p=Math.max(0,a),u=Math.max(p,s),y=Math.max(0,o),W=Math.max(y,r),v=t?this.preferredPreviewWidth??(n===null?null:this.clampWidth(n,p,u)):null,w=i?this.preferredFlyoutWidth??(d===null?null:this.clampWidth(d,y,W)):null;let c=0,h=0;t&&i?(c=Math.min(u,Math.max(p,m-y)),h=Math.min(W,Math.max(y,m-c))):t?c=Math.min(u,Math.max(p,m)):i&&(h=Math.min(W,Math.max(y,m))),t&&v!==null&&(c=this.clampWidth(v,p,u),i&&w===null&&(h=this.clampWidth(m-c,y,W))),i&&w!==null&&(h=this.clampWidth(w,y,W),t&&v===null&&(c=this.clampWidth(m-h,p,u)));let b=c+h-m;if(b>0&&i){const P=Math.min(b,Math.max(0,h-y));h-=P,b-=P}return b>0&&t&&(c-=Math.min(b,Math.max(0,c-p))),{previewWidth:c,flyoutWidth:h}}workspaceResizeDirection(){return getComputedStyle(this).direction==="rtl"?-1:1}trailingWorkspaceSeparator(){return this.hasAttribute("flyout-open")&&!this.hasAttribute("flyout-overlay-open")?"flyout-end":this.previewVisible?"preview-end":null}trailingWorkspacePane(){const e=this.trailingWorkspaceSeparator()==="flyout-end"?".esp-page-flyout":this.trailingWorkspaceSeparator()==="preview-end"?".esp-page-preview":null;return e?this.shadowRoot?.querySelector(e)??null:null}workspaceLogicalGutterWidths(){const e=Math.max(0,this.shadowRoot?.querySelector(".esp-page-canvas--left")?.getBoundingClientRect().width??0),t=this.trailingWorkspacePane();if(!t)return{leading:e,trailing:0};const i=this.visiblePageInlineBounds(),a=t.getBoundingClientRect(),s=this.workspaceResizeDirection()===1?i.right-a.right:a.left-i.left;return{leading:e,trailing:Math.max(0,s)}}syncTrailingWorkspaceResizeAvailability(){const{trailing:e}=this.workspaceLogicalGutterWidths();this.toggleAttribute("data-workspace-trailing-edge-exposed",this.trailingWorkspaceSeparator()!==null&&e>l)}trailingPaneResizeRange(e,t,i){const a=e==="preview-end"?this.previewMinWidthProbe:this.flyoutMinWidthProbe,s=e==="preview-end"?this.previewMaxWidthProbe:this.flyoutMaxWidthProbe,o=Math.max(0,this.probeWidth(a)),r=Math.max(o,this.probeWidth(s));return G.of(o,r).cappedAt(Math.max(0,t)+Math.max(0,i))}resizeStep(e){const t=this.probeWidth(e?this.resizeLargeStepProbe:this.resizeStepProbe);return t>0?t:e?be:ye}previewNavigationResizeAllowance(){if(this.hasAttribute("data-preview-navigation-collapsed")||this.getPreviewNavigationPair()===null)return 0;const e=Math.max(0,this.shadowRoot?.querySelector(".esp-page-left")?.getBoundingClientRect().width??0);return e>l&&(this.previewCollapsedSidebarWidth=e),e>l?e:this.previewCollapsedSidebarWidth}renderedWorkspaceWidths(){const e=this.shadowRoot?.querySelector(".esp-page-preview"),t=this.shadowRoot?.querySelector(".esp-page-flyout");return{previewWidth:this.allocatedPreviewWidth>0?this.allocatedPreviewWidth:e?.getBoundingClientRect().width??0,flyoutWidth:this.allocatedFlyoutWidth>0?this.allocatedFlyoutWidth:t?.getBoundingClientRect().width??0}}mainPreviewResizeRange(e=this.renderedWorkspaceWidths().previewWidth,t=this.shadowRoot?.querySelector(".esp-page-main")?.getBoundingClientRect().width??0,i=this.previewNavigationResizeAllowance()){const a=this.previewProbes.minimum,s=this.previewProbes.maximum,o=this.mainProbes.minimum,r=Math.max(0,t+e),n=Math.max(0,r+i-o);return G.of(a,Math.max(a,Math.min(s,n)))}previewFlyoutResizeRange(e=this.renderedWorkspaceWidths().previewWidth,t=this.renderedWorkspaceWidths().flyoutWidth){const i=this.previewProbes.minimum,a=this.previewProbes.maximum,s=this.flyoutProbes.minimum,o=this.flyoutProbes.maximum,r=e+t;return G.of(Math.max(i,r-o),Math.max(i,Math.min(a,r-s)))}separatorIsAvailable(e){return!this.workspaceResizable||this.hasAttribute("flyout-overlay-open")?!1:e==="main-preview"?this.previewVisible:e==="preview-end"||e==="flyout-end"?this.trailingWorkspaceSeparator()===e&&(this.hasAttribute("data-workspace-trailing-edge-exposed")||this.hasAttribute("data-workspace-position-held")||this.hasAttribute("data-workspace-keyboard-adjusting")):this.hasAttribute("flyout-open")}flyoutOnlyResizeRange(e=this.renderedWorkspaceWidths().flyoutWidth,t=this.shadowRoot?.querySelector(".esp-page-main")?.getBoundingClientRect().width??0){const i=this.flyoutProbes.minimum,a=this.flyoutProbes.maximum,s=this.mainProbes.minimum,o=this.probeWidth(this.mainMaxWidthProbe),r=Math.max(0,t+e),n=o>0?Math.max(0,r-o):0,d=Math.max(i,n);return G.of(d,Math.min(a,r-s))}mainTrackUnbounded(){return this.kind==="site"||this.kind==="full"&&!this.hasAttribute("data-main-max-configured")}mainResizeGrowthCapacity(e){return this.mainTrackUnbounded()?Number.POSITIVE_INFINITY:Math.max(0,this.probeWidth(this.mainMaxWidthProbe)-e)}applyWorkspaceResize(e,t,i,a,s,o,r,n,d,m){if(!this.separatorIsAvailable(e))return;const p=t*m,u=n/d,y=e==="main-preview"||e==="preview-flyout"&&!this.previewVisible,W=i==="pointer"&&y&&p>0?Math.min(p,u,this.mainResizeGrowthCapacity(o)):0;let v=e,w=a,c=s;if(e==="preview-end"||e==="flyout-end"){const h=e==="preview-end"?a:s,b=this.trailingPaneResizeRange(e,h,n),P=h+(p>0?p*d:p),C=b.clamp(P);e==="preview-end"?(w=C,this.preferredPreviewWidth=C):(c=C,this.preferredFlyoutWidth=C)}else if(e==="main-preview"){const h=this.mainPreviewResizeRange(a,o,r),b=a-(p-W);w=h.clamp(b),this.preferredPreviewWidth=w;const P=this.mainProbes.minimum,C=this.probeWidth(this.mainMaxWidthProbe),k=this.mainTrackUnbounded()?0:C,g=this.workspaceWidthCapacity(P,k);r>0&&w+c>g.natural+l&&this.requestPreviewNavigationCollapse();const F=this.previewProbes.minimum,A=Math.max(0,F-b),E=h.min<=F+l;if(A>0&&E&&s>0){const O=this.flyoutProbes.minimum,L=this.flyoutProbes.maximum;c=this.clampWidth(s-A,O,L),this.preferredFlyoutWidth=c}else s>0&&(this.preferredFlyoutWidth??=s)}else if(!this.previewVisible)v="main-flyout",c=this.flyoutOnlyResizeRange(s,o).clamp(s-(p-W)),w=0,this.preferredFlyoutWidth=c;else{const h=this.previewProbes.minimum,b=this.previewProbes.maximum,P=this.flyoutProbes.minimum,C=this.flyoutProbes.maximum;if(p>=0){const k=Math.max(0,s-P),g=Math.min(p,u),F=Math.max(0,p-g),A=g*d+F,E=k+n;w=this.clampWidth(a+A,h,Math.min(b,a+E));const O=Math.max(0,w-a),L=Math.min(O,n);c=s-Math.min(Math.max(0,O-L),k)}else{const k=this.previewFlyoutResizeRange(a,s),g=a+p;w=k.clamp(g),c=a+s-w;const F=Math.max(0,h-g),A=k.min<=h+l;if(F>0&&A){const E=this.mainProbes.minimum,O=Math.max(0,o-E);c=this.clampWidth(c+Math.min(F,O),P,C)}}this.preferredPreviewWidth=w,this.preferredFlyoutWidth=c}this.setWorkspaceWidths(w,c,!0),this.requestUpdate(),this.previewVisible&&this.setPreviewLayoutState(!0,!0),i==="keyboard"&&(this.toggleAttribute("data-workspace-keyboard-adjusting",!0),this.deferWorkspaceKeyboardSettlement()),this.dispatchEvent(new CustomEvent(he.PAGE_WORKSPACE_RESIZE,{bubbles:!0,composed:!0,detail:{separator:v,source:i,previewWidth:w,flyoutWidth:c}}))}appliedSeparatorInlineDelta(e){if(e.separator==="preview-end"){const a=this.allocatedPreviewWidth-e.startPreviewWidth;return a>0?a/e.trailingExpansionScale:a}if(e.separator==="flyout-end"){const a=this.allocatedFlyoutWidth-e.startFlyoutWidth;return a>0?a/e.trailingExpansionScale:a}if(e.separator==="main-preview")return e.trailingGroupPushDelta+e.startPreviewWidth-this.allocatedPreviewWidth+(e.startFlyoutWidth-this.allocatedFlyoutWidth);const t=e.startFlyoutWidth-this.allocatedFlyoutWidth;if(!this.previewVisible)return e.trailingGroupPushDelta+t;if(this.allocatedPreviewWidth<e.startPreviewWidth)return t;const i=Math.max(0,this.allocatedPreviewWidth+this.allocatedFlyoutWidth-e.startPreviewWidth-e.startFlyoutWidth);return t+i/e.trailingExpansionScale}clearWorkspaceRecenteringState(){this.workspaceRecenteringFrame.cancel(),this.workspaceRecenteringTimer!==null&&(clearTimeout(this.workspaceRecenteringTimer),this.workspaceRecenteringTimer=null),this.toggleAttribute("data-workspace-position-held",!1),this.style.removeProperty("--_esp-page-resize-leading-gutter-width")}holdWorkspacePosition(){const e=this.workspaceLogicalGutterWidths().leading;return this.clearWorkspaceRecenteringState(),this.style.setProperty("--_esp-page-resize-leading-gutter-width",`${e}px`),this.toggleAttribute("data-workspace-position-held",!0),e}trackWorkspaceResizePointer(e){const t=e.startHandleClientX+this.appliedSeparatorInlineDelta(e)*e.direction;for(let i=0;i<3;i+=1){const a=e.target.getBoundingClientRect(),s=a.left+a.width/2,o=(t-s)*e.direction;if(Math.abs(o)<=.25)return;const r=Math.max(0,e.heldLeadingGutterWidth+o);if(Math.abs(r-e.heldLeadingGutterWidth)<=.25)return;e.heldLeadingGutterWidth=r,this.style.setProperty("--_esp-page-resize-leading-gutter-width",`${e.heldLeadingGutterWidth}px`)}}seedWorkspaceResizeLeadingGutter(e){if(this.align==="start")return!1;const t=this.appliedSeparatorInlineDelta(e);if(t<=0)return!1;let i=0;if(e.separator==="preview-end"||e.separator==="flyout-end")i=this.allocatedPreviewWidth-e.startPreviewWidth+this.allocatedFlyoutWidth-e.startFlyoutWidth;else if(e.separator==="preview-flyout"&&this.previewVisible)i=this.allocatedPreviewWidth-e.startPreviewWidth;else{const a=Math.max(0,e.startPreviewWidth-this.allocatedPreviewWidth+e.startFlyoutWidth-this.allocatedFlyoutWidth),s=this.probeWidth(this.mainMaxWidthProbe),o=this.mainTrackUnbounded()?Number.POSITIVE_INFINITY:Math.max(0,s-e.startMainWidth);i=Math.min(e.trailingGroupPushDelta+a,o)}return e.heldLeadingGutterWidth=Math.max(0,e.startLeadingGutterWidth+t-i),this.style.setProperty("--_esp-page-resize-leading-gutter-width",`${e.heldLeadingGutterWidth}px`),!0}finishWorkspaceRecentering(){this.clearWorkspaceRecenteringState(),this.syncTrailingWorkspaceResizeAvailability(),this.isConnected&&this.scheduleWorkspaceSettlement()}beginWorkspaceRecentering(){const e=this.workspaceLogicalGutterWidths(),t=e.leading+e.trailing,i=this.align==="center"?t/2:this.align==="end"?t:0;if(Math.abs(i-e.leading)<=l){this.finishWorkspaceRecentering();return}this.pendingRecenterLeading=i,this.workspaceRecenteringFrame.restart()}applyWorkspaceRecentering(){this.resizeSession||!this.hasAttribute("data-workspace-position-held")||(this.style.setProperty("--_esp-page-resize-leading-gutter-width",`${this.pendingRecenterLeading}px`),this.workspaceRecenteringTimer=setTimeout(()=>this.finishWorkspaceRecentering(),We+xe))}endWorkspaceResize(){const e=this.resizeSession;this.resizeSession=null,this.toggleAttribute("data-workspace-resizing",!1),e?.target.hasPointerCapture?.(e.pointerId)&&e.target.releasePointerCapture(e.pointerId),e&&this.beginWorkspaceRecentering()}previewFitsWithinPage(e,t,i,a,s,o){const r=this.shadowRoot?.querySelector(".esp-page-main"),n=this.shadowRoot?.querySelector(".esp-page-preview"),d=this.shadowRoot?.querySelector(".esp-page-flyout");if(!r||!n||!d)return!1;const m=this.visiblePageInlineBounds(),p=r.getBoundingClientRect(),u=n.getBoundingClientRect(),y=d.getBoundingClientRect(),W=Math.max(t,i),v=Math.max(s,o),w=u.width+l>=t&&u.width<=W+l,c=!a||y.width+l>=s&&y.width<=v+l,h=u.left+l>=m.left&&u.right<=m.right+l&&(!a||y.left+l>=m.left&&y.right<=m.right+l),b=getComputedStyle(this).direction==="rtl"?p.left+l>=u.right&&(!a||u.left+l>=y.right):p.right<=u.left+l&&(!a||u.right<=y.left+l);return p.width+l>=e&&w&&c&&h&&b}flyoutFitsWithinPage(e,t,i){const a=this.shadowRoot?.querySelector(".esp-page-main"),s=this.shadowRoot?.querySelector(".esp-page-flyout");if(!a||!s)return!1;const o=this.visiblePageInlineBounds(),r=a.getBoundingClientRect(),n=s.getBoundingClientRect(),d=Math.max(t,i),m=n.width+l>=t&&n.width<=d+l,p=n.left+l>=o.left&&n.right<=o.right+l,u=getComputedStyle(this).direction==="rtl"?r.left+l>=n.right:r.right<=n.left+l;return r.width+l>=e&&m&&p&&u}workspaceMinimumsCanFit(e,t,i,a,s){const o=this.visiblePageInlineBounds().width;if(o<=0||e<=0||t&&i<=0||a&&s<=0)return!1;const r=this.shadowRoot?.querySelector(".esp-page-left")?.getBoundingClientRect().width??0,n=this.shadowRoot?.querySelector(".esp-page-right")?.getBoundingClientRect().width??0,m=(t&&this.getPreviewNavigationPair()!==null?0:r)+n+e+(t?i:0)+(a?s:0);return o+l>=m}workspaceGeometrySample(){const e=this.visiblePageInlineBounds(),t=this.shadowRoot?.querySelector(".esp-page-main")?.getBoundingClientRect(),i=this.shadowRoot?.querySelector(".esp-page-preview")?.getBoundingClientRect(),a=this.shadowRoot?.querySelector(".esp-page-flyout")?.getBoundingClientRect();return[e.left,e.right,e.width,t?.left??0,t?.right??0,t?.width??0,i?.left??0,i?.right??0,i?.width??0,a?.left??0,a?.right??0,a?.width??0]}workspaceGeometryMatches(e,t){return e.length===t.length&&e.every((i,a)=>Math.abs(i-(t[a]??i))<=l)}workspaceCandidateIsMeasurable(e,t){const i=this.shadowRoot?.querySelector(".esp-page-preview")?.getBoundingClientRect().width??0,a=this.shadowRoot?.querySelector(".esp-page-flyout")?.getBoundingClientRect().width??0;return(!e||i>l)&&(!t||a>l)}async candidateFitsAfterLayoutSettles(e,t,i){if(await this.updateComplete,e!==this.previewSyncGeneration||!this.isConnected)return null;let a=null,s=0;for(let o=0;o<ve;o+=1){if(await new Promise(n=>requestAnimationFrame(()=>n())),e!==this.previewSyncGeneration||!this.isConnected)return null;if(t())return!0;if(!i()){a=null,s=0;continue}const r=this.workspaceGeometrySample();if(s=a&&this.workspaceGeometryMatches(a,r)?s+1:1,s>=me)return!1;a=r}return null}async promoteFlyoutIfClipped(e,t,i,a){if(i<=0)return!1;const s=await this.candidateFitsAfterLayoutSettles(e,()=>this.flyoutFitsWithinPage(t,i,a),()=>this.workspaceCandidateIsMeasurable(!1,!0));return s===null?!0:s?!1:(await this.promoteFlyoutToOverlay(),!0)}async promoteFlyoutToOverlay(){this.setPreviewLayoutState(!1,!1),this.setWorkspaceWidths(0,0),this.flyoutOverlayPromotionWidth===null&&(this.flyoutOverlayPromotionWidth=this.visiblePageInlineBounds().width,this.armFlyoutOverlayRecovery()),await this.setPageFlyoutOverlay(!0)}async syncPreviewLayout(e,t=!0){if(e!==this.previewSyncGeneration||!this.isConnected||this.resizeSession||this.hasAttribute("data-workspace-keyboard-adjusting")||this.hasAttribute("data-workspace-position-held"))return;let i=!1;const a=this.previewVisible;this.toggleAttribute("data-preview-measuring",!0);try{const s=this.previewOpen&&this.previewHasContent(),o=this.previewMediaQuery?.matches??!1,r=this.hasAttribute("flyout-overlay-open"),n=this.hasAttribute("flyout-open"),d=this.hasAttribute("data-preview-navigation-collapsed"),m=this.getPreviewNavigationPair(),p=m===null?0:d?this.previewCollapsedSidebarWidth:this.shadowRoot?.querySelector(".esp-page-left")?.getBoundingClientRect().width??0,u=this.probeWidth(this.previewMinWidthProbe),y=this.optionalWidth("--esp-page-preview-default-width",this.previewDefaultWidthProbe),W=this.probeWidth(this.previewMaxWidthProbe),v=this.probeWidth(this.flyoutMinWidthProbe),w=this.optionalWidth("--esp-page-flyout-default-width",this.flyoutDefaultWidthProbe),c=this.probeWidth(this.flyoutMaxWidthProbe),h=this.probeWidth(this.mainMinWidthProbe);this.syncMainMaximumConfiguration();const b=this.probeWidth(this.mainMaxWidthProbe),P=this.mainTrackUnbounded()?0:b,C=this.openAutoFlyouts().some(S=>S.pageOverlayRequested===!0);if(this.setPreviewLayoutState(!1,!1),this.setWorkspaceWidths(0,0),C){const S=this.visiblePageInlineBounds().width,T=this.flyoutOverlayPromotionWidth===null||S>=this.flyoutOverlayPromotionWidth+we;!o&&t&&this.flyoutOverlayRecoveryReady&&T&&this.workspaceMinimumsCanFit(h,s,u,!0,v)?await this.setPageFlyoutOverlay(!1):o&&await this.setPageFlyoutOverlay(!1);return}if(await this.updateComplete,e!==this.previewSyncGeneration)return;const k=s&&!o&&!r,g=n&&!o;if(h>0&&(!k||u>0)&&(!g||v>0)&&(k||g)&&!this.workspaceMinimumsCanFit(h,k,u,g,v)){g&&await this.promoteFlyoutToOverlay();return}const A=(k?u:0)+(g?v:0),L=k&&this.preferredPreviewWidth!==null||g&&this.preferredFlyoutWidth!==null||(k&&y!==null||g&&w!==null),j=(k?this.preferredPreviewWidth===null?u:this.clampWidth(this.preferredPreviewWidth,u,W):0)+(g?this.preferredFlyoutWidth===null?v:this.clampWidth(this.preferredFlyoutWidth,v,c):0),f=S=>{const T=this.workspaceTargetWidth(S,A,j),B=this.allocateWorkspaceWidths(T,k,g,u,W,v,c,y,w),K=S.maximum+h,Z=Math.max(0,K-S.natural),se=B.previewWidth+B.flyoutWidth,J=Math.max(0,Math.min(Z,K-se));return{allocation:B,mainWidth:J,reclaimsMain:J+l<Z}},D=(S,T)=>Math.abs(S.mainWidth-T.mainWidth)>l||Math.abs(S.allocation.previewWidth-T.allocation.previewWidth)>l||Math.abs(S.allocation.flyoutWidth-T.allocation.flyoutWidth)>l,V=this.workspaceWidthCapacity(h,P,d?p:0),I=f(V);let $=I.allocation;if(this.setWorkspaceWidths($.previewWidth,$.flyoutWidth,L),!k||u<=0){g&&await this.promoteFlyoutIfClipped(e,h,v,c);return}if(m!==null&&p>l){const S=V.maximum+h,T=this.workspaceWidthCapacityForAvailable(S+p,h,P),B=f(T);(d?D(f(this.workspaceWidthCapacityForAvailable(Math.max(0,S-fe),h,P)),B):I.reclaimsMain&&D(I,B))?i=await this.setPreviewNavigationCollapse(!0):await this.setPreviewNavigationCollapse(!1)}else await this.setPreviewNavigationCollapse(!1);if(e!==this.previewSyncGeneration)return;const Y=this.workspaceWidthCapacity(h,P);if(Y.maximum+l<A){this.setPreviewLayoutState(!1,!1),this.setWorkspaceWidths(0,g?v:0),i=!1,g&&await this.promoteFlyoutToOverlay();return}const X=f(Y);if($=X.allocation,this.setWorkspaceWidths($.previewWidth,$.flyoutWidth,L),a||this.toggleAttribute("data-preview-validating",!0),this.setPreviewLayoutState(!0,X.reclaimsMain),await this.updateComplete,e!==this.previewSyncGeneration)return;const Q=await this.candidateFitsAfterLayoutSettles(e,()=>this.previewFitsWithinPage(h,u,W,g,v,c),()=>this.workspaceCandidateIsMeasurable(!0,g));if(Q===null)return;Q?this.toggleAttribute("data-preview-validating",!1):(this.setPreviewLayoutState(!1,!1),this.setWorkspaceWidths(0,g?v:0),i=!1,g&&await this.promoteFlyoutToOverlay())}finally{e===this.previewSyncGeneration&&!i&&await this.setPreviewNavigationCollapse(!1),e===this.previewSyncGeneration&&(this.toggleAttribute("data-preview-measuring",!1),this.toggleAttribute("data-preview-validating",!1),this.syncTrailingWorkspaceResizeAvailability(),this.requestUpdate())}}runScheduledPreviewLayout(){const e=this.previewSyncGeneration,t=this.previewOverlayRecoveryRequested;this.previewOverlayRecoveryRequested=!1,this.previewSyncTask=this.previewSyncTask.then(()=>this.syncPreviewLayout(e,t)).catch(()=>{})}setupPreviewLayoutObserver(){if(this.isConnected){if(!this.previewMediaQuery&&typeof window.matchMedia=="function"&&(this.previewMediaQuery=window.matchMedia(ge),this.previewMediaQuery.addEventListener("change",this.onPreviewMediaChange)),!this.previewResizeObserver&&typeof ResizeObserver<"u"){this.previewResizeObserver=new ResizeObserver(this.onPreviewResize),this.previewResizeObserver.observe(this);const e=this.shadowRoot?.querySelector(".esp-page-left");e&&this.previewResizeObserver.observe(e);for(const t of[this.previewMinWidthProbe,this.previewDefaultWidthProbe,this.previewMaxWidthProbe,this.flyoutMinWidthProbe,this.flyoutDefaultWidthProbe,this.flyoutMaxWidthProbe,this.mainMinWidthProbe,this.mainConfiguredMaxWidthProbe,this.mainMaxWidthProbe,this.resizeStepProbe,this.resizeLargeStepProbe])t.value&&this.previewResizeObserver.observe(t.value)}this.schedulePreviewLayout(!0)}}footerElementProvidesLandmark(e){return e.matches(ae)||e.querySelector(ae)!==null}syncFooterLandmark(){const t=(this.footerSlot.value?.assignedElements({flatten:!0})??[]).some(i=>this.footerElementProvidesLandmark(i));this.footerWrapperIsLandmark=!t}showPreview(){this.previewOpen=!0}closePreview(){this.previewOpen=!1}togglePreview(){this.previewOpen=!this.previewOpen}AddDialog(e){this.dialogZone.value?.appendChild(e)}firstUpdated(e){super.firstUpdated(e),this.syncFlyoutState(),this.setupPreviewLayoutObserver()}updated(e){super.updated(e),(e.has("fixedMenus")||e.has("headerPosition"))&&pe().publish("fixed-menus-changed",{fixed:this.fixedMenus||this.headerPosition==="fixed"}),(e.has("previewOpen")||e.has("previewCollapseSidebar")||e.has("align"))&&this.schedulePreviewLayout(!0),e.has("workspaceResizable")&&!this.workspaceResizable&&(this.finishWorkspaceKeyboardResize(),this.endWorkspaceResize(),this.clearWorkspaceRecenteringState()),this.warnSiteRailSlots()}warnSiteRailSlots(){this.kind!=="site"||this.warnedSiteRails||!["sidebar","right"].some(t=>(this.shadowRoot?.querySelector(`slot[name="${t}"]`)?.assignedElements({flatten:!0}).length??0)>0)||(this.warnedSiteRails=!0,console.warn('Espalier page: kind="site" does not compose with the sidebar/right rails \u2014 sections span the full viewport and the shared well column ignores rail width. Use kind="wide" for railed layouts, or remove the rail slots from a site page.'))}render(){const e=this.fixedMenus||this.headerPosition==="fixed",t=!e&&this.headerPosition==="sticky",i=this.mainPreviewResizeRange(),a=this.previewProbes.minimum,s=this.flyoutProbes.minimum,o=this.flyoutProbes.maximum,r=this.mainProbes.minimum,n=this.probeWidth(this.mainMaxWidthProbe),d=this.shadowRoot?.querySelector(".esp-page-main")?.getBoundingClientRect().width??0,m=this.hasAttribute("flyout-open"),p=d+this.allocatedPreviewWidth,u=i.min<=a+l,y=m&&u?Math.max(0,this.allocatedFlyoutWidth-s):0,W=Math.max(r,p-i.max),v=Math.max(W,Math.max(r,p-i.min)+y),w=n>0?Math.max(W,Math.min(Math.max(r,n),v)):v,c=n>0&&d+l>=n?`${Math.round(d)}px main, ${Math.round(this.allocatedPreviewWidth)}px preview`:ee;let h,b;if(this.previewVisible){const f=this.previewFlyoutResizeRange(),D=this.allocatedPreviewWidth+this.allocatedFlyoutWidth,I=f.min<=a+l?Math.max(0,d-r):0;h=Math.max(s,D-f.max),b=Math.max(h,Math.min(o,D-f.min+I))}else{const f=this.flyoutOnlyResizeRange();h=f.min,b=f.max}const P=this.previewVisible?"preview-flyout-resize-handle":"main-flyout-resize-handle",C=this.previewVisible?"Resize preview and help panes":"Resize help pane",k=this.previewVisible?`${Math.round(this.allocatedPreviewWidth)}px preview, ${Math.round(this.allocatedFlyoutWidth)}px help`:`${Math.round(this.allocatedFlyoutWidth)}px help`,g=m?"flyout-end":"preview-end",F=g==="flyout-end"?this.allocatedFlyoutWidth:this.allocatedPreviewWidth,A=this.workspaceLogicalGutterWidths(),E=this.trailingPaneResizeRange(g,F,A.leading+A.trailing),O=g==="flyout-end"?"flyout-end-resize-handle":"preview-end-resize-handle",L=g==="flyout-end"?"Resize help pane from its outer edge":"Resize preview pane from its outer edge";return oe`
      <div part="wrapper" class="esp-page ${le({"fixed-menus":e,"fixed-header":e,"sticky-header":t})}">
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
              ${z(this.flyoutSlot)}
              @slotchange=${()=>this.syncFlyoutState()}
            ></slot>
          </div>
        </div>
        <div
          class="esp-page-preview-width-probe esp-page-preview-min-width-probe"
          aria-hidden="true"
          ${z(this.previewMinWidthProbe)}
        ></div>
        <div
          class="esp-page-preview-default-width-probe"
          aria-hidden="true"
          ${z(this.previewDefaultWidthProbe)}
        ></div>
        <div
          class="esp-page-preview-max-width-probe"
          aria-hidden="true"
          ${z(this.previewMaxWidthProbe)}
        ></div>
        <div
          class="esp-page-flyout-min-width-probe"
          aria-hidden="true"
          ${z(this.flyoutMinWidthProbe)}
        ></div>
        <div
          class="esp-page-flyout-default-width-probe"
          aria-hidden="true"
          ${z(this.flyoutDefaultWidthProbe)}
        ></div>
        <div
          class="esp-page-flyout-max-width-probe"
          aria-hidden="true"
          ${z(this.flyoutMaxWidthProbe)}
        ></div>
        <div
          class="esp-page-preview-main-min-probe esp-page-main-min-width-probe"
          aria-hidden="true"
          ${z(this.mainMinWidthProbe)}
        ></div>
        <div
          class="esp-page-main-configured-max-width-probe"
          aria-hidden="true"
          ${z(this.mainConfiguredMaxWidthProbe)}
        ></div>
        <div
          class="esp-page-main-max-width-probe"
          aria-hidden="true"
          ${z(this.mainMaxWidthProbe)}
        ></div>
        <div
          class="esp-page-resize-step-probe"
          aria-hidden="true"
          ${z(this.resizeStepProbe)}
        ></div>
        <div
          class="esp-page-resize-large-step-probe"
          aria-hidden="true"
          ${z(this.resizeLargeStepProbe)}
        ></div>
        <div class="esp-page-preview-space" ${z(this.previewSpace)}>
          <aside part="preview" class="esp-page-preview" aria-label=${this.previewLabel}>
            <div part="preview-content" class="sticky-wrapper">
              <slot
                name="preview"
                ${z(this.previewSlot)}
                @slotchange=${this.schedulePreviewLayout}
              ></slot>
            </div>
          </aside>
        </div>
        <div class="esp-page-workspace-resize-handles">
          <div
            part="main-preview-resize-handle"
            class="esp-page-workspace-resize-handle esp-page-main-preview-resize-handle"
            role="separator"
            aria-orientation="vertical"
            aria-label="Resize main pane"
            aria-valuemin=${Math.round(W)}
            aria-valuemax=${Math.round(w)}
            aria-valuenow=${Math.round(d)}
            aria-valuetext=${c}
            tabindex="0"
            @pointerdown=${f=>this.onWorkspaceResizePointerDown("main-preview",f)}
            @pointermove=${this.onWorkspaceResizePointerMove}
            @pointerup=${this.onWorkspaceResizePointerEnd}
            @pointercancel=${this.onWorkspaceResizePointerEnd}
            @lostpointercapture=${this.onWorkspaceResizePointerEnd}
            @keydown=${f=>this.onWorkspaceResizeKeyDown("main-preview",f)}
            @blur=${this.onWorkspaceResizeBlur}
          ></div>
          <div
            part=${P}
            class="esp-page-workspace-resize-handle esp-page-preview-flyout-resize-handle"
            role="separator"
            aria-orientation="vertical"
            aria-label=${C}
            aria-valuemin=${Math.round(h)}
            aria-valuemax=${Math.round(b)}
            aria-valuenow=${Math.round(this.allocatedFlyoutWidth)}
            aria-valuetext=${k}
            tabindex="0"
            @pointerdown=${f=>this.onWorkspaceResizePointerDown("preview-flyout",f)}
            @pointermove=${this.onWorkspaceResizePointerMove}
            @pointerup=${this.onWorkspaceResizePointerEnd}
            @pointercancel=${this.onWorkspaceResizePointerEnd}
            @lostpointercapture=${this.onWorkspaceResizePointerEnd}
            @keydown=${f=>this.onWorkspaceResizeKeyDown("preview-flyout",f)}
            @blur=${this.onWorkspaceResizeBlur}
          ></div>
          <div
            part=${O}
            class="esp-page-workspace-resize-handle esp-page-workspace-end-resize-handle"
            role="separator"
            aria-orientation="vertical"
            aria-label=${L}
            aria-valuemin=${Math.round(E.min)}
            aria-valuemax=${Math.round(E.max)}
            aria-valuenow=${Math.round(F)}
            tabindex="0"
            @pointerdown=${f=>this.onWorkspaceResizePointerDown(g,f)}
            @pointermove=${this.onWorkspaceResizePointerMove}
            @pointerup=${this.onWorkspaceResizePointerEnd}
            @pointercancel=${this.onWorkspaceResizePointerEnd}
            @lostpointercapture=${this.onWorkspaceResizePointerEnd}
            @keydown=${f=>this.onWorkspaceResizeKeyDown(g,f)}
            @blur=${this.onWorkspaceResizeBlur}
          ></div>
        </div>
        <div class="esp-page-footer" role=${this.footerWrapperIsLandmark?"contentinfo":ee}>
          <slot name="footer" ${z(this.footerSlot)} @slotchange=${this.syncFooterLandmark}></slot>
        </div>
        <div id="dialog-drop-zone" ${z(this.dialogZone)}></div>
        <esp-toaster></esp-toaster>
      </div>
    `}};x.styles=[...te.styles,re`
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
        --_esp-page-workspace-track: minmax(
          calc(var(--_esp-page-flyout-min) + var(--_esp-page-preview-min)),
          calc(var(--_esp-page-preview-used-width) + var(--_esp-page-flyout-used-width))
        );
        
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
      }

      :host([kind="full"]:not([data-main-max-configured])) {
        --_esp-page-main-track: 1fr;
        --_esp-page-gutter-left: 0fr;
        --_esp-page-gutter-right: 0fr;
      }

      
      :host([kind="site"]) {
        --_esp-page-resolved-max-width: none;
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

      
      :host([flyout-open][data-workspace-targeted]) {
        --_esp-page-flyout-min: var(--_esp-page-flyout-used-width);
      }

      :host([preview-reclaiming][data-workspace-targeted]) {
        --_esp-page-preview-min: var(--_esp-page-preview-used-width);
      }

      :host([flyout-open]),
      :host([preview-reclaiming]) {
        --_esp-page-main-track: minmax(
          var(--_esp-page-main-min-width),
          var(--_esp-page-resolved-max-width)
        );
      }

      :host([kind="full"]:not([data-main-max-configured])[flyout-open]),
      :host([kind="full"]:not([data-main-max-configured])[preview-reclaiming]),
      :host([kind="site"][flyout-open]),
      :host([kind="site"][preview-reclaiming]) {
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

        :host([kind="full"]:not([data-main-max-configured])[flyout-open]),
        :host([kind="full"]:not([data-main-max-configured])[preview-reclaiming]),
        :host([kind="site"][flyout-open]),
        :host([kind="site"][preview-reclaiming]) {
          --_esp-page-main-track: 1fr;
        }

        .esp-page > .esp-page-preview-space,
        .esp-page > .esp-page-workspace-resize-handles {
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

      
      :host([flyout-anchored]:not([flyout-full-height]))
        .esp-page
        > div.esp-page-flyout
        > .sticky-wrapper {
        position: static;
      }

      
      :host([flyout-full-height]) .esp-page > div.esp-page-flyout {
        grid-row: top-start / footer-end;
        z-index: calc(var(--esp-page-header-z-index, 20) + 2);
      }

      
      :host([flyout-anchored][preview-visible]) .esp-page > div.esp-page-flyout {
        z-index: calc(var(--esp-page-header-z-index, 20) + 2);
      }

      slot[name="flyout"]::slotted(esp-flyout) {
        --_esp-flyout-used-width: var(--_esp-page-flyout-used-width);
        --_esp-flyout-preview-bridge-width: 0px;
        --_esp-flyout-preview-anchor-display: none;
      }

      :host([preview-visible]) slot[name="flyout"]::slotted(esp-flyout) {
        --_esp-flyout-preview-bridge-width: var(--_esp-page-preview-used-width);
        --_esp-flyout-preview-anchor-display: block;
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

      
      :host([kind="full"]:not([data-main-max-configured]))
        slot[name="header"]::slotted(esp-header) {
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

      :host([kind="full"]:not([data-main-max-configured]))
        slot[name="footer"]::slotted(esp-footer) {
        --esp-footer-content-max-width: 100%;
      }

      
      :host([kind="site"]) slot[name="header"]::slotted(esp-header) {
        --esp-header-content-max-width: var(--esp-page-well-max-width, 72rem);
        --esp-header-content-lead: 0.5;
      }

      :host([kind="site"]) slot[name="footer"]::slotted(esp-footer) {
        --esp-footer-content-max-width: var(--esp-page-well-max-width, 72rem);
        --esp-footer-content-lead: 0.5;
      }

      
      :host([contained]) .esp-page > div.esp-page-top,
      :host([contained]) .esp-page > div.esp-page-footer {
        grid-column: surface;
      }

      
      :host([contained]) slot[name="header"]::slotted(esp-header) {
        --esp-header-shadow: none;
      }

      
      :host([contained]:not([kind="site"])) slot[name="header"]::slotted(esp-header) {
        --esp-header-content-max-width: 100%;
      }

      :host([contained]:not([kind="site"])) slot[name="footer"]::slotted(esp-footer) {
        --esp-footer-content-max-width: 100%;
      }

      :host([kind="narrow"]) .esp-page > div.esp-page-main {
        
        > ::slotted(*) {
          max-inline-size: var(--esp-measure, 66ch);
        }
      }

      #dialog-drop-zone {
        z-index: 4000;
        position: absolute;
      }

      :host([preview-visible]) .esp-page > div.esp-page-preview-space > .esp-page-preview {
        display: block;
      }

      :host([workspace-resizable][preview-visible]:not([flyout-overlay-open]))
        .esp-page
        > div.esp-page-workspace-resize-handles
        > .esp-page-main-preview-resize-handle,
      :host([workspace-resizable][flyout-open]:not([flyout-overlay-open]))
        .esp-page
        > div.esp-page-workspace-resize-handles
        > .esp-page-preview-flyout-resize-handle {
        display: block;
      }

      :host([workspace-resizable][data-workspace-trailing-edge-exposed]:not([flyout-overlay-open]))
        .esp-page
        > div.esp-page-workspace-resize-handles
        > .esp-page-workspace-end-resize-handle,
      :host([workspace-resizable][data-workspace-position-held]:not([flyout-overlay-open]))
        .esp-page
        > div.esp-page-workspace-resize-handles
        > .esp-page-workspace-end-resize-handle {
        display: block;
      }

      
      :host([data-workspace-position-held]) {
        --_esp-page-gutter-left: var(--_esp-page-resize-leading-gutter-width, 0px);
        --_esp-page-gutter-right: 1fr;
      }

      :host([data-workspace-resizing]) {
        cursor: col-resize;
        user-select: none;
      }

      
      :host([data-workspace-resizing]) .esp-page,
      :host([data-workspace-keyboard-adjusting]) .esp-page {
        transition: none;
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
          [right-end surface-end canvas-right-start flyout-start]
          var(--_esp-page-workspace-track)
          [flyout-end] var(--_esp-page-gutter-right)
          [canvas-right-end full-end];
        
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

        
        > div.esp-page-workspace-resize-handles {
          grid-column: flyout;
          grid-row: top-start / footer-end;
          z-index: calc(var(--esp-page-header-z-index, 20) + 3);
          position: relative;
          min-inline-size: 0;
          pointer-events: none;
        }

        > div.esp-page-workspace-resize-handles > .esp-page-workspace-resize-handle {
          display: none;
          box-sizing: border-box;
          position: absolute;
          inset-block: 0;
          z-index: 3;
          inline-size: var(--esp-page-resize-handle-hit-size, 2.75rem);
          margin-inline-start: calc(-0.5 * var(--esp-page-resize-handle-hit-size, 2.75rem));
          border: 0;
          outline: 0;
          background: transparent;
          cursor: col-resize;
          pointer-events: auto;
          touch-action: none;

          
          &::after {
            content: "";
            display: block;
            position: sticky;
            inset-block-start: 0;
            box-sizing: border-box;
            inline-size: 0;
            margin-inline: auto;
            block-size: 100dvh;
            max-block-size: 100%;
            pointer-events: none;
          }

          &:focus-visible::after {
            border-inline-start: var(
              --esp-page-resize-focus-outline,
              2px dashed var(--esp-color-link)
            );
            
            box-shadow: var(--esp-page-resize-focus-shadow, 0 0 0.75rem var(--esp-color-link));
          }
        }

        > div.esp-page-workspace-resize-handles > .esp-page-main-preview-resize-handle {
          inset-inline-start: 0;
        }

        > div.esp-page-workspace-resize-handles > .esp-page-preview-flyout-resize-handle {
          inset-inline-start: var(--_esp-page-preview-used-width);
        }

        > div.esp-page-workspace-resize-handles > .esp-page-workspace-end-resize-handle {
          inset-inline-start: calc(
            var(--_esp-page-preview-used-width) + var(--_esp-page-flyout-used-width)
          );
        }

        
        > .esp-page-preview-min-width-probe,
        > .esp-page-preview-default-width-probe,
        > .esp-page-preview-max-width-probe,
        > .esp-page-flyout-min-width-probe,
        > .esp-page-flyout-default-width-probe,
        > .esp-page-flyout-max-width-probe,
        > .esp-page-main-min-width-probe,
        > .esp-page-main-configured-max-width-probe,
        > .esp-page-main-max-width-probe,
        > .esp-page-resize-step-probe,
        > .esp-page-resize-large-step-probe {
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

        > .esp-page-preview-default-width-probe {
          inline-size: var(--esp-page-preview-default-width, 0px);
        }

        > .esp-page-flyout-min-width-probe {
          inline-size: var(--_esp-page-flyout-resolved-min-width);
        }

        > .esp-page-flyout-max-width-probe {
          inline-size: var(--_esp-page-flyout-resolved-max-width);
        }

        > .esp-page-flyout-default-width-probe {
          inline-size: var(--esp-page-flyout-default-width, 0px);
        }

        > .esp-page-main-min-width-probe {
          inline-size: var(--_esp-page-main-min-width);
        }

        > .esp-page-main-configured-max-width-probe {
          inline-size: var(--esp-page-main-max-width, 0px);
        }

        > .esp-page-main-max-width-probe {
          inline-size: var(--_esp-page-resolved-max-width);
        }

        > .esp-page-resize-step-probe {
          inline-size: var(--esp-page-resize-step, 1rem);
        }

        > .esp-page-resize-large-step-probe {
          inline-size: var(--esp-page-resize-large-step, 4rem);
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
    `],M([H()],x.prototype,"footerWrapperIsLandmark",void 0),M([H()],x.prototype,"allocatedPreviewWidth",void 0),M([H()],x.prototype,"allocatedFlyoutWidth",void 0),M([_({reflect:!0})],x.prototype,"kind",void 0),M([_({reflect:!0})],x.prototype,"align",void 0),M([_({type:Boolean,reflect:!0})],x.prototype,"contained",void 0),M([_({attribute:"header-position",reflect:!0})],x.prototype,"headerPosition",void 0),M([_({attribute:"fixed-menus",type:Boolean,reflect:!0})],x.prototype,"fixedMenus",void 0),M([_({attribute:"preview-open",type:Boolean,reflect:!0})],x.prototype,"previewOpen",void 0),M([_({attribute:"preview-label",type:String,reflect:!0})],x.prototype,"previewLabel",void 0),M([_({attribute:"preview-collapse-sidebar",type:Boolean,reflect:!0})],x.prototype,"previewCollapseSidebar",void 0),M([_({attribute:"workspace-resizable",type:Boolean,reflect:!0})],x.prototype,"workspaceResizable",void 0),M([_({attribute:"preview-visible",type:Boolean,reflect:!0})],x.prototype,"previewVisible",void 0),M([_({attribute:"preview-reclaiming",type:Boolean,reflect:!0})],x.prototype,"previewReclaiming",void 0),x=M([ne("esp-page")],x);export{x as EspalierPage};
