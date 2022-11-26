import { MiniEthereumIcon } from "assets/icons";
import Flex from "components/common/Flex";
import Text from "components/common/Text";
import { Colors } from "styles/theme";
import { formatTokenNumber } from "utils/helper";
import { stylingNumber } from "utils/render";

const NumberCell = (data, right = true) => {
  const { icon = <MiniEthereumIcon width={13} height={13} /> } = data || {};
  return (
    <Flex
      column
      centerY
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
    >
      <Flex centerY column justifyContent={'flex-start'}>
          <Text
            fontSize={15}
            color={data.value ? Colors.white : Colors.gray400}
            style={{
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: right ? "flex-end" : "flex-start",
              width: "100%",
            }}
          >
            {data?.value ? icon : ""}
            {data?.value ? " " : ""}
            {(data?.value || data?.value == 0)
              ? stylingNumber(
                  formatTokenNumber(data.value, 3)
                )
              : "N/A"}
          </Text>
          {(data.percent || data.percent == 0) && (
              <Text
              fontSize={13}
              color={
                data.percent < 0
                  ? Colors.dangerColor
                  : data.percent == 0
                  ? Colors.gray400
                  : Colors.green
              }
              style={{
                whiteSpace: "nowrap",
                width: "100%",
                textAlign: right ? "right" : "left",
                display: 'flex',
                flexDirection: 'row',
                justifyContent: right ? "flex-end" : "flex-start",
              }}
            >
              {data.percent > 0  && data.percent < 1000000000000 ? "+" : ""} {/* 1000B */}
              {stylingNumber(formatTokenNumber(
                  data.percent,
                  2
                ))}&nbsp;%
            </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default NumberCell;
