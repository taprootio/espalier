var a=function(r,e,t,i){var s=arguments.length,o=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,h;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(r,e,t,i);else for(var d=r.length-1;d>=0;d--)(h=r[d])&&(o=(s<3?h(o):s>3?h(e,t,o):h(e,t))||o);return s>3&&o&&Object.defineProperty(e,t,o),o};import{LitElement as g,css as b,html as m,nothing as f,unsafeCSS as $}from"lit";import{customElement as y,property as n}from"lit/decorators.js";import{classMap as w}from"lit/directives/class-map.js";import{createRef as u,ref as p}from"lit/directives/ref.js";import{styleMap as k}from"lit/directives/style-map.js";const v=70;let c="linear-gradient(to right,";for(let r=0;r<361;r++)c+=`oklch(${v}% 0.25 ${r}),`;c=c.slice(0,-1)+")";const x=r=>Number((r/100).toFixed(4)).toString();let l=class extends g{constructor(){super(...arguments),this.hueInput=u(),this.chromaInput=u(),this.lightnessInput=u(),this.mode="hc",this.chroma=25,this.hue=180,this.lightness=v,this.changed=()=>{const{hue:e,chroma:t,lightness:i}=this,s=`oklch(${x(i)} ${(t/100).toFixed(4)} ${e})`;this.dispatchEvent(new CustomEvent("value-changed",{detail:{seedColor:s,hue:e,chroma:t,lightness:i},bubbles:!0,composed:!0}))}}render(){const{hue:e,chroma:t,lightness:i}=this,s={"--selected-hue":e,"--selected-chroma":t,"--selected-lightness":`${i}%`};return m`
      <div
        class=${w({"esp-color-picker":!0,hcl:this.mode==="hcl"})}
        style=${k(s)}
      >
        <div class="preview"></div>
        <div class="hue">
          <label for="hue-slider">Hue <span class="value">${this.hue}°</span></label>
          <input
            ${p(this.hueInput)}
            id="hue-slider"
            type="range"
            min="0"
            max="360"
            value=${this.hue}
            @input=${()=>{this.hueInput.value&&(this.hue=+this.hueInput.value.value,this.changed())}}
          />
        </div>
        <div class="chroma">
          <label for="chroma-slider"
            >Chroma <span class="value">${(this.chroma/100).toFixed(3)}</span></label
          >
          <input
            ${p(this.chromaInput)}
            id="chroma-slider"
            type="range"
            min="0"
            max="25"
            value=${this.chroma}
            @input=${()=>{this.chromaInput.value&&(this.chroma=+this.chromaInput.value.value,this.changed())}}
          />
        </div>
        ${this.mode==="hcl"?m`<div class="lightness">
              <label for="lightness-slider"
                >Lightness <span class="value">${this.lightness}%</span></label
              >
              <input
                ${p(this.lightnessInput)}
                id="lightness-slider"
                type="range"
                min="0"
                max="100"
                value=${this.lightness}
                @input=${()=>{this.lightnessInput.value&&(this.lightness=+this.lightnessInput.value.value,this.changed())}}
              />
            </div>`:f}
      </div>
    `}};l.styles=b`
    div.esp-color-picker {
      display: grid;
      grid-template-columns: auto;
      align-items: center;
      gap: var(--esp-size-small);
      container-type: inline-size;
    }

    div.preview {
      grid-column: 1;
      grid-row: 3;
      border-radius: var(--esp-size-border-radius);
      border: var(--esp-size-color-picker-border-width, 2px) solid var(--esp-color-border);
      box-sizing: border-box;
      background-color: oklch(
        var(--selected-lightness) calc(var(--selected-chroma) / 100) var(--selected-hue)
      );
      height: var(--esp-size-big);
      width: 100%;
    }

    div.esp-color-picker.hcl div.preview {
      grid-row: 4;
    }

    input[type="range"] {
      appearance: none;
      height: var(--esp-size-small);
      width: 100%;
      border-radius: var(--esp-size-border-radius);
      border: var(--esp-size-color-picker-border-width, 2px) solid var(--esp-color-border);
      box-sizing: border-box;
      margin: 0;
    }

    .hue,
    .chroma,
    .lightness {
      grid-column: 1;
    }

    .value {
      font-weight: 400;
      opacity: 0.7;
      font-size: 0.85em;
      font-family: var(--esp-font-monospace);
    }

    #hue-slider {
      background: ${$(c)};
    }

    #chroma-slider {
      background: linear-gradient(
        to right,
        oklch(var(--selected-lightness) 0 var(--selected-hue)),
        oklch(var(--selected-lightness) 0.25 var(--selected-hue))
      );
    }

    #lightness-slider {
      background: linear-gradient(
        to right,
        oklch(0% calc(var(--selected-chroma) / 100) var(--selected-hue)),
        oklch(100% calc(var(--selected-chroma) / 100) var(--selected-hue))
      );
    }

    @media screen and (min-width: 400px) {
      div.esp-color-picker {
        grid-template-columns: min-content auto;
        grid-template-rows: auto auto;
      }

      div.preview {
        grid-column: 1;
        grid-row: 1 / 3;
        height: 100%;
        width: var(--esp-size-large-to-huge);
        max-width: 25cqi;
      }

      div.esp-color-picker.hcl div.preview {
        grid-row: 1 / 4;
      }

      .hue,
      .chroma,
      .lightness {
        grid-column: 2;
      }
    }
  `,a([n({type:String})],l.prototype,"mode",void 0),a([n({type:Number})],l.prototype,"chroma",void 0),a([n({type:Number})],l.prototype,"hue",void 0),a([n({type:Number})],l.prototype,"lightness",void 0),l=a([y("esp-color-picker")],l);export{l as EspalierColorPicker};
