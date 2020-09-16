/*
 *  Create and configure an express webserver that can handle our requests.
 *  Created On 16 September 2020
 */

import http from 'http'

import express from 'express'

import config from '../config/index.js'
import logger from '../logger.js'
import morgan from './middlewares/logging.js'
import root from './routes/root.js'
import link from './routes/link.js'

const app = express()
const server = http.createServer(app)

// attach all third-party/functional middlewares
app.use(morgan)

// start the webserver and listen for incoming HTTP requests
export default async () => {
    // configure routing
    app.use('/', root)
    app.use('/*', link)

    // start the server
    server.listen(config.get('server.port'), config.get('server.host'))

    server.on('error', e => {
        logger.error(`Webserver error "${e.message}".`, 3)
    })

    logger.info(
        `Ready for requests on http://${config.get('server.host')}:${config.get(
            'server.port',
        )}`,
    )
}
