import bcrypt from 'bcryptjs'
import validator from 'validator'
import moment from 'moment'

import { ResponseImpl } from '../../../server'
import users from '../../database/users'

export interface NewAuthDataImpl {
    username: string
    displayName: string
    email: string
    password: string
}

export default async function newUser(
    data: NewAuthDataImpl,
): Promise<ResponseImpl> {
    const response: ResponseImpl = {
        code: null,
        error: null,
        data: null,
        message: null,
    }

    // config options for validator
    const emailOptions: validator.IsEmailOptions = {
        allow_display_name: false,
        allow_ip_domain: false,
        require_tld: true,
    }

    // check if there is username, email and a password
    if (!data.username || !data.displayName || !data.email || !data.password) {
        response.code = 422
        response.error = true

        if (!data.username) response.message = 'A username is required.'
        if (!data.displayName) response.message = 'A name is required.'
        if (!data.email) response.message = 'An email is required.'
        if (!data.password) response.message = 'A strong password is required.'

        return response
    } else if (
        data.username.includes(' ') ||
        data.username.match(/^[A-Z]+$/) ||
        data.username.length > 30 ||
        data.password.length < 6 ||
        data.displayName.length > 100 ||
        Object.keys(data as object).length > 4 ||
        validator.isEmail(data.email, emailOptions) == false
    ) {
        response.code = 422
        response.error = true

        if (data.username.includes(' '))
            response.message = 'Username cannot contain spaces.'

        if (data.username.match(/^[A-Z]+$/))
            response.message = 'Username cannot contain uppercase characters.'

        if (data.username.length > 30)
            response.message = 'Username cannot be more than 30 characters.'

        if (data.displayName.length > 100)
            response.message = 'The name cannot be more than 100 characters.'

        if (!validator.isEmail(data.email, emailOptions))
            response.message = 'Invalid email address provided.'

        if (data.password.length < 6)
            response.message = 'A password of minimum 6 characters is required.'

        if (Object.keys(data as object).length > 3)
            response.message = `Expected 3 fields, but received ${
                Object.keys(data as object).length
            } fields.`

        if (response.error == true) return response
    }

    // has the password!
    const salt = await bcrypt.genSalt()
    data.password = await bcrypt.hash(data.password, salt)

    // check if the email or username already exist in our database
    const usernameExists = await users.get.by.username(data.username)
    const emailExists = await users.get.by.email(data.email)

    if (emailExists || usernameExists) {
        response.code = 409
        response.error = true

        if (emailExists)
            response.message = 'The email is already registered. Please login.'
        if (usernameExists) response.message = 'The username is already taken.'

        return response
    }

    // TODO: Check from a list of cracked passwords and deny those as passwords.

    // add the user into our database
    await users.addNew({
        username: data.username,
        displayName: data.displayName,
        email: data.email,
        password: data.password,
        isAdmin: true,
        createdOn: moment().format('x'),
    })

    response.code = 201
    response.error = false
    response.message = 'The new user has been successfully created.'
    return response
}
