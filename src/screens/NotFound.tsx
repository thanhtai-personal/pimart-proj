import { ButtonBase } from "@material-ui/core";
import Flex from "components/common/Flex";
import Text from "components/common/Text";
import React from "react";
import { useHistory } from "react-router";

interface NotFoundPageProps {}

const NotFoundPage = (props: NotFoundPageProps) => {
  const history = useHistory();
  return (
    <Flex column center width="100%" height="auto" bgcolor="pageBg">
      <Text
        color="gray"
        style={{
          fontSize: 40,
          fontWeight: "bold",
        }}
      >
        404
      </Text>
      <ButtonBase
        onClick={() => {
          history.goBack();
        }}
      >
        <Flex center>
          <Text color="gray" fontSize={16} ml={1}>
            PAGE NOT FOUND
          </Text>
        </Flex>
      </ButtonBase>
    </Flex>
  );
};

export default NotFoundPage;
