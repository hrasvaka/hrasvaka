/*
 *  Log messages produced by the web server.
 *  Created On 16 September 2020
 */

import chalk from 'chalk'
import moment from 'moment'
import morgan from 'morgan'

// a list of all positive HTTP codes
const positiveHTTPCodes = ['200', '201', '302']

export default morgan((tokens, req, res) => {
    return [
        '🤖',
        chalk.magentaBright('WEB'),
        `[${chalk.gray(moment().format('hh:mm:ss A, Do MMM YYYY'))}]`,
        positiveHTTPCodes.includes(tokens.status(req, res))
            ? chalk.green(tokens.method(req, res))
            : chalk.redBright(tokens.method(req, res)),
        tokens.url(req, res),
        chalk.gray('~'),
        tokens.status(req, res),
    ].join(' ')
})
