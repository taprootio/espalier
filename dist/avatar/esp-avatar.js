var l=function(a,e,r,o){var n=arguments.length,s=n<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,r):o,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(a,e,r,o);else for(var h=a.length-1;h>=0;h--)(i=a[h])&&(s=(n<3?i(s):n>3?i(e,r,s):i(e,r))||s);return n>3&&s&&Object.defineProperty(e,r,s),s};import{css as b,html as p,nothing as m}from"lit";import{customElement as y,property as c}from"lit/decorators.js";import{classMap as g}from"lit/directives/class-map.js";import{EspalierElementBase as f}from"../shared/esp-element-base.js";import{syncNormalizedAttribute as k}from"../shared/attribute-helpers.js";import{normalizeCrossOrigin as z,normalizeLoading as _,normalizePresence as B,normalizeReferrerPolicy as P,normalizeSize as O,nullableStringConverter as $}from"./avatar-values.js";const d=["primary","analogous-left","analogous-right","complementary","split-complementary-left","split-complementary-right","triadic-left","triadic-right"];function v(a){const e=Intl.Segmenter;return e?Array.from(new e(void 0,{granularity:"grapheme"}).segment(a),r=>r.segment):Array.from(a)}function u(a){return/[\p{Letter}\p{Number}]/u.test(a)}function w(a){const e=v(a).filter(r=>r.trim().length>0);return e.find(r=>u(r))??e[0]??""}function A(a){const e=a.trim().replace(/^@+/,"");if(!e)return"?";const r=e.split(/[\s._-]+/u).map(i=>i.trim()).filter(Boolean);if(r.length>1)return r.map(w).filter(Boolean).slice(0,2).join("").toLocaleUpperCase();const o=v(r[0]??e).filter(i=>i.trim().length>0),n=o.filter(u);return(n.length>0?n:o).slice(0,2).join("").toLocaleUpperCase()||"?"}function S(a){let e=0;for(const r of a)e=e*31+r.codePointAt(0)>>>0;return e}let t=class extends f{constructor(){super(...arguments),this.sizeBacker="medium",this.presenceBacker="",this.loadingBacker="lazy",this.crossOriginBacker="",this.referrerPolicyBacker="no-referrer",this.imageFailed=!1,this.src="",this.name=""}get size(){return this.sizeBacker}set size(e){const r=this.sizeBacker;this.sizeBacker=O(e),this.requestUpdate("size",r),k(this,"size",this.sizeBacker)}get presence(){return this.presenceBacker}set presence(e){const r=this.presenceBacker;this.presenceBacker=B(e),this.requestUpdate("presence",r),this.syncPresenceAttribute()}get loading(){return this.loadingBacker}set loading(e){const r=this.loadingBacker;this.loadingBacker=_(e),this.requestUpdate("loading",r)}get crossOrigin(){return this.crossOriginBacker}set crossOrigin(e){const r=this.crossOriginBacker;this.crossOriginBacker=z(e),this.requestUpdate("crossOrigin",r)}get referrerPolicy(){return this.referrerPolicyBacker}set referrerPolicy(e){const r=this.referrerPolicyBacker;this.referrerPolicyBacker=P(e),this.requestUpdate("referrerPolicy",r)}willUpdate(e){e.has("src")&&(this.imageFailed=!1)}syncPresenceAttribute(){const e=this.getAttribute("presence");if(this.presenceBacker){e!==null&&e!==this.presenceBacker&&this.setAttribute("presence",this.presenceBacker);return}e!==null&&this.removeAttribute("presence")}get accessibleName(){const e=this.name.trim()||"Avatar";return this.presence?`${e}, ${this.presence}`:e}get fallbackColorClass(){const e=S(this.name.trim().toLocaleLowerCase())%d.length;return`fallback-${d[e]}`}handleImageError(){this.imageFailed||(this.imageFailed=!0,this.requestUpdate())}retryImage(){this.imageFailed&&(this.imageFailed=!1,this.requestUpdate())}render(){const e=this.src.trim().length>0&&!this.imageFailed,r=this.presence;return p`
      <span class="avatar" part="avatar">
        <span class="visual" part=${e?"image":"fallback"}>
          ${e?p`
                <img
                  src=${this.src}
                  alt=${this.accessibleName}
                  decoding="async"
                  loading=${this.loading}
                  referrerpolicy=${this.referrerPolicy||m}
                  crossorigin=${this.crossOrigin||m}
                  @error=${this.handleImageError}
                />
              `:p`
                <span
                  class=${g({fallback:!0,[this.fallbackColorClass]:!0})}
                  role="img"
                  aria-label=${this.accessibleName}
                >
                  <span class="initials" part="initials">${A(this.name)}</span>
                </span>
              `}
        </span>
        ${r?p`<span
              class=${g({presence:!0,[r]:!0})}
              part="presence"
              aria-hidden="true"
            ></span>`:m}
      </span>
    `}};t.styles=[...f.styles,b`
      :host {
        --_esp-avatar-resolved-size: var(--esp-avatar-size, var(--esp-size-big));
        --_esp-avatar-fallback-base: var(--esp-color-primary);
        --_esp-avatar-presence-color: var(--esp-color-border);

        display: inline-block;
        width: var(--_esp-avatar-resolved-size);
        height: var(--_esp-avatar-resolved-size);
        vertical-align: middle;
      }

      :host([size="small"]) {
        --_esp-avatar-resolved-size: var(--esp-avatar-size, var(--esp-size-medium));
      }

      :host([size="large"]) {
        --_esp-avatar-resolved-size: var(--esp-avatar-size, var(--esp-size-large));
      }

      .avatar {
        position: relative;
        display: inline-block;
        width: 100%;
        height: 100%;
      }

      .visual,
      img,
      .fallback {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: var(--esp-avatar-border-radius, 50%);
      }

      .visual {
        overflow: hidden;
        background: var(--esp-color-layer-2);
        border: 1px solid var(--esp-color-border);
      }

      img {
        object-fit: cover;
      }

      .fallback {
        display: grid;
        place-items: center;
        background: var(--esp-color-layer-3);
        background: oklch(from var(--_esp-avatar-fallback-base) var(--esp-l-raised-3) c h);
        color: var(--esp-color-text);
        color: oklch(from var(--_esp-avatar-fallback-base) var(--esp-l-ink) c h);
        font-family: var(--esp-font-headings);
        font-size: calc(var(--_esp-avatar-resolved-size) * 0.38);
        font-weight: var(--esp-font-weight-headings);
        line-height: 1;
        user-select: none;
      }

      .fallback-primary {
        --_esp-avatar-fallback-base: var(--esp-color-primary);
      }

      .fallback-analogous-left {
        --_esp-avatar-fallback-base: var(--esp-color-analogous-left);
      }

      .fallback-analogous-right {
        --_esp-avatar-fallback-base: var(--esp-color-analogous-right);
      }

      .fallback-complementary {
        --_esp-avatar-fallback-base: var(--esp-color-complementary);
      }

      .fallback-split-complementary-left {
        --_esp-avatar-fallback-base: var(--esp-color-split-complementary-left);
      }

      .fallback-split-complementary-right {
        --_esp-avatar-fallback-base: var(--esp-color-split-complementary-right);
      }

      .fallback-triadic-left {
        --_esp-avatar-fallback-base: var(--esp-color-triadic-left);
      }

      .fallback-triadic-right {
        --_esp-avatar-fallback-base: var(--esp-color-triadic-right);
      }

      .presence {
        position: absolute;
        right: 0;
        bottom: 0;
        width: max(0.65rem, calc(var(--_esp-avatar-resolved-size) * 0.28));
        height: max(0.65rem, calc(var(--_esp-avatar-resolved-size) * 0.28));
        border: 2px solid var(--esp-color-background);
        border-radius: 50%;
        background: var(--_esp-avatar-presence-color);
        box-shadow: 0 0 0 1px var(--esp-color-border);
      }

      .presence.online {
        --_esp-avatar-presence-color: var(--esp-color-success);
      }

      .presence.away {
        --_esp-avatar-presence-color: var(--esp-color-warning);
      }

      .presence.busy {
        --_esp-avatar-presence-color: var(--esp-color-danger);
      }

      .presence.offline {
        --_esp-avatar-presence-color: var(--esp-color-border);
      }
    `],l([c({type:String})],t.prototype,"src",void 0),l([c({type:String})],t.prototype,"name",void 0),l([c({type:String,reflect:!0})],t.prototype,"size",null),l([c({reflect:!0,converter:$})],t.prototype,"presence",null),l([c({type:String})],t.prototype,"loading",null),l([c({attribute:"crossorigin",type:String})],t.prototype,"crossOrigin",null),l([c({attribute:"referrerpolicy",type:String})],t.prototype,"referrerPolicy",null),t=l([y("esp-avatar")],t);export{t as EspalierAvatar};
