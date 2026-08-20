var c=function(u,e,t,o){var r=arguments.length,s=r<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(u,e,t,o);else for(var i=u.length-1;i>=0;i--)(n=u[i])&&(s=(r<3?n(s):r>3?n(e,t,s):n(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};import{css as R,LitElement as T}from"lit";import{property as d,state as C}from"lit/decorators.js";import{subscribeToRootEvent as p}from"./root-event-subscription.js";import{traverseToClosest as f}from"./utilities.js";import{parseCssColor as S,serializeOklch as x,gamutMapToSRGB as V}from"./color-engine.js";import{computeVariants as g}from"../root/helpers/compute-variants.js";import{computeSemanticProperties as b}from"../root/helpers/compute-semantic-properties.js";import{ROLE_NAMES as w,mergeTheme as P}from"./theme.js";import{alignAttributeTextInheritance as E,focusRing as U}from"./style-fragments.js";const v=new WeakMap;class a extends T{constructor(){super(...arguments),this.seedColorBacker="oklch(0.7 0.125 216)",this.espRoot=null,this.contextBacker="",this.scopedTokenOriginalValues=new Map,this.warnedUnknownContexts=new Set,this.pendingInitialThemeRoot=null,this.rootEventSubscriptionsActive=!1,this.subscribedRoot=null,this.rootEventUnsubscribers=[],this.variantBacker="primary",this.correlationId=globalThis.crypto?.randomUUID?.()??Math.random().toString(36),this.scheme="light",this.handleSeedColorChanged=e=>{this.syncRootFromDom(!1)&&(this.seedColor=e.seedColor,this.applyVariantTokens())},this.handleSchemeChanged=e=>{!this.syncRootFromDom(!1)||this.scheme===e.scheme||(this.scheme=e.scheme,this.applyVariantTokens())},this.handleThemeChanged=()=>{this.syncRootFromDom(!1)&&this.applyVariantTokens()},this.handleIconSpriteUrlChanged=()=>{this.syncRootFromDom(!1)&&this.requestUpdate()}}get seedColor(){return this.seedColorBacker}set seedColor(e){this.seedColorBacker=e}focusResolvedElementAfterUpdate(e,t){const o=()=>{const r=e();return r?(r.focus(t),!0):!1};o()||this.updateComplete.then(()=>{o()})}focusShadowElementAfterUpdate(e,t){this.focusResolvedElementAfterUpdate(()=>this.shadowRoot?.querySelector(e),t)}emitValueChanged(e){this.dispatchEvent(new CustomEvent("value-changed",{detail:e,bubbles:!0,composed:!0}))}get variant(){return this.variantBacker}set variant(e){this.variantBacker=e,this.applyTokensWhenRootReady()}get context(){return this.contextBacker}set context(e){const t=e??"";t!==this.contextBacker&&(this.contextBacker=t,this.applyTokensWhenRootReady())}connectedCallback(){super.connectedCallback();const e=this.syncRootFromDom(!1);e&&this.subscribeToRootEvents(e)}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeFromRootEvents()}firstUpdated(e){this.syncRootFromDom(!0),this.applyTokensWhenRootReady()}syncRootFromDom(e){const t=f(this,"esp-root");if(!t){if(this.espRoot&&this.clearScopedTokens(),this.unsubscribeFromRootEvents(),this.espRoot=null,!e)return null;throw new Error("No esp-root ancestor found. Espalier components must be placed inside an <esp-root> element.")}const o=t!==this.espRoot,s=t.scheme==="dark"?"dark":"light",n=this.scheme!==s,i=this.seedColor!==t.seedColor;return this.espRoot=t,o&&this.isConnected&&this.subscribeToRootEvents(t),(o||n||i)&&(this.scheme=s,this.seedColor=t.seedColor,this.applyTokensWhenRootReady()),o&&this.requestUpdate(),t}applyTokensWhenRootReady(){const e=this.espRoot;if(e&&(!e.hasUpdated||e.isUpdatePending)){this.applyTokensAfterInitialRootUpdate(e);return}this.applyVariantTokens()}applyTokensAfterInitialRootUpdate(e){if(this.pendingInitialThemeRoot===e)return;this.pendingInitialThemeRoot=e;const t=e.updateComplete;if(!t){this.pendingInitialThemeRoot=null,this.applyVariantTokens();return}t.then(()=>{this.pendingInitialThemeRoot===e&&(this.pendingInitialThemeRoot=null),!(!this.isConnected||this.espRoot!==e)&&(this.scheme=e.scheme==="dark"?"dark":"light",this.seedColor=e.seedColor,this.applyVariantTokens())})}subscribeToRootEvents(e){this.rootEventSubscriptionsActive&&this.subscribedRoot===e||(this.unsubscribeFromRootEvents(),this.subscribedRoot=e,this.rootEventUnsubscribers=[p(e,"seed-color-changed",this.handleSeedColorChanged),p(e,"scheme-changed",this.handleSchemeChanged),p(e,"theme-changed",this.handleThemeChanged),p(e,"icon-sprite-url-changed",this.handleIconSpriteUrlChanged)],this.rootEventSubscriptionsActive=!0)}unsubscribeFromRootEvents(){if(this.rootEventSubscriptionsActive){for(const e of this.rootEventUnsubscribers)e();this.rootEventUnsubscribers=[],this.subscribedRoot=null,this.rootEventSubscriptionsActive=!1}}traverseToClosest(e){return f(this,e)}applyVariantTokens(){if(!this.espRoot)return;const e=this.getVariantColorSource();if(!e&&!this.context.trim()){this.clearScopedTokens();return}const t=this.espRoot.activeTheme;if(!t){this.clearScopedTokens();return}const o=this.resolveContextTheme(t),r=o.theme,s=S(r.seedColor);if(!s)return;const n=g(s,r),i={};if(!e){o.applied&&Object.assign(i,b(r,n)),this.applyScopedTokenProperties(i);return}const l=n[e];if(!l){this.clearScopedTokens();return}i["--esp-color-primary"]=x(V(l));const h=g(l,r),y=a.statusVariantSources.has(e);Object.assign(i,b(r,h,{effectiveSource:(m,k)=>this.effectiveVariantTokenSource(m,k,y)})),this.applyScopedTokenProperties(i)}resolveContextTheme(e){const t=this.context.trim();if(!t)return{applied:!1,theme:e};const o=e.contexts&&Object.prototype.hasOwnProperty.call(e.contexts,t)?e.contexts[t]:void 0;if(o){let r=v.get(e);const s=r?.get(t);if(s)return{applied:!0,theme:s};const n={};for(const l of w){const h=o[l];h!==void 0&&(n[l]=h)}const i=P(e,{lightness:o.lightness,roles:n});return r||(r=new Map,v.set(e,r)),r.set(t,i),{applied:!0,theme:i}}return this.warnedUnknownContexts.has(t)||(this.warnedUnknownContexts.add(t),console.warn(`Espalier context: "${t}" is not defined by the active theme; inheriting root tokens.`)),{applied:!1,theme:e}}effectiveVariantTokenSource(e,t,o){return o&&a.semanticActionTokens.has(e)?"primary":t}getVariantColorSource(){switch(this.variant){case"":case"primary":case"neutral":return"";case"info":return"complementary";default:return this.variant}}applyScopedTokenProperties(e){for(const t of this.scopedTokenOriginalValues.keys())t in e||this.restoreScopedTokenProperty(t);for(const[t,o]of Object.entries(e))this.setScopedTokenProperty(t,o)}setScopedTokenProperty(e,t){const o=this.scopedTokenOriginalValues.get(e);if(o){const r=this.style.getPropertyValue(e),s=this.style.getPropertyPriority(e);(r!==o.generatedValue||s!==o.generatedPriority)&&(o.originalValue=r.length?r:null,o.originalPriority=s),o.generatedValue=t,o.generatedPriority=""}else{const r=this.style.getPropertyValue(e);this.scopedTokenOriginalValues.set(e,{generatedPriority:"",generatedValue:t,originalPriority:this.style.getPropertyPriority(e),originalValue:r.length?r:null})}this.style.setProperty(e,t)}restoreScopedTokenProperty(e){const t=this.scopedTokenOriginalValues.get(e);if(!t)return;const o=this.style.getPropertyValue(e),r=this.style.getPropertyPriority(e);(o!==t.generatedValue||r!==t.generatedPriority)&&(t.originalValue=o.length?o:null,t.originalPriority=r),t.originalValue===null?this.style.removeProperty(e):this.style.setProperty(e,t.originalValue,t.originalPriority),this.scopedTokenOriginalValues.delete(e)}clearScopedTokens(){for(const e of[...this.scopedTokenOriginalValues.keys()])this.restoreScopedTokenProperty(e)}}a.statusVariantSources=new Set(["danger","success","warning"]),a.semanticActionTokens=new Set(["actionBackground","actionText"]),a.styles=[U(".esp-field:focus-within","--esp-field-focus-shadow"),E,R`
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
    `],c([C()],a.prototype,"seedColor",null),c([d({attribute:!1})],a.prototype,"correlationId",void 0),c([d({type:String,reflect:!0})],a.prototype,"scheme",void 0),c([d({type:String,attribute:"variant",reflect:!0})],a.prototype,"variant",null),c([d({type:String,attribute:"context",reflect:!0})],a.prototype,"context",null);export{a as EspalierElementBase};
