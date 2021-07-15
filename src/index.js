import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { ToastProvider } from 'react-toast-notifications';
import './styles/index.css';
ReactDOM.render(
  <StrictMode>
    <ToastProvider
      autoDismiss
      autoDismissTimeout={5000}
      placement="bottom-right"
    >
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </ToastProvider>
  </StrictMode>,
  document.getElementById('root')
);
