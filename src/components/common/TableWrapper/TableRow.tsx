import { makeStyles } from "@material-ui/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Flex from "../Flex";
import { Colors } from "styles/theme";

function TableRowComponent(props: any) {
  const classes = useStyles();
  const {
    columns,
    rowClick,
    rowIndex,
    row,
    switchIndex,
  } = props;

  return (
    <TableRow
      role="checkbox"
      tabIndex={-1}
      key={rowIndex}
      onClick={(() => rowClick && rowClick(row)) || (() => {})}
      className={classes.tableRow}
    >
      {columns.map((column, columnIndex) => {
        const value = row[column.dataKey];
        if (column.switchable) {
          return (
            <TableCell
              style={{
                minWidth: column.minWidth || 0,
              }}
              key={columnIndex}
            >
              {column.cellRenderer(value, row, switchIndex)}
            </TableCell>
          );
        }
        return (
          <TableCell key={columnIndex}>
            <Flex>{column.cellRenderer(value, row)}</Flex>
          </TableCell>
        );
      })}
    </TableRow>
  );
}

const useStyles = makeStyles({
  tableRow: {
    borderTop: `${Colors.border} !important`,
    cursor: "pointer",
    "&:hover": {
      background: `${Colors.gray900} !important`,
    },
  },
});

export default TableRowComponent;
