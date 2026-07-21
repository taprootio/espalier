var s=function(n,e,r,i){var c=arguments.length,o=c<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,r):i,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(n,e,r,i);else for(var l=n.length-1;l>=0;l--)(p=n[l])&&(o=(c<3?p(o):c>3?p(e,r,o):p(e,r))||o);return c>3&&o&&Object.defineProperty(e,r,o),o};import{css as d,html as f}from"lit";import{customElement as m,property as a}from"lit/decorators.js";import{styleMap as h}from"lit/directives/style-map.js";import{EspalierElementBase as u}from"../shared/esp-element-base.js";import{clampFocus as g,focusConverter as v,normalizeFocus as b}from"../image/image-focus.js";import"../image/esp-image.js";const $="focus-changed";let t=class extends u{constructor(){super(...arguments),this.src="",this.alt="",this.focusPoint={x:.5,y:.5},this.ratio="3/1",this.compactRatio="3/2",this.activePointer=null,this.handlePointerDown=e=>{e.button===0&&(e.preventDefault(),this.activePointer=e.pointerId,e.currentTarget.setPointerCapture?.(e.pointerId),this.updateFromPointer(e))},this.handlePointerMove=e=>{e.pointerId===this.activePointer&&this.updateFromPointer(e)},this.handlePointerEnd=e=>{e.pointerId===this.activePointer&&(e.currentTarget.releasePointerCapture?.(e.pointerId),this.activePointer=null)},this.handleKeyDown=e=>{const r=e.shiftKey?.01:.05,i={};if(e.key==="ArrowLeft")i.x=-r;else if(e.key==="ArrowRight")i.x=r;else if(e.key==="ArrowUp")i.y=-r;else if(e.key==="ArrowDown")i.y=r;else return;e.preventDefault(),this.updateFocus({x:this.focusPoint.x+(i.x??0),y:this.focusPoint.y+(i.y??0)})}}willUpdate(e){if(super.willUpdate(e),e.has("focusPoint")){const r=this.focusPoint,i=b(r);(i.x!==r?.x||i.y!==r?.y)&&(this.focusPoint=i)}}updateFocus(e){const r=g(e),i={x:Number(r.x.toFixed(4)),y:Number(r.y.toFixed(4))};i.x===this.focusPoint.x&&i.y===this.focusPoint.y||(this.focusPoint=i,this.dispatchEvent(new CustomEvent("focus-changed",{detail:{...i},bubbles:!0,composed:!0})))}updateFromPointer(e){const i=e.currentTarget.getBoundingClientRect();i.width<=0||i.height<=0||this.updateFocus({x:(e.clientX-i.left)/i.width,y:(e.clientY-i.top)/i.height})}render(){const e=Math.round(this.focusPoint.x*100),r=Math.round(this.focusPoint.y*100),i={"--_esp-focus-picker-x":`${this.focusPoint.x*100}%`,"--_esp-focus-picker-y":`${this.focusPoint.y*100}%`};return f`
      <div part="picker" class="picker">
        <div
          part="stage"
          class="stage"
          @pointerdown=${this.handlePointerDown}
          @pointermove=${this.handlePointerMove}
          @pointerup=${this.handlePointerEnd}
          @pointercancel=${this.handlePointerEnd}
        >
          <img part="image" src=${this.src} alt=${this.alt} draggable="false" />
          
          <div
            part="marker"
            class="marker"
            style=${h(i)}
            role="slider"
            tabindex="0"
            aria-label="Image focal point"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow=${e}
            aria-valuetext=${`Horizontal ${e}%, vertical ${r}%`}
            @keydown=${this.handleKeyDown}
          ></div>
        </div>

        <div part="previews" class="previews" aria-label="Banner framing previews">
          <figure part="preview" class="preview wide">
            <figcaption>Wide (${this.ratio})</figcaption>
            <esp-image
              banner
              scrim="none"
              .localImage=${this.src}
              .caption=${""}
              .focusPoint=${this.focusPoint}
              .ratio=${this.ratio}
            ></esp-image>
          </figure>
          <figure part="preview" class="preview compact">
            <figcaption>Compact (${this.compactRatio})</figcaption>
            <esp-image
              banner
              scrim="none"
              .localImage=${this.src}
              .caption=${""}
              .focusPoint=${this.focusPoint}
              .ratio=${this.compactRatio}
            ></esp-image>
          </figure>
        </div>
      </div>
    `}};t.styles=[...u.styles,d`
      :host {
        display: block;
        min-inline-size: 0;
      }

      .picker {
        display: grid;
        gap: var(--esp-focus-picker-gap, var(--esp-size-big));
        min-inline-size: 0;
      }

      .stage {
        position: relative;
        overflow: hidden;
        min-block-size: var(--esp-size-big);
        border: 1px solid var(--esp-color-border);
        border-radius: var(--esp-size-border-radius);
        background: var(--esp-focus-picker-stage-background, var(--esp-color-layer-2));
        cursor: crosshair;
        touch-action: none;
        user-select: none;
      }

      .stage img {
        display: block;
        inline-size: 100%;
        block-size: auto;
        pointer-events: none;
      }

      .marker {
        position: absolute;
        inset-inline-start: var(--_esp-focus-picker-x);
        inset-block-start: var(--_esp-focus-picker-y);
        inline-size: var(--esp-focus-picker-marker-size, var(--esp-size-medium));
        block-size: var(--esp-focus-picker-marker-size, var(--esp-size-medium));
        translate: -50% -50%;
        box-sizing: border-box;
        border: var(--esp-focus-picker-marker-border, 2px solid white);
        border-radius: 50%;
        background: var(--esp-focus-picker-marker-color, var(--esp-color-action-background));
        box-shadow: var(--esp-focus-picker-marker-shadow, 0 1px 5px oklch(0 0 0 / 0.65));
        cursor: grab;
      }

      .marker:active {
        cursor: grabbing;
      }
      .marker:focus-visible {
        outline: var(--esp-focus-picker-focus-outline, 3px solid var(--esp-color-link));
        outline-offset: 3px;
      }

      .previews {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 16rem), 1fr));
        gap: var(--esp-focus-picker-gap, var(--esp-size-big));
        min-inline-size: 0;
      }

      figure {
        min-inline-size: 0;
        margin: 0;
      }
      figcaption {
        margin-block-end: var(--esp-size-tiny);
        color: var(--esp-color-text);
        font-size: var(--esp-type-small);
      }

      @media (prefers-reduced-motion: reduce) {
        .marker {
          transition: none;
        }
      }
    `],s([a({type:String})],t.prototype,"src",void 0),s([a({type:String})],t.prototype,"alt",void 0),s([a({attribute:"focus",converter:v,reflect:!0})],t.prototype,"focusPoint",void 0),s([a({type:String})],t.prototype,"ratio",void 0),s([a({attribute:"compact-ratio",type:String})],t.prototype,"compactRatio",void 0),t=s([m("esp-focus-picker")],t);export{t as EspalierFocusPicker,$ as FOCUS_CHANGED_EVENT};
