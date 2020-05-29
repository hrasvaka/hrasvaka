/*
 *  When given a valid token, responds with the corresponding user's data .
 *  Created On 14 April 2020
 */

import register from './register'
import login from './login'
import logout from './logout'
import { ResponseImpl } from '../../../server/interfaces'
import { database } from '../../database/index'
import { UserImpl } from '../../database/users'

export async function auth(data: any): Promise<any> {
    // do a database query and get complete user's information
    const user = (await database.users.get.by.username(
        data.username,
    )) as UserImpl

    // delete the password as we should NEVER send that
    delete user.password

    const response: ResponseImpl = {
        code: 200,
        error: false,
        data: user,
        message: 'Here you go.',
    }

    return response
}

export default {
    index: auth,
    register,
    login,
    logout,
}
