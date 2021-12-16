const loginReducer = (state : boolean, action : iAction) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    default:
      return state;
  };
};

export default loginReducer;