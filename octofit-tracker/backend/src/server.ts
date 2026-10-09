import mongoose from 'mongoose'
import app from './app.js'

const port = Number(process.env.PORT ?? 8000)
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_tracker'

async function startServer() {
  await mongoose.connect(mongoUri)

  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit API listening on http://localhost:${port}`)
  })
}

startServer().catch((error: unknown) => {
  console.error('Failed to start OctoFit API:', error)
  process.exitCode = 1
})
