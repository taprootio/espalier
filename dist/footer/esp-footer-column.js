var a=function(n,e,r,o){var p=arguments.length,t=p<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,r):o,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(n,e,r,o);else for(var l=n.length-1;l>=0;l--)(i=n[l])&&(t=(p<3?i(t):p>3?i(e,r,t):i(e,r))||t);return p>3&&t&&Object.defineProperty(e,r,t),t};import{css as m,html as f}from"lit";import{customElement as u,property as h}from"lit/decorators.js";import{syncNormalizedAttribute as d}from"../shared/attribute-helpers.js";import{EspalierElementBase as c}from"../shared/esp-element-base.js";let s=class extends c{constructor(){super(...arguments),this.spanBacker=1}get span(){return this.spanBacker}set span(e){const r=this.spanBacker;this.spanBacker=Number.isInteger(e)&&e>=1&&e<=2?e:1,this.requestUpdate("span",this.hasAttribute("span")?r:void 0),d(this,"span",String(this.spanBacker))}render(){return f`<slot></slot>`}};s.styles=[...c.styles,m`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--esp-footer-row-gap, var(--esp-size-big));
        min-inline-size: 0;
      }
    `],a([h({type:Number,reflect:!0})],s.prototype,"span",null),s=a([u("esp-footer-column")],s);export{s as EspalierFooterColumn};
