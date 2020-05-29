/*
 *  Connects to the Redis database instance.
 *  Created On 27 May 2020
 */

import redis from 'redis'
import logger from '../../../logger'
import config from '../../../config/index'

const client = redis.createClient({
    host: config.get('database.redis.host'),
    port: config.get('database.redis.port'),
    db: config.get('database.redis.database'),
    password: config.get('database.redis.password')
        ? config.get('database.redis.password')
        : undefined,
})

// handle the errors
client.on('error', e => {
    if (e.code == 'NOAUTH') {
        logger.error(
            'Failed to connect to Redis database due to authentication failure',
            2,
        )
    } else {
        throw e
    }
})

export default client
