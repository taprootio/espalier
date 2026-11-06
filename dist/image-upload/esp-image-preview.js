var l=function(n,e,t,o){var i=arguments.length,r=i<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(n,e,t,o);else for(var u=n.length-1;u>=0;u--)(a=n[u])&&(r=(i<3?a(r):i>3?a(e,t,r):a(e,t))||r);return i>3&&r&&Object.defineProperty(e,t,r),r};import{css as v,html as d,nothing as h}from"lit";import{customElement as b,property as c}from"lit/decorators.js";import{classMap as g}from"lit/directives/class-map.js";import{keyed as f}from"lit/directives/keyed.js";import{createRef as w,ref as y}from"lit/directives/ref.js";import"../button/esp-button.js";import"../progress/esp-progress.js";import"../tooltip/esp-tooltip.js";import{EspalierElementBase as m}from"../shared/esp-element-base.js";import{getIconHrefForHost as k}from"../shared/intent-values.js";import{previewLoadQueue as x}from"./preview-load-queue.js";const T="esp-internal-image-preview-remove",E="esp-internal-image-preview-retry",L="esp-internal-image-preview-action",R=2,I=250,C=6e4;function p(n){const e=n.trim().toLowerCase();return e.length>0&&!e.startsWith("blob:")&&!e.startsWith("data:")}let s=class extends m{constructor(){super(...arguments),this.image=w(),this.url="",this.alt="",this.failed=!1,this.positionLabel="",this.sourceToken=0,this.admittedUrl="",this.remoteImageLoaded=!1,this.imageLoadFailed=!1,this.automaticRetryCount=0,this.remotePreviewVisible=!1,this.visibilityObserver=null,this.queuedLoadCancel=null,this.loadSlotRelease=null,this.retryTimer=null,this.loadTimeoutTimer=null,this.activeSourceToken=null}connectedCallback(){super.connectedCallback(),this.startCurrentPreview()}disconnectedCallback(){this.stopVisibilityObserver(),this.cancelRemoteWork(),this.remoteImageLoaded=!1,this.admittedUrl="",this.sourceToken+=1,this.remotePreviewVisible=!1,super.disconnectedCallback()}willUpdate(e){super.willUpdate(e),e.has("url")&&(this.stopVisibilityObserver(),this.cancelRemoteWork(),this.sourceToken+=1,this.admittedUrl="",this.remoteImageLoaded=!1,this.imageLoadFailed=!1,this.automaticRetryCount=0,this.remotePreviewVisible=!1)}updated(e){super.updated(e),e.has("url")&&this.startCurrentPreview()}startCurrentPreview(){if(!(!this.isConnected||!p(this.url))){if(typeof IntersectionObserver>"u"){this.remotePreviewVisible=!0,this.requestRemoteLoad();return}this.visibilityObserver??=new IntersectionObserver((e,t)=>{if(t!==this.visibilityObserver)return;const o=e.find(i=>i.target===this);!o||!this.isConnected||!p(this.url)||(this.remotePreviewVisible=o.isIntersecting,o.isIntersecting?this.requestRemoteLoad():!this.loadSlotRelease&&!this.remoteImageLoaded&&this.cancelQueuedLoad())},{threshold:0}),this.visibilityObserver.observe(this)}}stopVisibilityObserver(){this.visibilityObserver?.disconnect(),this.visibilityObserver=null}requestRemoteLoad(){if(!this.isConnected||!p(this.url)||!this.remotePreviewVisible||this.imageLoadFailed||this.remoteImageLoaded||this.loadSlotRelease||this.queuedLoadCancel||this.retryTimer)return;let e=!1;const t=x.request(o=>{if(e=!0,this.queuedLoadCancel=null,!this.isConnected||!p(this.url)||!this.remotePreviewVisible||this.imageLoadFailed||this.remoteImageLoaded){o();return}this.loadSlotRelease=o;const i=++this.sourceToken;this.activeSourceToken=i,this.admittedUrl=this.url,this.loadTimeoutTimer=setTimeout(()=>this.handleImageFailure(i),C),this.requestUpdate()});e||(this.queuedLoadCancel=t)}handleImageLoad(e,t){this.isActiveImageEvent(e,t)&&(this.completeActiveLoad(),this.remoteImageLoaded=!0,this.stopVisibilityObserver())}handleImageError(e,t){this.isActiveImageEvent(e,t)&&this.handleImageFailure(t)}isActiveImageEvent(e,t){return e.currentTarget instanceof HTMLImageElement&&e.currentTarget.getAttribute("src")===this.url&&t===this.activeSourceToken&&t===this.sourceToken&&this.loadSlotRelease!==null}handleImageFailure(e){if(e!==this.activeSourceToken||e!==this.sourceToken||!this.loadSlotRelease)return;if(this.abandonActiveLoad(),this.automaticRetryCount>=R){this.imageLoadFailed=!0,this.requestUpdate();return}this.automaticRetryCount+=1;const t=.75+Math.random()*.5,o=Math.round(I*2**(this.automaticRetryCount-1)*t),i=this.sourceToken;this.retryTimer=setTimeout(()=>{this.retryTimer=null,i===this.sourceToken&&this.requestRemoteLoad()},o)}completeActiveLoad(){this.releaseActiveLoad()}abandonActiveLoad(){if(!this.loadSlotRelease)return;const e=this.shadowRoot?.querySelector("img");e?.getAttribute("src")===this.admittedUrl&&e.removeAttribute("src"),this.admittedUrl="",this.sourceToken+=1,this.releaseActiveLoad(),this.isConnected&&this.requestUpdate()}releaseActiveLoad(){this.loadTimeoutTimer!==null&&(clearTimeout(this.loadTimeoutTimer),this.loadTimeoutTimer=null),this.activeSourceToken=null;const e=this.loadSlotRelease;this.loadSlotRelease=null,e?.()}cancelQueuedLoad(){const e=this.queuedLoadCancel;this.queuedLoadCancel=null,e?.()}cancelRemoteWork(){this.retryTimer!==null&&(clearTimeout(this.retryTimer),this.retryTimer=null),this.cancelQueuedLoad(),this.abandonActiveLoad()}retryImage(){p(this.url)&&(this.cancelRemoteWork(),this.sourceToken+=1,this.admittedUrl="",this.remoteImageLoaded=!1,this.imageLoadFailed=!1,this.automaticRetryCount=0,this.remotePreviewVisible=!0,this.requestRemoteLoad())}renderImage(){const t=p(this.url)?this.admittedUrl:this.url,o=this.sourceToken;return f(`${t}:${o}`,d`<img
        ${y(this.image)}
        src=${t||h}
        alt=${this.alt}
        draggable="false"
        decoding="async"
        @load=${i=>this.handleImageLoad(i,o)}
        @error=${i=>this.handleImageError(i,o)}
      />`)}renderAction(){const{action:e}=this,t=this.alt||this.positionLabel,o=e?.label?.trim();return!e||!o||!k(e.icon,this)?h:d`<esp-tooltip class="preview-action" text=${o}>
      <esp-button
        data-preview-action
        icon-only
        collapsed
        icon=${e.icon}
        label=${t?`${o}: ${t}`:o}
        @esp-clicked=${i=>{i.stopPropagation(),this.dispatchEvent(new CustomEvent(L))}}
      ></esp-button>
    </esp-tooltip>`}render(){const e=this.progress!==void 0,t=this.failed&&!e,o=this.imageLoadFailed&&!e&&!t,i=this.alt||this.positionLabel,r=e?i?`Cancel upload and remove ${i}`:"Cancel upload and remove image":i?`Remove ${i}`:"Remove image";return d`<div>
      ${this.renderImage()}
      <button
        type="button"
        aria-label=${r}
        class=${g({uploading:e})}
        @click=${()=>{this.dispatchEvent(new CustomEvent(T,{detail:this,bubbles:!0,composed:!0}))}}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </button>
      ${e?d`
            <div class="upload-overlay">
              <esp-progress
                mode="circle"
                size="small"
                show-value
                .value=${this.progress}
                label="Upload progress"
              ></esp-progress>
            </div>
          `:h}
      ${t?d`
            <div class="upload-overlay failed">
              <svg
                class="alert-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 9v4" />
                <path
                  d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z"
                />
                <path d="M12 16h.01" />
              </svg>
              <span class="error-label">Upload failed</span>
              <esp-button
                class="retry-btn"
                collapsed
                label="Retry upload"
                @esp-clicked=${a=>{a.stopPropagation(),this.dispatchEvent(new CustomEvent(E,{detail:this,bubbles:!0,composed:!0}))}}
              >
                Retry
              </esp-button>
            </div>
          `:h}
      ${o?d`
            <div class="upload-overlay failed image-load-failed">
              <svg
                class="alert-icon"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 9v4" />
                <path
                  d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z"
                />
                <path d="M12 16h.01" />
              </svg>
              <span class="error-label">Image failed to load</span>
              <esp-button
                class="image-retry-btn"
                collapsed
                label="Retry image"
                @esp-clicked=${a=>{a.stopPropagation(),this.retryImage()}}
              >
                Retry image
              </esp-button>
            </div>
          `:h}
      ${e||t||o?h:this.renderAction()}
    </div>`}};s.styles=[...m.styles,v`
      :host {
        display: block;
        box-sizing: border-box;
        position: relative;
        
        container-type: size;
      }

      
      .preview-action {
        position: absolute;
        right: var(--esp-size-padding);
        bottom: var(--esp-size-padding);
        z-index: 3;
      }

      .preview-action esp-button::part(wrapper) {
        box-shadow: 1px 1px 2px var(--esp-color-shadow);
      }

      
      .preview-action esp-button:focus-within::part(wrapper) {
        box-shadow: 0 0 0 2px var(--esp-color-background);
        outline: 2px solid var(--esp-color-text);
        outline-offset: 2px;
      }

      @container (max-width: 96px) or (max-height: 150px) {
        .preview-action {
          
          right: 4px;
          bottom: 4px;
          --esp-button-padding: calc(var(--esp-size-tiny) / 2);
        }
      }

      div {
        border-radius: var(--esp-size-border-radius);
        border: 2px solid var(--esp-image-preview-border-color, var(--esp-color-border));
        
        box-sizing: border-box;
        overflow: hidden;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        button:not(.retry-btn) {
          display: grid;
          place-content: center;
          cursor: pointer;
          background: oklch(from var(--esp-color-danger) var(--esp-l-raised-3) c h);
          border: 2px solid oklch(from var(--esp-color-danger) var(--esp-l-border) c h);
          color: var(--esp-image-preview-remove-color, var(--esp-color-danger-text));
          padding: var(--esp-size-tiny);
          border-radius: var(--esp-size-medium);
          position: absolute;
          top: var(--esp-size-padding);
          right: var(--esp-size-padding);
          box-shadow: 1px 1px 2px var(--esp-color-shadow);
          transition: background 0.5s ease;
          z-index: 2;

          &:hover {
            background: oklch(from var(--esp-color-danger) calc(var(--esp-l-raised-3) * 0.88) c h);
            border-color: oklch(from var(--esp-color-danger) var(--esp-l-ink) c h);
          }

          &:active {
            box-shadow: 0px 0px 0px oklch(from var(--esp-color-danger) var(--esp-l-shadow) c h);
            border-color: oklch(from var(--esp-color-danger) var(--esp-l-shadow) c h);
          }

          
          &:focus-visible {
            box-shadow: 0 0 0 2px var(--esp-color-background);
            outline: 2px solid var(--esp-color-text);
            outline-offset: 2px;
          }

          svg {
            height: var(--esp-size-medium);
          }
        }

        
        @media (hover: hover) {
          &:not(:hover, :focus-within) button:not(.retry-btn, .uploading) {
            opacity: 0;
            pointer-events: none;
          }
        }
      }

      .upload-overlay {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        background: oklch(from var(--esp-color-shadow) l c h / 0.6);
        border-radius: var(--esp-size-border-radius);
        z-index: 1;

        esp-progress {
          --esp-progress-text-color: var(
            --esp-image-preview-overlay-text,
            var(--esp-color-layer-1)
          );
        }

        &.failed {
          background: oklch(from var(--esp-color-danger) l c h / 0.75);
          grid-template-rows: auto auto auto;
          align-content: center;
          gap: var(--esp-size-tiny);
          color: var(--esp-image-preview-overlay-text, var(--esp-color-layer-1));
        }
      }

      .alert-icon {
        width: calc(2 * var(--esp-size-medium));
        height: calc(2 * var(--esp-size-medium));
        stroke: var(--esp-image-preview-overlay-text, var(--esp-color-layer-1));
      }

      .error-label {
        font-size: var(--esp-type-small);
        font-weight: 600;
      }

      .retry-btn,
      .image-retry-btn {
        --esp-color-action-background: transparent;
        --esp-color-action-text: var(--esp-image-preview-overlay-text, var(--esp-color-layer-1));
        --esp-color-border: var(--esp-image-preview-overlay-text, var(--esp-color-layer-1));
      }
    `],l([c()],s.prototype,"url",void 0),l([c()],s.prototype,"alt",void 0),l([c({type:Number})],s.prototype,"progress",void 0),l([c({type:Boolean})],s.prototype,"failed",void 0),l([c({attribute:!1})],s.prototype,"action",void 0),l([c({attribute:!1})],s.prototype,"positionLabel",void 0),s=l([b("esp-image-preview")],s);export{s as EspalierImagePreview};
