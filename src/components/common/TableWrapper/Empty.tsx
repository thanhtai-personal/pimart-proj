import React from "react";
import { ReactComponent as EmptyIcon } from "assets/icons/empty-state-icon.svg";
import { Box, Typography } from "@material-ui/core";

export interface EmptyProps {
  title?: string;
  text?: string;
}

const Empty: React.FC<EmptyProps> = ({ title = "No data was found!", text, ...restProps }) => {
  return (
    <Box minHeight={450} display={'flex'} width={'100%'} height={'100%'} flexDirection="column" justifyContent={'center'} alignItems="center" {...restProps}>
      <EmptyIcon width={180} height={180} />
      <Typography color={'rgba(255,255,255, 0.5)'} variant="h1" fontSize={18}>{title}</Typography>
      {text && <Typography>{text}</Typography>}
    </Box>
  );
};

export default Empty;
