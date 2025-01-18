import { HostConfig } from "react-reconciler";

export { handleEvent } from "../core/event";
export { unRegistEvent, EVENTTYPE_MAP } from "../core/event";
export { setStyle } from "../core/style";
import * as React from 'react';

const components = new Map<LvgljsComponentConfig<any, any>['tagName'], LvgljsComponentConfig<any, any>>();

export const getComponentByTagName = (tagName) => {
  const config = components.get(tagName);
  if (!config) {
    throw `Unknown component ${tagName}`;
  }
  return config;
};

export function registerComponent<Props, Comp>(
  config: LvgljsComponentConfig<Props, Comp>): React.ComponentType<Props> | string {
  if (components.has(config.tagName)) {
    throw `A component with tagName: ${config.tagName} already exists. This base component will be ignored`;
  }
  components.set(config.tagName, config);
  return config.tagName;
}

export function registerComponents<Props, Comp>(configs: LvgljsComponentConfig<Props, Comp>[]) {
  configs.forEach((config) => {
    if (components.has(config.tagName)) {
      throw `A component with tagName: ${config.tagName} already exists. This base component will be ignored`;
    }
    components.set(config.tagName, config);
  });
}

export const EAlignType = {
  ALIGN_DEFAULT: 0,
  ALIGN_TOP_LEFT: 1,
  ALIGN_TOP_MID: 2,
  ALIGN_TOP_RIGHT: 3,
  ALIGN_BOTTOM_LEFT: 4,
  ALIGN_BOTTOM_MID: 5,
  ALIGN_BOTTOM_RIGHT: 6,
  ALIGN_LEFT_MID: 7,
  ALIGN_RIGHT_MID: 8,
  ALIGN_CENTER: 9,

  ALIGN_OUT_TOP_LEFT: 10,
  ALIGN_OUT_TOP_MID: 11,
  ALIGN_OUT_TOP_RIGHT: 12,
  ALIGN_OUT_BOTTOM_LEFT: 13,
  ALIGN_OUT_BOTTOM_MID: 14,
  ALIGN_OUT_BOTTOM_RIGHT: 15,
  ALIGN_OUT_LEFT_TOP: 16,
  ALIGN_OUT_LEFT_MID: 17,
  ALIGN_OUT_LEFT_BOTTOM: 18,
  ALIGN_OUT_RIGHT_TOP: 19,
  ALIGN_OUT_RIGHT_MID: 20,
  ALIGN_OUT_RIGHT_BOTTOM: 21,
};

export const STYLE_TYPE = {
  PART_MAIN: 0x000000,
  PART_SCROLLBAR: 0x010000,
  PART_INDICATOR: 0x020000,
  PART_KNOB: 0x030000,
  PART_SELECTED: 0x040000,
  PART_ITEMS: 0x050000,
  PART_TICKS: 0x060000,
  PART_CURSOR: 0x070000,

  STATE_DEFAULT: 0x0000,
  STATE_CHECKED: 0x0001,
  STATE_FOCUSED: 0x0002,
  STATE_FOCUS_KEY: 0x0004,
  STATE_EDITED: 0x0008,
  STATE_HOVERED: 0x0010,
  STATE_PRESSED: 0x0020,
  STATE_SCROLLED: 0x0040,
  STATE_DISABLED: 0x0080,
};

export const EDropdownlistDirection = {
  none: 0x00,
  left: 1 << 0,
  right: 1 << 1,
  top: 1 << 2,
  bottom: 1 << 3,
  horizontal: (1 << 0) | (1 << 1),
  vertical: (1 << 2) | (1 << 3),
  all: (1 << 0) | (1 << 1) | (1 << 2) | (1 << 3),
};

export const EDropdownListArrowDirection = {
  up: 0,
  right: 1,
  down: 2,
  left: 3,
};

export const styleGetterProp = ["height", "width", "left", "top"];

export type LvgljsComponentConfig<ComponentProps, ComponentInstance> = Pick<
  HostConfig<any, ComponentProps, any, ComponentInstance, any, any, any, any, any, any, any, any>,
  | "shouldSetTextContent"
  | "createInstance"
  | "commitMount"
  | "commitUpdate"
  | "commitUpdate"
  | "insertBefore"
  | "appendInitialChild"
  | "appendChild"
  | "removeChild"
> & { tagName: string };
