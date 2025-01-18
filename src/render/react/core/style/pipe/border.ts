import { ColorType } from "../color";
import { ProcessColor, ProcessEnum, ProcessPx } from "../util";

const obj = {
  "border-radius": ProcessPx,
  "border-width": ProcessPx,
  "border-color": ProcessColor,
  "border-side": ProcessEnum({
    left: 0x04,
    right: 0x08,
    full: 0x0f,
    top: 0x02,
    bottom: 0x01,
    "top-right": 0x02 | 0x08,
    "top-bottom": 0x02 | 0x01,
    "top-left": 0x02 | 0x04,
    "right-bottom": 0x08 | 0x01,
    "right-left": 0x08 | 0x04,
    "bottom-left": 0x01 | 0x04,
  }),
};
const keys = Object.keys(obj);

export type BorderStyleType = {
  "border-radius"?: number;
  "border-width"?: number;
  "border-color"?: ColorType;
  "border-side"?: "left" | "right" | "full" | "top" | "bottom" | "top-right" | "top-bottom" | "top-left" | "right-bottom" | "right-left" | "bottom-left";
}

export function BorderStyle(style: BorderStyleType, result, compName) {
  keys.forEach((key) => {
    if (style[key] !== void 0) {
      obj[key](key, style[key], result);
    }
  });
}
