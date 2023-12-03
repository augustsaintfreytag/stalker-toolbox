import { makeStyles, shorthands } from "@fluentui/react-components"
import { FunctionComponent } from "react"

const useStyles = makeStyles({
	root: {
		...shorthands.padding("0.75rem")
	}
})

type Props = React.PropsWithChildren

const View: FunctionComponent<Props> = props => <section className={useStyles().root}>{props.children}</section>

export default View
