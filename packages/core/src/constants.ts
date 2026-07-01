import type { QRCodeOptions } from "./types";

export const DEFAULT_OPTIONS: QRCodeOptions = {
  typeNumber: 0,
  mode: "Byte",
  radius: 1,
  padding: 1,
  foregroundColor: "#000",
  backgroundColor: "transparent",
  hasLogo: false,
};

export const CANVAS_SIZE = 1000;
