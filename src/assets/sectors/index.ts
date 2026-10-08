// The sector field's marks, 23 Sep 2026.
//
// ALL THIRTEEN ARE DRAWN TO ONE SPEC so the row of nine reads as one family:
// a 24x24 box, no fill, currentColor stroke at 1.6, round caps and joins. The
// other icon folders in this repo are filled paths exported at whatever size
// the source file happened to be, which is why these do not live in
// assets/common — mixing a 27px filled glyph into this grid is visible.
//
// Size is NOT set on the svg element. Every one of these is sized by the chip
// it sits in (width/height 100% in _dynamicMarket.scss), so the same mark can
// be 24px in a sector card and 26px in a growth stage without a second export.
export { default as ChipIcon } from "./ChipIcon";
export { default as CoinsIcon } from "./CoinsIcon";
export { default as HeartIcon } from "./HeartIcon";
export { default as BagIcon } from "./BagIcon";
export { default as HouseIcon } from "./HouseIcon";
export { default as GroupIcon } from "./GroupIcon";
export { default as GraduationIcon } from "./GraduationIcon";
export { default as FactoryIcon } from "./FactoryIcon";
export { default as PlusMarkIcon } from "./PlusMarkIcon";
export { default as SproutIcon } from "./SproutIcon";
export { default as BarsIcon } from "./BarsIcon";
export { default as TowerIcon } from "./TowerIcon";
export { default as ArrowEast } from "./ArrowEast";
