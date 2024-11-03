import ReactDOM from 'react-dom/client';
import { App } from './presentation/app';
import { offers } from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(<App offers={offers} />);
