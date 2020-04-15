import database from './index'
import { AuthDataImpl } from '../controllers/auth'

export interface UserImpl extends AuthDataImpl {
    displayName: string
    isAdmin: boolean
    createdOn: string
}

async function addNew(data: UserImpl): Promise<void> {
    return await database('users').insert(data)
}

async function getByUsername(username: string): Promise<UserImpl | void> {
    return database('users').where({ username }).select().first()
}

async function getByEmail(email: string): Promise<UserImpl | void> {
    return database('users').where({ email }).select().first()
}

export default {
    addNew,
    get: {
        by: {
            username: getByUsername,
            email: getByEmail,
        },
    },
}
