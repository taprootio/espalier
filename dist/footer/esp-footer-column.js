var n=function(a,e,r,s){var p=arguments.length,l=p<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,r):s,g;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(a,e,r,s);else for(var o=a.length-1;o>=0;o--)(g=a[o])&&(l=(p<3?g(l):p>3?g(e,r,l):g(e,r))||l);return p>3&&l&&Object.defineProperty(e,r,l),l};import{FooterAlignmentController as d,footerAlignmentStyles as m,footerAlignmentHostStyles as u}from"../shared/footer-alignment.js";import{css as f,html as k}from"lit";import{customElement as A,property as i}from"lit/decorators.js";import{syncNormalizedAttribute as h}from"../shared/attribute-helpers.js";import{EspalierElementBase as c}from"../shared/esp-element-base.js";let t=class extends c{constructor(){super(...arguments),this.alignment=new d(this,"column"),this.spanBacker=1}get inlineAlign(){return this.alignment.get("inline-align")}set inlineAlign(e){this.alignment.set("inlineAlign","inline-align",e,"placement")}get inlineAlignWrapped(){return this.alignment.get("inline-align-wrapped")}set inlineAlignWrapped(e){this.alignment.set("inlineAlignWrapped","inline-align-wrapped",e,"placement")}get inlineAlignStacked(){return this.alignment.get("inline-align-stacked")}set inlineAlignStacked(e){this.alignment.set("inlineAlignStacked","inline-align-stacked",e,"placement")}get blockAlign(){return this.alignment.get("block-align")}set blockAlign(e){this.alignment.set("blockAlign","block-align",e,"placement")}get blockAlignWrapped(){return this.alignment.get("block-align-wrapped")}set blockAlignWrapped(e){this.alignment.set("blockAlignWrapped","block-align-wrapped",e,"placement")}get blockAlignStacked(){return this.alignment.get("block-align-stacked")}set blockAlignStacked(e){this.alignment.set("blockAlignStacked","block-align-stacked",e,"placement")}get textAlign(){return this.alignment.get("text-align")}set textAlign(e){this.alignment.set("textAlign","text-align",e,"text")}get textAlignWrapped(){return this.alignment.get("text-align-wrapped")}set textAlignWrapped(e){this.alignment.set("textAlignWrapped","text-align-wrapped",e,"text")}get textAlignStacked(){return this.alignment.get("text-align-stacked")}set textAlignStacked(e){this.alignment.set("textAlignStacked","text-align-stacked",e,"text")}get span(){return this.spanBacker}set span(e){const r=this.spanBacker;this.spanBacker=Number.isInteger(e)&&e>=1&&e<=2?e:1,this.requestUpdate("span",this.hasAttribute("span")?r:void 0),h(this,"span",String(this.spanBacker))}render(){return k`<div class="alignment-scope">
      <div class="alignment-content"><slot></slot></div>
    </div>`}};t.styles=[...c.styles,m,u,f`
      .alignment-scope {
        display: var(--_esp-footer-wrapper-display, flex);
        flex-direction: column;
        gap: inherit;
        min-inline-size: 0;
      }
      .alignment-content {
        display: var(--_esp-footer-wrapper-display, flex);
        flex-direction: column;
        min-inline-size: 0;
        gap: inherit;
        inline-size: var(--_esp-footer-content-width, auto);
        max-inline-size: 100%;
        align-self: var(--_esp-footer-content-self, auto);
        text-align: var(--_esp-footer-text-css, inherit);
      }
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--esp-footer-row-gap, var(--esp-size-big));
        min-inline-size: 0;
      }
    `],n([i({attribute:"inline-align",reflect:!0})],t.prototype,"inlineAlign",null),n([i({attribute:"inline-align-wrapped",reflect:!0})],t.prototype,"inlineAlignWrapped",null),n([i({attribute:"inline-align-stacked",reflect:!0})],t.prototype,"inlineAlignStacked",null),n([i({attribute:"block-align",reflect:!0})],t.prototype,"blockAlign",null),n([i({attribute:"block-align-wrapped",reflect:!0})],t.prototype,"blockAlignWrapped",null),n([i({attribute:"block-align-stacked",reflect:!0})],t.prototype,"blockAlignStacked",null),n([i({attribute:"text-align",reflect:!0})],t.prototype,"textAlign",null),n([i({attribute:"text-align-wrapped",reflect:!0})],t.prototype,"textAlignWrapped",null),n([i({attribute:"text-align-stacked",reflect:!0})],t.prototype,"textAlignStacked",null),n([i({type:Number,reflect:!0})],t.prototype,"span",null),t=n([A("esp-footer-column")],t);export{t as EspalierFooterColumn};
