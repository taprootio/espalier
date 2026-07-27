var x=function(_,e,t,i){var s=arguments.length,a=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(_,e,t,i);else for(var o=_.length-1;o>=0;o--)(r=_[o])&&(a=(s<3?r(a):s>3?r(e,t,a):r(e,t))||a);return s>3&&a&&Object.defineProperty(e,t,a),a};import{css as V,html as j,nothing as H}from"lit";import{customElement as U,property as z,state as T}from"lit/decorators.js";import{classMap as Y}from"lit/directives/class-map.js";import{createRef as R,ref as M}from"lit/directives/ref.js";import{EspalierElementBase as I}from"../shared/esp-element-base.js";import{BiDirectionalStickyController as O}from"./bi-directional-sticky-controller.js";import{getEspBus as Q}from"../shared/bus-events.js";import"../toaster/esp-toaster.js";const D='esp-footer, footer, [role~="contentinfo"]',X="(max-width: 50em)",c=1,Z=5,J=12,ee=48,te=16,ie=64,ae=250;let W=class extends I{constructor(){super(),this.dialogZone=R(),this.flyoutSlot=R(),this.footerSlot=R(),this.previewSlot=R(),this.previewSpace=R(),this.previewMinWidthProbe=R(),this.previewDefaultWidthProbe=R(),this.previewMaxWidthProbe=R(),this.flyoutMinWidthProbe=R(),this.flyoutDefaultWidthProbe=R(),this.flyoutMaxWidthProbe=R(),this.mainMinWidthProbe=R(),this.mainMaxWidthProbe=R(),this.resizeStepProbe=R(),this.resizeLargeStepProbe=R(),this.previewObservedWidths=new WeakMap,this.previewSyncRaf=null,this.previewSyncGeneration=0,this.previewSyncTask=Promise.resolve(),this.previewOverlayRecoveryRequested=!1,this.previewHeader=null,this.previewMenu=null,this.previewCollapsedSidebarWidth=0,this.previewNavigationCollapseTask=null,this.flyoutOverlayPromotionWidth=null,this.flyoutOverlayRecoveryReady=!1,this.flyoutOverlayRecoveryGeneration=0,this.preferredPreviewWidth=null,this.preferredFlyoutWidth=null,this.resizeSession=null,this.workspaceKeyboardSettlementTimer=null,this.footerWrapperIsLandmark=!0,this.allocatedPreviewWidth=0,this.allocatedFlyoutWidth=0,this.onWorkspaceResizePointerDown=(e,t)=>{if(t.button!==0||!this.separatorIsAvailable(e))return;const i=t.currentTarget,s=this.shadowRoot?.querySelector(".esp-page-main")?.getBoundingClientRect().width??0,a=this.renderedWorkspaceWidths();this.endWorkspaceResize(),this.finishWorkspaceKeyboardResize(!1),this.suspendPreviewLayoutForWorkspaceResize(),this.resizeSession={separator:e,pointerId:t.pointerId,target:i,startClientX:t.clientX,startPreviewWidth:a.previewWidth,startFlyoutWidth:a.flyoutWidth,startMainWidth:s,startNavigationAllowance:this.previewNavigationResizeAllowance(),direction:this.workspaceResizeDirection()};try{i.setPointerCapture?.(t.pointerId)}catch{}this.toggleAttribute("data-workspace-resizing",!0),t.preventDefault()},this.onWorkspaceResizePointerMove=e=>{const t=this.resizeSession;!t||t.pointerId!==e.pointerId||(e.preventDefault(),this.applyWorkspaceResize(t.separator,e.clientX-t.startClientX,"pointer",t.startPreviewWidth,t.startFlyoutWidth,t.startMainWidth,t.startNavigationAllowance,t.direction))},this.onWorkspaceResizePointerEnd=e=>{!this.resizeSession||this.resizeSession.pointerId!==e.pointerId||(e.preventDefault(),this.endWorkspaceResize())},this.onWorkspaceResizeBlur=e=>{this.hasAttribute("data-workspace-keyboard-adjusting")&&(e.relatedTarget instanceof Element&&e.relatedTarget.classList.contains("esp-page-workspace-resize-handle")||this.finishWorkspaceKeyboardResize())},this.onWorkspaceResizeKeyDown=(e,t)=>{if(t.key!=="ArrowLeft"&&t.key!=="ArrowRight"||!this.separatorIsAvailable(e))return;t.preventDefault(),this.hasAttribute("data-workspace-keyboard-adjusting")||this.suspendPreviewLayoutForWorkspaceResize();const i=(t.key==="ArrowLeft"?-1:1)*this.resizeStep(t.shiftKey),s=this.shadowRoot?.querySelector(".esp-page-main")?.getBoundingClientRect().width??0,a=this.renderedWorkspaceWidths();this.applyWorkspaceResize(e,i,"keyboard",a.previewWidth,a.flyoutWidth,s,this.previewNavigationResizeAllowance(),this.workspaceResizeDirection())},this.schedulePreviewLayout=(e=!1)=>{if(!this.isConnected||!this.hasUpdated||(this.previewOverlayRecoveryRequested||=e===!0,this.resizeSession||this.hasAttribute("data-workspace-keyboard-adjusting")))return;this.previewSyncGeneration+=1;const t=this.previewSyncGeneration;this.previewSyncRaf!==null&&cancelAnimationFrame(this.previewSyncRaf),this.previewSyncRaf=requestAnimationFrame(()=>{this.previewSyncRaf=null;const i=this.previewOverlayRecoveryRequested;this.previewOverlayRecoveryRequested=!1,this.previewSyncTask=this.previewSyncTask.then(()=>this.syncPreviewLayout(t,i)).catch(()=>{})})},this.onPreviewMediaChange=()=>this.schedulePreviewLayout(!0),this.onPreviewResize=e=>{let t=!1;for(const i of e){const s=i.contentRect.width;if(i.target instanceof HTMLElement&&i.target.classList.contains("esp-page-left")){s>c&&!this.hasAttribute("data-preview-navigation-collapsed")&&(this.previewCollapsedSidebarWidth=s);continue}const a=this.previewObservedWidths.get(i.target);this.previewObservedWidths.set(i.target,s),t||=a===void 0||Math.abs(a-s)>.25}t&&this.schedulePreviewLayout(!0)},this.kind="wide",this.align="start",this.contained=!1,this.headerPosition="normal",this.fixedMenus=!1,this.previewOpen=!1,this.previewLabel="Preview",this.previewCollapseSidebar=!1,this.workspaceResizable=!1,this.previewVisible=!1,this.previewReclaiming=!1,new O(this,".esp-page-left > .sticky-wrapper"),new O(this,".esp-page-right > .sticky-wrapper"),new O(this,".esp-page-flyout > .sticky-wrapper"),new O(this,".esp-page-preview > .sticky-wrapper",{topOffset:()=>0}),this.addEventListener("flyout-state-changed",e=>this.syncFlyoutState(e))}connectedCallback(){const e=Array.from(this.children).filter(t=>t.getAttribute("slot")==="footer");this.footerWrapperIsLandmark=!e.some(t=>this.footerElementProvidesLandmark(t)),super.connectedCallback(),this.hasUpdated&&queueMicrotask(()=>this.setupPreviewLayoutObserver())}disconnectedCallback(){this.finishWorkspaceKeyboardResize(!1),this.endWorkspaceResize(),this.previewResizeObserver?.disconnect(),this.previewResizeObserver=void 0,this.previewMediaQuery?.removeEventListener("change",this.onPreviewMediaChange),this.previewMediaQuery=void 0,this.previewSyncRaf!==null&&(cancelAnimationFrame(this.previewSyncRaf),this.previewSyncRaf=null),this.previewSyncGeneration+=1,this.previewOverlayRecoveryRequested=!1,this.toggleAttribute("data-preview-measuring",!1),this.toggleAttribute("data-preview-validating",!1),this.toggleAttribute("data-workspace-keyboard-adjusting",!1),this.toggleAttribute("descendant-flyout-overlay-open",!1),this.clearFlyoutOverlayRecovery(),this.setPreviewLayoutState(!1,!1),this.setWorkspaceWidths(0,0),this.preferredPreviewWidth=null,this.preferredFlyoutWidth=null,this.previewNavigationCollapseTask=null,this.setPreviewNavigationCollapse(!1),super.disconnectedCallback()}syncFlyoutState(e){if(e&&e.target?.closest?.("esp-page")!==this){this.syncDescendantFlyoutOverlayState();return}const t=r=>{const o=r;return(typeof o.mode=="string"?o.mode:r.getAttribute("mode"))==="overlay"||o.pageOverlayRequested===!0},i=r=>{const o=r.open;return typeof o=="boolean"?o:r.hasAttribute("open")},s=r=>r.anchor!=null,a=(this.flyoutSlot.value?.assignedElements()??[]).filter(r=>r.tagName==="ESP-FLYOUT");for(const r of a){const o=r,l=typeof o.mode=="string"?o.mode:r.getAttribute("mode");o.pageOverlayRequested&&(!i(r)||l!=="auto")&&(o.pageOverlayRequested=!1)}a.some(r=>r.pageOverlayRequested===!0)||this.clearFlyoutOverlayRecovery(),this.toggleAttribute("flyout-open",a.some(r=>i(r)&&!t(r))),this.toggleAttribute("flyout-overlay-open",a.some(r=>i(r)&&t(r))),this.toggleAttribute("flyout-anchored",a.some(r=>i(r)&&s(r))),this.resizeSession&&(this.hasAttribute("flyout-overlay-open")||this.resizeSession.separator==="preview-flyout"&&!this.hasAttribute("flyout-open"))&&this.endWorkspaceResize(),this.requestUpdate(),this.schedulePreviewLayout()}syncDescendantFlyoutOverlayState(){const e=Array.from(this.querySelectorAll("esp-flyout")).some(t=>{if(t.closest("esp-page")===this)return!1;const i=t,s=typeof i.open=="boolean"?i.open:t.hasAttribute("open"),a=typeof i.mode=="string"?i.mode:t.getAttribute("mode");return s&&(a==="overlay"||i.pageOverlayRequested===!0||t.getAttribute("aria-modal")==="true")});this.toggleAttribute("descendant-flyout-overlay-open",e)}assignedFlyouts(){return(this.flyoutSlot.value?.assignedElements()??[]).filter(e=>e.tagName==="ESP-FLYOUT")}openAutoFlyouts(){return this.assignedFlyouts().filter(e=>{const t=typeof e.open=="boolean"?e.open:e.hasAttribute("open"),i=typeof e.mode=="string"?e.mode:e.getAttribute("mode");return t&&i!=="overlay"})}async setPageFlyoutOverlay(e){let t=!1;const i=new Set(this.openAutoFlyouts());for(const s of this.assignedFlyouts()){const a=e&&i.has(s);s.pageOverlayRequested!==a&&(s.pageOverlayRequested=a,t=!0)}return t&&await Promise.all(this.assignedFlyouts().map(s=>s.updateComplete??Promise.resolve())),e||this.clearFlyoutOverlayRecovery(),t}clearFlyoutOverlayRecovery(){this.flyoutOverlayPromotionWidth=null,this.flyoutOverlayRecoveryReady=!1,this.flyoutOverlayRecoveryGeneration+=1}armFlyoutOverlayRecovery(){const e=++this.flyoutOverlayRecoveryGeneration;this.flyoutOverlayRecoveryReady=!1,requestAnimationFrame(()=>{requestAnimationFrame(()=>{e!==this.flyoutOverlayRecoveryGeneration||!this.openAutoFlyouts().some(t=>t.pageOverlayRequested===!0)||(this.flyoutOverlayPromotionWidth=this.visiblePageInlineBounds().width,this.flyoutOverlayRecoveryReady=!0)})})}previewHasContent(){const e=this.previewSlot.value?.assignedNodes({flatten:!0});return e?e.some(t=>t.nodeType===Node.ELEMENT_NODE||(t.textContent?.trim().length??0)>0):Array.from(this.childNodes).some(t=>t instanceof Element&&t.getAttribute("slot")==="preview"&&!t.hasAttribute("hidden"))}getPreviewNavigationPair(){if(!this.previewCollapseSidebar)return null;const e=Array.from(this.children),t=e.find(r=>r.slot==="header"&&r.tagName==="ESP-HEADER"),i=e.find(r=>r.slot==="sidebar"&&r.tagName==="ESP-MENU");if(!t||!i||!i.id)return null;const s=typeof t.drawerTarget=="string"?t.drawerTarget:t.getAttribute("drawer-target")??"",a=typeof i.mode=="string"?i.mode:i.getAttribute("mode");return s!==i.id||a!=="vertical"||!("previewCollapseRequested"in t)||!("previewCollapseRequested"in i)?null:{header:t,menu:i}}async setPreviewNavigationCollapse(e){const t=e?this.getPreviewNavigationPair():null,i=t!==null&&this.previewHeader===t.header&&this.previewMenu===t.menu,s=this.previewHeader&&this.previewHeader!==t?.header?this.previewHeader:null,a=this.previewMenu&&this.previewMenu!==t?.menu?this.previewMenu:null;if(s&&(s.previewCollapseRequested=!1),a&&(a.previewCollapseRequested=!1),this.previewHeader=t?.header??null,this.previewMenu=t?.menu??null,this.toggleAttribute("data-preview-navigation-collapsed",!1),await s?.updateComplete,await a?.updateComplete,!t)return!1;const r=i?this.previewCollapsedSidebarWidth:this.shadowRoot?.querySelector(".esp-page-left")?.getBoundingClientRect().width??0;return t.header.previewCollapseRequested=!0,t.menu.previewCollapseRequested=!0,await t.header.updateComplete,await t.menu.updateComplete,t.menu.hasExternalDrawerControl===!0?(this.previewCollapsedSidebarWidth=r,this.toggleAttribute("data-preview-navigation-collapsed",!0),!0):(t.header.previewCollapseRequested=!1,t.menu.previewCollapseRequested=!1,await t.header.updateComplete,await t.menu.updateComplete,this.previewHeader=null,this.previewMenu=null,!1)}requestPreviewNavigationCollapse(){if(this.hasAttribute("data-preview-navigation-collapsed")||this.previewNavigationCollapseTask)return;const e=this.setPreviewNavigationCollapse(!0);this.previewNavigationCollapseTask=e,e.then(()=>{this.previewNavigationCollapseTask===e&&(this.previewNavigationCollapseTask=null)},()=>{this.previewNavigationCollapseTask===e&&(this.previewNavigationCollapseTask=null)})}scheduleWorkspaceSettlement(e=null){const t=()=>{this.schedulePreviewLayout(),e&&requestAnimationFrame(()=>{this.previewSyncTask.then(()=>{const a=this.shadowRoot?.activeElement,r=this.ownerDocument.activeElement;!this.isConnected||!e.isConnected||a&&a!==e||r!==this&&r!==this.ownerDocument.body||getComputedStyle(e).display!=="none"&&e.focus({preventScroll:!0})})})},i=this.previewNavigationCollapseTask;if(!i){t();return}i.then(()=>t(),()=>t())}clearWorkspaceKeyboardSettlementTimer(){this.workspaceKeyboardSettlementTimer!==null&&(clearTimeout(this.workspaceKeyboardSettlementTimer),this.workspaceKeyboardSettlementTimer=null)}finishWorkspaceKeyboardResize(e=!0){this.clearWorkspaceKeyboardSettlementTimer();const t=this.hasAttribute("data-workspace-keyboard-adjusting");this.toggleAttribute("data-workspace-keyboard-adjusting",!1),t&&e&&!this.resizeSession&&this.scheduleWorkspaceSettlement()}deferWorkspaceKeyboardSettlement(){this.clearWorkspaceKeyboardSettlementTimer(),this.workspaceKeyboardSettlementTimer=setTimeout(()=>{if(this.workspaceKeyboardSettlementTimer=null,!this.hasAttribute("data-workspace-keyboard-adjusting"))return;const e=this.shadowRoot?.activeElement,t=e instanceof HTMLElement&&e.classList.contains("esp-page-workspace-resize-handle")?e:null;this.toggleAttribute("data-workspace-keyboard-adjusting",!1),this.resizeSession||this.scheduleWorkspaceSettlement(t)},ae)}suspendPreviewLayoutForWorkspaceResize(){this.previewSyncRaf!==null&&(cancelAnimationFrame(this.previewSyncRaf),this.previewSyncRaf=null),this.previewSyncGeneration+=1,this.toggleAttribute("data-preview-measuring",!1),this.toggleAttribute("data-preview-validating",!1)}setPreviewLayoutState(e,t){this.previewVisible=e,this.previewReclaiming=e&&t,e||this.endWorkspaceResize()}setWorkspaceWidths(e,t,i=!1){const s=Math.max(0,e),a=Math.max(0,t);this.style.setProperty("--_esp-page-preview-used-width",`${s}px`),this.style.setProperty("--_esp-page-flyout-used-width",`${a}px`),this.toggleAttribute("data-workspace-targeted",i),this.allocatedPreviewWidth=s,this.allocatedFlyoutWidth=a}clampWidth(e,t,i){return Math.min(Math.max(e,t),Math.max(t,i))}workspaceUsesPreference(e,t){return e&&this.preferredPreviewWidth!==null||t&&this.preferredFlyoutWidth!==null}preferredWorkspaceWidth(e,t,i,s,a,r){const o=e?this.clampWidth(this.preferredPreviewWidth??i,Math.max(0,i),Math.max(i,s)):0,l=t?this.clampWidth(this.preferredFlyoutWidth??a,Math.max(0,a),Math.max(a,r)):0;return o+l}visiblePageInlineBounds(){const e=this.getBoundingClientRect();let t=e.left,i=e.right;const s=window.visualViewport,a=s?.offsetLeft??0,r=s?.width??document.documentElement.clientWidth;r>0&&(t=Math.max(t,a),i=Math.min(i,a+r));const o=this.getRootNode();let l=this.parentElement??(o instanceof ShadowRoot?o.host:null);for(;l;){const g=getComputedStyle(l).overflowX;if(["auto","clip","hidden","scroll"].includes(g)){const d=l.getBoundingClientRect();t=Math.max(t,d.left),i=Math.min(i,d.right)}const h=l.getRootNode();l=l.parentElement??(h instanceof ShadowRoot?h.host:null)}return{left:t,right:i,width:Math.max(0,i-t)}}visibleSpaceWidth(){const e=this.previewSpace.value?.getBoundingClientRect();if(!e)return 0;const t=this.visiblePageInlineBounds(),i=Math.max(0,t.left-e.left),s=Math.max(0,e.right-t.right);return Math.max(0,e.width-i-s)}probeWidth(e){return e.value?.getBoundingClientRect().width??0}optionalWidth(e,t){return getComputedStyle(this).getPropertyValue(e).trim()===""?null:this.probeWidth(t)}allocateWorkspaceWidths(e,t,i,s,a,r,o,l=null,g=null){const h=Math.max(0,e),d=Math.max(0,s),p=Math.max(d,a),n=Math.max(0,r),w=Math.max(n,o),f=t?this.preferredPreviewWidth??(l===null?null:this.clampWidth(l,d,p)):null,v=i?this.preferredFlyoutWidth??(g===null?null:this.clampWidth(g,n,w)):null;let y=0,b=0;t&&i?(y=Math.min(p,Math.max(d,h-n)),b=Math.min(w,Math.max(n,h-y))):t?y=Math.min(p,Math.max(d,h)):i&&(b=Math.min(w,Math.max(n,h))),t&&f!==null&&(y=this.clampWidth(f,d,p),i&&v===null&&(b=this.clampWidth(h-y,n,w))),i&&v!==null&&(b=this.clampWidth(v,n,w),t&&f===null&&(y=this.clampWidth(h-b,d,p)));let k=y+b-h;if(k>0&&i){const u=Math.min(k,Math.max(0,b-n));b-=u,k-=u}return k>0&&t&&(y-=Math.min(k,Math.max(0,y-d))),{previewWidth:y,flyoutWidth:b}}workspaceResizeDirection(){return getComputedStyle(this).direction==="rtl"?-1:1}resizeStep(e){const t=this.probeWidth(e?this.resizeLargeStepProbe:this.resizeStepProbe);return t>0?t:e?ie:te}previewNavigationResizeAllowance(){if(this.hasAttribute("data-preview-navigation-collapsed")||this.getPreviewNavigationPair()===null)return 0;const e=Math.max(0,this.shadowRoot?.querySelector(".esp-page-left")?.getBoundingClientRect().width??0);return e>c&&(this.previewCollapsedSidebarWidth=e),e>c?e:this.previewCollapsedSidebarWidth}renderedWorkspaceWidths(){const e=this.shadowRoot?.querySelector(".esp-page-preview"),t=this.shadowRoot?.querySelector(".esp-page-flyout");return{previewWidth:this.allocatedPreviewWidth>0?this.allocatedPreviewWidth:e?.getBoundingClientRect().width??0,flyoutWidth:this.allocatedFlyoutWidth>0?this.allocatedFlyoutWidth:t?.getBoundingClientRect().width??0}}mainPreviewResizeRange(e=this.renderedWorkspaceWidths().previewWidth,t=this.shadowRoot?.querySelector(".esp-page-main")?.getBoundingClientRect().width??0,i=this.previewNavigationResizeAllowance()){const s=Math.max(0,this.probeWidth(this.previewMinWidthProbe)),a=Math.max(s,this.probeWidth(this.previewMaxWidthProbe)),r=Math.max(0,this.probeWidth(this.mainMinWidthProbe)),o=this.probeWidth(this.mainMaxWidthProbe),l=Math.max(0,t+e),g=o>0?Math.max(0,l-o):0,h=Math.max(s,g),d=Math.max(0,l+i-r);return{minimum:h,maximum:Math.max(h,Math.min(a,d))}}previewFlyoutResizeRange(e=this.renderedWorkspaceWidths().previewWidth,t=this.renderedWorkspaceWidths().flyoutWidth){const i=Math.max(0,this.probeWidth(this.previewMinWidthProbe)),s=Math.max(i,this.probeWidth(this.previewMaxWidthProbe)),a=Math.max(0,this.probeWidth(this.flyoutMinWidthProbe)),r=Math.max(a,this.probeWidth(this.flyoutMaxWidthProbe)),o=e+t;return{minimum:Math.max(i,o-r),maximum:Math.max(i,Math.min(s,o-a))}}separatorIsAvailable(e){return!this.workspaceResizable||this.hasAttribute("flyout-overlay-open")?!1:e==="main-preview"?this.previewVisible:this.hasAttribute("flyout-open")}flyoutOnlyResizeRange(e=this.renderedWorkspaceWidths().flyoutWidth,t=this.shadowRoot?.querySelector(".esp-page-main")?.getBoundingClientRect().width??0){const i=Math.max(0,this.probeWidth(this.flyoutMinWidthProbe)),s=Math.max(i,this.probeWidth(this.flyoutMaxWidthProbe)),a=Math.max(0,this.probeWidth(this.mainMinWidthProbe)),r=this.probeWidth(this.mainMaxWidthProbe),o=Math.max(0,t+e),l=r>0?Math.max(0,o-r):0,g=Math.max(i,l);return{minimum:g,maximum:Math.max(g,Math.min(s,o-a))}}applyWorkspaceResize(e,t,i,s,a,r,o,l){if(!this.separatorIsAvailable(e))return;const g=t*l;let h=e,d=s,p=a;if(e==="main-preview"){const n=this.mainPreviewResizeRange(s,r,o),w=s-g;d=this.clampWidth(w,n.minimum,n.maximum),this.preferredPreviewWidth=d;const f=Math.max(0,this.probeWidth(this.mainMinWidthProbe));o>0&&d>Math.max(0,r+s-f)+c&&this.requestPreviewNavigationCollapse();const v=Math.max(0,this.probeWidth(this.previewMinWidthProbe)),y=Math.max(0,v-w),b=n.minimum<=v+c;if(y>0&&b&&a>0){const k=Math.max(0,this.probeWidth(this.flyoutMinWidthProbe)),u=Math.max(k,this.probeWidth(this.flyoutMaxWidthProbe));p=this.clampWidth(a-y,k,u),this.preferredFlyoutWidth=p}else a>0&&(this.preferredFlyoutWidth??=a)}else if(this.previewVisible){const n=this.previewFlyoutResizeRange(s,a),w=s+g;d=this.clampWidth(w,n.minimum,n.maximum),p=s+a-d,this.preferredPreviewWidth=d;const f=Math.max(0,this.probeWidth(this.previewMinWidthProbe)),v=Math.max(0,f-w),y=n.minimum<=f+c;if(v>0&&y){const b=Math.max(0,this.probeWidth(this.flyoutMinWidthProbe)),k=Math.max(b,this.probeWidth(this.flyoutMaxWidthProbe)),u=Math.max(0,this.probeWidth(this.mainMinWidthProbe)),m=Math.max(0,r-u);p=this.clampWidth(p+Math.min(v,m),b,k)}this.preferredFlyoutWidth=p}else{h="main-flyout";const n=this.flyoutOnlyResizeRange(a,r);p=this.clampWidth(a-g,n.minimum,n.maximum),d=0,this.preferredFlyoutWidth=p}this.setWorkspaceWidths(d,p,!0),this.previewVisible&&this.setPreviewLayoutState(!0,!0),i==="keyboard"&&(this.toggleAttribute("data-workspace-keyboard-adjusting",!0),this.deferWorkspaceKeyboardSettlement()),this.dispatchEvent(new CustomEvent("esp-page-workspace-resize",{bubbles:!0,composed:!0,detail:{separator:h,source:i,previewWidth:d,flyoutWidth:p}}))}endWorkspaceResize(){const e=this.resizeSession;this.resizeSession=null,this.toggleAttribute("data-workspace-resizing",!1),e?.target.hasPointerCapture?.(e.pointerId)&&e.target.releasePointerCapture(e.pointerId),e&&this.scheduleWorkspaceSettlement()}previewFitsWithinPage(e,t,i,s,a,r){const o=this.shadowRoot?.querySelector(".esp-page-main"),l=this.shadowRoot?.querySelector(".esp-page-preview"),g=this.shadowRoot?.querySelector(".esp-page-flyout");if(!o||!l||!g)return!1;const h=this.visiblePageInlineBounds(),d=o.getBoundingClientRect(),p=l.getBoundingClientRect(),n=g.getBoundingClientRect(),w=Math.max(t,i),f=Math.max(a,r),v=p.width+c>=t&&p.width<=w+c,y=!s||n.width+c>=a&&n.width<=f+c,b=p.left+c>=h.left&&p.right<=h.right+c&&(!s||n.left+c>=h.left&&n.right<=h.right+c),k=getComputedStyle(this).direction==="rtl"?d.left+c>=p.right&&(!s||p.left+c>=n.right):d.right<=p.left+c&&(!s||p.right<=n.left+c);return d.width+c>=e&&v&&y&&b&&k}flyoutFitsWithinPage(e,t,i){const s=this.shadowRoot?.querySelector(".esp-page-main"),a=this.shadowRoot?.querySelector(".esp-page-flyout");if(!s||!a)return!1;const r=this.visiblePageInlineBounds(),o=s.getBoundingClientRect(),l=a.getBoundingClientRect(),g=Math.max(t,i),h=l.width+c>=t&&l.width<=g+c,d=l.left+c>=r.left&&l.right<=r.right+c,p=getComputedStyle(this).direction==="rtl"?o.left+c>=l.right:o.right<=l.left+c;return o.width+c>=e&&h&&d&&p}workspaceMinimumsCanFit(e,t,i,s,a){const r=this.visiblePageInlineBounds().width;if(r<=0||e<=0||t&&i<=0||s&&a<=0)return!1;const o=this.shadowRoot?.querySelector(".esp-page-left")?.getBoundingClientRect().width??0,l=this.shadowRoot?.querySelector(".esp-page-right")?.getBoundingClientRect().width??0,h=(t&&this.getPreviewNavigationPair()!==null?0:o)+l+e+(t?i:0)+(s?a:0);return r+c>=h}preferredWorkspaceFitsWithNavigation(e,t,i){const s=this.visiblePageInlineBounds().width,a=this.shadowRoot?.querySelector(".esp-page-left")?.getBoundingClientRect().width??0,r=this.shadowRoot?.querySelector(".esp-page-right")?.getBoundingClientRect().width??0,o=a+i+r+e+t;return s+c>=o}workspaceGeometrySample(){const e=this.visiblePageInlineBounds(),t=this.shadowRoot?.querySelector(".esp-page-main")?.getBoundingClientRect(),i=this.shadowRoot?.querySelector(".esp-page-preview")?.getBoundingClientRect(),s=this.shadowRoot?.querySelector(".esp-page-flyout")?.getBoundingClientRect();return[e.left,e.right,e.width,t?.left??0,t?.right??0,t?.width??0,i?.left??0,i?.right??0,i?.width??0,s?.left??0,s?.right??0,s?.width??0]}workspaceGeometryMatches(e,t){return e.length===t.length&&e.every((i,s)=>Math.abs(i-(t[s]??i))<=c)}workspaceCandidateIsMeasurable(e,t){const i=this.shadowRoot?.querySelector(".esp-page-preview")?.getBoundingClientRect().width??0,s=this.shadowRoot?.querySelector(".esp-page-flyout")?.getBoundingClientRect().width??0;return(!e||i>c)&&(!t||s>c)}async candidateFitsAfterLayoutSettles(e,t,i){if(await this.updateComplete,e!==this.previewSyncGeneration||!this.isConnected)return null;let s=null,a=0;for(let r=0;r<J;r+=1){if(await new Promise(l=>requestAnimationFrame(()=>l())),e!==this.previewSyncGeneration||!this.isConnected)return null;if(t())return!0;if(!i()){s=null,a=0;continue}const o=this.workspaceGeometrySample();if(a=s&&this.workspaceGeometryMatches(s,o)?a+1:1,a>=Z)return!1;s=o}return null}async promoteFlyoutIfClipped(e,t,i,s){if(i<=0)return!1;const a=await this.candidateFitsAfterLayoutSettles(e,()=>this.flyoutFitsWithinPage(t,i,s),()=>this.workspaceCandidateIsMeasurable(!1,!0));return a===null?!0:a?!1:(await this.promoteFlyoutToOverlay(),!0)}async promoteFlyoutToOverlay(){this.setPreviewLayoutState(!1,!1),this.setWorkspaceWidths(0,0),this.flyoutOverlayPromotionWidth===null&&(this.flyoutOverlayPromotionWidth=this.visiblePageInlineBounds().width,this.armFlyoutOverlayRecovery()),await this.setPageFlyoutOverlay(!0)}async syncPreviewLayout(e,t=!0){if(e!==this.previewSyncGeneration||!this.isConnected||this.resizeSession||this.hasAttribute("data-workspace-keyboard-adjusting"))return;let i=!1;const s=this.previewVisible;this.toggleAttribute("data-preview-measuring",!0);try{const a=this.previewOpen&&this.previewHasContent(),r=this.previewMediaQuery?.matches??!1,o=this.hasAttribute("flyout-overlay-open"),l=this.hasAttribute("flyout-open"),g=this.hasAttribute("data-preview-navigation-collapsed")?this.previewCollapsedSidebarWidth:0,h=this.probeWidth(this.previewMinWidthProbe),d=this.optionalWidth("--esp-page-preview-default-width",this.previewDefaultWidthProbe),p=this.probeWidth(this.previewMaxWidthProbe),n=this.probeWidth(this.flyoutMinWidthProbe),w=this.optionalWidth("--esp-page-flyout-default-width",this.flyoutDefaultWidthProbe),f=this.probeWidth(this.flyoutMaxWidthProbe),v=this.probeWidth(this.mainMinWidthProbe),y=this.openAutoFlyouts().some(S=>S.pageOverlayRequested===!0);if(this.setPreviewLayoutState(!1,!1),this.setWorkspaceWidths(0,0),y){const S=this.visiblePageInlineBounds().width,F=this.flyoutOverlayPromotionWidth===null||S>=this.flyoutOverlayPromotionWidth+ee;!r&&t&&this.flyoutOverlayRecoveryReady&&F&&this.workspaceMinimumsCanFit(v,a,h,!0,n)?await this.setPageFlyoutOverlay(!1):r&&await this.setPageFlyoutOverlay(!1);return}if(this.toggleAttribute("data-preview-navigation-collapsed",!1),await this.updateComplete,e!==this.previewSyncGeneration)return;const b=this.visibleSpaceWidth(),k=Math.max(0,b-g),u=a&&!r&&!o,m=l&&!r;if(v>0&&(!u||h>0)&&(!m||n>0)&&(u||m)&&!this.workspaceMinimumsCanFit(v,u,h,m,n)){m&&await this.promoteFlyoutToOverlay();return}const C=(u?h:0)+(m?n:0),A=this.workspaceUsesPreference(u,m),L=A||(u&&d!==null||m&&w!==null),$=this.preferredWorkspaceWidth(u,m,h,p,n,f),E=A?Math.max(C,$):C;let P=this.allocateWorkspaceWidths(k,u,m,h,p,n,f,d,w);if(this.setWorkspaceWidths(P.previewWidth,P.flyoutWidth,L),!u||h<=0){if(m){if(A){const S=this.shadowRoot?.querySelector(".esp-page-main")?.getBoundingClientRect().width??0,F=Math.max(n,S+k-v);P=this.allocateWorkspaceWidths(F,!1,!0,h,p,n,f,d,w),this.setWorkspaceWidths(0,P.flyoutWidth,!0),await this.updateComplete}await this.promoteFlyoutIfClipped(e,v,n,f)}return}if(k+c>=E){s||this.toggleAttribute("data-preview-validating",!0),this.setPreviewLayoutState(!0,!1);const S=await this.candidateFitsAfterLayoutSettles(e,()=>this.previewFitsWithinPage(v,h,p,m,n,f),()=>this.workspaceCandidateIsMeasurable(!0,m));if(S===null)return;if(S){this.toggleAttribute("data-preview-validating",!1);return}this.setPreviewLayoutState(!1,!1),this.setWorkspaceWidths(0,m?n:0),m&&await this.promoteFlyoutToOverlay();return}const K=this.shadowRoot?.querySelector(".esp-page-main")?.getBoundingClientRect().width??0,B=A?this.preferredWorkspaceFitsWithNavigation(v,E,g):K+k+c>=v+E;if(i=B?!1:await this.setPreviewNavigationCollapse(this.previewCollapseSidebar),B&&await this.setPreviewNavigationCollapse(!1),e!==this.previewSyncGeneration)return;if(A){const S=this.shadowRoot?.querySelector(".esp-page-main")?.getBoundingClientRect().width??0,F=Math.max(C,S+this.visibleSpaceWidth()-v);P=this.allocateWorkspaceWidths(F,!0,m,h,p,n,f,d,w),this.setWorkspaceWidths(P.previewWidth,P.flyoutWidth,!0)}if(s||this.toggleAttribute("data-preview-validating",!0),this.setPreviewLayoutState(!0,!0),await this.updateComplete,e!==this.previewSyncGeneration)return;const G=this.visibleSpaceWidth();P=this.allocateWorkspaceWidths(G,!0,m,h,p,n,f,d,w),this.setWorkspaceWidths(P.previewWidth,P.flyoutWidth,L);const q=await this.candidateFitsAfterLayoutSettles(e,()=>this.previewFitsWithinPage(v,h,p,m,n,f),()=>this.workspaceCandidateIsMeasurable(!0,m));if(q===null)return;q?this.toggleAttribute("data-preview-validating",!1):(this.setPreviewLayoutState(!1,!1),this.setWorkspaceWidths(0,m?n:0),i=!1,m&&await this.promoteFlyoutToOverlay())}finally{e===this.previewSyncGeneration&&!i&&await this.setPreviewNavigationCollapse(!1),e===this.previewSyncGeneration&&(this.toggleAttribute("data-preview-measuring",!1),this.toggleAttribute("data-preview-validating",!1),this.requestUpdate())}}setupPreviewLayoutObserver(){if(this.isConnected){if(!this.previewMediaQuery&&typeof window.matchMedia=="function"&&(this.previewMediaQuery=window.matchMedia(X),this.previewMediaQuery.addEventListener("change",this.onPreviewMediaChange)),!this.previewResizeObserver&&typeof ResizeObserver<"u"){this.previewResizeObserver=new ResizeObserver(this.onPreviewResize),this.previewResizeObserver.observe(this);const e=this.shadowRoot?.querySelector(".esp-page-left");e&&this.previewResizeObserver.observe(e);for(const t of[this.previewMinWidthProbe,this.previewDefaultWidthProbe,this.previewMaxWidthProbe,this.flyoutMinWidthProbe,this.flyoutDefaultWidthProbe,this.flyoutMaxWidthProbe,this.mainMinWidthProbe,this.resizeStepProbe,this.resizeLargeStepProbe])t.value&&this.previewResizeObserver.observe(t.value)}this.schedulePreviewLayout(!0)}}footerElementProvidesLandmark(e){return e.matches(D)||e.querySelector(D)!==null}syncFooterLandmark(){const t=(this.footerSlot.value?.assignedElements({flatten:!0})??[]).some(i=>this.footerElementProvidesLandmark(i));this.footerWrapperIsLandmark=!t}showPreview(){this.previewOpen=!0}closePreview(){this.previewOpen=!1}togglePreview(){this.previewOpen=!this.previewOpen}AddDialog(e){this.dialogZone.value?.appendChild(e)}firstUpdated(e){super.firstUpdated(e),this.syncFlyoutState(),this.setupPreviewLayoutObserver()}updated(e){super.updated(e),(e.has("fixedMenus")||e.has("headerPosition"))&&Q().publish("fixed-menus-changed",{fixed:this.fixedMenus||this.headerPosition==="fixed"}),(e.has("previewOpen")||e.has("previewCollapseSidebar"))&&this.schedulePreviewLayout(!0),e.has("workspaceResizable")&&!this.workspaceResizable&&(this.finishWorkspaceKeyboardResize(),this.endWorkspaceResize())}render(){const e=this.fixedMenus||this.headerPosition==="fixed",t=!e&&this.headerPosition==="sticky",i=this.mainPreviewResizeRange(),s=Math.max(0,this.probeWidth(this.previewMinWidthProbe)),a=Math.max(0,this.probeWidth(this.flyoutMinWidthProbe)),r=Math.max(a,this.probeWidth(this.flyoutMaxWidthProbe)),o=Math.max(0,this.probeWidth(this.mainMinWidthProbe)),l=this.shadowRoot?.querySelector(".esp-page-main")?.getBoundingClientRect().width??0,g=this.hasAttribute("flyout-open"),h=l+this.allocatedPreviewWidth,d=i.minimum<=s+c,p=g&&d?Math.max(0,this.allocatedFlyoutWidth-a):0,n=Math.max(o,h-i.maximum),w=Math.max(n,Math.max(o,h-i.minimum)+p);let f,v;if(this.previewVisible){const u=this.previewFlyoutResizeRange(),m=this.allocatedPreviewWidth+this.allocatedFlyoutWidth,C=u.minimum<=s+c?Math.max(0,l-o):0;f=Math.max(a,m-u.maximum),v=Math.max(f,Math.min(r,m-u.minimum+C))}else{const u=this.flyoutOnlyResizeRange();f=u.minimum,v=u.maximum}const y=this.previewVisible?"preview-flyout-resize-handle":"main-flyout-resize-handle",b=this.previewVisible?"Resize preview and help panes":"Resize help pane";return j`
      <div part="wrapper" class="esp-page ${Y({"fixed-menus":e,"fixed-header":e,"sticky-header":t})}">
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
              ${M(this.flyoutSlot)}
              @slotchange=${()=>this.syncFlyoutState()}
            ></slot>
          </div>
        </div>
        <div
          class="esp-page-preview-width-probe esp-page-preview-min-width-probe"
          aria-hidden="true"
          ${M(this.previewMinWidthProbe)}
        ></div>
        <div
          class="esp-page-preview-default-width-probe"
          aria-hidden="true"
          ${M(this.previewDefaultWidthProbe)}
        ></div>
        <div
          class="esp-page-preview-max-width-probe"
          aria-hidden="true"
          ${M(this.previewMaxWidthProbe)}
        ></div>
        <div
          class="esp-page-flyout-min-width-probe"
          aria-hidden="true"
          ${M(this.flyoutMinWidthProbe)}
        ></div>
        <div
          class="esp-page-flyout-default-width-probe"
          aria-hidden="true"
          ${M(this.flyoutDefaultWidthProbe)}
        ></div>
        <div
          class="esp-page-flyout-max-width-probe"
          aria-hidden="true"
          ${M(this.flyoutMaxWidthProbe)}
        ></div>
        <div
          class="esp-page-preview-main-min-probe esp-page-main-min-width-probe"
          aria-hidden="true"
          ${M(this.mainMinWidthProbe)}
        ></div>
        <div
          class="esp-page-main-max-width-probe"
          aria-hidden="true"
          ${M(this.mainMaxWidthProbe)}
        ></div>
        <div
          class="esp-page-resize-step-probe"
          aria-hidden="true"
          ${M(this.resizeStepProbe)}
        ></div>
        <div
          class="esp-page-resize-large-step-probe"
          aria-hidden="true"
          ${M(this.resizeLargeStepProbe)}
        ></div>
        <div class="esp-page-preview-space" ${M(this.previewSpace)}>
          <aside part="preview" class="esp-page-preview" aria-label=${this.previewLabel}>
            <div part="preview-content" class="sticky-wrapper">
              <slot
                name="preview"
                ${M(this.previewSlot)}
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
            aria-valuemin=${Math.round(n)}
            aria-valuemax=${Math.round(w)}
            aria-valuenow=${Math.round(l)}
            tabindex="0"
            @pointerdown=${u=>this.onWorkspaceResizePointerDown("main-preview",u)}
            @pointermove=${this.onWorkspaceResizePointerMove}
            @pointerup=${this.onWorkspaceResizePointerEnd}
            @pointercancel=${this.onWorkspaceResizePointerEnd}
            @lostpointercapture=${this.onWorkspaceResizePointerEnd}
            @keydown=${u=>this.onWorkspaceResizeKeyDown("main-preview",u)}
            @blur=${this.onWorkspaceResizeBlur}
          ></div>
          <div
            part=${y}
            class="esp-page-workspace-resize-handle esp-page-preview-flyout-resize-handle"
            role="separator"
            aria-orientation="vertical"
            aria-label=${b}
            aria-valuemin=${Math.round(f)}
            aria-valuemax=${Math.round(v)}
            aria-valuenow=${Math.round(this.allocatedFlyoutWidth)}
            tabindex="0"
            @pointerdown=${u=>this.onWorkspaceResizePointerDown("preview-flyout",u)}
            @pointermove=${this.onWorkspaceResizePointerMove}
            @pointerup=${this.onWorkspaceResizePointerEnd}
            @pointercancel=${this.onWorkspaceResizePointerEnd}
            @lostpointercapture=${this.onWorkspaceResizePointerEnd}
            @keydown=${u=>this.onWorkspaceResizeKeyDown("preview-flyout",u)}
            @blur=${this.onWorkspaceResizeBlur}
          ></div>
        </div>
        <div class="esp-page-footer" role=${this.footerWrapperIsLandmark?"contentinfo":H}>
          <slot name="footer" ${M(this.footerSlot)} @slotchange=${this.syncFooterLandmark}></slot>
        </div>
        <div id="dialog-drop-zone" ${M(this.dialogZone)}></div>
        <esp-toaster></esp-toaster>
      </div>
    `}};W.styles=[...I.styles,V`
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

      
      :host([flyout-anchored]) .esp-page > div.esp-page-flyout > .sticky-wrapper {
        position: static;
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

        
        > .esp-page-preview-min-width-probe,
        > .esp-page-preview-default-width-probe,
        > .esp-page-preview-max-width-probe,
        > .esp-page-flyout-min-width-probe,
        > .esp-page-flyout-default-width-probe,
        > .esp-page-flyout-max-width-probe,
        > .esp-page-main-min-width-probe,
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
    `],x([T()],W.prototype,"footerWrapperIsLandmark",void 0),x([T()],W.prototype,"allocatedPreviewWidth",void 0),x([T()],W.prototype,"allocatedFlyoutWidth",void 0),x([z({reflect:!0})],W.prototype,"kind",void 0),x([z({reflect:!0})],W.prototype,"align",void 0),x([z({type:Boolean,reflect:!0})],W.prototype,"contained",void 0),x([z({attribute:"header-position",reflect:!0})],W.prototype,"headerPosition",void 0),x([z({attribute:"fixed-menus",type:Boolean,reflect:!0})],W.prototype,"fixedMenus",void 0),x([z({attribute:"preview-open",type:Boolean,reflect:!0})],W.prototype,"previewOpen",void 0),x([z({attribute:"preview-label",type:String,reflect:!0})],W.prototype,"previewLabel",void 0),x([z({attribute:"preview-collapse-sidebar",type:Boolean,reflect:!0})],W.prototype,"previewCollapseSidebar",void 0),x([z({attribute:"workspace-resizable",type:Boolean,reflect:!0})],W.prototype,"workspaceResizable",void 0),x([z({attribute:"preview-visible",type:Boolean,reflect:!0})],W.prototype,"previewVisible",void 0),x([z({attribute:"preview-reclaiming",type:Boolean,reflect:!0})],W.prototype,"previewReclaiming",void 0),W=x([U("esp-page")],W);export{W as EspalierPage};
