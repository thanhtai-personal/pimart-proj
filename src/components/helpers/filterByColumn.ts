import { TIMES, SORT_DIRECT, ColumnKeys } from "./constants";

const makeMintTimeFilter = (time) => [
  {
    key: `${time}_${ColumnKeys.mints}_${SORT_DIRECT.asc}`,
    name: `${time} Mints`,
    sort: `Low -> High`,
    value: `${ColumnKeys.mints}_${SORT_DIRECT.asc}`,
    direct: SORT_DIRECT.asc,
    column: `${time}_${ColumnKeys.mints}`,
  },
  {
    key: `${time}_${ColumnKeys.mints}_${SORT_DIRECT.desc}`,
    name: `${time} Mints`,
    sort: `High -> Low`,
    value: `${ColumnKeys.mints}_${SORT_DIRECT.desc}`,
    direct: SORT_DIRECT.desc,
    column: `${time}_${ColumnKeys.mints}`,
  },
];

const makeFilterByColumn = (ColumnKeys) => ({
  [ColumnKeys.collection]: [],
  [ColumnKeys.floor]: [
    {
      key: `${ColumnKeys.floor}_${SORT_DIRECT.desc}`,
      name: `Floor`,
      sort: `High -> Low`,
      value: `${ColumnKeys.floor}_${SORT_DIRECT.desc}`,
      direct: SORT_DIRECT.desc,
      column: `${ColumnKeys.floor}`,
    },
    {
      key: `${ColumnKeys.floor}_${SORT_DIRECT.asc}`,
      name: `Floor`,
      sort: `Low -> High`,
      value: `${ColumnKeys.floor}_${SORT_DIRECT.asc}`,
      direct: SORT_DIRECT.asc,
      column: `${ColumnKeys.floor}`,
    },
    {
      key: `${ColumnKeys.floor}_CHANGE_${SORT_DIRECT.asc}`,
      name: `Floor (Change)`,
      sort: `Low -> High`,
      value: `${ColumnKeys.floor}_CHANGE_${SORT_DIRECT.asc}`,
      direct: SORT_DIRECT.asc,
      column: `${ColumnKeys.floor}`,
    },
  ],
  [`MINTING_${ColumnKeys.floor}`]: [
    {
      key: `${ColumnKeys.floor}_${SORT_DIRECT.desc}`,
      name: `Floor`,
      sort: `High -> Low`,
      value: `${ColumnKeys.floor}_${SORT_DIRECT.desc}`,
      direct: SORT_DIRECT.desc,
      column: `${ColumnKeys.floor}`,
    },
    {
      key: `${ColumnKeys.floor}_${SORT_DIRECT.asc}`,
      name: `Floor`,
      sort: `Low -> High`,
      value: `${ColumnKeys.floor}_${SORT_DIRECT.asc}`,
      direct: SORT_DIRECT.asc,
      column: `${ColumnKeys.floor}`,
    },
    {
      key: `${ColumnKeys.floor}_CHANGE_${SORT_DIRECT.asc}`,
      name: `Floor (Change)`,
      sort: `Low -> High`,
      value: `${ColumnKeys.floor}_CHANGE_${SORT_DIRECT.asc}`,
      direct: SORT_DIRECT.asc,
      column: `${ColumnKeys.floor}`,
    },
    {
      key: `${ColumnKeys.floor}_CHANGE_${SORT_DIRECT.desc}`,
      name: `Floor (Change)`,
      sort: `High -> Low`,
      value: `${ColumnKeys.floor}_CHANGE_${SORT_DIRECT.desc}`,
      direct: SORT_DIRECT.desc,
      column: `${ColumnKeys.floor}`,
    },
  ],
  [ColumnKeys.mktCap]: [
    {
      key: `${ColumnKeys.mktCap}_${SORT_DIRECT.desc}`,
      name: `Mkt. Cap`,
      sort: `High -> Low`,
      value: `${ColumnKeys.mktCap}_${SORT_DIRECT.desc}`,
      direct: SORT_DIRECT.desc,
      column: `${ColumnKeys.mktCap}`,
    },
    {
      key: `${ColumnKeys.mktCap}_${SORT_DIRECT.asc}`,
      name: `Mkt. Cap`,
      sort: `Low -> High`,
      value: `${ColumnKeys.mktCap}_${SORT_DIRECT.asc}`,
      direct: SORT_DIRECT.asc,
      column: `${ColumnKeys.mktCap}`,
    },
    {
      key: `${ColumnKeys.mktCap}_CHANGE_${SORT_DIRECT.desc}`,
      name: `Mkt. Cap (Change)`,
      sort: `High -> Low`,
      value: `${ColumnKeys.mktCap}_CHANGE_${SORT_DIRECT.desc}`,
      direct: SORT_DIRECT.desc,
      column: `${ColumnKeys.mktCap}`,
    },
    {
      key: `${ColumnKeys.mktCap}_CHANGE_${SORT_DIRECT.asc}`,
      name: `Mkt. Cap (Change)`,
      sort: `Low -> High`,
      value: `${ColumnKeys.mktCap}_CHANGE_${SORT_DIRECT.asc}`,
      direct: SORT_DIRECT.asc,
      column: `${ColumnKeys.mktCap}`,
    },
  ],
  [ColumnKeys.avg]: [
    {
      key: `${ColumnKeys.avg}_${SORT_DIRECT.desc}`,
      name: `Avg. Price`,
      sort: `High -> Low`,
      value: `${ColumnKeys.avg}_${SORT_DIRECT.desc}`,
      direct: SORT_DIRECT.desc,
      column: `${ColumnKeys.avg}`,
    },
    {
      key: `${ColumnKeys.avg}_${SORT_DIRECT.asc}`,
      name: `Avg. Price`,
      sort: `Low -> High`,
      value: `${ColumnKeys.avg}_${SORT_DIRECT.asc}`,
      direct: SORT_DIRECT.asc,
      column: `${ColumnKeys.avg}`,
    },
    {
      key: `${ColumnKeys.avg}_CHANGE_${SORT_DIRECT.desc}`,
      name: `Avg. Price (Change)`,
      sort: `High -> Low`,
      value: `${ColumnKeys.avg}_CHANGE_${SORT_DIRECT.desc}`,
      direct: SORT_DIRECT.desc,
      column: `${ColumnKeys.avg}`,
    },
    {
      key: `${ColumnKeys.avg}_CHANGE_${SORT_DIRECT.asc}`,
      name: `Avg. Price (Change)`,
      sort: `Low -> High`,
      value: `${ColumnKeys.avg}_CHANGE_${SORT_DIRECT.asc}`,
      direct: SORT_DIRECT.asc,
      column: `${ColumnKeys.avg}`,
    },
  ],
  [ColumnKeys.volume]: [
    {
      key: `${ColumnKeys.volume}_${SORT_DIRECT.asc}`,
      name: `Volume`,
      sort: `Low -> High`,
      value: `${ColumnKeys.volume}_${SORT_DIRECT.asc}`,
      direct: SORT_DIRECT.asc,
      column: `${ColumnKeys.volume}`,
    },
    {
      key: `${ColumnKeys.volume}_CHANGE_${SORT_DIRECT.asc}`,
      name: `Volume (Change)`,
      sort: `Low -> High`,
      value: `${ColumnKeys.volume}_CHANGE_${SORT_DIRECT.asc}`,
      direct: SORT_DIRECT.asc,
      column: `${ColumnKeys.volume}`,
    },
  ],
  [`MINTING_${ColumnKeys.volume}`]: [
    {
      key: `${ColumnKeys.volume}_${SORT_DIRECT.asc}`,
      name: `Volume`,
      sort: `Low -> High`,
      value: `${ColumnKeys.volume}_${SORT_DIRECT.asc}`,
      direct: SORT_DIRECT.asc,
      column: `${ColumnKeys.volume}`,
    },
    {
      key: `${ColumnKeys.volume}_${SORT_DIRECT.desc}`,
      name: `Volume`,
      sort: `High -> Low`,
      value: `${ColumnKeys.volume}_${SORT_DIRECT.desc}`,
      direct: SORT_DIRECT.desc,
      column: `${ColumnKeys.volume}`,
    },
    {
      key: `${ColumnKeys.volume}_CHANGE_${SORT_DIRECT.asc}`,
      name: `Volume (Change)`,
      sort: `Low -> High`,
      value: `${ColumnKeys.volume}_CHANGE_${SORT_DIRECT.asc}`,
      direct: SORT_DIRECT.asc,
      column: `${ColumnKeys.volume}`,
    },
    {
      key: `${ColumnKeys.volume}_CHANGE_${SORT_DIRECT.desc}`,
      name: `Volume (Change)`,
      sort: `High -> Low`,
      value: `${ColumnKeys.volume}_CHANGE_${SORT_DIRECT.desc}`,
      direct: SORT_DIRECT.desc,
      column: `${ColumnKeys.volume}`,
    },
  ],
  [ColumnKeys.sales]: [
    {
      key: `${ColumnKeys.sales}_${SORT_DIRECT.desc}`,
      name: `Sales`,
      sort: `High -> Low`,
      value: `${ColumnKeys.sales}_${SORT_DIRECT.desc}`,
      direct: SORT_DIRECT.desc,
      column: `${ColumnKeys.sales}`,
    },
    {
      key: `${ColumnKeys.sales}_${SORT_DIRECT.asc}`,
      name: `Sales`,
      sort: `Low -> High`,
      value: `${ColumnKeys.sales}_${SORT_DIRECT.asc}`,
      direct: SORT_DIRECT.asc,
      column: `${ColumnKeys.sales}`,
    },
    {
      key: `${ColumnKeys.sales}_CHANGE_${SORT_DIRECT.desc}`,
      name: `Sales (Change)`,
      sort: `High -> Low`,
      value: `${ColumnKeys.sales}_CHANGE_${SORT_DIRECT.desc}`,
      direct: SORT_DIRECT.desc,
      column: `${ColumnKeys.sales}`,
    },
    {
      key: `${ColumnKeys.sales}_CHANGE_${SORT_DIRECT.asc}`,
      name: `Sales (Change)`,
      sort: `Low -> High`,
      value: `${ColumnKeys.sales}_CHANGE_${SORT_DIRECT.asc}`,
      direct: SORT_DIRECT.asc,
      column: `${ColumnKeys.sales}`,
    },
  ],
  [ColumnKeys.listed]: [],
  [ColumnKeys.unique]: [
    {
      key: `${ColumnKeys.unique}_${SORT_DIRECT.desc}`,
      name: `Unique`,
      sort: `High -> Low`,
      value: `${ColumnKeys.unique}_${SORT_DIRECT.desc}`,
      direct: SORT_DIRECT.desc,
      column: `${ColumnKeys.unique}`,
    },
    {
      key: `${ColumnKeys.unique}_${SORT_DIRECT.asc}`,
      name: `Unique`,
      sort: `Low -> High`,
      value: `${ColumnKeys.unique}_${SORT_DIRECT.asc}`,
      direct: SORT_DIRECT.asc,
      column: `${ColumnKeys.unique}`,
    },
  ],
  [ColumnKeys.lastMint]: [
    {
      key: `${ColumnKeys.lastMint}_${SORT_DIRECT.desc}`,
      name: `Last mint`,
      sort: `New -> Old`,
      value: `${ColumnKeys.lastMint}_${SORT_DIRECT.desc}`,
      direct: SORT_DIRECT.desc,
      column: `${ColumnKeys.lastMint}`,
    },
    {
      key: `${ColumnKeys.lastMint}_${SORT_DIRECT.asc}`,
      name: `Last mint`,
      sort: `Old -> New`,
      value: `${ColumnKeys.lastMint}_${SORT_DIRECT.asc}`,
      direct: SORT_DIRECT.asc,
      column: `${ColumnKeys.lastMint}`,
    },
  ],
  [ColumnKeys.firstMint]: [
    {
      key: `${ColumnKeys.firstMint}_${SORT_DIRECT.desc}`,
      name: `First mint`,
      sort: `New -> Old`,
      value: `${ColumnKeys.firstMint}_${SORT_DIRECT.desc}`,
      direct: SORT_DIRECT.desc,
      column: `${ColumnKeys.firstMint}`,
    },
    {
      key: `${ColumnKeys.firstMint}_${SORT_DIRECT.asc}`,
      name: `First mint`,
      sort: `Old -> New`,
      value: `${ColumnKeys.firstMint}_${SORT_DIRECT.asc}`,
      direct: SORT_DIRECT.asc,
      column: `${ColumnKeys.firstMint}`,
    },
  ],
  [`${TIMES.month}_${ColumnKeys.mints}`]: makeMintTimeFilter(TIMES.month),
  [`${TIMES.week}_${ColumnKeys.mints}`]: makeMintTimeFilter(TIMES.week),
  [`${TIMES.day}_${ColumnKeys.mints}`]: makeMintTimeFilter(TIMES.day),
});

export default makeFilterByColumn;
