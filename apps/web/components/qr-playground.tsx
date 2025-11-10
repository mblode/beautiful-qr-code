"use client";

import { useState, useRef } from "react";
import { BeautifulQRCode, type BeautifulQRCodeRef } from "@beautiful-qr-code/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";

export function QRPlayground() {
  const qrRef = useRef<BeautifulQRCodeRef>(null);
  const [data, setData] = useState("https://github.com/mblode/beautiful-qr-code");
  const [foregroundColor, setForegroundColor] = useState("#bd7f7f");
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [radius, setRadius] = useState(0.7);
  const [padding, setPadding] = useState(5);
  const [logoUrl, setLogoUrl] = useState("");

  const handleDownload = async (format: "svg" | "png") => {
    await qrRef.current?.download({
      name: "beautiful-qr-code",
      extension: format,
    });
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Preview */}
      <div className="flex flex-col items-center justify-center bg-surface rounded-lg p-8 min-h-[400px]">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <BeautifulQRCode
            ref={qrRef}
            data={data}
            foregroundColor={foregroundColor}
            backgroundColor={backgroundColor}
            radius={radius}
            padding={padding}
            logoUrl={logoUrl || undefined}
            className="w-full max-w-[600px] aspect-square"
          />
        </div>
        <div className="flex gap-4 mt-6">
          <Button
            type="button"
            onClick={() => handleDownload("svg")}
          >
            Download SVG
          </Button>
          <Button
            type="button"
            onClick={() => handleDownload("png")}
            variant="secondary"
          >
            Download PNG
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-6">
        <Field>
          <FieldLabel htmlFor="data">
            Data / URL
          </FieldLabel>
          <Input
            id="data"
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Enter URL or text"
          />
          <FieldDescription>
            Enter any text or URL to encode in the QR code
          </FieldDescription>
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="foreground">
              Foreground Color
            </FieldLabel>
            <div className="flex gap-2">
              <input
                id="foreground"
                type="color"
                value={foregroundColor}
                onChange={(e) => setForegroundColor(e.target.value)}
                className="h-10 w-16 rounded cursor-pointer"
              />
              <Input
                type="text"
                value={foregroundColor}
                onChange={(e) => setForegroundColor(e.target.value)}
                className="flex-1 font-mono text-sm"
              />
            </div>
          </Field>

          <Field>
            <FieldLabel htmlFor="background">
              Background Color
            </FieldLabel>
            <div className="flex gap-2">
              <input
                id="background"
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="h-10 w-16 rounded cursor-pointer"
              />
              <Input
                type="text"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="flex-1 font-mono text-sm"
              />
            </div>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="radius">
            Corner Radius: {radius.toFixed(2)}
          </FieldLabel>
          <Slider
            id="radius"
            min={0}
            max={1}
            step={0.1}
            value={[radius]}
            onValueChange={(value) => setRadius(value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Sharp</span>
            <span>Rounded</span>
          </div>
          <FieldDescription>
            Adjust the roundness of QR code corners
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="padding">
            Padding: {padding}
          </FieldLabel>
          <Slider
            id="padding"
            min={0}
            max={5}
            step={1}
            value={[padding]}
            onValueChange={(value) => setPadding(value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>None</span>
            <span>Large</span>
          </div>
          <FieldDescription>
            Add spacing around the QR code
          </FieldDescription>
        </Field>

        <Field>
          <FieldLabel htmlFor="logo">
            Logo URL (optional)
          </FieldLabel>
          <Input
            id="logo"
            type="text"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            placeholder="https://example.com/logo.png"
          />
          <FieldDescription>
            Add a logo image in the center of the QR code
          </FieldDescription>
        </Field>
      </div>
    </div>
  );
}
