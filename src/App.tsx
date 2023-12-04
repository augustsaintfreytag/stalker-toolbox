import { Divider, FluentProvider, Tab, TabList, webDarkTheme, webLightTheme } from "@fluentui/react-components"
import { FunctionComponent, useState } from "react"
import { useDarkMode } from "usehooks-ts"
import View from "~/components/view/view"
import InterfaceEditorView from "~/views/interface-editor/interface-editor-view"

type TabIdentifier = "interface-editor" | "demo"

const App: FunctionComponent = () => {
	const { isDarkMode } = useDarkMode()
	const theme = isDarkMode ? webDarkTheme : webLightTheme

	const [selectedTabIdentifier, setSelectedTabIdentifier] = useState<TabIdentifier>("interface-editor")

	return (
		<>
			<FluentProvider theme={theme}>
				<TabList
					size="large"
					selectedValue={selectedTabIdentifier}
					onTabSelect={(event, data) => setSelectedTabIdentifier(data.value as TabIdentifier)}
				>
					<Tab value="interface-editor">Interface Editor</Tab>
				</TabList>
				<Divider />
				<>
					{selectedTabIdentifier === "interface-editor" && (
						<View>
							<InterfaceEditorView />
						</View>
					)}
				</>
			</FluentProvider>
		</>
	)
}

export default App
