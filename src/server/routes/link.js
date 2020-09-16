/*
 *  This file will handle the root route or the / for the server.
 *  Created On 16 September 2020
 */

import express from 'express'

import get from '../../database/index.js'

const router = express.Router()

router.get('/*', async (req, res) => {
    // construct the name to search for
    const query = req.originalUrl.substring(1)

    // do a query
    const target = await get(query)

    // respond accordingly
    if (target) {
        res.redirect(target)
    } else {
        res.status(404).send('The requested resource was not found.')
    }
})

export default router
