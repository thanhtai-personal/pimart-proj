import { NotiStackInstance } from "App";
import useDepsContainer from "hooks/useDepsContainer";
import { observer } from "mobx-react-lite";
import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import Flex from "./Flex";
import Loading from "./Loading";

const AuthRoute: React.FunctionComponent<RouteProps> = (props) => {
  const { userStore, uiStore } = useDepsContainer();

  React.useEffect(() => {
    if (!userStore.isLoadingSessionFromLocal && !userStore.computedIsLoggedIn) {
      NotiStackInstance.push({
        children: "Please connect Metamask wallet first",
        variant: "error",
      });
    }
  }, [userStore.computedIsLoggedIn, userStore.isLoadingSessionFromLocal]);

  if (userStore.isLoadingSessionFromLocal) {
    return (
      <Flex width="100%" height="90vh" center bgcolor="pageBg">
        <Loading />
      </Flex>
    );
  }

  return userStore.computedIsLoggedIn ? (
    <Route {...props} />
  ) : (
    <Redirect to="/" />
  );
};

export default observer(AuthRoute);
