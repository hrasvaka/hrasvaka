/*
 *  This file will initialize with default values incase they don't exist.
 *  Created On 16 September 2020
 */

export default config => {
    // the set function to not repeat the same code
    const set = (name, value) =>
        config.get(name) == undefined ? config.set(name, value) : true

    // database defaults
    set('database.host', 'localhost')
    set('database.port', 6379)
    set('database.channel', 6)
    set('database.password', null)

    // web server defaults
    set('server.host', 'localhost')
    set('server.port', 15469)

    return config
}
