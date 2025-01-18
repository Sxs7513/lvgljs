import { ColorType } from "../color";
import { PixelOrPercent, ProcessColor, ProcessPx, ProcessPxOrPercent } from "../util";

const obj = {
  "outline-width": ProcessPx,
  "outline-color": ProcessColor,
  "outline-padding": ProcessPxOrPercent,
};
const keys = Object.keys(obj);

export type OutlineStyleType = {
  "outline-width"?: number;
  "outline-color"?: ColorType;
  "outline-padding"?: PixelOrPercent;
};

export function OutlineStyle(style: OutlineStyleType, result, compName) {
  keys.forEach((key) => {
    if (style[key] !== void 0) {
      obj[key](key, style[key], result);
    }
  });
}
