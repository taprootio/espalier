var u=function(a,t,s,e){var i=arguments.length,n=i<3?t:e===null?e=Object.getOwnPropertyDescriptor(t,s):e,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(a,t,s,e);else for(var l=a.length-1;l>=0;l--)(o=a[l])&&(n=(i<3?o(n):i>3?o(t,s,n):o(t,s))||n);return i>3&&n&&Object.defineProperty(t,s,n),n};import{css as d,html as m}from"lit";import{customElement as f,property as I,state as y}from"lit/decorators.js";import{classMap as k}from"lit/directives/class-map.js";import{ref as h}from"lit/directives/ref.js";import"./esp-picker-item.js";import"./esp-picker-menu.js";import{samePickerItemDisplay as g}from"./esp-picker-item.js";import{EspalierElementBase as P}from"../shared/esp-element-base.js";import{styleMap as v}from"lit/directives/style-map.js";import{caretUpDown as w}from"../shared/svgs/caret-up-down.js";import{filter as $}from"../shared/svgs/filter.js";import{EspalierPickerBase as p}from"./esp-picker-base.js";import{PickOneSelection as r}from"./pick-one-selection.js";let c=class extends p{constructor(){super(...arguments),this.selection=r.empty(),this.suppressAutoSelect=!1,this.lastMenuPointSelectionAt=Number.NEGATIVE_INFINITY,this.suppressNextHostClick=!1,this.handleHostPointerDown=t=>{this.selectOpenMenuAtPoint(t)&&(this.lastMenuPointSelectionAt=performance.now())},this.handleHostMouseDown=t=>{if(performance.now()-this.lastMenuPointSelectionAt<500){t.preventDefault(),t.stopPropagation();return}this.selectOpenMenuAtPoint(t)}}get selectedItem(){return this.selection.item}decorateFilteredItems(t){if(!this.selectedItem)return t.map(e=>({...e}));const s=this.selectedItem.value;return t.map(e=>({...e,selected:e.value===s}))}get typeaheadRestoreText(){return this.selectedItem?.text??""}get preservesRemoteResultsOnReset(){return this.typeaheadIsRemote&&this.selectedItem!==void 0}get value(){return this.selectedItem?.value}set value(t){const s=this.pickerItems??[];for(const i of s)i.selected=i.value===t;const e=this.pickerMenu.value?.pickerItems;if(e&&e!==s)for(const i of e)i.selected=i.value===t;this.selection=r.resolve(s,t),this.formCtrl.syncValue()}getPickerFormValue(){return this.selectedItem?.value??null}getPickerValidity(){return this.required&&!this.selectedItem?{flags:{valueMissing:!0},message:this.requiredMessage||"Please select an option."}:null}handlePickerReset(){this.selection=r.empty()}handlePickerRestore(t){this.value=t}syncSelectionFromItems(t){if(!t.has("pickerItems"))return;if(this.selection.hasPending){this.value=this.selection.pending;return}if(!this.selectedItem){const e=this.pickerItems.find(i=>i.selected);e&&(this.selection=r.of(e));return}const s=this.pickerItems.find(e=>e.value===this.selectedItem.value);s&&s!==this.selectedItem&&!g(s,this.selectedItem)&&(this.selection=r.of(s))}selectOpenMenuAtPoint(t){return!this.showOptions||!(this.pickerMenu.value?.selectItemAtPoint(t.clientX,t.clientY)??!1)?!1:(this.suppressNextHostClick=!0,t.preventDefault(),t.stopPropagation(),!0)}render(){const{showOptions:t}=this,s={"esp-field":!0,"show-options":t};return m`
      <div
        ${h(this.pickerField)}
        tabindex="-1"
        class=${k(s)}
        @pointerdown=${this.handleHostPointerDown}
        @mousedown=${this.handleHostMouseDown}
        @click=${e=>{if(this.suppressNextHostClick){this.suppressNextHostClick=!1,e.preventDefault(),e.stopPropagation();return}if(this.hasAttribute("data-picker-menu-fullscreen")&&this.theInput.value&&e.composedPath().includes(this.theInput.value)){e.stopPropagation();return}this.typeahead&&!this.showOptions&&(this.suppressAutoSelect=!0),this.theInput.value?.focus(),this.showOptions?this.closeAndResetTypeahead():this.showOptions=!0,e.stopPropagation()}}
      >
        <section>
          <input
            ${h(this.theInput)}
            class="esp-input"
            value=${this.selectedItem?.text??""}
            style=${v(this.selectedItem?.styles??{})}
            placeholder=${this.placeholder}
            ?disabled=${this.disabled}
            ?readonly=${!this.typeahead}
            @input=${this.handleTypeaheadInput}
            @focus=${()=>{this.inputFocused=!0,this.typeahead&&!this.suppressAutoSelect&&this.theInput.value?.select(),this.suppressAutoSelect=!1}}
            @blur=${this.handleInputBlur}
            @keydown=${e=>{if(this.pickerMenu.value&&!this.handleSharedPickerKeydown(e))switch(e.key){case"ArrowDown":case"ArrowUp":case"Enter":case"Home":case"End":this.handleMenuNavigationKey(e.key,e);break}}}
          />
        </section>
        <label>${this.typeahead&&this.inputFocused?$:w}</label>
        ${this.renderPickerMenuDismissButton()}

        <esp-picker-menu
          .pickerItems=${this.menuItems}
          .loading=${this.typeaheadLoading}
          .emptyMessage=${this.typeahead?"No matches":""}
          .label=${this.placeholder}
          tabindex="-1"
          ${h(this.pickerMenu)}
          @esp-picker-menu-selection-changed=${e=>{if(e.stopPropagation(),this.typeahead)return;const i=e.detail,n=i.length>0?i[0]:void 0;if(!(i.length>0?this.selectedItem!==n:this.selectedItem!==void 0))return;const l=this.pickerMenu.value?.isVisitorPick===!0;this.selection=l?r.of(n):this.selection.withProvisionalItem(n),l?(this.formCtrl.syncValue(),this.emitValueChanged(this.selectedItem)):this.formCtrl.syncValueSilently()}}
          @esp-picker-menu-close-requested=${e=>{if(this.showOptions=!1,this.clearActiveDescendant(),this.typeahead){const i=e.detail,n=i.length>0?i[0]:void 0;if(n?this.selectedItem?.value!==n.value:this.selectedItem!==void 0){if(this.selection=r.of(n),n)for(const l of this.pickerItems)l.selected=l.value===n.value;this.formCtrl.syncValue(),this.emitValueChanged(this.selectedItem)}this.suppressAutoSelect=!0,this.theInput.value?.focus(),this.resetTypeaheadInput()}else this.theInput.value?.focus()}}
          @esp-picker-menu-dismiss-requested=${this.handleMenuDismissRequested}
        >
        </esp-picker-menu>
      </div>
      <slot ${h(this.itemsSlot)}></slot>
    `}};c.styles=[...P.styles,...p.pickerFieldStyles,d`
      .esp-field input.esp-input {
        width: 0;
        flex-grow: 1;
      }
    `],u([y()],c.prototype,"selection",void 0),u([I({type:String})],c.prototype,"value",null),c=u([f("esp-pick-one")],c);export{c as EspalierPickOne};
