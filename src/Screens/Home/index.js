import React,{useState, useEffect} from 'react';
import { Text } from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import {Platform, RefreshControl} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { Container, Scroller, HeaderArea, HeaderTitle, SearchButton,LocationArea, LocationInput, LocationFinder, LoadingIcon, ListArea } from '../Home/styles';
import SearchIcon from '../../assets/search.svg';
import MyLocationIcon from '../../assets/my_location.svg';
import BarberItem from '../../Components/BarberItem';
import { useNavigation } from '@react-navigation/native';
function App() {
  const navigation = useNavigation();

  const [location, setLocation] = useState('');

  const [coords, setCoords] = useState(null);
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(false);
    console.log("baaaaa")
    getBarbers();

  };



  const handleLocationFinder = async () => {
    setCoords(null)
    let result = await request(
      Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    )
    if(result === 'granted'){
      setLoading(true)
      setLocation('');
      setList([]);

      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          setCoords(position.coords)
          getBarbers();
        },
        (error) => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
      );
    }

  }

  const getBarbers = async () => {
    // const response = await fetch(`https://us-central1-barbershop-app-c3b3f.cloudfunctions.net/app/api/barbers/${coords.latitude}/${coords.longitude}`);
    // const data = await response.json();
    setList([]);
    setLoading(true);

    const data = []

    data.push({
      id: 1,
      name: 'Luiza',
      avatar: 'https://i.pravatar.cc/300?img=1',
      stars: 3.5
    },{
      id: 2,
      name: 'Camila',
      avatar: 'https://i.pravatar.cc/300?img=2',
      stars: 4
    },{
      id: 3,
      name: 'Roberto',
      avatar: 'https://i.pravatar.cc/300?img=3',
      stars: 2
    }
    ,{
      id: 4,
      name: 'José',
      avatar: 'https://i.pravatar.cc/300?img=4',
      stars: 1.5
    });
    
    setList(data);
    console.log(data)
    setLoading(false);

    
  }

  useEffect(()=>{
    getBarbers()
  },[])

  const handleSearch = () => {
    navigation.navigate('Search');
  }
  return(
    <Container>
      <Scroller refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>

        <HeaderArea>
          <HeaderTitle numberOfLines={2}>Encontre o seu barbeiro favorito </HeaderTitle>
          <SearchButton onPress={handleSearch}>
            <SearchIcon width="26" height="26" fill="#FFFFFF"/>
          </SearchButton>
        </HeaderArea>

        <LocationArea>
          <LocationInput value={location} onChangeText={t=>setLocation(t)} placeholder="Onde você está?" placeholderTextColor="#FFFFFF" />
          <LocationFinder onPress={handleLocationFinder}>
            <MyLocationIcon width="24" height="24" fill="#FFFFFF"/>
          </LocationFinder>
        </LocationArea>
        {loading && <LoadingIcon size="large" color="#FFF" />}



        <ListArea>
          {list.map((item, k) =>(
            <BarberItem key={k} data={item} />
          ))
            }
        </ListArea>


      </Scroller>
    </Container>

    );
}
export default App;

