var h=function(c,e,t,i){var l=arguments.length,s=l<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(c,e,t,i);else for(var n=c.length-1;n>=0;n--)(r=c[n])&&(s=(l<3?r(s):l>3?r(e,t,s):r(e,t))||s);return l>3&&s&&Object.defineProperty(e,t,s),s},a;import{css as b,html as w,LitElement as E}from"lit";import{customElement as C,property as m,state as R}from"lit/decorators.js";import{getEspBus as p}from"../shared/bus-events.js";import{subscribeToRootEvent as x}from"../shared/root-event-subscription.js";import{DEFAULT_LIGHT_THEME as f,DEFAULT_DARK_THEME as y,encodeTheme as S,parseTheme as g,mergeTheme as v}from"../shared/theme.js";import{computeThemeProperties as D}from"./helpers/compute-theme-properties.js";import{registerImageTexture as A,registeredImageTextures as L}from"../shared/image-texture-registry.js";import{registerImageTexture as O,registeredImageTextures as j,BUILT_IN_IMAGE_TEXTURES as H}from"../shared/image-texture-registry.js";const T=1e3;let o=a=class extends E{constructor(){super(...arguments),this.schemeBacker="",this.schemeExplicitlySet=!1,this.resolvingDefaultScheme=!1,this.themeEventsReady=!1,this.systemSchemeQuery=null,this.lastSeedColor="",this.resolvedLightTheme={...f},this.resolvedDarkTheme={...y},this.appliedDataRampProperties=new Set,this.documentClickRegistrationActive=!1,this.correlationId=globalThis.crypto?.randomUUID?.()??Math.random().toString(36),this.lightThemeAttr="",this.darkThemeAttr="",this.fontCSSRoot="/css/fonts/",this.fontDefinitionsUrl="",this.googleFontLoading="auto",this.iconSpriteUrl="/assets/icons.svg",this.themePending=!1,this.themeReadyState=!1,this.themeSettleWaiters=[],this.warnedThemeSettleTimeout=!1,this.defaultScheme="light",this.resizeObserver=new ResizeObserver(()=>{p().publish("window-resized",{emWidth:window.innerWidth/parseFloat(getComputedStyle(document.documentElement).fontSize),emHeight:window.innerHeight/parseFloat(getComputedStyle(document.documentElement).fontSize),pxWidth:window.innerWidth,pxHeight:window.innerHeight})}),this.handleSystemSchemeChange=e=>{this.schemeExplicitlySet||this.defaultScheme!=="system"||(this.resolvingDefaultScheme=!0,this.scheme=e.matches?"dark":"light",this.resolvingDefaultScheme=!1)}}static registerTexture(e,t){A(e,t)}static registeredTextures(){return L()}subscribeScoped(e,t){return x(this,e,t)}get lightTheme(){return this.lightThemeAttr?g(this.lightThemeAttr):null}set lightTheme(e){this.lightThemeAttr=e?S(e):""}get darkTheme(){return this.darkThemeAttr?g(this.darkThemeAttr):null}set darkTheme(e){this.darkThemeAttr=e?S(e):""}get themeSettled(){return this.themeReadyState}whenThemeSettled(){return this.themeReadyState?Promise.resolve():new Promise(e=>{this.themeSettleWaiters.push(e)})}get hasAuthorTheme(){return!!(this.scheme==="dark"?this.darkThemeAttr:this.lightThemeAttr)}settleTheme(){if(this.themeSettleTimer!==void 0&&(clearTimeout(this.themeSettleTimer),this.themeSettleTimer=void 0),this.themeReadyState)return;this.themeReadyState=!0;const e=this.themeSettleWaiters;this.themeSettleWaiters=[];for(const t of e)t()}get scheme(){return this.schemeBacker}set scheme(e){const t=e==="dark"?"dark":e==="light"?"light":"",i=this.schemeBacker,l=this.schemeExplicitlySet;this.resolvingDefaultScheme||(this.schemeExplicitlySet=t.length>0);const s=t||this.resolveDefaultScheme();l!==this.schemeExplicitlySet&&this.isConnected&&this.syncSystemSchemeListener(),s!==i&&(this.schemeBacker=s,this.requestUpdate("scheme",i),this.themeEventsReady&&p().publish("scheme-changed",{scheme:s,correlationId:this.correlationId}))}get seedColor(){return this.activeTheme.seedColor}static extractFamily(e){if(!e)return"";const t=e.match(/^"([^"]+)"|^'([^']+)'/);return t&&(t[1]||t[2])||""}injectGoogleFontLink(e,t,i){const l="data-esp-font",s=`${this.correlationId}-${e}`,r=document.head.querySelector(`link[${l}="${s}"]`);if(this.googleFontLoading==="none"){r?.remove();return}if(r&&t&&r.dataset.espFamily===t&&r.dataset.espWeight===(i??"")||(r?.remove(),!t))return;const n=encodeURIComponent(t),u=i==="bold"?"700":i==="normal"?"400":i,k=u&&u!=="400"?`:wght@${u}`:"",d=document.createElement("link");d.rel="stylesheet",d.href=`https://fonts.googleapis.com/css2?family=${n}${k}&display=swap`,d.setAttribute(l,s),d.dataset.espFamily=t,d.dataset.espWeight=i??"",document.head.appendChild(d)}syncGoogleFontLinks(){this.googleFontLoading==="none"&&this.removeRuntimeGoogleFontLinks();const e=this.activeTheme;this.injectGoogleFontLink("body",a.extractFamily(e.fontBody),e.fontWeightBody),this.injectGoogleFontLink("headings",a.extractFamily(e.fontHeadings),e.fontWeightHeadings),this.injectGoogleFontLink("brand",a.extractFamily(e.fontBrand),e.fontWeightBrand),this.injectGoogleFontLink("monospace",a.extractFamily(e.fontMonospace),e.fontWeightMonospace)}removeRuntimeGoogleFontLinks(){for(const e of document.head.querySelectorAll(`link[data-esp-font^="${this.correlationId}-"]`))e.remove();for(const e of document.head.querySelectorAll(`link[data-esp-font-picker-root="${CSS.escape(this.correlationId)}"]`))e.remove()}get activeTheme(){return this.scheme==="dark"?this.resolvedDarkTheme:this.resolvedLightTheme}resolveThemes(){const e=this.lightThemeAttr?g(this.lightThemeAttr):null;this.resolvedLightTheme=e?v(f,e):{...f};const t=this.darkThemeAttr?g(this.darkThemeAttr):null;this.resolvedDarkTheme=t?v(y,t):{...y}}connectedCallback(){super.connectedCallback(),this.registerDocumentClickBridge(),this.resizeObserver.observe(this),this.hasUpdated&&(this.applyDefaultScheme(),this.syncGoogleFontLinks(),this.hasAuthorTheme||this.startThemeSettleTimer())}willUpdate(e){const t=["lightThemeAttr","darkThemeAttr"];(!this.lastSeedColor||t.some(n=>e.has(n)))&&(this.resolveThemes(),this.themeEventsReady&&p().publish("theme-changed",{correlationId:this.correlationId})),this.hasAuthorTheme&&this.settleTheme();const l=D(this.activeTheme,this.scheme==="dark"?"dark":"light"),s=new Set(Object.keys(l).filter(n=>n.startsWith("--esp-color-ramp-")));for(const n of this.appliedDataRampProperties)s.has(n)||this.style.removeProperty(n);for(const[n,u]of Object.entries(l))this.style.setProperty(n,u);this.appliedDataRampProperties=s;const r=this.activeTheme.seedColor;this.themeEventsReady&&this.lastSeedColor&&this.lastSeedColor!==r&&p().publish("seed-color-changed",{seedColor:r,correlationId:this.correlationId}),this.lastSeedColor=r,this.themeEventsReady&&e.has("iconSpriteUrl")&&p().publish("icon-sprite-url-changed",{iconSpriteUrl:this.iconSpriteUrl,correlationId:this.correlationId}),this.syncGoogleFontLinks()}firstUpdated(){const e=this.activeTheme.stylesheets;if(e.length)for(const t of e){const i=document.createElement("link");i.rel="stylesheet",i.href=t,document.head.appendChild(i)}if(!document.getElementById("esp-root-base-styles")){const t=document.createElement("style");t.id="esp-root-base-styles",t.textContent=a.lightDomStyles,document.head.appendChild(t)}this.applyDefaultScheme(),this.lastSeedColor=this.activeTheme.seedColor,this.themeEventsReady=!0,this.startThemeSettleTimer()}startThemeSettleTimer(){if(this.themeReadyState||this.themeSettleTimer!==void 0)return;this.themeSettleDeadline??=performance.now()+T;const e=Math.max(0,this.themeSettleDeadline-performance.now());if(e===0){this.closeThemeWindow();return}this.themeSettleTimer=setTimeout(()=>this.closeThemeWindow(),e)}closeThemeWindow(){this.themeSettleTimer=void 0,this.themePending&&!this.warnedThemeSettleTimeout&&(this.warnedThemeSettleTimeout=!0,console.warn(`Espalier root: theme-pending was declared but no ${this.scheme} theme arrived within ${T}ms, so the default palette is rendering. Assign ${this.scheme==="dark"?"darkTheme":"lightTheme"} (or remove theme-pending).`)),this.settleTheme()}updated(e){this.toggleAttribute("data-theme-ready",this.themeReadyState),(e.has("defaultScheme")||e.has("scheme"))&&!this.schemeExplicitlySet&&this.applyDefaultScheme()}disconnectedCallback(){this.themeSettleTimer!==void 0&&(clearTimeout(this.themeSettleTimer),this.themeSettleTimer=void 0),this.unregisterDocumentClickBridge(),this.systemSchemeQuery?.removeEventListener("change",this.handleSystemSchemeChange),this.systemSchemeQuery=null,this.resizeObserver.disconnect(),this.removeRuntimeGoogleFontLinks(),super.disconnectedCallback()}registerDocumentClickBridge(){this.documentClickRegistrationActive||(this.documentClickRegistrationActive=!0,a.connectedRootCount+=1,a.connectedRootCount===1&&document.addEventListener("click",a.handleDocumentClick))}unregisterDocumentClickBridge(){this.documentClickRegistrationActive&&(this.documentClickRegistrationActive=!1,a.connectedRootCount=Math.max(0,a.connectedRootCount-1),a.connectedRootCount===0&&document.removeEventListener("click",a.handleDocumentClick))}applyDefaultScheme(){this.schemeExplicitlySet||(this.resolvingDefaultScheme=!0,this.scheme=this.resolveDefaultScheme(),this.resolvingDefaultScheme=!1,this.syncSystemSchemeListener())}resolveDefaultScheme(){return this.defaultScheme==="dark"||this.defaultScheme==="system"&&window.matchMedia?.("(prefers-color-scheme: dark)").matches?"dark":"light"}syncSystemSchemeListener(){if(this.schemeExplicitlySet||this.defaultScheme!=="system"||!window.matchMedia){this.systemSchemeQuery?.removeEventListener("change",this.handleSystemSchemeChange),this.systemSchemeQuery=null;return}this.systemSchemeQuery||(this.systemSchemeQuery=window.matchMedia("(prefers-color-scheme: dark)"),this.systemSchemeQuery.addEventListener("change",this.handleSystemSchemeChange))}render(){return w`<slot></slot>`}};o.connectedRootCount=0,o.handleDocumentClick=c=>{const e=c.composedPath().filter(t=>t instanceof HTMLElement&&t.tagName==="ESP-POPOVER");p().publish("close-popovers",{source:c.target??void 0,skipPopovers:e})},o.lightDomStyles=`
    
    esp-root {
      font-family: var(--esp-font-body);
      font-weight: var(--esp-font-weight-body);
      line-height: 1.5;
      font-size: var(--esp-type-normal);
      color: var(--esp-color-text);
    }

    
    esp-root ul[role="list"],
    esp-root ol[role="list"] {
      list-style: none;
    }

    esp-root ul li::marker,
    esp-root ol li::marker {
      font-weight: bold;
    }

    
    esp-root input,
    esp-root select,
    esp-root button {
      font-family: var(--esp-font-body);
    }

    
    esp-root a:not([class]) {
      text-decoration-skip-ink: auto;
      font-weight: bold;
      color: var(--esp-color-link);
    }

    esp-root a {
      text-decoration: underline;
      text-decoration-skip-ink: auto;
      color: var(--esp-color-link);
    }

    esp-root a:hover {
      background-color: var(--esp-color-link-hover-bg);
      color: var(--esp-color-link-hover);
      text-decoration: none;
    }

    
    esp-root input,
    esp-root button,
    esp-root textarea,
    esp-root select,
    esp-root p,
    esp-root ul,
    esp-root li {
      font-family: var(--esp-font-body);
      color: var(--esp-color-text);
      font-size: inherit;
    }

    esp-root textarea:not([rows]) {
      min-height: 10em;
    }

    
    esp-root h1,
    esp-root h2,
    esp-root h3,
    esp-root h4,
    esp-root h5 {
      font-family: var(--esp-font-headings);
      font-weight: var(--esp-font-weight-headings);
      color: var(--esp-color-headings);
      margin: var(--esp-size-small-to-normal) 0 var(--esp-size-tiny-to-small);
    }

    esp-root h5 { font-size: var(--esp-type-small); line-height: 1.4; }
    esp-root h4 { font-size: var(--esp-type-medium); line-height: 1.3; }
    esp-root h3 { font-size: var(--esp-type-big); line-height: 1.2; }
    esp-root h2 { font-size: var(--esp-type-large); line-height: 1.15; }
    esp-root h1 { font-size: var(--esp-type-huge); line-height: 1.1; }

    
    esp-root pre,
    esp-root code {
      font-family: var(--esp-font-monospace);
      font-weight: var(--esp-font-weight-monospace);
    }

    esp-root code {
      font-size: var(--esp-type-small);
      background: var(--esp-color-layer-1);
      border-radius: var(--esp-size-border-radius);
      padding: 0 0.35em;
      display: inline-block;
      border: 1px dotted var(--esp-color-border);
    }

    esp-root pre {
      background-color: var(--esp-color-layer-1);
      border-radius: var(--esp-size-border-radius);
      border: 1px dotted var(--esp-color-border);
    }

    esp-root pre > code {
      font-size: var(--esp-type-tiny);
      display: block;
      background: none;
      border: none;
      hyphens: none;
      tab-size: 2;
      white-space: pre;
      padding: var(--esp-size-padding);
      overflow: auto;
      line-height: 1.8;
    }

    
    esp-root img,
    esp-root picture {
      max-width: 100%;
      display: block;
    }
  `,o.styles=b`
    :host {
      display: block;
    }

    
    :host([theme-pending]:not([data-theme-ready])) {
      visibility: hidden;
    }
  `,h([m({attribute:!1})],o.prototype,"correlationId",void 0),h([m({attribute:"light-theme"})],o.prototype,"lightThemeAttr",void 0),h([m({attribute:"dark-theme"})],o.prototype,"darkThemeAttr",void 0),h([m({attribute:!1})],o.prototype,"lightTheme",null),h([m({attribute:!1})],o.prototype,"darkTheme",null),h([m({attribute:"font-css-root",type:String})],o.prototype,"fontCSSRoot",void 0),h([m({attribute:"font-definitions-url",type:String})],o.prototype,"fontDefinitionsUrl",void 0),h([m({attribute:"google-font-loading",type:String})],o.prototype,"googleFontLoading",void 0),h([m({attribute:"icon-sprite-url",type:String})],o.prototype,"iconSpriteUrl",void 0),h([m({attribute:"theme-pending",reflect:!0,type:Boolean})],o.prototype,"themePending",void 0),h([R()],o.prototype,"themeReadyState",void 0),h([m({attribute:"default-scheme",type:String,reflect:!0})],o.prototype,"defaultScheme",void 0),h([m({attribute:"scheme",type:String,reflect:!0})],o.prototype,"scheme",null),o=a=h([C("esp-root")],o);export{H as BUILT_IN_IMAGE_TEXTURES,o as EspalierRoot,O as registerImageTexture,j as registeredImageTextures};
