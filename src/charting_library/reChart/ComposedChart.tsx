import { MiniEthereumIcon } from "assets/icons";
import Flex from "components/common/Flex";
import Text from "components/common/Text";

import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  Tooltip,
  YAxis,
  CartesianGrid,
  Scatter,
  ResponsiveContainer,
  Legend,
  Label,
} from "recharts";
import { formatTokenNumber } from "utils/helper";

const colors = [
  "#f5f5f5",
  "rgba(255,255,255,0.1)",
  "#8884d8",
  "rgba(72,32,45, 1)",
  "rgba(41,98,255, 1)",
  "rgba(255,255,255,0.7)",
]
const colorScatter = "red"

const renderTooltip =
  (props) =>
  ({ active, payload, label }) => {
    if (!payload || !payload[0]) return null;
    const pl = payload[0]?.payload || {};

    return (
      <Flex
        column
        centerY
        border={"none"}
        justifyContent={"flex-end"}
        p={2}
        bgcolor={colors[5]}
      >
        <Flex centerY width={"100%"} px={1} color={colors[3]}>
          <Text textAlign={"right"} color={colors[3]}>
            {props.doubleValueChart.leftLabel}:&nbsp;
          </Text>
          <Text textAlign={"right"} color={colors[3]}>
            <MiniEthereumIcon width={13} height={13} />
            {formatTokenNumber(pl[props.doubleValueChart.leftKey], 3)}
          </Text>
        </Flex>
        <Flex centerY width={"100%"} px={1} color={colors[4]}>
          <Text textAlign={"right"} color={colors[4]}>
            {props.doubleValueChart.rightLabel}:&nbsp;
          </Text>
          <Text textAlign={"right"} color={colors[4]}>
            <MiniEthereumIcon width={13} height={13} />
            {formatTokenNumber(pl[props.doubleValueChart.rightKey], 3)}
          </Text>
        </Flex>
        <Text textAlign={"right"}>
          {pl.name}
        </Text>
      </Flex>
    );
  };

export default (props) => {
  const {
    dataSource,
    useBar,
    useLine,
    useScatter,
    useArea,
    useDoubleLine,
    doubleValueChart,
  } = props;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={dataSource}
        margin={{
          top: 40,
          right: 10,
          bottom: 10,
          left: 10,
        }}
      >
        <CartesianGrid stroke={colors[0]} vertical={false} />
        <Legend
          payload={[
            {
              value: doubleValueChart.leftLabel,
              id: doubleValueChart.leftKey,
              type: doubleValueChart.leftType || "line",
              color: colors[3]
            },
            {
              value: doubleValueChart.rightLabel,
              id: doubleValueChart.rightKey,
              type: doubleValueChart.rightType || "line",
              color: colors[4]
            },
          ]}
        />
        <Tooltip content={renderTooltip(props)} cursor={{ fill: colors[1] }} />
        <XAxis type={"category"} dataKey="name" scale="band" />
        {doubleValueChart ? (
          <>
            <YAxis
              yAxisId={doubleValueChart.leftKey}
              orientation={"left"}
              type={"number"}
            >
              <Label
                value={doubleValueChart.leftLabel}
                position={"top"}
                offset={25}
                stroke={colors[3]}
                fill={colors[3]}
                strokeWidth={0}
              />
            </YAxis>
            <YAxis
              yAxisId={doubleValueChart.rightKey}
              orientation={"right"}
              type={"number"}
            >
              <Label
                value={doubleValueChart.rightLabel}
                position={"top"}
                offset={25}
                stroke={colors[4]}
                fill={colors[4]}
                strokeWidth={0}
              />
            </YAxis>
          </>
        ) : (
          <YAxis type={"number"} />
        )}
        {useArea && (
          <Area
            yAxisId={doubleValueChart ? "valueArea" : 0}
            type="monotone"
            dataKey="valueArea"
            fill={colors[2]}
            stroke={colors[2]}
            dot={false}
          />
        )}
        {useBar && (
          <Bar
            yAxisId={doubleValueChart ? "valueBar" : 0}
            dataKey="valueBar"
            barSize={20}
            fill={colors[3]}
          />
        )}
        {useLine && (
          <Line
            yAxisId={doubleValueChart ? "valueLine" : 0}
            type="monotone"
            dataKey="valueLine"
            stroke={colors[4]}
            dot={false}
          />
        )}
        {useDoubleLine && (
          <Line
            yAxisId={doubleValueChart ? "valueLine1" : 0}
            type="monotone"
            dataKey="valueLine1"
            stroke={colors[3]}
            dot={false}
          />
        )}
        {useDoubleLine && (
          <Line
            yAxisId={doubleValueChart ? "valueLine2" : 0}
            type="monotone"
            dataKey="valueLine2"
            stroke={colors[4]}
            dot={false}
          />
        )}
        {useScatter && (
          <Scatter
            yAxisId={doubleValueChart ? "valueScatter" : 0}
            dataKey="valueScatter"
            fill={colorScatter}
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
};
