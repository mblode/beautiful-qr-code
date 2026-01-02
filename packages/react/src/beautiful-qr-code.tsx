import { type QRCodeConfig, QRCodeStyling } from "beautiful-qr-code";
import type React from "react";
import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
} from "react";

export interface BeautifulQRCodeProps extends Omit<QRCodeConfig, "type"> {
	className?: string;
	style?: React.CSSProperties;
	type?: QRCodeConfig["type"];
}

export interface BeautifulQRCodeRef {
	qrCode: QRCodeStyling | null;
	download: (options?: {
		name?: string;
		extension?: "svg" | "png";
	}) => Promise<void>;
	getSVG: () => Promise<string>;
	getCanvas: () => Promise<HTMLCanvasElement>;
	update: (config: Partial<QRCodeConfig>) => void;
}

const buildQRConfig = (
	config: Omit<BeautifulQRCodeProps, "className" | "style" | "type">,
	type: QRCodeConfig["type"],
): QRCodeConfig => {
	const result: Partial<QRCodeConfig> = {
		data: config.data,
		type,
	};

	const optionalFields: Array<keyof typeof config> = [
		"typeNumber",
		"errorCorrectionLevel",
		"mode",
		"radius",
		"padding",
		"foregroundColor",
		"backgroundColor",
		"hasLogo",
		"logoUrl",
	];

	for (const field of optionalFields) {
		if (config[field] !== undefined) {
			// @ts-expect-error - we know these fields are compatible
			result[field] = config[field];
		}
	}

	return result as QRCodeConfig;
};

export const BeautifulQRCode = forwardRef<
	BeautifulQRCodeRef,
	BeautifulQRCodeProps
>(({ className, style, type = "svg", ...config }, ref) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const qrCodeRef = useRef<QRCodeStyling | null>(null);

	// Memoize config to prevent unnecessary re-renders
	// Only pass defined values to allow core library defaults to work
	// biome-ignore lint/correctness/useExhaustiveDependencies: Individual properties intentionally listed to optimize re-renders
	const qrConfig = useMemo(
		() => buildQRConfig(config, type),
		[
			config.data,
			config.typeNumber,
			config.errorCorrectionLevel,
			config.mode,
			config.radius,
			config.padding,
			config.foregroundColor,
			config.backgroundColor,
			config.hasLogo,
			config.logoUrl,
			type,
		],
	);

	// Expose QR code instance and methods via ref
	useImperativeHandle(
		ref,
		() => ({
			get qrCode() {
				return qrCodeRef.current;
			},
			download: async (options) => {
				if (!qrCodeRef.current) {
					throw new Error("QR code not initialized");
				}
				await qrCodeRef.current.download(options);
			},
			getSVG: async () => {
				if (!qrCodeRef.current) {
					throw new Error("QR code not initialized");
				}
				return await qrCodeRef.current.getSVG();
			},
			getCanvas: async () => {
				if (!qrCodeRef.current) {
					throw new Error("QR code not initialized");
				}
				return await qrCodeRef.current.getCanvas();
			},
			update: (newConfig) => {
				if (!qrCodeRef.current) {
					throw new Error("QR code not initialized");
				}
				qrCodeRef.current.update(newConfig);
			},
		}),
		[],
	);

	// Initialize QR code on mount and update when config changes
	useEffect(() => {
		// Validate data before rendering
		if (!qrConfig.data || qrConfig.data.trim().length === 0) {
			console.warn("BeautifulQRCode: QR code data is empty, skipping render");
			return;
		}

		try {
			if (!qrCodeRef.current && containerRef.current) {
				qrCodeRef.current = new QRCodeStyling(qrConfig);
				qrCodeRef.current.append(containerRef.current);
			} else if (qrCodeRef.current) {
				qrCodeRef.current.update(qrConfig);
			}
		} catch (error) {
			console.error("BeautifulQRCode: Failed to render QR code", error);
		}
	}, [qrConfig]);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			if (containerRef.current) {
				containerRef.current.innerHTML = "";
			}
			qrCodeRef.current = null;
		};
	}, []);

	return <div className={className} ref={containerRef} style={style} />;
});

BeautifulQRCode.displayName = "BeautifulQRCode";
