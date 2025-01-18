import { ProcessColor, ProcessPx, ProcessPxOrPercent } from "../util";

export type DisplayStyleType = {
  "display"?: "flex" | "grid" | "block" | "inline" | "none";
}

export function DisplayStyle(style: DisplayStyleType, result, compName) {
  if (style["display"]) {
    result["display"] = style["display"];
  }
}
