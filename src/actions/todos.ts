import api from "../api"

export const getTodosAction = async () => {
  return await api('/todo', 'GET')
  .then((res : iTodoRes) => {
    if (res.status !== 200) throw res;
    return res;
  });
};