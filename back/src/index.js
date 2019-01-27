import app from './app'
import initializeDatabase from './database/dbQuestion'

const start = async () => {
  const controller = await initializeDatabase()
  
  app.get('/', async (req,res)=> res.send('ok'))


  app.get('/questions/list', async (req,res)=>{
    const question_list = await controller.getQuestionList()
    res.json(question_list)
  })
  app.listen(8080, () => console.log('server listening on port 8080'))

}

start();
