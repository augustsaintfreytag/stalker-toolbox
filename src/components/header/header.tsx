import { makeStyles, tokens } from "@fluentui/react-components"
import { FunctionComponent } from "react"

const useStyles = makeStyles({
	root: {
		backgroundColor: tokens.colorBrandBackground
	}
})

const Header: FunctionComponent = () => <header className={useStyles().root}></header>

export default Header
