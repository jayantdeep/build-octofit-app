import express from 'express'
import mongoose from 'mongoose'

const app = express()

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  })
})

export default app
