var l=function(c,e,t,s){var o=arguments.length,i=o<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,t):s,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(c,e,t,s);else for(var r=c.length-1;r>=0;r--)(a=c[r])&&(i=(o<3?a(i):o>3?a(e,t,i):a(e,t))||i);return o>3&&i&&Object.defineProperty(e,t,i),i};import{css as v,html as g}from"lit";import{customElement as I,property as u,state as p}from"lit/decorators.js";import{createRef as d,ref as h}from"lit/directives/ref.js";import"../button/esp-button.js";import"../popover/esp-popover.js";import{EspalierElementBase as f}from"../shared/esp-element-base.js";import"./esp-action-menu-item.js";const w=g` <svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  aria-hidden="true"
>
  <circle cx="5" cy="12" r="2" />
  <circle cx="12" cy="12" r="2" />
  <circle cx="19" cy="12" r="2" />
</svg>`;let n=class extends f{constructor(){super(...arguments),this.popoverRef=d(),this.itemsSlot=d(),this.triggerSlot=d(),this.triggerShell=d(),this.handledTriggerEvents=new WeakSet,this.wiredTriggerControls=new WeakSet,this.open=!1,this.focusedIndex=-1,this.placement="bottom-end",this.disabled=!1,this.iconPosition="left",this.handleTriggerSlotChange=()=>{this.syncTriggerAttributes()},this.syncItems=()=>{const e=this.items,t=this.enabledItems;for(const s of e)s.inheritIconPosition(this.iconPosition),s.setAttribute("role","menuitem"),s.tabIndex=t[0]===s&&this.focusedIndex<0?0:-1,s.setAttribute("aria-disabled",String(s.disabled));if(this.focusedIndex>=0){const s=t[this.focusedIndex];for(const o of t)o.tabIndex=o===s?0:-1}},this.handleTriggerClick=e=>{this.handledTriggerEvents.has(e)||(this.handledTriggerEvents.add(e),this.toggleMenu(e))},this.toggleMenu=e=>{e.preventDefault(),!this.disabled&&(this.open?this.closeMenu({restoreFocus:!0}):this.openMenu())},this.handleTriggerKeydown=async e=>{if(!this.disabled)switch(e.key){case"Enter":case" ":e.preventDefault(),e.stopPropagation(),this.openMenu(),await this.updateComplete,this.focusFirstItem();break;case"ArrowDown":e.preventDefault(),e.stopPropagation(),this.openMenu(),await this.updateComplete,this.focusFirstItem();break;case"ArrowUp":e.preventDefault(),e.stopPropagation(),this.openMenu(),await this.updateComplete,this.focusLastItem();break}},this.handleMenuKeydown=e=>{if(this.open)switch(e.key){case"ArrowDown":e.preventDefault(),this.focusNextItem(1);break;case"ArrowUp":e.preventDefault(),this.focusNextItem(-1);break;case"Home":e.preventDefault(),this.focusFirstItem();break;case"End":e.preventDefault(),this.focusLastItem();break;case"Enter":case" ":e.preventDefault(),this.activeItemForEvent(e)?.activate();break;case"Escape":e.preventDefault(),this.closeMenu({restoreFocus:!0});break}},this.handleItemActivate=e=>{const{item:t}=e.detail;this.selectItem(t)},this.handlePopoverOpened=()=>{this.open=!0,this.syncItems()},this.handlePopoverClosed=()=>{this.open=!1,this.focusedIndex=-1,this.syncItems()}}connectedCallback(){super.connectedCallback(),this.addEventListener("esp-action-menu-item-activate",this.handleItemActivate),this.addEventListener("keydown",this.handleMenuKeydown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("esp-action-menu-item-activate",this.handleItemActivate),this.removeEventListener("keydown",this.handleMenuKeydown)}firstUpdated(e){super.firstUpdated(e),this.syncTriggerAttributes(),this.syncItems()}updated(e){(e.has("open")||e.has("disabled"))&&this.syncTriggerAttributes(),e.has("iconPosition")&&this.syncItems()}openMenu(){this.disabled||this.open||(this.popoverRef.value?.openPopover(),this.open=!0)}closeMenu(e={}){this.open&&(this.popoverRef.value?.closePopover(),this.open=!1,this.focusedIndex=-1,this.syncItems(),e.restoreFocus&&this.focusTrigger())}get placementParts(){const[e,t]=this.placement.split("-"),s=t==="start"||t==="end"?t:"center";switch(e){case"top":return{attach:"above",align:s};case"right":return{attach:"right",align:s};case"left":return{attach:"left",align:s};case"bottom":default:return{attach:"below",align:s}}}get items(){return Array.from(this.querySelectorAll("esp-action-menu-item"))}get enabledItems(){return this.items.filter(e=>!e.disabled)}get defaultTrigger(){return this.shadowRoot?.querySelector(".default-trigger")}get slottedTrigger(){return this.triggerSlot.value?.assignedElements({flatten:!0})[0]}getTriggerControl(e){return e?.shadowRoot?.querySelector("button, a, [tabindex]")??null}wireTriggerControl(e){!e||this.wiredTriggerControls.has(e)||(e.addEventListener("click",this.handleTriggerClick),this.wiredTriggerControls.add(e))}syncTriggerAttributes(){const e={"aria-haspopup":"menu","aria-expanded":String(this.open),"aria-disabled":String(this.disabled)},t=r=>{if(r){for(const[m,b]of Object.entries(e))r.setAttribute(m,b);"disabled"in r&&(r.disabled=this.disabled)}};t(this.triggerShell.value);const s=this.slottedTrigger;t(s);const o=this.getTriggerControl(s);t(o),this.wireTriggerControl(o);const i=this.defaultTrigger;i?.setAttribute("aria-label","Actions"),t(i);const a=this.getTriggerControl(i);t(a),this.wireTriggerControl(a),i&&i.updateComplete.then(()=>{const r=this.getTriggerControl(i);t(r),r?.setAttribute("aria-label","Actions"),this.wireTriggerControl(r)}),s&&"updateComplete"in s&&s.updateComplete.then(()=>{const r=this.getTriggerControl(s);t(r),this.wireTriggerControl(r)})}activeItemForEvent(e){const t=this.enabledItems;return t[this.focusedIndex]??t.find(s=>e.composedPath().includes(s))??t.find(s=>s.matches(":focus"))}selectItem(e){e.disabled||(this.dispatchEvent(new CustomEvent("select",{detail:{value:e.value,item:e},bubbles:!0,composed:!0})),this.closeMenu({restoreFocus:!0}))}focusFirstItem(){this.focusItem(0)}focusLastItem(){this.focusItem(this.enabledItems.length-1)}focusNextItem(e){const t=this.enabledItems;if(t.length===0)return;const o=((this.focusedIndex<0?0:this.focusedIndex)+e+t.length)%t.length;this.focusItem(o)}focusItem(e){const t=this.enabledItems;e<0||e>=t.length||(this.focusedIndex=e,this.syncItems(),t[e].focus())}focusTrigger(){const e=this.slottedTrigger;if(e){(this.getTriggerControl(e)??e).focus();return}const t=this.defaultTrigger;(this.getTriggerControl(t)??t??this.triggerShell.value)?.focus()}render(){const{attach:e,align:t}=this.placementParts;return g`
      <esp-popover
        ${h(this.popoverRef)}
        .trigger=${"none"}
        attach=${e}
        align=${t}
        offset="2px"
        @popover-opened=${this.handlePopoverOpened}
        @popover-closed=${this.handlePopoverClosed}
      >
        <span
          ${h(this.triggerShell)}
          slot="target"
          class="trigger"
          tabindex="-1"
          @click=${this.handleTriggerClick}
          @keydown=${this.handleTriggerKeydown}
        >
          <slot name="trigger" ${h(this.triggerSlot)} @slotchange=${this.handleTriggerSlotChange}>
            <esp-button
              class="default-trigger"
              icon-only
              aria-label="Actions"
              .disabled=${this.disabled}
              label="Actions"
            >
              ${w}
            </esp-button>
          </slot>
        </span>
        <div slot="popover" part="menu" class="menu" role="menu">
          <slot ${h(this.itemsSlot)} @slotchange=${this.syncItems}></slot>
        </div>
      </esp-popover>
    `}};n.styles=[...f.styles,v`
      :host {
        display: inline-flex;
      }

      .trigger {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        outline: none;
      }

      .trigger[aria-disabled="true"] {
        cursor: not-allowed;
      }

      .menu {
        display: grid;
        min-width: var(--esp-action-menu-min-width, 12rem);
        padding: 0;
        overflow: hidden;
        color: var(--esp-color-text);
        background: var(--esp-action-menu-background, var(--esp-color-layer-1));
        border: var(--esp-action-menu-border, 1px solid var(--esp-color-border));
        border-radius: var(--esp-size-border-radius);
        box-shadow: var(--esp-action-menu-shadow, 2px 2px 4px var(--esp-color-shadow));
      }

      ::slotted(esp-action-menu-item + esp-action-menu-item) {
        border-top: 1px dotted var(--esp-color-border);
      }
    `],l([p()],n.prototype,"open",void 0),l([p()],n.prototype,"focusedIndex",void 0),l([u({type:String})],n.prototype,"placement",void 0),l([u({type:Boolean,reflect:!0})],n.prototype,"disabled",void 0),l([u({attribute:"icon-position",type:String})],n.prototype,"iconPosition",void 0),n=l([I("esp-action-menu")],n);export{n as EspalierActionMenu};
