import React, {useEffect, useState} from 'react';
import {
  Container,
  HeaderArea,
  HeaderTitle,
  Scroller,
  LoadingIcon,
  ListArea,
  EmptyWarning,
  BackButton
} from './styles';
import {RefreshControl} from 'react-native'
import BarberItem from '../../Components/BarberItem';
import BackIcon from '../../assets/back.svg';
import { useNavigation } from '@react-navigation/native';

export default () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation();

  const data = []

    data.push({
      id: 1,
      name: 'Luiza',
      avatar: 'https://i.pravatar.cc/300?img=1',
      stars: 3.5
    });
    
  


  useEffect(()=>{
    getFavorites()
  },[])

  const handleBackButton = () => {
    navigation.goBack();
  }

  const getFavorites = async () => {
    setLoading(true);
    setList([]);
    // let res = await Api.getFavorites();
    // if(res.error == ''){
    //   setList(res.list)
    // } else {
    //   alert("Erro: " + res.error)
    // }

    setList(data)
    setLoading(false);
  };

  return (
    <Container>
        <HeaderArea>
          <HeaderTitle>Favoritos</HeaderTitle>
        </HeaderArea>
      <Scroller refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getFavorites}/>
      }>
        {!loading && list.length === 0 &&
        <HeaderTitle>Você não escolheu nenhum barbeiro(s) como favorito(s). </HeaderTitle>}
        <ListArea>
          {list.map((item, k) => (
            <BarberItem data={item} key={k} />
          ))}
        </ListArea>
      </Scroller>

      <BackButton onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFFFFF"/>
            </BackButton>
    </Container>
  );
};