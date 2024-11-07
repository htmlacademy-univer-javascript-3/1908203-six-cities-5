import ReactDOM from 'react-dom/client';
import { App } from './presentation/app';
import { offers } from './mocks/offers';
import React from 'react';
// import 'leaflet.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={offers} />
  </React.StrictMode>
);
