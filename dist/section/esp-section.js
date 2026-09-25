var p=function(r,t,o,n){var s=arguments.length,e=s<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(r,t,o,n);else for(var l=r.length-1;l>=0;l--)(a=r[l])&&(e=(s<3?a(e):s>3?a(t,o,e):a(t,o))||e);return s>3&&e&&Object.defineProperty(t,o,e),e};import{css as d,html as v,nothing as m}from"lit";import{customElement as u,property as h}from"lit/decorators.js";import{EspalierElementBase as c}from"../shared/esp-element-base.js";import{renderVisualOverlay as y,visualOverlayStyles as f}from"../shared/visual-overlay.js";let i=class extends c{constructor(){super(...arguments),this.decoration=!1}render(){return v`
      <div class="esp-section" part="section">
        ${this.decoration?y({className:"decoration"}):m}
        <div class="esp-section-well" part="well">
          <slot></slot>
        </div>
      </div>
    `}};i.styles=[...c.styles,d`
      :host {
        display: block;
      }

      .esp-section {
        background: var(--esp-section-background, var(--esp-color-background));
        isolation: isolate;
        padding-block: var(--esp-section-padding-block, var(--esp-size-section));
        padding-inline: var(--esp-section-padding-inline, var(--esp-size-medium));
        position: relative;
      }

      .decoration {
        --_esp-overlay-z-index: 0;
        --_esp-overlay-texture: none;
        --_esp-overlay-texture-color: var(
          --esp-section-decoration-color,
          var(--esp-color-headings)
        );
        
        --_esp-overlay-texture-mask:
          var(--esp-section-decoration-image, none), linear-gradient(transparent, transparent);
        --_esp-overlay-texture-mask-position: var(--esp-section-decoration-position, center);
        --_esp-overlay-texture-mask-repeat: no-repeat;
        --_esp-overlay-texture-mask-size: var(--esp-section-decoration-size, contain);
        --_esp-overlay-texture-opacity: var(--esp-section-decoration-opacity, 1);
      }

      .esp-section-well {
        max-inline-size: var(--esp-section-max-width, var(--esp-page-well-max-width, 72rem));
        margin-inline: auto;
        position: relative;
        z-index: 1;
      }
    `,f],p([h({type:Boolean,reflect:!0})],i.prototype,"decoration",void 0),i=p([u("esp-section")],i);export{i as EspalierSection};
