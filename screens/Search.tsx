import React, { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesApi, tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loading";

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 40px;
`;

const Search = () => {
  const [query, setQuery] = useState("");
  const {
    isLoading: isMovieLoading,
    data: movieData,
    refetch: searchMovie,
  } = useQuery(["searchMovies", query], moviesApi.search, {
    enabled: false,
  });
  const {
    isLoading: isTvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvApi.search, {
    enabled: false,
  });
  const onChangeText = (text: string) => {
    setQuery(text);
  };
  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovie();
    searchTv();
  };
  return (
    <Container>
      <SearchBar
        placeholder="Search for Movie or TV Show"
        placeholderTextColor="grey"
        returnKeyType="search"
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
      ></SearchBar>
      {isMovieLoading || isTvLoading ? <Loader /> : null}
      {movieData ? (
        <HList title="Movie Results" data={movieData.results} />
      ) : null}
      {tvData ? <HList title="Tv Results" data={tvData.results} /> : null}
    </Container>
  );
};

export default Search;
