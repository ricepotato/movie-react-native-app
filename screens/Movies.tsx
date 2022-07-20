import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  useColorScheme,
} from "react-native";
import styled from "styled-components/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Swiper from "react-native-swiper";
import Slide from "../components/Slide";
import Poster from "../components/Poster";

const API_KEY = "7539a2083cc4f7d9dc5e72dc2d0091e4";

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const TrandingStyle = styled.ScrollView`
  margin-top: 20px;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = ({
  navigation: { navigate },
}) => {
  const isDark = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getNowPlaying = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
    const { results } = await response.json();
    setNowPlayingMovies(results);
  };
  const getUpcoming = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    );
    const { results } = await response.json();
    setUpcoming(results);
  };
  const getTranding = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
    );
    const { results } = await response.json();
    setTrending(results);
  };
  const getData = async () => {
    await Promise.all([getTranding(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };
  useEffect(() => {
    getData();
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
        containerStyle={{
          width: "100%",
          height: SCREEN_HEIGHT / 4,
          marginBottom: 30,
        }}
      >
        {nowPlayingMovies.map((movie) => (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            originalTitle={movie.original_title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
          ></Slide>
        ))}
      </Swiper>
      <ListTitle>Tranding Movies</ListTitle>
      <TrandingStyle
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingLeft: 30 }}
      >
        {trending.map((movie) => (
          <Movie key={movie.id}>
            <Poster path={movie.poster_path}></Poster>
            <Title>
              {movie.original_title.slice(0, 13)}
              {movie.original_title.length > 13 ? "..." : ""}
            </Title>
            <Votes>⭐️ {movie.vote_average}/10</Votes>
          </Movie>
        ))}
      </TrandingStyle>
    </Container>
  );
};

export default Movies;
