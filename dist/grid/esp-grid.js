var h=function(I,e,t,i){var s=arguments.length,o=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(I,e,t,i);else for(var n=I.length-1;n>=0;n--)(r=I[n])&&(o=(s<3?r(o):s>3?r(e,t,o):r(e,t))||o);return s>3&&o&&Object.defineProperty(e,t,o),o};import{css as E,html as c}from"lit";import{customElement as A,property as m,state as u}from"lit/decorators.js";import"../input/esp-input.js";import"../button/esp-button.js";import{EspalierElementBase as S}from"../shared/esp-element-base.js";import{ref as y,createRef as w}from"lit/directives/ref.js";import"./esp-grid-column.js";import{classMap as x}from"lit/directives/class-map.js";import{styleMap as P}from"lit/directives/style-map.js";import{leftArrow as T}from"../shared/svgs/left-arrow.js";import{rightArrow as G}from"../shared/svgs/right-arrow.js";import{filter as N}from"../shared/svgs/filter.js";import"../shared/virtualizer/lit-virtualizer.js";const L="esp-grid-load-start",M="esp-grid-load-success",z="esp-grid-load-error",j="esp-grid-items-changed";let d=class extends S{constructor(){super(...arguments),this.columnDefinitionsSlot=w(),this.headerButtonsSlot=w(),this.filteredItems=[],this.sortColumn=void 0,this.itemsBacker=[],this.virtualizerRef=w(),this.gridHeaderRowRef=w(),this.infiniteContainerRef=w(),this.pageLoadVersion=0,this.nextCursor=null,this.searchTerm="",this.allowNext=!1,this.allowPrevious=!1,this.columnDefinitions=new Array,this.displayedItems=[],this.pageNumber=1,this.footerMessage="",this.allLoadedItems=[],this.hasMoreData=!1,this.isLoadingFirstPage=!1,this.isLoadingPage=!1,this.effectiveGridHeight="",this.pendingHeightRetry=!1,this.wheelHandlerAttached=!1,this.dataField="",this.dataUrl="",this.pageSize=10,this.gridHeight="60vh",this.searchFields=[],this.fetchPageBacker=null,this.isAdjustingHeight=!1,this.heightRetryObserver=null,this.pinnedOffsets=new Map,this.handleGridClick=e=>{const t=e.target,i=t.hasAttribute("grid-event")?t:t.closest("[grid-event]");if(!i)return;const s=i.closest("tr")??i.closest(".grid-row"),o=Number(s?.dataset.rowIndex),r=this.isInfiniteMode?this.allLoadedItems:this.displayedItems,n=Number.isInteger(o)&&o>=0?r[o]:void 0;this.dispatchEvent(new CustomEvent("grid-event",{detail:{grid:this,target:i,event:i.getAttribute("grid-event")??"",data:n??{}},bubbles:!1,composed:!0})),e.stopPropagation()},this.syncHeaderScroll=()=>{const e=this.virtualizerRef.value,t=this.gridHeaderRowRef.value;e&&t&&(t.scrollLeft=e.scrollLeft)},this.handleVirtualizerWheel=e=>{const t=this.infiniteContainerRef.value;if(!t)return;const i=t.getBoundingClientRect(),s=window.innerHeight,o=i.top>=0&&i.bottom<=s,r=i.top<=0&&i.bottom>=s;!o&&!r&&(e.preventDefault(),window.scrollBy(0,e.deltaY))},this.handleSearch=e=>{const t=e.detail.toLowerCase();this.isInfiniteMode?(this.searchDebounceTimer&&clearTimeout(this.searchDebounceTimer),this.searchDebounceTimer=setTimeout(async()=>{this.searchTerm=t,await this.resetAndReload().catch(()=>{})},300)):(this.searchTerm=t,this.filteredItems=this.applySearchTerm(this.items),this.sortColumn?this.sort({emitItemsChanged:!1,pageNumber:1}):this.setPage(1),this.dispatchItemsChanged())}}get items(){return this.itemsBacker}set items(e){this.applyPagedItems(e)}applyPagedItems(e,t={}){const i=t.emitItemsChanged??!0,s=t.pageNumber??this.pageNumber??1;this.itemsBacker=e,this.filteredItems=this.applySearchTerm(this.itemsBacker),this.sortColumn?this.sort({emitItemsChanged:!1,pageNumber:s}):this.setPage(s),i&&this.dispatchItemsChanged()}get fetchPage(){return this.fetchPageBacker}set fetchPage(e){this.fetchPageBacker=e,e&&this.hasUpdated&&this.loadPage(null).then(async()=>{await this.updateComplete,this.measurePinnedOffsets()}).catch(()=>{})}get isInfiniteMode(){return this.fetchPage!==null}get currentDataStateItems(){return this.isInfiniteMode?this.allLoadedItems:this.filteredItems}getCurrentSortField(){return this.sortColumn?this.sortColumn.sortField.length>0?this.sortColumn.sortField:this.sortColumn.fieldName:""}createDataStateDetail(e={}){const t=[...this.currentDataStateItems],i=e.cursor??null,s=e.isFirstPage??(this.isInfiniteMode?i===null:this.pageNumber<=1);return{items:t,itemCount:t.length,isFirstPage:s,cursor:i,nextCursor:this.nextCursor,hasRows:t.length>0,isEmpty:t.length===0,search:this.searchTerm,sortField:this.getCurrentSortField(),sortOrder:this.sortColumn?.sortOrder??""}}dispatchGridDataEvent(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}dispatchItemsChanged(e={}){this.dispatchGridDataEvent(j,this.createDataStateDetail(e))}setPage(e){const t=Math.ceil(this.filteredItems.length/this.pageSize);e>t&&(e=t),e<1&&(e=1),this.pageNumber=e;const i=(this.pageNumber-1)*this.pageSize;switch(this.displayedItems=this.filteredItems.slice(i,i+this.pageSize),this.allowPrevious=this.pageNumber>1,this.allowNext=t>this.pageNumber,t){case 0:this.footerMessage="No matching items";break;case 1:this.footerMessage=this.filteredItems.length<this.items.length?"Showing all filtered items":"Showing all items";break;default:this.footerMessage=`Showing page ${this.pageNumber} of ${t} pages`}}async loadPage(e){const t=this.fetchPage;if(!t||e!==null&&this.isLoadingPage)return;const i=++this.pageLoadVersion,s=e===null;let o=!1;this.isLoadingPage=!0,this.isLoadingFirstPage=s,s&&(this.nextCursor=null,this.hasMoreData=!1);const r={cursor:e,limit:this.pageSize,search:this.searchTerm,sortField:this.getCurrentSortField(),sortOrder:this.sortColumn?.sortOrder??""};this.dispatchGridDataEvent(L,this.createDataStateDetail({cursor:e,isFirstPage:s}));try{const n=await t(r);if(i!==this.pageLoadVersion)return;e===null?this.allLoadedItems=[...n.items]:this.allLoadedItems=[...this.allLoadedItems,...n.items],this.nextCursor=n.nextCursor,this.hasMoreData=n.nextCursor!==null,o=!0,this.dispatchGridDataEvent(M,this.createDataStateDetail({cursor:e,isFirstPage:s})),this.dispatchItemsChanged({cursor:e,isFirstPage:s})}catch(n){throw i===this.pageLoadVersion&&this.dispatchGridDataEvent(z,{...this.createDataStateDetail({cursor:e,isFirstPage:s}),error:n}),n}finally{if(i===this.pageLoadVersion){if(this.isLoadingPage=!1,this.isLoadingFirstPage=!1,s&&o){const n=this.virtualizerRef.value;if(n&&n.scrollTop>0)try{n.scrollTo({top:0})}catch{n.scrollTop=0}}await this.adjustInfiniteHeight()}}}async resetAndReload(){await this.loadPage(null)}onRangeChanged(e){this.isLoadingFirstPage||e.last>=this.allLoadedItems.length-5&&this.hasMoreData&&!this.isLoadingPage&&this.loadPage(this.nextCursor).catch(()=>{})}async adjustInfiniteHeight(){if(!this.isAdjustingHeight){this.isAdjustingHeight=!0;try{const e=this.virtualizerRef.value;e&&(e.style.minHeight=""),this.effectiveGridHeight=this.gridHeight,await this.updateComplete;const t=this.infiniteContainerRef.value,i=this.virtualizerRef.value;if(!t||this.hasMoreData)return;const o=this.gridHeaderRowRef.value?.offsetHeight??0;if(!i){const p=t.querySelector(".no-results");let f=0;p?f=o+p.offsetHeight:t.querySelectorAll(":scope > *").forEach(R=>f+=R.offsetHeight),f<t.offsetHeight&&(this.effectiveGridHeight=`${f}px`);return}const r=i.querySelectorAll(".grid-row");let n=0,a=!1;if(r.forEach(p=>{const f=p.offsetHeight;f===0&&(a=!0),n+=f}),r.length===0||a||n===0){this.pendingHeightRetry||(this.pendingHeightRetry=!0,this.observeForHeightRetry(i));return}const l=i.querySelectorAll(".grid-row :defined"),g=[];l.forEach(p=>{"updateComplete"in p&&g.push(p.updateComplete)}),g.length>0&&(await Promise.all(g),n=0,r.forEach(p=>{n+=p.offsetHeight}));const v=n+o,b=t.offsetHeight;v<b&&r.length>=this.allLoadedItems.length&&(i.style.minHeight=`${n}px`,this.effectiveGridHeight=`${v}px`),!this.hasMoreData&&!this.pendingHeightRetry&&(this.pendingHeightRetry=!0,setTimeout(()=>{this.pendingHeightRetry=!1;const p=this.infiniteContainerRef.value,f=this.virtualizerRef.value;if(!p||!f||this.hasMoreData)return;const O=this.gridHeaderRowRef.value?.offsetHeight??0,k=f.querySelectorAll(".grid-row");let C=0,D=!1;if(k.forEach(F=>{const H=F.offsetHeight;H===0&&(D=!0),C+=H}),k.length===0||D||C===0)return;const $=C+O;$<p.offsetHeight&&k.length>=this.allLoadedItems.length&&(f.style.minHeight=`${C}px`,this.effectiveGridHeight=`${$}px`)},100))}finally{this.isAdjustingHeight=!1}}}observeForHeightRetry(e){this.heightRetryObserver?.disconnect(),this.heightRetryObserver=new IntersectionObserver(t=>{if(!t.some(r=>r.isIntersecting))return;this.heightRetryObserver?.disconnect(),this.heightRetryObserver=null;let s=0;const o=()=>{this.pendingHeightRetry=!1,this.adjustInfiniteHeight(),this.pendingHeightRetry&&++s<5&&setTimeout(o,100)};requestAnimationFrame(()=>setTimeout(o,50))},{threshold:0}),this.heightRetryObserver.observe(e)}async sortOn(e){this.sortColumn===e?this.sortColumn.sortOrder=this.sortColumn.sortOrder=="asc"?"desc":"asc":(this.sortColumn=e,this.sortColumn.sortOrder="asc"),this.isInfiniteMode?await this.resetAndReload():this.sort()}sort(e={}){if(!this.sortColumn)return;const t=this.getCurrentSortField(),i=this.sortColumn.sortOrder==="asc"?1:-1,s=this.sortColumn.sortType,o=this.filteredItems.map((r,n)=>{const a=r[t]??"",l=s==="number"?Number(a):a.toString().toLowerCase();return{item:r,index:n,sortValue:l}});o.sort((r,n)=>r.sortValue<n.sortValue?-1*i:r.sortValue>n.sortValue?1*i:r.index-n.index),this.filteredItems=o.map(({item:r})=>r),this.setPage(e.pageNumber??1),(e.emitItemsChanged??!0)&&this.dispatchItemsChanged()}delete(e){if(this.isInfiniteMode){const t=this.allLoadedItems.filter(i=>!e(i));if(t.length===this.allLoadedItems.length)return;this.allLoadedItems=t,this.dispatchItemsChanged(),this.adjustInfiniteHeight()}else{const t=this.items.filter(i=>!e(i));if(t.length===this.items.length)return;this.items=t}}addOrReplace(e,t){if(this.isInfiniteMode){const i=this.allLoadedItems.findIndex(e);if(i>=0){const s=[...this.allLoadedItems];s[i]={...s[i],...t},this.allLoadedItems=s}else this.allLoadedItems=[...this.allLoadedItems,t];this.dispatchItemsChanged(),this.adjustInfiniteHeight()}else this.items.find(e)?this.items=this.items.map(s=>e(s)?{...s,...t}:s):this.items=[...this.items,t]}addInOrder(e,t,i){if(this.isInfiniteMode){const a=this.allLoadedItems.findIndex(e),l=[...this.allLoadedItems];if(a>=0)return l[a]={...l[a],...t},this.allLoadedItems=l,this.dispatchItemsChanged(),a;let g=0,v=l.length;for(;g<v;){const b=g+v>>>1;i(l[b],t)<0?g=b+1:v=b}return l.splice(g,0,t),this.allLoadedItems=l,this.dispatchItemsChanged(),this.adjustInfiniteHeight(),g}const s=this.items.findIndex(e),o=[...this.items];if(s>=0)return o[s]={...o[s],...t},this.items=o,s;let r=0,n=o.length;for(;r<n;){const a=r+n>>>1;i(o[a],t)<0?r=a+1:n=a}return o.splice(r,0,t),this.items=o,r}async scrollToIndex(e,t="center"){if(this.isInfiniteMode){await this.updateComplete;const i=this.virtualizerRef.value;if(!i)return;await i.updateComplete,await new Promise(s=>requestAnimationFrame(s)),await i.layoutComplete,i.scrollToIndex(e,t)}else{const i=Math.floor(e/this.pageSize)+1;this.setPage(i)}}clear(){if(this.isInfiniteMode){if(this.allLoadedItems.length===0&&this.nextCursor===null&&!this.hasMoreData)return;this.allLoadedItems=[],this.nextCursor=null,this.hasMoreData=!1,this.dispatchItemsChanged(),this.adjustInfiniteHeight()}else{if(this.items.length===0)return;this.items=[]}}async reload(){this.isInfiniteMode&&await this.resetAndReload()}computePinnedStyles(){return this.pinnedOffsets}measurePinnedOffsets(){this.pinnedOffsets=new Map,this.isInfiniteMode?this.computePinnedOffsetsFromWidths():this.measurePinnedOffsetsFromCells(),this.requestUpdate()}computePinnedOffsetsFromWidths(){const e=this.columnDefinitions.filter(r=>r.pin==="left"),t=this.columnDefinitions.filter(r=>r.pin==="right"),i=[];for(let r=0;r<e.length;r++){const n=e[r],a=i.length===0?"0px":`calc(${i.join(" + ")})`;this.pinnedOffsets.set(n,{position:"sticky",left:a,zIndex:`${e.length-r+1}`}),i.push(n.width||"0px")}const s=[],o=[...t].reverse();for(let r=0;r<o.length;r++){const n=o[r],a=s.length===0?"0px":`calc(${s.join(" + ")})`;this.pinnedOffsets.set(n,{position:"sticky",right:a,zIndex:`${o.length-r+1}`}),s.push(n.width||"0px")}}measurePinnedOffsetsFromCells(){const e=this.shadowRoot?.querySelectorAll("thead th");if(!e)return;const t=this.columnDefinitions.filter(a=>a.pin==="left"),i=this.columnDefinitions.filter(a=>a.pin==="right"),s=new Map;this.columnDefinitions.forEach((a,l)=>{e[l]&&s.set(a,e[l])});let o=0;for(let a=0;a<t.length;a++){const l=t[a];this.pinnedOffsets.set(l,{position:"sticky",left:`${o}px`,zIndex:`${t.length-a+1}`});const g=s.get(l);g&&(o+=g.offsetWidth)}let r=0;const n=[...i].reverse();for(let a=0;a<n.length;a++){const l=n[a];this.pinnedOffsets.set(l,{position:"sticky",right:`${r}px`,zIndex:`${n.length-a+1}`});const g=s.get(l);g&&(r+=g.offsetWidth)}}computeGridTemplateColumns(){return this.columnDefinitions.map(e=>e.width?e.grow?`minmax(${e.width}, 1fr)`:e.width:e.grow?"minmax(0, 1fr)":"auto").join(" ")}get hasGrowableColumns(){return this.columnDefinitions.some(e=>e.grow)}computePinnedColumnFlags(){const e=new Map,t=this.columnDefinitions.filter(r=>r.pin==="left"),i=this.columnDefinitions.filter(r=>r.pin==="right"),s=t[t.length-1],o=i[0];return this.columnDefinitions.forEach((r,n)=>{e.set(r,{beforePinnedRight:this.columnDefinitions[n+1]?.pin==="right",firstPinnedRight:o===r,lastPinnedLeft:s===r})}),e}renderCell(e,t){if(!e.fieldName)return c`<span></span>`;const i=e.textAlign??"left";return c`<span style="text-align: ${i};"> ${t[e.fieldName]} </span>`}attachWheelHandler(){const e=this.virtualizerRef.value;e&&!this.wheelHandlerAttached?(e.addEventListener("wheel",this.handleVirtualizerWheel,{passive:!1}),this.wheelHandlerAttached=!0):!e&&this.wheelHandlerAttached&&(this.wheelHandlerAttached=!1)}applySearchTerm(e){return this.searchTerm.length===0?e:e.filter(t=>{let i;return this.searchFields.length>0?i=this.searchFields.map(s=>t[s]):i=Object.values(t),i.some(s=>String(s).toLowerCase().includes(this.searchTerm))})}async firstUpdated(e){super.firstUpdated(e),this.headerButtonsSlot.value.assignedElements().length===0&&this.headerButtonsSlot.value.remove();for(const i of this.columnDefinitionsSlot.value.assignedElements())i.localName==="esp-grid-column"&&this.columnDefinitions.push(i);const t=this.columnDefinitions.find(i=>i.sortOrder!=="");t&&(this.sortColumn=t),this.isInfiniteMode?await this.loadPage(null).catch(()=>{}):this.dataUrl.length&&await this.loadDataUrl().catch(()=>{}),await this.updateComplete,this.measurePinnedOffsets()}updated(e){super.updated(e),this.isInfiniteMode&&this.attachWheelHandler()}async loadDataUrl(){this.dispatchGridDataEvent(L,this.createDataStateDetail({cursor:null,isFirstPage:!0}));try{const t=await fetch(this.dataUrl).then(i=>i.json());this.applyPagedItems(this.dataField?t[this.dataField]:t,{emitItemsChanged:!1}),this.dispatchGridDataEvent(M,this.createDataStateDetail({cursor:null,isFirstPage:!0})),this.dispatchItemsChanged({cursor:null,isFirstPage:!0})}catch(t){throw this.dispatchGridDataEvent(z,{...this.createDataStateDetail({cursor:null,isFirstPage:!0}),error:t}),t}}disconnectedCallback(){super.disconnectedCallback();const e=this.virtualizerRef.value;e&&e.removeEventListener("wheel",this.handleVirtualizerWheel),this.wheelHandlerAttached=!1,this.heightRetryObserver?.disconnect(),this.heightRetryObserver=null}renderSortIcons(){return c`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="sort-ascending"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 6l7 0" />
        <path d="M4 12l7 0" />
        <path d="M4 18l9 0" />
        <path d="M15 9l3 -3l3 3" />
        <path d="M18 6l0 12" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="sort-descending"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 6l9 0" />
        <path d="M4 12l7 0" />
        <path d="M4 18l7 0" />
        <path d="M15 15l3 3l3 -3" />
        <path d="M18 6l0 12" />
      </svg>
    `}headerClasses(e,t){const i=t.get(e);return{"is-sortable":e.sortable,"sorted-asc":this.sortColumn===e&&e.sortOrder=="asc","sorted-desc":this.sortColumn===e&&e.sortOrder=="desc","align-right":e.textAlign==="right","align-center":e.textAlign==="center","pinned-left":e.pin==="left","pinned-right":e.pin==="right","pinned-left-last":i?.lastPinnedLeft??!1,"pinned-right-first":i?.firstPinnedRight??!1,"before-pinned-right":i?.beforePinnedRight??!1}}cellClasses(e,t){const i=t.get(e);return{"pinned-left":e.pin==="left","pinned-right":e.pin==="right","pinned-left-last":i?.lastPinnedLeft??!1,"pinned-right-first":i?.firstPinnedRight??!1,"before-pinned-right":i?.beforePinnedRight??!1}}render(){const e=this.computePinnedStyles(),t=this.computePinnedColumnFlags();return c`
      <slot ${y(this.columnDefinitionsSlot)}></slot>

      <div class="header-controls">
        <esp-input fieldName="filter" @value-changed=${this.handleSearch}> ${N} </esp-input>
        <slot name="header-buttons" ${y(this.headerButtonsSlot)}></slot>
      </div>

      ${this.isInfiniteMode?this.renderInfiniteMode(e,t):this.renderPagedMode(e,t)}
    `}renderPagedMode(e,t){return c`
      <div class="table-scroll-container">
        <table class="esp-grid" @click=${this.handleGridClick}>
          <thead>
            <tr>
              ${this.columnDefinitions.map(i=>{const s=e.get(i)??{};return c`<th
                  class=${x(this.headerClasses(i,t))}
                  scope="col"
                  style=${P({...i.width?{width:i.width}:{},...s})}
                  @click=${o=>{i.sortable&&this.sortOn(i).catch(()=>{}),o.preventDefault()}}
                >
                  <div>
                    <span>${i.header}</span>
                    ${this.renderSortIcons()}
                  </div>
                </th>`})}
            </tr>
          </thead>
          <tbody>
            ${this.displayedItems.map((i,s)=>c`<tr data-row-index=${s}>
                  ${this.columnDefinitions.map(o=>{const r=e.get(o)??{};return c`<td
                      class=${x(this.cellClasses(o,t))}
                      style=${P({textAlign:o.textAlign||"left",...o.width?{width:o.width}:{},...r})}
                    >
                      ${o.template?o.template(i):c`${this.renderCell(o,i)}`}
                    </td>`})}
                </tr>`)}
          </tbody>
        </table>
      </div>

      <div id="footer-controls">
        <esp-button
          icon-only
          .disabled=${!this.allowPrevious}
          @clicked=${i=>{this.setPage(this.pageNumber-1),i.stopPropagation()}}
        >
          ${T}
        </esp-button>
        <h4>${this.footerMessage}</h4>
        <esp-button
          icon-only
          .disabled=${!this.allowNext}
          @clicked=${i=>{this.setPage(this.pageNumber+1),i.stopPropagation()}}
        >
          ${G}
        </esp-button>
      </div>
    `}renderInfiniteMode(e,t){const i=this.computeGridTemplateColumns(),s=this.hasGrowableColumns?"":"width: max-content; min-width: 100%;",o=(r,n)=>this.renderVirtualRow(r,n,e,t,i);return c`
      <div
        class="infinite-scroll-container"
        ${y(this.infiniteContainerRef)}
        style="height: ${this.effectiveGridHeight||this.gridHeight}"
        @click=${this.handleGridClick}
      >
        <div
          class="grid-header-row"
          ${y(this.gridHeaderRowRef)}
          style="${s} grid-template-columns: ${i}"
        >
          ${this.columnDefinitions.map(r=>{const n=e.get(r)??{};return c`<div
              class=${x({"grid-header-cell":!0,...this.headerClasses(r,t)})}
              style=${P(n)}
              @click=${a=>{r.sortable&&this.sortOn(r).catch(()=>{}),a.preventDefault()}}
            >
              <div>
                <span>${r.header}</span>
                ${this.renderSortIcons()}
              </div>
            </div>`})}
        </div>
        <div class="grid-body" aria-busy=${this.isLoadingFirstPage?"true":"false"}>
          ${this.allLoadedItems.length===0&&!this.isLoadingFirstPage?c`<div class="no-results">No results found</div>`:c`<lit-virtualizer
                ${y(this.virtualizerRef)}
                scroller
                .items=${this.allLoadedItems}
                .renderItem=${o}
                @rangeChanged=${r=>this.onRangeChanged(r)}
                @scroll=${this.syncHeaderScroll}
              ></lit-virtualizer>`}
          ${this.isLoadingFirstPage?c`<div class="loading-overlay" role="status" aria-live="polite">
                <div class="loading-overlay-content">
                  <span class="loading-indicator" aria-hidden="true"></span>
                  <span>Loading results...</span>
                </div>
              </div>`:c``}
        </div>
      </div>
    `}renderVirtualRow(e,t,i,s,o){if(!e)return c``;const r={"grid-row":!0,"grid-row-odd":t%2===0,"grid-row-even":t%2!==0},n=this.hasGrowableColumns?"":"width: max-content;";return c`<div
      class=${x(r)}
      style="${n} grid-template-columns: ${o}"
      data-row-index=${t}
    >
      ${this.columnDefinitions.map(a=>{const l=i.get(a)??{};return c`<div
          class=${x({"grid-cell":!0,...this.cellClasses(a,s)})}
          style=${P({textAlign:a.textAlign||"left",...l})}
        >
          ${a.template?a.template(e):c`${this.renderCell(a,e)}`}
        </div>`})}
    </div>`}};d.styles=[...S.styles,E`
      :host {
        display: block;
        overflow: hidden;
        border: var(--esp-grid-border-outer, 2px solid var(--esp-color-border));
        border-radius: var(--esp-size-border-radius);
        background-color: var(--esp-grid-background, var(--esp-color-layer-1));
      }

      .header-controls {
        display: flex;
        align-items: center;
        gap: var(--esp-size-tiny-to-small);
        padding: var(--esp-size-tiny-to-small);
        border-bottom: var(--esp-grid-border-inner, 2px solid var(--esp-color-border));

        esp-input {
          flex: 1;
        }

        ::slotted(esp-button) {
          height: calc(var(--esp-size-font) + var(var(--esp-size-padding) * 2));
        }
      }

      .table-scroll-container {
        overflow-x: auto;
      }

      #footer-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: var(--esp-size-padding);
        padding: var(--esp-size-tiny-to-small);
        border-top: var(--esp-grid-border-inner, 2px solid var(--esp-color-border));
      }

      

      .esp-grid {
        color: var(--esp-grid-text-color, var(--esp-color-text));
        width: 100%;
        border-spacing: 0;
        background-color: var(--esp-grid-header-background, var(--esp-color-layer-4));

        a {
          color: var(--esp-grid-link-color, var(--esp-color-link));
          font-weight: bold;

          &:hover {
            text-decoration-color: var(--esp-grid-link-hover-color, var(--esp-color-link-hover));
            text-decoration-thickness: 3px;
          }
        }

        thead {
          th {
            white-space: nowrap;
            border-bottom: var(--esp-grid-border-inner, 2px solid var(--esp-color-border));

            div {
              display: grid;
              grid-template-columns: min-content min-content;
              gap: var(--esp-size-tiny-to-small);
              align-items: center;

              svg,
              span {
                grid-row: 1;
              }
            }

            > div > svg {
              display: none;
              height: calc(1.2 * var(--esp-type-normal));
            }
          }

          th.is-sortable {
            cursor: pointer;

            &:hover {
              background-color: var(--esp-grid-header-active-background, var(--esp-color-layer-3));
            }
          }

          th.sorted-asc {
            background-color: var(--esp-grid-header-active-background, var(--esp-color-layer-3));
            > div > svg.sort-ascending {
              display: inline;
            }
          }

          th.sorted-desc {
            background-color: var(--esp-grid-header-active-background, var(--esp-color-layer-3));
            > div > svg.sort-descending {
              display: inline;
            }
          }

          th.align-right > div {
            justify-content: end;

            > svg {
              grid-column: 1;
            }
            span {
              grid-column: 2;
            }
          }

          
          th.pinned-left,
          th.pinned-right {
            background-color: var(--esp-grid-header-background, var(--esp-color-layer-4));
          }

          th.pinned-left.sorted-asc,
          th.pinned-left.sorted-desc,
          th.pinned-right.sorted-asc,
          th.pinned-right.sorted-desc,
          th.pinned-left.is-sortable:hover,
          th.pinned-right.is-sortable:hover {
            background-color: var(--esp-grid-header-active-background, var(--esp-color-layer-3));
          }
        }

        thead th,
        tbody td {
          padding: var(--esp-size-tiny-to-small);
        }

        td > h3 {
          margin: 0;
        }

        td > span {
          display: block;
        }

        th,
        td {
          border-right: 1px solid var(--esp-grid-cell-border-color, var(--esp-color-layer-3));

          &:last-child {
            border-right: none;
          }

          &.before-pinned-right {
            border-right: none;
          }
        }

        
        td.pinned-left,
        td.pinned-right {
          background-color: inherit;
        }

        
        th.pinned-right,
        td.pinned-right {
          border-left: 1px solid var(--esp-grid-cell-border-color, var(--esp-color-layer-3));
        }

        
        th.pinned-left-last,
        td.pinned-left-last {
          box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
        }

        th.pinned-right-first,
        td.pinned-right-first {
          box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
        }

        tbody {
          esp-button {
            --esp-button-padding: calc(var(--esp-size-tiny) / 3) !important;
          }

          tr:nth-child(odd) {
            background-color: var(--esp-grid-row-background-odd, var(--esp-color-layer-1));
          }

          tr:nth-child(even) {
            background-color: var(--esp-grid-row-background-even, var(--esp-color-layer-2));
          }

          tr:hover {
            background-color: var(--esp-grid-row-hover-background, var(--esp-color-layer-3));

            td {
              border-color: var(--esp-grid-row-hover-border-color, var(--esp-color-layer-4));
            }
          }
        }
      }

      

      .infinite-scroll-container {
        display: flex;
        flex-direction: column;
        color: var(--esp-grid-text-color, var(--esp-color-text));

        a {
          color: var(--esp-grid-link-color, var(--esp-color-link));
          font-weight: bold;

          &:hover {
            text-decoration-color: var(--esp-grid-link-hover-color, var(--esp-color-link-hover));
            text-decoration-thickness: 3px;
          }
        }

        esp-button {
          --esp-button-padding: calc(var(--esp-size-tiny) / 3) !important;
        }
      }

      .grid-header-row {
        display: grid;
        background-color: var(--esp-grid-header-background, var(--esp-color-layer-4));
        border-bottom: var(--esp-grid-border-inner, 2px solid var(--esp-color-border));
        overflow: hidden;
        flex-shrink: 0;
      }

      .grid-body {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        min-height: 0;
      }

      lit-virtualizer {
        flex: 1;
        min-height: 0;
        overflow: auto;
      }

      .no-results {
        padding: var(--esp-size-small);
        text-align: center;
        color: var(--esp-grid-text-color, var(--esp-color-text));
        font-style: italic;
      }

      .loading-overlay {
        position: absolute;
        top: var(--esp-size-small);
        left: 50%;
        transform: translateX(-50%);
        z-index: 2;
        pointer-events: none;
      }

      .loading-overlay-content {
        display: inline-flex;
        align-items: center;
        gap: var(--esp-size-tiny-to-small);
        padding: var(--esp-size-tiny) var(--esp-size-small);
        border: 1px solid var(--esp-grid-cell-border-color, var(--esp-color-layer-3));
        border-radius: 999px;
        background-color: var(--esp-grid-header-background, var(--esp-color-layer-4));
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
      }

      .loading-indicator {
        width: 1rem;
        height: 1rem;
        border: 2px solid var(--esp-grid-cell-border-color, var(--esp-color-layer-3));
        border-top-color: var(--esp-color-primary);
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      .grid-header-cell {
        padding: var(--esp-size-tiny-to-small);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-width: 0;
        border-right: 1px solid var(--esp-grid-cell-border-color, var(--esp-color-layer-3));

        &:last-child {
          border-right: none;
        }

        &.before-pinned-right {
          border-right: none;
        }

        div {
          display: grid;
          grid-template-columns: min-content min-content;
          gap: var(--esp-size-tiny-to-small);
          align-items: center;

          svg,
          span {
            grid-row: 1;
          }
        }

        > div > svg {
          display: none;
          height: calc(1.2 * var(--esp-type-normal));
        }

        &.is-sortable {
          cursor: pointer;

          &:hover {
            background-color: var(--esp-grid-header-active-background, var(--esp-color-layer-3));
          }
        }

        &.sorted-asc {
          background-color: var(--esp-grid-header-active-background, var(--esp-color-layer-3));
          > div > svg.sort-ascending {
            display: inline;
          }
        }

        &.sorted-desc {
          background-color: var(--esp-grid-header-active-background, var(--esp-color-layer-3));
          > div > svg.sort-descending {
            display: inline;
          }
        }

        &.align-right > div {
          justify-content: end;

          > svg {
            grid-column: 1;
          }
          span {
            grid-column: 2;
          }
        }

        
        &.pinned-left,
        &.pinned-right {
          background-color: var(--esp-grid-header-background, var(--esp-color-layer-4));
        }

        &.pinned-left.sorted-asc,
        &.pinned-left.sorted-desc,
        &.pinned-right.sorted-asc,
        &.pinned-right.sorted-desc,
        &.pinned-left.is-sortable:hover,
        &.pinned-right.is-sortable:hover {
          background-color: var(--esp-grid-header-active-background, var(--esp-color-layer-3));
        }

        &.pinned-right {
          border-left: 1px solid var(--esp-grid-cell-border-color, var(--esp-color-layer-3));
        }

        &.pinned-left-last {
          box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
        }

        &.pinned-right-first {
          box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
        }
      }

      .grid-row {
        display: grid;
        min-width: 100%;
      }

      .grid-cell {
        padding: var(--esp-size-tiny-to-small);
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-right: 1px solid var(--esp-grid-cell-border-color, var(--esp-color-layer-3));

        &:last-child {
          border-right: none;
        }

        &.before-pinned-right {
          border-right: none;
        }

        > span {
          display: block;
        }

        > h3 {
          margin: 0;
        }

        
        .grid-row-odd > & {
          background-color: var(--esp-grid-row-background-odd, var(--esp-color-layer-1));
        }

        .grid-row-even > & {
          background-color: var(--esp-grid-row-background-even, var(--esp-color-layer-2));
        }

        .grid-row:hover > & {
          background-color: var(--esp-grid-row-hover-background, var(--esp-color-layer-3));
          border-color: var(--esp-grid-row-hover-border-color, var(--esp-color-layer-4));
        }

        
        &.pinned-left,
        &.pinned-right {
          z-index: 1;
        }

        .grid-row-odd > &.pinned-left,
        .grid-row-odd > &.pinned-right {
          background-color: var(--esp-grid-row-background-odd, var(--esp-color-layer-1));
        }

        .grid-row-even > &.pinned-left,
        .grid-row-even > &.pinned-right {
          background-color: var(--esp-grid-row-background-even, var(--esp-color-layer-2));
        }

        .grid-row:hover > &.pinned-left,
        .grid-row:hover > &.pinned-right {
          background-color: var(--esp-grid-row-hover-background, var(--esp-color-layer-3));
        }

        &.pinned-right {
          border-left: 1px solid var(--esp-grid-cell-border-color, var(--esp-color-layer-3));
        }

        &.pinned-left-last {
          box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
        }

        &.pinned-right-first {
          box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1);
        }
      }
    `],h([u()],d.prototype,"allowNext",void 0),h([u()],d.prototype,"allowPrevious",void 0),h([u()],d.prototype,"columnDefinitions",void 0),h([u()],d.prototype,"displayedItems",void 0),h([u()],d.prototype,"pageNumber",void 0),h([u()],d.prototype,"footerMessage",void 0),h([u()],d.prototype,"allLoadedItems",void 0),h([u()],d.prototype,"hasMoreData",void 0),h([u()],d.prototype,"isLoadingFirstPage",void 0),h([u()],d.prototype,"isLoadingPage",void 0),h([u()],d.prototype,"effectiveGridHeight",void 0),h([m({attribute:"data-field",type:String})],d.prototype,"dataField",void 0),h([m({attribute:"data-url",type:String})],d.prototype,"dataUrl",void 0),h([m({type:Array})],d.prototype,"items",null),h([m({attribute:"page-size",type:Number})],d.prototype,"pageSize",void 0),h([m({attribute:"grid-height",type:String})],d.prototype,"gridHeight",void 0),h([m({attribute:"search-fields",type:Array})],d.prototype,"searchFields",void 0),h([m({attribute:!1})],d.prototype,"fetchPage",null),d=h([A("esp-grid")],d);export{d as EspalierGrid,j as GRID_ITEMS_CHANGED_EVENT,z as GRID_LOAD_ERROR_EVENT,L as GRID_LOAD_START_EVENT,M as GRID_LOAD_SUCCESS_EVENT};
