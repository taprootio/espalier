import{css as r,html as o,nothing as a}from"lit";function i(e={}){return o`
    <div
      class="esp-visual-overlay ${e.className??""}"
      part=${e.rootPart||a}
      aria-hidden="true"
    >
      <div class="esp-visual-overlay__image" part=${e.imagePart||a}></div>
      <div class="esp-visual-overlay__scrim" part=${e.scrimPart||a}></div>
      <div class="esp-visual-overlay__texture" part=${e.texturePart||a}></div>
    </div>
  `}const v=r`
  .esp-visual-overlay {
    position: absolute;
    z-index: var(--_esp-overlay-z-index, auto);
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    background: var(--_esp-overlay-base-color, transparent);
  }

  .esp-visual-overlay__image,
  .esp-visual-overlay__scrim,
  .esp-visual-overlay__texture {
    position: absolute;
    inset: 0;
    pointer-events: none;
  }

  .esp-visual-overlay__image {
    background-image: var(--_esp-overlay-image, none);
    background-repeat: var(--_esp-overlay-image-repeat, repeat);
    background-position: var(--_esp-overlay-image-position, 0 0);
    background-size: var(--_esp-overlay-image-size, auto);
    opacity: var(--_esp-overlay-image-opacity, 1);
    mix-blend-mode: var(--_esp-overlay-image-blend-mode, normal);
  }

  .esp-visual-overlay__scrim {
    background: var(--_esp-overlay-scrim, none);
    opacity: var(--_esp-overlay-scrim-opacity, 1);
  }

  .esp-visual-overlay__texture {
    background: var(--_esp-overlay-texture, none);
    background-size: var(--_esp-overlay-texture-size, auto);
    opacity: var(--_esp-overlay-texture-opacity, 1);
    mix-blend-mode: var(--_esp-overlay-texture-blend-mode, normal);
    filter: var(--_esp-overlay-texture-filter, none);
    mask: var(--_esp-overlay-texture-mask, none);
  }
`;export{i as renderVisualOverlay,v as visualOverlayStyles};
