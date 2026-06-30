import{css as e}from"lit";const o=e`
  

  .temporal-error {
    font-family: var(--esp-font-body);
    font-size: var(--esp-type-small);
    color: var(--esp-color-danger-text);
    padding: var(--esp-size-padding);
  }

  

  .esp-field {
    display: grid;
    grid-template-columns: 1fr min-content;
    cursor: pointer;

    > input.esp-input {
      cursor: pointer;
      width: auto;
    }

    > .field-icon {
      display: grid;
      place-content: center;
      cursor: pointer;

      > svg {
        height: calc(1.2 * var(--esp-size-font));
        width: calc(1.2 * var(--esp-size-font));
        margin: 0 var(--esp-size-tiny);
      }
    }
  }

  

  .picker-popover {
    position: fixed;
    inset: unset;
    margin: 0;
    padding: var(--esp-size-small);
    border-radius: var(--esp-size-border-radius);
    border: 1px solid var(--esp-color-border);
    background: var(--esp-color-layer-1);
    box-shadow: 0 4px 16px var(--esp-color-shadow);
    color: var(--esp-color-text);
    font-family: var(--esp-font-body);
    font-size: var(--esp-size-font);
    opacity: 0;
    transition: opacity 150ms ease-in;
    overflow: visible;
  }

  .picker-popover.visible {
    opacity: 1;
  }

  

  .calendar {
    display: flex;
    flex-direction: column;
    gap: var(--esp-size-tiny);
    user-select: none;
    overflow: hidden;
  }

  .cal-body {
    will-change: transform;
  }

  .cal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: var(--esp-size-tiny);
  }

  .cal-title {
    font-weight: bold;
    font-size: var(--esp-type-normal);
    color: var(--esp-color-headings);
  }

  .nav-btn {
    display: grid;
    place-content: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--esp-size-tiny);
    border-radius: var(--esp-size-border-radius);
    color: var(--esp-color-text);
    transition: background-color 120ms ease;

    > svg {
      height: var(--esp-size-normal);
      width: var(--esp-size-normal);
    }

    &:hover {
      background-color: var(--esp-color-layer-3);
    }

    &:focus-visible {
      outline: 2px solid var(--esp-color-action-text);
      outline-offset: -2px;
    }
  }

  

  .weekday-row {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
  }

  .weekday-label {
    font-size: var(--esp-type-tiny);
    font-weight: 600;
    color: var(--esp-color-headings);
    text-decoration: none;
    padding: var(--esp-size-tiny) 0;
  }

  

  .day-grid {
    display: flex;
    flex-direction: column;
  }

  
  .day-grid:focus-within .day-cell.focused {
    outline: 2px solid var(--esp-color-action-text);
    outline-offset: -2px;
    z-index: 1;
  }

  .day-row {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  

  .day-cell {
    --_cell-size: 2.4em;

    position: relative;
    display: grid;
    place-content: center;
    width: var(--_cell-size);
    height: var(--_cell-size);
    border: none;
    border-radius: var(--esp-size-border-radius);
    background: none;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    color: var(--esp-color-text);
    transition:
      background-color 100ms ease,
      color 100ms ease;

    &:hover:not(.disabled):not(.selected) {
      background-color: var(--esp-color-layer-3);
    }

    &:focus-visible {
      outline: 2px solid var(--esp-color-action-text);
      outline-offset: -2px;
      z-index: 1;
    }

    
    &.outside-month {
      opacity: 0.38;
    }

    
    &.today {
      font-weight: bold;
      box-shadow: inset 0 0 0 1px var(--esp-color-border);
      border-radius: var(--esp-size-border-radius);
    }

    
    &.selected {
      background-color: var(--esp-color-layer-3);
      color: var(--esp-color-action-text);
      font-weight: bold;
    }

    
    &.in-range {
      background-color: oklch(from var(--esp-color-layer-3) calc(l + 0.15) calc(c * 0.4) h);
      border-radius: 0;
    }

    &.range-start {
      border-radius: var(--esp-size-border-radius) 0 0 var(--esp-size-border-radius);
    }

    &.range-end {
      border-radius: 0 var(--esp-size-border-radius) var(--esp-size-border-radius) 0;
    }

    
    &.disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }

  

  .time-picker {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    gap: var(--esp-size-tiny);
    padding-top: var(--esp-size-small);
    border-top: 1px solid var(--esp-color-border);
    margin-top: var(--esp-size-small);
    white-space: nowrap;

    
    > esp-button:first-of-type {
      margin-left: auto;
    }
  }

  
  :host([mode="time"]) .time-picker {
    border-top: none;
    margin-top: 0;
    padding-top: 0;
  }

  .popover-actions {
    display: flex;
    gap: var(--esp-size-tiny);
    align-items: center;
    justify-content: flex-end;
    padding-top: var(--esp-size-small);
    border-top: 1px solid var(--esp-color-border);
    margin-top: var(--esp-size-small);
  }

  .time-sep {
    font-size: var(--esp-type-medium);
    font-weight: bold;
    color: var(--esp-color-headings);
    padding: 0 2px;
  }
`;export{o as datePickerStyles};
