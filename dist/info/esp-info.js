var p=function(r,t,e,s){var i=arguments.length,o=i<3?t:s===null?s=Object.getOwnPropertyDescriptor(t,e):s,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(r,t,e,s);else for(var a=r.length-1;a>=0;a--)(c=r[a])&&(o=(i<3?c(o):i>3?c(t,e,o):c(t,e))||o);return i>3&&o&&Object.defineProperty(t,e,o),o};import{css as f,html as l}from"lit";import{customElement as v,property as d}from"lit/decorators.js";import{EspalierElementBase as m}from"../shared/esp-element-base.js";import{ESP_EVENTS as h}from"../shared/events.js";import{intentSurfaceTokens as u}from"../shared/style-fragments.js";import{classMap as b}from"lit/directives/class-map.js";import{trashSVG as g}from"../shared/svgs/trash.js";import{ref as y}from"lit/directives/ref.js";import{getIconHrefForHost as S}from"../shared/intent-values.js";import{SlottedIconController as E}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as _}from"../shared/svgs/render-sprite-icon.js";let n=class extends m{constructor(){super(...arguments),this.intentEmitsTokens=!1,this.iconSlot=new E(this),this.intentBacker="info",this.icon="",this.destroyable=!1}render(){const t=S(this.icon,this),e=this.iconSlot.hasSlottedIcon('[slot="icon-slot"]');return l`
      <section class=${b({[`intent-${this.intent}`]:!0})}>
        <div class="icon">
          <slot
            name="icon-slot"
            ${y(this.iconSlot.slotRef)}
            @slotchange=${this.iconSlot.handleSlotChange}
          ></slot>
          ${!e&&t?_(t):l``}
        </div>
        <div class="message">
          <slot></slot>
        </div>
        ${this.destroyable?l`<esp-button
              class="destroy-button"
              intent="danger"
              icon-only
              @esp-clicked=${()=>{this.dispatchEvent(new CustomEvent(h.INFO_DESTROY,{detail:{toDestroy:this}}))}}
            >
              ${g}
            </esp-button>`:l``}
      </section>
    `}};n.styles=[...m.styles,u,f`
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
    `],p([d({type:String})],n.prototype,"icon",void 0),p([d({type:Boolean})],n.prototype,"destroyable",void 0),n=p([v("esp-info")],n);export{n as EspalierInfo};
