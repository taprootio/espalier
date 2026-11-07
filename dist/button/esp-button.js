var o=function(h,t,s,i){var a=arguments.length,n=a<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,s):i,d;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(h,t,s,i);else for(var c=h.length-1;c>=0;c--)(d=h[c])&&(n=(a<3?d(n):a>3?d(t,s,n):d(t,s))||n);return a>3&&n&&Object.defineProperty(t,s,n),n};import{css as g,html as p,nothing as l}from"lit";import{customElement as f,eventOptions as m,property as r,state as v}from"lit/decorators.js";import{classMap as u}from"lit/directives/class-map.js";import{EspalierElementBase as b}from"../shared/esp-element-base.js";import{ESP_EVENTS as y}from"../shared/events.js";import{ref as w}from"lit/directives/ref.js";import{getIconHrefForHost as T}from"../shared/intent-values.js";import{SlottedIconController as k}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as x}from"../shared/svgs/render-sprite-icon.js";import{DEFAULT_NEW_TAB_LABEL as S,newTabSuffix as $,renderNewTabCue as E}from"../shared/new-tab-cue.js";import{srOnly as C}from"../shared/style-fragments.js";import{BUTTON_INTERACTION_LIGHTNESS_FACTOR as N}from"./action-state-lightness.js";const z=p`<svg
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
</svg>`;let e=class extends b{constructor(){super(...arguments),this.iconSlot=new k(this),this.innerTabindex=null,this.neutralizingTabindex=!1,this.buttonType="button",this.collapsed=!1,this.disabled=!1,this.href="",this.iconOnly=!1,this.incognito=!1,this.icon="",this.iconPosition="right",this.label="",this.loading=!1,this.target="",this.rel="",this.newTabLabel=S,this.formNoValidate=!1,this.buildIcon=t=>this.loading?p` <span>${z}</span> `:p`
      <span>
        <slot ${w(this.iconSlot.slotRef)} @slotchange=${this.iconSlot.handleSlotChange}></slot>
        ${!this.iconSlot.hasSlottedIcon(":scope > *")&&t?x(t):l}
      </span>
    `}static get observedAttributes(){return[...super.observedAttributes,"tabindex","aria-pressed"]}attributeChangedCallback(t,s,i){if(super.attributeChangedCallback(t,s,i),t==="aria-pressed"){this.requestUpdate();return}if(t!=="tabindex"||this.neutralizingTabindex)return;const a=i===null?null:Number(i),n=a===null||Number.isNaN(a)?null:a;n!==null&&n>=0?(this.innerTabindex=n,this.writeHostTabindex(null)):n===null&&i!==null?(this.innerTabindex=null,this.writeHostTabindex(null)):this.innerTabindex=n}writeHostTabindex(t){this.getAttribute("tabindex")!==t&&(this.neutralizingTabindex=!0,t===null?this.removeAttribute("tabindex"):this.setAttribute("tabindex",t),this.neutralizingTabindex=!1)}removeAttribute(t){super.removeAttribute(t),t==="tabindex"&&!this.neutralizingTabindex&&(this.innerTabindex=null)}focus(t){this.focusShadowElementAfterUpdate("button, a",t)}handleClick(t){if(this.dispatchEvent(new CustomEvent(y.CLICKED,{detail:{},bubbles:!0,composed:!0})),this.buttonType==="submit"){const s=this.closest("form");if(s){const i=document.createElement("button");i.type="submit",i.hidden=!0,this.formNoValidate&&(i.formNoValidate=!0),s.appendChild(i),s.requestSubmit(i),i.remove()}}else this.buttonType==="reset"&&this.closest("form")?.reset()}render(){const t=T(this.icon,this),s=this.loading||this.iconSlot.hasSlottedIcon(":scope > *")||t.length>0,{collapsed:i,iconOnly:a}=this,n=a?this.getAttribute("aria-label")||this.label||l:l,d=this.getAttribute("aria-pressed")||l,c={"esp-field":!0,"icon-only":a,incognito:this.incognito,"is-collapsed":i,"has-icon":s,"icon-left":s&&!a&&this.iconPosition==="left"};return this.href.length?p`
          <div part="wrapper" class=${u(c)}>
            <a
              ?disabled=${this.disabled}
              href=${this.href}
              target=${this.target||l}
              rel=${this.rel||l}
              tabindex=${this.innerTabindex??l}
              aria-label=${n===l?l:`${n}${$(this.target,this.newTabLabel)}`}
            >
              <span>${this.label??""}</span>
              ${this.buildIcon(t)}
              ${a?l:E(this.target,this.newTabLabel)}
            </a>
          </div>
        `:p`
          <div part="wrapper" class=${u(c)}>
            <button
              ?disabled=${this.disabled||this.loading}
              @click=${this.handleClick}
              type=${this.buttonType}
              tabindex=${this.innerTabindex??l}
              aria-label=${n}
              aria-pressed=${d}
            >
              <span>${this.label??""}</span>
              ${this.buildIcon(t)}
            </button>
          </div>
        `}};e.styles=[...b.styles,C,g`
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

          
          &:where(:not(.icon-left)) {
            button,
            a {
              > span:nth-child(1) {
                padding-inline-end: 0;
              }
            }
          }

          &.icon-left {
            button,
            a {
              > span:nth-child(1) {
                padding-inline-start: 0;
              }
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
            from var(--esp-color-action-background) calc(l * ${N})
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
    `],o([v()],e.prototype,"innerTabindex",void 0),o([r({attribute:"button-type",type:String})],e.prototype,"buttonType",void 0),o([r({type:Boolean})],e.prototype,"collapsed",void 0),o([r({type:Boolean,reflect:!0})],e.prototype,"disabled",void 0),o([r({type:String})],e.prototype,"href",void 0),o([r({attribute:"icon-only",type:Boolean})],e.prototype,"iconOnly",void 0),o([r({type:Boolean,reflect:!0})],e.prototype,"incognito",void 0),o([r({type:String})],e.prototype,"icon",void 0),o([r({attribute:"icon-position",type:String})],e.prototype,"iconPosition",void 0),o([r({type:String})],e.prototype,"label",void 0),o([r({type:Boolean,reflect:!0})],e.prototype,"loading",void 0),o([r({type:String})],e.prototype,"target",void 0),o([r({type:String})],e.prototype,"rel",void 0),o([r({type:String,attribute:"new-tab-label"})],e.prototype,"newTabLabel",void 0),o([r({attribute:"formnovalidate",type:Boolean})],e.prototype,"formNoValidate",void 0),o([m({capture:!1,passive:!0})],e.prototype,"handleClick",null),e=o([f("esp-button")],e);export{e as EspalierButton};
