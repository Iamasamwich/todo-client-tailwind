import React, { useContext, useEffect } from 'react';
import api from '../api';
import Context from '../context/Context';
import Layout from './Layout';
import Login from './Login';

const App = () => {
  const {state, dispatch} = useContext(Context);

  useEffect(() => {
    api('/ping', 'GET')
    .then((resp : iRes) => {
      if (resp.status === 200 && resp.message === 'ok') {
        dispatch({type: 'LOGIN', payload: true});
      } else {
        dispatch({type: 'LOGIN', payload: false});
      };
    })
    .catch(err => {});
  }, [dispatch]);

  const ShowPage = () => {
    if (!state.login) {
      switch (state.page) {
        case 'createAccount':
          return <div>Create account</div>;
        default:
          return <Login />;
      };
    } else {
      switch (state.page) {
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