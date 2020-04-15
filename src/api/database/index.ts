import knex from 'knex'
import chalk from 'chalk'

import path from 'path'

import execa from 'execa'

import config from '../../config'
import logger from '../../logger'

export default knex(config.get('database'))

const conf = config.get('database') as any

if (conf.client == 'mysql') {
    conf.client = 'mysql2'
}

async function initializeTables(): Promise<any> {
    try {
        await execa(path.join(process.cwd(), 'node_modules', '.bin', 'knex'), [
            'migrate:latest',
        ])
        logger.info(chalk.greenBright('Finished syncing database structure'))
    } catch (e) {
        logger.error(e)
        process.exit(3)
    }
}

export async function connectToDatabase(): Promise<void> {
    const tempDatabase = await knex(config.get('database'))

    // check if we have a successful connection by testing a query
    try {
        await tempDatabase.raw('SELECT 1')

        logger.info(chalk.greenBright('Connected to the database'))

        // now that we are successfully connected to the database
        // run the migrations
        await initializeTables()
    } catch (e) {
        logger.error(`Failed to connect to the database due to: ${e.message}`)
        process.exit(2)
    }
}
