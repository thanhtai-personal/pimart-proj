import { makeStyles } from "@material-ui/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Flex from "../Flex";
import { Pagination } from "@material-ui/core";

function TableFooterComponent(props: any) {
  const classes = useStyles();
  const { columns, paging, setPaging } = props;
  
  return (
    <TableRow>
      <TableCell colSpan={columns.length}>
        <Flex width={"100%"} py={2} center>
          <Pagination
            page={paging?.current || 1}
            count={parseInt((paging?.total / paging?.size).toString()) + 1}
            onChange={(e, page) => {
              setPaging &&
                setPaging((prev) => {
                  return {
                    ...prev,
                    current: page || 1,
                  };
                });
            }}
            boundaryCount={0}
            siblingCount={3}
            color="primary"
            showFirstButton
            showLastButton
            size="large"
            variant="outlined"
          />
        </Flex>
      </TableCell>
    </TableRow>
  );
}

const useStyles = makeStyles({});

export default TableFooterComponent;
