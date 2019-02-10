import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import Router from './Router';

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
  onSubmit = (e) => {
    e.preventDefault()

    const image = e.target.fileField.files[0]
    this.addEducator(this.state.name, this.state.about, image)
    this.setState({ name: "", about: "" })
  }
  render() {
    return (
      <div>
       <Router />
      </div>
    );
  }
}

export default withRouter(App);
