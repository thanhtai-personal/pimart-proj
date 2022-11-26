import { BarChart } from "charting_library/reChart"
import Flex from "components/common/Flex"

const TimeCell = (rowData, defaultTypeStr) => {
  switch (defaultTypeStr) {
    default: //"trending
      return (
        <Flex center overflow={"hidden"} width={180} height={80}>
          <BarChart />
        </Flex>
      )
  }
}

export default TimeCell