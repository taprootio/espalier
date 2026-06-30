var o=function(p,t,s,e){var i=arguments.length,a=i<3?t:e===null?e=Object.getOwnPropertyDescriptor(t,s):e,h;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(p,t,s,e);else for(var l=p.length-1;l>=0;l--)(h=p[l])&&(a=(i<3?h(a):i>3?h(t,s,a):h(t,s))||a);return i>3&&a&&Object.defineProperty(t,s,a),a};import{css as y,html as m}from"lit";import{customElement as v,property as n,state as d}from"lit/decorators.js";import{classMap as I}from"lit/directives/class-map.js";import{ifDefined as w}from"lit/directives/if-defined.js";import{ref as u}from"lit/directives/ref.js";import"./esp-picker-item.js";import"./esp-picker-menu.js";import{EspalierElementBase as k}from"../shared/esp-element-base.js";import{caretUpDown as g}from"../shared/svgs/caret-up-down.js";import{filter as b}from"../shared/svgs/filter.js";import{plus as O}from"../shared/svgs/plus.js";import{EspalierPickerBase as $}from"./esp-picker-base.js";import{arrayKeysMatch as f}from"../shared/utilities.js";import{TypeaheadController as C}from"./typeahead-controller.js";let r=class extends ${constructor(){super(...arguments),this.selectedItems=[],this.initialSyncDone=!1,this.typeaheadLoading=!1,this.filteredItems=[],this.inputFocused=!1,this.typeaheadCtrl=new C({host:this,onFilteredItemsChanged:t=>{const s=new Set(this.selectedItems.map(e=>e.value));this.filteredItems=t.map(e=>({...e,selected:s.has(e.value)}))},onLoadingChanged:t=>{this.typeaheadLoading=t}}),this.typeahead=!1,this.fetchItems=null,this.debounceMs=void 0,this.addNewValue=null}get values(){return this.selectedItems.map(t=>t.value)}getPickerFormValue(){const t=this.values;return t.length>0?t.join(","):null}getPickerValidity(){return this.required&&this.selectedItems.length===0?{flags:{valueMissing:!0},message:this.requiredMessage||"Please select at least one option."}:null}handlePickerReset(){this.selectedItems=[],this.pickerItems=this.pickerItems.map(t=>({...t,selected:!1}))}handlePickerRestore(t){const s=t.split(",");this.pickerItems=this.pickerItems.map(e=>({...e,selected:s.includes(e.value)})),this.selectedItems=this.pickerItems.filter(e=>e.selected)}set showOptions(t){const s=this.showOptions;super.showOptions=t,t&&!s&&this.typeahead&&this.typeaheadCtrl.isRemote&&this.filteredItems.length===0&&this.typeaheadCtrl.fetchInitial()}get showOptions(){return super.showOptions}willUpdate(t){if(super.willUpdate(t),!this.initialSyncDone&&t.has("pickerItems")&&this.selectedItems.length===0){const s=this.pickerItems.filter(e=>e.selected);s.length>0&&(this.selectedItems=s,this.initialSyncDone=!0)}this.typeahead&&((t.has("pickerItems")||t.has("typeahead"))&&this.typeaheadCtrl.setAllItems(this.pickerItems),(t.has("fetchItems")||t.has("typeahead"))&&this.typeaheadCtrl.setFetchItems(this.fetchItems),(t.has("debounceMs")||t.has("typeahead"))&&this.debounceMs!==void 0&&this.typeaheadCtrl.setDebounceMs(this.debounceMs))}firstUpdated(t){if(super.firstUpdated(t),this.typeahead){const s=this.theInput.value;s&&(s.ariaAutoComplete="list")}}setSelectedItems(t){this.initialSyncDone=!0,this.selectedItems=t,this.pickerItems=this.pickerItems.map(s=>({...s,selected:this.selectedItems.some(e=>e.value===s.value)})),this.formCtrl.syncValue(),this.dispatchEvent(new CustomEvent("value-changed",{detail:this.selectedItems,bubbles:!0,composed:!0})),this.focus()}resetTypeaheadInput(){const t=this.theInput.value;t&&(t.value=""),this.typeaheadCtrl.isRemote?this.typeaheadCtrl.resetQuery():this.typeaheadCtrl.clearQuery()}get canAddNewValue(){if(!this.addNewValue||!this.typeahead)return!1;const t=this.theInput.value;if(!t||!t.value.trim())return!1;const s=t.value.trim().toLowerCase(),e=i=>i.text.toLowerCase()===s;return!(this.pickerItems.some(e)||this.typeaheadCtrl.isRemote&&this.filteredItems.some(e))}async handleAddNewValue(){if(!this.addNewValue)return;const t=this.theInput.value;if(!t||!t.value.trim())return;const s=t.value.trim();let e;try{e=await this.addNewValue(s)}catch{return}const i=this.pickerItems.find(a=>a.value===e.value);if(i){this.selectedItems.some(a=>a.value===i.value)||(i.selected=!0,this.setSelectedItems([...this.selectedItems,i])),this.resetTypeaheadInput();return}e.selected=!0,this.pickerItems=[...this.pickerItems,e],this.setSelectedItems([...this.selectedItems,e]),this.resetTypeaheadInput(),this.typeaheadCtrl.setAllItems(this.pickerItems),this.typeaheadCtrl.isRemote&&this.typeaheadCtrl.fetchInitial()}get iconSvg(){return this.canAddNewValue?O:this.typeahead&&this.inputFocused?b:g}render(){const{showOptions:t}=this;return m`
      <div
        tabindex="-1"
        class=${I({"esp-field":!0,"show-options":t})}
        @click=${e=>{this.theInput.value?.focus(),this.showOptions=!this.showOptions,e.stopPropagation()}}
      >
        <section>
          ${this.selectedItems.map(e=>m`<span
                class="selected-item"
                @click=${i=>{i.stopPropagation(),this.setSelectedItems(this.selectedItems.filter(a=>a.value!==e.value))}}
                >${e.text}</span
              >`)}
          <input
            ${u(this.theInput)}
            class="esp-input"
            placeholder=${this.placeholder}
            ?readonly=${!this.typeahead}
            @input=${e=>{if(!this.typeahead)return;const i=e.target;this.typeaheadCtrl.setQuery(i.value),this.showOptions||(this.showOptions=!0)}}
            @focus=${()=>{this.inputFocused=!0}}
            @blur=${e=>{this.inputFocused=!1;const i=e.relatedTarget;if(!(i&&(this.contains(i)||this.shadowRoot?.contains(i)))){if(!i&&this.showOptions){requestAnimationFrame(()=>{this.showOptions&&this.shadowRoot?.activeElement!==this.theInput.value&&(this.showOptions=!1,this.typeahead&&this.resetTypeaheadInput())});return}this.showOptions=!1,this.typeahead&&this.resetTypeaheadInput()}}}
            @keydown=${e=>{if(this.pickerMenu.value)switch(e.key){case" ":this.typeahead||(this.showOptions=!this.showOptions);break;case"ArrowDown":case"ArrowUp":case"Home":case"End":e.preventDefault(),this.showOptions?(this.pickerMenu.value.doKeyboardNav(e.key),this.updateActiveDescendant()):this.showOptions=!0;break;case"Enter":e.preventDefault(),this.showOptions?this.canAddNewValue?this.handleAddNewValue():(this.pickerMenu.value.doKeyboardNav("Enter"),this.updateActiveDescendant()):this.showOptions=!0;break;case"Tab":this.showOptions&&(this.showOptions=!1),this.typeahead&&this.resetTypeaheadInput();break;case"Backspace":this.typeahead&&this.selectedItems.length>0&&!e.target.value&&this.setSelectedItems(this.selectedItems.slice(0,-1));break;case"Escape":this.showOptions=!1,this.typeahead&&this.resetTypeaheadInput();break}}}
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

        <esp-picker-menu
          .pickerItems=${this.typeahead?this.filteredItems:this.pickerItems}
          .loading=${this.typeaheadLoading}
          .emptyMessage=${this.typeahead?"No matches":""}
          .label=${this.placeholder}
          tabindex="-1"
          ${u(this.pickerMenu)}
          multi-select
          @selection-changed=${e=>{if(e.stopPropagation(),this.typeahead){const a=new Set(this.filteredItems.map(c=>c.value)),l=[...this.selectedItems.filter(c=>!a.has(c.value)),...e.detail];if(f(l,this.selectedItems,"value"))return;this.setSelectedItems(l),this.resetTypeaheadInput();return}f(e.detail,this.selectedItems,"value")||this.setSelectedItems(e.detail)}}
        >
        </esp-picker-menu>
      </div>
      <slot ${u(this.itemsSlot)}></slot>
    `}};r.styles=[...k.styles,y`
      :host {
        --_esp-pick-some-chip-hover-l: calc(var(--esp-l-raised-2) * 0.88);
        --_esp-pick-some-chip-focus-l: calc(var(--esp-l-raised-2) * 0.8);
      }

      :host([disabled]) {
        pointer-events: none;
        opacity: 0.5;
      }

      .esp-field {
        display: grid;
        grid-template-columns: auto min-content;
        position: relative;

        & input.esp-input {
          width: auto;
          flex-grow: 1;
          padding: 0;
        }

        > section {
          cursor: pointer;
          display: flex;
          flex-wrap: wrap;
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

        > label {
          display: grid;
          place-content: center;
          cursor: pointer;

          > svg {
            height: var(--esp-size-normal-to-medium);
            width: var(--esp-size-normal-to-medium);
          }
        }

        > label.add-new {
          color: var(--esp-color-primary);
        }
      }

      :host([typeahead]) .esp-field > section {
        cursor: text;
      }
    `],o([d()],r.prototype,"selectedItems",void 0),o([d()],r.prototype,"typeaheadLoading",void 0),o([d()],r.prototype,"filteredItems",void 0),o([d()],r.prototype,"inputFocused",void 0),o([n({type:Array})],r.prototype,"values",null),o([n({type:Boolean,reflect:!0})],r.prototype,"typeahead",void 0),o([n({attribute:!1})],r.prototype,"fetchItems",void 0),o([n({type:Number,attribute:"debounce-ms"})],r.prototype,"debounceMs",void 0),o([n({attribute:!1})],r.prototype,"addNewValue",void 0),r=o([v("esp-pick-some")],r);export{r as EspalierPickSome};
