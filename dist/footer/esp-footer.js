var r=function(p,e,o,a){var i=arguments.length,s=i<3?e:a===null?a=Object.getOwnPropertyDescriptor(e,o):a,d;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(p,e,o,a);else for(var l=p.length-1;l>=0;l--)(d=p[l])&&(s=(i<3?d(s):i>3?d(e,o,s):d(e,o))||s);return i>3&&s&&Object.defineProperty(e,o,s),s};import{paintedSurface as v}from"../shared/surface-layer.js";import{css as u,html as y,nothing as k}from"lit";import{customElement as S,property as n,state as x}from"lit/decorators.js";import{styleMap as c}from"lit/directives/style-map.js";import{CONFIGURED_BRAND_LOGO_ASPECT_RATIO as z,configuredBrandLogoGeometry as B,renderConfiguredBrand as C,resolveConfiguredBrand as _}from"../shared/configured-brand.js";import{syncNormalizedAttribute as f}from"../shared/attribute-helpers.js";import{EspalierElementBase as b}from"../shared/esp-element-base.js";import{slotHasContent as g}from"../shared/slot-content.js";import{renderVisualOverlay as w,visualOverlayStyles as L}from"../shared/visual-overlay.js";import"./esp-footer-column.js";import"./esp-footer-link-group.js";const m={media:!1,brand:!1,groups:!1,aside:!1,bottom:!1};let t=class extends b{constructor(){super(...arguments),this.slotContent={...m},this.brandText="",this.brandLogo="",this.lightBrandLogo="",this.darkBrandLogo="",this.brandHref="",this.brandAlt="",this.brandColor="",this.lightBrandColor="",this.darkBrandColor="",this.brandSpanBacker=1,this.asideSpanBacker=1,this.fullBleedContent=!1,this.landmarkLabel="",this.handleSlotChange=e=>{if(!(e.target instanceof HTMLSlotElement))return;const o=this.slotRegion(e.target);if(!o)return;const a=g(e.target);this.slotContent[o]!==a&&(this.slotContent={...this.slotContent,[o]:a})}}get brandSpan(){return this.brandSpanBacker}set brandSpan(e){const o=this.brandSpanBacker;this.brandSpanBacker=Number.isInteger(e)&&e>=1&&e<=3?e:1,this.requestUpdate("brandSpan",this.hasAttribute("brand-span")?o:void 0),f(this,"brand-span",String(this.brandSpanBacker))}get asideSpan(){return this.asideSpanBacker}set asideSpan(e){const o=this.asideSpanBacker;this.asideSpanBacker=Number.isInteger(e)&&e>=1&&e<=2?e:1,this.requestUpdate("asideSpan",this.hasAttribute("aside-span")?o:void 0),f(this,"aside-span",String(this.asideSpanBacker))}slotRegion(e){return e.name?["media","brand","aside","bottom"].includes(e.name)?e.name:null:"groups"}firstUpdated(e){super.firstUpdated(e);const o={...m};for(const a of this.shadowRoot?.querySelectorAll("slot")??[]){const i=this.slotRegion(a);i&&(o[i]=g(a))}Object.entries(o).some(([a,i])=>this.slotContent[a]!==i)&&(this.slotContent=o)}render(){const{media:e,brand:o,groups:a,aside:i,bottom:s}=this.slotContent,d=_({scheme:this.scheme,brandLogo:this.brandLogo,brandColor:this.brandColor,lightBrandLogo:this.lightBrandLogo,darkBrandLogo:this.darkBrandLogo,lightBrandColor:this.lightBrandColor,darkBrandColor:this.darkBrandColor}),l=o||!!(d.brandLogo||this.brandText),h=l||a||i;return y`
      <footer
        part="footer"
        aria-label=${this.landmarkLabel||k}
        style=${c({"--_esp-footer-brand-color":d.brandColor||null})}
      >
        ${w({className:"background",rootPart:"background"})}
        <div part="content" class="content-frame">
          <div class="content">
            <div part="media" class="media" ?hidden=${!e}>
              <slot name="media" @slotchange=${this.handleSlotChange}></slot>
            </div>

            <div part="primary" class="primary" ?hidden=${!h}>
              <div
                part="brand"
                class="brand"
                style=${c({"--_esp-footer-span":String(this.brandSpan)})}
                ?hidden=${!l}
              >
                <slot name="brand" @slotchange=${this.handleSlotChange}
                  >${C({brandLogo:d.brandLogo,brandText:this.brandText,brandHref:this.brandHref,brandAlt:this.brandAlt})}</slot
                >
              </div>

              <slot @slotchange=${this.handleSlotChange}></slot>

              <div
                part="aside"
                class="aside"
                style=${c({"--_esp-footer-span":String(this.asideSpan)})}
                ?hidden=${!i}
              >
                <slot name="aside" @slotchange=${this.handleSlotChange}></slot>
              </div>
            </div>

            <div part="bottom" class="bottom" ?hidden=${!s}>
              <slot name="bottom" @slotchange=${this.handleSlotChange}></slot>
            </div>
          </div>
        </div>
      </footer>
    `}};t.styles=[...b.styles,v(2),B,u`
      :host {
        display: block;
        min-inline-size: 0;
      }

      [hidden] {
        display: none !important;
      }

      footer {
        --_esp-overlay-base-color: var(--esp-footer-background, var(--_esp-surface-background));
        --_esp-overlay-image: var(--esp-footer-background-image, none);
        --_esp-overlay-image-opacity: var(--esp-footer-background-image-opacity, 1);
        --_esp-overlay-image-repeat: var(--esp-footer-background-repeat, repeat);
        --_esp-overlay-image-position: var(--esp-footer-background-position, 0 0);
        --_esp-overlay-image-size: var(--esp-footer-background-size, auto);
        --_esp-overlay-image-blend-mode: var(--esp-footer-background-blend-mode, normal);
        --_esp-overlay-z-index: -1;

        position: relative;
        isolation: isolate;
        min-inline-size: 0;
        overflow: hidden;
        color: var(--esp-footer-color, var(--esp-color-text));
        border-block-start: var(--esp-footer-border, 1px solid var(--esp-color-border));
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

      .primary > slot {
        display: contents;
      }

      .primary {
        --_esp-footer-column-gap: var(--esp-footer-column-gap, var(--esp-size-padding-page));

        display: flex;
        flex-wrap: nowrap;
        gap: var(--esp-footer-row-gap, var(--esp-size-big)) var(--_esp-footer-column-gap);
        align-items: start;
      }

      .brand,
      .aside,
      .primary ::slotted(esp-footer-column),
      .primary ::slotted(esp-footer-link-group) {
        --_esp-footer-span: 1;

        
        flex: var(--_esp-footer-span) 1
          calc((var(--_esp-footer-span) - 1) * var(--_esp-footer-column-gap));
        min-inline-size: 0;
      }

      .primary ::slotted(esp-footer-column[span="2"]) {
        --_esp-footer-span: 2;
      }

      .aside {
        overflow-wrap: anywhere;
      }

      .configured-brand {
        display: inline-flex;
        align-items: center;
        gap: var(--esp-size-small);
        max-inline-size: 100%;
        color: var(
          --_esp-footer-brand-color,
          var(--esp-footer-heading-color, var(--esp-color-headings))
        );
        font-family: var(
          --_esp-font-brand-effective,
          var(
            --esp-font-brand,
            var(
              --_esp-font-headings-effective,
              var(
                --esp-font-headings,
                var(
                  --_esp-font-body-effective,
                  var(--esp-font-body, var(--_esp-font-body-fallback))
                )
              )
            )
          )
        );
        font-size: var(--esp-footer-brand-text-size, var(--esp-type-medium));
        font-weight: var(--esp-font-weight-brand, var(--esp-font-weight-headings));
        line-height: 1.1;
        overflow-wrap: anywhere;
        text-decoration: none;
      }

      a.configured-brand:hover {
        background: var(--esp-footer-link-hover-bg, var(--esp-color-link-hover-bg));
        color: var(--esp-footer-link-hover-color, var(--esp-color-link-hover));
        text-decoration: underline;
        text-underline-offset: 0.18em;
      }

      a.configured-brand:focus-visible {
        border-radius: var(--esp-size-border-radius);
        outline: var(
          --esp-footer-focus-outline,
          2px solid var(--esp-footer-link-color, var(--esp-color-link))
        );
        outline-offset: 3px;
      }

      .brand-logo {
        
        aspect-ratio: auto
          var(--esp-footer-brand-logo-aspect-ratio, ${z});
        display: block;
        inline-size: auto;
        max-inline-size: min(var(--esp-footer-brand-logo-max-width, 12rem), 100%);
        block-size: var(--esp-footer-brand-logo-size, 3rem);
        object-fit: contain;
      }

      .brand-text {
        min-inline-size: 0;
      }

      @container esp-footer (max-width: 64rem) {
        .primary {
          flex-wrap: wrap;
        }

        .brand {
          flex: 1 1 100%;
        }
      }

      @container esp-footer (max-width: 48rem) {
        .brand,
        .aside,
        .primary ::slotted(esp-footer-column),
        .primary ::slotted(esp-footer-link-group) {
          flex: 1 1 100%;
        }

        .configured-brand {
          font-size: var(
            --esp-footer-brand-text-size-compact,
            var(--esp-footer-brand-text-size, var(--esp-type-medium))
          );
        }

        .brand-logo {
          block-size: var(
            --esp-footer-brand-logo-size-compact,
            var(--esp-footer-brand-logo-size, 3rem)
          );
          max-inline-size: min(
            var(
              --esp-footer-brand-logo-max-width-compact,
              var(--esp-footer-brand-logo-max-width, 12rem)
            ),
            100%
          );
        }
      }
    `,L],r([x()],t.prototype,"slotContent",void 0),r([n({attribute:"brand-text",type:String})],t.prototype,"brandText",void 0),r([n({attribute:"brand-logo",type:String})],t.prototype,"brandLogo",void 0),r([n({attribute:"light-brand-logo",type:String})],t.prototype,"lightBrandLogo",void 0),r([n({attribute:"dark-brand-logo",type:String})],t.prototype,"darkBrandLogo",void 0),r([n({attribute:"brand-href",type:String})],t.prototype,"brandHref",void 0),r([n({attribute:"brand-alt",type:String})],t.prototype,"brandAlt",void 0),r([n({attribute:"brand-color",type:String})],t.prototype,"brandColor",void 0),r([n({attribute:"light-brand-color",type:String})],t.prototype,"lightBrandColor",void 0),r([n({attribute:"dark-brand-color",type:String})],t.prototype,"darkBrandColor",void 0),r([n({attribute:"brand-span",type:Number,reflect:!0})],t.prototype,"brandSpan",null),r([n({attribute:"aside-span",type:Number,reflect:!0})],t.prototype,"asideSpan",null),r([n({attribute:"full-bleed-content",type:Boolean,reflect:!0})],t.prototype,"fullBleedContent",void 0),r([n({attribute:"landmark-label",type:String})],t.prototype,"landmarkLabel",void 0),t=r([S("esp-footer")],t);export{t as EspalierFooter};
