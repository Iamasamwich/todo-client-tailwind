const pageReducer = (state : string, action : iAction) => {
  switch (action.type) {
    case ('CHANGE_PAGE'):
      return action.payload;
    default:
      return state;
  };
};

export default pageReducer;