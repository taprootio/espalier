var s=function(o,e,l,p){var r=arguments.length,t=r<3?e:p===null?p=Object.getOwnPropertyDescriptor(e,l):p,u;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(o,e,l,p);else for(var n=o.length-1;n>=0;n--)(u=o[n])&&(t=(r<3?u(t):r>3?u(e,l,t):u(e,l))||t);return r>3&&t&&Object.defineProperty(e,l,t),t};import{customElement as c,property as a,state as h}from"lit/decorators.js";import{EspalierElementBase as f}from"../shared/esp-element-base.js";import{html as d}from"lit-html";import"../button/esp-button.js";import{uploadSVG as m}from"../shared/svgs/upload.js";import{createRef as v,ref as b}from"lit/directives/ref.js";let i=class extends f{constructor(){super(...arguments),this.uploadInput=v(),this.processingFiles=!1,this.accept="*",this.chooseText="Choose File",this.multiple=!1,this.filesSelected=async e=>{this.uploadInput.value&&(this.processingFiles=!0,this.dispatchEvent(new CustomEvent("files-selected",{detail:e,bubbles:!0,composed:!0})))}}finishedProcessingFiles(){this.processingFiles=!1,this.uploadInput.value&&(this.uploadInput.value.value="")}render(){return d`<esp-button
        .label="${this.chooseText}"
        .loading=${this.processingFiles}
        @click=${()=>{this.uploadInput.value?.click()}}
      >
        ${m}
      </esp-button>
      <input
        ${b(this.uploadInput)}
        type="file"
        ?multiple=${this.multiple}
        .accept=${this.accept}
        hidden
        @change=${()=>{!this.uploadInput.value||!this.uploadInput.value.files||this.filesSelected(this.uploadInput.value.files)}}
      />`}};s([h()],i.prototype,"processingFiles",void 0),s([a({attribute:"accept",type:String})],i.prototype,"accept",void 0),s([a({attribute:"choose-text",type:String})],i.prototype,"chooseText",void 0),s([a({attribute:"multiple",type:Boolean})],i.prototype,"multiple",void 0),i=s([c("esp-file-upload")],i);export{i as EspalierFileUpload};
