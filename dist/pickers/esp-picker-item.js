var l=function(p,t,i,s){var o=arguments.length,e=o<3?t:s===null?s=Object.getOwnPropertyDescriptor(t,i):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(p,t,i,s);else for(var h=p.length-1;h>=0;h--)(n=p[h])&&(e=(o<3?n(e):o>3?n(t,i,e):n(t,i))||e);return o>3&&e&&Object.defineProperty(t,i,e),e};import{LitElement as d,nothing as g,css as v,html as a}from"lit";import{customElement as m,property as c}from"lit/decorators.js";import{ref as u}from"lit/directives/ref.js";import{getIconHrefForHost as f}from"../shared/intent-values.js";import{SlottedIconController as y}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as b}from"../shared/svgs/render-sprite-icon.js";let r=class extends d{constructor(){super(),this.internals=this.attachInternals(),this.iconSlot=new y(this),this.text="",this.icon="",this.value="",this.selected=!1,this.internals.role="option"}updated(t){super.updated(t),t.has("selected")&&(this.internals.ariaSelected=String(this.selected))}renderHighlightedText(){const t=this.highlightRanges;if(!t||t.length===0)return this.text;const i=[...t].sort((e,n)=>e[0]-n[0]),s=[];let o=0;for(const[e,n]of i)e>o&&s.push(a`${this.text.slice(o,e)}`),s.push(a`<mark>${this.text.slice(e,n)}</mark>`),o=n;return o<this.text.length&&s.push(a`${this.text.slice(o)}`),s}render(){const t=f(this.icon,this),i=this.iconSlot.hasSlottedIcon(":scope > *");return a`<div>
      <span class="icon">
        <slot ${u(this.iconSlot.slotRef)} @slotchange=${this.iconSlot.handleSlotChange}></slot>
        ${!i&&t?b(t):g}
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
    </div>`}};r.styles=v`
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
  `,l([c({type:Object})],r.prototype,"styles",void 0),l([c({type:String})],r.prototype,"text",void 0),l([c({type:String})],r.prototype,"icon",void 0),l([c({type:String})],r.prototype,"value",void 0),l([c({type:Boolean})],r.prototype,"selected",void 0),l([c({attribute:"highlight-ranges",type:Array})],r.prototype,"highlightRanges",void 0),r=l([m("esp-picker-item")],r);export{r as EspalierPickerItem};
