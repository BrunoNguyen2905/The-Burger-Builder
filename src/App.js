import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import classes from './App.module.css';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

import './App.module.css';

class App extends Component {
  
  render(){
    return (
      <div >
        <Layout>
          <Switch>
          <Route path = "/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path = "/" component={BurgerBuilder} />
          </Switch>
        </Layout>   
      </div>
    );
  }
}

export default App;
