/*
 *  Routes related authentication like user creation, retrieval, and deletion.
 *  Created On 15 April 2020
 */

import express from 'express'

import auth from '../controllers/auth/index'
import { respond } from '../../server/index'
import authenticated from '../middlewares/auth'
import { ExpressRequest } from '../../server/interfaces'

const router = express.Router()

// POST /auth/register
// registers a new user
router.post('/register', async (req: ExpressRequest, res: express.Response) => {
    const execution = await auth.register(req.body)
    respond(execution, res)
})

// GET /auth
// responds with the logged in user information
router.get(
    '/',
    authenticated,
    async (req: ExpressRequest, res: express.Response) => {
        const execution = await auth.index(req.login)
        respond(execution, res)
    },
)

// POST /auth/login
// login existing users
router.post('/login', async (req: ExpressRequest, res: express.Response) => {
    console.log(req.headers['x-forwarded-for'], req.connection.remoteAddress)
    const execution = await auth.login(
        req.body,
        (req.headers['x-forwarded-for'] as string) ||
            req.connection.remoteAddress,
    )
    respond(execution, res)
})

// POST /auth/logout
// logout already logged in users
router.post(
    '/logout',
    authenticated,
    async (req: ExpressRequest, res: express.Response) => {
        const execution = await auth.logout(
            req.headers.authorization.substring(7),
        )
        respond(execution, res)
    },
)

// PUT /api/auth
// Refresh the user's token

// PATCH /api/auth
// Update the user's profile

// DELETE /api/auth
// Delete an existing user

export default router
