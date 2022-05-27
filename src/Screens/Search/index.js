import React,{useState} from 'react';
import {
  Container,
  SearchArea,
  SearchInput,
  Scroller,
  LoadingIcon,
  ListArea,
  EmptyWarning,
  BackButton
} from './styles';
import { useNavigation } from '@react-navigation/native';
import BarberItem from '../../Components/BarberItem';
import BackIcon from '../../assets/back.svg';

export default () => {
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [emptyList, setEmptyList] = useState(false);
  const navigation = useNavigation();

  const data = []

    data.push({
      id: 1,
      name: 'Barber 1',
      avatar: 'https://i.pravatar.cc/300?img=1',
      stars: 3.5
    });

    const handleBackButton = () => {
      navigation.goBack();
    }


  const searchBarbers = async () => {
    setEmptyList(false);
    setLoading(true);
    setList([]);

    // if (searchText != '') {
    //   let res = await Api.search(searchText);

    //   if (res.error == '') {
    //     if (res.list.length > 0) {
    //       setList(res.list);
    //     } else {
    //       setEmptyList(true);
    //     }
    //   } else {
    //     alert('Error: ' + res.error);
    //   }
    // }
    setList(data)
    setLoading(false);
  };
  return (
    <Container>
            <SearchArea>
        <SearchInput
          placeholder="Digite o nome do barbeiro"
          placeholderTextColor="#FFFFFF"
          value={searchText}
          onChangeText={(t) => setSearchText(t)}
          onEndEditing={searchBarbers}
          returnKeyType="search"
          autofocus
          selectTextOnFocus
        />
      </SearchArea>
      <Scroller>
        {loading && <LoadingIcon size="large" color="#000000" />}
        {emptyList && (
          <EmptyWarning>
            "{searchText}" não encontrado(a)
          </EmptyWarning>
        )}
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
