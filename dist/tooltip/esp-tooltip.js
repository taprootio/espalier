var s=function(n,e,t,r){var l=arguments.length,o=l<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(n,e,t,r);else for(var d=n.length-1;d>=0;d--)(p=n[d])&&(o=(l<3?p(o):l>3?p(e,t,o):p(e,t))||o);return l>3&&o&&Object.defineProperty(e,t,o),o};import{css as f,html as b,nothing as u}from"lit";import{customElement as y,property as a}from"lit/decorators.js";import{createRef as h,ref as c}from"lit/directives/ref.js";import{EspalierElementBase as g}from"../shared/esp-element-base.js";import"../popover/esp-popover.js";let v=0,i=class extends g{constructor(){super(...arguments),this.popoverRef=h(),this.contentRef=h(),this.tooltipId=`esp-tooltip-${++v}`,this.text="",this.attach="above",this.align="center",this.offset="4px",this.showDelay=300,this.hideDelay=100,this.triggerTabindexBacker=0,this.triggerTabindexExplicit=!1,this.handleKeydown=e=>{e.key==="Escape"&&this.popoverRef.value?.closePopover()},this.handleSlotChange=()=>{this.requestUpdate(),this.syncTriggerDescribedBy()}}get triggerTabindex(){return this.triggerTabindexBacker}set triggerTabindex(e){const t=this.triggerTabindexBacker;this.triggerTabindexExplicit=e!==null,this.triggerTabindexBacker=e!==null&&Number.isFinite(e)?e:0,this.requestUpdate("triggerTabindex",t)}get effectiveTriggerTabindex(){return this.triggerTabindexExplicit?this.triggerTabindex:this.hasButtonTrigger()?-1:0}hasButtonTrigger(){const e=Array.from(this.children).find(t=>t.tagName!=="TEMPLATE")?.tagName;return e==="BUTTON"||e==="ESP-BUTTON"}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this.handleKeydown)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",this.handleKeydown)}firstUpdated(e){super.firstUpdated(e);const t=this.querySelector("template");t&&this.contentRef.value&&this.contentRef.value.appendChild(t.content.cloneNode(!0)),this.syncTriggerDescribedBy()}updated(e){super.updated(e),e.has("triggerTabindex")&&this.syncTriggerDescribedBy()}syncTriggerDescribedBy(){const e=Array.from(this.children).find(r=>r.tagName!=="TEMPLATE");if(!e)return;const t=(e.getAttribute("aria-describedby")??"").split(/\s+/).filter(r=>r&&r!==this.tooltipId);this.effectiveTriggerTabindex<0&&t.push(this.tooltipId),t.length>0?e.setAttribute("aria-describedby",t.join(" ")):e.removeAttribute("aria-describedby")}render(){return b`
      <esp-popover
        ${c(this.popoverRef)}
        trigger="focus-hover"
        attach=${this.attach}
        align=${this.align}
        offset=${this.offset}
        show-delay=${this.showDelay}
        hide-delay=${this.hideDelay}
      >
        <span
          slot="target"
          class="trigger"
          tabindex=${this.effectiveTriggerTabindex}
          aria-describedby=${this.tooltipId}
        >
          <slot @slotchange=${this.handleSlotChange}></slot>
        </span>
        <div
          ${c(this.contentRef)}
          slot="popover"
          id=${this.tooltipId}
          role="tooltip"
          class="tooltip-content"
        >
          ${this.text?this.text:u}
        </div>
      </esp-popover>
    `}};i.styles=[...g.styles,f`
      :host {
        display: inline-flex;
      }

      .trigger {
        display: inline-flex;
        align-items: center;
        cursor: help;
      }

      .trigger:focus-visible {
        outline: var(--esp-tooltip-focus-outline, 2px solid var(--esp-color-link));
        outline-offset: 2px;
        border-radius: var(--esp-size-border-radius);
      }

      .tooltip-content {
        background: var(--esp-tooltip-background, var(--esp-color-layer-1));
        color: var(--esp-tooltip-color, var(--esp-color-text));
        border: var(--esp-tooltip-border, 1px solid var(--esp-color-border));
        border-radius: var(--esp-tooltip-border-radius, var(--esp-size-border-radius));
        padding: var(--esp-tooltip-padding, var(--esp-size-tiny) var(--esp-size-small));
        font-size: var(--esp-tooltip-font-size, var(--esp-type-small));
        max-width: var(--esp-tooltip-max-width, 40ch);
        box-shadow: var(--esp-tooltip-shadow, 2px 2px 4px var(--esp-color-shadow));
        line-height: 1.4;
      }
    `],s([a({type:String})],i.prototype,"text",void 0),s([a({type:String})],i.prototype,"attach",void 0),s([a({type:String})],i.prototype,"align",void 0),s([a({type:String})],i.prototype,"offset",void 0),s([a({attribute:"show-delay",type:Number})],i.prototype,"showDelay",void 0),s([a({attribute:"hide-delay",type:Number})],i.prototype,"hideDelay",void 0),s([a({attribute:"trigger-tabindex",type:Number,hasChanged:()=>!0})],i.prototype,"triggerTabindex",null),i=s([y("esp-tooltip")],i);export{i as EspalierTooltip};
