import { NativeSelect, useMediaQuery, useTheme } from "@material-ui/core"
import { makeStyles, createStyles } from "@material-ui/styles"
import { observer } from "mobx-react"
import { AppTheme } from "styles/theme"
import Flex from "./Flex"

const MuiSelect = (props) => {
  const styles = useStyles()(props);
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("lg"));
  const mdDownMini = useMediaQuery(theme.breakpoints.down(450));

  return (
    <Flex p={1} className={styles.wrapper}>
      <NativeSelect className={styles.root}>
        {props.options?.map((opt, index) => (
          <option key={opt.key || opt.id || index} value={opt.value}
            className={styles.option}
          >
            {opt.label}
          </option>
        ))}
      </NativeSelect>
    </Flex>
  )
}

const useStyles = () => makeStyles((theme: AppTheme) => createStyles({
  root: {
    minWidth: "150px"
  },
  wrapper: {
  },
  option: {

  }
}));

export default observer(MuiSelect)