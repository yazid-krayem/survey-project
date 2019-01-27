import sqlite from 'sqlite'
import SQL from 'sql-template-strings';
import { type } from 'os';

const initializeDatabase = async () =>{

    const db = await sqlite.open("./survey.sqlite");


    /**
   * creates a question
   * @param {object} props an object with keys `question` and `question-type`
   * @returns {number} the id of the created question (or an error if things went wrong) 
   */

  const createQuestion = async (props) => {
    if(!props || !props.name || !props.type){
      throw new Error(`you must provide a name and an type`)
    }
    const { name, type } = props
    try{
      const result = await db.run(SQL`INSERT INTO question (question_name,question_type) VALUES (${name}, ${type})`);
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
   * @param {number} id the id of the question to edit
   * @param {object} props an object with at least one of `question` or `question-type`
   */

        const updateQuestion = async (id,props) =>{
            if(!props || !props.question ||!props.question_type){
                throw new Error (`you must provide a question `);
            }
            const {question,question_type} = props
            try{
                let statement = '';
                if(question && question_type){
                    statement = SQL`UPDATE question SET question_name${question}, question_type${question_type} WHERE question_ID =${id}`
                }else if(question){
                    statement = SQL `UPDATE question SET question_name${question} WHERE question_ID=${id}` 
                }else if(question_type){
                    statement = SQL ` UPDATE question SET question_type${question_type} WHERE question_ID=${id}`
                }
                const result = await db.run(statement)
                if(result.stmt.changes === 0 ){
                    throw new Error(`no changes were made`)
                }
                return true
            }catch(e) {
                throw new Error (`couldn't update the question ${id}:` + e.message)
            }
        }
        /**
   * Retrieves a question
   * @param {number} id the id of the question
   * @returns {object} an object with `question_name`, `question_type`, and `question_ID`, representing a question, or an error 
   */
    const getQuestion = async (id) => {
        try {
            const questionsList = await db.all(SQL`SELECT question_ID AS id, question_name, question_type FROM question WHERE question_ID = ${id} `)
            const question = question[0]
        if (!question) {
            throw new Error(`question ${id} not found `)
        }
        return question
    }catch (e) {
        throw new Error(`couldn't get the question ${id}: ` + e.message)
    }
}

     /**
   * retrieves the questions from the database
   * @param {string} orderBy an optional string that is either "question" or "question_type"
   * @returns {array} the list of questions
   */

   const getQuestionList = async(orderBy) =>{
       try{
           let statement = `SELECT question_ID AS id , question_name , question_type  FROM question `
           switch(orderBy){
            case 'question_name': statement+= ` ORDER BY question_name`; break;
            case 'question_type': statement+= ` ORDER BY question_type`; break;
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
