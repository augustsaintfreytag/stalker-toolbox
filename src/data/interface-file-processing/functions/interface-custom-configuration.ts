import { configuration } from "~/data/configuration/configuration"

type VerticalOffsetsByElementName = Map<string, number>
type VerticalOffsetsByFileName = Map<string, VerticalOffsetsByElementName>

type ValueOverridesBySelector = Map<string, number>
type ValueOverridesByFileName = Map<string, ValueOverridesBySelector>

const fileNameSeparator = ":"

export const customVerticalOffsetsByFileName: VerticalOffsetsByFileName = Object.entries(configuration.modUserInterfaceCustomVerticalOffset).reduce(
	(map, [scope, offset]) => {
		const [fileName, elementName] = scope.split(fileNameSeparator)

		if (!fileName || !elementName) {
			return map
		}

		const verticalOffsetsByElementName = map.get(fileName) ?? new Map()
		verticalOffsetsByElementName.set(elementName, offset)

		map.set(fileName, verticalOffsetsByElementName)
		return map
	},
	new Map()
)

export const customValueOverridesByFileName: ValueOverridesByFileName = Object.entries(configuration.modUserInterfaceCustomValueOverrides).reduce(
	(map, [scope, value]) => {
		const [fileName, elementName] = scope.split(fileNameSeparator)

		if (!fileName || !elementName) {
			return map
		}

		const valueOverridesByElementName = map.get(fileName) ?? new Map()
		valueOverridesByElementName.set(elementName, value)

		map.set(fileName, valueOverridesByElementName)
		return map
	},
	new Map()
)
