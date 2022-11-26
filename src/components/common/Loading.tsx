import React from "react";
import { AppTheme, Colors } from "styles/theme";
import { CircularProgress } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import Flex from "./Flex";

interface LoadingProps {
  size?: number;
  iconStyle?: any;
  textColor?: string;
  text?: any;
  color?: any;
}

const Loading = (props: LoadingProps) => {
  const styles = useStyles(props);

  return (
    <Flex center width="100%" height="100%">
      <div className={styles.root}>
        <CircularProgress
          className={styles.bottom}
          size={props.size || 40}
          thickness={5}
          color={props.color || "secondary"}
          {...props}
        />
      </div>
    </Flex>
  );
};

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: {
      position: "relative",
    },
    bottom: {
      color: theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    top: {
      color: Colors.primary,
      animationDuration: "550ms",
      position: "absolute",
      left: 0,
    },
    circle: {
      strokeLinecap: "round",
    },
  })
);

export default Loading;
