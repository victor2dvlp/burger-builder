import React, { Component } from 'react';
// import classes from './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {BrowserRouter, Route} from 'react-router-dom';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <Layout>
                    <Route path="/" exact component={BurgerBuilder} />
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/orders" component={Orders} />
                </Layout>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
