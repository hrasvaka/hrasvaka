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
        default: {},
        required: ['relational', 'redis'],
        properties: {
            relational: {
                type: 'object',
                default: {},
                required: ['client', 'connection'],
                properties: {
                    client: {
                        type: 'string',
                        default: 'pg',
                    },
                    connection: {
                        type: 'object',
                        default: {},
                        required: ['host', 'database', 'user', 'password'],
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
            },
            redis: {
                type: 'object',
                default: {},
                required: ['host', 'port', 'database', 'password'],
                properties: {
                    host: {
                        type: 'string',
                        default: '127.0.0.1',
                    },
                    port: {
                        type: 'number',
                        default: 6379,
                    },
                    database: {
                        type: 'number',
                        default: 10,
                    },
                    password: {
                        type: ['string', 'null'],
                        default: null,
                    },
                },
            },
        },
    },
    server: {
        type: 'object',
        default: {},
        required: ['host', 'port'],
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
    tokenExpiry: {
        type: 'number',
    },
}

export default exportable
