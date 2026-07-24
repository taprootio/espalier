var i=function(s,e,t,l){var a=arguments.length,o=a<3?e:l===null?l=Object.getOwnPropertyDescriptor(e,t):l,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(s,e,t,l);else for(var p=s.length-1;p>=0;p--)(c=s[p])&&(o=(a<3?c(o):a>3?c(e,t,o):c(e,t))||o);return a>3&&o&&Object.defineProperty(e,t,o),o};import{css as d,html as b,nothing as f}from"lit";import{customElement as g,property as n}from"lit/decorators.js";import{EspalierElementBase as u}from"../shared/esp-element-base.js";import{getEspBus as h}from"../shared/bus-events.js";import{requestHelp as m}from"../shared/help-events.js";import{getIconHrefForHost as v}from"../shared/intent-values.js";import{renderSpriteIcon as y}from"../shared/svgs/render-sprite-icon.js";import{resolveHelpTarget as T}from"./help-document.js";let r=class extends u{constructor(){super(...arguments),this.helpUrl="",this.anchor="",this.label="Help",this.helpTitle="",this.active=!1,this.boundHelpStateChanged=e=>{const t=this.resolvedTarget;this.active=!!(e.open&&t&&t.src===e.src&&(t.anchor??"")===(e.anchor??""))},this.handleActivation=()=>{if(this.active){const t=this.resolvedTarget;if(!t)return;h().publish("close-help",{src:t.src,...t.anchor?{anchor:t.anchor}:{}});return}const e=this.resolvedTarget;e&&m({src:e.src,...e.anchor?{anchor:e.anchor}:{},...this.helpTitle.trim()?{title:this.helpTitle.trim()}:{},...this.placementTarget?{placementTarget:this.placementTarget}:{},trigger:this})}}get resolvedTarget(){return T(this,{helpUrl:this.helpUrl,anchor:this.anchor})}connectedCallback(){super.connectedCallback(),h().subscribe("help-state-changed",this.boundHelpStateChanged)}disconnectedCallback(){h().unsubscribe("help-state-changed",this.boundHelpStateChanged),super.disconnectedCallback()}focus(e){this.shadowRoot?.querySelector("button")?.focus(e)}updated(e){super.updated(e),(e.has("helpUrl")||e.has("anchor"))&&(this.active=!1)}render(){if(!this.resolvedTarget)return f;const t=this.getAttribute("aria-label")?.trim()||this.label||"Help",l=v("info",this);return b`
      <button
        type="button"
        aria-label=${t}
        aria-pressed=${this.active?"true":"false"}
        @click=${this.handleActivation}
      >
        ${y(l)}
      </button>
    `}};r.styles=[...u.styles,d`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      button {
        appearance: none;
        background: transparent;
        border: 0;
        border-radius: 0;
        color: var(--esp-color-link);
        cursor: pointer;
        display: inline-grid;
        font: inherit;
        line-height: 1;
        margin: 0;
        padding: 0;
        place-items: center;
        transition:
          background-color 0.15s ease,
          color 0.15s ease;

        .generated-icon {
          block-size: 1em;
          inline-size: 1em;
        }

        &:hover,
        &[aria-pressed="true"] {
          background: var(--esp-color-link-hover-bg);
          color: var(--esp-color-link-hover);
        }

        &:focus-visible {
          outline: 2px solid var(--esp-color-link);
          outline-offset: 2px;
        }
      }
    `],i([n({attribute:"help-url",type:String})],r.prototype,"helpUrl",void 0),i([n({type:String})],r.prototype,"anchor",void 0),i([n({type:String})],r.prototype,"label",void 0),i([n({attribute:"title",type:String})],r.prototype,"helpTitle",void 0),i([n({attribute:!1})],r.prototype,"placementTarget",void 0),i([n({type:Boolean,reflect:!0})],r.prototype,"active",void 0),r=i([g("esp-help-button")],r);export{r as EspalierHelpButton};
