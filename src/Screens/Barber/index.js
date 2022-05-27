import React, {useState, useEffect} from 'react';
import { Container,
         Scroller,
         FakeSwiper,
         PageBody,
         UserInfoArea,
         ServiceArea,
         TestimonialArea,
         SwipeDot,
         SwipeDotActive,
         SwipeItem,
         SwipeImage,
         UserAvatar,
         UserInfo,
         UserInfoName,
         UserFavButton,
         BackButton,
         LoadingIcon,
         ServiceItem,
         ServiceInfo,
         ServiceName,
         ServicePrice,
         ServiceChooseButton,
         ServiceChooseButtonText,
         ServicesTitle,

         TestimonialItem,
         TestimonialInfo,
         TestimonialName,
         TestimonialBody
} from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import Api from '../../Api';
import Swiper from 'react-native-swiper';
import Stars from '../../Components/Stars';
import BarberModal from '../../Components/BarberModal';
import FavoriteIcon from '../../assets/favorite.svg';
import BackIcon from '../../assets/back.svg';
import NavPrevIcon from '../../assets/nav_prev.svg';
import NavNextIcon from '../../assets/nav_next.svg';
import FavoriteFull from '../../assets/favorite_full.svg';



export default () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars,
    });
    const [loading, setLoading] = useState(false);
    const [favorited, setFavorited] = useState(false);

    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const getBarberInfo = async () => {
            setLoading(true);
           // let json = await Api.getBarber()

           var service = []
           var testimonials = []
           var availability = []
           var hours = []

           hours.push('10:00', '12:00', '13:00', '15:00', '17:00', '19:00', '21:00')


           availability.push({date: "2022-05-26", hours: hours})
           


           service.push({name: "Corte de cabelo", price: "50,00"}, {name: "Corte de cabelo fem", price: "50,00"})
           testimonials.push({name: "Brener", body: "Oi, tudo bem? Estou aqui para te ajudar. Tenho um problema de cabelo e preciso de um corte. O que vocês conseguem fazer?", rate: 4}, {name: "Lucas", body: "Oi, tudo bem? Estou aqui para te ajudar. Tenho um problema de cabelo e preciso de um corte. O que vocês conseguem fazer?", rate: 5})

           var barber = {name: "Barbeiro", avatar: "https://i.pravatar.cc/300?img=1", stars: 3.5, id: 4, photos: ['https://i.pravatar.cc/300?img=1', 'https://i.pravatar.cc/300?img=2', 'https://i.pravatar.cc/300?img=3'], services: service, testimonials: testimonials, available: availability};
           setUserInfo(barber);
           setFavorited(true)

           setLoading(false);

        }
        getBarberInfo();
    },[])

    const handleBackButton = () => {
        navigation.goBack();
    }

    const handleFavClick = () => {
        setFavorited(!favorited);
    }

    const handleServiceChoose = (id) => {
        setSelectedService(id);
        setShowModal(true);
    }
    
    return (
        <Container>
            <Scroller>
                {userInfo.photos && userInfo.photos.length > 0 ?
                <Swiper
                style={{height: 240}}
                dot={<SwipeDot />}
                activeDot={<SwipeDotActive />}
                paginationStyle={{top: 15, right: 15, bottom: null, left: null}}
                autoPlay={true}
                >
                    {userInfo.photos.map((item, key) => (
                        <SwipeItem key={key}>
                            <SwipeImage source={{uri: item.url}} resizeMode="cover" />
                        </SwipeItem>
                    ))}
                </Swiper> 
                :
                <FakeSwiper>

                </FakeSwiper>   
            }    
                <PageBody>
                    <UserInfoArea>
                        <UserAvatar source={{uri: userInfo.avatar}} />
                        <UserInfo>
                            <UserInfoName>{userInfo.name}</UserInfoName>
                            <Stars stars={userInfo.stars} showNumber={true}/>
                        </UserInfo>
                        <UserFavButton onPress={handleFavClick}>
                            {favorited ? <FavoriteFull width="24" height="24" fill="#FF0000" /> : <FavoriteIcon width="24" height="24" fill="#FF0000"/>
                            }
                        </UserFavButton>
                    </UserInfoArea>

                    {loading && 
                        <LoadingIcon size="large" color="#000000" />
                    }
                    <ServiceArea>
                        <ServicesTitle>Lista de serviços</ServicesTitle>

                        {userInfo.services && userInfo.services.map((item, key) => (
                            <ServiceItem key={key}>
                                <ServiceInfo>
                                    <ServiceName>{item.name}</ServiceName>
                                    <ServicePrice>R$ {item.price}</ServicePrice>
                                </ServiceInfo>
                                <ServiceChooseButton onPress={()=>handleServiceChoose(key)}>
                                    <ServiceChooseButtonText>Agendar</ServiceChooseButtonText>
                                </ServiceChooseButton>
                            </ServiceItem>
                        ))}

                    </ServiceArea>

                    {userInfo.testimonials && userInfo.testimonials.length > 0 &&
                        <TestimonialArea>

                            <Swiper
                            style={{height: 110}}
                            showsPagination={false}
                            showsButtons={true}
                            prevButton={<NavPrevIcon width="35" height="35" fill="#000000"/>}
                            nextButton={<NavNextIcon width="35" height="35" fill="#000000"/>}
                            >
                                {userInfo.testimonials.map((item, key) => (
                                    <TestimonialItem key={key}>
                                        <TestimonialInfo>
                                            <TestimonialName>{item.name}</TestimonialName>
                                            <Stars stars={item.rate} showNumber={false}/>
                                        </TestimonialInfo>
                                        <TestimonialBody>
                                            {item.body}
                                        </TestimonialBody>
                                    </TestimonialItem>
                                ))}
                            </Swiper>
                        
                        </TestimonialArea>
                    }
                    

                </PageBody> 
            </Scroller>

            <BackButton onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFFFFF"/>
            </BackButton>

            <BarberModal 
                show={showModal}
                setShow={setShowModal}
                user={userInfo}
                service={selectedService}
            
            />

        </Container>
    );
    }
    