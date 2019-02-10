import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state={
    question_list : [],
    question:''
  }
  componentDidMount(){
    const getList = async () =>{
      const respone =await fetch('//localhost:8080/questions/list')
      const data = await respone.json()
      if(data){
        const question_list = data.result
        this.setState({question_list})
      }
      // this.setState({question_list:data})
    }
    getList()
  }
  handleChange = (e) =>{
    const value = e.target.value
    console.log(value)
    this.setState({question:value})
  }
  onSubmit = (e) =>{
    e.preventDefault()
    const question = this.state.question
    this.setState({question_list:question})
  }
  render() {
    const question = this.state.question_list
    return (
      <div className="App">
        <header className="App-">
          <button>Button</button>
          <button class='success'>Success</button>
          <button class='warning'>Warning</button>
          <button class='error'>Error</button>
          <button disabled>Disabled</button>
          <ul>{question.map((x)=>(
              <li key={x.question_id}>{x.question_title}</li>
          ))}</ul>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.handleChange}/>
          <button>x</button>
          </form>
        </header>
      </div>
    );
  }
}

export default App;
