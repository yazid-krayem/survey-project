import app from './app'
import initializeDatabase from './database/dbQuestion'

  const start = async () => {
    const controller = await initializeDatabase()
      const id = await controller.createQuestion({name:'wow',type:'working'})
     const question = await controller.getQuestion(id)
     console.log("------\nmy newly created question\n",question)

  }
  start();
  