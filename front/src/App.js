import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <button>Button</button>
          <button class='success'>Success</button>
          <button class='warning'>Warning</button>
          <button class='error'>Error</button>
          <button disabled>Disabled</button>
        </header>
      </div>
    );
  }
}

export default App;
