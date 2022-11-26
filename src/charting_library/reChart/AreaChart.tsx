import { MiniEthereumIcon } from "assets/icons";
import Flex from "components/common/Flex";
import Text from "components/common/Text";
import moment from "moment";
import { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
} from "recharts";
import { formatTokenNumber } from "utils/helper";

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
        <Text textAlign={"right"}>
          {props.unit || <MiniEthereumIcon width={13} height={13} />}
          &nbsp;{formatTokenNumber(value, 3)}
        </Text>
        <Text textAlign={"right"}>
          {moment(name, "YYYY-MM-DD HH:mm:ss").format(
            props.shortTime ? "HH:mm A" : "YYYY MMM DD"
          )}
        </Text>
      </Flex>
    );
  };

const RechartArea = (props: any) => {
  const { dataSource } = props;

  let colors = {
    UP: ["#0EBBDA", "#22E4AA"],
    DOWN: ["#EE584E", "#2D1B1A"],
  };

  const colorType = useMemo(() => {
    if (props.colorType) return props.colorType
    let _colorType = "UP";
    if (dataSource.length > 1) {
      if (dataSource[dataSource.length - 1].value < dataSource[0].value) {
        _colorType = "DOWN";
      }
    }
    return _colorType
  }, [props.colorType])

  const color1 = colors[colorType][0];
  const color2 = colors[colorType][1];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={730}
        height={250}
        data={dataSource}
        margin={props.margin || { top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id={`colorUvAreaChart_${colorType}`} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="20%"
              stopColor={props.color || color1}
              stopOpacity={0.2}
            />
            <stop
              offset="95%"
              stopColor={props.color || color2}
              stopOpacity={0}
            />
          </linearGradient>
        </defs>
        <XAxis display={props.showX ? "" : "none"} dataKey="name" />
        <YAxis display={props.showY ? "" : "none"} />
        {/* <Tooltip
          content={renderTooltip(props)}
          cursor={{ fill: "rgba(255,255,255,0.1)" }}
        /> */}
        {props.showGrid && <CartesianGrid strokeDasharray="4 1 2" vertical={false} />}
        <Area
          dataKey="value"
          stroke={props.color || color1}
          fillOpacity={1}
          fill={`url(#colorUvAreaChart_${colorType})`}
          isAnimationActive={props.animation}
        />
        {props.showLine && <Line
          dot={false}
          type="monotone"
          dataKey="value2"
          stroke="red"
          fillOpacity={1}
          fill="url(#colorUv)"

        />}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default RechartArea;
