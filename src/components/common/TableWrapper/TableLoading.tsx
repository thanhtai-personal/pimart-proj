import { TableCell, TableRow } from "@material-ui/core";
import { useMemo } from "react";
import Flex from "../Flex";
import Loading from "../Loading";
import { TableWrapperColumn } from ".";

type TableLoadingProps = {
  columns: Array<TableWrapperColumn>;
  size?: number;
};

const TableLoading = ({ columns, size = 25 }: TableLoadingProps) => {

  const LoadingRows = useMemo(() => {
    const rows: Array<any> = [];
    for (let i = 0; i < size; i++) {
      rows.push(
        <TableRow key={`loading-row-${i}`}>
          {columns.map((col, index) => (
            <TableCell
              key={`cell-loadind-${index}`}
              style={{
                width: col.minWidth || 20,
              }}
            >
              <Flex width={"100%"}>
                {col.renderLoading ? (
                  col.renderLoading(col)
                ) : (
                  <Loading skeletons={1} noThumb r={2} width={30} height={30} x={-30} y={0} minHeight={60} />
                )}
              </Flex>
            </TableCell>
          ))}
        </TableRow>
      );
    }
    return rows;
  }, [size, columns]);

  return <>{LoadingRows}</>;
};

export default TableLoading;
