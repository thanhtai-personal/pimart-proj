import React from "react";
import { AppTheme } from "styles/theme";
import { createStyles, makeStyles } from "@material-ui/styles";
import Flex from "components/common/Flex";
import Text from "components/common/Text";
import { MenuItem, Select } from "@material-ui/core";
import { BNBIcon, EthIcon, PolygonIcon } from "assets/icons";

interface SelectChainBoxProps {}

const SelectChainBox = (props: SelectChainBoxProps) => {
  const styles = useStyles(props);

  return (
    <Select
      variant="standard"
      value={process.env.REACT_APP_CHAIN}
      onChange={(e) => {
      }}
    >
      <MenuItem value={"BSC"}>
        <Flex pt={"3px"} centerY mr={2}>
          <BNBIcon style={{ width: 20, height: 20 }} />
          <Text ml="3px">BSC</Text>
        </Flex>
      </MenuItem>
      <MenuItem value={"ETH"}>
        <Flex pt={"3px"} centerY mr={2}>
          <EthIcon style={{ width: 20, height: 20 }} />
          <Text ml="3px">Ethereum</Text>
        </Flex>
      </MenuItem>
      <MenuItem value={"POLYGON"}>
        <Flex pt={"3px"} centerY mr={2}>
          <PolygonIcon style={{ width: 20, height: 20 }} />
          <Text ml="3px">Polygon</Text>
        </Flex>
      </MenuItem>
    </Select>
  );
};

const useStyles = makeStyles((theme: AppTheme) => createStyles({}));

export default SelectChainBox;
