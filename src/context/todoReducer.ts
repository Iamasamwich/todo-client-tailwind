const todoReducer = (
  state : iTodoWithSteps[], action : iAction) => {

  const sortTodos = (todos : iTodoWithSteps[]) => {
    return todos.sort((a, b) => {
      return (a.done === b.done) ? 0 : a.done ? 1 : -1;
    });
  };

  switch (action.type) {
    case 'SET_TODOS':
      return sortTodos(action.payload);
    case 'ADD_TODO': 
      return sortTodos([...state, action.payload]);
    case 'UPDATE_TODO':
      const updatedTodos = state.map(todo => {
        if (todo.id !== action.payload.id) {
          return todo;
        } else {
          return action.payload;
        };
      });
      return sortTodos(updatedTodos);
    case "REMOVE_TODO":
      return sortTodos(state.filter(todo => todo.id !== action.payload))
    case 'ADD_STEP':
      return state.map(todo => {
        if (action.payload.todoId === todo.id) {
          return {...todo, steps: [...todo.steps, action.payload]}
        } else {
          return todo;
        };
      });
    case 'UPDATE_STEP': 
      return state.map(todo => {
        if (todo.id === action.payload.todoId) {
          const steps = todo.steps.map(step => {
            if (step.id === action.payload.id) {
              return action.payload;
            } else {
              return step;
            };
          });
          return {...todo, steps};
        } else {
          return todo;
        };
      });
    case 'REMOVE_STEP':
      return state.map(todo => {
        if (todo.id !== action.payload.todoId) {
          return todo;
        } else {
          return {...todo, steps: todo.steps.filter(step => step.id !== action.payload.stepId)};
        };
      });
    default: 
      return state;
  };
};

export default todoReducer;