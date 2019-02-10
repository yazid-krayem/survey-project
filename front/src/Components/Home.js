import React, { Component} from 'react';

class Home extends Component {

render() {
    // const question = props.state.question_list
return(
    <div>
         <header className="App-">
 <button>Button</button>
 <button class='success'>Success</button>
 <button class='warning'>Warning</button>
 <button class='error'>Error</button>
 <button disabled>Disabled</button>
 {/* <ul>{question.map((x)=>(
     <li key={x.question_id}>{x.question_title}</li>
 ))}</ul> */}
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













