var n=function(h,t,r,o){var a=arguments.length,i=a<3?t:o===null?o=Object.getOwnPropertyDescriptor(t,r):o,d;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(h,t,r,o);else for(var p=h.length-1;p>=0;p--)(d=h[p])&&(i=(a<3?d(i):a>3?d(t,r,i):d(t,r))||i);return a>3&&i&&Object.defineProperty(t,r,i),i};import{css as f,html as c,nothing as l}from"lit";import{customElement as g,eventOptions as m,property as s,state as v}from"lit/decorators.js";import{classMap as u}from"lit/directives/class-map.js";import{EspalierElementBase as b}from"../shared/esp-element-base.js";import{ESP_EVENTS as y}from"../shared/events.js";import{ref as w}from"lit/directives/ref.js";import{getIconHrefForHost as x}from"../shared/intent-values.js";import{SlottedIconController as k}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as T}from"../shared/svgs/render-sprite-icon.js";import{BUTTON_INTERACTION_LIGHTNESS_FACTOR as S}from"./action-state-lightness.js";const $=c`<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
  class="rotate"
>
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M4.05 11a8 8 0 1 1 .5 4m-.5 5v-5h5" />
</svg>`;let e=class extends b{constructor(){super(...arguments),this.iconSlot=new k(this),this.innerTabindex=null,this.neutralizingTabindex=!1,this.buttonType="button",this.collapsed=!1,this.disabled=!1,this.href="",this.iconOnly=!1,this.incognito=!1,this.icon="",this.iconPosition="right",this.label="",this.loading=!1,this.target="",this.rel="",this.formNoValidate=!1,this.buildIcon=t=>this.loading?c` <span>${$}</span> `:c`
      <span>
        <slot ${w(this.iconSlot.slotRef)} @slotchange=${this.iconSlot.handleSlotChange}></slot>
        ${!this.iconSlot.hasSlottedIcon(":scope > *")&&t?T(t):l}
      </span>
    `}static get observedAttributes(){return[...super.observedAttributes,"tabindex","aria-pressed"]}attributeChangedCallback(t,r,o){if(super.attributeChangedCallback(t,r,o),t==="aria-pressed"){this.requestUpdate();return}if(t!=="tabindex"||this.neutralizingTabindex)return;const a=o===null?null:Number(o),i=a===null||Number.isNaN(a)?null:a;i!==null&&i>=0?(this.innerTabindex=i,this.writeHostTabindex(null)):i===null&&o!==null?(this.innerTabindex=null,this.writeHostTabindex(null)):this.innerTabindex=i}writeHostTabindex(t){this.getAttribute("tabindex")!==t&&(this.neutralizingTabindex=!0,t===null?this.removeAttribute("tabindex"):this.setAttribute("tabindex",t),this.neutralizingTabindex=!1)}removeAttribute(t){super.removeAttribute(t),t==="tabindex"&&!this.neutralizingTabindex&&(this.innerTabindex=null)}focus(t){this.focusShadowElementAfterUpdate("button, a",t)}handleClick(t){if(this.dispatchEvent(new CustomEvent(y.CLICKED,{detail:{},bubbles:!0,composed:!0})),this.buttonType==="submit"){const r=this.closest("form");if(r){const o=document.createElement("button");o.type="submit",o.hidden=!0,this.formNoValidate&&(o.formNoValidate=!0),r.appendChild(o),r.requestSubmit(o),o.remove()}}else this.buttonType==="reset"&&this.closest("form")?.reset()}render(){const t=x(this.icon,this),r=this.loading||this.iconSlot.hasSlottedIcon(":scope > *")||t.length>0,{collapsed:o,iconOnly:a}=this,i=a?this.getAttribute("aria-label")||this.label||l:l,d=this.getAttribute("aria-pressed")||l,p={"esp-field":!0,"icon-only":a,incognito:this.incognito,"is-collapsed":o,"has-icon":r,"icon-left":r&&!a&&this.iconPosition==="left"};return this.href.length?c`
          <div part="wrapper" class=${u(p)}>
            <a
              ?disabled=${this.disabled}
              href=${this.href}
              target=${this.target}
              rel=${this.rel||l}
              tabindex=${this.innerTabindex??l}
              aria-label=${i}
            >
              <span>${this.label??""}</span>
              ${this.buildIcon(t)}
            </a>
          </div>
        `:c`
          <div part="wrapper" class=${u(p)}>
            <button
              ?disabled=${this.disabled||this.loading}
              @click=${this.handleClick}
              type=${this.buttonType}
              tabindex=${this.innerTabindex??l}
              aria-label=${i}
              aria-pressed=${d}
            >
              <span>${this.label??""}</span>
              ${this.buildIcon(t)}
            </button>
          </div>
        `}};e.styles=[...b.styles,f`
      :host {
        --_esp-button-radius: var(--esp-size-border-radius);
      }

      :host([collapsed]) {
        width: min-content;
      }

      :host([scheme="dark"]) {
        --esp-color-shadow: oklch(from var(--esp-color-primary) var(--esp-l-ink) c h);
      }

      

      .esp-field {
        border-radius: var(--_esp-button-radius);

        button,
        a {
          width: 100%;
          block-size: 100%;
          white-space: nowrap;
          display: grid;
          grid-template-columns: auto min-content;
          padding: 0;
          cursor: pointer;

          > span:nth-child(1) {
            padding: var(--esp-button-padding, var(--esp-size-padding));
            line-height: 1.3;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          > span:nth-child(2) {
            display: none;
            place-content: center;
            padding: var(--esp-button-padding, var(--esp-size-padding));

            .generated-icon,
            ::slotted(svg),
            > svg {
              height: calc(1 * var(--esp-size-font));
              width: calc(1 * var(--esp-size-font));
            }
          }
        }

        &.icon-left {
          button,
          a {
            grid-template-columns: min-content auto;

            > span:nth-child(2) {
              order: -1;
            }
          }
        }

        &.has-icon {
          button,
          a {
            > span:nth-child(2) {
              display: grid;
            }
          }
        }

        &.is-collapsed,
        &.icon-only {
          width: min-content;
        }

        &.icon-only {
          button,
          a {
            > span:nth-child(1) {
              display: none;
            }

            > span:nth-child(2) {
              border: none;
              border-radius: var(--_esp-button-radius);
            }
          }
        }

        background-color: var(--esp-color-action-background);
        color: var(--esp-color-action-text);

        &:hover,
        &:focus-within {
          background-color: oklch(
            from var(--esp-color-action-background) calc(l * ${S})
              c h
          );
        }

        &.incognito {
          background-color: transparent;
          border-color: transparent;
          color: var(--esp-color-text);
          block-size: 100%;

          button,
          a {
            > span:nth-child(1) {
              justify-content: start;
              padding: var(--esp-button-incognito-padding, var(--esp-size-tiny)) 0;
              padding-inline-end: calc(
                2 * var(--esp-button-incognito-padding, var(--esp-size-tiny))
              );
            }

            > span:nth-child(2) {
              background-color: transparent;
            }
          }

          &.icon-left {
            button,
            a {
              > span:nth-child(1) {
                padding-inline-start: calc(
                  2 * var(--esp-button-incognito-padding, var(--esp-size-tiny))
                );
                padding-inline-end: 0;
              }
            }
          }

          &:hover {
            background-color: var(--esp-color-background);
          }

          &:focus-within {
            box-shadow: 0 0 4px var(--esp-color-shadow);
            background-color: var(--esp-color-background);
          }
        }

        &:active {
          box-shadow: none;
        }

        &:has(button:disabled):hover,
        &:has(button:disabled):focus-within {
          background-color: var(--esp-color-action-background);
        }

        svg.rotate {
          transform-origin: 50% 50%;
          transition: all 0.15s ease 0s;
          animation: rotate-360 3s linear infinite;
          animation-fill-mode: none;
          animation-fill-mode: both;
        }
      }

      @keyframes rotate-360 {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `],n([v()],e.prototype,"innerTabindex",void 0),n([s({attribute:"button-type",type:String})],e.prototype,"buttonType",void 0),n([s({type:Boolean})],e.prototype,"collapsed",void 0),n([s({type:Boolean,reflect:!0})],e.prototype,"disabled",void 0),n([s({type:String})],e.prototype,"href",void 0),n([s({attribute:"icon-only",type:Boolean})],e.prototype,"iconOnly",void 0),n([s({type:Boolean,reflect:!0})],e.prototype,"incognito",void 0),n([s({type:String})],e.prototype,"icon",void 0),n([s({attribute:"icon-position",type:String})],e.prototype,"iconPosition",void 0),n([s({type:String})],e.prototype,"label",void 0),n([s({type:Boolean,reflect:!0})],e.prototype,"loading",void 0),n([s({type:String})],e.prototype,"target",void 0),n([s({type:String})],e.prototype,"rel",void 0),n([s({attribute:"formnovalidate",type:Boolean})],e.prototype,"formNoValidate",void 0),n([m({capture:!1,passive:!0})],e.prototype,"handleClick",null),e=n([g("esp-button")],e);export{e as EspalierButton};
