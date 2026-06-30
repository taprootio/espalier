var l=function(y,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(y,e,t,i);else for(var g=y.length-1;g>=0;g--)(o=y[g])&&(s=(r<3?o(s):r>3?o(e,t,s):o(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s};import"@lit-labs/virtualizer";import{css as T,html as d,nothing as I}from"lit";import{customElement as F,property as h,state as b}from"lit/decorators.js";import{keyed as j}from"lit/directives/keyed.js";import{ifDefined as M}from"lit/directives/if-defined.js";import{createRef as G,ref as O}from"lit/directives/ref.js";import{styleMap as A}from"lit/directives/style-map.js";import{EspalierElementBase as E}from"../shared/esp-element-base.js";let a=class extends E{constructor(){super(...arguments),this.virtualizerRef=G(),this.containerRef=G(),this.pageLoadVersion=0,this.nextCursor=null,this.lastObservedWidth=0,this.observersAttached=!1,this.gridObserversAttached=!1,this.resolvedGridColumns=1,this.memoizedGridRowsSource=null,this.memoizedGridRowsColumns=0,this.memoizedGridRows=[],this.hostAttributeObserver=null,this.resizeObserver=null,this.viewportResizeListener=null,this.pageScrollStabilizerActive=!1,this.activePageScrollStabilizer=null,this.isAdjustingHeight=!1,this.pendingHeightRetry=!1,this.heightRetryObserver=null,this.isLoadingPage=!1,this.loadedItems=[],this.hasMoreData=!1,this.effectiveListHeight="60vh",this.loadError="",this.items=[],this.renderItem=null,this.layout="list",this.scrollModel="contained",this.gridColumns=1,this.ariaLabel=null,this.listHeight="60vh",this.pageSize=25,this.prefetchThreshold=5,this.loading=!1,this.loadingMessage="Loading items\u2026",this.emptyMessage="No items found",this.errorMessage="",this.fetchPageBacker=null,this.renderVirtualItem=(e,t)=>{if(e===void 0)return d``;const i=this.renderItem??(r=>this.renderFallbackItem(r));return d`<div class="repeater-item" part="item" role="listitem">
      ${i(e,t)}
    </div>`},this.renderVirtualRow=e=>{if(e===void 0)return d``;const t=this.renderItem??(r=>this.renderFallbackItem(r)),i={gridTemplateColumns:`repeat(${this.effectiveGridColumns}, minmax(0, 1fr))`};return d`<div
      class="repeater-row"
      part="row"
      role="presentation"
      style=${A(i)}
    >
      ${e.items.map((r,s)=>d`<div class="repeater-item repeater-grid-cell" part="item" role="listitem">
            ${t(r,e.startIndex+s)}
          </div>`)}
    </div>`},this.renderGridVirtualItem=(e,t)=>this.isGridRow(e)?this.renderVirtualRow(e,t):d``}get fetchPage(){return this.fetchPageBacker}set fetchPage(e){const t=this.fetchPageBacker;t!==e&&(this.fetchPageBacker=e,this.requestUpdate("fetchPage",t),this.resetPagedState(),e&&this.hasUpdated&&this.startPagedLoad(null))}get isPagedMode(){return this.fetchPage!==null}get isGridLayout(){return this.layout==="grid"}get isPageScrollModel(){return this.scrollModel==="page"}get isContainedScrollModel(){return!this.isPageScrollModel}get renderedItems(){return this.isPagedMode?this.loadedItems:this.items}get virtualizerItems(){return this.isGridLayout?this.buildGridRows(this.renderedItems,this.effectiveGridColumns):this.renderedItems}get isBusy(){return this.loading||this.isLoadingPage}get activeErrorMessage(){return this.errorMessage||this.loadError}get normalizedPageSize(){const e=Number(this.pageSize);return Number.isFinite(e)&&e>0?Math.floor(e):25}get normalizedPrefetchThreshold(){const e=Number(this.prefetchThreshold);return Number.isFinite(e)&&e>0?Math.floor(e):1}get normalizedGridColumns(){const e=Number(this.gridColumns);return Number.isFinite(e)&&e>0?Math.floor(e):1}get effectiveGridColumns(){return this.isGridLayout?this.resolvedGridColumns:1}connectedCallback(){super.connectedCallback(),this.attachObservers(),this.lastObservedWidth=this.clientWidth,this.syncResolvedGridColumns(),this.hasUpdated&&this.isContainedScrollModel&&this.adjustListHeight()}firstUpdated(e){if(super.firstUpdated(e),this.lastObservedWidth=this.clientWidth,this.fetchPage){this.startPagedLoad(null);return}this.adjustListHeight()}disconnectedCallback(){this.releaseActivePageScrollStabilizer(),this.heightRetryObserver?.disconnect(),this.heightRetryObserver=null,this.pendingHeightRetry=!1,this.detachObservers(),super.disconnectedCallback()}willUpdate(e){super.willUpdate(e),(e.has("layout")||e.has("gridColumns"))&&this.syncResolvedGridColumns()}updated(e){super.updated(e),e.has("layout")&&this.syncGridObservers(),(e.has("items")||e.has("loadedItems")||e.has("listHeight")||e.has("layout")||e.has("gridColumns")||e.has("scrollModel"))&&this.adjustListHeight()}parsePositiveIntegerToken(e){const t=Number(e.trim());return Number.isFinite(t)&&t>0?Math.floor(t):null}attachObservers(){this.observersAttached||(this.observersAttached=!0,this.getResizeObserver().observe(this),this.syncGridObservers())}detachObservers(){this.observersAttached&&(this.observersAttached=!1,this.detachGridObservers(),this.resizeObserver?.disconnect())}syncGridObservers(){if(this.observersAttached){if(!this.isGridLayout){this.detachGridObservers();return}this.gridObserversAttached||(this.gridObserversAttached=!0,this.getHostAttributeObserver().observe(this,{attributes:!0,attributeFilter:["class","style"]}),window.addEventListener("resize",this.getViewportResizeListener()))}}detachGridObservers(){if(!this.gridObserversAttached)return;this.gridObserversAttached=!1,this.hostAttributeObserver?.disconnect();const e=this.viewportResizeListener;e&&window.removeEventListener("resize",e)}getHostAttributeObserver(){return this.hostAttributeObserver||(this.hostAttributeObserver=new MutationObserver(()=>{this.refreshResolvedGridColumns()})),this.hostAttributeObserver}getResizeObserver(){return this.resizeObserver||(this.resizeObserver=new ResizeObserver(()=>{const e=this.clientWidth,t=e!==this.lastObservedWidth;this.lastObservedWidth=e;const i=this.isGridLayout?this.refreshResolvedGridColumns():!1;t&&!i&&this.isContainedScrollModel&&this.adjustListHeight()})),this.resizeObserver}getViewportResizeListener(){return this.viewportResizeListener||(this.viewportResizeListener=()=>{this.refreshResolvedGridColumns()}),this.viewportResizeListener}syncResolvedGridColumns(){this.resolvedGridColumns=this.isGridLayout?this.readResolvedGridColumns():1}readResolvedGridColumns(){return!this.isGridLayout||!this.isConnected?this.normalizedGridColumns:this.parsePositiveIntegerToken(getComputedStyle(this).getPropertyValue("--esp-repeater-grid-columns"))??this.normalizedGridColumns}refreshResolvedGridColumns(){if(!this.isGridLayout)return!1;const e=this.readResolvedGridColumns();return e===this.resolvedGridColumns?!1:(this.resolvedGridColumns=e,this.hasUpdated&&(this.requestUpdate(),this.adjustListHeight()),!0)}buildGridRows(e,t){if(this.memoizedGridRowsSource===e&&this.memoizedGridRowsColumns===t)return this.memoizedGridRows;const i=[];for(let r=0;r<e.length;r+=t)i.push({items:e.slice(r,r+t),startIndex:r});return this.memoizedGridRowsSource=e,this.memoizedGridRowsColumns=t,this.memoizedGridRows=i,i}isGridRow(e){return e!==null&&typeof e=="object"&&Array.isArray(e.items)&&typeof e.startIndex=="number"}renderFallbackItem(e){if(typeof e=="string"||typeof e=="number"||typeof e=="boolean")return String(e);let t="";try{t=JSON.stringify(e,null,2)??this.describeFallbackItem(e)}catch{t=this.describeFallbackItem(e)}return d`<pre>${t}</pre>`}describeFallbackItem(e){try{return String(e)}catch{return"Unrenderable item"}}async startPagedLoad(e){if(!this.fetchPage||this.isLoadingPage)return;const t=this.capturePageScrollTop(e);this.isLoadingPage=!0,await this.loadPage(e,t)}async loadPage(e,t){const i=this.fetchPage;if(!i)return;const r=++this.pageLoadVersion,s=this.activatePageScrollStabilizer(t,r);this.activePageScrollStabilizer=s;try{const o=await i({cursor:e,limit:this.normalizedPageSize});if(r!==this.pageLoadVersion)return;e===null?this.loadedItems=[...o.items]:this.loadedItems=[...this.loadedItems,...o.items],this.nextCursor=o.nextCursor,this.hasMoreData=o.nextCursor!==null,this.loadError=""}catch(o){if(r!==this.pageLoadVersion)return;this.nextCursor=null,this.hasMoreData=!1,this.loadError=o instanceof Error&&o.message.length>0?o.message:"Unable to load items."}finally{try{r===this.pageLoadVersion&&(this.isLoadingPage=!1),r===this.pageLoadVersion&&await this.restorePageScrollPositionIfNeeded(s.getRestoreScrollTop(),r)}finally{this.activePageScrollStabilizer===s&&this.releaseActivePageScrollStabilizer()}}}capturePageScrollTop(e){return!this.isPageScrollModel||e===null?null:window.scrollY}activatePageScrollStabilizer(e,t){if(e===null||!this.isPageScrollModel||t!==this.pageLoadVersion)return{release:()=>{},getRestoreScrollTop:()=>e};this.pageScrollStabilizerActive=!0;const i=this.getVirtualizerElement(),r=i?.getBoundingClientRect().height??0,s=this.activePageScrollStabilizer;s&&(this.activePageScrollStabilizer=null,s.release(),this.pageScrollStabilizerActive=!0),i&&r>0&&(i.style.minHeight=`${r}px`);const o="",g=r>0?Math.max(64,r*.5):Number.POSITIVE_INFINITY;let u=e,p=window.scrollY;const m=()=>{if(t!==this.pageLoadVersion)return;const c=window.scrollY;if(c>u+1){u=c,p=c;return}if(c+1>=u){p=c;return}const z=c<=1,v=p+1>=u&&p-c>=g;if(!z&&!v){u=c,p=c;return}window.scrollTo({top:u,left:window.scrollX,behavior:"auto"}),p=u};return window.addEventListener("scroll",m,{passive:!0}),{getRestoreScrollTop:()=>u,release:()=>{window.removeEventListener("scroll",m),this.pageScrollStabilizerActive=!1,i&&(i.style.minHeight=o)}}}async restorePageScrollPositionIfNeeded(e,t){if(e===null||!this.isPageScrollModel||t!==this.pageLoadVersion)return;await this.updateComplete;const i=this.getVirtualizerElement();i?.updateComplete&&await i.updateComplete,await new Promise(r=>requestAnimationFrame(r)),i?.layoutComplete&&await i.layoutComplete,t===this.pageLoadVersion&&window.scrollY+1<e&&window.scrollTo({top:e,left:window.scrollX,behavior:"auto"})}onRangeChanged(e){if(!this.isPagedMode||this.activeErrorMessage.length>0||!this.hasMoreData||this.isLoadingPage||this.nextCursor===null)return;const t=this.normalizedPrefetchThreshold;this.getLastVisibleItemIndex(e.last)>=this.loadedItems.length-t&&this.startPagedLoad(this.nextCursor)}getLastVisibleItemIndex(e){return this.isGridLayout?Math.min((e+1)*this.effectiveGridColumns-1,this.renderedItems.length-1):e}resetPagedState(){this.releaseActivePageScrollStabilizer(),this.pageLoadVersion+=1,this.isLoadingPage=!1,this.loadedItems=[],this.nextCursor=null,this.hasMoreData=!1,this.loadError=""}releaseActivePageScrollStabilizer(){const e=this.activePageScrollStabilizer;if(this.activePageScrollStabilizer=null,!e){this.pageScrollStabilizerActive=!1;return}e.release(),this.adjustListHeight()}async adjustListHeight(){if(!this.isContainedScrollModel){const e=this.getVirtualizerElement();e&&!this.pageScrollStabilizerActive&&(e.style.minHeight="");return}if(!this.isAdjustingHeight){this.isAdjustingHeight=!0;try{this.effectiveListHeight=this.listHeight;const e=this.getVirtualizerElement();e&&(e.style.minHeight=""),await this.updateComplete;const t=this.containerRef.value,i=this.getVirtualizerElement();if(!t)return;if(this.renderedItems.length===0||!i){let n=0;t.querySelectorAll(":scope > *").forEach(w=>{n+=w.offsetHeight});const f=t.offsetHeight;n>0&&n<f&&(this.effectiveListHeight=`${n}px`);return}if(this.hasMoreData||this.isBusy||this.activeErrorMessage.length>0)return;const r=this.isGridLayout?".repeater-row":".repeater-item",s=i.querySelectorAll(r);let o=0,g=!1;if(s.forEach(n=>{const f=n.offsetHeight;f===0&&(g=!0),o+=f}),s.length===0||g||o===0){this.pendingHeightRetry||(this.pendingHeightRetry=!0,this.observeForHeightRetry(i));return}const u=this.isGridLayout?".repeater-row :defined":".repeater-item :defined",p=i.querySelectorAll(u),m=[];p.forEach(n=>{"updateComplete"in n&&m.push(n.updateComplete)}),m.length>0&&(await Promise.all(m),o=0,s.forEach(n=>{o+=n.offsetHeight}));const z=t.querySelector(":scope > .status-footer")?.offsetHeight??0,v=o+z,x=t.offsetHeight,V=this.virtualizerItems.length;let R=!1;v>0&&v<x&&s.length>=V&&(i.style.minHeight=`${o}px`,this.effectiveListHeight=`${v}px`,R=!0),R&&!this.hasMoreData&&!this.pendingHeightRetry&&(this.pendingHeightRetry=!0,setTimeout(()=>{if(this.pendingHeightRetry=!1,!this.isContainedScrollModel||this.isBusy||this.activeErrorMessage.length>0)return;const n=this.containerRef.value,f=this.getVirtualizerElement();if(!n||!f||this.hasMoreData)return;const w=this.isGridLayout?".repeater-row":".repeater-item",C=f.querySelectorAll(w);let S=0,L=!1;if(C.forEach(k=>{const H=k.offsetHeight;H===0&&(L=!0),S+=H}),C.length===0||L||S===0)return;const $=n.querySelector(":scope > .status-footer")?.offsetHeight??0,P=S+$;P<n.offsetHeight&&C.length>=this.virtualizerItems.length&&(f.style.minHeight=`${S}px`,this.effectiveListHeight=`${P}px`)},100))}finally{this.isAdjustingHeight=!1}}}observeForHeightRetry(e){this.heightRetryObserver?.disconnect(),this.heightRetryObserver=new IntersectionObserver(t=>{if(!t.some(o=>o.isIntersecting))return;if(this.heightRetryObserver?.disconnect(),this.heightRetryObserver=null,!this.isContainedScrollModel){this.pendingHeightRetry=!1;return}let r=0;const s=()=>{this.pendingHeightRetry=!1,this.adjustListHeight(),this.pendingHeightRetry&&++r<5&&setTimeout(s,100)};requestAnimationFrame(()=>setTimeout(s,50))},{threshold:0}),this.heightRetryObserver.observe(e)}clear(){if(this.isPagedMode){this.resetPagedState(),this.adjustListHeight();return}this.items=[]}async reload(){this.isPagedMode&&(this.resetPagedState(),await this.startPagedLoad(null))}async scrollToIndex(e,t="center"){await this.updateComplete;const i=this.getVirtualizerElement();!i||!i.scrollToIndex||(await i.updateComplete,await new Promise(r=>requestAnimationFrame(r)),await i.layoutComplete,i.scrollToIndex(this.isGridLayout?Math.floor(e/this.effectiveGridColumns):e,t))}getVirtualizerElement(){return this.virtualizerRef.value}renderBlockingState(e,t,i){return d`<div class="state-panel" part="state" role=${i} aria-live=${M(i==="alert"?void 0:"polite")}>
      <slot name=${e}>
        <div class="state-message">${t}</div>
      </slot>
    </div>`}renderFooterState(){return this.renderedItems.length===0?I:this.activeErrorMessage.length>0?d`<div class="status-footer" part="footer" role="alert">
        <slot name="error">
          <div class="state-message">${this.activeErrorMessage}</div>
        </slot>
      </div>`:this.isBusy?d`<div class="status-footer" part="footer" role="status" aria-live="polite">
        <slot name="loading">
          <div class="state-message">${this.loadingMessage}</div>
        </slot>
      </div>`:I}render(){const e=this.isContainedScrollModel?{height:this.effectiveListHeight}:{},t=this.isGridLayout?this.renderGridVirtualItem:this.renderVirtualItem,i=j(this.scrollModel,d`<lit-virtualizer
        ${O(this.virtualizerRef)}
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
      ></lit-virtualizer>`);return d`<div
      class="repeater-container"
      part="container"
      ${O(this.containerRef)}
      style=${A(e)}
    >
      ${this.renderedItems.length===0?this.activeErrorMessage.length>0?this.renderBlockingState("error",this.activeErrorMessage,"alert"):this.isBusy?this.renderBlockingState("skeleton",this.loadingMessage,"status"):this.renderBlockingState("empty",this.emptyMessage,"status"):i}
      ${this.renderFooterState()}
    </div>`}};a.styles=[...E.styles,T`
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

      pre {
        margin: 0;
        white-space: pre-wrap;
      }
    `],l([b()],a.prototype,"isLoadingPage",void 0),l([b()],a.prototype,"loadedItems",void 0),l([b()],a.prototype,"hasMoreData",void 0),l([b()],a.prototype,"effectiveListHeight",void 0),l([b()],a.prototype,"loadError",void 0),l([h({type:Array})],a.prototype,"items",void 0),l([h({attribute:!1})],a.prototype,"renderItem",void 0),l([h({type:String,reflect:!0})],a.prototype,"layout",void 0),l([h({attribute:"scroll-model",type:String,reflect:!0})],a.prototype,"scrollModel",void 0),l([h({attribute:"grid-columns",type:Number})],a.prototype,"gridColumns",void 0),l([h({attribute:"aria-label",type:String})],a.prototype,"ariaLabel",void 0),l([h({attribute:"list-height",type:String})],a.prototype,"listHeight",void 0),l([h({attribute:"page-size",type:Number})],a.prototype,"pageSize",void 0),l([h({attribute:"prefetch-threshold",type:Number})],a.prototype,"prefetchThreshold",void 0),l([h({type:Boolean})],a.prototype,"loading",void 0),l([h({attribute:"loading-message",type:String})],a.prototype,"loadingMessage",void 0),l([h({attribute:"empty-message",type:String})],a.prototype,"emptyMessage",void 0),l([h({attribute:"error-message",type:String})],a.prototype,"errorMessage",void 0),l([h({attribute:!1})],a.prototype,"fetchPage",null),a=l([F("esp-repeater")],a);export{a as EspalierRepeater};
