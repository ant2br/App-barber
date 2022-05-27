import React from 'react';
import {Container,  AvatarIcon,
  UserName,
  UserEmail,
  ButtonSignOut,
  ButtonSignOutText} from './styles';

export default () => {
  const handleLogoutClick = async () => {
    //await Api.logout();
    navigation.reset({
        routes:[{name: 'SignIn'}]
    })
}

  return (
      <Container>
            <UserName>Brener</UserName>
            <UserEmail>brener@gmail.com</UserEmail>
            <AvatarIcon source={{uri: 'https://i.pravatar.cc/300?img=5'}} />
            <ButtonSignOut onPress={handleLogoutClick}>
                    <ButtonSignOutText>SAIR</ButtonSignOutText>
                </ButtonSignOut>
        </Container>
  );
};
