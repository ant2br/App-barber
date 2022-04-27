import React, {useEffect} from 'react';
import {Container, LoadingIcon} from './styles';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import Api from '../../Api';

import BarberLogo from '../../assets/barber.svg';

export default () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('@Barber:token');

      if (token) {
        const retorno = await Api.checkToken(token);
        if(retorno === true){
          navigation.reset({routes: [{name: 'Dashboard'}]});
        } else {
          AsyncStorage.removeItem('@Barber:token');
          AsyncStorage.removeItem('@Barber:user');

          navigation.reset({routes: [{name: 'SignIn'}]});
        }
        
      } else {
        navigation.reset({
          routes: [{name: 'SignIn'}],
        });
      }
    };
    checkToken();
  }, []);

  return (
    <Container>
      <BarberLogo width="100%" height="160" />
      <LoadingIcon size="large" color="#FFFFFF" />
    </Container>
  );
};
