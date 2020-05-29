/*
 *  This will add the following token to Redis database's cache. So, we won't
 *  accept that token once again.
 *  Created On 27 May 2020
 */

import { ResponseImpl } from '../../../server/interfaces'
import blacklistToken from '../../database/redis/auth'

export default async function logout(token: string): Promise<ResponseImpl> {
    await blacklistToken(token)

    return {
        code: 201,
        data: null,
        error: false,
        message: 'You have been successfully logged out.',
    }
}
