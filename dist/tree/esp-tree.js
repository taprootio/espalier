var d=function(c,e,t,i){var s=arguments.length,o=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,r;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(c,e,t,i);else for(var a=c.length-1;a>=0;a--)(r=c[a])&&(o=(s<3?r(o):s>3?r(e,t,o):r(e,t))||o);return s>3&&o&&Object.defineProperty(e,t,o),o};import{css as T,html as p,nothing as u}from"lit";import{customElement as D,property as h,state as k}from"lit/decorators.js";import{classMap as v}from"lit/directives/class-map.js";import{createRef as $,ref as S}from"lit/directives/ref.js";import{unsafeHTML as R}from"lit/directives/unsafe-html.js";import{EspalierElementBase as z}from"../shared/esp-element-base.js";import{FormFieldController as F}from"../shared/form-field-controller.js";import{getIconHrefForHost as M}from"../shared/intent-values.js";import{caretRight as L}from"../shared/svgs/caret-right.js";import{renderSpriteIcon as E}from"../shared/svgs/render-sprite-icon.js";import"../box/esp-box.js";import"../action-menu/esp-action-menu.js";import"../button/esp-button.js";import"../dialog/esp-dialog.js";import"../form-item/esp-form-item.js";import"../info/esp-info.js";import"../input/esp-input.js";import"./esp-tree-item.js";import{EspalierTreeItem as P}from"./esp-tree-item.js";const B="A branch with that name already exists here.",q="Enter a name for the new branch.",U=500,G={edit:"esp-tree-edit",delete:"esp-tree-delete","move-up":"esp-tree-move-up","move-down":"esp-tree-move-down",cut:"esp-tree-cut","paste-child":"esp-tree-paste-child"},V={edit:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
    <path d="M16 5l3 3" />
  </svg>`,delete:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 7h16" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
  </svg>`,"move-up":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 5v14" />
    <path d="M18 11l-6 -6" />
    <path d="M6 11l6 -6" />
  </svg>`,"move-down":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 5v14" />
    <path d="M18 13l-6 6" />
    <path d="M6 13l6 6" />
  </svg>`,cut:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M4 7m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M4 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
    <path d="M6 7l12 10" />
    <path d="M6 17l5.5 -4.5" />
    <path d="M13.5 10.5l4.5 -3.5" />
  </svg>`,"paste-child":`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-1" />
    <path d="M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2" />
    <path d="M19 10v6" />
    <path d="M16 13h6" />
  </svg>`,menu:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 10a2 2 0 1 1 0 4a2 2 0 0 1 0 -4z" />
    <path d="M12 10a2 2 0 1 1 0 4a2 2 0 0 1 0 -4z" />
    <path d="M19 10a2 2 0 1 1 0 4a2 2 0 0 1 0 -4z" />
  </svg>`};function A(c,e){return p`<span
    slot=${e??u}
    class="tree-action-icon"
    aria-hidden="true"
    focusable="false"
  >
    ${R(V[c])}
  </span>`}function N(c){return c.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function H({parentPath:c,segment:e,rootPath:t}){return e?!c||c===t?t.endsWith("/")?`${t}${e}`:`${t}/${e}`:c.endsWith("/")?`${c}${e}`:`${c}/${e}`:c||t}let n=class extends z{constructor(){super(...arguments),this.internals=this.attachInternals(),this.formCtrl=new F({host:this,internals:this.internals,getFormValue:()=>this.value?this.value:null,getValidity:()=>this.required&&!this.value?{flags:{valueMissing:!0},message:this.requiredMessage||"Please select an option."}:null,onReset:()=>{this.value=this._defaultValue},onRestore:e=>{this.value=e},onDisabled:e=>{this.disabled=e}}),this.nodes=[],this.value="",this.name="",this.required=!1,this.requiredMessage="",this.disabled=!1,this.allowGraft=!1,this.rootLabel="/",this.rootPath="/",this.rootSelectable=!0,this.label="",this.graftError=null,this.buildPath=H,this.normalizeGraftSegment=({raw:e})=>N(e),this.keepExpanded=!1,this.expandIcon="",this.collapseIcon="",this._itemsSlot=$(),this._graftInputRef=$(),this._graftDialogRef=$(),this._slottedIds=new WeakMap,this._nextSlottedId=0,this._model=[],this._rowIndex=new Map,this._pathIndex=new Map,this._slottedNodes=[],this._lazyLoaded=new Map,this._grafted=new Map,this._expanded=new Set,this._loading=new Set,this._generation=0,this._defaultValue="",this._pendingFocus=!1,this._pendingScrollId=null,this._pendingGraftFocus=!1,this._nextGraftId=0,this._typeBuffer="",this._typeTimer=null,this._activeId=null,this._selectedId=null,this._graftParentId=null,this._graftValue="",this._graftErrorInternal=null}willUpdate(e){super.willUpdate(e);const t=!this.hasUpdated||e.has("nodes")||e.has("rootLabel")||e.has("rootPath")||e.has("rootSelectable")||e.has("buildPath");t&&(this.hasUpdated&&this._generation++,this._rebuildModel(),this._reconcileState()),e.has("value")?this._reconcileSelectionFromValue():t&&this._reconcileSelectionFromModel(),e.has("value")&&this.hasUpdated&&this.formCtrl.syncValue(),(t||e.has("value"))&&this._revealSelectedValue()}firstUpdated(e){super.firstUpdated(e),this._defaultValue=this.value,this.childElementCount>0&&this._onSlotChange(),this.formCtrl.syncValueSilently()}updated(e){if(super.updated(e),this._pendingFocus&&this._activeId&&(this._pendingFocus=!1,this._rowEl(this._activeId)?.focus({preventScroll:!0})),this._pendingGraftFocus&&(this._pendingGraftFocus=!1,this._graftInputRef.value?.focus()),this._syncGuidePaths(),this._pendingScrollId){const t=this._pendingScrollId;this._pendingScrollId=null,this._scrollRowIntoView(t)}}formResetCallback(){this.formCtrl.handleFormReset()}formStateRestoreCallback(e){this.formCtrl.handleFormStateRestore(e)}formDisabledCallback(e){this.formCtrl.handleFormDisabled(e)}validate(){this.formCtrl.validate()}checkValidity(){return this.formCtrl.checkValidity()}focus(){if(this.disabled)return;const e=this._visibleRows(),t=this._currentActive(e);t&&this._rowEl(t)?.focus()}setGraftError(e){this.graftError=e&&e.length>0?e:null}_rebuildModel(){const e=this.nodes.length?this.nodes:this._slottedNodes,t=this.rootPath||"/",i={id:"__root",segment:"",label:this.rootLabel||t,selectable:this.rootSelectable,hasChildren:!0},s=new Set(e.map(l=>l.segment.toLowerCase())),o=(this._grafted.get(i.id)??[]).filter(l=>!s.has(l.segment.toLowerCase())),r=e===this._slottedNodes,a=[...this._buildChildren(e,t,2,!1,i,r),...this._buildChildren(o,t,2,!0,i,!0)];this._model=[{id:i.id,segment:i.segment,label:i.label??t,icon:"",selectable:this.rootSelectable,editable:!1,deletable:!1,movableUp:!1,movableDown:!1,cuttable:!1,pasteChildTarget:!1,path:t,parentPath:"",parentId:"",level:1,hasChildren:a.length>0,loaded:!0,ephemeral:!1,root:!0,actions:[],children:a}],this._expanded.add(i.id)}_build(e,t,i,s,o,r=!1){if(!this._isUsableNodeId(e.id,r))return null;const a=this._buildPath(t,e.segment,e,o),l=e.children??[],g=e.hasChildren??!1,b=this._lazyLoaded.has(e.id),_=b?this._lazyLoaded.get(e.id)??[]:[],m=new Set([...l,..._].map(f=>f.segment.toLowerCase())),w=(this._grafted.get(e.id)??[]).filter(f=>!m.has(f.segment.toLowerCase())),y=[...this._buildChildren(l,a,i+1,s,e,r),...this._buildChildren(_,a,i+1,s,e,!1),...this._buildChildren(w,a,i+1,!0,e,!0)],I=e.label||e.segment;return{id:e.id,segment:e.segment,data:e.data,label:I,icon:e.icon??"",selectable:e.selectable!==!1,editable:e.editable===!0,deletable:e.deletable===!0,movableUp:e.movableUp===!0,movableDown:e.movableDown===!0,cuttable:e.cuttable===!0,pasteChildTarget:e.pasteChildTarget===!0,path:a,parentPath:t,parentId:o?.id??"",level:i,hasChildren:g||y.length>0,loaded:!g||b,ephemeral:s,root:!1,actions:this._actionsFor(e,I),children:y}}_actionsFor(e,t){const i=[],s=(o,r,a)=>{o&&i.push({kind:r,label:a,accessibleLabel:`${a} ${t}`})};return s(e.editable===!0,"edit","Edit"),s(e.deletable===!0,"delete","Delete"),s(e.movableUp===!0,"move-up","Move up"),s(e.movableDown===!0,"move-down","Move down"),s(e.cuttable===!0,"cut","Cut"),e.pasteChildTarget===!0&&i.push({kind:"paste-child",label:"Paste as child",accessibleLabel:`Paste as child of ${t}`}),i}_buildChildren(e,t,i,s,o,r=!1){return e.flatMap(a=>{const l=this._build(a,t,i,s,o,r);return l?[l]:[]})}_isUsableNodeId(e,t){return e?!t&&this._isGeneratedId(e)?(console.warn(`esp-tree: reserved node id "${e}" ignored.`),!1):!0:(console.warn("esp-tree: node without a stable id ignored."),!1)}_isGeneratedId(e){return e==="__root"||e.startsWith("__slotted:")||e.startsWith("__graft:")}_reconcileState(){this._rowIndex.clear(),this._pathIndex.clear();const e=t=>{for(const i of t){if(this._rowIndex.has(i.id)){console.warn(`esp-tree: duplicate node id "${i.id}" ignored.`);continue}this._pathIndex.has(i.path)?console.warn(`esp-tree: duplicate path "${i.path}" for ids "${this._pathIndex.get(i.path).id}" and "${i.id}".`):this._pathIndex.set(i.path,i),this._rowIndex.set(i.id,i),e(i.children)}};e(this._model);for(const t of[...this._expanded])this._rowIndex.has(t)||this._expanded.delete(t);for(const t of[...this._lazyLoaded.keys()])this._rowIndex.has(t)||this._lazyLoaded.delete(t);for(const t of[...this._grafted.keys()])this._rowIndex.has(t)||this._grafted.delete(t);this._activeId&&!this._rowIndex.has(this._activeId)&&(this._activeId=null)}_revealSelectedValue(){if(!this.value&&!this._selectedId)return;let e=this._selectedId?this._rowIndex.get(this._selectedId):void 0;for(e??=this.value?this._pathIndex.get(this.value):void 0;e&&e.parentId;)this._expanded.add(e.parentId),e=this._rowIndex.get(e.parentId)}_reconcileSelectionFromValue(){if(this._selectedId){const e=this._findRowById(this._selectedId);if(e&&e.path===this.value)return}this._selectedId=this.value?this._findRow(this.value)?.id??null:null}_reconcileSelectionFromModel(){if(this._selectedId){const e=this._findRowById(this._selectedId);if(e){this.value!==e.path&&(this.value=e.path,this.hasUpdated&&this.formCtrl.syncValue(),this._emit("esp-tree-select",{path:e.path,node:this._toPublic(e)}));return}this._selectedId=null}this.value&&(this._selectedId=this._findRow(this.value)?.id??null)}_buildPath(e,t,i,s){return this.buildPath({parentPath:e,segment:t,node:i,parentNode:s,rootPath:this.rootPath||"/"})}_joinPath(e,t){const i=e?this._findRow(e):null;return this._buildPath(e,t,{id:t,segment:t,label:t},i?this._toPublic(i):null)}_findRow(e){return this._pathIndex.get(e)??null}_findRowById(e){return this._rowIndex.get(e)??null}_isIndexedRow(e){return this._rowIndex.get(e.id)===e}_visibleRows(){const e=[],t=i=>{for(const s of i)this._isIndexedRow(s)&&(e.push(s),s.children.length&&this._expanded.has(s.id)&&t(s.children))};return t(this._model),e}_currentActive(e){return this._activeId&&e.some(t=>t.id===this._activeId)?this._activeId:e[0]?.id??null}_rowEl(e){const t=globalThis.CSS?.escape?.(e)??e.replace(/\\/g,"\\\\").replace(/"/g,'\\"');return this.shadowRoot?.querySelector(`[data-id="${t}"]`)??null}_scrollRowIntoView(e){this._rowEl(e)?.scrollIntoView?.({block:"nearest",inline:"nearest"})}_toPublic(e){return{id:e.id,segment:e.segment,data:e.data,label:e.label,icon:e.icon||void 0,selectable:e.selectable,editable:e.editable,deletable:e.deletable,movableUp:e.movableUp,movableDown:e.movableDown,cuttable:e.cuttable,pasteChildTarget:e.pasteChildTarget,hasChildren:e.hasChildren}}_emit(e,t){this.dispatchEvent(new CustomEvent(e,{detail:t,bubbles:!0,composed:!0}))}_setExpanded(e,t){t!==this._expanded.has(e.id)&&(t?(this._expanded.add(e.id),e.hasChildren&&!e.loaded&&this._ensureLoaded(e)):this._expanded.delete(e.id),this._emit("esp-tree-toggle",{path:e.path,node:this._toPublic(e),open:t}),this.requestUpdate())}_toggle(e){e.hasChildren&&this._setExpanded(e,!this._expanded.has(e.id))}async _ensureLoaded(e){if(e.loaded||!e.hasChildren||this._loading.has(e.id)||!this.loadChildren)return;const t=this._generation;this._loading.add(e.id),this.requestUpdate();try{const i=await this.loadChildren({id:e.id,segment:e.segment,data:e.data,label:e.label,path:e.path,level:e.level});if(t!==this._generation)return;this._lazyLoaded.set(e.id,i??[]),this._rebuildModel(),this._reconcileState(),this._reconcileSelectionFromModel(),this._pendingScrollId=e.id}catch{}finally{this._loading.delete(e.id),this.requestUpdate()}}_select(e){if(!e.selectable)return;e.hasChildren&&!this._expanded.has(e.id)&&this._setExpanded(e,!0);const t=this._isSelected(e)&&this.value===e.path;this._selectedId=e.id,!t&&(this.value=e.path,this._emit("esp-tree-select",{path:e.path,node:this._toPublic(e)}))}_containsRow(e,t){if(e.id===t.id)return!0;for(;t.parentId;){if(t.parentId===e.id)return!0;const i=this._findRowById(t.parentId);if(!i)break;t=i}return!1}_collapseSelectedBranchOutside(e){if(this.keepExpanded||!this.value&&!this._selectedId||this._isSelected(e))return;const t=this._selectedId?this._findRowById(this._selectedId):this.value?this._findRow(this.value):null;!t?.hasChildren||!this._expanded.has(t.id)||this._containsRow(t,e)||this._setExpanded(t,!1)}_isSelected(e){return this._selectedId===e.id}_setActiveId(e){this._activeId=e,this._pendingFocus=!0,this._pendingScrollId=e}_setActiveRow(e){this._setActiveId(e.id)}_activateAndSelect(e){this._setActiveRow(e),this._collapseSelectedBranchOutside(e),this._select(e),this.requestUpdate()}_onRowClick(e){if(this.disabled)return;if(this._isSelected(e)&&e.selectable&&e.hasChildren){this._setActiveRow(e),this._toggle(e),this.requestUpdate();return}this._activateAndSelect(e)}_onToggleClick(e,t){e.stopPropagation(),!(this.disabled||!t.hasChildren)&&(this._setActiveRow(t),this._toggle(t),this.requestUpdate())}_edit(e){e.editable&&this._emit(G.edit,{path:e.path,node:this._toPublic(e)})}_onActionEvent(e,t,i){e.stopPropagation(),!this.disabled&&(this._activeId=t.id,this._emit(G[i],{path:t.path,node:this._toPublic(t)}),this.requestUpdate())}_onActionMenuSelect(e,t){e.stopPropagation();const i=e.detail.value;t.actions.some(s=>s.kind===i)&&this._onActionEvent(e,t,i)}_stopRowActionEvent(e){e.stopPropagation()}_onRowActionsKeydown(e,t){e.stopPropagation(),!e.defaultPrevented&&(e.key!=="ArrowLeft"&&e.key!=="Escape"||(e.preventDefault(),this._closeRowActionMenus(),this._focusRow(t)))}_onKeydown(e){if(this.disabled)return;const t=e.target;if(t instanceof HTMLElement&&t.closest("button, input, textarea, select, a[href], esp-button, esp-action-menu, esp-action-menu-item, .node-actions"))return;const i=this._visibleRows();if(!i.length)return;const s=this._currentActive(i);let o=i.findIndex(a=>a.id===s);o<0&&(o=0);const r=i[o];if(r){if(e.key==="F10"&&e.shiftKey||e.key==="ContextMenu"){if(r.actions.length===0)return;e.preventDefault(),this._focusRowActions(r);return}switch(e.key){case"ArrowDown":e.preventDefault(),this._moveActive(i[Math.min(o+1,i.length-1)]);break;case"ArrowUp":e.preventDefault(),this._moveActive(i[Math.max(o-1,0)]);break;case"Home":e.preventDefault(),this._moveActive(i[0]);break;case"End":e.preventDefault(),this._moveActive(i[i.length-1]);break;case"ArrowRight":if(e.preventDefault(),r.hasChildren&&!this._expanded.has(r.id)){this._setActiveRow(r),this._setExpanded(r,!0);break}if(r.actions.length>0&&this._focusRowActionTrigger(r))break;if(r.hasChildren&&this._expanded.has(r.id)){const a=i[o+1];if(a&&a.parentId===r.id){this._moveActive(a);break}}break;case"ArrowLeft":if(e.preventDefault(),r.hasChildren&&this._expanded.has(r.id))this._setActiveRow(r),this._setExpanded(r,!1);else if(r.parentId){const a=i.find(l=>l.id===r.parentId);a&&this._moveActive(a)}break;case"Enter":case" ":e.preventDefault(),this._activateAndSelect(r);break;case"F2":if(!r.editable)break;e.preventDefault(),this._setActiveRow(r),this._edit(r),this.requestUpdate();break;case"Insert":if(!this.allowGraft)break;e.preventDefault(),this._openGraftForRow(r);break;default:e.key.length===1&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&(e.preventDefault(),this._typeahead(e.key,i,o));break}}}_moveActive(e){e&&(this._closeRowActionMenus(),this._setActiveRow(e),this.requestUpdate())}_focusRow(e){this._closeRowActionMenus(),this._activeId=e.id,this._rowEl(e.id)?.focus({preventScroll:!0}),this.requestUpdate()}_closeRowActionMenus(){this.shadowRoot?.querySelectorAll("esp-action-menu.node-action-menu").forEach(e=>e.closeMenu?.({restoreFocus:!1}))}async _focusRowActions(e){const i=this._rowEl(e.id)?.querySelector(".node-actions");if(!i)return;if(e.actions.length===1){i.querySelector("esp-button")?.focus({preventScroll:!0});return}const s=i.querySelector("esp-action-menu");if(!s)return;s.openMenu(),await s.updateComplete;const o=s;if(typeof o.focusFirstItem=="function"){o.focusFirstItem();return}s.querySelector("esp-action-menu-item:not([disabled])")?.focus()}_focusRowActionTrigger(e){const i=this._rowEl(e.id)?.querySelector(".node-actions esp-button");return i?(i.focus({preventScroll:!0}),!0):!1}_typeahead(e,t,i){this._typeTimer&&clearTimeout(this._typeTimer),this._typeBuffer+=e.toLowerCase(),this._typeTimer=setTimeout(()=>{this._typeBuffer="",this._typeTimer=null},U);const s=t.length;for(let o=1;o<=s;o++){const r=t[(i+o)%s];if(r&&r.label.toLowerCase().startsWith(this._typeBuffer)){this._moveActive(r);return}}}_onSlotChange(){const e=Array.from(this.children).filter(t=>t instanceof P);this._slottedNodes=e.map(t=>this._parseItem(t)),this._generation++,this._rebuildModel(),this._reconcileState(),this.requestUpdate()}_parseItem(e){const t=this._idForSlottedItem(e),i=e.getAttribute("segment")??e.segment??"",s=e.getAttribute("label")??e.label,o=e.getAttribute("icon")??e.icon,r=e.getAttribute("selectable"),a=r===null?e.selectable:r!=="false",l=e.hasAttribute("editable")||e.editable,g=e.hasAttribute("deletable")||e.deletable,b=e.hasAttribute("movable-up")||e.movableUp,_=e.hasAttribute("movable-down")||e.movableDown,m=e.hasAttribute("cuttable")||e.cuttable,w=e.hasAttribute("paste-child-target")||e.pasteChildTarget,y=e.hasAttribute("has-children")||e.hasChildren,I=Array.from(e.children).filter(x=>x instanceof P),f={id:t,segment:i,data:e.data,selectable:a,hasChildren:y};s&&(f.label=s),o&&(f.icon=o),l&&(f.editable=!0),g&&(f.deletable=!0),b&&(f.movableUp=!0),_&&(f.movableDown=!0),m&&(f.cuttable=!0),w&&(f.pasteChildTarget=!0);const C=I.map(x=>this._parseItem(x));return C.length&&(f.children=C),f}_idForSlottedItem(e){const t=this._slottedIds.get(e);if(t)return t;if(e.id&&!this._isGeneratedId(e.id))return this._slottedIds.set(e,e.id),e.id;e.id&&console.warn(`esp-tree: reserved slotted item id "${e.id}" ignored.`);const i=`__slotted:${++this._nextSlottedId}`;return this._slottedIds.set(e,i),i}_onGraftAddClick(e,t){e.stopPropagation(),!this.disabled&&this._openGraftForRow(t)}_openGraftForRow(e){if(this.disabled)return;const t=e??this._model[0]??null,i=this._rowPath(t);this._requestGraft(t,i)&&(t&&(this._setActiveRow(t),this._expanded.add(t.id)),this._openGraft(t?.id??"__root"))}_requestGraft(e,t){return this.dispatchEvent(new CustomEvent("esp-tree-graft-request",{detail:{parentPath:t,parentNode:e?this._toPublic(e):null},bubbles:!0,composed:!0,cancelable:!0}))}_openGraft(e){this._graftParentId=e,this._graftValue="",this._graftErrorInternal=null,this.graftError=null,this._pendingGraftFocus=!0,this.requestUpdate(),this.updateComplete.then(()=>{if(this._graftParentId!==e)return;const t=this._graftDialogRef.value;t&&!t.hasAttribute("is-open")&&t.toggleOpen()})}_cancelGraft(){this._closeGraftDialog(),this._resetGraftState()}_closeGraftDialog(){const e=this._graftDialogRef.value;e?.hasAttribute("is-open")&&e.toggleOpen()}_resetGraftState(){this._graftParentId=null,this._graftValue="",this._graftErrorInternal=null,this.graftError=null}_onGraftDialogClosed(){this._resetGraftState()}_onGraftInput(e){const t=e.detail??e.target.value;this._graftValue=t;const i=this._graftParentPath(),s=this._normalizeGraft(t,i),{valid:o,reason:r}=this._validateSegment(i,s);this._graftErrorInternal=null,this._emit("esp-tree-graft-input",{parentPath:i,raw:t,segment:s,path:this._joinPath(i,s),valid:o,reason:r})}_onGraftKeydown(e){if(e.stopPropagation(),e.key==="Enter")e.preventDefault(),this._commitGraft();else if(e.key==="Escape"){e.preventDefault();const t=this._graftParentId;this._cancelGraft(),t&&this._moveActive(this._findRowById(t)??void 0)}}_commitGraft(){if(this.disabled)return;const e=this._graftParentRow(),t=e?.id??"__root",i=this._rowPath(e),s=this._normalizeGraft(this._graftValue,i),{valid:o,reason:r}=this._validateSegment(i,s);if(!o){this._graftErrorInternal=r==="duplicate"?B:q;return}if(this.graftError)return;const a=this._joinPath(i,s),l={id:`__graft:${++this._nextGraftId}`,segment:s,label:s,selectable:!0},g=this._grafted.get(t)??[];g.push(l),this._grafted.set(t,g),this._rebuildModel(),this._reconcileState(),e&&this._expanded.add(e.id),this._closeGraftDialog(),this._resetGraftState(),this.value=a,this._selectedId=l.id,this._setActiveId(l.id);const b=this._findRowById(l.id),_=b?this._toPublic(b):l;this._emit("esp-tree-graft",{parentPath:i,segment:s,path:a,node:_}),this._emit("esp-tree-select",{path:a,node:_}),this.requestUpdate()}_validateSegment(e,t){return t?this._siblingSegments(e).has(t.toLowerCase())?{valid:!1,reason:"duplicate"}:{valid:!0,reason:""}:{valid:!1,reason:"empty"}}_siblingSegments(e){const t=e?this._findRow(e)?.children??[]:this._model;return new Set(t.map(i=>i.segment.toLowerCase()))}_normalizeGraft(e,t){return this.normalizeGraftSegment({raw:e,parentPath:t})}_graftParentPath(){return this._rowPath(this._graftParentRow())}_graftParentRow(){return this._graftParentId?this._findRowById(this._graftParentId)??this._model[0]??null:this._model[0]??null}_rowPath(e){return e?.path??(this.rootPath||"/")}render(){const e=this._visibleRows(),t=this._currentActive(e);return p`
      <div
        class="tree"
        role="tree"
        aria-label=${this.label?this.label:u}
        aria-disabled=${this.disabled?"true":u}
        @keydown=${this._onKeydown}
      >
        ${this._model.map(i=>this._renderRow(i,t))}
      </div>
      ${this.allowGraft?this._renderGraftDialog():u}
      <slot ${S(this._itemsSlot)} @slotchange=${this._onSlotChange} hidden></slot>
    `}_renderGeneratedIcon(e,t){const i=M(e,this);return i?E(i,{class:t}):u}_renderToggleIcon(e){return e?R(e):L}_renderBranchGuide(){return p`
      <svg
        class="branch-guide"
        viewBox="0 0 24 1"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path></path>
      </svg>
    `}_syncGuidePaths(){const e=this.shadowRoot;if(e)for(const t of e.querySelectorAll(".children"))this._syncGuidePath(t)}_syncGuidePath(e){const t=Array.from(e.children).find(g=>g.classList.contains("branch-guide")),i=t?.querySelector("path");if(!t||!i)return;const s=e.getBoundingClientRect(),o=Number.parseFloat(getComputedStyle(e).paddingInlineStart)||24,r=[];let a=o;for(const g of Array.from(e.children)){if(g.classList.contains("branch-guide"))continue;const b=this._guideTargetFor(g);if(!b)continue;const _=b.getBoundingClientRect(),m=_.left-s.left;Number.isFinite(m)&&m>0&&(a=m);const w=_.top-s.top+_.height/2;Number.isFinite(w)&&r.push(w)}const l=Math.max(s.height,r[r.length-1]??0,1);if(t.setAttribute("viewBox",`0 0 ${this._round(a)} ${this._round(l)}`),!r.length){i.removeAttribute("d");return}i.setAttribute("d",this._guidePath(r,a))}_guideTargetFor(e){return e.classList.contains("treeitem")?Array.from(e.children).find(i=>i.classList.contains("row-shell"))?.querySelector(".row")??null:e.classList.contains("graft-insert")?e.querySelector(".graft-add"):null}_guidePath(e,t){const i=this._round(Math.max(t,1)),s=this._round(e[e.length-1]??0),o=this._round(Math.max(0,Math.min(6,i/2,s))),r=["M 0 0"];for(const a of e.slice(0,-1)){const l=this._round(a);r.push(`V ${l}`,`H ${i}`,"H 0")}return o>0&&s>o?r.push(`V ${this._round(s-o)}`,`Q 0 ${s} ${o} ${s}`,`H ${i}`):r.push(`V ${s}`,`H ${i}`),r.join(" ")}_round(e){return Math.round(e*100)/100}_renderToggleAction(e,t){if(!e.hasChildren)return p`<span
        class=${v({"icon-action":!0,"toggle-action":!0,placeholder:!0})}
        aria-hidden="true"
      ></span>`;const i=t?`Collapse ${e.label}`:`Expand ${e.label}`,s=t&&this.collapseIcon?this.collapseIcon:this.expandIcon;return p`
      <button
        type="button"
        class=${v({"icon-action":!0,"toggle-action":!0,open:t&&!this.collapseIcon})}
        aria-label=${i}
        title=${i}
        aria-expanded=${String(t)}
        ?disabled=${this.disabled}
        tabindex="-1"
        @click=${o=>this._onToggleClick(o,e)}
      >
        <span class="toggle-icon" aria-hidden="true">${this._renderToggleIcon(s)}</span>
      </button>
    `}_renderNodeTools(e){const t=M(e.icon,this),i=t.length>0;return i?p`
      <span
        class=${v({"node-tools":!0,"has-icon":i})}
      >
        <span class="node-icon" aria-hidden="true">
          ${E(t,{"aria-hidden":null})}
        </span>
      </span>
    `:u}_renderNodeActions(e){const t=e.actions;return t.length===0?u:p`
      <span
        class="node-actions"
        @click=${this._stopRowActionEvent}
        @clicked=${this._stopRowActionEvent}
        @keydown=${i=>this._onRowActionsKeydown(i,e)}
      >
        ${t.length===1?this._renderSingleNodeAction(e,t[0]):this._renderNodeActionMenu(e,t)}
      </span>
    `}_renderSingleNodeAction(e,t){return p`
      <esp-button
        class=${v({"node-action-button":!0,[`${t.kind}-action`]:!0})}
        icon-only
        collapsed
        label=${t.accessibleLabel}
        aria-label=${t.accessibleLabel}
        title=${t.accessibleLabel}
        tabindex="-1"
        incognito
        ?disabled=${this.disabled}
        @clicked=${i=>this._onActionEvent(i,e,t.kind)}
      >
        ${A(t.kind)}
      </esp-button>
    `}_renderNodeActionMenu(e,t){const i=`Actions for ${e.label}`;return p`
      <esp-action-menu
        class="node-action-menu"
        placement="bottom-end"
        icon-position="right"
        ?disabled=${this.disabled}
        @select=${s=>this._onActionMenuSelect(s,e)}
      >
        <esp-button
          slot="trigger"
          class="node-action-button node-action-menu-trigger"
          icon-only
          collapsed
          incognito
          label=${i}
          aria-label=${i}
          title=${i}
          tabindex="-1"
          ?disabled=${this.disabled}
        >
          ${A("menu")}
        </esp-button>
        ${t.map(s=>p`
            <esp-action-menu-item value=${s.kind}>
              ${A(s.kind,"icon")} ${s.label}
            </esp-action-menu-item>
          `)}
      </esp-action-menu>
    `}_renderRow(e,t){const i=this._expanded.has(e.id),s=this._isSelected(e),o=t===e.id,r=this._loading.has(e.id),a={row:!0,selected:s,branch:e.hasChildren,unselectable:!e.selectable,ephemeral:e.ephemeral,root:e.root};return p`
      <div
        role="treeitem"
        class="treeitem"
        data-id=${e.id}
        data-path=${e.path}
        aria-level=${e.level}
        aria-label=${e.label}
        aria-selected=${e.selectable?String(s):u}
        aria-expanded=${e.hasChildren?String(i):u}
        aria-busy=${r?"true":u}
        tabindex=${this.disabled?-1:o?0:-1}
      >
        <div class="row-shell">
          <div class=${v(a)} @click=${()=>this._onRowClick(e)}>
            ${this._renderToggleAction(e,i)} ${this._renderNodeTools(e)}
            <span class="node-label">${e.label}</span>
            ${r?p`<span class="loading" aria-hidden="true"></span>`:u}
            ${this._renderNodeActions(e)}
          </div>
        </div>
        ${this._renderChildGroup(e,t)}
      </div>
    `}_renderChildGroup(e,t){const i=this._expanded.has(e.id),s=i&&e.children.length>0,o=this.allowGraft&&(i||!e.hasChildren);return!s&&!o?u:p`
      <div
        class=${v({children:!0,"add-only":!s})}
        role=${s?"group":"presentation"}
      >
        ${this._renderBranchGuide()}
        ${s?e.children.filter(r=>this._isIndexedRow(r)).map(r=>this._renderRow(r,t)):u}
        ${o?this._renderGraftAdd(e.id,`Add a branch under ${e.label}`,e.root):u}
      </div>
    `}_renderGraftAdd(e,t,i){return p`
      <div
        class=${v({"graft-insert":!0,root:i})}
        role="presentation"
      >
        <button
          type="button"
          class=${v({"icon-action":!0,"graft-add":!0,"graft-root":i})}
          aria-label=${t}
          title=${t}
          ?disabled=${this.disabled}
          @click=${s=>this._onGraftAddClick(s,this._findRowById(e))}
        >
          ${this._renderGeneratedIcon("plus",{"generated-icon":!0,"add-icon":!0})}
        </button>
      </div>
    `}_renderGraftDialog(){const e=this._graftParentId!==null,t=this._graftParentRow(),i=this._rowPath(t),s=t?.label??(this.rootLabel||"Root"),o=this._graftValue,r=this._normalizeGraft(o,i),a=r?this._joinPath(i,r):this._joinPath(i,"..."),l=this.graftError??this._graftErrorInternal;return p`
      <esp-dialog
        class="graft-dialog"
        ${S(this._graftDialogRef)}
        @esp-dialog-closed=${this._onGraftDialogClosed}
      >
        ${e?p`<esp-box class="graft-dialog-box">
              <section class="graft-dialog-content" aria-labelledby="esp-tree-graft-title">
                <header class="graft-dialog-header">
                  <h2 id="esp-tree-graft-title">Add branch</h2>
                </header>
                <dl class="graft-summary">
                  <div>
                    <dt>Parent</dt>
                    <dd>${s}</dd>
                  </div>
                  <div>
                    <dt>New Path</dt>
                    <dd>${a}</dd>
                  </div>
                </dl>
                <esp-form-item class="graft-form-item" label="Branch name" .error=${l??""}>
                  <esp-input
                    ${S(this._graftInputRef)}
                    class="graft-input"
                    .value=${this._graftValue}
                    placeholder="new-branch"
                    @value-changed=${this._onGraftInput}
                    @keydown=${this._onGraftKeydown}
                  ></esp-input>
                </esp-form-item>
                ${r&&o!==r?p`<esp-info class="graft-hint" icon="info">
                      Normalized to <code>${r}</code>.
                    </esp-info>`:u}
                <div class="graft-actions">
                  <esp-button
                    collapsed
                    variant="danger"
                    label="Cancel"
                    icon="circle-x"
                    ?disabled=${this.disabled}
                    @clicked=${this._cancelGraft}
                  ></esp-button>
                  <esp-button
                    collapsed
                    variant="success"
                    label="Add branch"
                    icon="plus"
                    ?disabled=${this.disabled}
                    @clicked=${this._commitGraft}
                  ></esp-button>
                </div>
              </section>
            </esp-box>`:u}
      </esp-dialog>
    `}};n.formAssociated=!0,n.styles=[...z.styles,T`
      :host {
        --_esp-tree-indent-step: var(--esp-tree-indent-step, 1.25rem);
        --_esp-tree-action-size: var(--esp-tree-action-size, 1.75rem);
        --_esp-tree-focus-shadow: var(--esp-field-focus-shadow, var(--esp-color-shadow));
        --_esp-tree-row-gap: var(--esp-size-tiny-to-small);
        --_esp-tree-row-min-block-size: calc(
          var(--_esp-tree-action-size) + 2 * var(--esp-tree-node-padding, var(--esp-size-small))
        );
        display: block;
      }

      :host([disabled]) .tree {
        opacity: 0.5;
        pointer-events: none;
      }

      .tree {
        font-family: var(--esp-font-body);
        font-size: var(--esp-size-font);
        color: var(--esp-color-text);
        display: grid;
        gap: var(--_esp-tree-row-gap);
      }

      .children {
        display: grid;
        gap: var(--_esp-tree-row-gap);
        position: relative;
        padding-block-start: var(--_esp-tree-row-gap);
        padding-inline-start: var(--_esp-tree-indent-step);
        margin-inline-start: calc(var(--_esp-tree-action-size) / 2);
      }

      .branch-guide {
        color: var(--esp-tree-guide-color, var(--esp-color-border));
        pointer-events: none;
        z-index: 0;
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: 0;
        inline-size: var(--_esp-tree-indent-step);
        block-size: 100%;
        overflow: visible;
      }

      .branch-guide path {
        fill: none;
        stroke: currentColor;
        stroke-width: 1.5px;
        stroke-linecap: round;
        stroke-linejoin: round;
        vector-effect: non-scaling-stroke;
      }

      .treeitem,
      .row-shell,
      .graft-insert {
        position: relative;
      }

      .row {
        background-color: var(--esp-tree-row-bg, var(--esp-color-layer-1));
        border: 1px solid var(--esp-tree-row-border-color, var(--esp-color-border));
        border-radius: var(--esp-size-border-radius);
        box-sizing: border-box;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: var(--esp-size-tiny);
        min-block-size: var(--_esp-tree-row-min-block-size);
        overflow: hidden;
        padding-block: 0;
        padding-inline-start: 0;
        padding-inline-end: var(--esp-size-padding);
        position: relative;
        user-select: none;
        z-index: 1;
        transition:
          box-shadow 0.15s ease,
          background-color cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s,
          border-color cubic-bezier(0.075, 0.82, 0.165, 1) 0.3s;
      }

      .row:hover {
        background-color: var(--esp-tree-hover-bg, var(--esp-color-layer-2));
        border-color: oklch(
          from var(--esp-tree-row-border-color, var(--esp-color-border)) calc(l * 1.1) c h
        );
      }

      .row.selected {
        border-color: var(--esp-color-primary);
        background-color: var(--esp-tree-selected-bg, var(--esp-color-layer-3));
      }

      .row.unselectable {
        color: var(--esp-color-headings);
        cursor: default;
        font-weight: var(--esp-font-weight-headings);
      }

      .treeitem:focus {
        outline: none;
      }

      .treeitem:focus > .row-shell > .row {
        border-color: var(--esp-color-link);
        box-shadow: 0 0 0.2rem var(--_esp-tree-focus-shadow);
      }

      .icon-action {
        appearance: none;
        background: transparent;
        border: 1px solid transparent;
        border-radius: max(0px, calc(var(--esp-size-border-radius) - 0.1rem));
        box-sizing: border-box;
        color: var(--esp-tree-icon-color, var(--esp-color-headings));
        cursor: pointer;
        display: grid;
        place-content: center;
        flex: 0 0 var(--_esp-tree-action-size);
        inline-size: var(--_esp-tree-action-size);
        block-size: var(--_esp-tree-action-size);
        line-height: 1;
        margin: 0;
        padding: 0;
        position: relative;
        transition:
          box-shadow 0.15s ease,
          background-color 0.15s ease,
          border-color 0.15s ease,
          opacity 0.15s ease;
        z-index: 1;
      }

      button.icon-action:hover {
        background-color: var(--esp-tree-hover-bg, var(--esp-color-layer-2));
      }

      button.icon-action:focus-visible {
        border-color: var(--esp-color-link);
        box-shadow: 0 0 0.18rem var(--_esp-tree-focus-shadow);
        outline: none;
      }

      button.icon-action:disabled {
        cursor: not-allowed;
      }

      .icon-action.placeholder {
        cursor: default;
      }

      .toggle-action {
        align-self: stretch;
        background-color: var(
          --esp-tree-action-bg,
          oklch(from var(--esp-color-layer-2) calc(l * 0.98) c h)
        );
        block-size: auto;
        border-block: 0;
        border-inline-start: 0;
        border-inline-end: 1px dotted var(--esp-tree-row-border-color, var(--esp-color-border));
        border-radius: 0;
        margin-block: 0;
      }

      button.toggle-action:hover,
      button.toggle-action:focus-visible {
        background-color: var(--esp-tree-action-hover-bg, var(--esp-color-layer-2));
      }

      .row.selected .toggle-action {
        border-inline-end-color: oklch(from var(--esp-color-primary) l c h / 0.45);
      }

      .generated-icon,
      .node-icon ::slotted(svg),
      .toggle-icon svg {
        block-size: calc(1.2 * var(--esp-size-font));
        inline-size: calc(1.2 * var(--esp-size-font));
      }

      .toggle-icon {
        display: grid;
        place-content: center;
        transform-origin: 50% 50%;
        transition: transform cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s;
      }

      .toggle-icon svg {
        display: block;
      }

      .toggle-action.open .toggle-icon {
        transform: rotate(90deg);
      }

      .node-tools {
        align-items: center;
        display: inline-grid;
        flex-shrink: 0;
        gap: 0;
        grid-auto-flow: column;
      }

      .node-icon {
        color: var(--esp-tree-icon-color, var(--esp-color-headings));
        display: grid;
        place-content: center;
        flex-shrink: 0;
        inline-size: calc(var(--_esp-tree-action-size) * 0.85);
        block-size: var(--_esp-tree-action-size);
      }

      .node-label {
        flex: 1 1 auto;
        min-width: 0;
        overflow: hidden;
        padding-block: var(--esp-tree-node-padding, var(--esp-size-small));
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .node-actions {
        align-items: center;
        align-self: stretch;
        background-color: var(
          --esp-tree-action-bg,
          oklch(from var(--esp-color-layer-2) calc(l * 0.98) c h)
        );
        border-inline-start: 1px dotted var(--esp-tree-row-border-color, var(--esp-color-border));
        display: inline-flex;
        flex: 0 0 auto;
        margin-inline-start: auto;
        margin-inline-end: calc(-1 * var(--esp-size-padding));
        min-inline-size: var(--_esp-tree-action-size);
      }

      .row.selected .node-actions {
        border-inline-start-color: oklch(from var(--esp-color-primary) l c h / 0.45);
      }

      esp-button.node-action-button {
        --esp-color-text: var(--esp-tree-icon-color, var(--esp-color-headings));
        --esp-color-action-text: var(--esp-tree-icon-color, var(--esp-color-headings));
        align-self: stretch;
        display: inline-flex;
        block-size: auto;
      }

      .tree-action-icon {
        display: grid;
        place-items: center;
      }

      .node-action-menu {
        align-self: stretch;
        display: inline-flex;
      }

      .node-actions svg {
        block-size: calc(1.05 * var(--esp-size-font));
        inline-size: calc(1.05 * var(--esp-size-font));
      }

      .loading {
        flex-shrink: 0;
        width: var(--esp-size-small);
        height: var(--esp-size-small);
        border-radius: 50%;
        border: 2px solid var(--esp-tree-icon-color, var(--esp-color-headings));
        border-top-color: transparent;
        animation: esp-tree-spin 0.7s linear infinite;
      }

      @keyframes esp-tree-spin {
        to {
          transform: rotate(360deg);
        }
      }

      .graft-insert {
        align-items: center;
        display: flex;
        min-block-size: var(--_esp-tree-action-size);
        padding-block: var(--esp-size-tiny);
      }

      .graft-insert.root {
        margin-block-start: 0;
        padding-inline-start: 0;
      }

      .graft-add {
        background-color: var(--esp-tree-row-bg, var(--esp-color-layer-1));
        color: oklch(from var(--esp-tree-icon-color, var(--esp-color-headings)) l c h / 0.78);
      }

      .graft-add:hover,
      .graft-add:focus-visible {
        border-color: var(--esp-color-link);
        color: var(--esp-tree-icon-color, var(--esp-color-headings));
      }

      .graft-dialog-box {
        align-self: start;
        block-size: max-content;
        inline-size: min(32rem, calc(100vw - 2 * var(--esp-size-padding)));
      }

      .graft-dialog-box::part(box) {
        block-size: auto;
        display: grid;
        padding: var(--esp-size-padding);
      }

      .graft-dialog-content {
        align-content: start;
        display: grid;
        gap: var(--esp-size-small);
      }

      .graft-dialog-header {
        display: grid;
        gap: var(--esp-size-tiny);
      }

      .graft-dialog-header h2,
      .graft-summary,
      .graft-hint {
        margin: 0;
      }

      .graft-dialog-header h2 {
        font-size: var(--esp-size-big);
        line-height: 1.15;
      }

      .graft-summary {
        border: 1px solid var(--esp-tree-row-border-color, var(--esp-color-border));
        border-radius: var(--esp-size-border-radius);
        display: grid;
        overflow: hidden;
      }

      .graft-summary > div {
        display: grid;
        gap: var(--esp-size-tiny);
        padding: var(--esp-size-small);
      }

      .graft-summary > div + div {
        border-block-start: 1px dotted var(--esp-tree-row-border-color, var(--esp-color-border));
      }

      .graft-summary dt {
        color: var(--esp-color-headings);
        font-size: var(--esp-type-small);
        font-weight: var(--esp-font-weight-headings);
      }

      .graft-summary dd {
        margin: 0;
        overflow-wrap: anywhere;
      }

      .graft-actions {
        display: flex;
        flex-wrap: wrap;
        gap: var(--esp-size-small);
        justify-content: flex-end;
      }
    `],d([h({type:Array})],n.prototype,"nodes",void 0),d([h({type:String})],n.prototype,"value",void 0),d([h({type:String,reflect:!0})],n.prototype,"name",void 0),d([h({type:Boolean,reflect:!0})],n.prototype,"required",void 0),d([h({attribute:"required-message"})],n.prototype,"requiredMessage",void 0),d([h({type:Boolean,reflect:!0})],n.prototype,"disabled",void 0),d([h({type:Boolean,attribute:"allow-graft"})],n.prototype,"allowGraft",void 0),d([h({type:String,attribute:"root-label"})],n.prototype,"rootLabel",void 0),d([h({type:String,attribute:"root-path"})],n.prototype,"rootPath",void 0),d([h({attribute:"root-selectable",converter:{fromAttribute:c=>c!=="false",toAttribute:c=>String(c)}})],n.prototype,"rootSelectable",void 0),d([h({type:String})],n.prototype,"label",void 0),d([h({type:String,reflect:!0,attribute:"graft-error"})],n.prototype,"graftError",void 0),d([h({attribute:!1})],n.prototype,"loadChildren",void 0),d([h({attribute:!1})],n.prototype,"buildPath",void 0),d([h({attribute:!1})],n.prototype,"normalizeGraftSegment",void 0),d([h({type:Boolean,attribute:"keep-expanded"})],n.prototype,"keepExpanded",void 0),d([h({attribute:!1})],n.prototype,"expandIcon",void 0),d([h({attribute:!1})],n.prototype,"collapseIcon",void 0),d([k()],n.prototype,"_activeId",void 0),d([k()],n.prototype,"_graftParentId",void 0),d([k()],n.prototype,"_graftValue",void 0),d([k()],n.prototype,"_graftErrorInternal",void 0),n=d([D("esp-tree")],n);export{n as EspalierTree,H as buildWebTreePath,N as normalizeSegment};
