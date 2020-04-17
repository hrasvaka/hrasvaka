"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var exportable = {
    privateSecret: {
        type: 'string',
    },
    frontend: {
        type: 'boolean',
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
                default: 2442,
            },
        },
    },
};
exports.default = exportable;
