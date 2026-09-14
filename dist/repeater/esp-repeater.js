var n=function(f,e,t,s){var r=arguments.length,o=r<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,t):s,i;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(f,e,t,s);else for(var c=f.length-1;c>=0;c--)(i=f[c])&&(o=(r<3?i(o):r>3?i(e,t,o):i(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o};import{css as B,html as h,nothing as S}from"lit";import{customElement as N,property as d,state as g}from"lit/decorators.js";import{keyed as q}from"lit/directives/keyed.js";import{ifDefined as M}from"lit/directives/if-defined.js";import{createRef as R,ref as w}from"lit/directives/ref.js";import{repeat as T}from"lit/directives/repeat.js";import{styleMap as p}from"lit/directives/style-map.js";import{EspalierElementBase as I}from"../shared/esp-element-base.js";import{accumulatePage as V,RequestVersionGuard as j}from"../shared/cursor-pagination.js";import"../shared/virtualizer/lit-virtualizer.js";const P=4;let a=class extends I{constructor(){super(...arguments),this.virtualizerRef=R(),this.containerRef=R(),this.pageLoads=new j,this.nextCursor=null,this.lastRangeEnd=-1,this.lastObservedWidth=0,this.observersAttached=!1,this.gridObserversAttached=!1,this.resolvedGridColumns=1,this.memoizedGridRowsSource=null,this.memoizedGridRowsColumns=0,this.memoizedGridRows=[],this.hostAttributeObserver=null,this.resizeObserver=null,this.viewportResizeListener=null,this.masonryRef=R(),this.masonryCellObserver=null,this.masonryObservedCells=new Set,this.masonryPrefetchObserver=null,this.footerHoldScrollListener=null,this.isAdjustingHeight=!1,this.pendingHeightRetry=!1,this.heightRetryObserver=null,this.isLoadingPage=!1,this.loadedItems=[],this.hasMoreData=!1,this.effectiveListHeight="60vh",this.loadError="",this.footerHoldHeight=0,this.items=[],this.renderItem=null,this.layout="list",this.scrollModel="contained",this.gridColumns=1,this.ariaLabel=null,this.listHeight="60vh",this.pageSize=25,this.prefetchThreshold=5,this.loading=!1,this.loadingMessage="Loading items\u2026",this.emptyMessage="No items found",this.errorMessage="",this.fetchPageBacker=null,this.renderVirtualItem=(e,t)=>{if(e===void 0)return h``;const s=this.renderItem??(r=>this.renderFallbackItem(r));return h`<div class="repeater-item" part="item" role="listitem">
      ${s(e,t)}
    </div>`},this.renderVirtualRow=e=>{if(e===void 0)return h``;const t=this.renderItem??(r=>this.renderFallbackItem(r)),s={gridTemplateColumns:`repeat(${this.effectiveGridColumns}, minmax(0, 1fr))`};return h`<div
      class="repeater-row"
      part="row"
      role="presentation"
      style=${p(s)}
    >
      ${e.items.map((r,o)=>h`<div class="repeater-item repeater-grid-cell" part="item" role="listitem">
            ${t(r,e.startIndex+o)}
          </div>`)}
    </div>`},this.renderGridVirtualItem=(e,t)=>this.isGridRow(e)?this.renderVirtualRow(e,t):h``}get fetchPage(){return this.fetchPageBacker}set fetchPage(e){const t=this.fetchPageBacker;t!==e&&(this.fetchPageBacker=e,this.requestUpdate("fetchPage",t),this.resetPagedState(),e&&this.hasUpdated&&this.startPagedLoad(null))}get isPagedMode(){return this.fetchPage!==null}get isGridLayout(){return this.layout==="grid"}get isMasonryLayout(){return this.layout==="masonry"}get usesColumns(){return this.isGridLayout||this.isMasonryLayout}get isPageScrollModel(){return this.scrollModel==="page"}get isContainedScrollModel(){return!this.isPageScrollModel}get renderedItems(){return this.isPagedMode?this.loadedItems:this.items}get virtualizerItems(){return this.isGridLayout?this.buildGridRows(this.renderedItems,this.effectiveGridColumns):this.renderedItems}get isBusy(){return this.loading||this.isLoadingPage}get activeErrorMessage(){return this.errorMessage||this.loadError}get normalizedPageSize(){const e=Number(this.pageSize);return Number.isFinite(e)&&e>0?Math.floor(e):25}get normalizedPrefetchThreshold(){const e=Number(this.prefetchThreshold);return Number.isFinite(e)&&e>0?Math.floor(e):1}get normalizedGridColumns(){const e=Number(this.gridColumns);return Number.isFinite(e)&&e>0?Math.floor(e):1}get effectiveGridColumns(){return this.usesColumns?this.resolvedGridColumns:1}connectedCallback(){super.connectedCallback(),this.attachObservers(),this.lastObservedWidth=this.clientWidth,this.syncResolvedGridColumns(),this.hasUpdated&&this.isContainedScrollModel&&this.adjustListHeight(),this.hasUpdated&&this.isMasonryLayout&&this.syncMasonryObservers()}firstUpdated(e){if(super.firstUpdated(e),this.lastObservedWidth=this.clientWidth,this.fetchPage){this.startPagedLoad(null);return}this.adjustListHeight()}disconnectedCallback(){this.disconnectMasonryObservers(),this.releaseFooterHold(),this.heightRetryObserver?.disconnect(),this.heightRetryObserver=null,this.pendingHeightRetry=!1,this.detachObservers(),super.disconnectedCallback()}willUpdate(e){super.willUpdate(e),(e.has("layout")||e.has("gridColumns"))&&this.syncResolvedGridColumns()}updated(e){if(super.updated(e),e.has("layout")&&(this.syncGridObservers(),this.isMasonryLayout||this.disconnectMasonryObservers()),this.isMasonryLayout&&(e.has("items")||e.has("loadedItems")||e.has("layout")||e.has("fetchPage")||e.has("prefetchThreshold")||e.has("scrollModel")))this.syncMasonryObservers();else if(this.isMasonryLayout&&e.has("isLoadingPage")){const t=this.masonryRef.value;t&&this.syncMasonryPrefetchTarget(t)}(e.has("items")||e.has("loadedItems")||e.has("listHeight")||e.has("layout")||e.has("gridColumns")||e.has("scrollModel"))&&this.adjustListHeight()}syncMasonryObservers(){for(const t of this.masonryObservedCells)t.isConnected||(this.masonryCellObserver?.unobserve(t),this.masonryObservedCells.delete(t));const e=this.masonryRef.value;if(!e){this.disconnectMasonryPrefetchObserver();return}this.masonryCellObserver||(this.masonryCellObserver=new ResizeObserver(t=>{this.applyMasonrySpans(t)}));for(const t of e.querySelectorAll(":scope > .repeater-masonry-cell"))this.masonryObservedCells.has(t)||(this.masonryObservedCells.add(t),this.masonryCellObserver.observe(t,{box:"border-box"}));this.syncMasonryPrefetchTarget(e)}applyMasonrySpans(e){for(const t of e){const s=t.target,r=t.borderBoxSize?.[0]?.blockSize??s.getBoundingClientRect().height,i=`span ${Math.max(1,Math.ceil(r/P))}`;s.style.gridRowEnd!==i&&(s.style.gridRowEnd=i)}this.isContainedScrollModel&&this.adjustListHeight()}syncMasonryPrefetchTarget(e){if(!this.isPagedMode){this.disconnectMasonryPrefetchObserver();return}const t=e.querySelectorAll(":scope > .repeater-masonry-cell"),s=t[Math.max(0,t.length-this.normalizedPrefetchThreshold)]??null;this.disconnectMasonryPrefetchObserver(),s&&(this.masonryPrefetchObserver=new IntersectionObserver(r=>{r.some(o=>o.isIntersecting)&&this.requestNextPageIfNeeded()},{root:this.isContainedScrollModel?e:null}),this.masonryPrefetchObserver.observe(s))}disconnectMasonryPrefetchObserver(){this.masonryPrefetchObserver?.disconnect(),this.masonryPrefetchObserver=null}disconnectMasonryObservers(){this.masonryCellObserver?.disconnect(),this.masonryCellObserver=null,this.masonryObservedCells.clear(),this.disconnectMasonryPrefetchObserver()}parsePositiveIntegerToken(e){const t=Number(e.trim());return Number.isFinite(t)&&t>0?Math.floor(t):null}attachObservers(){this.observersAttached||(this.observersAttached=!0,this.getResizeObserver().observe(this),this.syncGridObservers())}detachObservers(){this.observersAttached&&(this.observersAttached=!1,this.detachGridObservers(),this.resizeObserver?.disconnect())}syncGridObservers(){if(this.observersAttached){if(!this.usesColumns){this.detachGridObservers();return}this.gridObserversAttached||(this.gridObserversAttached=!0,this.getHostAttributeObserver().observe(this,{attributes:!0,attributeFilter:["class","style"]}),window.addEventListener("resize",this.getViewportResizeListener()))}}detachGridObservers(){if(!this.gridObserversAttached)return;this.gridObserversAttached=!1,this.hostAttributeObserver?.disconnect();const e=this.viewportResizeListener;e&&window.removeEventListener("resize",e)}getHostAttributeObserver(){return this.hostAttributeObserver||(this.hostAttributeObserver=new MutationObserver(()=>{this.refreshResolvedGridColumns()})),this.hostAttributeObserver}getResizeObserver(){return this.resizeObserver||(this.resizeObserver=new ResizeObserver(()=>{const e=this.clientWidth,t=e!==this.lastObservedWidth;this.lastObservedWidth=e;const s=this.usesColumns?this.refreshResolvedGridColumns():!1;t&&!s&&this.isContainedScrollModel&&this.adjustListHeight()})),this.resizeObserver}getViewportResizeListener(){return this.viewportResizeListener||(this.viewportResizeListener=()=>{this.refreshResolvedGridColumns()}),this.viewportResizeListener}syncResolvedGridColumns(){this.resolvedGridColumns=this.usesColumns?this.readResolvedGridColumns():1}readResolvedGridColumns(){return!this.usesColumns||!this.isConnected?this.normalizedGridColumns:this.parsePositiveIntegerToken(getComputedStyle(this).getPropertyValue("--esp-repeater-grid-columns"))??this.normalizedGridColumns}refreshResolvedGridColumns(){if(!this.usesColumns)return!1;const e=this.readResolvedGridColumns();return e===this.resolvedGridColumns?!1:(this.resolvedGridColumns=e,this.hasUpdated&&(this.requestUpdate(),this.adjustListHeight()),!0)}buildGridRows(e,t){if(this.memoizedGridRowsSource===e&&this.memoizedGridRowsColumns===t)return this.memoizedGridRows;const s=[];for(let r=0;r<e.length;r+=t)s.push({items:e.slice(r,r+t),startIndex:r});return this.memoizedGridRowsSource=e,this.memoizedGridRowsColumns=t,this.memoizedGridRows=s,s}isGridRow(e){return e!==null&&typeof e=="object"&&Array.isArray(e.items)&&typeof e.startIndex=="number"}renderFallbackItem(e){if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return String(e);let t="";try{t=JSON.stringify(e,null,2)??this.describeFallbackItem(e)}catch{t=this.describeFallbackItem(e)}return h`<pre>${t}</pre>`}describeFallbackItem(e){try{return String(e)}catch{return"Unrenderable item"}}async startPagedLoad(e){!this.fetchPage||this.isLoadingPage||(this.releaseFooterHold(),this.isLoadingPage=!0,await this.loadPage(e))}async loadPage(e){const t=this.fetchPage;if(!t)return;const s=this.pageLoads.begin();let r=0,o=!1;try{const i=await t({cursor:e,limit:this.normalizedPageSize});if(!this.pageLoads.isCurrent(s))return;r=this.measureContentHeight(),this.loadedItems=V(this.loadedItems,i.items,e),o=e!==null&&i.items.length>0,this.nextCursor=i.nextCursor,this.hasMoreData=i.nextCursor!==null,this.loadError=""}catch(i){if(!this.pageLoads.isCurrent(s))return;this.nextCursor=null,this.hasMoreData=!1,this.loadError=i instanceof Error&&i.message.length>0?i.message:"Unable to load items."}finally{this.pageLoads.isCurrent(s)&&o&&this.isPageScrollModel&&await this.waitForContentGrowth(r,s),this.pageLoads.isCurrent(s)&&(this.isPageScrollModel&&this.holdFooterSpace(),this.isLoadingPage=!1,this.isMasonryLayout||this.requestNextPageForRange())}}footerHoldFor(e,t,s,r){return e<=0?0:t+s>r-e?e:0}holdFooterSpace(){const e=this.containerRef.value?.querySelector(":scope > .status-footer"),t=this.footerHoldFor(e?.getBoundingClientRect().height??0,window.scrollY,window.innerHeight,document.documentElement.scrollHeight);t<=0||(this.footerHoldHeight=t,this.footerHoldScrollListener||(this.footerHoldScrollListener=()=>this.releaseFooterHoldIfSafe(),window.addEventListener("scroll",this.footerHoldScrollListener,{passive:!0})))}releaseFooterHoldIfSafe(){const e=document.documentElement.scrollHeight;window.scrollY+window.innerHeight<=e-this.footerHoldHeight&&this.releaseFooterHold()}releaseFooterHold(){this.footerHoldScrollListener&&(window.removeEventListener("scroll",this.footerHoldScrollListener),this.footerHoldScrollListener=null),this.footerHoldHeight=0}measureContentHeight(){return(this.masonryRef.value??this.getVirtualizerElement())?.getBoundingClientRect().height??0}async waitForContentGrowth(e,t){await this.updateComplete;for(let s=0;s<12&&this.pageLoads.isCurrent(t);s+=1){if(this.measureContentHeight()>e)return;await new Promise(r=>requestAnimationFrame(r))}}requestNextPageIfNeeded(){!this.isPagedMode||this.activeErrorMessage.length>0||!this.hasMoreData||this.isLoadingPage||this.nextCursor===null||this.startPagedLoad(this.nextCursor)}onRangeChanged(e){this.lastRangeEnd=e.last,!(!this.isPagedMode||this.isLoadingPage)&&this.requestNextPageForRange()}requestNextPageForRange(){if(this.lastRangeEnd<0)return;const e=this.normalizedPrefetchThreshold;this.getLastVisibleItemIndex(this.lastRangeEnd)>=this.loadedItems.length-e&&this.requestNextPageIfNeeded()}getLastVisibleItemIndex(e){return this.isGridLayout?Math.min((e+1)*this.effectiveGridColumns-1,this.renderedItems.length-1):e}resetPagedState(){this.releaseFooterHold(),this.pageLoads.invalidate(),this.lastRangeEnd=-1,this.isLoadingPage=!1,this.loadedItems=[],this.nextCursor=null,this.hasMoreData=!1,this.loadError=""}async adjustListHeight(){if(this.isContainedScrollModel&&!this.isAdjustingHeight){this.isAdjustingHeight=!0;try{this.effectiveListHeight=this.listHeight;const e=this.getVirtualizerElement();e&&(e.style.minHeight=""),await this.updateComplete;const t=this.containerRef.value,s=this.getVirtualizerElement();if(!t)return;if(this.renderedItems.length===0||!s){if(this.isMasonryLayout&&(this.hasMoreData||this.isBusy))return;let l=0;t.querySelectorAll(":scope > *").forEach(b=>{l+=b.offsetHeight});const u=t.offsetHeight;l>0&&l<u&&(this.effectiveListHeight=`${l}px`);return}if(this.hasMoreData||this.isBusy||this.activeErrorMessage.length>0)return;const r=this.isGridLayout?".repeater-row":".repeater-item",o=s.querySelectorAll(r);let i=0,c=!1;if(o.forEach(l=>{const u=l.offsetHeight;u===0&&(c=!0),i+=u}),o.length===0||c||i===0){this.pendingHeightRetry||(this.pendingHeightRetry=!0,this.observeForHeightRetry(s));return}const G=this.isGridLayout?".repeater-row :defined":".repeater-item :defined",x=s.querySelectorAll(G),v=[];x.forEach(l=>{"updateComplete"in l&&v.push(l.updateComplete)}),v.length>0&&(await Promise.all(v),i=0,o.forEach(l=>{i+=l.offsetHeight}));const E=t.querySelector(":scope > .status-footer")?.offsetHeight??0,y=i+E,$=t.offsetHeight,A=this.virtualizerItems.length;let H=!1;y>0&&y<$&&o.length>=A&&(s.style.minHeight=`${i}px`,this.effectiveListHeight=`${y}px`,H=!0),H&&!this.hasMoreData&&!this.pendingHeightRetry&&(this.pendingHeightRetry=!0,setTimeout(()=>{if(this.pendingHeightRetry=!1,!this.isContainedScrollModel||this.isBusy||this.activeErrorMessage.length>0)return;const l=this.containerRef.value,u=this.getVirtualizerElement();if(!l||!u||this.hasMoreData)return;const b=this.isGridLayout?".repeater-row":".repeater-item",C=u.querySelectorAll(b);let m=0,L=!1;if(C.forEach(k=>{const z=k.offsetHeight;z===0&&(L=!0),m+=z}),C.length===0||L||m===0)return;const F=l.querySelector(":scope > .status-footer")?.offsetHeight??0,O=m+F;O<l.offsetHeight&&C.length>=this.virtualizerItems.length&&(u.style.minHeight=`${m}px`,this.effectiveListHeight=`${O}px`)},100))}finally{this.isAdjustingHeight=!1}}}observeForHeightRetry(e){this.heightRetryObserver?.disconnect(),this.heightRetryObserver=new IntersectionObserver(t=>{if(!t.some(i=>i.isIntersecting))return;if(this.heightRetryObserver?.disconnect(),this.heightRetryObserver=null,!this.isContainedScrollModel){this.pendingHeightRetry=!1;return}let r=0;const o=()=>{this.pendingHeightRetry=!1,this.adjustListHeight(),this.pendingHeightRetry&&++r<5&&setTimeout(o,100)};requestAnimationFrame(()=>setTimeout(o,50))},{threshold:0}),this.heightRetryObserver.observe(e)}clear(){if(this.isPagedMode){this.resetPagedState(),this.adjustListHeight();return}this.items=[]}async reload(){this.isPagedMode&&(this.resetPagedState(),await this.startPagedLoad(null))}async scrollToIndex(e,t="center"){if(await this.updateComplete,this.isMasonryLayout){this.masonryRef.value?.querySelectorAll(":scope > .repeater-masonry-cell")?.[e]?.scrollIntoView({block:t});return}const s=this.getVirtualizerElement();!s||!s.scrollToIndex||(await s.updateComplete,await new Promise(r=>requestAnimationFrame(r)),await s.layoutComplete,s.scrollToIndex(this.isGridLayout?Math.floor(e/this.effectiveGridColumns):e,t))}getVirtualizerElement(){return this.virtualizerRef.value}renderBlockingState(e,t,s){return h`<div class="state-panel" part="state" role=${s} aria-live=${M(s==="alert"?void 0:"polite")}>
      <slot name=${e}>
        <div class="state-message">${t}</div>
      </slot>
    </div>`}renderFooterState(){return this.renderedItems.length===0?S:this.activeErrorMessage.length>0?h`<div class="status-footer" part="footer" role="alert">
        <slot name="error">
          <div class="state-message">${this.activeErrorMessage}</div>
        </slot>
      </div>`:this.isBusy?h`<div class="status-footer" part="footer" role="status" aria-live="polite">
        <slot name="loading">
          <div class="state-message">${this.loadingMessage}</div>
        </slot>
      </div>`:this.footerHoldHeight>0?h`<div
        class="status-footer-hold"
        aria-hidden="true"
        style=${p({height:`${this.footerHoldHeight}px`})}
      ></div>`:S}renderMasonry(){const e=this.renderItem??(s=>this.renderFallbackItem(s)),t={gridTemplateColumns:`repeat(${this.effectiveGridColumns}, minmax(0, 1fr))`,gridAutoRows:`${P}px`};return h`<div
      ${w(this.masonryRef)}
      class="repeater-masonry"
      part="scroller"
      role="list"
      aria-busy=${this.isBusy?"true":"false"}
      aria-label=${M(this.ariaLabel??void 0)}
      style=${p(t)}
    >
      ${T(this.renderedItems,(s,r)=>r,(s,r)=>h`<div class="repeater-item repeater-masonry-cell" part="item" role="listitem">
            ${e(s,r)}
          </div>`)}
    </div>`}render(){const e=this.isContainedScrollModel?{height:this.effectiveListHeight}:{},t=this.isGridLayout?this.renderGridVirtualItem:this.renderVirtualItem,s=q(this.scrollModel,h`<lit-virtualizer
        ${w(this.virtualizerRef)}
        class="repeater-virtualizer"
        part="scroller"
        ?scroller=${this.isContainedScrollModel}
        .scroller=${this.isContainedScrollModel}
        role="list"
        aria-busy=${this.isBusy?"true":"false"}
        aria-label=${M(this.ariaLabel??void 0)}
        .items=${this.virtualizerItems}
        .renderItem=${t}
        @rangeChanged=${r=>this.onRangeChanged(r)}
      ></lit-virtualizer>`);return h`<div
      class="repeater-container"
      part="container"
      ${w(this.containerRef)}
      style=${p(e)}
    >
      ${this.renderedItems.length===0?this.activeErrorMessage.length>0?this.renderBlockingState("error",this.activeErrorMessage,"alert"):this.isBusy?this.renderBlockingState("skeleton",this.loadingMessage,"status"):this.renderBlockingState("empty",this.emptyMessage,"status"):this.isMasonryLayout?this.renderMasonry():s}
      ${this.renderFooterState()}
    </div>`}};a.styles=[...I.styles,B`
      .repeater-container {
        display: flex;
        flex-direction: column;
        color: var(--esp-color-text);
        background: var(--esp-repeater-background, transparent);
        border: var(--esp-repeater-border, none);
        border-radius: var(--esp-repeater-border-radius, var(--esp-size-border-radius));
      }

      :host([scroll-model="contained"]) .repeater-container {
        overflow: hidden;
      }

      .state-panel,
      .status-footer {
        display: grid;
        gap: var(--esp-size-tiny);
        padding: var(--esp-repeater-padding, var(--esp-size-small));
        background: var(--esp-color-layer-2);
      }

      .state-panel {
        place-content: center;
        min-height: 3em;
      }

      .status-footer {
        border-top: 1px solid var(--esp-color-border);
        flex-shrink: 0;
      }

      .status-footer-hold {
        flex-shrink: 0;
      }

      .state-message {
        color: var(--esp-color-text);
        font-style: italic;
      }

      lit-virtualizer {
        display: block;
        min-height: 0;
        padding: var(--esp-repeater-content-padding, 0);
      }

      :host([scroll-model="contained"]) lit-virtualizer {
        flex: 1;
        overflow: auto;
      }

      :host([scroll-model="page"]) lit-virtualizer {
        overflow: visible;
      }

      .repeater-item {
        display: block;
        padding-bottom: var(--esp-repeater-gap, var(--esp-size-small));
      }

      .repeater-row {
        display: grid;
        column-gap: var(
          --esp-repeater-grid-column-gap,
          var(--esp-repeater-gap, var(--esp-size-small))
        );
        padding-bottom: var(
          --esp-repeater-grid-row-gap,
          var(--esp-repeater-gap, var(--esp-size-small))
        );
      }

      .repeater-grid-cell {
        min-width: 0;
        padding-bottom: 0;
      }

      
      .repeater-masonry {
        display: grid;
        grid-auto-flow: row dense;
        align-items: start;
        column-gap: var(
          --esp-repeater-grid-column-gap,
          var(--esp-repeater-gap, var(--esp-size-small))
        );
        min-height: 0;
        padding: var(--esp-repeater-content-padding, 0);
      }

      :host([scroll-model="contained"]) .repeater-masonry {
        flex: 0 1 auto;
        overflow: auto;
      }

      :host([scroll-model="page"]) .repeater-masonry {
        overflow: visible;
      }

      .repeater-masonry-cell {
        min-width: 0;
        padding-bottom: var(
          --esp-repeater-grid-row-gap,
          var(--esp-repeater-gap, var(--esp-size-small))
        );
      }

      pre {
        margin: 0;
        white-space: pre-wrap;
      }
    `],n([g()],a.prototype,"isLoadingPage",void 0),n([g()],a.prototype,"loadedItems",void 0),n([g()],a.prototype,"hasMoreData",void 0),n([g()],a.prototype,"effectiveListHeight",void 0),n([g()],a.prototype,"loadError",void 0),n([g()],a.prototype,"footerHoldHeight",void 0),n([d({type:Array})],a.prototype,"items",void 0),n([d({attribute:!1})],a.prototype,"renderItem",void 0),n([d({type:String,reflect:!0})],a.prototype,"layout",void 0),n([d({attribute:"scroll-model",type:String,reflect:!0})],a.prototype,"scrollModel",void 0),n([d({attribute:"grid-columns",type:Number})],a.prototype,"gridColumns",void 0),n([d({attribute:"aria-label",type:String})],a.prototype,"ariaLabel",void 0),n([d({attribute:"list-height",type:String})],a.prototype,"listHeight",void 0),n([d({attribute:"page-size",type:Number})],a.prototype,"pageSize",void 0),n([d({attribute:"prefetch-threshold",type:Number})],a.prototype,"prefetchThreshold",void 0),n([d({type:Boolean})],a.prototype,"loading",void 0),n([d({attribute:"loading-message",type:String})],a.prototype,"loadingMessage",void 0),n([d({attribute:"empty-message",type:String})],a.prototype,"emptyMessage",void 0),n([d({attribute:"error-message",type:String})],a.prototype,"errorMessage",void 0),n([d({attribute:!1})],a.prototype,"fetchPage",null),a=n([N("esp-repeater")],a);export{a as EspalierRepeater};
