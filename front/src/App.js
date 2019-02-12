import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Router from './Router';
import Question from './Components/Question'

class App extends Component {
  state={
    question_list: [],
    question_text:'',
    question_type:'',
    error_message: "",
  }
  getQuestion = async id => {
    // check if we already have the contact
    const previous_question = this.state.question_list.find(
      question => question.question_id === id
    );
    if (previous_question) {
      return; // do nothing, no need to reload a contact we already have
    }
    try {
      const response = await fetch(`http://localhost:8080/questions/get/${id}`);
      const answer = await response.json();
      if (answer.success) {
        // add the user to the current list of contacts
        const question = answer.result;
        const question_list = [...this.state.question_list, question];
        this.setState({ question_list });
      } else {
        this.setState({ error_message: answer.message });
      }
    } catch (err) {
      this.setState({ error_message: err.message });
    }
  };

  deleteQuestion = async id => {
    try {
      const response = await fetch(
        `http://localhost:8080/questions/delete/${id}`
      );
      const answer = await response.json();
      if (answer.success) {
        // remove the user from the current list of users
        const question_list = this.state.question_list.filter(
          question => question.question_id !== id
        );
        this.setState({ question_list });
      } else {
        this.setState({ error_message: answer.message });
      }
    } catch (err) {
      this.setState({ error_message: err.message });
    }
  };

//////////////////////////update

updateCandle = async (id, props) => {
  try {
    if (!props) {
      throw new Error(
        `you need at least name `
      );
    }
    const response = await fetch(
      `http://localhost:8080/questions/update/${id}?question_text=${props.question_text}`
    );
    const answer = await response.json();
    if (answer.success) {
      // we update the user, to reproduce the database changes:
      const question_list = this.state.question_list.map(question => {
        // if this is the contact we need to change, update it. This will apply to exactly
        // one contact
        if (question.question_id === id) {
          const new_question = {
            id: question.question_id,
            question_text: props.question_text ,
          
            
          };
          return new_question;
        }
        // otherwise, don't change the contact at all
        else {
          return question;
        }
      });
      this.setState({ question_list});
    } else {
      this.setState({ error_message: answer.message });
    }
  } catch (err) {
    this.setState({ error_message: err.message });
  }
};
////create
createQuestion = async props => {
  try {
    if (!props || !(props.question_text && props.question_type )) {
      throw new Error(
        `errrrrrrrrrrrrrrrrrrrrror `
      );
    }
    const { question_text,question_type } = props;
    const response = await fetch(
      `http://localhost:8080/questions/new/?question_text=${question_text}&question_type=${question_type}`
    );
    const answer = await response.json();
    if (answer.success) {
      // we reproduce the user that was created in the database, locally
      const id = answer.result;
      const question = { question_text,question_type, id };
      const question_list = [...this.state.candle_list, question];
      this.setState({ question_list });
    } else {
      this.setState({ error_message: answer.message });
    }
  } catch (err) {
    this.setState({ error_message: err.message });
  }
};


  //All
  getAllQuestions = async order => {
    try {
      const response = await fetch(
        `//localhost:8080/questions/list`
      );
      const answer = await response.json();
      if (answer.success) {
        const question_list = answer.result;
        console.log("here",question_list)
        this.setState({ question_list });
      } else {
        this.setState({ error_message: answer.message });
      }
    } catch (err) {
      this.setState({ error_message: err.message });
    }
  };
  async componentDidMount() {
   await this.getAllQuestions();
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
    const  question = this.state.question_list;
    const {error_message } = this.state;
    return (
      <div>
             <header className="App-">
 <button>Button</button>
 <button class='success'>Success</button>
 <button class='warning'>Warning</button>
 <button class='error'>Error</button>
 <button disabled>Disabled</button>
 <ul>{question.map((x)=>(
     <li key={x.question_id}>{x.question_id}--{x.question_text} </li>
 ))}</ul>
     {error_message ? <p> ERROR! {error_message}</p> : false}
        {question.map(question => (
          <Question
            key={question.question_id}
            question_id={question.question_id}
            question_text={question.question_text}
            question_type={question.question_type}
            updateQuestion={this.updateQuestion}
            deleteQuestion={this.deleteQuestion}
          />
        ))}

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
