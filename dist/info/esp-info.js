var p=function(s,t,o,n){var i=arguments.length,e=i<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,o):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(s,t,o,n);else for(var l=s.length-1;l>=0;l--)(a=s[l])&&(e=(i<3?a(e):i>3?a(t,o,e):a(t,o))||e);return i>3&&e&&Object.defineProperty(t,o,e),e};import{css as f,html as c}from"lit";import{customElement as u,property as d}from"lit/decorators.js";import{EspalierElementBase as m}from"../shared/esp-element-base.js";import{ESP_EVENTS as h}from"../shared/events.js";import{intentSurfaceTokens as v}from"../shared/style-fragments.js";import{classMap as b}from"lit/directives/class-map.js";import{trashSVG as g}from"../shared/svgs/trash.js";import{ref as y}from"lit/directives/ref.js";import{getIconHrefForHost as S}from"../shared/intent-values.js";import{SlottedIconController as E}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as _}from"../shared/svgs/render-sprite-icon.js";let r=class extends m{constructor(){super(...arguments),this.intentEmitsTokens=!1,this.iconSlot=new E(this),this.intentBacker="info",this.icon="",this.destroyable=!1}render(){const t=S(this.icon,this),o=this.iconSlot.hasSlottedIcon('[slot="icon-slot"]');return c`
      <section class=${b({[`intent-${this.intent}`]:!0})}>
        <div class="icon">
          <slot
            name="icon-slot"
            ${y(this.iconSlot.slotRef)}
            @slotchange=${this.iconSlot.handleSlotChange}
          ></slot>
          ${!o&&t?_(t):c``}
        </div>
        <div class="message">
          <slot></slot>
        </div>
        ${this.destroyable?c`<esp-button
              class="destroy-button"
              intent="danger"
              icon-only
              @esp-clicked=${()=>{this.dispatchEvent(new CustomEvent(h.INFO_DESTROY,{detail:{toDestroy:this}}))}}
            >
              ${g}
            </esp-button>`:c``}
      </section>
    `}};r.styles=[...m.styles,v,f`
      :host {
        display: block;
      }

      section {
        display: grid;
        grid-template-columns: min-content auto min-content;
        background: var(--esp-info-color-background, var(--_esp-intent-background));
        border: 1px solid var(--esp-info-color-border, var(--_esp-intent-border-color));
        border-radius: var(--esp-size-border-radius);
        color: var(--esp-info-color-text, var(--_esp-intent-color));
        font-size: var(--esp-type-small);

        div.icon {
          display: grid;
          place-content: center;
          
          border-start-start-radius: max(0px, calc(var(--esp-size-border-radius) - 1px));
          border-end-start-radius: max(0px, calc(var(--esp-size-border-radius) - 1px));
          padding: var(--esp-size-tiny);
          background: var(--esp-info-color-border, var(--_esp-intent-border-color));
          color: var(--esp-info-color-background, var(--_esp-intent-background));

          .generated-icon,
          slot::slotted(svg) {
            height: var(--esp-size-medium-to-big);
            width: var(--esp-size-medium-to-big);
          }
        }

        div.message {
          padding: var(--esp-size-tiny);
          align-content: center;
        }

        esp-button.destroy-button {
          --esp-button-padding: calc(var(--esp-size-tiny) / 3) !important;
          margin: var(--esp-size-tiny);
        }
      }
    `],p([d({type:String})],r.prototype,"icon",void 0),p([d({type:Boolean})],r.prototype,"destroyable",void 0),r=p([u("esp-info")],r);export{r as EspalierInfo};
