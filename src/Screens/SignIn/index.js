import React, {useState} from 'react';
import {
  Container,
  InputArea,
  CustomButton,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './styles';
import Api from '../../Api';

import {CommonActions, useNavigation} from '@react-navigation/native';
import SignInput from '../../Components/SignInput';
import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';

export default () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleMessageButtonClick = () => {
    navigation.reset({routes: [{name: 'SingUp'}]});
  };

  const handleSignIn = async () => {
    if (email === '' || password === '') {
      alert('Preencha todos os campos');
      return;
    } else {
      //const retorno = await Api.SignIn(email, password);
      if (true) {
        navigation.reset({routes: [{name: 'MainTab'}]});
      } else {
        alert('Usuário ou senha incorretos');
      }
    }
  };

  return (
    <Container>
      <BarberLogo width="100%" height="160" />

      <InputArea>
        <SignInput
          IconSvg={EmailIcon}
          placeHolder="Digite seu E-Mail"
          value={email}
          onChangeText={t => setEmail(t)}
        />

        <SignInput
          IconSvg={LockIcon}
          placeHolder="Digite sua senha"
          value={password}
          onChangeText={t => setPassword(t)}
          password={true}
        />

        <CustomButton onPress={handleSignIn}>
          <CustomButtonText>LOGIN</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>
          Ainda não possui uma conta?
        </SignMessageButtonText>
        <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};
