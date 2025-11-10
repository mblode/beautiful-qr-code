export type TypeNumber =
  | 0 // Automatic type number
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40;

export type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export type Mode = "Numeric" | "Alphanumeric" | "Byte" | "Kanji";

export type FileExtension = "svg" | "png";

export interface QRCodeOptions {
  typeNumber: TypeNumber;
  errorCorrectionLevel: ErrorCorrectionLevel | undefined;
  mode: Mode;
  radius: number;
  padding: number;
  foregroundColor: string;
  backgroundColor: string;
  hasLogo: boolean;
  logoUrl?: string;
}

export interface QRCodeConfig extends Partial<QRCodeOptions> {
  data: string;
  type?: "svg" | "canvas";
}
