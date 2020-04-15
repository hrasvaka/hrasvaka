import express from 'express'

import config from '../config'
import auth from './routes/auth'

const api = express.Router()

export default async function linkUp(app: express.Express): Promise<void> {
    // link to all API routes to our API router
    api.use('/auth', auth)

    // link to the / according to whether frontend is enabled or not
    if (config.get('frontend') == true) {
        app.use('/~', api)
    } else {
        app.use('/', api)
    }
}
