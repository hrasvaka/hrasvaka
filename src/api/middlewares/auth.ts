/*
 *  Ensures a token is provided and is valid before letting the actual
 *  route pass to it's controller.
 *  Created On 15 April 2020
 */

import express from 'express'
import jwt from 'jsonwebtoken'

import { respond } from '../../server/index'
import config from '../../config'
import { ExpressRequest, ResponseImpl } from '../../server/interfaces'
import { isTokenBlacklisted } from '../database/redis/auth'

export default async function loginRequired(
    req: ExpressRequest,
    res: express.Response,
    next,
): Promise<void> {
    // prepare a response in case the token is invalid
    const response: ResponseImpl = {
        code: 401,
        error: false,
        data: null,
        message: 'Unauthorized',
    }

    // get the token from headers
    const tokenHeader = req.headers['authorization'] as string

    // check if the token was passed
    if (tokenHeader && tokenHeader.startsWith('Bearer ')) {
        // create a new locally scoped token variable
        const token = tokenHeader.substring(7)

        // check if the token is blacklisted
        const isBlacklisted = await isTokenBlacklisted(token)

        // if the token isn't blacklisted we more further
        if (!isBlacklisted) {
            try {
                // decode the token first without checking
                // it's validity
                const decoded = jwt.decode(token) as any

                // get the current client's IP address
                const ip =
                    (req.headers['x-forwarded-for'] as string) ||
                    req.connection.remoteAddress

                // check if the token is coming from the same public
                // IP address from where it was initially created
                if (!ip == decoded.origin) {
                    // TODO: In future, we can send the user an email
                    // and automatically blacklist the token to prevent
                    // attackers from re-doing this.
                    respond(response, res)
                }

                // prepare a secret to be verified with JWT
                const signature = `${config.get(config.get('privateSecret'))}$${
                    decoded.identifier
                }`

                // check the token's validity
                const verified = jwt.verify(token, signature) as any

                // set the user's initial details
                req.login = {
                    username: verified.username,
                    displayName: verified.displayName,
                    email: null,
                    password: undefined,
                    createdOn: null,
                    isAdmin: verified.isAdmin,
                }

                next()
            } catch {
                respond(response, res)
            }
        } else {
            respond(response, res)
        }
    } else {
        respond(response, res)
    }
}
