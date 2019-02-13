import sqlite from 'sqlite'
import SQL from 'sql-template-strings';

const initializeDatabase = async () =>{

    const db = await sqlite.open("./alex.db");


    /**
   * creates a question
   * @param {object} props an object with keys `question_text`,`question_type`
   * @returns {number} the id of the created question (or an error if things went wrong) 
   */

  const createQuestion = async (props) => {
    if(!props ){
      throw new Error(`you must provide a name and an type`)
    }
    const { question_text , question_type } = props
    try{
      const result = await db.run(SQL`INSERT INTO question (question_text,question_type) VALUES (${question_text},${question_type})`);
      const id = result.stmt.lastID
      return id
    }catch(e){
      throw new Error(`couldn't insert this combination: `+e.message)
    }
  }

/**
   * deletes a question
   * @param {number} id the id of the question to delete
   * @returns {boolean} `true` if the question was deleted, an error otherwise 
   */
        const deleteQuestion = async (id) =>{
            try{
                const result = await db.run(SQL `DELETE FROM question WHERE question_id =${id}`)
                if(result.stmt.changes === 0){
                 throw new Error (`question "${id}" does not exist`)
                }
                return true    
            }catch(e){
                throw new Error (`couldn't delete the question "${id}": `+e.message)
            }
        }

        /**
   * Edits a question
   * @param {number} question_id the id of the question to edit
   * @param {object} props an object with at least one of ``
   */

  const updateQuestion = async (question_id, props) => {
    if (!props || !(props.question_text || props.question_type )) {
      throw new Error(`you must provide a question`);
    }
    const { question_text,question_type } = props;
    try {
      let statement = "";
      if (question_text && question_type ) {
        statement = SQL`UPDATE question SET question_text=${question_text}, question_type=${question_type} WHERE question_id = ${question_id}`;
      } else if (question_text) {
        statement = SQL`UPDATE question SET question_text=${question_text} WHERE question_id = ${question_id}`;
      } else if (question_type) {
        statement = SQL`UPDATE question SET question_type=${question_type} WHERE question_id = ${question_id}`;
      } 
      
      const result = await db.run(statement);
      if (result.stmt.changes === 0) {
        throw new Error(`no changes were made`);
      }
      return true;
    } catch (e) {
      throw new Error(`couldn't update the question ${question_id}: ` + e.message);
    }
  }

        /**
   * Retrieves a question
   * @param {number} id the id of the question
   * @returns {object} an object with `question_text`, `question_type` and `question_id`, representing a question, or an error 
   */
  const getQuestion = async (id) => {
    try{
      const question_List = await db.all(SQL`SELECT * FROM question WHERE question_id = ${id}`);
      const question = question_List[0]
      if(!question){
        throw new Error(`question ${id} not found`)
      }
      return question
    }catch(e){
      throw new Error(`couldn't get the question ${id}: `+e.message)
    }
  }

     /**
   * retrieves the questions from the database
   * @param {string} orderBy an optional string that is either "title_question"
   * @returns {array} the list of questions
   */

   const getQuestionList = async(orderBy) =>{
       try{
           let statement = `SELECT question_id AS id , question_text , question_type FROM question `
           switch(orderBy){
            case 'question_text': statement+= ` ORDER BY question_text`; break;
            default: break
        }
        const rows = await db.all(statement)
      if(!rows.length){
        throw new Error(`no rows found`)
       }
       return rows
    }catch(e){
      throw new Error(`couldn't retrieve questions: `+e.message)
   }
   }
   
const controller = {
    getQuestionList,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestion
}
return controller
}

export default initializeDatabase
