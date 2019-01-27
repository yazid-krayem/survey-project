import sqlite from 'sqlite'
import SQL from 'sql-template-strings';

const initializeDatabase = async () =>{

    const db = await sqlite.open("./survey.sqlite");

    /**
   * retrieves the questions from the database
   */
const getQuestionList =  async () =>{
    let returnString = ''
    const  rows = await db.all('SELECT question_ID , question_name ,question_type FROM question')
    rows.forEach ( ({question_ID , question_name ,question_type})=> returnString += `${question_ID} - ${question_name} - ${question_type}`)
    return returnString 
}
const controller = {
    getQuestionList
}
return controller
}

export default initializeDatabase
