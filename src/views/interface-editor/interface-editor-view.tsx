import { Button, Input, Label, Text, makeStyles, shorthands, tokens, useId } from "@fluentui/react-components"
import { Folder24Regular, Play24Filled } from "@fluentui/react-icons"
import { FunctionComponent } from "react"
import { configuration } from "~/data/configuration/configuration"
import { processAllInterfaceFiles } from "~/data/interface-file-processing/functions/interface-file-processing"
import { unixPathToWindowsPath } from "~/data/paths/functions/platform-path-transformation"

const useStyles = makeStyles({
	root: {
		marginTop: tokens.spacingVerticalS,
		marginLeft: "auto",
		marginRight: "auto",
		maxWidth: "50rem"
	},
	header: {},
	main: {
		marginTop: tokens.spacingVerticalS
	},
	labeledInput: {
		display: "flex",
		flexDirection: "column",
		...shorthands.gap(tokens.spacingVerticalS),
		marginTop: tokens.spacingVerticalL,
		marginBottom: tokens.spacingVerticalL
	},
	button: {}
})

const InterfaceEditorView: FunctionComponent = () => {
	const styles = useStyles()
	const pathInputId = useId("path-input")

	return (
		<section className={styles.root}>
			<header className={styles.header}>
				<Text>
					The interface editor can read a prepared mod directory of user interface files, find buttons and text labels, and adjust a dynamic vertical
					offset to align labels inside button elements.
				</Text>
			</header>
			<main className={styles.main}>
				<div className={styles.labeledInput}>
					<Label htmlFor={pathInputId}>Mod Directory Path</Label>
					<Input
						id={pathInputId}
						contentBefore={<Folder24Regular style={{ marginRight: tokens.spacingHorizontalXS }} />}
						value={unixPathToWindowsPath(configuration.modPath)}
						disabled
					/>
				</div>
				<Button className={styles.button} appearance="primary" icon={<Play24Filled />} onClick={() => processAllInterfaceFiles()}>
					Process All Files
				</Button>
			</main>
		</section>
	)
}

export default InterfaceEditorView
