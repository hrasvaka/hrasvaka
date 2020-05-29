//   ___    __________   |  Vasanth Developer (Vasanth Srivatsa)
//   __ |  / /___  __ \  |  ------------------------------------------------
//   __ | / / __  / / /  |  https://github.com/vasanthdeveloper/hrasvaka.git
//   __ |/ /  _  /_/ /   |
//   _____/   /_____/    |  Entryfile for hrasvaka file
//                       |

import moment from 'moment'
import clearLine from 'clear-terminal-line'

import config from './config'
import { connectToDatabase } from './api/database'
import connectToRedis from './api/database/redis/index'
import startWebserver from './server/index'
import logger from './logger'

// take note of the time when the application started
const startedOn = moment()

async function main(): Promise<void> {
    // tell the user the application started
    logger.note('Application started')

    // connect to the database and set it up
    await connectToDatabase()
    connectToRedis

    // start the webserver and listen for incoming requests
    await startWebserver(
        config.get('server.port') as number,
        config.get('server.host') as string,
    )
}

// handle when Ctrl+C is pressed
process.on('SIGINT', () => {
    clearLine()
    process.stdout.write('\r')
    logger.note(
        `Application ran for ${moment().diff(startedOn, 'minutes')} minutes`,
    )
    console.log('')
    process.exit(0)
})

main()
