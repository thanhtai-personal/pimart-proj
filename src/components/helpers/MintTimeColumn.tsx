import { ColumnKeys, SORT_DIRECT } from "./constants"
import NumberCell from "./NumberCell"

const MintTimeColumn = (time) => {
  return {
    dataKey: `${time}_${ColumnKeys.mints}`,
    dataSortKey: `${ColumnKeys.mints}`,
    label: `${time} Mints`,
    sort: true,
    right: false,
    sortOptions: [
      {
        value: `${ColumnKeys.mints}_${SORT_DIRECT.asc}`,
        name: `${time} Mints: `,
        sort: "Low -> High",
        direct: SORT_DIRECT.asc
      },
      {
        value: `${ColumnKeys.mints}_${SORT_DIRECT.desc}`,
        name: `${time} Mints: `,
        sort: "High -> Low",
        direct: SORT_DIRECT.desc
      },
    ],
    cellRenderer: (value: any, row: any) => NumberCell({
      value: row.mints,
      percent: null,
      icon: false,
    }, false)
  }
}

export default MintTimeColumn