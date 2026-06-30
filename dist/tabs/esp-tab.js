var l=function(i,e,o,r){var p=arguments.length,a=p<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,o):r,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(i,e,o,r);else for(var d=i.length-1;d>=0;d--)(n=i[d])&&(a=(p<3?n(a):p>3?n(e,o,a):n(e,o))||a);return p>3&&a&&Object.defineProperty(e,o,a),a};import{css as f,html as u}from"lit";import{customElement as c,property as s}from"lit/decorators.js";import{EspalierElementBase as b}from"../shared/esp-element-base.js";let t=class extends b{constructor(){super(...arguments),this.label="",this.active=!1,this.disabled=!1,this.panelId="",this.ariaLabelledBy=""}updated(e){super.updated(e),(e.has("label")||e.has("active")||e.has("disabled"))&&this.dispatchEvent(new CustomEvent("esp-tab-updated",{bubbles:!0,composed:!0}))}render(){return u`
      <div
        part="panel"
        role="tabpanel"
        id=${this.panelId}
        aria-labelledby=${this.ariaLabelledBy}
        tabindex="0"
      >
        <slot></slot>
      </div>
    `}};t.styles=[...b.styles,f`
      :host {
        display: block;
      }

      :host(:not([active])) {
        display: none;
      }

      [part="panel"] {
        padding: var(--esp-tab-size-padding, var(--esp-size-padding));
        font-family: var(--esp-font-body);
        font-size: var(--esp-size-font);
        color: var(--esp-color-text);
        outline: none;
      }
    `],l([s({type:String})],t.prototype,"label",void 0),l([s({type:Boolean,reflect:!0})],t.prototype,"active",void 0),l([s({type:Boolean,reflect:!0})],t.prototype,"disabled",void 0),l([s({attribute:!1})],t.prototype,"panelId",void 0),l([s({attribute:!1})],t.prototype,"ariaLabelledBy",void 0),t=l([c("esp-tab")],t);export{t as EspalierTab};
