/*
 *  Create and configure an express webserver that can handle our API requests.
 *  Created On 14 April 2020
 */

import http from 'http'

import express from 'express'
import bodyParser from 'body-parser'

import logger from '../logger'
import morgan from '../api/middlewares/logging'

import api from '../api'
import { ResponseImpl } from './interfaces'

const app = express()
const server = http.createServer(app)

// attach all third-party/functional middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan)

// TODO: Handle the CORS

// start the webserver and listen for incoming HTTP requests
export default async function start(port: number, host: string): Promise<void> {
    // link the api code to the server
    app.use('/', api)

    server.listen(port, host)
    server.on('error', e => {
        logger.error(`Webserver error "${e.message}".`, 3)
    })
    logger.info(`Ready for requests on http://${host}:${port}`)
}

export function respond(data: ResponseImpl, res: express.Response): void {
    const code = data.code
    delete data.code

    res.status(code).json(data)
}
