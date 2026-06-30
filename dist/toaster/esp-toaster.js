var d=function(a,t,e,o){var i=arguments.length,s=i<3?t:o===null?o=Object.getOwnPropertyDescriptor(t,e):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(a,t,e,o);else for(var l=a.length-1;l>=0;l--)(n=a[l])&&(s=(i<3?n(s):i>3?n(t,e,s):n(t,e))||s);return i>3&&s&&Object.defineProperty(t,e,s),s};import{css as m,html as p}from"lit";import{customElement as u,state as f}from"lit/decorators.js";import{EspalierElementBase as c}from"../shared/esp-element-base.js";import{getEspBus as h}from"../shared/bus-events.js";import{getIconHrefForHost as v}from"../shared/intent-values.js";import{renderSpriteIcon as b}from"../shared/svgs/render-sprite-icon.js";let r=class extends c{constructor(){super(...arguments),this.toasts=[],this.boundHandler=t=>this.handleToast(t)}connectedCallback(){super.connectedCallback(),h().subscribe("show-toast",this.boundHandler)}disconnectedCallback(){super.disconnectedCallback(),h().unsubscribe("show-toast",this.boundHandler)}handleToast(t){this.toasts=[...this.toasts,t];const e=t.duration??5;e>0&&setTimeout(()=>{this.toasts=this.toasts.filter(o=>o!==t),t.onClosed?.()},e*1e3)}removeToast(t){this.toasts=this.toasts.filter(e=>e!==t),t.onClosed?.()}getToastIconHref(t){return t.svgPath?.trim()||v(t.icon,this)}render(){return p`
      <div id="toaster" role="region" aria-label="Notifications" aria-live="polite">
        ${this.toasts.map(t=>{const e=this.getToastIconHref(t);return p`<esp-info
            .destroyable=${(t.duration??5)===0}
            .variant=${t.variant??"complementary"}
            @destroy=${()=>this.removeToast(t)}
          >
            ${e?b(e,{"aria-hidden":null,class:null,slot:"icon-slot"}):p``}
            ${t.message}</esp-info
          >`})}
      </div>
    `}};r.styles=[...c.styles,m`
      #toaster {
        z-index: var(--esp-toaster-z-index, 5000);
        position: fixed;
        bottom: 0;
        display: grid;
        width: 100vw;
        padding: var(--esp-toaster-padding, var(--esp-size-padding));
        pointer-events: none;
        gap: var(--esp-toaster-gap, var(--esp-size-tiny-to-small));
      }

      #toaster esp-info {
        box-shadow: 3px 3px 6px var(--esp-color-shadow);
        pointer-events: all;
      }
    `],d([f()],r.prototype,"toasts",void 0),r=d([u("esp-toaster")],r);export{r as EspalierToaster};
