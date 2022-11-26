import React, { useCallback } from "react";
import { AppTheme, Colors } from "styles/theme";
import { createStyles, makeStyles } from "@material-ui/styles";
import Flex from "components/common/Flex";
import Text from "components/common/Text";
import { observer, useLocalStore } from "mobx-react";
import { SearchIcon } from "assets/icons";
import { TextField } from "@material-ui/core";
import { debounce } from "lodash";
import * as tokenApi from "api/tokens";
import TokenIcon from "./TokenIcon";
import Loading from "./common/Loading";
import OutsideAlerter from "./common/OutsideAlerter";

interface SearchBoxProps {
  onSelectToken?: any;
}

const SearchBox = (props: SearchBoxProps) => {
  const styles = useStyles(props);
  const state = useLocalStore(() => ({
    text: "",
    isShowSuggestion: false,
    suggestions: [],
    isSearching: false,
  }));

  const onSelectSuggestion = (item) => {
    state.isShowSuggestion = false;
    props.onSelectToken && props.onSelectToken(item.address);
  };

  const callApiSearchToken = useCallback(
    debounce(async (text) => {
      if (text.length >= 2) {
        state.isSearching = true;
        try {
          const res = await tokenApi.tokenSearch(text.toLowerCase());
          state.suggestions = res.data;
        } catch (err) {}
        state.isSearching = false;
      }
    }, 1000),
    []
  );

  const onChangeText = (e) => {
    state.text = e.target.value;
    state.isShowSuggestion = true;
    callApiSearchToken(state.text);
  };

  return (
    <OutsideAlerter
      key={"searchbox"}
      showing={true}
      onClick={() => {
        state.isShowSuggestion = false;
      }}
    >
      <Flex centerY width={"100%"} position="relative">
        <SearchIcon style={{ marginRight: "5px" }} />

        <TextField
          fullWidth
          variant="standard"
          color="primary"
          placeholder="Search pair by symbol, name, contract or token"
          value={state.text}
          onChange={onChangeText}
          InputProps={{ disableUnderline: true }}
        />

        {/*  */}
        {state.isShowSuggestion ? (
          <Flex
            position={"absolute"}
            top={45}
            zIndex={9}
            column
            bgcolor={"#23242E"}
            width="100%"
            borderRadius={2}
            style={{ opacity: 0.9 }}
            maxHeight={300}
            overflow="auto"
          >
            {state.suggestions.map((item: any) => {
              return (
                <Flex
                  onClick={() => {
                    onSelectSuggestion(item);
                  }}
                  column
                  width={"100%"}
                  key={item._id}
                  className={styles.row}
                  p={1}
                >
                  <Flex centerY>
                    <TokenIcon image={item.image} />
                    <Text mx={"3px"} variant="bold">
                      {`${item.name} (${item.symbol})`}
                    </Text>
                    {item.isVerified ? (
                      <img
                        src="/images/tick.png"
                        style={{ width: 15, height: 15 }}
                      />
                    ) : null}
                  </Flex>
                  <Text color="textGray">{item.address}</Text>
                </Flex>
              );
            })}
            {!state.isSearching && state.suggestions.length === 0 ? (
              <Flex height={80} center>
                <Text color={"textGray"}>Not found</Text>
              </Flex>
            ) : null}
          </Flex>
        ) : null}
      </Flex>
    </OutsideAlerter>
  );
};

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    row: {
      borderBottom: `1px solid ${Colors.border}`,
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#013065",
      },
    },
  })
);

export default observer(SearchBox);
