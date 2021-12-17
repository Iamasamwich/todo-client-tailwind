const showTodosReducer = (state : 'all' | 'active', action : iAction) => {
  switch (action.type) {
    case 'SHOW_TODOS':
      return action.payload;
    default:
      return state;
  }

};

export default showTodosReducer;