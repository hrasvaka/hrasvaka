import conf from 'conf'

interface SchemaImpl {
    [key: string]: conf.Schema
}

const exportable: SchemaImpl = {
    frontend: {
        type: 'boolean',
        default: true,
        description: 'Whether to integrate the web service along with the API.',
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
}

export default exportable
