var n=function(h,t,i,e){var s=arguments.length,r=s<3?t:e===null?e=Object.getOwnPropertyDescriptor(t,i):e,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(h,t,i,e);else for(var d=h.length-1;d>=0;d--)(c=h[d])&&(r=(s<3?c(r):s>3?c(t,i,r):c(t,i))||r);return s>3&&r&&Object.defineProperty(t,i,r),r};import{css as f,html as p,nothing as l}from"lit";import{customElement as m,eventOptions as v,property as a,state as y}from"lit/decorators.js";import{classMap as u}from"lit/directives/class-map.js";import{EspalierElementBase as b}from"../shared/esp-element-base.js";import{ref as k}from"lit/directives/ref.js";import{getIconHrefForHost as x}from"../shared/intent-values.js";import{SlottedIconController as T}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as w}from"../shared/svgs/render-sprite-icon.js";import{BUTTON_ICON_INTERACTION_LIGHTNESS_FACTOR as S,BUTTON_ICON_SPLIT_LIGHTNESS_FACTOR as g,BUTTON_INTERACTION_LIGHTNESS_FACTOR as $}from"./action-state-lightness.js";const N=p`<svg
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
</svg>`;let o=class extends b{constructor(){super(...arguments),this.iconSlot=new T(this),this.innerTabindex=null,this.neutralizingTabindex=!1,this.buttonType="button",this.collapsed=!1,this.disabled=!1,this.href="",this.iconOnly=!1,this.incognito=!1,this.icon="",this.label="",this.loading=!1,this.target="",this.rel="",this.formNoValidate=!1,this.buildIcon=t=>this.loading?p` <span>${N}</span> `:p`
      <span>
        <slot ${k(this.iconSlot.slotRef)} @slotchange=${this.iconSlot.handleSlotChange}></slot>
        ${!this.iconSlot.hasSlottedIcon(":scope > *")&&t?w(t):l}
      </span>
    `}static get observedAttributes(){return[...super.observedAttributes,"tabindex","aria-pressed"]}attributeChangedCallback(t,i,e){if(super.attributeChangedCallback(t,i,e),t==="aria-pressed"){this.requestUpdate();return}if(t!=="tabindex"||this.neutralizingTabindex)return;const s=e===null?null:Number(e),r=s===null||Number.isNaN(s)?null:s;r!==null&&r>=0?(this.innerTabindex=r,this.writeHostTabindex(null)):r===null&&e!==null?(this.innerTabindex=null,this.writeHostTabindex(null)):this.innerTabindex=r}writeHostTabindex(t){this.getAttribute("tabindex")!==t&&(this.neutralizingTabindex=!0,t===null?this.removeAttribute("tabindex"):this.setAttribute("tabindex",t),this.neutralizingTabindex=!1)}removeAttribute(t){super.removeAttribute(t),t==="tabindex"&&!this.neutralizingTabindex&&(this.innerTabindex=null)}focus(t){this.focusShadowElementAfterUpdate("button, a",t)}handleClick(t){if(this.dispatchEvent(new CustomEvent("clicked",{detail:{},bubbles:!0,composed:!0})),this.buttonType==="submit"){const i=this.closest("form");if(i){const e=document.createElement("button");e.type="submit",e.hidden=!0,this.formNoValidate&&(e.formNoValidate=!0),i.appendChild(e),i.requestSubmit(e),e.remove()}}else this.buttonType==="reset"&&this.closest("form")?.reset()}render(){const t=x(this.icon,this),i=this.loading||this.iconSlot.hasSlottedIcon(":scope > *")||t.length>0,{collapsed:e,iconOnly:s}=this,r=s?this.getAttribute("aria-label")||this.label||l:l,c=this.getAttribute("aria-pressed")||l,d={"esp-field":!0,"icon-only":s,incognito:this.incognito,"is-collapsed":e,"has-icon":i};return this.href.length?p`
          <div part="wrapper" class=${u(d)}>
            <a
              ?disabled=${this.disabled}
              href=${this.href}
              target=${this.target}
              rel=${this.rel||l}
              tabindex=${this.innerTabindex??l}
              aria-label=${r}
            >
              <span>${this.label??""}</span>
              ${this.buildIcon(t)}
            </a>
          </div>
        `:p`
          <div part="wrapper" class=${u(d)}>
            <button
              ?disabled=${this.disabled||this.loading}
              @click=${this.handleClick}
              type=${this.buttonType}
              tabindex=${this.innerTabindex??l}
              aria-label=${r}
              aria-pressed=${c}
            >
              <span>${this.label??""}</span>
              ${this.buildIcon(t)}
            </button>
          </div>
        `}};o.styles=[...b.styles,f`
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
            background-color: oklch(
              from var(--esp-color-action-background)
                calc(l * ${g}) c h
            );
            display: none;
            place-content: center;
            border-left: 1px dotted var(--esp-color-border);
            border-bottom-right-radius: max(0px, calc(var(--_esp-button-radius) - 0.1rem));
            border-top-right-radius: max(0px, calc(var(--_esp-button-radius) - 0.1rem));
            padding: var(--esp-button-padding, var(--esp-size-padding));

            .generated-icon,
            ::slotted(svg),
            > svg {
              height: calc(1 * var(--esp-size-font));
              width: calc(1 * var(--esp-size-font));
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
              background-color: var(--esp-color-action-background);
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
            from var(--esp-color-action-background) calc(l * ${$})
              c h
          );

          button,
          a {
            > span:nth-child(2) {
              background-color: oklch(
                from var(--esp-color-action-background)
                  calc(l * ${S}) c h
              );
              border-color: oklch(from var(--esp-color-border) calc(l * 1.2) c h);
            }
          }
        }

        &.incognito {
          grid-template-columns: min-content auto;
          background-color: transparent;
          border-color: transparent;
          color: var(--esp-color-text);
          block-size: 100%;

          button,
          a {
            > span:nth-child(1) {
              grid-column: 2;
              justify-content: left;
              padding: var(--esp-button-incognito-padding, var(--esp-size-tiny)) 0;
              padding-right: calc(2 * var(--esp-button-incognito-padding, var(--esp-size-tiny)));
            }

            > span:nth-child(2) {
              grid-row: 1;
              grid-column: 1;
              background-color: transparent;
              border-color: transparent;
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

          button,
          a {
            > span:nth-child(2) {
              background-color: oklch(
                from var(--esp-color-action-background)
                  calc(l * ${g}) c h
              );
              border-color: var(--esp-color-border);
            }
          }
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
    `],n([y()],o.prototype,"innerTabindex",void 0),n([a({attribute:"button-type",type:String})],o.prototype,"buttonType",void 0),n([a({type:Boolean})],o.prototype,"collapsed",void 0),n([a({type:Boolean,reflect:!0})],o.prototype,"disabled",void 0),n([a({type:String})],o.prototype,"href",void 0),n([a({attribute:"icon-only",type:Boolean})],o.prototype,"iconOnly",void 0),n([a({type:Boolean,reflect:!0})],o.prototype,"incognito",void 0),n([a({type:String})],o.prototype,"icon",void 0),n([a({type:String})],o.prototype,"label",void 0),n([a({type:Boolean,reflect:!0})],o.prototype,"loading",void 0),n([a({type:String})],o.prototype,"target",void 0),n([a({type:String})],o.prototype,"rel",void 0),n([a({attribute:"formnovalidate",type:Boolean})],o.prototype,"formNoValidate",void 0),n([v({capture:!1,passive:!0})],o.prototype,"handleClick",null),o=n([m("esp-button")],o);export{o as EspalierButton};
