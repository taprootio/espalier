var p=function(s,o,t,i){var n=arguments.length,e=n<3?o:i===null?i=Object.getOwnPropertyDescriptor(o,t):i,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(s,o,t,i);else for(var c=s.length-1;c>=0;c--)(l=s[c])&&(e=(n<3?l(e):n>3?l(o,t,e):l(o,t))||e);return n>3&&e&&Object.defineProperty(o,t,e),e};import{css as v,html as a}from"lit";import{customElement as f,property as d}from"lit/decorators.js";import{EspalierElementBase as m}from"../shared/esp-element-base.js";import{trashSVG as h}from"../shared/svgs/trash.js";import{ref as u}from"lit/directives/ref.js";import{getIconHrefForHost as b}from"../shared/intent-values.js";import{SlottedIconController as y}from"../shared/slotted-icon-controller.js";import{renderSpriteIcon as g}from"../shared/svgs/render-sprite-icon.js";let r=class extends m{constructor(){super(...arguments),this.iconSlot=new y(this),this.variantBacker="complementary",this.icon="",this.destroyable=!1}render(){const o=b(this.icon,this),t=this.iconSlot.hasSlottedIcon('[slot="icon-slot"]');return a`
      <section>
        <div class="icon">
          <slot
            name="icon-slot"
            ${u(this.iconSlot.slotRef)}
            @slotchange=${this.iconSlot.handleSlotChange}
          ></slot>
          ${!t&&o?g(o):a``}
        </div>
        <div class="message">
          <slot></slot>
        </div>
        ${this.destroyable?a`<esp-button
              class="destroy-button"
              variant="danger"
              icon-only
              @clicked=${()=>{this.dispatchEvent(new CustomEvent("destroy",{detail:{toDestroy:this}}))}}
            >
              ${h}
            </esp-button>`:a``}
      </section>
    `}};r.styles=[...m.styles,v`
      :host {
        display: block;
      }

      section {
        display: grid;
        grid-template-columns: min-content auto min-content;
        background: var(--esp-info-color-background, var(--esp-color-layer-1));
        border: 1px solid var(--esp-info-color-border, var(--esp-color-border));
        border-radius: var(--esp-size-border-radius);
        color: var(--esp-info-color-text, var(--esp-color-text));
        font-size: var(--esp-type-small);

        div.icon {
          display: grid;
          place-content: center;
          padding: var(--esp-size-tiny);
          background: var(--esp-info-color-border, var(--esp-color-border));
          color: var(--esp-info-color-background, var(--esp-color-layer-1));

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
    `],p([d({type:String})],r.prototype,"icon",void 0),p([d({type:Boolean})],r.prototype,"destroyable",void 0),r=p([f("esp-info")],r);export{r as EspalierInfo};
