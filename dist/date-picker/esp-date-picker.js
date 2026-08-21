var n=function(m,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(m,e,t,i);else for(var h=m.length-1;h>=0;h--)(a=m[h])&&(s=(r<3?a(s):r>3?a(e,t,s):a(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s},_;import{html as c,nothing as P}from"lit";import{customElement as R,property as p,state as d}from"lit/decorators.js";import{classMap as C}from"lit/directives/class-map.js";import{createRef as g,ref as v}from"lit/directives/ref.js";import{repeat as M}from"lit/directives/repeat.js";import{EspalierElementBase as D}from"../shared/esp-element-base.js";import{PopoverController as A}from"../shared/popover-controller.js";import{scrollToContainAnchoredSurface as E,spaceAroundRect as x,viewportSize as w}from"../shared/viewport.js";import{FormFieldController as G}from"../shared/form-field-controller.js";import{FormFieldDescriptionController as F}from"../shared/form-field-description-controller.js";import{leftArrow as O}from"../shared/svgs/left-arrow.js";import{rightArrow as V}from"../shared/svgs/right-arrow.js";import{checkSVG as b}from"../shared/svgs/check.js";import{cancelSVG as S}from"../shared/svgs/cancel.js";import"../button/esp-button.js";import"../pickers/esp-pick-one.js";import"../pickers/esp-picker-item.js";import{GRID_COLS as k,GRID_ROWS as q,GRID_SIZE as L,HOURS_12 as I,MINUTES_60 as B,MONTH_NAMES as T,WEEKDAY_LABELS as X}from"./helpers/constants.js";import{displayValue as Y,formatDate as $,parseValue as U}from"./helpers/parsing.js";import{generateCalendarGrid as W,getEffectiveRange as z,getSelectedDate as H,isDateDisabled as N,parseDateBound as y}from"./helpers/calendar-grid.js";import{calendarIcon as K}from"../shared/svgs/calendar-icon.js";import{datePickerStyles as j}from"./helpers/styles.js";let o=_=class extends D{constructor(){super(...arguments),this.internals=this.attachInternals(),this.formCtrl=new G({host:this,internals:this.internals,getFormValue:()=>this._value||null,getValidity:()=>this._getValidityResult(),getValidationAnchor:()=>this.inputRef.value??this,onReset:()=>{this._rangeAnchor=null,this._rangePreview=null,this._value="",this.requestUpdate("value",""),this._syncFromValue()},onRestore:e=>{this.value=e},onDisabled:e=>{this.disabled=e}}),this.formItemDescription=new F({host:this,getTarget:()=>this.inputRef.value}),this.popoverCtrl=new A({host:this,closeStrategy:"source-identity",isOpen:()=>this.open,onShouldClose:()=>this._closePopover(),onPositionUpdate:()=>this._positionPopover(),shouldContinueTracking:()=>{const e=this.getBoundingClientRect(),{height:t}=w();return!(e.bottom<0||e.top>t)},getInsideElements:()=>[this.popoverRef.value??null],onOutsideClick:()=>this._closePopover()}),this.inputRef=g(),this.popoverRef=g(),this.calBodyRef=g(),this.timePickerRef=g(),this.temporalSupported=!0,this.mode="date",this._value="",this.placeholder="Select...",this.min="",this.max="",this.disabled=!1,this.name="",this.required=!1,this.requiredMessage="",this.open=!1,this.parsed={kind:"none"},this._parsedMinDate=null,this._parsedMaxDate=null,this._hour=12,this._minute=0,this._period="AM",this._rangeAnchor=null,this._rangePreview=null,this._cachedGridKey="",this._cachedGrid=[],this._valueOnOpen="",this._touchStartX=0,this._touchStartY=0,this._touchGesture="none",this._swipeAnimating=!1,this._longPressTimer=0,this._edgeScrollTimer=0}get value(){return this._value}set value(e){const t=this._value;this._value=e,this.requestUpdate("value",t),this._syncFromValue(),this.formCtrl.syncValue()}get _rangePhase(){return this._rangeAnchor?this.parsed.kind==="range"?"complete":"start":"empty"}_getGrid(){const e=[this.viewDate?.toString(),this._value,this._rangeAnchor?.toString()??"",this._rangePreview?.toString()??""].join("|");if(e!==this._cachedGridKey){this._cachedGridKey=e;const t=H(this.parsed),{start:i,end:r}=z(this.mode,this.parsed,this._rangeAnchor,this._rangePreview);this._cachedGrid=W(this.viewDate,t,i,r,this._minDate,this._maxDate)}return this._cachedGrid}_dateAtPoint(e,t){const i=this.shadowRoot?.elementsFromPoint(e,t);if(!i)return null;for(const r of i){const s=r.dataset?.date;if(s)try{return Temporal.PlainDate.from(s)}catch{return null}}return null}_edgeSide(e){const t=this.shadowRoot?.querySelector(".calendar");if(!t)return null;const i=t.getBoundingClientRect(),r=this.shadowRoot?.querySelector(".day-cell"),s=r?r.getBoundingClientRect().width:32;return e<=i.left+s?"left":e>=i.right-s?"right":null}_onCalendarTouchStart(e){if(e.touches.length!==1||this._swipeAnimating)return;const t=e.touches[0];if(this._touchStartX=t.clientX,this._touchStartY=t.clientY,this._touchGesture="pending",this._clearLongPressTimer(),this.mode==="range"&&this._rangePhase!=="empty"){const i=this.shadowRoot?.querySelector(".calendar");i&&(i.style.touchAction="none"),this._longPressTimer=window.setTimeout(()=>{if(this._longPressTimer=0,this._touchGesture!=="pending")return;this._touchGesture="drag";const r=this._dateAtPoint(this._touchStartX,this._touchStartY);r&&!this._isDateDisabled(r)&&(this._rangePhase==="complete"&&(this._rangeAnchor=r,this._value="",this.parsed={kind:"none"},this.formCtrl.syncValue()),this._rangePreview=r,this.requestUpdate())},_.LONG_PRESS_MS)}}_onCalendarTouchMove(e){if(e.touches.length!==1||this._swipeAnimating||this._touchGesture==="none")return;const t=e.touches[0],i=t.clientX-this._touchStartX,r=t.clientY-this._touchStartY;if(this._touchGesture==="drag"){e.cancelable&&e.preventDefault();const s=this._dateAtPoint(t.clientX,t.clientY);s&&!this._isDateDisabled(s)&&(this._rangePreview=s),this._handleEdgeScroll(t.clientX);return}if(this._touchGesture==="pending"){if(Math.abs(i)<10&&Math.abs(r)<10)return;if(this._clearLongPressTimer(),Math.abs(r)>Math.abs(i)){this._touchGesture="none",this._resetTouchAction();return}this._touchGesture="swipe"}if(this._touchGesture==="swipe"){e.cancelable&&e.preventDefault();const s=this.calBodyRef.value;s&&(s.style.transition="none",s.style.transform=`translateX(${i}px)`)}}_onCalendarTouchEnd(e){this._clearLongPressTimer(),this._clearEdgeScrollTimer(),this._resetTouchAction();const t=this._touchGesture;if(this._touchGesture="none",t==="drag"){if(e.changedTouches.length===1){const r=e.changedTouches[0];let s=this._dateAtPoint(r.clientX,r.clientY);if(s||(s=this._rangePreview),s&&!this._isDateDisabled(s)&&this._rangeAnchor){const a=this._rangeAnchor;let h,l;Temporal.PlainDate.compare(s,a)<0?(h=s,l=a):(h=a,l=s),this._rangePreview=null,this.value=`${h.toString()}/${l.toString()}`,this._dispatchValueChanged()}}return}if(t==="swipe"){this._finishSwipe(e);return}const i=this.calBodyRef.value;i&&(i.style.transition="",i.style.transform="")}_finishSwipe(e){const t=this.calBodyRef.value;if(!t||e.changedTouches.length!==1){t&&(t.style.transition="",t.style.transform="");return}const r=e.changedTouches[0].clientX-this._touchStartX,s=t.offsetWidth;if(Math.abs(r)>=30){const a=r<0?1:-1,h=a===1?-s:s;this._swipeAnimating=!0,t.style.transition="transform 150ms ease-in",t.style.transform=`translateX(${h}px)`,t.addEventListener("transitionend",()=>{this._navigateMonth(a),this.updateComplete.then(()=>{const l=this.calBodyRef.value;if(!l){this._swipeAnimating=!1;return}l.style.transition="none",l.style.transform=`translateX(${-h}px)`,l.getBoundingClientRect(),l.style.transition="transform 150ms ease-out",l.style.transform="",l.addEventListener("transitionend",()=>{l.style.transition="",this._swipeAnimating=!1},{once:!0})})},{once:!0})}else t.style.transition="transform 150ms ease-out",t.style.transform="",t.addEventListener("transitionend",()=>{t.style.transition=""},{once:!0})}_clearLongPressTimer(){this._longPressTimer&&(clearTimeout(this._longPressTimer),this._longPressTimer=0)}_handleEdgeScroll(e){const t=this._edgeSide(e);if(!t){this._clearEdgeScrollTimer();return}if(this._edgeScrollTimer)return;const i=t==="right"?1:-1;this._edgeScrollTimer=window.setTimeout(async()=>{this._edgeScrollTimer=0,this._touchGesture==="drag"&&(this._navigateMonth(i),await this.updateComplete)},_.EDGE_SCROLL_MS)}_clearEdgeScrollTimer(){this._edgeScrollTimer&&(clearTimeout(this._edgeScrollTimer),this._edgeScrollTimer=0)}_resetTouchAction(){const e=this.shadowRoot?.querySelector(".calendar");e&&e.style.removeProperty("touch-action")}connectedCallback(){if(super.connectedCallback(),typeof window.Temporal>"u"){this.temporalSupported=!1;return}this.viewDate||(this.viewDate=Temporal.Now.plainDateISO().toPlainYearMonth()),this.focusedDate||(this.focusedDate=Temporal.Now.plainDateISO()),this._parsedMinDate=y(this.min),this._parsedMaxDate=y(this.max),this._syncFromValue(),this.formCtrl.validate()}disconnectedCallback(){super.disconnectedCallback()}willUpdate(e){super.willUpdate(e),e.has("min")&&(this._parsedMinDate=y(this.min)),e.has("max")&&(this._parsedMaxDate=y(this.max))}updated(e){super.updated(e),e.has("disabled")&&(this.internals.ariaDisabled=this.disabled?"true":"false"),e.has("required")&&(this.internals.ariaRequired=this.required?"true":"false",this.formCtrl.validate()),(e.has("min")||e.has("max"))&&this.formCtrl.validate()}focus(e){this.focusResolvedElementAfterUpdate(()=>this.inputRef.value,e)}setFormItemDescription(e){this.formItemDescription.setDescription(e)}setFormItemLabel(e){this.formItemDescription.setLabel(e)}validate(){this.formCtrl.validate()}checkValidity(){return this.formCtrl.checkValidity()}formResetCallback(){this.formCtrl.handleFormReset()}formStateRestoreCallback(e){this.formCtrl.handleFormStateRestore(e)}formDisabledCallback(e){this.formCtrl.handleFormDisabled(e)}_syncFromValue(){if(this.temporalSupported)switch(this.parsed=U(this._value,this.mode),this.parsed.kind){case"date":this.viewDate=this.parsed.date.toPlainYearMonth(),this.focusedDate=this.parsed.date;break;case"datetime":{this.viewDate=this.parsed.datetime.toPlainDate().toPlainYearMonth(),this.focusedDate=this.parsed.datetime.toPlainDate();const e=this.parsed.datetime.toPlainTime(),t=e.hour;this._period=t>=12?"PM":"AM",this._hour=t===0?12:t>12?t-12:t,this._minute=e.minute;break}case"time":{const e=this.parsed.time,t=e.hour;this._period=t>=12?"PM":"AM",this._hour=t===0?12:t>12?t-12:t,this._minute=e.minute;break}case"range":this.viewDate=this.parsed.start.toPlainYearMonth(),this.focusedDate=this.parsed.start,this._rangeAnchor=this.parsed.start,this._rangePreview=null;break;case"none":break}}_getValidityResult(){if(!this.temporalSupported)return null;if(this.required&&!this._value)return{flags:{valueMissing:!0},message:this.requiredMessage||"Please select a date."};if(this._value&&this.parsed.kind==="none")return{flags:{typeMismatch:!0},message:"The value is not a valid date."};const e=this._getValidationDates();if(e.length>0){const t=this._minDate,i=this._maxDate;if(t){for(const r of e)if(Temporal.PlainDate.compare(r,t)<0)return{flags:{rangeUnderflow:!0},message:`Date must not be before ${$(t)}.`}}if(i){for(const r of e)if(Temporal.PlainDate.compare(r,i)>0)return{flags:{rangeOverflow:!0},message:`Date must not be after ${$(i)}.`}}}return null}_getValidationDates(){switch(this.parsed.kind){case"date":return[this.parsed.date];case"datetime":return[this.parsed.datetime.toPlainDate()];case"range":return[this.parsed.start,this.parsed.end];default:return[]}}get _minDate(){return this._parsedMinDate}get _maxDate(){return this._parsedMaxDate}_isDateDisabled(e){return N(e,this._minDate,this._maxDate)}_navigateMonth(e){this.viewDate=this.viewDate.add({months:e}),this.focusedDate=this.viewDate.toPlainDate({day:Math.min(this.focusedDate.day,this.viewDate.daysInMonth)})}_moveFocus(e){const t=this.focusedDate.add({days:e});if(this._isDateDisabled(t)){const r=e>0?1:-1;let s=t;for(let a=0;a<L&&this._isDateDisabled(s);a++)s=s.add({days:r});this.focusedDate=s}else this.focusedDate=t;const i=this.focusedDate.toPlainYearMonth();Temporal.PlainYearMonth.compare(i,this.viewDate)!==0&&(this.viewDate=i),this.mode==="range"&&this._rangePhase==="start"&&(this._rangePreview=this.focusedDate)}_selectDate(e){if(!this._isDateDisabled(e)){switch(this.mode){case"date":this.value=e.toString(),this._closePopover(),this.inputRef.value?.focus();break;case"datetime":{const t=this.parsed.kind==="datetime"?this.parsed.datetime.toPlainTime():new Temporal.PlainTime;this.value=e.toPlainDateTime(t).toString();break}case"range":this._selectRangeEndpoint(e);break}this._dispatchValueChanged()}}_selectRangeEndpoint(e){switch(this._rangePhase){case"empty":case"complete":this._rangeAnchor=e,this._rangePreview=null,this._value="",this.parsed={kind:"none"},this.formCtrl.syncValue(),this.requestUpdate();break;case"start":{const i=this._rangeAnchor;let r,s;Temporal.PlainDate.compare(e,i)<0?(r=e,s=i):(r=i,s=e),this._rangePreview=null,this.value=`${r.toString()}/${s.toString()}`;break}}}_dispatchValueChanged(){this.emitValueChanged(this._value)}get _showTimePicker(){return this.mode==="time"||this.mode==="datetime"}get _showCalendar(){return this.mode!=="time"}_commitTime(){let e=this._hour%12;this._period==="PM"&&(e+=12);const t=new Temporal.PlainTime(e,this._minute);if(this.mode==="time")this.value=t.toString();else if(this.mode==="datetime"){const i=this.parsed.kind==="datetime"?this.parsed.datetime.toPlainDate():this.parsed.kind==="date"?this.parsed.date:Temporal.Now.plainDateISO();this.value=i.toPlainDateTime(t).toString()}this._dispatchValueChanged()}async _openPopover(){if(this.disabled)return;this.popoverCtrl.publishCloseOthers(),this._valueOnOpen=this._value,this.open=!0,this._positionPopover(),this.popoverCtrl.startTracking(),this.popoverCtrl.startOutsideClick(),await this.updateComplete,this._shrinkTimePickerToFit(),this._scrollToContainPopover();const t=this.shadowRoot?.querySelector('[role="grid"]')?.querySelector('[tabindex="0"]');requestAnimationFrame(()=>t?.focus())}_closePopover(){this.open=!1;const e=this.popoverRef.value;if(e){e.classList.remove("visible");try{e.hidePopover()}catch{}}this.popoverCtrl.stopTracking(),this.popoverCtrl.stopOutsideClick(),this.mode==="range"&&this._rangePhase==="start"&&(this._rangeAnchor=null,this._rangePreview=null)}_togglePopover(){this.open?this._closePopover():this._openPopover()}_positionPopover(){const e=this.popoverRef.value;if(!e)return;const t=this.getBoundingClientRect(),{width:i,height:r}=w(),{spaceAbove:s,spaceBelow:a}=x(t,r);e.matches(":popover-open")||e.showPopover(),e.style.removeProperty("top"),e.style.removeProperty("bottom"),e.style.removeProperty("font-size"),e.style.setProperty("width","min-content"),this._shrinkToFitViewport(e,i);let h=t.left;const l=e.offsetWidth;h+l>i&&(h=Math.max(0,i-l)),e.style.setProperty("left",`${h}px`);const f=e.offsetHeight;if(s>a){let u=r-t.top;f>s&&(u=r-f),e.style.setProperty("bottom",`${u}px`)}else{let u=t.bottom;f>a&&(u=r-f),e.style.setProperty("top",`${Math.max(0,u)}px`)}requestAnimationFrame(()=>e.classList.add("visible"))}_shrinkToFitViewport(e,t){if(e.offsetWidth<=t)return;const i=getComputedStyle(e);let r=parseFloat(i.fontSize);const s=8;for(;e.offsetWidth>t&&r>s;)r-=.5,e.style.setProperty("font-size",`${r}px`)}_shrinkTimePickerToFit(){const e=this.timePickerRef.value,t=this.popoverRef.value;if(!e||!t)return;e.style.removeProperty("font-size");const i=t.clientWidth;if(e.scrollWidth<=i)return;const r=getComputedStyle(e);let s=parseFloat(r.fontSize);const a=8;for(;e.scrollWidth>i&&s>a;)s-=.5,e.style.setProperty("font-size",`${s}px`)}_scrollToContainPopover(){const e=this.popoverRef.value;e&&E(this,e,()=>this._positionPopover())}async _handleGridKeyDown(e){let t=!0;switch(e.key){case"ArrowLeft":this._moveFocus(-1);break;case"ArrowRight":this._moveFocus(1);break;case"ArrowUp":this._moveFocus(-7);break;case"ArrowDown":this._moveFocus(7);break;case"Home":{const i=this.focusedDate.dayOfWeek;i>1&&this._moveFocus(-(i-1));break}case"End":{const i=this.focusedDate.dayOfWeek;i<7&&this._moveFocus(7-i);break}case"PageUp":this._navigateMonth(e.shiftKey?-12:-1);break;case"PageDown":this._navigateMonth(e.shiftKey?12:1);break;case"Enter":case" ":this._selectDate(this.focusedDate);break;case"Escape":this._closePopover(),this.inputRef.value?.focus();break;default:t=!1}t&&(e.preventDefault(),e.stopPropagation(),await this.updateComplete,this.shadowRoot?.querySelector('[role="grid"]')?.querySelector('[tabindex="0"]')?.focus())}_onDayCellHover(e){this.mode==="range"&&this._rangePhase==="start"&&(this._rangePreview=e)}render(){return this.temporalSupported?c`
      
      <div class="esp-field" @click=${()=>this._togglePopover()}>
        <input
          ${v(this.inputRef)}
          class="esp-input"
          .value=${Y(this.parsed)}
          placeholder=${this.placeholder}
          readonly
          ?disabled=${this.disabled}
          aria-haspopup="dialog"
          aria-expanded=${this.open?"true":"false"}
          @keydown=${e=>{(e.key==="Enter"||e.key===" "||e.key==="ArrowDown"||e.key==="ArrowUp")&&(e.preventDefault(),this._openPopover()),e.key==="Escape"&&this.open&&(e.preventDefault(),this._closePopover())}}
        />
        <label class="field-icon">${K}</label>
      </div>

      
      <div
        ${v(this.popoverRef)}
        class="picker-popover"
        popover="manual"
        @keydown=${e=>{e.key==="Tab"&&(e.preventDefault(),this._closePopover(),this.inputRef.value?.focus())}}
      >
        ${this._showCalendar?this._renderCalendar():P}
        ${this._showTimePicker?this._renderTimePicker():P}
        ${!this._showTimePicker&&this.mode!=="date"?this._renderActions():P}
      </div>
    `:c`<p class="temporal-error">
        <code>Temporal</code> API not found. Load the polyfill in <code>&lt;head&gt;</code> before
        using <code>&lt;esp-date-picker&gt;</code>.
      </p>`}_renderCalendar(){const e=this._getGrid(),t=`${T[this.viewDate.month-1]} ${this.viewDate.year}`;return c`
      <div
        class="calendar"
        @keydown=${i=>this._handleGridKeyDown(i)}
        @touchstart=${i=>this._onCalendarTouchStart(i)}
        @touchmove=${i=>this._onCalendarTouchMove(i)}
        @touchend=${i=>this._onCalendarTouchEnd(i)}
        @touchcancel=${i=>this._onCalendarTouchEnd(i)}
      >
        
        <header class="cal-header">
          <button
            class="nav-btn"
            aria-label="Previous month"
            @click=${i=>{i.stopPropagation(),this._navigateMonth(-1)}}
          >
            ${O}
          </button>
          <span class="cal-title">${t}</span>
          <button
            class="nav-btn"
            aria-label="Next month"
            @click=${i=>{i.stopPropagation(),this._navigateMonth(1)}}
          >
            ${V}
          </button>
        </header>

        
        <div ${v(this.calBodyRef)} class="cal-body">
          <div class="weekday-row" role="row">
            ${X.map(i=>c`<abbr class="weekday-label" title=${i}>${i}</abbr>`)}
          </div>

          <div class="day-grid" role="grid" aria-label=${t}>
            ${this._renderGridRows(e)}
          </div>
        </div>
      </div>
    `}_renderGridRows(e){const t=[];for(let i=0;i<q;i++){const r=e.slice(i*k,(i+1)*k);t.push(c`
        <div class="day-row" role="row">
          ${M(r,s=>s.date.toString(),s=>this._renderDayCell(s))}
        </div>
      `)}return t}_renderDayCell(e){const t=this.focusedDate&&Temporal.PlainDate.compare(e.date,this.focusedDate)===0,i={"day-cell":!0,"outside-month":e.isOutsideMonth,today:e.isToday,selected:e.isSelected||e.isRangeStart||e.isRangeEnd,"range-start":e.isRangeStart,"range-end":e.isRangeEnd,"in-range":e.isInRange,disabled:e.isDisabled,focused:t};return c`
      <button
        role="gridcell"
        class=${C(i)}
        tabindex=${t?0:-1}
        data-date=${e.date.toString()}
        aria-selected=${e.isSelected||e.isRangeStart||e.isRangeEnd?"true":"false"}
        aria-disabled=${e.isDisabled?"true":"false"}
        ?disabled=${e.isDisabled}
        aria-label=${`${T[e.date.month-1]} ${e.date.day}, ${e.date.year}`}
        aria-current=${e.isToday?"date":"false"}
        @click=${async r=>{r.stopPropagation(),this.focusedDate=e.date,this._selectDate(e.date),this.open&&(await this.updateComplete,this.shadowRoot?.querySelector('[role="grid"]')?.querySelector('[tabindex="0"]')?.focus())}}
        @pointerenter=${()=>this._onDayCellHover(e.date)}
      >
        ${e.date.day}
      </button>
    `}_renderTimePicker(){return c`
      <div ${v(this.timePickerRef)} class="time-picker" aria-label="Time picker">
        <esp-pick-one
          class="time-pick"
          placeholder="Hour"
          width="3.25em"
          .value=${String(this._hour)}
          @value-changed=${e=>{e.stopPropagation(),e.detail?.value&&(this._hour=Number(e.detail.value),this._commitTime())}}
        >
          ${I.map(e=>c`
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
          @value-changed=${e=>{e.stopPropagation(),e.detail?.value&&(this._minute=Number(e.detail.value),this._commitTime())}}
        >
          ${B.map(e=>c`
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
          @value-changed=${e=>{e.stopPropagation(),e.detail?.value&&(this._period=e.detail.value,this._commitTime())}}
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
          @clicked=${()=>{this._closePopover(),this.inputRef.value?.focus()}}
        >
          ${b}
        </esp-button>
        <esp-button
          icon-only
          intent="danger"
          @clicked=${()=>{this.value=this._valueOnOpen,this._closePopover(),this.inputRef.value?.focus()}}
        >
          ${S}
        </esp-button>
      </div>
    `}_renderActions(){return c`
      <div class="popover-actions">
        <esp-button
          icon-only
          @clicked=${()=>{this._closePopover(),this.inputRef.value?.focus()}}
        >
          ${b}
        </esp-button>
        <esp-button
          icon-only
          intent="danger"
          @clicked=${()=>{this.value=this._valueOnOpen,this._closePopover(),this.inputRef.value?.focus()}}
        >
          ${S}
        </esp-button>
      </div>
    `}};o.formAssociated=!0,o.LONG_PRESS_MS=400,o.EDGE_SCROLL_MS=1e3,o.styles=[...D.styles,j],n([d()],o.prototype,"temporalSupported",void 0),n([p({type:String,reflect:!0})],o.prototype,"mode",void 0),n([p({type:String})],o.prototype,"value",null),n([p({type:String})],o.prototype,"placeholder",void 0),n([p({type:String})],o.prototype,"min",void 0),n([p({type:String})],o.prototype,"max",void 0),n([p({type:Boolean,reflect:!0})],o.prototype,"disabled",void 0),n([p({type:String,reflect:!0})],o.prototype,"name",void 0),n([p({type:Boolean,reflect:!0})],o.prototype,"required",void 0),n([p({attribute:"required-message"})],o.prototype,"requiredMessage",void 0),n([d()],o.prototype,"viewDate",void 0),n([d()],o.prototype,"focusedDate",void 0),n([d()],o.prototype,"open",void 0),n([d()],o.prototype,"parsed",void 0),n([d()],o.prototype,"_hour",void 0),n([d()],o.prototype,"_minute",void 0),n([d()],o.prototype,"_period",void 0),n([d()],o.prototype,"_rangeAnchor",void 0),n([d()],o.prototype,"_rangePreview",void 0),o=_=n([R("esp-date-picker")],o);export{o as EspalierDatePicker};
