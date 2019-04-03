import * as React from 'react';
import { connect } from 'react-redux';

import './App.css';

// import logo from './logo.svg';

import { BrowserRouter as Router} from 'react-router-dom';

import Dashboard from './Dashboard';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Router>  
          <Dashboard />
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    maps: state.maps
  }
}

export default connect(mapStateToProps)(App);
