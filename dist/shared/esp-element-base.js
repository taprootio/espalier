var p=function(g,e,t,r){var o=arguments.length,s=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(g,e,t,r);else for(var c=g.length-1;c>=0;c--)(a=g[c])&&(s=(o<3?a(s):o>3?a(e,t,s):a(e,t))||s);return o>3&&s&&Object.defineProperty(e,t,s),s};import{css as x,LitElement as E}from"lit";import{property as m,state as I}from"lit/decorators.js";import{getEspBus as V}from"./bus-events.js";import{traverseToClosest as S}from"./utilities.js";import{parseOklch as A,serializeOklch as y,gamutMapToSRGB as O,deriveSemantic as L,deriveSemanticWithContrast as U}from"./color-engine.js";import{computeVariants as T}from"../root/helpers/compute-variants.js";import{SEMANTIC_COLOR_NAMES as R,semanticToCSS as P}from"./theme.js";import{alignAttributeTextInheritance as _,focusRing as z}from"./style-fragments.js";class n extends E{constructor(){super(...arguments),this.seedColorBacker="oklch(0.7 0.125 216)",this.espRoot=null,this.variantTokenOriginalValues=new Map,this.rootEventSubscriptionsActive=!1,this.variantBacker="primary",this.correlationId=globalThis.crypto?.randomUUID?.()??Math.random().toString(36),this.scheme="light",this.handleSeedColorChanged=e=>{const t=this.syncRootFromDom(!1);!t||e.correlationId!==t.correlationId||(this.seedColor=e.seedColor,this.applyVariantTokens())},this.handleSchemeChanged=e=>{const t=this.syncRootFromDom(!1);!t||e.correlationId!==t.correlationId||this.scheme===e.scheme||(this.scheme=e.scheme,this.applyVariantTokens())},this.handleThemeChanged=e=>{const t=this.syncRootFromDom(!1);!t||e.correlationId!==t.correlationId||this.applyVariantTokens()},this.handleIconSpriteUrlChanged=e=>{const t=this.syncRootFromDom(!1);!t||e.correlationId!==t.correlationId||this.requestUpdate()}}get seedColor(){return this.seedColorBacker}set seedColor(e){this.seedColorBacker=e}focusResolvedElementAfterUpdate(e,t){const r=()=>{const o=e();return o?(o.focus(t),!0):!1};r()||this.updateComplete.then(()=>{r()})}focusShadowElementAfterUpdate(e,t){this.focusResolvedElementAfterUpdate(()=>this.shadowRoot?.querySelector(e),t)}emitValueChanged(e){this.dispatchEvent(new CustomEvent("value-changed",{detail:e,bubbles:!0,composed:!0}))}get variant(){return this.variantBacker}set variant(e){this.variantBacker=e,this.applyVariantTokens()}connectedCallback(){super.connectedCallback(),this.subscribeToRootEvents(),this.hasUpdated&&this.syncRootFromDom(!1)}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeFromRootEvents()}firstUpdated(e){this.syncRootFromDom(!0)}syncRootFromDom(e){const t=S(this,"esp-root");if(!t){if(this.espRoot&&this.clearVariantTokens(),this.espRoot=null,!e)return null;throw new Error("No esp-root ancestor found. Espalier components must be placed inside an <esp-root> element.")}const r=t!==this.espRoot,s=t.scheme==="dark"?"dark":"light",a=this.scheme!==s,c=this.seedColor!==t.seedColor;return this.espRoot=t,(r||a||c)&&(this.scheme=s,this.seedColor=t.seedColor,this.applyVariantTokens()),r&&this.requestUpdate(),t}subscribeToRootEvents(){if(this.rootEventSubscriptionsActive)return;const e=V();e.subscribe("seed-color-changed",this.handleSeedColorChanged),e.subscribe("scheme-changed",this.handleSchemeChanged),e.subscribe("theme-changed",this.handleThemeChanged),e.subscribe("icon-sprite-url-changed",this.handleIconSpriteUrlChanged),this.rootEventSubscriptionsActive=!0}unsubscribeFromRootEvents(){if(!this.rootEventSubscriptionsActive)return;const e=V();e.unsubscribe("seed-color-changed",this.handleSeedColorChanged),e.unsubscribe("scheme-changed",this.handleSchemeChanged),e.unsubscribe("theme-changed",this.handleThemeChanged),e.unsubscribe("icon-sprite-url-changed",this.handleIconSpriteUrlChanged),this.rootEventSubscriptionsActive=!1}traverseToClosest(e){return S(this,e)}applyVariantTokens(){if(!this.espRoot)return;const e=this.getVariantColorSource();if(!e){this.clearVariantTokens();return}const t=this.espRoot.activeTheme,r=A(t.seedColor);if(!r)return;const s=T(r,t)[e];if(!s){this.clearVariantTokens();return}this.setVariantTokenProperty("--esp-color-primary",y(O(s)));const a=T(s,t),c=n.statusVariantSources.has(e),{textContrast:k}=n,f={};for(const i of R){if(k[i])continue;const l=t.semanticMappings[i],h=t.chroma[i],d=this.effectiveVariantTokenSource(i,l.source,c),b=a[d],v=t.lightness[l.lightness],u=L(b,v,h.min,h.max);f[i]=u,this.setVariantTokenProperty(P(i),y(u))}for(const i of R){const l=k[i];if(!l)continue;const h=t.semanticMappings[i],d=t.chroma[i],b=this.effectiveVariantTokenSource(i,h.source,c),v=a[b],u=t.lightness[h.lightness],w=f[l.bg],C=U(v,u,d.min,d.max,w,l.targetLc);f[i]=C,this.setVariantTokenProperty(P(i),y(C))}}effectiveVariantTokenSource(e,t,r){return r&&n.semanticActionTokens.has(e)?"primary":t}getVariantColorSource(){switch(this.variant){case"":case"primary":case"neutral":return"";case"info":return"complementary";default:return this.variant}}setVariantTokenProperty(e,t){const r=this.variantTokenOriginalValues.get(e);if(r){const o=this.style.getPropertyValue(e),s=this.style.getPropertyPriority(e);(o!==r.generatedValue||s!==r.generatedPriority)&&(r.originalValue=o.length?o:null,r.originalPriority=s),r.generatedValue=t,r.generatedPriority=""}else{const o=this.style.getPropertyValue(e);this.variantTokenOriginalValues.set(e,{generatedPriority:"",generatedValue:t,originalPriority:this.style.getPropertyPriority(e),originalValue:o.length?o:null})}this.style.setProperty(e,t)}clearVariantTokens(){for(const[e,t]of this.variantTokenOriginalValues){const r=this.style.getPropertyValue(e),o=this.style.getPropertyPriority(e);(r!==t.generatedValue||o!==t.generatedPriority)&&(t.originalValue=r.length?r:null,t.originalPriority=o),t.originalValue===null?this.style.removeProperty(e):this.style.setProperty(e,t.originalValue,t.originalPriority)}this.variantTokenOriginalValues.clear()}}n.textContrast={text:{bg:"background",targetLc:75},dangerText:{bg:"background",targetLc:75},headings:{bg:"background",targetLc:60},headingsHover:{bg:"background",targetLc:60},link:{bg:"background",targetLc:75},linkHover:{bg:"background",targetLc:75},actionText:{bg:"actionBackground",targetLc:75},inputCaret:{bg:"layer2",targetLc:60},inputSelection:{bg:"inputSelectionBg",targetLc:60}},n.statusVariantSources=new Set(["danger","success","warning"]),n.semanticActionTokens=new Set(["actionBackground","actionText"]),n.styles=[z(".esp-field:focus-within","--esp-field-focus-shadow"),_,x`
      :host {
        
        --_esp-field-resolved-hover-bg: var(
          --esp-field-hover-bg,
          oklch(from var(--esp-field-background, var(--esp-color-layer-2)) calc(l * 0.88) c h)
        );
        --_esp-field-resolved-focus-bg: var(
          --esp-field-focus-bg,
          oklch(from var(--esp-field-background, var(--esp-color-layer-2)) calc(l * 0.82) c h)
        );

        display: block;

        * {
          box-sizing: border-box;
        }
      }

      :host([scheme="light"]) {
        --_esp-field-resolved-hover-bg: var(
          --esp-field-hover-bg,
          oklch(
            from var(--esp-field-background, var(--esp-color-layer-2)) calc(l + (1 - l) * 0.5) c h
          )
        );
        --_esp-field-resolved-focus-bg: var(
          --esp-field-focus-bg,
          oklch(
            from var(--esp-field-background, var(--esp-color-layer-2)) calc(l + (1 - l) * 0.75) c h
          )
        );
      }

      ::placeholder {
        color: var(--esp-color-headings);
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: var(--esp-font-headings);
        font-weight: var(--esp-font-weight-headings);
        color: var(--esp-color-headings);
      }

      a {
        color: var(--esp-color-link);

        &:hover {
          background: var(--esp-color-link-hover-bg);
          color: var(--esp-color-link-hover);
          text-decoration: none;
        }
      }

      .esp-field {
        font-family: var(--esp-font-body);
        font-size: var(--esp-size-font);
        font-weight: var(--esp-font-weight-body);
        background-color: var(--esp-field-background, var(--esp-color-layer-2));
        border-radius: var(--esp-size-border-radius);
        border: var(--esp-field-border-width, 1px) solid
          var(--esp-field-border-color, var(--esp-color-border));
        color: var(--esp-field-text-color, var(--esp-color-text));
        outline: none;
        transition: background-color cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s;

        &:hover {
          background-color: var(--_esp-field-resolved-hover-bg);
          border-color: oklch(
            from var(--esp-field-border-color, var(--esp-color-border)) calc(l * 1.1) c h
          );
        }

        &:focus-within {
          background-color: var(--_esp-field-resolved-focus-bg);
          border-color: oklch(
            from var(--esp-field-border-color, var(--esp-color-border)) calc(l * 1.2) c h
          );
        }

        > input,
        input.esp-input,
        > textarea,
        > button,
        > a {
          text-decoration: none;
          font-family: var(--esp-font-body);
          font-size: var(--esp-size-font);
          width: 100%;
          color: inherit;
          padding: var(--esp-size-padding);
          border: none;
          outline: none;
          background-color: transparent;
          caret-color: var(--esp-color-input-caret);
          &::selection {
            background: var(--esp-color-input-selection-bg);
            color: var(--esp-color-input-selection);
          }

          &:disabled {
            cursor: not-allowed;
          }
        }
      }

      .esp-field:has(button:disabled),
      .esp-field:has(a:disabled),
      .esp-field:has(input:disabled),
      .esp-field:has(textarea:disabled) {
        opacity: 0.5;
      }

      .esp-field:has(button:disabled):hover,
      .esp-field:has(a:disabled):hover,
      .esp-field:has(input:disabled):hover,
      .esp-field:has(textarea:disabled):hover {
        background-color: var(--esp-field-background, var(--esp-color-layer-2));
      }
    `],p([I()],n.prototype,"seedColor",null),p([m({attribute:!1})],n.prototype,"correlationId",void 0),p([m({type:String,reflect:!0})],n.prototype,"scheme",void 0),p([m({type:String,attribute:"variant",reflect:!0})],n.prototype,"variant",null);export{n as EspalierElementBase};
