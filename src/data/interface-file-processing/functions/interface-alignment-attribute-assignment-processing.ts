import { fileNameFromRaw } from "~/data/interface-file-data-access/functions/interface-file-path"
import { customVerticalOffsetsByFileName } from "~/data/interface-file-processing/functions/interface-custom-configuration"

export function processButtonElementWithVerticalAlignment(fileName: string, buttonElement: Element): void {
	const textElement = buttonElement.querySelector("text")

	if (!textElement) {
		return
	}

	textElement.setAttribute("vert_align", "c")
	textElement.setAttribute("complex_mode", "1")

	const customVerticalOffset = customVerticalOffsetsByFileName.get(fileNameFromRaw(fileName))?.get(buttonElement.nodeName)

	if (customVerticalOffset) {
		textElement.setAttribute("y", String(customVerticalOffset))
	}

	const attributeIdentifiers = ["vert_align", "complex_mode", customVerticalOffset && "y"].filter(value => value).map(value => `'${value}'`)

	console.log(`Assigned ${attributeIdentifiers.join(", ")} to text in button element '${buttonElement.nodeName}' in '${fileName}'.`)
}
