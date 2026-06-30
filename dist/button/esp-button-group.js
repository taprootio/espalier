var u=function(r,t,o,e){var s=arguments.length,n=s<3?t:e===null?e=Object.getOwnPropertyDescriptor(t,o):e,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(r,t,o,e);else for(var l=r.length-1;l>=0;l--)(i=r[l])&&(n=(s<3?i(n):s>3?i(t,o,n):i(t,o))||n);return s>3&&n&&Object.defineProperty(t,o,n),n};import{css as d,html as p,LitElement as h,nothing as b}from"lit";import{customElement as f,property as c}from"lit/decorators.js";const g=["ArrowRight","ArrowDown","ArrowLeft","ArrowUp","Home","End"];function v(r){const t=r.tagName;return t==="ESP-BUTTON"?!0:t==="ESP-TOOLTIP"?!!r.querySelector("esp-button"):t==="ESP-POPOVER"?!!r.querySelector('esp-button[slot="target"]'):!1}let a=class extends h{constructor(){super(...arguments),this.label="",this.toolbar=!1,this.activeButton=null,this.managedButtons=new Set,this.managedTooltips=new Set}connectedCallback(){super.connectedCallback(),this.stateObserver??=new MutationObserver(()=>this.applyRovingTabindex()),this.stateObserver.observe(this,{subtree:!0,attributes:!0,attributeFilter:["disabled","loading"]})}disconnectedCallback(){super.disconnectedCallback(),this.stateObserver?.disconnect()}isEnabled(t){return!t.disabled&&!t.loading}handleSlotChange(t){const o=t.target;for(const e of o.assignedElements()){v(e)||console.warn(`<esp-button-group> unexpected child <${e.tagName.toLowerCase()}>. Only <esp-button>, <esp-tooltip>, or <esp-popover> (containing an <esp-button>) are supported.`);let s;const n=e.tagName;n==="ESP-BUTTON"?s=[e]:n==="ESP-POPOVER"?s=Array.from(e.querySelectorAll(':scope > esp-button[slot="target"]')):s=Array.from(e.querySelectorAll(":scope > esp-button"));for(const i of s)i.style.setProperty("--_esp-button-radius","0"),i.style.setProperty("--esp-field-border-width","0px")}this.applyRovingTabindex()}getButtons(){const t=this.shadowRoot?.querySelector("slot");if(!t)return[];const o=[];for(const e of t.assignedElements()){const s=e.tagName;s==="ESP-BUTTON"?o.push(e):s==="ESP-TOOLTIP"?o.push(...e.querySelectorAll(":scope > esp-button")):s==="ESP-POPOVER"&&o.push(...e.querySelectorAll(':scope > esp-button[slot="target"]'))}return o}getTooltips(){const t=this.shadowRoot?.querySelector("slot");return t?t.assignedElements().filter(o=>o.tagName==="ESP-TOOLTIP"):[]}applyTabindexValues(){const t=this.getButtons(),o=new Set(t);for(const e of this.managedButtons)o.has(e)||e.removeAttribute("tabindex");this.managedButtons=o;for(const e of t)e.setAttribute("tabindex",e===this.activeButton?"0":"-1")}syncTooltipOptOut(){const t=this.getTooltips(),o=new Set(t);for(const e of this.managedTooltips)o.has(e)||e.removeAttribute("trigger-tabindex");this.managedTooltips=o;for(const e of t)e.setAttribute("trigger-tabindex","-1")}applyRovingTabindex(){if(!this.toolbar)return;this.syncTooltipOptOut();const t=this.getButtons().filter(o=>this.isEnabled(o));t.length===0?this.activeButton=null:(!this.activeButton||!t.includes(this.activeButton))&&(this.activeButton=t[0]),this.applyTabindexValues()}clearRovingTabindex(){this.activeButton=null;for(const t of this.managedButtons)t.removeAttribute("tabindex");this.managedButtons.clear();for(const t of this.managedTooltips)t.removeAttribute("trigger-tabindex");this.managedTooltips.clear()}handleKeyDown(t){if(!this.toolbar||!g.includes(t.key))return;const o=this.getButtons().filter(n=>this.isEnabled(n));if(o.length===0)return;t.preventDefault();const e=this.activeButton?o.indexOf(this.activeButton):-1;let s;switch(t.key){case"Home":s=0;break;case"End":s=o.length-1;break;case"ArrowRight":case"ArrowDown":s=e===-1?0:(e+1)%o.length;break;default:s=e===-1?0:(e-1+o.length)%o.length}this.activeButton=o[s],this.applyTabindexValues(),this.activeButton.focus()}handleFocusIn(t){if(!this.toolbar)return;const o=t.composedPath(),e=this.getButtons().find(s=>this.isEnabled(s)&&o.includes(s));e&&e!==this.activeButton&&(this.activeButton=e,this.applyTabindexValues())}firstUpdated(){this.applyRovingTabindex()}updated(t){t.has("toolbar")&&(this.toolbar?this.applyRovingTabindex():this.clearRovingTabindex())}render(){return p`
      <div
        class="button-group"
        role=${this.toolbar?"toolbar":"group"}
        aria-label=${this.label||b}
        @keydown=${this.handleKeyDown}
        @focusin=${this.handleFocusIn}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};a.styles=d`
    :host {
      display: inline-flex;
    }

    .button-group {
      display: inline-flex;
      gap: 0;
      overflow-x: auto;
      border-radius: var(--esp-size-border-radius);
      border: 1px solid var(--esp-color-border);
    }

    ::slotted(*) {
      --_esp-button-radius: 0;
      --esp-field-border-width: 0px;
    }

    ::slotted(:not(:first-child)) {
      border-left: var(--esp-button-group-divider, 1px dotted var(--esp-color-border));
    }
  `,u([c({type:String})],a.prototype,"label",void 0),u([c({type:Boolean})],a.prototype,"toolbar",void 0),a=u([f("esp-button-group")],a);export{a as EspalierButtonGroup};
