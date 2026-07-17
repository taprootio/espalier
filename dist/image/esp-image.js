var a=function(h,e,t,i){var o=arguments.length,r=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(h,e,t,i);else for(var c=h.length-1;c>=0;c--)(s=h[c])&&(r=(o<3?s(r):o>3?s(e,t,r):s(e,t))||r);return o>3&&r&&Object.defineProperty(e,t,r),r},d;import{css as m,html as p,nothing as f}from"lit";import{customElement as y,property as l,state as b}from"lit/decorators.js";import{EspalierElementBase as g}from"../shared/esp-element-base.js";import{validImageDimensions as u}from"./image-dimensions.js";import"./esp-image-option.js";let n=d=class extends g{constructor(){super(...arguments),this.originalHeight=0,this.originalWidth=0,this.imageUrl="",this.localImage="",this.caption="",this.sizes="100vw",this.loading="eager",this.renderedWidth=0,this.resizeObserver=null,this.handleSlotChange=()=>{this.requestUpdate()}}get isPortrait(){const e=u(this.originalWidth,this.originalHeight);return e!==null&&e.height>e.width}findProjected(){for(const e of this.children)if(e.tagName==="PICTURE"||e.tagName==="IMG")return e;return null}connectedCallback(){super.connectedCallback(),d.ensureProjectionStyles(this.getRootNode()),this.resizeObserver??=new ResizeObserver(e=>{const t=e[0]?.contentBoxSize?.[0],i=Math.round(t?t.inlineSize:e[0]?.contentRect.width??0);i>0&&i!==this.renderedWidth&&(this.renderedWidth=i)}),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect(),this.resizeObserver=null}effectiveSizes(){return this.renderedWidth>0?`${this.renderedWidth}px`:this.sizes}buildSources(){const e=Array.from(this.querySelectorAll("esp-image-option")),t=new Map;for(const i of e){const o=i.getAttribute("url"),r=Number(i.getAttribute("width"));if(!o||!Number.isFinite(r)||r<=0)continue;const s=i.getAttribute("type")??"",c=t.get(s)??[];c.push({url:o,width:r}),t.set(s,c)}return Array.from(t,([i,o])=>({type:i,srcset:o.sort((r,s)=>r.width-s.width).map(r=>`${r.url} ${r.width}w`).join(", ")})).filter(i=>i.srcset.length>0)}willUpdate(e){if(super.willUpdate(e),!this.hasUpdated||e.has("originalWidth")||e.has("originalHeight")){const t=u(this.originalWidth,this.originalHeight);t?this.style.setProperty("--_esp-image-aspect-ratio",`${t.width} / ${t.height}`):this.style.removeProperty("--_esp-image-aspect-ratio")}}updated(e){if(super.updated(e),this.renderedWidth<=0)return;const t=this.findProjected();if(!t)return;const i=this.effectiveSizes();if(t.tagName==="PICTURE")for(const r of t.querySelectorAll("source"))r.setAttribute("sizes",i);const o=t.tagName==="IMG"?t:t.querySelector("img");o?.hasAttribute("srcset")&&o.setAttribute("sizes",i)}render(){if(this.localImage)return p`<img
        src=${this.localImage}
        alt=${this.caption}
        decoding="async"
        loading=${this.loading}
      />`;const e=p`<slot @slotchange=${this.handleSlotChange}></slot>`;if(this.findProjected())return e;const t=this.buildSources();return p`<picture>
        ${t.map(i=>p`<source
              srcset=${i.srcset}
              sizes=${this.effectiveSizes()}
              type=${i.type||f}
            />`)}
        <img src=${this.imageUrl} alt=${this.caption} decoding="async" loading=${this.loading} />
      </picture>
      ${e}`}static ensureProjectionStyles(e){const t=e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&"host"in e?e:e.nodeType===Node.DOCUMENT_NODE?e.head:e.ownerDocument?.head??document.head,i=Array.from(t.querySelectorAll("style[data-esp-image-projection-styles]")),o=i.find(s=>s.textContent===d.projectionStyles);if(o){for(const s of i)s!==o&&s.remove();return}for(const s of i)s.remove();const r=t.ownerDocument.createElement("style");r.dataset.espImageProjectionStyles="",r.textContent=d.projectionStyles,t.appendChild(r)}};n.projectionStyles=`
    esp-image > picture,
    esp-image > img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: var(--_esp-image-object-fit, cover);
    }
    esp-image > picture > img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: var(--_esp-image-object-fit, cover);
    }
  `,n.styles=[...g.styles,m`
      :host {
        display: block;
        aspect-ratio: var(--_esp-image-aspect-ratio, auto);
        border: var(--esp-image-border, 2px solid var(--esp-color-border));
        box-sizing: border-box;
        border-radius: var(--esp-size-border-radius);
        overflow: hidden;
        position: relative;
      }

      picture {
        display: block;
        height: 100%;
        width: 100%;
      }

      img {
        display: block;
        height: 100%;
        width: 100%;
        object-fit: var(--_esp-image-object-fit, cover);
      }
    `],a([l({attribute:"original-height",type:Number})],n.prototype,"originalHeight",void 0),a([l({attribute:"original-width",type:Number})],n.prototype,"originalWidth",void 0),a([l({attribute:"low-res",type:String})],n.prototype,"imageUrl",void 0),a([l({attribute:"local-image",type:String})],n.prototype,"localImage",void 0),a([l({type:String})],n.prototype,"caption",void 0),a([l({attribute:"sizes",type:String})],n.prototype,"sizes",void 0),a([l({attribute:"loading",type:String})],n.prototype,"loading",void 0),a([b()],n.prototype,"renderedWidth",void 0),n=d=a([y("esp-image")],n);export{n as EspalierImage};
