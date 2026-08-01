var h=function(a,e,n,t){var i=arguments.length,s=i<3?e:t===null?t=Object.getOwnPropertyDescriptor(e,n):t,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(a,e,n,t);else for(var l=a.length-1;l>=0;l--)(o=a[l])&&(s=(i<3?o(s):i>3?o(e,n,s):o(e,n))||s);return i>3&&s&&Object.defineProperty(e,n,s),s};import{css as d,html as m}from"lit";import{customElement as f,property as I,state as y}from"lit/decorators.js";import{classMap as g}from"lit/directives/class-map.js";import{ref as p}from"lit/directives/ref.js";import"./esp-picker-item.js";import"./esp-picker-menu.js";import{EspalierElementBase as k}from"../shared/esp-element-base.js";import{styleMap as P}from"lit/directives/style-map.js";import{caretUpDown as w}from"../shared/svgs/caret-up-down.js";import{filter as v}from"../shared/svgs/filter.js";import{EspalierPickerBase as u}from"./esp-picker-base.js";import{PickOneSelection as r}from"./pick-one-selection.js";let c=class extends u{constructor(){super(...arguments),this.selection=r.empty(),this.suppressAutoSelect=!1,this.lastMenuPointSelectionAt=Number.NEGATIVE_INFINITY,this.suppressNextHostClick=!1,this.handleHostPointerDown=e=>{this.selectOpenMenuAtPoint(e)&&(this.lastMenuPointSelectionAt=performance.now())},this.handleHostMouseDown=e=>{if(performance.now()-this.lastMenuPointSelectionAt<500){e.preventDefault(),e.stopPropagation();return}this.selectOpenMenuAtPoint(e)}}get selectedItem(){return this.selection.item}decorateFilteredItems(e){if(!this.selectedItem)return e.map(t=>({...t}));const n=this.selectedItem.value;return e.map(t=>({...t,selected:t.value===n}))}get typeaheadRestoreText(){return this.selectedItem?.text??""}get preservesRemoteResultsOnReset(){return this.typeaheadIsRemote&&this.selectedItem!==void 0}get value(){return this.selectedItem?.value}set value(e){const n=this.pickerItems??[];for(const i of n)i.selected=i.value===e;const t=this.pickerMenu.value?.pickerItems;if(t&&t!==n)for(const i of t)i.selected=i.value===e;this.selection=r.resolve(n,e),this.formCtrl.syncValue()}getPickerFormValue(){return this.selectedItem?.value??null}getPickerValidity(){return this.required&&!this.selectedItem?{flags:{valueMissing:!0},message:this.requiredMessage||"Please select an option."}:null}handlePickerReset(){this.selection=r.empty()}handlePickerRestore(e){this.value=e}syncSelectionFromItems(e){if(e.has("pickerItems")){if(this.selection.hasPending){this.value=this.selection.pending;return}if(!this.selectedItem){const n=this.pickerItems.find(t=>t.selected);n&&(this.selection=r.of(n))}}}selectOpenMenuAtPoint(e){return!this.showOptions||!(this.pickerMenu.value?.selectItemAtPoint(e.clientX,e.clientY)??!1)?!1:(this.suppressNextHostClick=!0,e.preventDefault(),e.stopPropagation(),!0)}render(){const{showOptions:e}=this;return m`
      <div
        tabindex="-1"
        class=${g({"esp-field":!0,"show-options":e})}
        @pointerdown=${this.handleHostPointerDown}
        @mousedown=${this.handleHostMouseDown}
        @click=${t=>{if(this.suppressNextHostClick){this.suppressNextHostClick=!1,t.preventDefault(),t.stopPropagation();return}this.typeahead&&!this.showOptions&&(this.suppressAutoSelect=!0),this.theInput.value?.focus(),this.showOptions=!this.showOptions,t.stopPropagation()}}
      >
        <section>
          <input
            ${p(this.theInput)}
            class="esp-input"
            value=${this.selectedItem?.text??""}
            style=${P(this.selectedItem?.styles??{})}
            placeholder=${this.placeholder}
            ?readonly=${!this.typeahead}
            @input=${this.handleTypeaheadInput}
            @focus=${()=>{this.inputFocused=!0,this.typeahead&&!this.suppressAutoSelect&&this.theInput.value?.select(),this.suppressAutoSelect=!1}}
            @blur=${this.handleInputBlur}
            @keydown=${t=>{if(this.pickerMenu.value&&!this.handleSharedPickerKeydown(t))switch(t.key){case"ArrowDown":case"ArrowUp":case"Enter":case"Home":case"End":this.handleMenuNavigationKey(t.key,t);break}}}
          />
        </section>
        <label>${this.typeahead&&this.inputFocused?v:w}</label>

        <esp-picker-menu
          .pickerItems=${this.menuItems}
          .loading=${this.typeaheadLoading}
          .emptyMessage=${this.typeahead?"No matches":""}
          .label=${this.placeholder}
          tabindex="-1"
          ${p(this.pickerMenu)}
          @selection-changed=${t=>{if(t.stopPropagation(),this.typeahead)return;const i=t.detail,s=i.length>0?i[0]:void 0;(i.length>0?this.selectedItem!==s:this.selectedItem!==void 0)&&(this.selection=this.showOptions?r.of(s):this.selection.withProvisionalItem(s),this.formCtrl.syncValue(),this.emitValueChanged(this.selectedItem))}}
          @close-menu=${t=>{if(this.showOptions=!1,this.clearActiveDescendant(),this.typeahead){const i=t.detail,s=i.length>0?i[0]:void 0;if(s?this.selectedItem?.value!==s.value:this.selectedItem!==void 0){if(this.selection=r.of(s),s)for(const l of this.pickerItems)l.selected=l.value===s.value;this.formCtrl.syncValue(),this.emitValueChanged(this.selectedItem)}this.suppressAutoSelect=!0,this.theInput.value?.focus(),this.resetTypeaheadInput()}else this.theInput.value?.focus()}}
        >
        </esp-picker-menu>
      </div>
      <slot ${p(this.itemsSlot)}></slot>
    `}};c.styles=[...k.styles,u.pickerFieldStyles,d`
      .esp-field input.esp-input {
        width: 0;
        flex-grow: 1;
      }
    `],h([y()],c.prototype,"selection",void 0),h([I({type:String})],c.prototype,"value",null),c=h([f("esp-pick-one")],c);export{c as EspalierPickOne};
