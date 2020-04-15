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
                        default: 'laghu',
                    },
                    user: {
                        type: 'string',
                        default: 'laghu',
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
                default: 2442,
            },
        },
    },
}

export default exportable
