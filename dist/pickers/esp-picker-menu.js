var n=function(d,t,e,i){var l=arguments.length,s=l<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(d,t,e,i);else for(var h=d.length-1;h>=0;h--)(o=d[h])&&(s=(l<3?o(s):l>3?o(t,e,s):o(t,e))||s);return l>3&&s&&Object.defineProperty(t,e,s),s};import{LitElement as u,css as f,html as p}from"lit";import{customElement as v,property as g,state as m}from"lit/decorators.js";import{createRef as y,ref as I}from"lit/directives/ref.js";import"@lit-labs/virtualizer";import{styleMap as x}from"lit/directives/style-map.js";const c="highlighted";let r=class extends u{constructor(){super(),this.internals=this.attachInternals(),this.virtualizerRef=y(),this.maxAvailableHeight=0,this.lastViewportHeight=0,this.label="",this.virtualizedItemsPool=[],this.highlightIndex=-1,this.multiSelect=!1,this.loading=!1,this.emptyMessage="",this.handleItemPointerDown=t=>{this.selectItemFromPointerEvent(t)},this.renderPickerItem=(t,e)=>{const i={display:"block",cursor:"pointer",width:"100%",...t.styles};return p`<esp-picker-item
      class="picker-item"
      data-picker-index=${e}
      .text=${t.text}
      .value=${t.value}
      .selected=${t.selected}
      .icon=${t.icon??""}
      .highlightRanges=${t.highlightRanges}
      style=${x(i)}
    >
      ${t.slotNodes?.map(l=>l.cloneNode(!0))}
    </esp-picker-item>`},this.internals.role="listbox"}connectedCallback(){super.connectedCallback(),this.setAttribute("popover","manual")}updated(t){super.updated(t),t.has("multiSelect")&&(this.internals.ariaMultiSelectable=String(this.multiSelect)),t.has("label")&&(this.internals.ariaLabel=this.label),(t.has("virtualizedItemsPool")||t.has("loading"))&&this.maxAvailableHeight>0&&this.matches(":popover-open")&&this.resizeAndHighlight(t.has("virtualizedItemsPool"))}get pickerItems(){return this.virtualizedItemsPool}set pickerItems(t){const e=this.virtualizedItemsPool.filter(s=>s.selected).map(s=>s.value);this.virtualizedItemsPool=t;const i=t.filter(s=>s.selected),l=i.map(s=>s.value);(e.length!==l.length||e.some((s,o)=>s!==l[o]))&&this.dispatchEvent(new CustomEvent("selection-changed",{detail:i,bubbles:!0,composed:!0}))}setHighlight(t){const e=this.virtualizedItemsPool;if(e.length===0)return;(this.highlightIndex<0||this.highlightIndex>e.length-1)&&(this.highlightIndex=t);const i=this.virtualizerRef.value;i&&i.scrollToIndex(this.highlightIndex,"nearest"),this.applyHighlightClass()}async setHighlightAsync(t){const e=this.virtualizedItemsPool;if(e.length===0)return;(this.highlightIndex<0||this.highlightIndex>e.length-1)&&(this.highlightIndex=t);const i=this.virtualizerRef.value;i&&(i.scrollToIndex(this.highlightIndex,"nearest"),await i.layoutComplete),this.applyHighlightClass()}applyHighlightClass(){this.clearHighlight();const t=this.getHighlightedElement();t&&t.classList.add(c)}clearHighlight(){const t=this.virtualizerRef.value;if(t)for(const e of t.querySelectorAll(`esp-picker-item.${c}`))e.classList.remove(c)}resetHighlight(){this.clearHighlight();const t=this.virtualizedItemsPool.find(e=>e.selected);this.highlightIndex=t?this.virtualizedItemsPool.indexOf(t):-1}applyHighlightWithRetry(t){if(!this.isConnected||!this.matches(":popover-open"))return;this.clearHighlight();const e=this.getHighlightedElement();if(e){e.classList.add(c);return}t>0&&requestAnimationFrame(()=>this.applyHighlightWithRetry(t-1))}getHighlightedElement(){if(this.highlightIndex<0)return null;const t=this.virtualizerRef.value;if(!t)return null;const e=t.querySelectorAll("esp-picker-item");for(const i of e)if(this.virtualizedItemsPool.findIndex(s=>s.value===i.value&&s.text===i.text)===this.highlightIndex)return i;return null}pickItem(t){for(const i of this.pickerItems)i===t?i.selected=!i.selected:this.multiSelect||(i.selected=!1);const e=this.virtualizedItemsPool.indexOf(t);if(e!==-1){this.highlightIndex=e,this.clearHighlight();const i=this.getHighlightedElement();i&&i.classList.add(c)}this.pickerItems=[...this.pickerItems],this.dispatchEvent(new CustomEvent("selection-changed",{detail:this.pickerItems.filter(i=>i.selected),bubbles:!0,composed:!0})),this.multiSelect||this.dispatchEvent(new CustomEvent("close-menu",{detail:this.pickerItems.filter(i=>i.selected),bubbles:!0,composed:!0}))}selectItemByIndex(t){const e=Number.isInteger(t)?this.virtualizedItemsPool[t]:void 0;return e?(this.pickItem(e),!0):!1}getPickerItemElementAtPoint(t,e){const i=this.shadowRoot?.querySelectorAll("esp-picker-item[data-picker-index]");if(!i)return null;for(const l of i){const s=l.getBoundingClientRect();if(t>=s.left&&t<=s.right&&e>=s.top&&e<=s.bottom)return l}return null}selectPickerItemElement(t){return t?this.selectItemByIndex(Number(t.dataset.pickerIndex)):!1}selectItemAtPoint(t,e){return this.selectPickerItemElement(this.getPickerItemElementAtPoint(t,e))}selectItemFromPointerEvent(t){const e=t.composedPath().find(l=>l instanceof HTMLElement&&l.matches("esp-picker-item[data-picker-index]"));return this.selectPickerItemElement(e??this.getPickerItemElementAtPoint(t.clientX,t.clientY))?(t.preventDefault(),t.stopPropagation(),!0):!1}positionSelf(t){const e=t.getBoundingClientRect(),i=window.innerHeight||document.documentElement.clientHeight,l=e.top,s=i-e.bottom,o=Math.max(Math.max(l,s)-75,0);this.maxAvailableHeight=o,this.lastViewportHeight=i,this.style.setProperty("height",`${o}px`),this.style.setProperty("min-width",`${e.width}px`),this.style.setProperty("left",`${e.left}px`),this.style.removeProperty("top"),this.style.removeProperty("bottom"),l>s?this.style.setProperty("bottom",`${i-e.top}px`):this.style.setProperty("top",`${e.bottom}px`),this.classList.remove("visible"),this.matches(":popover-open")||this.showPopover();const h=this.pickerItems.find(a=>a.selected);this.highlightIndex=h?this.pickerItems.indexOf(h):0,this.setHighlightAsync(0).then(()=>{requestAnimationFrame(()=>{this.shrinkToFit(o),this.widenToFitContent(e),this.classList.add("visible")})})}async resizeAndHighlight(t){try{await this.updateComplete}catch{return}if(!this.isConnected||!this.matches(":popover-open"))return;const e=this.virtualizerRef.value;if(!e){requestAnimationFrame(()=>{if(!this.isConnected)return;const s=this.shadowRoot?.querySelector(".status-message");if(s){const o=Math.min(s.scrollHeight,this.maxAvailableHeight);this.style.setProperty("height",`${o}px`)}});return}try{const s=e.layoutComplete;s&&await s}catch{return}if(!this.isConnected||!this.matches(":popover-open")||(e.scrollTop=0,this.sizeToContent(this.maxAvailableHeight),!t))return;try{const s=e.layoutComplete;s&&await s}catch{return}if(!this.isConnected||!this.matches(":popover-open"))return;const i=this.virtualizedItemsPool;if(i.length===0)return;const l=i.findIndex(s=>s.selected);l>=0?this.highlightIndex=l:this.highlightIndex>=i.length?this.highlightIndex=i.length-1:this.highlightIndex<0&&(this.highlightIndex=0);try{e.scrollToIndex(this.highlightIndex,"nearest")}catch{}try{const s=e.layoutComplete;s&&await s}catch{return}!this.isConnected||!this.matches(":popover-open")||this.applyHighlightWithRetry(3)}sizeToContent(t){const e=this.measureContentHeight();e>0&&this.style.setProperty("height",`${Math.min(e,t)}px`)}shrinkToFit(t){const e=this.measureContentHeight();e>2&&e<t&&this.style.setProperty("height",`${e}px`)}measureContentHeight(){const t=this.virtualizerRef.value;if(!t)return 0;const e=t.querySelectorAll("esp-picker-item");if(e.length===0)return 0;const i=getComputedStyle(this),l=(parseFloat(i.borderTopWidth)||0)+(parseFloat(i.borderBottomWidth)||0),s=this.virtualizedItemsPool.length;if(e.length<s)return t.scrollHeight+l;t.scrollTop=0;const o=t.getBoundingClientRect();return e[e.length-1].getBoundingClientRect().bottom-o.top+l}widenToFitContent(t){const e=this.virtualizerRef.value;if(!e)return;const i=e.querySelectorAll("esp-picker-item");let l=t.width;for(const s of i)l=Math.max(l,s.scrollWidth);if(l+=2,l>t.width){const s=window.innerWidth||document.documentElement.clientWidth,o=Math.min(l,s-t.left);this.style.setProperty("width",`${o}px`)}}updatePosition(t){const e=t.getBoundingClientRect(),i=window.innerHeight||document.documentElement.clientHeight;if(i!==this.lastViewportHeight){const o=e.top,h=i-e.bottom,a=Math.max(Math.max(o,h)-75,0);this.maxAvailableHeight=a,this.lastViewportHeight=i,(parseFloat(this.style.getPropertyValue("height"))||0)>a&&this.style.setProperty("height",`${a}px`),this.sizeToContent(a)}this.style.setProperty("left",`${e.left}px`);const l=e.top,s=i-e.bottom;l>s?(this.style.removeProperty("top"),this.style.setProperty("bottom",`${i-e.top}px`)):(this.style.removeProperty("bottom"),this.style.setProperty("top",`${e.bottom}px`))}hideMenu(){this.classList.remove("visible");try{this.hidePopover()}catch{}}doKeyboardNav(t){const e=this.virtualizedItemsPool;if(e.length!==0)switch(t){case"ArrowDown":this.highlightIndex+=1,this.setHighlight(0);break;case"ArrowUp":this.highlightIndex-=1,this.setHighlight(e.length-1);break;case"Home":this.highlightIndex=0,this.setHighlight(0);break;case"End":this.highlightIndex=e.length-1,this.setHighlight(e.length-1);break;case"Enter":if(this.highlightIndex===-1)return;this.pickItem(e[this.highlightIndex]);break}}render(){return this.loading?p`<div class="status-message">Searching…</div>`:this.virtualizedItemsPool.length===0&&this.emptyMessage?p`<div class="status-message">${this.emptyMessage}</div>`:p`<lit-virtualizer
      ${I(this.virtualizerRef)}
      scroller
      .items=${this.virtualizedItemsPool}
      .renderItem=${this.renderPickerItem}
      @pointerdown=${this.handleItemPointerDown}
      @rangeChanged=${t=>{this.dispatchEvent(new CustomEvent("range-changed",{detail:{first:t.first,last:t.last,items:this.virtualizedItemsPool},bubbles:!0,composed:!0}))}}
    ></lit-virtualizer>`}};r.styles=f`
    :host {
      position: fixed;
      inset: unset;
      margin: 0;
      padding: 0;
      border-radius: var(--esp-size-border-radius);
      border: 1px solid var(--esp-color-border);
      overflow: hidden;
      box-shadow: 0 0 3px var(--esp-color-shadow);
      color: var(--esp-color-text);
      opacity: 0;
      transition: opacity 150ms ease-in;
    }

    :host(.visible) {
      opacity: 1;
    }

    lit-virtualizer {
      
      height: 100%;
    }

    div {
      overflow: hidden;
      width: 100%;
    }

    .status-message {
      display: grid;
      place-content: center;
      min-height: 3em;
      padding: var(--esp-size-padding);
      color: var(--esp-color-headings);
      font-style: italic;
      background: var(--esp-color-layer-2);
    }
  `,n([g({type:String})],r.prototype,"label",void 0),n([m()],r.prototype,"virtualizedItemsPool",void 0),n([m()],r.prototype,"highlightIndex",void 0),n([g({attribute:"multi-select",type:Boolean})],r.prototype,"multiSelect",void 0),n([g({type:Boolean})],r.prototype,"loading",void 0),n([g({type:String,attribute:"empty-message"})],r.prototype,"emptyMessage",void 0),r=n([v("esp-picker-menu")],r);export{r as EspalierPickerMenu};
