var a=function(l,t,o,s){var i=arguments.length,e=i<3?t:s===null?s=Object.getOwnPropertyDescriptor(t,o):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(l,t,o,s);else for(var p=l.length-1;p>=0;p--)(n=l[p])&&(e=(i<3?n(e):i>3?n(t,o,e):n(t,o))||e);return i>3&&e&&Object.defineProperty(t,o,e),e};import{LitElement as d,css as m,html as h}from"lit";import{customElement as u,property as c}from"lit/decorators.js";import{unsafeSVG as b}from"lit/directives/unsafe-svg.js";let r=class extends d{constructor(){super(...arguments),this.label="",this.url="",this.separator="",this.isLastElement=!1}_renderLink(){return this.url?h`<a href=${this.url}>${this.label}</a>`:h`<label>${this.label}</label>`}render(){return h`${this._renderLink()}${this.separator?b(this.separator):""}`}};r.styles=m`
    :host {
      display: grid;
      grid-template-columns: min-content min-content;
      gap: var(--esp-size-tiny-to-small);
      align-items: center;
    }

    
    :is(a, label) {
      font-weight: bold;
      width: min-content;
      text-decoration: none;
      transition: color 0.5s ease;
      white-space: nowrap;
    }

    a {
      color: var(--esp-breadcrumb-color, var(--esp-color-link));
    }

    a:hover {
      background: var(--esp-breadcrumb-hover-background, var(--esp-color-link-hover-bg));
      color: var(--esp-breadcrumb-hover-color, var(--esp-color-link-hover));
      text-decoration: underline;
    }

    
    label {
      color: var(
        --esp-breadcrumb-current-color,
        var(--esp-breadcrumb-color, var(--esp-color-headings))
      );
      font-style: italic;
    }

    
    svg {
      color: var(
        --esp-breadcrumb-separator-color,
        oklch(from var(--esp-color-link) l c calc(h + 90))
      );
      height: var(--esp-size-normal-to-medium);
      width: var(--esp-size-normal-to-medium);
    }
  `,a([c({type:String})],r.prototype,"label",void 0),a([c({type:String})],r.prototype,"url",void 0),a([c({type:String})],r.prototype,"separator",void 0),a([c({attribute:"is-last-element",type:Boolean})],r.prototype,"isLastElement",void 0),r=a([u("esp-breadcrumb")],r);export{r as EspalierBreadcrumb};
