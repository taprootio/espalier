var n=function(p,e,a,r){var o=arguments.length,l=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,a):r,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(p,e,a,r);else for(var d=p.length-1;d>=0;d--)(s=p[d])&&(l=(o<3?s(l):o>3?s(e,a,l):s(e,a))||l);return o>3&&l&&Object.defineProperty(e,a,l),l};import{FooterAlignmentController as f,footerAlignmentStyles as k}from"../shared/footer-alignment.js";import{FooterLogoGeometryController as x,footerNaturalLogoStyles as A,normalizeFooterLogoSizing as v}from"../shared/footer-logo-geometry.js";import{paintedSurface as y}from"../shared/surface-layer.js";import{css as S,html as w,nothing as B}from"lit";import{customElement as _,property as i,state as z}from"lit/decorators.js";import{styleMap as g}from"lit/directives/style-map.js";import{CONFIGURED_BRAND_LOGO_ASPECT_RATIO as T,configuredBrandLogoGeometry as W,renderConfiguredBrand as C,resolveConfiguredBrand as I}from"../shared/configured-brand.js";import{syncNormalizedAttribute as c}from"../shared/attribute-helpers.js";import{EspalierElementBase as b}from"../shared/esp-element-base.js";import{slotHasContent as m}from"../shared/slot-content.js";import{renderVisualOverlay as L,visualOverlayStyles as $}from"../shared/visual-overlay.js";import"./esp-footer-column.js";import"./esp-footer-link-group.js";const u={media:!1,brand:!1,groups:!1,aside:!1,bottom:!1};let t=class extends b{get layout(){return this.alignment.layout}constructor(){super(),this.alignment=new f(this,"footer"),this.brandLogoSizingBacker="fixed",this.slotContent={...u},this.brandText="",this.brandLogo="",this.lightBrandLogo="",this.darkBrandLogo="",this.brandHref="",this.brandAlt="",this.brandColor="",this.lightBrandColor="",this.darkBrandColor="",this.brandSpanBacker=1,this.asideSpanBacker=1,this.fullBleedContent=!1,this.landmarkLabel="",this.handleSlotChange=e=>{if(!(e.target instanceof HTMLSlotElement))return;const a=this.slotRegion(e.target);if(!a)return;const r=m(e.target);this.slotContent[a]!==r&&(this.slotContent={...this.slotContent,[a]:r})},new x(this,()=>({sizing:this.brandLogoSizing,scheme:this.scheme,lightSource:this.lightBrandLogo||this.brandLogo,darkSource:this.darkBrandLogo||this.brandLogo}))}get inlineAlign(){return this.alignment.get("inline-align")}set inlineAlign(e){this.alignment.set("inlineAlign","inline-align",e,"placement")}get inlineAlignWrapped(){return this.alignment.get("inline-align-wrapped")}set inlineAlignWrapped(e){this.alignment.set("inlineAlignWrapped","inline-align-wrapped",e,"placement")}get inlineAlignStacked(){return this.alignment.get("inline-align-stacked")}set inlineAlignStacked(e){this.alignment.set("inlineAlignStacked","inline-align-stacked",e,"placement")}get blockAlign(){return this.alignment.get("block-align")}set blockAlign(e){this.alignment.set("blockAlign","block-align",e,"placement")}get blockAlignWrapped(){return this.alignment.get("block-align-wrapped")}set blockAlignWrapped(e){this.alignment.set("blockAlignWrapped","block-align-wrapped",e,"placement")}get blockAlignStacked(){return this.alignment.get("block-align-stacked")}set blockAlignStacked(e){this.alignment.set("blockAlignStacked","block-align-stacked",e,"placement")}get textAlign(){return this.alignment.get("text-align")}set textAlign(e){this.alignment.set("textAlign","text-align",e,"text")}get textAlignWrapped(){return this.alignment.get("text-align-wrapped")}set textAlignWrapped(e){this.alignment.set("textAlignWrapped","text-align-wrapped",e,"text")}get textAlignStacked(){return this.alignment.get("text-align-stacked")}set textAlignStacked(e){this.alignment.set("textAlignStacked","text-align-stacked",e,"text")}get brandInlineAlign(){return this.alignment.get("brand-inline-align")}set brandInlineAlign(e){this.alignment.set("brandInlineAlign","brand-inline-align",e,"placement")}get brandInlineAlignWrapped(){return this.alignment.get("brand-inline-align-wrapped")}set brandInlineAlignWrapped(e){this.alignment.set("brandInlineAlignWrapped","brand-inline-align-wrapped",e,"placement")}get brandInlineAlignStacked(){return this.alignment.get("brand-inline-align-stacked")}set brandInlineAlignStacked(e){this.alignment.set("brandInlineAlignStacked","brand-inline-align-stacked",e,"placement")}get brandBlockAlign(){return this.alignment.get("brand-block-align")}set brandBlockAlign(e){this.alignment.set("brandBlockAlign","brand-block-align",e,"placement")}get brandBlockAlignWrapped(){return this.alignment.get("brand-block-align-wrapped")}set brandBlockAlignWrapped(e){this.alignment.set("brandBlockAlignWrapped","brand-block-align-wrapped",e,"placement")}get brandBlockAlignStacked(){return this.alignment.get("brand-block-align-stacked")}set brandBlockAlignStacked(e){this.alignment.set("brandBlockAlignStacked","brand-block-align-stacked",e,"placement")}get brandTextAlign(){return this.alignment.get("brand-text-align")}set brandTextAlign(e){this.alignment.set("brandTextAlign","brand-text-align",e,"text")}get brandTextAlignWrapped(){return this.alignment.get("brand-text-align-wrapped")}set brandTextAlignWrapped(e){this.alignment.set("brandTextAlignWrapped","brand-text-align-wrapped",e,"text")}get brandTextAlignStacked(){return this.alignment.get("brand-text-align-stacked")}set brandTextAlignStacked(e){this.alignment.set("brandTextAlignStacked","brand-text-align-stacked",e,"text")}get asideInlineAlign(){return this.alignment.get("aside-inline-align")}set asideInlineAlign(e){this.alignment.set("asideInlineAlign","aside-inline-align",e,"placement")}get asideInlineAlignWrapped(){return this.alignment.get("aside-inline-align-wrapped")}set asideInlineAlignWrapped(e){this.alignment.set("asideInlineAlignWrapped","aside-inline-align-wrapped",e,"placement")}get asideInlineAlignStacked(){return this.alignment.get("aside-inline-align-stacked")}set asideInlineAlignStacked(e){this.alignment.set("asideInlineAlignStacked","aside-inline-align-stacked",e,"placement")}get asideBlockAlign(){return this.alignment.get("aside-block-align")}set asideBlockAlign(e){this.alignment.set("asideBlockAlign","aside-block-align",e,"placement")}get asideBlockAlignWrapped(){return this.alignment.get("aside-block-align-wrapped")}set asideBlockAlignWrapped(e){this.alignment.set("asideBlockAlignWrapped","aside-block-align-wrapped",e,"placement")}get asideBlockAlignStacked(){return this.alignment.get("aside-block-align-stacked")}set asideBlockAlignStacked(e){this.alignment.set("asideBlockAlignStacked","aside-block-align-stacked",e,"placement")}get asideTextAlign(){return this.alignment.get("aside-text-align")}set asideTextAlign(e){this.alignment.set("asideTextAlign","aside-text-align",e,"text")}get asideTextAlignWrapped(){return this.alignment.get("aside-text-align-wrapped")}set asideTextAlignWrapped(e){this.alignment.set("asideTextAlignWrapped","aside-text-align-wrapped",e,"text")}get asideTextAlignStacked(){return this.alignment.get("aside-text-align-stacked")}set asideTextAlignStacked(e){this.alignment.set("asideTextAlignStacked","aside-text-align-stacked",e,"text")}get bottomInlineAlign(){return this.alignment.get("bottom-inline-align")}set bottomInlineAlign(e){this.alignment.set("bottomInlineAlign","bottom-inline-align",e,"placement")}get bottomInlineAlignWrapped(){return this.alignment.get("bottom-inline-align-wrapped")}set bottomInlineAlignWrapped(e){this.alignment.set("bottomInlineAlignWrapped","bottom-inline-align-wrapped",e,"placement")}get bottomInlineAlignStacked(){return this.alignment.get("bottom-inline-align-stacked")}set bottomInlineAlignStacked(e){this.alignment.set("bottomInlineAlignStacked","bottom-inline-align-stacked",e,"placement")}get bottomTextAlign(){return this.alignment.get("bottom-text-align")}set bottomTextAlign(e){this.alignment.set("bottomTextAlign","bottom-text-align",e,"text")}get bottomTextAlignWrapped(){return this.alignment.get("bottom-text-align-wrapped")}set bottomTextAlignWrapped(e){this.alignment.set("bottomTextAlignWrapped","bottom-text-align-wrapped",e,"text")}get bottomTextAlignStacked(){return this.alignment.get("bottom-text-align-stacked")}set bottomTextAlignStacked(e){this.alignment.set("bottomTextAlignStacked","bottom-text-align-stacked",e,"text")}get brandLogoSizing(){return this.brandLogoSizingBacker}set brandLogoSizing(e){const a=this.brandLogoSizingBacker;this.brandLogoSizingBacker=v(e),this.requestUpdate("brandLogoSizing",this.hasAttribute("brand-logo-sizing")?a:void 0),c(this,"brand-logo-sizing",this.brandLogoSizingBacker)}get brandSpan(){return this.brandSpanBacker}set brandSpan(e){const a=this.brandSpanBacker;this.brandSpanBacker=Number.isInteger(e)&&e>=1&&e<=3?e:1,this.requestUpdate("brandSpan",this.hasAttribute("brand-span")?a:void 0),c(this,"brand-span",String(this.brandSpanBacker))}get asideSpan(){return this.asideSpanBacker}set asideSpan(e){const a=this.asideSpanBacker;this.asideSpanBacker=Number.isInteger(e)&&e>=1&&e<=2?e:1,this.requestUpdate("asideSpan",this.hasAttribute("aside-span")?a:void 0),c(this,"aside-span",String(this.asideSpanBacker))}slotRegion(e){return e.name?["media","brand","aside","bottom"].includes(e.name)?e.name:null:"groups"}firstUpdated(e){super.firstUpdated(e);const a={...u};for(const r of this.shadowRoot?.querySelectorAll("slot")??[]){const o=this.slotRegion(r);o&&(a[o]=m(r))}Object.entries(a).some(([r,o])=>this.slotContent[r]!==o)&&(this.slotContent=a)}render(){const{media:e,brand:a,groups:r,aside:o,bottom:l}=this.slotContent,s=I({scheme:this.scheme,brandLogo:this.brandLogo,brandColor:this.brandColor,lightBrandLogo:this.lightBrandLogo,darkBrandLogo:this.darkBrandLogo,lightBrandColor:this.lightBrandColor,darkBrandColor:this.darkBrandColor}),d=a||!!(s.brandLogo||this.brandText),h=d||r||o;return w`
      <footer
        part="footer"
        aria-label=${this.landmarkLabel||B}
        style=${g({"--_esp-footer-brand-color":s.brandColor||null})}
      >
        ${L({className:"background",rootPart:"background"})}
        <div part="content" class="content-frame">
          <div class="content">
            
            <span class="footer-alignment-profile-probe" aria-hidden="true"></span>
            <div part="media" class="media" ?hidden=${!e}>
              <slot name="media" @slotchange=${this.handleSlotChange}></slot>
            </div>

            <div part="primary" class="primary" ?hidden=${!h}>
              <div
                part="brand"
                class="brand alignment-scope"
                style=${g({...this.alignment.styles("brand"),"--_esp-footer-span":String(this.brandSpan)})}
                ?hidden=${!d}
              >
                <div class="alignment-content">
                  <slot name="brand" @slotchange=${this.handleSlotChange}
                    >${C({brandLogo:s.brandLogo,brandText:this.brandText,brandHref:this.brandHref,brandAlt:this.brandAlt})}</slot
                  >
                </div>
              </div>

              <slot @slotchange=${this.handleSlotChange}></slot>

              <div
                part="aside"
                class="aside alignment-scope"
                style=${g({...this.alignment.styles("aside"),"--_esp-footer-span":String(this.asideSpan)})}
                ?hidden=${!o}
              >
                <div class="alignment-content">
                  <slot name="aside" @slotchange=${this.handleSlotChange}></slot>
                </div>
              </div>
            </div>

            <div
              part="bottom"
              class="bottom alignment-scope"
              style=${g(this.alignment.styles("bottom"))}
              ?hidden=${!l}
            >
              <div class="alignment-content">
                <slot name="bottom" @slotchange=${this.handleSlotChange}></slot>
              </div>
            </div>
          </div>
        </div>
      </footer>
    `}};t.styles=[...b.styles,y(2),W,k,A,S`
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

      .footer-alignment-profile-probe {
        position: absolute;
        visibility: hidden;
        pointer-events: none;
        inline-size: 0px;
        block-size: 1px;
      }

      .brand,
      .aside,
      .bottom {
        display: var(--_esp-footer-region-display, block);
        flex-direction: var(--_esp-footer-region-direction, row);
        align-self: var(--_esp-footer-block-self, auto);
      }
      .alignment-content {
        display: var(--_esp-footer-wrapper-display, block);
        min-inline-size: 0;
        max-inline-size: 100%;
        inline-size: var(--_esp-footer-content-width, auto);
        align-self: var(--_esp-footer-content-self, auto);
        text-align: var(--_esp-footer-text-css, inherit);
      }
      .aside ::slotted(p),
      .bottom ::slotted(p) {
        text-align: var(--_esp-footer-prose-css, inherit);
        text-align-last: var(--_esp-footer-prose-last-line, inherit);
        word-spacing: var(--_esp-footer-prose-word-spacing, inherit);
      }
      .brand {
        --_esp-footer-logo-size: var(--esp-footer-brand-logo-size, 3rem);
        --_esp-footer-logo-max-width: var(--esp-footer-brand-logo-max-width, 12rem);
        --_esp-footer-image-inline-start: left;
        --_esp-footer-image-inline-end: right;
      }
      :host(:dir(rtl)) .brand {
        --_esp-footer-image-inline-start: right;
        --_esp-footer-image-inline-end: left;
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
        
        display: var(--_esp-footer-lockup-display, inline-flex);
        align-items: var(--_esp-footer-lockup-block, center);
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
          var(--esp-footer-brand-logo-aspect-ratio, ${T});
        display: block;
        inline-size: auto;
        
        max-inline-size: var(--_esp-footer-image-cap, min(var(--_esp-footer-logo-max-width), 100%));
        min-inline-size: var(--_esp-footer-image-min, auto);
        block-size: var(--_esp-footer-logo-size);
        object-fit: contain;
        object-position: var(--_esp-footer-image-x, center) var(--_esp-footer-image-y, center);
      }

      .brand-text {
        text-align: var(--_esp-footer-text-css, inherit);
        min-inline-size: 0;
      }

      @container esp-footer (max-width: 64rem) {
        .footer-alignment-profile-probe {
          inline-size: 1px;
        }
        .primary {
          flex-wrap: wrap;
        }

        .brand {
          flex: 1 1 100%;
        }
      }

      @container esp-footer (max-width: 48rem) {
        .footer-alignment-profile-probe {
          inline-size: 2px;
        }
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

        .brand {
          --_esp-footer-logo-size: var(
            --esp-footer-brand-logo-size-compact,
            var(--esp-footer-brand-logo-size, 3rem)
          );
          --_esp-footer-logo-max-width: var(
            --esp-footer-brand-logo-max-width-compact,
            var(--esp-footer-brand-logo-max-width, 12rem)
          );
        }
      }
    `,$],n([i({attribute:"inline-align",reflect:!0})],t.prototype,"inlineAlign",null),n([i({attribute:"inline-align-wrapped",reflect:!0})],t.prototype,"inlineAlignWrapped",null),n([i({attribute:"inline-align-stacked",reflect:!0})],t.prototype,"inlineAlignStacked",null),n([i({attribute:"block-align",reflect:!0})],t.prototype,"blockAlign",null),n([i({attribute:"block-align-wrapped",reflect:!0})],t.prototype,"blockAlignWrapped",null),n([i({attribute:"block-align-stacked",reflect:!0})],t.prototype,"blockAlignStacked",null),n([i({attribute:"text-align",reflect:!0})],t.prototype,"textAlign",null),n([i({attribute:"text-align-wrapped",reflect:!0})],t.prototype,"textAlignWrapped",null),n([i({attribute:"text-align-stacked",reflect:!0})],t.prototype,"textAlignStacked",null),n([i({attribute:"brand-inline-align",reflect:!0})],t.prototype,"brandInlineAlign",null),n([i({attribute:"brand-inline-align-wrapped",reflect:!0})],t.prototype,"brandInlineAlignWrapped",null),n([i({attribute:"brand-inline-align-stacked",reflect:!0})],t.prototype,"brandInlineAlignStacked",null),n([i({attribute:"brand-block-align",reflect:!0})],t.prototype,"brandBlockAlign",null),n([i({attribute:"brand-block-align-wrapped",reflect:!0})],t.prototype,"brandBlockAlignWrapped",null),n([i({attribute:"brand-block-align-stacked",reflect:!0})],t.prototype,"brandBlockAlignStacked",null),n([i({attribute:"brand-text-align",reflect:!0})],t.prototype,"brandTextAlign",null),n([i({attribute:"brand-text-align-wrapped",reflect:!0})],t.prototype,"brandTextAlignWrapped",null),n([i({attribute:"brand-text-align-stacked",reflect:!0})],t.prototype,"brandTextAlignStacked",null),n([i({attribute:"aside-inline-align",reflect:!0})],t.prototype,"asideInlineAlign",null),n([i({attribute:"aside-inline-align-wrapped",reflect:!0})],t.prototype,"asideInlineAlignWrapped",null),n([i({attribute:"aside-inline-align-stacked",reflect:!0})],t.prototype,"asideInlineAlignStacked",null),n([i({attribute:"aside-block-align",reflect:!0})],t.prototype,"asideBlockAlign",null),n([i({attribute:"aside-block-align-wrapped",reflect:!0})],t.prototype,"asideBlockAlignWrapped",null),n([i({attribute:"aside-block-align-stacked",reflect:!0})],t.prototype,"asideBlockAlignStacked",null),n([i({attribute:"aside-text-align",reflect:!0})],t.prototype,"asideTextAlign",null),n([i({attribute:"aside-text-align-wrapped",reflect:!0})],t.prototype,"asideTextAlignWrapped",null),n([i({attribute:"aside-text-align-stacked",reflect:!0})],t.prototype,"asideTextAlignStacked",null),n([i({attribute:"bottom-inline-align",reflect:!0})],t.prototype,"bottomInlineAlign",null),n([i({attribute:"bottom-inline-align-wrapped",reflect:!0})],t.prototype,"bottomInlineAlignWrapped",null),n([i({attribute:"bottom-inline-align-stacked",reflect:!0})],t.prototype,"bottomInlineAlignStacked",null),n([i({attribute:"bottom-text-align",reflect:!0})],t.prototype,"bottomTextAlign",null),n([i({attribute:"bottom-text-align-wrapped",reflect:!0})],t.prototype,"bottomTextAlignWrapped",null),n([i({attribute:"bottom-text-align-stacked",reflect:!0})],t.prototype,"bottomTextAlignStacked",null),n([i({attribute:"brand-logo-sizing",reflect:!0,useDefault:!0})],t.prototype,"brandLogoSizing",null),n([z()],t.prototype,"slotContent",void 0),n([i({attribute:"brand-text",type:String})],t.prototype,"brandText",void 0),n([i({attribute:"brand-logo",type:String})],t.prototype,"brandLogo",void 0),n([i({attribute:"light-brand-logo",type:String})],t.prototype,"lightBrandLogo",void 0),n([i({attribute:"dark-brand-logo",type:String})],t.prototype,"darkBrandLogo",void 0),n([i({attribute:"brand-href",type:String})],t.prototype,"brandHref",void 0),n([i({attribute:"brand-alt",type:String})],t.prototype,"brandAlt",void 0),n([i({attribute:"brand-color",type:String})],t.prototype,"brandColor",void 0),n([i({attribute:"light-brand-color",type:String})],t.prototype,"lightBrandColor",void 0),n([i({attribute:"dark-brand-color",type:String})],t.prototype,"darkBrandColor",void 0),n([i({attribute:"brand-span",type:Number,reflect:!0})],t.prototype,"brandSpan",null),n([i({attribute:"aside-span",type:Number,reflect:!0})],t.prototype,"asideSpan",null),n([i({attribute:"full-bleed-content",type:Boolean,reflect:!0})],t.prototype,"fullBleedContent",void 0),n([i({attribute:"landmark-label",type:String})],t.prototype,"landmarkLabel",void 0),t=n([_("esp-footer")],t);export{t as EspalierFooter};
