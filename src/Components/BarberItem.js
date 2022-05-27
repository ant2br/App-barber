import React from "react";
import styled from "styled-components/native";

import Stars from '../Components/Stars';

import { useNavigation } from "@react-navigation/native"; 

const Area = styled.TouchableOpacity`
background-color: #FFFFFF;
margin-bottom: 20px;
border-radius: 20px;
padding: 15px;
flex-direction: row;
`;

const Avatar = styled.Image`
width: 88px;
height: 88px;
border-radius: 20px;
`;

const InfoArea = styled.View`
margin-left: 20px;
justify-content: space-between;

`;

const UserName = styled.Text`
font-size: 18px;
font-weight: bold;
color: #333333;
`;

const SeeProfileButton = styled.TouchableOpacity`
width: 85px;
height: 26px;
border: 1px solid #4EADBE;
border-radius: 10px;
justify-content: center;
align-items: center;
`;

const SeeProfileText = styled.Text`
font-size: 13px;
color: #268596;
`;

export default ({data}) => {
    const navigation = useNavigation();

    const handleClick = () => {
        navigation.navigate('Barber', {
            id: data.id,
            avatar: data.avatar,
            name: data.name,
            stars: data.stars,
        });
    }
    return (
        <Area onPress={handleClick}>
            <Avatar source={{uri: data.avatar}}/>
            <InfoArea>
                <UserName>{data.name}</UserName>

                <Stars stars={data.stars} showNumber={true}/>
                <SeeProfileButton>
                    <SeeProfileText>Ver perfil</SeeProfileText>
                </SeeProfileButton>
            </InfoArea>
        </Area>
    )
}