var o=function(n,t,e,s){var i=arguments.length,r=i<3?t:s===null?s=Object.getOwnPropertyDescriptor(t,e):s,c;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(n,t,e,s);else for(var d=n.length-1;d>=0;d--)(c=n[d])&&(r=(i<3?c(r):i>3?c(t,e,r):c(t,e))||r);return i>3&&r&&Object.defineProperty(t,e,r),r},u;import{css as A,html as h,nothing as p}from"lit";import{customElement as S,property as l,state as f}from"lit/decorators.js";import{keyed as O}from"lit/directives/keyed.js";import{EspalierElementBase as m}from"../shared/esp-element-base.js";import{ESP_EVENTS as y}from"../shared/events.js";import{srOnly as w}from"../shared/style-fragments.js";import{prefersReducedMotion as x}from"../shared/viewport.js";import{parseImageRatio as P}from"../image/image-ratio.js";import{enumConverter as v}from"../shared/enum-converter.js";const g="application/vnd.apple.mpegurl",C="16 / 9",b=new Set(["none","metadata","auto"]),k=new Set(["native","none"]),T=new Set(["","anonymous","use-credentials"]),$={fromAttribute(n){return n===null?"":n==="use-credentials"?"use-credentials":"anonymous"},toAttribute(n){return n||null}};function R(n){return n instanceof Error&&n.message?n.message:typeof n=="string"&&n?n:"The adapter failed to attach the stream."}function E(n){const t=n.error;return t?t.message||`MediaError code ${t.code}.`:"The video reported a playback error."}let a=u=class extends m{constructor(){super(...arguments),this.src="",this.type="application/vnd.apple.mpegurl",this.poster="",this.posterAlt="",this.label="",this.aspectRatio="16 / 9",this.preload="none",this.autoplay=!1,this.muted=!1,this.loop=!1,this.playsinline=!1,this.controls="native",this.deferOffscreen=!1,this.fallbackSrc="",this.crossOrigin="",this.adapter=null,this.phase="idle",this.started=!1,this.offscreenAdmitted=!1,this.attached=null,this.adapterAttaching=!1,this.adapterAttachErrored=!1,this.attaching=null,this.videoKey=0,this.mutedVideo=null,this.attachingEarly=!1,this.teardown=null,this.generation=0,this.triedFallback=!1,this.readyEmitted=!1,this.playIntent=!1,this.autoplayAttempted=!1,this.intentAutoplay=!1,this.autoplayPending=!1,this.playAttempt=0,this.pendingPlay=null,this.focusMessageOnError=!1,this.offscreenObserver=null,this.handleTrackSlotChange=()=>{const t=this.video;t&&this.attached&&this.mirrorTracks(t)},this.handlePlayClick=()=>{this.phase!=="loading"&&this.requestPlayback(!1)},this.handleLoadedMetadata=t=>{this.isCurrent(t)&&this.emitReady(t.currentTarget)},this.handlePlay=t=>{if(!this.isCurrent(t)||!this.attached)return;const e=this.autoplayPending;this.autoplayPending=!1,this.intentAutoplay=e,this.playIntent=!0,this.pendingPlay={autoplay:e}},this.handlePlaying=async t=>{const e=t.currentTarget;if(!this.isCurrent(t)||!this.attached)return;const s=this.pendingPlay;this.pendingPlay=null;const i=this.generation;if(s&&this.dispatchEvent(new CustomEvent(y.VIDEO_PLAY,{detail:{src:this.src,mode:this.attached.mode,currentTime:e.currentTime,autoplay:s.autoplay},bubbles:!0,composed:!0})),i!==this.generation)return;const r=this.shadowRoot?.activeElement?.classList.contains("play")??!1;this.started=!0,this.phase="playing",r&&(await this.updateComplete,e.focus())},this.handleVideoError=t=>{const e=t.currentTarget;if(!this.isCurrent(t))return;if(!this.attached){this.adapterAttaching&&(this.adapterAttachErrored=!0);return}const s=this.generation,i=this.playIntent&&(!this.started||!e.paused);this.failOver(e,"media",E(e))&&i&&this.startPlayback(e,s)}}get video(){return this.shadowRoot?.querySelector("video")??null}canPlayNatively(t){return t.canPlayType(this.type||g)!==""}resolvedAdapter(){return this.adapter??u.defaultAdapter}playLabel(){return this.label?this.label:this.posterAlt?`Play video: ${this.posterAlt}`:"Play video"}connectedCallback(){super.connectedCallback(),this.requestUpdate()}disconnectedCallback(){super.disconnectedCallback(),this.offscreenObserver?.disconnect(),this.offscreenObserver=null,this.offscreenAdmitted=!1,this.resetSource()}syncOffscreenDeferral(){if(!this.deferOffscreen||typeof IntersectionObserver>"u"){this.offscreenObserver?.disconnect(),this.offscreenObserver=null,this.offscreenAdmitted||(this.offscreenAdmitted=!0);return}if(this.offscreenAdmitted||this.offscreenObserver)return;const t=new IntersectionObserver(e=>{this.offscreenObserver===t&&e.some(s=>s.isIntersecting)&&(t.disconnect(),this.offscreenObserver=null,this.offscreenAdmitted=!0)},{rootMargin:"200px"});this.offscreenObserver=t,t.observe(this)}willUpdate(t){super.willUpdate(t),this.isConnected&&!this.offscreenAdmitted&&this.syncOffscreenDeferral(),this.src??="",this.type??=g,this.poster??="",this.posterAlt??="",this.label??="",this.fallbackSrc??="";const e=P(this.aspectRatio)??C;this.style.setProperty("--_esp-video-aspect-ratio",e),t.has("preload")&&!b.has(this.preload)&&(this.preload="none"),t.has("controls")&&!k.has(this.controls)&&(this.controls="native"),t.has("crossOrigin")&&!T.has(this.crossOrigin)&&(this.crossOrigin="anonymous"),this.hasUpdated&&["src","type","fallbackSrc"].some(s=>t.has(s)&&t.get(s)!==this[s])&&this.resetSource()}updated(t){if(super.updated(t),this.syncMuted(t),this.focusMessageOnError&&this.phase==="error"&&(this.focusMessageOnError=!1,this.shadowRoot?.querySelector('[part="message"]')?.focus()),!(!this.offscreenAdmitted||!this.isConnected)){if(this.autoplay&&!this.autoplayAttempted&&!this.playIntent&&(this.src||this.fallbackSrc)&&(this.autoplayAttempted=!0,!x())){this.requestPlayback(!0);return}if(this.preload!=="none"&&this.phase!=="error"&&!this.attached&&!this.attaching&&this.src){const e=this.video;e&&this.ensureSource(e,!0)}}}syncMuted(t){const e=this.video;if(!e)return;const s=e!==this.mutedVideo;this.mutedVideo=e,!(!s&&!t.has("muted")&&!t.has("autoplay"))&&(this.muted||this.autoplay?e.muted=!0:e.paused&&(e.muted=!1))}async requestPlayback(t){if(this.phase==="loading"&&this.playIntent)return;const e=this.generation;this.playIntent=!0,this.intentAutoplay=t,(!this.started||this.phase==="error")&&(this.phase="loading"),await this.updateComplete;const s=this.video;!s||e!==this.generation||!await this.ensureSource(s,!1)||e!==this.generation||(t&&(s.muted=!0),await this.startPlayback(s,e))}async startPlayback(t,e){if(e!==this.generation)return;const s=++this.playAttempt;this.autoplayPending=this.intentAutoplay;try{await t.play()}catch(i){if(e!==this.generation||s!==this.playAttempt)return;this.autoplayPending=!1,i?.name==="NotAllowedError"&&this.phase!=="error"&&(this.playIntent=!1,this.phase=this.started?"playing":"idle")}}ensureSource(t,e){if(this.attached)return Promise.resolve(!0);if(this.attaching&&(e||!this.attachingEarly))return this.attaching;const s=this.generation,i=this.attaching,r=i?i.then(c=>c||s!==this.generation?c:this.attachSource(t,e,s)):this.attachSource(t,e,s);return this.attaching=r,this.attachingEarly=e,r.finally(()=>{this.attaching===r&&(this.attaching=null)}),r}async attachSource(t,e,s){if(!this.src)return e?!1:this.fallbackSrc?(this.useSource(t,this.fallbackSrc,"fallback"),!0):(this.fail(null,"unsupported","No video source is set."),!1);if(this.canPlayNatively(t))return this.useSource(t,this.src,"native"),!0;if(e)return!1;const i=this.resolvedAdapter();if(i){this.mirrorTracks(t);let r;const c=t.error;this.adapterAttaching=!0,this.adapterAttachErrored=!1;try{r=await i(t,this.src)}catch(d){return s!==this.generation?!1:this.failOver(t,"adapter",R(d))}finally{s===this.generation&&(this.adapterAttaching=!1)}return s!==this.generation?(typeof r=="function"&&this.runTeardown(r),!1):(this.teardown=typeof r=="function"?r:null,this.attached={mode:"adapter"},this.readyEmitted=!1,this.adapterAttachErrored||t.error&&t.error!==c?this.failOver(t,"media",E(t)):(t.readyState>=1&&this.emitReady(t),!0))}return this.fallbackSrc?(this.useSource(t,this.fallbackSrc,"fallback"),!0):(this.fail(null,"unsupported",`This browser cannot play ${this.type} and no adapter is set.`),!1)}useSource(t,e,s){this.mirrorTracks(t),this.attached={mode:s},this.readyEmitted=!1,t.src=e}failOver(t,e,s){const i=this.attached?.mode??(e==="adapter"?"adapter":null),r=!!this.fallbackSrc&&!this.triedFallback&&i!=="fallback",c=this.generation;return this.emitError(i,e,s,r),c!==this.generation?!1:(this.runTeardown(),this.attached=null,this.pendingPlay=null,r?(this.triedFallback=!0,this.useSource(t,this.fallbackSrc,"fallback"),!0):(this.enterError(),!1))}emitError(t,e,s,i){this.dispatchEvent(new CustomEvent(y.VIDEO_ERROR,{detail:{src:this.src,mode:t,reason:e,message:s,fallback:i},bubbles:!0,composed:!0}))}fail(t,e,s){const i=this.generation;this.emitError(t,e,s,!1),i===this.generation&&this.enterError()}enterError(){const t=this.shadowRoot?.activeElement;this.focusMessageOnError=!!t?.classList.contains("play")||t!==null&&t===this.video,this.phase="error"}runTeardown(t=this.teardown){t===this.teardown&&(this.teardown=null);try{t?.()}catch{}}resetSource(){this.generation+=1,this.runTeardown();const t=this.attached!==null;this.attached=null,this.attaching&&(this.videoKey+=1,this.requestUpdate()),this.attaching=null,this.adapterAttaching=!1,this.adapterAttachErrored=!1,this.triedFallback=!1,this.readyEmitted=!1,this.playIntent=!1,this.autoplayAttempted=!1,this.intentAutoplay=!1,this.autoplayPending=!1,this.pendingPlay=null,this.focusMessageOnError=!1,this.started=!1,this.phase="idle";const e=this.video;e&&(t||e.hasAttribute("src"))&&(e.pause(),e.removeAttribute("src"),e.load())}mirrorTracks(t){for(const e of t.querySelectorAll("track"))e.remove();for(const e of this.children)e.localName==="track"&&t.append(e.cloneNode(!0))}isCurrent(t){return t.currentTarget===this.video}emitReady(t){!this.attached||this.readyEmitted||(this.readyEmitted=!0,this.dispatchEvent(new CustomEvent(y.VIDEO_READY,{detail:{src:this.src,mode:this.attached.mode,duration:t.duration},bubbles:!0,composed:!0})))}renderPosterContent(){if(this.phase==="error")return h`<div part="message" class="message" role="alert" tabindex="-1">
        <slot name="error">This video can’t be played right now.</slot>
      </div>`;const t=this.phase==="loading";return h`<button
      part="play"
      class="play"
      type="button"
      aria-label=${this.playLabel()}
      aria-disabled=${t?"true":p}
      @click=${this.handlePlayClick}
    >
      <span part="play-icon" class="play-icon" aria-hidden="true">
        ${t?h`<span class="spinner"></span>`:h`<svg viewBox="0 0 24 24" focusable="false">
              <path
                d="M8 5.5v13a1 1 0 0 0 1.52.85l10.4-6.5a1 1 0 0 0 0-1.7L9.52 4.65A1 1 0 0 0 8 5.5Z"
              />
            </svg>`}
      </span>
    </button>`}render(){const t=!this.started||this.phase==="error",e=!this.deferOffscreen||this.offscreenAdmitted;return h`
      <div part="frame" class="frame" data-phase=${this.phase}>
        ${O(this.videoKey,h`<video
            part="video"
            class="video"
            preload=${this.preload}
            crossorigin=${this.crossOrigin||p}
            tabindex=${this.controls==="none"||this.phase==="error"?"-1":p}
            aria-label=${this.label||this.posterAlt||p}
            ?controls=${this.controls==="native"&&this.started&&this.phase!=="error"}
            ?loop=${this.loop}
            ?playsinline=${this.playsinline}
            @loadedmetadata=${this.handleLoadedMetadata}
            @play=${this.handlePlay}
            @playing=${this.handlePlaying}
            @error=${this.handleVideoError}
          ></video>`)}
        <div part="poster" class="poster" ?data-dismissed=${!t}>
          ${this.poster&&e?h`<img
                part="poster-image"
                class="poster-image"
                loading=${this.deferOffscreen?"lazy":"eager"}
                decoding="async"
                alt=""
                src=${this.poster}
              />`:p}
          ${this.renderPosterContent()}
        </div>
        <span class="sr-only" role="status"
          >${this.phase==="loading"?"Loading video":""}</span
        >
        <slot class="tracks" @slotchange=${this.handleTrackSlotChange}></slot>
      </div>
    `}};a.defaultAdapter=null,a.styles=[...m.styles,w,A`
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
    `],o([l({type:String})],a.prototype,"src",void 0),o([l({type:String})],a.prototype,"type",void 0),o([l({type:String})],a.prototype,"poster",void 0),o([l({attribute:"poster-alt",type:String})],a.prototype,"posterAlt",void 0),o([l({type:String})],a.prototype,"label",void 0),o([l({attribute:"aspect-ratio",type:String})],a.prototype,"aspectRatio",void 0),o([l({converter:v(b,"none"),reflect:!0})],a.prototype,"preload",void 0),o([l({type:Boolean})],a.prototype,"autoplay",void 0),o([l({type:Boolean})],a.prototype,"muted",void 0),o([l({type:Boolean})],a.prototype,"loop",void 0),o([l({type:Boolean})],a.prototype,"playsinline",void 0),o([l({converter:v(k,"native"),reflect:!0})],a.prototype,"controls",void 0),o([l({attribute:"defer-offscreen",type:Boolean})],a.prototype,"deferOffscreen",void 0),o([l({attribute:"fallback-src",type:String})],a.prototype,"fallbackSrc",void 0),o([l({attribute:"crossorigin",converter:$})],a.prototype,"crossOrigin",void 0),o([l({attribute:!1})],a.prototype,"adapter",void 0),o([f()],a.prototype,"phase",void 0),o([f()],a.prototype,"started",void 0),o([f()],a.prototype,"offscreenAdmitted",void 0),a=u=o([S("esp-video")],a);export{C as DEFAULT_VIDEO_ASPECT_RATIO,a as EspalierVideo,g as HLS_MEDIA_TYPE};
