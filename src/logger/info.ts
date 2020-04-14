import chalk from 'chalk'
import moment from 'moment'

export default function info(message: string): void {
    console.log(
        `${moment().format('YYYY-MM-DD hh-mm-ss')} [${chalk.yellowBright(
            'INFO',
        )}] ${message}`,
    )
}
