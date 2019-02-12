import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Router from './Router';
import PropTypes from 'prop-types';

class App extends Component {
  state={
    question_list: [],
    question:'',
    type:[
      {text:''},
      {radio:''}
    ]
  }
  getAllQuestions = async () => {
    const response = await fetch('http://localhost:8080/questions/list')
    const answer = await response.json()
    if (answer) {
      const question_list = answer.result
      this.setState({ question_list })
    }
  }
  addQuestion = async (question_text, question_type) => {
    const response = await fetch(`http://localhost:8080/question/new?question_text=${question_text}&question_type=${question_type}`)

    const answer = await response.json();
    if (answer) {
      const {id,question_text,question_type} = answer.result;
      const question = { id, question_text,question_type}
      console.log(question_text,question_type)
      const question_list = [...this.state.question_list, question]
      this.setState({ question_list:question_list })

    }
  }
  componentDidMount() {
    this.getAllQuestions()
  }
  handleChange = (e) =>{
    const value = e.target.value
    this.setState({question:value})
  }
  handleType = (e) =>{
    const value = e.target.value
    this.setState({type:value})
    console.log(value)
  }
  onSubmit = (e) => {
    e.preventDefault()
    console.log(this.state.question_list)
    const value = e.target.value
    this.addQuestion(this.state.question_list,value)
    this.setState({ question: ""})
  }
  render() {
    const question= this.state.question_list
    return (
      <div>
             <header className="App-">
 <button>Button</button>
 <button class='success'>Success</button>
 <button class='warning'>Warning</button>
 <button class='error'>Error</button>
 <button disabled>Disabled</button>
 <ul>{question.map((x)=>(
     <li key={x.question_id}>{x.question_text} </li>
 ))}</ul>
<form onSubmit={this.onSubmit}>
 <input onChange={this.handleChange}/>
 <button>x</button>
 <select handleChange={this.handleType}>
   <option>text</option>
   <option>radio</option>
 </select>
 </form>
</header>
       {/* <Router /> */}
      </div>
    );
  }
}

export default App;
