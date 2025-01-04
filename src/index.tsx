import ReactDOM from 'react-dom/client';
import { App } from './components/app/app';
import React from 'react';
import 'leaflet/dist/leaflet.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { appStateStore } from './store';
import { checkAuthAction, fetchOffersAction } from './store/api-actions';
import { HistoryRouter } from './components/history-router/history-router';
import { browserHistory } from './browser-history';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

appStateStore.dispatch(fetchOffersAction());
appStateStore.dispatch(checkAuthAction());

root.render(
  <React.StrictMode>
    <Provider store={appStateStore}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer/>
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);
