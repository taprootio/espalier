var c=function(o,s,e,t){var r=arguments.length,l=r<3?s:t===null?t=Object.getOwnPropertyDescriptor(s,e):t,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")l=Reflect.decorate(o,s,e,t);else for(var i=o.length-1;i>=0;i--)(a=o[i])&&(l=(r<3?a(l):r>3?a(s,e,l):a(s,e))||l);return r>3&&l&&Object.defineProperty(s,e,l),l};import{css as p,html as f}from"lit";import{customElement as v}from"lit/decorators.js";import{EspalierElementBase as m}from"../shared/esp-element-base.js";import{createRef as h,ref as u}from"lit/directives/ref.js";export*from"./esp-breadcrumb.js";const d=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path
    d="M12.089 3.634a2 2 0 0 0 -1.089 1.78l-.001 2.586h-6.999a2 2 0 0 0 -2 2v4l.005 .15a2 2 0 0 0 1.995 1.85l6.999 -.001l.001 2.587a2 2 0 0 0 3.414 1.414l6.586 -6.586a2 2 0 0 0 0 -2.828l-6.586 -6.586a2 2 0 0 0 -2.18 -.434l-.145 .068z" />
</svg>`,g=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path
    d="M10 2l-.15 .005a2 2 0 0 0 -1.85 1.995v6.999l-2.586 .001a2 2 0 0 0 -1.414 3.414l6.586 6.586a2 2 0 0 0 2.828 0l6.586 -6.586a2 2 0 0 0 .434 -2.18l-.068 -.145a2 2 0 0 0 -1.78 -1.089l-2.586 -.001v-6.999a2 2 0 0 0 -2 -2h-4z"
  />
</svg>`;let n=class extends m{constructor(){super(...arguments),this.itemsSlot=h()}firstUpdated(s){if(super.firstUpdated(s),!this.itemsSlot.value){console.warn("No items slot found for breadcrumbs.");return}const e=this.itemsSlot.value.assignedElements();for(let t=0;t<e.length;t++){const r=e[t];r.separator.length>0||(r.isLastElement=t===e.length-1,r.separator=r.isLastElement?g:d)}}render(){return f`
      <div class="crumbs">
        <slot ${u(this.itemsSlot)}></slot>
      </div>
    `}};n.styles=[...m.styles,p`
      div.crumbs {
        display: flex;
        align-items: center;
        gap: var(--esp-size-tiny-to-small);
        font-size: var(--esp-size-small-to-normal);
        color: var(
          --esp-breadcrumb-separator-color,
          oklch(from var(--esp-color-complementary) var(--esp-l-accent) c h)
        );
      }
    `],n=c([v("esp-breadcrumbs")],n);export{n as EspalierBreadcrumbs};
