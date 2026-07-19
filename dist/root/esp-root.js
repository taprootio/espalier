var l=function(c,e,t,s){var h=arguments.length,o=h<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,t):s,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(c,e,t,s);else for(var d=c.length-1;d>=0;d--)(r=c[d])&&(o=(h<3?r(o):h>3?r(e,t,o):r(e,t))||o);return h>3&&o&&Object.defineProperty(e,t,o),o},n;import{css as k,html as b,LitElement as C}from"lit";import{customElement as E,property as a}from"lit/decorators.js";import{getEspBus as p}from"../shared/bus-events.js";import{subscribeToRootEvent as T}from"../shared/root-event-subscription.js";import{DEFAULT_LIGHT_THEME as f,DEFAULT_DARK_THEME as g,parseTheme as y,mergeTheme as v}from"../shared/theme.js";import{computeThemeProperties as x}from"./helpers/compute-theme-properties.js";let i=n=class extends C{constructor(){super(...arguments),this.schemeBacker="",this.schemeExplicitlySet=!1,this.resolvingDefaultScheme=!1,this.themeEventsReady=!1,this.systemSchemeQuery=null,this.lastSeedColor="",this.resolvedLightTheme={...f},this.resolvedDarkTheme={...g},this.documentClickRegistrationActive=!1,this.correlationId=globalThis.crypto?.randomUUID?.()??Math.random().toString(36),this.lightThemeAttr="",this.darkThemeAttr="",this.fontCSSRoot="/css/fonts/",this.fontDefinitionsUrl="",this.googleFontLoading="auto",this.iconSpriteUrl="/assets/icons.svg",this.defaultScheme="light",this.resizeObserver=new ResizeObserver(()=>{p().publish("window-resized",{emWidth:window.innerWidth/parseFloat(getComputedStyle(document.documentElement).fontSize),emHeight:window.innerHeight/parseFloat(getComputedStyle(document.documentElement).fontSize),pxWidth:window.innerWidth,pxHeight:window.innerHeight})}),this.handleSystemSchemeChange=e=>{this.schemeExplicitlySet||this.defaultScheme!=="system"||(this.resolvingDefaultScheme=!0,this.scheme=e.matches?"dark":"light",this.resolvingDefaultScheme=!1)}}subscribeScoped(e,t){return T(this,e,t)}get scheme(){return this.schemeBacker}set scheme(e){const t=e==="dark"?"dark":e==="light"?"light":"",s=this.schemeBacker,h=this.schemeExplicitlySet;this.resolvingDefaultScheme||(this.schemeExplicitlySet=t.length>0);const o=t||this.resolveDefaultScheme();h!==this.schemeExplicitlySet&&this.isConnected&&this.syncSystemSchemeListener(),o!==s&&(this.schemeBacker=o,this.requestUpdate("scheme",s),this.themeEventsReady&&p().publish("scheme-changed",{scheme:o,correlationId:this.correlationId}))}get seedColor(){return this.activeTheme.seedColor}static extractFamily(e){if(!e)return"";const t=e.match(/^"([^"]+)"|^'([^']+)'/);return t&&(t[1]||t[2])||""}injectGoogleFontLink(e,t,s){const h="data-esp-font",o=`${this.correlationId}-${e}`,r=document.head.querySelector(`link[${h}="${o}"]`);if(this.googleFontLoading==="none"){r?.remove();return}if(r&&t&&r.dataset.espFamily===t&&r.dataset.espWeight===(s??"")||(r?.remove(),!t))return;const d=encodeURIComponent(t),u=s==="bold"?"700":s==="normal"?"400":s,S=u&&u!=="400"?`:wght@${u}`:"",m=document.createElement("link");m.rel="stylesheet",m.href=`https://fonts.googleapis.com/css2?family=${d}${S}&display=swap`,m.setAttribute(h,o),m.dataset.espFamily=t,m.dataset.espWeight=s??"",document.head.appendChild(m)}syncGoogleFontLinks(){this.googleFontLoading==="none"&&this.removeRuntimeGoogleFontLinks();const e=this.activeTheme;this.injectGoogleFontLink("body",n.extractFamily(e.fontBody),e.fontWeightBody),this.injectGoogleFontLink("headings",n.extractFamily(e.fontHeadings),e.fontWeightHeadings),this.injectGoogleFontLink("brand",n.extractFamily(e.fontBrand),e.fontWeightBrand),this.injectGoogleFontLink("monospace",n.extractFamily(e.fontMonospace),e.fontWeightMonospace)}removeRuntimeGoogleFontLinks(){for(const e of document.head.querySelectorAll(`link[data-esp-font^="${this.correlationId}-"]`))e.remove();for(const e of document.head.querySelectorAll(`link[data-esp-font-picker-root="${CSS.escape(this.correlationId)}"]`))e.remove()}get activeTheme(){return this.scheme==="dark"?this.resolvedDarkTheme:this.resolvedLightTheme}resolveThemes(){const e=this.lightThemeAttr?y(this.lightThemeAttr):null;this.resolvedLightTheme=e?v(f,e):{...f};const t=this.darkThemeAttr?y(this.darkThemeAttr):null;this.resolvedDarkTheme=t?v(g,t):{...g}}connectedCallback(){super.connectedCallback(),this.registerDocumentClickBridge(),this.resizeObserver.observe(this),this.hasUpdated&&(this.applyDefaultScheme(),this.syncGoogleFontLinks())}willUpdate(e){const t=["lightThemeAttr","darkThemeAttr"];(!this.lastSeedColor||t.some(r=>e.has(r)))&&(this.resolveThemes(),this.themeEventsReady&&p().publish("theme-changed",{correlationId:this.correlationId}));const h=x(this.activeTheme,this.scheme==="dark"?"dark":"light");for(const[r,d]of Object.entries(h))this.style.setProperty(r,d);const o=this.activeTheme.seedColor;this.themeEventsReady&&this.lastSeedColor&&this.lastSeedColor!==o&&p().publish("seed-color-changed",{seedColor:o,correlationId:this.correlationId}),this.lastSeedColor=o,this.themeEventsReady&&e.has("iconSpriteUrl")&&p().publish("icon-sprite-url-changed",{iconSpriteUrl:this.iconSpriteUrl,correlationId:this.correlationId}),this.syncGoogleFontLinks()}firstUpdated(){const e=this.activeTheme.stylesheets;if(e.length)for(const t of e){const s=document.createElement("link");s.rel="stylesheet",s.href=t,document.head.appendChild(s)}if(!document.getElementById("esp-root-base-styles")){const t=document.createElement("style");t.id="esp-root-base-styles",t.textContent=n.lightDomStyles,document.head.appendChild(t)}this.applyDefaultScheme(),this.lastSeedColor=this.activeTheme.seedColor,this.themeEventsReady=!0}updated(e){(e.has("defaultScheme")||e.has("scheme"))&&!this.schemeExplicitlySet&&this.applyDefaultScheme()}disconnectedCallback(){this.unregisterDocumentClickBridge(),this.systemSchemeQuery?.removeEventListener("change",this.handleSystemSchemeChange),this.systemSchemeQuery=null,this.resizeObserver.disconnect(),this.removeRuntimeGoogleFontLinks(),super.disconnectedCallback()}registerDocumentClickBridge(){this.documentClickRegistrationActive||(this.documentClickRegistrationActive=!0,n.connectedRootCount+=1,n.connectedRootCount===1&&document.addEventListener("click",n.handleDocumentClick))}unregisterDocumentClickBridge(){this.documentClickRegistrationActive&&(this.documentClickRegistrationActive=!1,n.connectedRootCount=Math.max(0,n.connectedRootCount-1),n.connectedRootCount===0&&document.removeEventListener("click",n.handleDocumentClick))}applyDefaultScheme(){this.schemeExplicitlySet||(this.resolvingDefaultScheme=!0,this.scheme=this.resolveDefaultScheme(),this.resolvingDefaultScheme=!1,this.syncSystemSchemeListener())}resolveDefaultScheme(){return this.defaultScheme==="dark"||this.defaultScheme==="system"&&window.matchMedia?.("(prefers-color-scheme: dark)").matches?"dark":"light"}syncSystemSchemeListener(){if(this.schemeExplicitlySet||this.defaultScheme!=="system"||!window.matchMedia){this.systemSchemeQuery?.removeEventListener("change",this.handleSystemSchemeChange),this.systemSchemeQuery=null;return}this.systemSchemeQuery||(this.systemSchemeQuery=window.matchMedia("(prefers-color-scheme: dark)"),this.systemSchemeQuery.addEventListener("change",this.handleSystemSchemeChange))}render(){return b`<slot></slot>`}};i.connectedRootCount=0,i.handleDocumentClick=c=>{const e=c.composedPath().filter(t=>t instanceof HTMLElement&&t.tagName==="ESP-POPOVER");p().publish("close-popovers",{source:c.target??void 0,skipPopovers:e})},i.lightDomStyles=`
    
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
  `,i.styles=k`
    :host {
      display: block;
    }
  `,l([a({attribute:!1})],i.prototype,"correlationId",void 0),l([a({attribute:"light-theme"})],i.prototype,"lightThemeAttr",void 0),l([a({attribute:"dark-theme"})],i.prototype,"darkThemeAttr",void 0),l([a({attribute:"font-css-root",type:String})],i.prototype,"fontCSSRoot",void 0),l([a({attribute:"font-definitions-url",type:String})],i.prototype,"fontDefinitionsUrl",void 0),l([a({attribute:"google-font-loading",type:String})],i.prototype,"googleFontLoading",void 0),l([a({attribute:"icon-sprite-url",type:String})],i.prototype,"iconSpriteUrl",void 0),l([a({attribute:"default-scheme",type:String,reflect:!0})],i.prototype,"defaultScheme",void 0),l([a({attribute:"scheme",type:String,reflect:!0})],i.prototype,"scheme",null),i=n=l([E("esp-root")],i);export{i as EspalierRoot};
