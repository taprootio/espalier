var m=function(r,o,t,l){var n=arguments.length,e=n<3?o:l===null?l=Object.getOwnPropertyDescriptor(o,t):l,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(r,o,t,l);else for(var f=r.length-1;f>=0;f--)(s=r[f])&&(e=(n<3?s(e):n>3?s(o,t,e):s(o,t))||e);return n>3&&e&&Object.defineProperty(o,t,e),e};import{css as c,html as a}from"lit";import{customElement as u}from"lit/decorators.js";import{EspalierElementBase as p}from"../shared/esp-element-base.js";let i=class extends p{render(){return a`<slot></slot>`}};i.styles=[...p.styles,c`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--esp-footer-row-gap, var(--esp-size-big));
        min-inline-size: 0;
      }
    `],i=m([u("esp-footer-column")],i);export{i as EspalierFooterColumn};
