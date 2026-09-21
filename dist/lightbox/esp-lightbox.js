var d=function(c,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(c,e,t,i);else for(var a=c.length-1;a>=0;a--)(n=c[a])&&(r=(s<3?n(r):s>3?n(e,t,r):n(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},m;import{css as O,html as o,nothing as l}from"lit";import{customElement as D,property as _,state as u}from"lit/decorators.js";import{classMap as b}from"lit/directives/class-map.js";import{keyed as k}from"lit/directives/keyed.js";import{styleMap as v}from"lit/directives/style-map.js";import{cancelSVG as $}from"../shared/svgs/cancel.js";import{commentSVG as S}from"../shared/svgs/comment.js";import{leftArrow as R}from"../shared/svgs/left-arrow.js";import{rightArrow as z}from"../shared/svgs/right-arrow.js";import{validImageDimensions as g}from"../image/image-dimensions.js";import{EspalierElementBase as x}from"../shared/esp-element-base.js";import{ESP_EVENTS as B}from"../shared/events.js";import{OverlayController as M}from"../shared/overlay-controller.js";import{RafThrottle as w}from"../shared/raf-throttle.js";import"../image/esp-image.js";import"../image/esp-image-option.js";import"../button/esp-button.js";function C(c,e){if(!c)return e;const t=Math.min(e.width/c.width,e.height/c.height);return!Number.isFinite(t)||t<=0?e:{width:Math.min(e.width,c.width*t),height:Math.min(e.height,c.height*t)}}let h=m=class extends x{constructor(){super(...arguments),this.isOpen=!1,this.currentIndex=0,this.drawerOpen=!1,this._images=[],this._clickHandlers=new Map,this._clickSetupFrame=new w(()=>this._runClickSetup()),this._imageMeasureFrame=new w(()=>this._runImageMeasurement()),this._galleryObserver=null,this._galleryRefreshFrame=new w(()=>this._runGalleryRefresh()),this._galleryRefreshInvalidatesDimensions=!1,this._observedGallery=null,this._imageContainerObserver=null,this._observedImageContainer=null,this._observedRenderedImage=null,this._loadedIntrinsicDimensions=null,this._prefetched=new Map,this._captionBarObserver=null,this._observedCaptionParts=[null,null],this._commentBarObserver=null,this._observedCommentBar=null,this._captionClipped=!1,this._imageDimensions=null,this._overlay=new M({host:this,getFocusTrapContainer:()=>this.shadowRoot?.querySelector(".lightbox")??null}),this._touchStartX=0,this._touchStartY=0,this._touchDeltaX=0,this._touchDeltaY=0,this._swiping=!1,this._swipingVertical=!1,this.for="",this.commentCount=0,this.hideComments=!1,this.hideCaption=!1,this._scheduleImageMeasurement=()=>{this.isOpen&&this._imageMeasureFrame.schedule()},this._handleViewportChange=()=>{this._prepareImageDimensions(),this._scheduleImageMeasurement()},this._handleRenderedImageLoad=()=>{const e=this._observedRenderedImage;if(!e)return;const t=g(e.naturalWidth,e.naturalHeight);t&&(this._loadedIntrinsicDimensions=t,this._prepareImageDimensions())},this._measureCaptionClipped=()=>{const e=this.shadowRoot?.querySelector(".caption-line"),t=this.shadowRoot?.querySelector(".caption-toggle");let i=!1;if(e&&t){const s=getComputedStyle(t),r=t.clientWidth-(Number.parseFloat(s.paddingLeft)||0)-(Number.parseFloat(s.paddingRight)||0);i=e.scrollWidth-r>1}i!==this._captionClipped&&(this._captionClipped=i),this.drawerOpen&&!this._drawerAvailable&&(this.drawerOpen=!1)},this._syncBarHeight=()=>{const e=this.shadowRoot?.querySelector(".comment-panel"),t=this._observedCommentBar;!e||!t||e.style.setProperty("--_bar-height",`${t.getBoundingClientRect().height}px`)}}get _commentLabel(){return this.commentCount<=0?"No comments. Add yours!":this.commentCount===1?"1 comment":`${this.commentCount} comments`}open(e){if(this._collectImages(),this._images.length===0)return;const t=Number.isFinite(e)?Math.trunc(e):0,i=Math.max(0,Math.min(t,this._images.length-1));if(this.isOpen){i===this.currentIndex?(this._prepareImageDimensions(),this._scheduleImageMeasurement()):this._goTo(i);return}this.currentIndex=i,this._loadedIntrinsicDimensions=null,this._prepareImageDimensions(),this.isOpen=!0,this.drawerOpen=!1,this._startImageSizing(),this._overlay.open(),this._emitChanged(),this.updateComplete.then(()=>{this.isOpen&&this._overlay.moveFocusInto()})}close(){this.isOpen&&(this.isOpen=!1,this.drawerOpen=!1,this._stopImageSizing(),this._overlay.close())}_viewportDimensions(){const e=document.documentElement.clientWidth||window.innerWidth,t=document.documentElement.clientHeight||window.innerHeight;return g(e,t)??{width:1,height:1}}_availableImageDimensions(){const e=this.shadowRoot?.querySelector(".image-container");if(e){const t=e.getBoundingClientRect(),i=g(t.width,t.height);if(i)return i}return this._viewportDimensions()}_sourceIntrinsicDimensions(e){if(!e)return null;const t=g(e.originalWidth,e.originalHeight);if(t)return t;const i=Array.from(e.children).find(n=>n.tagName==="PICTURE"||n.tagName==="IMG"),r=(i?.tagName==="IMG"?i:i?.querySelector("img"))??e.shadowRoot?.querySelector("img");return r?g(r.naturalWidth,r.naturalHeight)??g(Number(r.getAttribute("width")),Number(r.getAttribute("height"))):null}_prepareImageDimensions(){const e=this._loadedIntrinsicDimensions??this._sourceIntrinsicDimensions(this._images[this.currentIndex]);this._setImageDimensions(C(e,this._availableImageDimensions()))}_setImageDimensions(e){const t=Math.max(1,e.width),i=Math.max(1,e.height);this._imageDimensions&&Math.abs(this._imageDimensions.width-t)<.5&&Math.abs(this._imageDimensions.height-i)<.5||(this._imageDimensions={width:t,height:i})}_responsiveSizes(){return`${Math.max(1,Math.ceil(this._imageDimensions?.width??1))}px`}_responsiveSizesFor(e){const t=C(this._sourceIntrinsicDimensions(e),this._availableImageDimensions());return`${Math.max(1,Math.ceil(t.width))}px`}_runImageMeasurement(){!this.isOpen||!this.isConnected||(this._observeRenderedImage(),this._prepareImageDimensions(),this._prefetchNeighbors())}_startImageSizing(){window.addEventListener("resize",this._handleViewportChange),window.addEventListener("orientationchange",this._handleViewportChange),window.visualViewport?.addEventListener("resize",this._handleViewportChange)}_observeImageContainer(){const e=this.shadowRoot?.querySelector(".image-container")??null;e!==this._observedImageContainer&&(this._imageContainerObserver?.disconnect(),this._imageContainerObserver=null,this._observedImageContainer=e,!(!e||typeof ResizeObserver>"u")&&(this._imageContainerObserver=new ResizeObserver(this._scheduleImageMeasurement),this._imageContainerObserver.observe(e)))}_stopImageSizing(){window.removeEventListener("resize",this._handleViewportChange),window.removeEventListener("orientationchange",this._handleViewportChange),window.visualViewport?.removeEventListener("resize",this._handleViewportChange),this._imageContainerObserver?.disconnect(),this._imageContainerObserver=null,this._observedImageContainer=null,this._stopObservingRenderedImage(),this._stopObservingCaptionBar(),this._stopObservingCommentBar(),this._clearPrefetch(),this._imageMeasureFrame.cancel()}_observeRenderedImage(){const e=this.shadowRoot?.querySelector(".image-container esp-image"),i=e?.querySelector("img")??null??e?.shadowRoot?.querySelector("img")??null;i!==this._observedRenderedImage&&(this._stopObservingRenderedImage(),this._observedRenderedImage=i,i?.addEventListener("load",this._handleRenderedImageLoad)),i?.complete&&this._handleRenderedImageLoad()}_stopObservingRenderedImage(){this._observedRenderedImage?.removeEventListener("load",this._handleRenderedImageLoad),this._observedRenderedImage=null}_projectedSource(e){return e?Array.from(e.children).find(t=>t.tagName==="PICTURE"||t.tagName==="IMG")??null:null}_prepareProjectedClone(e,t,i){const s=e.cloneNode(!0);s.querySelectorAll("source").forEach(n=>n.setAttribute("sizes",t));const r=s.tagName==="IMG"?s:s.querySelector("img");return r?(r.hasAttribute("srcset")&&r.setAttribute("sizes",t),r.setAttribute("loading","eager"),r.setAttribute("fetchpriority",i),r.setAttribute("decoding","async"),s):null}_projectedSignature(e){const t=[e.tagName];for(const s of e.querySelectorAll("source"))t.push(s.getAttribute("type"),s.getAttribute("media"),s.getAttribute("srcset"));const i=e.tagName==="IMG"?e:e.querySelector("img");return t.push(i?.getAttribute("src")??null,i?.getAttribute("srcset")??null,i?.getAttribute("crossorigin")??null,i?.getAttribute("referrerpolicy")??null),JSON.stringify(t)}_warmPlan(e){if(e.localImage)return null;const t=this._projectedSource(e);if(!t)return null;const i=this._responsiveSizesFor(e);return{projected:t,sizes:i,key:`${i}|${this._projectedSignature(t)}`}}_prefetchNeighbors(){const e=this.shadowRoot?.querySelector(".preload");if(!e)return;const t=this._images.length;if(!this.isOpen||t===0){this._clearPrefetch();return}const i=this._images[this.currentIndex],s=new Set,r=m._PREFETCH_RADIUS;for(let n=-r;n<=r;n++){if(n===0)continue;const a=((this.currentIndex+n)%t+t)%t,p=this._images[a];p&&p!==i&&s.add(p)}for(const[n,a]of this._prefetched)s.has(n)&&a.key===this._warmPlan(n)?.key||(a.node.remove(),this._prefetched.delete(n));for(const n of s){if(this._prefetched.has(n))continue;const a=this._warmPlan(n);if(!a)continue;const p=this._prepareProjectedClone(a.projected,a.sizes,"low");p&&(this._prefetched.set(n,{node:p,key:a.key}),e.appendChild(p))}}_clearPrefetch(){for(const e of this._prefetched.values())e.node.remove();this._prefetched.clear()}_collectImages(){if(!this.for)return this._images=[],null;let e;try{e=document.querySelector(this.for)}catch{return this._images=[],null}return e?(this._images=Array.from(e.querySelectorAll("esp-image")),e):(this._images=[],null)}_attachClickHandlers(e=!1){const t=this._images[this.currentIndex],i=this.currentIndex;this._detachClickHandlers();const s=this._collectImages();if(this._images.forEach((f,I)=>{const y=()=>this.open(I);f.addEventListener("click",y),f.classList.add(m._CLICKABLE_CLASS),this._clickHandlers.set(f,y)}),this._observeGallery(s),!this.isOpen)return;if(this._images.length===0){this.close();return}const r=t?this._images.indexOf(t):-1,n=r>=0?r:Math.min(i,this._images.length-1),a=this._images[n]!==t,p=n!==this.currentIndex;this.currentIndex=n,(a||e)&&(this._loadedIntrinsicDimensions=null),this._prepareImageDimensions(),this.requestUpdate(),(a||p)&&this._emitChanged()}_detachClickHandlers(){for(const[e,t]of this._clickHandlers)e.removeEventListener("click",t),e.classList.remove(m._CLICKABLE_CLASS);this._clickHandlers.clear()}_observeGallery(e){e!==this._observedGallery&&(this._cancelGalleryRefresh(),this._galleryObserver?.disconnect(),this._galleryObserver=null,this._observedGallery=e,!(!e||typeof MutationObserver>"u")&&(this._galleryObserver=new MutationObserver(t=>this._scheduleGalleryRefresh(t)),this._galleryObserver.observe(e,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["caption","crossorigin","height","local-image","low-res","media","original-height","original-width","referrerpolicy","src","srcset","type","url","width"]})))}_scheduleGalleryRefresh(e){const t=this._images[this.currentIndex];t&&(this._galleryRefreshInvalidatesDimensions||=e.some(i=>i.type==="attributes"&&i.attributeName==="caption"?!1:i.target===t||t.contains(i.target))),this._galleryRefreshFrame.schedule()}_runGalleryRefresh(){if(!this.isConnected)return;const e=this._galleryRefreshInvalidatesDimensions;this._galleryRefreshInvalidatesDimensions=!1,this._attachClickHandlers(e)}_cancelGalleryRefresh(){this._galleryRefreshFrame.cancel(),this._galleryRefreshInvalidatesDimensions=!1}_stopObservingGallery(){this._cancelGalleryRefresh(),this._galleryObserver?.disconnect(),this._galleryObserver=null,this._observedGallery=null}_goTo(e){const t=this._images.length;if(t===0)return;const i=(e%t+t)%t;i!==this.currentIndex&&(this.currentIndex=i,this._loadedIntrinsicDimensions=null,this._prepareImageDimensions(),this._scheduleImageMeasurement(),this._emitChanged())}_emitChanged(){this.dispatchEvent(new CustomEvent(B.LIGHTBOX_CHANGED,{detail:{index:this.currentIndex},bubbles:!0,composed:!0}))}_prev(){this._goTo(this.currentIndex-1)}_next(){this._goTo(this.currentIndex+1)}_handleKeyDown(e){if(this.isOpen)switch(e.key){case"Escape":e.preventDefault(),this.close();break;case"ArrowLeft":e.preventDefault(),this._prev();break;case"ArrowRight":e.preventDefault(),this._next();break;case"ArrowUp":e.preventDefault(),this.drawerOpen||this._toggleDrawer();break;case"ArrowDown":e.preventDefault(),this.drawerOpen&&this._toggleDrawer();break;case"Tab":this._overlay.trapFocus(e);break}}_handleTouchStart(e){e.touches.length===1&&(this._touchStartX=e.touches[0].clientX,this._touchStartY=e.touches[0].clientY,this._touchDeltaX=0,this._touchDeltaY=0,this._swiping=!1,this._swipingVertical=!1)}_handleTouchMove(e){if(e.touches.length!==1)return;const t=e.touches[0].clientX-this._touchStartX,i=e.touches[0].clientY-this._touchStartY;!this._swiping&&!this._swipingVertical&&(Math.abs(t)>10||Math.abs(i)>10)&&(Math.abs(t)>Math.abs(i)?this._swiping=!0:this._swipingVertical=!0),this._swiping?(e.preventDefault(),this._touchDeltaX=t):this._swipingVertical&&(e.preventDefault(),this._touchDeltaY=i)}_handleTouchEnd(){this._swiping?this._touchDeltaX>50?this._prev():this._touchDeltaX<-50&&this._next():this._swipingVertical&&(this._touchDeltaY<-50&&!this.drawerOpen?this._toggleDrawer():this._touchDeltaY>50&&this.drawerOpen&&this._toggleDrawer()),this._touchDeltaX=0,this._touchDeltaY=0,this._swiping=!1,this._swipingVertical=!1}_handleLightboxClick(e){if(!this.drawerOpen)return;const t=this.shadowRoot?.querySelector(".comment-panel");t&&e.composedPath().includes(t)||(this.drawerOpen=!1)}_handleImageContainerClick(e){if(e.target===e.currentTarget){if(this.drawerOpen){this.drawerOpen=!1;return}this.close()}}get _visibleCaption(){return this.hideCaption?"":this._images[this.currentIndex]?.caption??""}get _showsCaptionBar(){return this.hideComments&&this._visibleCaption!==""}get _drawerAvailable(){return this.hideComments?this._showsCaptionBar&&this._captionClipped:!0}get _showsBar(){return!this.hideComments||this._showsCaptionBar}_toggleDrawer(){this._drawerAvailable&&(this.drawerOpen=!this.drawerOpen)}_handleBarKeyDown(e){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._toggleDrawer())}_observeCaptionBar(){const e=this.shadowRoot?.querySelector(".caption-toggle")??null,t=this.shadowRoot?.querySelector(".caption-line")??null,[i,s]=this._observedCaptionParts;if(e===i&&t===s){this._measureCaptionClipped();return}if(this._captionBarObserver?.disconnect(),this._captionBarObserver=null,this._observedCaptionParts=[e,t],!e||!t){this._captionClipped&&(this._captionClipped=!1);return}typeof ResizeObserver<"u"&&(this._captionBarObserver=new ResizeObserver(this._measureCaptionClipped),this._captionBarObserver.observe(e),this._captionBarObserver.observe(t)),this._measureCaptionClipped()}_stopObservingCaptionBar(){this._captionBarObserver?.disconnect(),this._captionBarObserver=null,this._observedCaptionParts=[null,null]}_observeCommentBar(){const e=this.shadowRoot?.querySelector(".comment-bar")??null;e!==this._observedCommentBar&&(this._commentBarObserver?.disconnect(),this._commentBarObserver=null,this._observedCommentBar=e,e&&typeof ResizeObserver<"u"&&(this._commentBarObserver=new ResizeObserver(this._syncBarHeight),this._commentBarObserver.observe(e))),this._syncBarHeight()}_stopObservingCommentBar(){this._commentBarObserver?.disconnect(),this._commentBarObserver=null,this._observedCommentBar=null}connectedCallback(){super.connectedCallback(),!this._overlay.isPromoting&&(m._ensureGlobalStyles(),this._clickSetupFrame.schedule())}_runClickSetup(){this.isConnected&&this._attachClickHandlers()}static _ensureGlobalStyles(){if(document.head.querySelector("style[data-esp-lightbox-global-styles]"))return;const e=document.createElement("style");e.dataset.espLightboxGlobalStyles="",e.textContent=`.${m._CLICKABLE_CLASS} { cursor: pointer; }`,document.head.appendChild(e)}updated(e){super.updated(e),e.has("for")&&this._attachClickHandlers(),this.isOpen?(this._observeImageContainer(),this._observeCaptionBar(),this._observeCommentBar(),this._scheduleImageMeasurement()):this._stopImageSizing()}disconnectedCallback(){if(super.disconnectedCallback(),this._overlay.isPromoting)return;this._clickSetupFrame.cancel();const e=this.isOpen;this._stopImageSizing(),this._stopObservingGallery(),this._detachClickHandlers(),e&&(this.isOpen=!1,this.drawerOpen=!1,this._overlay.close())}_renderCurrentImage(){const e=this._images[this.currentIndex];if(!e)return l;const t=this._responsiveSizes(),i=this._imageDimensions??this._viewportDimensions(),s={width:`${i.width}px`,height:`${i.height}px`};if(e.localImage)return o`
        <esp-image
          class="lightbox-image"
          original-width=${e.originalWidth}
          original-height=${e.originalHeight}
          caption=${e.caption}
          .localImage=${e.localImage}
          .sizes=${t}
          style=${v(s)}
        ></esp-image>
      `;const r=this._projectedSource(e);if(r){const a=this._prepareProjectedClone(r,t,"high");return o`
        <esp-image
          class="lightbox-image"
          original-width=${e.originalWidth}
          original-height=${e.originalHeight}
          caption=${e.caption}
          .sizes=${t}
          style=${v(s)}
        >
          ${a}
        </esp-image>
      `}const n=Array.from(e.querySelectorAll("esp-image-option"));return o`
      <esp-image
        class="lightbox-image"
        original-width=${e.originalWidth}
        original-height=${e.originalHeight}
        low-res=${e.imageUrl}
        caption=${e.caption}
        .sizes=${t}
        style=${v(s)}
      >
        ${n.map(a=>o`
            <esp-image-option
              width=${a.width}
              url=${a.imageUrl}
              type=${a.type||l}
            ></esp-image-option>
          `)}
      </esp-image>
    `}_renderBarToggle(){if(!this._showsBar)return l;const e=this._drawerAvailable,t=e?o`<span class=${b({"comment-bar-caret":!0,open:this.drawerOpen})}>
          ${A}
        </span>`:l;return this._showsCaptionBar?o`
        <div
          class=${b({"comment-bar-toggle":!0,"caption-toggle":!0})}
          role=${e?"button":l}
          tabindex=${e?"0":l}
          aria-expanded=${e?this.drawerOpen?"true":"false":l}
          aria-controls=${e?"drawer-body":l}
          @click=${this._toggleDrawer}
          @keydown=${this._handleBarKeyDown}
        >
          <span class="caption-line">${this._visibleCaption}</span>
          ${t}
        </div>
      `:o`
      <div
        class="comment-bar-toggle"
        role="button"
        tabindex="0"
        aria-expanded=${this.drawerOpen?"true":"false"}
        aria-controls="drawer-body"
        @click=${this._toggleDrawer}
        @keydown=${this._handleBarKeyDown}
      >
        <span class="comment-bar-icon">${S}</span>
        <span class="comment-bar-label">${this._commentLabel}</span>
        ${t}
      </div>
    `}render(){if(!this.isOpen)return l;const e=this._images[this.currentIndex],t=this._visibleCaption,i=this._images.length;return o`
      <div
        class="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
        tabindex="-1"
        data-no-swipe
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
          intent="danger"
          label="Close lightbox"
          @esp-clicked=${this.close}
        >
          ${$}
        </esp-button>

        ${i>1?o`
              <esp-button
                class="prev-btn"
                icon-only
                collapsed
                label="Previous image"
                @esp-clicked=${this._prev}
              >
                ${R}
              </esp-button>
              <esp-button
                class="next-btn"
                icon-only
                collapsed
                label="Next image"
                @esp-clicked=${this._next}
              >
                ${z}
              </esp-button>
            `:l}

        
        <div class="image-container" @click=${this._handleImageContainerClick}>
          ${k(e,this._renderCurrentImage())}
        </div>

        
        <div class="preload" aria-hidden="true" inert></div>

        ${this._showsBar||i>1?this._renderCommentPanel(t,i):l}
      </div>
    `}_renderCommentPanel(e,t){return o`
      <div
        class=${b({"comment-panel":!0,open:this.drawerOpen,"has-bar":this._showsBar,"caption-only":this._showsCaptionBar})}
      >
        <div class="comment-bar">
          ${t>1?o`
                
                <nav class="dots" aria-label="Image navigation">
                  ${this._images.map((i,s)=>o`
                      <button
                        type="button"
                        class=${b({dot:!0,active:s===this.currentIndex})}
                        aria-label="Image ${s+1} of ${t}"
                        aria-current=${s===this.currentIndex?"true":"false"}
                        @click=${()=>this._goTo(s)}
                      ></button>
                    `)}
                </nav>
              `:l}
          ${this._renderBarToggle()}
        </div>
        ${this._drawerAvailable?o`
              <div class="drawer-body" id="drawer-body">
                ${e?o`<div class="caption">${e}</div>`:l}
                ${this.hideComments?l:o`<slot name="comments"></slot>`}
              </div>
            `:l}
      </div>
    `}};h._PREFETCH_RADIUS=1,h._CLICKABLE_CLASS="esp-lightbox-clickable",h.styles=[...x.styles,O`
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

      
      .preload {
        position: absolute;
        top: 0;
        left: 0;
        width: 1px;
        height: 1px;
        overflow: hidden;
        opacity: 0;
        pointer-events: none;
        z-index: -1;
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

        
        --_toggle-height: 0px;
        --_dots-height: 0px;
        
        --_bar-height: calc(var(--_dots-height) + var(--_toggle-height));

        &.has-bar {
          --_toggle-height: calc(3 * var(--esp-size-small));
        }

        &:has(.dots) {
          --_dots-height: calc(1.875 * var(--esp-size-small));
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

      
      .caption-toggle {
        justify-content: center;
        gap: var(--esp-size-tiny);
      }

      .caption-line {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 500;
      }

      .caption-only .caption-toggle:not([role="button"]) {
        cursor: default;
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
    `],d([u()],h.prototype,"isOpen",void 0),d([u()],h.prototype,"currentIndex",void 0),d([u()],h.prototype,"drawerOpen",void 0),d([u()],h.prototype,"_captionClipped",void 0),d([u()],h.prototype,"_imageDimensions",void 0),d([_({type:String})],h.prototype,"for",void 0),d([_({attribute:"comment-count",type:Number})],h.prototype,"commentCount",void 0),d([_({attribute:"hide-comments",type:Boolean})],h.prototype,"hideComments",void 0),d([_({attribute:"hide-caption",type:Boolean})],h.prototype,"hideCaption",void 0),h=m=d([D("esp-lightbox")],h);const A=o` <svg
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
</svg>`;export{h as EspalierLightbox};
