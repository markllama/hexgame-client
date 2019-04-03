import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux'

import '@patternfly/react-core/dist/styles/base.css';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

import maps from './reducers'

import App from './App';

const store = createStore(maps)

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
