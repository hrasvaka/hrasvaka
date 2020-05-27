/*
 *  Checks if the provided credentials are valid and responds with a JWT token.
 *  Which can be used to authenticate the protected API routes.
 *  Created On 15 April 2020
 */

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import users from '../../database/users'
import config from '../../../config'
import { ResponseImpl } from '../../../server/interfaces'

interface AuthDataImpl {
    username: string
    password: string
}

export default async function loginUser(data: AuthDataImpl): Promise<any> {
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

        if (correctPassword) {
            // create a jwt
            const token = jwt.sign(
                {
                    username: user.username,
                },
                config.get('privateSecret') as string,
                {
                    expiresIn: '1h',
                },
            )

            response.code = 200
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
