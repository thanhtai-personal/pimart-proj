import TimeCell from "./TimeCell"

const TimeColumn = (time, defaultTypeStr, switchable, switchableDatas?: Array<any>) => {
  
  return {
    dataKey: `${time}_${defaultTypeStr}`,
    dataSortKey: `${defaultTypeStr}`,
    label: switchable ? (switchIndex: number) => {
      return `${time} ${switchableDatas ? switchableDatas[switchIndex]?.label : ""}`
    } : `${time} ${defaultTypeStr.charAt(0).toUpperCase()}${defaultTypeStr.slice(1)}`,
    switchable: switchable,
    width: 350,
    switchableData: switchableDatas,
    cellRenderer: (value: any, row: any, switchableIndex?: number) => {
      if (switchable) {
        return switchableDatas && switchableDatas[switchableIndex || 0]
          && switchableDatas[switchableIndex || 0].render(value, row)
      } else {
        return TimeCell(row, defaultTypeStr)
      }
    }
  }
}

export default TimeColumn