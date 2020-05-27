/*
 *  This file will read the .hrasvaka.yml and return the database configuration
 *  which is expected by knex.js
 *  Created On 14 April 2020
 */

const fs = require('fs')
const path = require('path')

const yaml = require('js-yaml')

const config = yaml.safeLoad(
    fs.readFileSync(path.join(process.cwd(), '.hrasvaka.yml'), {
        encoding: 'UTF-8',
    }),
)

const exportable = config['database']

module.exports = exportable
