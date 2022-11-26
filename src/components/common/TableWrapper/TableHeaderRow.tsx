import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Colors } from "styles/theme";
import Flex from "../Flex";
import { PrevIcon, SortDescIcon } from "assets/icons";
import { Fade, Menu, MenuItem, Tooltip } from "@material-ui/core";
import Text from "../Text";
import { SORT_DIRECT } from "components/helpers/constants";
import { observer } from "mobx-react";

function TableHeaderRow(props: any) {
  const classes = useStyles();
  const { columns, filter, setFilter, state } = props;

  return (
    <TableRow className={classes.tableHeaderRow}>
      {columns.map((column, index) => (
        <TableCell
          key={index}
          style={{
            minWidth: column.minWidth || 0,
            padding: "16px",
          }}
          className={
            column.switchable
              ? classes.headerCellSwitchable
              : classes.headerCell
          }
        >
          <Flex
            width={"100%"}
            height={"100%"}
            flexDirection={"row"}
            position={"relative"}
            justifyContent={
              column.switchable
                ? "center"
                : column.right
                ? "flex-end"
                : "flex-start"
            }
            centerY
            onClick={(event) => {
              if (column.sort) {
                state.anchorEl = event.currentTarget;
                state.currentSortColumn = column.dataKey;
              }
            }}
            className={column.switchable ? classes.columnSwitchable : ""}
          >
            {column.switchable && (
              <Tooltip title={"Previous column chart"}>
                <PrevIcon
                  onClick={() => {
                    state.switchIndex =
                      state.switchIndex > 0
                        ? state.switchIndex - 1
                        : (column.switchableData?.length || 0) - 1;
                  }}
                  className={classes.switchableLeft}
                  width={15}
                  height={15}
                />
              </Tooltip>
            )}
            {column.switchable && (
              <Tooltip title={"Next column chart"}>
                <PrevIcon
                  className={classes.switchableRight}
                  onClick={() => {
                    state.switchIndex =
                      state.switchIndex + 1 >=
                      (column.switchableData?.length || 0)
                        ? 0
                        : state.switchIndex + 1;
                  }}
                  style={{ transform: "scaleX(-1)" }}
                  width={15}
                  height={15}
                />
              </Tooltip>
            )}
            <Text className={classes.headerText} whiteSpace={"nowrap"}>
              {typeof column.label === "function"
                ? column.label(state.switchIndex)
                : column.label}
            </Text>
            {column.sort && (
              <Flex position={"relative"}>
                {filter.sort?.direct === SORT_DIRECT.asc &&
                  filter.sort?.column === column.dataSortKey && (
                    <SortDescIcon
                      style={{ transform: "scaleY(-1)" }}
                      width={30}
                      height={30}
                    />
                  )}
                {filter.sort?.direct === SORT_DIRECT.desc &&
                  filter.sort?.column === column.dataSortKey && (
                    <SortDescIcon width={30} height={30} />
                  )}
              </Flex>
            )}
          </Flex>
          {column.sortOptions && (
            <Menu
              open={state.currentSortColumn === column.dataKey}
              onClose={() => {
                state.anchorEl = null;
                state.currentSortColumn = "";
              }}
              keepMounted
              anchorEl={state.anchorEl}
              TransitionComponent={Fade}
              defaultValue={filter.sort?.value}
            >
              <Paper className={classes.sortMenu}>
                {column.sortOptions?.map((opt) => (
                  <MenuItem
                    onClick={() => {
                      setFilter &&
                        setFilter((prev) => ({
                          ...prev,
                          sort: {
                            value: opt.value,
                            column: column.dataKey,
                            direct: opt.direct,
                          },
                        }));
                      state.currentSortColumn = "";
                      state.anchorEl = null;
                    }}
                    className={classes.sortItem}
                    value={opt.value}
                    key={opt.value}
                  >
                    <Flex
                      flexDirection={"row"}
                      width={"100%"}
                      justifyContent={"space-between"}
                    >
                      <Text>{opt.name}</Text>&nbsp;
                      <Text>{opt.sort}</Text>
                    </Flex>
                  </MenuItem>
                ))}
              </Paper>
            </Menu>
          )}
        </TableCell>
      ))}
    </TableRow>
  );
}

const useStyles = makeStyles({
  tableHeaderRow: {},
  headerCell: {
    background: `${Colors.gray800} !important`,
    "&:hover": {
      color: `${Colors.gray200} !important`,
    },
  },
  headerCellSwitchable: {
    background: `${Colors.gray800} !important`,
  },
  columnSwitchable: {
    paddingLeft: "20px",
    paddingRight: "20px",
    textAlign: "center",
    justifyContent: "center",
  },
  switchableLeft: {
    position: "absolute",
    left: "2px",
    cursor: "pointer",
    "&:hover": {
      color: `${Colors.gray200} !important`,
    },
  },
  switchableRight: {
    position: "absolute",
    right: "2px",
    cursor: "pointer",
    "&:hover": {
      color: `${Colors.gray200} !important`,
    },
  },
  sortMenu: {
    background: `${Colors.gray800} !important`,
    border: Colors.borderDark,
    boxShadow: `${Colors.boxShadowBlue03} !important`,
  },
  sortItem: {
    color: `${Colors.gray200} !important`,
    background: `transparent !important`,
    "&:hover": {
      background: `${Colors.gray900} !important`,
    },
  },
  headerText: {
    cursor: "pointer",
  },
});

export default observer(TableHeaderRow);
