import {
  MintTimeColumn,
  NumberCell,
  SwitchableColumn,
  TimeColumn,
} from "./render";
import { CheckedIcon, StarIcon } from "assets/icons";
import Flex from "components/common/Flex";
import { ColumnKeys, TIMES, SORT_DIRECT } from "./constants";
import { Box } from "@material-ui/core";
import Text from "components/common/Text";
import { Colors } from "styles/theme";
import Loading from "components/common/Loading";
import { stylingNumber } from "utils/render";
import { formatTokenNumber, makeImageUrl } from "utils/helper";
import LazyImage from "components/common/LazyImage";

const makeFullColumns = (styles, sortColumns = [] as Array<string>) => ({
  [ColumnKeys.no]: {
    dataKey: "no",
    dataSortKey: "no",
    label: "",
    minWidth: 60,
    cellRenderer: (value: any, row: any) => (
      <Flex center>
        <Box mr={2} style={{ cursor: "pointer" }}>
          {<StarIcon width={15} height={15} />}
        </Box>
        <Text>{value}</Text>
      </Flex>
    ),
  },
  [ColumnKeys.trait]: {
    dataKey: ColumnKeys.trait,
    dataSortKey: ColumnKeys.trait,
    label: "Traits",
    sort: sortColumns.includes(ColumnKeys.trait),
    renderLoading: () => {
      return <Loading skeletons={1} minHeight={100} />;
    },
    cellRenderer: (value: any, row: any) => (
      <Flex centerY justifyContent={"flex-start"} p={1}>
        <Flex column>
          <Flex centerY>
            <Text
              className={styles.hoverableText}
              color={Colors.white}
              fontSize={15}
              maxWidth={400}
              minWidth={350}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
            >
              {row.name?.split("/")[2] || ""}
            </Text>
            &nbsp;
            {row.verified && <CheckedIcon width={13} height={13} />}
            {row.new && (
              <Text fontSize={15} color={Colors.green}>
                New
              </Text>
            )}
          </Flex>
          <Text fontSize={13} display={"inline-flex"}>
            {row.total}&nbsp;items&nbsp;|&nbsp;{row.category}
          </Text>
        </Flex>
      </Flex>
    ),
  },
  [ColumnKeys.collection]: {
    dataKey: ColumnKeys.collection,
    dataSortKey: ColumnKeys.collection,
    label: "Collection",
    sort: sortColumns.includes(ColumnKeys.collection),
    minWidth: 350,
    renderLoading: () => {
      return <Loading skeletons={1} minHeight={100} />;
    },
    cellRenderer: (value: any, row: any, index: number) => (
      <Flex centerY justifyContent={"flex-start"} p={1}>
        <LazyImage
          src={makeImageUrl(row?.avatar)}
          id={`collection-image-${row.id}-${index}`}
          style={{
            width: `38px`,
            height: `38px`,
            marginRight: ".2rem"
          }}
          lightWeightImage={"/images/default-avartar.png"}
        />
        <Flex column>
          <Flex centerY>
            <Text
              className={styles.hoverableText}
              color={Colors.white}
              fontSize={15}
            >
              {row.name}
            </Text>
            &nbsp;
            {row.verified && <CheckedIcon width={13} height={13} />}
            {row.new && (
              <Text fontSize={15} color={Colors.green}>
                New
              </Text>
            )}
          </Flex>
          <Text fontSize={13} display={"inline-flex"}>
            {row.total}&nbsp;items
          </Text>
        </Flex>
      </Flex>
    ),
  },
  [ColumnKeys.floor]: {
    dataKey: ColumnKeys.floor,
    dataSortKey: ColumnKeys.floor,
    label: "Floor",
    sort: sortColumns.includes(ColumnKeys.floor),
    right: false,
    minWidth: 100,
    sortOptions: [
      {
        value: `${ColumnKeys.floor}_${SORT_DIRECT.asc}`,
        name: "Floor:",
        sort: "Low -> High",
        direct: SORT_DIRECT.asc,
      },
      {
        value: `${ColumnKeys.floor}_${SORT_DIRECT.desc}`,
        name: "Floor:",
        sort: "High -> Low",
        direct: SORT_DIRECT.desc,
      },
      {
        value: `${ColumnKeys.floor}_CHANGE_${SORT_DIRECT.asc}`,
        name: "Change:",
        sort: "Low -> High",
        direct: SORT_DIRECT.asc,
      },
      {
        value: `${ColumnKeys.floor}_CHANGE_${SORT_DIRECT.desc}`,
        name: "Change:",
        sort: "High -> Low",
        direct: SORT_DIRECT.desc,
      },
    ],
    cellRenderer: (value: any, row: any) =>
      NumberCell({
        value: row.floor,
        percent: row.floorPercent,
      }),
  },
  [ColumnKeys.mktCap]: {
    dataKey: ColumnKeys.mktCap,
    dataSortKey: ColumnKeys.mktCap,
    label: "Mkt. Cap",
    minWidth: 130,
    sort: sortColumns.includes(ColumnKeys.mktCap),
    right: false,
    sortOptions: [
      {
        value: `${ColumnKeys.mktCap}_${SORT_DIRECT.asc}`,
        name: "Mkt. Cap:",
        sort: "Low -> High",
        direct: SORT_DIRECT.asc,
      },
      {
        value: `${ColumnKeys.mktCap}_${SORT_DIRECT.desc}`,
        name: "Mkt. Cap:",
        sort: "High -> Low",
        direct: SORT_DIRECT.desc,
      },
      {
        value: `${ColumnKeys.mktCap}_CHANGE_${SORT_DIRECT.asc}`,
        name: "Change:",
        sort: "Low -> High",
        direct: SORT_DIRECT.asc,
      },
      {
        value: `${ColumnKeys.mktCap}_CHANGE_${SORT_DIRECT.desc}`,
        name: "Change:",
        sort: "High -> Low",
        direct: SORT_DIRECT.desc,
      },
    ],
    cellRenderer: (value: any, row: any) =>
      NumberCell({
        value: row.mktCap,
        percent: row.mktCapPercent,
      }),
  },
  [ColumnKeys.avg]: {
    dataKey: ColumnKeys.avg,
    dataSortKey: ColumnKeys.avg,
    label: "Avg Price",
    minWidth: 80,
    sort: sortColumns.includes(ColumnKeys.avg),
    right: false,
    sortOptions: [
      {
        value: `${ColumnKeys.avg}_${SORT_DIRECT.asc}`,
        name: "Avg:",
        sort: "Low -> High",
        direct: SORT_DIRECT.asc,
      },
      {
        value: `${ColumnKeys.avg}_${SORT_DIRECT.desc}`,
        name: "Avg:",
        sort: "High -> Low",
        direct: SORT_DIRECT.desc,
      },
      {
        value: `${ColumnKeys.avg}_CHANGE_${SORT_DIRECT.asc}`,
        name: "Change:",
        sort: "Low -> High",
        direct: SORT_DIRECT.asc,
      },
      {
        value: `${ColumnKeys.avg}_CHANGE_${SORT_DIRECT.desc}`,
        name: "Change:",
        sort: "High -> Low",
        direct: SORT_DIRECT.desc,
      },
    ],
    cellRenderer: (value: any, row: any) =>
      NumberCell({
        value: row.avg,
        percent: row.avgPercent,
      }),
  },
  [ColumnKeys.volume]: {
    dataKey: ColumnKeys.volume,
    dataSortKey: ColumnKeys.volume,
    label: "Volume",
    minWidth: 120,
    sort: sortColumns.includes(ColumnKeys.volume),
    right: false,
    sortOptions: [
      {
        value: `${ColumnKeys.volume}_${SORT_DIRECT.asc}`,
        name: "Volume:",
        sort: "Low -> High",
        direct: SORT_DIRECT.asc,
      },
      {
        value: `${ColumnKeys.volume}_${SORT_DIRECT.desc}`,
        name: "Volume:",
        sort: "High -> Low",
        direct: SORT_DIRECT.desc,
      },
      {
        value: `${ColumnKeys.volume}_CHANGE_${SORT_DIRECT.asc}`,
        name: "Change:",
        sort: "Low -> High",
        direct: SORT_DIRECT.asc,
      },
      {
        value: `${ColumnKeys.volume}_CHANGE_${SORT_DIRECT.desc}`,
        name: "Change:",
        sort: "High -> Low",
        direct: SORT_DIRECT.desc,
      },
    ],
    cellRenderer: (value: any, row: any) =>
      NumberCell({
        value: row.volume,
        percent: row.volumePercent,
      }),
  },
  [ColumnKeys.sales]: {
    dataKey: ColumnKeys.sales,
    dataSortKey: ColumnKeys.sales,
    label: "Sales",
    minWidth: 105,
    sort: sortColumns.includes(ColumnKeys.sales),
    sortOptions: [
      {
        value: `${ColumnKeys.sales}_${SORT_DIRECT.asc}`,
        name: "Sales:",
        sort: "Low -> High",
        direct: SORT_DIRECT.asc,
      },
      {
        value: `${ColumnKeys.sales}_${SORT_DIRECT.desc}`,
        name: "Sales:",
        sort: "High -> Low",
        direct: SORT_DIRECT.desc,
      },
      {
        value: `${ColumnKeys.sales}_CHANGE_${SORT_DIRECT.asc}`,
        name: "Change:",
        sort: "Low -> High",
        direct: SORT_DIRECT.asc,
      },
      {
        value: `${ColumnKeys.sales}_CHANGE_${SORT_DIRECT.desc}`,
        name: "Change:",
        sort: "High -> Low",
        direct: SORT_DIRECT.desc,
      },
    ],
    right: false,
    cellRenderer: (value: any, row: any) =>
      NumberCell({
        value: row.sales,
        percent: row.salesPercent,
      }),
  },
  [ColumnKeys.listed]: {
    dataKey: ColumnKeys.listed,
    dataSortKey: ColumnKeys.listed,
    label: "% Listed",
    minWidth: 80,
    sort: false,
    cellRenderer: (value: any, row: any) => (
      <Flex
        centerY
        justifyContent={"flex-start"}
        width={"100%"}
        alignItems={"flex-start"}
      >
        <Text
          whiteSpace={"nowrap"}
          display={"inline-flex"}
          fontSize={15}
          color={Colors.white}
        >
          {stylingNumber(formatTokenNumber(row.percentListed))}&nbsp;%
        </Text>
      </Flex>
    ),
  },
  [ColumnKeys.unique]: {
    dataKey: ColumnKeys.unique,
    dataSortKey: ColumnKeys.unique,
    label: "Unique",
    minWidth: 100,
    sort: sortColumns.includes(ColumnKeys.unique),
    cellRenderer: (value: any, row: any) => (
      <Flex column centerY alignItems={"flex-start"}>
        <Text fontSize={15} color={row.unique ? Colors.white : Colors.gray400}>
          {row.unique || "N/A"}&nbsp;
        </Text>
        <Text fontSize={13}>{row.uniqueCount}</Text>
      </Flex>
    ),
  },
  [ColumnKeys.firstMint]: {
    dataKey: ColumnKeys.firstMint,
    dataSortKey: ColumnKeys.firstMint,
    right: false,
    label: "First Mint",
    minWidth: 150,
    sort: sortColumns.includes(ColumnKeys.firstMint),
    sortOptions: [
      {
        value: `${ColumnKeys.firstMint}_${SORT_DIRECT.desc}`,
        name: "First Mint:",
        sort: "New -> Old",
        direct: SORT_DIRECT.desc,
      },
      {
        value: `${ColumnKeys.firstMint}_${SORT_DIRECT.asc}`,
        name: "First Mint:",
        sort: "Old -> New",
        direct: SORT_DIRECT.asc,
      },
    ],
    cellRenderer: (value: any, row: any) => (
      <Flex
        centerY
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        column
        width={"100%"}
      >
        <Text
          textAlign={"left"}
          width={"100%"}
          fontSize={15}
          color={Colors.white}
        >
          {row.firstMintAt}
        </Text>
      </Flex>
    ),
  },

  [ColumnKeys.lastMint]: {
    dataKey: ColumnKeys.lastMint,
    dataSortKey: ColumnKeys.lastMint,
    label: "Last Mint",
    minWidth: 150,
    right: false,
    sort: sortColumns.includes(ColumnKeys.lastMint),
    sortOptions: [
      {
        value: `${ColumnKeys.lastMint}_${SORT_DIRECT.desc}`,
        name: "Last Mint:",
        sort: "New -> Old",
        direct: SORT_DIRECT.desc,
      },
      {
        value: `${ColumnKeys.lastMint}_${SORT_DIRECT.asc}`,
        name: "Last Mint:",
        sort: "Old -> New",
        direct: SORT_DIRECT.asc,
      },
    ],
    cellRenderer: (value: any, row: any) => (
      <Flex
        centerY
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        column
        width={"100%"}
      >
        <Text
          textAlign={"left"}
          width={"100%"}
          fontSize={15}
          color={Colors.white}
        >
          {row.lastMint}
        </Text>
      </Flex>
    ),
  },
  [`${TIMES.month}_${ColumnKeys.volume}_${ColumnKeys.mints}`]: TimeColumn(
    TIMES.month,
    ColumnKeys.volume,
    true,
    SwitchableColumn(ColumnKeys.mints)
  ),
  [`${TIMES.week}_${ColumnKeys.volume}_${ColumnKeys.mints}`]: TimeColumn(
    TIMES.week,
    ColumnKeys.volume,
    true,
    SwitchableColumn(ColumnKeys.mints)
  ),
  [`${TIMES.week}_${ColumnKeys.trait}`]: TimeColumn(
    TIMES.week,
    ColumnKeys.volume,
    true,
    SwitchableColumn(ColumnKeys.trait)
  ),
  [`${TIMES.month}_${ColumnKeys.trait}`]: TimeColumn(
    TIMES.month,
    ColumnKeys.volume,
    true,
    SwitchableColumn(ColumnKeys.trait)
  ),
  [`${TIMES.day}_${ColumnKeys.volume}_${ColumnKeys.mints}`]: TimeColumn(
    TIMES.day,
    ColumnKeys.volume,
    true,
    SwitchableColumn(ColumnKeys.mints)
  ),
  [`${TIMES.month}_${ColumnKeys.volume}`]: TimeColumn(
    TIMES.month,
    ColumnKeys.volume,
    true,
    SwitchableColumn(ColumnKeys.volume)
  ),
  [`${TIMES.week}_${ColumnKeys.volume}`]: TimeColumn(
    TIMES.week,
    ColumnKeys.volume,
    true,
    SwitchableColumn(ColumnKeys.volume)
  ),
  [`${TIMES.day}_${ColumnKeys.volume}`]: TimeColumn(
    TIMES.day,
    ColumnKeys.volume,
    true,
    SwitchableColumn(ColumnKeys.volume)
  ),
  [`${TIMES.month}_${ColumnKeys.trend}`]: TimeColumn(
    TIMES.month,
    ColumnKeys.trend,
    false
  ),
  [`${TIMES.week}_${ColumnKeys.trend}`]: TimeColumn(
    TIMES.week,
    ColumnKeys.trend,
    false
  ),
  [`${TIMES.day}_${ColumnKeys.trend}`]: TimeColumn(
    TIMES.day,
    ColumnKeys.trend,
    false
  ),
  [`${TIMES.month}_${ColumnKeys.mints}`]: MintTimeColumn(TIMES.month),
  [`${TIMES.week}_${ColumnKeys.mints}`]: MintTimeColumn(TIMES.week),
  [`${TIMES.day}_${ColumnKeys.mints}`]: MintTimeColumn(TIMES.day),
});

export default makeFullColumns;
