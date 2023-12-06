import { fs } from "@tauri-apps/api"
import { FileEntry } from "@tauri-apps/api/fs"
import { configuration } from "~/data/configuration/configuration"

export type FileContents = string

const fileMatchExpressions = configuration.modUserInterfaceFilePatterns.map(pattern => new RegExp(pattern, "i"))

export async function listXMLFiles(): Promise<FileEntry[]> {
	const path = `${configuration.modPath}/gamedata/configs/ui`
	const files = await fs.readDir(path)

	return files.filter(file => {
		const name = file.name

		if (!name) {
			return false
		}

		return fileMatchExpressions.some(expression => name.endsWith(`.${configuration.modUserInterfaceFileEnding}`) && expression.test(name))
	})
}

export async function readXMLFile(entry: FileEntry): Promise<FileContents> {
	try {
		return await fs.readTextFile(entry.path)
	} catch (error) {
		throw new Error(`Could not load XML file for entry ${entry.name} at path ${entry.path}. ${error}`)
	}
}

export async function truncateXMLOutputDirectory(): Promise<void> {
	const outputPath = xmlOutputDirectory()

	try {
		await fs.removeDir(outputPath, { recursive: true })
	} catch (error) {
		throw new Error(`Could not truncate output directory at path '${outputPath}'. ${error}`)
	}
}

export async function makeXMLOutputDirectory(): Promise<void> {
	const outputPath = xmlOutputDirectory()

	try {
		await fs.createDir(outputPath, { recursive: true })
	} catch (error) {
		throw new Error(`Could not create output directory at path '${outputPath}'. ${error}`)
	}
}

export function xmlOutputDirectory(): string {
	return `${configuration.modPath} (Patched)/gamedata/configs/ui`
}

export async function writeXMLFile(path: string, contents: string): Promise<void> {
	await fs.writeTextFile(path, contents)
}
