"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exportable = {
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
                        default: 5432,
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
};
exports.default = exportable;
