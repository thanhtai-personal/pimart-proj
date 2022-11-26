import { createStyles, makeStyles } from "@material-ui/styles";
import Flex from "components/common/Flex";
import Text from "components/common/Text";
import React from "react";
import { AppTheme } from "styles/theme";

interface ComingSoonPageProps {
  height?: string | number,
}

const ComingSoonPage = (props: ComingSoonPageProps) => {
  const styles = useStyles(props);

  return (
    <Flex center className={styles.root} width="100%" height={props.height} column>
      <Text style={{ fontWeight: "bold", fontSize: 25 }} color="white">
        COMING SOON
      </Text>
    </Flex>
  );
};

const useStyles = makeStyles((theme: AppTheme) =>
  createStyles({
    root: {
      backgroundImage: "url('/images/homebg.png')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
  })
);

export default ComingSoonPage;
