var i=function(s,r,o,a){var l=arguments.length,e=l<3?r:a===null?a=Object.getOwnPropertyDescriptor(r,o):a,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(s,r,o,a);else for(var c=s.length-1;c>=0;c--)(n=s[c])&&(e=(l<3?n(e):l>3?n(r,o,e):n(r,o))||e);return l>3&&e&&Object.defineProperty(r,o,e),e};import{LitElement as h,css as d,html as m}from"lit";import{customElement as u,property as p}from"lit/decorators.js";import{unsafeSVG as b}from"lit/directives/unsafe-svg.js";let t=class extends h{constructor(){super(...arguments),this.label="",this.url="",this.separator="",this.isLastElement=!1}_renderLink(){return this.isLastElement?m`<label>${this.label}</label>`:m`<a href=${this.url}>${this.label}</a>`}render(){return m`${this._renderLink()}${this.separator?b(this.separator):""}`}};t.styles=d`
    :host {
      display: grid;
      grid-template-columns: min-content min-content;
      gap: var(--esp-size-tiny-to-small);
      align-items: center;
    }

    a,
    label {
      color: var(--esp-breadcrumb-color, var(--esp-color-headings));
      font-weight: bold;
      width: min-content;
      text-decoration: none;
      transition: color 0.5s ease;
      white-space: nowrap;
    }

    a:hover {
      color: var(--esp-breadcrumb-hover-color, var(--esp-color-headings-hover));
      text-decoration: underline;
    }

    label {
      font-style: italic;
    }

    svg {
      height: var(--esp-size-normal-to-medium);
      width: var(--esp-size-normal-to-medium);
    }
  `,i([p({type:String})],t.prototype,"label",void 0),i([p({type:String})],t.prototype,"url",void 0),i([p({type:String})],t.prototype,"separator",void 0),i([p({attribute:"is-last-element",type:Boolean})],t.prototype,"isLastElement",void 0),t=i([u("esp-breadcrumb")],t);export{t as EspalierBreadcrumb};
