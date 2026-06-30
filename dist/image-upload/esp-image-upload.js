var g=function(v,e,t,i){var n=arguments.length,s=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(v,e,t,i);else for(var r=v.length-1;r>=0;r--)(l=v[r])&&(s=(n<3?l(s):n>3?l(e,t,s):l(e,t))||s);return n>3&&s&&Object.defineProperty(e,t,s),s},_;import{css as P,html as m}from"lit";import{customElement as D,property as k,state as w}from"lit/decorators.js";import{createRef as b,ref as x}from"lit/directives/ref.js";import"./esp-image-preview.js";import{classMap as y}from"lit/directives/class-map.js";import{getImageDetails as C,releasePreviewUrl as I}from"./image-helpers.js";const R=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M11.911 3.634a2 2 0 0 1 1.089 1.78l.001 2.586h6.999a2 2 0 0 1 2 2v4l-.005 .15a2 2 0 0 1 -1.995 1.85l-6.999 -.001l-.001 2.587a2 2 0 0 1 -3.414 1.414l-6.586 -6.586a2 2 0 0 1 0 -2.828l6.586 -6.586a2 2 0 0 1 2.18 -.434l.145 .068z" />
</svg>`,A=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12.089 3.634a2 2 0 0 0 -1.089 1.78l-.001 2.586h-6.999a2 2 0 0 0 -2 2v4l.005 .15a2 2 0 0 0 1.995 1.85l6.999 -.001l.001 2.587a2 2 0 0 0 3.414 1.414l6.586 -6.586a2 2 0 0 0 0 -2.828l-6.586 -6.586a2 2 0 0 0 -2.18 -.434l-.145 .068z" />
</svg>`;import{EspalierElementBase as E}from"../shared/esp-element-base.js";import{calculatePhotoLayout as M}from"../shared/justified-layout.js";import{ESP_EVENTS as f}from"../shared/events.js";const S=220,U=4,L=8e3;let u=_=class extends E{constructor(){super(...arguments),this.uploadInput=b(),this.previewsDiv=b(),this.dropAreaDiv=b(),this.draggingOver=!1,this.uploadedImages=[],this.accept="image/jpeg, image/png, image/webp",this._rejectionNotice="",this._uploadState=new WeakMap,this._selectionGeneration=0,this._chromeWidth=null,this._resizeObserver=new ResizeObserver(()=>{this._chromeWidth=null,this.requestUpdate()}),this._dragPointerId=null,this._dragSourceIndex=null,this._dragOverIndex=null,this._dragStartX=0,this._dragStartY=0,this._dragActive=!1,this._ghostEl=null,this._ghostHalfW=0,this._ghostHalfH=0,this._arrowEl=null,this._cachedPreviews=null,this._lastDropHit=null,this._savedBodyUserSelect="",this._handleDragPointerDown=e=>{if(e.button!==0||this._dragPointerId!==null||e.composedPath().some(n=>n instanceof HTMLElement&&(n.tagName==="BUTTON"||n.tagName==="ESP-BUTTON")))return;const i=this._getPreviewIndex(e);i!==null&&(this._dragPointerId=e.pointerId,this._dragSourceIndex=i,this._dragStartX=e.clientX,this._dragStartY=e.clientY,this._dragActive=!1,document.addEventListener("pointermove",this._onDocPointerMove),document.addEventListener("pointerup",this._onDocPointerUp),document.addEventListener("pointercancel",this._onDocPointerUp))},this._onDocPointerMove=e=>{if(this._dragSourceIndex===null||e.pointerId!==this._dragPointerId)return;const t=e.clientX-this._dragStartX,i=e.clientY-this._dragStartY;if(!this._dragActive){if(Math.sqrt(t*t+i*i)<_._DRAG_THRESHOLD)return;this._dragActive=!0,this._createGhost(e.clientX,e.clientY);const r=this.shadowRoot?.querySelectorAll("esp-image-preview");r&&(this._cachedPreviews=Array.from(r).map(o=>({el:o,rect:o.getBoundingClientRect()})),this._dragSourceIndex!==null&&this._dragSourceIndex<this._cachedPreviews.length&&(this._cachedPreviews[this._dragSourceIndex].el.style.opacity="0.3")),this._savedBodyUserSelect=document.body.style.userSelect,document.body.style.userSelect="none",this.previewsDiv.value&&(this.previewsDiv.value.style.touchAction="none")}this._ghostEl&&(this._ghostEl.style.transform=`translate(${e.clientX-this._ghostHalfW}px, ${e.clientY-this._ghostHalfH}px)`);const n=this._cachedPreviews;if(!n||n.length===0)return;let s=null,l=!1;for(let r=0;r<n.length;r++){const o=n[r].rect;if(e.clientX>=o.left&&e.clientX<=o.right&&e.clientY>=o.top&&e.clientY<=o.bottom){s=r,l=e.clientX>o.left+o.width/2;break}}if(s===null){let r=1/0;for(let o=0;o<n.length;o++){const a=n[o].rect,d=e.clientX-(a.left+a.width/2),c=e.clientY-(a.top+a.height/2),h=d*d+c*c;h<r&&(r=h,s=o)}if(s!==null){const o=n[s].rect;l=e.clientX>o.left+o.width/2}}s!==null&&(this._dragOverIndex=l?s+1:s,!(this._lastDropHit&&this._lastDropHit.index===s&&this._lastDropHit.after===l)&&(this._lastDropHit={index:s,after:l},this._updateDropTargets(n.map(r=>r.el),s,l)))},this._onDocPointerUp=e=>{if(e.pointerId===this._dragPointerId){if(this._dragActive&&this._dragSourceIndex!==null&&this._dragOverIndex!==null&&this._dragSourceIndex!==this._dragOverIndex&&this._dragSourceIndex+1!==this._dragOverIndex){const t=[...this.uploadedImages],[i]=t.splice(this._dragSourceIndex,1),n=this._dragOverIndex>this._dragSourceIndex?this._dragOverIndex-1:this._dragOverIndex;t.splice(n,0,i),this.uploadedImages=t,this.dispatchEvent(new CustomEvent(f.IMAGES_REORDERED,{detail:{images:this.uploadedImages},bubbles:!0,composed:!0}))}this._clearDragState()}},this._arrowColor=null,this.filesSelected=async e=>{const t=[],i=[];for(const d of e)(this._isAccepted(d)?t:i).push(d);if(!t.length){i.length&&this._reportRejectedFiles({unsupported:i,unreadable:[]});return}const n=this._selectionGeneration,s=Math.round(S*Math.min(globalThis.devicePixelRatio||1,2)),l=new Array(t.length).fill(null),r=[];let o=0;const a=async()=>{for(;o<t.length;){const d=o++,c=t[d];try{const h=await C(c,{thumbnailHeight:s});if(n!==this._selectionGeneration){I(h);continue}this._addSelectedImage(l,d,h)}catch{r.push(c)}}};await Promise.all(Array.from({length:Math.min(U,t.length)},()=>a())),(i.length||r.length)&&n===this._selectionGeneration&&this._reportRejectedFiles({unsupported:i,unreadable:r})},this._makeCallbacks=e=>({onProgress:t=>{const i=this._uploadState.get(e);i&&(i.progress=t,i.failed=!1,this.requestUpdate())},onComplete:t=>{if(!this._uploadState.get(e))return;e.uploadedId=t,this._uploadState.delete(e),!this.uploadedImages.find(s=>!s.uploadedId)?this.uploadedImages=[...this.uploadedImages]:this.requestUpdate()},onFailed:()=>{const t=this._uploadState.get(e);t&&(t.progress=void 0,t.failed=!0,this.requestUpdate())}}),this._fullPreviewUrls=new Map,this.setExistingImages=e=>{this._selectionGeneration++,this._releaseSelectedImages(),this.uploadedImages=e.filter(t=>t.url&&t.uploadedId&&Number.isFinite(t.width)&&t.width>0&&Number.isFinite(t.height)&&t.height>0).map(t=>({source:"existing",url:t.url,urls:t.urls,height:t.height,width:t.width,uploadedId:t.uploadedId,orientation:t.width>t.height?"landscape":"portrait"})),this._uploadState=new WeakMap}}connectedCallback(){super.connectedCallback(),this._resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this._resizeObserver.disconnect(),this._clearDragState(),clearTimeout(this._noticeTimer),this._selectionGeneration++,this._releaseSelectedImages()}_getPreviewIndex(e){const t=this.shadowRoot?.querySelectorAll("esp-image-preview");if(!t)return null;for(const i of e.composedPath())if(i instanceof HTMLElement&&i.tagName==="ESP-IMAGE-PREVIEW"){for(let n=0;n<t.length;n++)if(t[n]===i)return n}return null}_clearDragState(){document.removeEventListener("pointermove",this._onDocPointerMove),document.removeEventListener("pointerup",this._onDocPointerUp),document.removeEventListener("pointercancel",this._onDocPointerUp),this._dragActive&&(this._cachedPreviews&&this._dragSourceIndex!==null&&this._dragSourceIndex<this._cachedPreviews.length&&(this._cachedPreviews[this._dragSourceIndex].el.style.opacity=""),this._clearDropTargets(),document.body.style.userSelect=this._savedBodyUserSelect,this.previewsDiv.value&&(this.previewsDiv.value.style.touchAction="")),this._ghostEl?.remove(),this._ghostEl=null,this._cachedPreviews=null,this._lastDropHit=null,this._dragPointerId=null,this._dragSourceIndex=null,this._dragOverIndex=null,this._dragActive=!1}_createGhost(e,t){const i=this.shadowRoot?.querySelectorAll("esp-image-preview");if(!i||this._dragSourceIndex===null)return;const n=i[this._dragSourceIndex],s=n.getBoundingClientRect(),l=document.createElement("div"),r=Math.min(120/s.width,120/s.height),o=s.width*r,a=s.height*r;l.style.cssText=`
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
    `;const d=n.shadowRoot?.querySelector("img");d&&(l.style.backgroundImage=`url(${d.src})`),document.body.appendChild(l),this._ghostEl=l,this._ghostHalfW=o/2,this._ghostHalfH=a/2}_updateDropTargets(e,t,i){for(let d=0;d<e.length;d++){const c=e[d];d===t&&d!==this._dragSourceIndex?c.setAttribute("data-drop-side",i?"right":"left"):c.removeAttribute("data-drop-side")}if(t===this._dragSourceIndex){this._arrowEl&&(this._arrowEl.style.display="none");return}const n=this._cachedPreviews,s=n?n[t].rect:e[t].getBoundingClientRect(),l=i?A:R;if(!this._arrowEl){const d=document.createElement("div");d.style.cssText=`
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
      `,document.body.appendChild(d),this._arrowEl=d;const c=e[t],p=getComputedStyle(c).getPropertyValue("--esp-color-complementary").trim();this._arrowColor=p?`oklch(from ${p} var(--esp-l-accent) c h)`:"oklch(0.7 0.2 330)"}this._arrowEl.innerHTML=l;const r=this._arrowEl.querySelector("svg");r&&(r.style.width="40px",r.style.height="40px",r.style.color=this._arrowColor??"oklch(0.7 0.2 330)"),this._arrowEl.style.display="flex";const o=i?s.left+s.width*.75:s.left+s.width*.25,a=s.top+s.height/2;this._arrowEl.style.transform=`translate(${o-20}px, ${a-20}px)`}_clearDropTargets(){const e=this.shadowRoot?.querySelectorAll("esp-image-preview");if(e)for(const t of e)t.removeAttribute("data-drop-side");this._arrowEl?.remove(),this._arrowEl=null,this._arrowColor=null}getContainerWidth(){const e=this.parentElement??this.offsetParent,t=e?e.getBoundingClientRect().width:window.innerWidth;if(t<=0){const i=window.innerWidth;return i<640?i-32:i<1024?i*90/100-32:Math.min(i*85/100-32,1400)}if(this._chromeWidth===null){const i=this.previewsDiv.value;if(i){const n=a=>{const d=parseFloat(a);return Number.isFinite(d)?d:0},s=getComputedStyle(i),l=n(s.paddingLeft)+n(s.paddingRight),r=this.shadowRoot?.querySelector(".esp-field"),o=r?n(getComputedStyle(r).borderLeftWidth)+n(getComputedStyle(r).borderRightWidth):0;this._chromeWidth=l+o}}return Math.max(t-(this._chromeWidth??0),1)}_isAccepted(e){const t=this.accept.split(",").map(s=>s.trim().toLowerCase()).filter(Boolean);if(!t.length)return e.type.toLowerCase().startsWith("image/");const i=e.type.toLowerCase(),n=e.name.toLowerCase();return t.some(s=>s.startsWith(".")?n.endsWith(s):s.endsWith("/*")?i.startsWith(s.slice(0,-1)):i===s)}_addSelectedImage(e,t,i){e[t]=i;const n=[...this.uploadedImages];let s=-1;for(let r=t-1;r>=0&&s<0;r--){const o=e[r];if(!o)continue;const a=n.indexOf(o);a>=0&&(s=a+1)}for(let r=t+1;r<e.length&&s<0;r++){const o=e[r];if(!o)continue;const a=n.indexOf(o);a>=0&&(s=a)}s<0&&(s=n.length),n.splice(s,0,i);const l=new AbortController;this._uploadState.set(i,{progress:null,failed:!1,controller:l}),this.uploadedImages=n,this.dispatchEvent(new CustomEvent(f.FILE_SELECTED,{detail:{image:i,signal:l.signal,...this._makeCallbacks(i)},bubbles:!0,composed:!0}))}_reportRejectedFiles(e){this.dispatchEvent(new CustomEvent(f.FILES_REJECTED,{detail:e,bubbles:!0,composed:!0}));const t=n=>n===1?"file":"files",i=[];e.unsupported.length&&i.push(`${e.unsupported.length} unsupported ${t(e.unsupported.length)} skipped`),e.unreadable.length&&i.push(`${e.unreadable.length} ${t(e.unreadable.length)} could not be read`),this._rejectionNotice=i.join("; "),clearTimeout(this._noticeTimer),this._noticeTimer=setTimeout(()=>{this._rejectionNotice=""},L)}_previewUrlFor(e,t){if(e.source!=="selected")return this._pickExistingPreviewUrl(e,t);const i=Math.min(globalThis.devicePixelRatio||1,2),n=S*i;if(t*i<=n*_._THUMBNAIL_UPSCALE_SLACK||e.height<=n)return e.url;let r=this._fullPreviewUrls.get(e);return r||(r=URL.createObjectURL(e.file),this._fullPreviewUrls.set(e,r)),r}_pickExistingPreviewUrl(e,t){const i=e.urls;if(!i?.length)return e.url;const n=Math.min(globalThis.devicePixelRatio||1,2),s=e.height>0?e.width/e.height:1,l=t*s*n,r=[...i].sort((a,d)=>a.minWidth-d.minWidth);return(r.find(a=>a.minWidth>=l)??r[r.length-1]).url}_releaseFullPreviewUrl(e){if(e.source!=="selected")return;const t=this._fullPreviewUrls.get(e);t&&(URL.revokeObjectURL(t),this._fullPreviewUrls.delete(e))}_releaseSelectedImages(){for(const e of this.uploadedImages)e.source==="selected"&&(this._uploadState.get(e)?.controller.abort(),I(e));for(const e of this._fullPreviewUrls.values())URL.revokeObjectURL(e);this._fullPreviewUrls.clear()}render(){const{draggingOver:e,uploadedImages:t}=this,i={"dragging-over":e,"has-previews":t.length},n=this.getContainerWidth(),s=window.innerHeight>0?window.innerHeight/2:Number.POSITIVE_INFINITY,l=M(t,n,S,8,s);return m` <div
      class="esp-field"
      @click=${()=>{this.dropAreaDiv.value?.focus({preventScroll:!0})}}
      @dragover=${r=>{r.preventDefault(),this.draggingOver=!0}}
      @dragleave=${r=>{r.preventDefault(),this.draggingOver=!1}}
      @drop=${r=>{r.preventDefault(),this.draggingOver=!1;const o=r.dataTransfer?.files;o&&o.length&&this.filesSelected(o)}}
    >
      <div
        ${x(this.previewsDiv)}
        class=${y({previews:!0,...i})}
        @pointerdown=${this._handleDragPointerDown}
      >
        ${l.map(r=>m`<div class="photo-row" style="height: ${r.height}px;">
            ${r.images.map(o=>{const a=r.height,d=o.width/o.height*a,c=this._uploadState.get(o);return m`<esp-image-preview
                style="width: ${d}px; height: ${a}px; flex-shrink: 0;"
                .url=${this._previewUrlFor(o,a)}
                .alt=${o.source==="selected"?o.file.name:""}
                .progress=${c?.progress}
                .failed=${c?.failed??!1}
                @remove-image=${()=>{const h=this.uploadedImages.indexOf(o);if(h<0)return;this._uploadState.get(o)?.controller.abort(),this._uploadState.delete(o),I(o),this._releaseFullPreviewUrl(o);const p=[...this.uploadedImages];p.splice(h,1),this.uploadedImages=p,this.dispatchEvent(new CustomEvent(f.FILE_REMOVED,{detail:o,bubbles:!0,composed:!0}))}}
                @retry-upload=${()=>{if(o.source!=="selected")return;const h=new AbortController,p=this._uploadState.get(o);p?(p.failed=!1,p.progress=null,p.controller=h):this._uploadState.set(o,{progress:null,failed:!1,controller:h}),this.requestUpdate(),this.dispatchEvent(new CustomEvent(f.UPLOAD_RETRY,{detail:{image:o,signal:h.signal,...this._makeCallbacks(o)},bubbles:!0,composed:!0}))}}
              ></esp-image-preview>`})}
          </div>`)}
      </div>
      <div
        ${x(this.dropAreaDiv)}
        tabindex="0"
        role="button"
        aria-label="Add photos"
        class=${y({"drop-area":!0,...i})}
        @click=${()=>{this.uploadInput.value?.click()}}
        @keydown=${r=>{(r.code==="Enter"||r.code==="Space")&&(r.preventDefault(),this.uploadInput.value?.click())}}
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
        @change=${()=>{const r=this.uploadInput.value;!r||!r.files||!r.files.length||(this.filesSelected(r.files),r.value="")}}
      />
    </div>`}};u._DRAG_THRESHOLD=8,u._THUMBNAIL_UPSCALE_SLACK=1.1,u.styles=[...E.styles,P`
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
            border-left: 3px solid
              oklch(from var(--esp-color-complementary) var(--esp-l-accent) c h);
          }

          &[data-drop-side="right"]::after {
            right: 0;
            border-right: 3px solid
              oklch(from var(--esp-color-complementary) var(--esp-l-accent) c h);
          }
        }
      }
    `],g([w()],u.prototype,"draggingOver",void 0),g([w()],u.prototype,"uploadedImages",void 0),g([k({type:String})],u.prototype,"accept",void 0),g([w()],u.prototype,"_rejectionNotice",void 0),u=_=g([D("esp-image-upload")],u);export{u as EspalierImageUpload};
