import express from 'express'
import { setBalance } from '../controllers/setBalance.js'

const router = express.Router()

router.post('/set-balance', setBalance)

export default router
