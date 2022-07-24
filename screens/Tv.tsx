import React, { useState } from "react";

import { RefreshControl, ScrollView } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import HList from "../components/HList";
import Loader from "../components/Loading";

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: todayRefetching,
  } = useQuery(["tv", "today"], tvApi.airingToday);
  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: topRefetching,
  } = useQuery(["tv", "top"], tvApi.topRated);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: trendingRefetching,
  } = useQuery(["tv", "trending"], tvApi.trending);

  const loading = todayLoading || topLoading || trendingLoading;
  if (loading) {
    return <Loader></Loader>;
  }
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        ></RefreshControl>
      }
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      <HList title="Trending TV" data={todayData.results} />
      <HList title="Airing Today" data={trendingData.results} />
      <HList title="Top Rated TV" data={topData.results} />
    </ScrollView>
  );
};

export default Tv;
