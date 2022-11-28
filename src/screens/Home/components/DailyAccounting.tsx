import { Button, Container, Paper, Tab, Tabs, TextareaAutosize, TextField } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/styles";
import Flex from "components/common/Flex"
import Text from "components/common/Text";
import { observer, useLocalObservable } from "mobx-react"
import moment from "moment";
import { useEffect, useMemo, useRef } from "react";
import { AppTheme, Colors } from "styles/theme";
import { NotiStackInstance } from "App";
import ReactToPrint from "react-to-print";
import { autoForm } from "api/users";

const ExportType = {
  half: "halfDay",
  full: "fullDay",
}

const DailyAccounting = (props) => {

  const state = useLocalObservable(() => ({
    bankingMoney: "0",
    yesterdayMoney: "0",
    todayCashMoney: "0",
    revenue: "0",
    otherMoney: "0",
    otherRevenue: "0",
    "1k": "0",
    "2k": "0",
    "5k": "0",
    "10k": "0",
    "20k": "0",
    "50k": "0",
    "100k": "0",
    "200k": "0",
    "500k": "0",
    note: "",
    type: ExportType.half,
    halfData: {} as any,
    loadingSubmit: false,
    dataExport: {},
  }));

  const numberFormat = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  })

  const cashBoxMoney = useMemo(() => {
    return (
      parseFloat(state["1k"] || "0") * 1000
      + parseFloat(state["2k"] || "0") * 2000
      + parseFloat(state["5k"] || "0") * 5000
      + parseFloat(state["10k"] || "0") * 10000
      + parseFloat(state["20k"] || "0") * 20000
      + parseFloat(state["50k"] || "0") * 50000
      + parseFloat(state["100k"] || "0") * 100000
      + parseFloat(state["200k"] || "0") * 200000
      + parseFloat(state["500k"] || "0") * 500000
    ).toString()
  }, [
    state["1k"],
    state["2k"],
    state["5k"],
    state["10k"],
    state["20k"],
    state["50k"],
    state["100k"],
    state["200k"],
    state["500k"],
  ]);
  const componentRef = useRef(null);

  const styles = useStyles();

  useEffect(() => {
    if (state.type === ExportType.full) {
      state.halfData = JSON.parse(localStorage.getItem(`half-data-${moment().format("DD_MM_YYYY")}`) || "{}")
    }
  }, [
    state.type
  ])

  const handleSubmit = (e) => {
    if (state.type === ExportType.half) {
      localStorage.setItem(
        `half-data-${moment().format("DD_MM_YYYY")}`,
        JSON.stringify({
          bankingMoney: state.bankingMoney,
          yesterdayMoney: state.yesterdayMoney,
          todayCashMoney: state.todayCashMoney,
          revenue: state.revenue,
          otherMoney: state.otherMoney,
          otherRevenue: state.otherRevenue,
          "1k": state["1k"],
          "2k": state["2k"],
          "5k": state["5k"],
          "10k": state["10k"],
          "20k": state["20k"],
          "50k": state["50k"],
          "100k": state["100k"],
          "200k": state["200k"],
          "500k": state["500k"],
          note: state.note,
          cashBoxMoney,
        })
      );
      NotiStackInstance.push({
        children: "Đã lưu kết ca sáng",
        variant: "success",
      });
    } else {
      localStorage.setItem(
        `half-data-backup-${moment().format("DD_MM_YYYY")}`,
        localStorage.getItem(`half-data-${moment().format("DD_MM_YYYY")}`) || "{}"
      );
      localStorage.removeItem(
        `half-data-${moment().format("DD_MM_YYYY")}`
      );
      NotiStackInstance.push({
        children: "Đã xóa kết ca sáng",
        variant: "success",
      });
      const dataExport = {
        day: moment().format("DD/MM/YYYY"),
        cashBoxMoney,
        bankingMoney: state.bankingMoney,
        actualRevenue:
          parseFloat(state.bankingMoney || "0") +
          parseFloat(cashBoxMoney || "0") -
          parseFloat(state.yesterdayMoney || "0"),
        revenue: state.revenue,
        otherMoney: state.otherMoney,
        otherRevenue: state.otherRevenue,
        deviant:
          parseFloat(state.bankingMoney || "0") +
          parseFloat(cashBoxMoney || "0") -
          parseFloat(state.yesterdayMoney || "0") +
          parseFloat(state.otherMoney || "0") -
          parseFloat(state.otherRevenue || "0") -
          parseFloat(state.revenue || "0"),
        note: state.note,
      };
      state.dataExport = dataExport;
      setTimeout(() => {
        const printBtn = document.getElementById("print-btn");
        if (printBtn) {
          printBtn.click()
        }
      }, 100)
      state.loadingSubmit = true;
      try {
        autoForm(dataExport)
        .then((data) => {
          state.loadingSubmit = false;
          NotiStackInstance.push({
            children: "Đã lưu kết ca ngày",
            variant: "success",
          });
        }).catch((error) => {
          state.loadingSubmit = false;
          NotiStackInstance.push({
            children: "Chưa lưu kết ca ngày",
            variant: "error",
          });
        });
      } catch (error) {
        state.loadingSubmit = false;
        NotiStackInstance.push({
          children: "Chưa lưu kết ca ngày",
          variant: "error",
        });
      }
    }
  }

  return (
    <Flex width={"100%"} height={"100%"} className={styles.root}>
      <Container maxWidth="xl">
        <Flex width={"100%"} column p={1} position={"relative"}>
          <Flex
            className={styles.actionsBar}
            position={"absolute"}
            left={10}
            top={20}
            centerY
          >
            <Tabs
              value={state.type}
              onChange={(e, v) => {
                state.type = v;
              }}
            >
              <Tab
                label={
                  <Text
                    fontFamily={`'Maven Pro', sans-serif`}
                    fontSize={18}
                    lineHeight={"24px"}
                  >
                    Kết ca sáng
                  </Text>
                }
                value={ExportType.half}
              />
              <Tab
                label={
                  <Text
                    fontFamily={`'Maven Pro', sans-serif`}
                    fontSize={18}
                    lineHeight={"24px"}
                  >
                    Kết ca ngày
                  </Text>
                }
                value={ExportType.full}
              />
            </Tabs>
          </Flex>
          <Flex
            className={styles.actionsBar}
            position={"absolute"}
            right={1}
            top={20}
            centerY
          >
            {state.type === ExportType.full && <Button
              variant={"outlined"}
              onClick={() => {
                const dataBackup = localStorage.getItem(`half-data-backup-${moment().format("DD_MM_YYYY")}`);
                state.halfData = JSON.parse(dataBackup || "{}");
                localStorage.setItem(`half-data-${moment().format("DD_MM_YYYY")}`, dataBackup || "{}")
              }}
              disabled={state.loadingSubmit}
              style={{ marginRight: ".5rem" }}
            >
              <Text
                fontFamily={`'Maven Pro', sans-serif`}
                fontSize={18}
                lineHeight={"24px"}
                color="steelblue"
              >
                Lấy lại dữ liệu ca sáng
              </Text>
            </Button>}
            <Button
              variant={"primary"}
              onClick={handleSubmit}
              disabled={state.loadingSubmit}
            >
              <Text
                fontFamily={`'Maven Pro', sans-serif`}
                fontSize={18}
                lineHeight={"24px"}
              >
                {state.type === ExportType.half ? "Lưu" : "Xuất phiếu"}
              </Text>
            </Button>
          </Flex>
          <Flex center mt={2} column>
            <Text
              fontFamily={"'Creepster', cursive"}
              fontWeight={700}
              fontSize={34}
              lineHeight={"40px"}
            >
              PI MART
            </Text>
          </Flex>
          <Flex width={"100%"} mt={4}>
            <Flex flex={1} p={1} column className={styles.leftPanel}>
              <Flex width={"100%"} flexWrap={"wrap"} mt={1}>
                <Flex column m={1} width={"30%"}>
                  <Text
                    fontFamily={`'Maven Pro', sans-serif`}
                    className={styles.label}
                  >
                    500k
                  </Text>
                  <TextField
                    tabIndex={1}
                    className={styles.input}
                    onChange={(e) => {
                      state["500k"] = e.target.value || "0";
                    }}
                    inputProps={{
                      type: "number",
                    }}
                  />
                </Flex>
                <Flex column m={1} width={"30%"}>
                  <Text
                    fontFamily={`'Maven Pro', sans-serif`}
                    className={styles.label}
                  >
                    200k
                  </Text>
                  <TextField
                    tabIndex={2}
                    className={styles.input}
                    onChange={(e) => {
                      state["200k"] = e.target.value || "0";
                    }}
                    inputProps={{
                      type: "number",
                    }}
                  />
                </Flex>
                <Flex column m={1} width={"30%"}>
                  <Text
                    fontFamily={`'Maven Pro', sans-serif`}
                    className={styles.label}
                  >
                    100k
                  </Text>
                  <TextField
                    tabIndex={3}
                    className={styles.input}
                    onChange={(e) => {
                      state["100k"] = e.target.value || "0";
                    }}
                    inputProps={{
                      type: "number",
                    }}
                  />
                </Flex>
                <Flex column m={1} width={"30%"}>
                  <Text
                    fontFamily={`'Maven Pro', sans-serif`}
                    className={styles.label}
                  >
                    50k
                  </Text>
                  <TextField
                    tabIndex={4}
                    className={styles.input}
                    onChange={(e) => {
                      state["50k"] = e.target.value || "0";
                    }}
                    inputProps={{
                      type: "number",
                    }}
                  />
                </Flex>
                <Flex column m={1} width={"30%"}>
                  <Text
                    fontFamily={`'Maven Pro', sans-serif`}
                    className={styles.label}
                  >
                    20k
                  </Text>
                  <TextField
                    tabIndex={5}
                    className={styles.input}
                    onChange={(e) => {
                      state["20k"] = e.target.value || "0";
                    }}
                    inputProps={{
                      type: "number",
                    }}
                  />
                </Flex>
                <Flex column m={1} width={"30%"}>
                  <Text
                    fontFamily={`'Maven Pro', sans-serif`}
                    className={styles.label}
                  >
                    10k
                  </Text>
                  <TextField
                    tabIndex={6}
                    className={styles.input}
                    onChange={(e) => {
                      state["10k"] = e.target.value || "0";
                    }}
                    inputProps={{
                      type: "number",
                    }}
                  />
                </Flex>
                <Flex column m={1} width={"30%"}>
                  <Text
                    fontFamily={`'Maven Pro', sans-serif`}
                    className={styles.label}
                  >
                    5k
                  </Text>
                  <TextField
                    tabIndex={7}
                    className={styles.input}
                    onChange={(e) => {
                      state["5k"] = e.target.value || "0";
                    }}
                    inputProps={{
                      type: "number",
                    }}
                  />
                </Flex>
                <Flex column m={1} width={"30%"}>
                  <Text
                    fontFamily={`'Maven Pro', sans-serif`}
                    className={styles.label}
                  >
                    2k
                  </Text>
                  <TextField
                    tabIndex={8}
                    className={styles.input}
                    onChange={(e) => {
                      state["2k"] = e.target.value || "0";
                    }}
                    inputProps={{
                      type: "number",
                    }}
                  />
                </Flex>
                <Flex column m={1} width={"30%"}>
                  <Text
                    fontFamily={`'Maven Pro', sans-serif`}
                    className={styles.label}
                  >
                    1k
                  </Text>
                  <TextField
                    tabIndex={9}
                    className={styles.input}
                    onChange={(e) => {
                      state["1k"] = e.target.value || "0";
                    }}
                    inputProps={{
                      type: "number",
                    }}
                  />
                </Flex>
              </Flex>
              <Flex column m={1} mt={2} mr={4}>
                <Text
                  fontFamily={`'Maven Pro', sans-serif`}
                  className={styles.label}
                >
                  Tiền chuyển khoản
                </Text>
                <Flex position={"relative"}>
                  <TextField
                    tabIndex={10}
                    fullWidth
                    style={{
                      paddingRight: 250,
                    }}
                    onChange={(e) => {
                      state.bankingMoney = e.target.value;
                    }}
                    className={styles.input}
                    inputProps={{
                      type: "number",
                    }}
                  />
                  <Flex
                    width={250}
                    justifyContent={"flex-end"}
                    px={1}
                    bgcolor={"rgba(0,0,0, 0.7)"}
                    position={"absolute"}
                    right={0}
                    top={0}
                    height={"100%"}
                    centerY
                  >
                    <Text>
                      {numberFormat.format(
                        parseFloat(state.bankingMoney || "0")
                      )}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex column m={1} mt={2} mr={4}>
                <Text
                  fontFamily={`'Maven Pro', sans-serif`}
                  className={styles.label}
                >
                  Tiền quỷ hôm qua
                </Text>
                <Flex position={"relative"}>
                  <TextField
                    tabIndex={11}
                    fullWidth
                    style={{
                      paddingRight: 250,
                    }}
                    onChange={(e) => {
                      state.yesterdayMoney = e.target.value;
                    }}
                    className={styles.input}
                    inputProps={{
                      type: "number",
                    }}
                  />
                  <Flex
                    width={250}
                    justifyContent={"flex-end"}
                    px={1}
                    bgcolor={"rgba(0,0,0, 0.7)"}
                    position={"absolute"}
                    right={0}
                    top={0}
                    height={"100%"}
                    centerY
                  >
                    <Text>
                      {numberFormat.format(
                        parseFloat(state.yesterdayMoney || "0")
                      )}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex column m={1} mt={2} mr={4}>
                <Text
                  fontFamily={`'Maven Pro', sans-serif`}
                  className={styles.label}
                >
                  Doanh thu
                </Text>
                <Flex position={"relative"}>
                  <TextField
                    tabIndex={12}
                    fullWidth
                    style={{
                      paddingRight: 250,
                    }}
                    onChange={(e) => {
                      state.revenue = e.target.value;
                    }}
                    className={styles.input}
                    inputProps={{
                      type: "number",
                    }}
                  />
                  <Flex
                    width={250}
                    justifyContent={"flex-end"}
                    px={1}
                    bgcolor={"rgba(0,0,0, 0.7)"}
                    position={"absolute"}
                    right={0}
                    top={0}
                    height={"100%"}
                    centerY
                  >
                    <Text>
                      {numberFormat.format(parseFloat(state.revenue || "0"))}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              {state.type === ExportType.full && <Flex column m={1} mt={2} mr={4}>
                <Text
                  fontFamily={`'Maven Pro', sans-serif`}
                  className={styles.label}
                >
                  Tiền quỷ hôm nay (để lại két)
                </Text>
                <Flex position={"relative"}>
                  <TextField
                    tabIndex={12}
                    fullWidth
                    style={{
                      paddingRight: 250,
                    }}
                    onChange={(e) => {
                      state.todayCashMoney = e.target.value;
                    }}
                    className={styles.input}
                    inputProps={{
                      type: "number",
                    }}
                  />
                  <Flex
                    width={250}
                    justifyContent={"flex-end"}
                    px={1}
                    bgcolor={"rgba(0,0,0, 0.7)"}
                    position={"absolute"}
                    right={0}
                    top={0}
                    height={"100%"}
                    centerY
                  >
                    <Text>
                      {numberFormat.format(parseFloat(state.todayCashMoney || "0"))}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>}
              <Flex column m={1} mt={2} mr={4}>
                <Text
                  fontFamily={`'Maven Pro', sans-serif`}
                  className={styles.label}
                >
                  Chi phí khác
                </Text>
                <Flex position={"relative"}>
                  <TextField
                    tabIndex={13}
                    fullWidth
                    style={{
                      paddingRight: 250,
                    }}
                    onChange={(e) => {
                      state.otherMoney = e.target.value;
                    }}
                    className={styles.input}
                    inputProps={{
                      type: "number",
                    }}
                  />
                  <Flex
                    width={250}
                    justifyContent={"flex-end"}
                    px={1}
                    bgcolor={"rgba(0,0,0, 0.7)"}
                    position={"absolute"}
                    right={0}
                    top={0}
                    height={"100%"}
                    centerY
                  >
                    <Text>
                      {numberFormat.format(parseFloat(state.otherMoney || "0"))}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
              <Flex column m={1} mt={2} mr={4}>
                <Text
                  fontFamily={`'Maven Pro', sans-serif`}
                  className={styles.label}
                >
                  Thu nhập khác
                </Text>
                <Flex position={"relative"}>
                  <TextField
                    tabIndex={13}
                    fullWidth
                    style={{
                      paddingRight: 250,
                    }}
                    onChange={(e) => {
                      state.otherRevenue = e.target.value;
                    }}
                    className={styles.input}
                    inputProps={{
                      type: "number",
                    }}
                  />
                  <Flex
                    width={250}
                    justifyContent={"flex-end"}
                    px={1}
                    bgcolor={"rgba(0,0,0, 0.7)"}
                    position={"absolute"}
                    right={0}
                    top={0}
                    height={"100%"}
                    centerY
                  >
                    <Text>
                      {numberFormat.format(
                        parseFloat(state.otherRevenue || "0")
                      )}
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex flex={1} centerX>
              <div
                ref={componentRef}
                style={{
                  padding: ".5rem",
                  width: "21cm",
                  overflow: "hidden",
                }}
              >
                <Flex column mt={4} className={styles.printContent}>
                  <Flex width={"100%"} center>
                    <Text
                      fontFamily={`'Maven Pro', sans-serif`}
                      color="black"
                      fontSize={24}
                      fontWeight={700}
                    >{`PHIẾU KẾT TOÁN THEO CA NGÀY ${moment().format(
                      "DD/MM/YYYY"
                    )}`}</Text>
                  </Flex>
                  <Flex width={"100%"} mt={3} centerY>
                    <Flex flex={1} justifyContent="flex-end" px={1}></Flex>
                    <Flex flex={3} px={1}>
                      <Flex flex={1} center>
                        <Text
                          fontFamily={`'Maven Pro', sans-serif`}
                          color="black"
                          fontSize={22}
                        >
                          Ca sáng
                        </Text>
                      </Flex>
                      <Flex flex={1} center>
                        <Text
                          fontFamily={`'Maven Pro', sans-serif`}
                          color="black"
                          fontSize={22}
                        >
                          Cả ngày
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex width={"100%"} mt={1} centerY>
                    <Flex flex={1} justifyContent="flex-end" px={1}>
                      <Text
                        fontFamily={`'Maven Pro', sans-serif`}
                        color="black"
                        fontSize={22}
                      >
                        Tiền két:
                      </Text>
                    </Flex>
                    <Flex flex={3} px={1}>
                      <Flex flex={1} justifyContent={"flex-end"}>
                        <Text
                          fontFamily={`'Maven Pro', sans-serif`}
                          color="black"
                          fontSize={22}
                        >
                          {numberFormat.format(
                            state.type === ExportType.full
                              ? parseFloat(state.halfData?.cashBoxMoney || "0")
                              : parseFloat(cashBoxMoney || "0")
                          )}
                        </Text>
                      </Flex>
                      <Flex flex={1} justifyContent={"flex-end"}>
                        <Text
                          fontFamily={`'Maven Pro', sans-serif`}
                          color="black"
                          fontSize={22}
                        >
                          {numberFormat.format(
                            state.type === ExportType.half
                              ? 0
                              : parseFloat(cashBoxMoney || "0")
                          )}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex width={"100%"} mt={1} centerY>
                    <Flex flex={1} justifyContent="flex-end" px={1}>
                      <Text
                        fontFamily={`'Maven Pro', sans-serif`}
                        color="black"
                        fontSize={22}
                      >
                        Tiền CK:
                      </Text>
                    </Flex>
                    <Flex flex={3} px={1}>
                      <Flex flex={1} justifyContent={"flex-end"}>
                        <Text
                          fontFamily={`'Maven Pro', sans-serif`}
                          color="black"
                          fontSize={22}
                        >
                          {numberFormat.format(
                            state.type === ExportType.full
                              ? parseFloat(state.halfData.bankingMoney || "0")
                              : parseFloat(state.bankingMoney || "0")
                          )}
                        </Text>
                      </Flex>
                      <Flex flex={1} justifyContent={"flex-end"}>
                        <Text
                          fontFamily={`'Maven Pro', sans-serif`}
                          color="black"
                          fontSize={22}
                        >
                          {numberFormat.format(
                            state.type === ExportType.half
                              ? 0
                              : parseFloat(state.bankingMoney || "0")
                          )}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex width={"100%"} mt={1} centerY>
                    <Flex flex={1} justifyContent="flex-end" px={1}>
                      <Text
                        fontFamily={`'Maven Pro', sans-serif`}
                        color="black"
                        fontSize={22}
                      >
                        DT thực nhận:
                      </Text>
                    </Flex>
                    <Flex flex={3} px={1}>
                      <Flex flex={1} justifyContent={"flex-end"}>
                        <Text
                          fontFamily={`'Maven Pro', sans-serif`}
                          color="black"
                          fontSize={22}
                        >
                          {numberFormat.format(
                            state.type === ExportType.full
                              ? parseFloat(state.halfData.bankingMoney || "0")
                              : parseFloat(state.bankingMoney || "0") +
                                  parseFloat(cashBoxMoney || "0") -
                                  parseFloat(state.yesterdayMoney || "0")
                          )}
                        </Text>
                      </Flex>
                      <Flex flex={1} justifyContent={"flex-end"}>
                        <Text
                          fontFamily={`'Maven Pro', sans-serif`}
                          color="black"
                          fontSize={22}
                        >
                          {numberFormat.format(
                            state.type === ExportType.half
                              ? 0
                              : parseFloat(state.bankingMoney || "0") +
                                  parseFloat(cashBoxMoney || "0") -
                                  parseFloat(state.yesterdayMoney || "0")
                          )}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex width={"100%"} mt={1} centerY>
                    <Flex flex={1} justifyContent="flex-end" px={1}>
                      <Text
                        fontFamily={`'Maven Pro', sans-serif`}
                        color="black"
                        fontSize={22}
                      >
                        Doanh thu:
                      </Text>
                    </Flex>
                    <Flex flex={3} px={1}>
                      <Flex flex={1} justifyContent={"flex-end"}>
                        <Text
                          fontFamily={`'Maven Pro', sans-serif`}
                          color="black"
                          fontSize={22}
                        >
                          {numberFormat.format(
                            state.type === ExportType.full
                              ? parseFloat(state.halfData.revenue || "0")
                              : parseFloat(state.revenue || "0")
                          )}
                        </Text>
                      </Flex>
                      <Flex flex={1} justifyContent={"flex-end"}>
                        <Text
                          fontFamily={`'Maven Pro', sans-serif`}
                          color="black"
                          fontSize={22}
                        >
                          {numberFormat.format(
                            state.type === ExportType.half
                              ? 0
                              : parseFloat(state.revenue || "0")
                          )}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex width={"100%"} mt={1} centerY>
                    <Flex flex={1} justifyContent="flex-end" px={1}>
                      <Text
                        fontFamily={`'Maven Pro', sans-serif`}
                        color="black"
                        fontSize={22}
                      >
                        Chi phí khác:
                      </Text>
                    </Flex>
                    <Flex flex={3} px={1}>
                      <Flex flex={1} justifyContent={"flex-end"}>
                        <Text
                          fontFamily={`'Maven Pro', sans-serif`}
                          color="black"
                          fontSize={22}
                        >
                          {numberFormat.format(
                            state.type === ExportType.full
                              ? parseFloat(state.halfData.otherMoney || "0")
                              : parseFloat(state.otherMoney || "0")
                          )}
                        </Text>
                      </Flex>
                      <Flex flex={1} justifyContent={"flex-end"}>
                        <Text
                          fontFamily={`'Maven Pro', sans-serif`}
                          color="black"
                          fontSize={22}
                        >
                          {numberFormat.format(
                            state.type === ExportType.half
                              ? 0
                              : parseFloat(state.otherMoney || "0")
                          )}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex width={"100%"} mt={1} centerY>
                    <Flex flex={1} justifyContent="flex-end" px={1}>
                      <Text
                        fontFamily={`'Maven Pro', sans-serif`}
                        color="black"
                        fontSize={22}
                      >
                        Thu nhập khác:
                      </Text>
                    </Flex>
                    <Flex flex={3} px={1}>
                      <Flex flex={1} justifyContent={"flex-end"}>
                        <Text
                          fontFamily={`'Maven Pro', sans-serif`}
                          color="black"
                          fontSize={22}
                        >
                          {numberFormat.format(
                            state.type === ExportType.full
                              ? parseFloat(state.halfData.otherRevenue || "0")
                              : parseFloat(state.otherRevenue || "0")
                          )}
                        </Text>
                      </Flex>
                      <Flex flex={1} justifyContent={"flex-end"}>
                        <Text
                          fontFamily={`'Maven Pro', sans-serif`}
                          color="black"
                          fontSize={22}
                        >
                          {numberFormat.format(
                            state.type === ExportType.half
                              ? 0
                              : parseFloat(state.otherRevenue || "0")
                          )}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex width={"100%"} mt={1} centerY>
                    <Flex flex={1} justifyContent="flex-end" px={1}>
                      <Text
                        fontFamily={`'Maven Pro', sans-serif`}
                        color="black"
                        fontSize={22}
                      >
                        Lệch:
                      </Text>
                    </Flex>
                    <Flex flex={3} px={1}>
                      <Flex flex={1} justifyContent={"flex-end"}>
                        <Text
                          fontFamily={`'Maven Pro', sans-serif`}
                          color="black"
                          fontSize={22}
                        >
                          {numberFormat.format(
                            state.type === ExportType.full
                              ? parseFloat(state.halfData.bankingMoney || "0") +
                                  parseFloat(
                                    state.halfData.cashBoxMoney || "0"
                                  ) -
                                  parseFloat(
                                    state.halfData.yesterdayMoney || "0"
                                  ) +
                                  parseFloat(state.halfData.otherMoney || "0") -
                                  parseFloat(
                                    state.halfData.otherRevenue || "0"
                                  ) -
                                  parseFloat(state.halfData.revenue || "0")
                              : parseFloat(state.bankingMoney || "0") +
                                  parseFloat(cashBoxMoney || "0") -
                                  parseFloat(state.yesterdayMoney || "0") +
                                  parseFloat(state.otherMoney || "0") -
                                  parseFloat(state.otherRevenue || "0") -
                                  parseFloat(state.revenue || "0")
                          )}
                        </Text>
                      </Flex>
                      <Flex flex={1} justifyContent={"flex-end"}>
                        <Text
                          fontFamily={`'Maven Pro', sans-serif`}
                          color="black"
                          fontSize={22}
                        >
                          {numberFormat.format(
                            state.type === ExportType.half
                              ? 0
                              : parseFloat(state.bankingMoney || "0") +
                                  parseFloat(cashBoxMoney || "0") -
                                  parseFloat(state.yesterdayMoney || "0") +
                                  parseFloat(state.otherMoney || "0") -
                                  parseFloat(state.otherRevenue || "0") -
                                  parseFloat(state.revenue || "0")
                          )}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex width={"100%"} mt={1} centerY>
                    <Flex flex={1} justifyContent="flex-end" px={1}>
                      <Text
                        fontFamily={`'Maven Pro', sans-serif`}
                        color="black"
                        fontSize={22}
                      >
                        Để lại két:
                      </Text>
                    </Flex>
                    <Flex flex={3} px={1}>
                      <Flex flex={1} justifyContent={"flex-end"}>
                        <Text
                          fontFamily={`'Maven Pro', sans-serif`}
                          color="black"
                          fontSize={22}
                        >
                          {numberFormat.format(0)}
                        </Text>
                      </Flex>
                      <Flex flex={1} justifyContent={"flex-end"}>
                        <Text
                          fontFamily={`'Maven Pro', sans-serif`}
                          color="black"
                          fontSize={22}
                        >
                          {numberFormat.format(parseFloat(state.todayCashMoney || "0"))}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex width={"100%"} ml={2} mt={4} mb={4} column>
                    <Text
                      fontFamily={`'Maven Pro', sans-serif`}
                      color="black"
                      fontSize={22}
                    >
                      Ghi chú:
                    </Text>
                    <TextareaAutosize
                      minRows={3}
                      style={{
                        fontSize: 22,
                        background: "rgba(255,255,255, 0.3)",
                        padding: "0.5rem",
                        width: "20cm",
                      }}
                      onChange={(e) => {
                        state.note = e.target.value;
                      }}
                    />
                  </Flex>
                  <Flex width={"100%"} ml={2} mt={4} mb={4}>
                    <Flex column centerX>
                      <Text
                        fontFamily={`'Maven Pro', sans-serif`}
                        color="black"
                        fontSize={22}
                        textAlign={"center"}
                      >
                        Quản lý
                      </Text>
                      <Text
                        fontFamily={`'Maven Pro', sans-serif`}
                        color="black"
                        fontSize={22}
                      >
                        (Ký và ghi rõ họ tên)
                      </Text>
                      <Flex
                        mt={15}
                        style={{ borderBottom: "dashed 1px black" }}
                      ></Flex>
                    </Flex>
                    <Flex column ml={15} centerX>
                      <Text
                        fontFamily={`'Maven Pro', sans-serif`}
                        color="black"
                        fontSize={22}
                        textAlign={"center"}
                      >
                        Nhân viên
                      </Text>
                      <Text
                        fontFamily={`'Maven Pro', sans-serif`}
                        color="black"
                        fontSize={22}
                      >
                        (Ký và ghi rõ họ tên)
                      </Text>
                      <Flex
                        mt={15}
                        style={{ borderBottom: "dashed 1px black" }}
                      ></Flex>
                    </Flex>
                  </Flex>
                </Flex>
              </div>
            </Flex>
            <ReactToPrint
              trigger={() => (
                <button id="print-btn" style={{ display: "none" }}>
                  Print this out!
                </button>
              )}
              content={() => componentRef.current}
            />
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}

const useStyles = makeStyles((theme: AppTheme) => createStyles({
  root: {

  },
  leftPanel: {
    borderRight: Colors.borderDark
  },
  label: {

  },
  input: {

  },
  actionsBar: {

  },
  printContent: {
    backgroundImage: "url(/images/pimart.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  }
}))

export default observer(DailyAccounting)