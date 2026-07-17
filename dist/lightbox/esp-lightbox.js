var c=function(l,e,t,i){var a=arguments.length,s=a<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(l,e,t,i);else for(var n=l.length-1;n>=0;n--)(r=l[n])&&(s=(a<3?r(s):a>3?r(e,t,s):r(e,t))||s);return a>3&&s&&Object.defineProperty(e,t,s),s},d;import{css as I,html as h,nothing as m}from"lit";import{customElement as C,property as y,state as _}from"lit/decorators.js";import{classMap as f}from"lit/directives/class-map.js";import{keyed as D}from"lit/directives/keyed.js";import{styleMap as b}from"lit/directives/style-map.js";import{cancelSVG as k}from"../shared/svgs/cancel.js";import{commentSVG as R}from"../shared/svgs/comment.js";import{leftArrow as O}from"../shared/svgs/left-arrow.js";import{rightArrow as $}from"../shared/svgs/right-arrow.js";import{validImageDimensions as g}from"../image/image-dimensions.js";import{EspalierElementBase as w}from"../shared/esp-element-base.js";import{OverlayController as S}from"../shared/overlay-controller.js";import"../image/esp-image.js";import"../image/esp-image-option.js";import"../button/esp-button.js";function z(l,e){if(!l)return e;const t=Math.min(e.width/l.width,e.height/l.height);return!Number.isFinite(t)||t<=0?e:{width:Math.min(e.width,l.width*t),height:Math.min(e.height,l.height*t)}}let o=d=class extends w{constructor(){super(...arguments),this.isOpen=!1,this.currentIndex=0,this.drawerOpen=!1,this._images=[],this._clickHandlers=new Map,this._clickSetupRaf=null,this._imageMeasureRaf=null,this._galleryObserver=null,this._galleryRefreshRaf=null,this._galleryRefreshInvalidatesDimensions=!1,this._observedGallery=null,this._imageContainerObserver=null,this._observedImageContainer=null,this._observedRenderedImage=null,this._loadedIntrinsicDimensions=null,this._imageDimensions=null,this._overlay=new S({host:this,getFocusTrapContainer:()=>this.shadowRoot?.querySelector(".lightbox")??null}),this._touchStartX=0,this._touchStartY=0,this._touchDeltaX=0,this._touchDeltaY=0,this._swiping=!1,this._swipingVertical=!1,this.for="",this.commentCount=0,this._scheduleImageMeasurement=()=>{!this.isOpen||this._imageMeasureRaf!==null||(this._imageMeasureRaf=requestAnimationFrame(()=>{this._imageMeasureRaf=null,!(!this.isOpen||!this.isConnected)&&(this._observeRenderedImage(),this._prepareImageDimensions())}))},this._handleViewportChange=()=>{this._prepareImageDimensions(),this._scheduleImageMeasurement()},this._handleRenderedImageLoad=()=>{const e=this._observedRenderedImage;if(!e)return;const t=g(e.naturalWidth,e.naturalHeight);t&&(this._loadedIntrinsicDimensions=t,this._prepareImageDimensions())}}get _commentLabel(){return this.commentCount<=0?"No comments. Add yours!":this.commentCount===1?"1 comment":`${this.commentCount} comments`}open(e){if(this._collectImages(),this._images.length===0)return;const t=Number.isFinite(e)?Math.trunc(e):0,i=Math.max(0,Math.min(t,this._images.length-1));if(this.isOpen){i===this.currentIndex?(this._prepareImageDimensions(),this._scheduleImageMeasurement()):this._goTo(i);return}this.currentIndex=i,this._loadedIntrinsicDimensions=null,this._prepareImageDimensions(),this.isOpen=!0,this.drawerOpen=!1,this._startImageSizing(),this._overlay.open(),this._emitChanged(),this.updateComplete.then(()=>{this.isOpen&&this._overlay.moveFocusInto()})}close(){this.isOpen&&(this.isOpen=!1,this.drawerOpen=!1,this._stopImageSizing(),this._overlay.close())}_viewportDimensions(){const e=document.documentElement.clientWidth||window.innerWidth,t=document.documentElement.clientHeight||window.innerHeight;return g(e,t)??{width:1,height:1}}_availableImageDimensions(){const e=this.shadowRoot?.querySelector(".image-container");if(e){const t=e.getBoundingClientRect(),i=g(t.width,t.height);if(i)return i}return this._viewportDimensions()}_sourceIntrinsicDimensions(e){if(!e)return null;const t=g(e.originalWidth,e.originalHeight);if(t)return t;const i=Array.from(e.children).find(r=>r.tagName==="PICTURE"||r.tagName==="IMG"),s=(i?.tagName==="IMG"?i:i?.querySelector("img"))??e.shadowRoot?.querySelector("img");return s?g(s.naturalWidth,s.naturalHeight)??g(Number(s.getAttribute("width")),Number(s.getAttribute("height"))):null}_prepareImageDimensions(){const e=this._loadedIntrinsicDimensions??this._sourceIntrinsicDimensions(this._images[this.currentIndex]);this._setImageDimensions(z(e,this._availableImageDimensions()))}_setImageDimensions(e){const t=Math.max(1,e.width),i=Math.max(1,e.height);this._imageDimensions&&Math.abs(this._imageDimensions.width-t)<.5&&Math.abs(this._imageDimensions.height-i)<.5||(this._imageDimensions={width:t,height:i})}_responsiveSizes(){return`${Math.max(1,Math.ceil(this._imageDimensions?.width??1))}px`}_startImageSizing(){window.addEventListener("resize",this._handleViewportChange),window.addEventListener("orientationchange",this._handleViewportChange),window.visualViewport?.addEventListener("resize",this._handleViewportChange)}_observeImageContainer(){const e=this.shadowRoot?.querySelector(".image-container")??null;e!==this._observedImageContainer&&(this._imageContainerObserver?.disconnect(),this._imageContainerObserver=null,this._observedImageContainer=e,!(!e||typeof ResizeObserver>"u")&&(this._imageContainerObserver=new ResizeObserver(this._scheduleImageMeasurement),this._imageContainerObserver.observe(e)))}_stopImageSizing(){window.removeEventListener("resize",this._handleViewportChange),window.removeEventListener("orientationchange",this._handleViewportChange),window.visualViewport?.removeEventListener("resize",this._handleViewportChange),this._imageContainerObserver?.disconnect(),this._imageContainerObserver=null,this._observedImageContainer=null,this._stopObservingRenderedImage(),this._imageMeasureRaf!==null&&(cancelAnimationFrame(this._imageMeasureRaf),this._imageMeasureRaf=null)}_observeRenderedImage(){const e=this.shadowRoot?.querySelector(".image-container esp-image"),i=e?.querySelector("img")??null??e?.shadowRoot?.querySelector("img")??null;i!==this._observedRenderedImage&&(this._stopObservingRenderedImage(),this._observedRenderedImage=i,i?.addEventListener("load",this._handleRenderedImageLoad)),i?.complete&&this._handleRenderedImageLoad()}_stopObservingRenderedImage(){this._observedRenderedImage?.removeEventListener("load",this._handleRenderedImageLoad),this._observedRenderedImage=null}_collectImages(){if(!this.for)return this._images=[],null;let e;try{e=document.querySelector(this.for)}catch{return this._images=[],null}return e?(this._images=Array.from(e.querySelectorAll("esp-image")),e):(this._images=[],null)}_attachClickHandlers(e=!1){const t=this._images[this.currentIndex],i=this.currentIndex;this._detachClickHandlers();const a=this._collectImages();if(this._images.forEach((p,x)=>{const v=()=>this.open(x);p.addEventListener("click",v),p.classList.add(d._CLICKABLE_CLASS),this._clickHandlers.set(p,v)}),this._observeGallery(a),!this.isOpen)return;if(this._images.length===0){this.close();return}const s=t?this._images.indexOf(t):-1,r=s>=0?s:Math.min(i,this._images.length-1),n=this._images[r]!==t,u=r!==this.currentIndex;this.currentIndex=r,(n||e)&&(this._loadedIntrinsicDimensions=null),this._prepareImageDimensions(),this.requestUpdate(),(n||u)&&this._emitChanged()}_detachClickHandlers(){for(const[e,t]of this._clickHandlers)e.removeEventListener("click",t),e.classList.remove(d._CLICKABLE_CLASS);this._clickHandlers.clear()}_observeGallery(e){e!==this._observedGallery&&(this._cancelGalleryRefresh(),this._galleryObserver?.disconnect(),this._galleryObserver=null,this._observedGallery=e,!(!e||typeof MutationObserver>"u")&&(this._galleryObserver=new MutationObserver(t=>this._scheduleGalleryRefresh(t)),this._galleryObserver.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["caption","height","local-image","low-res","media","original-height","original-width","src","srcset","type","url","width"]})))}_scheduleGalleryRefresh(e){const t=this._images[this.currentIndex];t&&(this._galleryRefreshInvalidatesDimensions||=e.some(i=>i.type==="attributes"&&i.attributeName==="caption"?!1:i.target===t||t.contains(i.target))),this._galleryRefreshRaf===null&&(this._galleryRefreshRaf=requestAnimationFrame(()=>{if(this._galleryRefreshRaf=null,!this.isConnected)return;const i=this._galleryRefreshInvalidatesDimensions;this._galleryRefreshInvalidatesDimensions=!1,this._attachClickHandlers(i)}))}_cancelGalleryRefresh(){this._galleryRefreshRaf!==null&&(cancelAnimationFrame(this._galleryRefreshRaf),this._galleryRefreshRaf=null),this._galleryRefreshInvalidatesDimensions=!1}_stopObservingGallery(){this._cancelGalleryRefresh(),this._galleryObserver?.disconnect(),this._galleryObserver=null,this._observedGallery=null}_goTo(e){const t=this._images.length;if(t===0)return;const i=(e%t+t)%t;i!==this.currentIndex&&(this.currentIndex=i,this._loadedIntrinsicDimensions=null,this._prepareImageDimensions(),this._scheduleImageMeasurement(),this._emitChanged())}_emitChanged(){this.dispatchEvent(new CustomEvent("esp-lightbox-changed",{detail:{index:this.currentIndex},bubbles:!0,composed:!0}))}_prev(){this._goTo(this.currentIndex-1)}_next(){this._goTo(this.currentIndex+1)}_handleKeyDown(e){if(this.isOpen)switch(e.key){case"Escape":e.preventDefault(),this.close();break;case"ArrowLeft":e.preventDefault(),this._prev();break;case"ArrowRight":e.preventDefault(),this._next();break;case"ArrowUp":e.preventDefault(),this.drawerOpen||this._toggleDrawer();break;case"ArrowDown":e.preventDefault(),this.drawerOpen&&this._toggleDrawer();break;case"Tab":this._overlay.trapFocus(e);break}}_handleTouchStart(e){e.touches.length===1&&(this._touchStartX=e.touches[0].clientX,this._touchStartY=e.touches[0].clientY,this._touchDeltaX=0,this._touchDeltaY=0,this._swiping=!1,this._swipingVertical=!1)}_handleTouchMove(e){if(e.touches.length!==1)return;const t=e.touches[0].clientX-this._touchStartX,i=e.touches[0].clientY-this._touchStartY;!this._swiping&&!this._swipingVertical&&(Math.abs(t)>10||Math.abs(i)>10)&&(Math.abs(t)>Math.abs(i)?this._swiping=!0:this._swipingVertical=!0),this._swiping?(e.preventDefault(),this._touchDeltaX=t):this._swipingVertical&&(e.preventDefault(),this._touchDeltaY=i)}_handleTouchEnd(){this._swiping?this._touchDeltaX>50?this._prev():this._touchDeltaX<-50&&this._next():this._swipingVertical&&(this._touchDeltaY<-50&&!this.drawerOpen?this._toggleDrawer():this._touchDeltaY>50&&this.drawerOpen&&this._toggleDrawer()),this._touchDeltaX=0,this._touchDeltaY=0,this._swiping=!1,this._swipingVertical=!1}_handleLightboxClick(e){if(!this.drawerOpen)return;const t=this.shadowRoot?.querySelector(".comment-panel");t&&e.composedPath().includes(t)||(this.drawerOpen=!1)}_handleImageContainerClick(e){if(e.target===e.currentTarget){if(this.drawerOpen){this.drawerOpen=!1;return}this.close()}}_toggleDrawer(){this.drawerOpen=!this.drawerOpen}_handleBarKeyDown(e){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._toggleDrawer())}connectedCallback(){super.connectedCallback(),!this._overlay.isPromoting&&(d._ensureGlobalStyles(),this._clickSetupRaf=requestAnimationFrame(()=>{this._clickSetupRaf=null,this.isConnected&&this._attachClickHandlers()}))}static _ensureGlobalStyles(){if(document.head.querySelector("style[data-esp-lightbox-global-styles]"))return;const e=document.createElement("style");e.dataset.espLightboxGlobalStyles="",e.textContent=`.${d._CLICKABLE_CLASS} { cursor: pointer; }`,document.head.appendChild(e)}updated(e){super.updated(e),e.has("for")&&this._attachClickHandlers(),this.isOpen?(this._observeImageContainer(),this._scheduleImageMeasurement()):this._stopImageSizing()}disconnectedCallback(){if(super.disconnectedCallback(),this._overlay.isPromoting)return;this._clickSetupRaf!==null&&(cancelAnimationFrame(this._clickSetupRaf),this._clickSetupRaf=null);const e=this.isOpen;this._stopImageSizing(),this._stopObservingGallery(),this._detachClickHandlers(),e&&(this.isOpen=!1,this.drawerOpen=!1,this._overlay.close())}_renderCurrentImage(){const e=this._images[this.currentIndex];if(!e)return m;const t=this._responsiveSizes(),i=this._imageDimensions??this._viewportDimensions(),a={width:`${i.width}px`,height:`${i.height}px`};if(e.localImage)return h`
        <esp-image
          class="lightbox-image"
          original-width=${e.originalWidth}
          original-height=${e.originalHeight}
          caption=${e.caption}
          .localImage=${e.localImage}
          .sizes=${t}
          style=${b(a)}
        ></esp-image>
      `;const s=Array.from(e.children).find(n=>n.tagName==="PICTURE"||n.tagName==="IMG");if(s){const n=s.cloneNode(!0);n.querySelectorAll("source").forEach(p=>p.setAttribute("sizes",t));const u=n.tagName==="IMG"?n:n.querySelector("img");return u?.hasAttribute("srcset")&&u.setAttribute("sizes",t),h`
        <esp-image
          class="lightbox-image"
          original-width=${e.originalWidth}
          original-height=${e.originalHeight}
          caption=${e.caption}
          .sizes=${t}
          style=${b(a)}
        >
          ${n}
        </esp-image>
      `}const r=Array.from(e.querySelectorAll("esp-image-option"));return h`
      <esp-image
        class="lightbox-image"
        original-width=${e.originalWidth}
        original-height=${e.originalHeight}
        low-res=${e.imageUrl}
        caption=${e.caption}
        .sizes=${t}
        style=${b(a)}
      >
        ${r.map(n=>h`
            <esp-image-option
              width=${n.width}
              url=${n.imageUrl}
              type=${n.type||m}
            ></esp-image-option>
          `)}
      </esp-image>
    `}render(){if(!this.isOpen)return m;const e=this._images[this.currentIndex],t=e?.caption??"",i=this._images.length;return h`
      <div
        class="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
        tabindex="-1"
        @keydown=${this._handleKeyDown}
        @click=${this._handleLightboxClick}
        @touchstart=${this._handleTouchStart}
        @touchmove=${this._handleTouchMove}
        @touchend=${this._handleTouchEnd}
      >
        <div class="backdrop"></div>
        <div class="backdrop-image"></div>

        <esp-button
          class="close-btn"
          icon-only
          collapsed
          variant="danger"
          label="Close lightbox"
          @clicked=${this.close}
        >
          ${k}
        </esp-button>

        ${i>1?h`
              <esp-button
                class="prev-btn"
                icon-only
                collapsed
                label="Previous image"
                @clicked=${this._prev}
              >
                ${O}
              </esp-button>
              <esp-button
                class="next-btn"
                icon-only
                collapsed
                label="Next image"
                @clicked=${this._next}
              >
                ${$}
              </esp-button>
            `:m}

        
        <div class="image-container" @click=${this._handleImageContainerClick}>
          ${D(e,this._renderCurrentImage())}
        </div>

        <div class=${f({"comment-panel":!0,open:this.drawerOpen})}>
          <div class="comment-bar">
            ${i>1?h`
                  
                  <nav class="dots" aria-label="Image navigation">
                    ${this._images.map((a,s)=>h`
                        <button
                          type="button"
                          class=${f({dot:!0,active:s===this.currentIndex})}
                          aria-label="Image ${s+1} of ${i}"
                          aria-current=${s===this.currentIndex?"true":"false"}
                          @click=${()=>this._goTo(s)}
                        ></button>
                      `)}
                  </nav>
                `:m}
            <div
              class="comment-bar-toggle"
              role="button"
              tabindex="0"
              aria-expanded=${this.drawerOpen?"true":"false"}
              aria-controls="drawer-body"
              @click=${this._toggleDrawer}
              @keydown=${this._handleBarKeyDown}
            >
              <span class="comment-bar-icon">${R}</span>
              <span class="comment-bar-label">${this._commentLabel}</span>
              <span class=${f({"comment-bar-caret":!0,open:this.drawerOpen})}>
                ${M}
              </span>
            </div>
          </div>
          <div class="drawer-body" id="drawer-body">
            ${t?h`<div class="caption">${t}</div>`:m}
            <slot name="comments"></slot>
          </div>
        </div>
      </div>
    `}};o._CLICKABLE_CLASS="esp-lightbox-clickable",o.styles=[...w.styles,I`
      :host {
        display: contents;
      }

      .lightbox {
        position: fixed;
        inset: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        overflow: hidden;
      }

      .backdrop {
        position: fixed;
        inset: 0;
        background: var(--esp-lightbox-bg, var(--esp-vellum-background, var(--esp-color-layer-3)));
        opacity: var(--esp-lightbox-bg-opacity, var(--esp-vellum-opacity, 0.85));
        z-index: 0;
      }

      .backdrop-image {
        position: fixed;
        inset: 0;
        background-image: var(--esp-vellum-background-image, none);
        background-repeat: repeat;
        opacity: var(--esp-vellum-background-image-opacity, 0.3);
        z-index: 0;
        pointer-events: none;
      }

      

      .close-btn,
      .prev-btn,
      .next-btn {
        position: absolute;
        z-index: 2;
        opacity: 0.7;
        transition: opacity 0.2s;

        &:hover,
        &:focus-within {
          opacity: 1;
        }
      }

      .close-btn {
        top: var(--esp-size-small);
        right: var(--esp-size-small);
      }

      .prev-btn {
        left: var(--esp-size-small);
        top: 50%;
        transform: translateY(-50%);
      }

      .next-btn {
        right: var(--esp-size-small);
        top: 50%;
        transform: translateY(-50%);
      }

      

      .image-container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
      }

      .image-container esp-image {
        --esp-image-border: none;
        --_esp-image-object-fit: contain;
        flex: none;
        border-radius: 0;
      }

      .image-container esp-image > picture,
      .image-container esp-image > img,
      .image-container esp-image > picture > img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      

      .comment-panel {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 3;
        display: flex;
        flex-direction: column;
        
        transform: translateY(calc(100% - var(--_bar-height)));
        transition: transform 0.3s ease;

        --_bar-height: calc(3 * var(--esp-size-small));

        &:has(.dots) {
          --_bar-height: calc(4.875 * var(--esp-size-small));
        }

        &.open {
          transform: translateY(0);
        }
      }

      .comment-bar {
        display: flex;
        flex-direction: column;
        width: 100%;
        background: oklch(from var(--esp-color-layer-3) l c h / 0.85);
        color: var(--esp-color-text);
        border-top: 1px solid var(--esp-color-border);
        box-shadow: 0 -2px 6px var(--esp-color-shadow);
        box-sizing: border-box;
      }

      

      .dots {
        display: flex;
        gap: var(--esp-size-tiny);
        align-items: center;
        justify-content: center;
        padding: var(--esp-size-tiny) 0;
      }

      .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 2px solid oklch(from var(--esp-color-text) l c h / 0.6);
        background: transparent;
        padding: 0;
        cursor: pointer;
        transition:
          background 0.2s,
          border-color 0.2s;

        &.active {
          background: var(--esp-color-text);
          border-color: var(--esp-color-text);
        }

        &:hover {
          border-color: var(--esp-color-text);
        }

        &:focus-visible {
          outline: 2px solid var(--esp-color-text);
          outline-offset: 2px;
        }
      }

      .comment-bar-toggle {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--esp-size-tiny);
        height: calc(3 * var(--esp-size-small));
        padding: 0 var(--esp-size-small);
        font-size: var(--esp-type-small);
        cursor: pointer;

        &:focus-visible {
          outline: 2px solid var(--esp-color-text);
          outline-offset: -2px;
        }
      }

      .comment-bar-icon {
        display: flex;
        width: var(--esp-size-font);
        height: var(--esp-size-font);

        & svg {
          width: 100%;
          height: 100%;
        }
      }

      .comment-bar-label {
        font-weight: 500;
      }

      .comment-bar-caret {
        display: flex;
        width: var(--esp-size-small);
        height: var(--esp-size-small);
        transition: transform 0.3s ease;

        & svg {
          width: 100%;
          height: 100%;
        }

        &.open {
          transform: rotate(180deg);
        }
      }

      .drawer-body {
        background: oklch(from var(--esp-color-layer-3) l c h / 0.85);
        color: var(--esp-color-text);
        overflow-y: auto;
        max-height: 40vh;
        padding: var(--esp-size-small);
        box-sizing: border-box;
      }

      .caption {
        color: var(--esp-color-text);
        font-size: var(--esp-type-small);
        line-height: 1.4;
        margin-bottom: var(--esp-size-tiny);
        text-align: center;
      }

      

      @media screen and (max-width: 600px) {
        .prev-btn,
        .next-btn {
          display: none;
        }
      }
    `],c([_()],o.prototype,"isOpen",void 0),c([_()],o.prototype,"currentIndex",void 0),c([_()],o.prototype,"drawerOpen",void 0),c([_()],o.prototype,"_imageDimensions",void 0),c([y({type:String})],o.prototype,"for",void 0),c([y({attribute:"comment-count",type:Number})],o.prototype,"commentCount",void 0),o=d=c([C("esp-lightbox")],o);const M=h` <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M6 15l6 -6l6 6" />
</svg>`;export{o as EspalierLightbox};
