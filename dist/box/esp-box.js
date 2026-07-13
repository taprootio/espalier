var n=function(s,e,r,i){var a=arguments.length,o=a<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,r):i,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(s,e,r,i);else for(var p=s.length-1;p>=0;p--)(l=s[p])&&(o=(a<3?l(o):a>3?l(e,r,o):l(e,r))||o);return a>3&&o&&Object.defineProperty(e,r,o),o};import{css as c,html as b}from"lit";import{customElement as v,property as h}from"lit/decorators.js";import{classMap as f}from"lit/directives/class-map.js";import{EspalierElementBase as d}from"../shared/esp-element-base.js";let t=class extends d{constructor(){super(...arguments),this.fullScreen=!1}render(){const{fullScreen:e}=this;return b`
      <div class=${f({"esp-box":!0,"full-screen":e})}>
        <div part="box">
          <slot></slot>
        </div>
      </div>
    `}};t.styles=[...d.styles,c`
      :host {
        display: block;
      }

      .esp-box {
        background-color: var(--esp-color-box-background, var(--esp-color-layer-1));
        border-radius: var(--esp-size-border-radius);
        box-shadow: 1px 1px 4px var(--esp-color-shadow);
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
          width: 100vw;
          
          height: 100vh;
          height: 100dvh;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 10;

          > div {
            overflow-y: auto;
            
            padding-bottom: max(
              var(--esp-size-box-padding, var(--esp-size-padding)),
              env(safe-area-inset-bottom)
            );
          }
        }
      }
    `],n([h({attribute:"full-screen",type:Boolean})],t.prototype,"fullScreen",void 0),t=n([v("esp-box")],t);export{t as EspalierBox};
