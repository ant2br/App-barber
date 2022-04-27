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
import {CommonActions, useNavigation} from '@react-navigation/native';
import SignInput from '../../Components/SignInput';
import BarberLogo from '../../assets/barber.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import PersonIcon from '../../assets/person.svg';

export default () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');

  const handleMessageButtonClick = () => {
    navigation.reset({routes: [{name: 'SignIn'}]});
  };

  const handleSignUp = async () => {
    if (email === '' || password === '' || nome === '') {
      alert('Preencha todos os campos');
      return;
    } else {
      const retorno = await Api.SignUp(email, password, nome);
      if (retorno.token) {
        navigation.reset({routes: [{name: 'SignIn'}]});
      } else {
        alert('ocorreu um erro');
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
          IconSvg={PersonIcon}
          placeHolder="Digite seu nome"
          value={nome}
          onChangeText={t => setNome(t)}
        />

        <SignInput
          IconSvg={LockIcon}
          placeHolder="Digite sua senha"
          value={password}
          onChangeText={t => setPassword(t)}
          password={true}
        />

        <CustomButton onPress={handleSignUp}>
          <CustomButtonText>CADASTRAR</CustomButtonText>
        </CustomButton>
      </InputArea>

      <SignMessageButton onPress={handleMessageButtonClick}>
        <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
        <SignMessageButtonTextBold>Faça login</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};
