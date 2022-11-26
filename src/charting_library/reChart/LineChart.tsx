import { MiniEthereumIcon } from "assets/icons";
import Flex from "components/common/Flex";
import Text from "components/common/Text";
import moment from "moment";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Colors } from "styles/theme";
import { formatTokenNumber } from "utils/helper";

const renderTooltip = (props) => ({ active, payload, label }) => {
  if (!payload || !payload[0]) return null
  const { name, value } = payload[0]?.payload || {};
  return (
    <Flex column centerY border={'none'} justifyContent={'flex-end'} p={2} bgcolor={Colors.orange200}>
      <Text textAlign={'right'}><MiniEthereumIcon width={13} height={13} />&nbsp;{formatTokenNumber(value, 3)}</Text>
      <Text textAlign={'right'}>{moment(name, 'YYYY-MM-DD HH:mm:ss').format(
        props.shortTime ? 'HH:mm A' : 'YYYY MMM DD')}</Text>
    </Flex>
  );
};

const RechartArea = (props: any) => {
  const { dataSource } = props;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={730}
        height={250}
        data={dataSource}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.2} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis display={'none'} dataKey="name" />
        <YAxis display={'none'}/>
        <Tooltip content={renderTooltip(props)}
          cursor={{ fill: Colors.hoverMaskBg }}
        />
        <Line
          dot={false}
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RechartArea;
