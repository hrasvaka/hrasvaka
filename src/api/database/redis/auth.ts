/*
 *  This file will add tokens to our redis cache database.
 *  Created On 27 May 2020
 */

import redis from './index'
import config from '../../../config/index'

// get a token
function getToken(token: string): Promise<string> {
    return new Promise((resolve, reject) => {
        redis.get(token, (err, got) => {
            if (err) {
                reject(err)
            } else {
                resolve(got)
            }
        })
    })
}

// set the appropriate token
export default function setToken(tokensString: string): Promise<void> {
    return new Promise((resolve, reject) => {
        redis.set(
            tokensString,
            'true',
            'EX',
            config.get('tokenExpiry') as number,
            err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            },
        )
    })
}

// check if a token is blacklisted in our Redis cache
export async function isTokenBlacklisted(token: string): Promise<boolean> {
    const blacklistedToken = await getToken(token)

    if (!blacklistedToken) {
        return false
    } else {
        return true
    }
}
