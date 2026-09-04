var r=function(c,e,t,s){var n=arguments.length,i=n<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,t):s,m;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(c,e,t,s);else for(var l=c.length-1;l>=0;l--)(m=c[l])&&(i=(n<3?m(i):n>3?m(e,t,i):m(e,t))||i);return n>3&&i&&Object.defineProperty(e,t,i),i},a;import{css as b,html as w,LitElement as E}from"lit";import{customElement as C,property as h,state as R}from"lit/decorators.js";import{getEspBus as d}from"../shared/bus-events.js";import{subscribeToRootEvent as x}from"../shared/root-event-subscription.js";import{DEFAULT_LIGHT_THEME as f,DEFAULT_DARK_THEME as g,encodeTheme as y,parseTheme as u,mergeTheme as v}from"../shared/theme.js";import{extractFamily as p,isLocalFontFamily as L,removeRuntimeGoogleFontLinks as S,syncRuntimeGoogleFontLink as A}from"../shared/font-helpers.js";import{computeThemeProperties as D}from"./helpers/compute-theme-properties.js";import{registerImageTexture as I,registeredImageTextures as F}from"../shared/image-texture-registry.js";import{registerImageTexture as $,registeredImageTextures as Q,BUILT_IN_IMAGE_TEXTURES as q}from"../shared/image-texture-registry.js";const T=1e3;let o=a=class extends E{constructor(){super(...arguments),this.schemeBacker="",this.schemeExplicitlySet=!1,this.resolvingDefaultScheme=!1,this.themeEventsReady=!1,this.systemSchemeQuery=null,this.lastSeedColor="",this.resolvedLightTheme={...f},this.resolvedDarkTheme={...g},this.appliedThemeProperties=new Set,this.documentClickRegistrationActive=!1,this.correlationId=globalThis.crypto?.randomUUID?.()??Math.random().toString(36),this.lightThemeAttr="",this.darkThemeAttr="",this.fontCSSRoot="/css/fonts/",this.fontDefinitionsUrl="",this.googleFontLoading="auto",this.iconSpriteUrl="/assets/icons.svg",this.themePending=!1,this.themeReadyState=!1,this.themeSettleWaiters=[],this.warnedThemeSettleTimeout=!1,this.defaultScheme="light",this.resizeObserver=new ResizeObserver(()=>{d().publish("window-resized",{emWidth:window.innerWidth/parseFloat(getComputedStyle(document.documentElement).fontSize),emHeight:window.innerHeight/parseFloat(getComputedStyle(document.documentElement).fontSize),pxWidth:window.innerWidth,pxHeight:window.innerHeight})}),this.handleSystemSchemeChange=e=>{this.schemeExplicitlySet||this.defaultScheme!=="system"||(this.resolvingDefaultScheme=!0,this.scheme=e.matches?"dark":"light",this.resolvingDefaultScheme=!1)}}static registerTexture(e,t){I(e,t)}static registeredTextures(){return F()}subscribeScoped(e,t){return x(this,e,t)}get lightTheme(){return this.lightThemeAttr?u(this.lightThemeAttr):null}set lightTheme(e){this.lightThemeAttr=e?y(e):""}get darkTheme(){return this.darkThemeAttr?u(this.darkThemeAttr):null}set darkTheme(e){this.darkThemeAttr=e?y(e):""}get themeSettled(){return this.themeReadyState}whenThemeSettled(){return this.themeReadyState?Promise.resolve():new Promise(e=>{this.themeSettleWaiters.push(e)})}get hasAuthorTheme(){return!!(this.scheme==="dark"?this.darkThemeAttr:this.lightThemeAttr)}settleTheme(){if(this.themeSettleTimer!==void 0&&(clearTimeout(this.themeSettleTimer),this.themeSettleTimer=void 0),this.themeReadyState)return;this.themeReadyState=!0;const e=this.themeSettleWaiters;this.themeSettleWaiters=[];for(const t of e)t()}get scheme(){return this.schemeBacker}set scheme(e){const t=e==="dark"?"dark":e==="light"?"light":"",s=this.schemeBacker,n=this.schemeExplicitlySet;this.resolvingDefaultScheme||(this.schemeExplicitlySet=t.length>0);const i=t||this.resolveDefaultScheme();n!==this.schemeExplicitlySet&&this.isConnected&&this.syncSystemSchemeListener(),i!==s&&(this.schemeBacker=i,this.requestUpdate("scheme",s),this.themeEventsReady&&d().publish("scheme-changed",{scheme:i,correlationId:this.correlationId}))}get seedColor(){return this.activeTheme.seedColor}injectGoogleFontLink(e,t,s){const n=`${this.correlationId}-${e}`,i=L(t)?"":t;A({owner:`root:${n}`,family:i,weight:s,enabled:this.googleFontLoading!=="none",attributes:{"data-esp-font":n}})}syncGoogleFontLinks(){this.googleFontLoading==="none"&&this.removeRuntimeGoogleFontLinks();const e=this.activeTheme;this.injectGoogleFontLink("body",p(e.fontBody),e.fontWeightBody),this.injectGoogleFontLink("headings",p(e.fontHeadings),e.fontWeightHeadings),this.injectGoogleFontLink("brand",p(e.fontBrand),e.fontWeightBrand),this.injectGoogleFontLink("menu",p(e.fontMenu),e.fontWeightMenu),this.injectGoogleFontLink("monospace",p(e.fontMonospace),e.fontWeightMonospace)}removeRuntimeGoogleFontLinks(){S(`root:${this.correlationId}-`),S(`picker:${this.correlationId}:`);for(const e of document.head.querySelectorAll(`link[data-esp-font^="${this.correlationId}-"]`))e.remove();for(const e of document.head.querySelectorAll(`link[data-esp-font-picker-root="${CSS.escape(this.correlationId)}"]`))e.remove()}get activeTheme(){return this.scheme==="dark"?this.resolvedDarkTheme:this.resolvedLightTheme}resolveThemes(){const e=this.lightThemeAttr?u(this.lightThemeAttr):null;this.resolvedLightTheme=e?v(f,e):{...f};const t=this.darkThemeAttr?u(this.darkThemeAttr):null;this.resolvedDarkTheme=t?v(g,t):{...g}}connectedCallback(){super.connectedCallback(),this.registerDocumentClickBridge(),this.resizeObserver.observe(this),this.hasUpdated&&(this.applyDefaultScheme(),this.syncGoogleFontLinks(),this.hasAuthorTheme||this.startThemeSettleTimer())}willUpdate(e){const t=["lightThemeAttr","darkThemeAttr"];(!this.lastSeedColor||t.some(l=>e.has(l)))&&(this.resolveThemes(),this.themeEventsReady&&d().publish("theme-changed",{correlationId:this.correlationId})),this.hasAuthorTheme&&this.settleTheme();const n=D(this.activeTheme,this.scheme==="dark"?"dark":"light"),i=new Set(Object.keys(n));for(const l of this.appliedThemeProperties)i.has(l)||this.style.removeProperty(l);for(const[l,k]of Object.entries(n))this.style.setProperty(l,k);this.appliedThemeProperties=i;const m=this.activeTheme.seedColor;this.themeEventsReady&&this.lastSeedColor&&this.lastSeedColor!==m&&d().publish("seed-color-changed",{seedColor:m,correlationId:this.correlationId}),this.lastSeedColor=m,this.themeEventsReady&&e.has("iconSpriteUrl")&&d().publish("icon-sprite-url-changed",{iconSpriteUrl:this.iconSpriteUrl,correlationId:this.correlationId}),this.syncGoogleFontLinks()}firstUpdated(){const e=this.activeTheme.stylesheets;if(e.length)for(const t of e){const s=document.createElement("link");s.rel="stylesheet",s.href=t,document.head.appendChild(s)}if(!document.getElementById("esp-root-base-styles")){const t=document.createElement("style");t.id="esp-root-base-styles",t.textContent=a.lightDomStyles,document.head.appendChild(t)}this.applyDefaultScheme(),this.lastSeedColor=this.activeTheme.seedColor,this.themeEventsReady=!0,this.startThemeSettleTimer()}startThemeSettleTimer(){if(this.themeReadyState||this.themeSettleTimer!==void 0)return;this.themeSettleDeadline??=performance.now()+T;const e=Math.max(0,this.themeSettleDeadline-performance.now());if(e===0){this.closeThemeWindow();return}this.themeSettleTimer=setTimeout(()=>this.closeThemeWindow(),e)}closeThemeWindow(){this.themeSettleTimer=void 0,this.themePending&&!this.warnedThemeSettleTimeout&&(this.warnedThemeSettleTimeout=!0,console.warn(`Espalier root: theme-pending was declared but no ${this.scheme} theme arrived within ${T}ms, so the default palette is rendering. Assign ${this.scheme==="dark"?"darkTheme":"lightTheme"} (or remove theme-pending).`)),this.settleTheme()}updated(e){this.toggleAttribute("data-theme-ready",this.themeReadyState),(e.has("defaultScheme")||e.has("scheme"))&&!this.schemeExplicitlySet&&this.applyDefaultScheme()}disconnectedCallback(){this.themeSettleTimer!==void 0&&(clearTimeout(this.themeSettleTimer),this.themeSettleTimer=void 0),this.unregisterDocumentClickBridge(),this.systemSchemeQuery?.removeEventListener("change",this.handleSystemSchemeChange),this.systemSchemeQuery=null,this.resizeObserver.disconnect(),this.removeRuntimeGoogleFontLinks(),super.disconnectedCallback()}registerDocumentClickBridge(){this.documentClickRegistrationActive||(this.documentClickRegistrationActive=!0,a.connectedRootCount+=1,a.connectedRootCount===1&&document.addEventListener("click",a.handleDocumentClick))}unregisterDocumentClickBridge(){this.documentClickRegistrationActive&&(this.documentClickRegistrationActive=!1,a.connectedRootCount=Math.max(0,a.connectedRootCount-1),a.connectedRootCount===0&&document.removeEventListener("click",a.handleDocumentClick))}applyDefaultScheme(){this.schemeExplicitlySet||(this.resolvingDefaultScheme=!0,this.scheme=this.resolveDefaultScheme(),this.resolvingDefaultScheme=!1,this.syncSystemSchemeListener())}resolveDefaultScheme(){return this.defaultScheme==="dark"||this.defaultScheme==="system"&&window.matchMedia?.("(prefers-color-scheme: dark)").matches?"dark":"light"}syncSystemSchemeListener(){if(this.schemeExplicitlySet||this.defaultScheme!=="system"||!window.matchMedia){this.systemSchemeQuery?.removeEventListener("change",this.handleSystemSchemeChange),this.systemSchemeQuery=null;return}this.systemSchemeQuery||(this.systemSchemeQuery=window.matchMedia("(prefers-color-scheme: dark)"),this.systemSchemeQuery.addEventListener("change",this.handleSystemSchemeChange))}render(){return w`<slot></slot>`}};o.connectedRootCount=0,o.handleDocumentClick=c=>{const e=c.composedPath().filter(t=>t instanceof HTMLElement&&t.tagName==="ESP-POPOVER");d().publish("close-popovers",{source:c.target??void 0,skipPopovers:e})},o.lightDomStyles=`
    
    esp-root {
      font-family: var(--_esp-font-body-effective, var(--esp-font-body, system-ui, sans-serif));
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
      font-family: var(--_esp-font-body-effective, var(--esp-font-body, system-ui, sans-serif));
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
      font-family: var(--_esp-font-body-effective, var(--esp-font-body, system-ui, sans-serif));
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
      font-family: var(
        --_esp-font-headings-effective,
        var(
          --esp-font-headings,
          var(--_esp-font-body-effective, var(--esp-font-body, system-ui, sans-serif))
        )
      );
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
      font-family: var(--_esp-font-monospace-effective, var(--esp-font-monospace, monospace));
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
  `,r([h({attribute:!1})],o.prototype,"correlationId",void 0),r([h({attribute:"light-theme"})],o.prototype,"lightThemeAttr",void 0),r([h({attribute:"dark-theme"})],o.prototype,"darkThemeAttr",void 0),r([h({attribute:!1})],o.prototype,"lightTheme",null),r([h({attribute:!1})],o.prototype,"darkTheme",null),r([h({attribute:"font-css-root",type:String})],o.prototype,"fontCSSRoot",void 0),r([h({attribute:"font-definitions-url",type:String})],o.prototype,"fontDefinitionsUrl",void 0),r([h({attribute:"google-font-loading",type:String})],o.prototype,"googleFontLoading",void 0),r([h({attribute:"icon-sprite-url",type:String})],o.prototype,"iconSpriteUrl",void 0),r([h({attribute:"theme-pending",reflect:!0,type:Boolean})],o.prototype,"themePending",void 0),r([R()],o.prototype,"themeReadyState",void 0),r([h({attribute:"default-scheme",type:String,reflect:!0})],o.prototype,"defaultScheme",void 0),r([h({attribute:"scheme",type:String,reflect:!0})],o.prototype,"scheme",null),o=a=r([C("esp-root")],o);export{q as BUILT_IN_IMAGE_TEXTURES,o as EspalierRoot,$ as registerImageTexture,Q as registeredImageTextures};
