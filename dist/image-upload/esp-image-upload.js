var g=function(v,e,t,r){var n=arguments.length,s=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(v,e,t,r);else for(var i=v.length-1;i>=0;i--)(l=v[i])&&(s=(n<3?l(s):n>3?l(e,t,s):l(e,t))||s);return n>3&&s&&Object.defineProperty(e,t,s),s},_;import{css as P,html as m}from"lit";import{customElement as D,property as k,state as w}from"lit/decorators.js";import{createRef as b,ref as x}from"lit/directives/ref.js";import"./esp-image-preview.js";import{classMap as E}from"lit/directives/class-map.js";import{getImageDetails as C,releasePreviewUrl as I}from"./image-helpers.js";const R=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11.911 3.634a2 2 0 0 1 1.089 1.78l.001 2.586h6.999a2 2 0 0 1 2 2v4l-.005 .15a2 2 0 0 1 -1.995 1.85l-6.999 -.001l-.001 2.587a2 2 0 0 1 -3.414 1.414l-6.586 -6.586a2 2 0 0 1 0 -2.828l6.586 -6.586a2 2 0 0 1 2.18 -.434l.145 .068z" />
</svg>`,A=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12.089 3.634a2 2 0 0 0 -1.089 1.78l-.001 2.586h-6.999a2 2 0 0 0 -2 2v4l.005 .15a2 2 0 0 0 1.995 1.85l6.999 -.001l.001 2.587a2 2 0 0 0 3.414 1.414l6.586 -6.586a2 2 0 0 0 0 -2.828l-6.586 -6.586a2 2 0 0 0 -2.18 -.434l-.145 .068z" />
</svg>`;import{EspalierElementBase as y}from"../shared/esp-element-base.js";import{calculatePhotoLayout as M}from"../shared/justified-layout.js";import{ESP_EVENTS as f}from"../shared/events.js";const S=220,U=4,L=8e3;let u=_=class extends y{constructor(){super(...arguments),this.uploadInput=b(),this.previewsDiv=b(),this.dropAreaDiv=b(),this.draggingOver=!1,this.uploadedImages=[],this.accept="image/jpeg, image/png, image/webp",this._rejectionNotice="",this._uploadState=new WeakMap,this._selectionGeneration=0,this._chromeWidth=null,this._resizeObserver=new ResizeObserver(()=>{this._chromeWidth=null,this.requestUpdate()}),this._dragPointerId=null,this._dragSourceIndex=null,this._dragOverIndex=null,this._dragStartX=0,this._dragStartY=0,this._dragActive=!1,this._ghostEl=null,this._ghostHalfW=0,this._ghostHalfH=0,this._arrowEl=null,this._cachedPreviews=null,this._lastDropHit=null,this._savedBodyUserSelect="",this._handleDragPointerDown=e=>{if(e.button!==0||this._dragPointerId!==null||e.composedPath().some(n=>n instanceof HTMLElement&&(n.tagName==="BUTTON"||n.tagName==="ESP-BUTTON")))return;const r=this._getPreviewIndex(e);r!==null&&(this._dragPointerId=e.pointerId,this._dragSourceIndex=r,this._dragStartX=e.clientX,this._dragStartY=e.clientY,this._dragActive=!1,document.addEventListener("pointermove",this._onDocPointerMove),document.addEventListener("pointerup",this._onDocPointerUp),document.addEventListener("pointercancel",this._onDocPointerUp))},this._onDocPointerMove=e=>{if(this._dragSourceIndex===null||e.pointerId!==this._dragPointerId)return;const t=e.clientX-this._dragStartX,r=e.clientY-this._dragStartY;if(!this._dragActive){if(Math.sqrt(t*t+r*r)<_._DRAG_THRESHOLD)return;this._dragActive=!0,this._createGhost(e.clientX,e.clientY);const i=this.shadowRoot?.querySelectorAll("esp-image-preview");i&&(this._cachedPreviews=Array.from(i).map(o=>({el:o,rect:o.getBoundingClientRect()})),this._dragSourceIndex!==null&&this._dragSourceIndex<this._cachedPreviews.length&&(this._cachedPreviews[this._dragSourceIndex].el.style.opacity="0.3")),this._savedBodyUserSelect=document.body.style.userSelect,document.body.style.userSelect="none",this.previewsDiv.value&&(this.previewsDiv.value.style.touchAction="none")}this._ghostEl&&(this._ghostEl.style.transform=`translate(${e.clientX-this._ghostHalfW}px, ${e.clientY-this._ghostHalfH}px)`);const n=this._cachedPreviews;if(!n||n.length===0)return;let s=null,l=!1;for(let i=0;i<n.length;i++){const o=n[i].rect;if(e.clientX>=o.left&&e.clientX<=o.right&&e.clientY>=o.top&&e.clientY<=o.bottom){s=i,l=e.clientX>o.left+o.width/2;break}}if(s===null){let i=1/0;for(let o=0;o<n.length;o++){const a=n[o].rect,d=e.clientX-(a.left+a.width/2),h=e.clientY-(a.top+a.height/2),c=d*d+h*h;c<i&&(i=c,s=o)}if(s!==null){const o=n[s].rect;l=e.clientX>o.left+o.width/2}}s!==null&&(this._dragOverIndex=l?s+1:s,!(this._lastDropHit&&this._lastDropHit.index===s&&this._lastDropHit.after===l)&&(this._lastDropHit={index:s,after:l},this._updateDropTargets(n.map(i=>i.el),s,l)))},this._onDocPointerUp=e=>{if(e.pointerId===this._dragPointerId){if(this._dragActive&&this._dragSourceIndex!==null&&this._dragOverIndex!==null&&this._dragSourceIndex!==this._dragOverIndex&&this._dragSourceIndex+1!==this._dragOverIndex){const t=[...this.uploadedImages],[r]=t.splice(this._dragSourceIndex,1),n=this._dragOverIndex>this._dragSourceIndex?this._dragOverIndex-1:this._dragOverIndex;t.splice(n,0,r),this.uploadedImages=t,this.dispatchEvent(new CustomEvent(f.IMAGES_REORDERED,{detail:{images:this.uploadedImages},bubbles:!0,composed:!0}))}this._clearDragState()}},this._arrowColor=null,this.filesSelected=async e=>{const t=[],r=[];for(const d of e)(this._isAccepted(d)?t:r).push(d);if(!t.length){r.length&&this._reportRejectedFiles({unsupported:r,unreadable:[]});return}const n=this._selectionGeneration,s=Math.round(S*Math.min(globalThis.devicePixelRatio||1,2)),l=new Array(t.length).fill(null),i=[];let o=0;const a=async()=>{for(;o<t.length;){const d=o++,h=t[d];try{const c=await C(h,{thumbnailHeight:s});if(n!==this._selectionGeneration){I(c);continue}this._addSelectedImage(l,d,c)}catch{i.push(h)}}};await Promise.all(Array.from({length:Math.min(U,t.length)},()=>a())),(r.length||i.length)&&n===this._selectionGeneration&&this._reportRejectedFiles({unsupported:r,unreadable:i})},this._makeCallbacks=e=>({onProgress:t=>{const r=this._uploadState.get(e);r&&(r.progress=t,r.failed=!1,this.requestUpdate())},onComplete:t=>{if(!this._uploadState.get(e))return;e.uploadedId=t,this._uploadState.delete(e),!this.uploadedImages.find(s=>!s.uploadedId)?this.uploadedImages=[...this.uploadedImages]:this.requestUpdate()},onFailed:()=>{const t=this._uploadState.get(e);t&&(t.progress=void 0,t.failed=!0,this.requestUpdate())}}),this._fullPreviewUrls=new Map,this.setExistingImages=e=>{this._selectionGeneration++,this._releaseSelectedImages(),this.uploadedImages=e.filter(t=>t.url&&t.uploadedId&&Number.isFinite(t.width)&&t.width>0&&Number.isFinite(t.height)&&t.height>0).map(t=>({source:"existing",url:t.url,urls:t.urls,height:t.height,width:t.width,uploadedId:t.uploadedId,orientation:t.width>t.height?"landscape":"portrait"})),this._uploadState=new WeakMap}}connectedCallback(){super.connectedCallback(),this._resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver.disconnect(),this._clearDragState(),clearTimeout(this._noticeTimer),this._selectionGeneration++,this._releaseSelectedImages()}_getPreviewIndex(e){const t=this.shadowRoot?.querySelectorAll("esp-image-preview");if(!t)return null;for(const r of e.composedPath())if(r instanceof HTMLElement&&r.tagName==="ESP-IMAGE-PREVIEW"){for(let n=0;n<t.length;n++)if(t[n]===r)return n}return null}_clearDragState(){document.removeEventListener("pointermove",this._onDocPointerMove),document.removeEventListener("pointerup",this._onDocPointerUp),document.removeEventListener("pointercancel",this._onDocPointerUp),this._dragActive&&(this._cachedPreviews&&this._dragSourceIndex!==null&&this._dragSourceIndex<this._cachedPreviews.length&&(this._cachedPreviews[this._dragSourceIndex].el.style.opacity=""),this._clearDropTargets(),document.body.style.userSelect=this._savedBodyUserSelect,this.previewsDiv.value&&(this.previewsDiv.value.style.touchAction="")),this._ghostEl?.remove(),this._ghostEl=null,this._cachedPreviews=null,this._lastDropHit=null,this._dragPointerId=null,this._dragSourceIndex=null,this._dragOverIndex=null,this._dragActive=!1}_createGhost(e,t){const r=this.shadowRoot?.querySelectorAll("esp-image-preview");if(!r||this._dragSourceIndex===null)return;const n=r[this._dragSourceIndex],s=n.getBoundingClientRect(),l=document.createElement("div"),i=Math.min(120/s.width,120/s.height),o=s.width*i,a=s.height*i;l.style.cssText=`
      position: fixed;
      left: 0;
      top: 0;
      z-index: 10001;
      pointer-events: none;
      width: ${o}px;
      height: ${a}px;
      border: 2px dashed var(--esp-color-action-background, #4aa);
      border-radius: var(--esp-size-border-radius, 4px);
      background-size: cover;
      background-position: center;
      opacity: 0.85;
      will-change: transform;
      transform: translate(${e-o/2}px, ${t-a/2}px);
    `;const d=n.shadowRoot?.querySelector("img");d&&(l.style.backgroundImage=`url(${d.src})`),document.body.appendChild(l),this._ghostEl=l,this._ghostHalfW=o/2,this._ghostHalfH=a/2}_updateDropTargets(e,t,r){for(let d=0;d<e.length;d++){const h=e[d];d===t&&d!==this._dragSourceIndex?h.setAttribute("data-drop-side",r?"right":"left"):h.removeAttribute("data-drop-side")}if(t===this._dragSourceIndex){this._arrowEl&&(this._arrowEl.style.display="none");return}const n=this._cachedPreviews,s=n?n[t].rect:e[t].getBoundingClientRect(),l=r?A:R;if(!this._arrowEl){const d=document.createElement("div");d.style.cssText=`
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
      `,document.body.appendChild(d),this._arrowEl=d;const h=e[t],p=getComputedStyle(h).getPropertyValue("--esp-color-complementary").trim();this._arrowColor=p?`oklch(from ${p} var(--esp-l-accent) c h)`:"oklch(0.7 0.2 330)"}this._arrowEl.innerHTML=l;const i=this._arrowEl.querySelector("svg");i&&(i.style.width="40px",i.style.height="40px",i.style.color=this._arrowColor??"oklch(0.7 0.2 330)"),this._arrowEl.style.display="flex";const o=r?s.left+s.width*.75:s.left+s.width*.25,a=s.top+s.height/2;this._arrowEl.style.transform=`translate(${o-20}px, ${a-20}px)`}_clearDropTargets(){const e=this.shadowRoot?.querySelectorAll("esp-image-preview");if(e)for(const t of e)t.removeAttribute("data-drop-side");this._arrowEl?.remove(),this._arrowEl=null,this._arrowColor=null}getContainerWidth(){const e=this.parentElement??this.offsetParent,t=e?e.getBoundingClientRect().width:window.innerWidth;if(t<=0){const r=window.innerWidth;return r<640?r-32:r<1024?r*90/100-32:Math.min(r*85/100-32,1400)}if(this._chromeWidth===null){const r=this.previewsDiv.value;if(r){const n=a=>{const d=parseFloat(a);return Number.isFinite(d)?d:0},s=getComputedStyle(r),l=n(s.paddingLeft)+n(s.paddingRight),i=this.shadowRoot?.querySelector(".esp-field"),o=i?n(getComputedStyle(i).borderLeftWidth)+n(getComputedStyle(i).borderRightWidth):0;this._chromeWidth=l+o}}return Math.max(t-(this._chromeWidth??0),1)}_isAccepted(e){const t=this.accept.split(",").map(s=>s.trim().toLowerCase()).filter(Boolean);if(!t.length)return e.type.toLowerCase().startsWith("image/");const r=e.type.toLowerCase(),n=e.name.toLowerCase();return t.some(s=>s.startsWith(".")?n.endsWith(s):s.endsWith("/*")?r.startsWith(s.slice(0,-1)):r===s)}_addSelectedImage(e,t,r){e[t]=r;const n=[...this.uploadedImages];let s=-1;for(let i=t-1;i>=0&&s<0;i--){const o=e[i];if(!o)continue;const a=n.indexOf(o);a>=0&&(s=a+1)}for(let i=t+1;i<e.length&&s<0;i++){const o=e[i];if(!o)continue;const a=n.indexOf(o);a>=0&&(s=a)}s<0&&(s=n.length),n.splice(s,0,r);const l=new AbortController;this._uploadState.set(r,{progress:null,failed:!1,controller:l}),this.uploadedImages=n,this.dispatchEvent(new CustomEvent(f.FILE_SELECTED,{detail:{image:r,signal:l.signal,...this._makeCallbacks(r)},bubbles:!0,composed:!0}))}_reportRejectedFiles(e){this.dispatchEvent(new CustomEvent(f.FILES_REJECTED,{detail:e,bubbles:!0,composed:!0}));const t=n=>n===1?"file":"files",r=[];e.unsupported.length&&r.push(`${e.unsupported.length} unsupported ${t(e.unsupported.length)} skipped`),e.unreadable.length&&r.push(`${e.unreadable.length} ${t(e.unreadable.length)} could not be read`),this._rejectionNotice=r.join("; "),clearTimeout(this._noticeTimer),this._noticeTimer=setTimeout(()=>{this._rejectionNotice=""},L)}_previewUrlFor(e,t){if(e.source!=="selected")return this._pickExistingPreviewUrl(e,t);const r=Math.min(globalThis.devicePixelRatio||1,2),n=S*r;if(t*r<=n*_._THUMBNAIL_UPSCALE_SLACK||e.height<=n)return e.url;let i=this._fullPreviewUrls.get(e);return i||(i=URL.createObjectURL(e.file),this._fullPreviewUrls.set(e,i)),i}_pickExistingPreviewUrl(e,t){const r=e.urls;if(!r?.length)return e.url;const n=Math.min(globalThis.devicePixelRatio||1,2),s=e.height>0?e.width/e.height:1,l=t*s*n,i=[...r].sort((a,d)=>a.minWidth-d.minWidth);return(i.find(a=>a.minWidth>=l)??i[i.length-1]).url}_releaseFullPreviewUrl(e){if(e.source!=="selected")return;const t=this._fullPreviewUrls.get(e);t&&(URL.revokeObjectURL(t),this._fullPreviewUrls.delete(e))}_releaseSelectedImages(){for(const e of this.uploadedImages)e.source==="selected"&&(this._uploadState.get(e)?.controller.abort(),I(e));for(const e of this._fullPreviewUrls.values())URL.revokeObjectURL(e);this._fullPreviewUrls.clear()}render(){const{draggingOver:e,uploadedImages:t}=this,r={"dragging-over":e,"has-previews":t.length},n=this.getContainerWidth(),s=window.innerHeight>0?window.innerHeight/2:Number.POSITIVE_INFINITY,l=M(t,n,S,8,s);return m` <div
      class="esp-field"
      @click=${()=>{this.dropAreaDiv.value?.focus({preventScroll:!0})}}
      @dragover=${i=>{i.preventDefault(),this.draggingOver=!0}}
      @dragleave=${i=>{i.preventDefault(),this.draggingOver=!1}}
      @drop=${i=>{i.preventDefault(),this.draggingOver=!1;const o=i.dataTransfer?.files;o&&o.length&&this.filesSelected(o)}}
    >
      <div
        ${x(this.previewsDiv)}
        class=${E({previews:!0,...r})}
        @pointerdown=${this._handleDragPointerDown}
      >
        ${l.map(i=>m`<div class="photo-row" style="height: ${i.height}px;">
            ${i.images.map(o=>{const a=i.height,d=o.width/o.height*a,h=this._uploadState.get(o);return m`<esp-image-preview
                style="width: ${d}px; height: ${a}px; flex-shrink: 0;"
                .url=${this._previewUrlFor(o,a)}
                .alt=${o.source==="selected"?o.file.name:""}
                .progress=${h?.progress}
                .failed=${h?.failed??!1}
                @remove-image=${()=>{const c=this.uploadedImages.indexOf(o);if(c<0)return;this._uploadState.get(o)?.controller.abort(),this._uploadState.delete(o),I(o),this._releaseFullPreviewUrl(o);const p=[...this.uploadedImages];p.splice(c,1),this.uploadedImages=p,this.dispatchEvent(new CustomEvent(f.FILE_REMOVED,{detail:o,bubbles:!0,composed:!0}))}}
                @retry-upload=${()=>{if(o.source!=="selected")return;const c=new AbortController,p=this._uploadState.get(o);p?(p.failed=!1,p.progress=null,p.controller=c):this._uploadState.set(o,{progress:null,failed:!1,controller:c}),this.requestUpdate(),this.dispatchEvent(new CustomEvent(f.UPLOAD_RETRY,{detail:{image:o,signal:c.signal,...this._makeCallbacks(o)},bubbles:!0,composed:!0}))}}
              ></esp-image-preview>`})}
          </div>`)}
      </div>
      <div
        ${x(this.dropAreaDiv)}
        tabindex="0"
        role="button"
        aria-label="Add photos"
        class=${E({"drop-area":!0,...r})}
        @click=${()=>{this.uploadInput.value?.click()}}
        @keydown=${i=>{(i.code==="Enter"||i.code==="Space")&&(i.preventDefault(),this.uploadInput.value?.click())}}
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
        ${x(this.uploadInput)}
        type="file"
        multiple
        accept=${this.accept}
        hidden
        @change=${()=>{const i=this.uploadInput.value;!i||!i.files||!i.files.length||(this.filesSelected(i.files),i.value="")}}
      />
    </div>`}};u._DRAG_THRESHOLD=8,u._THUMBNAIL_UPSCALE_SLACK=1.1,u.styles=[...y.styles,P`
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
    `],g([w()],u.prototype,"draggingOver",void 0),g([w()],u.prototype,"uploadedImages",void 0),g([k({type:String})],u.prototype,"accept",void 0),g([w()],u.prototype,"_rejectionNotice",void 0),u=_=g([D("esp-image-upload")],u);export{u as EspalierImageUpload};
