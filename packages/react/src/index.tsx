// Re-export types from core library
export type {
	FileExtension,
	QRCodeConfig,
	QRCodeOptions,
} from "beautiful-qr-code";
export type {
	BeautifulQRCodeProps,
	BeautifulQRCodeRef,
} from "./beautiful-qr-code";
// biome-ignore lint/performance/noBarrelFile: Intentional public API exports
export { BeautifulQRCode } from "./beautiful-qr-code";
