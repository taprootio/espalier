var d=function(i,e,o,s){var t=arguments.length,r=t<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,o):s,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(i,e,o,s);else for(var a=i.length-1;a>=0;a--)(n=i[a])&&(r=(t<3?n(r):t>3?n(e,o,r):n(e,o))||r);return t>3&&r&&Object.defineProperty(e,o,r),r};import{css as u,html as h}from"lit";import{customElement as b,property as c}from"lit/decorators.js";import{EspalierElementBase as m}from"../shared/esp-element-base.js";import{disabledControl as g}from"../shared/style-fragments.js";let l=class extends m{constructor(){super(...arguments),this.summary="",this.open=!1,this.disabled=!1,this._toggleFromClick=!1}close(){this.open=!1}getScrollParent(){let e=this.assignedSlot?.parentElement??(this.parentNode instanceof ShadowRoot?this.parentNode.host:this.parentElement);for(;e&&e!==document.documentElement;){const s=getComputedStyle(e).overflowY;if((s==="auto"||s==="scroll")&&e.scrollHeight>e.clientHeight)return e;e=e.assignedSlot?.parentElement??(e.parentNode instanceof ShadowRoot?e.parentNode.host:e.parentElement)}return null}handleToggle(e){const o=e.target;if(this.disabled){o.open=this.open;return}if(this._toggleFromClick){this._toggleFromClick=!1;return}this.open=o.open,this.dispatchEvent(new CustomEvent("esp-toggle",{detail:{open:this.open},bubbles:!0,composed:!0}))}handleSummaryClick(e){if(e.preventDefault(),this.disabled)return;const o=e.currentTarget,s=o.getBoundingClientRect().top,t=this.getScrollParent(),r=t?t.scrollTop:window.scrollY;this._toggleFromClick=!0,this.open=!this.open,this.updateComplete.then(()=>{this._toggleFromClick=!1,this.dispatchEvent(new CustomEvent("esp-toggle",{detail:{open:this.open},bubbles:!0,composed:!0}));const a=o.getBoundingClientRect().top-s;if(Math.abs(a)>1)if(t){const p=t.scrollTop;Math.abs(p-r)>1&&(t.scrollTop=r)}else{const p=window.scrollY;Math.abs(p-r)>1&&window.scrollBy(0,a)}})}render(){return h`
      <details ?open=${this.open} @toggle=${this.handleToggle}>
        <summary @click=${this.handleSummaryClick}>
          <span class="indicator"></span>
          <span class="summary-text">${this.summary}</span>
        </summary>
        <div class="content">
          <slot></slot>
        </div>
      </details>
    `}};l.styles=[...m.styles,g(":host([disabled]) summary"),u`
      :host {
        display: block;
        overflow-anchor: none;
        --_esp-details-resolved-summary-hover-background: var(
          --esp-details-color-summary-hover-background,
          oklch(from var(--esp-color-layer-1) calc(l * 0.92) c h)
        );
      }

      :host([scheme="light"]) {
        --_esp-details-resolved-summary-hover-background: var(
          --esp-details-color-summary-hover-background,
          oklch(from var(--esp-color-layer-1) calc(l + (1 - l) * 0.4) c h)
        );
      }

      details {
        background-color: var(--esp-details-color-background, var(--esp-color-layer-1));
        border-radius: var(--esp-size-border-radius);
        box-shadow: 1px 1px 4px var(--esp-color-shadow);
        border: 1px solid var(--esp-details-color-border, var(--esp-color-border));
        overflow: hidden;
      }

      summary {
        display: flex;
        align-items: center;
        gap: var(--esp-size-small);
        padding: var(--esp-details-size-padding, var(--esp-size-padding));
        cursor: pointer;
        user-select: none;
        list-style: none;
        font-family: var(--esp-font-body);
        font-size: var(--esp-size-font);
        font-weight: 600;
        color: var(--esp-color-headings);
        background-color: var(--esp-details-color-summary-background, var(--esp-color-layer-1));
        transition: background-color cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;
      }

      
      summary::-webkit-details-marker {
        display: none;
      }
      summary::marker {
        content: "";
      }

      summary:hover {
        background-color: var(--_esp-details-resolved-summary-hover-background);
      }

      details[open] > summary {
        background-color: var(
          --esp-details-color-summary-background-active,
          var(--esp-color-layer-2)
        );
      }

      .indicator {
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
        border-left: 6px solid var(--esp-details-color-indicator, var(--esp-color-headings));
        transition: transform cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;
        flex-shrink: 0;
      }

      details[open] > summary .indicator {
        transform: rotate(90deg);
      }

      .summary-text {
        flex: 1;
      }

      .content {
        padding: var(--esp-details-size-padding, var(--esp-size-padding));
        font-family: var(--esp-font-body);
        font-size: var(--esp-size-font);
        color: var(--esp-color-text);
        border-top: 1px solid var(--esp-details-color-border, var(--esp-color-border));
      }

      :host([disabled]) summary:hover {
        background-color: var(--esp-details-color-summary-background, var(--esp-color-layer-1));
      }

      
      
      :host([in-group]) details {
        border-radius: 0;
        box-shadow: none;
        border-left: none;
        border-right: none;
        border-top: none;
        border-bottom: 1px solid var(--esp-details-color-border, var(--esp-color-border));
      }

      :host([in-group]:last-of-type) details {
        border-bottom: none;
      }
    `],d([c({type:String})],l.prototype,"summary",void 0),d([c({type:Boolean,reflect:!0})],l.prototype,"open",void 0),d([c({type:Boolean,reflect:!0})],l.prototype,"disabled",void 0),l=d([b("esp-details")],l);export{l as EspalierDetails};
