export const initialState = {
  avatar: '',
  favorite: [],
  appointments: [],
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AVATAR':
      return {
        ...state,
        avatar: action.payload,
      };
    case 'SET_FAVORITE':
      return {
        ...state,
        favorite: action.payload,
      };
    case 'SET_APPOINTMENTS':
      return {
        ...state,
        appointments: action.payload,
      };
    default:
      return state;
  }
};
