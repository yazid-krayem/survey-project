import sqlite from 'sqlite'
import SQL from 'sql-template-strings';

const initializeDatabase = async () =>{

    const db = await sqlite.open("./omarData.sqlite");


    /**
   * creates a question
   * @param {object} props an object with keys `title_question` and 
   * @returns {number} the id of the created question (or an error if things went wrong) 
   */

  const createQuestion = async (props) => {
    if(!props || !props.question ){
      throw new Error(`you must provide a name and an type`)
    }
    const { question } = props
    try{
      const result = await db.run(SQL`INSERT INTO question (title_question) VALUES (${question})`);
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
                const result = await db.run(SQL `DELETE FROM question WHERE id_question =${id}`)
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
   * @param {object} props an object with at least one of `title_question`
   */

        const updateQuestion = async (id,props) =>{
            if(!props || !props.question){
                throw new Error (`you must provide a question`);
            }
            const {question} = props
            try{
                let statement = '';
                if(question){
                    statement = SQL`UPDATE question SET title_question${question}, WHERE id_question =${id}`
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
   * @returns {object} an object with `title_question`, and `id_question`, representing a question, or an error 
   */
    const getQuestion = async (id) => {
        try {
            const questionsList = await db.all(SQL`SELECT id_question AS id, title_question FROM question WHERE id_question = ${id} `)
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
   * @param {string} orderBy an optional string that is either "title_question"
   * @returns {array} the list of questions
   */

   const getQuestionList = async(orderBy) =>{
       try{
           let statement = `SELECT id_question AS id , title_question FROM question `
           switch(orderBy){
            case 'title_question': statement+= ` ORDER BY title_question`; break;
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
