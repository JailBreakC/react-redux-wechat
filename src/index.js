import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './containers/Routers';
import { AppContainer } from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';

import 'normalize.css';
import './index.less';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Routers)

if (module.hot) {
 module.hot.accept('./containers/Routers', () => {
   render(Routers)
 })
}

registerServiceWorker();
