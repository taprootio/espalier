var a=function(h,e,r,o){var t=arguments.length,i=t<3?e:o===null?o=Object.getOwnPropertyDescriptor(e,r):o,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")i=Reflect.decorate(h,e,r,o);else for(var l=h.length-1;l>=0;l--)(s=h[l])&&(i=(t<3?s(i):t>3?s(e,r,i):s(e,r))||i);return t>3&&i&&Object.defineProperty(e,r,i),i};import{css as E,html as w,nothing as m}from"lit";import{customElement as C,property as p,state as g}from"lit/decorators.js";import{classMap as f}from"lit/directives/class-map.js";import{unsafeHTML as v}from"lit/directives/unsafe-html.js";import{createRef as d,ref as c}from"lit/directives/ref.js";import{EspalierElementBase as b}from"../shared/esp-element-base.js";import{getEspBus as D}from"../shared/bus-events.js";import{normalizePath as S,pathStartsWithSegment as T,pathsMatch as y}from"../shared/path-matching.js";import{SwipeRevealController as O}from"./swipe-reveal-controller.js";import"./esp-menu-item.js";import"./esp-menu-group.js";import{EspalierMenuItem as x}from"./esp-menu-item.js";import{EspalierMenuGroup as u}from"./esp-menu-group.js";let n=class extends b{constructor(){super(),this.itemsSlot=d(),this.railRef=d(),this.scrimRef=d(),this.drawerRef=d(),this.bus=D(),this.closeTransitionTimer=null,this.drawerGroupOpenOverrides=new Map,this._sliding=!1,this.mode="horizontal",this.overflow="auto",this.side="left",this.ariaLabel=null,this.autoExpand=!1,this.drawerOpen=!1,this.drawerTransitioning=!1,this.drawerTrigger=null,this.getWidth=()=>{const e=this.railRef.value;return e?Math.max(e.scrollWidth,e.clientWidth):-1},this.onDrawerTransitionEnd=()=>{this.closeTransitionTimer&&(clearTimeout(this.closeTransitionTimer),this.closeTransitionTimer=null),this.drawerTransitioning=!1,this.drawerOpen||(this.hideDrawerPopover(),this.drawerGroupOpenOverrides.clear())},this.swipeController=new O(this,this.side),this.swipeController.enabled=!1}get sliding(){return this._sliding}set sliding(e){const r=this._sliding;this._sliding=e,this.syncSwipeEnabled(),this.propagateToItems(),this.requestUpdate("sliding",r)}get collapsed(){return this.drawerActive}set collapsed(e){e?this.mode="drawer":this.mode==="drawer"&&(this.mode="vertical")}get drawerSide(){return this.overflow==="right-drawer"?"right":this.overflow==="left-drawer"?"left":this.side}get drawerActive(){return this.mode==="drawer"||this._sliding||this.overflow==="left-drawer"||this.overflow==="right-drawer"}get railMode(){return this.mode==="horizontal"?"horizontal":"vertical"}connectedCallback(){super.connectedCallback(),this.getAttribute("slot")==="right"&&(this.side="right"),this.syncSwipeEnabled()}firstUpdated(e){super.firstUpdated(e),this.propagateToItems()}updated(e){super.updated(e),(e.has("mode")||e.has("overflow")||e.has("side"))&&(this.swipeController.direction=this.drawerSide,this.syncSwipeEnabled(),this.propagateToItems(),!this.drawerActive&&this.drawerOpen&&this.swipeController.close(!0)),this.autoExpand&&(e.has("autoExpand")||e.has("mode")&&this.mode!=="horizontal")?this.expandToCurrentPage():this.mode==="horizontal"&&e.has("mode")&&this.closeHorizontalTopLevelGroups()}openDrawer(e){this.drawerActive&&(e?this.drawerTrigger=e:this.drawerOpen||(this.drawerTrigger=null),this.swipeController.open())}closeDrawer(){this.swipeController.close(!0)}toggleDrawer(e){this.drawerOpen?this.closeDrawer():this.openDrawer(e)}toggleOpened(){this.toggleDrawer()}get isDrawerOpen(){return this.drawerOpen}syncSwipeEnabled(){this.swipeController.direction=this.drawerSide,this.swipeController.enabled=this.drawerActive}getAssignedChildren(){return this.itemsSlot.value?.assignedElements()??[]}propagateToItems(){const e=this.railMode;for(const r of this.getAssignedChildren())r instanceof x?(r.mode=e,r.depth=0,r.touchDevice=this.swipeController.isTouch):r instanceof u&&(r.mode=e,r.depth=0,r.touchDevice=this.swipeController.isTouch)}handleSlotChange(){this.propagateToItems()}onSwipeRevealChanged(e){e!==this.drawerOpen&&(this.drawerOpen=e,e?(this.drawerGroupOpenOverrides.clear(),this.bus.publish("close-popovers",{}),this.updateComplete.then(()=>this.showDrawerPopover())):(this.drawerTransitioning=!0,this.updateComplete.then(()=>this.startCloseTransition()),requestAnimationFrame(()=>this.restoreDrawerTriggerFocus())),this.dispatchEvent(new CustomEvent(e?"drawer-opened":"drawer-closed",{bubbles:!0,composed:!0})))}showDrawerPopover(){const e=this.scrimRef.value,r=this.drawerRef.value;if(!(!e||!r)){this.swipeController.drawerElement=r;try{e.showPopover(),r.showPopover()}catch{}r.getBoundingClientRect(),requestAnimationFrame(()=>{this.drawerTransitioning=!0,this.requestUpdate()})}}startCloseTransition(){if(!this.drawerRef.value){this.hideDrawerPopover();return}this.closeTransitionTimer&&clearTimeout(this.closeTransitionTimer),this.closeTransitionTimer=setTimeout(()=>{this.closeTransitionTimer=null,!this.drawerOpen&&this.drawerTransitioning&&this.onDrawerTransitionEnd()},400)}hideDrawerPopover(){const e=this.scrimRef.value,r=this.drawerRef.value;this.swipeController.drawerElement=null,r&&(r.style.cssText="");try{r?.hidePopover()}catch{}try{e?.hidePopover()}catch{}}restoreDrawerTriggerFocus(){const e=this.drawerTrigger;this.drawerTrigger=null,e?.isConnected&&e.focus({preventScroll:!0})}getAutoExpandedGroups(e=!0){const r=new Set;let o=null;for(const i of this.querySelectorAll("esp-menu-item")){const s=i.url||i.getAttribute("url");if(s&&y(s)){o=i;break}}if(!o)for(const i of this.querySelectorAll("esp-menu-group")){const s=i.url||i.getAttribute("url");if(s&&y(s)){o=i;break}}if(!o&&e){for(const i of this.querySelectorAll("esp-menu-group"))i.parentElement===this&&r.add(i);return r}if(!o)return r;o instanceof u&&r.add(o);let t=o.parentElement;for(;t&&t!==this;)t instanceof u&&r.add(t),t=t.parentElement;return r}isHorizontalTopLevelGroup(e){return e.mode==="horizontal"&&e.depth===0}groupUrlPrefixMatches(e){return T(location.pathname,e.urlPrefix)}groupPathMatches(e){if(this.groupUrlPrefixMatches(e))return!0;const r=e.url||e.getAttribute("url");return r?T(location.pathname,S(r)):!1}expandToCurrentPage(){const e=this.getAutoExpandedGroups(),r=this.querySelectorAll("esp-menu-group");for(const o of r)o.open=e.has(o)&&!this.isHorizontalTopLevelGroup(o)}closeHorizontalTopLevelGroups(){for(const e of this.querySelectorAll("esp-menu-group"))this.isHorizontalTopLevelGroup(e)&&(e.open=!1)}getDrawerAutoExpandedGroups(){return this.getAutoExpandedGroups(!1)}collectDrawerNodes(e,r=this.getDrawerAutoExpandedGroups()){const o=[];for(const t of e)if(t instanceof x){const i=t.querySelector(":scope > svg, :scope > img");o.push({kind:"item",label:t.label,url:t.url,open:!1,icon:t.icon,iconHtml:i?.outerHTML||"",children:[],originalItem:t,originalGroup:null})}else if(t instanceof u){const i=t.querySelector(':scope > [slot="icon"]'),s=r.has(t)||this.groupPathMatches(t),l=this.drawerGroupOpenOverrides.get(t)??(t.open||s);o.push({kind:"group",label:t.label,url:t.url||"",open:l,icon:t.icon,iconHtml:i?.outerHTML||"",children:this.collectDrawerNodes(Array.from(t.children),r),originalItem:null,originalGroup:t})}return o}renderDrawerNode(e){return e.kind==="item"?w`<esp-menu-item
        label=${e.label}
        .url=${e.url}
        .icon=${e.icon}
        .mode=${"drawer"}
        @clicked=${()=>!e.url&&e.originalItem?this.handleDrawerItemClick(e.originalItem):void 0}
        >${v(e.iconHtml)}</esp-menu-item
      >`:w`<esp-menu-group
      label=${e.label}
      .url=${e.url}
      .icon=${e.icon}
      .mode=${"drawer"}
      ?open=${e.open}
      @esp-group-toggle=${r=>{e.originalGroup&&(this.drawerGroupOpenOverrides.set(e.originalGroup,r.detail.open),this.isHorizontalTopLevelGroup(e.originalGroup)||(e.originalGroup.open=r.detail.open))}}
    >
      ${e.iconHtml?v(e.iconHtml):m}
      ${e.children.map(r=>this.renderDrawerNode(r))}
    </esp-menu-group>`}handleDrawerItemClick(e){e.dispatchEvent(new CustomEvent("clicked",{detail:{},bubbles:!0,composed:!0})),this.swipeController.close(!0)}render(){const e=this.drawerOpen||this.drawerTransitioning,r=this.drawerActive&&(this.mode==="drawer"||this._sliding||this.overflow==="left-drawer"||this.overflow==="right-drawer"),o={rail:!0,horizontal:this.railMode==="horizontal",vertical:this.railMode==="vertical",wrap:this.overflow==="wrap",scroll:this.overflow==="scroll","drawer-forced":this.drawerActive},t={drawer:!0,"drawer-left":this.drawerSide==="left","drawer-right":this.drawerSide==="right",transitioning:this.drawerTransitioning,open:this.drawerOpen},i=e?this.collectDrawerNodes(this.getAssignedChildren()):[],s=this.ariaLabel??"Navigation";return w`
      <nav
        ${c(this.railRef)}
        class=${f(o)}
        aria-label=${s}
        ?hidden=${r}
      >
        <slot ${c(this.itemsSlot)} @slotchange=${this.handleSlotChange}></slot>
      </nav>
      <div
        ${c(this.scrimRef)}
        class=${f({scrim:!0,open:this.drawerOpen,transitioning:this.drawerTransitioning})}
        popover="manual"
      ></div>
      <nav
        ${c(this.drawerRef)}
        class=${f(t)}
        aria-label=${s}
        popover="manual"
        @transitionend=${this.onDrawerTransitionEnd}
      >
        ${e?i.map(l=>this.renderDrawerNode(l)):m}
      </nav>
    `}};n.styles=[...b.styles,E`
      :host {
        display: block;
        min-width: 0;
      }

      .rail {
        min-width: 0;
      }

      .rail[hidden] {
        display: none !important;
      }

      .rail.horizontal {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: var(--esp-menu-horizontal-justify-content, flex-start);
        height: 100%;
        width: 100%;
        min-width: 0;
        overflow: visible;
      }

      .rail.horizontal.wrap {
        flex-wrap: wrap;
        height: auto;
      }

      .rail.horizontal.scroll {
        overflow-x: auto;
        overflow-y: visible;
        scrollbar-width: thin;
      }

      .rail.vertical {
        position: relative;
        display: flex;
        flex-direction: column;
        width: min-content;
        max-height: calc(100dvh - var(--esp-menu-top-offset, 0px));
        overflow-y: auto;
        scrollbar-width: thin;
        background-color: var(--esp-menu-background, var(--esp-color-layer-1));
        border-bottom: 1px solid var(--esp-menu-border-color, var(--esp-color-border));
        box-shadow: 2px 0 6px -2px var(--esp-color-shadow);
      }

      .scrim,
      .drawer {
        margin: 0;
        padding: 0;
        border: none;
        background: none;
        inset: unset;
      }

      .scrim:not(:popover-open),
      .drawer:not(:popover-open) {
        display: none;
      }

      .scrim {
        position: fixed;
        top: var(--esp-menu-top-offset, 0px);
        left: 0;
        right: 0;
        bottom: 0;
        background: var(--esp-menu-scrim-color, oklch(from var(--esp-color-shadow) l c h / 0.3));
        opacity: 0;
        user-select: none;
        -webkit-user-select: none;
        touch-action: none;
      }

      .scrim.transitioning {
        transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .scrim.open {
        opacity: 1;
      }

      .drawer {
        position: fixed;
        top: var(--esp-menu-top-offset, 0px);
        width: var(--esp-menu-drawer-width, min(22rem, 86vw));
        max-width: 100vw;
        height: calc(100% - var(--esp-menu-top-offset, 0px));
        display: flex;
        flex-direction: column;
        background-color: var(--esp-menu-background, var(--esp-color-layer-1));
        overflow: hidden scroll;
        scrollbar-width: none;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
        touch-action: pan-y;
        box-shadow: var(--esp-menu-drawer-shadow, 2px 0 8px var(--esp-color-shadow));
        will-change: transform;
      }

      .drawer > * {
        flex-shrink: 0;
      }

      .drawer.transitioning {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .drawer-left {
        left: 0;
        transform: translateX(-100%);
      }

      .drawer-right {
        right: 0;
        transform: translateX(100%);
      }

      .drawer.open {
        transform: translateX(0);
      }

      @media (prefers-reduced-motion: reduce) {
        .scrim.transitioning,
        .drawer.transitioning {
          transition: none;
        }
      }
    `],a([p({type:String,reflect:!0})],n.prototype,"mode",void 0),a([p({type:String,reflect:!0})],n.prototype,"overflow",void 0),a([p({type:String,reflect:!0})],n.prototype,"side",void 0),a([p({attribute:"aria-label",type:String})],n.prototype,"ariaLabel",void 0),a([p({type:Boolean,attribute:"auto-expand"})],n.prototype,"autoExpand",void 0),a([p({type:Boolean})],n.prototype,"sliding",null),a([p({type:Boolean})],n.prototype,"collapsed",null),a([g()],n.prototype,"drawerOpen",void 0),a([g()],n.prototype,"drawerTransitioning",void 0),n=a([C("esp-menu")],n);export{n as EspalierMenu};
