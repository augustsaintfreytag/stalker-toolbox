import { configuration } from "~/data/configuration/configuration"

const defaultButtonElementHeight = 26

export function processButtonElementWithEstimatedHeight(fileName: string, buttonElement: Element): void {
	const textElement = buttonElement.querySelector("text")

	if (!textElement) {
		return
	}

	const fontIdentifier = textElement.getAttribute("font") || undefined

	if (!fontIdentifier) {
		console.warn(`Could not process button element '${buttonElement.nodeName}' in '${fileName}', no font attribute.`)
		return
	}

	const lineHeight = lineHeightForFontIdentifier(fontIdentifier)

	if (!lineHeight) {
		console.warn(
			`Could not process button element '${buttonElement.nodeName}' in '${fileName}', unknown font '${fontIdentifier}', no defined line height.`
		)
		return
	}

	const buttonHeight = Number(buttonElement.getAttribute("height")) ?? defaultButtonElementHeight
	const verticalOffset = (buttonHeight - lineHeight) / 2

	textElement.setAttribute("y", String(verticalOffset))

	console.log(`Assigned vertical offset ${verticalOffset} to text in button element '${buttonElement.nodeName}' in '${fileName}'.`)
}

function lineHeightForFontIdentifier(fontIdentifier: string): number | undefined {
	const lineHeightDictionary = configuration.lineHeightByFont as Record<string, number>
	return lineHeightDictionary[fontIdentifier]
}
