var h=function(l,e,i,t){var s=arguments.length,a=s<3?e:t===null?t=Object.getOwnPropertyDescriptor(e,i):t,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(l,e,i,t);else for(var u=l.length-1;u>=0;u--)(o=l[u])&&(a=(s<3?o(a):s>3?o(e,i,a):o(e,i))||a);return s>3&&a&&Object.defineProperty(e,i,a),a};import{css as c,html as f}from"lit";import{customElement as m,property as p,state as r}from"lit/decorators.js";import{classMap as y}from"lit/directives/class-map.js";import{ref as d}from"lit/directives/ref.js";import"./esp-picker-item.js";import"./esp-picker-menu.js";import{EspalierElementBase as I}from"../shared/esp-element-base.js";import{styleMap as w}from"lit/directives/style-map.js";import{caretUpDown as v}from"../shared/svgs/caret-up-down.js";import{filter as g}from"../shared/svgs/filter.js";import{EspalierPickerBase as b}from"./esp-picker-base.js";import{TypeaheadController as O}from"./typeahead-controller.js";let n=class extends b{constructor(){super(...arguments),this.typeaheadLoading=!1,this.filteredItems=[],this.inputFocused=!1,this.suppressAutoSelect=!1,this.lastMenuPointSelectionAt=Number.NEGATIVE_INFINITY,this.suppressNextHostClick=!1,this.typeaheadCtrl=new O({host:this,onFilteredItemsChanged:e=>{if(this.selectedItem){const i=this.selectedItem.value;this.filteredItems=e.map(t=>({...t,selected:t.value===i}))}else this.filteredItems=e.map(i=>({...i}))},onLoadingChanged:e=>{this.typeaheadLoading=e}}),this._hasPendingValue=!1,this.typeahead=!1,this.fetchItems=null,this.debounceMs=void 0,this.handleHostPointerDown=e=>{this.selectOpenMenuAtPoint(e)&&(this.lastMenuPointSelectionAt=performance.now())},this.handleHostMouseDown=e=>{if(performance.now()-this.lastMenuPointSelectionAt<500){e.preventDefault(),e.stopPropagation();return}this.selectOpenMenuAtPoint(e)}}get value(){return this.selectedItem?.value}set value(e){const i=this.pickerItems??[];for(const a of i)a.selected=a.value===e;const t=this.pickerMenu.value?.pickerItems;if(t&&t!==i)for(const a of t)a.selected=a.value===e;const s=i.find(a=>a.selected);this.selectedItem=s,s?(this._hasPendingValue=!1,this._pendingValue=void 0):(this._hasPendingValue=!0,this._pendingValue=e),this.formCtrl.syncValue()}getPickerFormValue(){return this.selectedItem?.value??null}getPickerValidity(){return this.required&&!this.selectedItem?{flags:{valueMissing:!0},message:this.requiredMessage||"Please select an option."}:null}handlePickerReset(){this.selectedItem=void 0,this._hasPendingValue=!1,this._pendingValue=void 0}handlePickerRestore(e){this.value=e}set showOptions(e){const i=this.showOptions;super.showOptions=e,e&&!i&&this.typeahead&&this.typeaheadCtrl.isRemote&&this.filteredItems.length===0&&this.typeaheadCtrl.fetchInitial()}get showOptions(){return super.showOptions}willUpdate(e){if(super.willUpdate(e),e.has("pickerItems")){if(this._hasPendingValue)this.value=this._pendingValue;else if(!this.selectedItem){const i=this.pickerItems.find(t=>t.selected);i&&(this.selectedItem=i)}}this.typeahead&&((e.has("pickerItems")||e.has("typeahead"))&&this.typeaheadCtrl.setAllItems(this.pickerItems),(e.has("fetchItems")||e.has("typeahead"))&&this.typeaheadCtrl.setFetchItems(this.fetchItems),(e.has("debounceMs")||e.has("typeahead"))&&this.debounceMs!==void 0&&this.typeaheadCtrl.setDebounceMs(this.debounceMs))}firstUpdated(e){if(super.firstUpdated(e),this.typeahead){const i=this.theInput.value;i&&(i.ariaAutoComplete="list")}}resetTypeaheadInput(){const e=this.theInput.value;e&&(e.value=this.selectedItem?.text??""),this.typeaheadCtrl.isRemote&&this.selectedItem?this.typeaheadCtrl.resetQuery():this.typeaheadCtrl.clearQuery()}selectOpenMenuAtPoint(e){return!this.showOptions||!(this.pickerMenu.value?.selectItemAtPoint(e.clientX,e.clientY)??!1)?!1:(this.suppressNextHostClick=!0,e.preventDefault(),e.stopPropagation(),!0)}render(){const{showOptions:e}=this;return f`
      <div
        tabindex="-1"
        class=${y({"esp-field":!0,"show-options":e})}
        @pointerdown=${this.handleHostPointerDown}
        @mousedown=${this.handleHostMouseDown}
        @click=${t=>{if(this.suppressNextHostClick){this.suppressNextHostClick=!1,t.preventDefault(),t.stopPropagation();return}this.typeahead&&!this.showOptions&&(this.suppressAutoSelect=!0),this.theInput.value?.focus(),this.showOptions=!this.showOptions,t.stopPropagation()}}
      >
        <section>
          <input
            ${d(this.theInput)}
            class="esp-input"
            value=${this.selectedItem?.text??""}
            style=${w(this.selectedItem?.styles??{})}
            placeholder=${this.placeholder}
            ?readonly=${!this.typeahead}
            @input=${t=>{if(!this.typeahead)return;const s=t.target;this.typeaheadCtrl.setQuery(s.value),this.showOptions||(this.showOptions=!0)}}
            @focus=${()=>{this.inputFocused=!0,this.typeahead&&!this.suppressAutoSelect&&this.theInput.value?.select(),this.suppressAutoSelect=!1}}
            @blur=${t=>{this.inputFocused=!1;const s=t.relatedTarget;if(!(s&&(this.contains(s)||this.shadowRoot?.contains(s)))){if(!s&&this.showOptions){requestAnimationFrame(()=>{this.showOptions&&this.shadowRoot?.activeElement!==this.theInput.value&&(this.showOptions=!1,this.typeahead&&this.resetTypeaheadInput())});return}this.showOptions=!1,this.typeahead&&this.resetTypeaheadInput()}}}
            @keydown=${t=>{if(this.pickerMenu.value)switch(t.key){case" ":this.typeahead||(this.showOptions=!this.showOptions);break;case"ArrowDown":case"ArrowUp":case"Enter":case"Home":case"End":t.preventDefault(),this.showOptions?(this.pickerMenu.value.doKeyboardNav(t.key),this.updateActiveDescendant()):this.showOptions=!0;break;case"Tab":this.showOptions&&(this.showOptions=!1),this.typeahead&&this.resetTypeaheadInput();break;case"Escape":this.showOptions=!1,this.typeahead&&this.resetTypeaheadInput();break}}}
          />
        </section>
        <label>${this.typeahead&&this.inputFocused?g:v}</label>

        <esp-picker-menu
          .pickerItems=${this.typeahead?this.filteredItems:this.pickerItems}
          .loading=${this.typeaheadLoading}
          .emptyMessage=${this.typeahead?"No matches":""}
          .label=${this.placeholder}
          tabindex="-1"
          ${d(this.pickerMenu)}
          @selection-changed=${t=>{if(t.stopPropagation(),this.typeahead)return;const s=t.detail;let a=!1;s.length>0&&this.selectedItem!==s[0]&&(this.selectedItem=s[0],a=!0),s.length===0&&this.selectedItem&&(this.selectedItem=void 0,a=!0),a&&(this.showOptions&&(this._hasPendingValue=!1,this._pendingValue=void 0),this.formCtrl.syncValue(),this.dispatchEvent(new CustomEvent("value-changed",{detail:this.selectedItem,bubbles:!0,composed:!0})))}}
          @close-menu=${t=>{if(this.showOptions=!1,this.clearActiveDescendant(),this.typeahead){const s=t.detail;if(s.length>0&&this.selectedItem?.value!==s[0].value){this.selectedItem=s[0];const a=this.selectedItem.value;for(const o of this.pickerItems)o.selected=o.value===a;this._hasPendingValue=!1,this._pendingValue=void 0,this.formCtrl.syncValue(),this.dispatchEvent(new CustomEvent("value-changed",{detail:this.selectedItem,bubbles:!0,composed:!0}))}else s.length===0&&this.selectedItem&&(this.selectedItem=void 0,this._hasPendingValue=!1,this._pendingValue=void 0,this.formCtrl.syncValue(),this.dispatchEvent(new CustomEvent("value-changed",{detail:this.selectedItem,bubbles:!0,composed:!0})));this.suppressAutoSelect=!0,this.theInput.value?.focus(),this.resetTypeaheadInput()}else this.theInput.value?.focus()}}
        >
        </esp-picker-menu>
      </div>
      <slot ${d(this.itemsSlot)}></slot>
    `}};n.styles=[...I.styles,c`
      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }

      .esp-field {
        display: grid;
        grid-template-columns: auto min-content;
        position: relative;

        & input.esp-input {
          width: 0;
          flex-grow: 1;
        }

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
    `],h([r()],n.prototype,"selectedItem",void 0),h([r()],n.prototype,"typeaheadLoading",void 0),h([r()],n.prototype,"filteredItems",void 0),h([r()],n.prototype,"inputFocused",void 0),h([p({type:String})],n.prototype,"value",null),h([p({type:Boolean,reflect:!0})],n.prototype,"typeahead",void 0),h([p({attribute:!1})],n.prototype,"fetchItems",void 0),h([p({type:Number,attribute:"debounce-ms"})],n.prototype,"debounceMs",void 0),n=h([m("esp-pick-one")],n);export{n as EspalierPickOne};
