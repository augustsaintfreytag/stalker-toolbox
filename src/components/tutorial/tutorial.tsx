import { Button, MessageBar, MessageBarActions, MessageBarBody } from "@fluentui/react-components"
import { FunctionComponent } from "react"

const Tutorial: FunctionComponent = () => {
	return (
		<MessageBar intent="info" layout="multiline" style={{ maxWidth: "30rem" }}>
			<MessageBarBody>
				Welcome to the Stalker Anomaly UI Editor! This tool allows you to modify the user interface definition files (XML format) of Stalker Anomaly,
				the first-person shooter game. You can open an XML file, make your desired changes in the text area below, and save the file when you're done.
				This gives you the power to customize the game's UI to your liking. Please ensure to follow the XML syntax to avoid any errors. Happy editing!
			</MessageBarBody>
			<MessageBarActions>
				<Button>Dismiss Tutorial</Button>
			</MessageBarActions>
		</MessageBar>
	)
}

export default Tutorial
