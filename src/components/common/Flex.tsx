import React from "react";
import Box, { BoxProps } from "@material-ui/core/Box";
import { PropType, AppTheme } from "styles/theme";
import useTheme from "@material-ui/styles/useTheme";

const defaultColors = [
  "primary.main",
  "primary.light",
  "primary.dark",
  "secondary.main",
  "secondary.main",
  "secondary.light",
  "error.light",
  "error.dark",
  "error.dark",
  "success.light",
  "success.dark",
  "success.dark",
  "info.light",
  "info.dark",
  "info.dark",
  "background.light",
  "background.dark",
  "background.dark",
] as const;
type HexColor = string & { hexish?: any };

type FlexProps = Omit<BoxProps, "bgcolor"> & {
  cursorPointer?: boolean;
  column?: boolean;
  center?: boolean;
  centerX?: boolean;
  centerY?: boolean;
  bgcolor?:
    | typeof defaultColors[number]
    | keyof PropType<AppTheme, "colors">
    | HexColor;
};

const Flex = (props: FlexProps) => {
  const theme: AppTheme = useTheme();
  const {
    bgcolor,
    style: styleProps = {},
    column,
    center,
    centerX,
    centerY,
    children,
    ...rest
  } = props;
  let alignmentProps: any = {};
  if (center) {
    alignmentProps["justifyContent"] = "center";
    alignmentProps["alignItems"] = "center";
  }
  if (centerX) {
    alignmentProps["justifyContent"] = "center";
  }
  if (centerY) {
    alignmentProps["alignItems"] = "center";
  }
  if (column) {
    alignmentProps["flexDirection"] = "column";
  }

  //@ts-ignore
  const isDefaultColors = defaultColors.includes(bgcolor);
  const colorProps = isDefaultColors
    ? {
        bgcolor: bgcolor,
      }
    : undefined;
  const style = {
    ...styleProps,
    //@ts-ignore
    backgroundColor: !isDefaultColors
      ? //@ts-ignore
        theme.colors[bgcolor] || bgcolor
      : undefined,
  };
  if (props.cursorPointer) {
    style.cursor = "pointer";
  }

  return (
    <Box
      display="flex"
      style={style}
      {...alignmentProps}
      {...colorProps}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Flex;
