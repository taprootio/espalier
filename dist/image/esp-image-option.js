var s=function(i,r,o,p){var n=arguments.length,t=n<3?r:p===null?p=Object.getOwnPropertyDescriptor(r,o):p,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(i,r,o,p);else for(var m=i.length-1;m>=0;m--)(l=i[m])&&(t=(n<3?l(t):n>3?l(r,o,t):l(r,o))||t);return n>3&&t&&Object.defineProperty(r,o,t),t};import{css as c,LitElement as u}from"lit";import{customElement as f,property as a}from"lit/decorators.js";let e=class extends u{constructor(){super(...arguments),this.width=0,this.imageUrl="",this.type=""}};e.styles=c`
    :host {
      display: none;
    }
  `,s([a({attribute:"width",type:Number})],e.prototype,"width",void 0),s([a({attribute:"url",type:String})],e.prototype,"imageUrl",void 0),s([a({attribute:"type",type:String})],e.prototype,"type",void 0),e=s([f("esp-image-option")],e);export{e as EspalierImageOption};
