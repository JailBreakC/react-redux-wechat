import React from 'react'
import ReactDOM from 'react-dom'
import Routers from './containers/Routers'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import store from './store'
import registerServiceWorker from './registerServiceWorker'

import 'normalize.css'
import './index.less'

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component/>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Routers)

if (module.hot) {
 module.hot.accept('./containers/Routers', () => {
   render(Routers)
 })
}
// pwa 回头研究
// registerServiceWorker()
