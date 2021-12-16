import api from '../api/index';

export const loginAction = async ({email, pword} : {email :string; pword: string }) => {
  await api('/login', 'POST', {email, pword})
  .then((res : iRes) => {
    if (res.status === 200 && res.message === 'logged in') {
      return;
    } else {
      throw res;
    };
  });
};