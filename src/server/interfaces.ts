/*
 *  Interface skeletons for this directory.
 *  Created On 27 May 2020
 */

import express from 'express'

import { UserImpl } from '../api/database/users'

// skeleton for any HTTP response we send
export interface ResponseImpl {
    code: number
    error: boolean
    message: string
    data: any
}

// an extended express.Request skeleton that can hold the logged
// in user's details
export interface ExpressRequest extends express.Request {
    login: UserImpl
}
