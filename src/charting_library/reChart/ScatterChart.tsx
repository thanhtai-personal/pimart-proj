import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  Tooltip,
  YAxis,
} from "recharts";
import Flex from "components/common/Flex";
import Text from "components/common/Text";
import { MiniEthereumIcon } from "assets/icons";
import { simpleFormatTokenNumber } from "utils/helper";
import moment from "moment";
import { useTheme } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";
import { observer } from "mobx-react";

const RenderTooltip = ({ active, payload, label }) => {
  if (!payload || !payload[0] || !payload[1]) return null;
  const { price, eventDate, eventType } = payload[0].payload || {};

  const color = eventType === 3 ? "#EF426F" : "#14B89C";

  return (
    <Flex
      column
      centerY
      justifyContent={"flex-end"}
      p={2}
      bgcolor={"rgba(0,0,0,0.5)"}
      border={`2px solid ${color}`}
      borderRadius={'15px'}
    >
      <Text color={color} textAlign={"right"}>
        {moment(eventDate).format("DD/MM/YYYY")}
      </Text>
      <Text textAlign={"right"}>
        <MiniEthereumIcon width={13} height={13} />
        &nbsp;{simpleFormatTokenNumber(price, 2)}
      </Text>
    </Flex>
  );
};

const RechartScatter = (props) => {
  const { dataSource = [], dataKeys=[] } = props;
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <ResponsiveContainer width={mdDown ? 450 : 730} height={250}>
      <ScatterChart
        width={mdDown ? 450 : 730}
        height={250}
        margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
      >
        <CartesianGrid strokeDasharray="6" vertical={false} />
        <XAxis
          tickFormatter={(unixTime) =>
            moment
              .unix(unixTime / 1000)
              .utc()
              .format("MMM DD - HH:mm")
          }
          type="number"
          domain={["auto", "auto"]}
          dataKey="eventDate"
          name="date"
        />
        <YAxis
          dataKey="price"
          name="price"
          tickFormatter={(v) => (v != 0 ? v : "")}
        />
        <Legend />
        {dataKeys.map((item) => (
          <Scatter
            name={item.name}
            data={item.mappingData(dataSource).map((item) => ({
              ...item,
              eventDate: new Date(item.eventDate).getTime(),
            }))}
            fill={item.color}
            shape={item.shape || "circle"}
          />
        ))}
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={<RenderTooltip />}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default observer(RechartScatter);
