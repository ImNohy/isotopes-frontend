import { hydrateRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HydratedRouter } from 'react-router/dom';

import { store } from '@/shared/redux/store';

hydrateRoot(
  document,
  <Provider store={store}>
    <HydratedRouter />
  </Provider>,
);
