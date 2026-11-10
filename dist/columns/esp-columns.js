var m=function(u,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(u,e,t,i);else for(var o=u.length-1;o>=0;o--)(a=u[o])&&(r=(s<3?a(r):s>3?a(e,t,r):a(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r};import{css as x,html as C}from"lit";import{customElement as q,property as v,state as S}from"lit/decorators.js";import{EspalierElementBase as y}from"../shared/esp-element-base.js";import{layoutGapStyles as w}from"../shared/layout-gap.js";import{RafThrottle as L}from"../shared/raf-throttle.js";let l=class extends y{constructor(){super(...arguments),this.gap="normal",this.ratio="equal",this.layout="stack",this.observedRegions=new Set,this.updateLayout=new L(()=>this.measureLayout())}connectedCallback(){super.connectedCallback(),this.mutationObserver=new MutationObserver(e=>{e.some(t=>t.target===this||(t.type==="characterData"||t.type==="attributes")&&t.target.parentNode===this)&&this.updateLayout.schedule()}),this.mutationObserver.observe(this,{childList:!0,characterData:!0,subtree:!0}),this.hasUpdated&&this.observeGeometry()}disconnectedCallback(){this.resizeObserver?.disconnect(),this.resizeObserver=void 0,this.observedRegions.clear(),this.mutationObserver?.disconnect(),this.mutationObserver=void 0,this.updateLayout.cancel(),super.disconnectedCallback()}firstUpdated(e){super.firstUpdated(e),this.observeGeometry()}updated(e){super.updated(e),this.isConnected&&this.updateLayout.schedule()}observeGeometry(){if(this.isConnected){this.resizeObserver?.disconnect(),this.observedRegions.clear(),this.resizeObserver=new ResizeObserver(()=>this.updateLayout.schedule());for(const e of this.renderRoot.querySelectorAll(".esp-columns, .gap-probe, .minimum-probe"))this.resizeObserver.observe(e);this.updateLayout.schedule()}}syncRegionObservers(e){const t=new Set(e);let i=!1;for(const s of this.observedRegions)t.has(s)||(this.resizeObserver?.unobserve(s),this.observedRegions.delete(s),i=!0);for(const s of t)this.observedRegions.has(s)||(this.resizeObserver?.observe(s),this.observedRegions.add(s),i=!0);if(i){this.mutationObserver?.disconnect(),this.mutationObserver?.observe(this,{childList:!0,characterData:!0,subtree:!0});for(const s of t)this.mutationObserver?.observe(s,{attributes:!0,attributeFilter:["hidden","style","class"]})}}measureLayout(){if(!this.isConnected)return;const e=this.renderRoot.querySelector(".esp-columns"),t=this.renderRoot.querySelector(".gap-probe"),i=this.renderRoot.querySelector(".minimum-probe"),s=this.renderRoot.querySelector("slot");if(!e||!t||!i||!s)return;const r=s.assignedNodes(),a=r.filter(n=>n instanceof Element&&!["script","style","template"].includes(n.localName));this.syncRegionObservers(a);const o=a.filter(n=>!n.hasAttribute("hidden")&&getComputedStyle(n).display!=="none").length,g=!r.some(n=>n.nodeType===Node.TEXT_NODE&&n.textContent?.trim())&&(o===2||o===3)&&(this.ratio==="equal"||o===2&&(this.ratio==="40-60"||this.ratio==="60-40")),O=getComputedStyle(e).writingMode.startsWith("vertical"),d=n=>{const f=n.getBoundingClientRect();return O?f.height:f.width},c=d(e),p=d(t),h=d(i),z=[c,p,h].every(Number.isFinite)&&c>0&&p>=0&&h>0,R=this.ratio==="equal"?(c-(o-1)*p)/o:(c-p)*.4,b=g&&z&&R>=h?this.ratio==="equal"?o===3?"equal-3":"equal-2":this.ratio:"stack";b!==this.layout&&(this.layout=b)}render(){return C`
      <div class="esp-columns" part="columns" data-layout=${this.layout}>
        <slot @slotchange=${()=>this.updateLayout.schedule()}></slot>
        
        <span class="size-probe gap-probe" aria-hidden="true"></span>
        <span class="size-probe minimum-probe" aria-hidden="true"></span>
      </div>
    `}};l.styles=[...y.styles,w("--_esp-columns-gap"),x`
      :host {
        display: block;
        min-inline-size: 0;
        max-inline-size: 100%;
      }

      .esp-columns {
        position: relative;
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: var(--esp-columns-gap, var(--_esp-columns-gap));
        min-inline-size: 0;
        overflow-wrap: anywhere;
      }

      .esp-columns[data-layout="equal-2"] { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .esp-columns[data-layout="equal-3"] { grid-template-columns: repeat(3, minmax(0, 1fr)); }
      .esp-columns[data-layout="40-60"] { grid-template-columns: minmax(0, 2fr) minmax(0, 3fr); }
      .esp-columns[data-layout="60-40"] { grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); }

      slot { display: contents; }
      ::slotted(*) {
        min-inline-size: 0;
        max-inline-size: 100%;
      }

      .size-probe {
        position: absolute;
        visibility: hidden;
        pointer-events: none;
        inset-block-start: 0;
        inset-inline-start: 0;
        block-size: 0;
      }
      .gap-probe { inline-size: var(--esp-columns-gap, var(--_esp-columns-gap)); }
      .minimum-probe { inline-size: 18rem; }
    `],m([v({reflect:!0,useDefault:!0})],l.prototype,"gap",void 0),m([v({reflect:!0,useDefault:!0})],l.prototype,"ratio",void 0),m([S()],l.prototype,"layout",void 0),l=m([q("esp-columns")],l);export{l as EspalierColumns};
