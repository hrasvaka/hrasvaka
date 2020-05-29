/*
 *  Connects to the database and exposes the connected database to other files in this directory
 *  and also makes sure the database is always in latest migration.
 *  Created On 14 April 2020
 */

import knex from 'knex'

import path from 'path'

import execa from 'execa'

import config from '../../config'
import logger from '../../logger'
import users from './users'

export default knex(config.get('database').relational)

const conf = config.get('database').relational as any

if (conf.client == 'mysql') {
    conf.client = 'mysql2'
}

async function initializeTables(): Promise<any> {
    try {
        await execa(path.join(process.cwd(), 'node_modules', '.bin', 'knex'), [
            'migrate:latest',
        ])
        logger.info('Finished syncing database structure')
    } catch (e) {
        logger.error(e)
        process.exit(3)
    }
}

export async function connectToDatabase(): Promise<void> {
    const tempDatabase = await knex(config.get('database').relational)

    // check if we have a successful connection by testing a query
    try {
        await tempDatabase.raw('SELECT 1')

        logger.info('Connected to the database')

        // now that we are successfully connected to the database
        // run the migrations
        await initializeTables()
    } catch (e) {
        logger.error(`Failed to connect to the database due to: ${e.message}`)
        process.exit(2)
    }
}

// export all other files in a handy object
export const database = {
    users,
}
