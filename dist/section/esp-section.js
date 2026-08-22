var a=function(t,i,s,n){var o=arguments.length,e=o<3?i:n===null?n=Object.getOwnPropertyDescriptor(i,s):n,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")e=Reflect.decorate(t,i,s,n);else for(var c=t.length-1;c>=0;c--)(l=t[c])&&(e=(o<3?l(e):o>3?l(i,s,e):l(i,s))||e);return o>3&&e&&Object.defineProperty(i,s,e),e};import{css as d,html as m}from"lit";import{customElement as v}from"lit/decorators.js";import{EspalierElementBase as p}from"../shared/esp-element-base.js";let r=class extends p{render(){return m`
      <div class="esp-section" part="section">
        <div class="esp-section-well" part="well">
          <slot></slot>
        </div>
      </div>
    `}};r.styles=[...p.styles,d`
      :host {
        display: block;
      }

      .esp-section {
        background: var(--esp-section-background, var(--esp-color-background));
        padding-block: var(--esp-section-padding-block, var(--esp-size-section));
        padding-inline: var(--esp-section-padding-inline, var(--esp-size-medium));
      }

      .esp-section-well {
        max-inline-size: var(--esp-section-max-width, var(--esp-page-well-max-width, 72rem));
        margin-inline: auto;
      }
    `],r=a([v("esp-section")],r);export{r as EspalierSection};
