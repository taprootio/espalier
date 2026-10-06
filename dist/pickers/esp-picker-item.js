var c=function(e,t,r,n){var i=arguments.length,o=i<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,r):n,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(e,t,r,n);else for(var h=e.length-1;h>=0;h--)(l=e[h])&&(o=(i<3?l(o):i>3?l(t,r,o):l(t,r))||o);return i>3&&o&&Object.defineProperty(t,r,o),o};import{LitElement as g,nothing as u,css as v,html as a}from"lit";import{customElement as m,property as p}from"lit/decorators.js";import{ref as f}from"lit/directives/ref.js";import{getIconHrefForHost as y}from"../shared/intent-values.js";import{SlottedIconController as x}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as b}from"../shared/svgs/render-sprite-icon.js";import{DocumentSpriteController as k}from"../shared/document-sprite.js";const S=["text","icon","styles"],d=new WeakMap;function P(e,t){d.set(e,t)}function E(e){return{text:e.text||e.getAttribute("text")||e.textContent?.trim()||"",icon:e.icon||e.getAttribute("icon")||"",styles:e.styles}}function H(e,t){return e.text===t.text&&(e.icon??"")===(t.icon??"")&&e.styles===t.styles}function j(e){return e.value||e.getAttribute("value")||""}let s=class extends g{constructor(){super(),this.internals=this.attachInternals(),this.iconSlot=new x(this),this.text="",this.icon="",this.value="",this.selected=!1,new k(this,{reactToSpriteChanges:!0}),this.internals.role="option"}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","option")}updated(t){super.updated(t),S.some(r=>t.has(r))&&d.get(this)?.pickerItemChanged(this),t.has("selected")&&(this.internals.ariaSelected=String(this.selected),this.setAttribute("aria-selected",String(this.selected)))}renderHighlightedText(){const t=this.highlightRanges;if(!t||t.length===0)return this.text;const r=[...t].sort((o,l)=>o[0]-l[0]),n=[];let i=0;for(const[o,l]of r)o>i&&n.push(a`${this.text.slice(i,o)}`),n.push(a`<mark>${this.text.slice(o,l)}</mark>`),i=l;return i<this.text.length&&n.push(a`${this.text.slice(i)}`),n}render(){const t=y(this.icon,this),r=this.iconSlot.hasSlottedIcon(":scope > *");return a`<div>
      <span class="icon">
        <slot ${f(this.iconSlot.slotRef)} @slotchange=${this.iconSlot.handleSlotChange}></slot>
        ${!r&&t?b(t):u}
      </span>
      <span class="text">${this.renderHighlightedText()}</span>
      ${this.selected?a`<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"
            />
            <path d="M9 12l2 2l4 -4" />
          </svg>`:a``}
    </div>`}};s.styles=v`
    :host(:hover),
    :host(.highlighted) {
      div {
        background-color: var(--esp-color-picker-bg-hover, var(--esp-color-layer-3));

        > span.icon {
          background-color: var(--esp-color-picker-bg-alt-hover, var(--esp-color-layer-4));
        }
      }
    }

    :host(.highlighted) div {
      outline: 2px solid var(--esp-color-primary);
      outline-offset: -2px;
    }

    :host(:first-child) {
      div {
        border-top-left-radius: var(--esp-size-border-radius);
      }
    }

    div {
      display: grid;
      grid-template-columns: min-content auto min-content;
      background-color: var(--esp-color-picker-bg, var(--esp-color-layer-2));

      .icon {
        display: grid;
        grid-template-columns: min-content;
        background-color: var(--esp-color-picker-bg-alt, var(--esp-color-layer-3));

        &:has(slot:has-slotted),
        &:has(.generated-icon) {
          border-right: 2px dotted var(--esp-color-border);
        }
      }

      .text {
        padding: var(--esp-size-padding);

        mark {
          background-color: oklch(from var(--esp-color-primary) l c h / 0.25);
          color: inherit;
          border-radius: 2px;
        }
      }

      svg,
      .generated-icon,
      ::slotted(svg) {
        height: var(--esp-size-medium);
        width: var(--esp-size-medium);
        place-self: center;
        margin: var(--esp-size-tiny);
      }
    }
  `,c([p({type:Object})],s.prototype,"styles",void 0),c([p({type:String})],s.prototype,"text",void 0),c([p({type:String})],s.prototype,"icon",void 0),c([p({type:String})],s.prototype,"value",void 0),c([p({type:Boolean})],s.prototype,"selected",void 0),c([p({attribute:"highlight-ranges",type:Array})],s.prototype,"highlightRanges",void 0),s=c([m("esp-picker-item")],s);export{s as EspalierPickerItem,P as adoptPickerItem,E as pickerItemDisplay,j as pickerItemValue,H as samePickerItemDisplay};
