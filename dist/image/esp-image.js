var n=function(l,e,t,r){var i=arguments.length,a=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(l,e,t,r);else for(var m=l.length-1;m>=0;m--)(o=l[m])&&(a=(i<3?o(a):i>3?o(e,t,a):o(e,t))||a);return i>3&&a&&Object.defineProperty(e,t,a),a},p;import{css as I,html as h,nothing as P}from"lit";import{customElement as E,property as c,state as u}from"lit/decorators.js";import{EspalierElementBase as v}from"../shared/esp-element-base.js";import{slotHasContent as y}from"../shared/slot-content.js";import{renderVisualOverlay as $,visualOverlayStyles as A}from"../shared/visual-overlay.js";import{focusConverter as N,normalizeFocus as W}from"./image-focus.js";import{ensureImageTextureFilters as D,imageTextureFilterId as M}from"./image-texture-filters.js";import{getImageTexture as b,isBuiltInImageTexture as x,subscribeToImageTextureRegistry as B}from"../shared/image-texture-registry.js";import{validImageDimensions as _}from"./image-dimensions.js";import{isMeasuredScrim as q,scrimReach as H,unionScrimBox as U}from"./scrim-reach.js";import"./esp-image-option.js";const k=new Set(["auto","none","flat","top","bottom","left","right","radial"]),w=new Set(["soft","medium","strong"]),S=new Set(["none","flush"]),z=new Set(["fine","medium","coarse"]),O=new Set(["auto","light","dark"]),j=new Set(["bottom-start","bottom","bottom-end","center","top-start","top","top-end"]);function d(l,e){return{fromAttribute(t){return t&&l.has(t)?t:e},toAttribute(t){return l.has(t)?t:e}}}function R(l){const e=l.trim();if(!e)return null;const t=e.split("/").map(i=>i.trim());if(t.length>2||t.some(i=>i.length===0))return null;const r=t.map(Number);return r.some(i=>!Number.isFinite(i)||i<=0)?null:r.length===1?String(r[0]):`${r[0]} / ${r[1]}`}function T(l){const e=[];for(const t of l)getComputedStyle(t).display==="contents"?e.push(...T(t.children)):e.push(t);return e}function F(l){const e=l.getBoundingClientRect();if(e.width>0||e.height>0)return e;const t=l.ownerDocument.createRange();t.selectNodeContents(l);const r=t.getBoundingClientRect();return r.width>0||r.height>0?r:null}let s=p=class extends v{constructor(){super(...arguments),this.originalHeight=0,this.originalWidth=0,this.imageUrl="",this.localImage="",this.caption="",this.sizes="100vw",this.loading="eager",this.deferOffscreen=!1,this.banner=!1,this.bannerScheme="auto",this.scrim="auto",this.scrimStrength="medium",this.scrimEdge="none",this.texture="none",this.textureScale="medium",this.contentPosition="bottom-start",this.focusPoint={x:.5,y:.5},this.ratio="",this.compactRatio="",this.renderedWidth=0,this.measuredWidth=0,this.compact=!1,this.overlayHasContent=!1,this.resizeObserver=null,this.scrimObserver=null,this.appliedScrimReach=0,this.offscreenObserver=null,this.offscreenAdmitted=!1,this.deferredProjectedImage=null,this.unsubscribeTextures=null,this.handleSlotChange=e=>{if(e.target instanceof HTMLSlotElement){if(e.target.name==="overlay"){const t=y(e.target);t!==this.overlayHasContent&&(this.overlayHasContent=t),this.observeScrimTargets();return}this.requestUpdate()}}}get isPortrait(){const e=_(this.originalWidth,this.originalHeight);return e!==null&&e.height>e.width}findProjected(){for(const e of this.children)if(e.tagName==="PICTURE"||e.tagName==="IMG")return e;return null}findProjectedImage(e=this.findProjected()){return e?e.tagName==="IMG"?e:e.querySelector("img"):null}requiresOffscreenDeferral(e=this.findProjectedImage()){return this.deferOffscreen&&e?.getAttribute("loading")?.toLowerCase()==="lazy"}shouldDeferProjectedSizes(){return this.requiresOffscreenDeferral()&&!this.offscreenAdmitted}applyMeasuredWidth(){this.measuredWidth>0&&this.measuredWidth!==this.renderedWidth&&(this.renderedWidth=this.measuredWidth)}syncOffscreenDeferral(){const e=this.findProjectedImage();if(e!==this.deferredProjectedImage&&(this.offscreenAdmitted=!1,this.offscreenObserver?.disconnect(),this.offscreenObserver=null,this.deferredProjectedImage=e),!this.requiresOffscreenDeferral(e)){this.offscreenObserver?.disconnect(),this.offscreenObserver=null,this.offscreenAdmitted=!1,this.deferredProjectedImage=null,this.applyMeasuredWidth();return}if(!this.offscreenAdmitted){if(typeof IntersectionObserver>"u"){this.offscreenAdmitted=!0,this.applyMeasuredWidth();return}if(!this.offscreenObserver){const t=e,r=new IntersectionObserver(i=>{if(this.offscreenObserver===r){if(this.findProjectedImage()!==t){this.syncOffscreenDeferral();return}i.some(a=>a.isIntersecting)&&(this.offscreenAdmitted=!0,this.offscreenObserver?.disconnect(),this.offscreenObserver=null,this.applyMeasuredWidth(),this.requestUpdate())}},{rootMargin:"200px"});this.offscreenObserver=r}this.offscreenObserver.observe(this)}}connectedCallback(){super.connectedCallback(),p.ensureProjectionStyles(this.getRootNode()),this.unsubscribeTextures??=B(()=>this.requestUpdate()),this.resizeObserver??=new ResizeObserver(e=>{const t=e[0]?.contentBoxSize?.[0],r=Math.round(t?t.inlineSize:e[0]?.contentRect.width??0);r<=0||(this.measuredWidth=r,this.syncOffscreenDeferral(),this.applyMeasuredWidth())}),this.resizeObserver.observe(this),this.syncOffscreenDeferral(),this.hasUpdated&&this.observeScrimTargets()}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeTextures?.(),this.unsubscribeTextures=null,this.resizeObserver?.disconnect(),this.resizeObserver=null,this.scrimObserver?.disconnect(),this.scrimObserver=null,this.offscreenObserver?.disconnect(),this.offscreenObserver=null,this.offscreenAdmitted=!1,this.deferredProjectedImage=null}observeScrimTargets(){if(!this.shadowRoot)return;this.scrimObserver??=new ResizeObserver(()=>this.measureScrimReach()),this.scrimObserver.disconnect();const e=this.shadowRoot?.querySelector(".overlay");e&&this.scrimObserver.observe(e);const t=this.shadowRoot?.querySelector('[part="scrim"]');t&&this.scrimObserver.observe(t);for(const r of T(this.overlayElements()))this.scrimObserver.observe(r,{box:"border-box"})}overlayElements(){return this.shadowRoot?.querySelector('slot[name="overlay"]')?.assignedElements({flatten:!0})??[]}measureScrimReach(){const e=this.shadowRoot?.querySelector(".frame");if(!e)return;const t=this.resolvedScrim();let r=0;const i=this.shadowRoot?.querySelector('[part="scrim"]');if(this.banner&&this.overlayHasContent&&i&&q(t)){const a=i.getBoundingClientRect();if(a.width<=0||a.height<=0)return;const o=U(this.overlayElements().map(F));r=H(t,a,o)}r!==this.appliedScrimReach&&(this.appliedScrimReach=r,r>0?e.style.setProperty("--_esp-image-scrim-reach",`${r}%`):e.style.removeProperty("--_esp-image-scrim-reach"))}effectiveSizes(){return this.renderedWidth>0?`${this.renderedWidth}px`:this.sizes}buildSources(){const e=new Map;for(const t of this.querySelectorAll("esp-image-option")){const r=t.getAttribute("url"),i=Number(t.getAttribute("width"));if(!r||!Number.isFinite(i)||i<=0)continue;const a=t.getAttribute("type")??"",o=e.get(a)??[];o.push({url:r,width:i}),e.set(a,o)}return Array.from(e,([t,r])=>({type:t,srcset:r.sort((i,a)=>i.width-a.width).map(i=>`${i.url} ${i.width}w`).join(", ")})).filter(t=>t.srcset.length>0)}resolvedBannerScheme(){return this.bannerScheme!=="auto"?this.bannerScheme:this.scheme==="dark"?"dark":"light"}resolvedTexture(){return x(this.texture)?this.texture:b(this.texture)?this.texture:"none"}resolvedScrim(){return this.scrim!=="auto"?this.scrim:this.overlayHasContent?this.contentPosition.startsWith("top")?"top":this.contentPosition.startsWith("bottom")?"bottom":"radial":"none"}resolvedAspectRatio(){const e=_(this.originalWidth,this.originalHeight);if(!this.banner)return e?`${e.width} / ${e.height}`:null;const t=R(this.ratio);return(this.compact?R(this.compactRatio):null)??t??(e?`${e.width} / ${e.height}`:null)}normalizeEnums(e){e.has("scrim")&&!k.has(this.scrim)&&(this.scrim="auto"),e.has("bannerScheme")&&!O.has(this.bannerScheme)&&(this.bannerScheme="auto"),e.has("scrimStrength")&&!w.has(this.scrimStrength)&&(this.scrimStrength="medium"),e.has("scrimEdge")&&!S.has(this.scrimEdge)&&(this.scrimEdge="none"),e.has("textureScale")&&!z.has(this.textureScale)&&(this.textureScale="medium"),e.has("contentPosition")&&!j.has(this.contentPosition)&&(this.contentPosition="bottom-start")}willUpdate(e){super.willUpdate(e),this.normalizeEnums(e);const t=W(this.focusPoint),r=Number((t.x*100).toFixed(4)),i=Number((t.y*100).toFixed(4));this.style.setProperty("--_esp-image-object-position",`${r}% ${i}%`);const a=this.resolvedAspectRatio();a?this.style.setProperty("--_esp-image-aspect-ratio",a):this.style.removeProperty("--_esp-image-aspect-ratio");const o=this.resolvedTexture();if(["paper","grain","grunge"].includes(o)){const g=o==="grunge"&&this.resolvedBannerScheme()==="light"?"grunge-light":o;this.style.setProperty("--_esp-image-texture-filter",`url(#${M(g,this.textureScale)})`)}else this.style.removeProperty("--_esp-image-texture-filter");const m=x(o)?void 0:b(o),C=[["--_esp-image-registered-image",m?.image],["--_esp-image-registered-size",m?.size],["--_esp-image-registered-repeat",m?.repeat],["--_esp-image-registered-position",m?.position],["--_esp-image-registered-opacity",m?.opacity?.toString()],["--_esp-image-registered-blend-mode",m?.blendMode]];for(const[g,f]of C)f===void 0?this.style.removeProperty(g):this.style.setProperty(g,f)}firstUpdated(e){super.firstUpdated(e);const t=this.shadowRoot?.querySelector('slot[name="overlay"]');t&&(this.overlayHasContent=y(t)),this.observeScrimTargets()}updated(e){if(super.updated(e),this.syncOffscreenDeferral(),(e.has("banner")||e.has("scrim")||e.has("contentPosition")||e.has("overlayHasContent")||e.has("compact"))&&this.observeScrimTargets(),["paper","grain","grunge"].includes(this.resolvedTexture())&&this.renderRoot&&D(this.renderRoot),this.renderedWidth>0){const o=this.shadowRoot?.querySelector(".compact-sentinel")?.getBoundingClientRect().width??0,m=o>0&&this.renderedWidth<o;m!==this.compact&&(this.compact=m)}if(this.renderedWidth<=0||this.shouldDeferProjectedSizes())return;const t=this.findProjected();if(!t)return;const r=this.effectiveSizes();if(t.tagName==="PICTURE")for(const a of t.querySelectorAll("source"))a.setAttribute("sizes",r);const i=this.findProjectedImage(t);i?.hasAttribute("srcset")&&i.setAttribute("sizes",r)}renderMedia(){if(this.localImage)return h`<img
        src=${this.localImage}
        alt=${this.caption}
        decoding="async"
        loading=${this.loading}
      />`;const e=h`<slot @slotchange=${this.handleSlotChange}></slot>`;if(this.findProjected())return e;const t=this.buildSources();return h`
      <picture>
        ${t.map(r=>h`
            <source
              srcset=${r.srcset}
              sizes=${this.effectiveSizes()}
              type=${r.type||P}
            />
          `)}
        <img src=${this.imageUrl} alt=${this.caption} decoding="async" loading=${this.loading} />
      </picture>
      ${e}
    `}render(){return h`
      <div
        part="frame"
        class="frame"
        data-banner-scheme=${this.resolvedBannerScheme()}
        data-scrim=${this.resolvedScrim()}
        data-scrim-strength=${this.scrimStrength}
        data-scrim-edge=${this.scrimEdge}
        data-texture=${this.resolvedTexture()}
        data-texture-scale=${this.textureScale}
        data-content-position=${this.contentPosition}
      >
        <div part="image" class="image">${this.renderMedia()}</div>
        ${$({className:"banner-layers",imagePart:"texture",scrimPart:"scrim",texturePart:"texture"})}
        <div part="overlay" class="overlay" ?hidden=${!this.banner||!this.overlayHasContent}>
          <slot name="overlay" @slotchange=${this.handleSlotChange}></slot>
        </div>
        <span class="compact-sentinel" aria-hidden="true"></span>
      </div>
    `}static ensureProjectionStyles(e){const t=e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&"host"in e?e:e.nodeType===Node.DOCUMENT_NODE?e.head:e.ownerDocument?.head??document.head,r=Array.from(t.querySelectorAll("style[data-esp-image-projection-styles]")),i=r.find(o=>o.textContent===p.projectionStyles);if(i){for(const o of r)o!==i&&o.remove();return}for(const o of r)o.remove();const a=t.ownerDocument.createElement("style");a.dataset.espImageProjectionStyles="",a.textContent=p.projectionStyles,t.append(a)}};s.projectionStyles=`
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
  `,s.styles=[...v.styles,I`
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
      .overlay slot::slotted(*) {
        color: inherit !important;
        pointer-events: auto;
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
        
        .overlay {
          background: white;
          color: black;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .banner-layers,
        .overlay {
          animation: none !important;
          transition: none !important;
        }
      }
    `,A],n([c({attribute:"original-height",type:Number})],s.prototype,"originalHeight",void 0),n([c({attribute:"original-width",type:Number})],s.prototype,"originalWidth",void 0),n([c({attribute:"low-res",type:String})],s.prototype,"imageUrl",void 0),n([c({attribute:"local-image",type:String})],s.prototype,"localImage",void 0),n([c({type:String})],s.prototype,"caption",void 0),n([c({attribute:"sizes",type:String})],s.prototype,"sizes",void 0),n([c({attribute:"loading",type:String})],s.prototype,"loading",void 0),n([c({attribute:"defer-offscreen",type:Boolean})],s.prototype,"deferOffscreen",void 0),n([c({type:Boolean,reflect:!0})],s.prototype,"banner",void 0),n([c({attribute:"banner-scheme",converter:d(O,"auto"),reflect:!0})],s.prototype,"bannerScheme",void 0),n([c({converter:d(k,"auto"),reflect:!0})],s.prototype,"scrim",void 0),n([c({attribute:"scrim-strength",converter:d(w,"medium"),reflect:!0})],s.prototype,"scrimStrength",void 0),n([c({attribute:"scrim-edge",converter:d(S,"none"),reflect:!0})],s.prototype,"scrimEdge",void 0),n([c({type:String,reflect:!0})],s.prototype,"texture",void 0),n([c({attribute:"texture-scale",converter:d(z,"medium"),reflect:!0})],s.prototype,"textureScale",void 0),n([c({attribute:"content-position",converter:d(j,"bottom-start"),reflect:!0})],s.prototype,"contentPosition",void 0),n([c({attribute:"focus",converter:N,reflect:!0})],s.prototype,"focusPoint",void 0),n([c({type:String})],s.prototype,"ratio",void 0),n([c({attribute:"compact-ratio",type:String})],s.prototype,"compactRatio",void 0),n([u()],s.prototype,"renderedWidth",void 0),n([u()],s.prototype,"compact",void 0),n([u()],s.prototype,"overlayHasContent",void 0),s=p=n([E("esp-image")],s);export{s as EspalierImage,R as parseImageRatio};
