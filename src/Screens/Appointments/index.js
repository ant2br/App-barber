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
import BackIcon from '../../assets/back.svg';

import {RefreshControl} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import AppointmentItem from '../../Components/AppointmentsItem';

export default () => {
  const navigation = useNavigation();

const lista = [];

lista.push({
  id: 1,
  datetime: '2020-06-01T00:00:00.000Z',
  barber: {
    id: 1,
    name: 'José',
    avatar: 'https://i.pravatar.cc/300?img=4',
    stars: 4.5,
    latitude: "-23.56489",
    longitude: "-46.63327",
  },
  service: {
    id: 1,
    id_barber: 1,
    name: 'Corte de cabelo',
    price: '50,00',
  },
  }
)


const handleBackButton = () => {
  navigation.goBack();
}


  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    getAppointments()
  },[])

  const getAppointments = async () => {
    setLoading(true);
    setList([]);
    // let res = await Api.getFavorites();
    // if(res.error == ''){
    //   setList(res.list)
    // } else {
    //   alert("Erro: " + res.error)
    // }
    setList(lista)
    setLoading(false);
  };

  return (
    <Container>
      <HeaderArea>
          <HeaderTitle>Agendamentos</HeaderTitle>
        </HeaderArea>

      <Scroller refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getAppointments}/>
      }>
        {!loading && list.length === 0 &&
        <HeaderTitle>Não há agendamentos. </HeaderTitle>}
        <ListArea>
          {list.map((item, k) => (
            <AppointmentItem data={item} key={k} />
          ))}
        </ListArea>
      </Scroller>
      <BackButton onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFFFFF"/>
            </BackButton>
    </Container>
  );
};