/*
 *  This file will prepare and return a middle using morgan for logging
 *  HTTP requests.
 *  Created On 27 May 2020
 */

import chalk from 'chalk'
import moment from 'moment'
import morgan from 'morgan'

// a list of all positive HTTP codes
const positiveHTTPCodes = ['200', '201']

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
