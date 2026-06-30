var c=function(d,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(d,e,t,i);else for(var p=d.length-1;p>=0;p--)(l=d[p])&&(r=(s<3?l(r):s>3?l(e,t,r):l(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r},n;import{LitElement as f,css as b,html as a,nothing as h}from"lit";import{customElement as _,property as u,state as m}from"lit/decorators.js";import{classMap as g}from"lit/directives/class-map.js";import{keyed as v}from"lit/directives/keyed.js";import{cancelSVG as x}from"../shared/svgs/cancel.js";import{commentSVG as w}from"../shared/svgs/comment.js";import{leftArrow as y}from"../shared/svgs/left-arrow.js";import{rightArrow as k}from"../shared/svgs/right-arrow.js";import{OverlayController as $}from"../shared/overlay-controller.js";import"../image/esp-image.js";import"../image/esp-image-option.js";import"../button/esp-button.js";let o=n=class extends f{constructor(){super(...arguments),this.isOpen=!1,this.currentIndex=0,this.drawerOpen=!1,this._images=[],this._clickHandlers=new Map,this._pendingRaf=null,this._overlay=new $({host:this,getFocusTrapContainer:()=>this.shadowRoot?.querySelector(".lightbox")??null}),this._touchStartX=0,this._touchStartY=0,this._touchDeltaX=0,this._touchDeltaY=0,this._swiping=!1,this._swipingVertical=!1,this.for="",this.commentCount=0}get _commentLabel(){return this.commentCount<=0?"No comments. Add yours!":this.commentCount===1?"1 comment":`${this.commentCount} comments`}open(e){if(this._collectImages(),this._images.length===0)return;const t=Math.max(0,Math.min(e,this._images.length-1));if(this.isOpen){this._goTo(t);return}this.currentIndex=t,this.isOpen=!0,this.drawerOpen=!1,this._overlay.open(),this._emitChanged(),this.updateComplete.then(()=>{this.shadowRoot?.querySelector(".lightbox")?.focus()})}close(){this.isOpen&&(this.isOpen=!1,this.drawerOpen=!1,this._overlay.close())}_collectImages(){if(!this.for){this._images=[];return}let e;try{e=document.querySelector(this.for)}catch{this._images=[];return}if(!e){this._images=[];return}this._images=Array.from(e.querySelectorAll("esp-image"))}_attachClickHandlers(){this._detachClickHandlers(),this._collectImages(),this._images.forEach((e,t)=>{const i=()=>this.open(t);e.addEventListener("click",i),e.classList.add(n._CLICKABLE_CLASS),this._clickHandlers.set(e,i)})}_detachClickHandlers(){for(const[e,t]of this._clickHandlers)e.removeEventListener("click",t),e.classList.remove(n._CLICKABLE_CLASS);this._clickHandlers.clear()}_goTo(e){const t=this._images.length;if(t===0)return;const i=(e%t+t)%t;i!==this.currentIndex&&(this.currentIndex=i,this._emitChanged())}_emitChanged(){this.dispatchEvent(new CustomEvent("esp-lightbox-changed",{detail:{index:this.currentIndex},bubbles:!0,composed:!0}))}_prev(){this._goTo(this.currentIndex-1)}_next(){this._goTo(this.currentIndex+1)}_handleKeyDown(e){if(this.isOpen)switch(e.key){case"Escape":e.preventDefault(),this.close();break;case"ArrowLeft":e.preventDefault(),this._prev();break;case"ArrowRight":e.preventDefault(),this._next();break;case"ArrowUp":e.preventDefault(),this.drawerOpen||this._toggleDrawer();break;case"ArrowDown":e.preventDefault(),this.drawerOpen&&this._toggleDrawer();break;case"Tab":this._overlay.trapFocus(e);break}}_handleTouchStart(e){e.touches.length===1&&(this._touchStartX=e.touches[0].clientX,this._touchStartY=e.touches[0].clientY,this._touchDeltaX=0,this._touchDeltaY=0,this._swiping=!1,this._swipingVertical=!1)}_handleTouchMove(e){if(e.touches.length!==1)return;const t=e.touches[0].clientX-this._touchStartX,i=e.touches[0].clientY-this._touchStartY;!this._swiping&&!this._swipingVertical&&(Math.abs(t)>10||Math.abs(i)>10)&&(Math.abs(t)>Math.abs(i)?this._swiping=!0:this._swipingVertical=!0),this._swiping?(e.preventDefault(),this._touchDeltaX=t):this._swipingVertical&&(e.preventDefault(),this._touchDeltaY=i)}_handleTouchEnd(){this._swiping?this._touchDeltaX>50?this._prev():this._touchDeltaX<-50&&this._next():this._swipingVertical&&(this._touchDeltaY<-50&&!this.drawerOpen?this._toggleDrawer():this._touchDeltaY>50&&this.drawerOpen&&this._toggleDrawer()),this._touchDeltaX=0,this._touchDeltaY=0,this._swiping=!1,this._swipingVertical=!1}_handleLightboxClick(e){if(!this.drawerOpen)return;const t=this.shadowRoot?.querySelector(".comment-panel");t&&e.composedPath().includes(t)||(this.drawerOpen=!1)}_toggleDrawer(){this.drawerOpen=!this.drawerOpen}_handleBarKeyDown(e){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this._toggleDrawer())}connectedCallback(){super.connectedCallback(),!this._overlay.isPromoting&&(n._ensureGlobalStyles(),this._pendingRaf=requestAnimationFrame(()=>{this._pendingRaf=null,this.isConnected&&this._attachClickHandlers()}))}static _ensureGlobalStyles(){if(n._globalStylesInjected)return;n._globalStylesInjected=!0;const e=document.createElement("style");e.textContent=`.${n._CLICKABLE_CLASS} { cursor: pointer; }`,document.head.appendChild(e)}updated(e){super.updated(e),e.has("for")&&this._attachClickHandlers()}disconnectedCallback(){super.disconnectedCallback(),!this._overlay.isPromoting&&(this._pendingRaf!==null&&(cancelAnimationFrame(this._pendingRaf),this._pendingRaf=null),this._detachClickHandlers())}_renderCurrentImage(){const e=this._images[this.currentIndex];if(!e)return h;if(e.localImage)return a`
        <esp-image
          class="lightbox-image"
          original-width=${e.originalWidth}
          original-height=${e.originalHeight}
          caption=${e.caption}
          .localImage=${e.localImage}
        ></esp-image>
      `;const t=Array.from(e.children).find(s=>s.tagName==="PICTURE"||s.tagName==="IMG");if(t){const s=t.cloneNode(!0);s.querySelectorAll("source").forEach(l=>l.setAttribute("sizes","100vw"));const r=s.tagName==="IMG"?s:s.querySelector("img");return r?.hasAttribute("srcset")&&r.setAttribute("sizes","100vw"),a`
        <esp-image
          class="lightbox-image"
          original-width=${e.originalWidth}
          original-height=${e.originalHeight}
          caption=${e.caption}
        >
          ${s}
        </esp-image>
      `}const i=Array.from(e.querySelectorAll("esp-image-option"));return a`
      <esp-image
        class="lightbox-image"
        original-width=${e.originalWidth}
        original-height=${e.originalHeight}
        low-res=${e.imageUrl}
        caption=${e.caption}
      >
        ${i.map(s=>a`
            <esp-image-option
              width=${s.width}
              url=${s.imageUrl}
              type=${s.type||h}
            ></esp-image-option>
          `)}
      </esp-image>
    `}render(){if(!this.isOpen)return h;const t=this._images[this.currentIndex]?.caption??"",i=this._images.length;return a`
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
          ${x}
        </esp-button>

        ${i>1?a`
              <esp-button
                class="prev-btn"
                icon-only
                collapsed
                label="Previous image"
                @clicked=${this._prev}
              >
                ${y}
              </esp-button>
              <esp-button
                class="next-btn"
                icon-only
                collapsed
                label="Next image"
                @clicked=${this._next}
              >
                ${k}
              </esp-button>
            `:h}

        
        <div class="image-container">${v(this.currentIndex,this._renderCurrentImage())}</div>

        <div class=${g({"comment-panel":!0,open:this.drawerOpen})}>
          <div class="comment-bar">
            ${i>1?a`
                  
                  <nav class="dots" aria-label="Image navigation">
                    ${this._images.map((s,r)=>a`
                        <button
                          type="button"
                          class=${g({dot:!0,active:r===this.currentIndex})}
                          aria-label="Image ${r+1} of ${i}"
                          aria-current=${r===this.currentIndex?"true":"false"}
                          @click=${()=>this._goTo(r)}
                        ></button>
                      `)}
                  </nav>
                `:h}
            <div
              class="comment-bar-toggle"
              role="button"
              tabindex="0"
              aria-expanded=${this.drawerOpen?"true":"false"}
              aria-controls="drawer-body"
              @click=${this._toggleDrawer}
              @keydown=${this._handleBarKeyDown}
            >
              <span class="comment-bar-icon">${w}</span>
              <span class="comment-bar-label">${this._commentLabel}</span>
              <span class=${g({"comment-bar-caret":!0,open:this.drawerOpen})}>
                ${C}
              </span>
            </div>
          </div>
          <div class="drawer-body" id="drawer-body">
            ${t?a`<div class="caption">${t}</div>`:h}
            <slot name="comments"></slot>
          </div>
        </div>
      </div>
    `}};o._CLICKABLE_CLASS="esp-lightbox-clickable",o._globalStylesInjected=!1,o.styles=b`
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
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      border-radius: 0;
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
  `,c([m()],o.prototype,"isOpen",void 0),c([m()],o.prototype,"currentIndex",void 0),c([m()],o.prototype,"drawerOpen",void 0),c([u({type:String})],o.prototype,"for",void 0),c([u({attribute:"comment-count",type:Number})],o.prototype,"commentCount",void 0),o=n=c([_("esp-lightbox")],o);const C=a` <svg
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
