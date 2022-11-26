import makeFilterByColumn from "./filterByColumn"
import makeFullColumns from "./FullColumns"

export const ColumnKeys = {
  no: "no",
  collection: "COLLECTION",
  trait: "TRAITS",
  floor: "FLOOR",
  mktCap: "MKTCAP",
  avg: "AVGPRICE",
  avgPrice: "AVG_PRICE",
  volume: "VOLUME",
  sales: "SALES",
  listed: "PERCENT_LISTED",
  unique: "UNIQUE",
  trend: "TREND",
  mints: "MINTS",
  firstMint: 'FIRST_MINT_AT',
  lastMint: 'LAST_MINT_AT',
  volumeByTime: (time, prefix = '') => prefix ? `${time}_VOLUME_${prefix}` : `${time}_VOLUME`,
  traitByTime: (time, prefix = '') => prefix ? `${time}_TRAITS_${prefix}` : `${time}_TRAITS`,
  mintsByTime: (time) => `${time}_MINTS`,
  trendByTime: (time) => `${time}_TREND`,
}

export const SORT_DIRECT = {
  asc: "UP",
  desc: "DOWN"
}

export const filterKeys = {
  topVolume: "TOPVOLUME",
  findInList: "FINDINLIST",
  timeTabs: "TIMETABS",
}

export const TIMES = {
  month: "30D",
  week: "7D",
  day: "1D",
}

export const fullTimeTabs = {
  [TIMES.month]: { key: TIMES.month, name: TIMES.month },
  [TIMES.week]: { key: TIMES.week, name: TIMES.week },
  [TIMES.day]: { key: TIMES.day, name: TIMES.day },
}

export const getFilterByColumn = (key) => makeFilterByColumn(ColumnKeys)[key] || []

export const getColumn = (key, styles, sortColumns) => makeFullColumns(styles, sortColumns)[key] || false