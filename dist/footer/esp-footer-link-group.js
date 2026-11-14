var n=function(a,e,r,o){var s=arguments.length,l=s<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,r):o,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(a,e,r,o);else for(var g=a.length-1;g>=0;g--)(p=a[g])&&(l=(s<3?p(l):s>3?p(e,r,l):p(e,r))||l);return s>3&&l&&Object.defineProperty(e,r,l),l};import{FooterAlignmentController as h,footerAlignmentStyles as m,footerAlignmentHostStyles as k}from"../shared/footer-alignment.js";import{css as v,html as d,nothing as c}from"lit";import{customElement as b,property as i}from"lit/decorators.js";import{EspalierElementBase as f}from"../shared/esp-element-base.js";const u="esp-footer-link-group-heading";let t=class extends f{constructor(){super(...arguments),this.alignment=new h(this,"group"),this.heading=""}get inlineAlign(){return this.alignment.get("inline-align")}set inlineAlign(e){this.alignment.set("inlineAlign","inline-align",e,"placement")}get inlineAlignWrapped(){return this.alignment.get("inline-align-wrapped")}set inlineAlignWrapped(e){this.alignment.set("inlineAlignWrapped","inline-align-wrapped",e,"placement")}get inlineAlignStacked(){return this.alignment.get("inline-align-stacked")}set inlineAlignStacked(e){this.alignment.set("inlineAlignStacked","inline-align-stacked",e,"placement")}get blockAlign(){return this.alignment.get("block-align")}set blockAlign(e){this.alignment.set("blockAlign","block-align",e,"placement")}get blockAlignWrapped(){return this.alignment.get("block-align-wrapped")}set blockAlignWrapped(e){this.alignment.set("blockAlignWrapped","block-align-wrapped",e,"placement")}get blockAlignStacked(){return this.alignment.get("block-align-stacked")}set blockAlignStacked(e){this.alignment.set("blockAlignStacked","block-align-stacked",e,"placement")}get textAlign(){return this.alignment.get("text-align")}set textAlign(e){this.alignment.set("textAlign","text-align",e,"text")}get textAlignWrapped(){return this.alignment.get("text-align-wrapped")}set textAlignWrapped(e){this.alignment.set("textAlignWrapped","text-align-wrapped",e,"text")}get textAlignStacked(){return this.alignment.get("text-align-stacked")}set textAlignStacked(e){this.alignment.set("textAlignStacked","text-align-stacked",e,"text")}render(){return d`
      <div class="alignment-scope">
        <nav
          class="alignment-content"
          part="nav"
          aria-labelledby=${this.heading?u:c}
          aria-label=${this.heading?c:"Footer links"}
        >
          ${this.heading?d`<h2 part="heading" id=${u}>${this.heading}</h2>`:c}
          <div part="links" class="links"><slot></slot></div>
        </nav>
      </div>
    `}};t.styles=[...f.styles,m,k,v`
      :host {
        display: block;
        min-inline-size: 0;
      }

      .alignment-scope {
        display: var(--_esp-footer-wrapper-display, flex);
        flex-direction: column;
        min-inline-size: 0;
      }
      nav {
        inline-size: var(--_esp-footer-content-width, auto);
        max-inline-size: 100%;
        align-self: var(--_esp-footer-content-self, auto);
        text-align: var(--_esp-footer-text-css, inherit);
        display: grid;
        gap: var(--esp-footer-link-group-gap, var(--esp-size-small));
        min-inline-size: 0;
        color: var(--esp-footer-color, var(--esp-color-text));
      }

      h2 {
        margin: 0;
        color: var(--esp-footer-heading-color, var(--esp-color-headings));
        font-family: var(
          --_esp-font-headings-effective,
          var(
            --esp-font-headings,
            var(--_esp-font-body-effective, var(--esp-font-body, var(--_esp-font-body-fallback)))
          )
        );
        font-size: var(--esp-type-normal);
        font-weight: var(--esp-font-weight-headings);
        line-height: 1.25;
        overflow-wrap: anywhere;
      }

      .links {
        justify-items: var(--_esp-footer-text-css, normal);
        display: grid;
        gap: var(--esp-size-tiny);
        min-inline-size: 0;
      }

      ::slotted(a) {
        text-align: var(--_esp-footer-text-css, inherit);
        inline-size: fit-content;
        max-inline-size: 100%;
        color: var(--esp-footer-link-color, var(--esp-color-link));
        overflow-wrap: anywhere;
        text-decoration: none;
        text-underline-offset: 0.18em;
      }

      ::slotted(a:hover) {
        color: var(--esp-footer-link-hover-color, var(--esp-color-link-hover));
        text-decoration: underline;
      }

      ::slotted(a:focus-visible) {
        border-radius: var(--esp-size-border-radius);
        outline: var(
          --esp-footer-focus-outline,
          2px solid var(--esp-footer-link-color, var(--esp-color-link))
        );
        outline-offset: 3px;
      }
    `],n([i({attribute:"inline-align",reflect:!0})],t.prototype,"inlineAlign",null),n([i({attribute:"inline-align-wrapped",reflect:!0})],t.prototype,"inlineAlignWrapped",null),n([i({attribute:"inline-align-stacked",reflect:!0})],t.prototype,"inlineAlignStacked",null),n([i({attribute:"block-align",reflect:!0})],t.prototype,"blockAlign",null),n([i({attribute:"block-align-wrapped",reflect:!0})],t.prototype,"blockAlignWrapped",null),n([i({attribute:"block-align-stacked",reflect:!0})],t.prototype,"blockAlignStacked",null),n([i({attribute:"text-align",reflect:!0})],t.prototype,"textAlign",null),n([i({attribute:"text-align-wrapped",reflect:!0})],t.prototype,"textAlignWrapped",null),n([i({attribute:"text-align-stacked",reflect:!0})],t.prototype,"textAlignStacked",null),n([i({type:String})],t.prototype,"heading",void 0),t=n([b("esp-footer-link-group")],t);export{t as EspalierFooterLinkGroup};
