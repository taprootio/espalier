var c=function(o,t,s,e){var a=arguments.length,i=a<3?t:e===null?e=Object.getOwnPropertyDescriptor(t,s):e,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(o,t,s,e);else for(var l=o.length-1;l>=0;l--)(n=o[l])&&(i=(a<3?n(i):a>3?n(t,s,i):n(t,s))||i);return a>3&&i&&Object.defineProperty(t,s,i),i};import{css as I,html as p}from"lit";import{customElement as k,property as u,state as y}from"lit/decorators.js";import{classMap as v}from"lit/directives/class-map.js";import{ifDefined as g}from"lit/directives/if-defined.js";import{ref as h}from"lit/directives/ref.js";import"./esp-picker-item.js";import"./esp-picker-menu.js";import{EspalierElementBase as w}from"../shared/esp-element-base.js";import{caretUpDown as b}from"../shared/svgs/caret-up-down.js";import{filter as $}from"../shared/svgs/filter.js";import{plus as V}from"../shared/svgs/plus.js";import{EspalierPickerBase as m}from"./esp-picker-base.js";import{arrayKeysMatch as f}from"../shared/utilities.js";let r=class extends m{constructor(){super(...arguments),this.selectedItems=[],this.initialSyncDone=!1,this.addNewValue=null}decorateFilteredItems(t){const s=new Set(this.selectedItems.map(e=>e.value));return t.map(e=>({...e,selected:s.has(e.value)}))}get typeaheadRestoreText(){return""}get values(){return this.selectedItems.map(t=>t.value)}getPickerFormValue(){const t=this.values;return t.length>0?t.join(","):null}getPickerValidity(){return this.required&&this.selectedItems.length===0?{flags:{valueMissing:!0},message:this.requiredMessage||"Please select at least one option."}:null}handlePickerReset(){this.selectedItems=[],this.pickerItems=this.pickerItems.map(t=>({...t,selected:!1}))}handlePickerRestore(t){const s=t.split(",");this.pickerItems=this.pickerItems.map(e=>({...e,selected:s.includes(e.value)})),this.selectedItems=this.pickerItems.filter(e=>e.selected)}syncSelectionFromItems(t){if(this.initialSyncDone||!t.has("pickerItems")||this.selectedItems.length>0)return;const s=this.pickerItems.filter(e=>e.selected);s.length>0&&(this.selectedItems=s,this.initialSyncDone=!0)}setSelectedItems(t){this.initialSyncDone=!0,this.selectedItems=t,this.pickerItems=this.pickerItems.map(s=>({...s,selected:this.selectedItems.some(e=>e.value===s.value)})),this.formCtrl.syncValue(),this.emitValueChanged(this.selectedItems),this.focus()}get canAddNewValue(){if(!this.addNewValue||!this.typeahead)return!1;const t=this.theInput.value;if(!t||!t.value.trim())return!1;const s=t.value.trim().toLowerCase(),e=a=>a.text.toLowerCase()===s;return!(this.pickerItems.some(e)||this.typeaheadIsRemote&&this.filteredItems.some(e))}async handleAddNewValue(){if(!this.addNewValue)return;const t=this.theInput.value;if(!t||!t.value.trim())return;const s=t.value.trim();let e;try{e=await this.addNewValue(s)}catch{return}const a=this.pickerItems.find(i=>i.value===e.value);if(a){this.selectedItems.some(i=>i.value===a.value)||(a.selected=!0,this.setSelectedItems([...this.selectedItems,a])),this.resetTypeaheadInput();return}e.selected=!0,this.pickerItems=[...this.pickerItems,e],this.setSelectedItems([...this.selectedItems,e]),this.resetTypeaheadInput(),this.refreshTypeaheadItems(),this.typeaheadIsRemote&&this.fetchInitialTypeaheadItems()}get iconSvg(){return this.canAddNewValue?V:this.typeahead&&this.inputFocused?$:b}render(){const{showOptions:t}=this,s={"esp-field":!0,"show-options":t};return p`
      <div
        ${h(this.pickerField)}
        tabindex="-1"
        class=${v(s)}
        @click=${e=>{if(this.hasAttribute("data-picker-menu-fullscreen")&&this.theInput.value&&e.composedPath().includes(this.theInput.value)){e.stopPropagation();return}this.theInput.value?.focus(),this.showOptions?this.closeAndResetTypeahead():this.showOptions=!0,e.stopPropagation()}}
      >
        <section>
          ${this.selectedItems.map(e=>p`<span
                class="selected-item"
                @click=${a=>{a.stopPropagation(),this.setSelectedItems(this.selectedItems.filter(i=>i.value!==e.value))}}
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
          aria-label=${g(this.canAddNewValue?"Add new value":void 0)}
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
          @esp-picker-menu-selection-changed=${e=>{if(e.stopPropagation(),this.typeahead){const i=new Set(this.filteredItems.map(d=>d.value)),l=[...this.selectedItems.filter(d=>!i.has(d.value)),...e.detail];if(f(l,this.selectedItems,"value"))return;this.setSelectedItems(l),this.resetTypeaheadInput();return}f(e.detail,this.selectedItems,"value")||this.setSelectedItems(e.detail)}}
          @esp-picker-menu-dismiss-requested=${this.handleMenuDismissRequested}
        >
        </esp-picker-menu>
      </div>
      <slot ${h(this.itemsSlot)}></slot>
    `}};r.styles=[...w.styles,...m.pickerFieldStyles,I`
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
    `],c([y()],r.prototype,"selectedItems",void 0),c([u({type:Array})],r.prototype,"values",null),c([u({attribute:!1})],r.prototype,"addNewValue",void 0),r=c([k("esp-pick-some")],r);export{r as EspalierPickSome};
