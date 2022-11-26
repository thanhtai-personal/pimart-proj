import { useTheme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import Flex from "components/common/Flex";
import { observer, useLocalObservable } from "mobx-react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppTheme } from "styles/theme";
import GalaxyBackground from "./GalaxyBackground";
import DailyAccounting from "./components/DailyAccounting"

interface HomePageProps {}

const HomePage = (props: HomePageProps) => {
  const state = useLocalObservable(() => ({
    firstLoadingTime: true,
  }))
  const styles = useStyles(props);
  const history = useHistory();
  const theme = useTheme();

  const slides = [
    <img src="https://picsum.photos/800/300/?random" alt="1" />,
    <img src="https://picsum.photos/800/301/?random" alt="2" />,
    <img src="https://picsum.photos/800/302/?random" alt="3" />,
    <img src="https://picsum.photos/800/303/?random" alt="4" />,
    <img src="https://picsum.photos/800/304/?random" alt="5" />,
  ];

  useEffect(() => {
    setTimeout(() => {
      state.firstLoadingTime = false;
    }, 3000)
  }, []);


  return (
    <Flex bgcolor={"black"} width="100%" height={"auto"} minHeight={"100vh"}>
      <GalaxyBackground id="canvas-2" />
      <Flex center className={styles.contentContainer}>
        <Flex className={styles.contentWrapper}>
          <Flex width={"100%"} py={2}></Flex>
        </Flex>
      </Flex>
      <Flex center className={styles.showingWrapper}>
        <Flex className={styles.container}>
          <DailyAccounting />
        </Flex>
      </Flex>
      <Flex center className={styles.toolContainer}>
        <Flex className={styles.toolWrapper}></Flex>
      </Flex>
    </Flex>
  );
};

const useStyles = makeStyles((theme: AppTheme) => createStyles({
  contentContainer: {
    position: "fixed",
    width: "100vw",
    zIndex: 4,
    height: "95vh",
    left: 0,
    top: "5vh",
    background: "rgba(255, 255, 255, 0.156)",
  },
  contentWrapper: {
    height: "100%",
    width: "90%",
    maxWidth: "1750px",
  },
  toolContainer: {
    position: "fixed",
    width: "100vw",
    zIndex: 4,
    height: "38vh",
    left: 0,
    top: "78vh",
    background: "rgba(0, 0, 0, 0.9)",
    borderTopLeftRadius: "50%",
    borderTopRightRadius: "50%",
  },
  toolWrapper: {
    height: "100%",
    width: "90%",
    maxWidth: "1750px",
  },
  showingWrapper: {
    width: "100%",
    zIndex: 7,
    position: "fixed",
    top: "10vh",
    height: "85vh"
  },
  container: {
    width: "90%",
    height: "100%",
    background: "rgba(101, 243, 79, 0.7)",
    maxWidth: "1750px",
    borderTopLeftRadius: "1.5rem",
    borderTopRightRadius: "1.5rem",
    borderBottomLeftRadius: ".5rem",
    borderBottomRightRadius: ".5rem",
    overflowY: "scroll"
  }
}));

export default observer(HomePage);
