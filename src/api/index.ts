import express from 'express'

import auth from './routes/auth'

const api = express.Router()

api.use('/auth', auth)

export default api
