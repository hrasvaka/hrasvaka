/*
 *  Create and configure an express webserver that can handle our API requests.
 *  Created On 14 April 2020
 */

import http from 'http'

import chalk from 'chalk'
import express from 'express'
import bodyParser from 'body-parser'

import logger from '../logger'
import { UserImpl } from '../api/database/users'

import api from '../api'

const app = express()
const server = http.createServer(app)

// attach all third-party/functional middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// TODO: Handle the CORS

export default async function start(port: number, host: string): Promise<void> {
    // link the api code to the server
    app.use('/', api)

    server.listen(port, host)
    logger.info(
        chalk.greenBright(`Ready for requests on http://${host}:${port}`),
    )
}

export interface ResponseImpl {
    code: number
    error: boolean
    message: string
    data: any
}

export interface ExpressRequest extends express.Request {
    login: UserImpl
}

export function respond(data: ResponseImpl, res: express.Response): void {
    const code = data.code
    delete data.code

    res.status(code).json(data)
}
