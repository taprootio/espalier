var u=function(h,t,i,e){var s=arguments.length,l=s<3?t:e===null?e=Object.getOwnPropertyDescriptor(t,i):e,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(h,t,i,e);else for(var n=h.length-1;n>=0;n--)(o=h[n])&&(l=(s<3?o(l):s>3?o(t,i,l):o(t,i))||l);return s>3&&l&&Object.defineProperty(t,i,l),l};import{css as d,html as m}from"lit";import{customElement as f,property as I,state as y}from"lit/decorators.js";import{classMap as k}from"lit/directives/class-map.js";import{ref as a}from"lit/directives/ref.js";import"./esp-picker-item.js";import"./esp-picker-menu.js";import{samePickerItemDisplay as v}from"./esp-picker-item.js";import{EspalierElementBase as g}from"../shared/esp-element-base.js";import{styleMap as $}from"lit/directives/style-map.js";import{caretUpDown as P}from"../shared/svgs/caret-up-down.js";import{filter as w}from"../shared/svgs/filter.js";import{EspalierPickerBase as p}from"./esp-picker-base.js";import{PickOneSelection as r}from"./pick-one-selection.js";let c=class extends p{constructor(){super(...arguments),this.selection=r.empty(),this.suppressAutoSelect=!1}get selectedItem(){return this.selection.item}decorateFilteredItems(t){if(!this.selectedItem)return t.map(e=>({...e}));const i=this.selectedItem.value;return t.map(e=>({...e,selected:e.value===i}))}get typeaheadRestoreText(){return this.selectedItem?.text??""}get preservesRemoteResultsOnReset(){return this.typeaheadIsRemote&&this.selectedItem!==void 0}get value(){return this.selectedItem?.value}set value(t){const i=this.pickerItems??[];for(const s of i)s.selected=s.value===t;const e=this.pickerMenu.value?.pickerItems;if(e&&e!==i)for(const s of e)s.selected=s.value===t;this.selection=r.resolve(i,t),this.formCtrl.syncValue()}getPickerFormValue(){return this.selectedItem?.value??null}getPickerValidity(){return this.required&&!this.selectedItem?{flags:{valueMissing:!0},message:this.requiredMessage||"Please select an option."}:null}handlePickerReset(){this.selection=r.empty()}handlePickerRestore(t){this.value=t}syncSelectionFromItems(t){if(!t.has("pickerItems"))return;if(this.selection.hasPending){this.value=this.selection.pending;return}if(!this.selectedItem){const e=this.pickerItems.find(s=>s.selected);e&&(this.selection=r.of(e));return}const i=this.pickerItems.find(e=>e.value===this.selectedItem.value);i&&i!==this.selectedItem&&!v(i,this.selectedItem)&&(this.selection=r.of(i))}render(){const{showOptions:t}=this,i={"esp-field":!0,"show-options":t};return m`
      <div
        ${a(this.pickerField)}
        tabindex="-1"
        class=${k(i)}
        @click=${e=>{if(this.hasAttribute("data-picker-menu-fullscreen")&&this.theInput.value&&e.composedPath().includes(this.theInput.value)){e.stopPropagation();return}this.typeahead&&!this.showOptions&&(this.suppressAutoSelect=!0),this.theInput.value?.focus(),this.showOptions?this.closeAndResetTypeahead():this.showOptions=!0,e.stopPropagation()}}
      >
        <section>
          <input
            ${a(this.theInput)}
            class="esp-input"
            value=${this.selectedItem?.text??""}
            style=${$(this.selectedItem?.styles??{})}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?readonly=${!this.typeahead}
            @input=${this.handleTypeaheadInput}
            @focus=${()=>{this.inputFocused=!0,this.typeahead&&!this.suppressAutoSelect&&this.theInput.value?.select(),this.suppressAutoSelect=!1}}
            @blur=${this.handleInputBlur}
            @keydown=${e=>{if(this.pickerMenu.value&&!this.handleSharedPickerKeydown(e))switch(e.key){case"ArrowDown":case"ArrowUp":case"Enter":case"Home":case"End":this.handleMenuNavigationKey(e.key,e);break}}}
          />
        </section>
        <label>${this.typeahead&&this.inputFocused?w:P}</label>
        ${this.renderPickerMenuDismissButton()}

        <esp-picker-menu
          .pickerItems=${this.menuItems}
          .loading=${this.typeaheadLoading}
          .emptyMessage=${this.typeahead?"No matches":""}
          .label=${this.placeholder}
          tabindex="-1"
          ${a(this.pickerMenu)}
          @esp-picker-menu-selection-changed=${e=>{if(e.stopPropagation(),this.typeahead)return;const s=e.detail,l=s.length>0?s[0]:void 0;if(!(s.length>0?this.selectedItem!==l:this.selectedItem!==void 0))return;const n=this.pickerMenu.value?.isVisitorPick===!0;this.selection=n?r.of(l):this.selection.withProvisionalItem(l),n?(this.formCtrl.syncValue(),this.emitValueChanged(this.selectedItem)):this.formCtrl.syncValueSilently()}}
          @esp-picker-menu-close-requested=${e=>{if(this.showOptions=!1,this.clearActiveDescendant(),this.typeahead){const s=e.detail,l=s.length>0?s[0]:void 0;if(l?this.selectedItem?.value!==l.value:this.selectedItem!==void 0){if(this.selection=r.of(l),l)for(const n of this.pickerItems)n.selected=n.value===l.value;this.formCtrl.syncValue(),this.emitValueChanged(this.selectedItem)}this.suppressAutoSelect=!0,this.theInput.value?.focus(),this.resetTypeaheadInput()}else this.theInput.value?.focus()}}
          @esp-picker-menu-dismiss-requested=${this.handleMenuDismissRequested}
        >
        </esp-picker-menu>
      </div>
      <slot ${a(this.itemsSlot)}></slot>
    `}};c.styles=[...g.styles,...p.pickerFieldStyles,d`
      .esp-field input.esp-input {
        width: 0;
        flex-grow: 1;
      }
    `],u([y()],c.prototype,"selection",void 0),u([I({type:String})],c.prototype,"value",null),c=u([f("esp-pick-one")],c);export{c as EspalierPickOne};
