var f=function(_,e,t,i){var o=arguments.length,r=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,d;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(_,e,t,i);else for(var n=_.length-1;n>=0;n--)(d=_[n])&&(r=(o<3?d(r):o>3?d(e,t,r):d(e,t))||r);return o>3&&r&&Object.defineProperty(e,t,r),r},m;import{css as A,html as w}from"lit";import{customElement as R,property as x,state as b}from"lit/decorators.js";import{createRef as I,ref as E}from"lit/directives/ref.js";import"./esp-image-preview.js";import{classMap as P}from"lit/directives/class-map.js";import{getImageDetails as M,releasePreviewUrl as y}from"./image-helpers.js";const U=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11.911 3.634a2 2 0 0 1 1.089 1.78l.001 2.586h6.999a2 2 0 0 1 2 2v4l-.005 .15a2 2 0 0 1 -1.995 1.85l-6.999 -.001l-.001 2.587a2 2 0 0 1 -3.414 1.414l-6.586 -6.586a2 2 0 0 1 0 -2.828l6.586 -6.586a2 2 0 0 1 2.18 -.434l.145 .068z" />
</svg>`,k=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12.089 3.634a2 2 0 0 0 -1.089 1.78l-.001 2.586h-6.999a2 2 0 0 0 -2 2v4l.005 .15a2 2 0 0 0 1.995 1.85l6.999 -.001l.001 2.587a2 2 0 0 0 3.414 1.414l6.586 -6.586a2 2 0 0 0 0 -2.828l-6.586 -6.586a2 2 0 0 0 -2.18 -.434l-.145 .068z" />
</svg>`;import{EspalierElementBase as D}from"../shared/esp-element-base.js";import{calculateAlbumLayout as C,DEFAULT_ALBUM_MAX_ROW_HEIGHT_VH as L,normalizeAlbumMaxRowHeightVh as O}from"../shared/justified-layout.js";import{ESP_EVENTS as v}from"../shared/events.js";import{viewportSize as H}from"../shared/viewport.js";const S=220,T=4,$=8e3;let c=m=class extends D{constructor(){super(...arguments),this.uploadInput=I(),this.previewsDiv=I(),this.dropAreaDiv=I(),this.draggingOver=!1,this.uploadedImages=[],this.accept="image/jpeg, image/png, image/webp",this.maxRowHeightVh=L,this._rejectionNotice="",this._uploadState=new WeakMap,this._selectionGeneration=0,this._chromeWidth=null,this._resizeObserver=new ResizeObserver(()=>{this._chromeWidth=null,this.requestUpdate()}),this._handleViewportResize=()=>{this._chromeWidth=null,this.requestUpdate()},this._dragPointerId=null,this._dragSourceIndex=null,this._dragOverIndex=null,this._dragStartX=0,this._dragStartY=0,this._dragActive=!1,this._ghostEl=null,this._ghostHalfW=0,this._ghostHalfH=0,this._arrowEl=null,this._cachedPreviews=null,this._lastDropHit=null,this._savedBodyUserSelect="",this._handleDragPointerDown=e=>{if(e.button!==0||this._dragPointerId!==null||e.composedPath().some(o=>o instanceof HTMLElement&&(o.tagName==="BUTTON"||o.tagName==="ESP-BUTTON")))return;const i=this._getPreviewIndex(e);i!==null&&(this._dragPointerId=e.pointerId,this._dragSourceIndex=i,this._dragStartX=e.clientX,this._dragStartY=e.clientY,this._dragActive=!1,document.addEventListener("pointermove",this._onDocPointerMove),document.addEventListener("pointerup",this._onDocPointerUp),document.addEventListener("pointercancel",this._onDocPointerUp))},this._onDocPointerMove=e=>{if(this._dragSourceIndex===null||e.pointerId!==this._dragPointerId)return;const t=e.clientX-this._dragStartX,i=e.clientY-this._dragStartY;if(!this._dragActive){if(Math.sqrt(t*t+i*i)<m._DRAG_THRESHOLD)return;this._dragActive=!0,this._createGhost(e.clientX,e.clientY);const n=this.shadowRoot?.querySelectorAll("esp-image-preview");n&&(this._cachedPreviews=Array.from(n).map(s=>({el:s,rect:s.getBoundingClientRect()})),this._dragSourceIndex!==null&&this._dragSourceIndex<this._cachedPreviews.length&&(this._cachedPreviews[this._dragSourceIndex].el.style.opacity="0.3")),this._savedBodyUserSelect=document.body.style.userSelect,document.body.style.userSelect="none",this.previewsDiv.value&&(this.previewsDiv.value.style.touchAction="none")}this._ghostEl&&(this._ghostEl.style.transform=`translate(${e.clientX-this._ghostHalfW}px, ${e.clientY-this._ghostHalfH}px)`);const o=this._cachedPreviews;if(!o||o.length===0)return;let r=null,d=!1;for(let n=0;n<o.length;n++){const s=o[n].rect;if(e.clientX>=s.left&&e.clientX<=s.right&&e.clientY>=s.top&&e.clientY<=s.bottom){r=n,d=e.clientX>s.left+s.width/2;break}}if(r===null){let n=1/0;for(let s=0;s<o.length;s++){const l=o[s].rect,a=e.clientX-(l.left+l.width/2),h=e.clientY-(l.top+l.height/2),p=a*a+h*h;p<n&&(n=p,r=s)}if(r!==null){const s=o[r].rect;d=e.clientX>s.left+s.width/2}}r!==null&&(this._dragOverIndex=d?r+1:r,!(this._lastDropHit&&this._lastDropHit.index===r&&this._lastDropHit.after===d)&&(this._lastDropHit={index:r,after:d},this._updateDropTargets(o.map(n=>n.el),r,d)))},this._onDocPointerUp=e=>{if(e.pointerId===this._dragPointerId){if(this._dragActive&&this._dragSourceIndex!==null&&this._dragOverIndex!==null&&this._dragSourceIndex!==this._dragOverIndex&&this._dragSourceIndex+1!==this._dragOverIndex){const t=[...this.uploadedImages],[i]=t.splice(this._dragSourceIndex,1),o=this._dragOverIndex>this._dragSourceIndex?this._dragOverIndex-1:this._dragOverIndex;t.splice(o,0,i),this.uploadedImages=t,this.dispatchEvent(new CustomEvent(v.IMAGE_UPLOAD_IMAGES_REORDERED,{detail:{images:this.uploadedImages},bubbles:!0,composed:!0}))}this._clearDragState()}},this._arrowColor=null,this.filesSelected=async e=>{const t=[],i=[];for(const a of e)(this._isAccepted(a)?t:i).push(a);if(!t.length){i.length&&this._reportRejectedFiles({unsupported:i,unreadable:[]});return}const o=this._selectionGeneration,r=Math.round(S*Math.min(globalThis.devicePixelRatio||1,2)),d=new Array(t.length).fill(null),n=[];let s=0;const l=async()=>{for(;s<t.length;){const a=s++,h=t[a];try{const p=await M(h,{thumbnailHeight:r});if(o!==this._selectionGeneration){y(p);continue}this._addSelectedImage(d,a,p)}catch{n.push(h)}}};await Promise.all(Array.from({length:Math.min(T,t.length)},()=>l())),(i.length||n.length)&&o===this._selectionGeneration&&this._reportRejectedFiles({unsupported:i,unreadable:n})},this._makeCallbacks=e=>({onProgress:t=>{const i=this._uploadState.get(e);i&&(i.progress=t,i.failed=!1,this.requestUpdate())},onComplete:t=>{if(!this._uploadState.get(e))return;e.uploadedId=t,this._uploadState.delete(e),!this.uploadedImages.find(r=>!r.uploadedId)?this.uploadedImages=[...this.uploadedImages]:this.requestUpdate()},onFailed:()=>{const t=this._uploadState.get(e);t&&(t.progress=void 0,t.failed=!0,this.requestUpdate())}}),this._fullPreviewUrls=new Map,this.setExistingImages=e=>{this._selectionGeneration++,this._releaseSelectedImages(),this.uploadedImages=e.filter(t=>t.url&&t.uploadedId&&Number.isFinite(t.width)&&t.width>0&&Number.isFinite(t.height)&&t.height>0).map(t=>({source:"existing",url:t.url,urls:t.urls,height:t.height,width:t.width,uploadedId:t.uploadedId,orientation:t.width>t.height?"landscape":"portrait"})),this._uploadState=new WeakMap}}connectedCallback(){super.connectedCallback(),this._resizeObserver.observe(this),window.addEventListener("resize",this._handleViewportResize)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver.disconnect(),window.removeEventListener("resize",this._handleViewportResize),this._clearDragState(),clearTimeout(this._noticeTimer),this._selectionGeneration++,this._releaseSelectedImages()}_getPreviewIndex(e){const t=this.shadowRoot?.querySelectorAll("esp-image-preview");if(!t)return null;for(const i of e.composedPath())if(i instanceof HTMLElement&&i.tagName==="ESP-IMAGE-PREVIEW"){for(let o=0;o<t.length;o++)if(t[o]===i)return o}return null}_clearDragState(){document.removeEventListener("pointermove",this._onDocPointerMove),document.removeEventListener("pointerup",this._onDocPointerUp),document.removeEventListener("pointercancel",this._onDocPointerUp),this._dragActive&&(this._cachedPreviews&&this._dragSourceIndex!==null&&this._dragSourceIndex<this._cachedPreviews.length&&(this._cachedPreviews[this._dragSourceIndex].el.style.opacity=""),this._clearDropTargets(),document.body.style.userSelect=this._savedBodyUserSelect,this.previewsDiv.value&&(this.previewsDiv.value.style.touchAction="")),this._ghostEl?.remove(),this._ghostEl=null,this._cachedPreviews=null,this._lastDropHit=null,this._dragPointerId=null,this._dragSourceIndex=null,this._dragOverIndex=null,this._dragActive=!1}_createGhost(e,t){const i=this.shadowRoot?.querySelectorAll("esp-image-preview");if(!i||this._dragSourceIndex===null)return;const o=i[this._dragSourceIndex],r=o.getBoundingClientRect(),d=document.createElement("div"),n=Math.min(120/r.width,120/r.height),s=r.width*n,l=r.height*n;d.style.cssText=`
      position: fixed;
      left: 0;
      top: 0;
      z-index: 10001;
      pointer-events: none;
      width: ${s}px;
      height: ${l}px;
      border: 2px dashed var(--esp-color-action-background, #4aa);
      border-radius: var(--esp-size-border-radius, 4px);
      background-size: cover;
      background-position: center;
      opacity: 0.85;
      will-change: transform;
      transform: translate(${e-s/2}px, ${t-l/2}px);
    `;const a=o.shadowRoot?.querySelector("img");a&&(d.style.backgroundImage=`url(${a.src})`),document.body.appendChild(d),this._ghostEl=d,this._ghostHalfW=s/2,this._ghostHalfH=l/2}_updateDropTargets(e,t,i){for(let a=0;a<e.length;a++){const h=e[a];a===t&&a!==this._dragSourceIndex?h.setAttribute("data-drop-side",i?"right":"left"):h.removeAttribute("data-drop-side")}if(t===this._dragSourceIndex){this._arrowEl&&(this._arrowEl.style.display="none");return}const o=this._cachedPreviews,r=o?o[t].rect:e[t].getBoundingClientRect(),d=i?k:U;if(!this._arrowEl){const a=document.createElement("div");a.style.cssText=`
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10002;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
        will-change: transform;
        filter: drop-shadow(0 1px 3px rgba(0,0,0,0.4));
      `,document.body.appendChild(a),this._arrowEl=a;const h=e[t],u=getComputedStyle(h).getPropertyValue("--esp-color-complementary").trim();this._arrowColor=u?`oklch(from ${u} var(--esp-l-accent) c h)`:"oklch(0.7 0.2 330)"}this._arrowEl.innerHTML=d;const n=this._arrowEl.querySelector("svg");n&&(n.style.width="40px",n.style.height="40px",n.style.color=this._arrowColor??"oklch(0.7 0.2 330)"),this._arrowEl.style.display="flex";const s=i?r.left+r.width*.75:r.left+r.width*.25,l=r.top+r.height/2;this._arrowEl.style.transform=`translate(${s-20}px, ${l-20}px)`}_clearDropTargets(){const e=this.shadowRoot?.querySelectorAll("esp-image-preview");if(e)for(const t of e)t.removeAttribute("data-drop-side");this._arrowEl?.remove(),this._arrowEl=null,this._arrowColor=null}getContainerWidth(){const e=this.parentElement??this.offsetParent,t=e?e.getBoundingClientRect().width:window.innerWidth;if(t<=0){const i=window.innerWidth;return i<640?i-32:i<1024?i*90/100-32:Math.min(i*85/100-32,1400)}if(this._chromeWidth===null){const i=this.previewsDiv.value;if(i){const o=l=>{const a=parseFloat(l);return Number.isFinite(a)?a:0},r=getComputedStyle(i),d=o(r.paddingLeft)+o(r.paddingRight),n=this.shadowRoot?.querySelector(".esp-field"),s=n?o(getComputedStyle(n).borderLeftWidth)+o(getComputedStyle(n).borderRightWidth):0;this._chromeWidth=d+s}}return Math.max(t-(this._chromeWidth??0),1)}_isAccepted(e){const t=this.accept.split(",").map(r=>r.trim().toLowerCase()).filter(Boolean);if(!t.length)return e.type.toLowerCase().startsWith("image/");const i=e.type.toLowerCase(),o=e.name.toLowerCase();return t.some(r=>r.startsWith(".")?o.endsWith(r):r.endsWith("/*")?i.startsWith(r.slice(0,-1)):i===r)}_addSelectedImage(e,t,i){e[t]=i;const o=[...this.uploadedImages];let r=-1;for(let n=t-1;n>=0&&r<0;n--){const s=e[n];if(!s)continue;const l=o.indexOf(s);l>=0&&(r=l+1)}for(let n=t+1;n<e.length&&r<0;n++){const s=e[n];if(!s)continue;const l=o.indexOf(s);l>=0&&(r=l)}r<0&&(r=o.length),o.splice(r,0,i);const d=new AbortController;this._uploadState.set(i,{progress:null,failed:!1,controller:d}),this.uploadedImages=o,this.dispatchEvent(new CustomEvent(v.IMAGE_UPLOAD_FILE_SELECTED,{detail:{image:i,signal:d.signal,...this._makeCallbacks(i)},bubbles:!0,composed:!0}))}_reportRejectedFiles(e){this.dispatchEvent(new CustomEvent(v.IMAGE_UPLOAD_FILES_REJECTED,{detail:e,bubbles:!0,composed:!0}));const t=o=>o===1?"file":"files",i=[];e.unsupported.length&&i.push(`${e.unsupported.length} unsupported ${t(e.unsupported.length)} skipped`),e.unreadable.length&&i.push(`${e.unreadable.length} ${t(e.unreadable.length)} could not be read`),this._rejectionNotice=i.join("; "),clearTimeout(this._noticeTimer),this._noticeTimer=setTimeout(()=>{this._rejectionNotice=""},$)}_previewUrlFor(e,t,i){const o=e.width>0&&e.height>0?e.width/e.height:1,r=Math.max(t,(i??0)/o);if(e.source!=="selected")return this._pickExistingPreviewUrl(e,r);const d=Math.min(globalThis.devicePixelRatio||1,2),n=S*d;if(r*d<=n*m._THUMBNAIL_UPSCALE_SLACK||e.height<=n)return e.url;let a=this._fullPreviewUrls.get(e);return a||(a=URL.createObjectURL(e.file),this._fullPreviewUrls.set(e,a)),a}_pickExistingPreviewUrl(e,t){const i=e.urls;if(!i?.length)return e.url;const o=Math.min(globalThis.devicePixelRatio||1,2),r=e.height>0?e.width/e.height:1,d=t*r*o,n=[...i].sort((l,a)=>l.minWidth-a.minWidth);return(n.find(l=>l.minWidth>=d)??n[n.length-1]).url}_releaseFullPreviewUrl(e){if(e.source!=="selected")return;const t=this._fullPreviewUrls.get(e);t&&(URL.revokeObjectURL(t),this._fullPreviewUrls.delete(e))}_releaseSelectedImages(){for(const e of this.uploadedImages)e.source==="selected"&&(this._uploadState.get(e)?.controller.abort(),y(e));for(const e of this._fullPreviewUrls.values())URL.revokeObjectURL(e);this._fullPreviewUrls.clear()}render(){const{draggingOver:e,uploadedImages:t}=this,i={"dragging-over":e,"has-previews":t.length},o=this.getContainerWidth(),{height:r}=H(),d=r>0?r*O(this.maxRowHeightVh)/100:Number.POSITIVE_INFINITY,n=C(t,{containerWidth:o,targetRowHeight:S,gap:8,maxRowHeight:d,maxImagesPerRow:this.maxImagesPerRow});return w` <div
      class="esp-field"
      @click=${()=>{this.dropAreaDiv.value?.focus({preventScroll:!0})}}
      @dragover=${s=>{s.preventDefault(),this.draggingOver=!0}}
      @dragleave=${s=>{s.preventDefault(),this.draggingOver=!1}}
      @drop=${s=>{s.preventDefault(),this.draggingOver=!1;const l=s.dataTransfer?.files;l&&l.length&&this.filesSelected(l)}}
    >
      <div
        ${E(this.previewsDiv)}
        class=${P({previews:!0,...i})}
        @pointerdown=${this._handleDragPointerDown}
      >
        ${n.map(s=>w`<div class="photo-row" style="height: ${s.height}px;">
            ${s.items.map(({image:l,width:a})=>{const h=s.height,p=this._uploadState.get(l);return w`<esp-image-preview
                style="width: ${a}px; height: ${h}px; flex-shrink: 0;"
                .url=${this._previewUrlFor(l,h,a)}
                .alt=${l.source==="selected"?l.file.name:""}
                .progress=${p?.progress}
                .failed=${p?.failed??!1}
                @esp-internal-image-preview-remove=${()=>{const u=this.uploadedImages.indexOf(l);if(u<0)return;this._uploadState.get(l)?.controller.abort(),this._uploadState.delete(l),y(l),this._releaseFullPreviewUrl(l);const g=[...this.uploadedImages];g.splice(u,1),this.uploadedImages=g,this.dispatchEvent(new CustomEvent(v.IMAGE_UPLOAD_FILE_REMOVED,{detail:l,bubbles:!0,composed:!0}))}}
                @esp-internal-image-preview-retry=${()=>{if(l.source!=="selected")return;const u=new AbortController,g=this._uploadState.get(l);g?(g.failed=!1,g.progress=null,g.controller=u):this._uploadState.set(l,{progress:null,failed:!1,controller:u}),this.requestUpdate(),this.dispatchEvent(new CustomEvent(v.IMAGE_UPLOAD_RETRY,{detail:{image:l,signal:u.signal,...this._makeCallbacks(l)},bubbles:!0,composed:!0}))}}
              ></esp-image-preview>`})}
          </div>`)}
      </div>
      <div
        ${E(this.dropAreaDiv)}
        tabindex="0"
        role="button"
        aria-label="Add photos"
        class=${P({"drop-area":!0,...i})}
        @click=${()=>{this.uploadInput.value?.click()}}
        @keydown=${s=>{(s.code==="Enter"||s.code==="Space")&&(s.preventDefault(),this.uploadInput.value?.click())}}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon-photo-plus"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 8h.01" />
          <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5" />
          <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4" />
          <path d="M14 14l1 -1c.67 -.644 1.45 -.824 2.182 -.54" />
          <path d="M16 19h6" />
          <path d="M19 16v6" />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon-photo-up"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 8h.01" />
          <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5" />
          <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l3.5 3.5" />
          <path d="M14 14l1 -1c.679 -.653 1.473 -.829 2.214 -.526" />
          <path d="M19 22v-6" />
          <path d="M22 19l-3 -3l-3 3" />
        </svg>
        <h2>Add photos</h2>
        <p>Click or drag and drop</p>
        <p class="rejection-notice" role="status">${this._rejectionNotice}</p>
      </div>
      <input
        ${E(this.uploadInput)}
        type="file"
        multiple
        accept=${this.accept}
        hidden
        @change=${()=>{const s=this.uploadInput.value;!s||!s.files||!s.files.length||(this.filesSelected(s.files),s.value="")}}
      />
    </div>`}};c._DRAG_THRESHOLD=8,c._THUMBNAIL_UPSCALE_SLACK=1.1,c.styles=[...D.styles,A`
      :host {
        overflow: hidden;
      }

      div.esp-field {
        overflow-x: hidden;
        overflow-y: auto;
      }

      div.drop-area {
        display: grid;
        outline: none;
        padding: var(--esp-size-medium);
        cursor: pointer;
        transition: background 0.5s ease;
        border-radius: var(--esp-size-border-radius);

        &.has-previews {
          border-top-left-radius: 0;
          border-top-right-radius: 0;
          border-top: 2px dashed
            oklch(from var(--esp-color-complementary) var(--esp-l-raised-2) c h);
        }

        svg {
          height: var(--esp-size-big);
          stroke: currentColor;
          justify-self: center;
          pointer-events: none;
        }

        svg.icon-photo-plus {
          display: inline-block;
        }

        svg.icon-photo-up {
          display: none;
        }

        &.dragging-over {
          svg.icon-photo-plus {
            display: none;
          }

          svg.icon-photo-up {
            display: inline-block;
          }
        }

        h2,
        p {
          text-align: center;
          margin: 0;
        }

        p {
          size: var(--esp-size-small);
          font-size: var(--esp-type-tiny);
        }

        p.rejection-notice {
          color: var(--esp-color-danger-text);
          font-weight: 600;
        }
      }

      div.previews {
        display: flex;
        flex-direction: column;
        gap: 8px;
        box-sizing: border-box;
        overflow: hidden;
        padding-left: var(--esp-size-padding);
        padding-right: var(--esp-size-padding);

        &.has-previews {
          padding: var(--esp-size-padding);
          background: var(--esp-image-upload-preview-background, var(--esp-color-layer-4));
        }

        div.photo-row {
          display: flex;
          align-items: stretch;
          justify-content: flex-start;
          gap: 8px;
          box-sizing: border-box;
          width: 100%;
          max-width: 100%;
          overflow: hidden;
        }

        esp-image-preview {
          object-fit: cover;
          box-sizing: border-box;
          cursor: grab;
          touch-action: pan-y;
          position: relative;

          &:active {
            cursor: grabbing;
          }

          
          &[data-drop-side]::after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            width: 50%;
            background: oklch(from var(--esp-color-complementary) l c h / 0.25);
            pointer-events: none;
            z-index: 5;
          }

          &[data-drop-side="left"]::after {
            left: 0;
            border-left: 3px solid var(--esp-color-headings);
          }

          &[data-drop-side="right"]::after {
            right: 0;
            border-right: 3px solid var(--esp-color-headings);
          }
        }
      }
    `],f([b()],c.prototype,"draggingOver",void 0),f([b()],c.prototype,"uploadedImages",void 0),f([x({type:String})],c.prototype,"accept",void 0),f([x({attribute:"max-images-per-row",type:Number})],c.prototype,"maxImagesPerRow",void 0),f([x({attribute:"max-row-height-vh",type:Number})],c.prototype,"maxRowHeightVh",void 0),f([b()],c.prototype,"_rejectionNotice",void 0),c=m=f([R("esp-image-upload")],c);export{c as EspalierImageUpload};
