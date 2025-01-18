import { ColorType } from "../color";
import { ProcessColor, ProcessPx, ProcessPxOrPercent } from "../util";

const obj = {
  "line-width": ProcessPx,
  "line-color": ProcessColor,
};
const keys = Object.keys(obj);

export type LineStyleType = {
  "line-width"?: number;
  "line-color"?: ColorType;
  "line-rounded"?: boolean;
};

export function LineStyle(style: LineStyleType, result, compName) {
  keys.forEach((key) => {
    if (style[key] !== void 0) {
      obj[key](key, style[key], result);
    }
  });

  if (style["line-rounded"]) {
    result["line-rounded"] = Boolean(style["line-rounded"]);
  }
}
