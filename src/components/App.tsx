import React, { useContext, useEffect } from 'react';
import api from '../api';
import Context from '../context/Context';
import Layout from './Layout';
import Login from './Login';

const App = () => {
  const {login, page, loginDispatch} = useContext(Context);

  useEffect(() => {
    api('/ping', 'GET')
    .then((resp : iRes) => {
      if (resp.status === 200 && resp.message === 'ok') {
        loginDispatch({type: 'LOGIN', payload: true});
      } else {
        loginDispatch({type: 'LOGIN', payload: false});
      };
    })
    .catch(err => {});
  }, [loginDispatch]);

  const ShowPage = () => {
    if (!login) {
      switch (page) {
        case 'createAccount':
          return <div>Create account</div>;
        default:
          return <Login />;
      };
    } else {
      switch (page) {
        case 'addTodo':
          return <div>Add todo</div>
        case 'editTodo':
          return <div>edit todo</div>
        case 'editUser':
          return <div>Edit user</div>
        case 'updatePassword':
          return <div>updatepassword</div>
        default:
          return <div>Show todos</div>
      };
    };
  };

  return (
    <Layout>
      <ShowPage />
    </Layout>
  );
};

export default App;