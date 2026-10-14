var c=function(e,t,o,n){var s=arguments.length,r=s<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(e,t,o,n);else for(var h=e.length-1;h>=0;h--)(l=e[h])&&(r=(s<3?l(r):s>3?l(t,o,r):l(t,o))||r);return s>3&&r&&Object.defineProperty(t,o,r),r};import{LitElement as u,nothing as g,css as f,html as a}from"lit";import{customElement as v,property as p}from"lit/decorators.js";import{ref as m}from"lit/directives/ref.js";import{getIconHrefForHost as y}from"../shared/intent-values.js";import{SlottedIconController as x}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as b}from"../shared/svgs/render-sprite-icon.js";import{DocumentSpriteController as k}from"../shared/document-sprite.js";const S=["text","icon","styles"],d=new WeakMap;function z(e,t){d.set(e,t)}function P(e){return{text:e.text||e.getAttribute("text")||e.textContent?.trim()||"",icon:e.icon||e.getAttribute("icon")||"",styles:e.styles}}function E(e,t){return e.text===t.text&&(e.icon??"")===(t.icon??"")&&e.styles===t.styles}function H(e){return e.value||e.getAttribute("value")||""}let i=class extends u{constructor(){super(),this.internals=this.attachInternals(),this.iconSlot=new x(this),this.text="",this.icon="",this.value="",this.selected=!1,new k(this,{reactToSpriteChanges:!0}),this.internals.role="option"}connectedCallback(){super.connectedCallback(),this.hasAttribute("role")||this.setAttribute("role","option")}updated(t){super.updated(t),S.some(o=>t.has(o))&&d.get(this)?.pickerItemChanged(this),t.has("selected")&&(this.internals.ariaSelected=String(this.selected),this.setAttribute("aria-selected",String(this.selected)))}renderHighlightedText(){const t=this.highlightRanges;if(!t||t.length===0)return this.text;const o=[...t].sort((r,l)=>r[0]-l[0]),n=[];let s=0;for(const[r,l]of o)r>s&&n.push(a`${this.text.slice(s,r)}`),n.push(a`<mark>${this.text.slice(r,l)}</mark>`),s=l;return s<this.text.length&&n.push(a`${this.text.slice(s)}`),n}render(){const t=y(this.icon,this),o=this.iconSlot.hasSlottedIcon(":scope > *");return a`<div>
      <span class="icon">
        <slot ${m(this.iconSlot.slotRef)} @slotchange=${this.iconSlot.handleSlotChange}></slot>
        ${!o&&t?b(t):g}
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
    </div>`}};i.styles=f`
    :host(:hover),
    :host(.highlighted) {
      div {
        --_esp-surface-layer: 3;
        background-color: var(--esp-color-picker-bg-hover, var(--esp-color-layer-3));

        > span.icon {
          --_esp-surface-layer: 4;
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
      --_esp-surface-layer: 2;
      display: grid;
      grid-template-columns: min-content auto min-content;
      background-color: var(--esp-color-picker-bg, var(--esp-color-layer-2));

      .icon {
        --_esp-surface-layer: 3;
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
  `,c([p({type:Object})],i.prototype,"styles",void 0),c([p({type:String})],i.prototype,"text",void 0),c([p({type:String})],i.prototype,"icon",void 0),c([p({type:String})],i.prototype,"value",void 0),c([p({type:Boolean})],i.prototype,"selected",void 0),c([p({attribute:"highlight-ranges",type:Array})],i.prototype,"highlightRanges",void 0),i=c([v("esp-picker-item")],i);export{i as EspalierPickerItem,z as adoptPickerItem,P as pickerItemDisplay,H as pickerItemValue,E as samePickerItemDisplay};
