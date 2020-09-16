/*
 *  This file will handle the root route or the / for the server.
 *  Created On 16 September 2020
 */

import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    console.log('hit')

    res.status(404).send('Not found')
})

export default router
