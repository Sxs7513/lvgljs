import { NormalizePx } from "../util";

const GRID_CONTENT = (1 << 13) - 1 - 101;
const FR_REG = /([\d]+)fr$/;

const gridChildJustifySelfObj = {
  start: 0,
  end: 2,
  center: 1,
  stretch: 3,
};
const gridChildAlignSelfObj = {
  start: 0,
  end: 2,
  center: 1,
  stretch: 3,
};

const gridJustifyContentObj = {
  start: 0,
  end: 2,
  center: 1,
  "space-evenly": 4,
  "space-around": 5,
  "space-between": 6,
  stretch: 3,
};

const gridAlignItemsObj = {
  start: 0,
  end: 2,
  center: 1,
  "space-evenly": 4,
  "space-around": 5,
  "space-between": 6,
  stretch: 3,
};

export type GridStyleType = {
  "display"?: "grid";
  "grid-template-columns"?: string;
  "grid-template-rows"?: string;
  "justify-content"?: "start" | "end" | "center" | "space-evenly" | "space-around" | "space-between" | "stretch";
  "align-items"?: "start" | "end" | "center" | "space-evenly" | "space-around" | "space-between" | "stretch";
  "grid-child"?: boolean;
  "justify-self"?: "start" | "end" | "center" | "stretch";
  "align-self"?: "start" | "end" | "center" | "stretch";
  "grid-column-pos"?: number;
  "grid-row-pos"?: number;
  "grid-column-span"?: number;
  "grid-row-span"?: number;
};

export function GridStyle(style: GridStyleType, result) {
  if (style.display == "grid") {
    let columns = style["grid-template-columns"]?.split(/\s/).filter(Boolean);
    let rows = style["grid-template-rows"]?.split(/\s/).filter(Boolean);

    if (!columns || !rows) return;

    columns = columns.map((column) => {
      if (column === "auto") {
        return GRID_CONTENT;
      }
      const arr = column?.match(FR_REG);
      if (!isNaN(arr?.[1])) {
        return (1 << 13) - 1 - 100 + Number(arr[1]);
      }
      return NormalizePx(column);
    });
    rows = rows.map((row) => {
      if (row === "auto") {
        return GRID_CONTENT;
      }
      const arr = row?.match(FR_REG);
      if (!isNaN(arr?.[1])) {
        return (1 << 13) - 1 - 100 + Number(arr[1]);
      }
      return NormalizePx(row);
    });
    columns = columns.filter(Boolean);
    rows = rows.filter(Boolean);
    result["display"] = "grid";
    result["grid-template"] = [columns, rows];
    const justifyContent =
      gridJustifyContentObj[style["justify-content"]] ||
      gridJustifyContentObj.start;
    const alignContent =
      gridAlignItemsObj[style["align-items"]] || gridAlignItemsObj.start;

    result["grid-align"] = [justifyContent, alignContent];
  }

  if (style["grid-child"]) {
    const justifySelf = style["justify-self"];
    const alignSelf = style["align-self"];
    const gridColumnPos = style["grid-column-pos"];
    const gridRowPos = style["grid-row-pos"];
    const gridColumnSpan = style["grid-column-span"] || 1;
    const gridRowSpan = style["grid-row-span"] || 1;

    if (isNaN(gridColumnPos + gridColumnSpan + gridRowPos + gridRowSpan))
      return;

    let column_align, row_align;
    column_align =
      gridChildJustifySelfObj[justifySelf] || gridChildJustifySelfObj.start;
    row_align = gridChildAlignSelfObj[alignSelf] || gridChildAlignSelfObj.start;

    result["grid-child"] = [
      column_align,
      gridColumnPos,
      gridColumnSpan,
      row_align,
      gridRowPos,
      gridRowSpan,
    ];
  }
}
