import type { ErrorCorrectionLevel, QRCodeOptions } from "./types";

export const imageUrlToDataUrl = async (url: string): Promise<string> => {
	try {
		const response = await fetch(url);
		const blob = await response.blob();

		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result as string);
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
	} catch (error) {
		console.error("Failed to convert image to data URL:", error);
		throw error;
	}
};

export const getErrorCorrectionLevel = (
	hasLogo: boolean,
	provided?: ErrorCorrectionLevel,
): ErrorCorrectionLevel => {
	if (provided) {
		return provided;
	}
	return hasLogo ? "H" : "M";
};

export const generateMoves = (
	options: QRCodeOptions,
): Record<string, string> => {
	const radius = options.radius != null ? options.radius : 1;
	const moves: Record<string, string> = {
		u: "v-2",
		r: "h2",
		d: "v2",
		l: "h-2",
	};

	["ld", "ul", "ru", "dr", "ur", "rd", "dl", "lu"].forEach((i, j) => {
		const sides = [
			{ d: [0, 1], l: [-1, 0], u: [0, -1], r: [1, 0] }[i[0]],
			{ u: [0, -1], r: [1, 0], d: [0, 1], l: [-1, 0] }[i[1]],
		] as [number, number][];

		moves[i] =
			(radius < 1
				? `${{ d: "v", l: "h-", u: "v-", r: "h" }[i[0]]}${1 - radius}`
				: "") +
			"a" +
			`${radius},${radius} 0 0,${j > 3 ? 1 : 0}` +
			" " +
			(sides[0][0] + sides[1][0]) * radius +
			"," +
			(sides[0][1] + sides[1][1]) * radius +
			(radius < 1
				? `${{ u: "v-", r: "h", d: "v", l: "h-" }[i[1]]}${1 - radius}`
				: "");
	});

	return moves;
};

export const downloadPNG = (canvas: HTMLCanvasElement, filename: string) => {
	const link = document.createElement("a");
	link.download = `${filename}.png`;
	link.href = canvas.toDataURL("image/png");
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

export const downloadSVG = (svg: string, filename: string) => {
	// Add XML declaration if not present
	let svgContent = svg;
	if (!svgContent.startsWith("<?xml")) {
		svgContent = `<?xml version="1.0" standalone="no"?>\r\n${svgContent}`;
	}

	const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.download = `${filename}.svg`;
	link.href = url;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
};
