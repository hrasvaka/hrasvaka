/*
 *  Checks if the provided credentials are valid and responds with a JWT token.
 *  Which can be used to authenticate the protected API routes.
 *  Created On 15 April 2020
 */

import bcrypt from 'bcryptjs'
import Cryptr from 'cryptr'
import jwt from 'jsonwebtoken'

import users from '../../database/users'
import config from '../../../config'
import { ResponseImpl } from '../../../server/interfaces'

interface AuthDataImpl {
    username: string
    password: string
}

export default async function loginUser(
    data: AuthDataImpl,
    ip: string,
): Promise<ResponseImpl> {
    // the response we will send at the end of this operation
    const response: ResponseImpl = {
        code: null,
        error: null,
        data: null,
        message: null,
    }

    // check if a user exists with that username
    const user = await users.get.by.username(data.username)

    if (!user) {
        response.code = 401
        response.error = false
        response.message = 'Unauthorized.'
        return response
    } else {
        // now check if the password matches
        const correctPassword = await bcrypt.compare(
            data.password,
            user.password,
        )

        // prepare a secret to be signed with JWT
        const passwordPiece = user.password.split('$')[3].slice(-10)
        const signature = `${config.get(
            config.get('privateSecret'),
        )}$${passwordPiece}`

        // delete the password as we should NEVER send that
        // and delete additional keys that aren't directly required
        // for every type of request to reduce the size of the token
        delete user.password
        delete user.createdOn
        delete user.email

        // add our password piece to the JWT
        user['identifier'] = passwordPiece

        // attach the IP address this token was registered
        user['origin'] = ip

        if (correctPassword) {
            // create a jwt
            const token = jwt.sign(user, signature, {
                expiresIn: config.get('tokenExpiry') as number,
            })

            response.code = 201
            response.error = false
            response.data = token
            response.message = 'You have been successfully logged in.'
            return response
        } else {
            response.code = 401
            response.error = false
            response.message = 'Unauthorized.'
            return response
        }
    }
}
