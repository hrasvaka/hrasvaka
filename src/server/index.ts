import http from 'http'

import chalk from 'chalk'

import express from 'express'
import logger from '../logger'

const app = express()
const server = http.createServer(app)

// TODO: Handle the CORS

export default async function start(port: number, host: string): Promise<void> {
    server.listen(port, host)
    logger.info(
        chalk.greenBright(`Ready for requests on http://${host}:${port}`),
    )
}
