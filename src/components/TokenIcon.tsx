import { createStyles, makeStyles } from "@material-ui/styles";
import { AppTheme } from "styles/theme";

interface TokenIconProps {
  image?: string;
  size?: number;
}

const TokenIcon = (props: TokenIconProps) => {
  const styles = useStyles(props);

  return (
    <img
      src={props.image || "/images/no-image.png"}
      style={{
        width: props.size || 30,
        height: props.size || 30,
        borderRadius: "50%",
      }}
    />
  );
};

const useStyles = makeStyles((theme: AppTheme) => createStyles({}));

export default TokenIcon;
