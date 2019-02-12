import React, { Component} from 'react';

class Home extends Component {
    state={
        question_list : [],
        question:''
      }
      getAllQuestions = async () => {
        const response = await fetch('http://localhost:8080/questions/list')
        const answer = await response.json()
        if (answer) {
          const allQuestions = answer.result
          this.setState({ allQuestions })
        }
      }
      addQuestion = async (question) => {
        let body = null;
    
        const response = await fetch(`http://localhost:8080/question/new?question_title=${question}`)
    
        const answer = await response.json();
        if (answer) {
          const id = answer.result;
          const question = { question, id }
          const allQuestions = [...this.state.question_list, question]
          this.setState({ allQuestions })
    
        }
      }
      componentDidMount() {
        this.getAllQuestions()
      }
      handleChange = (e) =>{
        const value = e.target.value
        console.log(value)
        this.setState({question:value})
      }
      onSubmit = (e) => {
        e.preventDefault()
        console.log(this.state.question_list)
        const value = e.target.value
        this.addEducator(this.state.question, value)
        this.setState({ question: ""})
      }
render() {
return(
    <div>
         <header className="App-">
 <button>Button</button>
 <button class='success'>Success</button>
 <button class='warning'>Warning</button>
 <button class='error'>Error</button>
 <button disabled>Disabled</button>
 <ul>{this.state.question_list.map((x)=>(
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
export default Home;













