var o=function(d,t,e,i){var a=arguments.length,r=a<3?t:i===null?i=Object.getOwnPropertyDescriptor(t,e):i,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(d,t,e,i);else for(var h=d.length-1;h>=0;h--)(l=d[h])&&(r=(a<3?l(r):a>3?l(t,e,r):l(t,e))||r);return a>3&&r&&Object.defineProperty(t,e,r),r},p;import{css as v,html as c}from"lit";import{customElement as y,property as n,state as f}from"lit/decorators.js";import{createRef as m,ref as u}from"lit/directives/ref.js";import{classMap as w}from"lit/directives/class-map.js";import{styleMap as _}from"lit/directives/style-map.js";import{ifDefined as g}from"lit/directives/if-defined.js";import{EspalierElementBase as b}from"../shared/esp-element-base.js";import{FormFieldController as S}from"../shared/form-field-controller.js";import{FormFieldDescriptionController as x}from"../shared/form-field-description-controller.js";import{disabledControl as k,focusRing as C}from"../shared/style-fragments.js";let s=p=class extends b{constructor(){super(...arguments),this.internals=this.attachInternals(),this.formCtrl=new S({host:this,internals:this.internals,getFormValue:()=>this.value||null,getValidity:()=>null,onReset:()=>{this.value=String(this._low)},onRestore:t=>{this.value=t},onDisabled:t=>{this.disabled=t}}),this.formItemDescription=new x({host:this,getTarget:()=>this._thumbRef.value}),this.min=0,this.max=100,this.step=1,this.value="0",this.name="",this.disabled=!1,this.label="",this._dragging=!1,this._hasSlotContent=!1,this._trackRef=m(),this._thumbRef=m(),this._slotRef=m(),this._labelId=`esp-slider-label-${p._nextId++}`}get _safeStep(){return Number.isFinite(this.step)&&this.step>0?this.step:1}get _safeMin(){return Number.isFinite(this.min)?this.min:0}get _safeMax(){return Number.isFinite(this.max)?this.max:100}get _stepPrecision(){const t=String(this._safeStep),e=/^(\d+\.?(\d*))e-(\d+)$/.exec(t);if(e){const a=e[2].length,r=Number(e[3]);return a+r}const i=t.indexOf(".");return i===-1?0:t.length-i-1}get _low(){return Math.min(this._safeMin,this._safeMax)}get _high(){return Math.max(this._safeMin,this._safeMax)}_snapToStep(t){const e=this._safeStep,i=this._low,a=this._high,r=Math.round((t-i)/e)*e+i,l=Math.max(i,Math.min(a,r)),h=10**this._stepPrecision;return Math.round(l*h)/h}get numericValue(){const t=Number(this.value);return Number.isNaN(t)?this._snapToStep(this._low):this._snapToStep(t)}get percentage(){const t=this._high-this._low;return t<=0?0:(this.numericValue-this._low)/t*100}_normalizeValue(){const t=String(this.numericValue);t!==this.value&&(this.value=t),this.formCtrl.syncValueSilently()}willUpdate(t){super.willUpdate(t),(t.has("value")||t.has("min")||t.has("max")||t.has("step"))&&this._normalizeValue()}firstUpdated(t){super.firstUpdated(t),this._syncSlotContent()}focus(t){this.focusResolvedElementAfterUpdate(()=>this._thumbRef.value,t)}setFormItemDescription(t){this.formItemDescription.setDescription(t)}validate(){this.formCtrl.validate()}checkValidity(){return this.formCtrl.checkValidity()}_setValueAndNotify(t){const e=String(this._snapToStep(t));e!==this.value&&(this.value=e,this.formCtrl.syncValue(),this.emitValueChanged(e))}_handleKeyDown(t){if(this.disabled)return;const e=this._safeStep;let i=0;switch(t.key){case"ArrowRight":case"ArrowUp":i=e;break;case"ArrowLeft":case"ArrowDown":i=-e;break;case"Home":this._setValueAndNotify(this._low),t.preventDefault();return;case"End":this._setValueAndNotify(this._high),t.preventDefault();return;case"PageUp":i=e*10;break;case"PageDown":i=-e*10;break;default:return}t.preventDefault(),this._setValueAndNotify(this.numericValue+i)}_handlePointerDown(t){if(this.disabled)return;const e=this._thumbRef.value,i=this._trackRef.value;if(!e||!i)return;const a=t.composedPath().includes(e);t.pointerType==="touch"&&!a||(t.preventDefault(),this._dragging=!0,e.setPointerCapture(t.pointerId),e.focus({preventScroll:!0}),this._updateValueFromPointer(t))}_handlePointerMove(t){this._dragging&&this._updateValueFromPointer(t)}_handlePointerUp(){this._endDrag()}_handleLostPointerCapture(){this._endDrag()}_endDrag(){this._dragging&&(this._dragging=!1)}_updateValueFromPointer(t){const e=this._trackRef.value;if(!e)return;const i=e.getBoundingClientRect();if(i.width<=0)return;const a=Math.max(0,Math.min(1,(t.clientX-i.left)/i.width)),r=this._low+a*(this._high-this._low);this._setValueAndNotify(r)}_handleSlotChange(){this._syncSlotContent()}_syncSlotContent(){const t=this._slotRef.value;if(!t)return;const e=t.assignedNodes({flatten:!0});this._hasSlotContent=e.some(i=>i.nodeType===Node.ELEMENT_NODE||i.textContent?.trim())}formResetCallback(){this.formCtrl.handleFormReset()}formStateRestoreCallback(t){this.formCtrl.handleFormStateRestore(t)}formDisabledCallback(t){this.formCtrl.handleFormDisabled(t)}render(){const t=this.percentage,e=this._hasSlotContent?this._labelId:void 0,i=this._hasSlotContent?void 0:this.label||void 0;return c`
      <div
        class=${w({"slider-container":!0,dragging:this._dragging})}
        @pointerdown=${this._handlePointerDown}
        @pointermove=${this._handlePointerMove}
        @pointerup=${this._handlePointerUp}
        @lostpointercapture=${this._handleLostPointerCapture}
      >
        <div class="track" ${u(this._trackRef)}>
          <div class="track-fill" style=${_({width:`${t}%`})}></div>
        </div>
        <div
          class="thumb"
          ${u(this._thumbRef)}
          role="slider"
          tabindex=${this.disabled?-1:0}
          aria-valuemin=${this._low}
          aria-valuemax=${this._high}
          aria-valuenow=${this.numericValue}
          aria-valuetext=${String(this.numericValue)}
          aria-orientation="horizontal"
          aria-labelledby=${g(e)}
          aria-label=${g(i)}
          aria-disabled=${String(this.disabled)}
          @keydown=${this._handleKeyDown}
          style=${_({left:`${t}%`})}
        ></div>
      </div>
      ${this._hasSlotContent?c`<span class="label" id=${this._labelId}>
            <slot ${u(this._slotRef)} @slotchange=${this._handleSlotChange}></slot>
          </span>`:c`<slot ${u(this._slotRef)} @slotchange=${this._handleSlotChange} hidden></slot>`}
    `}};s.formAssociated=!0,s._nextId=0,s.styles=[...b.styles,C(".thumb:focus-visible","--esp-slider-focus-shadow","0 0 0 3px","var(--esp-slider-thumb-shadow, 0 1px 3px oklch(0 0 0 / 0.2)),"),k(".slider-container"),v`
      :host {
        display: block;
      }

      .slider-container {
        position: relative;
        display: flex;
        align-items: center;
        height: var(--esp-slider-thumb-size, var(--esp-size-normal-to-medium));
        cursor: pointer;
        user-select: none;
      }

      .track {
        position: relative;
        width: 100%;
        height: var(--esp-slider-track-height, 6px);
        background: var(--esp-slider-track-color, var(--esp-color-border));
        border-radius: var(
          --esp-slider-track-border-radius,
          calc(var(--esp-slider-track-height, 6px) / 2)
        );
        overflow: hidden;
      }

      .track-fill {
        height: 100%;
        background: var(--esp-slider-track-fill-color, var(--esp-color-action-background));
        border-radius: inherit;
        transition: width 0.15s ease;
      }

      .thumb {
        position: absolute;
        width: var(--esp-slider-thumb-size, var(--esp-size-normal-to-medium));
        height: var(--esp-slider-thumb-size, var(--esp-size-normal-to-medium));
        background: var(--esp-slider-thumb-color, var(--esp-color-layer-1));
        border: 2px solid var(--esp-slider-thumb-border-color, var(--esp-color-border));
        border-radius: 50%;
        box-shadow: var(--esp-slider-thumb-shadow, 0 1px 3px oklch(0 0 0 / 0.2));
        transform: translateX(-50%);
        transition:
          left 0.15s ease,
          transform 0.15s ease;
        outline: none;
        touch-action: none;
      }

      @media (pointer: fine) {
        :host(:not([disabled])) .thumb:hover {
          transform: translateX(-50%) scale(1.15);
        }
      }

      .slider-container.dragging .track-fill,
      .slider-container.dragging .thumb {
        transition: none;
      }

      .label {
        display: block;
        font-family: var(--esp-font-body);
        font-size: var(--esp-size-font);
        color: var(--esp-color-text);
        line-height: 1.3;
      }

      @media (prefers-reduced-motion: reduce) {
        .track-fill,
        .thumb {
          transition: none;
        }
      }
    `],o([n({type:Number})],s.prototype,"min",void 0),o([n({type:Number})],s.prototype,"max",void 0),o([n({type:Number})],s.prototype,"step",void 0),o([n({type:String})],s.prototype,"value",void 0),o([n({type:String,reflect:!0})],s.prototype,"name",void 0),o([n({type:Boolean,reflect:!0})],s.prototype,"disabled",void 0),o([n({type:String})],s.prototype,"label",void 0),o([f()],s.prototype,"_dragging",void 0),o([f()],s.prototype,"_hasSlotContent",void 0),s=p=o([y("esp-slider")],s);export{s as EspalierSlider};
