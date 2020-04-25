import express from 'express'
import jwt from 'jsonwebtoken'

import { ResponseImpl, respond, ExpressRequest } from '../../server/index'
import config from '../../config'
import users, { UserImpl } from '../database/users'

export default async function loginRequired(
    req: ExpressRequest,
    res: express.Response,
    next,
): Promise<void> {
    const token = req.headers['authorization'] as string
    const response: ResponseImpl = {
        code: 401,
        error: false,
        data: null,
        message: 'Unauthorized.',
    }

    // check if the token was passed
    if (token && token.startsWith('Bearer ')) {
        try {
            // check the token's validity
            const decoded = jwt.verify(
                token.substring(7),
                config.get('privateSecret') as string,
                {
                    maxAge: '1h',
                },
            ) as any

            // now check if the user exists
            const user = await users.get.by.username(decoded.username)
            if (!user) {
                console.log('Failed')
                respond(response, res)
            }
            req.login = user as UserImpl

            next()
        } catch {
            console.log('Failed')
            respond(response, res)
        }
    } else {
        console.log('Failed')
        respond(response, res)
    }
}
