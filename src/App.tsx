import { useMediaQuery } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import AppLayout from "components/common/AppLayout";
import NotiStack, { NotiMessage } from "components/common/NotiStack";
import { observer } from "mobx-react";
import moment from "moment";
import React, { lazy, Suspense, useEffect } from "react";
import { Route, Router, Switch } from "react-router";
import LoadingFallback from "screens/LoadingFallback";
import { createAppTheme } from "styles/theme";
import history from "./appBrowserHistory";
import useTitleUpdate from "hooks/useTitleUpdate";

const HomePage = lazy(() => import("screens/Home/HomePage"));
const NotFoundPage = lazy(() => import("screens/NotFound"));
const ComingSoonPage = lazy(() => import("screens/ComingSoon"));

// eslint-disable-next-line no-var
var _ConfirmModalInstance: any = {};
var _AppModalInstance: any = {};

export const AppModalInstance = {
  replaceChildren: (childrenNode: any) => {
    _AppModalInstance && _AppModalInstance.replaceChildren(childrenNode);
  },
  updateChildrenProps: (childrenNode: any) => {
    _AppModalInstance && _AppModalInstance.replaceChildren(childrenNode);
  },
  open: () => {
    _AppModalInstance && _AppModalInstance.openModal();
  },
  close: () => {
    _AppModalInstance && _AppModalInstance.closeModal();
  },
  addCloseCallback: (callback) => {
    _AppModalInstance && _AppModalInstance.addCloseCallback(callback);
  },
};

var _NotiStackInstance: any = {};

export const NotiStackInstance = {
  push: (message: NotiMessage) => {
    _NotiStackInstance && _NotiStackInstance.push(message);
  },
};

const RootContainer = observer(() => {
  return (
    <Router history={history}>
      <AppLayout>
        <Suspense fallback={<LoadingFallback />}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>

            <Route exact path="/show-room">
              <HomePage />
            </Route>

            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
          <NotiStack
            ref={(ref: any) => {
              _NotiStackInstance = ref;
            }}
          />
        </Suspense>
      </AppLayout>
    </Router>
  );
});

const App = React.memo(() => {
  const theme = createAppTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  useTitleUpdate(
    "0xTool - Discover New Opportunities In A Safe Way",
    `Discover opportunities through charting tools with
      real-time charting tools. Helpful token metrics from 0xtool
        will keep you away from scams and hacks`
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RootContainer />
    </ThemeProvider>
  );
});

export default App;
