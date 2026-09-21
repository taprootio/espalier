var f=function(l,e,t,s){var o=arguments.length,r=o<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,t):s,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(l,e,t,s);else for(var i=l.length-1;i>=0;i--)(a=l[i])&&(r=(o<3?a(r):o>3?a(e,t,r):a(e,t))||r);return o>3&&r&&Object.defineProperty(e,t,r),r};import{css as h,html as u}from"lit";import{customElement as v}from"lit/decorators.js";import{EspalierElementBase as m}from"../shared/esp-element-base.js";import{createRef as d,ref as g}from"lit/directives/ref.js";export*from"./esp-breadcrumb.js";const p=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path
    d="M12.089 3.634a2 2 0 0 0 -1.089 1.78l-.001 2.586h-6.999a2 2 0 0 0 -2 2v4l.005 .15a2 2 0 0 0 1.995 1.85l6.999 -.001l.001 2.587a2 2 0 0 0 3.414 1.414l6.586 -6.586a2 2 0 0 0 0 -2.828l-6.586 -6.586a2 2 0 0 0 -2.18 -.434l-.145 .068z" />
</svg>`,c=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path
    d="M10 2l-.15 .005a2 2 0 0 0 -1.85 1.995v6.999l-2.586 .001a2 2 0 0 0 -1.414 3.414l6.586 6.586a2 2 0 0 0 2.828 0l6.586 -6.586a2 2 0 0 0 .434 -2.18l-.068 -.145a2 2 0 0 0 -1.78 -1.089l-2.586 -.001v-6.999a2 2 0 0 0 -2 -2h-4z"
  />
</svg>`;let n=class extends m{constructor(){super(...arguments),this.itemsSlot=d()}firstUpdated(e){if(super.firstUpdated(e),!this.itemsSlot.value){console.warn("No items slot found for breadcrumbs.");return}this.assignSeparators()}assignSeparators(){const e=this.itemsSlot.value?.assignedElements()??[];for(let t=0;t<e.length;t++){const s=e[t],o=t===e.length-1;s.isLastElement=o;const r=s.separator===p||s.separator===c;s.separator&&!r||(s.separator=o?c:p)}}render(){return u`
      <div class="crumbs">
        <slot ${g(this.itemsSlot)} @slotchange=${this.assignSeparators}></slot>
      </div>
    `}};n.styles=[...m.styles,h`
      div.crumbs {
        display: flex;
        align-items: center;
        gap: var(--esp-size-tiny-to-small);
        font-size: var(--esp-size-small-to-normal);
      }
    `],n=f([v("esp-breadcrumbs")],n);export{n as EspalierBreadcrumbs};
