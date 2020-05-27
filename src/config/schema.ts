/*
 *  Defines what properties are allowed in the config file. Unsupported properties
 *  will be automatically removed from the config file.
 *  Created On 14 April 2020
 */

import conf from 'conf'

interface SchemaImpl {
    [key: string]: conf.Schema
}

const exportable: SchemaImpl = {
    privateSecret: {
        type: 'string',
    },
    database: {
        type: 'object',
        properties: {
            client: {
                type: 'string',
                default: 'pg',
            },
            connection: {
                type: 'object',
                default: {},
                properties: {
                    host: {
                        type: 'string',
                        default: '127.0.0.1',
                    },
                    port: {
                        type: 'number',
                    },
                    database: {
                        type: 'string',
                        default: 'hrasvaka',
                    },
                    user: {
                        type: 'string',
                        default: 'hrasvaka',
                    },
                    password: {
                        type: ['string', 'null'],
                        default: null,
                    },
                },
            },
        },
        default: {},
        required: ['client'],
    },
    server: {
        type: 'object',
        default: {},
        properties: {
            host: {
                type: 'string',
                default: '127.0.0.1',
            },
            port: {
                type: 'number',
                default: 36352,
            },
        },
    },
}

export default exportable
