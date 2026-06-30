var o=function(a,e,t,c){var h=arguments.length,r=h<3?e:c===null?c=Object.getOwnPropertyDescriptor(e,t):c,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(a,e,t,c);else for(var d=a.length-1;d>=0;d--)(p=a[d])&&(r=(h<3?p(r):h>3?p(e,t,r):p(e,t))||r);return h>3&&r&&Object.defineProperty(e,t,r),r};import{css as y,html as l,nothing as i}from"lit";import{customElement as k,property as w,state as n}from"lit/decorators.js";import{classMap as f}from"lit/directives/class-map.js";import{createRef as u,ref as v}from"lit/directives/ref.js";import{unsafeHTML as E}from"lit/directives/unsafe-html.js";import{EspalierElementBase as b}from"../shared/esp-element-base.js";import{OverlayController as I}from"../shared/overlay-controller.js";import{ESP_EVENTS as m}from"../shared/events.js";import{srOnly as $}from"../shared/style-fragments.js";const g="%%ESP_MARK_OPEN%%",x="%%ESP_MARK_CLOSE%%";function R(a){return a.replace(/<mark>/gi,g).replace(/<\/mark>/gi,x).replace(/<[^>]*>/g,"").replaceAll(g,"<mark>").replaceAll(x,"</mark>")}let s=class extends b{constructor(){super(...arguments),this.placeholder="Search\u2026",this.isOpen=!1,this.results=[],this.loading=!1,this.query="",this.activeIndex=-1,this.vellumRef=u(),this.inputRef=u(),this.resultsRef=u(),this.idPrefix=`esp-search-${this.correlationId}`,this._overlay=new I({host:this,getFocusTrapContainer:()=>this.vellumRef.value??null,getFocusFallback:()=>this.inputRef.value??null})}show(){this.isOpen||(this.isOpen=!0,this._overlay.open(),this.updateComplete.then(()=>{this.inputRef.value?.focus()}))}hide(){this.isOpen&&(this.isOpen=!1,this.query="",this.results=[],this.activeIndex=-1,this.loading=!1,this._overlay.close(),this.dispatchEvent(new CustomEvent(m.SEARCH_CLOSED,{detail:{},bubbles:!0,composed:!0})))}setResults(e){this.results=e,this.activeIndex=e.length>0?0:-1}setLoading(e){this.loading=e}handleInput(e){const t=e.target.value;this.query=t,this.activeIndex=-1,this.dispatchEvent(new CustomEvent(m.SEARCH_REQUESTED,{detail:{query:t},bubbles:!0,composed:!0})),t.trim()||(this.results=[])}selectResult(e){this.dispatchEvent(new CustomEvent(m.RESULT_SELECTED,{detail:{url:e.url},bubbles:!0,composed:!0})),this.hide()}handleKeyDown(e){if(this.isOpen)switch(e.key){case"Escape":e.preventDefault(),this.hide();break;case"ArrowDown":e.preventDefault(),this.results.length>0&&(this.activeIndex=Math.min(this.activeIndex+1,this.results.length-1),this.scrollActiveIntoView());break;case"ArrowUp":e.preventDefault(),this.results.length>0&&(this.activeIndex=Math.max(this.activeIndex-1,0),this.scrollActiveIntoView());break;case"Enter":e.preventDefault(),this.activeIndex>=0&&this.activeIndex<this.results.length&&this.selectResult(this.results[this.activeIndex]);break;case"Tab":this._overlay.trapFocus(e);break}}handleBackdropClick(e){e.target===this.vellumRef.value&&this.hide()}scrollActiveIntoView(){this.updateComplete.then(()=>{const e=this.resultsRef.value?.querySelectorAll(".result");e&&this.activeIndex>=0&&e[this.activeIndex]&&e[this.activeIndex].scrollIntoView({block:"nearest"})})}get hasListbox(){return this.results.length>0}get listboxId(){return`${this.idPrefix}-listbox`}optionId(e){return`${this.idPrefix}-option-${e}`}render(){return l`
      <div
        ${v(this.vellumRef)}
        class=${f({vellum:!0,"is-open":this.isOpen})}
        role=${this.isOpen?"dialog":i}
        aria-modal=${this.isOpen?"true":i}
        aria-label="Search"
        tabindex="-1"
        @keydown=${this.handleKeyDown}
        @click=${this.handleBackdropClick}
      >
        <div class="panel">
          <div class="input-row">
            <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10" cy="10" r="7" />
              <path d="M21 21l-6-6" />
            </svg>
            <input
              ${v(this.inputRef)}
              type="search"
              class="search-input"
              .value=${this.query}
              placeholder=${this.placeholder}
              autocomplete="off"
              aria-label="Search"
              role="combobox"
              aria-expanded=${this.hasListbox}
              aria-controls=${this.hasListbox?this.listboxId:i}
              aria-activedescendant=${this.activeIndex>=0&&this.hasListbox?this.optionId(this.activeIndex):i}
              @input=${this.handleInput}
            />
            <span class="loading-status sr-only" role="status" aria-live="polite">
              ${this.loading?"Loading results\u2026":i}
            </span>
            ${this.loading?l`<span class="loading-indicator" aria-hidden="true"></span>`:i}
          </div>
          ${this.renderResults()}
        </div>
      </div>
    `}renderResults(){return this.query.trim()?this.results.length===0&&!this.loading?l`<div class="empty" role="status">No results found.</div>`:this.results.length===0?i:l`
      <ul ${v(this.resultsRef)} class="results" role="listbox" id=${this.listboxId}>
        ${this.results.map((e,t)=>l`
            <li
              id=${this.optionId(t)}
              class=${f({result:!0,active:t===this.activeIndex})}
              role="option"
              aria-selected=${t===this.activeIndex}
              @click=${()=>this.selectResult(e)}
              @mouseenter=${()=>{this.activeIndex=t}}
            >
              <span class="result-title">${e.title}</span>
              <span class="result-excerpt">${E(R(e.excerpt))}</span>
            </li>
          `)}
      </ul>
    `:i}};s.styles=[...b.styles,$,y`
      :host {
        display: block;
      }

      .vellum {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 10vh;
        visibility: hidden;
        position: fixed;
        z-index: 10000;
        inset: 0;
        outline: none;

        &::before {
          content: "";
          position: fixed;
          inset: 0;
          background: var(--esp-search-backdrop, oklch(0.15 0 0 / 0.6));
          z-index: 1;
        }

        &.is-open {
          visibility: visible;
        }
      }

      .panel {
        position: relative;
        z-index: 2;
        width: 100%;
        max-width: var(--esp-search-max-width, 40rem);
        background: var(--esp-search-panel-background, var(--esp-color-layer-1));
        border-radius: var(--esp-size-border-radius, 0.5rem);
        box-shadow: var(
          --esp-search-panel-shadow,
          0 1rem 3rem oklch(from var(--esp-color-shadow) l c h / 0.3)
        );
        overflow: hidden;
        margin: 0 var(--esp-size-small);
      }

      .input-row {
        display: flex;
        align-items: center;
        gap: var(--esp-size-tiny);
        padding: var(--esp-size-small) var(--esp-size-normal);
        border-bottom: 1px solid var(--esp-search-border-color, var(--esp-color-border));
      }

      .search-icon {
        width: 1.25em;
        height: 1.25em;
        flex-shrink: 0;
        fill: none;
        stroke: currentColor;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
        opacity: 0.5;
      }

      .search-input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        font: inherit;
        font-size: var(--esp-type-medium, 1.125rem);
        color: var(--esp-search-text-color, var(--esp-color-text));
        padding: 0;

        &::placeholder {
          color: var(--esp-search-muted-color, oklch(from var(--esp-color-text) l c h / 0.7));
        }
      }

      
      .search-input::-webkit-search-cancel-button {
        display: none;
      }

      .loading-indicator {
        width: 1.25em;
        height: 1.25em;
        flex-shrink: 0;
        border: 2px solid
          var(
            --esp-search-loading-indicator-track-color,
            var(--esp-search-border-color, var(--esp-color-border))
          );
        border-top-color: var(--esp-search-loading-indicator-color, var(--esp-color-primary));
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      .results {
        list-style: none;
        margin: 0;
        padding: 0;
        max-height: var(--esp-search-max-height, 60vh);
        overflow-y: auto;
      }

      .result {
        padding: var(--esp-size-tiny) var(--esp-size-normal);
        cursor: pointer;
        border-bottom: 1px solid var(--esp-search-border-color, var(--esp-color-border));

        &:last-child {
          border-bottom: none;
        }

        &.active {
          background: var(--esp-search-active-background, var(--esp-color-layer-2));
        }
      }

      .result-title {
        display: block;
        font-weight: 600;
        font-family: var(--esp-font-headings, inherit);
        color: var(--esp-search-title-color, var(--esp-color-headings));
      }

      .result-excerpt {
        display: block;
        font-size: 0.875em;
        color: var(--esp-search-muted-color, oklch(from var(--esp-color-text) l c h / 0.7));
        margin-top: 0.125em;
        line-height: 1.4;

        & mark {
          background: var(--esp-search-highlight-background, var(--esp-color-link-hover-bg));
          color: inherit;
          padding: 0 0.1em;
          border-radius: 0.15em;
        }
      }

      .empty {
        padding: var(--esp-size-normal);
        text-align: center;
        color: var(--esp-search-muted-color, oklch(from var(--esp-color-text) l c h / 0.7));
        font-style: italic;
      }
    `],o([w({type:String})],s.prototype,"placeholder",void 0),o([n()],s.prototype,"isOpen",void 0),o([n()],s.prototype,"results",void 0),o([n()],s.prototype,"loading",void 0),o([n()],s.prototype,"query",void 0),o([n()],s.prototype,"activeIndex",void 0),s=o([k("esp-search")],s);export{s as EspalierSearch};
