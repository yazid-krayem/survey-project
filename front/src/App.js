import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state={question_list : []}
  componentDidMount(){
    const getList = async () =>{
      const respone =await fetch('//localhost:8080/questions/list')
      const data = await respone.json()
      this.setState({question_list:data})
    }
    getList()
  }
  render() {
    const question = this.state.question_list
    return (
      <div className="App">
        <header className="App-header">
          <button>Button</button>
          <button class='success'>Success</button>
          <button class='warning'>Warning</button>
          <button class='error'>Error</button>
          <button disabled>Disabled</button>
          <ul>{question.map((x)=>(
              <li key={x.question_ID}>{x.question_Title}</li>
          ))}</ul>
        </header>
      </div>
    );
  }
}

export default App;
