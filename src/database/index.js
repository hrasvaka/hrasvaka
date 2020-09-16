/*
 *  Connects to the redis database instance.
 *  Created On 16 September 2020
 */

import { promisify } from 'util'

import redis from 'redis'
import moment from 'moment'

import logger from '../logger.js'
import config from '../config/index.js'

const client = redis.createClient({
    host: config.get('database.host'),
    port: config.get('database.port'),
    db: config.get('database.channel'),
    password: config.get('database.redis.password'),
})

// handle the errors
client.on('error', e => {
    if (e.code == 'NOAUTH') {
        logger.error(
            'Failed to connect to Redis database due to authentication failure',
            2,
        )
    } else if (e.code == 'ECONNREFUSED') {
        logger.error('Connection to database was refused.', 2)
    } else {
        throw e
    }
})

// convert redis's callback functions into modern promises
const get = promisify(client.get).bind(client)
const set = promisify(client.set).bind(client)

export const connectToDatabase = () => {
    // try the connection by setting a var
    set('_server', moment().format('x'))

    logger.info('Connected to the database')
    return client
}

export default get
