/*
 *  Project's entryfile.
 *  Created On 16 September 2020
 */

import moment from 'moment'

import logger from './logger.js'
import { connectToDatabase } from './database/index.js'
import startWebserver from './server/index.js'

logger.note('Application started')

// take note of the time when application started
const startedOn = moment()

// connect to the database
await connectToDatabase()

// start the web server
await startWebserver()