var n=function(l,e,s,r){var t=arguments.length,o=t<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,s):r,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(l,e,s,r);else for(var a=l.length-1;a>=0;a--)(p=l[a])&&(o=(t<3?p(o):t>3?p(e,s,o):p(e,s))||o);return t>3&&o&&Object.defineProperty(e,s,o),o};import{css as c,html as f}from"lit";import{customElement as h,property as m}from"lit/decorators.js";import{createRef as g,ref as v}from"lit/directives/ref.js";import{EspalierElementBase as u}from"../shared/esp-element-base.js";import{EspalierDetails as d}from"./esp-details.js";let i=class extends u{constructor(){super(...arguments),this.itemsSlot=g(),this.exclusive=!0}getDetails(){return this.itemsSlot.value?Array.from(this.itemsSlot.value.assignedElements()).filter(e=>e instanceof d):[]}applyGroupAttributes(){for(const e of this.getDetails())e.setAttribute("in-group","")}handleChildToggle(e){const s=e,r=e.composedPath().find(t=>t instanceof d);if(r&&s.detail.open&&this.exclusive){for(const t of this.getDetails())t!==r&&t.open&&t.close();this.dispatchEvent(new CustomEvent("esp-accordion-change",{detail:{openItem:r},bubbles:!0,composed:!0}))}}handleSlotChange(){this.applyGroupAttributes()}firstUpdated(e){super.firstUpdated(e),this.applyGroupAttributes()}render(){return f`
      <div class="details-group" role="group" @esp-toggle=${this.handleChildToggle}>
        <slot ${v(this.itemsSlot)} @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};i.styles=[...u.styles,c`
      :host {
        display: block;
      }

      .details-group {
        border: 1px solid var(--esp-details-group-color-border, var(--esp-color-border));
        border-radius: var(--esp-size-border-radius);
        box-shadow: 1px 1px 4px var(--esp-color-shadow);
        overflow: hidden;
      }
    `],n([m({type:Boolean})],i.prototype,"exclusive",void 0),i=n([h("esp-details-group")],i);export{i as EspalierDetailsGroup};
