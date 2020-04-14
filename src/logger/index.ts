import chalk from 'chalk'
import moment from 'moment'

function info(message: string): void {
    console.log(
        `${moment().format('YYYY-MM-DD hh-mm-ss')} [${chalk.yellowBright(
            'INFO',
        )}] ${message}`,
    )
}

function error(message: string): void {
    console.log(
        `${moment().format('YYYY-MM-DD hh-mm-ss')} [${chalk.redBright(
            'ERROR',
        )}] ${message}`,
    )
}

export default {
    info,
    error,
}
