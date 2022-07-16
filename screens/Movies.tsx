import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  useColorScheme,
} from "react-native";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BlurView } from "expo-blur";
import Swiper from "react-native-swiper";
import { makeImgPath } from "../utils";

const API_KEY = "7539a2083cc4f7d9dc5e72dc2d0091e4";

const Container = styled.ScrollView``;

const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const Overview = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  margin-top: 10px;
`;

const Votes = styled(Overview)`
  margin-top: 5px;
  font-size: 12px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  const isDark = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const getNowPlaying = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
    const { results } = await response.json();
    setNowPlayingMovies(results);
    setLoading(false);
  };
  useEffect(() => {
    getNowPlaying();
  }, []);
  return loading ? (
    <Loader>
      <ActivityIndicator></ActivityIndicator>
    </Loader>
  ) : (
    <Container>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={4}
        showsButtons={false}
        showsPagination={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlayingMovies.map((movie) => (
          <View key={movie.id}>
            <BgImg
              style={StyleSheet.absoluteFill}
              source={{ uri: makeImgPath(movie.backdrop_path) }}
            ></BgImg>
            <BlurView
              tint={isDark ? "dark" : "light"}
              intensity={80}
              style={StyleSheet.absoluteFill}
            >
              <Wrapper>
                <Poster
                  source={{ uri: makeImgPath(movie.poster_path) }}
                ></Poster>
                <Column>
                  <Title>{movie.original_title}</Title>
                  <Overview>{movie.overview.slice(0, 80)}...</Overview>
                  {movie.vote_average > 0 ? (
                    <Votes>⭐️{movie.vote_average}/10</Votes>
                  ) : null}
                </Column>
              </Wrapper>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
