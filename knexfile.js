const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

const config = yaml.safeLoad(
    fs.readFileSync(path.join(process.cwd(), 'config', 'config.json'), {
        encoding: 'UTF-8',
    }),
)

const exportable = config['database']

module.exports = exportable
