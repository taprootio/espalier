var n=function(t,e,r,i){var l=arguments.length,o=l<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,r):i,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(t,e,r,i);else for(var a=t.length-1;a>=0;a--)(p=t[a])&&(o=(l<3?p(o):l>3?p(e,r,o):p(e,r))||o);return l>3&&o&&Object.defineProperty(e,r,o),o};import{css as d,html as b}from"lit";import{customElement as f,property as u}from"lit/decorators.js";import{classMap as v}from"lit/directives/class-map.js";import{EspalierElementBase as c}from"../shared/esp-element-base.js";let s=class extends c{constructor(){super(...arguments),this.fullScreen=!1}render(){const{fullScreen:e}=this;return b`
      <div class=${v({"esp-box":!0,"full-screen":e})}>
        <div part="box">
          <slot></slot>
        </div>
      </div>
    `}};s.styles=[...c.styles,d`
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
          position: fixed;
          top: 0;
          left: 0;
          z-index: 10;

          > div {
            overflow-y: auto;
          }
        }
      }
    `],n([u({attribute:"full-screen",type:Boolean})],s.prototype,"fullScreen",void 0),s=n([f("esp-box")],s);export{s as EspalierBox};
