import { QRCodeStyling } from "beautiful-qr-code";
import type { QRCodeConfig } from "beautiful-qr-code";
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
  update: (config: Partial<QRCodeConfig>) => Promise<void>;
}

export const BeautifulQRCode = forwardRef<
  BeautifulQRCodeRef,
  BeautifulQRCodeProps
>(({ className, style, type = "svg", ...config }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  // Memoize config to prevent unnecessary re-renders
  // Core strips undefined values before merging defaults, so pass config as-is
  // biome-ignore lint/correctness/useExhaustiveDependencies: Individual properties intentionally listed to optimize re-renders
  const qrConfig = useMemo(
    () => ({ ...config, type }),
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
    ]
  );

  // Expose QR code instance and methods via ref
  useImperativeHandle(
    ref,
    () => ({
      download: async (options) => {
        if (!qrCodeRef.current) {
          throw new Error("QR code not initialized");
        }
        await qrCodeRef.current.download(options);
      },
      getCanvas: async () => {
        if (!qrCodeRef.current) {
          throw new Error("QR code not initialized");
        }
        return await qrCodeRef.current.getCanvas();
      },
      getSVG: async () => {
        if (!qrCodeRef.current) {
          throw new Error("QR code not initialized");
        }
        return await qrCodeRef.current.getSVG();
      },
      get qrCode() {
        return qrCodeRef.current;
      },
      update: async (newConfig) => {
        if (!qrCodeRef.current) {
          throw new Error("QR code not initialized");
        }
        await qrCodeRef.current.update(newConfig);
      },
    }),
    []
  );

  // Initialize QR code on mount and update when config changes
  useEffect(() => {
    if (!qrCodeRef.current && containerRef.current) {
      qrCodeRef.current = new QRCodeStyling(qrConfig);
      qrCodeRef.current.append(containerRef.current).catch(console.error);
    } else if (qrCodeRef.current) {
      qrCodeRef.current.update(qrConfig).catch(console.error);
    }
  }, [qrConfig]);

  // Cleanup on unmount
  useEffect(
    () => () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      qrCodeRef.current = null;
    },
    []
  );

  return <div className={className} ref={containerRef} style={style} />;
});

BeautifulQRCode.displayName = "BeautifulQRCode";
