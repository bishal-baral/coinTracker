import React, { useState, useEffect } from "react";
import { NEWS_API_KEY } from "@env";
import { Card, Title, Paragraph } from "react-native-paper";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import axios from "axios";

const SPACING = 20;
const AVATAR_SIZE = 48;

const News = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    try {
      getArticles();
    } catch (error) {
      console.error(error);
      setError(true);
    }
  }, []);

  function getArticles() {
    axios
      .get(
        "https://newsapi.org/v2/everything?q=Cryptocurrency&from=2021-11-15&sortBy=popularity&apiKey=" +
          NEWS_API_KEY
      )
      .then((response) =>
        response.data.articles.map((article) => ({
          date: `${article.publishedAt}`,
          title: `${article.title}`,
          url: `${article.url}`,
          description: `${article.description}`,
          urlToImage: `${article.urlToImage}`,
        }))
      )
      .then((articles) => {
        setArticles(articles);
      })
      .catch((error) => {
        console.error("Axios GET request failed");
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {articles.map((article) => {
          const { date, title, url, description, urlToImage } = article;
          return (
            <Card
              key={url}
              style={{
                marginTop: 10,
                borderColor: "black",
                borderRadius: 5,
                borderBottomWidth: 1,
                padding: 5
              }}
              onPress={() => {
                Linking.openURL(`${url}`);
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View
                  style={{
                    justifyContent: "space-around",
                    flex: 1,
                    margin: 10,
                  }}
                >
                  <Title>{title}</Title>
                </View>

                <View style={{flex:1/3}}>
                            <Image style={{width:120, height:120}} source={{uri: urlToImage}} />
                        </View>  
              </View>
              <View style={{ margin: 10 }}>
                <Paragraph >{description}</Paragraph>
                <Text>{date}</Text>
              </View>
            </Card>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default News;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: SPACING * 8,
  },
  itemBGImage: {
    ...StyleSheet.absoluteFillObject,
  },
  NewsBox: {
    marginBottom: SPACING / 2,
  },
  text: {
    fontSize: 20,
    color: "#101010",
    marginTop: 60,
    fontWeight: "700",
  },
  listItem: {
    marginBottom: SPACING / 2,
    paddingVertical: SPACING,
    paddingHorizontal: SPACING,
    backgroundColor: "#fff",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    elevation: 3,
  },
  coverImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
  },
  metaInfo: {
    flexDirection: "row",
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    padding: 10,
    fontWeight: "700",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#939699",
    fontWeight: "400",
  },
});