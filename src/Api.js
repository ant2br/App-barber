
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_API = '';

export default {
  checkToken: async token => {
    const response = await fetch(`${BASE_API}/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
      }),
    });

    const data = await response.json();
    return data;
  },

  SignIn: async (email, password) => {
      console.log(password);
    const response = await fetch(`${BASE_API}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const {token, user} = await response.json();

    if (!token) {
      return;
    }

    await AsyncStorage.setItem('@Barber:token', token);
    await AsyncStorage.setItem('@Barber:user', JSON.stringify(user));

    return user;
  },

  SignUp: async (name, email, password) => {
    const response = await fetch(`${BASE_API}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const {token, user} = await response.json();

    if (!token) {
      return;
    }

    await AsyncStorage.setItem('@Barber:token', token);
    await AsyncStorage.setItem('@Barber:user', JSON.stringify(user));

    return user;
  },
};
