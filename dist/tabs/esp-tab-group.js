var b=function(i,t,a,e){var s=arguments.length,o=s<3?t:e===null?e=Object.getOwnPropertyDescriptor(t,a):e,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(i,t,a,e);else for(var l=i.length-1;l>=0;l--)(r=i[l])&&(o=(s<3?r(o):s>3?r(t,a,o):r(t,a))||o);return s>3&&o&&Object.defineProperty(t,a,o),o};import{css as u,html as d,nothing as v}from"lit";import{customElement as f,property as g,state as m}from"lit/decorators.js";import{createRef as y,ref as w}from"lit/directives/ref.js";import{EspalierElementBase as c}from"../shared/esp-element-base.js";import{EspalierTab as p}from"./esp-tab.js";import{disabledControl as k}from"../shared/style-fragments.js";let n=class extends c{constructor(){super(...arguments),this.panelsSlot=y(),this.disabled=!1,this.tabData=[]}getTabs(){const t=this.panelsSlot.value?Array.from(this.panelsSlot.value.assignedElements()).filter(a=>a instanceof p):[];return t.length>0?t:Array.from(this.children).filter(a=>a instanceof p)}syncTabData(){const t=this.getTabs();if(t.length===0){this.tabData=[];return}const a=t.find(e=>e.active&&!e.disabled);if(a)for(const e of t)e!==a&&(e.active=!1);else{const e=t.find(s=>!s.disabled);e?e.active=!0:t[0].active=!0}this.tabData=t.map((e,s)=>{const o=`esp-tab-btn-${this.correlationId}-${s}`,r=`esp-tab-panel-${this.correlationId}-${s}`;return e.panelId=r,e.ariaLabelledBy=o,{label:e.label,active:e.active,disabled:this.disabled||e.disabled,buttonId:o,panelId:r}})}activateTab(t){const a=this.getTabs(),e=a[t];if(!(!e||e.disabled||this.disabled)){for(const s of a)s.active=s===e;this.syncTabData(),this.dispatchEvent(new CustomEvent("esp-tab-changed",{detail:{index:t,label:e.label},bubbles:!0,composed:!0}))}}handleTabClick(t){this.activateTab(t),this.updateComplete.then(()=>{this.shadowRoot?.getElementById(this.tabData[t]?.buttonId)?.focus()})}handleKeyDown(t){if(!["ArrowLeft","ArrowRight","Home","End"].includes(t.key))return;t.preventDefault();const e=this.tabData.map((l,h)=>({td:l,i:h})).filter(({td:l})=>!l.disabled).map(({i:l})=>l);if(e.length===0)return;const s=this.tabData.findIndex(l=>l.active),o=e.indexOf(s);let r;switch(t.key){case"ArrowRight":o===-1?r=e[0]:r=e[(o+1)%e.length];break;case"ArrowLeft":o===-1?r=e[e.length-1]:r=e[(o-1+e.length)%e.length];break;case"Home":r=e[0];break;case"End":r=e[e.length-1];break;default:return}this.activateTab(r),this.updateComplete.then(()=>{this.shadowRoot?.getElementById(this.tabData[r]?.buttonId)?.focus()})}handleChildUpdated(){this.syncTabData()}handleSlotChange(){this.syncTabData()}connectedCallback(){super.connectedCallback(),this.syncTabData()}willUpdate(t){super.willUpdate(t),t.has("disabled")&&this.syncTabData()}render(){return d`
      <div class="tab-container">
        <div class="tab-list" role="tablist" part="tab-list" @keydown=${this.handleKeyDown}>
          ${this.tabData.map((t,a)=>d`
              <button
                id=${t.buttonId}
                class="tab-button"
                role="tab"
                part="tab-button"
                aria-selected=${t.active?"true":"false"}
                aria-controls=${t.panelId}
                aria-disabled=${t.disabled?"true":v}
                tabindex=${t.active?"0":"-1"}
                ?disabled=${t.disabled}
                @click=${()=>this.handleTabClick(a)}
              >
                ${t.label}
              </button>
            `)}
        </div>
        <div class="panels" part="panels">
          <slot
            ${w(this.panelsSlot)}
            @slotchange=${this.handleSlotChange}
            @esp-tab-updated=${this.handleChildUpdated}
          ></slot>
        </div>
      </div>
    `}};n.styles=[...c.styles,k(".tab-button[disabled]"),u`
      :host {
        display: block;
        --_esp-tab-resolved-button-hover: var(
          --esp-tab-color-button-hover,
          oklch(from var(--esp-color-layer-1) calc(l * 0.92) c h)
        );
      }

      :host([scheme="light"]) {
        --_esp-tab-resolved-button-hover: var(
          --esp-tab-color-button-hover,
          oklch(from var(--esp-color-layer-1) calc(l + (1 - l) * 0.4) c h)
        );
      }

      .tab-container {
        background-color: var(--esp-tab-color-background, var(--esp-color-layer-1));
        border-radius: var(--esp-size-border-radius);
        box-shadow: 1px 1px 4px var(--esp-color-shadow);
        border: 1px solid var(--esp-tab-color-border, var(--esp-color-border));
        overflow: hidden;
      }

      .tab-list {
        display: flex;
        overflow-x: auto;
        background-color: var(--esp-tab-color-strip-background, var(--esp-color-layer-1));
        border-bottom: 1px solid var(--esp-tab-color-border, var(--esp-color-border));
      }

      .tab-button {
        font-family: var(--esp-font-body);
        font-size: var(--esp-size-font);
        font-weight: 600;
        color: var(--esp-tab-color-text, var(--esp-color-headings));
        background: transparent;
        border: none;
        border-bottom: 2px solid transparent;
        padding: var(--esp-tab-size-padding, var(--esp-size-padding));
        cursor: pointer;
        user-select: none;
        white-space: nowrap;
        transition:
          background-color cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s,
          border-color cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;
        outline: none;
      }

      .tab-button:hover:not([disabled]):not([aria-selected="true"]) {
        background-color: var(--_esp-tab-resolved-button-hover);
      }

      .tab-button[aria-selected="true"] {
        background-color: var(--esp-tab-color-button-active, var(--esp-color-layer-2));
        border-bottom-color: var(--esp-tab-color-text, var(--esp-color-headings));
        border-left: 1px solid var(--esp-tab-color-border, var(--esp-color-border));
        border-right: 1px solid var(--esp-tab-color-border, var(--esp-color-border));
        cursor: default;
      }

      .tab-button:first-child[aria-selected="true"] {
        border-left: none;
      }

      .tab-button:focus-visible {
        box-shadow: inset 0 0 0 2px var(--esp-tab-color-text, var(--esp-color-headings));
      }

      :host([disabled]) .tab-list {
        opacity: 0.5;
      }

      :host([disabled]) .tab-button {
        cursor: not-allowed;
      }

      .panels {
        
      }
    `],b([g({type:Boolean,reflect:!0})],n.prototype,"disabled",void 0),b([m()],n.prototype,"tabData",void 0),n=b([f("esp-tab-group")],n);export{n as EspalierTabGroup};
