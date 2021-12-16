const statusReducer = (state : null | number | string, action : iAction) => {
  switch (action.type) {
    case 'STATUS':
      return action.payload;
    default:
      return state;
  }
};

export default statusReducer;