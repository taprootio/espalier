var a=function(n,e,s,t){var o=arguments.length,i=o<3?e:t===null?t=Object.getOwnPropertyDescriptor(e,s):t,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(n,e,s,t);else for(var h=n.length-1;h>=0;h--)(c=n[h])&&(i=(o<3?c(i):o>3?c(e,s,i):c(e,s))||i);return o>3&&i&&Object.defineProperty(e,s,i),i};import{css as x,html as m,nothing as p,svg as f}from"lit";import{customElement as y,property as l}from"lit/decorators.js";import{classMap as g}from"lit/directives/class-map.js";import{styleMap as b}from"lit/directives/style-map.js";import{EspalierElementBase as u}from"../shared/esp-element-base.js";const v=15.9155,d=2*Math.PI*v;let r=class extends u{constructor(){super(...arguments),this.value=null,this.max=100,this.label="",this.showValue=!1,this.size="medium",this.mode="bar"}get isIndeterminate(){return this.value===null||this.value===void 0}get clampedValue(){if(this.isIndeterminate)return 0;const e=Math.max(this.max,0);return Math.min(Math.max(this.value,0),e)}get percentage(){return this.isIndeterminate||this.max<=0?0:this.clampedValue/this.max*100}render(){return this.mode==="circle"?this.renderCircle():this.renderBar()}renderBar(){const e=this.isIndeterminate,s={track:!0,indeterminate:e},t=e?{}:{width:`${this.percentage}%`},o=this.showValue&&!e;return m`
      <div
        class=${g(s)}
        role="progressbar"
        aria-label=${this.label}
        aria-valuemin="0"
        aria-valuemax=${this.max}
        aria-valuenow=${e?p:this.clampedValue}
      >
        <div class="fill" style=${b(t)}></div>
      </div>
      ${o?m`<div class="value-text">${Math.round(this.percentage)}%</div>`:p}
    `}renderCircle(){const e=this.isIndeterminate,s=e?d*.75:d-this.percentage/100*d,t=this.showValue&&!e;return m`
      <div class=${g({"circle-container":!0,indeterminate:e})}>
        <svg
          viewBox="0 0 36 36"
          class="circle-svg"
          role="progressbar"
          aria-label=${this.label}
          aria-valuemin="0"
          aria-valuemax=${this.max}
          aria-valuenow=${e?p:this.clampedValue}
        >
          ${f`
            <circle
              class="circle-track"
              cx="18" cy="18" r="${v}"
              fill="none"
              stroke-width="3.5"
            />
            <circle
              class="circle-fill"
              cx="18" cy="18" r="${v}"
              fill="none"
              stroke-width="3.5"
              stroke-dasharray="${d}"
              stroke-dashoffset="${s}"
              stroke-linecap="round"
            />
          `} ${t?f`
              <text
                x="18" y="18"
                class="circle-text"
                dominant-baseline="central"
                text-anchor="middle"
              >${Math.round(this.percentage)}%</text>
            `:p}
        </svg>
      </div>
    `}};r.styles=[...u.styles,x`
      

      :host {
        --_esp-progress-resolved-height: var(--esp-progress-height, 12px);
        --_esp-progress-resolved-circle-size: var(--esp-progress-circle-size, 80px);

        display: block;
      }

      

      :host([size="small"]) {
        --_esp-progress-resolved-height: var(--esp-progress-height, 6px);
        --_esp-progress-resolved-circle-size: var(--esp-progress-circle-size, 48px);
      }

      :host([size="large"]) {
        --_esp-progress-resolved-height: var(--esp-progress-height, 20px);
        --_esp-progress-resolved-circle-size: var(--esp-progress-circle-size, 120px);
      }

      

      .track {
        width: 100%;
        height: var(--_esp-progress-resolved-height);
        border: 1px solid var(--esp-progress-border-color, var(--esp-color-border));
        border-radius: var(--esp-progress-border-radius, var(--esp-size-border-radius));
        overflow: hidden;
        position: relative;
        background: transparent;
      }

      .fill {
        height: 100%;
        background: var(
          --esp-progress-fill-color,
          oklch(from var(--esp-color-action-background) var(--esp-l-muted) c h)
        );
        transition: width 0.3s ease;
        min-width: 0;
      }

      .value-text {
        font-family: var(--esp-font-monospace);
        font-size: var(--esp-progress-font-size, var(--esp-type-small));
        color: var(--esp-progress-text-color, var(--esp-color-text));
        text-align: center;
        margin-top: 0.25em;
        line-height: 1;
      }

      .indeterminate .fill {
        width: 30%;
        animation: shimmer 1.5s ease-in-out infinite;
      }

      @keyframes shimmer {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(calc(100% / 0.3));
        }
      }

      

      :host([mode="circle"]) {
        display: inline-block;
      }

      .circle-container {
        width: var(--_esp-progress-resolved-circle-size);
        height: var(--_esp-progress-resolved-circle-size);
      }

      .circle-svg {
        width: 100%;
        height: 100%;
      }

      .circle-track {
        stroke: var(--esp-progress-border-color, var(--esp-color-border));
      }

      .circle-fill {
        stroke: var(
          --esp-progress-fill-color,
          oklch(from var(--esp-color-action-background) var(--esp-l-muted) c h)
        );
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
        transition: stroke-dashoffset 0.3s ease;
      }

      .circle-text {
        fill: var(--esp-progress-text-color, var(--esp-color-text));
        font-family: var(--esp-font-monospace);
        font-size: 8px;
        font-weight: 600;
      }

      .circle-container.indeterminate .circle-fill {
        animation: spin 1.5s linear infinite;
        transition: none;
      }

      @keyframes spin {
        from {
          transform: rotate(-90deg);
        }
        to {
          transform: rotate(270deg);
        }
      }

      

      @media (prefers-reduced-motion: reduce) {
        .indeterminate .fill {
          animation: none;
          width: 100%;
          opacity: 0.5;
        }

        .circle-container.indeterminate .circle-fill {
          animation: none;
          stroke-dashoffset: 0;
          opacity: 0.5;
        }
      }
    `],a([l({type:Number})],r.prototype,"value",void 0),a([l({type:Number})],r.prototype,"max",void 0),a([l({type:String})],r.prototype,"label",void 0),a([l({attribute:"show-value",type:Boolean})],r.prototype,"showValue",void 0),a([l({type:String,reflect:!0})],r.prototype,"size",void 0),a([l({type:String,reflect:!0})],r.prototype,"mode",void 0),r=a([y("esp-progress")],r);export{r as EspalierProgress};
