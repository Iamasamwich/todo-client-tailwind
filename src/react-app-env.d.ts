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
  done: string;
};

interface iTodoWithSteps extends iTodo {
  steps: iSteps[];
};

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
  state: iState;
  dispatch: (action : iAction) => void;
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
    payload: number;
  } |
  {
    type: 'TODOS_FETCHED';
    payload: boolean;
  } |
  {
    type: 'TODO_TO_UPDATE';
    payload: iTodoWithSteps | null;
  };

 
