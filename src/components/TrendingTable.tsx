import { createStyles, makeStyles } from "@material-ui/styles";
import { useMemo } from "react";
import Flex from "./common/Flex";
import TableWrapper from "./common/TableWrapper";
import { Colors } from "styles/theme";
import { ColumnKeys, getColumn } from "./helpers/constants";
import { goToCollectionDetailPage } from "utils/helper";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: any) =>
  createStyles({
    root: {
      animation: `$animation_appear 1000ms ease-in-out`,
    },
    "@keyframes animation_appear": {
      "0%": {
        opacity: 0,
      },
      "100%": {},
    },
    hoverableText: {
      "&:hover": {
        color: `${Colors.pink} !important`,
      },
    },
  })
);

export default function TrendingTable(props) {
  const {
    columnKeys,
    dataSource,
    filter,
    setFilter,
    loading,
    paging,
    setPaging,
    rowClick,
    sortColumns = Object.keys(ColumnKeys).map((key) => ColumnKeys[key])
  } = props;
  const styles = useStyles();
  const history = useHistory();

  const columns = useMemo(() => {
    const newColumns: Array<any> = [];
    columnKeys.forEach((key, index) => {
      const makedColumn: any = getColumn(key, styles, sortColumns);
      makedColumn && newColumns.push({ ...makedColumn, switchIndex: index });
    });
    return newColumns;
  }, [columnKeys]);

  return (
    <Flex column width={"100%"} className={styles.root}>
      <Flex width={"100%"}>
        <TableWrapper
          data={dataSource}
          rowClick={rowClick || ((item) => goToCollectionDetailPage(history, item.tokenKey))}
          columns={columns}
          filter={filter}
          setFilter={setFilter}
          loading={loading}
          paging={paging}
          setPaging={setPaging}
        />
      </Flex>
    </Flex>
  );
}
