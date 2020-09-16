/*
 *  Imports and configures itivrutaha logging module for logs other than
 *  web requests.
 *  Created On 16 September 2020
 */

import chalk from 'chalk'
import itivrutaha from 'itivrutaha'

export default itivrutaha.createNewLogger({
    theme: `🌏 ${chalk.cyanBright('APP')} [${chalk.gray(
        ':time',
    )}] :type :message`,
    timeFormat: 'hh:MM:ss TT, dS mmm yyyy',
    boldType: true,
    typeCase: 0,
})
