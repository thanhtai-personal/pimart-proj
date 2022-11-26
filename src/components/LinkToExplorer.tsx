import { createStyles, makeStyles } from "@material-ui/styles";
import { AppTheme } from "styles/theme";

interface LinkToExplorerProps {
  children?: any;
  txs?: string;
  address?: string;
}

const LinkToExplorer = (props: LinkToExplorerProps) => {
  const styles = useStyles(props);
  let link = ``;
  if (props.txs) {
    link = `${process.env.REACT_APP_EXPLORER_URL}/tx/${props.txs}`;
  } else if (props.address) {
    link = `${process.env.REACT_APP_EXPLORER_URL}/address/${props.address}`;
  }

  return (
    <a href={link} target="_blank">
      {props.children}
    </a>
  );
};

const useStyles = makeStyles((theme: AppTheme) => createStyles({}));

export default LinkToExplorer;
