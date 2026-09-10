var a=function(o,e,i,t){var n=arguments.length,r=n<3?e:t===null?t=Object.getOwnPropertyDescriptor(e,i):t,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,i,t);else for(var p=o.length-1;p>=0;p--)(c=o[p])&&(r=(n<3?c(r):n>3?c(e,i,r):c(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};import{css as d,html as m}from"lit";import{customElement as u,property as l}from"lit/decorators.js";import"../pickers/esp-pick-one.js";import{EspalierElementBase as h}from"../shared/esp-element-base.js";import{FormFieldController as v}from"../shared/form-field-controller.js";let s=class extends h{constructor(){super(...arguments),this.internals=this.attachInternals(),this.formCtrl=new v({host:this,internals:this.internals,getFormValue:()=>this.selectedImage?this.value:null,getValidity:()=>null,onReset:()=>{this.value=""},onRestore:e=>{this.value=e},onDisabled:e=>{this.disabled=e}}),this.formItemDescription=null,this.formItemLabel=null,this.synchronizingPicker=!0,this.pickerSyncGeneration=0,this.images=[],this.value="",this.previewPlacement="above",this.disabled=!1,this.loading=!1,this.emptyMessage="No images available.",this.automaticLabel="Automatic",this.name="",this.handlePickerValueChanged=e=>{if(e.stopPropagation(),this.synchronizingPicker)return;const i=e.detail?.value??this.value;if(i===this.value){this.picker.value=this.value;return}this.value=i,this.formCtrl.syncValue(),this.emitValueChanged(i)}}focus(e){this.focusResolvedElementAfterUpdate(()=>this.picker,e)}setFormItemDescription(e){this.formItemDescription=e,this.syncFormItemDescription()}setFormItemLabel(e){this.formItemLabel=e,this.syncFormItemDescription()}validate(){this.formCtrl.validate()}checkValidity(){return this.formCtrl.checkValidity()}formResetCallback(){this.formCtrl.handleFormReset()}formStateRestoreCallback(e){this.formCtrl.handleFormStateRestore(e)}formDisabledCallback(e){this.formCtrl.handleFormDisabled(e)}get picker(){return this.shadowRoot?.querySelector("esp-pick-one")}get selectedImage(){return this.images.find(e=>e.id===this.value)}imageLabel(e,i){return e.label?.trim()||e.alt?.trim()||`Image ${i+1}`}get pickerItems(){return this.images.length===0?[]:[{text:this.automaticLabel,value:"",selected:this.value===""},...this.images.map((e,i)=>({text:this.imageLabel(e,i),value:e.id,selected:e.id===this.value,slotNodes:[this.thumbnailNode(e,"")]}))]}thumbnailNode(e,i){const t=document.createElement("img");return t.src=e.src,t.alt=i,t.className="thumbnail",t.style.width="var(--esp-image-picker-option-width, 12rem)",t.style.maxWidth="40vw",t.style.height="var(--esp-image-picker-option-height, 8rem)",t.style.objectFit="contain",t.loading="lazy",t.decoding="async",t}syncFormItemDescription(){const e=this.picker;e?.setFormItemDescription?.(this.formItemDescription),e?.setFormItemLabel?.(this.formItemLabel)}willUpdate(e){super.willUpdate(e),(e.has("images")||e.has("value")||e.has("automaticLabel")||e.has("disabled")||e.has("loading"))&&(this.synchronizingPicker=!0,this.pickerSyncGeneration+=1)}updated(e){super.updated(e),this.syncFormItemDescription(),(e.has("value")||e.has("images"))&&this.formCtrl.syncValueSilently();const i=this.pickerSyncGeneration,t=this.picker;if(!t){this.synchronizingPicker=!1;return}(e.has("images")||e.has("automaticLabel"))&&(t.value=this.value),t.updateComplete.then(()=>{i===this.pickerSyncGeneration&&(this.synchronizingPicker=!1)})}render(){const e=this.selectedImage,i=this.loading||this.images.length===0,t=this.loading?"Loading images\u2026":this.emptyMessage;return m`
      <div class="image-picker">
        <div class="preview" aria-live="polite">
          ${e?m`<img src=${e.src} alt=${e.alt??this.imageLabel(e,this.images.indexOf(e))} />`:m`<span>${this.automaticLabel}</span>`}
        </div>
        <div class="selection">
          <esp-pick-one
            .pickerItems=${this.pickerItems}
            .value=${this.value}
            .placeholder=${this.automaticLabel}
            .disabled=${this.disabled||i}
            @esp-value-changed=${this.handlePickerValueChanged}
          ></esp-pick-one>
          ${i?m`<p class="status" role="status">${t}</p>`:""}
        </div>
      </div>
    `}};s.formAssociated=!0,s.styles=[...h.styles,d`
      :host {
        display: block;
      }

      .image-picker {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        align-items: center;
        gap: var(--esp-size-small);
      }

      .preview {
        display: grid;
        place-items: center;
        inline-size: 100%;
        block-size: var(--esp-image-picker-preview-height, 16rem);
        box-sizing: border-box;
        overflow: hidden;
        border: 1px solid var(--esp-color-border);
        border-radius: var(--esp-size-border-radius);
        background: var(--esp-color-layer-2);
        color: var(--esp-color-text);
        font-size: var(--esp-type-tiny);
        text-align: center;
      }

      .preview img {
        min-inline-size: 0;
        min-block-size: 0;
        inline-size: 100%;
        block-size: 100%;
        object-fit: contain;
      }

      :host([preview-placement="beside"]) .image-picker {
        grid-template-columns: min-content minmax(0, 1fr);
      }

      :host([preview-placement="beside"]) .preview {
        inline-size: calc(var(--esp-size-large) * 1.5);
        block-size: var(--esp-size-large);
      }

      .selection {
        min-inline-size: 0;
      }

      esp-pick-one {
        display: block;
      }

      .status {
        margin: var(--esp-size-tiny) 0 0;
        color: var(--esp-color-text);
        font-size: var(--esp-type-tiny);
      }
    `],a([l({type:Array})],s.prototype,"images",void 0),a([l({type:String})],s.prototype,"value",void 0),a([l({attribute:"preview-placement",reflect:!0})],s.prototype,"previewPlacement",void 0),a([l({type:Boolean,reflect:!0})],s.prototype,"disabled",void 0),a([l({type:Boolean,reflect:!0})],s.prototype,"loading",void 0),a([l({attribute:"empty-message"})],s.prototype,"emptyMessage",void 0),a([l({attribute:"automatic-label"})],s.prototype,"automaticLabel",void 0),a([l({type:String,reflect:!0})],s.prototype,"name",void 0),s=a([u("esp-image-picker")],s);export{s as EspalierImagePicker};
