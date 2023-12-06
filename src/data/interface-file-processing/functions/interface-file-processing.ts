import { configuration } from "~/data/configuration/configuration"
import {
	listXMLFiles,
	makeXMLOutputDirectory,
	readXMLFile,
	truncateXMLOutputDirectory,
	writeXMLFile,
	xmlOutputDirectory
} from "~/data/interface-file-access/functions/file-data-access"

const defaultButtonElementHeight = 26

export async function processAllInterfaceFiles(): Promise<void> {
	;``
	const allFileEntries = await listXMLFiles()
	const allProcessedFileContents: [string, string][] = []

	console.log(`(Process) Read ${allFileEntries.length} user interface file(s) from mod directory.`)

	for (const fileEntry of allFileEntries) {
		console.log(`(Process) Processing file '${fileEntry.name}'.`)
		const fileName = fileEntry.name ?? "(Unknown File)"
		const rawFileContents = await readXMLFile(fileEntry)
		const processedFileContents = processInterfaceFileContents(fileName, rawFileContents)

		allProcessedFileContents.push([fileName, processedFileContents])
	}

	const outputDirectory = xmlOutputDirectory()

	console.log(`(Process) Writing ${allProcessedFileContents.length} user interface file(s) to output directory '${outputDirectory}'.`)

	await truncateXMLOutputDirectory()
	await makeXMLOutputDirectory()

	for (const [fileName, fileContents] of allProcessedFileContents) {
		try {
			const filePath = `${outputDirectory}/${fileName}`
			await writeXMLFile(filePath, fileContents)
		} catch (error) {
			console.error(`(Process) Could not write file '${fileName}' to output directory. ${error}`)
		}
	}
}

export function processInterfaceFileContents(fileName: string, fileContents: string): string {
	const document = new DOMParser().parseFromString(fileContents, "text/xml")
	const buttonParentElements = getButtonParentElements(document.documentElement)

	for (const buttonParentElement of buttonParentElements) {
		processButtonElementWithVerticalAlignment(fileName, buttonParentElement)
	}

	return new XMLSerializer().serializeToString(document)
}

// Process

function processButtonElementWithEstimatedHeight(fileName: string, buttonElement: Element): void {
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

function processButtonElementWithVerticalAlignment(fileName: string, buttonElement: Element): void {
	const textElement = buttonElement.querySelector("text")

	if (!textElement) {
		return
	}

	textElement.setAttribute("vert_align", "c")
	textElement.setAttribute("complex_mode", "1")

	console.log(`Assigned layout attributes to text in button element '${buttonElement.nodeName}' in '${fileName}'.`)
}

function lineHeightForFontIdentifier(fontIdentifier: string): number | undefined {
	const lineHeightDictionary = configuration.lineHeightByFont as Record<string, number>
	return lineHeightDictionary[fontIdentifier]
}

// Read & Extract

const tagNameMatchExpression = new RegExp(`(${configuration.modUserInterfaceElementPatterns.join("|")})`, "i")

function getButtonParentElements(rootElement: Element): Element[] {
	const buttonParentElements: Element[] = []

	for (const node of rootElement.childNodes) {
		if (!nodeIsElementNode(node)) {
			continue
		}

		if (tagNameMatchExpression.test(node.tagName)) {
			buttonParentElements.push(node)
		} else if (node.hasChildNodes()) {
			const childButtonParentElements = getButtonParentElements(node)
			buttonParentElements.push(...childButtonParentElements)
		}
	}

	return buttonParentElements
}

function nodeIsElementNode(node: Node): node is Element {
	return node.nodeType === Node.ELEMENT_NODE
}
