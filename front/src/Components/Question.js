import React from 'react'

export default class Question extends React.Component {
  state = {
    editMode: false
  };
  toggleEditMode = () => {
    const editMode = !this.state.editMode;
    this.setState({ editMode });
  };
  renderEditMode() {
    const { question_id, question_text, question_type, updateQuestion, deleteQuestion } = this.props;
    return <div> edit mode</div>;
  }
  renderViewMode() {
    const { question_id, question_text, question_type, deleteQuestion } = this.props;
    return (
      <div>
        <span>
          {question_id} - {question_text} - {question_type}
        </span>
        <button onClick={this.toggleEditMode} className="success">
          edit
        </button>
        <button onClick={() => console.log(question_id)} className="warning">
          x
        </button>
        
      </div>
    );
  }
  
  renderEditMode() {
    const { question_text, question_type } = this.props;
    return (
      
      <form
        className="third"
        onSubmit={this.onSubmit}
        onReset={this.toggleEditMode}
      >
        <input
          type="text"
          placeholder="question"
          name="question_type_input"
          defaultValue={question_text}
        />
        <input
          type="text"
          placeholder="type"
          name="question_type_input"
          defaultValue={question_type}
        />
        
        <div>
          <input type="submit" value="ok" />
          <input type="reset" value="cancel" className="button" />
        </div>
      </form>
    );
  }
  onSubmit = evt => {
    // stop the page from refreshing
    evt.preventDefault();
    // target the form
    const form = evt.target;
    // extract the two inputs from the form
    const question_type_input = form.question_type_input;
    const question_text_input = form.question_text_input;

    // extract the values
    const question_text = question_text_input.value;
    const question_type = question_type_input.value;
    
    // get the id and the update function from the props
    const { question_id, updateQuestion } = this.props;
    // run the update contact function
    updateQuestion(question_id, { question_text, question_type });
    // toggle back view mode
    this.toggleEditMode();
  };
  render() {
    const { editMode } = this.state;
    if (editMode) {
      return this.renderEditMode();
    } else {
      return this.renderViewMode();
      
    }
  }
}
