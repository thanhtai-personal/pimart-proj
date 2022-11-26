import { ButtonBase } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { NotiStackInstance } from "App";
import { CopyIcon } from "assets/icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AppTheme } from "styles/theme";

interface CopyButtonProps {
  text: string;
}

const CopyButton = (props: CopyButtonProps) => {
  const styles = useStyles(props);

  return (
    <CopyToClipboard
      text={props.text}
      onCopy={() => {
        NotiStackInstance.push({
          children: "Copied to clipboard",
          variant: "success",
        });
      }}
    >
      <ButtonBase>
        <CopyIcon />
      </ButtonBase>
    </CopyToClipboard>
  );
};

const useStyles = makeStyles((theme: AppTheme) => createStyles({}));

export default CopyButton;
