import path from 'path'
import http from 'http'

import chalk from 'chalk'
import express from 'express'
import bodyParser from 'body-parser'

import logger from '../logger'
import { UserImpl } from '../api/database/users'

import api from '../api'
import config from '../config'

const app = express()
const server = http.createServer(app)

// attach all third-party/functional middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// TODO: Handle the CORS

async function serveFrontend(app: express.Express): Promise<void> {
    if (config.get('frontend') == false) return

    app.use(express.static(path.join(process.cwd(), 'dist', 'frontend')))
}

export default async function start(port: number, host: string): Promise<void> {
    // do the routing according to our config
    await serveFrontend(app)
    await api(app)

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
