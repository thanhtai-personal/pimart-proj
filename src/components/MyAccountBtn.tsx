import { Button, ButtonBase, useMediaQuery, useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import { backendHttpClient } from "api/users";
import { NotiStackInstance } from "App";
import Flex from "components/common/Flex";
import Text from "components/common/Text";
import useDepsContainer from "hooks/useDepsContainer";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { AppTheme } from "styles/theme";
import { clipAddressText, getErrorMessageFromResponse } from "utils/helper";

interface MyAccountBtnProps {}

const MyAccountBtn = (props: MyAccountBtnProps) => {
  const styles = useStyles(props);
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const { userStore, uiStore, contractStore } = useDepsContainer();
  const { account } = userStore;

  useEffect(() => {
    if (uiStore.triggerOpenLogin > 1) {
      connectMetamask();
    }
  }, [uiStore.triggerOpenLogin]);

  // useEffect(() => {
  //   const init = async () => {
  //     try {
  //       await connectMetamask();
  //     } catch (err) {
  //       console.log(err);
  //     }
  //     userStore.isLoadingSessionFromLocal = false;
  //   };
  //   init();
  // }, []);

  const connectMetamask = async () => {
    if (userStore.computedIsLoggedIn) {
      uiStore.loginModal.isShow = true;
    } else {
      const { account, signature } =
        await contractStore.askMetamaskPermission();
      if (account) {
        try {
          backendHttpClient.setBearerToken(signature);

          userStore.account = {
            walletAddress: account,
            signature: signature,
          };
          uiStore.isConnectedMetamask = true;
          uiStore.loginModal.isShow = true;
        } catch (err: any) {
          console.log(err);
          NotiStackInstance.push({
            children: getErrorMessageFromResponse(err),
            variant: "error",
          });
        }
      } else {
        NotiStackInstance.push({
          children:
            "Please connect with your Metamask account or Dapp browser!",
          variant: "error",
        });
      }
    }
  };

  return (
    <Flex position="relative" height={"100%"}>
      <Button
        variant="primary"
        onClick={() => {
          connectMetamask();
        }}
      >
        <Text
          variant="bold"
          style={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
        >
          {account && account.walletAddress
            ? clipAddressText(account!.walletAddress, 4, 4)
            : "Connect Wallet"}
        </Text>
      </Button>
    </Flex>
  );
};

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    headerText: {
      fontSize: 16,
      color: "white",
    },
  })
);

export default observer(MyAccountBtn);
