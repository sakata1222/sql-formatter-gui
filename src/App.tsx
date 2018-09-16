import * as React from 'react';
import './App.css';
import UpdatableInputTextBox from './UpdatableInputTextBox';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-main">
          <div className="input-area">
            <UpdatableInputTextBox placeholder="Input SQL" />
          </div>
          <div className="control-area">
            <p>Control area</p>
          </div>
          <div className="display-area">
            <p>Display Area</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
