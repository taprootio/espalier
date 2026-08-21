var h=function(f,e,t,r){var o=arguments.length,s=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(f,e,t,r);else for(var i=f.length-1;i>=0;i--)(a=f[i])&&(s=(o<3?a(s):o>3?a(e,t,s):a(e,t))||s);return o>3&&s&&Object.defineProperty(e,t,s),s};import{css as R,LitElement as C}from"lit";import{property as p,state as S}from"lit/decorators.js";import{subscribeToRootEvent as u}from"./root-event-subscription.js";import{traverseToClosest as b}from"./utilities.js";import{parseCssColor as w,serializeOklch as x,gamutMapToSRGB as P}from"./color-engine.js";import{computeVariants as v}from"../root/helpers/compute-variants.js";import{computeSemanticProperties as m}from"../root/helpers/compute-semantic-properties.js";import{lightnessRampProperties as E}from"../root/helpers/lightness-ramp-properties.js";import{ROLE_NAMES as V,mergeTheme as U,semanticToCSS as A}from"./theme.js";import{alignAttributeTextInheritance as I,focusRing as O}from"./style-fragments.js";import{syncNormalizedAttribute as D}from"./attribute-helpers.js";import{INTENT_VARIANTS as y,normalizeIntentVariant as z}from"./intent-values.js";const k=new WeakMap;class n extends C{constructor(){super(...arguments),this.seedColorBacker="oklch(0.7 0.125 216)",this.espRoot=null,this.contextBacker="",this.scopedTokenOriginalValues=new Map,this.warnedUnknownContexts=new Set,this.pendingInitialThemeRoot=null,this.rootEventSubscriptionsActive=!1,this.subscribedRoot=null,this.rootEventUnsubscribers=[],this.intentBacker="neutral",this.intentEmitsTokens=!0,this.warnedUnknownIntents=new Set,this.correlationId=globalThis.crypto?.randomUUID?.()??Math.random().toString(36),this.scheme="light",this.handleSeedColorChanged=e=>{this.syncRootFromDom(!1)&&(this.seedColor=e.seedColor,this.applyScopedColorTokens())},this.handleSchemeChanged=e=>{!this.syncRootFromDom(!1)||this.scheme===e.scheme||(this.scheme=e.scheme,this.applyScopedColorTokens())},this.handleThemeChanged=()=>{this.syncRootFromDom(!1)&&this.applyScopedColorTokens()},this.handleIconSpriteUrlChanged=()=>{this.syncRootFromDom(!1)&&this.requestUpdate()}}get seedColor(){return this.seedColorBacker}set seedColor(e){this.seedColorBacker=e}focusResolvedElementAfterUpdate(e,t){const r=()=>{const o=e();return o?(o.focus(t),!0):!1};r()||this.updateComplete.then(()=>{r()})}focusShadowElementAfterUpdate(e,t){this.focusResolvedElementAfterUpdate(()=>this.shadowRoot?.querySelector(e),t)}emitValueChanged(e){this.dispatchEvent(new CustomEvent("value-changed",{detail:e,bubbles:!0,composed:!0}))}get intent(){return this.intentBacker}set intent(e){const t=typeof e=="string"?e.trim():"";t!==""&&!y.includes(t)&&!this.warnedUnknownIntents.has(t)&&(this.warnedUnknownIntents.add(t),console.warn(`Espalier intent: "${t}" is not an intent; expected one of ${y.join(", ")}. Treating it as "neutral".`));const r=this.intentBacker,o=z(e);D(this,"intent",o),o!==r&&(this.intentBacker=o,this.requestUpdate("intent",r),this.applyTokensWhenRootReady())}get context(){return this.contextBacker}set context(e){const t=e??"";t!==this.contextBacker&&(this.contextBacker=t,this.applyTokensWhenRootReady(),this.refreshDescendantIntentDerivations())}refreshDescendantIntentDerivations(){const e=new Set,t=o=>{for(const s of Array.from(o.children))r(s)},r=o=>{if(!e.has(o)){if(e.add(o),o instanceof n&&o.applyTokensWhenRootReady(),o.shadowRoot&&t(o.shadowRoot),o instanceof HTMLSlotElement)for(const s of o.assignedElements({flatten:!0}))r(s);t(o)}};t(this),this.shadowRoot&&t(this.shadowRoot)}static flattenedParent(e){return e instanceof Element&&e.assignedSlot?e.assignedSlot:e instanceof ShadowRoot?e.host:e.parentNode}resolveAncestorZoneTheme(e){let t=n.flattenedParent(this);for(;t;){if(t instanceof Element&&t.localName==="esp-root")return null;if(t instanceof n){const r=t.contextBacker.trim();if(r){const o=this.resolveNamedContextTheme(e,r);if(o)return o}}t=n.flattenedParent(t)}return null}connectedCallback(){super.connectedCallback();const e=this.syncRootFromDom(!1);e&&this.subscribeToRootEvents(e)}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeFromRootEvents(),this.clearScopedTokens(),this.espRoot=null}firstUpdated(e){this.syncRootFromDom(!0),this.applyTokensWhenRootReady()}syncRootFromDom(e){const t=b(this,"esp-root");if(!t){if(this.espRoot&&this.clearScopedTokens(),this.unsubscribeFromRootEvents(),this.espRoot=null,!e)return null;throw new Error("No esp-root ancestor found. Espalier components must be placed inside an <esp-root> element.")}const r=t!==this.espRoot,s=t.scheme==="dark"?"dark":"light",a=this.scheme!==s,i=this.seedColor!==t.seedColor;return this.espRoot=t,r&&this.isConnected&&this.subscribeToRootEvents(t),(r||a||i)&&(this.scheme=s,this.seedColor=t.seedColor,this.applyTokensWhenRootReady()),r&&this.requestUpdate(),t}applyTokensWhenRootReady(){const e=this.espRoot;if(e&&(!e.hasUpdated||e.isUpdatePending)){this.applyTokensAfterInitialRootUpdate(e);return}this.applyScopedColorTokens()}applyTokensAfterInitialRootUpdate(e){if(this.pendingInitialThemeRoot===e)return;this.pendingInitialThemeRoot=e;const t=e.updateComplete;if(!t){this.pendingInitialThemeRoot=null,this.applyScopedColorTokens();return}t.then(()=>{this.pendingInitialThemeRoot===e&&(this.pendingInitialThemeRoot=null),!(!this.isConnected||this.espRoot!==e)&&(this.scheme=e.scheme==="dark"?"dark":"light",this.seedColor=e.seedColor,this.applyScopedColorTokens())})}subscribeToRootEvents(e){this.rootEventSubscriptionsActive&&this.subscribedRoot===e||(this.unsubscribeFromRootEvents(),this.subscribedRoot=e,this.rootEventUnsubscribers=[u(e,"seed-color-changed",this.handleSeedColorChanged),u(e,"scheme-changed",this.handleSchemeChanged),u(e,"theme-changed",this.handleThemeChanged),u(e,"icon-sprite-url-changed",this.handleIconSpriteUrlChanged)],this.rootEventSubscriptionsActive=!0)}unsubscribeFromRootEvents(){if(this.rootEventSubscriptionsActive){for(const e of this.rootEventUnsubscribers)e();this.rootEventUnsubscribers=[],this.subscribedRoot=null,this.rootEventSubscriptionsActive=!1}}traverseToClosest(e){return b(this,e)}applyScopedColorTokens(){if(!this.espRoot)return;const e=this.intentEmitsTokens?n.intentColorSources[this.intentBacker]:"";if(!e&&!this.context.trim()){this.clearScopedTokens();return}const t=this.espRoot.activeTheme;if(!t){this.clearScopedTokens();return}const r=this.resolveContextTheme(t),o=r.theme,s=w(o.seedColor);if(!s)return;const a=v(s,o),i={};if(r.applied&&(Object.assign(i,m(o,a)),Object.assign(i,E(o))),e){let c=o;r.applied||(c=this.resolveAncestorZoneTheme(t)??o);const l=c===o?a:v(s,c),T=m(c,l,{effectiveSource:(g,d)=>n.semanticActionTokens.has(g)?e:d});i["--esp-color-primary"]=x(P(l[e]));for(const g of n.semanticActionTokens){const d=A(g);i[d]=T[d]}}this.applyScopedTokenProperties(i)}resolveContextTheme(e){const t=this.context.trim();if(!t)return{applied:!1,theme:e};const r=this.resolveNamedContextTheme(e,t);return r?{applied:!0,theme:r}:(this.warnedUnknownContexts.has(t)||(this.warnedUnknownContexts.add(t),console.warn(`Espalier context: "${t}" is not defined by the active theme; inheriting root tokens.`)),{applied:!1,theme:e})}resolveNamedContextTheme(e,t){const r=e.contexts&&Object.prototype.hasOwnProperty.call(e.contexts,t)?e.contexts[t]:void 0;if(!r)return null;let o=k.get(e);const s=o?.get(t);if(s)return s;const a={};for(const c of V){const l=r[c];l!==void 0&&(a[c]=l)}const i=U(e,{lightness:r.lightness,roles:a});return o||(o=new Map,k.set(e,o)),o.set(t,i),i}applyScopedTokenProperties(e){for(const t of this.scopedTokenOriginalValues.keys())t in e||this.restoreScopedTokenProperty(t);for(const[t,r]of Object.entries(e))this.setScopedTokenProperty(t,r)}setScopedTokenProperty(e,t){const r=this.scopedTokenOriginalValues.get(e);if(r){const o=this.style.getPropertyValue(e),s=this.style.getPropertyPriority(e);(o!==r.generatedValue||s!==r.generatedPriority)&&(r.originalValue=o.length?o:null,r.originalPriority=s),r.generatedValue=t,r.generatedPriority=""}else{const o=this.style.getPropertyValue(e);this.scopedTokenOriginalValues.set(e,{generatedPriority:"",generatedValue:t,originalPriority:this.style.getPropertyPriority(e),originalValue:o.length?o:null})}this.style.setProperty(e,t)}restoreScopedTokenProperty(e){const t=this.scopedTokenOriginalValues.get(e);if(!t)return;const r=this.style.getPropertyValue(e),o=this.style.getPropertyPriority(e);(r!==t.generatedValue||o!==t.generatedPriority)&&(t.originalValue=r.length?r:null,t.originalPriority=o),t.originalValue===null?this.style.removeProperty(e):this.style.setProperty(e,t.originalValue,t.originalPriority),this.scopedTokenOriginalValues.delete(e)}clearScopedTokens(){for(const e of[...this.scopedTokenOriginalValues.keys()])this.restoreScopedTokenProperty(e)}}n.intentColorSources={danger:"danger",info:"info",neutral:"",success:"success",warning:"warning"},n.semanticActionTokens=new Set(["actionBackground","actionText"]),n.styles=[O(".esp-field:focus-within","--esp-field-focus-shadow"),I,R`
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
    `],h([S()],n.prototype,"seedColor",null),h([p({attribute:!1})],n.prototype,"correlationId",void 0),h([p({type:String,reflect:!0})],n.prototype,"scheme",void 0),h([p({type:String,attribute:"intent",reflect:!0,useDefault:!0})],n.prototype,"intent",null),h([p({type:String,attribute:"context",reflect:!0})],n.prototype,"context",null);export{n as EspalierElementBase};
