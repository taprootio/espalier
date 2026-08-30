var l=function(m,e,t,r){var o=arguments.length,i=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(m,e,t,r);else for(var h=m.length-1;h>=0;h--)(n=m[h])&&(i=(o<3?n(i):o>3?n(e,t,i):n(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};import{createRef as u}from"lit/directives/ref.js";import{EspalierElementBase as w}from"../shared/esp-element-base.js";import{property as a,state as d}from"lit/decorators.js";import{EspalierPickerItem as I}from"./esp-picker-item.js";import{css as P,html as C,unsafeCSS as R}from"lit";import{findContainingPopovers as F,PopoverController as A}from"../shared/popover-controller.js";import{scrollToContainAnchoredSurface as S,viewportSize as y}from"../shared/viewport.js";import{FormFieldController as _}from"../shared/form-field-controller.js";import{FormFieldDescriptionController as O}from"../shared/form-field-description-controller.js";import{TypeaheadController as M}from"./typeahead-controller.js";import{COMPACT_VIEWPORT_MEDIA_QUERY as z}from"../shared/responsive.js";import{cancelSVG as x}from"../shared/svgs/cancel.js";import{quietCloseButton as E}from"../shared/style-fragments.js";import{ScrollLock as g}from"../shared/overlay-controller.js";class s extends w{constructor(){super(...arguments),this.internals=this.attachInternals(),this.formCtrl=new _({host:this,internals:this.internals,getFormValue:()=>this.getPickerFormValue(),getValidity:()=>this.getPickerValidity(),onReset:()=>this.handlePickerReset(),onRestore:e=>this.handlePickerRestore(e),onDisabled:e=>{this.disabled=e}}),this.formItemDescription=new O({host:this,getTarget:()=>this.theInput.value}),this._showOptions=!1,this.itemsSlot=u(),this.pickerMenu=u(),this.theInput=u(),this.pickerField=u(),this._lastViewportHeight=0,this._containRepositionFrame=null,this.fullscreenPlaceholderInlineSize=0,this.fullscreenPlaceholderViewportWidth=0,this.fullscreenPlaceholderFieldHeight=0,this.fullscreenPlaceholderEntryInlineSize=0,this.fullscreenPlaceholderContentSized=!1,this.popoverCtrl=new A({host:this,closeStrategy:"source-identity",isOpen:()=>this._showOptions,onShouldClose:()=>{this.showOptions=!1},onPositionUpdate:()=>{this.pickerMenu.value?.updatePosition(this);const{height:e}=y();if(this.pickerMenu.value?.hasAttribute("data-fullscreen")){this._lastViewportHeight=e;return}if(this._lastViewportHeight!==0&&e!==this._lastViewportHeight){const t=this._lastViewportHeight-e;t>=s.KEYBOARD_THRESHOLD?(this._scrollToContainPopover(),this._lastViewportHeight=e):t<0&&(this._lastViewportHeight=e)}},getPositionElements:()=>this.hasAttribute("data-picker-menu-fullscreen")?[this.pickerField.value]:[this.pickerMenu.value],getInsideElements:()=>[this.pickerMenu.value??null],onOutsideClick:()=>{this.closeAndResetTypeahead(),requestAnimationFrame(()=>{const e=document.activeElement;!this.showOptions&&(e===null||e===document.body||e===this)&&this.theInput.value?.focus()})}}),this.typeaheadLoading=!1,this.filteredItems=[],this.inputFocused=!1,this.typeaheadCtrl=new M({host:this,onFilteredItemsChanged:e=>{this.filteredItems=this.decorateFilteredItems(e)},onLoadingChanged:e=>{this.typeaheadLoading=e}}),this.typeahead=!1,this.fetchItems=null,this.debounceMs=void 0,this.handleTypeaheadInput=e=>{this.typeahead&&(this.typeaheadCtrl.setQuery(e.target.value),this.showOptions||(this.showOptions=!0))},this.handleInputBlur=e=>{this.inputFocused=!1;const t=e.relatedTarget;if(!(t&&(this.contains(t)||this.shadowRoot?.contains(t)))){if(t&&this.showOptions){requestAnimationFrame(()=>{this.showOptions&&this.closeAndResetTypeahead()});return}if(!t&&this.showOptions){requestAnimationFrame(()=>{this.showOptions&&this.shadowRoot?.activeElement!==this.theInput.value&&this.closeAndResetTypeahead()});return}this.closeAndResetTypeahead()}},this.handleMenuDismissRequested=e=>{e.preventDefault(),e.stopPropagation(),this.dismissMenu()},this.name="",this.required=!1,this.requiredMessage="",this.disabled=!1,this.pickerItems=[],this.placeholder="Choose...",this.width="",this._slotExtractPending=!1}getPickerFormValue(){return null}getPickerValidity(){return null}handlePickerReset(){}handlePickerRestore(e){}formResetCallback(){this.formCtrl.handleFormReset()}formStateRestoreCallback(e){this.formCtrl.handleFormStateRestore(e)}formDisabledCallback(e){this.formCtrl.handleFormDisabled(e)}get showOptions(){return this._showOptions}set showOptions(e){if(e&&this.disabled)return;const t=this._showOptions;this._showOptions=e;const r=this.theInput.value;r&&(r.ariaExpanded=String(e)),e&&this.pickerMenu.value?(this.popoverCtrl.publishCloseOthers(F(this)),this.pickerMenu.value.positionSelf(this),this._lastViewportHeight=y().height,this.clearActiveDescendant(),this.popoverCtrl.startTracking(),this.popoverCtrl.startOutsideClick()):!e&&this.pickerMenu.value&&(this._containRepositionFrame!==null&&(cancelAnimationFrame(this._containRepositionFrame),this._containRepositionFrame=null),this.popoverCtrl.stopTracking(),this.popoverCtrl.stopOutsideClick(),this.pickerMenu.value.hideMenu(),this.clearActiveDescendant(),this._lastViewportHeight=0),e&&!t&&this.typeahead&&this.typeaheadCtrl.isRemote&&this.filteredItems.length===0&&this.typeaheadCtrl.fetchInitial()}get preservesRemoteResultsOnReset(){return this.typeaheadIsRemote}get typeaheadIsRemote(){return this.typeaheadCtrl.isRemote}refreshTypeaheadItems(){this.typeaheadCtrl.setAllItems(this.pickerItems)}fetchInitialTypeaheadItems(){this.typeaheadCtrl.fetchInitial()}resetTypeaheadInput(){const e=this.theInput.value;e&&(e.value=this.typeaheadRestoreText),this.preservesRemoteResultsOnReset?this.typeaheadCtrl.resetQuery():this.typeaheadCtrl.clearQuery()}closeAndResetTypeahead(){this.showOptions=!1,this.typeahead&&this.resetTypeaheadInput()}dismissMenu(){this.closeAndResetTypeahead(),this.theInput.value?.focus()}renderPickerMenuDismissButton(){return C`<button
      class="picker-mobile-dismiss"
      type="button"
      aria-label="Close options"
      @click=${e=>{e.preventDefault(),e.stopPropagation(),this.pickerMenu.value?.requestDismiss()}}
    >
      ${x}
    </button>`}enterPickerMenuFullscreen(){const e=this.pickerField.value;if(!e)return null;const t=y().width;if(!this.hasAttribute("data-picker-menu-fullscreen")){const c=this.getBoundingClientRect(),f=Number.isFinite(c.width)?c.width:0;this.fullscreenPlaceholderEntryInlineSize=Math.max(f,0),this.setAttribute("data-picker-menu-fullscreen",""),e.setAttribute("data-picker-menu-fullscreen-surface",""),e.setAttribute("popover","manual");try{e.matches(":popover-open")||e.showPopover()}catch{return e.removeAttribute("popover"),e.removeAttribute("data-picker-menu-fullscreen-surface"),this.removeAttribute("data-picker-menu-fullscreen"),this.fullscreenPlaceholderEntryInlineSize=0,null}this.fullscreenPlaceholderContentSized=!(this.getBoundingClientRect().width>0),g.lock(this,{preserveScrollPosition:!0}),this.popoverCtrl.refreshPositionElements()}const o=e.getBoundingClientRect(),i=o.height;let n;if(this.fullscreenPlaceholderContentSized)n=Math.min(this.fullscreenPlaceholderEntryInlineSize,t);else{const c=this.getBoundingClientRect().width;n=Number.isFinite(c)?Math.min(Math.max(c,0),t):this.fullscreenPlaceholderInlineSize}const h=n!==this.fullscreenPlaceholderInlineSize||t!==this.fullscreenPlaceholderViewportWidth||i!==this.fullscreenPlaceholderFieldHeight;if(h){const f=["inline-size","box-sizing","padding","margin","overflow"].map(p=>({name:p,value:e.style.getPropertyValue(p),priority:e.style.getPropertyPriority(p)}));this.removeAttribute("data-picker-menu-fullscreen"),e.style.setProperty("inline-size",`${n}px`),e.style.setProperty("box-sizing","border-box"),e.style.setProperty("padding","0"),e.style.setProperty("margin","0"),e.style.setProperty("overflow","visible");const k=e.getBoundingClientRect().height;this.setAttribute("data-picker-menu-fullscreen","");for(const{name:p,value:v,priority:b}of f)v?e.style.setProperty(p,v,b):e.style.removeProperty(p);this.fullscreenPlaceholderInlineSize=n,this.fullscreenPlaceholderViewportWidth=t,this.fullscreenPlaceholderFieldHeight=i,this.style.setProperty("--_esp-picker-fullscreen-placeholder-block-size",`${k}px`),this.fullscreenPlaceholderContentSized?this.style.setProperty("--_esp-picker-fullscreen-placeholder-inline-size",`${n}px`):this.style.removeProperty("--_esp-picker-fullscreen-placeholder-inline-size")}return h?e.getBoundingClientRect():o}exitPickerMenuFullscreen(){const e=this.hasAttribute("data-picker-menu-fullscreen"),t=this.pickerField.value;if(t?.matches(":popover-open"))try{t.hidePopover()}catch{}t?.removeAttribute("popover"),t?.removeAttribute("data-picker-menu-fullscreen-surface"),this.removeAttribute("data-picker-menu-fullscreen"),this.style.removeProperty("--_esp-picker-fullscreen-placeholder-block-size"),this.style.removeProperty("--_esp-picker-fullscreen-placeholder-inline-size"),this.fullscreenPlaceholderInlineSize=0,this.fullscreenPlaceholderViewportWidth=0,this.fullscreenPlaceholderFieldHeight=0,this.fullscreenPlaceholderEntryInlineSize=0,this.fullscreenPlaceholderContentSized=!1,g.unlock(this),e&&this.popoverCtrl.refreshPositionElements()}pickerMenuIsOpen(){return this.showOptions}disconnectedCallback(){this.showOptions=!1,this.exitPickerMenuFullscreen(),super.disconnectedCallback()}handleSharedPickerKeydown(e){switch(e.key){case" ":return this.typeahead||(this.showOptions=!this.showOptions),!0;case"Tab":return this.showOptions&&(this.showOptions=!1),this.typeahead&&this.resetTypeaheadInput(),!0;case"Escape":return this.closeAndResetTypeahead(),!0;default:return!1}}handleMenuNavigationKey(e,t){if(t.preventDefault(),!this.showOptions){this.showOptions=!0;return}this.pickerMenu.value?.doKeyboardNav(e),this.updateActiveDescendant()}get menuItems(){return this.typeahead?this.filteredItems:this.pickerItems}focus(){this.theInput.value?.focus()}setFormItemDescription(e){this.formItemDescription.setDescription(e)}setFormItemLabel(e){this.formItemDescription.setLabel(e)}validate(){this.formCtrl.validate()}checkValidity(){return this.formCtrl.checkValidity()}updateActiveDescendant(){const e=this.theInput.value;if(!e||!this.pickerMenu.value)return;const t=this.pickerMenu.value.getHighlightedElement();e.ariaActiveDescendantElement=t}clearActiveDescendant(){const e=this.theInput.value;e&&(e.ariaActiveDescendantElement=null)}_scrollToContainPopover(){const e=this.pickerMenu.value;e&&(this._containRepositionFrame!==null&&cancelAnimationFrame(this._containRepositionFrame),this._containRepositionFrame=S(this,e,()=>{this._containRepositionFrame=null,this.showOptions&&this.pickerMenu.value?.updatePosition(this)}))}syncSelectionFromItems(e){}willUpdate(e){super.willUpdate(e),this.syncSelectionFromItems(e),this.typeahead&&((e.has("pickerItems")||e.has("typeahead"))&&this.typeaheadCtrl.setAllItems(this.pickerItems),(e.has("fetchItems")||e.has("typeahead"))&&this.typeaheadCtrl.setFetchItems(this.fetchItems),(e.has("debounceMs")||e.has("typeahead"))&&this.debounceMs!==void 0&&this.typeaheadCtrl.setDebounceMs(this.debounceMs))}updated(e){super.updated(e),e.has("width")&&(this.width?this.style.width=this.width:this.style.removeProperty("width"))}firstUpdated(e){super.firstUpdated(e);const t=this.theInput.value;if(t&&(t.role="combobox",t.ariaHasPopup="listbox",t.ariaExpanded="false",t.ariaAutoComplete=this.typeahead?"list":"none",this.pickerMenu.value)){const o=t;o.ariaControlsElements=[this.pickerMenu.value]}const r=this.itemsSlot.value;r&&(this.extractSlotItems(r),r.addEventListener("slotchange",()=>this.extractSlotItems(r)))}extractSlotItems(e){this._slotExtractPending||(this._slotExtractPending=!0,queueMicrotask(()=>{this._slotExtractPending=!1;const t=e.assignedElements();if(t.length===0)return;const r=[];for(const o of t){if(!(o instanceof I))throw new Error(`Picker items must be of type esp-picker-item, but got <${o.tagName.toLowerCase()}>`);const i=o,n=Array.from(i.childNodes),h=n.length>0?n.map(c=>c.cloneNode(!0)):void 0;r.push({text:i.text||i.getAttribute("text")||i.textContent?.trim()||"",value:i.value||i.getAttribute("value")||"",selected:i.selected||i.hasAttribute("selected"),icon:i.icon||i.getAttribute("icon")||"",styles:i.styles,slotNodes:h})}this.pickerItems=r;for(const o of t)o.remove()}))}}s.formAssociated=!0,s.KEYBOARD_THRESHOLD=150,s.pickerFieldStyles=[...E(".esp-field > .picker-mobile-dismiss"),P`
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

      @media ${R(z)} {
        
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
    `],l([d()],s.prototype,"showOptions",null),l([d()],s.prototype,"typeaheadLoading",void 0),l([d()],s.prototype,"filteredItems",void 0),l([d()],s.prototype,"inputFocused",void 0),l([a({type:Boolean,reflect:!0})],s.prototype,"typeahead",void 0),l([a({attribute:!1})],s.prototype,"fetchItems",void 0),l([a({type:Number,attribute:"debounce-ms"})],s.prototype,"debounceMs",void 0),l([a({type:String,reflect:!0})],s.prototype,"name",void 0),l([a({type:Boolean,reflect:!0})],s.prototype,"required",void 0),l([a({attribute:"required-message"})],s.prototype,"requiredMessage",void 0),l([a({type:Boolean,reflect:!0})],s.prototype,"disabled",void 0),l([a({type:Array})],s.prototype,"pickerItems",void 0),l([a({type:String})],s.prototype,"placeholder",void 0),l([a({type:String})],s.prototype,"width",void 0);export{s as EspalierPickerBase};
