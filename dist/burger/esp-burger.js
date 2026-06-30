var p=function(n,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,e,t,i);else for(var l=n.length-1;l>=0;l--)(o=n[l])&&(s=(r<3?o(s):r>3?o(e,t,s):o(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};import{LitElement as h,css as m,html as c}from"lit";import{classMap as C}from"lit/directives/class-map.js";import{customElement as u,property as d}from"lit/decorators.js";let a=class extends h{constructor(){super(...arguments),this.menuOpen=!1,this.presentationOnly=!1}render(){const{menuOpen:e}=this,t=e?"Close menu":"Open menu",r=c`
      <svg>
        <defs>
          <filter id="animate-button">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="animate-button"
            />
            <feComposite in="SourceGraphic" in2="animate-button" operator="atop" />
          </filter>
        </defs>
      </svg>
      <div class=${C({plate:!0,active:e})}>
        <svg class="esp-burger" version="1.1" viewBox="0 0 100 100">
          <path
            class="line line1"
            d="M 50,35 H 30 C 30,35 20,33.951333 20,25 C 20,16.048667 30,15 30,15 C 38.261288,15 35.285955,25 40,25 C 44.714045,25 45.285955,15 50,15 C 54.714045,15 55.285955,25 60,25 C 64.714045,25 65.285955,15 70,15 C 74.714045,15 75.285955,25 80,25 C 84.714045,25 85.285955,15 90,15 C 94.714045,15 95.285955,25 100,25 C 104.71405,25 105.28595,15 110,15 C 114.71405,15 115.28595,25 120,25 C 124.71405,25 125.33898,15 130,15"
          />
          <path
            class="line line2"
            d="M 50,35 H 69.999999 C 69.999999,35 79.999999,36.048667 79.999999,45 C 79.999999,53.951333 69.999999,55 69.999999,55 C 61.738709,55 64.714049,45 59.999999,45 C 55.28596,45 54.71405,55 50,55 C 45.285955,55 44.714045,45 40,45 C 35.285955,45 34.714045,55 30,55 C 25.285955,55 24.714045,45 20,45 C 15.285955,45 14.714045,55 10,55 C 5.285955,55 4.714045,45 0,45 C -4.71405,45 -5.28595,55 -10,55 C -14.71405,55 -15.28595,45 -20,45 C -24.71405,45 -25.33898,55 -30,55"
          />
          <path
            class="line line3"
            d="M 50,50 H 30 C 30,50 20,48.95133 20,40 C 20,31.04867 30,30 30,30 C 38.261288,30 35.285955,40 40,40 C 44.714045,40 45.285955,30 50,30 C 54.714045,30 55.285955,40 60,40 C 64.714045,40 65.285955,30 70,30 C 74.714045,30 75.285955,40 80,40 C 84.714045,40 85.285955,30 90,30 C 94.714045,30 95.285955,40 100,40 C 104.71405,40 105.28595,30 110,30 C 114.71405,30 115.28595,40 120,40 C 124.71405,40 125.33898,30 130,30"
          />
          <path
            class="line line4"
            d="M 50,50 H 69.999999 C 69.999999,50 79.999999,51.04867 79.999999,60 C 79.999999,68.95133 69.999999,70 69.999999,70 C 61.738709,70 64.714049,60 59.999999,60 C 55.28596,60 54.71405,70 50,70 C 45.285955,70 44.714045,60 40,60 C 35.285955,60 34.714045,70 30,70 C 25.285955,70 24.714045,60 20,60 C 15.285955,60 14.714045,70 10,70 C 5.285955,70 4.714045,60 0,60 C -4.71405,60 -5.28595,70 -10,70 C -14.71405,70 -15.28595,60 -20,60 C -24.71405,60 -25.33898,70 -30,70"
          />
          <path
            class="line line5"
            d="M 50.000001,65 H 30.000001 C 30.000001,65 20.000001,63.95133 20.000001,55 C 20.000001,46.048664 30.000001,44.999997 30.000001,44.999997 C 38.261289,44.999997 35.285956,55 40.000001,55 C 44.714046,55 45.285956,44.999997 50.000001,44.999997 C 54.714046,44.999997 55.285956,55 60.000001,55 C 64.714046,55 65.285956,44.999997 70.000001,44.999997 C 74.714046,44.999997 75.285956,55 80.000001,55 C 84.714046,55 85.285956,44.999997 90.000001,44.999997 C 94.714046,44.999997 95.285956,55 99.999998,55 C 104.71405,55 105.28595,44.999997 110,44.999997 C 114.71405,44.999997 115.28595,55 120,55 C 124.71405,55 125.33898,44.999997 130,44.999997"
          />
          <path
            class="line line6"
            d="M 50.000001,65 H 70 C 70,65 80,66.04866 80,75 C 80,83.95133 70,85 70,85 C 61.73871,85 64.71405,75 60,75 C 55.285961,75 54.714051,85 50.000001,85 C 45.285956,85 44.714046,75 40.000001,75 C 35.285956,75 34.714046,85 30.000001,85 C 25.285956,85 24.714046,75 20.000001,75 C 15.285956,75 14.714046,85 10.000001,85 C 5.2859559,85 4.7140459,75 0,75 C -4.7140491,75 -5.2859491,85 -9.9999991,85 C -14.714049,85 -15.285949,75 -19.999999,75 C -24.714049,75 -25.338979,85 -29.999999,85"
          />
        </svg>
        <svg class="x" version="1.1" viewBox="0 0 100 100">
          <path class="line" d="M 34,32 L 66,68" />
          <path class="line" d="M 66,32 L 34,68" />
        </svg>
      </div>
    `;return this.presentationOnly?c`<div class="animated-mb" aria-hidden="true">${r}</div>`:c`<button class="animated-mb" @click=${this.toggleMenu} aria-label=${t}>
      ${r}
    </button>`}toggleMenu(){this.menuOpen=!this.menuOpen,this.menuOpen?this.dispatchEvent(new CustomEvent("opened",{bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("closed",{bubbles:!0,composed:!0}))}};a.styles=m`
    :host {
      height: var(--esp-header-height, calc(4.5 * var(--esp-size-small)));
      width: var(--esp-header-height, calc(4.5 * var(--esp-size-small)));
    }
    .animated-mb {
      padding: 0;
      border: none;
      background: transparent;

      
      .plate {
        height: var(--esp-header-height, calc(4.5 * var(--esp-size-small)));
        width: var(--esp-header-height, calc(4.5 * var(--esp-size-small)));
        position: relative;
        cursor: pointer;
      }

      .esp-burger {
        filter: url(#animate-button);
      }

      .x {
        transform: scale(0);
        transition: transform 400ms;
      }

      .line {
        fill: none;
        stroke: var(--esp-color-burger, var(--esp-color-text));
        stroke-width: var(--esp-size-burger-stroke, 8px);
        stroke-linecap: round;
        stroke-linejoin: round;
        transform-origin: 50%;
        transition:
          stroke-dasharray 400ms 100ms,
          stroke-dashoffset 400ms 100ms,
          transform 400ms 100ms,
          color cubic-bezier(0.075, 0.82, 0.165, 1) 500ms,
          stroke 0.5s ease;
      }

      &:hover .line {
        stroke: var(--esp-color-burger-hover, var(--esp-color-text));
      }

      .x .line {
        stroke-width: 5.5px;
      }

      .active .x {
        transform: scale(1);
        transition:
          transform 400ms 350ms,
          stroke cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;
      }

      .active .x .line {
        stroke: var(--esp-color-burger-opened, var(--esp-color-text));
        stroke-width: var(--esp-size-burger-stroke, 8px);
        transition: color cubic-bezier(0.075, 0.82, 0.165, 1) 500ms;
      }

      &:hover .active .x .line {
        stroke: var(--esp-color-burger-opened-hover, var(--esp-color-text));
      }

      svg {
        height: var(--esp-header-height, calc(4.5 * var(--esp-size-small)));
        width: var(--esp-header-height, calc(4.5 * var(--esp-size-small)));
        position: absolute;
        left: 0;
      }

      .line1 {
        stroke-dasharray: 21 201;
      }

      .line2 {
        stroke-dasharray: 21 201;
        transition-delay: 20ms;
      }

      .line3 {
        stroke-dasharray: 21 201;
        transition-delay: 40ms;
      }

      .line4 {
        stroke-dasharray: 21 201;
        transition-delay: 60ms;
      }

      .line5 {
        stroke-dasharray: 21 201;
        transition-delay: 80ms;
      }

      .line6 {
        stroke-dasharray: 21 201;
        transition-delay: 100ms;
      }

      .x {
        transition: transform 400ms 50ms;
      }

      .active .line {
        transition:
          stroke-dasharray 400ms,
          stroke-dashoffset 400ms,
          transform 400ms;
      }

      .active .line1 {
        stroke-dasharray: 5 201;
        stroke-dashoffset: -158px;
      }

      .active .line2 {
        stroke-dasharray: 5 201;
        stroke-dashoffset: -158px;
        transition-delay: 20ms;
      }

      .active .line3 {
        stroke-dasharray: 5 201;
        stroke-dashoffset: -158px;
        transition-delay: 40ms;
      }

      .active .line4 {
        stroke-dasharray: 5 201;
        stroke-dashoffset: -158px;
        transition-delay: 60ms;
      }

      .active .line5 {
        stroke-dasharray: 5 201;
        stroke-dashoffset: -158px;
        transition-delay: 80ms;
      }

      .active .line6 {
        stroke-dasharray: 5 201;
        stroke-dashoffset: -158px;
        transition-delay: 100ms;
      }

      .active .x {
        transition: transform 400ms 50ms;
      }
    }
  `,p([d({attribute:"menu-open",type:Boolean})],a.prototype,"menuOpen",void 0),p([d({attribute:"presentation-only",type:Boolean})],a.prototype,"presentationOnly",void 0),a=p([u("esp-burger")],a);export{a as EspalierBurger};
