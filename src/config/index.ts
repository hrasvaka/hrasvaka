import path from 'path'

import Conf from 'conf'

import schema from './schema'

const config = new Conf({
    cwd: path.join(process.cwd(), 'config'),
    schema: schema,
    clearInvalidConfig: true,
})

// as we internally use mysql2 instead of mysql
// if the user unknowingly puts mysql
// we silently change it to mysql2
if (config.get('database.client') == 'mysql') {
    config.set('database.client', 'mysql2')
}

// if the user didn't specify a port
// we set it to the default port according to the database
// adapter specified
if (!config.get('database.connection.port')) {
    if (config.get('database.client') == 'mysql2') {
        config.set('database.connection.port', 3306)
    } else if (config.get('database.client') == 'pg') {
        config.set('database.connection.port', 5432)
    }
}

export default config
