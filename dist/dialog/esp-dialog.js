var p=function(l,e,t,i){var n=arguments.length,s=n<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(l,e,t,i);else for(var r=l.length-1;r>=0;r--)(a=l[r])&&(s=(n<3?a(s):n>3?a(e,t,s):a(e,t))||s);return n>3&&s&&Object.defineProperty(e,t,s),s};import{paintedSurface as v,surfaceLayerAttributes as f}from"../shared/surface-layer.js";import{LitElement as g,css as b,html as m,nothing as d}from"lit";import{customElement as y,property as k,state as _}from"lit/decorators.js";import{classMap as x}from"lit/directives/class-map.js";import{createRef as u,ref as h}from"lit/directives/ref.js";import{OverlayController as O}from"../shared/overlay-controller.js";import{ESP_EVENTS as c}from"../shared/events.js";let o=class extends g{constructor(){super(...arguments),this.dialogSlot=u(),this.vellumRef=u(),this.isOpen=!1,this._overlay=new O({host:this,getFocusTrapContainer:()=>this.vellumRef.value??null,getFocusFallback:()=>this.vellumRef.value??null}),this._closeReason="api",this._lifecycleToken=0,this.fullScreen=!1}toggleOpen(){if(this.isOpen){const e=this._closeReason;this._closeReason="api";const t=new CustomEvent(c.DIALOG_CLOSING,{detail:{reason:e},bubbles:!0,composed:!0,cancelable:!0});if(!this.dispatchEvent(t))return;const i=++this._lifecycleToken;this.removeAttribute("is-open"),this.isOpen=!1,this._overlay.close(),this.updateComplete.then(()=>{this.isOpen||this._lifecycleToken!==i||this.dispatchEvent(new CustomEvent(c.DIALOG_CLOSED,{detail:{reason:e},bubbles:!0,composed:!0}))})}else{const e=++this._lifecycleToken;this.setAttribute("is-open","true"),this.isOpen=!0,this._overlay.open(),this.updateComplete.then(()=>{!this.isOpen||this._lifecycleToken!==e||(this._moveFocusIntoDialog(),this.dispatchEvent(new CustomEvent(c.DIALOG_OPENED,{detail:{},bubbles:!0,composed:!0})))})}}_handleKeyDown(e){if(this.isOpen){if(e.key==="Escape"){e.preventDefault(),this._closeReason="escape",this.toggleOpen();return}e.key==="Tab"&&this._overlay.trapFocus(e)}}_moveFocusIntoDialog(){this._overlay.moveFocusInto()}firstUpdated(){this.dialogSlot.value&&this.dialogSlot.value.addEventListener("esp-form-dialog-close-requested",e=>{this._closeReason="close-dialog",this.toggleOpen(),e.preventDefault()})}disconnectedCallback(){super.disconnectedCallback()}render(){const{isOpen:e,fullScreen:t}=this,i={"is-open":e,"full-screen":t};return m`<div
      ${h(this.vellumRef)}
      class="vellum ${x(i)}"
      data-no-swipe
      role=${e?"dialog":d}
      aria-modal=${e?"true":d}
      tabindex="-1"
      @keydown=${this._handleKeyDown}
    >
      <slot ${h(this.dialogSlot)}></slot>
    </div>`}};o.styles=[v(3),f(":host"),b`
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
        inset-inline-start: var(--esp-dialog-inset-inline-start, 0px);
        inset-block-start: var(--esp-dialog-inset-block-start, 0px);
        
        width: calc(
          100vw - var(--esp-dialog-inset-inline-start, 0px) - var(
              --esp-dialog-inset-inline-end,
              0px
            )
        );
        height: calc(
          100vh - var(--esp-dialog-inset-block-start, 0px) - var(--esp-dialog-inset-block-end, 0px)
        );
        height: calc(
          100dvh - var(--esp-dialog-inset-block-start, 0px) - var(--esp-dialog-inset-block-end, 0px)
        );
        overflow-y: auto;
        outline: none;

        ::slotted(*) {
          z-index: 10;
          position: relative;
        }

        &::before,
        &::after {
          content: "";
          display: block;
          position: fixed;
          inset-inline: var(--esp-dialog-inset-inline-start, 0px)
            var(--esp-dialog-inset-inline-end, 0px);
          inset-block: var(--esp-dialog-inset-block-start, 0px)
            var(--esp-dialog-inset-block-end, 0px);
        }

        &::before {
          opacity: var(--esp-dialog-bg-opacity, var(--esp-vellum-opacity, 0.85));
          background: var(
            --esp-color-dialog-bg,
            var(--esp-vellum-background, var(--_esp-surface-background))
          );
          z-index: 1;
        }

        &::after {
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
    `],p([_()],o.prototype,"isOpen",void 0),p([k({attribute:"full-screen",type:Boolean})],o.prototype,"fullScreen",void 0),o=p([y("esp-dialog")],o);export{o as EspalierDialog};
