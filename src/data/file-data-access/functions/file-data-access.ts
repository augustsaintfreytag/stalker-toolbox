import { fs } from "@tauri-apps/api"
import { FileEntry } from "@tauri-apps/api/fs"
import { configuration } from "~/data/configuration/configuration"
import { Path } from "~/data/file-data-access/library/path"

export type FileContents = string

const fileMatchExpressions = configuration.modUserInterfaceFilePatterns.map(pattern => new RegExp(pattern, "i"))

export async function listXMLFiles(directory: Path): Promise<FileEntry[]> {
	const files = await fs.readDir(directory)

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

export async function truncateXMLOutputDirectory(directory: Path): Promise<void> {
	try {
		await fs.removeDir(directory, { recursive: true })
	} catch (error) {
		throw new Error(`Could not truncate output directory at path '${directory}'. ${error}`)
	}
}

export async function makeXMLOutputDirectory(directory: Path): Promise<void> {
	try {
		await fs.createDir(directory, { recursive: true })
	} catch (error) {
		throw new Error(`Could not create output directory at path '${directory}'. ${error}`)
	}
}

export async function writeXMLFile(path: string, contents: string): Promise<void> {
	await fs.writeTextFile(path, contents)
}
