/*
 *  Here is what all the routes for the api are configured and exported as
 *  one big router instance.
 *  Created On 15 April 2020
 */

import express from 'express'

import auth from './routes/auth'

const api = express.Router()

api.use('/auth', auth)

export default api
