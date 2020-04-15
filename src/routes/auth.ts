import express from 'express'

import auth from '../controllers/auth/index'
import { respond } from '../server/index'

const router = express.Router()

router.post('/new', async (req: express.Request, res: express.Response) => {
    const execution = await auth.new(req.body)
    respond(execution, res)
})

router.post('/login', async (req: express.Request, res: express.Response) => {
    const execution = await auth.login(req.body)
    respond(execution, res)
})

export default router
