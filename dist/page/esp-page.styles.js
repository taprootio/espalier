import{css as e}from"lit";import{EspalierElementBase as t}from"../shared/esp-element-base.js";const s=[...t.styles,e`
    :host {
      --_esp-page-resolved-max-width: var(
        --esp-page-main-max-width,
        var(--esp-page-max-width, 1536px)
      );
      --_esp-page-main-min-width: var(
        --esp-page-main-min-width,
        var(--esp-page-preview-min-main-width, 30rem)
      );
      --_esp-page-preview-resolved-min-width: var(
        --esp-page-preview-width,
        var(--esp-page-preview-min-width, 22.5rem)
      );
      --_esp-page-preview-resolved-max-width: var(
        --esp-page-preview-width,
        var(--esp-page-preview-max-width, 48rem)
      );
      --_esp-page-flyout-resolved-min-width: var(
        --esp-page-flyout-width,
        var(--esp-page-flyout-min-width, 20rem)
      );
      --_esp-page-flyout-resolved-max-width: var(
        --esp-page-flyout-width,
        var(--esp-page-flyout-max-width, 30rem)
      );
      --_esp-page-preview-used-width: 0px;
      --_esp-page-flyout-used-width: 0px;
      --_esp-page-workspace-track: minmax(
        calc(var(--_esp-page-flyout-min) + var(--_esp-page-preview-min)),
        calc(var(--_esp-page-preview-used-width) + var(--_esp-page-flyout-used-width))
      );
      
      --_esp-page-main-track: minmax(0, var(--_esp-page-resolved-max-width));
      
      --_esp-page-gutter-left: 0fr;
      --_esp-page-gutter-right: 1fr;
      
      --_esp-page-flyout-min: 0px;
      
      --_esp-page-preview-min: 0px;
      
      --_esp-page-surface-edge-shadow: 0.75rem 0 1.5rem -0.75rem var(--esp-color-shadow);
      
      --_esp-page-surface-shadow: var(
        --esp-page-surface-shadow,
        -0.75rem 0 1.5rem -0.75rem var(--esp-color-shadow),
        var(--_esp-page-surface-edge-shadow)
      );
      --_esp-page-surface-border: var(--esp-page-surface-border, none);
      --_esp-page-fixed-header-offset: var(
        --esp-page-fixed-header-offset,
        var(--esp-header-height, calc(4.5 * var(--esp-size-small)))
      );

      display: block;
    }

    :host([kind="narrow"]) {
      --_esp-page-resolved-max-width: var(
        --esp-page-main-max-width,
        var(--esp-page-max-width, 768px)
      );
    }

    :host([align="center"]) {
      --_esp-page-gutter-left: 1fr;
      --_esp-page-gutter-right: 1fr;
    }

    :host([align="end"]) {
      --_esp-page-gutter-left: 1fr;
      --_esp-page-gutter-right: 0fr;
    }

    
    :host([kind="full"]) {
      --_esp-page-resolved-max-width: var(
        --esp-page-main-max-width,
        var(--esp-page-max-width, none)
      );
    }

    :host([kind="full"]:not([data-main-max-configured])) {
      --_esp-page-main-track: 1fr;
      --_esp-page-gutter-left: 0fr;
      --_esp-page-gutter-right: 0fr;
    }

    
    :host([kind="site"]) {
      --_esp-page-resolved-max-width: none;
      --_esp-page-main-track: 1fr;
      --_esp-page-gutter-left: 0fr;
      --_esp-page-gutter-right: 0fr;
    }

    
    :host([flyout-open]) {
      --_esp-page-flyout-min: var(--_esp-page-flyout-resolved-min-width);
    }

    :host([preview-reclaiming]) {
      --_esp-page-preview-min: var(--_esp-page-preview-resolved-min-width);
    }

    
    :host([flyout-open][data-workspace-targeted]) {
      --_esp-page-flyout-min: var(--_esp-page-flyout-used-width);
    }

    :host([preview-reclaiming][data-workspace-targeted]) {
      --_esp-page-preview-min: var(--_esp-page-preview-used-width);
    }

    :host([flyout-open]),
    :host([preview-reclaiming]) {
      --_esp-page-main-track: minmax(
        var(--_esp-page-main-min-width),
        var(--_esp-page-resolved-max-width)
      );
    }

    :host([kind="full"]:not([data-main-max-configured])[flyout-open]),
    :host([kind="full"]:not([data-main-max-configured])[preview-reclaiming]),
    :host([kind="site"][flyout-open]),
    :host([kind="site"][preview-reclaiming]) {
      --_esp-page-main-track: minmax(var(--_esp-page-main-min-width), 1fr);
    }

    
    @media (max-width: 50em) {
      :host([flyout-open]) {
        --_esp-page-flyout-min: 0px;
      }

      :host([preview-reclaiming]) {
        --_esp-page-preview-min: 0px;
      }

      :host([flyout-open]),
      :host([preview-reclaiming]) {
        --_esp-page-main-track: minmax(0, var(--_esp-page-resolved-max-width));
      }

      :host([kind="full"]:not([data-main-max-configured])[flyout-open]),
      :host([kind="full"]:not([data-main-max-configured])[preview-reclaiming]),
      :host([kind="site"][flyout-open]),
      :host([kind="site"][preview-reclaiming]) {
        --_esp-page-main-track: 1fr;
      }

      .esp-page > .esp-page-preview-space,
      .esp-page > .esp-page-workspace-resize-handles {
        display: none;
      }
    }

    
    :host([flyout-overlay-open]) .esp-page > div.esp-page-flyout {
      z-index: var(--esp-flyout-z-index, 3000);
    }

    
    :host([descendant-flyout-overlay-open]) .esp-page > div.esp-page-main {
      z-index: var(--esp-flyout-z-index, 3000);
      overflow: visible;
    }

    
    :host([flyout-anchored]:not([flyout-full-height]))
      .esp-page
      > div.esp-page-flyout
      > .sticky-wrapper {
      position: static;
    }

    
    :host([flyout-full-height]) .esp-page > div.esp-page-flyout {
      grid-row: top-start / footer-end;
      z-index: calc(var(--esp-page-header-z-index, 20) + 2);
    }

    
    :host([flyout-anchored][preview-visible]) .esp-page > div.esp-page-flyout {
      z-index: calc(var(--esp-page-header-z-index, 20) + 2);
    }

    slot[name="flyout"]::slotted(esp-flyout) {
      --_esp-flyout-used-width: var(--_esp-page-flyout-used-width);
      --_esp-flyout-preview-bridge-width: 0px;
      --_esp-flyout-preview-anchor-display: none;
    }

    :host([preview-visible]) slot[name="flyout"]::slotted(esp-flyout) {
      --_esp-flyout-preview-bridge-width: var(--_esp-page-preview-used-width);
      --_esp-flyout-preview-anchor-display: block;
    }

    
    slot[name="flyout"]::slotted(esp-flyout[match-surface]) {
      --esp-flyout-shadow: var(--_esp-page-surface-edge-shadow);
    }

    
    slot[name="header"]::slotted(esp-header) {
      --esp-header-content-max-width: var(--_esp-page-resolved-max-width);
      --esp-header-content-lead: 0;
    }

    :host([align="center"]) slot[name="header"]::slotted(esp-header) {
      --esp-header-content-lead: 0.5;
    }

    :host([align="end"]) slot[name="header"]::slotted(esp-header) {
      --esp-header-content-lead: 1;
    }

    
    :host([kind="full"]:not([data-main-max-configured])) slot[name="header"]::slotted(esp-header) {
      --esp-header-content-max-width: 100%;
    }

    
    slot[name="footer"]::slotted(esp-footer) {
      --esp-footer-content-max-width: var(--_esp-page-resolved-max-width);
      --esp-footer-content-lead: 0;
    }

    :host([align="center"]) slot[name="footer"]::slotted(esp-footer) {
      --esp-footer-content-lead: 0.5;
    }

    :host([align="end"]) slot[name="footer"]::slotted(esp-footer) {
      --esp-footer-content-lead: 1;
    }

    :host([kind="full"]:not([data-main-max-configured])) slot[name="footer"]::slotted(esp-footer) {
      --esp-footer-content-max-width: 100%;
    }

    
    :host([kind="site"]) slot[name="header"]::slotted(esp-header) {
      --esp-header-content-max-width: var(--esp-page-well-max-width, 72rem);
      --esp-header-content-lead: 0.5;
    }

    :host([kind="site"]) slot[name="footer"]::slotted(esp-footer) {
      --esp-footer-content-max-width: var(--esp-page-well-max-width, 72rem);
      --esp-footer-content-lead: 0.5;
    }

    
    :host([contained]) .esp-page > div.esp-page-top,
    :host([contained]) .esp-page > div.esp-page-footer {
      grid-column: surface;
    }

    
    :host([contained]) slot[name="header"]::slotted(esp-header) {
      --esp-header-shadow: none;
    }

    
    :host([contained]:not([kind="site"])) slot[name="header"]::slotted(esp-header) {
      --esp-header-content-max-width: 100%;
    }

    :host([contained]:not([kind="site"])) slot[name="footer"]::slotted(esp-footer) {
      --esp-footer-content-max-width: 100%;
    }

    :host([kind="narrow"]) .esp-page > div.esp-page-main {
      
      > ::slotted(*) {
        max-inline-size: var(--esp-measure, 66ch);
      }
    }

    #dialog-drop-zone {
      z-index: 4000;
      position: absolute;
    }

    :host([preview-visible]) .esp-page > div.esp-page-preview-space > .esp-page-preview {
      display: block;
    }

    :host([workspace-resizable][preview-visible]:not([flyout-overlay-open]))
      .esp-page
      > div.esp-page-workspace-resize-handles
      > .esp-page-main-preview-resize-handle,
    :host([workspace-resizable][flyout-open]:not([flyout-overlay-open]))
      .esp-page
      > div.esp-page-workspace-resize-handles
      > .esp-page-preview-flyout-resize-handle {
      display: block;
    }

    :host([workspace-resizable]:not([data-workspace-resize-ready]))
      .esp-page
      > .esp-page-workspace-resize-handles {
      display: none;
    }

    :host([workspace-resizable][data-workspace-trailing-edge-exposed]:not([flyout-overlay-open]))
      .esp-page
      > div.esp-page-workspace-resize-handles
      > .esp-page-workspace-end-resize-handle,
    :host([workspace-resizable][data-workspace-position-held]:not([flyout-overlay-open]))
      .esp-page
      > div.esp-page-workspace-resize-handles
      > .esp-page-workspace-end-resize-handle {
      display: block;
    }

    
    :host([data-workspace-position-held]) {
      --_esp-page-gutter-left: var(--_esp-page-resize-leading-gutter-width, 0px);
      --_esp-page-gutter-right: 1fr;
    }

    :host([data-workspace-resizing]) {
      cursor: col-resize;
      user-select: none;
    }

    
    :host([data-workspace-resizing]) .esp-page,
    :host([data-workspace-keyboard-adjusting]) .esp-page {
      transition: none;
    }

    
    :host([data-preview-navigation-collapsed]) .esp-page > aside.esp-page-left {
      inline-size: 0;
      min-inline-size: 0;
    }

    :host([data-preview-measuring]) .esp-page {
      transition: none;
    }

    
    :host([data-preview-validating]) .esp-page-preview {
      visibility: hidden;
    }

    .esp-page {
      
      min-height: 100vh;
      min-height: 100dvh;
      display: grid;
      grid-template-columns:
        [full-start canvas-left-start] var(--_esp-page-gutter-left)
        [canvas-left-end surface-start left-start] min-content
        [left-end main-start] var(--_esp-page-main-track)
        [main-end right-start] min-content
        [right-end surface-end canvas-right-start flyout-start]
        var(--_esp-page-workspace-track)
        [flyout-end] var(--_esp-page-gutter-right)
        [canvas-right-end full-end];
      
      transition: grid-template-columns 0.25s ease;
      grid-template-rows:
        [top-start] min-content
        [top-end content-start] 1fr
        [content-end footer-start] min-content
        [footer-end];
      overflow-x: clip;
      background: var(--esp-page-background, var(--esp-color-background));
      line-height: 1.5;
      font-family: var(
        --_esp-font-body-effective,
        var(--esp-font-body, var(--_esp-font-body-fallback))
      );
      font-size: var(--esp-type-normal);
      color: var(--esp-color-text);
      position: relative;

      &:before {
        content: " ";
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        opacity: var(--esp-page-background-image-opacity, 1);
        background-image: var(--esp-page-background-image, none);
        z-index: 1;
      }

      > div.esp-page-top {
        z-index: var(--esp-page-header-z-index, 20);
        grid-column: full;
        grid-row: top;
        position: relative;
        
        contain: inline-size;
      }

      
      aside.esp-page-left,
      aside.esp-page-right {
        z-index: 5;
        grid-row: content;
        position: relative;
        
      }

      > aside.esp-page-left {
        grid-column: left;
      }

      > div.esp-page-main {
        z-index: 5;
        grid-column: main;
        grid-row: content;
        position: relative;
        overflow: hidden;
        
        background: var(--esp-page-main-background, transparent);
        
        contain: inline-size;
      }

      > aside.esp-page-right {
        grid-column: right;
      }

      
      > div.esp-page-flyout {
        
        grid-column: flyout;
        justify-self: start;
        grid-row: content;
        z-index: 5;
        position: relative;
        inline-size: var(--_esp-page-flyout-used-width);
        min-inline-size: 0;
        margin-inline-start: var(--_esp-page-preview-used-width);

        
        @media (max-width: 50em) {
          z-index: var(--esp-flyout-z-index, 3000);
        }
      }

      
      > div.esp-page-preview-space {
        grid-column: flyout;
        grid-row: content;
        z-index: 4;
        position: relative;
        min-inline-size: 0;

        > .esp-page-preview {
          display: none;
          box-sizing: border-box;
          inline-size: var(--_esp-page-preview-used-width);
          position: relative;
          background: var(
            --esp-page-preview-background,
            var(--esp-page-main-background, var(--esp-page-background, var(--esp-color-background)))
          );
          border-inline-start: var(--esp-page-preview-border, 1px dotted var(--esp-color-border));
          box-shadow: var(--esp-page-preview-shadow, var(--_esp-page-surface-edge-shadow));
        }
      }

      
      > div.esp-page-workspace-resize-handles {
        grid-column: flyout;
        grid-row: top-start / footer-end;
        z-index: calc(var(--esp-page-header-z-index, 20) + 3);
        position: relative;
        min-inline-size: 0;
        pointer-events: none;
      }

      > div.esp-page-workspace-resize-handles > .esp-page-workspace-resize-handle {
        display: none;
        box-sizing: border-box;
        position: absolute;
        inset-block: 0;
        z-index: 3;
        inline-size: var(--esp-page-resize-handle-hit-size, 2.75rem);
        margin-inline-start: calc(-0.5 * var(--esp-page-resize-handle-hit-size, 2.75rem));
        border: 0;
        outline: 0;
        background: transparent;
        cursor: col-resize;
        pointer-events: auto;
        touch-action: none;

        
        &::after {
          content: "";
          display: block;
          position: sticky;
          inset-block-start: 0;
          box-sizing: border-box;
          inline-size: 0;
          margin-inline: auto;
          block-size: 100dvh;
          max-block-size: 100%;
          pointer-events: none;
        }

        &:focus-visible::after {
          border-inline-start: var(
            --esp-page-resize-focus-outline,
            2px dashed var(--esp-color-link)
          );
          
          box-shadow: var(--esp-page-resize-focus-shadow, 0 0 0.75rem var(--esp-color-link));
        }
      }

      > div.esp-page-workspace-resize-handles > .esp-page-main-preview-resize-handle {
        inset-inline-start: 0;
      }

      > div.esp-page-workspace-resize-handles > .esp-page-preview-flyout-resize-handle {
        inset-inline-start: var(--_esp-page-preview-used-width);
      }

      > div.esp-page-workspace-resize-handles > .esp-page-workspace-end-resize-handle {
        inset-inline-start: calc(
          var(--_esp-page-preview-used-width) + var(--_esp-page-flyout-used-width)
        );
      }

      
      > .esp-page-preview-min-width-probe,
      > .esp-page-preview-default-width-probe,
      > .esp-page-preview-max-width-probe,
      > .esp-page-flyout-min-width-probe,
      > .esp-page-flyout-default-width-probe,
      > .esp-page-flyout-max-width-probe,
      > .esp-page-main-min-width-probe,
      > .esp-page-main-configured-max-width-probe,
      > .esp-page-main-max-width-probe,
      > .esp-page-resize-step-probe,
      > .esp-page-resize-large-step-probe {
        position: absolute;
        block-size: 0;
        visibility: hidden;
        pointer-events: none;
        contain: strict;
      }

      > .esp-page-preview-min-width-probe {
        inline-size: var(--_esp-page-preview-resolved-min-width);
      }

      > .esp-page-preview-max-width-probe {
        inline-size: var(--_esp-page-preview-resolved-max-width);
      }

      > .esp-page-preview-default-width-probe {
        inline-size: var(--esp-page-preview-default-width, 0px);
      }

      > .esp-page-flyout-min-width-probe {
        inline-size: var(--_esp-page-flyout-resolved-min-width);
      }

      > .esp-page-flyout-max-width-probe {
        inline-size: var(--_esp-page-flyout-resolved-max-width);
      }

      > .esp-page-flyout-default-width-probe {
        inline-size: var(--esp-page-flyout-default-width, 0px);
      }

      > .esp-page-main-min-width-probe {
        inline-size: var(--_esp-page-main-min-width);
      }

      > .esp-page-main-configured-max-width-probe {
        inline-size: var(--esp-page-main-max-width, 0px);
      }

      > .esp-page-main-max-width-probe {
        inline-size: var(--_esp-page-resolved-max-width);
      }

      > .esp-page-resize-step-probe {
        inline-size: var(--esp-page-resize-step, 1rem);
      }

      > .esp-page-resize-large-step-probe {
        inline-size: var(--esp-page-resize-large-step, 4rem);
      }

      
      > .esp-page-canvas {
        
        grid-row: top-start / footer-end;
        z-index: 1;
        position: relative;
        pointer-events: none;
        background-color: var(--esp-page-canvas-background, transparent);

        
        &::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: var(--esp-page-canvas-background-image, none);
          opacity: var(--esp-page-canvas-background-image-opacity, 1);
        }
      }

      > .esp-page-canvas--left {
        grid-column: canvas-left;
      }

      > .esp-page-canvas--right {
        
        grid-column: canvas-right;
      }

      
      > .esp-page-surface {
        grid-column: surface;
        
        grid-row: top-start / footer-end;
        z-index: 2;
        pointer-events: none;
        box-shadow: var(--_esp-page-surface-shadow);
        border-inline: var(--_esp-page-surface-border);
      }

      
      .sticky-wrapper {
        will-change: top;
        display: block;
        width: 100%;
        position: sticky;
        top: 0;
      }

      > div.esp-page-footer {
        grid-column: full;
        grid-row: footer;
        z-index: 10;
        background: var(--esp-page-background, var(--esp-color-background));
        
        contain: inline-size;
      }

      &.sticky-header {
        slot[name="header"]::slotted(esp-header),
        slot[name="sidebar"]::slotted(esp-menu),
        slot[name="right"]::slotted(esp-menu) {
          --esp-menu-top-offset: var(--_esp-page-fixed-header-offset);
        }

        > div.esp-page-top {
          position: sticky;
          top: var(--esp-page-sticky-header-top, 0);
        }
      }

      &.fixed-header {
        slot[name="header"]::slotted(esp-header),
        slot[name="sidebar"]::slotted(esp-menu),
        slot[name="right"]::slotted(esp-menu) {
          --esp-menu-top-offset: var(--_esp-page-fixed-header-offset);
        }

        > div.esp-page-top {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
        }

        > div.esp-page-main,
        > aside.esp-page-left,
        > aside.esp-page-right,
        > div.esp-page-flyout,
        > .esp-page-surface,
        > .esp-page-canvas {
          margin-top: var(--_esp-page-fixed-header-offset);
        }
      }

      
      input,
      button,
      textarea,
      select {
        font-family: inherit;
        font-size: inherit;
      }

      
      textarea:not([rows]) {
        min-height: 10em;
      }

      
      :target {
        scroll-margin-block: 5ex;
      }
    }

    .esp-page:has(esp-dialog[is-open="true"]) {
      overflow: hidden;
    }

    
    :host([preview-visible]) .esp-page > .esp-page-surface {
      box-shadow: none;
    }

    
    .esp-page > div.esp-page-preview-space {
      grid-row: top-start / footer-end;
      z-index: calc(var(--esp-page-header-z-index, 20) + 1);
      pointer-events: none;

      > .esp-page-preview {
        position: absolute;
        inset-block: 0;
        inset-inline-start: 0;
        pointer-events: auto;

        > .sticky-wrapper {
          block-size: 100vh;
          block-size: 100dvh;
          overflow-y: auto;
          
          overscroll-behavior-y: auto;
        }
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .esp-page {
        transition: none;
      }
    }
  `];export{s as pageStyles};
