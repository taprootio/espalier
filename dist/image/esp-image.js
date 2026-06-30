var a=function(h,e,t,i){var o=arguments.length,r=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(h,e,t,i);else for(var d=h.length-1;d>=0;d--)(n=h[d])&&(r=(o<3?n(r):o>3?n(e,t,r):n(e,t))||r);return o>3&&r&&Object.defineProperty(e,t,r),r},c;import{css as u,html as p,nothing as m}from"lit";import{customElement as b,property as l,state as f}from"lit/decorators.js";import{EspalierElementBase as g}from"../shared/esp-element-base.js";import"./esp-image-option.js";let s=c=class extends g{constructor(){super(...arguments),this.originalHeight=0,this.originalWidth=0,this.imageUrl="",this.localImage="",this.caption="",this.sizes="100vw",this.loading="eager",this.renderedWidth=0,this.resizeObserver=null,this.handleSlotChange=()=>{this.requestUpdate()}}get isPortrait(){return this.originalHeight>this.originalWidth}findProjected(){for(const e of this.children)if(e.tagName==="PICTURE"||e.tagName==="IMG")return e;return null}connectedCallback(){super.connectedCallback(),c.ensureProjectionStyles(this.getRootNode()),this.resizeObserver??=new ResizeObserver(e=>{const t=e[0]?.contentBoxSize?.[0],i=Math.round(t?t.inlineSize:e[0]?.contentRect.width??0);i>0&&i!==this.renderedWidth&&(this.renderedWidth=i)}),this.resizeObserver.observe(this)}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect(),this.resizeObserver=null}effectiveSizes(){return this.renderedWidth>0?`${this.renderedWidth}px`:this.sizes}buildSources(){const e=Array.from(this.querySelectorAll("esp-image-option")),t=new Map;for(const i of e){const o=i.getAttribute("url"),r=Number(i.getAttribute("width"));if(!o||!Number.isFinite(r)||r<=0)continue;const n=i.getAttribute("type")??"",d=t.get(n)??[];d.push({url:o,width:r}),t.set(n,d)}return Array.from(t,([i,o])=>({type:i,srcset:o.sort((r,n)=>r.width-n.width).map(r=>`${r.url} ${r.width}w`).join(", ")})).filter(i=>i.srcset.length>0)}willUpdate(e){super.willUpdate(e),(!this.hasUpdated||e.has("originalWidth")||e.has("originalHeight"))&&(this.originalWidth>0&&this.originalHeight>0?this.style.setProperty("--_esp-image-aspect-ratio",`${this.originalWidth} / ${this.originalHeight}`):this.style.removeProperty("--_esp-image-aspect-ratio"))}updated(e){if(super.updated(e),this.renderedWidth<=0)return;const t=this.findProjected();if(!t)return;const i=this.effectiveSizes();if(t.tagName==="PICTURE")for(const r of t.querySelectorAll("source"))r.setAttribute("sizes",i);const o=t.tagName==="IMG"?t:t.querySelector("img");o?.hasAttribute("srcset")&&o.setAttribute("sizes",i)}render(){if(this.localImage)return p`<img
        src=${this.localImage}
        alt=${this.caption}
        decoding="async"
        loading=${this.loading}
      />`;const e=p`<slot @slotchange=${this.handleSlotChange}></slot>`;if(this.findProjected())return e;const t=this.buildSources();return p`<picture>
        ${t.map(i=>p`<source
              srcset=${i.srcset}
              sizes=${this.effectiveSizes()}
              type=${i.type||m}
            />`)}
        <img src=${this.imageUrl} alt=${this.caption} decoding="async" loading=${this.loading} />
      </picture>
      ${e}`}static ensureProjectionStyles(e){const t=e instanceof ShadowRoot?e:document.head;if(c.styledRoots.has(t))return;c.styledRoots.add(t);const i=document.createElement("style");i.textContent=c.projectionStyles,t.appendChild(i)}};s.projectionStyles=`
    esp-image > picture,
    esp-image > img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    esp-image > picture > img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,s.styledRoots=new WeakSet,s.styles=[...g.styles,u`
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
        object-fit: cover;
      }
    `],a([l({attribute:"original-height",type:Number})],s.prototype,"originalHeight",void 0),a([l({attribute:"original-width",type:Number})],s.prototype,"originalWidth",void 0),a([l({attribute:"low-res",type:String})],s.prototype,"imageUrl",void 0),a([l({attribute:"local-image",type:String})],s.prototype,"localImage",void 0),a([l({type:String})],s.prototype,"caption",void 0),a([l({attribute:"sizes",type:String})],s.prototype,"sizes",void 0),a([l({attribute:"loading",type:String})],s.prototype,"loading",void 0),a([f()],s.prototype,"renderedWidth",void 0),s=c=a([b("esp-image")],s);export{s as EspalierImage};
