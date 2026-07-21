var n=function(p,e,t,r){var i=arguments.length,o=i<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(p,e,t,r);else for(var c=p.length-1;c>=0;c--)(s=p[c])&&(o=(i<3?s(o):i>3?s(e,t,o):s(e,t))||o);return i>3&&o&&Object.defineProperty(e,t,o),o},m;import{css as T,html as d,nothing as N}from"lit";import{customElement as P,property as l,state as u}from"lit/decorators.js";import{EspalierElementBase as y}from"../shared/esp-element-base.js";import{slotHasContent as f}from"../shared/slot-content.js";import{renderVisualOverlay as R,visualOverlayStyles as I}from"../shared/visual-overlay.js";import{focusConverter as E,normalizeFocus as O}from"./image-focus.js";import{ensureImageTextureFilters as A,imageTextureFilterId as W}from"./image-texture-filters.js";import{getImageTexture as b,isBuiltInImageTexture as x,subscribeToImageTextureRegistry as H}from"../shared/image-texture-registry.js";import{validImageDimensions as _}from"./image-dimensions.js";import"./esp-image-option.js";const k=new Set(["auto","none","flat","top","bottom","left","right","radial"]),S=new Set(["soft","medium","strong"]),w=new Set(["fine","medium","coarse"]),z=new Set(["auto","light","dark"]),j=new Set(["bottom-start","bottom","bottom-end","center","top-start","top","top-end"]);function h(p,e){return{fromAttribute(t){return t&&p.has(t)?t:e},toAttribute(t){return p.has(t)?t:e}}}function C(p){const e=p.trim();if(!e)return null;const t=e.split("/").map(i=>i.trim());if(t.length>2||t.some(i=>i.length===0))return null;const r=t.map(Number);return r.some(i=>!Number.isFinite(i)||i<=0)?null:r.length===1?String(r[0]):`${r[0]} / ${r[1]}`}let a=m=class extends y{constructor(){super(...arguments),this.originalHeight=0,this.originalWidth=0,this.imageUrl="",this.localImage="",this.caption="",this.sizes="100vw",this.loading="eager",this.banner=!1,this.bannerScheme="auto",this.scrim="auto",this.scrimStrength="medium",this.texture="none",this.textureScale="medium",this.contentPosition="bottom-start",this.focusPoint={x:.5,y:.5},this.ratio="",this.compactRatio="",this.renderedWidth=0,this.compact=!1,this.overlayHasContent=!1,this.resizeObserver=null,this.unsubscribeTextures=null,this.handleSlotChange=e=>{if(e.target instanceof HTMLSlotElement){if(e.target.name==="overlay"){const t=f(e.target);t!==this.overlayHasContent&&(this.overlayHasContent=t);return}this.requestUpdate()}}}get isPortrait(){const e=_(this.originalWidth,this.originalHeight);return e!==null&&e.height>e.width}findProjected(){for(const e of this.children)if(e.tagName==="PICTURE"||e.tagName==="IMG")return e;return null}connectedCallback(){super.connectedCallback(),m.ensureProjectionStyles(this.getRootNode()),this.unsubscribeTextures??=H(()=>this.requestUpdate()),this.resizeObserver??=new ResizeObserver(e=>{const t=e[0]?.contentBoxSize?.[0],r=Math.round(t?t.inlineSize:e[0]?.contentRect.width??0);r>0&&r!==this.renderedWidth&&(this.renderedWidth=r)}),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeTextures?.(),this.unsubscribeTextures=null,this.resizeObserver?.disconnect(),this.resizeObserver=null}effectiveSizes(){return this.renderedWidth>0?`${this.renderedWidth}px`:this.sizes}buildSources(){const e=new Map;for(const t of this.querySelectorAll("esp-image-option")){const r=t.getAttribute("url"),i=Number(t.getAttribute("width"));if(!r||!Number.isFinite(i)||i<=0)continue;const o=t.getAttribute("type")??"",s=e.get(o)??[];s.push({url:r,width:i}),e.set(o,s)}return Array.from(e,([t,r])=>({type:t,srcset:r.sort((i,o)=>i.width-o.width).map(i=>`${i.url} ${i.width}w`).join(", ")})).filter(t=>t.srcset.length>0)}resolvedBannerScheme(){return this.bannerScheme!=="auto"?this.bannerScheme:this.scheme==="dark"?"dark":"light"}resolvedTexture(){return x(this.texture)?this.texture:b(this.texture)?this.texture:"none"}resolvedScrim(){return this.scrim!=="auto"?this.scrim:this.overlayHasContent?this.contentPosition.startsWith("top")?"top":this.contentPosition.startsWith("bottom")?"bottom":"radial":"none"}resolvedAspectRatio(){const e=_(this.originalWidth,this.originalHeight);if(!this.banner)return e?`${e.width} / ${e.height}`:null;const t=C(this.ratio);return(this.compact?C(this.compactRatio):null)??t??(e?`${e.width} / ${e.height}`:null)}normalizeEnums(e){e.has("scrim")&&!k.has(this.scrim)&&(this.scrim="auto"),e.has("bannerScheme")&&!z.has(this.bannerScheme)&&(this.bannerScheme="auto"),e.has("scrimStrength")&&!S.has(this.scrimStrength)&&(this.scrimStrength="medium"),e.has("textureScale")&&!w.has(this.textureScale)&&(this.textureScale="medium"),e.has("contentPosition")&&!j.has(this.contentPosition)&&(this.contentPosition="bottom-start")}willUpdate(e){super.willUpdate(e),this.normalizeEnums(e);const t=O(this.focusPoint),r=Number((t.x*100).toFixed(4)),i=Number((t.y*100).toFixed(4));this.style.setProperty("--_esp-image-object-position",`${r}% ${i}%`);const o=this.resolvedAspectRatio();o?this.style.setProperty("--_esp-image-aspect-ratio",o):this.style.removeProperty("--_esp-image-aspect-ratio");const s=this.resolvedTexture();if(["paper","grain","grunge"].includes(s)){const g=s==="grunge"&&this.resolvedBannerScheme()==="light"?"grunge-light":s;this.style.setProperty("--_esp-image-texture-filter",`url(#${W(g,this.textureScale)})`)}else this.style.removeProperty("--_esp-image-texture-filter");const c=x(s)?void 0:b(s),$=[["--_esp-image-registered-image",c?.image],["--_esp-image-registered-size",c?.size],["--_esp-image-registered-repeat",c?.repeat],["--_esp-image-registered-position",c?.position],["--_esp-image-registered-opacity",c?.opacity?.toString()],["--_esp-image-registered-blend-mode",c?.blendMode]];for(const[g,v]of $)v===void 0?this.style.removeProperty(g):this.style.setProperty(g,v)}firstUpdated(e){super.firstUpdated(e);const t=this.shadowRoot?.querySelector('slot[name="overlay"]');t&&(this.overlayHasContent=f(t))}updated(e){if(super.updated(e),["paper","grain","grunge"].includes(this.resolvedTexture())&&this.renderRoot&&A(this.renderRoot),this.renderedWidth>0){const s=this.shadowRoot?.querySelector(".compact-sentinel")?.getBoundingClientRect().width??0,c=s>0&&this.renderedWidth<s;c!==this.compact&&(this.compact=c)}if(this.renderedWidth<=0)return;const t=this.findProjected();if(!t)return;const r=this.effectiveSizes();if(t.tagName==="PICTURE")for(const o of t.querySelectorAll("source"))o.setAttribute("sizes",r);const i=t.tagName==="IMG"?t:t.querySelector("img");i?.hasAttribute("srcset")&&i.setAttribute("sizes",r)}renderMedia(){if(this.localImage)return d`<img
        src=${this.localImage}
        alt=${this.caption}
        decoding="async"
        loading=${this.loading}
      />`;const e=d`<slot @slotchange=${this.handleSlotChange}></slot>`;if(this.findProjected())return e;const t=this.buildSources();return d`
      <picture>
        ${t.map(r=>d`
            <source
              srcset=${r.srcset}
              sizes=${this.effectiveSizes()}
              type=${r.type||N}
            />
          `)}
        <img src=${this.imageUrl} alt=${this.caption} decoding="async" loading=${this.loading} />
      </picture>
      ${e}
    `}render(){return d`
      <div
        part="frame"
        class="frame"
        data-banner-scheme=${this.resolvedBannerScheme()}
        data-scrim=${this.resolvedScrim()}
        data-scrim-strength=${this.scrimStrength}
        data-texture=${this.resolvedTexture()}
        data-texture-scale=${this.textureScale}
        data-content-position=${this.contentPosition}
      >
        <div part="image" class="image">${this.renderMedia()}</div>
        ${R({className:"banner-layers",imagePart:"texture",scrimPart:"scrim",texturePart:"texture"})}
        <div part="overlay" class="overlay" ?hidden=${!this.banner||!this.overlayHasContent}>
          <slot name="overlay" @slotchange=${this.handleSlotChange}></slot>
        </div>
        <span class="compact-sentinel" aria-hidden="true"></span>
      </div>
    `}static ensureProjectionStyles(e){const t=e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&"host"in e?e:e.nodeType===Node.DOCUMENT_NODE?e.head:e.ownerDocument?.head??document.head,r=Array.from(t.querySelectorAll("style[data-esp-image-projection-styles]")),i=r.find(s=>s.textContent===m.projectionStyles);if(i){for(const s of r)s!==i&&s.remove();return}for(const s of r)s.remove();const o=t.ownerDocument.createElement("style");o.dataset.espImageProjectionStyles="",o.textContent=m.projectionStyles,t.append(o)}};a.projectionStyles=`
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
  `,a.styles=[...y.styles,T`
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

      .frame[data-scrim="none"] {
        --_esp-overlay-scrim: none;
      }
      .frame[data-scrim="flat"] {
        --_esp-overlay-scrim: var(--_esp-image-scrim-resolved);
      }
      .frame[data-scrim="top"] {
        --_esp-overlay-scrim: linear-gradient(
          to bottom,
          var(--_esp-image-scrim-resolved) 0% 20%,
          color-mix(in oklch, var(--_esp-image-scrim-resolved) 68%, transparent) 48%,
          transparent 78%
        );
      }
      .frame[data-scrim="bottom"] {
        --_esp-overlay-scrim: linear-gradient(
          to top,
          var(--_esp-image-scrim-resolved) 0% 20%,
          color-mix(in oklch, var(--_esp-image-scrim-resolved) 68%, transparent) 48%,
          transparent 78%
        );
      }
      .frame[data-scrim="left"] {
        --_esp-overlay-scrim: linear-gradient(
          to right,
          var(--_esp-image-scrim-resolved) 0% 20%,
          color-mix(in oklch, var(--_esp-image-scrim-resolved) 68%, transparent) 48%,
          transparent 78%
        );
      }
      .frame[data-scrim="right"] {
        --_esp-overlay-scrim: linear-gradient(
          to left,
          var(--_esp-image-scrim-resolved) 0% 20%,
          color-mix(in oklch, var(--_esp-image-scrim-resolved) 68%, transparent) 48%,
          transparent 78%
        );
      }
      .frame[data-scrim="radial"] {
        --_esp-overlay-scrim: radial-gradient(
          circle at center,
          var(--_esp-image-scrim-resolved) 0%,
          color-mix(in oklch, var(--_esp-image-scrim-resolved) 72%, transparent) 34%,
          color-mix(in oklch, var(--_esp-image-scrim-resolved) 28%, transparent) 64%,
          transparent 82%
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
    `,I],n([l({attribute:"original-height",type:Number})],a.prototype,"originalHeight",void 0),n([l({attribute:"original-width",type:Number})],a.prototype,"originalWidth",void 0),n([l({attribute:"low-res",type:String})],a.prototype,"imageUrl",void 0),n([l({attribute:"local-image",type:String})],a.prototype,"localImage",void 0),n([l({type:String})],a.prototype,"caption",void 0),n([l({attribute:"sizes",type:String})],a.prototype,"sizes",void 0),n([l({attribute:"loading",type:String})],a.prototype,"loading",void 0),n([l({type:Boolean,reflect:!0})],a.prototype,"banner",void 0),n([l({attribute:"banner-scheme",converter:h(z,"auto"),reflect:!0})],a.prototype,"bannerScheme",void 0),n([l({converter:h(k,"auto"),reflect:!0})],a.prototype,"scrim",void 0),n([l({attribute:"scrim-strength",converter:h(S,"medium"),reflect:!0})],a.prototype,"scrimStrength",void 0),n([l({type:String,reflect:!0})],a.prototype,"texture",void 0),n([l({attribute:"texture-scale",converter:h(w,"medium"),reflect:!0})],a.prototype,"textureScale",void 0),n([l({attribute:"content-position",converter:h(j,"bottom-start"),reflect:!0})],a.prototype,"contentPosition",void 0),n([l({attribute:"focus",converter:E,reflect:!0})],a.prototype,"focusPoint",void 0),n([l({type:String})],a.prototype,"ratio",void 0),n([l({attribute:"compact-ratio",type:String})],a.prototype,"compactRatio",void 0),n([u()],a.prototype,"renderedWidth",void 0),n([u()],a.prototype,"compact",void 0),n([u()],a.prototype,"overlayHasContent",void 0),a=m=n([P("esp-image")],a);export{a as EspalierImage,C as parseImageRatio};
