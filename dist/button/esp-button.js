var i=function(h,t,r,o){var l=arguments.length,n=l<3?t:o===null?o=Object.getOwnPropertyDescriptor(t,r):o,d;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(h,t,r,o);else for(var p=h.length-1;p>=0;p--)(d=h[p])&&(n=(l<3?d(n):l>3?d(t,r,n):d(t,r))||n);return l>3&&n&&Object.defineProperty(t,r,n),n};import{css as g,html as c,nothing as s}from"lit";import{customElement as v,eventOptions as y,property as a,state as w}from"lit/decorators.js";import{classMap as b}from"lit/directives/class-map.js";import{EspalierElementBase as f}from"../shared/esp-element-base.js";import{ESP_EVENTS as x}from"../shared/events.js";import{ref as T}from"lit/directives/ref.js";import{getIconHrefForHost as k}from"../shared/intent-values.js";import{SlottedIconController as $}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as S}from"../shared/svgs/render-sprite-icon.js";import{DEFAULT_NEW_TAB_LABEL as E,newTabSuffix as C,renderNewTabCue as z}from"../shared/new-tab-cue.js";import{srOnly as N}from"../shared/style-fragments.js";import{BUTTON_INTERACTION_LIGHTNESS_FACTOR as B}from"./action-state-lightness.js";const m=g`var(--esp-button-padding, var(--_esp-button-default-padding, var(--esp-size-padding)))`,_=c`<svg
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
</svg>`;let e=class extends f{constructor(){super(...arguments),this.iconSlot=new $(this),this.innerTabindex=null,this.neutralizingTabindex=!1,this.buttonType="button",this.collapsed=!1,this.disabled=!1,this.href="",this.current=!1,this.iconOnly=!1,this.incognito=!1,this.icon="",this.iconPosition="right",this.label="",this.loading=!1,this.target="",this.rel="",this.newTabLabel=E,this.formNoValidate=!1,this.buildIcon=(t,r=!1)=>this.loading&&!r?c` <span>${_}</span> `:c`
      <span>
        <slot ${T(this.iconSlot.slotRef)} @slotchange=${this.iconSlot.handleSlotChange}></slot>
        ${!this.iconSlot.hasSlottedIcon(":scope > :not(slot)")&&t?S(t):s}
      </span>
    `}static get observedAttributes(){return[...super.observedAttributes,"tabindex","aria-pressed","aria-label"]}attributeChangedCallback(t,r,o){if(super.attributeChangedCallback(t,r,o),t==="aria-pressed"||t==="aria-label"){this.requestUpdate();return}if(t!=="tabindex"||this.neutralizingTabindex)return;const l=o===null?null:Number(o),n=l===null||Number.isNaN(l)?null:l;n!==null&&n>=0?(this.innerTabindex=n,this.writeHostTabindex(null)):n===null&&o!==null?(this.innerTabindex=null,this.writeHostTabindex(null)):this.innerTabindex=n}writeHostTabindex(t){this.getAttribute("tabindex")!==t&&(this.neutralizingTabindex=!0,t===null?this.removeAttribute("tabindex"):this.setAttribute("tabindex",t),this.neutralizingTabindex=!1)}removeAttribute(t){super.removeAttribute(t),t==="tabindex"&&!this.neutralizingTabindex&&(this.innerTabindex=null)}focus(t){this.focusShadowElementAfterUpdate("button, a",t)}handleClick(t){if(this.dispatchEvent(new CustomEvent(x.CLICKED,{detail:{},bubbles:!0,composed:!0})),this.buttonType==="submit"){const r=this.closest("form");if(r){const o=document.createElement("button");o.type="submit",o.hidden=!0,this.formNoValidate&&(o.formNoValidate=!0),r.appendChild(o),r.requestSubmit(o),o.remove()}}else this.buttonType==="reset"&&this.closest("form")?.reset()}render(){const t=k(this.icon,this),r=this.current&&this.href.length>0,o=this.loading&&!r||this.iconSlot.hasSlottedIcon(":scope > :not(slot)")||t.length>0,{collapsed:l,iconOnly:n}=this,d=this.getAttribute("aria-label")||(n?this.label:"")||s,p=this.getAttribute("aria-pressed")||s,u={"esp-field":!0,"icon-only":n,incognito:this.incognito,"is-collapsed":l,"has-icon":o,"icon-left":o&&!n&&this.iconPosition==="left"};return r?c`<div part="wrapper" class=${b(u)}>
        <span part="control" class="current-page" aria-current="page" aria-label=${n?d:s}>
          <span part="label">${this.label??""}</span>${this.buildIcon(t,!0)}
        </span>
      </div>`:this.href.length?c`
          <div part="wrapper" class=${b(u)}>
            <a
              part="control"
              ?disabled=${this.disabled}
              href=${this.href}
              target=${this.target||s}
              rel=${this.rel||s}
              tabindex=${this.innerTabindex??s}
              aria-label=${d===s?s:`${d}${C(this.target,this.newTabLabel)}`}
            >
              <span part="label">${this.label??""}</span>
              ${this.buildIcon(t)}
              ${n?s:z(this.target,this.newTabLabel)}
            </a>
          </div>
        `:c`
          <div part="wrapper" class=${b(u)}>
            <button
              part="control"
              ?disabled=${this.disabled||this.loading}
              @click=${this.handleClick}
              type=${this.buttonType}
              tabindex=${this.innerTabindex??s}
              aria-label=${d}
              aria-pressed=${p}
            >
              <span part="label">${this.label??""}</span>
              ${this.buildIcon(t)}
            </button>
          </div>
        `}};e.styles=[...f.styles,N,g`
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
        a,
        .current-page {
          width: 100%;
          block-size: 100%;
          white-space: nowrap;
          display: grid;
          grid-template-columns: auto min-content;
          padding: 0;
          cursor: pointer;

          > span:nth-child(1) {
            padding: ${m};
            line-height: 1.3;
            font-weight: bold;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          > span:nth-child(2) {
            display: none;
            place-content: center;
            padding: ${m};

            .generated-icon,
            ::slotted(svg),
            ::slotted(img),
            > svg {
              height: calc(1 * var(--esp-size-font));
              width: calc(1 * var(--esp-size-font));
              object-fit: contain;
            }
          }
        }

        .current-page {
          box-sizing: border-box;
          border: none;
          background: transparent;
          color: inherit;
          font-family: inherit;
          font-size: inherit;
          text-decoration: none;
          cursor: default;
        }

        &.icon-left {
          button,
          a,
          .current-page {
            grid-template-columns: min-content auto;

            > span:nth-child(2) {
              order: -1;
            }
          }
        }

        &.has-icon {
          button,
          a,
          .current-page {
            > span:nth-child(2) {
              display: grid;
            }
          }

          
          &:where(:not(.icon-left)) {
            button,
            a,
            .current-page {
              > span:nth-child(1) {
                padding-inline-end: 0;
              }
            }
          }

          &.icon-left {
            button,
            a,
            .current-page {
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
          a,
          .current-page {
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
            from var(--esp-color-action-background) calc(l * ${B})
              c h
          );
        }

        &.incognito {
          background-color: transparent;
          border-color: transparent;
          color: var(--esp-color-text);
          block-size: 100%;

          button,
          a,
          .current-page {
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
            a,
            .current-page {
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
    `],i([w()],e.prototype,"innerTabindex",void 0),i([a({attribute:"button-type",type:String})],e.prototype,"buttonType",void 0),i([a({type:Boolean})],e.prototype,"collapsed",void 0),i([a({type:Boolean,reflect:!0})],e.prototype,"disabled",void 0),i([a({type:String})],e.prototype,"href",void 0),i([a({type:Boolean,reflect:!0})],e.prototype,"current",void 0),i([a({attribute:"icon-only",type:Boolean})],e.prototype,"iconOnly",void 0),i([a({type:Boolean,reflect:!0})],e.prototype,"incognito",void 0),i([a({type:String})],e.prototype,"icon",void 0),i([a({attribute:"icon-position",type:String})],e.prototype,"iconPosition",void 0),i([a({type:String})],e.prototype,"label",void 0),i([a({type:Boolean,reflect:!0})],e.prototype,"loading",void 0),i([a({type:String})],e.prototype,"target",void 0),i([a({type:String})],e.prototype,"rel",void 0),i([a({type:String,attribute:"new-tab-label"})],e.prototype,"newTabLabel",void 0),i([a({attribute:"formnovalidate",type:Boolean})],e.prototype,"formNoValidate",void 0),i([y({capture:!1,passive:!0})],e.prototype,"handleClick",null),e=i([v("esp-button")],e);export{e as EspalierButton};
