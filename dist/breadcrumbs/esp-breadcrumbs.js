var p=function(o,e,t,r){var a=arguments.length,s=a<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,t):r,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(o,e,t,r);else for(var i=o.length-1;i>=0;i--)(n=o[i])&&(s=(a<3?n(s):a>3?n(e,t,s):n(e,t))||s);return a>3&&s&&Object.defineProperty(e,t,s),s};import{css as h,html as u}from"lit";import{customElement as v,property as d}from"lit/decorators.js";import{EspalierElementBase as m}from"../shared/esp-element-base.js";import{createRef as g,ref as w}from"lit/directives/ref.js";export*from"./esp-breadcrumb.js";const c=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path
    d="M12.089 3.634a2 2 0 0 0 -1.089 1.78l-.001 2.586h-6.999a2 2 0 0 0 -2 2v4l.005 .15a2 2 0 0 0 1.995 1.85l6.999 -.001l.001 2.587a2 2 0 0 0 3.414 1.414l6.586 -6.586a2 2 0 0 0 0 -2.828l-6.586 -6.586a2 2 0 0 0 -2.18 -.434l-.145 .068z" />
</svg>`,f=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path
    d="M10 2l-.15 .005a2 2 0 0 0 -1.85 1.995v6.999l-2.586 .001a2 2 0 0 0 -1.414 3.414l6.586 6.586a2 2 0 0 0 2.828 0l6.586 -6.586a2 2 0 0 0 .434 -2.18l-.068 -.145a2 2 0 0 0 -1.78 -1.089l-2.586 -.001v-6.999a2 2 0 0 0 -2 -2h-4z"
  />
</svg>`;let l=class extends m{constructor(){super(...arguments),this.itemsSlot=g(),this.ariaLabel=null}firstUpdated(e){if(super.firstUpdated(e),!this.itemsSlot.value){console.warn("No items slot found for breadcrumbs.");return}this.assignSeparators()}assignSeparators(){const e=this.itemsSlot.value?.assignedElements()??[];for(let t=0;t<e.length;t++){const r=e[t],a=t===e.length-1;r.isLastElement=a;const s=r.separator===c||r.separator===f;r.separator&&!s||(r.separator=a?f:c)}}render(){return u`
      <nav aria-label=${this.ariaLabel??"Breadcrumb"}>
        <slot ${w(this.itemsSlot)} @slotchange=${this.assignSeparators}></slot>
      </nav>
    `}};l.styles=[...m.styles,h`
      nav {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--esp-size-tiny-to-small);
        font-size: var(--esp-size-small-to-normal);
      }
    `],p([d({attribute:"aria-label",type:String})],l.prototype,"ariaLabel",void 0),l=p([v("esp-breadcrumbs")],l);export{l as EspalierBreadcrumbs};
