import { ArcComp, ArcProps } from "./components/Arc/comp";
import ArcConfig from "./components/Arc/config";
import { ButtonComp, ButtonProps } from "./components/Button/comp";
import ButtonConfig from "./components/Button/config";
import { CalendarComp, CalendarProps } from "./components/Calendar/comp";
import CalendarConfig from "./components/Calendar/config";
import { ChartComp, ChartProps } from "./components/Chart/comp";
import ChartConfig from "./components/Chart/config";
import { CheckboxComp, CheckboxProps } from "./components/Checkbox/comp";
import CheckboxConfig from "./components/Checkbox/config";
import { DropdownlistComp, DropdownListProps } from "./components/Dropdownlist/comp";
import DropdownlistConfig from "./components/Dropdownlist/config";
import { GIFComp, GIFProps } from "./components/GIF/comp";
import GIFConfig from "./components/GIF/config";
import { ImageComp, ImageProps } from "./components/Image/comp";
import ImageConfig from "./components/Image/config";
import { InputComp, InputProps } from "./components/Input/comp";
import InputConfig from "./components/Input/config";
import { KeyboardComp, KeyboardProps } from "./components/Keyboard/comp";
import KeyboardConfig from "./components/Keyboard/config";
import { LineComp, LineProps } from "./components/Line/comp";
import LineConfig from "./components/Line/config";
import { MaskComp, MaskProps } from "./components/Mask/comp";
import MaskConfig from "./components/Mask/config";
import { ProgressBarComp, ProgressBarProps } from "./components/ProgressBar/comp";
import ProgressBarConfig from "./components/ProgressBar/config";
import { RollerComp, RollerProps } from "./components/Roller/comp";
import RollerConfig from "./components/Roller/config";
import { SliderComp, SliderProps } from "./components/Slider/comp";
import SliderConfig from "./components/Slider/config";
import { SwitchComp, SwitchProps } from "./components/Switch/comp";
import SwitchConfig from "./components/Switch/config";
import { TabsComp, TabsProps } from "./components/Tabs/comp";
import TabsConfig from "./components/Tabs/config";
import { TextComp, TextProps } from "./components/Text/comp";
// import WindowConfig from "./components/Window/config";
// import { Window, WindowProps } from "./components/Window/comp";
import TextConfig from "./components/Text/config";
import { TextareaComp, TextAreaProps } from "./components/Textarea/comp";
import TextareaConfig from "./components/Textarea/config";
import { ViewComp, ViewProps } from "./components/View/comp";
import ViewConfig from "./components/View/config";
import { registerComponent } from "./components/config";
import { Renderer } from "./core/renderer";

export const View = registerComponent<ViewProps, ViewComp>(new ViewConfig());
// export const Window = registerComponent<WindowProps, Window>(new WindowConfig());
export const Text = registerComponent<TextProps, TextComp>(new TextConfig());
export const Image = registerComponent<ImageProps, ImageComp>(new ImageConfig());
export const Button = registerComponent<ButtonProps, ButtonComp>(new ButtonConfig());
export const Slider = registerComponent<SliderProps, SliderComp>(new SliderConfig());
export const Arc = registerComponent<ArcProps, ArcComp>(new ArcConfig());
export const Switch = registerComponent<SwitchProps, SwitchComp>(new SwitchConfig());
export const Textarea = registerComponent<TextAreaProps, TextareaComp>(new TextareaConfig());
export const Input = registerComponent<InputProps, InputComp>(new InputConfig());
export const Keyboard = registerComponent<KeyboardProps, KeyboardComp>(new KeyboardConfig());
export const Checkbox = registerComponent<CheckboxProps, CheckboxComp>(new CheckboxConfig());
export const Dropdownlist = registerComponent<DropdownListProps, DropdownlistComp>(new DropdownlistConfig());
export const ProgressBar = registerComponent<ProgressBarProps, ProgressBarComp>(new ProgressBarConfig());
export const Roller = registerComponent<RollerProps, RollerComp>(new RollerConfig());
export const Line = registerComponent<LineProps, LineComp>(new LineConfig());
export const Calendar = registerComponent<CalendarProps, CalendarComp>(new CalendarConfig());
export const GIF = registerComponent<GIFProps, GIFComp>(new GIFConfig());
export const Tabs = registerComponent<TabsProps, TabsComp>(new TabsConfig());
export const Chart = registerComponent<ChartProps, ChartComp>(new ChartConfig());
export const Mask = registerComponent<MaskProps, MaskComp>(new MaskConfig());

export {
  EAlignType,
  EDropdownlistDirection,
  EDropdownListArrowDirection,
} from "./components/config";
export { EAnimateEasingFunc, Animate } from "./core/animate";
export { Dimensions } from "./core/dimensions";
export { BUILT_IN_SYMBOL } from "./core/style/symbol";
export { Theme } from "./core/theme";

export const Render = Renderer;
