import { configuration } from "~/data/configuration/configuration"
import { Path } from "~/data/file-data-access/library/path"

export function interfaceFileOutputDirectory(): Path {
	const outputPath = configuration.modPath.replace("Input", "Output")
	return `${outputPath}/gamedata/configs/ui`
}

export function fileNameFromRaw(fileName: string): string {
	return fileName.replace(`.${configuration.modUserInterfaceFileEnding}`, "")
}
