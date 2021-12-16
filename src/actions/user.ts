import api from "../api";

export const createAccountAction = async (body : {name: string; email: string; pword: string;}) => {
  await api('/user', 'POST', body)
  .then((res : iRes) => {
    if (res.status !== 201) throw res;
    return;
  });
};