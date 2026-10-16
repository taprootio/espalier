var p=function(r,e,s,i){var a=arguments.length,o=a<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,s):i,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(r,e,s,i);else for(var n=r.length-1;n>=0;n--)(l=r[n])&&(o=(a<3?l(o):a>3?l(e,s,o):l(e,s))||o);return a>3&&o&&Object.defineProperty(e,s,o),o};import{paintedSurface as c}from"../shared/surface-layer.js";import{css as v,html as b}from"lit";import{customElement as f,property as h}from"lit/decorators.js";import{classMap as u}from"lit/directives/class-map.js";import{EspalierElementBase as d}from"../shared/esp-element-base.js";let t=class extends d{constructor(){super(...arguments),this.fullScreen=!1}render(){const{fullScreen:e}=this;return b`
      <div class=${u({"esp-box":!0,"full-screen":e})}>
        <div part="box">
          <slot></slot>
        </div>
      </div>
    `}};t.styles=[...d.styles,c(1),v`
      :host {
        display: block;
      }

      .esp-box {
        background-color: var(--esp-color-box-background, var(--_esp-surface-background));
        border-radius: var(--esp-size-border-radius);
        box-shadow: var(--esp-box-shadow, var(--esp-shadow-1, 1px 1px 4px var(--esp-color-shadow)));
        overflow: visible;
        position: relative;
        height: 100%;

        &:before {
          content: " ";
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          opacity: var(--esp-box-background-opacity, 1);
          background: var(--esp-box-background, initial);
          z-index: 0;
          border-radius: var(--esp-size-border-radius);
        }

        > div {
          position: inherit;
          z-index: 1;
          padding: var(--esp-size-box-padding, var(--esp-size-padding));
          display: block;
          width: 100%;
          height: 100%;
          overflow-y: visible;
        }

        &.full-screen {
          width: calc(
            100vw - var(--esp-dialog-inset-inline-start, 0px) - var(
                --esp-dialog-inset-inline-end,
                0px
              )
          );
          height: calc(
            100vh - var(--esp-dialog-inset-block-start, 0px) - var(
                --esp-dialog-inset-block-end,
                0px
              )
          );
          height: calc(
            100dvh - var(--esp-dialog-inset-block-start, 0px) - var(
                --esp-dialog-inset-block-end,
                0px
              )
          );
          position: fixed;
          inset-block-start: var(--esp-dialog-inset-block-start, 0px);
          inset-inline-start: var(--esp-dialog-inset-inline-start, 0px);
          z-index: 10;

          > div {
            position: relative;
            overflow-y: auto;
            
            padding-bottom: max(
              var(--esp-size-box-padding, var(--esp-size-padding)),
              env(safe-area-inset-bottom)
            );
          }
        }
      }
    `],p([h({attribute:"full-screen",type:Boolean})],t.prototype,"fullScreen",void 0),t=p([f("esp-box")],t);export{t as EspalierBox};
