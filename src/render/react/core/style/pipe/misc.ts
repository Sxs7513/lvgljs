import { ColorType } from "../color";
import { ProcessColor } from "../util";

export type MiscStyleType = {
  "style-transition-time"?: number;
  recolor?: ColorType;
};

export function MiscStyle(style: MiscStyleType, result, compName) {
  if (style["recolor"] && compName === "Image") {
    ProcessColor("recolor", style["recolor"], result);
  }
  if (style["style-transition-time"]) {
    const value = style["style-transition-time"];
    if (!isNaN(value)) {
      result["style-transition-time"] = value;
    }
  }

  return result;
}
