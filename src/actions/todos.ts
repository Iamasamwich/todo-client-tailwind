import api from "../api"

export const getTodosAction = async () => {
  return await api('/todo', 'GET')
  .then((res : iResWithTodos) => {
    if (res.status !== 200) throw res;
    return res;
  });
};

export const addTodoAction = async (body : {todo: string, dueDate : string}) => {
  return await api('/todo', 'POST', {...body, done: false})
  .then((res : iResWithTodo) => {
    if (res.status !== 201) throw res;
    return res;
  });
};

export const updateTodoAction = async (todo : iTodoWithSteps) => {
  return await api(`/todo/${String(todo.id)}`, 'PUT', todo)
  .then((res : iResWithTodo) => {
    if (res.status !== 202) throw res;
    return res;
  });
};

export const deleteTodoAction = async (id : number) => {
  return await api(`/todo/${String(id)}`, 'DELETE')
  .then((res : any) => {
    if (res.status !== 202) throw res;
    return res;
  });
};

export const resetTodoAction = async (id : number) => {
  return await api(`/todo/${String(id)}/reset`, 'PUT')
  .then((res : any) => {
    if (res.status !== 202) throw res;
    return res;
  });
}

export const addStepAction = async ({step, todoId} : {step: string; todoId: number}) => {
  return await api(`/todo/${String(todoId)}/step`, 'POST', {step, done: false})
  .then((res : iResWithStep) => {
    if (res.status !== 201) throw res;
    return res;
  });
};