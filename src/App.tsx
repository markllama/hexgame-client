import * as React from 'react';
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

export default App;
