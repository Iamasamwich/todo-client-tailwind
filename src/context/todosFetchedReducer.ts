const todosFetchedReducer = (state : boolean, action : iAction) => {

  switch (action.type) {
    case "TODOS_FETCHED":
      return action.payload;
    default:
      return state;
  };
};

export default todosFetchedReducer;