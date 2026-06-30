var i=function(n,e,t,p){var o=arguments.length,s=o<3?e:p===null?p=Object.getOwnPropertyDescriptor(e,t):p,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(n,e,t,p);else for(var l=n.length-1;l>=0;l--)(c=n[l])&&(s=(o<3?c(s):o>3?c(e,t,s):c(e,t))||s);return o>3&&s&&Object.defineProperty(e,t,s),s};import{css as d,html as h,nothing as m}from"lit";import{customElement as y,property as a}from"lit/decorators.js";import{EspalierElementBase as f}from"../shared/esp-element-base.js";import{syncNormalizedAttribute as u}from"../shared/attribute-helpers.js";import{srOnly as v}from"../shared/style-fragments.js";import{normalizePresence as g,normalizeSize as z,nullableStringConverter as b}from"./avatar-values.js";import"./esp-avatar.js";let r=class extends f{constructor(){super(...arguments),this.sizeBacker="medium",this.presenceBacker="",this.src="",this.name="",this.secondary=""}get size(){return this.sizeBacker}set size(e){const t=this.sizeBacker;this.sizeBacker=z(e),this.requestUpdate("size",t),u(this,"size",this.sizeBacker)}get presence(){return this.presenceBacker}set presence(e){const t=this.presenceBacker;this.presenceBacker=g(e),this.requestUpdate("presence",t),this.syncPresenceAttribute()}syncPresenceAttribute(){const e=this.getAttribute("presence");if(this.presenceBacker){e!==null&&e!==this.presenceBacker&&this.setAttribute("presence",this.presenceBacker);return}e!==null&&this.removeAttribute("presence")}render(){const e=this.secondary.trim(),t=this.name.trim().length>0;return h`
      <span class="profile-chip" part="profile-chip">
        <esp-avatar
          part="avatar"
          exportparts="avatar:avatar-inner, image:avatar-image, fallback:avatar-fallback, initials:avatar-initials, presence:avatar-presence"
          .src=${this.src}
          .name=${this.name}
          .size=${this.size}
          .presence=${this.presence}
          aria-hidden=${t?"true":m}
        ></esp-avatar>
        <span class="text" part="text">
          <span class="name" part="name"
            >${this.name}${t&&this.presence?h`<span class="presence-label sr-only">, ${this.presence}</span>`:m}</span
          >
          ${e?h`<span class="secondary" part="secondary">${e}</span>`:m}
        </span>
      </span>
    `}};r.styles=[...f.styles,v,d`
      :host {
        display: inline-flex;
        max-width: 100%;
        vertical-align: middle;
      }

      .profile-chip {
        display: inline-flex;
        align-items: center;
        gap: var(--esp-size-tiny-to-small);
        min-width: 0;
        max-width: 100%;
        font-family: var(--esp-font-body);
        font-size: var(--esp-size-font);
        color: var(--esp-color-text);
      }

      .text {
        display: grid;
        gap: 0.1em;
        min-width: 0;
        line-height: 1.2;
      }

      .name,
      .secondary {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .name {
        color: var(--esp-color-text);
        font-weight: 600;
      }

      .secondary {
        color: var(--esp-color-headings);
        font-size: var(--esp-type-small);
      }
    `],i([a({type:String})],r.prototype,"src",void 0),i([a({type:String})],r.prototype,"name",void 0),i([a({type:String,reflect:!0})],r.prototype,"size",null),i([a({type:String})],r.prototype,"secondary",void 0),i([a({reflect:!0,converter:b})],r.prototype,"presence",null),r=i([y("esp-profile-chip")],r);export{r as EspalierProfileChip};
