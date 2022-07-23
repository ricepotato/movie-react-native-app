import React from "react";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import VMedia from "./VMedia";

interface HListProps {
  title: string;
  data: any[];
}

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 20px;
`;

export const HListSeperator = styled.View`
  width: 20px;
`;

const HList: React.FC<HListProps> = ({ title, data }) => (
  <ListContainer>
    <ListTitle>{title}</ListTitle>
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={data}
      contentContainerStyle={{ paddingHorizontal: 30 }}
      ItemSeparatorComponent={HListSeperator}
      keyExtractor={(item) => item.id + ""}
      renderItem={({ item }) => (
        <VMedia
          posterPath={item.poster_path}
          voteAverage={item.vote_average}
          originalTitle={item.original_title || item.original_name}
        />
      )}
    ></FlatList>
  </ListContainer>
);

export default HList;
