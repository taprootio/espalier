var i=function(s,e,r,a){var o=arguments.length,n=o<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,r):a,d;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(s,e,r,a);else for(var l=s.length-1;l>=0;l--)(d=s[l])&&(n=(o<3?d(n):o>3?d(e,r,n):d(e,r))||n);return o>3&&n&&Object.defineProperty(e,r,n),n};import{css as b,html as f,nothing as v}from"lit";import{customElement as y,property as p,state as x}from"lit/decorators.js";import{classMap as _}from"lit/directives/class-map.js";import{renderConfiguredBrand as z}from"../shared/configured-brand.js";import{EspalierElementBase as g}from"../shared/esp-element-base.js";import{slotHasContent as c}from"../shared/slot-content.js";import"./esp-footer-link-group.js";const m=new Set(["auto","1","2","3","4","5","6"]),u={media:!1,brand:!1,groups:!1,aside:!1,bottom:!1},k={fromAttribute(s){return s&&m.has(s)?s:"auto"},toAttribute(s){return m.has(s)?s:"auto"}};let t=class extends g{constructor(){super(...arguments),this.slotContent={...u},this.brandText="",this.brandLogo="",this.brandHref="",this.brandAlt="",this.columns="auto",this.fullBleedContent=!1,this.landmarkLabel="",this.handleSlotChange=e=>{if(!(e.target instanceof HTMLSlotElement))return;const r=this.slotRegion(e.target);if(!r)return;const a=c(e.target);this.slotContent[r]!==a&&(this.slotContent={...this.slotContent,[r]:a})}}willUpdate(e){super.willUpdate(e),e.has("columns")&&!m.has(this.columns)&&(this.columns="auto")}slotRegion(e){return e.name?["media","brand","aside","bottom"].includes(e.name)?e.name:null:"groups"}firstUpdated(e){super.firstUpdated(e);const r={...u};for(const a of this.shadowRoot?.querySelectorAll("slot")??[]){const o=this.slotRegion(a);o&&(r[o]=c(a))}Object.entries(r).some(([a,o])=>this.slotContent[a]!==o)&&(this.slotContent=r)}render(){const{media:e,brand:r,groups:a,aside:o,bottom:n}=this.slotContent,d=r||!!(this.brandLogo||this.brandText),l=d||a||o,h={primary:!0,"has-brand":d,"has-groups":a,"has-aside":o};return f`
      <footer part="footer" aria-label=${this.landmarkLabel||v}>
        <div part="background" class="background" aria-hidden="true"></div>
        <div part="content" class="content-frame">
          <div class="content">
            <div part="media" class="media" ?hidden=${!e}>
              <slot name="media" @slotchange=${this.handleSlotChange}></slot>
            </div>

            <div part="primary" class=${_(h)} ?hidden=${!l}>
              <div part="brand" class="brand" ?hidden=${!d}>
                <slot name="brand" @slotchange=${this.handleSlotChange}
                  >${z({brandLogo:this.brandLogo,brandText:this.brandText,brandHref:this.brandHref,brandAlt:this.brandAlt})}</slot
                >
              </div>

              <div part="groups" class="groups" ?hidden=${!a}>
                <slot @slotchange=${this.handleSlotChange}></slot>
              </div>

              <div part="aside" class="aside" ?hidden=${!o}>
                <slot name="aside" @slotchange=${this.handleSlotChange}></slot>
              </div>
            </div>

            <div part="bottom" class="bottom" ?hidden=${!n}>
              <slot name="bottom" @slotchange=${this.handleSlotChange}></slot>
            </div>
          </div>
        </div>
      </footer>
    `}};t.styles=[...g.styles,b`
      :host {
        display: block;
        min-inline-size: 0;
      }

      [hidden] {
        display: none !important;
      }

      footer {
        position: relative;
        isolation: isolate;
        min-inline-size: 0;
        overflow: hidden;
        color: var(--esp-footer-color, var(--esp-color-text));
        background: var(--esp-footer-background, var(--esp-color-layer-2));
        border-block-start: var(--esp-footer-border, 1px solid var(--esp-color-border));
      }

      .background {
        position: absolute;
        z-index: -1;
        inset: 0;
        pointer-events: none;
        background-image: var(--esp-footer-background-image, none);
        background-repeat: var(--esp-footer-background-repeat, repeat);
        background-position: var(--esp-footer-background-position, 0 0);
        background-size: var(--esp-footer-background-size, auto);
        opacity: var(--esp-footer-background-image-opacity, 1);
        mix-blend-mode: var(--esp-footer-background-blend-mode, normal);
      }

      .content-frame {
        --_esp-footer-content-surplus: max(
          0px,
          calc(100% - var(--esp-footer-content-max-width, 100%))
        );

        box-sizing: border-box;
        min-inline-size: 0;
        padding-inline: calc(var(--_esp-footer-content-surplus) * var(--esp-footer-content-lead, 0))
          calc(var(--_esp-footer-content-surplus) * (1 - var(--esp-footer-content-lead, 0)));
      }

      :host([full-bleed-content]) .content-frame {
        padding-inline: 0;
      }

      .content {
        display: grid;
        container: esp-footer / inline-size;
        gap: var(--esp-footer-section-gap, var(--esp-size-big));
        min-inline-size: 0;
        padding-block: var(--esp-footer-padding-block, var(--esp-size-padding-page))
          calc(
            var(--esp-footer-padding-block, var(--esp-size-padding-page)) +
              env(safe-area-inset-bottom, 0px)
          );
        padding-inline: var(--esp-footer-padding-inline, var(--esp-size-padding-page));
      }

      .media,
      .primary,
      .brand,
      .groups,
      .aside,
      .bottom {
        min-inline-size: 0;
      }

      .media ::slotted(img),
      .media ::slotted(picture),
      .media ::slotted(esp-image) {
        display: block;
        inline-size: 100%;
        max-inline-size: 100%;
      }

      .primary {
        display: grid;
        grid-template-columns: minmax(10rem, 1fr) minmax(0, 3fr) minmax(10rem, 1fr);
        grid-template-areas: "brand groups aside";
        gap: var(--esp-footer-row-gap, var(--esp-size-big))
          var(--esp-footer-column-gap, var(--esp-size-padding-page));
        align-items: start;
      }

      .primary.has-brand.has-groups:not(.has-aside),
      .primary.has-groups.has-aside:not(.has-brand) {
        grid-template-columns: minmax(10rem, 1fr) minmax(0, 3fr);
      }

      .primary.has-brand.has-groups:not(.has-aside) {
        grid-template-areas: "brand groups";
      }

      .primary.has-groups.has-aside:not(.has-brand) {
        grid-template-areas: "groups aside";
      }

      .primary.has-brand.has-aside:not(.has-groups) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-template-areas: "brand aside";
      }

      .primary.has-brand:not(.has-groups):not(.has-aside) {
        grid-template-columns: minmax(0, 1fr);
        grid-template-areas: "brand";
      }

      .primary.has-groups:not(.has-brand):not(.has-aside) {
        grid-template-columns: minmax(0, 1fr);
        grid-template-areas: "groups";
      }

      .primary.has-aside:not(.has-brand):not(.has-groups) {
        grid-template-columns: minmax(0, 1fr);
        grid-template-areas: "aside";
      }

      .brand {
        grid-area: brand;
      }

      .groups {
        --_esp-footer-column-gap: var(--esp-footer-column-gap, var(--esp-size-padding-page));
        --_esp-footer-column-min: var(--esp-footer-link-group-min-width, 10rem);
        --_esp-footer-column-basis: var(--_esp-footer-column-min);

        grid-area: groups;
        display: grid;
        grid-template-columns: repeat(
          auto-fit,
          minmax(min(100%, var(--_esp-footer-column-basis)), 1fr)
        );
        gap: var(--esp-footer-row-gap, var(--esp-size-big)) var(--_esp-footer-column-gap);
      }

      :host([columns="1"]) .groups {
        --_esp-footer-column-basis: 100%;
      }

      :host([columns="2"]) .groups {
        --_esp-footer-column-basis: max(
          var(--_esp-footer-column-min),
          calc(50% - var(--_esp-footer-column-gap))
        );
      }

      :host([columns="3"]) .groups {
        --_esp-footer-column-basis: max(
          var(--_esp-footer-column-min),
          calc(33.3333% - var(--_esp-footer-column-gap))
        );
      }

      :host([columns="4"]) .groups {
        --_esp-footer-column-basis: max(
          var(--_esp-footer-column-min),
          calc(25% - var(--_esp-footer-column-gap))
        );
      }

      :host([columns="5"]) .groups {
        --_esp-footer-column-basis: max(
          var(--_esp-footer-column-min),
          calc(20% - var(--_esp-footer-column-gap))
        );
      }

      :host([columns="6"]) .groups {
        --_esp-footer-column-basis: max(
          var(--_esp-footer-column-min),
          calc(16.6667% - var(--_esp-footer-column-gap))
        );
      }

      .aside {
        grid-area: aside;
      }

      .configured-brand {
        display: inline-flex;
        align-items: center;
        gap: var(--esp-size-small);
        max-inline-size: 100%;
        color: var(--esp-footer-heading-color, var(--esp-color-headings));
        font-family: var(--esp-font-brand, var(--esp-font-headings));
        font-size: var(--esp-type-medium);
        font-weight: var(--esp-font-weight-brand, var(--esp-font-weight-headings));
        line-height: 1.1;
        overflow-wrap: anywhere;
        text-decoration: none;
      }

      a.configured-brand:hover {
        color: var(--esp-footer-link-hover-color, var(--esp-color-link-hover));
        text-decoration: underline;
        text-underline-offset: 0.18em;
      }

      a.configured-brand:focus-visible {
        border-radius: var(--esp-size-border-radius);
        outline: var(--esp-footer-focus-outline, 2px solid var(--esp-color-link));
        outline-offset: 3px;
      }

      .brand-logo {
        display: block;
        inline-size: auto;
        max-inline-size: min(var(--esp-footer-brand-logo-max-width, 12rem), 100%);
        block-size: var(--esp-footer-brand-logo-size, 3rem);
        object-fit: contain;
      }

      .brand-text {
        min-inline-size: 0;
      }

      @container esp-footer (max-width: 48rem) {
        .primary,
        .primary.has-brand.has-groups:not(.has-aside),
        .primary.has-groups.has-aside:not(.has-brand),
        .primary.has-brand.has-aside:not(.has-groups),
        .primary.has-brand:not(.has-groups):not(.has-aside),
        .primary.has-groups:not(.has-brand):not(.has-aside),
        .primary.has-aside:not(.has-brand):not(.has-groups) {
          grid-template-columns: minmax(0, 1fr);
        }

        .primary.has-brand.has-groups.has-aside {
          grid-template-areas:
            "brand"
            "groups"
            "aside";
        }

        .primary.has-brand.has-groups:not(.has-aside) {
          grid-template-areas:
            "brand"
            "groups";
        }

        .primary.has-groups.has-aside:not(.has-brand) {
          grid-template-areas:
            "groups"
            "aside";
        }

        .primary.has-brand.has-aside:not(.has-groups) {
          grid-template-areas:
            "brand"
            "aside";
        }

        .primary.has-brand:not(.has-groups):not(.has-aside) {
          grid-template-areas: "brand";
        }

        .primary.has-groups:not(.has-brand):not(.has-aside) {
          grid-template-areas: "groups";
        }

        .primary.has-aside:not(.has-brand):not(.has-groups) {
          grid-template-areas: "aside";
        }
      }
    `],i([x()],t.prototype,"slotContent",void 0),i([p({attribute:"brand-text",type:String})],t.prototype,"brandText",void 0),i([p({attribute:"brand-logo",type:String})],t.prototype,"brandLogo",void 0),i([p({attribute:"brand-href",type:String})],t.prototype,"brandHref",void 0),i([p({attribute:"brand-alt",type:String})],t.prototype,"brandAlt",void 0),i([p({converter:k,reflect:!0})],t.prototype,"columns",void 0),i([p({attribute:"full-bleed-content",type:Boolean,reflect:!0})],t.prototype,"fullBleedContent",void 0),i([p({attribute:"landmark-label",type:String})],t.prototype,"landmarkLabel",void 0),t=i([y("esp-footer")],t);export{t as EspalierFooter};
