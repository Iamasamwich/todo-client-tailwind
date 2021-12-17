/// <reference types="react-scripts" />

interface iStep {
  id: number;
  todoId: number;
  step: string;
  done: boolean;
};

interface iNewTodo {
  todo: string;
  dueDate: string;
};

interface iTodo extends iNewTodo{
  id: number;
  done: boolean;
};

interface iTodoWithSteps extends iTodo {
  steps: iSteps[];
};

type page = string;
type login = boolean;
type appStatus = string | number | null;
type todos = iTodoWithSteps[];
type showTodos = 'active' | 'all';
type todosFetched = boolean;
type todoToUpdate = iTodoWithSteps | null;

interface iState {
  page: string;
  login: boolean;
  appStatus: string | number | null;
  todos: iTodoWithSteps[];
  showTodos: 'active' | 'all';
  todosFetched: boolean;
  todoToUpdate: iTodoWithSteps | null;
};

interface iContext {
  page: page;
  login: boolean;
  appStatus: appStatus;
  todos: todos;
  showTodos: showTodos;
  todosFetched: todosFetched;
  todoToUpdate: todoToUpdate;
  loginDispatch: (action : iAction) => void;
  pageDispatch: (action : iAction) => void;
  appStatusDispatch: (action : iAction) => void;
  todosDispatch: (action : iAction) => void;
  showTodosDispatch: (action : iAction) => void;
  todosFetchedDispatch: (action : iAction) => void;
  todoToUpdateDispatch: (action : iAction) => void;
};

interface iBody {
  todo ?: string;
  step ?: string;
  done ?: boolean;
  dueDate ?: string;
  email ?: string;
  pword ?: string;
};

interface iRes {
  status: number;
  message: string;
};

interface iTodoRes extends iRes {
  todos: iTodoWithSteps[];
};

interface iTodoNewRes extends iRes {
  todo: iTodoWithSteps;
};

type iAction = 
  {
    type: 'SHOW_TODOS';
    payload: 'active' | 'all';
  } |
  {
    type: 'LOGIN';
    payload: boolean;
  } |
  {
    type: 'CHANGE_PAGE';
    payload: string;
  } |
  {
    type: 'STATUS';
    payload: string | number | null;
  } | 
  {
    type: 'SET_TODOS';
    payload: iTodoWithSteps[];
  } |
  {
    type: 'ADD_TODO';
    payload: iTodoWithSteps;
  } |
  {
    type: 'UPDATE_TODO';
    payload: iTodoWithSteps;
  } |
  {
    type: 'REMOVE_TODO';
    payload: number;
  } |
  {
    type: 'ADD_STEP';
    payload: iStep;
  } | 
  { 
    type: 'UPDATE_STEP';
    payload: iStep;
  } |
  { 
    type: 'REMOVE_STEP';
    payload: {
      todoId: number;
      stepId: number;
    };
  } |
  {
    type: 'TODOS_FETCHED';
    payload: boolean;
  } |
  {
    type: 'TODO_TO_UPDATE';
    payload: iTodoWithSteps | null;
  };

 
