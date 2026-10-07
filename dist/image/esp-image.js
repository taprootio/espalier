var n=function(d,e,t,r){var a=arguments.length,i=a<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(d,e,t,r);else for(var l=d.length-1;l>=0;l--)(s=d[l])&&(i=(a<3?s(i):a>3?s(e,t,i):s(e,t))||i);return a>3&&i&&Object.defineProperty(e,t,i),i},y;import{css as q,html as b,nothing as F}from"lit";import{customElement as U,property as c,state as g}from"lit/decorators.js";import{EspalierElementBase as C}from"../shared/esp-element-base.js";import{slotHasContent as G}from"../shared/slot-content.js";import{renderVisualOverlay as L,visualOverlayStyles as V}from"../shared/visual-overlay.js";import{focusConverter as K,normalizeFocus as X}from"./image-focus.js";import{ensureImageTextureFilters as Y,imageTextureFilterId as J}from"./image-texture-filters.js";import{getImageTexture as R,isBuiltInImageTexture as T,subscribeToImageTextureRegistry as Q}from"../shared/image-texture-registry.js";import{validImageDimensions as O}from"./image-dimensions.js";import{parseImageRatio as z}from"./image-ratio.js";import{isMeasuredScrim as Z,scrimReach as ee,unionScrimBox as H}from"./scrim-reach.js";import"./esp-image-option.js";import{enumConverter as f}from"../shared/enum-converter.js";import{RafThrottle as te}from"../shared/raf-throttle.js";const j=new Set(["auto","none","flat","top","bottom","left","right","radial"]),P=new Set(["soft","medium","strong"]),I=new Set(["none","flush"]),A=new Set(["fine","medium","coarse"]),E=new Set(["auto","light","dark"]),N=new Set(["bottom-start","bottom","bottom-end","center","middle-start","middle-end","top-start","top","top-end"]),B=new Set(["overlay","below"]),$=["overlay","overlay-supporting","overlay-action"];function re(d){if(!d)return null;const[e,t=1]=d.split("/").map(a=>Number(a.trim())),r=e/t;return Number.isFinite(r)&&r>0?r:null}const v=new Set;let w=null;const ae={attributeFilter:["dir"],subtree:!0};function W(d,e){if(!(e?!v.has(d)&&!!v.add(d):v.delete(d))||typeof MutationObserver>"u")return;if(w?.disconnect(),v.size===0){w=null;return}w??=new MutationObserver(()=>{for(const a of v)a.requestUpdate()});const r=new Set([document.documentElement]);for(const a of v){let i=a;for(;i;){const s=i.getRootNode();s instanceof ShadowRoot&&r.add(s),i=i instanceof Element&&i.assignedSlot?i.assignedSlot:i.parentNode instanceof ShadowRoot?i.parentNode.host:i.parentNode}}for(const a of r)w.observe(a,ae)}function k(d){const e=[];for(const t of d)getComputedStyle(t).display==="contents"?e.push(...k(t.children)):e.push(t);return e}function ie(d){const e=d.getBoundingClientRect();if(e.width>0||e.height>0)return e;const t=d.ownerDocument.createRange();t.selectNodeContents(d);const r=t.getBoundingClientRect();return r.width>0||r.height>0?r:null}let o=y=class extends C{constructor(){super(...arguments),this.originalHeight=0,this.originalWidth=0,this.imageUrl="",this.localImage="",this.caption="",this.sizes="100vw",this.loading="eager",this.deferOffscreen=!1,this.banner=!1,this.bannerScheme="auto",this.scrim="auto",this.scrimStrength="medium",this.scrimEdge="none",this.texture="none",this.textureScale="medium",this.contentPosition="bottom-start",this.compactPlacement="overlay",this.focusPoint={x:.5,y:.5},this.ratio="",this.compactRatio="",this.renderedWidth=0,this.measuredWidth=0,this.compact=!1,this.overlayHasContent=!1,this.overlayHasStack=!1,this.overlayHasHeadline=!1,this.overlayHasSupporting=!1,this.renderedScrim=null,this.measuredScrim=null,this.grown=!1,this.softHeight=!1,this.growthWidth=null,this.growthCheckPending=!1,this.growthBlock=null,this.growthRollback=new te(()=>{this.grown&&(this.grown=!1,this.growthWidth=null)}),this.resizeObserver=null,this.scrimObserver=null,this.appliedScrimReach=0,this.offscreenObserver=null,this.offscreenAdmitted=!1,this.deferredProjectedImage=null,this.unsubscribeTextures=null,this.handleSlotChange=e=>{if(e.target instanceof HTMLSlotElement){if($.includes(e.target.name)){this.syncOverlaySlots(),this.observeScrimTargets();return}this.requestUpdate()}},this.handleWindowResize=()=>{this.syncSoftHeight()||!this.banner||!this.overlayHasContent||(this.measureScrimReach(),this.growthBlock&&(clearTimeout(this.growthRetryTimer),this.growthRetryTimer=setTimeout(()=>{!this.growthBlock||!this.isConnected||(this.growthBlock=null,this.measureScrimReach())},150)))}}get isPortrait(){const e=O(this.originalWidth,this.originalHeight);return e!==null&&e.height>e.width}overlaySlot(e){return this.shadowRoot?.querySelector(`slot[name="${e}"]`)??null}syncOverlaySlots(){const e=l=>{const h=this.overlaySlot(l);return h?G(h):!1},t=e("overlay"),r=e("overlay-supporting"),a=r||e("overlay-action"),i=a||t;t!==this.overlayHasHeadline&&(this.overlayHasHeadline=t),r!==this.overlayHasSupporting&&(this.overlayHasSupporting=r),i!==this.overlayHasContent&&(this.overlayHasContent=i),a!==this.overlayHasStack&&(this.overlayHasStack=a);const s=this.overlaySlot("overlay-action")?.assignedElements({flatten:!0})??[];s.length>1&&console.warn(`<esp-image> takes one overlay action; ${s.length} elements are slotted into "overlay-action".`,this)}findProjected(){for(const e of this.children)if(e.tagName==="PICTURE"||e.tagName==="IMG")return e;return null}findProjectedImage(e=this.findProjected()){return e?e.tagName==="IMG"?e:e.querySelector("img"):null}requiresOffscreenDeferral(e=this.findProjectedImage()){return this.deferOffscreen&&e?.getAttribute("loading")?.toLowerCase()==="lazy"}shouldDeferProjectedSizes(){return this.requiresOffscreenDeferral()&&!this.offscreenAdmitted}applyMeasuredWidth(){this.measuredWidth>0&&this.measuredWidth!==this.renderedWidth&&(this.renderedWidth=this.measuredWidth)}syncOffscreenDeferral(){const e=this.findProjectedImage();if(e!==this.deferredProjectedImage&&(this.offscreenAdmitted=!1,this.offscreenObserver?.disconnect(),this.offscreenObserver=null,this.deferredProjectedImage=e),!this.requiresOffscreenDeferral(e)){this.offscreenObserver?.disconnect(),this.offscreenObserver=null,this.offscreenAdmitted=!1,this.deferredProjectedImage=null,this.applyMeasuredWidth();return}if(!this.offscreenAdmitted){if(typeof IntersectionObserver>"u"){this.offscreenAdmitted=!0,this.applyMeasuredWidth();return}if(!this.offscreenObserver){const t=e,r=new IntersectionObserver(a=>{if(this.offscreenObserver===r){if(this.findProjectedImage()!==t){this.syncOffscreenDeferral();return}a.some(i=>i.isIntersecting)&&(this.offscreenAdmitted=!0,this.offscreenObserver?.disconnect(),this.offscreenObserver=null,this.applyMeasuredWidth(),this.requestUpdate())}},{rootMargin:"200px"});this.offscreenObserver=r}this.offscreenObserver.observe(this)}}connectedCallback(){super.connectedCallback(),y.ensureProjectionStyles(this.getRootNode()),this.unsubscribeTextures??=Q(()=>this.requestUpdate()),this.resizeObserver??=new ResizeObserver(e=>{(this.grown||this.growthBlock)&&this.measureScrimReach();const t=e[0]?.contentBoxSize?.[0],r=Math.round(t?t.inlineSize:e[0]?.contentRect.width??0);r<=0||(this.measuredWidth=r,this.syncOffscreenDeferral(),this.applyMeasuredWidth())}),this.resizeObserver.observe(this),window.addEventListener("resize",this.handleWindowResize,{passive:!0}),this.syncOffscreenDeferral(),this.hasUpdated&&(this.observeScrimTargets(),this.syncDirectionTracking())}disconnectedCallback(){super.disconnectedCallback(),W(this,!1),window.removeEventListener("resize",this.handleWindowResize),this.growthRollback.cancel(),clearTimeout(this.growthRetryTimer),this.unsubscribeTextures?.(),this.unsubscribeTextures=null,this.resizeObserver?.disconnect(),this.resizeObserver=null,this.scrimObserver?.disconnect(),this.scrimObserver=null,this.offscreenObserver?.disconnect(),this.offscreenObserver=null,this.offscreenAdmitted=!1,this.deferredProjectedImage=null}observeScrimTargets(){if(!this.shadowRoot)return;this.scrimObserver??=new ResizeObserver(()=>this.measureScrimReach()),this.scrimObserver.disconnect();const e=this.shadowRoot?.querySelector(".overlay");e&&this.scrimObserver.observe(e);const t=this.shadowRoot?.querySelector('[part="scrim"]');t&&this.scrimObserver.observe(t);const r=this.shadowRoot?.querySelector(".stack");r&&this.overlayHasStack&&this.scrimObserver.observe(r);for(const a of k(this.overlayElements()))this.scrimObserver.observe(a,{box:"border-box"})}overlayElements(){return $.flatMap(e=>this.overlaySlot(e)?.assignedElements({flatten:!0})??[])}measureScrimReach(){const e=this.shadowRoot?.querySelector(".frame");if(!e||this.syncSoftHeight()||this.syncGrowth(e))return;const t=this.resolvedScrim();if(this.renderedScrim!==null&&t!==this.renderedScrim){this.requestUpdate();return}let r=0;const a=this.shadowRoot?.querySelector('[part="scrim"]');if(this.banner&&this.overlayHasContent&&!this.bandActive()&&a&&Z(t)){const i=a.getBoundingClientRect();if(i.width<=0||i.height<=0)return;const s=H(this.overlayElements().map(ie));r=ee(t,i,s)}r!==this.appliedScrimReach&&(this.appliedScrimReach=r,r>0?e.style.setProperty("--_esp-image-scrim-reach",`${r}%`):e.style.removeProperty("--_esp-image-scrim-reach"))}effectiveSizes(){return this.renderedWidth>0?`${this.renderedWidth}px`:this.sizes}buildSources(){const e=new Map;for(const t of this.querySelectorAll("esp-image-option")){const r=t.getAttribute("url"),a=Number(t.getAttribute("width"));if(!r||!Number.isFinite(a)||a<=0)continue;const i=t.getAttribute("type")??"",s=e.get(i)??[];s.push({url:r,width:a}),e.set(i,s)}return Array.from(e,([t,r])=>({type:t,srcset:r.sort((a,i)=>a.width-i.width).map(a=>`${a.url} ${a.width}w`).join(", ")})).filter(t=>t.srcset.length>0)}resolvedBannerScheme(){return this.bannerScheme!=="auto"?this.bannerScheme:this.scheme==="dark"?"dark":"light"}resolvedTexture(){return T(this.texture)?this.texture:R(this.texture)?this.texture:"none"}overlayContentHeight(){const e=this.shadowRoot?.querySelector(".overlay");if(!e||e.hidden)return null;const t=getComputedStyle(e),r=(Number.parseFloat(t.paddingTop)||0)+(Number.parseFloat(t.paddingBottom)||0);if(this.overlayHasStack){const s=this.shadowRoot?.querySelector(".stack");return s?r+s.getBoundingClientRect().height:null}let a=1/0,i=-1/0;for(const s of k(this.overlayElements())){const l=s.getBoundingClientRect();if(l.width<=0&&l.height<=0)continue;const h=getComputedStyle(s);a=Math.min(a,l.top-(Number.parseFloat(h.marginTop)||0)),i=Math.max(i,l.bottom+(Number.parseFloat(h.marginBottom)||0))}return i>a?r+i-a:null}syncGrowth(e){const t=re(this.resolvedAspectRatio());let r=!1;if(this.banner&&this.overlayHasContent&&!this.bandActive()&&!this.softHeight&&t!==null){const a=e.getBoundingClientRect(),i=this.overlayContentHeight();if(a.width<=0||i===null)return!1;const s=getComputedStyle(this).maxBlockSize,l=this.growthBlock;l&&(Math.abs(a.width-l.width)>1||s!==l.cap||i<l.need-.5)&&(this.growthBlock=null);const h=this.getBoundingClientRect(),m=getComputedStyle(this),p=[m.borderTopWidth,m.borderBottomWidth,m.paddingTop,m.paddingBottom].reduce((x,S)=>x+(Number.parseFloat(S)||0),0),u=h.width/t,_=getComputedStyle(e),M=(Number.parseFloat(_.borderTopWidth)||0)+(Number.parseFloat(_.borderBottomWidth)||0),D=u-p-M;if(this.grown){const x=this.growthCheckPending&&this.growthWidth!==null&&a.width>this.growthWidth+1;this.growthCheckPending=!1;const S=h.height-p<a.height-.5;if(x||S)return this.growthBlock={width:x?this.growthWidth:a.width,cap:s,need:i},this.scheduleGrowthRollback(),!1;r=i>D+.5}else r=this.growthBlock===null&&this.copyClipped(a,_)&&Math.abs(h.height-u)<=1,r&&(this.growthWidth=a.width,this.growthCheckPending=!0)}return r===this.grown?!1:(this.grown=r,r||(this.growthWidth=null),!0)}scheduleGrowthRollback(){this.growthRollback.schedule()}copyClipped(e,t){const r=e.top+(Number.parseFloat(t.borderTopWidth)||0),a=e.bottom-(Number.parseFloat(t.borderBottomWidth)||0),i=[],s=this.overlayHasStack?this.shadowRoot?.querySelector(".stack"):null;if(s)i.push(s.getBoundingClientRect());else for(const h of k(this.overlayElements())){const m=h.getBoundingClientRect();(m.width>0||m.height>0)&&i.push(m)}const l=H(i);return l!==null&&(l.top<r-.5||l.bottom>a+.5)}readSoftHeight(){if(!this.banner)return!1;const e=getComputedStyle(this),t=a=>!["","none","auto","initial"].includes(e.getPropertyValue(a).trim()),r=t("--esp-image-banner-block-size");return(r||t("--esp-image-banner-max-block-size"))&&(r||this.resolvedAspectRatio()!==null)}syncSoftHeight(){const e=this.readSoftHeight();return e===this.softHeight?!1:(this.softHeight=e,!0)}grownActive(){return(this.grown||this.softHeight)&&this.banner&&!this.bandActive()}syncDirectionTracking(){W(this,this.isConnected&&this.banner&&this.scrim==="auto"&&this.contentPosition.startsWith("middle"))}bandActive(){return this.banner&&this.compact&&this.compactPlacement==="below"&&this.overlayHasContent}resolvedScrim(){if(this.scrim!=="auto")return this.scrim;if(!this.overlayHasContent||this.bandActive())return"none";if(this.contentPosition.startsWith("top"))return"top";if(this.contentPosition.startsWith("bottom"))return"bottom";if(this.contentPosition.startsWith("middle")){const e=getComputedStyle(this).direction==="rtl";return this.contentPosition==="middle-start"!==e?"left":"right"}return"radial"}resolvedAspectRatio(){const e=O(this.originalWidth,this.originalHeight);if(!this.banner)return e?`${e.width} / ${e.height}`:null;const t=z(this.ratio);return(this.compact?z(this.compactRatio):null)??t??(e?`${e.width} / ${e.height}`:null)}normalizeEnums(e){e.has("scrim")&&!j.has(this.scrim)&&(this.scrim="auto"),e.has("bannerScheme")&&!E.has(this.bannerScheme)&&(this.bannerScheme="auto"),e.has("scrimStrength")&&!P.has(this.scrimStrength)&&(this.scrimStrength="medium"),e.has("scrimEdge")&&!I.has(this.scrimEdge)&&(this.scrimEdge="none"),e.has("textureScale")&&!A.has(this.textureScale)&&(this.textureScale="medium"),e.has("contentPosition")&&!N.has(this.contentPosition)&&(this.contentPosition="bottom-start"),e.has("compactPlacement")&&!B.has(this.compactPlacement)&&(this.compactPlacement="overlay")}willUpdate(e){super.willUpdate(e),this.normalizeEnums(e),this.softHeight=this.readSoftHeight();const t=X(this.focusPoint),r=Number((t.x*100).toFixed(4)),a=Number((t.y*100).toFixed(4));this.style.setProperty("--_esp-image-object-position",`${r}% ${a}%`);const i=this.resolvedAspectRatio(),s=this.grownActive()||this.bandActive();for(const[p,u]of[["--_esp-image-aspect-ratio",!s],["--_esp-image-frame-aspect-ratio",s]])this.style.setProperty(p,i&&u?i:"auto");this.style.setProperty("--_esp-image-host-block-size",this.banner&&this.softHeight?"fit-content":"auto"),this.syncDirectionTracking();const l=this.resolvedTexture();if(["paper","grain","grunge"].includes(l)){const p=l==="grunge"&&this.resolvedBannerScheme()==="light"?"grunge-light":l;this.style.setProperty("--_esp-image-texture-filter",`url(#${J(p,this.textureScale)})`)}else this.style.removeProperty("--_esp-image-texture-filter");const h=T(l)?void 0:R(l),m=[["--_esp-image-registered-image",h?.image],["--_esp-image-registered-size",h?.size],["--_esp-image-registered-repeat",h?.repeat],["--_esp-image-registered-position",h?.position],["--_esp-image-registered-opacity",h?.opacity?.toString()],["--_esp-image-registered-blend-mode",h?.blendMode]];for(const[p,u]of m)u===void 0?this.style.removeProperty(p):this.style.setProperty(p,u)}firstUpdated(e){super.firstUpdated(e),this.syncOverlaySlots(),this.observeScrimTargets()}updated(e){if(super.updated(e),this.syncOffscreenDeferral(),(e.has("banner")||e.has("scrim")||e.has("contentPosition")||e.has("overlayHasContent")||e.has("overlayHasStack")||e.has("compactPlacement")||e.has("grown")||e.has("compact")||this.renderedScrim!==this.measuredScrim)&&(this.measuredScrim=this.renderedScrim,this.observeScrimTargets()),["paper","grain","grunge"].includes(this.resolvedTexture())&&this.renderRoot&&Y(this.renderRoot),this.renderedWidth>0){const s=this.shadowRoot?.querySelector(".compact-sentinel")?.getBoundingClientRect().width??0,l=s>0&&this.renderedWidth<s;l!==this.compact&&(this.compact=l)}if(this.renderedWidth<=0||this.shouldDeferProjectedSizes())return;const t=this.findProjected();if(!t)return;const r=this.effectiveSizes();if(t.tagName==="PICTURE")for(const i of t.querySelectorAll("source"))i.setAttribute("sizes",r);const a=this.findProjectedImage(t);a?.hasAttribute("srcset")&&a.setAttribute("sizes",r)}renderMedia(){if(this.localImage)return b`<img
        src=${this.localImage}
        alt=${this.caption}
        decoding="async"
        loading=${this.loading}
      />`;const e=b`<slot @slotchange=${this.handleSlotChange}></slot>`;if(this.findProjected())return e;const t=this.buildSources();return b`
      <picture>
        ${t.map(r=>b`
            <source
              srcset=${r.srcset}
              sizes=${this.effectiveSizes()}
              type=${r.type||F}
            />
          `)}
        <img src=${this.imageUrl} alt=${this.caption} decoding="async" loading=${this.loading} />
      </picture>
      ${e}
    `}render(){const e=this.resolvedScrim();return this.renderedScrim=e,b`
      <div
        part="frame"
        class="frame"
        data-banner-scheme=${this.resolvedBannerScheme()}
        data-scrim=${e}
        data-scrim-strength=${this.scrimStrength}
        data-scrim-edge=${this.scrimEdge}
        data-texture=${this.resolvedTexture()}
        data-texture-scale=${this.textureScale}
        data-content-position=${this.contentPosition}
        data-placement=${this.bandActive()?"band":"overlay"}
        ?data-grown=${this.grownActive()}
        ?data-soft=${this.grownActive()&&this.softHeight}
        ?data-overlay-stack=${this.overlayHasStack}
        ?data-overlay-headline=${this.overlayHasHeadline}
        ?data-overlay-supporting=${this.overlayHasSupporting}
      >
        <div part="image" class="image">${this.renderMedia()}</div>
        ${L({className:"banner-layers",imagePart:"texture",scrimPart:"scrim",texturePart:"texture"})}
        <div part="overlay" class="overlay" ?hidden=${!this.banner||!this.overlayHasContent}>
          <div class="stack">
            <slot name="overlay" @slotchange=${this.handleSlotChange}></slot>
            <slot name="overlay-supporting" @slotchange=${this.handleSlotChange}></slot>
            <slot name="overlay-action" @slotchange=${this.handleSlotChange}></slot>
          </div>
        </div>
        <span class="compact-sentinel" aria-hidden="true"></span>
      </div>
    `}static ensureProjectionStyles(e){const t=e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&"host"in e?e:e.nodeType===Node.DOCUMENT_NODE?e.head:e.ownerDocument?.head??document.head,r=Array.from(t.querySelectorAll("style[data-esp-image-projection-styles]")),a=r.find(s=>s.textContent===y.projectionStyles);if(a){for(const s of r)s!==a&&s.remove();return}for(const s of r)s.remove();const i=t.ownerDocument.createElement("style");i.dataset.espImageProjectionStyles="",i.textContent=y.projectionStyles,t.append(i)}};o.projectionStyles=`
    esp-image > picture,
    esp-image > img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: var(--_esp-image-object-fit, cover);
      object-position: var(--esp-image-object-position, var(--_esp-image-object-position, center));
    }
    esp-image > picture > img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: var(--_esp-image-object-fit, cover);
      object-position: var(--esp-image-object-position, var(--_esp-image-object-position, center));
    }
    @media (prefers-reduced-motion: reduce) {
      esp-image[banner] > picture,
      esp-image[banner] > picture > img,
      esp-image[banner] > img {
        animation: none !important;
        transition: none !important;
      }
    }
  `,o.styles=[...C.styles,q`
      :host {
        display: block;
        aspect-ratio: var(--_esp-image-aspect-ratio, auto);
        border: var(
          --esp-image-border,
          var(--_esp-image-border-default, 2px solid var(--esp-color-border))
        );
        box-sizing: border-box;
        border-radius: var(
          --esp-image-border-radius,
          var(--_esp-image-radius-default, var(--esp-size-border-radius))
        );
        overflow: hidden;
        position: relative;
      }

      :host([banner]) {
        --_esp-image-border-default: none;
        --_esp-image-radius-default: 0;
        
        block-size: var(--_esp-image-host-block-size, auto);
      }

      [hidden] {
        display: none !important;
      }

      .frame,
      .image,
      picture,
      img {
        display: block;
        inline-size: 100%;
        block-size: 100%;
      }

      .frame {
        position: relative;
        overflow: hidden;
        
        isolation: isolate;
        
        --_esp-image-scrim-resolved: var(
          --esp-image-scrim-color,
          var(--_esp-image-scrim-ink, oklch(0.12 0.015 255))
        );
        --_esp-image-texture-ink-resolved: var(
          --esp-image-texture-color,
          var(--_esp-image-texture-ink, oklch(0.1 0.015 255))
        );
        
        --_esp-image-pitch-resolved: var(
          --esp-image-texture-scale,
          var(--_esp-image-texture-pitch, 8px)
        );
      }
      .image {
        position: relative;
        z-index: 0;
      }

      
      :host([banner]) .image {
        overflow: clip;
      }

      
      :host([banner]) .frame:is([data-grown], [data-placement="band"]) {
        display: grid;
        grid-template: minmax(0, 1fr) / minmax(0, 1fr);
      }
      
      :host([banner]) .frame[data-grown]::before {
        content: "";
        grid-area: 1 / 1;
        aspect-ratio: var(--_esp-image-frame-aspect-ratio, auto);
        block-size: var(--esp-image-banner-block-size, auto);
        max-block-size: var(--esp-image-banner-max-block-size, none);
      }
      :host([banner]) .frame[data-grown] .image {
        position: absolute;
        inset: 0;
      }
      
      :host([banner]) .frame[data-soft] {
        min-block-size: inherit;
        max-block-size: inherit;
      }

      img {
        object-fit: var(--_esp-image-object-fit, cover);
        object-position: var(
          --esp-image-object-position,
          var(--_esp-image-object-position, center)
        );
      }

      .banner-layers {
        display: none;
      }

      :host([banner]) .banner-layers {
        
        
        --_esp-overlay-image: var(
          --esp-image-texture-image,
          var(--_esp-image-registered-image, none)
        );
        --_esp-overlay-image-opacity: var(
          --esp-image-texture-image-opacity,
          var(--_esp-image-registered-opacity, 1)
        );
        --_esp-overlay-image-repeat: var(
          --esp-image-texture-repeat,
          var(--_esp-image-registered-repeat, repeat)
        );
        --_esp-overlay-image-position: var(
          --esp-image-texture-position,
          var(--_esp-image-registered-position, 0 0)
        );
        --_esp-overlay-image-size: var(
          --esp-image-texture-size,
          var(--_esp-image-registered-size, auto)
        );
        --_esp-overlay-image-blend-mode: var(
          --esp-image-texture-blend-mode,
          var(--_esp-image-registered-blend-mode, normal)
        );
        --_esp-overlay-scrim-opacity: var(
          --esp-image-scrim-opacity,
          var(--_esp-image-scrim-opacity, 0.56)
        );
        
        --_esp-overlay-texture-opacity: var(
          --esp-image-texture-opacity,
          var(--_esp-image-texture-opacity, 1)
        );
        --_esp-overlay-texture-blend-mode: var(
          --esp-image-texture-blend-mode,
          var(--_esp-image-texture-blend-mode, normal)
        );
        --_esp-overlay-texture-filter: var(--_esp-image-texture-filter, none);
        display: block;
      }

      .frame[data-scrim-strength="soft"] {
        --_esp-image-scrim-opacity: 0.36;
      }
      .frame[data-scrim-strength="medium"] {
        --_esp-image-scrim-opacity: 0.56;
      }
      .frame[data-scrim-strength="strong"] {
        --_esp-image-scrim-opacity: 0.76;
      }

      
      .frame {
        --_esp-image-scrim-reach: 0%;
        --_esp-image-scrim-plateau: max(20%, var(--_esp-image-scrim-reach));
        --_esp-image-scrim-fade-mid: calc(
          var(--_esp-image-scrim-plateau) + (100% - var(--_esp-image-scrim-plateau)) * 0.35
        );
        --_esp-image-scrim-fade-end: calc(
          var(--_esp-image-scrim-plateau) + (100% - var(--_esp-image-scrim-plateau)) * 0.725
        );
      }

      .frame[data-scrim="none"] {
        --_esp-overlay-scrim: none;
      }
      .frame[data-scrim="flat"] {
        --_esp-overlay-scrim: var(--_esp-image-scrim-resolved);
      }
      .frame[data-scrim="top"] {
        --_esp-overlay-scrim: linear-gradient(
          to bottom,
          var(--_esp-image-scrim-resolved) 0% var(--_esp-image-scrim-plateau),
          color-mix(in oklch, var(--_esp-image-scrim-resolved) 68%, transparent)
            var(--_esp-image-scrim-fade-mid),
          transparent var(--_esp-image-scrim-fade-end)
        );
      }
      .frame[data-scrim="bottom"] {
        --_esp-overlay-scrim: linear-gradient(
          to top,
          var(--_esp-image-scrim-resolved) 0% var(--_esp-image-scrim-plateau),
          color-mix(in oklch, var(--_esp-image-scrim-resolved) 68%, transparent)
            var(--_esp-image-scrim-fade-mid),
          transparent var(--_esp-image-scrim-fade-end)
        );
      }
      .frame[data-scrim="left"] {
        --_esp-overlay-scrim: linear-gradient(
          to right,
          var(--_esp-image-scrim-resolved) 0% var(--_esp-image-scrim-plateau),
          color-mix(in oklch, var(--_esp-image-scrim-resolved) 68%, transparent)
            var(--_esp-image-scrim-fade-mid),
          transparent var(--_esp-image-scrim-fade-end)
        );
      }
      .frame[data-scrim="right"] {
        --_esp-overlay-scrim: linear-gradient(
          to left,
          var(--_esp-image-scrim-resolved) 0% var(--_esp-image-scrim-plateau),
          color-mix(in oklch, var(--_esp-image-scrim-resolved) 68%, transparent)
            var(--_esp-image-scrim-fade-mid),
          transparent var(--_esp-image-scrim-fade-end)
        );
      }
      
      .frame[data-scrim="radial"] {
        --_esp-overlay-scrim: radial-gradient(
          circle at center,
          var(--_esp-image-scrim-resolved) 0% var(--_esp-image-scrim-reach),
          color-mix(in oklch, var(--_esp-image-scrim-resolved) 72%, transparent)
            calc(
              var(--_esp-image-scrim-reach) + (100% - var(--_esp-image-scrim-reach)) * 0.34
            ),
          color-mix(in oklch, var(--_esp-image-scrim-resolved) 28%, transparent)
            calc(
              var(--_esp-image-scrim-reach) + (100% - var(--_esp-image-scrim-reach)) * 0.64
            ),
          transparent
            calc(var(--_esp-image-scrim-reach) + (100% - var(--_esp-image-scrim-reach)) * 0.82)
        );
      }

      
      :host([banner]) .banner-layers::after {
        content: var(--_esp-image-scrim-edge-content, none);
        position: absolute;
        inset: 0;
        pointer-events: none;
        background-color: var(--_esp-image-scrim-edge-color, transparent);
        background-image: var(--_esp-image-scrim-edge-image, none);
        background-position: var(--_esp-image-scrim-edge-position, 0 0);
        background-repeat: repeat;
        background-size: var(--_esp-image-scrim-edge-size, auto);
        mask-image: var(--_esp-image-scrim-edge-mask, none);
        mask-mode: alpha;
      }

      
      .frame[data-scrim-edge="flush"][data-scrim="top"] {
        --_esp-image-scrim-edge-content: "";
        --_esp-image-scrim-edge-color: var(--_esp-image-scrim-resolved);
        --_esp-image-scrim-edge-image: var(--esp-image-scrim-edge-image, none);
        --_esp-image-scrim-edge-size: var(--esp-image-scrim-edge-size, auto);
        --_esp-image-scrim-edge-position: left top;
        --_esp-image-scrim-edge-mask: linear-gradient(
          to bottom,
          black 0%,
          transparent var(--esp-image-scrim-edge-depth, 12%)
        );
      }
      .frame[data-scrim-edge="flush"][data-scrim="bottom"] {
        --_esp-image-scrim-edge-content: "";
        --_esp-image-scrim-edge-color: var(--_esp-image-scrim-resolved);
        --_esp-image-scrim-edge-image: var(--esp-image-scrim-edge-image, none);
        --_esp-image-scrim-edge-size: var(--esp-image-scrim-edge-size, auto);
        --_esp-image-scrim-edge-position: left bottom;
        --_esp-image-scrim-edge-mask: linear-gradient(
          to top,
          black 0%,
          transparent var(--esp-image-scrim-edge-depth, 12%)
        );
      }
      .frame[data-scrim-edge="flush"][data-scrim="left"] {
        --_esp-image-scrim-edge-content: "";
        --_esp-image-scrim-edge-color: var(--_esp-image-scrim-resolved);
        --_esp-image-scrim-edge-image: var(--esp-image-scrim-edge-image, none);
        --_esp-image-scrim-edge-size: var(--esp-image-scrim-edge-size, auto);
        --_esp-image-scrim-edge-position: left top;
        --_esp-image-scrim-edge-mask: linear-gradient(
          to right,
          black 0%,
          transparent var(--esp-image-scrim-edge-depth, 12%)
        );
      }
      .frame[data-scrim-edge="flush"][data-scrim="right"] {
        --_esp-image-scrim-edge-content: "";
        --_esp-image-scrim-edge-color: var(--_esp-image-scrim-resolved);
        --_esp-image-scrim-edge-image: var(--esp-image-scrim-edge-image, none);
        --_esp-image-scrim-edge-size: var(--esp-image-scrim-edge-size, auto);
        --_esp-image-scrim-edge-position: right top;
        --_esp-image-scrim-edge-mask: linear-gradient(
          to left,
          black 0%,
          transparent var(--esp-image-scrim-edge-depth, 12%)
        );
      }

      
      .frame[data-banner-scheme="dark"] {
        --_esp-image-scrim-ink: oklch(from var(--esp-color-background, oklch(0.98 0 0)) 0.13 c h);
        --_esp-image-texture-ink: oklch(from var(--esp-color-background, oklch(0.98 0 0)) 0.12 c h);
        --_esp-image-overlay-ink: oklch(from var(--esp-color-headings, oklch(0.2 0 0)) 0.97 c h);
        --_esp-image-overlay-text-shadow:
          0 1px 2px oklch(0.1 0 0 / 0.45), 0 2px 12px oklch(0.1 0 0 / 0.3);
      }
      .frame[data-banner-scheme="light"] {
        --_esp-image-scrim-ink: oklch(from var(--esp-color-background, oklch(0.98 0 0)) 0.97 c h);
        --_esp-image-texture-ink: oklch(from var(--esp-color-background, oklch(0.98 0 0)) 0.98 c h);
        --_esp-image-overlay-ink: oklch(from var(--esp-color-headings, oklch(0.2 0 0)) 0.2 c h);
        --_esp-image-overlay-text-shadow:
          0 1px 2px oklch(1 0 0 / 0.55), 0 2px 12px oklch(1 0 0 / 0.4);
      }
      
      :host([scheme="light"]) .frame[data-banner-scheme="light"],
      :host([scheme="dark"]) .frame[data-banner-scheme="dark"] {
        --_esp-image-scrim-ink: var(--esp-color-background, oklch(0.98 0 0));
        --_esp-image-texture-ink: var(--esp-color-background, oklch(0.98 0 0));
        --_esp-image-overlay-ink: var(--esp-color-headings, oklch(0.2 0 0));
      }
      
      .frame[data-banner-scheme="light"][data-texture="halftone"],
      .frame[data-banner-scheme="light"][data-texture="grunge"] {
        --_esp-image-texture-blend-mode: screen;
      }

      .frame[data-texture-scale="fine"] {
        --_esp-image-texture-pitch: 4px;
      }
      .frame[data-texture-scale="medium"] {
        --_esp-image-texture-pitch: 8px;
      }
      .frame[data-texture-scale="coarse"] {
        --_esp-image-texture-pitch: 14px;
      }
      .frame[data-texture="none"] {
        --_esp-overlay-texture: none;
      }
      .frame[data-texture="dots"] {
        --_esp-overlay-texture: radial-gradient(
          circle,
          var(--_esp-image-texture-ink-resolved) 0 calc(var(--_esp-image-pitch-resolved) * 0.17),
          transparent calc(var(--_esp-image-pitch-resolved) * 0.17 + 0.35px)
        );
        --_esp-overlay-texture-size: var(--_esp-image-pitch-resolved)
          var(--_esp-image-pitch-resolved);
        --_esp-image-texture-opacity: 0.8;
        --_esp-image-texture-blend-mode: normal;
      }
      .frame[data-texture="halftone"] {
        --_esp-overlay-texture: radial-gradient(
          circle,
          var(--_esp-image-texture-ink-resolved) 0 calc(var(--_esp-image-pitch-resolved) * 0.22),
          transparent calc(var(--_esp-image-pitch-resolved) * 0.22 + 0.35px)
        );
        --_esp-overlay-texture-size: var(--_esp-image-pitch-resolved)
          var(--_esp-image-pitch-resolved);
        --_esp-image-texture-opacity: 0.9;
        --_esp-image-texture-blend-mode: multiply;
        
        --_esp-overlay-texture-mask: linear-gradient(to top, black, transparent 82%);
      }
      .frame[data-texture="scanlines"] {
        --_esp-overlay-texture: repeating-linear-gradient(
          to bottom,
          var(--_esp-image-texture-ink-resolved) 0 calc(var(--_esp-image-pitch-resolved) * 0.3),
          transparent calc(var(--_esp-image-pitch-resolved) * 0.3) var(--_esp-image-pitch-resolved)
        );
        --_esp-image-texture-opacity: 0.35;
        --_esp-image-texture-blend-mode: normal;
      }
      .frame[data-texture="duotone"] {
        --_esp-overlay-texture: linear-gradient(
          135deg,
          var(
              --esp-image-duotone-shadow-color,
              oklch(from var(--esp-color-primary, oklch(0.45 0.1 265)) 0.32 c h)
            )
            0% 42%,
          var(
              --esp-image-duotone-highlight-color,
              oklch(from var(--esp-color-complementary, oklch(0.75 0.1 85)) 0.84 c h)
            )
            100%
        );
        --_esp-image-texture-opacity: 0.9;
        --_esp-image-texture-blend-mode: color;
      }
      
      .frame[data-texture="paper"] {
        --_esp-overlay-texture: linear-gradient(oklch(1 0 0), oklch(1 0 0));
        --_esp-image-texture-opacity: 0.9;
        --_esp-image-texture-blend-mode: overlay;
      }
      .frame[data-texture="grain"] {
        --_esp-overlay-texture: linear-gradient(oklch(1 0 0), oklch(1 0 0));
        --_esp-image-texture-opacity: 0.72;
        --_esp-image-texture-blend-mode: overlay;
      }
      .frame[data-texture="grunge"] {
        --_esp-overlay-texture: linear-gradient(oklch(1 0 0), oklch(1 0 0));
        --_esp-image-texture-opacity: 0.42;
        --_esp-image-texture-blend-mode: multiply;
      }

      .frame[data-texture="halftone"][data-scrim="top"] {
        --_esp-overlay-texture-mask: linear-gradient(to bottom, black, transparent 82%);
      }
      .frame[data-texture="halftone"][data-scrim="bottom"] {
        --_esp-overlay-texture-mask: linear-gradient(to top, black, transparent 82%);
      }
      .frame[data-texture="halftone"][data-scrim="left"] {
        --_esp-overlay-texture-mask: linear-gradient(to right, black, transparent 82%);
      }
      .frame[data-texture="halftone"][data-scrim="right"] {
        --_esp-overlay-texture-mask: linear-gradient(to left, black, transparent 82%);
      }
      .frame[data-texture="halftone"][data-scrim="radial"] {
        --_esp-overlay-texture-mask: radial-gradient(circle at center, black, transparent 82%);
      }

      .overlay {
        position: absolute;
        z-index: 2;
        inset: 0;
        display: flex;
        
        overflow-wrap: anywhere;
        align-items: flex-end;
        justify-content: flex-start;
        padding: var(--esp-image-overlay-padding, var(--esp-size-padding-page));
        color: var(--esp-image-overlay-color, var(--_esp-image-overlay-ink, white));
        
        text-shadow: var(
          --esp-image-overlay-text-shadow,
          var(--_esp-image-overlay-text-shadow, none)
        );
        pointer-events: none;
      }
      :host([banner]) .frame:is([data-grown], [data-placement="band"]) .overlay {
        position: relative;
        inset: auto;
        grid-area: 1 / 1;
      }
      .overlay slot::slotted(*) {
        color: inherit !important;
        pointer-events: auto;
      }
      
      .stack {
        display: contents;
      }
      .overlay slot[name="overlay"]::slotted(*) {
        max-inline-size: var(--esp-image-overlay-measure, none);
      }
      
      .frame[data-overlay-stack] .stack {
        display: flex;
        flex-direction: column;
        align-items: start;
        min-inline-size: 0;
        max-inline-size: var(--esp-image-overlay-measure, 36rem);
      }
      .frame[data-overlay-stack][data-content-position="bottom"] .stack,
      .frame[data-overlay-stack][data-content-position="center"] .stack,
      .frame[data-overlay-stack][data-content-position="top"] .stack {
        align-items: center;
      }
      .frame[data-overlay-stack][data-content-position$="-end"] .stack {
        align-items: end;
      }
      .frame[data-overlay-stack] .stack slot::slotted(*) {
        max-inline-size: 100%;
        margin-block: 0 !important;
      }
      
      .frame[data-overlay-stack][data-overlay-headline]
        .stack
        slot[name="overlay-supporting"]::slotted(*) {
        margin-block-start: var(--esp-image-overlay-gap, var(--esp-size-small, 0.75rem)) !important;
      }
      .frame[data-overlay-stack]:is([data-overlay-headline], [data-overlay-supporting])
        .stack
        slot[name="overlay-action"]::slotted(*) {
        margin-block-start: calc(
          2 * var(--esp-image-overlay-gap, var(--esp-size-small, 0.75rem))
        ) !important;
      }
      
      .overlay slot[name="overlay-supporting"]::slotted(*) {
        font-family: var(--esp-font-body, inherit);
        font-weight: var(--esp-type-lead-font-weight, var(--esp-font-weight-body, 400));
        font-size: var(--esp-type-lead-font-size, 1.25rem);
        line-height: 1.4;
      }
      
      .overlay slot[name="overlay-action"]::slotted(a),
      .overlay slot[name="overlay-action"]::slotted(button) {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        min-block-size: 2.75rem;
        padding: 0.5em 1.25em;
        border: 2px solid currentColor;
        border-radius: var(--esp-size-border-radius, 0.375rem);
        background: transparent;
        font-family: var(--esp-font-body, inherit);
        font-size: var(--esp-type-normal, 1rem);
        font-weight: 600;
        line-height: 1.2;
        text-align: center;
        cursor: pointer;
      }
      .overlay slot[name="overlay-action"]::slotted(a:hover),
      .overlay slot[name="overlay-action"]::slotted(button:hover) {
        background: color-mix(in oklch, currentColor 14%, transparent);
      }
      .overlay slot[name="overlay-action"]::slotted(:focus-visible) {
        outline: 2px solid currentColor;
        outline-offset: 3px;
        box-shadow: 0 0 0 7px var(--_esp-image-scrim-resolved);
      }
      .frame[data-content-position="bottom"] .overlay {
        justify-content: center;
        text-align: center;
      }
      .frame[data-content-position="bottom-end"] .overlay {
        justify-content: flex-end;
        text-align: end;
      }
      .frame[data-content-position="center"] .overlay {
        align-items: center;
        justify-content: center;
        text-align: center;
      }
      .frame[data-content-position="middle-start"] .overlay {
        align-items: center;
      }
      .frame[data-content-position="middle-end"] .overlay {
        align-items: center;
        justify-content: flex-end;
        text-align: end;
      }
      .frame[data-content-position="top-start"] .overlay {
        align-items: flex-start;
      }
      .frame[data-content-position="top"] .overlay {
        align-items: flex-start;
        justify-content: center;
        text-align: center;
      }
      .frame[data-content-position="top-end"] .overlay {
        align-items: flex-start;
        justify-content: flex-end;
        text-align: end;
      }

      
      :host([banner]) .frame[data-placement="band"] {
        grid-template: minmax(0, 1fr) auto / minmax(0, 1fr);
      }
      :host([banner]) .frame[data-placement="band"]::before {
        display: none;
      }
      :host([banner]) .frame[data-placement="band"] .image {
        position: relative;
        inset: auto;
        grid-area: 1 / 1;
        align-self: stretch;
        
        block-size: var(--esp-image-banner-block-size, auto);
        max-block-size: var(--esp-image-banner-max-block-size, none);
        aspect-ratio: var(--_esp-image-frame-aspect-ratio, auto);
      }
      :host([banner]) .frame[data-placement="band"] .banner-layers {
        position: relative;
        inset: auto;
        grid-area: 1 / 1;
      }
      :host([banner]) .frame[data-placement="band"] .overlay {
        grid-area: 2 / 1;
        background: var(--_esp-image-scrim-resolved);
        text-shadow: none;
      }

      .compact-sentinel {
        position: absolute;
        inline-size: var(--esp-image-compact-width, 40rem);
        block-size: 0;
        visibility: hidden;
        pointer-events: none;
      }

      @media (forced-colors: active) {
        :host([banner]) .banner-layers {
          display: none;
        }
        .overlay {
          background: Canvas;
          color: CanvasText;
        }
      }

      @media (prefers-reduced-transparency: reduce) {
        :host([banner]) .banner-layers {
          --_esp-overlay-scrim-opacity: max(0.82, var(--esp-image-scrim-opacity, 0.82));
        }
        .esp-visual-overlay__texture,
        .esp-visual-overlay__image {
          display: none;
        }
      }

      @media print {
        :host([banner]) .banner-layers {
          display: none;
        }
        
        
        .overlay,
        :host([banner]) .frame[data-placement="band"] .overlay {
          background: white;
          color: black;
        }
      }

      
      @media (prefers-reduced-motion: reduce) {
        .banner-layers,
        .image,
        .image picture,
        .image img,
        .overlay {
          animation: none !important;
          transition: none !important;
        }
      }
    `,V],n([c({attribute:"original-height",type:Number})],o.prototype,"originalHeight",void 0),n([c({attribute:"original-width",type:Number})],o.prototype,"originalWidth",void 0),n([c({attribute:"low-res",type:String})],o.prototype,"imageUrl",void 0),n([c({attribute:"local-image",type:String})],o.prototype,"localImage",void 0),n([c({type:String})],o.prototype,"caption",void 0),n([c({attribute:"sizes",type:String})],o.prototype,"sizes",void 0),n([c({attribute:"loading",type:String})],o.prototype,"loading",void 0),n([c({attribute:"defer-offscreen",type:Boolean})],o.prototype,"deferOffscreen",void 0),n([c({type:Boolean,reflect:!0})],o.prototype,"banner",void 0),n([c({attribute:"banner-scheme",converter:f(E,"auto"),reflect:!0})],o.prototype,"bannerScheme",void 0),n([c({converter:f(j,"auto"),reflect:!0})],o.prototype,"scrim",void 0),n([c({attribute:"scrim-strength",converter:f(P,"medium"),reflect:!0})],o.prototype,"scrimStrength",void 0),n([c({attribute:"scrim-edge",converter:f(I,"none"),reflect:!0})],o.prototype,"scrimEdge",void 0),n([c({type:String,reflect:!0})],o.prototype,"texture",void 0),n([c({attribute:"texture-scale",converter:f(A,"medium"),reflect:!0})],o.prototype,"textureScale",void 0),n([c({attribute:"content-position",converter:f(N,"bottom-start"),reflect:!0})],o.prototype,"contentPosition",void 0),n([c({attribute:"compact-placement",converter:f(B,"overlay"),reflect:!0})],o.prototype,"compactPlacement",void 0),n([c({attribute:"focus",converter:K,reflect:!0})],o.prototype,"focusPoint",void 0),n([c({type:String})],o.prototype,"ratio",void 0),n([c({attribute:"compact-ratio",type:String})],o.prototype,"compactRatio",void 0),n([g()],o.prototype,"renderedWidth",void 0),n([g()],o.prototype,"compact",void 0),n([g()],o.prototype,"overlayHasContent",void 0),n([g()],o.prototype,"overlayHasStack",void 0),n([g()],o.prototype,"overlayHasHeadline",void 0),n([g()],o.prototype,"overlayHasSupporting",void 0),n([g()],o.prototype,"grown",void 0),n([g()],o.prototype,"softHeight",void 0),o=y=n([U("esp-image")],o);export{o as EspalierImage,z as parseImageRatio};
