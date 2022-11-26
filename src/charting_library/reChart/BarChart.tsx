import { MiniEthereumIcon } from "assets/icons";
import Flex from "components/common/Flex";
import Text from "components/common/Text";
import moment from "moment";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatTokenNumber } from "utils/helper";

const CustomCursor = (props) => {
  const { x, y, width, height, stroke, maxBarSize, maxValue, payload } = props;
  const currentHeight =
    payload && payload[0]
      ? ((payload[0]?.payload?.value || 0) / maxValue) * height
      : 0;
  return (
    <rect
      fill="rgba(81	,126	,244	,0.5)"
      stroke="rgba(81	,126	,244	,0.5)"
      x={x}
      y={y + (height - currentHeight)}
      width={width}
      height={currentHeight}
    ></rect>
  );
};

const renderTooltip =
  (props) =>
  ({ active, payload, label }) => {
    if (!payload || !payload[0]) return null;
    const { name, value } = payload[0]?.payload || {};
    return (
      <Flex
        column
        centerY
        border={"none"}
        justifyContent={"flex-end"}
        p={2}
        bgcolor={"rgba(48,49,63,0.7)"}
      >
        <Text variant="bold" textAlign={"right"}>
          {!props.noUnit && <MiniEthereumIcon width={13} height={13} />}&nbsp;
          {formatTokenNumber(value, 3)}
        </Text>
        <Text textAlign={"right"}>
          {moment(name, "YYYY-MM-DD HH:mm:ss").format(
            props.shortTime ? "HH:mm A" : "YYYY MMM DD"
          )}
        </Text>
      </Flex>
    );
  };

const RechartBar = (props: any) => {
  const { dataSource } = props;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={dataSource}
        margin={{
          right: 40,
        }}
      >
        <defs>
          <linearGradient
            id="colorUvBarChart"
            x1="0.5"
            x2="-0.031"
            y2="1.477"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stopColor="#22E4AA" />
            <stop offset="1" stopColor="#0EBBDA" />
          </linearGradient>
        </defs>
        <Bar maxBarSize={25} dataKey="value" fill="url(#colorUvBarChart)" />
        <XAxis display={"none"} dataKey="name" />
        <YAxis display={"none"} />
        <Tooltip
          content={renderTooltip(props)}
          cursor={
            <CustomCursor
              maxBarSize={25}
              maxValue={(dataSource || []).reduce((prev, item) => {
                if (item.value > prev) return item.value;
                return prev;
              }, 0)}
            />
          }
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RechartBar;
