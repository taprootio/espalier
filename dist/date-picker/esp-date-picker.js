var n=function(y,e,t,i){var s=arguments.length,a=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(y,e,t,i);else for(var h=y.length-1;h>=0;h--)(o=y[h])&&(a=(s<3?o(a):s>3?o(e,t,a):o(e,t))||a);return s>3&&a&&Object.defineProperty(e,t,a),a},f;import{html as l,nothing as _}from"lit";import{customElement as C,property as p,state as d}from"lit/decorators.js";import{classMap as D}from"lit/directives/class-map.js";import{createRef as g,ref as v}from"lit/directives/ref.js";import{repeat as x}from"lit/directives/repeat.js";import{EspalierElementBase as P}from"../shared/esp-element-base.js";import{PopoverController as F}from"../shared/popover-controller.js";import{scrollToContainAnchoredSurface as E,spaceAroundRect as G,viewportSize as S}from"../shared/viewport.js";import{FormFieldController as Y}from"../shared/form-field-controller.js";import{FormFieldDescriptionController as O}from"../shared/form-field-description-controller.js";import{leftArrow as V}from"../shared/svgs/left-arrow.js";import{rightArrow as L}from"../shared/svgs/right-arrow.js";import{checkSVG as k}from"../shared/svgs/check.js";import{cancelSVG as $}from"../shared/svgs/cancel.js";import"../button/esp-button.js";import"../pickers/esp-pick-one.js";import"../pickers/esp-picker-item.js";import{GRID_COLS as R,GRID_ROWS as j,GRID_SIZE as B,HOURS_12 as q,MINUTES_60 as W,MONTH_GRID_COLS as T,MONTH_NAMES as w,MONTH_SHORT_NAMES as H,WEEKDAY_LABELS as I}from"./helpers/constants.js";import{displayValue as z,formatDate as M,parseValue as U}from"./helpers/parsing.js";import{clampMonthToBounds as X,generateCalendarGrid as N,generateYearWindow as K,getEffectiveRange as Z,getSelectedDate as J,isDateDisabled as Q,isMonthDisabled as A,parseDateBound as b}from"./helpers/calendar-grid.js";import{calendarIcon as ee}from"../shared/svgs/calendar-icon.js";import{datePickerStyles as te}from"./helpers/styles.js";let r=f=class extends P{constructor(){super(...arguments),this.internals=this.attachInternals(),this.formCtrl=new Y({host:this,internals:this.internals,getFormValue:()=>this._value||null,getValidity:()=>this._getValidityResult(),getValidationAnchor:()=>this.inputRef.value??this,onReset:()=>{this._rangeAnchor=null,this._rangePreview=null,this._value="",this.requestUpdate("value",""),this._syncFromValue()},onRestore:e=>{this.value=e},onDisabled:e=>{this.disabled=e}}),this.formItemDescription=new O({host:this,getTarget:()=>this.inputRef.value}),this.popoverCtrl=new F({host:this,closeStrategy:"source-identity",isOpen:()=>this.open,onShouldClose:()=>this._closePopover(),onPositionUpdate:()=>this._positionPopover(),shouldContinueTracking:()=>{const e=this.getBoundingClientRect(),{height:t}=S();return!(e.bottom<0||e.top>t)},getInsideElements:()=>[this.popoverRef.value??null],onOutsideClick:()=>this._closePopover()}),this.inputRef=g(),this.popoverRef=g(),this.calBodyRef=g(),this.timePickerRef=g(),this.yearListRef=g(),this._containRepositionFrame=null,this.temporalSupported=!0,this.mode="date",this._value="",this.placeholder="Select...",this.min="",this.max="",this.disabled=!1,this.name="",this.required=!1,this.requiredMessage="",this._surface="days",this._jumpFocus=0,this._yearWindow=[],this._pinnedBodySize=null,this.open=!1,this.parsed={kind:"none"},this._parsedMinDate=null,this._parsedMaxDate=null,this._hour=12,this._minute=0,this._period="AM",this._rangeAnchor=null,this._rangePreview=null,this._cachedGridKey="",this._cachedGrid=[],this._valueOnOpen="",this._touchStartX=0,this._touchStartY=0,this._touchGesture="none",this._swipeAnimating=!1,this._swipeAnimationGeneration=0,this._longPressTimer=0,this._edgeScrollTimer=0}get value(){return this._value}set value(e){const t=this._value;this._value=e,this.requestUpdate("value",t),this._syncFromValue(),this.formCtrl.syncValue()}get _rangePhase(){return this._rangeAnchor?this.parsed.kind==="range"?"complete":"start":"empty"}_getGrid(){const e=[this.viewDate?.toString(),this._value,this._rangeAnchor?.toString()??"",this._rangePreview?.toString()??""].join("|");if(e!==this._cachedGridKey){this._cachedGridKey=e;const t=J(this.parsed),{start:i,end:s}=Z(this.mode,this.parsed,this._rangeAnchor,this._rangePreview);this._cachedGrid=N(this.viewDate,t,i,s,this._minDate,this._maxDate)}return this._cachedGrid}_dateAtPoint(e,t){const i=this.shadowRoot?.elementsFromPoint(e,t);if(!i)return null;for(const s of i){const a=s.dataset?.date;if(a)try{return Temporal.PlainDate.from(a)}catch{return null}}return null}_edgeSide(e){const t=this.shadowRoot?.querySelector(".calendar");if(!t)return null;const i=t.getBoundingClientRect(),s=this.shadowRoot?.querySelector(".day-cell"),a=s?s.getBoundingClientRect().width:32;return e<=i.left+a?"left":e>=i.right-a?"right":null}_onCalendarTouchStart(e){if(e.touches.length!==1||this._swipeAnimating||this._surface!=="days")return;const t=e.touches[0];if(this._touchStartX=t.clientX,this._touchStartY=t.clientY,this._touchGesture="pending",this._clearLongPressTimer(),this.mode==="range"&&this._rangePhase!=="empty"){const i=this.shadowRoot?.querySelector(".calendar");i&&(i.style.touchAction="none"),this._longPressTimer=window.setTimeout(()=>{if(this._longPressTimer=0,this._touchGesture!=="pending")return;this._touchGesture="drag";const s=this._dateAtPoint(this._touchStartX,this._touchStartY);s&&!this._isDateDisabled(s)&&(this._rangePhase==="complete"&&(this._rangeAnchor=s,this._value="",this.parsed={kind:"none"},this.formCtrl.syncValue()),this._rangePreview=s,this.requestUpdate())},f.LONG_PRESS_MS)}}_onCalendarTouchMove(e){if(e.touches.length!==1||this._swipeAnimating||this._touchGesture==="none")return;const t=e.touches[0],i=t.clientX-this._touchStartX,s=t.clientY-this._touchStartY;if(this._touchGesture==="drag"){e.cancelable&&e.preventDefault();const a=this._dateAtPoint(t.clientX,t.clientY);a&&!this._isDateDisabled(a)&&(this._rangePreview=a),this._handleEdgeScroll(t.clientX);return}if(this._touchGesture==="pending"){if(Math.abs(i)<10&&Math.abs(s)<10)return;if(this._clearLongPressTimer(),Math.abs(s)>Math.abs(i)){this._touchGesture="none",this._resetTouchAction();return}this._touchGesture="swipe"}if(this._touchGesture==="swipe"){e.cancelable&&e.preventDefault();const a=this.calBodyRef.value;a&&(a.style.transition="none",a.style.transform=`translateX(${i}px)`)}}_onCalendarTouchEnd(e){this._clearLongPressTimer(),this._clearEdgeScrollTimer(),this._resetTouchAction();const t=this._touchGesture;if(this._touchGesture="none",t==="drag"){if(e.changedTouches.length===1){const s=e.changedTouches[0];let a=this._dateAtPoint(s.clientX,s.clientY);if(a||(a=this._rangePreview),a&&!this._isDateDisabled(a)&&this._rangeAnchor){const o=this._rangeAnchor;let h,u;Temporal.PlainDate.compare(a,o)<0?(h=a,u=o):(h=o,u=a),this._rangePreview=null,this.value=`${h.toString()}/${u.toString()}`,this._dispatchValueChanged()}}return}if(t==="swipe"){this._finishSwipe(e);return}const i=this.calBodyRef.value;i&&(i.style.transition="",i.style.transform="")}_finishSwipe(e){const t=this.calBodyRef.value;if(!t||e.changedTouches.length!==1){t&&(t.style.transition="",t.style.transform="");return}const s=e.changedTouches[0].clientX-this._touchStartX,a=t.offsetWidth;if(Math.abs(s)>=30){const o=s<0?1:-1,h=o===1?-a:a,u=++this._swipeAnimationGeneration;this._swipeAnimating=!0,t.style.transition="transform 150ms ease-in",t.style.transform=`translateX(${h}px)`,t.addEventListener("transitionend",()=>{u!==this._swipeAnimationGeneration||!this.open||!this.isConnected||(this._navigateMonth(o),this.updateComplete.then(()=>{if(u!==this._swipeAnimationGeneration||!this.open||!this.isConnected)return;const c=this.calBodyRef.value;if(!c){this._swipeAnimating=!1;return}c.style.transition="none",c.style.transform=`translateX(${-h}px)`,c.getBoundingClientRect(),c.style.transition="transform 150ms ease-out",c.style.transform="",c.addEventListener("transitionend",()=>{u===this._swipeAnimationGeneration&&(c.style.transition="",this._swipeAnimating=!1)},{once:!0})}))},{once:!0})}else t.style.transition="transform 150ms ease-out",t.style.transform="",t.addEventListener("transitionend",()=>{t.style.transition=""},{once:!0})}_resetSwipeAnimation(){this._swipeAnimationGeneration+=1,this._swipeAnimating=!1;const e=this.calBodyRef.value;e&&(e.style.transition="",e.style.transform="")}_clearLongPressTimer(){this._longPressTimer&&(clearTimeout(this._longPressTimer),this._longPressTimer=0)}_handleEdgeScroll(e){const t=this._edgeSide(e);if(!t){this._clearEdgeScrollTimer();return}if(this._edgeScrollTimer)return;const i=t==="right"?1:-1;this._edgeScrollTimer=window.setTimeout(async()=>{this._edgeScrollTimer=0,this._touchGesture==="drag"&&(this._navigateMonth(i),await this.updateComplete)},f.EDGE_SCROLL_MS)}_clearEdgeScrollTimer(){this._edgeScrollTimer&&(clearTimeout(this._edgeScrollTimer),this._edgeScrollTimer=0)}_resetTouchAction(){const e=this.shadowRoot?.querySelector(".calendar");e&&e.style.removeProperty("touch-action")}connectedCallback(){if(super.connectedCallback(),typeof window.Temporal>"u"){this.temporalSupported=!1;return}this.viewDate||(this.viewDate=Temporal.Now.plainDateISO().toPlainYearMonth()),this.focusedDate||(this.focusedDate=Temporal.Now.plainDateISO()),this._parsedMinDate=b(this.min),this._parsedMaxDate=b(this.max),this._syncFromValue(),this.formCtrl.validate()}disconnectedCallback(){this._resetSwipeAnimation(),this._containRepositionFrame!==null&&(cancelAnimationFrame(this._containRepositionFrame),this._containRepositionFrame=null),super.disconnectedCallback()}willUpdate(e){if(super.willUpdate(e),e.has("min")&&(this._parsedMinDate=b(this.min)),e.has("max")&&(this._parsedMaxDate=b(this.max)),e.has("mode")&&this.open){const t=!!this.shadowRoot?.activeElement;this._closePopover(),t&&this.inputRef.value?.focus()}e.has("value")&&this._surface==="months"&&(this._jumpFocus=this.viewDate.month),(e.has("min")||e.has("max")||e.has("value"))&&this._surface==="years"&&this._openYearWindow(e.has("value")?this.viewDate.year:this._jumpFocus)}updated(e){super.updated(e),e.has("disabled")&&(this.internals.ariaDisabled=this.disabled?"true":"false"),e.has("required")&&(this.internals.ariaRequired=this.required?"true":"false",this.formCtrl.validate()),(e.has("min")||e.has("max"))&&this.formCtrl.validate(),e.has("_surface")?this._applySurfaceChange(e.get("_surface")):(e.has("min")||e.has("max")||e.has("value"))&&this._surface==="years"&&this.open?(this._scrollYearIntoView(this._jumpFocus,e.has("value")?"center":"nearest"),this._focusSurface()):e.has("value")&&this._surface==="months"&&this.open&&this._focusSurface()}focus(e){this.focusResolvedElementAfterUpdate(()=>this.inputRef.value,e)}setFormItemDescription(e){this.formItemDescription.setDescription(e)}setFormItemLabel(e){this.formItemDescription.setLabel(e)}validate(){this.formCtrl.validate()}checkValidity(){return this.formCtrl.checkValidity()}formResetCallback(){this.formCtrl.handleFormReset()}formStateRestoreCallback(e){this.formCtrl.handleFormStateRestore(e)}formDisabledCallback(e){this.formCtrl.handleFormDisabled(e)}_syncFromValue(){if(this.temporalSupported)switch(this.parsed=U(this._value,this.mode),this.parsed.kind){case"date":this.viewDate=this.parsed.date.toPlainYearMonth(),this.focusedDate=this.parsed.date;break;case"datetime":{this.viewDate=this.parsed.datetime.toPlainDate().toPlainYearMonth(),this.focusedDate=this.parsed.datetime.toPlainDate();const e=this.parsed.datetime.toPlainTime(),t=e.hour;this._period=t>=12?"PM":"AM",this._hour=t===0?12:t>12?t-12:t,this._minute=e.minute;break}case"time":{const e=this.parsed.time,t=e.hour;this._period=t>=12?"PM":"AM",this._hour=t===0?12:t>12?t-12:t,this._minute=e.minute;break}case"range":this.viewDate=this.parsed.start.toPlainYearMonth(),this.focusedDate=this.parsed.start,this._rangeAnchor=this.parsed.start,this._rangePreview=null;break;case"none":break}}_getValidityResult(){if(!this.temporalSupported)return null;if(this.required&&!this._value)return{flags:{valueMissing:!0},message:this.requiredMessage||"Please select a date."};if(this._value&&this.parsed.kind==="none")return{flags:{typeMismatch:!0},message:"The value is not a valid date."};const e=this._getValidationDates();if(e.length>0){const t=this._minDate,i=this._maxDate;if(t){for(const s of e)if(Temporal.PlainDate.compare(s,t)<0)return{flags:{rangeUnderflow:!0},message:`Date must not be before ${M(t)}.`}}if(i){for(const s of e)if(Temporal.PlainDate.compare(s,i)>0)return{flags:{rangeOverflow:!0},message:`Date must not be after ${M(i)}.`}}}return null}_getValidationDates(){switch(this.parsed.kind){case"date":return[this.parsed.date];case"datetime":return[this.parsed.datetime.toPlainDate()];case"range":return[this.parsed.start,this.parsed.end];default:return[]}}get _minDate(){return this._parsedMinDate}get _maxDate(){return this._parsedMaxDate}_isDateDisabled(e){return Q(e,this._minDate,this._maxDate)}_navigateMonth(e){this._setViewMonth(this.viewDate.add({months:e}))}_setViewMonth(e){this.viewDate=e;let t=e.toPlainDate({day:Math.min(this.focusedDate.day,e.daysInMonth)});const i=this._minDate,s=this._maxDate;i&&Temporal.PlainDate.compare(t,i)<0&&Temporal.PlainYearMonth.compare(i.toPlainYearMonth(),e)===0&&(t=i),s&&Temporal.PlainDate.compare(t,s)>0&&Temporal.PlainYearMonth.compare(s.toPlainYearMonth(),e)===0&&(t=s),this.focusedDate=t}_navigateHeader(e){switch(this._surface){case"days":this._navigateMonth(e);break;case"months":this._navigateMonth(e*12);break;case"years":this._moveYearFocus(e*this._yearPageSize());break}}_toggleSurface(e){this._showSurface(this._surface===e?"days":e)}_showSurface(e){if(e!==this._surface){if(this._surface==="days"){const t=this.calBodyRef.value?.getBoundingClientRect();this._pinnedBodySize=t&&t.width>0&&t.height>0?{width:t.width,height:t.height}:null}e==="days"?this._pinnedBodySize=null:e==="months"?this._jumpFocus=this.viewDate.month:this._openYearWindow(this.viewDate.year),this._surface=e}}_openYearWindow(e){this._yearWindow=K(this.viewDate.year,this._minDate,this._maxDate);const t=this._yearWindow[0]??e,i=this._yearWindow[this._yearWindow.length-1]??e;this._jumpFocus=Math.min(i,Math.max(t,e))}_applySurfaceChange(e){const t=this.calBodyRef.value;if(t){const i=this._surface==="days"?null:this._pinnedBodySize;i?(t.style.setProperty("inline-size",`${i.width}px`),t.style.setProperty("block-size",`${i.height}px`)):(t.style.removeProperty("inline-size"),t.style.removeProperty("block-size"))}e===void 0||!this.open||(this._surface==="years"&&this._scrollYearIntoView(this._jumpFocus,"center"),this._focusSurface())}_focusSurface(){const e=this._surface==="days"?'[role="grid"] [tabindex="0"]':'.jump-surface [tabindex="0"]',t=this.shadowRoot?.querySelector(e);(t&&!t.hasAttribute("disabled")?t:this.shadowRoot?.querySelector(".cal-title-part"))?.focus({preventScroll:this._surface==="years"})}_chooseMonth(e){this._setViewMonth(new Temporal.PlainYearMonth(this.viewDate.year,e)),this._showSurface("days")}_chooseYear(e){this._setViewMonth(X(new Temporal.PlainYearMonth(e,this.viewDate.month),this._minDate,this._maxDate)),this._showSurface("days")}_handleMonthKeyDown(e){let t=this._jumpFocus;switch(e.key){case"ArrowLeft":t-=1;break;case"ArrowRight":t+=1;break;case"ArrowUp":t-=T;break;case"ArrowDown":t+=T;break;case"Home":t=1;break;case"End":t=12;break;case"PageUp":this._navigateMonth(-12);break;case"PageDown":this._navigateMonth(12);break;case"Enter":case" ":{const i=new Temporal.PlainYearMonth(this.viewDate.year,this._jumpFocus);A(i,this._minDate,this._maxDate)||this._chooseMonth(this._jumpFocus);break}case"Escape":this._showSurface("days");break;default:return}e.preventDefault(),e.stopPropagation(),t=Math.min(12,Math.max(1,t)),t!==this._jumpFocus&&(this._jumpFocus=t,this._focusSurfaceAfterUpdate())}_handleYearKeyDown(e){const t=this._yearWindow;if(t.length===0)return;const i=t.indexOf(this._jumpFocus);let s=i;switch(e.key){case"ArrowUp":s=i-1;break;case"ArrowDown":s=i+1;break;case"PageUp":s=i-this._yearPageSize();break;case"PageDown":s=i+this._yearPageSize();break;case"Home":s=0;break;case"End":s=t.length-1;break;case"Enter":case" ":this._chooseYear(this._jumpFocus);break;case"Escape":this._showSurface("days");break;default:return}e.preventDefault(),e.stopPropagation(),this._moveYearFocus(s-i)&&this._focusSurfaceAfterUpdate()}_moveYearFocus(e){const t=this._yearWindow;if(t.length===0||e===0)return!1;const i=Math.max(0,Math.min(t.length-1,t.indexOf(this._jumpFocus)+e));return t[i]===this._jumpFocus?!1:(this._jumpFocus=t[i],this.updateComplete.then(()=>{this.open&&this._surface==="years"&&this._scrollYearIntoView(this._jumpFocus,"nearest")}),!0)}_focusSurfaceAfterUpdate(){this.updateComplete.then(()=>{this.open&&this._focusSurface()})}_yearPageSize(){const e=this.yearListRef.value,t=e?.querySelector(".year-cell");return!e||!t||t.offsetHeight===0?5:Math.max(1,Math.floor(e.clientHeight/t.offsetHeight))}_scrollYearIntoView(e,t){const i=this.yearListRef.value,s=i?.querySelector(`[data-year="${e}"]`);if(!i||!s)return;const a=s.offsetTop,o=a+s.offsetHeight;t==="center"?i.scrollTop=Math.max(0,a-(i.clientHeight-s.offsetHeight)/2):a<i.scrollTop?i.scrollTop=a:o>i.scrollTop+i.clientHeight&&(i.scrollTop=o-i.clientHeight)}_moveFocus(e){const t=this.focusedDate.add({days:e});if(this._isDateDisabled(t)){const s=e>0?1:-1;let a=t;for(let o=0;o<B&&this._isDateDisabled(a);o++)a=a.add({days:s});this.focusedDate=a}else this.focusedDate=t;const i=this.focusedDate.toPlainYearMonth();Temporal.PlainYearMonth.compare(i,this.viewDate)!==0&&(this.viewDate=i),this.mode==="range"&&this._rangePhase==="start"&&(this._rangePreview=this.focusedDate)}_selectDate(e){if(!this._isDateDisabled(e)){switch(this.mode){case"date":this.value=e.toString(),this._closePopover(),this.inputRef.value?.focus();break;case"datetime":{const t=this.parsed.kind==="datetime"?this.parsed.datetime.toPlainTime():new Temporal.PlainTime;this.value=e.toPlainDateTime(t).toString();break}case"range":this._selectRangeEndpoint(e);break}this._dispatchValueChanged()}}_selectRangeEndpoint(e){switch(this._rangePhase){case"empty":case"complete":this._rangeAnchor=e,this._rangePreview=null,this._value="",this.parsed={kind:"none"},this.formCtrl.syncValue(),this.requestUpdate();break;case"start":{const i=this._rangeAnchor;let s,a;Temporal.PlainDate.compare(e,i)<0?(s=e,a=i):(s=i,a=e),this._rangePreview=null,this.value=`${s.toString()}/${a.toString()}`;break}}}_dispatchValueChanged(){this.emitValueChanged(this._value)}get _showTimePicker(){return this.mode==="time"||this.mode==="datetime"}get _showCalendar(){return this.mode!=="time"}_commitTime(){let e=this._hour%12;this._period==="PM"&&(e+=12);const t=new Temporal.PlainTime(e,this._minute);if(this.mode==="time")this.value=t.toString();else if(this.mode==="datetime"){const i=this.parsed.kind==="datetime"?this.parsed.datetime.toPlainDate():this.parsed.kind==="date"?this.parsed.date:Temporal.Now.plainDateISO();this.value=i.toPlainDateTime(t).toString()}this._dispatchValueChanged()}async _openPopover(){if(this.disabled||(this.popoverCtrl.publishCloseOthers(),this._valueOnOpen=this._value,this.open=!0,this._positionPopover(),this.popoverCtrl.startTracking(),this.popoverCtrl.startOutsideClick(),await this.updateComplete,!this.open||!this.isConnected))return;this._shrinkTimePickerToFit(),this._scrollToContainPopover();const t=this.shadowRoot?.querySelector('[role="grid"]')?.querySelector('[tabindex="0"]');requestAnimationFrame(()=>{this.open&&this.isConnected&&t?.focus()})}_closePopover(){this.open=!1,this._resetSwipeAnimation(),this._surface="days",this._pinnedBodySize=null,this._containRepositionFrame!==null&&(cancelAnimationFrame(this._containRepositionFrame),this._containRepositionFrame=null);const e=this.popoverRef.value;if(e){e.classList.remove("visible");try{e.hidePopover()}catch{}}this.popoverCtrl.stopTracking(),this.popoverCtrl.stopOutsideClick(),this.mode==="range"&&this._rangePhase==="start"&&(this._rangeAnchor=null,this._rangePreview=null)}_togglePopover(){this.open?this._closePopover():this._openPopover()}_positionPopover(){if(!this.open)return;const e=this.popoverRef.value;if(!e)return;const t=this.getBoundingClientRect(),{width:i,height:s}=S(),{spaceAbove:a,spaceBelow:o}=G(t,s);e.matches(":popover-open")||e.showPopover(),e.style.removeProperty("top"),e.style.removeProperty("bottom"),e.style.removeProperty("font-size"),e.style.setProperty("width","min-content"),this._shrinkToFitViewport(e,i);let h=t.left;const u=e.offsetWidth;h+u>i&&(h=Math.max(0,i-u)),e.style.setProperty("left",`${h}px`);const c=e.offsetHeight;if(a>o){let m=s-t.top;c>a&&(m=s-c),e.style.setProperty("bottom",`${m}px`)}else{let m=t.bottom;c>o&&(m=s-c),e.style.setProperty("top",`${Math.max(0,m)}px`)}requestAnimationFrame(()=>e.classList.add("visible"))}_shrinkToFitViewport(e,t){if(e.offsetWidth<=t)return;const i=getComputedStyle(e);let s=parseFloat(i.fontSize);const a=8;for(;e.offsetWidth>t&&s>a;)s-=.5,e.style.setProperty("font-size",`${s}px`)}_shrinkTimePickerToFit(){const e=this.timePickerRef.value,t=this.popoverRef.value;if(!e||!t)return;e.style.removeProperty("font-size");const i=t.clientWidth;if(e.scrollWidth<=i)return;const s=getComputedStyle(e);let a=parseFloat(s.fontSize);const o=8;for(;e.scrollWidth>i&&a>o;)a-=.5,e.style.setProperty("font-size",`${a}px`)}_scrollToContainPopover(){const e=this.popoverRef.value;e&&(this._containRepositionFrame!==null&&cancelAnimationFrame(this._containRepositionFrame),this._containRepositionFrame=E(this,e,()=>{this._containRepositionFrame=null,this.open&&this._positionPopover()}))}async _handleGridKeyDown(e){const s=!!!e.target?.closest?.('[role="grid"]')&&(e.key==="Enter"||e.key===" ");if(this._surface!=="days"){e.key==="Escape"&&(e.preventDefault(),e.stopPropagation(),this._showSurface("days"));return}if(s)return;let a=!0;switch(e.key){case"ArrowLeft":this._moveFocus(-1);break;case"ArrowRight":this._moveFocus(1);break;case"ArrowUp":this._moveFocus(-7);break;case"ArrowDown":this._moveFocus(7);break;case"Home":{const o=this.focusedDate.dayOfWeek;o>1&&this._moveFocus(-(o-1));break}case"End":{const o=this.focusedDate.dayOfWeek;o<7&&this._moveFocus(7-o);break}case"PageUp":this._navigateMonth(e.shiftKey?-12:-1);break;case"PageDown":this._navigateMonth(e.shiftKey?12:1);break;case"Enter":case" ":this._selectDate(this.focusedDate);break;case"Escape":this._closePopover(),this.inputRef.value?.focus();break;default:a=!1}a&&(e.preventDefault(),e.stopPropagation(),await this.updateComplete,this.shadowRoot?.querySelector('[role="grid"]')?.querySelector('[tabindex="0"]')?.focus())}_onDayCellHover(e){this.mode==="range"&&this._rangePhase==="start"&&(this._rangePreview=e)}render(){return this.temporalSupported?l`
      
      <div class="esp-field" @click=${()=>this._togglePopover()}>
        <input
          ${v(this.inputRef)}
          class="esp-input"
          .value=${z(this.parsed)}
          placeholder=${this.placeholder}
          readonly
          ?disabled=${this.disabled}
          aria-haspopup="dialog"
          aria-expanded=${this.open?"true":"false"}
          @keydown=${e=>{(e.key==="Enter"||e.key===" "||e.key==="ArrowDown"||e.key==="ArrowUp")&&(e.preventDefault(),this._openPopover()),e.key==="Escape"&&this.open&&(e.preventDefault(),this._closePopover())}}
        />
        <label class="field-icon">${ee}</label>
      </div>

      
      <div
        ${v(this.popoverRef)}
        class="picker-popover"
        popover="manual"
        @keydown=${e=>{e.key==="Tab"&&(e.preventDefault(),this._closePopover(),this.inputRef.value?.focus())}}
      >
        ${this._showCalendar?this._renderCalendar():_}
        ${this._showTimePicker?this._renderTimePicker():_}
        ${!this._showTimePicker&&this.mode!=="date"?this._renderActions():_}
      </div>
    `:l`<p class="temporal-error">
        <code>Temporal</code> API not found. Load the polyfill in <code>&lt;head&gt;</code> before
        using <code>&lt;esp-date-picker&gt;</code>.
      </p>`}_renderCalendar(){const[e,t]=f.ARROW_LABELS[this._surface];let i;switch(this._surface){case"months":i=this._renderMonthSurface();break;case"years":i=this._renderYearSurface();break;default:i=this._renderDaySurface()}return l`
      <div
        class="calendar"
        @keydown=${s=>this._handleGridKeyDown(s)}
        @touchstart=${s=>this._onCalendarTouchStart(s)}
        @touchmove=${s=>this._onCalendarTouchMove(s)}
        @touchend=${s=>this._onCalendarTouchEnd(s)}
        @touchcancel=${s=>this._onCalendarTouchEnd(s)}
      >
        
        <header class="cal-header">
          <button
            class="nav-btn"
            aria-label=${e}
            @click=${s=>{s.stopPropagation(),this._navigateHeader(-1)}}
          >
            ${V}
          </button>
          ${this._renderTitle()}
          <button
            class="nav-btn"
            aria-label=${t}
            @click=${s=>{s.stopPropagation(),this._navigateHeader(1)}}
          >
            ${L}
          </button>
        </header>

        
        <div ${v(this.calBodyRef)} class="cal-body">${i}</div>
      </div>
    `}_renderTitle(){const e=w[this.viewDate.month-1],t=this.viewDate.year,i=this._surface==="months",s=this._surface==="years";return l`<span class="cal-title"
      ><button
        type="button"
        class="cal-title-part"
        aria-label=${`Choose month, ${e}`}
        aria-expanded=${i?"true":"false"}
        aria-controls=${i?"month-surface":_}
        @click=${a=>{a.stopPropagation(),this._toggleSurface("months")}}
      >
        ${e}
      </button>
      <button
        type="button"
        class="cal-title-part"
        aria-label=${`Choose year, ${t}`}
        aria-expanded=${s?"true":"false"}
        aria-controls=${s?"year-surface":_}
        @click=${a=>{a.stopPropagation(),this._toggleSurface("years")}}
      >
        ${t}
      </button></span
    >`}_renderDaySurface(){const e=this._getGrid(),t=`${w[this.viewDate.month-1]} ${this.viewDate.year}`;return l`
      <div class="weekday-row" role="row">
        ${I.map(i=>l`<abbr class="weekday-label" title=${i}>${i}</abbr>`)}
      </div>

      <div class="day-grid" role="grid" aria-label=${t}>${this._renderGridRows(e)}</div>
    `}_renderMonthSurface(){const e=this.viewDate.year;return l`
      <div
        class="jump-surface month-surface"
        id="month-surface"
        role="listbox"
        aria-label=${`Months of ${e}`}
        @keydown=${t=>this._handleMonthKeyDown(t)}
      >
        ${H.map((t,i)=>{const s=i+1,a=A(new Temporal.PlainYearMonth(e,s),this._minDate,this._maxDate),o=s===this.viewDate.month;return l`
            <button
              type="button"
              role="option"
              class=${D({"jump-cell":!0,"month-cell":!0,selected:o,disabled:a})}
              tabindex=${s===this._jumpFocus?0:-1}
              data-month=${s}
              aria-selected=${o?"true":"false"}
              aria-disabled=${a?"true":"false"}
              aria-label=${`${w[i]} ${e}`}
              @focus=${()=>{this._jumpFocus=s}}
              @click=${u=>{u.stopPropagation(),a||this._chooseMonth(s)}}
            >
              ${t}
            </button>
          `})}
      </div>
    `}_renderYearSurface(){return l`
      <div
        ${v(this.yearListRef)}
        class="jump-surface year-surface"
        id="year-surface"
        role="listbox"
        aria-label="Years"
        @keydown=${e=>this._handleYearKeyDown(e)}
      >
        ${this._yearWindow.map(e=>{const t=e===this.viewDate.year;return l`
            <button
              type="button"
              role="option"
              class=${D({"jump-cell":!0,"year-cell":!0,selected:t})}
              tabindex=${e===this._jumpFocus?0:-1}
              data-year=${e}
              aria-selected=${t?"true":"false"}
              @focus=${()=>{this._jumpFocus=e}}
              @click=${s=>{s.stopPropagation(),this._chooseYear(e)}}
            >
              ${e}
            </button>
          `})}
      </div>
    `}_renderGridRows(e){const t=[];for(let i=0;i<j;i++){const s=e.slice(i*R,(i+1)*R);t.push(l`
        <div class="day-row" role="row">
          ${x(s,a=>a.date.toString(),a=>this._renderDayCell(a))}
        </div>
      `)}return t}_renderDayCell(e){const t=this.focusedDate&&Temporal.PlainDate.compare(e.date,this.focusedDate)===0,i={"day-cell":!0,"outside-month":e.isOutsideMonth,today:e.isToday,selected:e.isSelected||e.isRangeStart||e.isRangeEnd,"range-start":e.isRangeStart,"range-end":e.isRangeEnd,"in-range":e.isInRange,disabled:e.isDisabled,focused:t};return l`
      <button
        role="gridcell"
        class=${D(i)}
        tabindex=${t?0:-1}
        data-date=${e.date.toString()}
        aria-selected=${e.isSelected||e.isRangeStart||e.isRangeEnd?"true":"false"}
        aria-disabled=${e.isDisabled?"true":"false"}
        ?disabled=${e.isDisabled}
        aria-label=${`${w[e.date.month-1]} ${e.date.day}, ${e.date.year}`}
        aria-current=${e.isToday?"date":"false"}
        @click=${async s=>{s.stopPropagation(),this.focusedDate=e.date,this._selectDate(e.date),this.open&&(await this.updateComplete,this.shadowRoot?.querySelector('[role="grid"]')?.querySelector('[tabindex="0"]')?.focus())}}
        @pointerenter=${()=>this._onDayCellHover(e.date)}
      >
        ${e.date.day}
      </button>
    `}_renderTimePicker(){return l`
      <div ${v(this.timePickerRef)} class="time-picker" aria-label="Time picker">
        <esp-pick-one
          class="time-pick"
          placeholder="Hour"
          width="3.25em"
          .value=${String(this._hour)}
          @esp-value-changed=${e=>{e.stopPropagation(),e.detail?.value&&(this._hour=Number(e.detail.value),this._commitTime())}}
        >
          ${q.map(e=>l`
              <esp-picker-item
                text=${String(e)}
                value=${String(e)}
                ?selected=${e===this._hour}
              ></esp-picker-item>
            `)}
        </esp-pick-one>

        <span class="time-sep">:</span>

        <esp-pick-one
          class="time-pick"
          placeholder="Min"
          width="3.25em"
          .value=${String(this._minute)}
          @esp-value-changed=${e=>{e.stopPropagation(),e.detail?.value&&(this._minute=Number(e.detail.value),this._commitTime())}}
        >
          ${W.map(e=>l`
              <esp-picker-item
                text=${String(e).padStart(2,"0")}
                value=${String(e)}
                ?selected=${e===this._minute}
              ></esp-picker-item>
            `)}
        </esp-pick-one>

        <esp-pick-one
          class="time-pick"
          placeholder="AM/PM"
          width="3.75em"
          .value=${this._period}
          @esp-value-changed=${e=>{e.stopPropagation(),e.detail?.value&&(this._period=e.detail.value,this._commitTime())}}
        >
          <esp-picker-item
            text="AM"
            value="AM"
            ?selected=${this._period==="AM"}
          ></esp-picker-item>
          <esp-picker-item
            text="PM"
            value="PM"
            ?selected=${this._period==="PM"}
          ></esp-picker-item>
        </esp-pick-one>

        <esp-button
          icon-only
          @esp-clicked=${()=>{this._closePopover(),this.inputRef.value?.focus()}}
        >
          ${k}
        </esp-button>
        <esp-button
          icon-only
          intent="danger"
          @esp-clicked=${()=>{this.value=this._valueOnOpen,this._closePopover(),this.inputRef.value?.focus()}}
        >
          ${$}
        </esp-button>
      </div>
    `}_renderActions(){return l`
      <div class="popover-actions">
        <esp-button
          icon-only
          @esp-clicked=${()=>{this._closePopover(),this.inputRef.value?.focus()}}
        >
          ${k}
        </esp-button>
        <esp-button
          icon-only
          intent="danger"
          @esp-clicked=${()=>{this.value=this._valueOnOpen,this._closePopover(),this.inputRef.value?.focus()}}
        >
          ${$}
        </esp-button>
      </div>
    `}};r.formAssociated=!0,r.LONG_PRESS_MS=400,r.EDGE_SCROLL_MS=1e3,r.ARROW_LABELS={days:["Previous month","Next month"],months:["Previous year","Next year"],years:["Earlier years","Later years"]},r.styles=[...P.styles,te],n([d()],r.prototype,"temporalSupported",void 0),n([p({type:String,reflect:!0})],r.prototype,"mode",void 0),n([p({type:String})],r.prototype,"value",null),n([p({type:String})],r.prototype,"placeholder",void 0),n([p({type:String})],r.prototype,"min",void 0),n([p({type:String})],r.prototype,"max",void 0),n([p({type:Boolean,reflect:!0})],r.prototype,"disabled",void 0),n([p({type:String,reflect:!0})],r.prototype,"name",void 0),n([p({type:Boolean,reflect:!0})],r.prototype,"required",void 0),n([p({attribute:"required-message"})],r.prototype,"requiredMessage",void 0),n([d()],r.prototype,"viewDate",void 0),n([d()],r.prototype,"focusedDate",void 0),n([d()],r.prototype,"_surface",void 0),n([d()],r.prototype,"_jumpFocus",void 0),n([d()],r.prototype,"open",void 0),n([d()],r.prototype,"parsed",void 0),n([d()],r.prototype,"_hour",void 0),n([d()],r.prototype,"_minute",void 0),n([d()],r.prototype,"_period",void 0),n([d()],r.prototype,"_rangeAnchor",void 0),n([d()],r.prototype,"_rangePreview",void 0),r=f=n([C("esp-date-picker")],r);export{r as EspalierDatePicker};
