import express from 'express'

import auth from '../controllers/auth/index'
import { respond, ExpressRequest } from '../../server/index'
import authenticated from '../middlewares/auth'

const router = express.Router()

router.get(
    '/',
    authenticated,
    async (req: ExpressRequest, res: express.Response) => {
        const execution = await auth.index(req.login)
        respond(execution, res)
    },
)

router.post('/new', async (req: ExpressRequest, res: express.Response) => {
    const execution = await auth.new(req.body)
    respond(execution, res)
})

router.post('/login', async (req: ExpressRequest, res: express.Response) => {
    const execution = await auth.login(req.body)
    respond(execution, res)
})

export default router
