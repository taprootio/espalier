var a=function(n,e,o,s){var i=arguments.length,r=i<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,o):s,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(n,e,o,s);else for(var p=n.length-1;p>=0;p--)(l=n[p])&&(r=(i<3?l(r):i>3?l(e,o,r):l(e,o))||r);return i>3&&r&&Object.defineProperty(e,o,r),r};import{LitElement as m,css as d,html as h}from"lit";import{customElement as u,property as c}from"lit/decorators.js";import{classMap as b}from"lit/directives/class-map.js";import{unsafeSVG as v}from"lit/directives/unsafe-svg.js";let t=class extends m{constructor(){super(...arguments),this.label="",this.url="",this.separator="",this.isLastElement=!1}_renderLink(){return this.url?h`<a href=${this.url}>${this.label}</a>`:h`<span aria-current="page">${this.label}</span>`}render(){const e={crumb:!0,"is-current":!this.url};return h`<div class=${b(e)}>
      ${this._renderLink()}${this.separator?v(this.separator):""}
    </div>`}};t.styles=d`
    
    :host {
      display: block;
      min-width: 0;
    }

    
    .crumb {
      display: grid;
      grid-template-columns: min-content min-content;
      gap: var(--esp-size-tiny-to-small);
      align-items: center;
    }

    .crumb.is-current {
      grid-template-columns: minmax(0, auto) min-content;
    }

    
    :is(a, span[aria-current="page"]) {
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

    
    span[aria-current="page"] {
      color: var(
        --esp-breadcrumb-current-color,
        var(--esp-breadcrumb-color, var(--esp-color-headings))
      );
      font-style: italic;
      white-space: normal;
      width: auto;
      overflow-wrap: anywhere;
    }

    
    svg {
      color: var(
        --esp-breadcrumb-separator-color,
        oklch(from var(--esp-color-link) l c calc(h + 90))
      );
      height: var(--esp-size-normal-to-medium);
      width: var(--esp-size-normal-to-medium);
    }
  `,a([c({type:String})],t.prototype,"label",void 0),a([c({type:String})],t.prototype,"url",void 0),a([c({type:String})],t.prototype,"separator",void 0),a([c({attribute:"is-last-element",type:Boolean})],t.prototype,"isLastElement",void 0),t=a([u("esp-breadcrumb")],t);export{t as EspalierBreadcrumb};
