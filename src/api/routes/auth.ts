/*
 *  Routes related authentication like user creation, retrieval, and deletion.
 *  Created On 15 April 2020
 */

import express from 'express'

import auth from '../controllers/auth/index'
import { respond, ExpressRequest } from '../../server/index'
import authenticated from '../middlewares/auth'

const router = express.Router()

// POST /auth/register
// Registers a new user
router.post('/register', async (req: ExpressRequest, res: express.Response) => {
    const execution = await auth.new(req.body)
    respond(execution, res)
})

// GET /auth
// Responds with the logged in user information
router.get(
    '/',
    authenticated,
    async (req: ExpressRequest, res: express.Response) => {
        const execution = await auth.index(req.login)
        respond(execution, res)
    },
)

// POST /auth/login
// Login existing users
router.post('/login', async (req: ExpressRequest, res: express.Response) => {
    const execution = await auth.login(req.body)
    respond(execution, res)
})

// PUT /api/auth
// Refresh the user's token

// PATCH /api/auth
// Update the user's profile

// DELETE /api/auth
// Delete an existing user

export default router
