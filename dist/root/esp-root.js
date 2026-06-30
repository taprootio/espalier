var h=function(m,e,t,o){var n=arguments.length,s=n<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,t):o,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(m,e,t,o);else for(var a=m.length-1;a>=0;a--)(r=m[a])&&(s=(n<3?r(s):n>3?r(e,t,s):r(e,t))||s);return n>3&&s&&Object.defineProperty(e,t,s),s},c;import{css as k,html as b,LitElement as T}from"lit";import{customElement as w,property as l}from"lit/decorators.js";import{getEspBus as p}from"../shared/bus-events.js";import{DEFAULT_LIGHT_THEME as f,DEFAULT_DARK_THEME as g,parseTheme as y,mergeTheme as v}from"../shared/theme.js";import{computeThemeProperties as E}from"./helpers/compute-theme-properties.js";let i=c=class extends T{constructor(){super(...arguments),this.schemeBacker="",this.schemeExplicitlySet=!1,this.resolvingDefaultScheme=!1,this.systemSchemeQuery=null,this.lastSeedColor="",this.resolvedLightTheme={...f},this.resolvedDarkTheme={...g},this.correlationId=globalThis.crypto?.randomUUID?.()??Math.random().toString(36),this.lightThemeAttr="",this.darkThemeAttr="",this.fontCSSRoot="/css/fonts/",this.fontDefinitionsUrl="",this.googleFontLoading="auto",this.iconSpriteUrl="/assets/icons.svg",this.defaultScheme="light",this.resizeObserver=new ResizeObserver(()=>{p().publish("window-resized",{emWidth:window.innerWidth/parseFloat(getComputedStyle(document.documentElement).fontSize),emHeight:window.innerHeight/parseFloat(getComputedStyle(document.documentElement).fontSize),pxWidth:window.innerWidth,pxHeight:window.innerHeight})}),this.handleSystemSchemeChange=e=>{this.schemeExplicitlySet||this.defaultScheme!=="system"||(this.resolvingDefaultScheme=!0,this.scheme=e.matches?"dark":"light",this.resolvingDefaultScheme=!1)}}get scheme(){return this.schemeBacker}set scheme(e){const t=e==="dark"?"dark":e==="light"?"light":"",o=this.schemeBacker;this.resolvingDefaultScheme||(this.schemeExplicitlySet=t.length>0),t!==o&&(this.schemeBacker=t,this.requestUpdate("scheme",o),t&&p().publish("scheme-changed",{scheme:t,correlationId:this.correlationId}))}get seedColor(){return this.activeTheme.seedColor}static extractFamily(e){if(!e)return"";const t=e.match(/^"([^"]+)"|^'([^']+)'/);return t&&(t[1]||t[2])||""}injectGoogleFontLink(e,t,o){const n="data-esp-font",s=`${this.correlationId}-${e}`,r=document.head.querySelector(`link[${n}="${s}"]`);if(this.googleFontLoading==="none"){r?.remove();return}if(r&&t&&r.dataset.espFamily===t&&r.dataset.espWeight===(o??"")||(r?.remove(),!t))return;const a=encodeURIComponent(t),u=o==="bold"?"700":o==="normal"?"400":o,S=u&&u!=="400"?`:wght@${u}`:"",d=document.createElement("link");d.rel="stylesheet",d.href=`https://fonts.googleapis.com/css2?family=${a}${S}&display=swap`,d.setAttribute(n,s),d.dataset.espFamily=t,d.dataset.espWeight=o??"",document.head.appendChild(d)}syncGoogleFontLinks(){this.googleFontLoading==="none"&&this.removeRuntimeGoogleFontLinks();const e=this.activeTheme;this.injectGoogleFontLink("body",c.extractFamily(e.fontBody),e.fontWeightBody),this.injectGoogleFontLink("headings",c.extractFamily(e.fontHeadings),e.fontWeightHeadings),this.injectGoogleFontLink("brand",c.extractFamily(e.fontBrand),e.fontWeightBrand),this.injectGoogleFontLink("monospace",c.extractFamily(e.fontMonospace),e.fontWeightMonospace)}removeRuntimeGoogleFontLinks(){for(const e of document.head.querySelectorAll(`link[data-esp-font^="${this.correlationId}-"]`))e.remove();for(const e of document.head.querySelectorAll(`link[data-esp-font-picker-root="${CSS.escape(this.correlationId)}"]`))e.remove()}get activeTheme(){return this.scheme==="dark"?this.resolvedDarkTheme:this.resolvedLightTheme}resolveThemes(){const e=this.lightThemeAttr?y(this.lightThemeAttr):null;this.resolvedLightTheme=e?v(f,e):{...f};const t=this.darkThemeAttr?y(this.darkThemeAttr):null;this.resolvedDarkTheme=t?v(g,t):{...g}}willUpdate(e){const t=["lightThemeAttr","darkThemeAttr"];(!this.lastSeedColor||t.some(r=>e.has(r)))&&(this.resolveThemes(),p().publish("theme-changed",{correlationId:this.correlationId}));const n=E(this.activeTheme,this.scheme==="dark"?"dark":"light");for(const[r,a]of Object.entries(n))this.style.setProperty(r,a);const s=this.activeTheme.seedColor;this.lastSeedColor&&this.lastSeedColor!==s&&p().publish("seed-color-changed",{seedColor:s,correlationId:this.correlationId}),this.lastSeedColor=s,e.has("iconSpriteUrl")&&p().publish("icon-sprite-url-changed",{iconSpriteUrl:this.iconSpriteUrl,correlationId:this.correlationId}),this.syncGoogleFontLinks()}firstUpdated(){document.addEventListener("click",t=>{const o=t.composedPath().filter(n=>n instanceof HTMLElement&&n.tagName==="ESP-POPOVER");p().publish("close-popovers",{source:t.target??void 0,skipPopovers:o})}),this.resizeObserver.observe(this);const e=this.activeTheme.stylesheets;if(e.length)for(const t of e){const o=document.createElement("link");o.rel="stylesheet",o.href=t,document.head.appendChild(o)}if(!document.getElementById("esp-root-base-styles")){const t=document.createElement("style");t.id="esp-root-base-styles",t.textContent=c.lightDomStyles,document.head.appendChild(t)}this.applyDefaultScheme()}updated(e){(e.has("defaultScheme")||e.has("scheme"))&&!this.schemeExplicitlySet&&this.applyDefaultScheme()}disconnectedCallback(){this.systemSchemeQuery?.removeEventListener("change",this.handleSystemSchemeChange),this.systemSchemeQuery=null,this.resizeObserver.disconnect(),super.disconnectedCallback()}applyDefaultScheme(){this.schemeExplicitlySet||(this.resolvingDefaultScheme=!0,this.scheme=this.resolveDefaultScheme(),this.resolvingDefaultScheme=!1,this.syncSystemSchemeListener())}resolveDefaultScheme(){return this.defaultScheme==="dark"||this.defaultScheme==="system"&&window.matchMedia?.("(prefers-color-scheme: dark)").matches?"dark":"light"}syncSystemSchemeListener(){if(this.defaultScheme!=="system"||!window.matchMedia){this.systemSchemeQuery?.removeEventListener("change",this.handleSystemSchemeChange),this.systemSchemeQuery=null;return}this.systemSchemeQuery||(this.systemSchemeQuery=window.matchMedia("(prefers-color-scheme: dark)"),this.systemSchemeQuery.addEventListener("change",this.handleSystemSchemeChange))}render(){return b`<slot></slot>`}};i.lightDomStyles=`
    
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
  `,h([l({attribute:!1})],i.prototype,"correlationId",void 0),h([l({attribute:"light-theme"})],i.prototype,"lightThemeAttr",void 0),h([l({attribute:"dark-theme"})],i.prototype,"darkThemeAttr",void 0),h([l({attribute:"font-css-root",type:String})],i.prototype,"fontCSSRoot",void 0),h([l({attribute:"font-definitions-url",type:String})],i.prototype,"fontDefinitionsUrl",void 0),h([l({attribute:"google-font-loading",type:String})],i.prototype,"googleFontLoading",void 0),h([l({attribute:"icon-sprite-url",type:String})],i.prototype,"iconSpriteUrl",void 0),h([l({attribute:"default-scheme",type:String,reflect:!0})],i.prototype,"defaultScheme",void 0),h([l({attribute:"scheme",type:String,reflect:!0})],i.prototype,"scheme",null),i=c=h([w("esp-root")],i);export{i as EspalierRoot};
