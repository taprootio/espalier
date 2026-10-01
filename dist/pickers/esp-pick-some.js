var c=function(n,t,s,e){var i=arguments.length,r=i<3?t:e===null?e=Object.getOwnPropertyDescriptor(t,s):e,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(n,t,s,e);else for(var o=n.length-1;o>=0;o--)(l=n[o])&&(r=(i<3?l(r):i>3?l(t,s,r):l(t,s))||r);return i>3&&r&&Object.defineProperty(t,s,r),r};import{css as k,html as u}from"lit";import{customElement as y,property as m,state as v}from"lit/decorators.js";import{classMap as g}from"lit/directives/class-map.js";import{ifDefined as w}from"lit/directives/if-defined.js";import{ref as h}from"lit/directives/ref.js";import"./esp-picker-item.js";import"./esp-picker-menu.js";import{EspalierElementBase as b}from"../shared/esp-element-base.js";import{caretUpDown as $}from"../shared/svgs/caret-up-down.js";import{filter as V}from"../shared/svgs/filter.js";import{plus as N}from"../shared/svgs/plus.js";import{EspalierPickerBase as f}from"./esp-picker-base.js";import{arrayKeysMatch as I}from"../shared/utilities.js";let a=class extends f{constructor(){super(...arguments),this.selectedItems=[],this.initialSyncDone=!1,this.addNewValue=null}decorateFilteredItems(t){const s=new Set(this.selectedItems.map(e=>e.value));return t.map(e=>({...e,selected:s.has(e.value)}))}get typeaheadRestoreText(){return""}get values(){return this.selectedItems.map(t=>t.value)}getPickerFormValue(){const t=this.values;return t.length>0?t.join(","):null}getPickerValidity(){return this.required&&this.selectedItems.length===0?{flags:{valueMissing:!0},message:this.requiredMessage||"Please select at least one option."}:null}handlePickerReset(){this.selectedItems=[],this.pickerItems=this.pickerItems.map(t=>({...t,selected:!1}))}handlePickerRestore(t){const s=t.split(",");this.pickerItems=this.pickerItems.map(e=>({...e,selected:s.includes(e.value)})),this.selectedItems=this.pickerItems.filter(e=>e.selected)}syncSelectionFromItems(t){if(this.initialSyncDone||!t.has("pickerItems")||this.selectedItems.length>0)return;const s=this.pickerItems.filter(e=>e.selected);s.length>0&&(this.selectedItems=s,this.initialSyncDone=!0)}setSelectedItems(t,{visitor:s=!0}={}){if(this.initialSyncDone=!0,this.selectedItems=t,this.pickerItems=this.pickerItems.map(e=>({...e,selected:this.selectedItems.some(i=>i.value===e.value)})),!s){this.formCtrl.syncValueSilently();return}this.formCtrl.syncValue(),this.emitValueChanged(this.selectedItems),this.focus()}get canAddNewValue(){if(!this.addNewValue||!this.typeahead)return!1;const t=this.theInput.value;if(!t||!t.value.trim())return!1;const s=t.value.trim().toLowerCase(),e=i=>i.text.toLowerCase()===s;return!(this.pickerItems.some(e)||this.typeaheadIsRemote&&this.filteredItems.some(e))}async handleAddNewValue(){if(!this.addNewValue)return;const t=this.theInput.value;if(!t||!t.value.trim())return;const s=t.value.trim();let e;try{e=await this.addNewValue(s)}catch{return}const i=this.pickerItems.find(r=>r.value===e.value);if(i){this.selectedItems.some(r=>r.value===i.value)||(i.selected=!0,this.setSelectedItems([...this.selectedItems,i])),this.resetTypeaheadInput();return}e.selected=!0,this.pickerItems=[...this.pickerItems,e],this.setSelectedItems([...this.selectedItems,e]),this.resetTypeaheadInput(),this.refreshTypeaheadItems(),this.typeaheadIsRemote&&this.fetchInitialTypeaheadItems()}get iconSvg(){return this.canAddNewValue?N:this.typeahead&&this.inputFocused?V:$}render(){const{showOptions:t}=this,s={"esp-field":!0,"show-options":t};return u`
      <div
        ${h(this.pickerField)}
        tabindex="-1"
        class=${g(s)}
        @click=${e=>{if(this.hasAttribute("data-picker-menu-fullscreen")&&this.theInput.value&&e.composedPath().includes(this.theInput.value)){e.stopPropagation();return}this.theInput.value?.focus(),this.showOptions?this.closeAndResetTypeahead():this.showOptions=!0,e.stopPropagation()}}
      >
        <section>
          ${this.selectedItems.map(e=>u`<span
                class="selected-item"
                @click=${i=>{i.stopPropagation(),this.setSelectedItems(this.selectedItems.filter(r=>r.value!==e.value))}}
                >${e.text}</span
              >`)}
          <input
            ${h(this.theInput)}
            class="esp-input"
            placeholder=${this.placeholder}
            ?readonly=${!this.typeahead}
            @input=${this.handleTypeaheadInput}
            @focus=${()=>{this.inputFocused=!0}}
            @blur=${this.handleInputBlur}
            @keydown=${e=>{if(this.pickerMenu.value&&!this.handleSharedPickerKeydown(e))switch(e.key){case"ArrowDown":case"ArrowUp":case"Home":case"End":this.handleMenuNavigationKey(e.key,e);break;case"Enter":if(this.showOptions&&this.canAddNewValue){e.preventDefault(),this.handleAddNewValue();break}this.handleMenuNavigationKey("Enter",e);break;case"Backspace":this.typeahead&&this.selectedItems.length>0&&!e.target.value&&this.setSelectedItems(this.selectedItems.slice(0,-1));break}}}
          />
        </section>
        <label
          @click=${e=>{this.canAddNewValue&&(e.stopPropagation(),this.handleAddNewValue())}}
          @keydown=${e=>{this.canAddNewValue&&(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.stopPropagation(),this.handleAddNewValue())}}
          class=${this.canAddNewValue?"add-new":""}
          tabindex=${this.canAddNewValue?"0":"-1"}
          role=${this.canAddNewValue?"button":"presentation"}
          aria-label=${w(this.canAddNewValue?"Add new value":void 0)}
          >${this.iconSvg}</label
        >
        ${this.renderPickerMenuDismissButton()}

        <esp-picker-menu
          .pickerItems=${this.menuItems}
          .loading=${this.typeaheadLoading}
          .emptyMessage=${this.typeahead?"No matches":""}
          .label=${this.placeholder}
          tabindex="-1"
          ${h(this.pickerMenu)}
          multi-select
          @esp-picker-menu-selection-changed=${e=>{e.stopPropagation();const i=this.pickerMenu.value?.isVisitorPick===!0;if(this.typeahead){const l=new Set(this.filteredItems.map(d=>d.value)),p=[...this.selectedItems.filter(d=>!l.has(d.value)),...e.detail];if(I(p,this.selectedItems,"value"))return;this.setSelectedItems(p,{visitor:i}),this.resetTypeaheadInput();return}I(e.detail,this.selectedItems,"value")||this.setSelectedItems(e.detail,{visitor:i})}}
          @esp-picker-menu-dismiss-requested=${this.handleMenuDismissRequested}
        >
        </esp-picker-menu>
      </div>
      <slot ${h(this.itemsSlot)}></slot>
    `}};a.styles=[...b.styles,...f.pickerFieldStyles,k`
      :host {
        --_esp-pick-some-chip-hover-l: calc(var(--esp-l-raised-2) * 0.88);
        --_esp-pick-some-chip-focus-l: calc(var(--esp-l-raised-2) * 0.8);
      }

      .esp-field {
        & input.esp-input {
          width: auto;
          flex-grow: 1;
          padding: 0;
        }

        > section {
          padding: var(--esp-size-padding);
          gap: var(--esp-size-tiny);

          > span.selected-item {
            display: block;
            background: oklch(from var(--esp-color-complementary) var(--esp-l-raised-2) c h);
            border: 1px dotted var(--esp-color-border);
            border-radius: var(--esp-size-border-radius);
            padding: 0 var(--esp-size-tiny);
            height: min-content;
            place-self: center;

            &:hover {
              background: oklch(from var(--esp-color-danger) var(--esp-l-raised-3) c h);
              border: 1px solid oklch(from var(--esp-color-danger) var(--esp-l-border) c h);
              text-decoration: line-through;
              text-decoration-thickness: 3px;
            }
          }
        }

        &:hover {
          > section > span {
            background: oklch(
              from var(--esp-color-complementary) var(--_esp-pick-some-chip-hover-l) c h
            );
          }
        }

        &:focus-within {
          > section > span {
            background: oklch(
              from var(--esp-color-complementary) var(--_esp-pick-some-chip-focus-l) c h
            );
          }
        }

        > label.add-new {
          color: var(--esp-color-primary);
        }
      }
    `],c([v()],a.prototype,"selectedItems",void 0),c([m({type:Array})],a.prototype,"values",null),c([m({attribute:!1})],a.prototype,"addNewValue",void 0),a=c([y("esp-pick-some")],a);export{a as EspalierPickSome};
