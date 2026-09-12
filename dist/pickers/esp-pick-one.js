var u=function(h,t,i,e){var s=arguments.length,n=s<3?t:e===null?e=Object.getOwnPropertyDescriptor(t,i):e,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(h,t,i,e);else for(var r=h.length-1;r>=0;r--)(o=h[r])&&(n=(s<3?o(n):s>3?o(t,i,n):o(t,i))||n);return s>3&&n&&Object.defineProperty(t,i,n),n};import{css as d,html as m}from"lit";import{customElement as f,property as I,state as y}from"lit/decorators.js";import{classMap as k}from"lit/directives/class-map.js";import{ref as a}from"lit/directives/ref.js";import"./esp-picker-item.js";import"./esp-picker-menu.js";import{EspalierElementBase as g}from"../shared/esp-element-base.js";import{styleMap as P}from"lit/directives/style-map.js";import{caretUpDown as v}from"../shared/svgs/caret-up-down.js";import{filter as w}from"../shared/svgs/filter.js";import{EspalierPickerBase as p}from"./esp-picker-base.js";import{PickOneSelection as l}from"./pick-one-selection.js";let c=class extends p{constructor(){super(...arguments),this.selection=l.empty(),this.suppressAutoSelect=!1,this.lastMenuPointSelectionAt=Number.NEGATIVE_INFINITY,this.suppressNextHostClick=!1,this.handleHostPointerDown=t=>{this.selectOpenMenuAtPoint(t)&&(this.lastMenuPointSelectionAt=performance.now())},this.handleHostMouseDown=t=>{if(performance.now()-this.lastMenuPointSelectionAt<500){t.preventDefault(),t.stopPropagation();return}this.selectOpenMenuAtPoint(t)}}get selectedItem(){return this.selection.item}decorateFilteredItems(t){if(!this.selectedItem)return t.map(e=>({...e}));const i=this.selectedItem.value;return t.map(e=>({...e,selected:e.value===i}))}get typeaheadRestoreText(){return this.selectedItem?.text??""}get preservesRemoteResultsOnReset(){return this.typeaheadIsRemote&&this.selectedItem!==void 0}get value(){return this.selectedItem?.value}set value(t){const i=this.pickerItems??[];for(const s of i)s.selected=s.value===t;const e=this.pickerMenu.value?.pickerItems;if(e&&e!==i)for(const s of e)s.selected=s.value===t;this.selection=l.resolve(i,t),this.formCtrl.syncValue()}getPickerFormValue(){return this.selectedItem?.value??null}getPickerValidity(){return this.required&&!this.selectedItem?{flags:{valueMissing:!0},message:this.requiredMessage||"Please select an option."}:null}handlePickerReset(){this.selection=l.empty()}handlePickerRestore(t){this.value=t}syncSelectionFromItems(t){if(!t.has("pickerItems"))return;if(this.selection.hasPending){this.value=this.selection.pending;return}if(!this.selectedItem){const e=this.pickerItems.find(s=>s.selected);e&&(this.selection=l.of(e));return}const i=this.pickerItems.find(e=>e.value===this.selectedItem.value);i&&i!==this.selectedItem&&(this.selection=l.of(i))}selectOpenMenuAtPoint(t){return!this.showOptions||!(this.pickerMenu.value?.selectItemAtPoint(t.clientX,t.clientY)??!1)?!1:(this.suppressNextHostClick=!0,t.preventDefault(),t.stopPropagation(),!0)}render(){const{showOptions:t}=this,i={"esp-field":!0,"show-options":t};return m`
      <div
        ${a(this.pickerField)}
        tabindex="-1"
        class=${k(i)}
        @pointerdown=${this.handleHostPointerDown}
        @mousedown=${this.handleHostMouseDown}
        @click=${e=>{if(this.suppressNextHostClick){this.suppressNextHostClick=!1,e.preventDefault(),e.stopPropagation();return}if(this.hasAttribute("data-picker-menu-fullscreen")&&this.theInput.value&&e.composedPath().includes(this.theInput.value)){e.stopPropagation();return}this.typeahead&&!this.showOptions&&(this.suppressAutoSelect=!0),this.theInput.value?.focus(),this.showOptions?this.closeAndResetTypeahead():this.showOptions=!0,e.stopPropagation()}}
      >
        <section>
          <input
            ${a(this.theInput)}
            class="esp-input"
            value=${this.selectedItem?.text??""}
            style=${P(this.selectedItem?.styles??{})}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?readonly=${!this.typeahead}
            @input=${this.handleTypeaheadInput}
            @focus=${()=>{this.inputFocused=!0,this.typeahead&&!this.suppressAutoSelect&&this.theInput.value?.select(),this.suppressAutoSelect=!1}}
            @blur=${this.handleInputBlur}
            @keydown=${e=>{if(this.pickerMenu.value&&!this.handleSharedPickerKeydown(e))switch(e.key){case"ArrowDown":case"ArrowUp":case"Enter":case"Home":case"End":this.handleMenuNavigationKey(e.key,e);break}}}
          />
        </section>
        <label>${this.typeahead&&this.inputFocused?w:v}</label>
        ${this.renderPickerMenuDismissButton()}

        <esp-picker-menu
          .pickerItems=${this.menuItems}
          .loading=${this.typeaheadLoading}
          .emptyMessage=${this.typeahead?"No matches":""}
          .label=${this.placeholder}
          tabindex="-1"
          ${a(this.pickerMenu)}
          @esp-picker-menu-selection-changed=${e=>{if(e.stopPropagation(),this.typeahead)return;const s=e.detail,n=s.length>0?s[0]:void 0;(s.length>0?this.selectedItem!==n:this.selectedItem!==void 0)&&(this.selection=this.showOptions?l.of(n):this.selection.withProvisionalItem(n),this.formCtrl.syncValue(),this.emitValueChanged(this.selectedItem))}}
          @esp-picker-menu-close-requested=${e=>{if(this.showOptions=!1,this.clearActiveDescendant(),this.typeahead){const s=e.detail,n=s.length>0?s[0]:void 0;if(n?this.selectedItem?.value!==n.value:this.selectedItem!==void 0){if(this.selection=l.of(n),n)for(const r of this.pickerItems)r.selected=r.value===n.value;this.formCtrl.syncValue(),this.emitValueChanged(this.selectedItem)}this.suppressAutoSelect=!0,this.theInput.value?.focus(),this.resetTypeaheadInput()}else this.theInput.value?.focus()}}
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
