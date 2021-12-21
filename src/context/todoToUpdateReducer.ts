const todoToUpdateReducer = (state : iTodoWithSteps | null, action : iAction) => {
  switch (action.type) {
    case 'TODO_TO_UPDATE':
      return action.payload;
    default:
      return state;
  };
};

export default todoToUpdateReducer;