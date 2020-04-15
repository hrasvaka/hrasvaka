import express from 'express'

import auth from '../controllers/auth'
import { respond } from '../server/index'

const router = express.Router()

router.post('/new', async (req: express.Request, res: express.Response) => {
    const execution = await auth.registerNewUser(req.body)
    respond(execution, res)
})

router.post('/login', (req: express.Request, res: express.Response) => {
    res.send('Authenticate existing user!')
})

export default router
