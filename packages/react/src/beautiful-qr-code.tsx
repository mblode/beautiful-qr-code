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

export const BeautifulQRCode = forwardRef<
  BeautifulQRCodeRef,
  BeautifulQRCodeProps
>(({ className, style, type = "svg", ...config }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);

  // Memoize config to prevent unnecessary re-renders
  const qrConfig = useMemo(
    () => ({
      data: config.data,
      type,
      typeNumber: config.typeNumber,
      errorCorrectionLevel: config.errorCorrectionLevel,
      mode: config.mode,
      radius: config.radius,
      padding: config.padding,
      foregroundColor: config.foregroundColor,
      backgroundColor: config.backgroundColor,
      hasLogo: config.hasLogo,
      logoUrl: config.logoUrl,
    }),
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
    if (!qrCodeRef.current && containerRef.current) {
      qrCodeRef.current = new QRCodeStyling(qrConfig);
      qrCodeRef.current.append(containerRef.current);
    } else if (qrCodeRef.current) {
      qrCodeRef.current.update(qrConfig);
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

  return <div ref={containerRef} className={className} style={style} />;
});

BeautifulQRCode.displayName = "BeautifulQRCode";
