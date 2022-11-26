import { useTheme } from "@emotion/react";
import { useMediaQuery } from "@material-ui/core";
import { MiniEthereumIcon } from "assets/icons";
import { observer, useLocalObservable } from "mobx-react";
import { useEffect } from "react";
import {
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

const CellColors = [
  "rgb(13, 208, 247)",
  "rgb(53, 208, 247)",
  "rgb(93, 208, 247)",
  "rgb(113, 208, 247)",
  "rgb(153, 208, 247)",
  "rgb(193, 208, 247)",
  "rgb(233, 208, 247)",
  "rgb(255, 208, 247)",
  "rgb(255, 168, 247)",
  "rgb(255, 128, 247)",
  "rgb(255, 88, 247)",
];

const RADIAN = Math.PI / 180;

const data = [
  { name: "BNB", value: 400 },
  { name: "BTC", value: 300 },
  { name: "CAKE", value: 300 },
  { name: "LIDO", value: 200 },
  { name: "WATER", value: 10 },
  { name: "LAND", value: 10 },
  { name: "ETH", value: 400 },
  { name: "SHIBA", value: 300 },
  { name: "DOGE", value: 300 },
  { name: "HEX", value: 200 },
  { name: "OTHER", value: 10 },
];

const renderActiveShape = (id, mdDown, mdDownMini) => (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <radialGradient id={`radial-color-${id}`} cx="50%" cy="50%" r="50%">
        <stop stop-color="rgba(0,0,0, 0.056)" offset="0%" />
        <stop stop-color="rgba(255, 255, 255, 0.12)" offset="90%" />
        <stop stop-color={fill} offset="100%" />
      </radialGradient>
      <circle
        cx={cx}
        cy={cy}
        r={mdDownMini ? 58 : 78}
        fill={`url(#radial-color-${id})`}
      />
      <text
        fontSize={mdDownMini ? "12px" : "16px"}
        x={cx}
        y={cy}
        dy={mdDownMini ? -18 : mdDown ? -24 : 8}
        textAnchor="middle"
        fill={fill}
      >
        {payload.name}
      </text>
      {mdDown && (
        <text x={cx} y={cy} dy={0} textAnchor="middle" fill={fill}>
          ${value?.toFixed(3)}
        </text>
      )}
      {mdDown && (
        <text
          x={cx}
          y={cy}
          dy={mdDownMini ? 18 : 24}
          textAnchor="middle"
          fill={fill}
        >
          {(percent * 100).toFixed(2)}%
        </text>
      )}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      {!mdDown && (
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
      )}
      {!mdDown && <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />}
      {!mdDown && (
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill={fill}
        >
          {`$${value?.toFixed(3)} (${(percent * 100).toFixed(2)}%)`}
        </text>
      )}
    </g>
  );
};

const renderLegend =
  (activeIndex, setActive, id, mdDown, mdDownMini) => (props) => {
    const { payload } = props;

    return (
      <ul
        style={{
          margin: mdDown ? 0 : "0 1rem",
          marginTop: mdDownMini ? "1rem" : "0",
          padding: mdDown ? 0 : "1rem 0",
          // height: "100%",
          // background: `linear-gradient(90deg, ${
          //   CellColors[activeIndex % CellColors.length]
          // },
          // rgba(255,255,255, 0.056) 5%,
          // rgba(255,255,255, 0.056) 95%,
          // ${
          //   CellColors[activeIndex % CellColors.length]
          // })`,
          overflow: "hidden",
          display: mdDown ? "flex" : "initial",
          justifyContent: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {payload.map((entry, index) => (
          <li
            key={`item-${index}`}
            onMouseOver={() => {
              setActive && setActive(index);
            }}
            id={`legend-item-${id}`}
            style={{
              color: entry.color,
              listStyleType: "none",
              background:
                activeIndex === index
                  ? `linear-gradient(rgba(255,255,255, 0.12), rgba(255,255,255, 0.12), rgba(255,255,255, 0.12))`
                  : "none",
              padding: mdDownMini ? "0.3rem" : "0.2rem",
              paddingLeft: mdDownMini ? "0.3rem" : "2.5rem",
              borderRadius: mdDownMini ? "0.2rem" : ".5rem",
              width: mdDownMini ? "fit-content" : "100%",
            }}
          >
            <MiniEthereumIcon width={15} height={15} /> {entry.value}
          </li>
        ))}
      </ul>
    );
  };

const RechartCircle = (props: any) => {
  const state = useLocalObservable(() => ({
    activeIndex: 0 as number,
  }));
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("lg"));
  const mdDownMini = useMediaQuery(theme.breakpoints.down(450));

  useEffect(() => {
    //hotfix lib error
    setTimeout(() => {
      [
        ...(document.querySelectorAll(".recharts-legend-wrapper") || []),
      ].forEach((elem) => {
        if (mdDownMini) {
          elem.style.left = 0;
        } else {
          elem.style.top = 0;
        }
      });
    }, 1000);
  }, [mdDown, mdDownMini]);

  const onPieEnter = (_, index) => {
    state.activeIndex = index;
  };

  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={370}>
      <PieChart width={400} height={370}>
        <Pie
          activeIndex={state.activeIndex}
          activeShape={renderActiveShape(props.id, mdDown, mdDownMini)}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={mdDownMini ? 60 : 80}
          outerRadius={mdDownMini ? 80 : 120}
          fill="#"
          dataKey="value"
          onMouseEnter={onPieEnter}
          legendType="diamond"
        >
          {data?.map((item, index) => {
            return (
              <Cell
                key={`cell-${item.id || index}`}
                fill={CellColors[index % CellColors.length]}
              />
            );
          })}
        </Pie>
        <Legend
          align={mdDownMini ? "center" : "right"}
          verticalAlign={mdDownMini ? "bottom" : "middle"}
          layout="vertical"
          width={mdDownMini ? "100%" : mdDown ? "30%" : "25%"}
          content={renderLegend(
            state.activeIndex,
            (idx) => (state.activeIndex = idx),
            props.id,
            mdDown,
            mdDownMini
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default observer(RechartCircle);
