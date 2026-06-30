var i=function(l,e,t,s){var a=arguments.length,r=a<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,t):s,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(l,e,t,s);else for(var d=l.length-1;d>=0;d--)(p=l[d])&&(r=(a<3?p(r):a>3?p(e,t,r):p(e,t))||r);return a>3&&r&&Object.defineProperty(e,t,r),r};import{css as g,html as c,nothing as v}from"lit";import{customElement as b,property as n}from"lit/decorators.js";import{classMap as m}from"lit/directives/class-map.js";import{createRef as f,ref as w}from"lit/directives/ref.js";import"../button/esp-button.js";import"../progress/esp-progress.js";import{EspalierElementBase as h}from"../shared/esp-element-base.js";import{ESP_EVENTS as u}from"../shared/events.js";let o=class extends h{constructor(){super(...arguments),this.image=f(),this.url="",this.alt="",this.failed=!1}render(){const e=this.progress!==void 0,t=this.failed&&!e,s=e?this.alt?`Cancel upload and remove ${this.alt}`:"Cancel upload and remove image":this.alt?`Remove ${this.alt}`:"Remove image";return c`<div>
      <img ${w(this.image)} src=${this.url} alt=${this.alt} draggable="false" decoding="async" />
      <button
        type="button"
        aria-label=${s}
        class=${m({uploading:e})}
        @click=${()=>{this.dispatchEvent(new CustomEvent(u.REMOVE_IMAGE,{detail:this,bubbles:!0,composed:!0}))}}
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
      ${e?c`
            <div class="upload-overlay">
              <esp-progress
                mode="circle"
                size="small"
                show-value
                .value=${this.progress}
                label="Upload progress"
              ></esp-progress>
            </div>
          `:v}
      ${t?c`
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
                @clicked=${a=>{a.stopPropagation(),this.dispatchEvent(new CustomEvent(u.RETRY_UPLOAD,{detail:this,bubbles:!0,composed:!0}))}}
              >
                Retry
              </esp-button>
            </div>
          `:v}
    </div>`}};o.styles=[...h.styles,g`
      :host {
        display: block;
        box-sizing: border-box;
        position: relative;
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
          visibility: hidden;
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

          svg {
            height: var(--esp-size-medium);
          }

          
          &.uploading {
            visibility: visible;
          }
        }

        &:hover,
        &:focus-within {
          button:not(.retry-btn) {
            visibility: visible;
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

      .retry-btn {
        --esp-color-action-background: transparent;
        --esp-color-action-text: var(--esp-image-preview-overlay-text, var(--esp-color-layer-1));
        --esp-color-border: var(--esp-image-preview-overlay-text, var(--esp-color-layer-1));
      }
    `],i([n()],o.prototype,"url",void 0),i([n()],o.prototype,"alt",void 0),i([n({type:Number})],o.prototype,"progress",void 0),i([n({type:Boolean})],o.prototype,"failed",void 0),o=i([b("esp-image-preview")],o);export{o as EspalierImagePreview};
