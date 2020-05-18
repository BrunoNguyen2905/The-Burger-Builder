import React, {Component} from 'react';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import classes from './App.module.css';

import './App.module.css';

class App extends Component {
  //test remove interceptors when dont need them
  // state={
  //   show: true
  // };

  // componentDidMount(){
  //   setTimeout(() => {
  //     this.setState({show: false});
  //   },5000);
  // }
  render(){
    return (
      <div >
        <Layout>
          {/* {this.state.show ? <BurgerBuilder /> : null} */}
          <BurgerBuilder />
        </Layout>
        
      </div>
    );
  }
}

export default App;
