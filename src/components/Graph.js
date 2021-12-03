import React from "react";
import PropTypes from "prop-types";
import {
  View,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import { LineChart, YAxis, XAxis } from "react-native-svg-charts";
import { COINGECKO_URL } from "@env";
import useRequest from "./hooks";
import { useTheme } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

const Graph = ({ coinId, selectedIndex }) => {
  const { colors } = useTheme();
  const handleUrlParams = (selectedIndex) => {
    switch (selectedIndex) {
      case 0:
        return `vs_currency=eur&days=1&interval=hourly`;
      case 1:
        return `vs_currency=eur&days=7&interval=daily`;
      case 2:
        return `vs_currency=eur&days=30&interval=daily`;
      default:
        return `vs_currency=eur&days=30&interval=daily`;
    }
  };

  const urlParams = handleUrlParams(selectedIndex);
  const baseUrl = `${COINGECKO_URL}/api/v3/coins/${coinId}/market_chart?${urlParams}`;

  const { data, loading } = useRequest(baseUrl);

  const contentInset = { top: 30, bottom: 30 };
  const labelsY = { fill: colors.tertiary, fontSize: 10 };
  const labelsX = { fill: colors.tertiary, fontSize: 10, originY: 30, y: 5 };

  const formatCash = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
    if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
  };

  const renderChart = () => {
    return (
      <SafeAreaView style={styles.wrapper}>
        <YAxis
          data={data}
          contentInset={contentInset}
          svg={labelsY}
          formatLabel={(value) => `${formatCash(value)}`}
        />
        <View style={styles.container}>
          <LineChart
            style={styles.main}
            data={data}
            svg={{ stroke: "rgb(134, 65, 244)" }}
          >
            {/* <Grid /> */}
          </LineChart>
          <XAxis
            style={styles.xAxis}
            data={data}
            contentInset={{ left: 30, right: 30 }}
            numberOfTicks={14}
            svg={labelsX}
          />
        </View>
      </SafeAreaView>
    );
  };

  return loading ? (
    <ActivityIndicator style={styles.loader} size="large" color="#3E64FF" />
  ) : (
    renderChart()
  );
};

Graph.propTypes = {
  coinId: PropTypes.string,
  days: PropTypes.number,
  selectedIndex: PropTypes.oneOf([0, 1, 2]),
};

export default React.memo(Graph);

const styles = StyleSheet.create({
  wrapper: {
    height: height / 2 + 60,
    flexDirection: "row",
    padding: 20,
  },
  container: {
    flexDirection: "column",
    paddingLeft: 10,
  },
  main: {
    height: height / 2,
    width: width - 80,
  },
  xAxis: {
    marginHorizontal: -15,
    marginTop: 10,
    height: 20,
  },
  loader: {
    justifyContent: "space-around",
    height: height / 2 + 60,
    width: width - 80,
  },
});
