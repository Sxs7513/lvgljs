import { ColorType } from "../color";
import { ProcessBoolean, ProcessColor, ProcessPx } from "../util";

const obj = {
  "arc-width": ProcessPx,
  "arc-color": ProcessColor,
  "arc-rounded": ProcessBoolean,
};
const keys = Object.keys(obj);

export type ArcStyleType = {
  /** Value in pixels */
  "arc-width"?: number;
  "arc-color"?: ColorType;
  "arc-rounded"?: boolean;
};

export function ArcStyle(style: ArcStyleType, result, compName) {
  keys.forEach((key) => {
    if (style[key] !== void 0) {
      obj[key](key, style[key], result);
    }
  });
}
