import { createStyles, makeStyles } from "@material-ui/styles";
import { AppTheme } from "styles/theme";

interface LiveDotProps {}

const LiveDot = (props: LiveDotProps) => {
  const styles = useStyles(props);

  return <div className="pulsatingDot" />;
};

const useStyles = makeStyles((theme: AppTheme) => createStyles({}));

export default LiveDot;
