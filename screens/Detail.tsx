import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import { Movie, TV } from "../api";
import { BLACK_COLOR } from "../colors";
import Poster from "../components/Poster";
import { makeImgPath } from "../utils";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: white;
  font-size: 36px;
  align-self: flex-end;
  width: 80%;
  margin-left: 15px;
  font-weight: 500;
`;

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;

const OverView = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
  padding: 0px 20px;
`;

type RootStackParamList = {
  Detail: Movie | TV;
};

type DefatilScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0px 20px;
`;
const Background = styled.Image``;

const Detail: React.FC<DefatilScreenProps> = ({
  navigation,
  route: { params },
}) => {
  const goBack = () => navigation.goBack();
  useEffect(() => {
    navigation.setOptions({
      title:
        "original_title" in params
          ? params.original_title
          : params.original_name,
    });
  }, []);
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || "") }}
        ></Background>
        <LinearGradient
          colors={["transparent", BLACK_COLOR]}
          style={StyleSheet.absoluteFill}
        ></LinearGradient>
        <Column>
          <Poster path={params.poster_path || ""}></Poster>
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <OverView>{params.overview}</OverView>
    </Container>
  );
};

export default Detail;
