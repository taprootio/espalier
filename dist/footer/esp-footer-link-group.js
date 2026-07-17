var d=function(t,o,r,n){var s=arguments.length,e=s<3?o:n===null?n=Object.getOwnPropertyDescriptor(o,r):n,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(t,o,r,n);else for(var a=t.length-1;a>=0;a--)(l=t[a])&&(e=(s<3?l(e):s>3?l(o,r,e):l(o,r))||e);return s>3&&e&&Object.defineProperty(o,r,e),e};import{css as v,html as f,nothing as p}from"lit";import{customElement as g,property as u}from"lit/decorators.js";import{EspalierElementBase as c}from"../shared/esp-element-base.js";const h="esp-footer-link-group-heading";let i=class extends c{constructor(){super(...arguments),this.heading=""}render(){return f`
      <nav
        part="nav"
        aria-labelledby=${this.heading?h:p}
        aria-label=${this.heading?p:"Footer links"}
      >
        ${this.heading?f`<h2 part="heading" id=${h}>${this.heading}</h2>`:p}
        <div part="links" class="links"><slot></slot></div>
      </nav>
    `}};i.styles=[...c.styles,v`
      :host {
        display: block;
        min-inline-size: 0;
      }

      nav {
        display: grid;
        gap: var(--esp-footer-link-group-gap, var(--esp-size-small));
        min-inline-size: 0;
        color: var(--esp-footer-color, var(--esp-color-text));
      }

      h2 {
        margin: 0;
        color: var(--esp-footer-heading-color, var(--esp-color-headings));
        font-family: var(--esp-font-headings);
        font-size: var(--esp-type-normal);
        font-weight: var(--esp-font-weight-headings);
        line-height: 1.25;
      }

      .links {
        display: grid;
        gap: var(--esp-size-tiny);
        min-inline-size: 0;
      }

      ::slotted(a) {
        inline-size: fit-content;
        max-inline-size: 100%;
        color: var(--esp-footer-link-color, var(--esp-color-link));
        overflow-wrap: anywhere;
        text-decoration: none;
        text-underline-offset: 0.18em;
      }

      ::slotted(a:hover) {
        color: var(--esp-footer-link-hover-color, var(--esp-color-link-hover));
        text-decoration: underline;
      }

      ::slotted(a:focus-visible) {
        border-radius: var(--esp-size-border-radius);
        outline: var(--esp-footer-focus-outline, 2px solid var(--esp-color-link));
        outline-offset: 3px;
      }
    `],d([u({type:String})],i.prototype,"heading",void 0),i=d([g("esp-footer-link-group")],i);export{i as EspalierFooterLinkGroup};
