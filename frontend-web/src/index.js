import React from 'react';
import ReactDOM from 'react-dom';
import 'react-notifications-component/dist/theme.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './modules/login/Login';
import Home from './modules/home/Home';
import Inicio from './modules/inicio/Inicio';

import ReactNotification from 'react-notifications-component'
import {
  BrowserRouter,
  Route,
  Router,
  Switch,
  withRouter,
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { createBrowserHistory } from 'history'
// import Footer from './shared/Footer/Footer';
// import Header from './shared/Header/Header';

const history = createBrowserHistory()

const BodyComponent = () => (
  <Switch>
      <Route path={"/"}  component={Inicio} exact />
      <Route path={"/login"}  component={Login} exact />
      <Route path={"/home"}  component={Home} exact />
  </Switch>
)

BodyComponent.propTypes = {
  location: PropTypes.shape({
      pathname: PropTypes.string
  })
}

const Body = withRouter(BodyComponent)

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <BrowserRouter>
      <ReactNotification />
        <App>
          {/* <Header/> */}
            <Body/>
          {/* <Footer/> */}
        </App>
      </BrowserRouter>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
