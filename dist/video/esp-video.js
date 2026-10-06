var r=function(l,e,t,s){var o=arguments.length,n=o<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,t):s,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(l,e,t,s);else for(var h=l.length-1;h>=0;h--)(c=l[h])&&(n=(o<3?c(n):o>3?c(e,t,n):c(e,t))||n);return o>3&&n&&Object.defineProperty(e,t,n),n};import{css as k,html as p,nothing as d}from"lit";import{customElement as E,property as a,state as u}from"lit/decorators.js";import{EspalierElementBase as y}from"../shared/esp-element-base.js";import{ESP_EVENTS as f}from"../shared/events.js";import{srOnly as O}from"../shared/style-fragments.js";import{prefersReducedMotion as S}from"../shared/viewport.js";import{parseImageRatio as A}from"../image/image-ratio.js";import{enumConverter as v}from"../shared/enum-converter.js";const m="application/vnd.apple.mpegurl",x="16 / 9",b=new Set(["none","metadata","auto"]),g=new Set(["native","none"]),P=new Set(["","anonymous","use-credentials"]),w={fromAttribute(l){return l===null?"":l==="use-credentials"?"use-credentials":"anonymous"},toAttribute(l){return l||null}};function C(l){const e=l.error;return e?e.message||`MediaError code ${e.code}.`:"The video reported a playback error."}let i=class extends y{constructor(){super(...arguments),this.src="",this.type="application/vnd.apple.mpegurl",this.poster="",this.posterAlt="",this.label="",this.aspectRatio="16 / 9",this.preload="none",this.autoplay=!1,this.muted=!1,this.loop=!1,this.playsinline=!1,this.controls="native",this.deferOffscreen=!1,this.fallbackSrc="",this.crossOrigin="",this.phase="idle",this.started=!1,this.offscreenAdmitted=!1,this.attached=null,this.mutedVideo=null,this.generation=0,this.triedFallback=!1,this.readyEmitted=!1,this.playIntent=!1,this.autoplayAttempted=!1,this.intentAutoplay=!1,this.autoplayPending=!1,this.playAttempt=0,this.pendingPlay=null,this.focusMessageOnError=!1,this.offscreenObserver=null,this.handleTrackSlotChange=()=>{const e=this.video;e&&this.attached&&this.mirrorTracks(e)},this.handlePlayClick=()=>{this.phase!=="loading"&&this.requestPlayback(!1)},this.handleLoadedMetadata=e=>{this.emitReady(e.currentTarget)},this.handlePlay=()=>{if(!this.attached)return;const e=this.autoplayPending;this.autoplayPending=!1,this.intentAutoplay=e,this.playIntent=!0,this.pendingPlay={autoplay:e}},this.handlePlaying=async e=>{const t=e.currentTarget;if(!this.attached)return;const s=this.pendingPlay;this.pendingPlay=null;const o=this.generation;if(s&&this.dispatchEvent(new CustomEvent(f.VIDEO_PLAY,{detail:{src:this.src,mode:this.attached.mode,currentTime:t.currentTime,autoplay:s.autoplay},bubbles:!0,composed:!0})),o!==this.generation)return;const n=this.shadowRoot?.activeElement?.classList.contains("play")??!1;this.started=!0,this.phase="playing",n&&(await this.updateComplete,t.focus())},this.handleVideoError=e=>{const t=e.currentTarget;if(!this.attached)return;const s=this.generation,o=this.playIntent&&(!this.started||!t.paused);this.failOver(t,"media",C(t))&&o&&this.startPlayback(t,s)}}get video(){return this.shadowRoot?.querySelector("video")??null}canPlayNatively(e){return e.canPlayType(this.type||m)!==""}playLabel(){return this.label?this.label:this.posterAlt?`Play video: ${this.posterAlt}`:"Play video"}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this.offscreenObserver?.disconnect(),this.offscreenObserver=null,this.offscreenAdmitted=!1,this.resetSource()}syncOffscreenDeferral(){if(!this.deferOffscreen||typeof IntersectionObserver>"u"){this.offscreenObserver?.disconnect(),this.offscreenObserver=null,this.offscreenAdmitted||(this.offscreenAdmitted=!0);return}if(this.offscreenAdmitted||this.offscreenObserver)return;const e=new IntersectionObserver(t=>{this.offscreenObserver===e&&t.some(s=>s.isIntersecting)&&(e.disconnect(),this.offscreenObserver=null,this.offscreenAdmitted=!0)},{rootMargin:"200px"});this.offscreenObserver=e,e.observe(this)}willUpdate(e){super.willUpdate(e),this.isConnected&&!this.offscreenAdmitted&&this.syncOffscreenDeferral(),this.src??="",this.type??=m,this.poster??="",this.posterAlt??="",this.label??="",this.fallbackSrc??="";const t=A(this.aspectRatio)??x;this.style.setProperty("--_esp-video-aspect-ratio",t),e.has("preload")&&!b.has(this.preload)&&(this.preload="none"),e.has("controls")&&!g.has(this.controls)&&(this.controls="native"),e.has("crossOrigin")&&!P.has(this.crossOrigin)&&(this.crossOrigin="anonymous"),this.hasUpdated&&["src","type","fallbackSrc"].some(s=>e.has(s)&&e.get(s)!==this[s])&&this.resetSource()}updated(e){if(super.updated(e),this.syncMuted(e),this.focusMessageOnError&&this.phase==="error"&&(this.focusMessageOnError=!1,this.shadowRoot?.querySelector('[part="message"]')?.focus()),!(!this.offscreenAdmitted||!this.isConnected)){if(this.autoplay&&!this.autoplayAttempted&&!this.playIntent&&(this.src||this.fallbackSrc)&&(this.autoplayAttempted=!0,!S())){this.requestPlayback(!0);return}if(this.preload!=="none"&&this.phase!=="error"&&!this.attached&&this.src){const t=this.video;t&&this.attachSource(t,!0)}}}syncMuted(e){const t=this.video;if(!t)return;const s=t!==this.mutedVideo;this.mutedVideo=t,!(!s&&!e.has("muted")&&!e.has("autoplay"))&&(this.muted||this.autoplay?t.muted=!0:t.paused&&(t.muted=!1))}async requestPlayback(e){if(this.phase==="loading"&&this.playIntent)return;const t=this.generation;this.playIntent=!0,this.intentAutoplay=e,(!this.started||this.phase==="error")&&(this.phase="loading"),await this.updateComplete;const s=this.video;!s||t!==this.generation||!this.attached&&!this.attachSource(s,!1)||(e&&(s.muted=!0),await this.startPlayback(s,t))}async startPlayback(e,t){if(t!==this.generation)return;const s=++this.playAttempt;this.autoplayPending=this.intentAutoplay;try{await e.play()}catch(o){if(t!==this.generation||s!==this.playAttempt)return;this.autoplayPending=!1,o?.name==="NotAllowedError"&&this.phase!=="error"&&(this.playIntent=!1,this.phase=this.started?"playing":"idle")}}attachSource(e,t){return this.src&&this.canPlayNatively(e)?(this.useSource(e,this.src,"native"),!0):t?!1:this.fallbackSrc?(this.useSource(e,this.fallbackSrc,"fallback"),!0):(this.fail(null,"unsupported",this.src?`This browser cannot play ${this.type}.`:"No video source is set."),!1)}useSource(e,t,s){this.mirrorTracks(e),this.attached={mode:s},this.readyEmitted=!1,e.src=t}failOver(e,t,s){const o=this.attached?.mode??null,n=!!this.fallbackSrc&&!this.triedFallback&&o!=="fallback",c=this.generation;return this.emitError(o,t,s,n),c!==this.generation?!1:(this.attached=null,this.pendingPlay=null,n?(this.triedFallback=!0,this.useSource(e,this.fallbackSrc,"fallback"),!0):(this.enterError(),!1))}emitError(e,t,s,o){this.dispatchEvent(new CustomEvent(f.VIDEO_ERROR,{detail:{src:this.src,mode:e,reason:t,message:s,fallback:o},bubbles:!0,composed:!0}))}fail(e,t,s){const o=this.generation;this.emitError(e,t,s,!1),o===this.generation&&this.enterError()}enterError(){const e=this.shadowRoot?.activeElement;this.focusMessageOnError=!!e?.classList.contains("play")||e!==null&&e===this.video,this.phase="error"}resetSource(){this.generation+=1;const e=this.attached!==null;this.attached=null,this.triedFallback=!1,this.readyEmitted=!1,this.playIntent=!1,this.autoplayAttempted=!1,this.intentAutoplay=!1,this.autoplayPending=!1,this.pendingPlay=null,this.focusMessageOnError=!1,this.started=!1,this.phase="idle";const t=this.video;t&&(e||t.hasAttribute("src"))&&(t.pause(),t.removeAttribute("src"),t.load())}mirrorTracks(e){for(const t of e.querySelectorAll("track"))t.remove();for(const t of this.children)t.localName==="track"&&e.append(t.cloneNode(!0))}emitReady(e){!this.attached||this.readyEmitted||(this.readyEmitted=!0,this.dispatchEvent(new CustomEvent(f.VIDEO_READY,{detail:{src:this.src,mode:this.attached.mode,duration:e.duration},bubbles:!0,composed:!0})))}renderPosterContent(){if(this.phase==="error")return p`<div part="message" class="message" role="alert" tabindex="-1">
        <slot name="error">This video can’t be played right now.</slot>
      </div>`;const e=this.phase==="loading";return p`<button
      part="play"
      class="play"
      type="button"
      aria-label=${this.playLabel()}
      aria-disabled=${e?"true":d}
      @click=${this.handlePlayClick}
    >
      <span part="play-icon" class="play-icon" aria-hidden="true">
        ${e?p`<span class="spinner"></span>`:p`<svg viewBox="0 0 24 24" focusable="false">
              <path
                d="M8 5.5v13a1 1 0 0 0 1.52.85l10.4-6.5a1 1 0 0 0 0-1.7L9.52 4.65A1 1 0 0 0 8 5.5Z"
              />
            </svg>`}
      </span>
    </button>`}render(){const e=!this.started||this.phase==="error",t=!this.deferOffscreen||this.offscreenAdmitted;return p`
      <div part="frame" class="frame" data-phase=${this.phase}>
        <video
          part="video"
          class="video"
          preload=${this.preload}
          crossorigin=${this.crossOrigin||d}
          tabindex=${this.controls==="none"||this.phase==="error"?"-1":d}
          aria-label=${this.label||this.posterAlt||d}
          ?controls=${this.controls==="native"&&this.started&&this.phase!=="error"}
          ?loop=${this.loop}
          ?playsinline=${this.playsinline}
          @loadedmetadata=${this.handleLoadedMetadata}
          @play=${this.handlePlay}
          @playing=${this.handlePlaying}
          @error=${this.handleVideoError}
        ></video>
        <div part="poster" class="poster" ?data-dismissed=${!e}>
          ${this.poster&&t?p`<img
                part="poster-image"
                class="poster-image"
                loading=${this.deferOffscreen?"lazy":"eager"}
                decoding="async"
                alt=""
                src=${this.poster}
              />`:d}
          ${this.renderPosterContent()}
        </div>
        <span class="sr-only" role="status"
          >${this.phase==="loading"?"Loading video":""}</span
        >
        <slot class="tracks" @slotchange=${this.handleTrackSlotChange}></slot>
      </div>
    `}};i.styles=[...y.styles,O,k`
      :host {
        display: block;
        position: relative;
        box-sizing: border-box;
        aspect-ratio: var(--_esp-video-aspect-ratio, 16 / 9);
        overflow: hidden;
        border-radius: var(--esp-video-border-radius, var(--esp-size-border-radius));
        background: var(
          --esp-video-surface,
          oklch(from var(--esp-color-text, oklch(0.2 0 0)) 0.16 min(c, 0.02) h)
        );
      }

      .frame,
      .video {
        display: block;
        inline-size: 100%;
        block-size: 100%;
      }

      .frame {
        position: relative;
      }

      .video {
        object-fit: var(--esp-video-object-fit, contain);
        accent-color: var(--esp-video-accent, var(--esp-color-primary));
      }

      .video:focus {
        outline: none;
      }

      .video:focus-visible {
        outline: var(--esp-video-focus-outline, 3px solid var(--esp-color-link));
        outline-offset: -3px;
      }

      .poster {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        transition:
          opacity 200ms ease,
          visibility 0s linear 0s;
      }

      .poster[data-dismissed] {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition:
          opacity 200ms ease,
          visibility 0s linear 200ms;
      }

      .poster-image {
        position: absolute;
        inset: 0;
        display: block;
        inline-size: 100%;
        block-size: 100%;
        object-fit: cover;
      }

      .frame[data-phase="error"] .poster-image {
        opacity: 0.45;
      }

      .play {
        position: absolute;
        inset: 0;
        display: grid;
        place-items: center;
        margin: 0;
        padding: 0;
        border: 0;
        background: transparent;
        color: inherit;
        font: inherit;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
      }

      .play[aria-disabled="true"] {
        cursor: progress;
      }

      .play:focus {
        outline: none;
      }

      .play-icon {
        display: grid;
        place-items: center;
        inline-size: var(--esp-video-play-size, var(--esp-size-huge, 4rem));
        aspect-ratio: 1;
        border-radius: 50%;
        background: var(
          --esp-video-play-background,
          color-mix(in oklch, var(--esp-color-background, oklch(0.98 0 0)) 90%, transparent)
        );
        color: var(--esp-video-play-color, var(--esp-color-text, oklch(0.2 0 0)));
        
        box-shadow:
          0 0 0 1px
            color-mix(
              in oklch,
              var(--esp-video-play-color, var(--esp-color-text, oklch(0.2 0 0))) 28%,
              transparent
            ),
          0 2px 12px oklch(0 0 0 / 0.28);
        transition: transform 150ms ease;
      }

      .play:hover .play-icon {
        transform: scale(1.06);
      }

      .play:focus-visible .play-icon {
        outline: var(--esp-video-focus-outline, 3px solid var(--esp-color-link));
        outline-offset: 3px;
      }

      .play-icon svg {
        inline-size: 45%;
        block-size: 45%;
        
        translate: 6% 0;
        fill: currentColor;
      }

      .spinner {
        inline-size: 40%;
        aspect-ratio: 1;
        border-radius: 50%;
        border: 3px solid currentColor;
        border-block-start-color: transparent;
        animation: esp-video-spin 900ms linear infinite;
      }

      @keyframes esp-video-spin {
        to {
          rotate: 1turn;
        }
      }

      .message {
        position: relative;
        max-inline-size: min(28rem, calc(100% - 2 * var(--esp-size-padding, 1rem)));
        padding: var(--esp-size-small, 0.5rem) var(--esp-size-padding, 1rem);
        border-radius: var(--esp-size-border-radius);
        background: var(--esp-video-message-background, var(--esp-color-background));
        color: var(--esp-video-message-color, var(--esp-color-text));
        font-size: var(--esp-type-small, 0.875rem);
        text-align: center;
      }

      .message:focus {
        outline: none;
      }

      .message:focus-visible {
        outline: var(--esp-video-focus-outline, 3px solid var(--esp-color-link));
        outline-offset: 2px;
      }

      .tracks {
        display: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .poster,
        .poster[data-dismissed],
        .play-icon {
          transition: none;
        }
        .play:hover .play-icon {
          transform: none;
        }
        .spinner {
          animation: none;
          border-block-start-color: currentColor;
          opacity: 0.6;
        }
      }

      @media (forced-colors: active) {
        .play-icon {
          border: 2px solid ButtonText;
          background: ButtonFace;
          color: ButtonText;
        }
        .play:focus-visible .play-icon {
          outline-color: Highlight;
        }
        .message {
          border: 1px solid CanvasText;
        }
      }
    `],r([a({type:String})],i.prototype,"src",void 0),r([a({type:String})],i.prototype,"type",void 0),r([a({type:String})],i.prototype,"poster",void 0),r([a({attribute:"poster-alt",type:String})],i.prototype,"posterAlt",void 0),r([a({type:String})],i.prototype,"label",void 0),r([a({attribute:"aspect-ratio",type:String})],i.prototype,"aspectRatio",void 0),r([a({converter:v(b,"none"),reflect:!0})],i.prototype,"preload",void 0),r([a({type:Boolean})],i.prototype,"autoplay",void 0),r([a({type:Boolean})],i.prototype,"muted",void 0),r([a({type:Boolean})],i.prototype,"loop",void 0),r([a({type:Boolean})],i.prototype,"playsinline",void 0),r([a({converter:v(g,"native"),reflect:!0})],i.prototype,"controls",void 0),r([a({attribute:"defer-offscreen",type:Boolean})],i.prototype,"deferOffscreen",void 0),r([a({attribute:"fallback-src",type:String})],i.prototype,"fallbackSrc",void 0),r([a({attribute:"crossorigin",converter:w})],i.prototype,"crossOrigin",void 0),r([u()],i.prototype,"phase",void 0),r([u()],i.prototype,"started",void 0),r([u()],i.prototype,"offscreenAdmitted",void 0),i=r([E("esp-video")],i);export{x as DEFAULT_VIDEO_ASPECT_RATIO,i as EspalierVideo,m as HLS_MEDIA_TYPE};
