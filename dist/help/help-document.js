import"../button/esp-button.js";import{FLYOUT_FULL_HEIGHT_REQUEST_EVENT as N}from"../shared/flyout-events.js";import{decodeFragment as T}from"../shared/help-events.js";const D=new Set(["A","ABBR","B","BLOCKQUOTE","BR","CODE","DD","DEL","DETAILS","DL","DT","EM","FIGCAPTION","FIGURE","H1","H2","H3","H4","H5","H6","HR","I","IMG","KBD","LI","MARK","OL","P","PRE","Q","S","SAMP","SMALL","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TFOOT","TH","THEAD","TR","U","UL","VAR"]),C=new Set(["SCRIPT","STYLE","TEMPLATE","NOSCRIPT","TITLE"]),H={A:["href"],DETAILS:["open"],IMG:["src","alt","width","height"],LI:["value"],OL:["start","reversed"],TD:["colspan","rowspan"],TH:["colspan","rowspan","scope"]},g=`
  :host {
    color: var(--esp-color-text);
    display: block;
    font-family: var(--_esp-font-body-effective, var(--esp-font-body, system-ui, sans-serif));
    font-size: var(--esp-size-font);
    line-height: 1.5;
  }

  [part="content"] {
    overflow-wrap: anywhere;
  }

  [part="content"] > :first-child {
    margin-block-start: 0;
  }

  [part="content"] > :last-child {
    margin-block-end: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--esp-color-headings, var(--esp-color-text));
    font-family: var(--_esp-font-headings-effective, var(--esp-font-headings, var(--_esp-font-body-effective, var(--esp-font-body, system-ui, sans-serif))));
    line-height: 1.2;
  }

  img {
    block-size: auto;
    max-inline-size: 100%;
  }

  pre {
    max-inline-size: 100%;
    overflow: auto;
  }

  table {
    border-collapse: collapse;
    inline-size: 100%;
  }

  th, td {
    border: 1px solid var(--esp-color-border);
    padding: var(--esp-size-tiny-to-small);
    text-align: start;
  }

  [part="actions"] {
    margin-block-start: var(--esp-size-padding);
  }
`;function B(e,t={}){const n=t.helpUrl?.trim()??"",o=n?"":R(e),r=n||o;if(!r)return null;let c;try{c=new URL(r,e.ownerDocument.baseURI)}catch{return null}const i=T(c.hash);c.hash="";const a=m(t.anchor,t.fallbackAnchor),s=n?m(i,a):m(a,i),d=new URL(c.href);return s&&(d.hash=s),{src:c.href,...s?{anchor:s}:{},href:d.href}}function M(e,t){const n=new URL(t,document.baseURI);n.hash="";const o=new DOMParser().parseFromString(e,"text/html"),r=o.querySelector("title")?.textContent?.trim()||void 0,c=document.createDocumentFragment();for(const i of[...o.body.childNodes])b(i,c,n.href);return{src:n.href,...r?{title:r}:{},body:c}}function x(e,t){const n=t?.trim()??"";if(!n)return{content:e.body.cloneNode(!0),anchorFound:!0,sectioned:!1};const o=A(e.body,n);if(!o)return{content:e.body.cloneNode(!0),anchorFound:!1,sectioned:!1};const r=S(o);if(!r||!o.parentNode)return{content:e.body.cloneNode(!0),anchorFound:!0,sectioned:!1};const c=document.createDocumentFragment();let i=o.nextSibling;for(;i;){if(i instanceof Element){const a=S(i);if(a&&a<=r)break}c.append(i.cloneNode(!0)),i=i.nextSibling}return{content:c,anchorFound:!0,sectioned:!0,heading:o.textContent?.trim()||void 0}}function G(e,t,n={}){const o=t?.trim()||void 0,r=x(e,o),c=document.createElement("section");c.dataset.espHelpDocument="";const i=c.attachShadow({mode:"open"}),a=document.createElement("style");a.textContent=g;const s=document.createElement("div");s.setAttribute("part","content");const d=document.createElement("div");d.setAttribute("part","actions");const E=u=>{s.replaceChildren(L(e)),l?.setAttribute("disabled",""),l?.setAttribute("label","Full document"),c.dispatchEvent(new CustomEvent(N,{bubbles:!0,composed:!0})),n.onFullDocument?.(c),u&&queueMicrotask(()=>w(s,u))};let l=null;return r.sectioned?(s.append(r.content),l=document.createElement("esp-button"),l.setAttribute("label","View full document"),l.setAttribute("collapsed",""),l.setAttribute("incognito",""),l.addEventListener("esp-clicked",()=>E(o)),d.append(l)):s.append(L(e)),s.addEventListener("click",u=>{const f=u.composedPath().find(y=>y instanceof HTMLAnchorElement)?.getAttribute("href")??"";if(!f)return;if(!f.startsWith("#")){u.preventDefault(),window.open(f,"_blank","noopener,noreferrer");return}u.preventDefault();const p=T(f);p&&(r.sectioned?E(p):w(s,p))}),i.append(a,s,d),{element:c,anchorFound:r.anchorFound,fullDocument:!r.sectioned,...r.heading?{topicTitle:r.heading}:{}}}function V(e){const t=document.createElement("section");t.dataset.espHelpStatus="";const n=t.attachShadow({mode:"open"}),o=document.createElement("style");o.textContent=g;const r=document.createElement("p");if(r.setAttribute("part","message"),r.textContent=e.message,n.append(o,r),e.actionLabel&&e.onAction){const c=document.createElement("div");c.setAttribute("part","actions");const i=document.createElement("esp-button");i.setAttribute("label",e.actionLabel),i.setAttribute("collapsed",""),i.addEventListener("esp-clicked",e.onAction),c.append(i),n.append(c)}return t}function R(e){let t=e;const n=new Set;for(;t&&!n.has(t);){n.add(t);const o=t.getAttribute("help-src")?.trim()??"";if(o)return o;t=h(t)}return""}function h(e){if(e.assignedSlot)return e.assignedSlot;if(e.parentElement)return e.parentElement;const t=e.getRootNode();return t instanceof ShadowRoot?t.host:null}function m(...e){for(const t of e){const n=t?.trim()??"";if(n)return n}}function b(e,t,n){if(e.nodeType===Node.TEXT_NODE){t.appendChild(document.createTextNode(e.textContent??""));return}if(!(e instanceof Element)||C.has(e.tagName))return;if(!D.has(e.tagName)){for(const r of[...e.childNodes])b(r,t,n);return}const o=document.createElement(e.tagName.toLowerCase());F(e,o,n);for(const r of[...e.childNodes])b(r,o,n);t.appendChild(o)}function F(e,t,n){const o=e.getAttribute("id")?.trim();o&&t.setAttribute("id",o);for(const r of H[e.tagName]??[]){if(!e.hasAttribute(r))continue;const c=e.getAttribute(r)??"",i=r==="href"||r==="src"?I(c,n):c;i!==null&&t.setAttribute(r,i)}}function I(e,t){if(!e||e.startsWith("#"))return e;try{const n=new URL(e,t);return["http:","https:","mailto:","tel:"].includes(n.protocol)?n.href:null}catch{return null}}function A(e,t){return[...e.querySelectorAll("[id]")].find(n=>n.id===t)??null}function S(e){const t=/^H([1-6])$/u.exec(e.tagName);return t?Number(t[1]):null}function L(e){const t=e.body.cloneNode(!0),n=v(e.title);if(!n)return t;let o=t.firstChild;for(;o?.nodeType===Node.TEXT_NODE&&!o.textContent?.trim();)o=o.nextSibling;return o instanceof Element&&o.tagName==="H1"&&v(o.textContent)===n&&o.remove(),t}function v(e){return e?.replace(/\s+/gu," ").trim().toLowerCase()??""}function w(e,t){const n=A(e,t);if(!n)return;const o=U(n);if(!o)return;const r=n.getBoundingClientRect().top,c=o.getBoundingClientRect().top;o.scrollTop+=r-c}function U(e){for(let t=h(e);t;t=h(t)){if(!(t instanceof HTMLElement))continue;const n=getComputedStyle(t).overflowY;if(n==="auto"||n==="scroll")return t}return null}export{G as createHelpDocumentView,V as createHelpStatusView,M as normalizeHelpDocument,B as resolveHelpTarget,x as selectHelpContent};
