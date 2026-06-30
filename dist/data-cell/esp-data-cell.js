var c=function(n,e,s,a){var r=arguments.length,t=r<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,s):a,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(n,e,s,a);else for(var i=n.length-1;i>=0;i--)(l=n[i])&&(t=(r<3?l(t):r>3?l(e,s,t):l(e,s))||t);return r>3&&t&&Object.defineProperty(e,s,t),t};import{css as h,html as m}from"lit";import{customElement as y,property as f,state as u}from"lit/decorators.js";import{classMap as g}from"lit/directives/class-map.js";import{createRef as S,ref as p}from"lit/directives/ref.js";import{EspalierElementBase as d}from"../shared/esp-element-base.js";import{SlottedIconController as v}from"../shared/slotted-icon-controller.js";let o=class extends d{constructor(){super(...arguments),this.iconSlot=new v(this),this.secondarySlot=S(),this.hasSecondary=!1,this.truncate=!1,this.handleSecondarySlotChange=()=>{this.hasSecondary=this.secondarySlot.value?.assignedNodes({flatten:!0}).some(e=>e.nodeType===Node.TEXT_NODE?(e.textContent??"").trim().length>0:!0)??!1}}firstUpdated(e){super.firstUpdated(e),this.iconSlot.handleSlotChange(),this.handleSecondarySlotChange()}render(){const e={cell:!0,"has-icon":this.iconSlot.hasAssignedSlotContent,"has-secondary":this.hasSecondary,truncate:this.truncate};return m`
      <span part="cell" class=${g(e)}>
        <span part="icon" class="icon">
          <slot
            name="icon"
            ${p(this.iconSlot.slotRef)}
            @slotchange=${this.iconSlot.handleSlotChange}
          ></slot>
        </span>
        <span part="content" class="content">
          <span part="primary" class="primary"><slot name="primary"></slot></span>
          <span part="secondary" class="secondary">
            <slot
              name="secondary"
              ${p(this.secondarySlot)}
              @slotchange=${this.handleSecondarySlotChange}
            ></slot>
          </span>
        </span>
      </span>
    `}};o.styles=[...d.styles,h`
      :host {
        display: block;
        min-width: 0;
      }

      .cell {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        align-items: center;
        min-width: 0;
        gap: var(--esp-size-tiny);
        color: var(--esp-color-text);
        font-family: var(--esp-font-body);
      }

      .cell.has-icon {
        grid-template-columns: min-content minmax(0, 1fr);
      }

      .icon {
        display: none;
        align-items: center;
        justify-content: center;
        color: var(--esp-color-headings);
      }

      .has-icon .icon {
        display: inline-flex;
      }

      .content {
        display: grid;
        min-width: 0;
        gap: calc(var(--esp-size-tiny) / 3);
      }

      .primary,
      .secondary {
        min-width: 0;
        line-height: 1.3;
      }

      .primary {
        font-size: var(--esp-size-font);
        font-weight: var(--esp-font-weight-body);
        color: var(--esp-color-text);
      }

      .secondary {
        display: none;
        font-size: var(--esp-type-small);
        color: var(--esp-color-headings);
      }

      .has-secondary .secondary {
        display: block;
      }

      .truncate .primary,
      .truncate .secondary {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      ::slotted(svg) {
        width: var(--esp-size-normal-to-medium);
        height: var(--esp-size-normal-to-medium);
      }
    `],c([u()],o.prototype,"hasSecondary",void 0),c([f({type:Boolean,reflect:!0})],o.prototype,"truncate",void 0),o=c([y("esp-data-cell")],o);export{o as EspalierDataCell};
