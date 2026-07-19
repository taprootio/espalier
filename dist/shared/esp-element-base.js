var p=function(f,e,t,o){var r=arguments.length,s=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(f,e,t,o);else for(var c=f.length-1;c>=0;c--)(a=f[c])&&(s=(r<3?a(s):r>3?a(e,t,s):a(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};import{css as E,LitElement as x}from"lit";import{property as y,state as U}from"lit/decorators.js";import{subscribeToRootEvent as g}from"./root-event-subscription.js";import{traverseToClosest as V}from"./utilities.js";import{parseOklch as A,serializeOklch as k,gamutMapToSRGB as O,deriveSemantic as L,deriveSemanticWithContrast as F}from"./color-engine.js";import{computeVariants as T}from"../root/helpers/compute-variants.js";import{SEMANTIC_COLOR_NAMES as S,semanticToCSS as P}from"./theme.js";import{alignAttributeTextInheritance as _,focusRing as z}from"./style-fragments.js";class n extends x{constructor(){super(...arguments),this.seedColorBacker="oklch(0.7 0.125 216)",this.espRoot=null,this.variantTokenOriginalValues=new Map,this.rootEventSubscriptionsActive=!1,this.subscribedRoot=null,this.rootEventUnsubscribers=[],this.variantBacker="primary",this.correlationId=globalThis.crypto?.randomUUID?.()??Math.random().toString(36),this.scheme="light",this.handleSeedColorChanged=e=>{this.syncRootFromDom(!1)&&(this.seedColor=e.seedColor,this.applyVariantTokens())},this.handleSchemeChanged=e=>{!this.syncRootFromDom(!1)||this.scheme===e.scheme||(this.scheme=e.scheme,this.applyVariantTokens())},this.handleThemeChanged=()=>{this.syncRootFromDom(!1)&&this.applyVariantTokens()},this.handleIconSpriteUrlChanged=()=>{this.syncRootFromDom(!1)&&this.requestUpdate()}}get seedColor(){return this.seedColorBacker}set seedColor(e){this.seedColorBacker=e}focusResolvedElementAfterUpdate(e,t){const o=()=>{const r=e();return r?(r.focus(t),!0):!1};o()||this.updateComplete.then(()=>{o()})}focusShadowElementAfterUpdate(e,t){this.focusResolvedElementAfterUpdate(()=>this.shadowRoot?.querySelector(e),t)}emitValueChanged(e){this.dispatchEvent(new CustomEvent("value-changed",{detail:e,bubbles:!0,composed:!0}))}get variant(){return this.variantBacker}set variant(e){this.variantBacker=e,this.applyVariantTokens()}connectedCallback(){super.connectedCallback();const e=this.syncRootFromDom(!1);e&&this.subscribeToRootEvents(e)}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeFromRootEvents()}firstUpdated(e){this.syncRootFromDom(!0)}syncRootFromDom(e){const t=V(this,"esp-root");if(!t){if(this.espRoot&&this.clearVariantTokens(),this.unsubscribeFromRootEvents(),this.espRoot=null,!e)return null;throw new Error("No esp-root ancestor found. Espalier components must be placed inside an <esp-root> element.")}const o=t!==this.espRoot,s=t.scheme==="dark"?"dark":"light",a=this.scheme!==s,c=this.seedColor!==t.seedColor;return this.espRoot=t,o&&this.isConnected&&this.subscribeToRootEvents(t),(o||a||c)&&(this.scheme=s,this.seedColor=t.seedColor,this.applyVariantTokens()),o&&this.requestUpdate(),t}subscribeToRootEvents(e){this.rootEventSubscriptionsActive&&this.subscribedRoot===e||(this.unsubscribeFromRootEvents(),this.subscribedRoot=e,this.rootEventUnsubscribers=[g(e,"seed-color-changed",this.handleSeedColorChanged),g(e,"scheme-changed",this.handleSchemeChanged),g(e,"theme-changed",this.handleThemeChanged),g(e,"icon-sprite-url-changed",this.handleIconSpriteUrlChanged)],this.rootEventSubscriptionsActive=!0)}unsubscribeFromRootEvents(){if(this.rootEventSubscriptionsActive){for(const e of this.rootEventUnsubscribers)e();this.rootEventUnsubscribers=[],this.subscribedRoot=null,this.rootEventSubscriptionsActive=!1}}traverseToClosest(e){return V(this,e)}applyVariantTokens(){if(!this.espRoot)return;const e=this.getVariantColorSource();if(!e){this.clearVariantTokens();return}const t=this.espRoot.activeTheme,o=A(t.seedColor);if(!o)return;const s=T(o,t)[e];if(!s){this.clearVariantTokens();return}this.setVariantTokenProperty("--esp-color-primary",k(O(s)));const a=T(s,t),c=n.statusVariantSources.has(e),{textContrast:C}=n,b={};for(const i of S){if(C[i])continue;const l=t.semanticMappings[i],h=t.chroma[i],d=this.effectiveVariantTokenSource(i,l.source,c),v=a[d],m=t.lightness[l.lightness],u=L(v,m,h.min,h.max);b[i]=u,this.setVariantTokenProperty(P(i),k(u))}for(const i of S){const l=C[i];if(!l)continue;const h=t.semanticMappings[i],d=t.chroma[i],v=this.effectiveVariantTokenSource(i,h.source,c),m=a[v],u=t.lightness[h.lightness],w=b[l.bg],R=F(m,u,d.min,d.max,w,l.targetLc);b[i]=R,this.setVariantTokenProperty(P(i),k(R))}}effectiveVariantTokenSource(e,t,o){return o&&n.semanticActionTokens.has(e)?"primary":t}getVariantColorSource(){switch(this.variant){case"":case"primary":case"neutral":return"";case"info":return"complementary";default:return this.variant}}setVariantTokenProperty(e,t){const o=this.variantTokenOriginalValues.get(e);if(o){const r=this.style.getPropertyValue(e),s=this.style.getPropertyPriority(e);(r!==o.generatedValue||s!==o.generatedPriority)&&(o.originalValue=r.length?r:null,o.originalPriority=s),o.generatedValue=t,o.generatedPriority=""}else{const r=this.style.getPropertyValue(e);this.variantTokenOriginalValues.set(e,{generatedPriority:"",generatedValue:t,originalPriority:this.style.getPropertyPriority(e),originalValue:r.length?r:null})}this.style.setProperty(e,t)}clearVariantTokens(){for(const[e,t]of this.variantTokenOriginalValues){const o=this.style.getPropertyValue(e),r=this.style.getPropertyPriority(e);(o!==t.generatedValue||r!==t.generatedPriority)&&(t.originalValue=o.length?o:null,t.originalPriority=r),t.originalValue===null?this.style.removeProperty(e):this.style.setProperty(e,t.originalValue,t.originalPriority)}this.variantTokenOriginalValues.clear()}}n.textContrast={text:{bg:"background",targetLc:75},dangerText:{bg:"background",targetLc:75},headings:{bg:"background",targetLc:60},headingsHover:{bg:"background",targetLc:60},link:{bg:"background",targetLc:75},linkHover:{bg:"background",targetLc:75},actionText:{bg:"actionBackground",targetLc:75},inputCaret:{bg:"layer2",targetLc:60},inputSelection:{bg:"inputSelectionBg",targetLc:60}},n.statusVariantSources=new Set(["danger","success","warning"]),n.semanticActionTokens=new Set(["actionBackground","actionText"]),n.styles=[z(".esp-field:focus-within","--esp-field-focus-shadow"),_,E`
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
    `],p([U()],n.prototype,"seedColor",null),p([y({attribute:!1})],n.prototype,"correlationId",void 0),p([y({type:String,reflect:!0})],n.prototype,"scheme",void 0),p([y({type:String,attribute:"variant",reflect:!0})],n.prototype,"variant",null);export{n as EspalierElementBase};
