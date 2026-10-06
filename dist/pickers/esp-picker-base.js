var l=function(y,e,t,i){var n=arguments.length,s=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(y,e,t,i);else for(var h=y.length-1;h>=0;h--)(r=y[h])&&(s=(n<3?r(s):n>3?r(e,t,s):r(e,t))||s);return n>3&&s&&Object.defineProperty(e,t,s),s};import{createRef as m}from"lit/directives/ref.js";import{EspalierElementBase as P}from"../shared/esp-element-base.js";import{property as a,state as f}from"lit/decorators.js";import{adoptPickerItem as C,EspalierPickerItem as R,pickerItemDisplay as g,pickerItemValue as b,samePickerItemDisplay as F}from"./esp-picker-item.js";import{css as O,html as S,unsafeCSS as A}from"lit";import{findContainingPopovers as M,PopoverController as x}from"../shared/popover-controller.js";import{scrollToContainAnchoredSurface as E,viewportSize as v}from"../shared/viewport.js";import{FormFieldController as _}from"../shared/form-field-controller.js";import{FormFieldDescriptionController as z}from"../shared/form-field-description-controller.js";import{TypeaheadController as D}from"./typeahead-controller.js";import{COMPACT_VIEWPORT_MEDIA_QUERY as T}from"../shared/responsive.js";import{cancelSVG as V}from"../shared/svgs/cancel.js";import{quietCloseButton as H}from"../shared/style-fragments.js";import{ScrollLock as I}from"../shared/overlay-controller.js";class o extends P{constructor(){super(...arguments),this.internals=this.attachInternals(),this.formCtrl=new _({host:this,internals:this.internals,getFormValue:()=>this.getPickerFormValue(),getValidity:()=>this.getPickerValidity(),onReset:()=>this.handlePickerReset(),onRestore:e=>this.handlePickerRestore(e),onDisabled:e=>{this.disabled=e}}),this.formItemDescription=new z({host:this,getTarget:()=>this.theInput.value}),this._showOptions=!1,this.itemsSlot=m(),this.pickerMenu=m(),this.theInput=m(),this.pickerField=m(),this._lastViewportHeight=0,this._containRepositionFrame=null,this.fullscreenPlaceholderInlineSize=0,this.fullscreenPlaceholderViewportWidth=0,this.fullscreenPlaceholderFieldHeight=0,this.fullscreenPlaceholderEntryInlineSize=0,this.fullscreenPlaceholderContentSized=!1,this.popoverCtrl=new x({host:this,closeStrategy:"source-identity",isOpen:()=>this._showOptions,onShouldClose:()=>{this.showOptions=!1},onPositionUpdate:()=>{this.pickerMenu.value?.updatePosition(this);const{height:e}=v();if(this.pickerMenu.value?.hasAttribute("data-fullscreen")){this._lastViewportHeight=e;return}if(this._lastViewportHeight!==0&&e!==this._lastViewportHeight){const t=this._lastViewportHeight-e;t>=o.KEYBOARD_THRESHOLD?(this._scrollToContainPopover(),this._lastViewportHeight=e):t<0&&(this._lastViewportHeight=e)}},getPositionElements:()=>this.hasAttribute("data-picker-menu-fullscreen")?[this.pickerField.value]:[this.pickerMenu.value],getInsideElements:()=>[this.pickerMenu.value??null],onOutsideClick:()=>{this.closeAndResetTypeahead(),requestAnimationFrame(()=>{const e=document.activeElement;!this.showOptions&&(e===null||e===document.body||e===this)&&this.theInput.value?.focus()})}}),this.typeaheadLoading=!1,this.filteredItems=[],this.inputFocused=!1,this.typeaheadCtrl=new D({host:this,onFilteredItemsChanged:e=>{this.filteredItems=this.decorateFilteredItems(e)},onLoadingChanged:e=>{this.typeaheadLoading=e}}),this.typeahead=!1,this.fetchItems=null,this.debounceMs=void 0,this.handleTypeaheadInput=e=>{this.typeahead&&(this.typeaheadCtrl.setQuery(e.target.value),this.showOptions||(this.showOptions=!0))},this.handleInputBlur=e=>{this.inputFocused=!1;const t=e.relatedTarget;if(!(t&&(this.contains(t)||this.shadowRoot?.contains(t)))){if(t&&this.showOptions){requestAnimationFrame(()=>{this.showOptions&&this.closeAndResetTypeahead()});return}if(!t&&this.showOptions){requestAnimationFrame(()=>{this.showOptions&&this.shadowRoot?.activeElement!==this.theInput.value&&this.closeAndResetTypeahead()});return}this.closeAndResetTypeahead()}},this.handleMenuDismissRequested=e=>{e.preventDefault(),e.stopPropagation(),this.dismissMenu()},this.name="",this.required=!1,this.requiredMessage="",this.disabled=!1,this.pickerItems=[],this.placeholder="Choose...",this.width="",this._slotExtractPending=!1,this.extractedElements=new WeakMap,this.recordElements=new WeakMap}getPickerFormValue(){return null}getPickerValidity(){return null}handlePickerReset(){}handlePickerRestore(e){}formResetCallback(){this.formCtrl.handleFormReset()}formStateRestoreCallback(e){this.formCtrl.handleFormStateRestore(e)}formDisabledCallback(e){this.formCtrl.handleFormDisabled(e)}get showOptions(){return this._showOptions}set showOptions(e){if(e&&this.disabled)return;const t=this._showOptions;this._showOptions=e;const i=this.theInput.value;i&&(i.ariaExpanded=String(e)),e&&this.pickerMenu.value?(this.popoverCtrl.publishCloseOthers(M(this)),this.pickerMenu.value.positionSelf(this),this._lastViewportHeight=v().height,this.clearActiveDescendant(),this.popoverCtrl.startTracking(),this.popoverCtrl.startOutsideClick()):!e&&this.pickerMenu.value&&(this._containRepositionFrame!==null&&(cancelAnimationFrame(this._containRepositionFrame),this._containRepositionFrame=null),this.popoverCtrl.stopTracking(),this.popoverCtrl.stopOutsideClick(),this.pickerMenu.value.hideMenu(),this.clearActiveDescendant(),this._lastViewportHeight=0),e&&!t&&this.typeahead&&this.typeaheadCtrl.isRemote&&this.filteredItems.length===0&&this.typeaheadCtrl.fetchInitial()}get preservesRemoteResultsOnReset(){return this.typeaheadIsRemote}get typeaheadIsRemote(){return this.typeaheadCtrl.isRemote}refreshTypeaheadItems(){this.typeaheadCtrl.setAllItems(this.pickerItems)}fetchInitialTypeaheadItems(){this.typeaheadCtrl.fetchInitial()}resetTypeaheadInput(){const e=this.theInput.value;e&&(e.value=this.typeaheadRestoreText),this.preservesRemoteResultsOnReset?this.typeaheadCtrl.resetQuery():this.typeaheadCtrl.clearQuery()}closeAndResetTypeahead(){this.showOptions=!1,this.typeahead&&this.resetTypeaheadInput()}dismissMenu(){this.closeAndResetTypeahead(),this.theInput.value?.focus()}renderPickerMenuDismissButton(){return S`<button
      class="picker-mobile-dismiss"
      type="button"
      aria-label="Close options"
      @click=${e=>{e.preventDefault(),e.stopPropagation(),this.pickerMenu.value?.requestDismiss()}}
    >
      ${V}
    </button>`}enterPickerMenuFullscreen(){const e=this.pickerField.value;if(!e)return null;const t=v().width;if(!this.hasAttribute("data-picker-menu-fullscreen")){const c=this.getBoundingClientRect(),d=Number.isFinite(c.width)?c.width:0;this.fullscreenPlaceholderEntryInlineSize=Math.max(d,0),this.setAttribute("data-picker-menu-fullscreen",""),e.setAttribute("data-picker-menu-fullscreen-surface",""),e.setAttribute("popover","manual");try{e.matches(":popover-open")||e.showPopover()}catch{return e.removeAttribute("popover"),e.removeAttribute("data-picker-menu-fullscreen-surface"),this.removeAttribute("data-picker-menu-fullscreen"),this.fullscreenPlaceholderEntryInlineSize=0,null}this.fullscreenPlaceholderContentSized=!(this.getBoundingClientRect().width>0),I.lock(this,{preserveScrollPosition:!0}),this.popoverCtrl.refreshPositionElements()}const n=e.getBoundingClientRect(),s=n.height;let r;if(this.fullscreenPlaceholderContentSized)r=Math.min(this.fullscreenPlaceholderEntryInlineSize,t);else{const c=this.getBoundingClientRect().width;r=Number.isFinite(c)?Math.min(Math.max(c,0),t):this.fullscreenPlaceholderInlineSize}const h=r!==this.fullscreenPlaceholderInlineSize||t!==this.fullscreenPlaceholderViewportWidth||s!==this.fullscreenPlaceholderFieldHeight;if(h){const d=["inline-size","box-sizing","padding","margin","overflow"].map(p=>({name:p,value:e.style.getPropertyValue(p),priority:e.style.getPropertyPriority(p)}));this.removeAttribute("data-picker-menu-fullscreen"),e.style.setProperty("inline-size",`${r}px`),e.style.setProperty("box-sizing","border-box"),e.style.setProperty("padding","0"),e.style.setProperty("margin","0"),e.style.setProperty("overflow","visible");const u=e.getBoundingClientRect().height;this.setAttribute("data-picker-menu-fullscreen","");for(const{name:p,value:k,priority:w}of d)k?e.style.setProperty(p,k,w):e.style.removeProperty(p);this.fullscreenPlaceholderInlineSize=r,this.fullscreenPlaceholderViewportWidth=t,this.fullscreenPlaceholderFieldHeight=s,this.style.setProperty("--_esp-picker-fullscreen-placeholder-block-size",`${u}px`),this.fullscreenPlaceholderContentSized?this.style.setProperty("--_esp-picker-fullscreen-placeholder-inline-size",`${r}px`):this.style.removeProperty("--_esp-picker-fullscreen-placeholder-inline-size")}return h?e.getBoundingClientRect():n}exitPickerMenuFullscreen(){const e=this.hasAttribute("data-picker-menu-fullscreen"),t=this.pickerField.value;if(t?.matches(":popover-open"))try{t.hidePopover()}catch{}t?.removeAttribute("popover"),t?.removeAttribute("data-picker-menu-fullscreen-surface"),this.removeAttribute("data-picker-menu-fullscreen"),this.style.removeProperty("--_esp-picker-fullscreen-placeholder-block-size"),this.style.removeProperty("--_esp-picker-fullscreen-placeholder-inline-size"),this.fullscreenPlaceholderInlineSize=0,this.fullscreenPlaceholderViewportWidth=0,this.fullscreenPlaceholderFieldHeight=0,this.fullscreenPlaceholderEntryInlineSize=0,this.fullscreenPlaceholderContentSized=!1,I.unlock(this),e&&this.popoverCtrl.refreshPositionElements()}pickerMenuIsOpen(){return this.showOptions}disconnectedCallback(){this.showOptions=!1,this.exitPickerMenuFullscreen(),super.disconnectedCallback()}handleSharedPickerKeydown(e){switch(e.key){case" ":return this.typeahead||(this.showOptions=!this.showOptions),!0;case"Tab":return this.showOptions&&(this.showOptions=!1),this.typeahead&&this.resetTypeaheadInput(),!0;case"Escape":return this.closeAndResetTypeahead(),!0;default:return!1}}handleMenuNavigationKey(e,t){if(t.preventDefault(),!this.showOptions){this.showOptions=!0;return}this.pickerMenu.value?.doKeyboardNav(e),this.updateActiveDescendant()}get menuItems(){return this.typeahead?this.filteredItems:this.pickerItems}focus(){this.theInput.value?.focus()}setFormItemDescription(e){this.formItemDescription.setDescription(e)}setFormItemInvalid(e){this.formItemDescription.setInvalid(e)}setFormItemLabel(e){this.formItemDescription.setLabel(e)}validate(){this.formCtrl.validate()}checkValidity(){return this.formCtrl.checkValidity()}updateActiveDescendant(){const e=this.theInput.value;if(!e||!this.pickerMenu.value)return;const t=this.pickerMenu.value.getHighlightedElement();e.ariaActiveDescendantElement=t}clearActiveDescendant(){const e=this.theInput.value;e&&(e.ariaActiveDescendantElement=null)}_scrollToContainPopover(){const e=this.pickerMenu.value;e&&(this._containRepositionFrame!==null&&cancelAnimationFrame(this._containRepositionFrame),this._containRepositionFrame=E(this,e,()=>{this._containRepositionFrame=null,this.showOptions&&this.pickerMenu.value?.updatePosition(this)}))}syncSelectionFromItems(e){}willUpdate(e){super.willUpdate(e),this.syncSelectionFromItems(e),this.typeahead&&((e.has("fetchItems")||e.has("typeahead"))&&this.typeaheadCtrl.setFetchItems(this.fetchItems),(e.has("pickerItems")||e.has("typeahead")||e.has("fetchItems")&&this.fetchItems===null)&&(this.typeaheadCtrl.showingRemoteResults&&(this.filteredItems=this.decorateFilteredItems(this.filteredItems)),this.typeaheadCtrl.setAllItems(this.pickerItems)),(e.has("debounceMs")||e.has("typeahead"))&&this.debounceMs!==void 0&&this.typeaheadCtrl.setDebounceMs(this.debounceMs))}updated(e){super.updated(e),e.has("disabled")&&this.disabled&&this.showOptions&&(this.showOptions=!1),e.has("width")&&(this.width?this.style.width=this.width:this.style.removeProperty("width"))}firstUpdated(e){super.firstUpdated(e);const t=this.theInput.value;if(t&&(t.role="combobox",t.ariaHasPopup="listbox",t.ariaExpanded="false",t.ariaAutoComplete=this.typeahead?"list":"none",this.pickerMenu.value)){const n=t;n.ariaControlsElements=[this.pickerMenu.value]}const i=this.itemsSlot.value;i&&(this.extractSlotItems(i),i.addEventListener("slotchange",()=>this.extractSlotItems(i)))}copyPickerItem(e,t){const i={...e,...t},n=this.recordElements.get(e);return n&&this.recordElements.set(i,n),i}extractSlotItems(e){this._slotExtractPending||(this._slotExtractPending=!0,queueMicrotask(()=>{this._slotExtractPending=!1;const t=e.assignedElements();if(t.length===0)return;const i=[],n=new WeakMap;for(const s of t){if(!(s instanceof R))throw new Error(`Picker items must be of type esp-picker-item, but got <${s.tagName.toLowerCase()}>`);const r=s,h=Array.from(r.childNodes),c=h.length>0?h.map(p=>p.cloneNode(!0)):void 0,d=b(r);n.set(r,{index:i.length,value:d});const u={...g(r),value:d,selected:r.selected||r.hasAttribute("selected"),slotNodes:c};this.recordElements.set(u,r),i.push(u),C(r,this)}this.extractedElements=n,this.pickerItems=i;for(const s of t)s.remove()}))}pickerItemChanged(e){const t=this.extractedElements.get(e);if(!t||b(e)!==t.value)return;const i=this.pickerItems[t.index];if(!i||i.value!==t.value||this.recordElements.get(i)!==e)return;const n=g(e);if(F(n,i))return;const s=[...this.pickerItems];s[t.index]=this.copyPickerItem(i,n),this.pickerItems=s}}o.clearsFormItemErrorOnChange=!0,o.formAssociated=!0,o.KEYBOARD_THRESHOLD=150,o.pickerFieldStyles=[...H(".esp-field > .picker-mobile-dismiss"),O`
      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }

      .esp-field {
        display: grid;
        grid-template-columns: auto min-content;
        position: relative;

        > section {
          cursor: pointer;
          display: flex;
          flex-wrap: wrap;
        }

        > label {
          display: grid;
          place-content: center;
          cursor: pointer;

          > svg {
            height: var(--esp-size-normal-to-medium);
            width: var(--esp-size-normal-to-medium);
          }
        }
      }

      :host([typeahead]) .esp-field > section {
        cursor: text;
      }

      .esp-field > .picker-mobile-dismiss {
        display: none;
      }

      @media ${A(T)} {
        
        :host([data-picker-menu-fullscreen]) {
          min-block-size: var(--_esp-picker-fullscreen-placeholder-block-size, 2.75rem);
          min-inline-size: var(--_esp-picker-fullscreen-placeholder-inline-size, 0);
        }

        :host([data-picker-menu-fullscreen]) .esp-field {
          position: fixed;
          inset: 0 0 auto 0;
          box-sizing: border-box;
          inline-size: 100vw;
          max-inline-size: none;
          min-block-size: 2.75rem;
          margin: 0;
          padding: 0;
          overflow: visible;
          grid-template-columns: minmax(0, 1fr) min-content min-content;
          border-radius: 0;
        }

        :host([data-picker-menu-fullscreen]) .esp-field > section {
          min-inline-size: 0;
        }

        :host([data-picker-menu-fullscreen]) .esp-field > label:not(.add-new) {
          display: none;
        }

        :host([data-picker-menu-fullscreen]) .picker-mobile-dismiss {
          display: grid;
          grid-column: -2;
          place-items: center;
          box-sizing: border-box;
          min-block-size: 2.75rem;
          min-inline-size: 2.75rem;
          margin: 0;
          border-radius: var(--esp-size-border-radius);
        }

        :host([data-picker-menu-fullscreen]) .picker-mobile-dismiss:focus-visible {
          box-shadow: inset 0 0 0 3px var(--esp-color-link, var(--esp-color-shadow));
        }
      }
    `],l([f()],o.prototype,"showOptions",null),l([f()],o.prototype,"typeaheadLoading",void 0),l([f()],o.prototype,"filteredItems",void 0),l([f()],o.prototype,"inputFocused",void 0),l([a({type:Boolean,reflect:!0})],o.prototype,"typeahead",void 0),l([a({attribute:!1})],o.prototype,"fetchItems",void 0),l([a({type:Number,attribute:"debounce-ms"})],o.prototype,"debounceMs",void 0),l([a({type:String,reflect:!0})],o.prototype,"name",void 0),l([a({type:Boolean,reflect:!0})],o.prototype,"required",void 0),l([a({attribute:"required-message"})],o.prototype,"requiredMessage",void 0),l([a({type:Boolean,reflect:!0})],o.prototype,"disabled",void 0),l([a({type:Array})],o.prototype,"pickerItems",void 0),l([a({type:String})],o.prototype,"placeholder",void 0),l([a({type:String})],o.prototype,"width",void 0);export{o as EspalierPickerBase};
