import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {AppContainer} from 'react-hot-loader';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App)

if (module.hot) {
 module.hot.accept('./App', () => {
   render(App)
 })
}

registerServiceWorker();
