var c=function(u,e,t,r){var o=arguments.length,s=o<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(u,e,t,r);else for(var i=u.length-1;i>=0;i--)(a=u[i])&&(s=(o<3?a(s):o>3?a(e,t,s):a(e,t))||s);return o>3&&s&&Object.defineProperty(e,t,s),s};import{css as R,LitElement as C}from"lit";import{property as d,state as S}from"lit/decorators.js";import{subscribeToRootEvent as p}from"./root-event-subscription.js";import{traverseToClosest as m}from"./utilities.js";import{parseCssColor as w,serializeOklch as P,gamutMapToSRGB as x}from"./color-engine.js";import{computeVariants as b}from"../root/helpers/compute-variants.js";import{computeSemanticProperties as v}from"../root/helpers/compute-semantic-properties.js";import{DocumentSpriteController as E}from"./document-sprite.js";import{dataCompanionProperties as V}from"../root/helpers/data-companion-properties.js";import{dataSeriesProperties as U}from"../root/helpers/compute-theme-properties.js";import{lightnessRampProperties as I}from"../root/helpers/lightness-ramp-properties.js";import{ELEVATION_PROPERTIES as O,TYPE_ROLE_COLOR_PROPERTIES as A}from"./scale-engine.js";import{resolveContextTheme as y,resolveDataColorSource as D,semanticToCSS as z}from"./theme.js";import{alignAttributeTextInheritance as N,focusRing as F}from"./style-fragments.js";import{syncNormalizedAttribute as _}from"./attribute-helpers.js";import{INTENT_VARIANTS as k,normalizeIntentVariant as j}from"./intent-values.js";import{ESP_EVENTS as B}from"./events.js";class n extends C{get seedColor(){return this.seedColorBacker}set seedColor(e){this.seedColorBacker=e}focusResolvedElementAfterUpdate(e,t){const r=()=>{const o=e();return o?(o.focus(t),!0):!1};r()||this.updateComplete.then(()=>{r()})}focusShadowElementAfterUpdate(e,t){this.focusResolvedElementAfterUpdate(()=>this.shadowRoot?.querySelector(e),t)}emitValueChanged(e){this.dispatchEvent(new CustomEvent(B.VALUE_CHANGED,{detail:e,bubbles:!0,composed:!0}))}get intent(){return this.intentBacker}set intent(e){const t=typeof e=="string"?e.trim():"";t!==""&&!k.includes(t)&&!this.warnedUnknownIntents.has(t)&&(this.warnedUnknownIntents.add(t),console.warn(`Espalier intent: "${t}" is not an intent; expected one of ${k.join(", ")}. Treating it as "neutral".`));const r=this.intentBacker,o=j(e);_(this,"intent",o),o!==r&&(this.intentBacker=o,this.requestUpdate("intent",r),this.applyTokensWhenRootReady())}get context(){return this.contextBacker}set context(e){const t=e??"";t!==this.contextBacker&&(this.contextBacker=t,this.applyTokensWhenRootReady(),this.refreshDescendantIntentDerivations())}refreshDescendantIntentDerivations(){const e=new Set,t=o=>{for(const s of Array.from(o.children))r(s)},r=o=>{if(!e.has(o)){if(e.add(o),o instanceof n&&o.applyTokensWhenRootReady(),o.shadowRoot&&t(o.shadowRoot),o instanceof HTMLSlotElement)for(const s of o.assignedElements({flatten:!0}))r(s);t(o)}};t(this),this.shadowRoot&&t(this.shadowRoot)}static flattenedParent(e){return e instanceof Element&&e.assignedSlot?e.assignedSlot:e instanceof ShadowRoot?e.host:e.parentNode}resolveAncestorZoneTheme(e){let t=n.flattenedParent(this);for(;t;){if(t instanceof Element&&t.localName==="esp-root")return null;if(t instanceof n){const r=t.contextBacker.trim();if(r){const o=this.resolveNamedContextTheme(e,r);if(o)return o}}t=n.flattenedParent(t)}return null}connectedCallback(){super.connectedCallback();const e=this.syncRootFromDom(!1);e&&this.subscribeToRootEvents(e)}disconnectedCallback(){super.disconnectedCallback(),this.unsubscribeFromRootEvents(),this.clearScopedTokens(),this.espRoot=null}firstUpdated(e){this.syncRootFromDom(!0),this.applyTokensWhenRootReady()}syncRootFromDom(e){const t=m(this,"esp-root");if(!t){if(this.espRoot&&this.clearScopedTokens(),this.unsubscribeFromRootEvents(),this.espRoot=null,!e)return null;throw new Error("No esp-root ancestor found. Espalier components must be placed inside an <esp-root> element.")}const r=t!==this.espRoot,s=t.scheme==="dark"?"dark":"light",a=this.scheme!==s,i=this.seedColor!==t.seedColor;return this.espRoot=t,r&&this.isConnected&&this.subscribeToRootEvents(t),(r||a||i)&&(this.scheme=s,this.seedColor=t.seedColor,this.applyTokensWhenRootReady()),r&&this.requestUpdate(),t}applyTokensWhenRootReady(){const e=this.espRoot;if(e&&(!e.hasUpdated||e.isUpdatePending)){this.applyTokensAfterInitialRootUpdate(e);return}this.applyScopedColorTokens()}applyTokensAfterInitialRootUpdate(e){if(this.pendingInitialThemeRoot===e)return;this.pendingInitialThemeRoot=e;const t=e.updateComplete;if(!t){this.pendingInitialThemeRoot=null,this.applyScopedColorTokens();return}t.then(()=>{this.pendingInitialThemeRoot===e&&(this.pendingInitialThemeRoot=null),!(!this.isConnected||this.espRoot!==e)&&(this.scheme=e.scheme==="dark"?"dark":"light",this.seedColor=e.seedColor,this.applyScopedColorTokens())})}subscribeToRootEvents(e){this.rootEventSubscriptionsActive&&this.subscribedRoot===e||(this.unsubscribeFromRootEvents(),this.subscribedRoot=e,this.rootEventUnsubscribers=[p(e,"seed-color-changed",this.handleSeedColorChanged),p(e,"scheme-changed",this.handleSchemeChanged),p(e,"theme-changed",this.handleThemeChanged),p(e,"icon-sprite-url-changed",this.handleIconSpriteUrlChanged)],this.rootEventSubscriptionsActive=!0)}unsubscribeFromRootEvents(){if(this.rootEventSubscriptionsActive){for(const e of this.rootEventUnsubscribers)e();this.rootEventUnsubscribers=[],this.subscribedRoot=null,this.rootEventSubscriptionsActive=!1}}constructor(){super(),this.seedColorBacker="oklch(0.7 0.125 216)",this.espRoot=null,this.contextBacker="",this.scopedTokenOriginalValues=new Map,this.warnedUnknownContexts=new Set,this.pendingInitialThemeRoot=null,this.rootEventSubscriptionsActive=!1,this.subscribedRoot=null,this.rootEventUnsubscribers=[],this.intentBacker="neutral",this.intentEmitsTokens=!0,this.warnedUnknownIntents=new Set,this.correlationId=globalThis.crypto?.randomUUID?.()??Math.random().toString(36),this.scheme="light",this.handleSeedColorChanged=e=>{this.syncRootFromDom(!1)&&(this.seedColor=e.seedColor,this.applyScopedColorTokens())},this.handleSchemeChanged=e=>{!this.syncRootFromDom(!1)||this.scheme===e.scheme||(this.scheme=e.scheme,this.applyScopedColorTokens())},this.handleThemeChanged=()=>{this.syncRootFromDom(!1)&&this.applyScopedColorTokens()},this.handleIconSpriteUrlChanged=()=>{this.syncRootFromDom(!1)&&this.requestUpdate()},new E(this,{reactToSpriteChanges:!1})}traverseToClosest(e){return m(this,e)}applyScopedColorTokens(){if(!this.espRoot)return;const e=this.intentEmitsTokens?n.intentColorSources[this.intentBacker]:"";if(!e&&!this.context.trim()){this.clearScopedTokens();return}const t=this.espRoot.activeTheme;if(!t){this.clearScopedTokens();return}const r=this.resolveContextTheme(t),o=r.theme,s=w(o.seedColor);if(!s)return;const a=b(s,o),i={};if(r.applied&&(Object.assign(i,v(o,a)),Object.assign(i,I(o)),Object.assign(i,O),Object.assign(i,A),Object.assign(i,V(i,U(o,s,l=>(typeof l=="string"?D(l,o.anchors):null)??o.seedColor)))),e){let l=o;r.applied||(l=this.resolveAncestorZoneTheme(t)??o);const g=l===o?a:b(s,l),T=v(l,g,{effectiveSource:(f,h)=>n.semanticActionTokens.has(f)?e:h});i["--esp-color-primary"]=P(x(g[e]));for(const f of n.semanticActionTokens){const h=z(f);i[h]=T[h]}}this.applyScopedTokenProperties(i)}resolveContextTheme(e){const t=this.context.trim();if(!t)return{applied:!1,theme:e};const r=this.resolveNamedContextTheme(e,t);return r?{applied:!0,theme:r}:(this.warnUnknownContextWhenSettled(t),{applied:!1,theme:e})}warnUnknownContextWhenSettled(e){if(this.warnedUnknownContexts.has(e))return;const t=this.espRoot;if(t&&!t.themeSettled){t.whenThemeSettled().then(()=>{if(!this.isConnected||this.espRoot!==t||this.context.trim()!==e)return;const r=t.activeTheme;r&&y(r,e)||this.warnUnknownContextWhenSettled(e)});return}this.warnedUnknownContexts.add(e),console.warn(`Espalier context: "${e}" is not defined by the active theme; inheriting root tokens.`)}resolveNamedContextTheme(e,t){return y(e,t)}applyScopedTokenProperties(e){for(const t of this.scopedTokenOriginalValues.keys())t in e||this.restoreScopedTokenProperty(t);for(const[t,r]of Object.entries(e))this.setScopedTokenProperty(t,r)}setScopedTokenProperty(e,t){const r=this.scopedTokenOriginalValues.get(e);if(r){const o=this.style.getPropertyValue(e),s=this.style.getPropertyPriority(e);(o!==r.generatedValue||s!==r.generatedPriority)&&(r.originalValue=o.length?o:null,r.originalPriority=s),r.generatedValue=t,r.generatedPriority=""}else{const o=this.style.getPropertyValue(e);this.scopedTokenOriginalValues.set(e,{generatedPriority:"",generatedValue:t,originalPriority:this.style.getPropertyPriority(e),originalValue:o.length?o:null})}this.style.setProperty(e,t)}restoreScopedTokenProperty(e){const t=this.scopedTokenOriginalValues.get(e);if(!t)return;const r=this.style.getPropertyValue(e),o=this.style.getPropertyPriority(e);(r!==t.generatedValue||o!==t.generatedPriority)&&(t.originalValue=r.length?r:null,t.originalPriority=o),t.originalValue===null?this.style.removeProperty(e):this.style.setProperty(e,t.originalValue,t.originalPriority),this.scopedTokenOriginalValues.delete(e)}clearScopedTokens(){for(const e of[...this.scopedTokenOriginalValues.keys()])this.restoreScopedTokenProperty(e)}}n.intentColorSources={danger:"danger",info:"info",neutral:"",success:"success",warning:"warning"},n.semanticActionTokens=new Set(["actionBackground","actionText"]),n.styles=[F(".esp-field:focus-within","--esp-field-focus-shadow"),N,R`
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
    `],c([S()],n.prototype,"seedColor",null),c([d({attribute:!1})],n.prototype,"correlationId",void 0),c([d({type:String,reflect:!0})],n.prototype,"scheme",void 0),c([d({type:String,attribute:"intent",reflect:!0,useDefault:!0})],n.prototype,"intent",null),c([d({type:String,attribute:"context",reflect:!0})],n.prototype,"context",null);export{n as EspalierElementBase};
