import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Store } from './context/Context';
import './styles/main.css';

ReactDOM.render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>,
  document.getElementById('root')
);
