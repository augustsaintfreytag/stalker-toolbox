import { FileEntry } from "@tauri-apps/api/fs"
import { configuration } from "~/data/configuration/configuration"
import {
	listXMLFiles,
	makeXMLOutputDirectory,
	readXMLFile,
	truncateXMLOutputDirectory,
	writeXMLFile
} from "~/data/file-data-access/functions/file-data-access"
import { fileNameFromRaw, interfaceFileOutputDirectory } from "~/data/interface-file-data-access/functions/interface-file-path"
import { processButtonElementWithVerticalAlignment } from "~/data/interface-file-processing/functions/interface-alignment-attribute-assignment-processing"
import { customValueOverridesByFileName } from "~/data/interface-file-processing/functions/interface-custom-configuration"

export async function processAllInterfaceFiles(): Promise<void> {
	const inputDirectory = `${configuration.modPath}/gamedata/configs/ui`
	const outputDirectory = interfaceFileOutputDirectory()

	const allFileEntries = await listXMLFiles(inputDirectory)

	await truncateXMLOutputDirectory(outputDirectory)
	await makeXMLOutputDirectory(outputDirectory)

	console.log(`(Process) Read ${allFileEntries.length} user interface file(s) from mod directory.`)

	for (const fileEntry of allFileEntries) {
		console.log(`(Process) Processing file '${fileEntry.name}'.`)
		await processAndWriteInterfaceFileForEntry(fileEntry, outputDirectory)
	}
}

async function processAndWriteInterfaceFileForEntry(fileEntry: FileEntry, outputDirectory: string): Promise<void> {
	const fileName = fileEntry.name ?? "(Unknown File)"
	const rawFileContents = await readXMLFile(fileEntry)
	const processedFileContents = processInterfaceFileContents(fileName, rawFileContents)

	const filePath = `${outputDirectory}/${fileName}`
	await writeXMLFile(filePath, processedFileContents)
}

function processInterfaceFileContents(fileName: string, fileContents: string): string {
	const document = new DOMParser().parseFromString(fileContents, "text/xml")
	const buttonParentElements = getButtonParentElements(document.documentElement)

	for (const buttonParentElement of buttonParentElements) {
		processButtonElementWithVerticalAlignment(fileName, buttonParentElement)
	}

	processInterfaceDocumentOverrides(fileName, document)

	return new XMLSerializer().serializeToString(document)
}

function processInterfaceDocumentOverrides(fileName: string, document: Document) {
	const valueOverridesBySelector = customValueOverridesByFileName.get(fileNameFromRaw(fileName)) ?? []

	for (const [selector, value] of valueOverridesBySelector) {
		const element = document.querySelector(selector)

		if (!element) {
			continue
		}

		element.textContent = String(value)
		console.log(`Assigned override for value of element '${selector}' in '${fileName}'.`)
	}
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
