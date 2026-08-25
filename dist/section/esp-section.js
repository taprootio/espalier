var c=function(i,o,t,n){var a=arguments.length,e=a<3?o:n===null?n=Object.getOwnPropertyDescriptor(o,t):n,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(i,o,t,n);else for(var l=i.length-1;l>=0;l--)(s=i[l])&&(e=(a<3?s(e):a>3?s(o,t,e):s(o,t))||e);return a>3&&e&&Object.defineProperty(o,t,e),e};import{css as d,html as v}from"lit";import{customElement as m}from"lit/decorators.js";import{EspalierElementBase as p}from"../shared/esp-element-base.js";import{renderVisualOverlay as u,visualOverlayStyles as y}from"../shared/visual-overlay.js";let r=class extends p{render(){return v`
      <div class="esp-section" part="section">
        ${u({className:"decoration"})}
        <div class="esp-section-well" part="well">
          <slot></slot>
        </div>
      </div>
    `}};r.styles=[...p.styles,d`
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
    `,y],r=c([m("esp-section")],r);export{r as EspalierSection};
