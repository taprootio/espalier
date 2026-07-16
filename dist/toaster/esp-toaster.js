var u=function(o,e,s,n){var c=arguments.length,r=c<3?e:n===null?n=Object.getOwnPropertyDescriptor(e,s):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,s,n);else for(var d=o.length-1;d>=0;d--)(a=o[d])&&(r=(c<3?a(r):c>3?a(e,s,r):a(e,s))||r);return c>3&&r&&Object.defineProperty(e,s,r),r},t;import{css as f,html as l}from"lit";import{customElement as v,state as h}from"lit/decorators.js";import{EspalierElementBase as p}from"../shared/esp-element-base.js";import{getEspBus as b}from"../shared/bus-events.js";import{getIconHrefForHost as m}from"../shared/intent-values.js";import{renderSpriteIcon as y}from"../shared/svgs/render-sprite-icon.js";let i=t=class extends p{constructor(){super(...arguments),this.toasts=[]}connectedCallback(){super.connectedCallback(),t.connected.push(this),t.busSubscribed||(b().subscribe("show-toast",t.boundDeliver),t.busSubscribed=!0),typeof ResizeObserver<"u"&&(this.resizeObserver=new ResizeObserver(()=>t.syncRenderer()),this.resizeObserver.observe(this)),t.syncRenderer()}disconnectedCallback(){super.disconnectedCallback(),this.resizeObserver?.disconnect(),this.resizeObserver=void 0,t.connected=t.connected.filter(e=>e!==this),t.connected.length===0?(t.busSubscribed&&(b().unsubscribe("show-toast",t.boundDeliver),t.busSubscribed=!1),t.queue=[]):t.syncRenderer()}static deliver(e){t.queue=[...t.queue,e];const s=e.duration??5;s>0&&setTimeout(()=>t.dismiss(e),s*1e3),t.syncRenderer()}static dismiss(e){t.queue.includes(e)&&(t.queue=t.queue.filter(s=>s!==e),e.onClosed?.(),t.syncRenderer())}static syncRenderer(){const e=t.connected.find(s=>s.isVisible())??t.connected[0];for(const s of t.connected){const n=s===e?t.queue:[];s.toasts.length===n.length&&s.toasts.every((c,r)=>c===n[r])||(s.toasts=[...n])}}isVisible(){const e=this;return typeof e.checkVisibility=="function"?e.checkVisibility({visibilityProperty:!0,opacityProperty:!0,checkVisibilityCSS:!0,checkOpacity:!0}):this.offsetParent!==null}removeToast(e){t.dismiss(e)}getToastIconHref(e){return e.svgPath?.trim()||m(e.icon,this)}render(){return l`
      <div id="toaster" role="region" aria-label="Notifications" aria-live="polite">
        ${this.toasts.map(e=>{const s=this.getToastIconHref(e);return l`<esp-info
            .destroyable=${(e.duration??5)===0}
            .variant=${e.variant??"complementary"}
            @destroy=${()=>this.removeToast(e)}
          >
            ${s?y(s,{"aria-hidden":null,class:null,slot:"icon-slot"}):l``}
            ${e.message}</esp-info
          >`})}
      </div>
    `}};i.connected=[],i.busSubscribed=!1,i.queue=[],i.boundDeliver=o=>t.deliver(o),i.styles=[...p.styles,f`
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
    `],u([h()],i.prototype,"toasts",void 0),i=t=u([v("esp-toaster")],i);export{i as EspalierToaster};
