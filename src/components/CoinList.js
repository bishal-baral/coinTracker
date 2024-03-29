import React, { useRef, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { COINGECKO_URL } from "@env";
import {
  Image,
  Animated,
  Text,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import Badge from './Badge';

const SPACING = 10;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CoinList = ({ navigation, order }) => {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCrypto();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    setError(false);
    setLoading(true);
    try {
      fetchCrypto();
    } catch (error) {
      console.error(error);
      setError(true);
    }
    setLoading(false);
  }, [page]);

  const fetchCrypto = async () => {
    const perPage = 25;
    const urlParams = `vs_currency=usd&order=${order}&per_page=${perPage}&page=${page}&sparkline=false`;
    const baseUrl = `${COINGECKO_URL}/api/v3/coins/markets?${urlParams}`;

    axios
      .get(baseUrl)
      .then((res) => {
        if (page > 1) {
          setCoins([...coins, ...res.data]);
        } else {
          setCoins(res.data);
        }
      })
      .catch((error) => {
        console.error("Axios GET request failed");
      });
  };

  const scrollY = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }) => {
    const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1.6)];
    const opacityInputRange = [
      -1,
      0,
      ITEM_SIZE * index,
      ITEM_SIZE * (index + 1.2),
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });

    const opacity = scrollY.interpolate({
      inputRange: opacityInputRange,
      outputRange: [1, 1, 1, 0],
    });

    const numberFormat = (num) => {
      return num.toString().replace(/^[+-]?\d+/, (int) => {
        return int.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
      });
    };

    const percentageFormat = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    const renderPriceChange = (num) => {
      return (
        <Text style={num > 0 ? styles.rise : styles.drop}>
          <AntDesign
            name={num > 0 ? 'caretup' : 'caretdown'}
            color={num > 0 ? '#3E64FF' : '#fb2c33'}
            size={10}
          />{' '}
          {percentageFormat(item.price_change_percentage_24h)}%
        </Text>
      );
    };

    const anim = {
      transform: [{ scale }],
      opacity,
    };

    return (
      <AnimatedPressable
        style={[styles.cardList, anim]}
        onPress={() => navigation.navigate("trends", { itemId: `${item.id}` })}
      >
        <Image style={styles.itemImage} source={{ uri: item.image }} />
        <View style={styles.wrapper}>
          <View style={styles.coinText}>
            <Text
              style={styles.baseText}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {item.name}
            </Text>
            <Badge value={item.symbol} />
          </View>
          <Text style={styles.itemVolume}>
            &#36;{numberFormat(item.total_volume || 0)}
          </Text>
          <View style={styles.combo}>
            <Text style={styles.itemPrice}>
              &#36;{numberFormat(item.current_price || 0)}
            </Text>
            {renderPriceChange(item.price_change_percentage_24h)}
          </View>
        </View>
      </AnimatedPressable>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="#3E64FF"
          />
        ) : null}
      </View>
    );
  };

  const fetchMore = () => {
    setPage(page + 1);
    setLoading(true);
  };

  return (
    <Animated.FlatList
      data={coins}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      ListFooterComponent={renderFooter}
      onEndReachedThreshold={0.5}
      onEndReached={fetchMore}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default React.memo(CoinList);

const styles = StyleSheet.create({
  cardList: {
    flexDirection: "row",
    padding: SPACING,
    marginBottom: SPACING,

    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 3,
    backgroundColor: "#fff",
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 30,
  },
  wrapper: {
    flex: 1,
    marginRight: SPACING,
  },
  itemPrice: {
    fontSize: 16,
    opacity: 0.7,
  },
  itemVolume: {
    fontSize: 14,
    color: "grey",
  },
  coinText: {
    flexDirection: "row",
    alignItems: "center",
    height: "auto",
    marginRight: SPACING * 2,
  },
  baseText: {
    fontSize: 22,
    fontWeight: "700",
    marginRight: 10,
  },
  innerText: {
    fontSize: 18,
    color: "#9fa6ad",
    fontWeight: "normal",
    textTransform: "uppercase",
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loader: {
    padding: SPACING / 2,
    justifyContent: "space-around",
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  },
  combo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rise: {
    color: "green",
    fontSize: 16,
  },
  drop: {
    color: "#fb2c33",
    fontSize: 16,
  },
});