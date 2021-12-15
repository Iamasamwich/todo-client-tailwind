import React, { useContext, useEffect } from 'react';
import api from '../api';
import Context from '../context/Context';
import Layout from './Layout';

const App = () => {
  const {dispatch} = useContext(Context);

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

  return (
    <Layout>
      <div>App</div>
    </Layout>
  );
};

export default App;