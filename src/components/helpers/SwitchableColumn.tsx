import Flex from "components/common/Flex"
import VolumeChart from "screens/TrendingPage/components/charts/VolumeChart"
import SalesChart from "screens/TrendingPage/components/charts/SalesChart"
import FloorChart from "screens/TrendingPage/components/charts/FloorChart"
import MKTCapChart from "screens/TrendingPage/components/charts/MKTCapChart"
import AvgPriceChart from "screens/TrendingPage/components/charts/AvgPriceChart"
import MintsChart from "screens/TrendingPage/components/charts/MintsChart"
import { ColumnKeys } from "./constants"

const SwitchableColumn = (key) => {
  switch (key) {
    case ColumnKeys.mints: {
      return [
        {
          label: "Floor",
          render: (value, row) => {
            return <Flex width={"100%"} height={120} center overflow={"hidden"}>
              <FloorChart rowData={row} shortTime={row.shortTime}/>
            </Flex>
          }
        },
        {
          label: "Volume",
          render: (value, row) => {
            return <Flex width={"100%"} height={120} center overflow={"hidden"}>
              <VolumeChart rowData={row} shortTime={row.shortTime}/>
            </Flex>
          }
        },
        {
          label: "Mints",
          render: (value, row) => {
            return <Flex width={"100%"} height={120} center overflow={"hidden"}>
              <MintsChart rowData={row} shortTime={row.shortTime}/>
            </Flex>
          }
        },
      ]
    }
    case ColumnKeys.trait: {
      return [
        {
          label: "Avg. Price",
          render: (value, row) => {
            return <Flex width={"100%"} height={120} center overflow={"hidden"}>
              <AvgPriceChart rowData={row} shortTime={row.shortTime}/>
            </Flex>
          }
        },
        {
          label: "Volume",
          render: (value, row) => {
            return <Flex width={"100%"} height={120} center overflow={"hidden"}>
              <VolumeChart rowData={row} shortTime={row.shortTime}/>
            </Flex>
          }
        },
        {
          label: "Sales",
          render: (value, row) => {
            return <Flex width={"100%"} height={120} center overflow={"hidden"}>
              <SalesChart rowData={row} shortTime={row.shortTime}/>
            </Flex>
          }
        },
      ]
    }
    default: //volume
      return [
        {
          label: "Avg. Price",
          render: (value, row) => {
            return <Flex width={"100%"} height={120} center overflow={"hidden"}>
              <AvgPriceChart rowData={row} shortTime={row.shortTime}/>
            </Flex>
          }
        },
        {
          label: "Volume",
          render: (value, row) => {
            return <Flex width={"100%"} height={120} center overflow={"hidden"}>
              <VolumeChart rowData={row} shortTime={row.shortTime}/>
            </Flex>
          }
        },
        {
          label: "Sales",
          render: (value, row) => {
            return <Flex width={"100%"} height={120} center overflow={"hidden"}>
              <SalesChart rowData={row} shortTime={row.shortTime}/>
            </Flex>
          }
        },
        {
          label: "Floor",
          render: (value, row) => {
            return <Flex width={"100%"} height={120} center overflow={"hidden"}>
              <FloorChart rowData={row} shortTime={row.shortTime}/>
            </Flex>
          }
        },
        {
          label: "Mkt. Cap",
          render: (value, row) => {
            return <Flex width={"100%"} height={100} center overflow={"hidden"}>
              <MKTCapChart rowData={row} shortTime={row.shortTime} />
            </Flex>
          }
        },
      ]
  }
}

export default SwitchableColumn