/*
 *  When given a valid token, responds with the corresponding user's data .
 *  Created On 14 April 2020
 */

import newUser from './new'
import loginUser from './login'
import { ResponseImpl } from '../../../server'

export async function auth(data: any): Promise<any> {
    // delete the password as we should NEVER send that
    delete data.password

    const response: ResponseImpl = {
        code: 200,
        error: false,
        data,
        message: 'Here you go.',
    }

    return response
}

export default {
    new: newUser,
    login: loginUser,
    index: auth,
}
