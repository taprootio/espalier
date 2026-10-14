var c=function(l,e,t,o){var n=arguments.length,i=n<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(l,e,t,o);else for(var a=l.length-1;a>=0;a--)(r=l[a])&&(i=(n<3?r(i):n>3?r(e,t,i):r(e,t))||i);return n>3&&i&&Object.defineProperty(e,t,i),i};import{paintedSurface as f,surfaceLayerAttributes as v}from"../shared/surface-layer.js";import{LitElement as m,css as b,html as g,nothing as u}from"lit";import{customElement as y,property as _,state as O}from"lit/decorators.js";import{classMap as k}from"lit/directives/class-map.js";import{createRef as d,ref as h}from"lit/directives/ref.js";import{OverlayController as E}from"../shared/overlay-controller.js";import{ESP_EVENTS as p}from"../shared/events.js";let s=class extends m{constructor(){super(...arguments),this.dialogSlot=d(),this.vellumRef=d(),this.isOpen=!1,this._overlay=new E({host:this,getFocusTrapContainer:()=>this.vellumRef.value??null,getFocusFallback:()=>this.vellumRef.value??null}),this._closeReason="api",this._lifecycleToken=0,this.fullScreen=!1}toggleOpen(){if(this.isOpen){const e=this._closeReason;this._closeReason="api";const t=new CustomEvent(p.DIALOG_CLOSING,{detail:{reason:e},bubbles:!0,composed:!0,cancelable:!0});if(!this.dispatchEvent(t))return;const o=++this._lifecycleToken;this.removeAttribute("is-open"),this.isOpen=!1,this._overlay.close(),this.updateComplete.then(()=>{this.isOpen||this._lifecycleToken!==o||this.dispatchEvent(new CustomEvent(p.DIALOG_CLOSED,{detail:{reason:e},bubbles:!0,composed:!0}))})}else{const e=++this._lifecycleToken;this.setAttribute("is-open","true"),this.isOpen=!0,this._overlay.open(),this.updateComplete.then(()=>{!this.isOpen||this._lifecycleToken!==e||(this._moveFocusIntoDialog(),this.dispatchEvent(new CustomEvent(p.DIALOG_OPENED,{detail:{},bubbles:!0,composed:!0})))})}}_handleKeyDown(e){if(this.isOpen){if(e.key==="Escape"){e.preventDefault(),this._closeReason="escape",this.toggleOpen();return}e.key==="Tab"&&this._overlay.trapFocus(e)}}_moveFocusIntoDialog(){this._overlay.moveFocusInto()}firstUpdated(){this.dialogSlot.value&&this.dialogSlot.value.addEventListener("esp-form-dialog-close-requested",e=>{this._closeReason="close-dialog",this.toggleOpen(),e.preventDefault()})}disconnectedCallback(){super.disconnectedCallback()}render(){const{isOpen:e,fullScreen:t}=this,o={"is-open":e,"full-screen":t};return g`<div
      ${h(this.vellumRef)}
      class="vellum ${k(o)}"
      data-no-swipe
      role=${e?"dialog":u}
      aria-modal=${e?"true":u}
      tabindex="-1"
      @keydown=${this._handleKeyDown}
    >
      <slot ${h(this.dialogSlot)}></slot>
    </div>`}};s.styles=[f(3),v(":host"),b`
      :host {
        display: block;
      }
      .vellum {
        display: grid;
        box-sizing: border-box;
        justify-content: center;
        padding: 0;
        visibility: hidden;
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 0;
        
        height: 100vh;
        height: 100dvh;
        width: 100vw;
        overflow-y: auto;
        outline: none;

        ::slotted(*) {
          z-index: 10;
          position: relative;
        }

        &::before {
          content: "";
          display: block;
          position: fixed;
          inset: 0;
          opacity: var(--esp-dialog-bg-opacity, var(--esp-vellum-opacity, 0.85));
          background: var(
            --esp-color-dialog-bg,
            var(--esp-vellum-background, var(--_esp-surface-background))
          );
          z-index: 1;
        }

        &::after {
          content: "";
          display: block;
          position: fixed;
          inset: 0;
          background-image: var(--esp-vellum-background-image, none);
          background-repeat: repeat;
          opacity: var(--esp-vellum-background-image-opacity, 0.3);
          z-index: 2;
          pointer-events: none;
        }

        &.is-open {
          visibility: visible;
        }
      }

      @media screen and (min-width: 400px) {
        .vellum {
          grid-template-columns: auto auto;
          padding: var(--esp-size-big-to-large) 0;

          &.full-screen {
            padding: 0;
          }
        }
      }
    `],c([O()],s.prototype,"isOpen",void 0),c([_({attribute:"full-screen",type:Boolean})],s.prototype,"fullScreen",void 0),s=c([y("esp-dialog")],s);export{s as EspalierDialog};
